import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { EDITORIAL_ARTICLES } from "@/lib/editorialData";
import { MOCK_NEWS } from "@/lib/mockData";
import { EditorialMasthead } from "@/components/editorial/EditorialMasthead";
import { EditorialFooter } from "@/components/editorial/EditorialFooter";
import { AdBannerSlot } from "@/components/editorial/AdBannerSlot";
import { LiveScoreTicker } from "@/components/ticker";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

interface UnifiedArticleView {
  slug: string;
  category: string;
  categoryRu: string;
  categoryEn: string;
  titleRu: string;
  titleEn: string;
  subtitleRu: string;
  subtitleEn: string;
  bodyRu: string[];
  bodyEn: string[];
  authorRu: string;
  authorEn: string;
  authorRoleRu: string;
  publishedAtRu: string;
  publishedAtEn: string;
  readTimeMinutes: number;
  imageUrl: string;
  imageCaptionRu: string;
  clubNameRu: string;
  relatedMatchId?: string;
  reliability?: number;
  source?: string;
}

function findArticleBySlug(slug: string): UnifiedArticleView | null {
  const fromEditorial = (EDITORIAL_ARTICLES || []).find((a) => a.slug === slug);
  if (fromEditorial) {
    return {
      slug: fromEditorial.slug,
      category: fromEditorial.category,
      categoryRu: fromEditorial.categoryLabelRu,
      categoryEn: fromEditorial.categoryLabelEn,
      titleRu: fromEditorial.titleRu,
      titleEn: fromEditorial.titleEn,
      subtitleRu: fromEditorial.subtitleRu,
      subtitleEn: fromEditorial.subtitleEn,
      bodyRu: fromEditorial.bodyRu,
      bodyEn: fromEditorial.bodyEn,
      authorRu: fromEditorial.authorRu,
      authorEn: fromEditorial.authorEn,
      authorRoleRu: fromEditorial.authorRoleRu || "Обозреватель GOLASON",
      publishedAtRu: fromEditorial.publishedAtRu,
      publishedAtEn: fromEditorial.publishedAtEn,
      readTimeMinutes: fromEditorial.readTimeMinutes,
      imageUrl: fromEditorial.imageUrl,
      imageCaptionRu:
        fromEditorial.imageCaptionRu ||
        `${fromEditorial.clubNameRu || "Футбол"} — Фото: ESPN Images`,
      clubNameRu: fromEditorial.clubNameRu || fromEditorial.categoryLabelRu,
      relatedMatchId: fromEditorial.relatedMatchId,
      reliability: fromEditorial.transferReliability,
      source: fromEditorial.transferSource,
    };
  }

  const fromMock = (MOCK_NEWS || []).find((m) => m.slug === slug);
  if (fromMock) {
    return {
      slug: fromMock.slug,
      category: fromMock.category,
      categoryRu: fromMock.categoryLabel?.ru ?? fromMock.category,
      categoryEn: fromMock.categoryLabel?.en ?? fromMock.category,
      titleRu: fromMock.title.ru,
      titleEn: fromMock.title.en,
      subtitleRu: fromMock.summary.ru,
      subtitleEn: fromMock.summary.en,
      bodyRu: fromMock.content.ru.split("\n\n"),
      bodyEn: fromMock.content.en.split("\n\n"),
      authorRu: fromMock.author?.ru ?? "Редакция GOLASON",
      authorEn: fromMock.author?.en ?? "GOLASON Editorial Desk",
      authorRoleRu: "Спортивный обозреватель",
      publishedAtRu: "30 октября 2026",
      publishedAtEn: "October 30, 2026",
      readTimeMinutes: fromMock.readTimeMinutes,
      imageUrl:
        fromMock.imageUrl && fromMock.imageUrl.startsWith("http")
          ? fromMock.imageUrl
          : "https://a.espncdn.com/photo/2026/1030/r1738494_1296x729_16-9.jpg",
      imageCaptionRu: "Фото: ESPN Images / GOLASON",
      clubNameRu: fromMock.tags?.[0]?.ru ?? "Футбол",
      relatedMatchId: fromMock.relatedMatchId || "ucl-rma-mci",
      reliability: fromMock.transferReliabilityPercent,
      source: fromMock.transferSource,
    };
  }

  return null;
}

