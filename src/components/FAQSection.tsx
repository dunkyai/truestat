"use client";

import { useState } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQSection({
  items,
  title = "Frequently Asked Questions",
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="mt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="mb-6 text-2xl font-bold text-gray-900">{title}</h2>
      <div className="divide-y divide-gray-200 rounded-lg border border-gray-200">
        {items.map((item, i) => (
          <div key={i}>
            <button
              className="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-gray-900 hover:bg-gray-50"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
            >
              <span>{item.question}</span>
              <svg
                className={`h-5 w-5 shrink-0 text-gray-500 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 text-gray-600">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
