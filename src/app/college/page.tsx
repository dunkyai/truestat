import Link from "next/link";
import type { Metadata } from "next";
import ROIBadge from "@/components/ROIBadge";

export const metadata: Metadata = {
  title: "College ROI Rankings | TrueStat",
  description:
    "Compare return on investment for 6,000+ colleges. Sort by earnings, debt, graduation rate, and ROI score.",
};

const PLACEHOLDER_SCHOOLS = [
  {
    name: "Massachusetts Institute of Technology",
    slug: "massachusetts-institute-of-technology",
    state: "MA",
    earnings: "$124,200",
    debt: "$12,000",
    roi_score: 95,
    roi_verdict: "Strong ROI",
  },
  {
    name: "Stanford University",
    slug: "stanford-university",
    state: "CA",
    earnings: "$118,400",
    debt: "$14,500",
    roi_score: 93,
    roi_verdict: "Strong ROI",
  },
  {
    name: "Georgia Institute of Technology",
    slug: "georgia-institute-of-technology",
    state: "GA",
    earnings: "$96,800",
    debt: "$18,200",
    roi_score: 88,
    roi_verdict: "Strong ROI",
  },
  {
    name: "University of California, Berkeley",
    slug: "university-of-california-berkeley",
    state: "CA",
    earnings: "$89,600",
    debt: "$16,000",
    roi_score: 85,
    roi_verdict: "Strong ROI",
  },
  {
    name: "University of Michigan",
    slug: "university-of-michigan",
    state: "MI",
    earnings: "$78,400",
    debt: "$22,000",
    roi_score: 76,
    roi_verdict: "Strong ROI",
  },
];

const STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
];

function stateSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export default function CollegePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
        College ROI Rankings
      </h1>
      <p className="mt-2 text-lg text-gray-600">
        Find the colleges with the best return on your education investment.
      </p>

      {/* Top ROI Schools */}
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Top ROI Schools
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
              {PLACEHOLDER_SCHOOLS.map((s) => (
                <tr
                  key={s.slug}
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
                  <td className="px-4 py-3">{s.state}</td>
                  <td className="px-4 py-3">{s.earnings}</td>
                  <td className="px-4 py-3">{s.debt}</td>
                  <td className="px-4 py-3">
                    <ROIBadge
                      verdict={s.roi_verdict}
                      score={s.roi_score}
                      size="sm"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Browse by State */}
      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Browse by State
        </h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {STATES.map((state) => (
            <Link
              key={state}
              href={`/college/states/${stateSlug(state)}`}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
            >
              {state}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
