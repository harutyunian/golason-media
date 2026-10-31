"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ClubLogo } from "@/lib/clubLogos";
import { getFotmobPlayerImage } from "@/lib/types";
import {
  LeagueStandingsTable,
  STANDINGS_LEAGUE_ORDER,
  DEFAULT_MULTI_LEAGUE_STANDINGS,
  type StandingsLeagueId,
} from "@/components/standings";
import { LiveScoreTicker } from "@/components/ticker";

type PortalLang = "ru" | "en";

interface TopScorerRow {
  rank: number;
  playerRu: string;
  playerEn: string;
  fotmobId: number;
  clubId: string;
  clubRu: string;
  clubEn: string;
  leagueId: StandingsLeagueId;
  goals: number;
  assists: number;
  matches: number;
}

const TOP_SCORERS_BY_LEAGUE: Record<StandingsLeagueId, TopScorerRow[]> = {
  "LA LIGA": [
    {
      rank: 1,
      playerRu: "Роберт Левандовски",
      playerEn: "Robert Lewandowski",
      fotmobId: 93447,
      clubId: "barcelona",
      clubRu: "Барселона",
      clubEn: "Barcelona",
      leagueId: "LA LIGA",
      goals: 23,
      assists: 4,
      matches: 27,
    },
    {
      rank: 2,
      playerRu: "Килиан Мбаппе",
      playerEn: "Kylian Mbappé",
      fotmobId: 701154,
      clubId: "real-madrid",
      clubRu: "Реал Мадрид",
      clubEn: "Real Madrid",
      leagueId: "LA LIGA",
      goals: 22,
      assists: 5,
      matches: 26,
    },
    {
      rank: 3,
      playerRu: "Рафинья",
      playerEn: "Raphinha",
      fotmobId: 696679,
      clubId: "barcelona",
      clubRu: "Барселона",
      clubEn: "Barcelona",
      leagueId: "LA LIGA",
      goals: 15,
      assists: 11,
      matches: 27,
    },
    {
      rank: 4,
      playerRu: "Винисиус Жуниор",
      playerEn: "Vinícius Júnior",
      fotmobId: 846036,
      clubId: "real-madrid",
      clubRu: "Реал Мадрид",
      clubEn: "Real Madrid",
      leagueId: "LA LIGA",
      goals: 14,
      assists: 9,
      matches: 24,
    },
    {
      rank: 5,
      playerRu: "Ламин Ямаль",
      playerEn: "Lamine Yamal",
      fotmobId: 1467236,
      clubId: "barcelona",
      clubRu: "Барселона",
      clubEn: "Barcelona",
      leagueId: "LA LIGA",
      goals: 11,
      assists: 14,
      matches: 27,
    },
  ],
  EPL: [
    {
      rank: 1,
      playerRu: "Мохамед Салах",
      playerEn: "Mohamed Salah",
      fotmobId: 292462,
      clubId: "liverpool",
      clubRu: "Ливерпуль",
      clubEn: "Liverpool",
      leagueId: "EPL",
      goals: 25,
      assists: 16,
      matches: 29,
    },
    {
      rank: 2,
      playerRu: "Эрлинг Холанд",
      playerEn: "Erling Haaland",
      fotmobId: 737066,
      clubId: "man-city",
      clubRu: "Манчестер Сити",
      clubEn: "Manchester City",
      leagueId: "EPL",
      goals: 22,
      assists: 3,
      matches: 28,
    },
    {
      rank: 3,
      playerRu: "Букайо Сака",
      playerEn: "Bukayo Saka",
      fotmobId: 961995,
      clubId: "arsenal",
      clubRu: "Арсенал",
      clubEn: "Arsenal",
      leagueId: "EPL",
      goals: 15,
      assists: 11,
      matches: 26,
    },
    {
      rank: 4,
      playerRu: "Кай Хаверц",
      playerEn: "Kai Havertz",
      fotmobId: 749736,
      clubId: "arsenal",
      clubRu: "Арсенал",
      clubEn: "Arsenal",
      leagueId: "EPL",
      goals: 13,
      assists: 6,
      matches: 28,
    },
  ],
  "SERIE A": [
    {
      rank: 1,
      playerRu: "Лаутаро Мартинес",
      playerEn: "Lautaro Martínez",
      fotmobId: 823192,
      clubId: "inter",
      clubRu: "Интер Милан",
      clubEn: "Inter Milan",
      leagueId: "SERIE A",
      goals: 19,
      assists: 6,
      matches: 27,
    },
    {
      rank: 2,
      playerRu: "Матео Ретеги",
      playerEn: "Mateo Retegui",
      fotmobId: 1029063,
      clubId: "atalanta",
      clubRu: "Аталанта",
      clubEn: "Atalanta",
      leagueId: "SERIE A",
      goals: 18,
      assists: 4,
      matches: 28,
    },
    {
      rank: 3,
      playerRu: "Кристиан Пулишич",
      playerEn: "Christian Pulisic",
      fotmobId: 688295,
      clubId: "ac-milan",
      clubRu: "Милан",
      clubEn: "AC Milan",
      leagueId: "SERIE A",
      goals: 13,
      assists: 8,
      matches: 27,
    },
  ],
  UCL: [
    {
      rank: 1,
      playerRu: "Килиан Мбаппе",
      playerEn: "Kylian Mbappé",
      fotmobId: 701154,
      clubId: "real-madrid",
      clubRu: "Реал Мадрид",
      clubEn: "Real Madrid",
      leagueId: "UCL",
      goals: 10,
      assists: 3,
      matches: 10,
    },
    {
      rank: 2,
      playerRu: "Рафинья",
      playerEn: "Raphinha",
      fotmobId: 696679,
      clubId: "barcelona",
      clubRu: "Барселона",
      clubEn: "Barcelona",
      leagueId: "UCL",
      goals: 9,
      assists: 5,
      matches: 9,
    },
    {
      rank: 3,
      playerRu: "Гарри Кейн",
      playerEn: "Harry Kane",
      fotmobId: 194165,
      clubId: "bayern",
      clubRu: "Бавария",
      clubEn: "Bayern Munich",
      leagueId: "UCL",
      goals: 9,
      assists: 2,
      matches: 9,
    },
  ],
  SAUDI: [
    {
      rank: 1,
      playerRu: "Криштиану Роналду",
      playerEn: "Cristiano Ronaldo",
      fotmobId: 30893,
      clubId: "al-nassr",
      clubRu: "Аль-Наср",
      clubEn: "Al-Nassr",
      leagueId: "SAUDI",
      goals: 26,
      assists: 5,
      matches: 24,
    },
    {
      rank: 2,
      playerRu: "Александар Митрович",
      playerEn: "Aleksandar Mitrović",
      fotmobId: 422685,
      clubId: "al-hilal",
      clubRu: "Аль-Хиляль",
      clubEn: "Al-Hilal",
      leagueId: "SAUDI",
      goals: 21,
      assists: 4,
      matches: 23,
    },
    {
      rank: 3,
      playerRu: "Карим Бензема",
      playerEn: "Karim Benzema",
      fotmobId: 26166,
      clubId: "al-ittihad",
      clubRu: "Аль-Иттихад",
      clubEn: "Al-Ittihad",
      leagueId: "SAUDI",
      goals: 19,
      assists: 7,
      matches: 23,
    },
  ],
};

