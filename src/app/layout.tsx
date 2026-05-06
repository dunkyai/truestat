import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TrueStat - Is Your College Degree Worth It?",
    template: "%s | TrueStat",
  },
  description:
    "Compare college ROI, graduate salaries, and student debt data for 6,000+ schools. Make smarter education decisions with real data.",
  metadataBase: new URL("https://truestat.co"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <footer className="border-t border-gray-200 bg-white px-4 py-8 text-center text-sm text-gray-500">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-4">
            <Link href="/" className="hover:text-indigo-600">Home</Link>
            <span className="text-gray-300">|</span>
            <Link href="/college" className="hover:text-indigo-600">College ROI</Link>
            <span className="text-gray-300">|</span>
            <Link href="/blog" className="hover:text-indigo-600">Blog</Link>
          </div>
          <p className="mt-3 text-xs text-gray-400">
            Data from U.S. Department of Education
          </p>
        </footer>
      </body>
    </html>
  );
}
