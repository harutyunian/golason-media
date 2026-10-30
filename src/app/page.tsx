"use client";

import React, { useState } from "react";
import { LiveScoreTicker } from "@/components/ticker";
import { LeagueStandingsTable } from "@/components/standings";
import {
  TacticalPitch,
  SubstitutionCard,
  TelegramHighlightBanner,
} from "@/components/match";
import { NewsArticleGrid } from "@/components/news/NewsArticleGrid";
import { FanReactionPoll } from "@/components/polls/FanReactionPoll";

type PortalLang = "ru" | "en";
type NavSection = "all" | "news" | "tactics" | "standings" | "polls";

export default function GolasonHomePage() {
  const [lang, setLang] = useState<PortalLang>("ru");
  const [activeSection, setActiveSection] = useState<NavSection>("all");

  const isRu = lang === "ru";

  const navItems: { id: NavSection; labelRu: string; labelEn: string; icon: string }[] = [
    { id: "all", labelRu: "🔥 Главная", labelEn: "🔥 Home Hub", icon: "🔥" },
    { id: "news", labelRu: "📰 Новости & Радар Трансферов", labelEn: "📰 News & Transfer Radar", icon: "📰" },
    { id: "tactics", labelRu: "⚽ Составы & Замены (Sofascore)", labelEn: "⚽ Tactical Lineups & Subs", icon: "⚽" },
    { id: "standings", labelRu: "📊 Таблицы Топ-Лиг", labelEn: "📊 League Standings", icon: "📊" },
    { id: "polls", labelRu: "🗳 Битва Мнений", labelEn: "🗳 Fan Pulse Polls", icon: "🗳" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 50% 0%, #102342 0%, #091324 45%, #050B14 100%)",
        color: "#F8FAFC",
      }}
    >
      {/* Top Brand Navigation Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 60,
          backgroundColor: "rgba(9, 19, 36, 0.94)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255, 196, 0, 0.22)",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          {/* Left: Brand Emblem + Title */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "46px",
                height: "46px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FF6200 0%, #FFC400 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                boxShadow: "0 0 20px rgba(255, 98, 0, 0.55)",
                border: "2px solid #FFF",
              }}
            >
              ⚽
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 900,
                    fontSize: "22px",
                    letterSpacing: "0.04em",
                    background: "linear-gradient(90deg, #FFFFFF 0%, #FFC400 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  GOLASON.COM
                </span>
                <span
                  style={{
                    background: "rgba(255, 98, 0, 0.2)",
                    border: "1px solid rgba(255, 98, 0, 0.6)",
                    color: "#FFC400",
                    fontSize: "11px",
                    fontWeight: 800,
                    padding: "3px 9px",
                    borderRadius: "999px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {isRu ? "x ФУТБОЛЬНАЯ ЖАРА" : "x FUTBOLNAYA JARA"}
                </span>
              </div>
              <div style={{ fontSize: "12px", color: "#94A3B8", marginTop: "2px" }}>
                {isRu
                  ? "Футбольные инсайды, радар трансферов, тактические схемы и видео голов 24/7"
                  : "Breaking Football News, Transfer Reliability Radar, Tactical Lineups & Live Highlights"}
              </div>
            </div>
          </div>

          {/* Center: Section Switcher Pills */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  style={{
                    cursor: "pointer",
                    border: active
                      ? "1px solid #FFC400"
                      : "1px solid rgba(148, 163, 184, 0.22)",
                    background: active
                      ? "linear-gradient(135deg, #FF6200 0%, #E04800 100%)"
                      : "rgba(15, 29, 54, 0.75)",
                    color: active ? "#FFFFFF" : "#CBD5E1",
                    fontWeight: active ? 800 : 600,
                    fontSize: "13px",
                    padding: "8px 14px",
                    borderRadius: "999px",
                    transition: "all 0.18s ease",
                  }}
                >
                  {isRu ? item.labelRu : item.labelEn}
                </button>
              );
            })}
          </nav>

          {/* Right: Bilingual RU/EN Toggle + Telegram CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                display: "inline-flex",
                background: "#0B172A",
                padding: "4px",
                borderRadius: "999px",
                border: "1px solid rgba(255, 196, 0, 0.35)",
              }}
            >
              <button
                onClick={() => setLang("ru")}
                style={{
                  cursor: "pointer",
                  border: "none",
                  background:
                    lang === "ru"
                      ? "linear-gradient(135deg, #FF6200 0%, #FFC400 100%)"
                      : "transparent",
                  color: lang === "ru" ? "#091324" : "#94A3B8",
                  fontWeight: 800,
                  fontSize: "12px",
                  padding: "5px 12px",
                  borderRadius: "999px",
                }}
              >
                🇷🇺 RU
              </button>
              <button
                onClick={() => setLang("en")}
                style={{
                  cursor: "pointer",
                  border: "none",
                  background:
                    lang === "en"
                      ? "linear-gradient(135deg, #FF6200 0%, #FFC400 100%)"
                      : "transparent",
                  color: lang === "en" ? "#091324" : "#94A3B8",
                  fontWeight: 800,
                  fontSize: "12px",
                  padding: "5px 12px",
                  borderRadius: "999px",
                }}
              >
                🇬🇧 EN
              </button>
            </div>

            <a
              href="https://t.me/futbolnaya_jara"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                background: "linear-gradient(135deg, #229ED9 0%, #1577A8 100%)",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "13px",
                padding: "9px 16px",
                borderRadius: "999px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 4px 14px rgba(34, 158, 217, 0.4)",
              }}
            >
              <span>✈️</span>
              <span>{isRu ? "Видео голов в Telegram" : "Goal Videos on Telegram"}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Sticky Live Match Score Ticker */}
      <LiveScoreTicker lang={lang} />

      {/* Main Content Container */}
      <main
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "28px 20px 64px",
          display: "flex",
          flexDirection: "column",
          gap: "44px",
        }}
      >
        {/* 1. Editorial News & Transfer Reliability Radar */}
        {(activeSection === "all" || activeSection === "news") && (
          <section id="news-section">
            <NewsArticleGrid lang={lang} />
          </section>
        )}

        {/* 2. Telegram Video Highlight Bridge Banner */}
        {(activeSection === "all" || activeSection === "tactics" || activeSection === "news") && (
          <section id="telegram-bridge">
            <TelegramHighlightBanner lang={lang} />
          </section>
        )}

        {/* 3. Interactive Match Center: Dark Tactical Pitch (Sofascore style) + Substitution Broadcast Card */}
        {(activeSection === "all" || activeSection === "tactics") && (
          <section
            id="tactics-section"
            style={{ display: "flex", flexDirection: "column", gap: "32px" }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(255, 98, 0, 0.16)",
                  border: "1px solid rgba(255, 196, 0, 0.45)",
                  color: "#FFC400",
                  padding: "6px 14px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 800,
                  marginBottom: "10px",
                }}
              >
                <span>⚽ LIVE MATCH CENTER</span>
                <span>•</span>
                <span>{isRu ? "ТАКТИЧЕСКАЯ СХЕМА И ЗАМЕНЫ" : "TACTICAL PITCH & SUBSTITUTIONS"}</span>
              </div>
              <h2
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "28px",
                  fontWeight: 900,
                  margin: "0 0 8px 0",
                }}
              >
                {isRu
                  ? "Стартовые составы в стиле Sofascore и ключевые замены матча"
                  : "Sofascore-Style Tactical Lineups & Key Match Substitutions"}
              </h2>
            </div>

            <TacticalPitch lang={lang} />
            <SubstitutionCard lang={lang} />
          </section>
        )}

        {/* 4. Two-Column Bottom Hub: Multi-League Standings + 1-Click Fan Reaction Polls */}
        {(activeSection === "all" ||
          activeSection === "standings" ||
          activeSection === "polls") && (
          <section
            id="standings-and-polls"
            style={{
              display: "grid",
              gridTemplateColumns:
                activeSection === "all"
                  ? "repeat(auto-fit, minmax(460px, 1fr))"
                  : "1fr",
              gap: "32px",
              alignItems: "start",
            }}
          >
            {(activeSection === "all" || activeSection === "standings") && (
              <LeagueStandingsTable lang={lang} />
            )}
            {(activeSection === "all" || activeSection === "polls") && (
              <FanReactionPoll lang={lang} />
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(148, 163, 184, 0.16)",
          backgroundColor: "#050A14",
          padding: "36px 20px",
          marginTop: "40px",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            color: "#94A3B8",
            fontSize: "13px",
          }}
        >
          <div>
            <strong style={{ color: "#FFFFFF" }}>GOLASON.COM x ФУТБОЛЬНАЯ ЖАРА</strong>{" "}
            — {isRu ? "Международный футбольный портал (RU / EN)" : "Bilingual Football Media & Match Center (EN / RU)"}
          </div>
          <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
            <a
              href="https://t.me/futbolnaya_jara"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#FFC400", textDecoration: "none", fontWeight: 700 }}
            >
              Telegram: @futbolnaya_jara
            </a>
            <a
              href="/api/live"
              style={{ color: "#94A3B8", textDecoration: "none" }}
            >
              Live API JSON
            </a>
            <a
              href="/sitemap.xml"
              style={{ color: "#94A3B8", textDecoration: "none" }}
            >
              Sitemap
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
