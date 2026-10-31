"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ClubLogo } from "@/lib/clubLogos";
import { getFotmobPlayerImage } from "@/lib/types";
import { LiveScoreTicker } from "@/components/ticker";

type PortalLang = "ru" | "en";
type ReliabilityFilter = "ALL" | 100 | 90 | 50;

interface TransferDealRow {
  id: string;
  playerNameRu: string;
  playerNameEn: string;
  position: string;
  age: number;
  fotmobId: number;
  fromClubId: string;
  fromClubRu: string;
  fromClubEn: string;
  toClubId: string;
  toClubRu: string;
  toClubEn: string;
  feeRu: string;
  feeEn: string;
  contractRu: string;
  contractEn: string;
  reliability: 100 | 90 | 50;
  sourceRu: string;
  sourceEn: string;
  articleSlug: string;
}

interface TransferEditorialStory {
  id: string;
  slug: string;
  espnPhotoUrl: string;
  badgeRu: string;
  badgeEn: string;
  reliability: 100 | 90 | 50;
  titleRu: string;
  titleEn: string;
  summaryRu: string;
  summaryEn: string;
  fromClubId: string;
  fromClubNameRu: string;
  fromClubNameEn: string;
  toClubId: string;
  toClubNameRu: string;
  toClubNameEn: string;
  feeLabel: string;
  sourceLabel: string;
}

