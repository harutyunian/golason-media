"use client";

import React, { useState } from "react";
import {
  TransferRadarBadge,
  TransferTier,
  SupportedLocale,
} from "./TransferRadarBadge";

export interface HeroStoryItem {
  id: string;
  categoryEn: string;
  categoryRu: string;
  titleEn: string;
  titleRu: string;
  summaryEn: string;
  summaryRu: string;
  bodyEn?: string[];
  bodyRu?: string[];
  readingTimeMinutes: number;
  publishedAtEn: string;
  publishedAtRu: string;
  author: string;
  tier: TransferTier;
  reliability?: number;
  source: string;
  telegramUrl?: string;
  tags?: string[];
}

export const DEFAULT_HERO_STORY: HeroStoryItem = {
  id: "hero-el-clasico-transfer-shockwave",
  categoryEn: "BREAKING TRANSFER & TACTICAL SPOTLIGHT",
  categoryRu: "ГЛАВНЫЙ ИНСАЙД • ТРАНСФЕРНЫЙ РАДАР",
  titleEn:
    "Real Madrid & Barcelona Lock Horns Ahead of El Clásico as €130M Summer Mega-Deal Reaches Final Verbal Stage",
  titleRu:
    "Битва гигантов перед Эль-Класико: супертрансфер за €130 млн вышел на финальную стадию устных договорённостей",
  summaryEn:
    "Exclusive tactical and transfer briefing: European champions finalize key midfield succession plan while Hansi Flick's high defensive line prepares for Vinícius Jr. and Mbappé's transition sprints.",
  summaryRu:
    "Эксклюзивный тактический и трансферный разбор: мадридский клуб закрывает ключевую сделку в полузащиту, пока высокая линия обороны Ханси Флика готовится к рывкам Винисиуса и Мбаппе.",
  bodyEn: [
    "Club executives and player representatives held a decisive three-hour summit in Madrid late Thursday night, sealing the structural salary terms and performance-based Ballon d'Or clauses.",
    "Meanwhile on the tactical pitch, data analysts highlight that 68% of expected threat (xT) in this weekend's clash will originate from rapid wide overloads and half-space switches.",
    "Golason Media's Transfer Radar upgrades the move to Tier 1 Official verification following direct confirmation from institutional sporting directors.",
  ],
  bodyRu: [
    "Руководители клуба и представители игрока провели решающий трёхчасовой саммит в Мадриде поздно вечером в четверг, согласовав структуру контракта и бонусы за «Золотой мяч».",
    "Тем временем тактические аналитики отмечают, что 68% ожидаемой угрозы (xT) в предстоящем матче будет создаваться за счёт быстрых перегрузов на флангах и переводов в полуфланги.",
    "Трансферный радар Golason Media повышает статус сделки до Уровня 1 (100% Официально) после прямого подтверждения со стороны спортивной дирекции.",
  ],
  readingTimeMinutes: 4,
  publishedAtEn: "12 mins ago • Madrid / Barcelona Desk",
  publishedAtRu: "12 мин назад • Редакция Мадрид / Барселона",
  author: "Golason Editorial Desk",
  tier: 1,
  reliability: 100,
  source: "Official Club Communiqué & Fabrizio Romano",
  telegramUrl: "https://t.me/futbolnaya_jara",
  tags: ["#ElClasico", "#TransferRadar", "#LaLiga", "#ChampionsLeague"],
};

export interface NewsHeroCardProps {
  story?: Partial<HeroStoryItem>;
  lang?: SupportedLocale;
  locale?: SupportedLocale;
  onSelectStory?: (story: HeroStoryItem) => void;
  className?: string;
}

