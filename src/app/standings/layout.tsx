import type { Metadata } from "next";
import React from "react";
import { REAL_MULTI_LEAGUE_STANDINGS } from "@/lib/realDataBridge";

export const metadata: Metadata = {
  title: "Турнирные таблицы 2026/27: Ла Лига, АПЛ, Серия А, Лига чемпионов",
  description:
    "Актуальные турнирные таблицы сезона 2026/27 на GOLASON.COM: Ла Лига, Английская Премьер-лига (АПЛ), Серия А, Лига чемпионов УЕФА и Саудовская Про-лига. Очки, разница мячей, форма клубов и бомбардиры.",
  alternates: {
    canonical: "https://golason.com/standings",
  },
  openGraph: {
    title: "Турнирные таблицы футбола 2026/27 — Ла Лига, АПЛ, Серия А, ЛЧ | GOLASON.COM",
    description:
      "Актуальное положение команд в сезоне 2026/27: очки, форма последних 5 матчей, зоны Лиги чемпионов и гонка бомбардиров.",
    url: "https://golason.com/standings",
    type: "website",
  },
};

export default function StandingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const topClubs = (REAL_MULTI_LEAGUE_STANDINGS["LA LIGA"]?.entries || [])
    .slice(0, 10)
    .map((e) => ({
      "@type": "ListItem",
      position: e.rank,
      name: `${e.teamNameRu || e.teamName} (${e.points} pts)`,
    }));

  const standingsSchema = {
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
            name: "Турнирные таблицы 2026/27",
            item: "https://golason.com/standings",
          },
        ],
      },
      {
        "@type": "Dataset",
        name: "Турнирные таблицы европейских футбольных лиг 2026/27 (La Liga, Premier League, Serie A, Champions League)",
        description:
          "Официальная статистика очков, побед, разницы мячей и текущей формы клубов в сезоне 2026/27.",
        url: "https://golason.com/standings",
        creator: {
          "@type": "Organization",
          name: "GOLASON.COM • Футбольная Жара",
          url: "https://golason.com",
        },
        hasPart: {
          "@type": "ItemList",
          name: "Топ-10 Ла Лиги 2026/27",
          itemListElement: topClubs,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(standingsSchema) }}
      />
      {children}
    </>
  );
}
