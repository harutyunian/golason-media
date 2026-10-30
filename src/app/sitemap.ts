import type { MetadataRoute } from "next";
import { MOCK_NEWS_ARTICLES } from "@/lib/mockData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://golason.com";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "always",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/?lang=ru`,
      lastModified: now,
      changeFrequency: "always",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/?lang=en`,
      lastModified: now,
      changeFrequency: "always",
      priority: 0.95,
    },
  ];

  const articleRoutes: MetadataRoute.Sitemap = (MOCK_NEWS_ARTICLES || []).map(
    (art) => ({
      url: `${baseUrl}/news/${art.slug}`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.85,
    })
  );

  return [...staticRoutes, ...articleRoutes];
}
