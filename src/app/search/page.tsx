"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ClubLogo } from "@/lib/clubLogos";
import { LiveScoreTicker } from "@/components/ticker";

type PortalLang = "ru" | "en";

interface SearchableArticle {
  id: string;
  slug: string;
  titleRu: string;
  titleEn: string;
  summaryRu: string;
  summaryEn: string;
  categoryRu: string;
  categoryEn: string;
  espnPhotoUrl: string;
  clubNameRu: string;
  clubNameEn: string;
  clubId: string;
  reliability: number;
  keywords: string[];
}

interface SearchableMatch {
  id: string;
  leagueRu: string;
  leagueEn: string;
  status: string;
  homeId: string;
  homeRu: string;
  homeEn: string;
  awayId: string;
  awayRu: string;
  awayEn: string;
  scoreLabel: string;
  venueRu: string;
  venueEn: string;
  keywords: string[];
}

interface SearchableClub {
  id: string;
  nameRu: string;
  nameEn: string;
  leagueRu: string;
  leagueEn: string;
  featuredMatchId: string;
}

const SEARCH_ARTICLES: SearchableArticle[] = [
  {
    id: "sr-art-mbappe",
    slug: "mbappe-el-clasico-hat-trick-endrick-cameo-bernabeu",
    titleRu:
      "Хет-трик Мбаппе в Эль-Класико и электрический выход Эндрика: как «Реал» взломал высокую линию «Барсы»",
    titleEn:
      "Mbappé’s El Clásico Hat-Trick & Endrick’s Electric Cameo: How Real Madrid Shattered Barcelona’s High Line",
    summaryRu:
      "Килиан Мбаппе оформил три гола благодаря таймингу рывков под передачи Беллингема и Вальверде.",
    summaryEn:
      "Kylian Mbappé timed three clinical runs behind Barcelona’s offside trap off passes from Bellingham and Valverde.",
    categoryRu: "Обзор матча • Ла Лига",
    categoryEn: "Match Report • La Liga",
    espnPhotoUrl: "https://a.espncdn.com/photo/2026/1030/r1738494_1296x729_16-9.jpg",
    clubNameRu: "Реал Мадрид",
    clubNameEn: "Real Madrid",
    clubId: "real-madrid",
    reliability: 100,
    keywords: [
      "mbappe",
      "мбаппе",
      "real madrid",
      "реал",
      "endrick",
      "эндрик",
      "clasico",
      "класико",
      "bellingham",
      "беллингем",
    ],
  },
  {
    id: "sr-art-yamal",
    slug: "lamine-yamal-youngest-el-clasico-goal-assist-record",
    titleRu:
      "Исторический рекорд Ламина Ямаля: самый молодой автор «гол+пас» в XXI веке на «Сантьяго Бернабеу»",
    titleEn:
      "Lamine Yamal Makes History: Youngest Player to Record Goal + Assist at the Bernabéu in the 21st Century",
    summaryRu:
      "Вингер «Барселоны» поразил дальнюю девятку и вырезал голевую передачу на Роберта Левандовски.",
    summaryEn:
      "Barcelona’s teenage phenomenon curled a trademark finish into the top corner before assisting Robert Lewandowski.",
    categoryRu: "Рекорд • Статистика",
    categoryEn: "Milestone • Analytics",
    espnPhotoUrl: "https://a.espncdn.com/photo/2026/1027/r1736915_1296x729_16-9.jpg",
    clubNameRu: "Барселона",
    clubNameEn: "Barcelona",
    clubId: "barcelona",
    reliability: 100,
    keywords: [
      "yamal",
      "ямаль",
      "barcelona",
      "барселона",
      "lewandowski",
      "левандовски",
      "flick",
      "флик",
    ],
  },
  {
    id: "sr-art-haaland",
    slug: "erling-haaland-release-clause-transfer-radar-2026",
    titleRu:
      "РАДАР ТРАНСФЕРОВ: Особая клаусула Эрлинга Холанда в €175 млн для клубов вне АПЛ активируется летом",
    titleEn:
      "TRANSFER RADAR: Erling Haaland’s €175M Non-Premier League Release Clause Enters Active Window",
    summaryRu:
      "Инсайдеры Tier-1 сообщают о подготовке рекордного контракта в «Ман Сити» на фоне интереса испанских грандов.",
    summaryEn:
      "Tier-1 insiders report Manchester City have tabled a record extension while Spanish giants study his buyout structure.",
    categoryRu: "Радар трансферов • Инсайд",
    categoryEn: "Transfer Radar • Insider",
    espnPhotoUrl: "https://a.espncdn.com/photo/2026/1029/r1738028_1296x729_16-9.jpg",
    clubNameRu: "Манчестер Сити",
    clubNameEn: "Manchester City",
    clubId: "man-city",
    reliability: 90,
    keywords: [
      "haaland",
      "холанд",
      "man city",
      "ман сити",
      "transfer",
      "трансфер",
      "clause",
      "клаусула",
    ],
  },
  {
    id: "sr-art-vinicius",
    slug: "vinicius-junior-var-audio-controversy-penalty-check",
    titleRu:
      "Драма с VAR вокруг Винисиуса Жуниора и запрос саудовского фонда PIF на €350 млн",
    titleEn:
      "Vinícius Júnior VAR Audio Released as Saudi PIF Prepare €350M Exploratory Approach",
    summaryRu:
      "Опубликована полная расшифровка переговоров комнаты VOR после четырехминутной проверки пенальти.",
    summaryEn:
      "Full VOR room audio released after a four-minute penalty review involving Vinícius Júnior.",
    categoryRu: "Разбор VAR • Трансферы",
    categoryEn: "VAR Breakdown • Transfers",
    espnPhotoUrl: "https://a.espncdn.com/photo/2026/1030/r1738704_1296x729_16-9.jpg",
    clubNameRu: "Реал Мадрид",
    clubNameEn: "Real Madrid",
    clubId: "real-madrid",
    reliability: 50,
    keywords: [
      "vinicius",
      "винисиус",
      "var",
      "вар",
      "al-ahli",
      "saudi",
      "transfer",
    ],
  },
  {
    id: "sr-art-ronaldo",
    slug: "cristiano-ronaldo-925-career-goals-riyadh-derby-hat-trick",
    titleRu:
      "Феномен Криштиану Роналду: дубль и хет-трик в дерби Эр-Рияда и курс на 1000 официальных голов",
    titleEn:
      "Cristiano Ronaldo’s Immortal March Past 900+ Goals: Riyadh Derby Brilliance Ignites Road to 1,000",
    summaryRu:
      "Капитан «Аль-Насра» продолжает бить мировые рекорды результативности и продлил контракт с клубом.",
    summaryEn:
      "Al-Nassr's captain continues his historic pursuit of 1,000 official career goals after locking in his contract extension.",
    categoryRu: "Наследие • 900+ Голов",
    categoryEn: "Legacy • 900+ Goals",
    espnPhotoUrl: "https://a.espncdn.com/photo/2026/1030/r1738425_1296x729_16-9.jpg",
    clubNameRu: "Аль-Наср",
    clubNameEn: "Al-Nassr",
    clubId: "al-nassr",
    reliability: 100,
    keywords: [
      "ronaldo",
      "роналду",
      "al-nassr",
      "аль-наср",
      "al-hilal",
      "saudi",
      "1000",
    ],
  },
  {
    id: "sr-art-ancelotti",
    slug: "ancelotti-asymmetrical-4-3-1-2-bellingham-valverde-tactical-analysis",
    titleRu:
      "Тактический сдвиг Анчелотти: как асимметричный ромб 4-3-1-2 с Вальверде и Беллингемом нейтрализовал прессинг",
    titleEn:
      "Ancelotti’s Tactical Shift: How the Asymmetrical 4-3-1-2 Diamond With Valverde & Bellingham Crushed High Pressing",
    summaryRu:
      "Разбор тепловых карт и смены ролей: оборона в 4-4-2 и мгновенный вертикальный коридор на Мбаппе.",
    summaryEn:
      "Heat-map breakdown: defending in a compact 4-4-2 mid-block before springing vertical transitions.",
    categoryRu: "Тактический разбор • Доска",
    categoryEn: "Tactical Analysis • Pitch Board",
    espnPhotoUrl: "https://a.espncdn.com/photo/2026/1026/r1736765_3_1296x729_16-9.jpg",
    clubNameRu: "Реал Мадрид",
    clubNameEn: "Real Madrid",
    clubId: "real-madrid",
    reliability: 100,
    keywords: [
      "ancelotti",
      "анчелотти",
      "tactics",
      "тактика",
      "bellingham",
      "беллингем",
      "valverde",
      "вальверде",
    ],
  },
];

