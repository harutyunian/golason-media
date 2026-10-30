"use client";

import React, { useState, useEffect } from "react";
import { LiveScoreTicker } from "@/components/ticker";
import { LeagueStandingsTable } from "@/components/standings";
import {
  TacticalPitch,
  SubstitutionCard,
  TelegramHighlightBanner,
} from "@/components/match";
import { NewsArticleGrid } from "@/components/news/NewsArticleGrid";
import { FanReactionPoll } from "@/components/polls/FanReactionPoll";
import { getThemePalette, type ThemeMode } from "@/lib/theme";
import { LightThemeAdapter } from "@/components/theme/LightThemeAdapter";

type PortalLang = "ru" | "en";
type NavSection = "all" | "news" | "tactics" | "standings" | "polls";

const THEME_STORAGE_KEY = "golason_theme_mode_v1";

export default function GolasonHomePage() {
  const [lang, setLang] = useState<PortalLang>("ru");
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [activeSection, setActiveSection] = useState<NavSection>("all");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === "light" || saved === "dark") {
        setTheme(saved);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const handleThemeChange = (nextTheme: ThemeMode) => {
    setTheme(nextTheme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // ignore storage errors
    }
  };

  const isRu = lang === "ru";
  const isLight = theme === "light";
  const palette = getThemePalette(theme);

  const navItems: { id: NavSection; labelRu: string; labelEn: string }[] = [
    { id: "all", labelRu: "🔥 Главная", labelEn: "🔥 Home Hub" },
    { id: "news", labelRu: "📰 Новости & Трансферы", labelEn: "📰 News & Transfers" },
    { id: "tactics", labelRu: "⚽ Составы & Замены", labelEn: "⚽ Lineups & Subs" },
    { id: "standings", labelRu: "📊 Таблицы Лиг", labelEn: "📊 Standings" },
    { id: "polls", labelRu: "🗳 Опросы", labelEn: "🗳 Polls" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: palette.pageBgGradient,
        color: palette.textPrimary,
        transition: "background 0.2s ease, color 0.2s ease",
      }}
    >
      <LightThemeAdapter theme={theme} />

      {/* Top Brand Navigation Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 60,
          backgroundColor: palette.headerBg,
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${palette.headerBorder}`,
          boxShadow: isLight
            ? "0 4px 20px rgba(15, 23, 42, 0.05)"
            : "0 4px 20px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div
          className="golason-header-inner"
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "14px",
            flexWrap: "wrap",
          }}
        >
          {/* Left: Brand Emblem + Title */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              data-keep-dark="true"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FF6200 0%, #FFC400 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                boxShadow: "0 4px 14px rgba(255, 98, 0, 0.4)",
                border: isLight ? "2px solid #0F172A" : "2px solid #FFF",
                flexShrink: 0,
              }}
            >
              ⚽
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(18px, 3vw, 22px)",
                    letterSpacing: "0.03em",
                    color: isLight ? "#0F172A" : "#FFFFFF",
                  }}
                >
                  GOLASON.COM
                </span>
                <span
                  data-keep-dark="true"
                  style={{
                    background: isLight ? "#FFF7ED" : "rgba(255, 98, 0, 0.2)",
                    border: "1px solid #FF6200",
                    color: isLight ? "#C2410C" : "#FFC400",
                    fontSize: "11px",
                    fontWeight: 800,
                    padding: "3px 9px",
                    borderRadius: "999px",
                    letterSpacing: "0.04em",
                  }}
                >
                  {isRu ? "x ФУТБОЛЬНАЯ ЖАРА" : "x FUTBOLNAYA JARA"}
                </span>
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: palette.textMuted,
                  marginTop: "2px",
                }}
              >
                {isRu
                  ? "Футбольные новости, радар трансферов, схемы и видео голов 24/7"
                  : "Breaking Football News, Transfer Radar, Lineups & Live Highlights"}
              </div>
            </div>
          </div>

          {/* Center: Section Switcher Pills */}
          <nav
            className="golason-nav-scroll"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flexWrap: "wrap",
            }}
          >
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  data-keep-dark={active ? "true" : undefined}
                  onClick={() => setActiveSection(item.id)}
                  style={{
                    cursor: "pointer",
                    border: active
                      ? "1px solid #EA580C"
                      : `1px solid ${palette.pillBorder}`,
                    background: active
                      ? "linear-gradient(135deg, #FF6200 0%, #E04800 100%)"
                      : palette.pillBg,
                    color: active ? "#FFFFFF" : palette.textSecondary,
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

          {/* Right: Theme Toggle (☀️ Light / 🌙 Dark) + RU/EN Toggle + Telegram CTA */}
          <div
            className="golason-controls-row"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            {/* Theme Toggle Pill */}
            <div
              data-keep-dark="true"
              style={{
                display: "inline-flex",
                background: isLight ? "#E2E8F0" : "#0B172A",
                padding: "3px",
                borderRadius: "999px",
                border: isLight
                  ? "1px solid #CBD5E1"
                  : "1px solid rgba(255, 196, 0, 0.35)",
              }}
            >
              <button
                data-keep-dark="true"
                onClick={() => handleThemeChange("light")}
                style={{
                  cursor: "pointer",
                  border: "none",
                  background: isLight ? "#FFFFFF" : "transparent",
                  color: isLight ? "#0F172A" : "#94A3B8",
                  fontWeight: 800,
                  fontSize: "12px",
                  padding: "5px 10px",
                  borderRadius: "999px",
                  boxShadow: isLight
                    ? "0 2px 6px rgba(15, 23, 42, 0.12)"
                    : "none",
                }}
              >
                ☀️ {isRu ? "Светлая" : "Light"}
              </button>
              <button
                data-keep-dark="true"
                onClick={() => handleThemeChange("dark")}
                style={{
                  cursor: "pointer",
                  border: "none",
                  background: !isLight
                    ? "linear-gradient(135deg, #FF6200 0%, #FFC400 100%)"
                    : "transparent",
                  color: !isLight ? "#091324" : "#475569",
                  fontWeight: 800,
                  fontSize: "12px",
                  padding: "5px 10px",
                  borderRadius: "999px",
                }}
              >
                🌙 {isRu ? "Тёмная" : "Dark"}
              </button>
            </div>

            {/* Language Toggle Pill */}
            <div
              data-keep-dark="true"
              style={{
                display: "inline-flex",
                background: isLight ? "#E2E8F0" : "#0B172A",
                padding: "3px",
                borderRadius: "999px",
                border: isLight
                  ? "1px solid #CBD5E1"
                  : "1px solid rgba(255, 196, 0, 0.35)",
              }}
            >
              <button
                data-keep-dark="true"
                onClick={() => setLang("ru")}
                style={{
                  cursor: "pointer",
                  border: "none",
                  background:
                    lang === "ru"
                      ? "linear-gradient(135deg, #FF6200 0%, #FFC400 100%)"
                      : "transparent",
                  color: lang === "ru" ? "#091324" : isLight ? "#475569" : "#94A3B8",
                  fontWeight: 800,
                  fontSize: "12px",
                  padding: "5px 10px",
                  borderRadius: "999px",
                }}
              >
                🇷🇺 RU
              </button>
              <button
                data-keep-dark="true"
                onClick={() => setLang("en")}
                style={{
                  cursor: "pointer",
                  border: "none",
                  background:
                    lang === "en"
                      ? "linear-gradient(135deg, #FF6200 0%, #FFC400 100%)"
                      : "transparent",
                  color: lang === "en" ? "#091324" : isLight ? "#475569" : "#94A3B8",
                  fontWeight: 800,
                  fontSize: "12px",
                  padding: "5px 10px",
                  borderRadius: "999px",
                }}
              >
                🇬🇧 EN
              </button>
            </div>

            <a
              data-keep-dark="true"
              href="https://t.me/futbolnaya_jara"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                background: "linear-gradient(135deg, #229ED9 0%, #1577A8 100%)",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "12px",
                padding: "8px 14px",
                borderRadius: "999px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 4px 12px rgba(34, 158, 217, 0.35)",
                whiteSpace: "nowrap",
              }}
            >
              <span>✈️</span>
              <span>{isRu ? "Telegram" : "Telegram"}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Sticky Live Match Score Ticker */}
      <LiveScoreTicker lang={lang} />

      {/* Main Content Container */}
      <main
        className="golason-main-container"
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "28px 20px 64px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        {/* 1. Editorial News & Transfer Reliability Radar */}
        {(activeSection === "all" || activeSection === "news") && (
          <section id="news-section">
            <NewsArticleGrid lang={lang} />
          </section>
        )}

        {/* 2. Telegram Video Highlight Bridge Banner */}
        {(activeSection === "all" ||
          activeSection === "tactics" ||
          activeSection === "news") && (
          <section id="telegram-bridge" data-keep-dark="true">
            <TelegramHighlightBanner lang={lang} />
          </section>
        )}

        {/* 3. Interactive Match Center: Dark Tactical Pitch (Sofascore style) + Substitution Broadcast Card */}
        {(activeSection === "all" || activeSection === "tactics") && (
          <section
            id="tactics-section"
            style={{ display: "flex", flexDirection: "column", gap: "28px" }}
          >
            <div>
              <div
                data-keep-dark="true"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: isLight ? "#FFF7ED" : "rgba(255, 98, 0, 0.16)",
                  border: "1px solid #FF6200",
                  color: isLight ? "#C2410C" : "#FFC400",
                  padding: "6px 14px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 800,
                  marginBottom: "10px",
                }}
              >
                <span>⚽ LIVE MATCH CENTER</span>
                <span>•</span>
                <span>
                  {isRu
                    ? "ТАКТИЧЕСКАЯ СХЕМА И ЗАМЕНЫ"
                    : "TACTICAL PITCH & SUBSTITUTIONS"}
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "clamp(20px, 3vw, 28px)",
                  fontWeight: 900,
                  margin: "0 0 8px 0",
                  color: palette.textPrimary,
                }}
              >
                {isRu
                  ? "Стартовые составы в стиле Sofascore и ключевые замены матча"
                  : "Sofascore-Style Tactical Lineups & Key Match Substitutions"}
              </h2>
            </div>

            <div className="golason-pitch-scroll-wrap" data-keep-dark="true">
              <TacticalPitch lang={lang} />
            </div>
            <SubstitutionCard lang={lang} />
          </section>
        )}

        {/* 4. Two-Column Bottom Hub: Multi-League Standings + 1-Click Fan Reaction Polls */}
        {(activeSection === "all" ||
          activeSection === "standings" ||
          activeSection === "polls") && (
          <section
            id="standings-and-polls"
            className="golason-two-col-grid"
            style={{
              display: "grid",
              gridTemplateColumns:
                activeSection === "all"
                  ? "repeat(auto-fit, minmax(min(100%, 440px), 1fr))"
                  : "1fr",
              gap: "28px",
              alignItems: "start",
            }}
          >
            {(activeSection === "all" || activeSection === "standings") && (
              <div style={{ width: "100%", overflowX: "auto" }}>
                <LeagueStandingsTable lang={lang} />
              </div>
            )}
            {(activeSection === "all" || activeSection === "polls") && (
              <div style={{ width: "100%" }}>
                <FanReactionPoll lang={lang} />
              </div>
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: `1px solid ${palette.cardBorder}`,
          backgroundColor: palette.footerBg,
          padding: "32px 20px",
          marginTop: "32px",
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
            color: palette.textMuted,
            fontSize: "13px",
          }}
        >
          <div>
            <strong style={{ color: palette.textPrimary }}>
              GOLASON.COM x ФУТБОЛЬНАЯ ЖАРА
            </strong>{" "}
            —{" "}
            {isRu
              ? "Международный футбольный портал (RU / EN)"
              : "Bilingual Football Media & Match Center (EN / RU)"}
          </div>
          <div
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://t.me/futbolnaya_jara"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: palette.accentOrange,
                textDecoration: "none",
                fontWeight: 800,
              }}
            >
              Telegram: @futbolnaya_jara
            </a>
            <a
              href="/api/live"
              style={{ color: palette.textMuted, textDecoration: "none" }}
            >
              Live API JSON
            </a>
            <a
              href="/sitemap.xml"
              style={{ color: palette.textMuted, textDecoration: "none" }}
            >
              Sitemap.xml
            </a>
            <a
              href="/robots.txt"
              style={{ color: palette.textMuted, textDecoration: "none" }}
            >
              Robots.txt
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
