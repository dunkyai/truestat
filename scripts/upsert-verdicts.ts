import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || "";

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

interface SchoolRow {
  id: string;
  name: string;
  city: string;
  state: string;
  type: string;
  graduation_rate: number | null;
  median_earnings_6yr: number | null;
  median_earnings_10yr: number | null;
  median_debt: number | null;
  debt_to_income: number | null;
  roi_score: number | null;
  roi_verdict: string | null;
}

function fmtMoney(n: number | null): string {
  if (n == null) return "N/A";
  return `$${n.toLocaleString("en-US")}`;
}

function fmtPct(n: number | null): string {
  if (n == null) return "N/A";
  return `${Math.round(n * 100)}%`;
}

function generateVerdict(s: SchoolRow): string {
  const { name, roi_score: roi, median_earnings_10yr: earn10, median_debt: debt, graduation_rate: grad, debt_to_income: dti, city, state, type: schoolType } = s;

  // Sentence 1: Overall ROI positioning
  let s1: string;
  if (roi! >= 85) {
    s1 = `${name} delivers exceptional return on investment with an ROI score of ${roi} out of 100, placing it among the top-tier institutions nationally.`;
  } else if (roi! >= 75) {
    s1 = `${name} earns a strong ROI score of ${roi} out of 100, reflecting solid financial outcomes for its graduates.`;
  } else if (roi! >= 65) {
    const adj = roi! < 70 ? "moderate" : "respectable";
    const val = roi! < 70 ? "reasonable" : "above-average";
    s1 = `${name} posts a ${adj} ROI score of ${roi} out of 100, offering ${val} value relative to its cost.`;
  } else {
    s1 = `${name} records an ROI score of ${roi} out of 100, signaling modest financial returns compared to peer institutions.`;
  }

  // Sentence 2: Key financial metrics
  let s2: string;
  if (earn10 && debt) {
    let debtPhrase: string;
    if (dti != null && dti <= 0.15) debtPhrase = `an exceptionally low debt-to-income ratio of ${dti}`;
    else if (dti != null && dti <= 0.25) debtPhrase = `a manageable debt-to-income ratio of ${dti}`;
    else if (dti != null && dti <= 0.35) debtPhrase = `a debt-to-income ratio of ${dti}`;
    else if (dti != null) debtPhrase = `an elevated debt-to-income ratio of ${dti}`;
    else debtPhrase = `median debt of ${fmtMoney(debt)}`;
    s2 = `Graduates report median earnings of ${fmtMoney(earn10)} ten years after enrollment against ${debtPhrase}, with median student debt of ${fmtMoney(debt)}.`;
  } else {
    s2 = `Financial data shows median 10-year earnings of ${fmtMoney(earn10)} for graduates of this ${schoolType || ""} institution in ${city}, ${state}.`;
  }

  // Sentence 3: Graduation context + takeaway
  let s3: string;
  if (grad != null && grad >= 0.90) {
    s3 = `A ${fmtPct(grad)} graduation rate reinforces the strong likelihood of completing a degree and capturing those earnings gains.`;
  } else if (grad != null && grad >= 0.75) {
    s3 = `With a ${fmtPct(grad)} graduation rate, most enrolled students finish their programs and go on to benefit from the school's earning potential.`;
  } else if (grad != null && grad >= 0.60) {
    s3 = `A ${fmtPct(grad)} graduation rate means a meaningful share of students complete their degrees, though prospective applicants should weigh completion risk alongside the earnings upside.`;
  } else if (grad != null) {
    s3 = `The ${fmtPct(grad)} graduation rate is a notable consideration—strong post-graduation earnings may not materialize for students who don't finish their program.`;
  } else if (roi! >= 70) {
    s3 = `As a specialized institution in ${city}, ${state}, it channels graduates into high-demand career paths that support its strong earnings outcomes.`;
  } else {
    s3 = `As a specialized institution in ${city}, ${state}, it provides focused career preparation, though prospective students should research program-specific outcomes.`;
  }

  return `${s1} ${s2} ${s3}`;
}

async function main() {
  // 1. Query schools missing verdicts, ordered by ROI score desc, limit 50
  // First get existing verdict school_ids
  const { data: existingVerdicts, error: verdictErr } = await supabase
    .from("school_verdicts")
    .select("school_id");

  const existingIds = new Set(
    verdictErr ? [] : (existingVerdicts || []).map((v) => v.school_id)
  );

  if (verdictErr) {
    console.log("school_verdicts table may not exist yet, proceeding to generate for all top schools...");
  } else {
    console.log(`Found ${existingIds.size} existing verdicts`);
  }

  // 2. Get schools ordered by ROI score desc
  const { data: schools, error: schoolErr } = await supabase
    .from("schools")
    .select("id,name,city,state,type,graduation_rate,median_earnings_6yr,median_earnings_10yr,median_debt,debt_to_income,roi_score,roi_verdict")
    .not("roi_score", "is", null)
    .order("roi_score", { ascending: false })
    .limit(200); // fetch extra to filter out existing

  if (schoolErr || !schools) {
    console.error("Failed to fetch schools:", schoolErr);
    process.exit(1);
  }

  // Filter out schools that already have verdicts
  const needVerdicts = schools
    .filter((s) => !existingIds.has(s.id))
    .slice(0, 50);

  console.log(`Generating verdicts for ${needVerdicts.length} schools (ROI range: ${needVerdicts[needVerdicts.length - 1]?.roi_score} - ${needVerdicts[0]?.roi_score})`);

  // 3. Generate verdicts
  const verdictRows = needVerdicts.map((s) => ({
    school_id: s.id,
    verdict_text: generateVerdict(s as SchoolRow),
    verdict_generated_at: new Date().toISOString(),
  }));

  // 4. Upsert to school_verdicts
  const { data: upserted, error: upsertErr } = await supabase
    .from("school_verdicts")
    .upsert(verdictRows, { onConflict: "school_id" })
    .select("school_id");

  if (upsertErr) {
    console.error("Upsert failed:", upsertErr);
    // Output verdicts as JSON fallback
    console.log("\nFallback: writing verdicts to stdout as JSON");
    console.log(JSON.stringify(verdictRows, null, 2));
    process.exit(1);
  }

  console.log(`Successfully upserted ${upserted?.length || verdictRows.length} verdicts`);

  // Print summary
  for (const s of needVerdicts) {
    const v = verdictRows.find((r) => r.school_id === s.id);
    console.log(`\n--- [${s.roi_score}] ${s.name} ---`);
    console.log(v?.verdict_text);
  }
}

main().catch(console.error);
