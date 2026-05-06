import type { MetadataRoute } from "next";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://truestat.co";

const STATE_NAMES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California",
  "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina",
  "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
  "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/college`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // State pages
  const statePages: MetadataRoute.Sitemap = STATE_NAMES.map((name) => ({
    url: `${BASE_URL}/college/states/${name.toLowerCase().replace(/\s+/g, "-")}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog posts
  const posts = getAllPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic pages from Supabase
  let schoolPages: MetadataRoute.Sitemap = [];
  let majorPages: MetadataRoute.Sitemap = [];

  if (isSupabaseConfigured()) {
    const [schoolsResult, majorsResult] = await Promise.all([
      supabase.from("schools").select("slug"),
      supabase.from("majors").select("slug"),
    ]);

    if (schoolsResult.data) {
      schoolPages = schoolsResult.data.map((school: { slug: string }) => ({
        url: `${BASE_URL}/college/schools/${school.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
    }

    if (majorsResult.data) {
      majorPages = majorsResult.data.map((major: { slug: string }) => ({
        url: `${BASE_URL}/college/majors/${major.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
    }
  }

  return [...staticPages, ...statePages, ...blogPages, ...schoolPages, ...majorPages];
}
