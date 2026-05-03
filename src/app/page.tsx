import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TrueStat - Is Your College Degree Worth It?",
  description:
    "Compare college ROI, graduate salaries, and student debt data for 6,000+ schools. Make smarter education decisions with real data.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 px-4 py-24 text-center text-white">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          Is your college degree worth it?
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-indigo-100">
          Compare ROI, graduate salaries, and student debt across 6,000+
          schools. Data-driven decisions for your education.
        </p>
        <div className="mx-auto mt-8 max-w-md">
          <Link
            href="/college"
            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-indigo-700 shadow-lg transition hover:bg-indigo-50 hover:shadow-xl"
          >
            Explore College ROI Data
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
          The Numbers That Matter
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-3xl font-bold text-indigo-600">6,000+</p>
            <p className="mt-1 text-sm text-gray-500">Schools analyzed</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-3xl font-bold text-indigo-600">$104,000</p>
            <p className="mt-1 text-sm text-gray-500">
              Avg difference between top &amp; bottom ROI
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-3xl font-bold text-indigo-600">38%</p>
            <p className="mt-1 text-sm text-gray-500">
              Schools with poor ROI scores
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Start Comparing Schools
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-gray-600">
          Browse by school, state, or major to find the best return on your
          education investment.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/college"
            className="rounded-lg bg-indigo-600 px-6 py-2.5 font-medium text-white transition hover:bg-indigo-700"
          >
            Browse Schools
          </Link>
          <Link
            href="/college/states/california"
            className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Browse by State
          </Link>
        </div>
      </section>
    </main>
  );
}