const TRANSFER_DEALS: TransferDealRow[] = [
  {
    id: "tr-trent-rma",
    playerNameRu: "Трент Александер-Арнольд",
    playerNameEn: "Trent Alexander-Arnold",
    position: "RB",
    age: 27,
    fotmobId: 760712,
    fromClubId: "liverpool",
    fromClubRu: "Ливерпуль",
    fromClubEn: "Liverpool",
    toClubId: "real-madrid",
    toClubRu: "Реал Мадрид",
    toClubEn: "Real Madrid",
    feeRu: "Свободный агент (бонус €20 млн)",
    feeEn: "Free Transfer (€20M Signing Bonus)",
    contractRu: "Подписан предконтракт до 2030",
    contractEn: "Pre-Contract Signed to 2030",
    reliability: 100,
    sourceRu: "Официальный релиз / Юридический отдел",
    sourceEn: "Official Communiqué / Club Legal",
    articleSlug: "mbappe-el-clasico-hat-trick-endrick-cameo-bernabeu",
  },
  {
    id: "tr-yamal-bar",
    playerNameRu: "Ламин Ямаль",
    playerNameEn: "Lamine Yamal",
    position: "RW",
    age: 18,
    fotmobId: 1467236,
    fromClubId: "barcelona",
    fromClubRu: "Барселона",
    fromClubEn: "Barcelona",
    toClubId: "barcelona",
    toClubRu: "Барселона",
    toClubEn: "Barcelona",
    feeRu: "Отступные €1 000 млн",
    feeEn: "€1,000M Release Clause",
    contractRu: "Официальное продление до 2031",
    contractEn: "Official Renewal to 2031",
    reliability: 100,
    sourceRu: "Официальный сайт ФК «Барселона»",
    sourceEn: "FC Barcelona Official Statement",
    articleSlug: "lamine-yamal-youngest-el-clasico-goal-assist-record",
  },
  {
    id: "tr-ronaldo-nas",
    playerNameRu: "Криштиану Роналду",
    playerNameEn: "Cristiano Ronaldo",
    position: "ST",
    age: 41,
    fotmobId: 30893,
    fromClubId: "al-nassr",
    fromClubRu: "Аль-Наср",
    fromClubEn: "Al-Nassr",
    toClubId: "al-nassr",
    toClubRu: "Аль-Наср",
    toClubEn: "Al-Nassr",
    feeRu: "€200 млн / сезон",
    feeEn: "€200M / Season Package",
    contractRu: "Активирована опция до ЧМ-2026",
    contractEn: "Official Extension Locked",
    reliability: 100,
    sourceRu: "Официальное коммюнике «Аль-Насра»",
    sourceEn: "Al-Nassr FC Official Communiqué",
    articleSlug: "cristiano-ronaldo-925-career-goals-riyadh-derby-hat-trick",
  },
  {
    id: "tr-haaland-clause",
    playerNameRu: "Эрлинг Холанд",
    playerNameEn: "Erling Haaland",
    position: "ST",
    age: 25,
    fotmobId: 737066,
    fromClubId: "man-city",
    fromClubRu: "Манчестер Сити",
    fromClubEn: "Manchester City",
    toClubId: "barcelona",
    toClubRu: "Барселона / Реал Мадрид",
    toClubEn: "Barcelona / Real Madrid",
    feeRu: "Клаусула €175 млн (вне АПЛ)",
    feeEn: "€175M Non-EPL Release Clause",
    contractRu: "Активное окно переговоров",
    contractEn: "Active Negotiation Window",
    reliability: 90,
    sourceRu: "Фабрицио Романо и Дэвид Орнштейн",
    sourceEn: "Fabrizio Romano & David Ornstein",
    articleSlug: "erling-haaland-release-clause-transfer-radar-2026",
  },
  {
    id: "tr-wirtz-city",
    playerNameRu: "Флориан Вирц",
    playerNameEn: "Florian Wirtz",
    position: "CAM",
    age: 22,
    fotmobId: 1152455,
    fromClubId: "leverkusen",
    fromClubRu: "Байер Леверкузен",
    fromClubEn: "Bayer Leverkusen",
    toClubId: "man-city",
    toClubRu: "Манчестер Сити",
    toClubEn: "Manchester City",
    feeRu: "Оценка €125 млн + бонусы",
    feeEn: "€125M + Add-Ons Valuation",
    contractRu: "Прямые переговоры с агентом",
    contractEn: "Direct Agency Talks Scheduled",
    reliability: 90,
    sourceRu: "Sky Germany и The Athletic",
    sourceEn: "Sky Germany & The Athletic",
    articleSlug: "ancelotti-asymmetrical-4-3-1-2-bellingham-valverde-tactical-analysis",
  },
  {
    id: "tr-williams-ars",
    playerNameRu: "Нико Уильямс",
    playerNameEn: "Nico Williams",
    position: "LW",
    age: 23,
    fotmobId: 1202679,
    fromClubId: "athletic-club",
    fromClubRu: "Атлетик Бильбао",
    fromClubEn: "Athletic Club",
    toClubId: "arsenal",
    toClubRu: "Арсенал",
    toClubEn: "Arsenal",
    feeRu: "Фиксированные отступные €58 млн",
    feeEn: "€58M Fixed Buyout Clause",
    contractRu: "Согласование личных условий",
    contractEn: "Personal Terms Discussion",
    reliability: 90,
    sourceRu: "Relevo и Дэвид Орнштейн",
    sourceEn: "Relevo & David Ornstein",
    articleSlug: "erling-haaland-release-clause-transfer-radar-2026",
  },
  {
    id: "tr-vinicius-ahli",
    playerNameRu: "Винисиус Жуниор",
    playerNameEn: "Vinícius Júnior",
    position: "LW",
    age: 25,
    fotmobId: 846036,
    fromClubId: "real-madrid",
    fromClubRu: "Реал Мадрид",
    fromClubEn: "Real Madrid",
    toClubId: "al-ahli",
    toClubRu: "Аль-Ахли Джидда",
    toClubEn: "Al-Ahli Saudi",
    feeRu: "Слух о предложении €350 млн",
    feeEn: "€350M Exploratory Bid Rumor",
    contractRu: "Зондирование со стороны PIF",
    contractEn: "Exploratory PIF Approach",
    reliability: 50,
    sourceRu: "Испанская пресса / Слух",
    sourceEn: "Regional Press / Hot Rumor",
    articleSlug: "vinicius-junior-var-audio-controversy-penalty-check",
  },
];