export async function generateStaticParams() {
  const slugs = new Set<string>();
  (EDITORIAL_ARTICLES || []).forEach((a) => slugs.add(a.slug));
  (MOCK_NEWS || []).forEach((m) => slugs.add(m.slug));
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticleBySlug(slug);
  if (!article) {
    return {
      title: "Материал не найден | GOLASON.COM",
    };
  }

  const canonicalUrl = `https://golason.com/news/${article.slug}`;
  return {
    title: `${article.titleRu} — GOLASON.COM`,
    description: article.subtitleRu,
    keywords: [
      article.clubNameRu,
      article.categoryRu,
      "Футбол",
      "Новости футбола",
      "Футбольная Жара",
      "Golason",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "ru-RU": `${canonicalUrl}?lang=ru`,
        "en-US": `${canonicalUrl}?lang=en`,
      },
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: article.titleRu,
      description: article.subtitleRu,
      siteName: "GOLASON.COM x Футбольная Жара",
      images: [{ url: article.imageUrl, width: 1296, height: 729 }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.titleRu,
      description: article.subtitleRu,
      images: [article.imageUrl],
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = findArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  const relatedArticles = (EDITORIAL_ARTICLES || [])
    .filter((a) => a.slug !== article.slug)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.titleRu,
    alternativeHeadline: article.titleEn,
    description: article.subtitleRu,
    image: [article.imageUrl],
    author: {
      "@type": "Person",
      name: article.authorRu,
    },
    publisher: {
      "@type": "Organization",
      name: "GOLASON.COM x Футбольная Жара",
      logo: {
        "@type": "ImageObject",
        url: "https://golason.com/logo.jpg",
      },
    },
    mainEntityOfPage: `https://golason.com/news/${article.slug}`,
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FFFFFF",
        color: "#111827",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <EditorialMasthead activePath="/news" />
      <LiveScoreTicker lang="ru" />

      {/* Top Leaderboard Ad Slot (reloads on every article pageview) */}
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "20px 20px 0",
        }}
      >
        <AdBannerSlot variant="leaderboard" lang="ru" />
      </div>

      {/* Main Newspaper 8 + 4 Column Article Layout */}
      <main
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "28px 20px 64px",
        }}
      >
        {/* Breadcrumb Wayfinding */}
        <nav
          aria-label="Breadcrumb"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "#6B7280",
            marginBottom: "20px",
            borderBottom: "1px solid #E5E7EB",
            paddingBottom: "12px",
          }}
        >
          <Link href="/" style={{ color: "#111827", textDecoration: "none" }}>
            ГЛАВНАЯ
          </Link>
          <span>/</span>
          <Link
            href="/news"
            style={{ color: "#111827", textDecoration: "none" }}
          >
            НОВОСТИ И СТАТЬИ
          </Link>
          <span>/</span>
          <span style={{ color: "#DC2626" }}>{article.categoryRu}</span>
        </nav>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "40px",
            alignItems: "start",
          }}
        >
          {/* Left Reading Column (max 760px measure) */}
          <article style={{ gridColumn: "span 2", maxWidth: "820px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "12px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#DC2626",
                }}
              >
                {article.categoryRu} • {article.clubNameRu}
              </span>
              {article.reliability && (
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#047857",
                    backgroundColor: "#ECFDF5",
                    border: "1px solid #A7F3D0",
                    padding: "2px 8px",
                    borderRadius: "4px",
                  }}
                >
                  Индекс достоверности: {article.reliability}% (
                  {article.source || "Инсайд редакции"})
                </span>
              )}
            </div>

            <h1
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(26px, 3.8vw, 40px)",
                lineHeight: 1.15,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#111827",
                margin: "0 0 16px 0",
              }}
            >
              {article.titleRu}
            </h1>

            <p
              style={{
                fontSize: "clamp(17px, 2vw, 20px)",
                lineHeight: 1.55,
                color: "#374151",
                fontWeight: 400,
                margin: "0 0 20px 0",
              }}
            >
              {article.subtitleRu}
            </p>

            {/* Author Byline & Share Strip */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
                padding: "14px 0",
                borderTop: "1px solid #E5E7EB",
                borderBottom: "1px solid #E5E7EB",
                marginBottom: "24px",
                fontSize: "13px",
                color: "#4B5563",
              }}
            >
              <div>
                <strong style={{ color: "#111827" }}>{article.authorRu}</strong>{" "}
                <span>• {article.authorRoleRu}</span>
                <span style={{ margin: "0 8px", color: "#D1D5DB" }}>|</span>
                <span>{article.publishedAtRu}</span>
                <span style={{ margin: "0 8px", color: "#D1D5DB" }}>|</span>
                <span>{article.readTimeMinutes} мин чтения</span>
              </div>

              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                {article.relatedMatchId && (
                  <Link
                    href={`/matches/${article.relatedMatchId}`}
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#DC2626",
                      textDecoration: "none",
                      border: "1px solid #FECACA",
                      backgroundColor: "#FEF2F2",
                      padding: "5px 10px",
                      borderRadius: "4px",
                    }}
                  >
                    Матч-центр и составы →
                  </Link>
                )}
              </div>
            </div>

            {/* 16:9 Remote ESPN Press Photo + Caption */}
            <figure style={{ margin: "0 0 28px 0" }}>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16 / 9",
                  backgroundColor: "#F3F4F6",
                  overflow: "hidden",
                  border: "1px solid #E5E7EB",
                }}
              >
                <img
                  src={article.imageUrl}
                  alt={article.titleRu}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
              <figcaption
                style={{
                  fontSize: "12px",
                  color: "#6B7280",
                  paddingTop: "8px",
                  lineHeight: 1.4,
                }}
              >
                {article.imageCaptionRu}
              </figcaption>
            </figure>

            {/* Article Body Paragraphs with Mid-Article Ad Slot */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                fontSize: "17px",
                lineHeight: 1.75,
                color: "#1F2937",
              }}
            >
              {article.bodyRu.map((para, idx) => (
                <React.Fragment key={idx}>
                  <p style={{ margin: 0 }}>{para}</p>
                  {idx === 1 && (
                    <div style={{ margin: "12px 0" }}>
                      <AdBannerSlot variant="in-article" lang="ru" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* English Edition Summary Box */}
            <div
              style={{
                marginTop: "36px",
                padding: "24px",
                backgroundColor: "#F9FAFB",
                border: "1px solid #E5E7EB",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#6B7280",
                  marginBottom: "8px",
                }}
              >
                ENGLISH EDITION SUMMARY
              </div>
              <h2
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#111827",
                  margin: "0 0 12px 0",
                }}
              >
                {article.titleEn}
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  fontSize: "15px",
                  lineHeight: 1.65,
                  color: "#374151",
                }}
              >
                {article.bodyEn.slice(0, 3).map((para, idx) => (
                  <p key={idx} style={{ margin: 0 }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Related Stories Grid at Bottom of Article */}
            <section
              style={{
                marginTop: "48px",
                paddingTop: "28px",
                borderTop: "2px solid #111827",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  margin: "0 0 20px 0",
                }}
              >
                Читайте также по теме
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
                  gap: "20px",
                }}
              >
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/news/${rel.slug}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      border: "1px solid #E5E7EB",
                      padding: "12px",
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: "16 / 9",
                        overflow: "hidden",
                        backgroundColor: "#F3F4F6",
                      }}
                    >
                      <img
                        src={rel.imageUrl}
                        alt={rel.titleRu}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        color: "#DC2626",
                      }}
                    >
                      {rel.categoryLabelRu}
                    </span>
                    <div
                      style={{
                        fontFamily: "Georgia, 'Times New Roman', serif",
                        fontSize: "15px",
                        fontWeight: 700,
                        lineHeight: 1.35,
                        color: "#111827",
                      }}
                    >
                      {rel.titleRu}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </article>

          {/* Right Sidebar: 300x250 Ad Slot + Most Read Stories + Live Match Center Link */}
          <aside
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "28px",
              borderLeft: "1px solid #E5E7EB",
              paddingLeft: "24px",
            }}
          >
            <AdBannerSlot variant="sidebar-mpu" lang="ru" />

            <div
              style={{
                borderTop: "2px solid #111827",
                paddingTop: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#111827",
                  marginBottom: "16px",
                }}
              >
                Главные материалы дня
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {(EDITORIAL_ARTICLES || []).slice(0, 5).map((item, idx) => (
                  <Link
                    key={item.slug}
                    href={`/news/${item.slug}`}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "28px 1fr 76px",
                      gap: "10px",
                      alignItems: "start",
                      textDecoration: "none",
                      color: "inherit",
                      paddingBottom: "14px",
                      borderBottom: "1px solid #E5E7EB",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Georgia, serif",
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "#DC2626",
                        lineHeight: 1,
                      }}
                    >
                      0{idx + 1}
                    </span>
                    <div>
                      <div
                        style={{
                          fontSize: "13.5px",
                          fontWeight: 700,
                          lineHeight: 1.35,
                          color: "#111827",
                        }}
                      >
                        {item.titleRu}
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#6B7280",
                          marginTop: "4px",
                        }}
                      >
                        {item.categoryLabelRu} • {item.readTimeMinutes} мин
                      </div>
                    </div>
                    <img
                      src={item.imageUrl}
                      alt={item.titleRu}
                      style={{
                        width: "76px",
                        height: "48px",
                        objectFit: "cover",
                        border: "1px solid #E5E7EB",
                      }}
                    />
                  </Link>
                ))}
              </div>
            </div>

            <div
              style={{
                padding: "20px",
                backgroundColor: "#F9FAFB",
                border: "1px solid #E5E7EB",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  color: "#DC2626",
                  marginBottom: "6px",
                }}
              >
                ПРЯМОЙ ЭФИР И ХАЙЛАЙТЫ
              </div>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#111827",
                  marginBottom: "10px",
                }}
              >
                Видео всех голов без блокировок в нашем Telegram «Футбольная Жара»
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <a
                  href="https://t.me/futbolnaya_jara"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    textAlign: "center",
                    backgroundColor: "#111827",
                    color: "#FFFFFF",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: 700,
                    padding: "10px 14px",
                  }}
                >
                  Перейти в Telegram @futbolnaya_jara →
                </a>
                <Link
                  href="/live"
                  style={{
                    display: "block",
                    textAlign: "center",
                    backgroundColor: "#FFFFFF",
                    color: "#111827",
                    border: "1px solid #D1D5DB",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: 700,
                    padding: "10px 14px",
                  }}
                >
                  Открыть Матч-центр LIVE →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <EditorialFooter lang="ru" />
    </div>
  );
}
