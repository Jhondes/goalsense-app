import type { MetadataRoute } from "next";

const baseUrl = "https://goalsense.live";

const pages = [
  {
    path: "",
    changeFrequency: "daily",
    priority: 1,
  },
  {
    path: "/pricing",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    path: "/login",
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    path: "/privacy",
    changeFrequency: "yearly",
    priority: 0.3,
  },

  // SEO Pages
  {
    path: "/today-football-predictions",
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    path: "/over-2.5-predictions",
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    path: "/btts-predictions",
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    path: "/premier-league-predictions",
    changeFrequency: "daily",
    priority: 0.9,
  },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}