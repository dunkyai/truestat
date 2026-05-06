"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          TrueStat
        </Link>

        {/* Desktop links */}
        <div className="hidden gap-6 sm:flex">
          <Link
            href="/college"
            className="text-sm font-medium text-gray-700 transition hover:text-indigo-600"
          >
            College ROI
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-gray-700 transition hover:text-indigo-600"
          >
            Blog
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 sm:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          {menuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-gray-200 px-4 pb-3 pt-2 sm:hidden">
          <Link
            href="/college"
            className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
            onClick={() => setMenuOpen(false)}
          >
            College ROI
          </Link>
          <Link
            href="/blog"
            className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </Link>
        </div>
      )}
    </nav>
  );
}