export function NewsHeroCard({
  story,
  lang,
  locale,
  onSelectStory,
  className = "",
}: NewsHeroCardProps) {
  const activeLocale: SupportedLocale = lang ?? locale ?? "en";
  const [expanded, setExpanded] = useState(false);

  const mergedStory: HeroStoryItem = {
    ...DEFAULT_HERO_STORY,
    ...story,
  };

  const category =
    activeLocale === "ru" ? mergedStory.categoryRu : mergedStory.categoryEn;
  const title =
    activeLocale === "ru" ? mergedStory.titleRu : mergedStory.titleEn;
  const summary =
    activeLocale === "ru" ? mergedStory.summaryRu : mergedStory.summaryEn;
  const publishedAt =
    activeLocale === "ru"
      ? mergedStory.publishedAtRu
      : mergedStory.publishedAtEn;
  const paragraphs =
    (activeLocale === "ru" ? mergedStory.bodyRu : mergedStory.bodyEn) ??
    DEFAULT_HERO_STORY.bodyEn ??
    [];

  const readingTimeText =
    activeLocale === "ru"
      ? `${mergedStory.readingTimeMinutes} мин чтения`
      : `${mergedStory.readingTimeMinutes} min read`;

  const handleReadClick = () => {
    if (onSelectStory) {
      onSelectStory(mergedStory);
    } else {
      setExpanded((prev) => !prev);
    }
  };

  return (
    <article
      className={`news-hero-card ${className}`}
      style={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #0A1128 0%, #101B3B 52%, #2D1820 82%, #FF5722 140%)",
        border: "1px solid rgba(255, 87, 34, 0.38)",
        boxShadow:
          "0 20px 45px rgba(5, 10, 25, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
        padding: "28px",
        color: "#F8FAFC",
      }}
    >
      {/* Decorative Fiery Orange & Midnight Navy radial glow overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-90px",
          right: "-90px",
          width: "320px",
          height: "320px",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, rgba(255, 87, 34, 0.32) 0%, rgba(10, 17, 40, 0) 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Top Bar: Category Pill + Reading Time + Live Spotlight Indicator */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "18px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "5px 12px",
              borderRadius: "999px",
              background: "linear-gradient(90deg, #FF5722 0%, #EA580C 100%)",
              color: "#FFFFFF",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              boxShadow: "0 4px 14px rgba(255, 87, 34, 0.45)",
            }}
          >
            <span>⚡</span>
            <span>{category}</span>
          </span>

          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              padding: "4px 10px",
              borderRadius: "999px",
              backgroundColor: "rgba(15, 23, 42, 0.78)",
              border: "1px solid rgba(148, 163, 184, 0.25)",
              color: "#E2E8F0",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            <span>⏱️</span>
            <span>{readingTimeText}</span>
          </span>
        </div>

        <span
          style={{
            fontSize: "12px",
            color: "#94A3B8",
            fontWeight: 500,
          }}
        >
          {publishedAt}
        </span>
      </div>

      {/* Main Content Layout: Headline + Summary + Transfer Radar Badge */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "22px",
          alignItems: "start",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "clamp(1.45rem, 2.5vw, 2.1rem)",
              lineHeight: 1.2,
              fontWeight: 900,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              margin: "0 0 14px 0",
            }}
          >
            {title}
          </h2>

          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.65,
              color: "#CBD5E1",
              margin: "0 0 18px 0",
            }}
          >
            {summary}
          </p>

          {mergedStory.tags && mergedStory.tags.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "18px",
              }}
            >
              {mergedStory.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#FF8A65",
                    backgroundColor: "rgba(255, 87, 34, 0.12)",
                    border: "1px solid rgba(255, 87, 34, 0.28)",
                    padding: "3px 9px",
                    borderRadius: "6px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right Spotlight Panel: Transfer Radar Badge & Video Highlight CTA */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            backgroundColor: "rgba(10, 17, 40, 0.65)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "14px",
            padding: "16px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#94A3B8",
            }}
          >
            {activeLocale === "ru"
              ? "Индекс достоверности трансфера"
              : "Transfer Reliability Radar"}
          </div>

          <TransferRadarBadge
            tier={mergedStory.tier}
            reliability={mergedStory.reliability}
            source={mergedStory.source}
            lang={activeLocale}
          />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "4px",
            }}
          >
            <button
              type="button"
              onClick={handleReadClick}
              style={{
                flex: "1 1 auto",
                padding: "10px 16px",
                borderRadius: "10px",
                border: "none",
                background: "linear-gradient(90deg, #FF5722 0%, #F97316 100%)",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "13px",
                cursor: "pointer",
                boxShadow: "0 6px 18px rgba(255, 87, 34, 0.35)",
              }}
            >
              {expanded
                ? activeLocale === "ru"
                  ? "Свернуть материал ▲"
                  : "Hide Full Story ▲"
                : activeLocale === "ru"
                  ? "Читать разбор полностью →"
                  : "Read Full Breakdown →"}
            </button>

            <a
              href={mergedStory.telegramUrl || "https://t.me/futbolnaya_jara"}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "10px 14px",
                borderRadius: "10px",
                backgroundColor: "rgba(56, 189, 248, 0.14)",
                border: "1px solid rgba(56, 189, 248, 0.4)",
                color: "#38BDF8",
                fontWeight: 700,
                fontSize: "12px",
                textDecoration: "none",
              }}
            >
              <span>🎥</span>
              <span>
                {activeLocale === "ru"
                  ? "Видео в Telegram"
                  : "Watch on Telegram"}
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Expandable Full Story Reader Drawer */}
      {expanded && paragraphs.length > 0 && (
        <div
          style={{
            position: "relative",
            zIndex: 1,
            marginTop: "20px",
            paddingTop: "18px",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              style={{
                margin: 0,
                fontSize: "14px",
                lineHeight: 1.7,
                color: "#E2E8F0",
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </article>
  );
}

export default NewsHeroCard;
