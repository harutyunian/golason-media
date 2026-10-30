"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  TransferRadarBadge,
  TransferTier,
  SupportedLocale,
} from "./TransferRadarBadge";
import { NewsHeroCard, HeroStoryItem } from "./NewsHeroCard";

export type ArticleCategory = "all" | "transfers" | "tactics" | "breaking" | "insiders";

export type SocialPlatform = "reddit" | "pinterest" | "telegram" | "threads";

export interface NewsArticleItem {
  id: string;
  slug: string;
  category: Exclude<ArticleCategory, "all">;
  categoryLabelEn: string;
  categoryLabelRu: string;
  titleEn: string;
  titleRu: string;
  excerptEn: string;
  excerptRu: string;
  contentEn: string[];
  contentRu: string[];
  keyTakeawaysEn: string[];
  keyTakeawaysRu: string[];
  tier: TransferTier;
  reliability: number;
  source: string;
  author: string;
  readingTimeMinutes: number;
  publishedAtEn: string;
  publishedAtRu: string;
  clubTag: string;
  telegramHighlightUrl?: string;
}

export interface SocialShareLinks {
  reddit: string;
  pinterest: string;
  telegram: string;
  threads: string;
}

export function buildSocialShareLinks(
  articleUrl: string,
  headline: string
): SocialShareLinks {
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(headline);
  const encodedCombined = encodeURIComponent(`${headline} — ${articleUrl}`);

  return {
    reddit: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    threads: `https://www.threads.net/intent/post?text=${encodedCombined}`,
  };
}

