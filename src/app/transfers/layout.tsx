import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Трансферы Футбола 2026/27: Инсайды Tier 1–3, Сделки и Слухи",
  description:
    "Радар трансферов GOLASON.COM: проверенные футбольные инсайды (Tier 1–3), суммы выкупа, контракты и переходы в клубы АПЛ, Ла Лиги, Серии А и Бундеслиги.",
  alternates: {
    canonical: "https://golason.com/transfers",
  },
  openGraph: {
    title: "Радар Трансферов 2026/27 — Инсайды и Сделки | GOLASON.COM",
    description:
      "Главные трансферные новости, таблица переходов и рейтинг достоверности инсайдеров Tier 1–3.",
    url: "https://golason.com/transfers",
    type: "website",
  },
};

export default function TransfersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
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
        name: "Трансферы и инсайды",
        item: "https://golason.com/transfers",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
