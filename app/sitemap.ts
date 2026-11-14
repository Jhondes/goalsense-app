
import type { MetadataRoute } from "next";

const baseUrl = "https://goalsense.live";

const pages = [
  // Main website
  {
    path: "",
    changeFrequency: "daily",
    priority: 1,
  },
  {
    path: "/about",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/pricing",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    path: "/contact",
    changeFrequency: "monthly",
    priority: 0.5,
  },

  // Football prediction SEO pages
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

  // Insights and educational hub
  {
    path: "/insights",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    path: "/insights/academy",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    path: "/insights/football-statistics",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    path: "/insights/market-education",
    changeFrequency: "weekly",
    priority: 0.8,
  },

  // Educational articles
  {
    path: "/insights/articles/how-to-interpret-team-form",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/insights/articles/understanding-common-football-markets",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/insights/articles/why-football-statistics-matter",
    changeFrequency: "monthly",
    priority: 0.7,
  },

  // Brand and company
  {
    path: "/ambassadors",
    changeFrequency: "monthly",
    priority: 0.6,
  },

  // Legal pages
  {
    path: "/privacy",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/terms",
    changeFrequency: "yearly",
    priority: 0.3,
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