export const DEFAULT_NEWS_ARTICLES: NewsArticleItem[] = [
  {
    id: "art-1-trent-madrid-official",
    slug: "real-madrid-right-back-contract-agreement-official",
    category: "transfers",
    categoryLabelEn: "Official Transfer",
    categoryLabelRu: "Официальный трансфер",
    titleEn: "Real Madrid Complete Pre-Contract Documentation for Premier League Star Right-Back",
    titleRu: "«Реал Мадрид» завершил оформление предконтрактных документов со звёздным правым защитником АПЛ",
    excerptEn:
      "Institutional sources confirm full legal sign-off on a five-year deal at the Santiago Bernabéu with a €100M release structure.",
    excerptRu:
      "Официальные источники подтвердили полное юридическое согласование пятилетнего контракта на «Сантьяго Бернабеу».",
    contentEn: [
      "Real Madrid's sporting hierarchy has formally registered the pre-agreement documentation following months of discrete negotiations.",
      "Tactically, the arrival provides Carlo Ancelotti and the coaching staff with elite progressive passing from deep right half-spaces and set-piece delivery.",
      "Medical examinations and official unveiling scheduling have been locked in ahead of the summer Club World Cup window.",
    ],
    contentRu: [
      "Спортивное руководство мадридского «Реала» официально зарегистрировало пакет предконтрактных документов после нескольких месяцев закрытых переговоров.",
      "Тактически этот трансфер даёт тренерскому штабу элитное продвижение мяча из правого полуфланга и стандарты высочайшего класса.",
      "Медицинское обследование и дата официальной презентации уже согласованы перед летним Клубным чемпионатом мира.",
    ],
    keyTakeawaysEn: [
      "5-year contract signed through June 2030",
      "7.4 progressive passes per 90 mins in European competition",
      "Tier 1 (100% Official) verification by club legal department",
    ],
    keyTakeawaysRu: [
      "Контракт подписан на 5 лет до июня 2030 года",
      "7.4 прогрессивных передач за 90 минут в еврокубках",
      "Уровень 1 (100% Официально) — подтверждено юридическим отделом",
    ],
    tier: 1,
    reliability: 100,
    source: "Club Official Communiqué",
    author: "Arthur Harutyunyan",
    readingTimeMinutes: 3,
    publishedAtEn: "24 mins ago",
    publishedAtRu: "24 мин назад",
    clubTag: "Real Madrid",
    telegramHighlightUrl: "https://t.me/futbolnaya_jara",
  },
  {
    id: "art-2-wirtz-city-bayern-insider",
    slug: "florian-wirtz-man-city-bayern-insider-update",
    category: "insiders",
    categoryLabelEn: "Tier-1 Insider",
    categoryLabelRu: "Инсайд Уровня 2",
    titleEn: "Florian Wirtz Summer Dossier: Direct Talks Scheduled as €125M Valuation Set",
    titleRu: "Досье Флориана Вирца: назначены прямые переговоры при оценке трансфера в €125 млн",
    excerptEn:
      "Verified European insiders report Manchester City and Bayern Munich have both submitted formal project presentations to the playmaker's camp.",
    excerptRu:
      "Проверенные европейские инсайдеры сообщают, что «Манчестер Сити» и «Бавария» представили официальные спортивные проекты окружению игрока.",
    contentEn: [
      "Bayer Leverkusen's creative engine remains the #1 priority target for Europe's top clubs looking to revitalize their attacking midfield zones.",
      "Verified insiders Fabrizio Romano and David Ornstein confirm that structured payment installments above €125M will be required to trigger negotiations.",
      "The player's priority remains tactical freedom in the #10 pocket and guaranteed Champions League title contention.",
    ],
    contentRu: [
      "Креативный лидер леверкузенского «Байера» остаётся главной целью топ-клубов Европы, стремящихся обновить зону атакующего полузащитника.",
      "Проверенные инсайдеры Фабрицио Романо и Дэвид Орнштейн подтверждают, что для старта переговоров потребуется пакет свыше €125 млн.",
      "Приоритетом самого футболиста остаётся тактическая свобода в зоне «десятки» и борьба за победу в Лиге чемпионов.",
    ],
    keyTakeawaysEn: [
      "€125M+ structured transfer package required",
      "Man City view him as the long-term Kevin De Bruyne successor",
      "Tier 2 (90% Verified Insider) consensus across German & UK desks",
    ],
    keyTakeawaysRu: [
      "Требуется структурированный пакет свыше €125 млн",
      "«Ман Сити» видит в нём прямого преемника Кевина Де Брёйне",
      "Уровень 2 (90% Проверенный инсайдер) по данным немецких и британских СМИ",
    ],
    tier: 2,
    reliability: 90,
    source: "Fabrizio Romano & Sky Germany",
    author: "Golason Transfer Desk",
    readingTimeMinutes: 4,
    publishedAtEn: "1 hour ago",
    publishedAtRu: "1 час назад",
    clubTag: "Leverkusen / Man City",
    telegramHighlightUrl: "https://t.me/futbolnaya_jara",
  },
  {
    id: "art-3-barcelona-high-line-tactics",
    slug: "barcelona-offside-trap-tactical-analysis",
    category: "tactics",
    categoryLabelEn: "Tactical Lab",
    categoryLabelRu: "Тактический разбор",
    titleEn: "Inside Hansi Flick's 42-Meter High Line: How Barcelona Engineered Europe's Boldest Offside Trap",
    titleRu: "Внутри высокой линии Ханси Флика на 42 метрах: как «Барселона» создала самую смелую офсайдную ловушку Европы",
    excerptEn:
      "Frame-by-frame telemetry reveals how Pau Cubarsí and Iñigo Martínez synchronize step-up triggers with Pedri's counter-pressing.",
    excerptRu:
      "Покадровая телеметрия показывает, как Пау Кубарси и Иньиго Мартинес синхронизируют шаг вперёд с контрпрессингом Педри.",
    contentEn: [
      "Barcelona's defensive line averages 42.4 meters from their own goal line this season—the highest recorded mark across Europe's top five leagues.",
      "Rather than retreating when opponents load the wings, the back four steps up in unison the instant the ball-carrier lowers their head to prepare a lofted pass.",
      "Official Opta & LaLiga tracking data confirms Barcelona has caught opponents offside more than 6.2 times per 90 minutes.",
    ],
    contentRu: [
      "Средняя высота оборонительной линии «Барселоны» в этом сезоне составляет 42,4 метра от собственных ворот — самый высокий показатель в топ-5 лигах Европы.",
      "Вместо того чтобы пятиться назад при фланговых передачах, четвёрка защитников синхронно делает шаг вперёд в момент, когда соперник опускает голову для заброса.",
      "Официальные данные трекинга LaLiga и Opta подтверждают: «Барселона» ловит соперников в офсайд более 6,2 раза за 90 минут.",
    ],
    keyTakeawaysEn: [
      "42.4m average defensive line height (1st in Europe)",
      "6.2 offsides forced per 90 minutes",
      "Compact 22-meter vertical distance between striker and center-backs",
    ],
    keyTakeawaysRu: [
      "42,4 м — средняя высота линии обороны (1-е место в Европе)",
      "6,2 офсайда у соперников в среднем за 90 минут",
      "Компактные 22 метра по вертикали между форвардом и ЦЗ",
    ],
    tier: 1,
    reliability: 100,
    source: "Opta Pro & LaLiga Tactical Feed",
    author: "Golason Analytics",
    readingTimeMinutes: 5,
    publishedAtEn: "2 hours ago",
    publishedAtRu: "2 часа назад",
    clubTag: "FC Barcelona",
    telegramHighlightUrl: "https://t.me/futbolnaya_jara",
  },
  {
    id: "art-4-gyokeres-arsenal-chelsea-rumor",
    slug: "viktor-gyokeres-premier-league-bid-rumor",
    category: "transfers",
    categoryLabelEn: "Transfer Rumor",
    categoryLabelRu: "Трансферный слух",
    titleEn: "Sporting CP Striker Viktor Gyökeres Linked With Surprise €75M Gentleman's Agreement Exit",
    titleRu: "Форвард «Спортинга» Виктор Дьёкереш может уйти за €75 млн по джентльменскому соглашению",
    excerptEn:
      "Portuguese press claims London rivals are preparing opening bids below the €100M release clause, though club officials remain tight-lipped.",
    excerptRu:
      "Португальская пресса утверждает, что лондонские клубы готовят предложения ниже отступных в €100 млн, но официального подтверждения пока нет.",
    contentEn: [
      "Reports circulating in Lisbon newspapers suggest Viktor Gyökeres secured a verbal understanding to depart for €75M plus add-ons this summer.",
      "Both Arsenal and Chelsea scouts have attended five consecutive Liga Portugal fixtures to monitor his hold-up play and box movement.",
      "Because neither club has lodged a formal written offer yet, our Transfer Radar classifies this story as Tier 3 (50% Hot Rumor).",
    ],
    contentRu: [
      "Сообщения в лиссабонских газетах утверждают, что Виктор Дьёкереш получил устное обещание о трансфере за €75 млн плюс бонусы этим летом.",
      "Скауты «Арсенала» и «Челси» посетили пять матчей чемпионата Португалии подряд, изучая его игру корпусом и открывания в штрафной.",
      "Поскольку ни один клуб ещё не направил официальный письменный оффер, наш Трансферный радар классифицирует новость как Уровень 3 (50% Горячий слух).",
    ],
    keyTakeawaysEn: [
      "Official release clause stands at €100M",
      "Unverified reports of a €75M verbal exit threshold",
      "Tier 3 (50% Hot Rumor) — awaiting Tier-1 confirmation",
    ],
    keyTakeawaysRu: [
      "Официальная сумма отступных составляет €100 млн",
      "Неподтверждённые данные о пороге в €75 млн",
      "Уровень 3 (50% Горячий слух) — ожидает подтверждения инсайдеров",
    ],
    tier: 3,
    reliability: 50,
    source: "Portuguese Sports Daily / Tabloid",
    author: "Golason Rumor Mill",
    readingTimeMinutes: 3,
    publishedAtEn: "3 hours ago",
    publishedAtRu: "3 часа назад",
    clubTag: "Sporting / EPL",
    telegramHighlightUrl: "https://t.me/futbolnaya_jara",
  },
  {
    id: "art-5-var-audio-protocol-breaking",
    slug: "uefa-laliga-semi-automated-var-audio-update",
    category: "breaking",
    categoryLabelEn: "Breaking News",
    categoryLabelRu: "Срочная новость",
    titleEn: "Referee Committee Releases Full VAR Audio & Millimeter Offside Mesh From Weekend Title Clash",
    titleRu: "Судейский комитет опубликовал полную аудиозапись VAR и 3D-сетку офсайда центрального матча тура",
    excerptEn:
      "Complete transcript and 500fps optical tracking frames released following heated debate over the 88th-minute red card decision.",
    excerptRu:
      "Опубликована полная стенограмма переговоров арбитров и кадры оптического трекинга 500 кадров/с после споров о красной карточке на 88-й минуте.",
    contentEn: [
      "The Technical Committee of Referees has published the unedited four-minute audio exchange between the VAR room and the on-field official.",
      "High-speed limb-tracking cameras operating at 500 frames per second confirmed the point of contact occurred 14 centimeters outside the penalty arc.",
      "Fans can review the synchronized video clip in our official @futbolnaya_jara Telegram channel and cast their verdict in the live reaction poll.",
    ],
    contentRu: [
      "Технический комитет судей опубликовал полную четырёхминутную аудиозапись переговоров между комнатой VAR и главным арбитром встречи.",
      "Высокоскоростные камеры трекинга (500 кадров в секунду) подтвердили, что точка контакта находилась в 14 сантиметрах за пределами штрафной площади.",
      "Болельщики могут посмотреть синхронизированный видеоразбор в нашем Telegram-канале @futbolnaya_jara и проголосовать в живом опросе.",
    ],
    keyTakeawaysEn: [
      "500fps optical tracking telemetry verified contact point",
      "Full referee audio transcript made public",
      "Tier 1 (100% Official) federation release",
    ],
    keyTakeawaysRu: [
      "Оптический трекинг 500 fps подтвердил точку контакта",
      "Полная аудиозапись переговоров судей опубликована открыто",
      "Уровень 1 (100% Официально) — релиз федерации",
    ],
    tier: 1,
    reliability: 100,
    source: "RFEF / UEFA Refereeing Committee",
    author: "Arthur Harutyunyan",
    readingTimeMinutes: 3,
    publishedAtEn: "4 hours ago",
    publishedAtRu: "4 часа назад",
    clubTag: "VAR / LaLiga",
    telegramHighlightUrl: "https://t.me/futbolnaya_jara",
  },
  {
    id: "art-6-nico-williams-release-clause",
    slug: "nico-williams-athletic-club-summer-clause-insider",
    category: "insiders",
    categoryLabelEn: "Insider Dossier",
    categoryLabelRu: "Инсайдерское досье",
    titleEn: "Nico Williams €58M Release Clause Alert: Premier League Giants Ready Immediate Trigger",
    titleRu: "Отступные Нико Уильямса в €58 млн: гранды АПЛ готовы активировать опцию выкупа",
    excerptEn:
      "Tier-2 verified reporters confirm two English clubs have already contacted the winger's representatives regarding personal terms.",
    excerptRu:
      "Инсайдеры второго уровня подтверждают, что два английских клуба уже связались с представителями вингера по условиям личного контракта.",
    contentEn: [
      "Athletic Club's electric winger remains one of the most sought-after wide forwards in world football thanks to his accessible €58M buyout clause.",
      "Because the release clause must be paid in a single lump sum to LaLiga headquarters, clubs are structuring liquidity facilities ahead of July 1.",
      "Negotiations over image rights and wage structure are active, earning a 90% Verified Insider rating on the Golason Transfer Radar.",
    ],
    contentRu: [
      "Взрывной вингер «Атлетика» остаётся одним из самых востребованных фланговых форвардов мира благодаря доступной сумме отступных в €58 млн.",
      "Поскольку отступные в Ла Лиге должны выплачиваться единым траншем, клубы заранее готовят финансовую структуру сделки к 1 июля.",
      "Переговоры по имиджевым правам и зарплатной ведомости уже идут — 90% на Трансферном радаре Golason.",
    ],
    keyTakeawaysEn: [
      "€58M fixed release clause at Athletic Club",
      "Direct contact established with player's agency",
      "Tier 2 (90% Verified Insider) reliability score",
    ],
    keyTakeawaysRu: [
      "Фиксированные отступные €58 млн в «Атлетике»",
      "Установлен прямой контакт с агентством игрока",
      "Рейтинг надёжности: Уровень 2 (90% Проверенный инсайдер)",
    ],
    tier: 2,
    reliability: 90,
    source: "The Athletic & Relevo",
    author: "Golason Transfer Desk",
    readingTimeMinutes: 4,
    publishedAtEn: "5 hours ago",
    publishedAtRu: "5 часов назад",
    clubTag: "Athletic Club",
    telegramHighlightUrl: "https://t.me/futbolnaya_jara",
  },
];

