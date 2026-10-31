"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ClubLogo } from "@/lib/clubLogos";

export type ArticleCardVariant = "lead" | "grid" | "horizontal" | "compact";

export type EditorialCategoryId =
  | "all"
  | "la-liga"
  | "epl"
  | "ucl"
  | "serie-a"
  | "transfers"
  | "tactics";

export interface EditorialArticleInput {
  id: string;
  slug: string;
  category?: EditorialCategoryId | string;
  categoryLabelRu?: string;
  categoryLabelEn?: string;
  categoryLabel?: { ru: string; en: string } | string;
  titleRu?: string;
  titleEn?: string;
  title?: { ru: string; en: string } | string;
  subtitleRu?: string;
  subtitleEn?: string;
  excerptRu?: string;
  excerptEn?: string;
  summary?: { ru: string; en: string } | string;
  authorRu?: string;
  authorEn?: string;
  author?: { ru: string; en: string } | string;
  authorRoleRu?: string;
  authorRoleEn?: string;
  publishedAtRu?: string;
  publishedAtEn?: string;
  publishedAt?: string;
  readTimeMinutes?: number;
  readingTimeMinutes?: number;
  imageUrl: string;
  imageCaptionRu?: string;
  imageCaptionEn?: string;
  clubNameRu?: string;
  clubNameEn?: string;
  clubTag?: string;
  clubLogoUrl?: string;
  relatedMatchId?: string;
  isLeadStory?: boolean;
  isTrending?: boolean;
  isBreaking?: boolean;
  transferReliability?: number;
  transferReliabilityPercent?: number;
  transferSource?: string;
}

