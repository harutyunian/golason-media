import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { MOCK_NEWS } from "@/lib/mockData";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

function findArticleBySlug(slug: string) {
  const fromMock = (MOCK_NEWS || []).find((m) => m.slug === slug);
  if (fromMock) {
    return {
      slug: fromMock.slug,
      titleRu: fromMock.title.ru,
      titleEn: fromMock.title.en,
      excerptRu: fromMock.summary.ru,
      excerptEn: fromMock.summary.en,
      contentRu: fromMock.content.ru.split("\n\n"),
      contentEn: fromMock.content.en.split("\n\n"),
      keyTakeawaysRu: [fromMock.summary.ru],
      keyTakeawaysEn: [fromMock.summary.en],
      categoryRu: fromMock.categoryLabel?.ru ?? fromMock.category,
      categoryEn: fromMock.categoryLabel?.en ?? fromMock.category,
      source: fromMock.transferSource ?? "Golason Insider",
      author: fromMock.author?.ru ?? "Golason Editorial Desk",
      reliability: fromMock.transferReliabilityPercent ?? 90,
      readingTimeMinutes: fromMock.readTimeMinutes,
      clubTag: fromMock.tags?.[0]?.ru ?? "Football",
    };
  }
  return null;
}

export async function generateStaticParams() {
  return (MOCK_NEWS || []).map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticleBySlug(slug);
  if (!article) {
    return {
      title: "Article Not Found | Golason Media",
    };
  }

  const canonicalUrl = `https://golason.com/news/${article.slug}`;
  return {
    title: `${article.titleRu} | ${article.titleEn} — GOLASON.COM`,
    description: `${article.excerptRu} / ${article.excerptEn}`,
    keywords: [
      article.clubTag,
      article.source,
      "Football News",
      "Transfer Radar",
      "Футбольная Жара",
      "Golason",
      "Трансферы футбола",
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
      description: article.excerptRu,
      siteName: "GOLASON.COM x Футбольная Жара",
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title: article.titleEn,
      description: article.excerptEn,
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = findArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.titleRu,
    alternativeHeadline: article.titleEn,
    description: article.excerptRu,
    author: {
      "@type": "Organization",
      name: article.author || "Golason Editorial Desk",
      url: "https://golason.com",
    },
    publisher: {
      "@type": "Organization",
      name: "GOLASON.COM x Футбольная Жара",
      logo: {
        "@type": "ImageObject",
        url: "https://golason.com/favicon.ico",
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
        backgroundColor: "#F8FAFC",
        color: "#0F172A",
        padding: "24px 16px 64px",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          backgroundColor: "#FFFFFF",
          borderRadius: "20px",
          border: "1px solid #E2E8F0",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
          padding: "clamp(20px, 4vw, 44px)",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#EA580C",
              fontWeight: 800,
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            ← Назад на главную GOLASON.COM / Back to Home
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <span
            style={{
              backgroundColor: "#FFF7ED",
              border: "1px solid #FDBA74",
              color: "#C2410C",
              fontWeight: 800,
              fontSize: "12px",
              padding: "4px 12px",
              borderRadius: "999px",
            }}
          >
            {article.categoryRu} • {article.clubTag}
          </span>
          <span
            style={{
              backgroundColor: "#ECFDF5",
              border: "1px solid #6EE7B7",
              color: "#047857",
              fontWeight: 800,
              fontSize: "12px",
              padding: "4px 12px",
              borderRadius: "999px",
            }}
          >
            Достоверность / Radar: {article.reliability}% ({article.source})
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(24px, 4vw, 36px)",
            lineHeight: 1.2,
            fontWeight: 900,
            color: "#0F172A",
            margin: "0 0 14px 0",
          }}
        >
          {article.titleRu}
        </h1>

        <h2
          style={{
            fontSize: "clamp(17px, 2.5vw, 21px)",
            lineHeight: 1.35,
            fontWeight: 700,
            color: "#475569",
            margin: "0 0 24px 0",
          }}
        >
          🇬🇧 {article.titleEn}
        </h2>

        <p
          style={{
            fontSize: "18px",
            lineHeight: 1.65,
            fontWeight: 600,
            color: "#1E293B",
            backgroundColor: "#F8FAFC",
            borderLeft: "4px solid #EA580C",
            padding: "16px 20px",
            borderRadius: "0 12px 12px 0",
            marginBottom: "28px",
          }}
        >
          {article.excerptRu}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {article.contentRu.map((p, idx) => (
            <p
              key={idx}
              style={{
                fontSize: "16px",
                lineHeight: 1.75,
                color: "#334155",
                margin: 0,
              }}
            >
              {p}
            </p>
          ))}
        </div>

        <hr
          style={{
            margin: "32px 0",
            border: "none",
            borderTop: "1px solid #E2E8F0",
          }}
        />

        <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0F172A" }}>
          🇬🇧 English Summary & Analysis
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {article.contentEn.map((p, idx) => (
            <p
              key={idx}
              style={{
                fontSize: "15px",
                lineHeight: 1.7,
                color: "#475569",
                margin: 0,
              }}
            >
              {p}
            </p>
          ))}
        </div>

        <div
          style={{
            marginTop: "36px",
            padding: "20px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #091324 0%, #102342 100%)",
            color: "#FFFFFF",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div>
            <div style={{ fontWeight: 900, fontSize: "16px", color: "#FFC400" }}>
              🎥 Видео всех голов и моментов без блокировок
            </div>
            <div style={{ fontSize: "13px", color: "#CBD5E1", marginTop: "4px" }}>
              Смотри прямые видеоповторы в нашем Telegram-канале «Футбольная Жара»
            </div>
          </div>
          <a
            href="https://t.me/futbolnaya_jara"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#229ED9",
              color: "#FFFFFF",
              textDecoration: "none",
              fontWeight: 800,
              fontSize: "14px",
              padding: "10px 20px",
              borderRadius: "999px",
            }}
          >
            ✈️ Открыть @futbolnaya_jara
          </a>
        </div>
      </article>
    </div>
  );
}
