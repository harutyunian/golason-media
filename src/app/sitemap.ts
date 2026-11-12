import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { EDITORIAL_ARTICLES } from "@/lib/editorialData";

export const dynamic = "force-dynamic";

const BLOCKED_OFFTOPIC_SLUGS = new Set([
  "what-is-xg-in-shimano-reel",
  "what-is-xg-in-centrifugation",
  "what-is-xg-in-hockey",
  "how-does-var-work-in-java",
  "how-does-var-work-in-css",
  "how-does-var-work-in-tennis",
  "how-does-var-work-in-rugby",
  "how-does-champions-league-qualifying-work",
  "what-is-xg-in-soccer",
  "what-is-xg-in-football-stats",
  "what-is-xg-in-soccer-stats",
  "what-is-xg-in-football-terms",
  "how-does-var-work-in-soccer",
]);

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
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const slugs = new Set<string>();
  const matchIds = new Set<string>();
  try {
    const snapPath = path.join(process.cwd(), "src/lib/realDataSnapshot.json");
    if (fs.existsSync(snapPath)) {
      const snap = JSON.parse(fs.readFileSync(snapPath, "utf-8"));
      (snap.articles || []).forEach((a: Record<string, unknown>) => {
        const s = String(a.slug || "").trim();
        if (s && !BLOCKED_OFFTOPIC_SLUGS.has(s)) slugs.add(s);
      });
      (snap.matches || []).forEach((m: Record<string, unknown>) => {
        if (m.id) matchIds.add(String(m.id));
      });
    }
  } catch {
    // Ignore
  }
  (EDITORIAL_ARTICLES || []).forEach((a) => {
    if (a.slug && !BLOCKED_OFFTOPIC_SLUGS.has(a.slug)) slugs.add(a.slug);
  });

  const articleRoutes: MetadataRoute.Sitemap = Array.from(slugs).map((slug) => ({
    url: `${baseUrl}/news/${slug}`,
    lastModified: now,
    changeFrequency: "hourly",
    priority: 0.85,
  }));

  const matchRoutes: MetadataRoute.Sitemap = Array.from(matchIds).map((id) => ({
    url: `${baseUrl}/matches/${id}`,
    lastModified: now,
    changeFrequency: "always",
    priority: 0.8,
  }));

  return [...staticRoutes, ...articleRoutes, ...matchRoutes];
}