const SEARCH_MATCHES: SearchableMatch[] = [
  {
    id: "ucl-rma-mci",
    leagueRu: "Лига чемпионов УЕФА • 1/4 финала",
    leagueEn: "UEFA Champions League • Quarter-Final",
    status: "LIVE 78'",
    homeId: "real-madrid",
    homeRu: "Реал Мадрид",
    homeEn: "Real Madrid",
    awayId: "man-city",
    awayRu: "Манчестер Сити",
    awayEn: "Manchester City",
    scoreLabel: "3 : 2",
    venueRu: "Сантьяго Бернабеу, Мадрид",
    venueEn: "Santiago Bernabéu, Madrid",
    keywords: ["real madrid", "man city", "реал", "ман сити", "мбаппе", "холанд", "ucl"],
  },
  {
    id: "match-el-clasico",
    leagueRu: "Ла Лига • Эль-Класико",
    leagueEn: "La Liga • El Clásico",
    status: "LIVE 87'",
    homeId: "real-madrid",
    homeRu: "Реал Мадрид",
    homeEn: "Real Madrid",
    awayId: "barcelona",
    awayRu: "Барселона",
    awayEn: "Barcelona",
    scoreLabel: "3 : 2",
    venueRu: "Сантьяго Бернабеу, Мадрид",
    venueEn: "Santiago Bernabéu, Madrid",
    keywords: ["real madrid", "barcelona", "реал", "барселона", "класико", "ямаль", "мбаппе"],
  },
  {
    id: "laliga-bar-atm",
    leagueRu: "Ла Лига • Тур 28",
    leagueEn: "La Liga • Matchday 28",
    status: "LIVE 64'",
    homeId: "barcelona",
    homeRu: "Барселона",
    homeEn: "Barcelona",
    awayId: "atletico",
    awayRu: "Атлетико Мадрид",
    awayEn: "Atlético Madrid",
    scoreLabel: "2 : 1",
    venueRu: "Монжуик, Барселона",
    venueEn: "Montjuïc, Barcelona",
    keywords: ["barcelona", "atletico", "барселона", "атлетико", "ямаль", "левандовски"],
  },
  {
    id: "epl-ars-liv",
    leagueRu: "АПЛ • Тур 29",
    leagueEn: "Premier League • Matchday 29",
    status: "LIVE 83'",
    homeId: "arsenal",
    homeRu: "Арсенал",
    homeEn: "Arsenal",
    awayId: "liverpool",
    awayRu: "Ливерпуль",
    awayEn: "Liverpool",
    scoreLabel: "2 : 2",
    venueRu: "Эмирейтс, Лондон",
    venueEn: "Emirates Stadium, London",
    keywords: ["arsenal", "liverpool", "арсенал", "ливерпуль", "салах", "сака", "epl"],
  },
  {
    id: "seriea-int-juv",
    leagueRu: "Серия А • Дерби Италии",
    leagueEn: "Serie A • Derby d'Italia",
    status: "FT",
    homeId: "inter",
    homeRu: "Интер Милан",
    homeEn: "Inter Milan",
    awayId: "juventus",
    awayRu: "Ювентус",
    awayEn: "Juventus",
    scoreLabel: "2 : 0",
    venueRu: "Сан-Сиро, Милан",
    venueEn: "San Siro, Milan",
    keywords: ["inter", "juventus", "интер", "ювентус", "лаутаро", "серия а"],
  },
  {
    id: "saudi-nas-hil",
    leagueRu: "Саудовская Про-лига • Дерби Эр-Рияда",
    leagueEn: "Saudi Pro League • Riyadh Derby",
    status: "LIVE 51'",
    homeId: "al-nassr",
    homeRu: "Аль-Наср",
    homeEn: "Al-Nassr",
    awayId: "al-hilal",
    awayRu: "Аль-Хиляль",
    awayEn: "Al-Hilal",
    scoreLabel: "2 : 1",
    venueRu: "Аль-Авваль Парк, Эр-Рияд",
    venueEn: "Al-Awwal Park, Riyadh",
    keywords: ["al-nassr", "al-hilal", "аль-наср", "аль-хиляль", "роналду", "ronaldo"],
  },
  {
    id: "ucl-bay-psg",
    leagueRu: "Лига чемпионов УЕФА • 1/4 финала",
    leagueEn: "UEFA Champions League • Quarter-Final",
    status: "22:00",
    homeId: "bayern",
    homeRu: "Бавария",
    homeEn: "Bayern Munich",
    awayId: "psg",
    awayRu: "ПСЖ",
    awayEn: "Paris Saint-Germain",
    scoreLabel: "vs",
    venueRu: "Альянц Арена, Мюнхен",
    venueEn: "Allianz Arena, Munich",
    keywords: ["bayern", "psg", "бавария", "псж", "кейн", "мусиала"],
  },
];

