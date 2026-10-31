import type { Metadata } from "next";
import React from "react";
import { EDITORIAL_ARTICLES } from "@/lib/editorialData";

export const metadata: Metadata = {
  title: "Футбольные Новости, Тактические Разборы и Статьи",
  description:
    "Все футбольные новости, репортажи и аналитические материалы редакции GOLASON.COM x Футбольная Жара: АПЛ, Ла Лига, Лига чемпионов, Серия А и Бундеслига.",
  alternates: {
    canonical: "https://golason.com/news",
  },
  openGraph: {
    title: "Новости и аналитика футбола | GOLASON.COM",
    description:
      "Свежие авторские статьи, тактические разборы матчей и интервью о мировом футболе.",
    url: "https://golason.com/news",
    type: "website",
  },
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const itemListSchema = {
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
            name: "Новости и статьи",
            item: "https://golason.com/news",
          },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Футбольные новости и аналитика — GOLASON.COM",
        url: "https://golason.com/news",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: (EDITORIAL_ARTICLES || []).slice(0, 15).map((a, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            url: `https://golason.com/news/${a.slug}`,
            name: a.titleRu,
          })),
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {children}
    </>
  );
}