export interface NewsArticleGridProps {
  articles?: NewsArticleItem[];
  heroStory?: Partial<HeroStoryItem>;
  showHero?: boolean;
  lang?: SupportedLocale;
  locale?: SupportedLocale;
  defaultCategory?: ArticleCategory;
  defaultTierFilter?: "all" | TransferTier;
  baseUrl?: string;
  className?: string;
}

export function NewsArticleGrid({
  articles = DEFAULT_NEWS_ARTICLES,
  heroStory,
  showHero = true,
  lang,
  locale,
  defaultCategory = "all",
  defaultTierFilter = "all",
  baseUrl = "https://golason.media/news",
  className = "",
}: NewsArticleGridProps) {
  const propLocale = lang ?? locale;
  const [internalLocale, setInternalLocale] = useState<SupportedLocale>(
    propLocale ?? "en"
  );

  useEffect(() => {
    if (propLocale) {
      setInternalLocale(propLocale);
    }
  }, [propLocale]);

  const activeLocale: SupportedLocale = propLocale ?? internalLocale;

  const [selectedCategory, setSelectedCategory] =
    useState<ArticleCategory>(defaultCategory);
  const [selectedTier, setSelectedTier] = useState<"all" | TransferTier>(
    defaultTierFilter
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState<NewsArticleItem | null>(
    null
  );
  const [expandedCardIds, setExpandedCardIds] = useState<Record<string, boolean>>(
    {}
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveArticle(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter((item) => {
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      if (selectedTier !== "all" && item.tier !== selectedTier) {
        return false;
      }
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const haystack = [
          item.titleEn,
          item.titleRu,
          item.excerptEn,
          item.excerptRu,
          item.clubTag,
          item.source,
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      }
      return true;
    });
  }, [articles, selectedCategory, selectedTier, searchQuery]);

  const categoryTabs: { id: ArticleCategory; labelEn: string; labelRu: string }[] =
    [
      { id: "all", labelEn: "All Stories", labelRu: "Все материалы" },
      { id: "transfers", labelEn: "Transfers", labelRu: "Трансферы" },
      { id: "insiders", labelEn: "Insiders", labelRu: "Инсайды" },
      { id: "tactics", labelEn: "Tactical Lab", labelRu: "Тактика" },
      { id: "breaking", labelEn: "Breaking", labelRu: "Срочно" },
    ];

  const tierTabs: { id: "all" | TransferTier; labelEn: string; labelRu: string }[] =
    [
      { id: "all", labelEn: "All Radar Tiers", labelRu: "Все уровни радара" },
      {
        id: 1,
        labelEn: "Tier 1: 100% Official 🔥",
        labelRu: "Tier 1: 100% Официально 🔥",
      },
      {
        id: 2,
        labelEn: "Tier 2: 90% Verified Insider 🟢",
        labelRu: "Tier 2: 90% Инсайдер 🟢",
      },
      {
        id: 3,
        labelEn: "Tier 3: 50% Hot Rumor 🟡",
        labelRu: "Tier 3: 50% Слух 🟡",
      },
    ];

  const toggleCardExpand = (id: string) => {
    setExpandedCardIds((prev: Record<string, boolean>) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopyShareUrl = (article: NewsArticleItem) => {
    const shareUrl = `${baseUrl}/${article.slug}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).catch(() => {});
    }
    setCopiedId(article.id);
    setTimeout(() => {
      setCopiedId((prev: string | null) => (prev === article.id ? null : prev));
    }, 2000);
  };

  const renderSocialShareBar = (article: NewsArticleItem, compact = false) => {
    const headline =
      activeLocale === "ru" ? article.titleRu : article.titleEn;
    const shareUrl = `${baseUrl}/${article.slug}`;
    const links = buildSocialShareLinks(shareUrl, headline);

    const platforms: {
      key: SocialPlatform;
      label: string;
      href: string;
      accent: string;
    }[] = [
      {
        key: "reddit",
        label: "Reddit",
        href: links.reddit,
        accent: "#FF4500",
      },
      {
        key: "pinterest",
        label: "Pinterest",
        href: links.pinterest,
        accent: "#E60023",
      },
      {
        key: "telegram",
        label: "Telegram",
        href: links.telegram,
        accent: "#26A5E4",
      },
      {
        key: "threads",
        label: "Threads",
        href: links.threads,
        accent: "#E2E8F0",
      },
    ];

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "6px",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#94A3B8",
            marginRight: "2px",
          }}
        >
          {activeLocale === "ru" ? "Поделиться:" : "Share:"}
        </span>

        {platforms.map((platform) => (
          <a
            key={platform.key}
            href={platform.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${platform.label}`}
            style={{
              fontSize: compact ? "11px" : "12px",
              fontWeight: 700,
              padding: compact ? "3px 8px" : "5px 10px",
              borderRadius: "6px",
              backgroundColor: "rgba(15, 23, 42, 0.85)",
              border: `1px solid ${platform.accent}55`,
              color: platform.accent,
              textDecoration: "none",
              transition: "transform 150ms ease",
            }}
          >
            {platform.label}
          </a>
        ))}

        <button
          type="button"
          onClick={() => handleCopyShareUrl(article)}
          style={{
            fontSize: compact ? "11px" : "12px",
            fontWeight: 700,
            padding: compact ? "3px 8px" : "5px 10px",
            borderRadius: "6px",
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.14)",
            color: copiedId === article.id ? "#10B981" : "#CBD5E1",
            cursor: "pointer",
          }}
        >
          {copiedId === article.id
            ? activeLocale === "ru"
              ? "Скопировано ✓"
              : "Copied ✓"
            : activeLocale === "ru"
              ? "Ссылка 🔗"
              : "Copy Link 🔗"}
        </button>
      </div>
    );
  };

  return (
    <section
      className={`news-article-grid-section ${className}`}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        color: "#F8FAFC",
      }}
    >
      {/* Optional Featured Hero Story */}
      {showHero && <NewsHeroCard story={heroStory} lang={activeLocale} />}

      {/* Filter & Bilingual Control Bar */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          padding: "18px 20px",
          borderRadius: "16px",
          backgroundColor: "#0A1128",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 10px 30px rgba(5, 10, 25, 0.45)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 900,
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
              }}
            >
              {activeLocale === "ru"
                ? "Лента новостей и Трансферный радар"
                : "Editorial Newsroom & Transfer Reliability Radar"}
            </h3>
            <p
              style={{
                margin: "4px 0 0 0",
                fontSize: "12px",
                color: "#94A3B8",
              }}
            >
              {activeLocale === "ru"
                ? "Верифицированные инсайды (Уровень 1–3), тактическая аналитика и быстрый шеринг"
                : "Verified transfer tiers (Tier 1–3), tactical telemetry, and instant reader mode"}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {/* Search Input */}
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                activeLocale === "ru"
                  ? "Поиск клуба, игрока, источника..."
                  : "Search club, player, source..."
              }
              aria-label="Search news articles"
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(148, 163, 184, 0.3)",
                color: "#F8FAFC",
                fontSize: "13px",
                minWidth: "220px",
              }}
            />

            {/* Bilingual Toggle (EN / RU) */}
            <div
              role="group"
              aria-label="Editorial language selector"
              style={{
                display: "inline-flex",
                borderRadius: "8px",
                padding: "3px",
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
              }}
            >
              {(["en", "ru"] as SupportedLocale[]).map((code) => {
                const isActive = activeLocale === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setInternalLocale(code)}
                    style={{
                      padding: "5px 10px",
                      borderRadius: "6px",
                      border: "none",
                      fontSize: "11px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      cursor: "pointer",
                      backgroundColor: isActive ? "#FF5722" : "transparent",
                      color: isActive ? "#FFFFFF" : "#94A3B8",
                    }}
                  >
                    {code.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            alignItems: "center",
          }}
        >
          {categoryTabs.map((tab) => {
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                style={{
                  padding: "6px 13px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: isSelected
                    ? "1px solid #FF5722"
                    : "1px solid rgba(148, 163, 184, 0.22)",
                  backgroundColor: isSelected
                    ? "rgba(255, 87, 34, 0.2)"
                    : "rgba(15, 23, 42, 0.65)",
                  color: isSelected ? "#FFFFFF" : "#CBD5E1",
                }}
              >
                {activeLocale === "ru" ? tab.labelRu : tab.labelEn}
              </button>
            );
          })}
        </div>

        {/* Transfer Radar Tier Filter Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            alignItems: "center",
            paddingTop: "4px",
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          {tierTabs.map((tierTab) => {
            const isSelected = selectedTier === tierTab.id;
            return (
              <button
                key={String(tierTab.id)}
                type="button"
                onClick={() => setSelectedTier(tierTab.id)}
                style={{
                  padding: "5px 11px",
                  borderRadius: "8px",
                  fontSize: "11px",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: isSelected
                    ? "1px solid #38BDF8"
                    : "1px solid rgba(255, 255, 255, 0.1)",
                  backgroundColor: isSelected
                    ? "rgba(56, 189, 248, 0.18)"
                    : "rgba(15, 23, 42, 0.45)",
                  color: isSelected ? "#E0F2FE" : "#94A3B8",
                }}
              >
                {activeLocale === "ru" ? tierTab.labelRu : tierTab.labelEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stories Grid */}
      {filteredArticles.length === 0 ? (
        <div
          style={{
            padding: "40px 24px",
            textAlign: "center",
            borderRadius: "16px",
            backgroundColor: "#0A1128",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            color: "#94A3B8",
          }}
        >
          {activeLocale === "ru"
            ? "По выбранным фильтрам материалов не найдено."
            : "No stories match the selected radar filters."}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredArticles.map((article) => {
            const isExpanded = !!expandedCardIds[article.id];
            const title =
              activeLocale === "ru" ? article.titleRu : article.titleEn;
            const excerpt =
              activeLocale === "ru" ? article.excerptRu : article.excerptEn;
            const categoryLabel =
              activeLocale === "ru"
                ? article.categoryLabelRu
                : article.categoryLabelEn;
            const publishedAt =
              activeLocale === "ru"
                ? article.publishedAtRu
                : article.publishedAtEn;
            const paragraphs =
              activeLocale === "ru" ? article.contentRu : article.contentEn;
            const takeaways =
              activeLocale === "ru"
                ? article.keyTakeawaysRu
                : article.keyTakeawaysEn;

            return (
              <article
                key={article.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: "16px",
                  backgroundColor: "#0A1128",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "20px",
                  gap: "14px",
                  boxShadow: "0 12px 28px rgba(4, 9, 24, 0.5)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {/* Card Meta Header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        padding: "3px 9px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(255, 87, 34, 0.16)",
                        color: "#FF8A65",
                        border: "1px solid rgba(255, 87, 34, 0.35)",
                      }}
                    >
                      {categoryLabel}
                    </span>

                    <span
                      style={{
                        fontSize: "11px",
                        color: "#94A3B8",
                        fontWeight: 600,
                      }}
                    >
                      {article.clubTag} •{" "}
                      {activeLocale === "ru"
                        ? `${article.readingTimeMinutes} мин`
                        : `${article.readingTimeMinutes}m read`}
                    </span>
                  </div>

                  {/* Headline */}
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "17px",
                      lineHeight: 1.35,
                      fontWeight: 800,
                      color: "#FFFFFF",
                    }}
                  >
                    {title}
                  </h4>

                  {/* Excerpt */}
                  <p
                    style={{
                      margin: 0,
                      fontSize: "13.5px",
                      lineHeight: 1.6,
                      color: "#CBD5E1",
                    }}
                  >
                    {excerpt}
                  </p>

                  {/* Transfer Reliability Radar Meter */}
                  <TransferRadarBadge
                    tier={article.tier}
                    reliability={article.reliability}
                    source={article.source}
                    lang={activeLocale}
                    compact
                  />

                  {/* Inline Expandable Full Article Content */}
                  {isExpanded && (
                    <div
                      style={{
                        marginTop: "6px",
                        paddingTop: "12px",
                        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      {paragraphs.map((p, idx) => (
                        <p
                          key={idx}
                          style={{
                            margin: 0,
                            fontSize: "13px",
                            lineHeight: 1.65,
                            color: "#E2E8F0",
                          }}
                        >
                          {p}
                        </p>
                      ))}

                      {takeaways.length > 0 && (
                        <div
                          style={{
                            padding: "10px 12px",
                            borderRadius: "10px",
                            backgroundColor: "rgba(15, 23, 42, 0.85)",
                            border: "1px solid rgba(56, 189, 248, 0.25)",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "11px",
                              fontWeight: 800,
                              textTransform: "uppercase",
                              color: "#38BDF8",
                              marginBottom: "6px",
                            }}
                          >
                            {activeLocale === "ru"
                              ? "Ключевые тезисы"
                              : "Key Takeaways"}
                          </div>
                          <ul
                            style={{
                              margin: 0,
                              paddingLeft: "16px",
                              fontSize: "12px",
                              color: "#CBD5E1",
                              lineHeight: 1.55,
                            }}
                          >
                            {takeaways.map((point, idx) => (
                              <li key={idx}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Footer: Reader Actions + Social Share Hooks */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    paddingTop: "12px",
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        type="button"
                        onClick={() => setActiveArticle(article)}
                        style={{
                          padding: "7px 12px",
                          borderRadius: "8px",
                          border: "none",
                          background:
                            "linear-gradient(90deg, #FF5722 0%, #EA580C 100%)",
                          color: "#FFFFFF",
                          fontSize: "12px",
                          fontWeight: 800,
                          cursor: "pointer",
                        }}
                      >
                        {activeLocale === "ru"
                          ? "Открыть статью 📖"
                          : "Story Reader 📖"}
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleCardExpand(article.id)}
                        style={{
                          padding: "7px 10px",
                          borderRadius: "8px",
                          border: "1px solid rgba(255, 255, 255, 0.16)",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          color: "#E2E8F0",
                          fontSize: "12px",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        {isExpanded
                          ? activeLocale === "ru"
                            ? "Свернуть"
                            : "Collapse"
                          : activeLocale === "ru"
                            ? "Быстрое чтение"
                            : "Quick Expand"}
                      </button>
                    </div>

                    <span
                      style={{
                        fontSize: "11px",
                        color: "#64748B",
                      }}
                    >
                      {publishedAt}
                    </span>
                  </div>

                  {/* Social Share Hooks (Reddit, Pinterest, Telegram, Threads) */}
                  {renderSocialShareBar(article, true)}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-article-title"
          onClick={() => setActiveArticle(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(4, 8, 20, 0.82)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "740px",
              maxHeight: "90vh",
              overflowY: "auto",
              borderRadius: "20px",
              backgroundColor: "#0A1128",
              border: "1px solid rgba(255, 87, 34, 0.45)",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.75)",
              padding: "28px",
              color: "#F8FAFC",
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
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  backgroundColor: "rgba(255, 87, 34, 0.2)",
                  color: "#FF8A65",
                }}
              >
                {activeLocale === "ru"
                  ? activeArticle.categoryLabelRu
                  : activeArticle.categoryLabelEn}{" "}
                • {activeArticle.clubTag}
              </span>

              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                aria-label="Close article reader"
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                {activeLocale === "ru" ? "Закрыть ✕" : "Close ✕"}
              </button>
            </div>

            <h2
              id="modal-article-title"
              style={{
                margin: 0,
                fontSize: "24px",
                lineHeight: 1.3,
                fontWeight: 900,
                color: "#FFFFFF",
              }}
            >
              {activeLocale === "ru"
                ? activeArticle.titleRu
                : activeArticle.titleEn}
            </h2>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                flexWrap: "wrap",
                fontSize: "12px",
                color: "#94A3B8",
              }}
            >
              <span>✍️ {activeArticle.author}</span>
              <span>
                ⏱️{" "}
                {activeLocale === "ru"
                  ? `${activeArticle.readingTimeMinutes} мин чтения`
                  : `${activeArticle.readingTimeMinutes} min read`}
              </span>
              <span>
                🕒{" "}
                {activeLocale === "ru"
                  ? activeArticle.publishedAtRu
                  : activeArticle.publishedAtEn}
              </span>
            </div>

            <TransferRadarBadge
              tier={activeArticle.tier}
              reliability={activeArticle.reliability}
              source={activeArticle.source}
              lang={activeLocale}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                paddingTop: "8px",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              {(activeLocale === "ru"
                ? activeArticle.contentRu
                : activeArticle.contentEn
              ).map((paragraph, index) => (
                <p
                  key={index}
                  style={{
                    margin: 0,
                    fontSize: "15px",
                    lineHeight: 1.75,
                    color: "#E2E8F0",
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Key Takeaways Box */}
            <div
              style={{
                padding: "16px",
                borderRadius: "12px",
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  color: "#38BDF8",
                  marginBottom: "8px",
                }}
              >
                {activeLocale === "ru"
                  ? "Ключевые выводы редакции"
                  : "Editorial Key Takeaways"}
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "18px",
                  fontSize: "13.5px",
                  lineHeight: 1.65,
                  color: "#CBD5E1",
                }}
              >
                {(activeLocale === "ru"
                  ? activeArticle.keyTakeawaysRu
                  : activeArticle.keyTakeawaysEn
                ).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Modal Footer: Social Share + Telegram Highlight CTA */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
                paddingTop: "14px",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              {renderSocialShareBar(activeArticle, false)}

              {activeArticle.telegramHighlightUrl && (
                <a
                  href={activeArticle.telegramHighlightUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "8px 14px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(38, 165, 228, 0.18)",
                    border: "1px solid rgba(38, 165, 228, 0.45)",
                    color: "#38BDF8",
                    fontSize: "12px",
                    fontWeight: 800,
                    textDecoration: "none",
                  }}
                >
                  {activeLocale === "ru"
                    ? "🎥 Видеообзор в @futbolnaya_jara"
                    : "🎥 Video Highlights on @futbolnaya_jara"}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default NewsArticleGrid;