const SEARCH_CLUBS: SearchableClub[] = [
  {
    id: "real-madrid",
    nameRu: "Реал Мадрид",
    nameEn: "Real Madrid",
    leagueRu: "Ла Лига и Лига чемпионов",
    leagueEn: "La Liga & UEFA Champions League",
    featuredMatchId: "ucl-rma-mci",
  },
  {
    id: "barcelona",
    nameRu: "Барселона",
    nameEn: "FC Barcelona",
    leagueRu: "Ла Лига и Лига чемпионов",
    leagueEn: "La Liga & UEFA Champions League",
    featuredMatchId: "laliga-bar-atm",
  },
  {
    id: "man-city",
    nameRu: "Манчестер Сити",
    nameEn: "Manchester City",
    leagueRu: "АПЛ и Лига чемпионов",
    leagueEn: "Premier League & UCL",
    featuredMatchId: "ucl-rma-mci",
  },
  {
    id: "arsenal",
    nameRu: "Арсенал",
    nameEn: "Arsenal FC",
    leagueRu: "Английская Премьер-лига",
    leagueEn: "Premier League",
    featuredMatchId: "epl-ars-liv",
  },
  {
    id: "liverpool",
    nameRu: "Ливерпуль",
    nameEn: "Liverpool FC",
    leagueRu: "Английская Премьер-лига",
    leagueEn: "Premier League",
    featuredMatchId: "epl-ars-liv",
  },
  {
    id: "al-nassr",
    nameRu: "Аль-Наср",
    nameEn: "Al-Nassr FC",
    leagueRu: "Саудовская Про-лига",
    leagueEn: "Saudi Pro League",
    featuredMatchId: "saudi-nas-hil",
  },
];