const TRANSFER_EDITORIAL_STORIES: TransferEditorialStory[] = [
  {
    id: "story-haaland-clause",
    slug: "erling-haaland-release-clause-transfer-radar-2026",
    espnPhotoUrl: "https://a.espncdn.com/photo/2026/1029/r1738028_1296x729_16-9.jpg",
    badgeRu: "TIER 2 • 90% ПРОВЕРЕННЫЙ ИНСАЙД",
    badgeEn: "TIER 2 • 90% VERIFIED INSIDER",
    reliability: 90,
    titleRu:
      "РАДАР ТРАНСФЕРОВ: Особая клаусула Эрлинга Холанда в €175 млн для клубов вне АПЛ вступает в силу",
    titleEn:
      "TRANSFER RADAR: Erling Haaland's €175M Non-Premier League Release Clause Enters Active Window",
    summaryRu:
      "«Манчестер Сити» подготовил рекордный контракт в истории британского футбола, пока «Барселона» и «Реал» изучают структуру фиксированных отступных норвежца.",
    summaryEn:
      "Manchester City have tabled the largest wage package in British history while La Liga giants study the structured release terms with Rafaela Pimenta.",
    fromClubId: "man-city",
    fromClubNameRu: "Манчестер Сити",
    fromClubNameEn: "Man City",
    toClubId: "barcelona",
    toClubNameRu: "Ла Лига",
    toClubNameEn: "La Liga",
    feeLabel: "€175M Clause",
    sourceLabel: "Fabrizio Romano & Ornstein",
  },
  {
    id: "story-trent-rma",
    slug: "mbappe-el-clasico-hat-trick-endrick-cameo-bernabeu",
    espnPhotoUrl: "https://a.espncdn.com/photo/2026/1030/r1738704_1296x729_16-9.jpg",
    badgeRu: "TIER 1 • 100% ОФИЦИАЛЬНО",
    badgeEn: "TIER 1 • 100% OFFICIAL",
    reliability: 100,
    titleRu:
      "Оформление предконтрактных документов: как «Реал Мадрид» перестраивает правый фланг под Мбаппе",
    titleEn:
      "Pre-Contract Dossier Complete: How Real Madrid Are Rebuilding Their Right Flank Around Mbappé",
    summaryRu:
      "Юридический департамент согласовал пятилетний пакет до 2030 года. Разбираем, как диагонали Трента изменят геометрию атак на «Сантьяго Бернабеу».",
    summaryEn:
      "Legal departments have finalized a five-year agreement through 2030. Here is how elite progressive passing from right-back transforms Madrid's transition threat.",
    fromClubId: "liverpool",
    fromClubNameRu: "Ливерпуль",
    fromClubNameEn: "Liverpool",
    toClubId: "real-madrid",
    toClubNameRu: "Реал Мадрид",
    toClubNameEn: "Real Madrid",
    feeLabel: "5-Year Deal",
    sourceLabel: "Official Club Dossier",
  },
  {
    id: "story-yamal-clause",
    slug: "lamine-yamal-youngest-el-clasico-goal-assist-record",
    espnPhotoUrl: "https://a.espncdn.com/photo/2026/1027/r1736915_1296x729_16-9.jpg",
    badgeRu: "TIER 1 • 100% ОФИЦИАЛЬНО",
    badgeEn: "TIER 1 • 100% OFFICIAL",
    reliability: 100,
    titleRu:
      "Контрактная броня на €1 млрд: «Барселона» зафиксировала долгосрочное соглашение с Ламином Ямалем до 2031 года",
    titleEn:
      "€1B Release Clause Armor: Barcelona Lock In Lamine Yamal's Long-Term Extension Through 2031",
    summaryRu:
      "После исторического рекорда в Эль-Класико каталонский клуб официально зарегистрировал новую структуру контракта своего главного вундеркинда.",
    summaryEn:
      "Following his historic Bernabéu performance, Barcelona have formally registered the long-term contract extension protecting their teenage superstar.",
    fromClubId: "barcelona",
    fromClubNameRu: "Барселона",
    fromClubNameEn: "Barcelona",
    toClubId: "barcelona",
    toClubNameRu: "Барселона 2031",
    toClubNameEn: "Barcelona 2031",
    feeLabel: "€1,000M Clause",
    sourceLabel: "FC Barcelona Official",
  },
  {
    id: "story-vinicius-pif",
    slug: "vinicius-junior-var-audio-controversy-penalty-check",
    espnPhotoUrl: "https://a.espncdn.com/photo/2026/1030/r1738494_1296x729_16-9.jpg",
    badgeRu: "TIER 3 • 50% ГОРЯЧИЙ СЛУХ",
    badgeEn: "TIER 3 • 50% HOT RUMOR",
    reliability: 50,
    titleRu:
      "Саудовский фонд PIF готовит новый запрос на €350 млн по Винисиусу Жуниору на фоне споров в Ла Лиге",
    titleEn:
      "Saudi PIF Negotiators Prepare Fresh €350M Exploratory Approach for Vinícius Júnior",
    summaryRu:
      "Представители «Аль-Ахли» продолжают контакты с окружением бразильца, однако «Реал Мадрид» ссылается на сумму отступных в €1 млрд.",
    summaryEn:
      "Al-Ahli intermediaries remain in contact with the Brazilian winger's camp, though Real Madrid insist on his full €1B release clause.",
    fromClubId: "real-madrid",
    fromClubNameRu: "Реал Мадрид",
    fromClubNameEn: "Real Madrid",
    toClubId: "al-ahli",
    toClubNameRu: "Аль-Ахли",
    toClubNameEn: "Al-Ahli",
    feeLabel: "€350M Rumor",
    sourceLabel: "Spanish Press / PIF",
  },
];

