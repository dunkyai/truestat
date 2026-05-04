import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Data Insights & Analysis | TrueStat",
  description:
    "In-depth analysis of college ROI, earnings data, and higher education trends. Data-driven insights to help you make smarter decisions about your education investment.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Data Insights & Analysis
      </h1>
      <p className="text-gray-600 mb-10">
        Research, analysis, and insights on college ROI and higher education
        outcomes.
      </p>

      {posts.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 text-lg">Blog posts coming soon.</p>
          <p className="text-gray-400 mt-2">
            We're working on data-driven insights about college ROI.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border border-gray-200 rounded-lg p-6 hover:border-indigo-300 hover:shadow-sm transition-all"
            >
              <Link href={`/blog/${post.slug}`} className="block group">
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  {post.description}
                </p>
                <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                  <time dateTime={post.date}>
                    {new Date(post.date + "T00:00:00").toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </time>
                  <span className="text-gray-300">|</span>
                  <span>{post.author}</span>
                </div>
              </Link>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