export default function StandingsHubPage() {
  const [lang, setLang] = useState<PortalLang>("ru");
  const [selectedLeague, setSelectedLeague] =
    useState<StandingsLeagueId>("LA LIGA");
  const [viewMode, setViewMode] = useState<"single" | "all">("single");

  const isRu = lang === "ru";
  const currentScorers =
    TOP_SCORERS_BY_LEAGUE[selectedLeague] || TOP_SCORERS_BY_LEAGUE["LA LIGA"];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F8FAFC",
        color: "#0F172A",
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Top Editorial Navigation Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 60,
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E2E8F0",
          boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
              color: "#0F172A",
            }}
          >
            <img
              src="/logo.jpg"
              alt="GOLASON"
              width={40}
              height={40}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #EA580C",
              }}
            />
            <div>
              <div
                style={{
                  fontWeight: 900,
                  fontSize: "18px",
                  letterSpacing: "0.02em",
                  color: "#0F172A",
                }}
              >
                GOLASON.COM
              </div>
              <div style={{ fontSize: "11px", color: "#64748B", fontWeight: 600 }}>
                {isRu
                  ? "Турнирные таблицы и бомбардиры"
                  : "League Tables & Top Scorers"}
              </div>
            </div>
          </Link>

          <nav
            aria-label="Primary Navigation"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flexWrap: "wrap",
            }}
          >
            {[
              { href: "/", labelRu: "Главная", labelEn: "Home" },
              { href: "/live", labelRu: "Матч-центр", labelEn: "Live Center" },
              {
                href: "/news/mbappe-el-clasico-hat-trick-endrick-cameo-bernabeu",
                labelRu: "Статьи",
                labelEn: "News",
              },
              { href: "/transfers", labelRu: "Трансферы", labelEn: "Transfers" },
              {
                href: "/standings",
                labelRu: "Таблицы",
                labelEn: "Standings",
                active: true,
              },
              { href: "/search", labelRu: "Поиск", labelEn: "Search" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  textDecoration: "none",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: item.active ? 800 : 600,
                  color: item.active ? "#FFFFFF" : "#334155",
                  backgroundColor: item.active ? "#0F172A" : "#FFFFFF",
                  border: item.active ? "1px solid #0F172A" : "1px solid #E2E8F0",
                }}
              >
                {isRu ? item.labelRu : item.labelEn}
              </Link>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              role="group"
              aria-label="Language switcher"
              style={{
                display: "inline-flex",
                backgroundColor: "#F1F5F9",
                padding: "3px",
                borderRadius: "8px",
                border: "1px solid #E2E8F0",
              }}
            >
              <button
                type="button"
                onClick={() => setLang("ru")}
                style={{
                  border: "none",
                  backgroundColor: lang === "ru" ? "#FFFFFF" : "transparent",
                  color: lang === "ru" ? "#0F172A" : "#64748B",
                  fontWeight: 800,
                  fontSize: "12px",
                  padding: "5px 10px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                RU
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                style={{
                  border: "none",
                  backgroundColor: lang === "en" ? "#FFFFFF" : "transparent",
                  color: lang === "en" ? "#0F172A" : "#64748B",
                  fontWeight: 800,
                  fontSize: "12px",
                  padding: "5px 10px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Live Score Ticker Strip */}
      <LiveScoreTicker lang={lang} />

      <main
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "24px 20px 72px",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
        }}
      >
        {/* Page Header + League View Mode Switcher */}
        <section
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: "16px",
            padding: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(24px, 3vw, 32px)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                color: "#0F172A",
              }}
            >
              {isRu
                ? "Таблицы ведущих лиг, зоны квалификации и гонка бомбардиров"
                : "Multi-League Standings, Qualification Zones & Top Scorers"}
            </h1>
            <p
              style={{
                margin: "6px 0 0",
                fontSize: "14px",
                color: "#475569",
                maxWidth: "70ch",
              }}
            >
              {isRu
                ? "Актуальное положение клубов в Ла Лиге, АПЛ, Серии А, Лиге чемпионов УЕФА и Саудовской Про-лиге с индикацией команд, играющих в прямом эфире."
                : "Live tables across La Liga, Premier League, Serie A, Champions League, and Saudi Pro League with form guides and qualification cutoffs."}
            </p>
          </div>

          <div
            style={{
              display: "inline-flex",
              backgroundColor: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: "8px",
              padding: "3px",
            }}
          >
            <button
              type="button"
              onClick={() => setViewMode("single")}
              style={{
                border: "none",
                backgroundColor: viewMode === "single" ? "#0F172A" : "transparent",
                color: viewMode === "single" ? "#FFFFFF" : "#475569",
                fontWeight: 800,
                fontSize: "12px",
                padding: "7px 14px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              {isRu ? "Интерактивная таблица" : "Interactive League View"}
            </button>
            <button
              type="button"
              onClick={() => setViewMode("all")}
              style={{
                border: "none",
                backgroundColor: viewMode === "all" ? "#0F172A" : "transparent",
                color: viewMode === "all" ? "#FFFFFF" : "#475569",
                fontWeight: 800,
                fontSize: "12px",
                padding: "7px 14px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              {isRu ? "Все 5 лиг сразу" : "All 5 Leagues Stack"}
            </button>
          </div>
        </section>

        {/* Main Two-Column Grid: Standings Table(s) + Top Scorers & Sidebar Ad */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {/* Left Primary Column: LeagueStandingsTable */}
          <div
            style={{
              gridColumn: "span 2",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {viewMode === "single" ? (
              <LeagueStandingsTable
                lang={lang}
                initialLeague={selectedLeague}
                onLeagueChange={(lg) => setSelectedLeague(lg)}
              />
            ) : (
              STANDINGS_LEAGUE_ORDER.map((lgId) => (
                <div key={lgId} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 16px",
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      borderRadius: "10px",
                    }}
                  >
                    <strong style={{ fontSize: "15px", color: "#0F172A" }}>
                      {isRu
                        ? DEFAULT_MULTI_LEAGUE_STANDINGS[lgId].nameRu
                        : DEFAULT_MULTI_LEAGUE_STANDINGS[lgId].nameEn}
                    </strong>
                    <span style={{ fontSize: "12px", color: "#64748B" }}>
                      {isRu
                        ? DEFAULT_MULTI_LEAGUE_STANDINGS[lgId].matchdayLabelRu
                        : DEFAULT_MULTI_LEAGUE_STANDINGS[lgId].matchdayLabelEn}
                    </span>
                  </div>
                  <LeagueStandingsTable lang={lang} initialLeague={lgId} />
                </div>
              ))
            )}
          </div>

          {/* Right Sidebar: Top Scorers Table + Sidebar Ad Slot */}
          <aside
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* Top Scorers Table Card */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 2px 10px rgba(15, 23, 42, 0.03)",
              }}
            >
              <div
                style={{
                  padding: "18px 20px",
                  borderBottom: "1px solid #E2E8F0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "17px",
                      fontWeight: 900,
                      color: "#0F172A",
                    }}
                  >
                    {isRu ? "Гонка бомбардиров" : "Top Goalscorers"}
                  </h2>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      color: "#EA580C",
                      backgroundColor: "#FFF7ED",
                      border: "1px solid #FDBA74",
                      padding: "2px 8px",
                      borderRadius: "999px",
                    }}
                  >
                    {selectedLeague}
                  </span>
                </div>

                {/* League Selector Pills for Top Scorers */}
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    flexWrap: "wrap",
                  }}
                >
                  {STANDINGS_LEAGUE_ORDER.map((lg) => {
                    const active = selectedLeague === lg;
                    return (
                      <button
                        key={lg}
                        type="button"
                        onClick={() => setSelectedLeague(lg)}
                        style={{
                          padding: "4px 9px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: active ? 800 : 600,
                          cursor: "pointer",
                          border: active
                            ? "1px solid #0F172A"
                            : "1px solid #E2E8F0",
                          backgroundColor: active ? "#0F172A" : "#F8FAFC",
                          color: active ? "#FFFFFF" : "#475569",
                        }}
                      >
                        {lg}
                      </button>
                    );
                  })}
                </div>
              </div>

              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "13px",
                  textAlign: "left",
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: "#F8FAFC",
                      borderBottom: "1px solid #E2E8F0",
                      fontSize: "10.5px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      color: "#64748B",
                    }}
                  >
                    <th style={{ padding: "10px 12px" }}>#</th>
                    <th style={{ padding: "10px 8px" }}>
                      {isRu ? "Игрок / Клуб" : "Player / Club"}
                    </th>
                    <th style={{ padding: "10px 8px", textAlign: "center" }}>
                      {isRu ? "Голы" : "G"}
                    </th>
                    <th style={{ padding: "10px 12px", textAlign: "center" }}>
                      {isRu ? "Пасы" : "A"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentScorers.map((sc) => (
                    <tr
                      key={`${sc.leagueId}-${sc.rank}`}
                      style={{
                        borderBottom: "1px solid #E2E8F0",
                      }}
                    >
                      <td
                        style={{
                          padding: "12px",
                          fontWeight: 800,
                          color: sc.rank === 1 ? "#EA580C" : "#64748B",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {sc.rank}
                      </td>
                      <td style={{ padding: "12px 8px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <img
                            src={getFotmobPlayerImage(sc.fotmobId)}
                            alt={isRu ? sc.playerRu : sc.playerEn}
                            width={34}
                            height={34}
                            style={{
                              width: "34px",
                              height: "34px",
                              borderRadius: "50%",
                              objectFit: "cover",
                              backgroundColor: "#F1F5F9",
                              border: "1px solid #CBD5E1",
                            }}
                          />
                          <div>
                            <div
                              style={{
                                fontWeight: 800,
                                color: "#0F172A",
                                lineHeight: 1.2,
                              }}
                            >
                              {isRu ? sc.playerRu : sc.playerEn}
                            </div>
                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "5px",
                                fontSize: "11px",
                                color: "#64748B",
                                marginTop: "3px",
                              }}
                            >
                              <ClubLogo
                                teamId={sc.clubId}
                                teamName={sc.clubEn}
                                teamNameRu={sc.clubRu}
                                size={15}
                              />
                              <span>{isRu ? sc.clubRu : sc.clubEn}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "12px 8px",
                          textAlign: "center",
                          fontWeight: 900,
                          fontSize: "14px",
                          color: "#0F172A",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {sc.goals}
                      </td>
                      <td
                        style={{
                          padding: "12px",
                          textAlign: "center",
                          fontWeight: 700,
                          color: "#475569",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {sc.assists}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sidebar Ad Banner Slot */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "16px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <span
                style={{
                  alignSelf: "flex-start",
                  fontSize: "10px",
                  fontWeight: 800,
                  color: "#64748B",
                  border: "1px solid #CBD5E1",
                  borderRadius: "4px",
                  padding: "2px 6px",
                }}
              >
                {isRu ? "РЕКЛАМНЫЙ БЛОК • 300x250" : "AD SLOT • 300x250"}
              </span>
              <div style={{ fontSize: "15px", fontWeight: 900, color: "#0F172A" }}>
                {isRu
                  ? "Смотрите LIVE-матчи и тактические разборы"
                  : "Explore Live Match Center & Lineups"}
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "12.5px",
                  color: "#475569",
                  lineHeight: 1.5,
                }}
              >
                {isRu
                  ? "Переходите в раздел Live Матч-центра для просмотра интерактивных схем Sofascore и замен каждого матча тура."
                  : "Visit our dedicated Live Match Center for interactive Sofascore tactical formations and substitution cards."}
              </p>
              <Link
                href="/live"
                style={{
                  textDecoration: "none",
                  textAlign: "center",
                  backgroundColor: "#EA580C",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: "12.5px",
                  padding: "10px 14px",
                  borderRadius: "8px",
                }}
              >
                {isRu ? "Перейти в Live Матч-центр →" : "Open Live Match Center →"}
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
