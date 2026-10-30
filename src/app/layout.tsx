import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "GOLASON x ФУТБОЛЬНАЯ ЖАРА — Live Football News, Tactical Lineups & Transfer Radar",
  description:
    "Bilingual (RU/EN) Football Media Portal: Instant live scores, Sofascore-style tactical lineups with player portraits, Transfer Reliability Radar, 1-click fan polls, and @futbolnaya_jara goal video highlights.",
  metadataBase: new URL("https://golason.com"),
  openGraph: {
    title: "GOLASON x ФУТБОЛЬНАЯ ЖАРА — Football News, Lineups & Transfer Radar",
    description:
      "Breaking football transfers, live tactical lineups, substitution breakdowns, and goal highlights.",
    url: "https://golason.com",
    siteName: "Golason Media",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
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
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#060D1A",
          color: "#F8FAFC",
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
