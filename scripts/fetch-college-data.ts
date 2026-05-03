import { createClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const API_KEY = process.env.COLLEGE_SCORECARD_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error(
    "Missing env vars: COLLEGE_SCORECARD_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_KEY"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const API_BASE = "https://api.data.gov/ed/collegescorecard/v1/schools";
const PER_PAGE = 100;
const RATE_LIMIT_MS = 100;

const FIELDS = [
  "id",
  "school.name",
  "school.city",
  "school.state",
  "school.school_url",
  "school.carnegie_basic",
  "latest.cost.avg_net_price.public",
  "latest.cost.avg_net_price.private",
  "latest.completion.rate_suppressed.overall",
  "latest.earnings.10_yrs_after_entry.median",
  "latest.earnings.6_yrs_after_entry.median",
  "latest.aid.median_debt_suppressed.completers.overall",
  "latest.programs.cip_4_digit",
].join(",");

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface ScorecardResult {
  id: number;
  "school.name": string;
  "school.city": string;
  "school.state": string;
  "school.school_url": string;
  "school.carnegie_basic": number | null;
  "latest.cost.avg_net_price.public": number | null;
  "latest.cost.avg_net_price.private": number | null;
  "latest.completion.rate_suppressed.overall": number | null;
  "latest.earnings.10_yrs_after_entry.median": number | null;
  "latest.earnings.6_yrs_after_entry.median": number | null;
  "latest.aid.median_debt_suppressed.completers.overall": number | null;
  "latest.programs.cip_4_digit": CIPProgram[] | null;
}

interface CIPProgram {
  code: string;
  title: string;
  earnings?: { median_earnings?: number | null };
  debt?: { median_debt?: number | null };
}

interface SchoolRow {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  type: string;
  net_price_in_state: number | null;
  net_price_out_state: number | null;
  graduation_rate: number | null;
  median_earnings_6yr: number | null;
  median_earnings_10yr: number | null;
  median_debt: number | null;
  debt_to_income: number | null;
  roi_score: number | null;
  roi_verdict: string | null;
}

interface MajorRow {
  id: string;
  name: string;
  slug: string;
  median_earnings: number | null;
  median_debt: number | null;
  roi_score: number | null;
}

interface SchoolMajorRow {
  school_id: string;
  major_id: string;
  median_earnings: number | null;
  median_debt: number | null;
  roi_score: number | null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function classifySchoolType(carnegieBasic: number | null, netPricePublic: number | null): string {
  if (netPricePublic !== null && netPricePublic > 0) return "public";
  if (carnegieBasic !== null && carnegieBasic >= 0) return "private";
  return "private";
}

function calculateROI(
  medianEarnings10yr: number | null,
  medianDebt: number | null,
  graduationRate: number | null
): { score: number | null; verdict: string | null } {
  // Need at least earnings to calculate any ROI
  if (medianEarnings10yr === null || medianEarnings10yr <= 0) {
    return { score: null, verdict: null };
  }

  // DTI score (0-40 pts) — if no debt data, assume moderate debt
  const debt = medianDebt != null && medianDebt > 0 ? medianDebt : 20000;
  const dti = debt / medianEarnings10yr;
  const dtiScore = Math.max(0, Math.min(40, (1 - dti) * 40));

  // Earnings premium over HS grad baseline (0-40 pts)
  const earningsPremium = (medianEarnings10yr - 35000) / 35000;
  const earningsScore = Math.max(0, Math.min(40, earningsPremium * 20));

  // Graduation rate (0-20 pts) — if missing, use 0.5 as neutral
  const gradRate = graduationRate != null ? graduationRate : 0.5;
  const gradScore = gradRate * 20;

  const total = Math.round(dtiScore + earningsScore + gradScore);
  const score = Math.max(0, Math.min(100, total));

  let verdict: string;
  if (score >= 70) verdict = "Strong ROI";
  else if (score >= 50) verdict = "Moderate ROI";
  else verdict = "Poor ROI";

  return { score, verdict };
}

// ---------------------------------------------------------------------------
// Fetch all pages from Scorecard API
// ---------------------------------------------------------------------------
async function fetchAllSchools(): Promise<ScorecardResult[]> {
  const results: ScorecardResult[] = [];
  let page = 0;
  let totalPages = 1;

  while (page < totalPages) {
    const url = `${API_BASE}?api_key=${API_KEY}&fields=${FIELDS}&per_page=${PER_PAGE}&page=${page}`;
    console.log(`Fetching page ${page + 1}/${totalPages}...`);

    const res = await fetch(url);
    if (!res.ok) {
      console.error(`API error: ${res.status} ${res.statusText}`);
      break;
    }

    const json = await res.json();
    const metadata = json.metadata;
    totalPages = Math.ceil(metadata.total / PER_PAGE);

    results.push(...json.results);
    console.log(
      `  Got ${json.results.length} schools (total: ${results.length}/${metadata.total})`
    );

    page++;
    if (page < totalPages) {
      await sleep(RATE_LIMIT_MS);
    }
  }

  return results;
}

// ---------------------------------------------------------------------------
// Transform & upsert
// ---------------------------------------------------------------------------
async function processAndUpsert(results: ScorecardResult[]) {
  const schools: SchoolRow[] = [];
  const majorsMap = new Map<string, MajorRow>();
  const schoolMajors: SchoolMajorRow[] = [];

  for (const r of results) {
    const name = r["school.name"];
    if (!name) continue;

    const medianEarnings10yr = r["latest.earnings.10_yrs_after_entry.median"];
    const medianDebt = r["latest.aid.median_debt_suppressed.completers.overall"];
    const graduationRate = r["latest.completion.rate_suppressed.overall"];
    const netPricePublic = r["latest.cost.avg_net_price.public"];
    const netPricePrivate = r["latest.cost.avg_net_price.private"];

    const { score, verdict } = calculateROI(medianEarnings10yr, medianDebt, graduationRate);

    const schoolId = String(r.id);
    const dti =
      medianDebt && medianEarnings10yr
        ? Math.round((medianDebt / medianEarnings10yr) * 100) / 100
        : null;

    schools.push({
      id: schoolId,
      name,
      slug: slugify(name),
      city: r["school.city"],
      state: r["school.state"],
      type: classifySchoolType(r["school.carnegie_basic"], netPricePublic),
      net_price_in_state: netPricePublic,
      net_price_out_state: netPricePrivate,
      graduation_rate: graduationRate,
      median_earnings_6yr: r["latest.earnings.6_yrs_after_entry.median"],
      median_earnings_10yr: medianEarnings10yr,
      median_debt: medianDebt,
      debt_to_income: dti,
      roi_score: score,
      roi_verdict: verdict,
    });

    // Process CIP programs (majors)
    const programs = r["latest.programs.cip_4_digit"];
    if (programs && Array.isArray(programs)) {
      for (const prog of programs) {
        const majorId = prog.code;
        const majorEarnings = prog.earnings?.median_earnings ?? null;
        const majorDebt = prog.debt?.median_debt ?? null;

        if (!majorsMap.has(majorId)) {
          majorsMap.set(majorId, {
            id: majorId,
            name: prog.title,
            slug: slugify(prog.title),
            median_earnings: majorEarnings,
            median_debt: majorDebt,
            roi_score: null,
          });
        }

        // Aggregate: update major-level median if this school's is higher
        const existing = majorsMap.get(majorId)!;
        if (majorEarnings && (!existing.median_earnings || majorEarnings > existing.median_earnings)) {
          existing.median_earnings = majorEarnings;
        }

        let majorROI: number | null = null;
        if (majorEarnings && majorDebt) {
          const { score: mScore } = calculateROI(majorEarnings, majorDebt, 0.5);
          majorROI = mScore;
        }

        schoolMajors.push({
          school_id: schoolId,
          major_id: majorId,
          median_earnings: majorEarnings,
          median_debt: majorDebt,
          roi_score: majorROI,
        });
      }
    }
  }

  // Upsert schools in batches
  console.log(`\nUpserting ${schools.length} schools...`);
  const BATCH_SIZE = 500;
  for (let i = 0; i < schools.length; i += BATCH_SIZE) {
    const batch = schools.slice(i, i + BATCH_SIZE);
    const { error } = await supabase
      .from("schools")
      .upsert(batch, { onConflict: "id" });
    if (error) {
      console.error(`School upsert error (batch ${i}):`, error.message);
    } else {
      console.log(`  Schools batch ${i / BATCH_SIZE + 1}: ${batch.length} rows`);
    }
  }

  // Upsert majors
  const majors = Array.from(majorsMap.values());
  console.log(`Upserting ${majors.length} majors...`);
  for (let i = 0; i < majors.length; i += BATCH_SIZE) {
    const batch = majors.slice(i, i + BATCH_SIZE);
    const { error } = await supabase
      .from("majors")
      .upsert(batch, { onConflict: "id" });
    if (error) {
      console.error(`Major upsert error (batch ${i}):`, error.message);
    } else {
      console.log(`  Majors batch ${i / BATCH_SIZE + 1}: ${batch.length} rows`);
    }
  }

  // Upsert school_majors
  console.log(`Upserting ${schoolMajors.length} school-major links...`);
  for (let i = 0; i < schoolMajors.length; i += BATCH_SIZE) {
    const batch = schoolMajors.slice(i, i + BATCH_SIZE);
    const { error } = await supabase
      .from("school_majors")
      .upsert(batch, { onConflict: "school_id,major_id" });
    if (error) {
      console.error(`School-major upsert error (batch ${i}):`, error.message);
    } else {
      console.log(
        `  School-majors batch ${i / BATCH_SIZE + 1}: ${batch.length} rows`
      );
    }
  }

  console.log("\nDone!");
  console.log(`  Schools: ${schools.length}`);
  console.log(`  Majors: ${majors.length}`);
  console.log(`  School-major links: ${schoolMajors.length}`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log("Fetching College Scorecard data...\n");
  const results = await fetchAllSchools();
  console.log(`\nFetched ${results.length} schools total.`);
  await processAndUpsert(results);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
