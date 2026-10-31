import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { EDITORIAL_ARTICLES, EDITORIAL_MATCHES } from "@/lib/editorialData";
import { MOCK_NEWS } from "@/lib/mockData";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://golason.com";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "always", priority: 1.0 },
    { url: `${baseUrl}/news`, lastModified: now, changeFrequency: "always", priority: 0.95 },
    { url: `${baseUrl}/live`, lastModified: now, changeFrequency: "always", priority: 0.95 },
    { url: `${baseUrl}/transfers`, lastModified: now, changeFrequency: "hourly", priority: 0.9 },
    { url: `${baseUrl}/standings`, lastModified: now, changeFrequency: "hourly", priority: 0.9 },
    { url: `${baseUrl}/search`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
  ];

  const slugs = new Set<string>();
  try {
    const snapPath = path.join(process.cwd(), "src/lib/realDataSnapshot.json");
    if (fs.existsSync(snapPath)) {
      const snap = JSON.parse(fs.readFileSync(snapPath, "utf-8"));
      (snap.articles || []).forEach((a: Record<string, unknown>) => {
        if (a.slug) slugs.add(String(a.slug));
      });
    }
  } catch {
    // Ignore
  }
  (EDITORIAL_ARTICLES || []).forEach((a) => slugs.add(a.slug));
  (MOCK_NEWS || []).forEach((m) => slugs.add(m.slug));

  const articleRoutes: MetadataRoute.Sitemap = Array.from(slugs).map((slug) => ({
    url: `${baseUrl}/news/${slug}`,
    lastModified: now,
    changeFrequency: "hourly",
    priority: 0.85,
  }));

  const matchRoutes: MetadataRoute.Sitemap = (EDITORIAL_MATCHES || []).map((m) => ({
    url: `${baseUrl}/matches/${m.id}`,
    lastModified: now,
    changeFrequency: "always",
    priority: 0.85,
  }));

  return [...staticRoutes, ...articleRoutes, ...matchRoutes];
}
