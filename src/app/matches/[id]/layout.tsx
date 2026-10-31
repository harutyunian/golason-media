import type { Metadata } from "next";
import React from "react";
import { getEditorialMatchById } from "@/lib/editorialData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const match = getEditorialMatchById(id);

  if (!match) {
    return {
      title: "Матч-центр и статистика матча | GOLASON.COM",
      description:
        "Протокол матча, стартовые составы, тактические схемы и статистика на GOLASON.COM.",
      alternates: {
        canonical: `https://golason.com/matches/${id}`,
      },
    };
  }

  const scoreStr =
    match.status === "UPCOMING"
      ? "Превью и составы"
      : `${match.homeScore}:${match.awayScore}`;
  const title = `${match.homeTeamRu} — ${match.awayTeamRu} (${scoreStr}) • ${match.leagueRu}`;
  const description = `${match.homeTeamRu} vs ${match.awayTeamRu}: составы команд, тактическая расстановка, авторы голов, статистика ударов и разбор матча (${match.leagueRu}, ${match.stadiumRu}).`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://golason.com/matches/${match.id}`,
    },
    openGraph: {
      title: `${title} | GOLASON.COM`,
      description,
      url: `https://golason.com/matches/${match.id}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | GOLASON.COM`,
      description,
    },
  };
}

export default async function MatchDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const match = getEditorialMatchById(id);

  const schemaJsonLd = match
    ? {
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
              {
                "@type": "ListItem",
                position: 3,
                name: `${match.homeTeamRu} — ${match.awayTeamRu}`,
                item: `https://golason.com/matches/${match.id}`,
              },
            ],
          },
          {
            "@type": "SportsEvent",
            name: `${match.homeTeamRu} — ${match.awayTeamRu} (${match.leagueRu})`,
            description: `${match.leagueRu}, ${match.roundRu}. Стадион: ${match.stadiumRu}.`,
            url: `https://golason.com/matches/${match.id}`,
            sport: "Soccer",
            eventStatus:
              match.status === "FT"
                ? "https://schema.org/EventCompleted"
                : "https://schema.org/EventScheduled",
            location: {
              "@type": "Place",
              name: match.stadiumRu || match.stadiumEn,
            },
            homeTeam: {
              "@type": "SportsTeam",
              name: match.homeTeamRu,
              logo: match.homeLogoUrl,
            },
            awayTeam: {
              "@type": "SportsTeam",
              name: match.awayTeamRu,
              logo: match.awayLogoUrl,
            },
          },
        ],
      }
    : null;

  return (
    <>
      {schemaJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        />
      )}
      {children}
    </>
  );
}