export interface ArticleCardProps {
  article: EditorialArticleInput;
  variant?: ArticleCardVariant;
  lang?: "ru" | "en";
  locale?: "ru" | "en";
  rank?: number;
  imagePosition?: "left" | "right";
  showExcerpt?: boolean;
  showDivider?: boolean;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const VERIFIED_ESPN_PRESS_PHOTOS: string[] = [
  "https://a.espncdn.com/photo/2026/1030/r1738494_1296x729_16-9.jpg",
  "https://a.espncdn.com/photo/2026/1027/r1736915_1296x729_16-9.jpg",
  "https://a.espncdn.com/photo/2026/1030/r1738704_1296x729_16-9.jpg",
  "https://a.espncdn.com/photo/2026/1029/r1738028_1296x729_16-9.jpg",
  "https://a.espncdn.com/photo/2026/1030/r1738425_1296x729_16-9.jpg",
  "https://a.espncdn.com/photo/2026/1026/r1736765_3_1296x729_16-9.jpg",
  "https://a.espncdn.com/photo/2026/1030/r1738504_1296x729_16-9.jpg",
  "https://a.espncdn.com/photo/2026/1030/r1738501_1296x729_16-9.jpg",
  "https://a.espncdn.com/photo/2026/1030/r1738651_1296x729_16-9.jpg",
  "https://a.espncdn.com/photo/2026/1028/r1737505_1296x729_16-9.jpg",
  "https://a.espncdn.com/photo/2026/1029/r1738250_1296x729_16-9.jpg",
  "https://a.espncdn.com/photo/2026/0823/r1706005_1296x729_16-9.jpg",
];

export const EDITORIAL_ARTICLES: EditorialArticleInput[] = [
  {
    id: "ed-lead-mbappe-el-clasico",
    slug: "mbappe-el-clasico-hat-trick-endrick-cameo-bernabeu",
    category: "la-liga",
    categoryLabelRu: "ЛА ЛИГА • ОБЗОР ТУРА",
    categoryLabelEn: "LA LIGA • COVER STORY",
    titleRu:
      "Хет-трик Мбаппе в Эль-Класико и выход Эндрика: как «Реал» разрушил высокую линию «Барселоны»",
    titleEn:
      "Mbappe's El Clasico Hat-Trick & Endrick's Electric Cameo: How Real Madrid Shattered Barcelona's High Line",
    subtitleRu:
      "Мадридский клуб провел эталонный матч против ультравысокого блока Ханси Флика. Килиан Мбаппе скорректировал стартовую позицию на полтора метра глубже и трижды убежал один на один после вертикальных передач Беллингема и Вальверде.",
    subtitleEn:
      "Real Madrid delivered a surgical masterclass against Hansi Flick's 42-meter defensive line. Starting his diagonal sprints deeper in the left channel, Kylian Mbappe beat the offside trap three times before Endrick sealed the Bernabeu night.",
    authorRu: "Артур Арутюнян",
    authorEn: "Arthur Harutyunyan",
    authorRoleRu: "Шеф-редактор тактического отдела",
    authorRoleEn: "Chief Tactical Correspondent",
    publishedAtRu: "30 окт, 22:40",
    publishedAtEn: "Oct 30, 22:40 CET",
    readTimeMinutes: 6,
    imageUrl: "https://a.espncdn.com/photo/2026/1030/r1738494_1296x729_16-9.jpg",
    imageCaptionRu:
      "Фото: ESPN Press / Сантьяго Бернабеу, Мадрид. Разбор ключевых фаз перехода из обороны в атаку.",
    imageCaptionEn:
      "Photo: ESPN Press / Santiago Bernabeu, Madrid. Tactical transition breakdown.",
    clubNameRu: "Реал Мадрид",
    clubNameEn: "Real Madrid",
    relatedMatchId: "match-real-barca",
    isLeadStory: true,
    isTrending: true,
    isBreaking: true,
  },
  {
    id: "ed-grid-yamal-record",
    slug: "lamine-yamal-youngest-el-clasico-goal-assist-record",
    category: "la-liga",
    categoryLabelRu: "ЛА ЛИГА • АНАЛИТИКА",
    categoryLabelEn: "LA LIGA • ANALYTICS",
    titleRu:
      "Исторический рекорд Ламина Ямаля: самый молодой автор «гол+пас» на «Бернабеу» в XXI веке",
    titleEn:
      "Lamine Yamal Makes History: Youngest Player With Goal and Assist at the Bernabeu This Century",
    subtitleRu:
      "Вингер «Барселоны» сначала поразил дальнюю девятку ударом внешней стороной стопы, а во втором тайме вырезал идеальный кросс на Левандовски.",
    subtitleEn:
      "Barcelona's teenage phenomenon curled a trademark finish into the far corner before delivering a pinpoint cross for Robert Lewandowski.",
    authorRu: "Отдел данных Golason",
    authorEn: "Golason Data Lab",
    publishedAtRu: "30 окт, 21:55",
    publishedAtEn: "Oct 30, 21:55 CET",
    readTimeMinutes: 4,
    imageUrl: "https://a.espncdn.com/photo/2026/1027/r1736915_1296x729_16-9.jpg",
    clubNameRu: "Барселона",
    clubNameEn: "Barcelona",
    relatedMatchId: "match-real-barca",
    isTrending: true,
    transferReliability: 100,
    transferSource: "FC Barcelona Official",
  },
  {
    id: "ed-grid-haaland-clause",
    slug: "erling-haaland-release-clause-transfer-radar-2026",
    category: "transfers",
    categoryLabelRu: "ТРАНСФЕРЫ • ИНСАЙД",
    categoryLabelEn: "TRANSFERS • INSIDER",
    titleRu:
      "Особая клаусула Эрлинга Холанда для клубов вне АПЛ: «Манчестер Сити» готовит рекордный контракт",
    titleEn:
      "Erling Haaland's Continental Release Clause Window Opens as Manchester City Table Record Deal",
    subtitleRu:
      "По данным верифицированных источников, английский чемпион начал финальный раунд переговоров с Рафаэлой Пиментой о продлении до 2030 года.",
    subtitleEn:
      "Tier-1 sources report Manchester City have accelerated contract talks through 2030 while Spanish giants study his structured buyout terms.",
    authorRu: "Инсайд-бюро Golason",
    authorEn: "Golason Transfer Desk",
    publishedAtRu: "30 окт, 21:10",
    publishedAtEn: "Oct 30, 21:10 CET",
    readTimeMinutes: 5,
    imageUrl: "https://a.espncdn.com/photo/2026/1029/r1738028_1296x729_16-9.jpg",
    clubNameRu: "Манчестер Сити",
    clubNameEn: "Manchester City",
    relatedMatchId: "ucl-rma-mci",
    isTrending: true,
    transferReliability: 90,
    transferSource: "Fabrizio Romano & David Ornstein",
  },
  {
    id: "ed-river-1-ancelotti-diamond",
    slug: "ancelotti-asymmetrical-4-3-1-2-bellingham-valverde-tactical-analysis",
    category: "tactics",
    categoryLabelRu: "ТАКТИКА • РАЗБОР ДОСКИ",
    categoryLabelEn: "TACTICS • PITCH BOARD",
    titleRu:
      "Асимметричный ромб Анчелотти 4-3-1-2: как Вальверде и Беллингем изолировали опорную зону соперника",
    titleEn:
      "Ancelotti's Asymmetrical 4-3-1-2 Diamond: How Valverde and Bellingham Neutralized High Pressing",
    subtitleRu:
      "При обороне мадридцы выстраиваются в компактные 4-4-2, а в момент перехвата запускают вертикальный коридор в полуфланги за два касания.",
    subtitleEn:
      "Heat-map telemetry shows how Real Madrid defend in a flat 4-4-2 mid-block before springing vertical channels on first-time turnovers.",
    authorRu: "Тактическая лаборатория Golason",
    authorEn: "Golason Tactical Lab",
    publishedAtRu: "30 окт, 20:30",
    publishedAtEn: "Oct 30, 20:30 CET",
    readTimeMinutes: 7,
    imageUrl: "https://a.espncdn.com/photo/2026/1030/r1738425_1296x729_16-9.jpg",
    clubNameRu: "Реал Мадрид",
    clubNameEn: "Real Madrid",
    relatedMatchId: "ucl-rma-mci",
    isTrending: true,
  },
  {
    id: "ed-river-2-trent-liverpool-madrid",
    slug: "vinicius-junior-var-audio-controversy-penalty-check",
    category: "la-liga",
    categoryLabelRu: "ЛА ЛИГА • СУДЕЙСТВО И VAR",
    categoryLabelEn: "LA LIGA • VAR & REFEREEING",
    titleRu:
      "Опубликована полная аудиозапись переговоров комнаты VOR после четырехминутной проверки пенальти на Винисиусе",
    titleEn:
      "Full VAR Audio Transcript Released Following Four-Minute Penalty Check on Vinicius Junior",
    subtitleRu:
      "Комитет арбитров обнародовал ракурсы высокоскоростных камер 500 fps и диалог главного судьи с видеоассистентами.",
    subtitleEn:
      "Refereeing officials published the complete VOR room exchange and 500fps optical tracking angles from the second-half box collision.",
    authorRu: "Судейский корпус Golason",
    authorEn: "Golason Referee Watch",
    publishedAtRu: "30 окт, 19:50",
    publishedAtEn: "Oct 30, 19:50 CET",
    readTimeMinutes: 4,
    imageUrl: "https://a.espncdn.com/photo/2026/1030/r1738704_1296x729_16-9.jpg",
    clubNameRu: "Реал Мадрид",
    clubNameEn: "Real Madrid",
    relatedMatchId: "match-real-barca",
    isTrending: true,
  },
  {
    id: "ed-river-3-arsenal-liverpool-epl",
    slug: "cristiano-ronaldo-925-career-goals-riyadh-derby-hat-trick",
    category: "epl",
    categoryLabelRu: "АПЛ • ЦЕНТРАЛЬНЫЙ МАТЧ",
    categoryLabelEn: "PREMIER LEAGUE • MATCH REPORT",
    titleRu:
      "Высокий темп на «Эмирейтс» и фактор стандартов: тактические итоги битвы «Арсенала» и «Ливерпуля»",
    titleEn:
      "Relentless Tempo at the Emirates & Set-Piece Margins: Tactical Verdict on Arsenal vs Liverpool",
    subtitleRu:
      "Букайо Сака и Мохамед Салах обменялись результативными ударами, а стандарты Деклана Райса и Трента решили исход дуэли за вершину таблицы.",
    subtitleEn:
      "Bukayo Saka and Mohamed Salah traded clinical finishes while Declan Rice and Trent Alexander-Arnold dictated the set-piece battle.",
    authorRu: "Британское бюро Golason",
    authorEn: "Golason UK Desk",
    publishedAtRu: "30 окт, 19:15",
    publishedAtEn: "Oct 30, 19:15 CET",
    readTimeMinutes: 5,
    imageUrl: "https://a.espncdn.com/photo/2026/1027/r1737062_1296x729_16-9.jpg",
    clubNameRu: "Арсенал",
    clubNameEn: "Arsenal",
    relatedMatchId: "epl-ars-liv",
    isTrending: true,
  },
  {
    id: "ed-river-4-ucl-bayern-kane",
    slug: "mbappe-el-clasico-hat-trick-endrick-cameo-bernabeu",
    category: "ucl",
    categoryLabelRu: "ЛИГА ЧЕМПИОНОВ • РАЗБОР",
    categoryLabelEn: "CHAMPIONS LEAGUE • FEATURE",
    titleRu:
      "Новая модель прессинга в Лиге чемпионов: как Гарри Кейн и Джамал Мусиала вскрывают низкие блоки",
    titleEn:
      "Champions League Pressing Blueprint: How Harry Kane and Jamal Musiala Unlock Deep Defensive Blocks",
    subtitleRu:
      "Смещения Кейна в зону десятки освобождают коридоры для рывков Олисе и Мусиалы — детальный разбор структуры атак мюнхенцев.",
    subtitleEn:
      "Kane's deep playmaking drops create immediate half-space lanes for Musiala and Michael Olise against compact European five-backs.",
    authorRu: "Европейская редакция Golason",
    authorEn: "Golason European Desk",
    publishedAtRu: "30 окт, 18:20",
    publishedAtEn: "Oct 30, 18:20 CET",
    readTimeMinutes: 5,
    imageUrl: "https://a.espncdn.com/photo/2026/1026/r1736765_3_1296x729_16-9.jpg",
    clubNameRu: "Бавария",
    clubNameEn: "Bayern Munich",
    relatedMatchId: "ucl-bay-psg",
  },
  {
    id: "ed-river-5-serie-a-milan-inter",
    slug: "lamine-yamal-youngest-el-clasico-goal-assist-record",
    category: "serie-a",
    categoryLabelRu: "СЕРИЯ А • ИТАЛЬЯНСКОЕ ДОСЬЕ",
    categoryLabelEn: "SERIE A • ITALIAN DOSSIER",
    titleRu:
      "Финансовая и тактическая перезагрузка Кальчо: проект нового стадиона в Милане и чемпионская гонка с «Наполи»",
    titleEn:
      "Serie A's Tactical & Financial Reset: Inside Milan's New Stadium Accord and the Scudetto Race With Napoli",
    subtitleRu:
      "Продление контрактов лидеров «Милана», позиционная ротация Симоне Индзаги в «Интере» и прагматичный фундамент «Наполи».",
    subtitleEn:
      "Long-term core renewals at AC Milan, Simone Inzaghi's fluid rotations at Inter, and Napoli's league-best defensive efficiency.",
    authorRu: "Миланский корреспондент Golason",
    authorEn: "Golason Milan Bureau",
    publishedAtRu: "30 окт, 17:40",
    publishedAtEn: "Oct 30, 17:40 CET",
    readTimeMinutes: 6,
    imageUrl: "https://a.espncdn.com/photo/2026/1029/r1738250_1296x729_16-9.jpg",
    clubNameRu: "Интер",
    clubNameEn: "Inter Milan",
    relatedMatchId: "seriea-int-juv",
  },
  {
    id: "ed-river-6-transfers-porro-madrid",
    slug: "erling-haaland-release-clause-transfer-radar-2026",
    category: "transfers",
    categoryLabelRu: "ТРАНСФЕРЫ • ЛА ЛИГА / АПЛ",
    categoryLabelEn: "TRANSFERS • LA LIGA / EPL",
    titleRu:
      "Рынок правых латералей Европы: шорт-лист мадридского «Реала» и позиция «Тоттенхэма» по Педро Порро",
    titleEn:
      "Europe's Right-Back Market: Real Madrid's Summer Shortlist and Tottenham's Valuation on Pedro Porro",
    subtitleRu:
      "Скаутский отдел оценивает стоимость и статистику прогрессивных передач кандидатов из английской Премьер-лиги.",
    subtitleEn:
      "Recruitment analysts weigh contract timelines and progressive passing metrics across Premier League full-back targets.",
    authorRu: "Инсайд-бюро Golason",
    authorEn: "Golason Transfer Desk",
    publishedAtRu: "30 окт, 16:50",
    publishedAtEn: "Oct 30, 16:50 CET",
    readTimeMinutes: 4,
    imageUrl: "https://a.espncdn.com/photo/2026/1030/r1738504_1296x729_16-9.jpg",
    clubNameRu: "Тоттенхэм",
    clubNameEn: "Tottenham",
    transferReliability: 90,
    transferSource: "The Athletic & Relevo",
  },
  {
    id: "ed-river-7-epl-chelsea-united",
    slug: "vinicius-junior-var-audio-controversy-penalty-check",
    category: "epl",
    categoryLabelRu: "АПЛ • РАЗБОР ПОЛУЗАЩИТЫ",
    categoryLabelEn: "PREMIER LEAGUE • MIDFIELD FOCUS",
    titleRu:
      "Перестройка центра поля в АПЛ: как баланс опорной зоны определяет борьбу за топ-4 Лиги чемпионов",
    titleEn:
      "Premier League Midfield Reconstruction: How Pivot Balance Is Defining the Race for Champions League Places",
    subtitleRu:
      "Сравнение интенсивности отборов, возвратов владения во второй трети поля и игры под прессингом у грандов Англии.",
    subtitleEn:
      "Comparing counter-pressing recoveries, second-ball control, and progressive carries under pressure across England's top six.",
    authorRu: "Аналитический отдел Golason",
    authorEn: "Golason Analytics",
    publishedAtRu: "30 окт, 15:45",
    publishedAtEn: "Oct 30, 15:45 CET",
    readTimeMinutes: 5,
    imageUrl: "https://a.espncdn.com/photo/2026/1030/r1738501_1296x729_16-9.jpg",
    clubNameRu: "Челси",
    clubNameEn: "Chelsea",
  },
  {
    id: "ed-river-8-tactics-high-line-europe",
    slug: "ancelotti-asymmetrical-4-3-1-2-bellingham-valverde-tactical-analysis",
    category: "tactics",
    categoryLabelRu: "ТАКТИКА • ЕВРОПЕЙСКИЙ ТРЕНД",
    categoryLabelEn: "TACTICS • EUROPEAN TREND",
    titleRu:
      "Эволюция офсайдной ловушки на 42 метрах: почему топ-клубы Европы отказываются от низкого блока",
    titleEn:
      "Evolution of the 42-Meter Offside Trap: Why Europe's Elite Coaches Are Abandoning Low Blocks",
    subtitleRu:
      "Синхронный шаг защитников по триггеру закрытого мяча сокращает игровое пространство соперника до 22 метров по вертикали.",
    subtitleEn:
      "Synchronized step-up triggers on covered ball cues compress vertical pitch space to 22 meters between striker and back four.",
    authorRu: "Артур Арутюнян",
    authorEn: "Arthur Harutyunyan",
    publishedAtRu: "30 окт, 14:30",
    publishedAtEn: "Oct 30, 14:30 CET",
    readTimeMinutes: 8,
    imageUrl: "https://a.espncdn.com/photo/2026/1028/r1737505_1296x729_16-9.jpg",
    clubNameRu: "Барселона",
    clubNameEn: "Barcelona",
    relatedMatchId: "match-real-barca",
  },
  {
    id: "ed-river-9-transfers-fermin-united",
    slug: "cristiano-ronaldo-925-career-goals-riyadh-derby-hat-trick",
    category: "transfers",
    categoryLabelRu: "ТРАНСФЕРЫ • РАДАР СДЕЛОК",
    categoryLabelEn: "TRANSFERS • DEAL RADAR",
    titleRu:
      "Мониторинг полузащитников Ла Лиги: интерес английских клубов и политика отступных в Испании",
    titleEn:
      "Scouting La Liga's Box-Crashing Midfielders: Premier League Interest Meets Spanish Release Clauses",
    subtitleRu:
      "Как обязательные клаусулы в Испании меняют стратегию переговоров перед открытием трансферного окна.",
    subtitleEn:
      "How mandatory buyout clauses in Spain reshape negotiation leverage ahead of the upcoming transfer window.",
    authorRu: "Инсайд-бюро Golason",
    authorEn: "Golason Transfer Desk",
    publishedAtRu: "30 окт, 13:20",
    publishedAtEn: "Oct 30, 13:20 CET",
    readTimeMinutes: 4,
    imageUrl: "https://a.espncdn.com/photo/2026/0823/r1706005_1296x729_16-9.jpg",
    clubNameRu: "Барселона",
    clubNameEn: "Barcelona",
    transferReliability: 75,
    transferSource: "ESPN & Spanish Press",
  },
];

function resolveLocalizedString(
  lang: "ru" | "en",
  ruVal?: string,
  enVal?: string,
  bilingualOrStr?: { ru: string; en: string } | string,
  fallback = ""
): string {
  if (lang === "ru" && ruVal) return ruVal;
  if (lang === "en" && enVal) return enVal;
  if (typeof bilingualOrStr === "string" && bilingualOrStr.trim().length > 0) {
    return bilingualOrStr;
  }
  if (bilingualOrStr && typeof bilingualOrStr === "object") {
    return lang === "ru" ? bilingualOrStr.ru : bilingualOrStr.en;
  }
  return ruVal || enVal || fallback;
}

export function resolveEspnPressPhoto(article: EditorialArticleInput): string {
  if (
    article.imageUrl &&
    article.imageUrl.startsWith("https://a.espncdn.com/photo/")
  ) {
    return article.imageUrl;
  }
  const slugKey = (article.slug || article.id || "").toLowerCase();
  if (slugKey.includes("mbappe") || slugKey.includes("clasico")) {
    return VERIFIED_ESPN_PRESS_PHOTOS[0];
  }
  if (slugKey.includes("yamal") || slugKey.includes("barcelona")) {
    return VERIFIED_ESPN_PRESS_PHOTOS[1];
  }
  if (slugKey.includes("vinicius") || slugKey.includes("var") || slugKey.includes("trent")) {
    return VERIFIED_ESPN_PRESS_PHOTOS[2];
  }
  if (slugKey.includes("haaland") || slugKey.includes("city")) {
    return VERIFIED_ESPN_PRESS_PHOTOS[3];
  }
  if (slugKey.includes("ancelotti") || slugKey.includes("tactic")) {
    return VERIFIED_ESPN_PRESS_PHOTOS[4];
  }
  if (slugKey.includes("ronaldo") || slugKey.includes("riyadh")) {
    return VERIFIED_ESPN_PRESS_PHOTOS[5];
  }
  let hash = 0;
  for (let i = 0; i < slugKey.length; i += 1) {
    hash = (hash * 31 + slugKey.charCodeAt(i)) >>> 0;
  }
  return VERIFIED_ESPN_PRESS_PHOTOS[hash % VERIFIED_ESPN_PRESS_PHOTOS.length];
}

export function ArticleCard({
  article,
  variant = "grid",
  lang,
  locale,
  rank,
  imagePosition = "left",
  showExcerpt = true,
  showDivider = true,
  priority = false,
  className = "",
  style,
}: ArticleCardProps) {
  const activeLang: "ru" | "en" = lang ?? locale ?? "ru";
  const isRu = activeLang === "ru";
  const [imgSrc, setImgSrc] = useState<string>(() =>
    resolveEspnPressPhoto(article)
  );

  const href = `/news/${article.slug}`;
  const headline = resolveLocalizedString(
    activeLang,
    article.titleRu,
    article.titleEn,
    article.title,
    "Editorial Story"
  );
  const deck = resolveLocalizedString(
    activeLang,
    article.subtitleRu ?? article.excerptRu,
    article.subtitleEn ?? article.excerptEn,
    article.summary,
    ""
  );
  const categoryText = resolveLocalizedString(
    activeLang,
    article.categoryLabelRu,
    article.categoryLabelEn,
    article.categoryLabel,
    isRu ? "РЕДАКЦИЯ" : "EDITORIAL"
  );
  const authorName = resolveLocalizedString(
    activeLang,
    article.authorRu,
    article.authorEn,
    article.author,
    isRu ? "Редакция Golason" : "Golason Editorial Desk"
  );
  const publishedText = resolveLocalizedString(
    activeLang,
    article.publishedAtRu,
    article.publishedAtEn,
    article.publishedAt,
    isRu ? "Сегодня" : "Today"
  );
  const captionText = isRu
    ? article.imageCaptionRu
    : article.imageCaptionEn || article.imageCaptionRu;
  const clubName = isRu
    ? article.clubNameRu || article.clubTag
    : article.clubNameEn || article.clubTag;

  const readMinutes =
    article.readTimeMinutes ?? article.readingTimeMinutes ?? 4;
  const readTimeLabel = isRu
    ? `${readMinutes} мин чтения`
    : `${readMinutes} min read`;

  const reliability =
    article.transferReliability ?? article.transferReliabilityPercent;

  const isBreakingOrLead =
    variant === "lead" ||
    article.isBreaking ||
    article.category === "la-liga" ||
    article.category === "ucl";
  const categoryColor = isBreakingOrLead ? "#DC2626" : "#EA580C";

  const handleImageError = () => {
    if (imgSrc !== VERIFIED_ESPN_PRESS_PHOTOS[0]) {
      setImgSrc(VERIFIED_ESPN_PRESS_PHOTOS[0]);
    }
  };

  if (variant === "compact") {
    const formattedRank =
      typeof rank === "number" ? String(rank).padStart(2, "0") : "01";

    return (
      <article
        className={`golason-article-card golason-article-card--compact ${className}`}
        style={{
          backgroundColor: "#FFFFFF",
          borderBottom: showDivider ? "1px solid #E5E7EB" : "none",
          padding: "12px 0",
          ...style,
        }}
      >
        <Link
          href={href}
          className="golason-editorial-card-link"
          style={{
            display: "grid",
            gridTemplateColumns: "28px 1fr 84px",
            gap: "12px",
            alignItems: "start",
            textDecoration: "none",
            color: "#111827",
          }}
        >
          <span
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "20px",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#DC2626",
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "-0.02em",
            }}
          >
            {formattedRank}
          </span>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              minWidth: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                flexWrap: "wrap",
                fontSize: "10px",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: categoryColor,
              }}
            >
              <span>{categoryText}</span>
              <span style={{ color: "#4B5563", fontWeight: 600 }}>
                • {readMinutes} {isRu ? "мин" : "min"}
              </span>
            </div>

            <h4
              className="golason-editorial-card-headline"
              style={{
                margin: 0,
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "14.5px",
                fontWeight: 700,
                lineHeight: 1.32,
                color: "#111827",
                letterSpacing: "-0.01em",
              }}
            >
              {headline}
            </h4>
          </div>

          <div
            style={{
              width: "84px",
              aspectRatio: "16 / 9",
              overflow: "hidden",
              backgroundColor: "#F3F4F6",
              border: "1px solid #E5E7EB",
              flexShrink: 0,
            }}
          >
            <img
              src={imgSrc}
              alt={headline}
              loading="lazy"
              onError={handleImageError}
              className="golason-editorial-card-photo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </div>
        </Link>
      </article>
    );
  }

  if (variant === "horizontal") {
    const isRightImage = imagePosition === "right";

    return (
      <article
        className={`golason-article-card golason-article-card--horizontal ${className}`}
        style={{
          backgroundColor: "#FFFFFF",
          borderBottom: showDivider ? "1px solid #E5E7EB" : "none",
          padding: "20px 0",
          ...style,
        }}
      >
        <div
          className="golason-editorial-horizontal-layout"
          style={{
            display: "grid",
            gridTemplateColumns: isRightImage
              ? "1fr minmax(200px, 260px)"
              : "minmax(200px, 260px) 1fr",
            gap: "20px",
            alignItems: "start",
          }}
        >
          {/* 16:9 Press Photo */}
          <Link
            href={href}
            className="golason-editorial-card-link"
            style={{
              order: isRightImage ? 2 : 1,
              display: "block",
              width: "100%",
              aspectRatio: "16 / 9",
              overflow: "hidden",
              backgroundColor: "#F3F4F6",
              border: "1px solid #E5E7EB",
              textDecoration: "none",
            }}
          >
            <img
              src={imgSrc}
              alt={headline}
              loading="lazy"
              onError={handleImageError}
              className="golason-editorial-card-photo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.38s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </Link>

          {/* Editorial Story Copy */}
          <div
            style={{
              order: isRightImage ? 1 : 2,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              minWidth: 0,
            }}
          >
            {/* Meta Row: Category + Club + Timestamp */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                {clubName && (
                  <ClubLogo
                    teamName={article.clubNameEn || clubName}
                    teamNameRu={article.clubNameRu || clubName}
                    size={16}
                  />
                )}
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: categoryColor,
                  }}
                >
                  {categoryText}
                </span>
                {typeof reliability === "number" && (
                  <span
                    style={{
                      fontSize: "10.5px",
                      fontWeight: 700,
                      color: "#111827",
                      backgroundColor: "#F3F4F6",
                      border: "1px solid #D1D5DB",
                      padding: "1px 6px",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    Tier • {reliability}%
                  </span>
                )}
              </div>

              <span
                style={{
                  fontSize: "11.5px",
                  color: "#4B5563",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {publishedText}
              </span>
            </div>

            <Link
              href={href}
              className="golason-editorial-card-link"
              style={{ textDecoration: "none", color: "#111827" }}
            >
              <h3
                className="golason-editorial-card-headline"
                style={{
                  margin: 0,
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(18px, 2vw, 21px)",
                  fontWeight: 700,
                  lineHeight: 1.26,
                  letterSpacing: "-0.015em",
                  color: "#111827",
                }}
              >
                {headline}
              </h3>
            </Link>

            {showExcerpt && deck && (
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: 1.55,
                  color: "#4B5563",
                  maxWidth: "68ch",
                }}
              >
                {deck}
              </p>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexWrap: "wrap",
                fontSize: "12px",
                color: "#4B5563",
                marginTop: "2px",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              <span style={{ fontWeight: 600, color: "#111827" }}>
                {authorName}
              </span>
              <span aria-hidden="true">•</span>
              <span>{readTimeLabel}</span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "lead") {
    return (
      <article
        className={`golason-article-card golason-article-card--lead ${className}`}
        style={{
          backgroundColor: "#FFFFFF",
          borderBottom: showDivider ? "1px solid #E5E7EB" : "none",
          paddingBottom: showDivider ? "24px" : "0",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          ...style,
        }}
      >
        {/* 16:9 Hero Press Photo */}
        <figure style={{ margin: 0 }}>
          <Link
            href={href}
            className="golason-editorial-card-link"
            style={{
              display: "block",
              width: "100%",
              aspectRatio: "16 / 9",
              overflow: "hidden",
              backgroundColor: "#F3F4F6",
              border: "1px solid #E5E7EB",
              textDecoration: "none",
            }}
          >
            <img
              src={imgSrc}
              alt={headline}
              loading={priority ? "eager" : "lazy"}
              onError={handleImageError}
              className="golason-editorial-card-photo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </Link>
          {captionText && (
            <figcaption
              style={{
                marginTop: "6px",
                fontSize: "11.5px",
                lineHeight: 1.4,
                color: "#4B5563",
                borderBottom: "1px solid #E5E7EB",
                paddingBottom: "8px",
              }}
            >
              {captionText}
            </figcaption>
          )}
        </figure>

        {/* Lead Metadata Header Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                backgroundColor: "#DC2626",
                color: "#FFFFFF",
                fontSize: "10.5px",
                fontWeight: 800,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "3px 8px",
              }}
            >
              {isRu ? "ГЛАВНЫЙ МАТЕРИАЛ" : "COVER STORY"}
            </span>
            <span
              style={{
                fontSize: "11.5px",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: categoryColor,
              }}
            >
              {categoryText}
            </span>
          </div>

          <span
            style={{
              fontSize: "12px",
              color: "#4B5563",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {publishedText}
          </span>
        </div>

        {/* 32px Bold Editorial Serif Headline */}
        <Link
          href={href}
          className="golason-editorial-card-link"
          style={{ textDecoration: "none", color: "#111827" }}
        >
          <h2
            className="golason-editorial-card-headline"
            style={{
              margin: 0,
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(26px, 3.2vw, 34px)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#111827",
            }}
          >
            {headline}
          </h2>
        </Link>

        {/* Lead Deck Paragraph */}
        {showExcerpt && deck && (
          <p
            style={{
              margin: 0,
              fontSize: "16.5px",
              lineHeight: 1.6,
              color: "#4B5563",
              maxWidth: "70ch",
            }}
          >
            {deck}
          </p>
        )}

        {/* Author Byline & Reading Time */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
            paddingTop: "8px",
            borderTop: "1px solid #E5E7EB",
            fontSize: "12.5px",
            color: "#4B5563",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            {clubName && (
              <ClubLogo
                teamName={article.clubNameEn || clubName}
                teamNameRu={article.clubNameRu || clubName}
                size={18}
              />
            )}
            <span style={{ fontWeight: 700, color: "#111827" }}>
              {authorName}
            </span>
            {article.authorRoleRu || article.authorRoleEn ? (
              <span>
                — {isRu ? article.authorRoleRu : article.authorRoleEn}
              </span>
            ) : null}
            <span aria-hidden="true">•</span>
            <span>{readTimeLabel}</span>
          </div>

          <Link
            href={href}
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#DC2626",
              textDecoration: "none",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {isRu ? "Читать статью →" : "Read Full Story →"}
          </Link>
        </div>
      </article>
    );
  }

  // Default: 'grid' variant (Standard 16:9 photo card for 2/3-column editorial grids)
  return (
    <article
      className={`golason-article-card golason-article-card--grid ${className}`}
      style={{
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "12px",
        borderBottom: showDivider ? "1px solid #E5E7EB" : "none",
        paddingBottom: showDivider ? "18px" : "0",
        ...style,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Link
          href={href}
          className="golason-editorial-card-link"
          style={{
            display: "block",
            width: "100%",
            aspectRatio: "16 / 9",
            overflow: "hidden",
            backgroundColor: "#F3F4F6",
            border: "1px solid #E5E7EB",
            textDecoration: "none",
          }}
        >
          <img
            src={imgSrc}
            alt={headline}
            loading="lazy"
            onError={handleImageError}
            className="golason-editorial-card-photo"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.38s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        </Link>

        {/* Category + Reading Time Meta Row */}
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
            }}
          >
            {clubName && (
              <ClubLogo
                teamName={article.clubNameEn || clubName}
                teamNameRu={article.clubNameRu || clubName}
                size={15}
              />
            )}
            <span
              style={{
                fontSize: "10.5px",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: categoryColor,
              }}
            >
              {categoryText}
            </span>
          </div>

          <span
            style={{
              fontSize: "11px",
              color: "#4B5563",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {publishedText}
          </span>
        </div>

        <Link
          href={href}
          className="golason-editorial-card-link"
          style={{ textDecoration: "none", color: "#111827" }}
        >
          <h3
            className="golason-editorial-card-headline"
            style={{
              margin: 0,
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "19px",
              fontWeight: 700,
              lineHeight: 1.28,
              letterSpacing: "-0.015em",
              color: "#111827",
            }}
          >
            {headline}
          </h3>
        </Link>

        {showExcerpt && deck && (
          <p
            style={{
              margin: 0,
              fontSize: "13.5px",
              lineHeight: 1.55,
              color: "#4B5563",
            }}
          >
            {deck}
          </p>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          fontSize: "11.5px",
          color: "#4B5563",
          paddingTop: "6px",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <span style={{ fontWeight: 600, color: "#111827" }}>{authorName}</span>
        <span>{readTimeLabel}</span>
      </div>
    </article>
  );
}

export default ArticleCard;
