import Link from "next/link";
import type { Metadata } from "next";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { generateStateTitle, formatCurrency, formatPercent } from "@/lib/seo";
import type { School } from "@/lib/types";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import ROIBadge from "@/components/ROIBadge";

const STATE_ABBR_TO_NAME: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
  HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
  MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire",
  NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina",
  ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania",
  RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee",
  TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington",
  WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming", DC: "District of Columbia",
};

const SLUG_TO_ABBR: Record<string, string> = Object.fromEntries(
  Object.entries(STATE_ABBR_TO_NAME).map(([abbr, name]) => [
    name.toLowerCase().replace(/\s+/g, "-"),
    abbr,
  ])
);

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getSchoolsByState(stateAbbr: string): Promise<School[]> {
  if (!isSupabaseConfigured()) return [];
  const { data } = await supabase
    .from("schools")
    .select("*")
    .eq("state", stateAbbr)
    .order("roi_score", { ascending: false });
  return data ?? [];
}

export async function generateStaticParams() {
  return Object.values(STATE_ABBR_TO_NAME).map((name) => ({
    slug: name.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const abbr = SLUG_TO_ABBR[slug];
  const stateName = abbr ? STATE_ABBR_TO_NAME[abbr] : slug;
  return {
    title: generateStateTitle(stateName),
    description: `Compare college ROI scores for schools in ${stateName}. See median earnings, student debt, and graduation rates.`,
  };
}

export default async function StatePage({ params }: PageProps) {
  const { slug } = await params;
  const abbr = SLUG_TO_ABBR[slug];
  const stateName = abbr ? STATE_ABBR_TO_NAME[abbr] : slug;
  const schools = abbr ? await getSchoolsByState(abbr) : [];

  const avgEarnings =
    schools.length > 0
      ? Math.round(
          schools.reduce((sum, s) => sum + (s.median_earnings_10yr ?? 0), 0) /
            schools.filter((s) => s.median_earnings_10yr).length
        )
      : null;

  const avgGradRate =
    schools.length > 0
      ? schools.reduce((sum, s) => sum + (s.graduation_rate ?? 0), 0) /
        schools.filter((s) => s.graduation_rate).length
      : null;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "Colleges", href: "/college" },
          { label: stateName },
        ]}
      />

      <h1 className="text-3xl font-bold text-gray-900">
        Best ROI Colleges in {stateName}
      </h1>
      <p className="mt-2 text-gray-600">
        {schools.length} schools analyzed in {stateName}.
      </p>

      {/* State Stats */}
      {avgEarnings && (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 p-5">
            <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
              Avg Median Earnings
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {formatCurrency(avgEarnings)}
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 p-5">
            <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
              Schools Analyzed
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {schools.length}
            </p>
          </div>
          {avgGradRate && (
            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
                Avg Graduation Rate
              </p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {formatPercent(avgGradRate)}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Schools Table */}
      <div className="mt-8 overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-600">
            <tr>
              <th className="px-4 py-3">School</th>
              <th className="px-4 py-3">Median Earnings</th>
              <th className="px-4 py-3">Median Debt</th>
              <th className="px-4 py-3">Grad Rate</th>
              <th className="px-4 py-3">ROI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {schools.map((s) => (
              <tr
                key={s.id}
                className="transition-colors hover:bg-indigo-50/50"
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/college/schools/${s.slug}`}
                    className="font-medium text-indigo-600 hover:underline"
                  >
                    {s.name}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  {s.median_earnings_10yr
                    ? formatCurrency(s.median_earnings_10yr)
                    : "N/A"}
                </td>
                <td className="px-4 py-3">
                  {s.median_debt ? formatCurrency(s.median_debt) : "N/A"}
                </td>
                <td className="px-4 py-3">
                  {s.graduation_rate ? formatPercent(s.graduation_rate) : "N/A"}
                </td>
                <td className="px-4 py-3">
                  {s.roi_verdict ? (
                    <ROIBadge
                      verdict={s.roi_verdict}
                      score={s.roi_score ?? undefined}
                      size="sm"
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            ))}
            {schools.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                  No school data available for this state yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