function SearchResultsInner() {
  const searchParams = useSearchParams();
  const initialQ = searchParams?.get("q") || "";

  const [lang, setLang] = useState<PortalLang>("ru");
  const [query, setQuery] = useState<string>(initialQ);

  useEffect(() => {
    const paramQ = searchParams?.get("q");
    if (typeof paramQ === "string") {
      setQuery(paramQ);
    }
  }, [searchParams]);

  const isRu = lang === "ru";
  const normalizedQ = query.trim().toLowerCase();

  const matchedArticles = useMemo(() => {
    if (!normalizedQ) return SEARCH_ARTICLES;
    return SEARCH_ARTICLES.filter((art) => {
      const hay = [
        art.titleRu,
        art.titleEn,
        art.summaryRu,
        art.summaryEn,
        art.clubNameRu,
        art.clubNameEn,
        ...art.keywords,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(normalizedQ);
    });
  }, [normalizedQ]);

  const matchedMatches = useMemo(() => {
    if (!normalizedQ) return SEARCH_MATCHES;
    return SEARCH_MATCHES.filter((m) => {
      const hay = [
        m.homeRu,
        m.homeEn,
        m.awayRu,
        m.awayEn,
        m.leagueRu,
        m.leagueEn,
        ...m.keywords,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(normalizedQ);
    });
  }, [normalizedQ]);

  const matchedClubs = useMemo(() => {
    if (!normalizedQ) return SEARCH_CLUBS;
    return SEARCH_CLUBS.filter((c) => {
      const hay = `${c.nameRu} ${c.nameEn} ${c.leagueRu} ${c.leagueEn}`.toLowerCase();
      return hay.includes(normalizedQ);
    });
  }, [normalizedQ]);

  const quickQueries = [
    { labelRu: "Мбаппе", labelEn: "Mbappé", val: "Mbappé" },
    { labelRu: "Реал Мадрид", labelEn: "Real Madrid", val: "Real Madrid" },
    { labelRu: "Барселона", labelEn: "Barcelona", val: "Barcelona" },
    { labelRu: "Холанд", labelEn: "Haaland", val: "Haaland" },
    { labelRu: "Арсенал — Ливерпуль", labelEn: "Arsenal", val: "Arsenal" },
    { labelRu: "Роналду", labelEn: "Ronaldo", val: "Ronaldo" },
  ];

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
                  ? "Поиск по статьям, матчам и клубам"
                  : "Global Search Across Articles, Matches & Clubs"}
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
              { href: "/standings", labelRu: "Таблицы", labelEn: "Standings" },
              {
                href: "/search",
                labelRu: "Поиск",
                labelEn: "Search",
                active: true,
              },
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
        {/* Interactive Search Input Hero Box */}
        <section
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: "16px",
            padding: "28px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            boxShadow: "0 2px 10px rgba(15, 23, 42, 0.03)",
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
                ? "Поиск по порталу GOLASON.COM"
                : "Search GOLASON.COM Archive"}
            </h1>
            <p
              style={{
                margin: "6px 0 0",
                fontSize: "14px",
                color: "#475569",
              }}
            >
              {isRu
                ? "Мгновенный поиск по редакционным статьям, трансферным досье, клубам и отчетам о матчах."
                : "Instant search across editorial stories, transfer radar dossiers, clubs, and live match reports."}
            </p>
          </div>

          <form
            action="/search"
            method="get"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <input
              type="search"
              name="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                isRu
                  ? "Введите имя игрока, клуб или турнир (например, Мбаппе, Реал Мадрид, Арсенал)..."
                  : "Type player, club, or competition (e.g., Mbappé, Real Madrid, Arsenal)..."
              }
              aria-label="Search query"
              style={{
                flex: "1 1 320px",
                padding: "12px 16px",
                borderRadius: "10px",
                border: "1px solid #CBD5E1",
                backgroundColor: "#F8FAFC",
                color: "#0F172A",
                fontSize: "15px",
                fontWeight: 600,
              }}
            />
            {query.trim().length > 0 && (
              <button
                type="button"
                onClick={() => setQuery("")}
                style={{
                  padding: "12px 18px",
                  borderRadius: "10px",
                  border: "1px solid #E2E8F0",
                  backgroundColor: "#FFFFFF",
                  color: "#475569",
                  fontSize: "13px",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                {isRu ? "Сбросить" : "Clear"}
              </button>
            )}
          </form>

          {/* Quick Search Filter Pills */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#64748B" }}>
              {isRu ? "Популярные запросы:" : "Trending searches:"}
            </span>
            {quickQueries.map((chip) => (
              <button
                key={chip.val}
                type="button"
                onClick={() => setQuery(chip.val)}
                style={{
                  padding: "5px 12px",
                  borderRadius: "999px",
                  border:
                    query.toLowerCase() === chip.val.toLowerCase()
                      ? "1px solid #EA580C"
                      : "1px solid #E2E8F0",
                  backgroundColor:
                    query.toLowerCase() === chip.val.toLowerCase()
                      ? "#FFF7ED"
                      : "#F8FAFC",
                  color:
                    query.toLowerCase() === chip.val.toLowerCase()
                      ? "#C2410C"
                      : "#334155",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {isRu ? chip.labelRu : chip.labelEn}
              </button>
            ))}
          </div>
        </section>

        {/* Matching Clubs Strip */}
        {matchedClubs.length > 0 && (
          <section
            aria-label="Matching Clubs"
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
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
                ? `Клубы (${matchedClubs.length})`
                : `Matching Clubs (${matchedClubs.length})`}
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
                gap: "14px",
              }}
            >
              {matchedClubs.map((club) => (
                <Link
                  key={club.id}
                  href={`/matches/${club.featuredMatchId}`}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "12px",
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    textDecoration: "none",
                    color: "#0F172A",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <ClubLogo
                      teamId={club.id}
                      teamName={club.nameEn}
                      teamNameRu={club.nameRu}
                      size={36}
                    />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "14px" }}>
                        {isRu ? club.nameRu : club.nameEn}
                      </div>
                      <div style={{ fontSize: "11.5px", color: "#64748B" }}>
                        {isRu ? club.leagueRu : club.leagueEn}
                      </div>
                    </div>
                  </div>
                  <span style={{ color: "#EA580C", fontWeight: 800, fontSize: "13px" }}>
                    →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Matching Matches Section (Linking to /matches/[id]) */}
        <section
          aria-label="Matching Matches"
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "20px",
                fontWeight: 900,
                color: "#0F172A",
              }}
            >
              {isRu
                ? `Матчи и тактические отчеты (${matchedMatches.length})`
                : `Matches & Tactical Reports (${matchedMatches.length})`}
            </h2>
            <Link
              href="/live"
              style={{
                fontSize: "13px",
                fontWeight: 800,
                color: "#EA580C",
                textDecoration: "none",
              }}
            >
              {isRu ? "Все матчи в /live →" : "All Matches in /live →"}
            </Link>
          </div>

          {matchedMatches.length === 0 ? (
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                padding: "24px",
                color: "#64748B",
                fontSize: "14px",
              }}
            >
              {isRu
                ? "По данному запросу матчей не найдено."
                : "No matches found for this query."}
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(100%, 380px), 1fr))",
                gap: "16px",
              }}
            >
              {matchedMatches.map((m) => (
                <div
                  key={m.id}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "14px",
                    padding: "18px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      color: "#64748B",
                      fontWeight: 700,
                    }}
                  >
                    <span>{isRu ? m.leagueRu : m.leagueEn}</span>
                    <span style={{ color: "#EA580C", fontWeight: 800 }}>
                      {m.status}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto 1fr",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontWeight: 800,
                      }}
                    >
                      <ClubLogo
                        teamId={m.homeId}
                        teamName={m.homeEn}
                        teamNameRu={m.homeRu}
                        size={28}
                      />
                      <span>{isRu ? m.homeRu : m.homeEn}</span>
                    </div>

                    <span
                      style={{
                        backgroundColor: "#F8FAFC",
                        border: "1px solid #E2E8F0",
                        borderRadius: "8px",
                        padding: "4px 12px",
                        fontWeight: 900,
                        fontSize: "16px",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {m.scoreLabel}
                    </span>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: "8px",
                        fontWeight: 800,
                        textAlign: "right",
                      }}
                    >
                      <span>{isRu ? m.awayRu : m.awayEn}</span>
                      <ClubLogo
                        teamId={m.awayId}
                        teamName={m.awayEn}
                        teamNameRu={m.awayRu}
                        size={28}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "10px",
                      borderTop: "1px solid #E2E8F0",
                      fontSize: "12px",
                    }}
                  >
                    <span style={{ color: "#64748B" }}>
                      {isRu ? m.venueRu : m.venueEn}
                    </span>
                    <Link
                      href={`/matches/${m.id}`}
                      style={{
                        textDecoration: "none",
                        fontWeight: 800,
                        color: "#0F172A",
                      }}
                    >
                      {isRu
                        ? "Смотреть составы и обзор →"
                        : "Match Report & Lineups →"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Matching Articles Section (16:9 ESPN Photos Linking to /news/[slug]) */}
        <section
          aria-label="Matching Articles"
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: 900,
              color: "#0F172A",
            }}
          >
            {isRu
              ? `Редакционные статьи и разборы (${matchedArticles.length})`
              : `Editorial Articles & Analysis (${matchedArticles.length})`}
          </h2>

          {matchedArticles.length === 0 ? (
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                padding: "24px",
                color: "#64748B",
                fontSize: "14px",
              }}
            >
              {isRu
                ? "По вашему запросу статей не найдено. Попробуйте другой поисковый запрос."
                : "No articles matched your search query."}
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(100%, 380px), 1fr))",
                gap: "20px",
              }}
            >
              {matchedArticles.map((art) => (
                <article
                  key={art.id}
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
                      href={`/news/${art.slug}`}
                      style={{
                        display: "block",
                        aspectRatio: "16 / 9",
                        width: "100%",
                        overflow: "hidden",
                        backgroundColor: "#E2E8F0",
                      }}
                    >
                      <img
                        src={art.espnPhotoUrl}
                        alt={isRu ? art.titleRu : art.titleEn}
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
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "8px",
                          fontSize: "11.5px",
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
                            teamId={art.clubId}
                            teamName={art.clubNameEn}
                            size={18}
                          />
                          <span>
                            {isRu ? art.categoryRu : art.categoryEn}
                          </span>
                        </span>

                        <span
                          style={{
                            fontWeight: 800,
                            color: "#047857",
                            backgroundColor: "#ECFDF5",
                            border: "1px solid #6EE7B7",
                            padding: "2px 8px",
                            borderRadius: "999px",
                          }}
                        >
                          {art.reliability}%
                        </span>
                      </div>

                      <h3
                        style={{
                          margin: 0,
                          fontSize: "17px",
                          fontWeight: 900,
                          lineHeight: 1.35,
                          color: "#0F172A",
                        }}
                      >
                        <Link
                          href={`/news/${art.slug}`}
                          style={{
                            color: "inherit",
                            textDecoration: "none",
                          }}
                        >
                          {isRu ? art.titleRu : art.titleEn}
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
                        {isRu ? art.summaryRu : art.summaryEn}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "14px 20px",
                      borderTop: "1px solid #E2E8F0",
                      backgroundColor: "#F8FAFC",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "12px",
                    }}
                  >
                    <span style={{ color: "#64748B", fontWeight: 600 }}>
                      {isRu ? art.clubNameRu : art.clubNameEn}
                    </span>
                    <Link
                      href={`/news/${art.slug}`}
                      style={{
                        color: "#EA580C",
                        fontWeight: 800,
                        textDecoration: "none",
                      }}
                    >
                      {isRu ? "Читать статью →" : "Read Article →"}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: "#F8FAFC",
            color: "#0F172A",
            padding: "40px 20px",
            textAlign: "center",
            fontWeight: 700,
          }}
        >
          Загрузка поиска GOLASON.COM / Loading Search...
        </div>
      }
    >
      <SearchResultsInner />
    </Suspense>
  );
}
