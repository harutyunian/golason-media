import type { Metadata } from "next";
import React from "react";
import { EDITORIAL_MATCHES } from "@/lib/editorialData";

export const metadata: Metadata = {
  title: "Матч-центр LIVE: Расписание, Счёт, Составы и Статистика Матчей",
  description:
    "Футбольный Матч-центр LIVE на GOLASON.COM: результаты матчей сегодня в прямом эфире, стартовые составы Sofascore, карточки замен, авторы голов и xG статистика.",
  alternates: {
    canonical: "https://golason.com/live",
  },
  openGraph: {
    title: "Матч-центр LIVE — Счёт, Составы и Статистика | GOLASON.COM",
    description:
      "Следите за матчами АПЛ, Ла Лиги, Серии А, Бундеслиги и Лиги чемпионов в реальном времени.",
    url: "https://golason.com/live",
    type: "website",
  },
};

export default function LiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sportsEvents = (EDITORIAL_MATCHES || []).slice(0, 12).map((m) => ({
    "@type": "SportsEvent",
    name: `${m.homeTeamRu} vs ${m.awayTeamRu}`,
    url: `https://golason.com/matches/${m.id}`,
    sport: "Soccer",
    eventStatus:
      m.status === "FT"
        ? "https://schema.org/EventCompleted"
        : "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: m.stadiumRu || m.stadiumEn,
    },
    homeTeam: {
      "@type": "SportsTeam",
      name: m.homeTeamRu,
    },
    awayTeam: {
      "@type": "SportsTeam",
      name: m.awayTeamRu,
    },
  }));

  const liveSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Главная",
            item: "https://golason.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Матч-центр LIVE",
            item: "https://golason.com/live",
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "Матчи дня — GOLASON.COM LIVE",
        itemListElement: sportsEvents.map((ev, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: ev,
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(liveSchema) }}
      />
      {children}
    </>
  );
}
