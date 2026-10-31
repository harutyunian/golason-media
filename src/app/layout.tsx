import type { Metadata, Viewport } from "next";
import React from "react";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FFFFFF",
};

export const metadata: Metadata = {
  title: {
    default:
      "GOLASON.COM x ФУТБОЛЬНАЯ ЖАРА — Футбольные Новости, Матч-центр LIVE, Трансферы и Таблицы 2026/27",
    template: "%s | GOLASON.COM",
  },
  description:
    "Международное двуязычное (RU/EN) футбольное издание GOLASON.COM x Футбольная Жара: авторская аналитика, Матч-центр LIVE, стартовые составы Sofascore, Радар Трансферов (Tier 1–3), реальные турнирные таблицы 2026/27 и видео голов в Telegram @futbolnaya_jara.",
  applicationName: "GOLASON.COM",
  authors: [{ name: "Редакция GOLASON • Футбольная Жара", url: "https://golason.com" }],
  creator: "GOLASON Editorial Desk",
  publisher: "GOLASON Media",
  category: "sports",
  keywords: [
    "футбол",
    "футбольные новости",
    "трансферы футбола",
    "Футбольная Жара",
    "Golason",
    "стартовые составы",
    "таблицы лиг 2026/27",
    "Ла Лига",
    "АПЛ",
    "Лига Чемпионов",
    "Серия А",
    "Бундеслига",
    "Реал Мадрид",
    "Барселона",
    "Манчестер Сити",
    "Ливерпуль",
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
      "x-default": "https://golason.com",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "GOLASON.COM x ФУТБОЛЬНАЯ ЖАРА — Футбольные Новости, LIVE Матч-центр и Таблицы 2026/27",
    description:
      "Авторские футбольные статьи, тактические разборы, LIVE результаты матчей, составы команд и актуальные турнирные таблицы сезона 2026/27.",
    url: "https://golason.com",
    siteName: "GOLASON.COM • Футбольная Жара",
    locale: "ru_RU",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: "https://golason.com/logo.jpg",
        width: 512,
        height: 512,
        alt: "GOLASON.COM x Футбольная Жара",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GOLASON.COM x ФУТБОЛЬНАЯ ЖАРА — Football News, Match Center & Standings",
    description:
      "Bilingual (RU/EN) Football Newspaper: Matchday Chronicle, Tactical Analysis, Transfer Dossier & 2026/27 League Standings.",
    images: ["https://golason.com/logo.jpg"],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaGraphJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsMediaOrganization",
        "@id": "https://golason.com/#organization",
        name: "GOLASON.COM • Футбольная Жара",
        alternateName: ["GOLASON", "Футбольная Жара", "Futbolnaya Jara"],
        url: "https://golason.com",
        logo: {
          "@type": "ImageObject",
          url: "https://golason.com/logo.jpg",
          width: 512,
          height: 512,
        },
        sameAs: ["https://t.me/futbolnaya_jara"],
        description:
          "Двуязычное (RU/EN) футбольное издание: хроника матчей, тактическая аналитика, трансферное досье и live-статистика.",
      },
      {
        "@type": "WebSite",
        "@id": "https://golason.com/#website",
        url: "https://golason.com",
        name: "GOLASON.COM x Футбольная Жара",
        inLanguage: ["ru-RU", "en-US"],
        publisher: {
          "@id": "https://golason.com/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://golason.com/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "SiteNavigationElement",
        "@id": "https://golason.com/#navigation",
        name: [
          "Главная",
          "Новости и аналитика",
          "Матч-центр LIVE",
          "Трансферы",
          "Таблицы 2026/27",
          "Поиск",
        ],
        url: [
          "https://golason.com/",
          "https://golason.com/news",
          "https://golason.com/live",
          "https://golason.com/transfers",
          "https://golason.com/standings",
          "https://golason.com/search",
        ],
      },
    ],
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaGraphJsonLd),
          }}
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
                background-color: #FFFFFF;
                color: #111827;
                -webkit-text-size-adjust: 100%;
              }
              /* Tablet & Mobile Responsive Grid Rules (<= 1024px) */
              @media (max-width: 1024px) {
                .golason-2col-main-sidebar,
                .golason-newspaper-12col-grid,
                .golason-archive-12col-grid,
                .golason-two-col-grid {
                  grid-template-columns: 1fr !important;
                  gap: 24px !important;
                }
                .golason-2col-main-sidebar > aside,
                .golason-newspaper-sidebar-col {
                  border-left: none !important;
                  padding-left: 0 !important;
                  border-top: 2px solid #111827 !important;
                  padding-top: 24px !important;
                }
              }
              /* Mobile Responsive Rules (<= 768px) */
              @media (max-width: 768px) {
                .golason-sublead-2col-grid,
                .golason-archive-2col-grid,
                .golason-editorial-horizontal-layout {
                  grid-template-columns: 1fr !important;
                  gap: 16px !important;
                }
                .golason-sublead-col-right {
                  border-left: none !important;
                  padding-left: 0 !important;
                }
                .golason-main-container {
                  padding: 14px 12px 44px !important;
                  gap: 22px !important;
                }
                .golason-pitch-scroll-wrap {
                  width: 100% !important;
                  overflow-x: auto !important;
                  -webkit-overflow-scrolling: touch;
                }
                .golason-pitch-scroll-wrap > div {
                  min-width: 640px;
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
          backgroundColor: "#FFFFFF",
          color: "#111827",
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
