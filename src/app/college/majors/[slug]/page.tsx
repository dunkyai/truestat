import Link from "next/link";
import type { Metadata } from "next";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { generateMajorTitle, formatCurrency } from "@/lib/seo";
import type { Major } from "@/lib/types";
import MetricCard from "@/components/MetricCard";
import ROIBadge from "@/components/ROIBadge";
import BreadcrumbNav from "@/components/BreadcrumbNav";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getMajor(slug: string): Promise<Major | null> {
  if (!isSupabaseConfigured()) return null;
  const { data } = await supabase
    .from("majors")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

async function getSchoolsForMajor(majorId: string) {
  if (!isSupabaseConfigured()) return [];
  const { data } = await supabase
    .from("school_majors")
    .select("*, schools(name, slug, state)")
    .eq("major_id", majorId)
    .order("roi_score", { ascending: false })
    .limit(50);
  return data ?? [];
}

export async function generateStaticParams() {
  if (!isSupabaseConfigured()) return [];
  const { data } = await supabase.from("majors").select("slug");
  return (data ?? []).map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const major = await getMajor(slug);
  if (!major) {
    return { title: "Major Not Found | TrueStat" };
  }
  return {
    title: generateMajorTitle(major.name),
    description: `${major.name} degree ROI data. Median earnings: ${major.median_earnings ? formatCurrency(major.median_earnings) : "N/A"}. Compare schools offering this major.`,
  };
}

export default async function MajorPage({ params }: PageProps) {
  const { slug } = await params;
  const major = await getMajor(slug);

  if (!major) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Major not found</h1>
      </main>
    );
  }

  const schools = await getSchoolsForMajor(major.id);

  const verdict =
    major.roi_score !== null
      ? major.roi_score >= 70
        ? "Strong ROI"
        : major.roi_score >= 50
          ? "Moderate ROI"
          : "Poor ROI"
      : null;

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "Colleges", href: "/college" },
          { label: major.name },
        ]}
      />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">
          {major.name} Degree
        </h1>
        {verdict && (
          <ROIBadge
            verdict={verdict}
            score={major.roi_score ?? undefined}
            size="lg"
          />
        )}
      </div>

      {/* Metrics */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <MetricCard
          label="Median Earnings"
          value={
            major.median_earnings ? formatCurrency(major.median_earnings) : "N/A"
          }
        />
        <MetricCard
          label="Median Debt"
          value={major.median_debt ? formatCurrency(major.median_debt) : "N/A"}
        />
        <MetricCard
          label="ROI Score"
          value={major.roi_score !== null ? `${major.roi_score}/100` : "N/A"}
          color={
            verdict === "Strong ROI"
              ? "green"
              : verdict === "Moderate ROI"
                ? "amber"
                : verdict === "Poor ROI"
                  ? "red"
                  : "default"
          }
        />
      </div>

      {/* Best Schools for Major */}
      {schools.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Best Schools for {major.name}
          </h2>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-600">
                <tr>
                  <th className="px-4 py-3">School</th>
                  <th className="px-4 py-3">State</th>
                  <th className="px-4 py-3">Median Earnings</th>
                  <th className="px-4 py-3">Median Debt</th>
                  <th className="px-4 py-3">ROI Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {schools.map((sm: Record<string, unknown>) => {
                  const school = sm.schools as { name: string; slug: string; state: string } | null;
                  return (
                    <tr
                      key={String(sm.school_id)}
                      className="transition-colors hover:bg-indigo-50/50"
                    >
                      <td className="px-4 py-3">
                        {school ? (
                          <Link
                            href={`/college/schools/${school.slug}`}
                            className="font-medium text-indigo-600 hover:underline"
                          >
                            {school.name}
                          </Link>
                        ) : (
                          "Unknown"
                        )}
                      </td>
                      <td className="px-4 py-3">{school?.state ?? "N/A"}</td>
                      <td className="px-4 py-3">
                        {sm.median_earnings
                          ? formatCurrency(sm.median_earnings as number)
                          : "N/A"}
                      </td>
                      <td className="px-4 py-3">
                        {sm.median_debt
                          ? formatCurrency(sm.median_debt as number)
                          : "N/A"}
                      </td>
                      <td className="px-4 py-3">{sm.roi_score != null ? String(sm.roi_score) : "N/A"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </main>
  );
}
