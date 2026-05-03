import type { Metadata } from "next";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { generateSchoolTitle, generateSchoolDescription, formatCurrency, formatPercent } from "@/lib/seo";
import type { School } from "@/lib/types";
import MetricCard from "@/components/MetricCard";
import ROIBadge from "@/components/ROIBadge";
import FAQSection from "@/components/FAQSection";
import BreadcrumbNav from "@/components/BreadcrumbNav";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getSchool(slug: string): Promise<School | null> {
  if (!isSupabaseConfigured()) return null;
  const { data } = await supabase
    .from("schools")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

async function getSchoolMajors(schoolId: string) {
  if (!isSupabaseConfigured()) return [];
  const { data } = await supabase
    .from("school_majors")
    .select("*, majors(name, slug)")
    .eq("school_id", schoolId)
    .order("roi_score", { ascending: false });
  return data ?? [];
}

export async function generateStaticParams() {
  if (!isSupabaseConfigured()) return [];
  const { data } = await supabase.from("schools").select("slug");
  return (data ?? []).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const school = await getSchool(slug);
  if (!school) {
    return { title: "School Not Found | TrueStat" };
  }
  return {
    title: generateSchoolTitle(school.name),
    description: generateSchoolDescription(school),
  };
}

export default async function SchoolPage({ params }: PageProps) {
  const { slug } = await params;
  const school = await getSchool(slug);

  if (!school) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900">School not found</h1>
      </main>
    );
  }

  const majors = await getSchoolMajors(school.id);

  const verdictColor = (v: string | null): "green" | "amber" | "red" | "default" => {
    if (v === "Strong ROI") return "green";
    if (v === "Moderate ROI") return "amber";
    if (v === "Poor ROI") return "red";
    return "default";
  };

  const faqItems = [
    {
      question: `What is the ROI of ${school.name}?`,
      answer: school.roi_score
        ? `${school.name} has an ROI score of ${school.roi_score}/100, rated as "${school.roi_verdict}". This factors in graduate earnings, student debt, and graduation rate.`
        : `ROI data for ${school.name} is currently unavailable.`,
    },
    {
      question: `What do ${school.name} graduates earn?`,
      answer: school.median_earnings_10yr
        ? `The median earnings for ${school.name} graduates 10 years after enrollment is ${formatCurrency(school.median_earnings_10yr)}.`
        : `Earnings data for ${school.name} is currently unavailable.`,
    },
    {
      question: `How much debt do ${school.name} students graduate with?`,
      answer: school.median_debt
        ? `The median federal student loan debt for ${school.name} graduates is ${formatCurrency(school.median_debt)}.`
        : `Debt data for ${school.name} is currently unavailable.`,
    },
  ];

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "Colleges", href: "/college" },
          { label: school.name },
        ]}
      />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{school.name}</h1>
          <p className="mt-1 text-gray-500">
            {school.city}, {school.state} &middot; {school.type}
          </p>
        </div>
        {school.roi_verdict && (
          <ROIBadge
            verdict={school.roi_verdict}
            score={school.roi_score ?? undefined}
            size="lg"
          />
        )}
      </div>

      {/* Metrics */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Median Earnings (10yr)"
          value={school.median_earnings_10yr ? formatCurrency(school.median_earnings_10yr) : "N/A"}
          color={verdictColor(school.roi_verdict)}
        />
        <MetricCard
          label="Median Debt"
          value={school.median_debt ? formatCurrency(school.median_debt) : "N/A"}
        />
        <MetricCard
          label="Graduation Rate"
          value={school.graduation_rate ? formatPercent(school.graduation_rate) : "N/A"}
        />
        <MetricCard
          label="Net Price (In-State)"
          value={school.net_price_in_state ? formatCurrency(school.net_price_in_state) : "N/A"}
        />
      </div>

      {/* Majors Table */}
      {majors.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Programs &amp; Majors
          </h2>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-600">
                <tr>
                  <th className="px-4 py-3">Major</th>
                  <th className="px-4 py-3">Median Earnings</th>
                  <th className="px-4 py-3">Median Debt</th>
                  <th className="px-4 py-3">ROI Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {majors.map((m: Record<string, unknown>) => (
                  <tr
                    key={String(m.major_id)}
                    className="transition-colors hover:bg-indigo-50/50"
                  >
                    <td className="px-4 py-3 font-medium">
                      {(m.majors as { name: string; slug: string })?.name ?? "Unknown"}
                    </td>
                    <td className="px-4 py-3">
                      {m.median_earnings ? formatCurrency(m.median_earnings as number) : "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      {m.median_debt ? formatCurrency(m.median_debt as number) : "N/A"}
                    </td>
                    <td className="px-4 py-3">{m.roi_score != null ? String(m.roi_score) : "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <FAQSection items={faqItems} />
    </main>
  );
}