function getReliabilityStyle(score: 100 | 90 | 50) {
  if (score === 100) {
    return {
      bg: "#ECFDF5",
      border: "#6EE7B7",
      text: "#047857",
      labelRu: "100% Официально (Tier 1)",
      labelEn: "100% Official (Tier 1)",
    };
  }
  if (score === 90) {
    return {
      bg: "#EFF6FF",
      border: "#93C5FD",
      text: "#1D4ED8",
      labelRu: "90% Инсайдер (Tier 2)",
      labelEn: "90% Verified Insider (Tier 2)",
    };
  }
  return {
    bg: "#FFFBEB",
    border: "#FCD34D",
    text: "#B45309",
    labelRu: "50% Слух (Tier 3)",
    labelEn: "50% Hot Rumor (Tier 3)",
  };
}

export default function TransfersTrackerPage() {
  const [lang, setLang] = useState<PortalLang>("ru");
  const [reliabilityFilter, setReliabilityFilter] =
    useState<ReliabilityFilter>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const isRu = lang === "ru";

  const filteredDeals = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return TRANSFER_DEALS.filter((deal) => {
      if (reliabilityFilter !== "ALL" && deal.reliability !== reliabilityFilter) {
        return false;
      }
      if (!q) return true;
      const haystack = [
        deal.playerNameRu,
        deal.playerNameEn,
        deal.fromClubRu,
        deal.fromClubEn,
        deal.toClubRu,
        deal.toClubEn,
        deal.sourceRu,
        deal.sourceEn,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [reliabilityFilter, searchQuery]);

  const filteredStories = useMemo(() => {
    if (reliabilityFilter === "ALL") return TRANSFER_EDITORIAL_STORIES;
    return TRANSFER_EDITORIAL_STORIES.filter(
      (st) => st.reliability === reliabilityFilter
    );
  }, [reliabilityFilter]);

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
                  ? "Радар трансферов и индекс достоверности"
                  : "Transfer Center & Reliability Radar"}
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
                href: "/news/erling-haaland-release-clause-transfer-radar-2026",
                labelRu: "Статьи",
                labelEn: "News",
              },
              {
                href: "/transfers",
                labelRu: "Трансферы",
                labelEn: "Transfers",
                active: true,
              },
              { href: "/standings", labelRu: "Таблицы", labelEn: "Standings" },
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
        {/* Top Sponsored Leaderboard Ad Slot */}
        <aside
          aria-label="Sponsored Banner"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: "12px",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 800,
                letterSpacing: "0.08em",
                color: "#64748B",
                border: "1px solid #CBD5E1",
                borderRadius: "4px",
                padding: "3px 7px",
                backgroundColor: "#F8FAFC",
              }}
            >
              {isRu ? "РЕКЛАМА • 728x90" : "SPONSORED • 728x90"}
            </span>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 800, color: "#0F172A" }}>
                {isRu
                  ? "Индекс достоверности трансферов GOLASON: отделяем 100% факты от слухов"
                  : "GOLASON Transfer Reliability Radar: Verified Club Deals vs. Tabloid Rumors"}
              </div>
              <div style={{ fontSize: "12px", color: "#64748B" }}>
                {isRu
                  ? "Мгновенные пуш-уведомления о закрытых сделках в Telegram @futbolnaya_jara"
                  : "Instant breaking transfer alerts on Telegram @futbolnaya_jara"}
              </div>
            </div>
          </div>
          <a
            href="https://t.me/futbolnaya_jara"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              fontSize: "12px",
              fontWeight: 800,
              color: "#EA580C",
              border: "1px solid #FDBA74",
              backgroundColor: "#FFF7ED",
              padding: "8px 14px",
              borderRadius: "8px",
            }}
          >
            {isRu ? "Подписаться на радар →" : "Join Transfer Radar →"}
          </a>
        </aside>

        {/* Page Header + Reliability Filter Controls */}
        <section
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: "16px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
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
                  ? "Центр трансферов и Радар достоверности (100% / 90% / 50%)"
                  : "Transfer Center & Reliability Radar (100% / 90% / 50%)"}
              </h1>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: "14px",
                  color: "#475569",
                  maxWidth: "72ch",
                }}
              >
                {isRu
                  ? "Полная таблица подтвержденных сделок, активаций отступных и проверенных инсайдов с портретами игроков, эмблемами клубов и ссылками на редакционные разборы."
                  : "Complete tracker of official signings, buyout clauses, and verified insider dossiers with club crests and direct links to full editorial breakdowns."}
              </p>
            </div>

            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isRu
                  ? "Поиск игрока или клуба (Холанд, Реал Мадрид)..."
                  : "Filter player or club (Haaland, Real Madrid)..."
              }
              style={{
                padding: "9px 14px",
                borderRadius: "8px",
                border: "1px solid #CBD5E1",
                backgroundColor: "#F8FAFC",
                color: "#0F172A",
                fontSize: "13px",
                minWidth: "260px",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
              paddingTop: "14px",
              borderTop: "1px solid #E2E8F0",
            }}
          >
            {(
              [
                {
                  val: "ALL",
                  labelRu: "Все сделки и слухи",
                  labelEn: "All Deals & Dossiers",
                },
                {
                  val: 100,
                  labelRu: "Tier 1: 100% Официально",
                  labelEn: "Tier 1: 100% Official",
                },
                {
                  val: 90,
                  labelRu: "Tier 2: 90% Проверенный инсайдер",
                  labelEn: "Tier 2: 90% Verified Insider",
                },
                {
                  val: 50,
                  labelRu: "Tier 3: 50% Горячий слух",
                  labelEn: "Tier 3: 50% Hot Rumor",
                },
              ] as const
            ).map((btn) => {
              const active = reliabilityFilter === btn.val;
              return (
                <button
                  key={String(btn.val)}
                  type="button"
                  onClick={() => setReliabilityFilter(btn.val)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "8px",
                    fontSize: "12.5px",
                    fontWeight: active ? 800 : 600,
                    cursor: "pointer",
                    border: active ? "1px solid #0F172A" : "1px solid #E2E8F0",
                    backgroundColor: active ? "#0F172A" : "#FFFFFF",
                    color: active ? "#FFFFFF" : "#334155",
                  }}
                >
                  {isRu ? btn.labelRu : btn.labelEn}
                </button>
              );
            })}
          </div>
        </section>

        {/* Confirmed Deals & Insider Rumors Table */}
        <section
          aria-label="Transfers Tracker Table"
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
              padding: "18px 24px",
              borderBottom: "1px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 900,
                color: "#0F172A",
              }}
            >
              {isRu
                ? "Таблица трансферов и контрактных клаусул"
                : "Confirmed Deals & Insider Transfer Radar Table"}
            </h2>
            <span style={{ fontSize: "12px", color: "#64748B", fontWeight: 600 }}>
              {isRu
                ? `Найдено записей: ${filteredDeals.length}`
                : `Showing ${filteredDeals.length} records`}
            </span>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                fontSize: "13px",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#F8FAFC",
                    borderBottom: "1px solid #E2E8F0",
                    fontSize: "11px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#64748B",
                  }}
                >
                  <th style={{ padding: "12px 20px" }}>
                    {isRu ? "Игрок" : "Player"}
                  </th>
                  <th style={{ padding: "12px 16px" }}>
                    {isRu ? "Откуда → Куда" : "From Club → To Club"}
                  </th>
                  <th style={{ padding: "12px 16px" }}>
                    {isRu ? "Сумма / Клаусула и статус" : "Fee / Contract Status"}
                  </th>
                  <th style={{ padding: "12px 16px" }}>
                    {isRu ? "Достоверность" : "Reliability Tier"}
                  </th>
                  <th style={{ padding: "12px 20px", textAlign: "right" }}>
                    {isRu ? "Досье" : "Article"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDeals.map((deal) => {
                  const badge = getReliabilityStyle(deal.reliability);
                  return (
                    <tr
                      key={deal.id}
                      style={{
                        borderBottom: "1px solid #E2E8F0",
                        backgroundColor: "#FFFFFF",
                      }}
                    >
                      {/* Player Portrait & Name */}
                      <td style={{ padding: "14px 20px", minWidth: "220px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <img
                            src={getFotmobPlayerImage(deal.fotmobId)}
                            alt={isRu ? deal.playerNameRu : deal.playerNameEn}
                            width={42}
                            height={42}
                            style={{
                              width: "42px",
                              height: "42px",
                              borderRadius: "50%",
                              objectFit: "cover",
                              backgroundColor: "#F1F5F9",
                              border: "1px solid #CBD5E1",
                              flexShrink: 0,
                            }}
                          />
                          <div>
                            <div
                              style={{
                                fontWeight: 800,
                                color: "#0F172A",
                                fontSize: "14px",
                              }}
                            >
                              {isRu ? deal.playerNameRu : deal.playerNameEn}
                            </div>
                            <div
                              style={{
                                fontSize: "11.5px",
                                color: "#64748B",
                                fontWeight: 600,
                              }}
                            >
                              {deal.position} • {deal.age}{" "}
                              {isRu ? "лет" : "yrs"}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* From Club -> To Club with ClubLogo */}
                      <td style={{ padding: "14px 16px", minWidth: "260px" }}>
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
                              fontWeight: 700,
                              color: "#334155",
                            }}
                          >
                            <ClubLogo
                              teamId={deal.fromClubId}
                              teamName={deal.fromClubEn}
                              teamNameRu={deal.fromClubRu}
                              size={24}
                            />
                            <span>
                              {isRu ? deal.fromClubRu : deal.fromClubEn}
                            </span>
                          </span>

                          <span
                            style={{
                              color: "#EA580C",
                              fontWeight: 900,
                              fontSize: "14px",
                            }}
                          >
                            →
                          </span>

                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              fontWeight: 800,
                              color: "#0F172A",
                            }}
                          >
                            <ClubLogo
                              teamId={deal.toClubId}
                              teamName={deal.toClubEn}
                              teamNameRu={deal.toClubRu}
                              size={24}
                            />
                            <span>{isRu ? deal.toClubRu : deal.toClubEn}</span>
                          </span>
                        </div>
                      </td>

                      {/* Fee & Contract Status */}
                      <td style={{ padding: "14px 16px", minWidth: "210px" }}>
                        <div style={{ fontWeight: 800, color: "#0F172A" }}>
                          {isRu ? deal.feeRu : deal.feeEn}
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#64748B",
                            marginTop: "2px",
                          }}
                        >
                          {isRu ? deal.contractRu : deal.contractEn}
                        </div>
                      </td>

                      {/* Reliability Tier */}
                      <td style={{ padding: "14px 16px", minWidth: "200px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "4px 10px",
                            borderRadius: "999px",
                            fontSize: "11.5px",
                            fontWeight: 800,
                            backgroundColor: badge.bg,
                            border: `1px solid ${badge.border}`,
                            color: badge.text,
                          }}
                        >
                          {isRu ? badge.labelRu : badge.labelEn}
                        </span>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#64748B",
                            marginTop: "4px",
                          }}
                        >
                          {isRu ? deal.sourceRu : deal.sourceEn}
                        </div>
                      </td>

                      {/* Link to /news/[slug] */}
                      <td
                        style={{
                          padding: "14px 20px",
                          textAlign: "right",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <Link
                          href={`/news/${deal.articleSlug}`}
                          style={{
                            textDecoration: "none",
                            fontSize: "12px",
                            fontWeight: 800,
                            color: "#EA580C",
                            padding: "7px 12px",
                            borderRadius: "8px",
                            backgroundColor: "#FFF7ED",
                            border: "1px solid #FDBA74",
                          }}
                        >
                          {isRu ? "Читать разбор →" : "Read Dossier →"}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Photo-Driven Transfer News Cards with Real ESPN Photos */}
        <section
          aria-label="Photo Transfer News Articles"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "22px",
                fontWeight: 900,
                color: "#0F172A",
              }}
            >
              {isRu
                ? "Главные трансферные досье и инсайдерские расследования"
                : "Featured Transfer Dossiers & Photo Reports"}
            </h2>
            <Link
              href="/search?q=transfer"
              style={{
                fontSize: "13px",
                fontWeight: 800,
                color: "#EA580C",
                textDecoration: "none",
              }}
            >
              {isRu ? "Искать в архиве трансферов →" : "Search Transfer Archive →"}
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 380px), 1fr))",
              gap: "20px",
            }}
          >
            {filteredStories.map((story) => {
              const badge = getReliabilityStyle(story.reliability);
              return (
                <article
                  key={story.id}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "16px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 2px 10px rgba(15, 23, 42, 0.04)",
                  }}
                >
                  <div>
                    <Link
                      href={`/news/${story.slug}`}
                      style={{
                        display: "block",
                        aspectRatio: "16 / 9",
                        width: "100%",
                        overflow: "hidden",
                        backgroundColor: "#E2E8F0",
                      }}
                    >
                      <img
                        src={story.espnPhotoUrl}
                        alt={isRu ? story.titleRu : story.titleEn}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </Link>

                    <div
                      style={{
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      {/* Club Movement Pill & Reliability Badge */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "8px",
                          flexWrap: "wrap",
                        }}
                      >
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            backgroundColor: "#F8FAFC",
                            border: "1px solid #E2E8F0",
                            borderRadius: "8px",
                            padding: "4px 8px",
                            fontSize: "11.5px",
                            fontWeight: 700,
                          }}
                        >
                          <ClubLogo
                            teamId={story.fromClubId}
                            teamName={story.fromClubNameEn}
                            size={18}
                          />
                          <span>
                            {isRu ? story.fromClubNameRu : story.fromClubNameEn}
                          </span>
                          <span style={{ color: "#EA580C", fontWeight: 900 }}>
                            →
                          </span>
                          <ClubLogo
                            teamId={story.toClubId}
                            teamName={story.toClubNameEn}
                            size={18}
                          />
                          <span>
                            {isRu ? story.toClubNameRu : story.toClubNameEn}
                          </span>
                        </div>

                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 800,
                            padding: "3px 9px",
                            borderRadius: "999px",
                            backgroundColor: badge.bg,
                            border: `1px solid ${badge.border}`,
                            color: badge.text,
                          }}
                        >
                          {story.reliability}%
                        </span>
                      </div>

                      <h3
                        style={{
                          margin: 0,
                          fontSize: "18px",
                          fontWeight: 900,
                          lineHeight: 1.35,
                          color: "#0F172A",
                        }}
                      >
                        <Link
                          href={`/news/${story.slug}`}
                          style={{
                            color: "inherit",
                            textDecoration: "none",
                          }}
                        >
                          {isRu ? story.titleRu : story.titleEn}
                        </Link>
                      </h3>

                      <p
                        style={{
                          margin: 0,
                          fontSize: "13.5px",
                          lineHeight: 1.6,
                          color: "#475569",
                        }}
                      >
                        {isRu ? story.summaryRu : story.summaryEn}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "14px 20px",
                      borderTop: "1px solid #E2E8F0",
                      backgroundColor: "#F8FAFC",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "10px",
                      fontSize: "12px",
                    }}
                  >
                    <span style={{ color: "#64748B", fontWeight: 600 }}>
                      {story.sourceLabel} •{" "}
                      <strong style={{ color: "#0F172A" }}>
                        {story.feeLabel}
                      </strong>
                    </span>
                    <Link
                      href={`/news/${story.slug}`}
                      style={{
                        color: "#EA580C",
                        fontWeight: 800,
                        textDecoration: "none",
                      }}
                    >
                      {isRu ? "Открыть статью →" : "Full Story →"}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
