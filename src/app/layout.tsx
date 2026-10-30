import type { Metadata, Viewport } from "next";
import React from "react";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#091324" },
  ],
};

export const metadata: Metadata = {
  title: {
    default:
      "GOLASON.COM x ФУТБОЛЬНАЯ ЖАРА — Футбольные Новости, Трансферы, Составы и Таблицы (Live Football News)",
    template: "%s | GOLASON.COM",
  },
  description:
    "Двуязычный (RU/EN) футбольный медиа-портал: свежие новости футбола, Радар Трансферов (Tier 1-3), стартовые составы в стиле Sofascore, карточки замен, таблицы лиг и видео голов в Telegram @futbolnaya_jara.",
  keywords: [
    "футбол",
    "футбольные новости",
    "трансферы футбола",
    "Футбольная Жара",
    "Golason",
    "стартовые составы",
    "таблицы лиг",
    "Ла Лига",
    "АПЛ",
    "Лига Чемпионов",
    "Реал Мадрид",
    "Барселона",
    "football news",
    "transfer radar",
    "tactical lineups",
    "live football scores",
  ],
  metadataBase: new URL("https://golason.com"),
  alternates: {
    canonical: "https://golason.com",
    languages: {
      "ru-RU": "https://golason.com/?lang=ru",
      "en-US": "https://golason.com/?lang=en",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "GOLASON.COM x ФУТБОЛЬНАЯ ЖАРА — Football News, Lineups & Transfer Radar",
    description:
      "Свежие футбольные инсайды, Радар Трансферов, тактические схемы составов в стиле Sofascore, замены и видео голов 24/7.",
    url: "https://golason.com",
    siteName: "GOLASON.COM x Футбольная Жара",
    locale: "ru_RU",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GOLASON.COM x ФУТБОЛЬНАЯ ЖАРА — Football News & Tactical Lineups",
    description:
      "Bilingual (RU/EN) Football News, Transfer Reliability Radar, Sofascore Tactical Lineups & Live Match Highlights.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "GOLASON.COM x Футбольная Жара",
    url: "https://golason.com",
    sameAs: ["https://t.me/futbolnaya_jara"],
    description:
      "Bilingual (RU/EN) Football News, Tactical Lineups, Transfer Reliability Radar & Live Match Center.",
  };

  return (
    <html lang="ru" data-golason-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Montserrat:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              *, *::before, *::after {
                box-sizing: border-box;
              }
              html, body {
                margin: 0;
                padding: 0;
                max-width: 100vw;
                overflow-x: hidden;
                -webkit-text-size-adjust: 100%;
              }
              html[data-golason-theme="light"] body {
                background-color: #F1F5F9 !important;
                color: #0F172A !important;
              }
              html[data-golason-theme="dark"] body {
                background-color: #060D1A !important;
                color: #F8FAFC !important;
              }
              /* Mobile responsive rules */
              @media (max-width: 768px) {
                .golason-header-inner {
                  padding: 10px 12px !important;
                  gap: 10px !important;
                }
                .golason-nav-scroll {
                  width: 100% !important;
                  overflow-x: auto !important;
                  flex-wrap: nowrap !important;
                  padding-bottom: 4px !important;
                  -webkit-overflow-scrolling: touch;
                }
                .golason-nav-scroll button {
                  white-space: nowrap !important;
                  flex-shrink: 0 !important;
                  font-size: 12px !important;
                  padding: 7px 12px !important;
                }
                .golason-main-container {
                  padding: 16px 12px 48px !important;
                  gap: 28px !important;
                }
                .golason-two-col-grid {
                  grid-template-columns: 1fr !important;
                  gap: 20px !important;
                }
                .golason-pitch-scroll-wrap {
                  width: 100% !important;
                  overflow-x: auto !important;
                  -webkit-overflow-scrolling: touch;
                }
                .golason-pitch-scroll-wrap > div {
                  min-width: 680px;
                }
                .golason-controls-row {
                  width: 100% !important;
                  justify-content: space-between !important;
                  flex-wrap: wrap !important;
                }
              }
            `,
          }}
        />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#F1F5F9",
          color: "#0F172A",
          fontFamily:
            "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        {children}
      </body>
    </html>
  );
}
