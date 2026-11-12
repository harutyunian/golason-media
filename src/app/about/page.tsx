import type { Metadata } from "next";
import React from "react";
import { EditorialMasthead } from "@/components/editorial/EditorialMasthead";
import { EditorialFooter } from "@/components/editorial/EditorialFooter";

export const metadata: Metadata = {
  title: "О проекте GOLASON.COM (About Us)",
  description:
    "Редакция GOLASON.COM x Футбольная Жара: двуязычная футбольная аналитика, тактические разборы, таблицы и live матч-центр.",
  alternates: { canonical: "https://golason.com/about" },
};

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "#FFFFFF", color: "#111827", minHeight: "100vh" }}>
      <EditorialMasthead />
      <main style={{ maxWidth: "860px", margin: "0 auto", padding: "40px 20px 64px", lineHeight: 1.75 }}>
        <h1 style={{ fontSize: "32px", fontWeight: 900, marginBottom: "12px" }}>
          О проекте GOLASON.COM / About GOLASON Media
        </h1>
        <p style={{ fontSize: "17px", color: "#374151", marginBottom: "24px" }}>
          <strong>GOLASON.COM</strong> — независимое двуязычное (RU/EN) футбольное медиа и статистический матч-центр, работающее в связке с Telegram-сообществом{" "}
          <a href="https://t.me/futbolnaya_jara" target="_blank" rel="noopener noreferrer" style={{ color: "#DC2626", fontWeight: 700 }}>
            @futbolnaya_jara
          </a>.
        </p>
        <p style={{ marginBottom: "20px" }}>
          Мы освещаем ключевые европейские турниры (Лигу чемпионов УЕФА, Английскую Премьер-лигу, Испанскую Ла Лигу, Итальянскую Серию А, Немецкую Бундеслигу и Французскую Лигу 1), объединяя оперативную хронику матчей, проверенные турнирные таблицы сезона 2026/27 и глубокие справочные разборы футбольной тактики, метрик <code>xG / PSxG / PPDA</code> и регламентов ФИФА/УЕФА/IFAB.
        </p>
        <p>
          <strong>EN:</strong> GOLASON.COM is an independent bilingual (English &amp; Russian) football publication delivering live match telemetry, verified league standings, tactical explainers, and UEFA/IFAB regulatory breakdowns.
        </p>
      </main>
      <EditorialFooter />
    </div>
  );
}
