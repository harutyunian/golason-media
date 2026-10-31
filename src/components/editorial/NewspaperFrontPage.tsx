"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ClubLogo } from "@/lib/clubLogos";
import { MOCK_STANDINGS } from "@/lib/mockData";
import {
  REAL_EDITORIAL_ARTICLES,
  REAL_FRONT_PAGE_MATCHES,
  REAL_MULTI_LEAGUE_STANDINGS,
} from "@/lib/realDataBridge";
import {
  ArticleCard,
  EditorialArticleInput,
  EditorialCategoryId,
} from "./ArticleCard";

export interface NewspaperFrontPageMatchItem {
  id: string;
  competitionRu: string;
  competitionEn: string;
  status: "LIVE" | "HT" | "FT" | "UPCOMING";
  minuteLabelRu: string;
  minuteLabelEn: string;
  homeTeamRu: string;
  homeTeamEn: string;
  homeShort: string;
  homeScore: number;
  awayTeamRu: string;
  awayTeamEn: string;
  awayShort: string;
  awayScore: number;
}

export interface NewspaperFrontPageTransferDeal {
  id: string;
  playerRu: string;
  playerEn: string;
  positionRu: string;
  positionEn: string;
  fromClubRu: string;
  fromClubEn: string;
  toClubRu: string;
  toClubEn: string;
  fee: string;
  reliability: 100 | 90 | 75 | 50;
  statusLabelRu: string;
  statusLabelEn: string;
  articleSlug: string;
}

export interface NewspaperFrontPageProps {
  lang?: "ru" | "en";
  locale?: "ru" | "en";
  articles?: EditorialArticleInput[];
  initialCategory?: EditorialCategoryId;
  className?: string;
}

export const FRONT_PAGE_ARTICLES: EditorialArticleInput[] = [
  {
    id: "fp-art-1",
    slug: "real-madrid-el-clasico-tactical-autopsy-bernabeu",
    category: "la-liga",
    categoryLabelRu: "ЛА ЛИГА • ГЛАВНАЯ ТЕМА",
    categoryLabelEn: "LA LIGA • COVER STORY",
    titleRu:
      "Анатомия мадридского перелома: как «Реал» скорректировал геометрию рывков Мбаппе и разрушил высокую линию «Барселоны»",
    titleEn:
      "Anatomy of a Bernabeu Turnaround: How Real Madrid Recalibrated Mbappe's Runs to Shatter Barcelona's High Line",
    subtitleRu:
      "После серии офсайдов в первой трети матча штаб Карло Анчелотти опустил точку старта атак на четыре метра глубже и превратил вертикальные коридоры в хет-трик французского форварда.",
    subtitleEn:
      "After early offside traps stalled their transitions, Carlo Ancelotti's staff dropped the launch zone four meters deeper, turning vertical channels into a clinical hat-trick.",
    authorRu: "Артур Арутюнян",
    authorEn: "Arthur Harutyunyan",
    authorRoleRu: "Шеф тактического отдела",
    authorRoleEn: "Chief Tactical Correspondent",
    publishedAtRu: "30 окт, 23:15",
    publishedAtEn: "Oct 30, 23:15",
    readTimeMinutes: 6,
    imageUrl: "https://a.espncdn.com/photo/2026/1030/r1738494_1296x729_16-9.jpg",
    imageCaptionRu:
      "Игроки «Реал Мадрид» празднуют решающий гол в ворота «Барселоны» на переполненном «Сантьяго Бернабеу». Фото: ESPN Images",
    imageCaptionEn:
      "Real Madrid players celebrate the decisive strike against Barcelona at a packed Santiago Bernabeu. Photo: ESPN Images",
    clubNameRu: "Реал Мадрид",
    clubNameEn: "Real Madrid",
    relatedMatchId: "match-el-clasico",
    isLeadStory: true,
    isTrending: true,
    isBreaking: true,
  },
  {
    id: "fp-art-2",
    slug: "barcelona-lamine-yamal-hansi-flick-high-line-evolution",
    category: "la-liga",
    categoryLabelRu: "ЛА ЛИГА • АНАЛИТИКА",
    categoryLabelEn: "LA LIGA • ANALYTICS",
    titleRu:
      "Феномен Ламина Ямаля и вертикальный код Ханси Флика: почему новая «Барселона» стала самой зрелищной командой Европы",
    titleEn:
      "Lamine Yamal's Gravity and Hansi Flick's Vertical Code: Why This Barcelona Side Defines Modern Attacking Football",
    subtitleRu:
      "Правый вингер каталонцев диктует темп позиционных атак, а его связка с Педри и Левандовски переписала рекорды результативности клуба.",
    subtitleEn:
      "Barcelona's right-wing prodigy dictates the tempo of every attacking phase while his chemistry with Pedri and Lewandowski breaks scoring benchmarks.",
    authorRu: "Дмитрий Навоша",
    authorEn: "Dmitry Navosha",
    publishedAtRu: "30 окт, 21:40",
    publishedAtEn: "Oct 30, 21:40",
    readTimeMinutes: 5,
    imageUrl: "https://a.espncdn.com/photo/2026/1027/r1736915_1296x729_16-9.jpg",
    clubNameRu: "Барселона",
    clubNameEn: "Barcelona",
    relatedMatchId: "laliga-bar-atm",
    isTrending: true,
    transferReliability: 100,
  },
  {
    id: "fp-art-3",
    slug: "trent-alexander-arnold-real-madrid-liverpool-contract-dossier",
    category: "transfers",
    categoryLabelRu: "ТРАНСФЕРЫ • ДОСЬЕ",
    categoryLabelEn: "TRANSFERS • DOSSIER",
    titleRu:
      "Мадридский гамбит вокруг Трента Александер-Арнольда: закрытые детали переговоров между «Ливерпулем» и «Реалом»",
    titleEn:
      "The Trent Alexander-Arnold Dossier: Inside Real Madrid's Pursuit and Liverpool's Contract Stand-Off",
    subtitleRu:
      "Скаутский департамент «Сантьяго Бернабеу» видит в вице-капитане мерсисайдцев фундаментального плеймейкера на правом фланге обороны.",
    subtitleEn:
      "Real Madrid's recruitment hierarchy have identified Liverpool's vice-captain as their generational right-sided playmaker.",
    authorRu: "Кирилл Хаит",
    authorEn: "Kirill Khait",
    publishedAtRu: "30 окт, 20:10",
    publishedAtEn: "Oct 30, 20:10",
    readTimeMinutes: 5,
    imageUrl: "https://a.espncdn.com/photo/2026/1030/r1738704_1296x729_16-9.jpg",
    clubNameRu: "Ливерпуль",
    clubNameEn: "Liverpool",
    relatedMatchId: "epl-ars-liv",
    isTrending: true,
    transferReliability: 90,
  },
  {
    id: "fp-art-4",
    slug: "man-city-bayern-munich-champions-league-tactical-blueprint",
    category: "ucl",
    categoryLabelRu: "ЛИГА ЧЕМПИОНОВ • ТАКТИКА",
    categoryLabelEn: "CHAMPIONS LEAGUE • TACTICS",
    titleRu:
      "Гибридные защитники и контроль полуфлангов: тактическая дуэль идей Гвардиолы и Компани в Лиге чемпионов",
    titleEn:
      "Hybrid Centre-Backs and Half-Space Overloads: Guardiola and Kompany's Champions League Chess Match",
    subtitleRu:
      "Как «Манчестер Сити» и «Бавария» синхронно переосмыслили построение игры в первой фазе билд-апа ради взлома оборонительных блоков УЕФА.",
    subtitleEn:
      "How Manchester City and Bayern Munich have re-engineered first-phase build-up and rest-defense structures in Europe.",
    authorRu: "Вадим Лукомский",
    authorEn: "Vadim Lukomskiy",
    publishedAtRu: "30 окт, 19:05",
    publishedAtEn: "Oct 30, 19:05",
    readTimeMinutes: 7,
    imageUrl: "https://a.espncdn.com/photo/2026/1029/r1738028_1296x729_16-9.jpg",
    clubNameRu: "Манчестер Сити",
    clubNameEn: "Manchester City",
    relatedMatchId: "ucl-rma-mci",
    isTrending: true,
  },
  {
    id: "fp-art-5",
    slug: "virgil-van-dijk-liverpool-arsenal-title-statement",
    category: "epl",
    categoryLabelRu: "АПЛ • МАТЧ ТУРА",
    categoryLabelEn: "PREMIER LEAGUE • BIG MATCH",
    titleRu:
      "Верховая гегемония Вирджила ван Дейка и хладнокровие Арне Слота: как «Ливерпуль» выдержал шторм на «Эмирейтс»",
    titleEn:
      "Virgil van Dijk's Aerial Command and Arne Slot's Composure: How Liverpool Weathered the Emirates Storm",
    subtitleRu:
      "Капитан мерсисайдцев не только сравнял счет после розыгрыша углового, но и организовал оборону во втором тайме против натиска «Арсенала».",
    subtitleEn:
      "Liverpool's captain struck from a rehearsed corner routine before marshaling a resolute second-half defensive line against Arsenal.",
    authorRu: "Денис Пузырев",
    authorEn: "Denis Puzyrev",
    publishedAtRu: "30 окт, 18:45",
    publishedAtEn: "Oct 30, 18:45",
    readTimeMinutes: 5,
    imageUrl: "https://a.espncdn.com/photo/2026/1030/r1738605_1296x729_16-9.jpg",
    clubNameRu: "Ливерпуль",
    clubNameEn: "Liverpool",
    relatedMatchId: "epl-ars-liv",
    isTrending: true,
  },
  {
    id: "fp-art-6",
    slug: "achraf-hakimi-hat-trick-psg-luis-enrique-positional-freedom",
    category: "tactics",
    categoryLabelRu: "ТАКТИКА • РАЗБОР РОЛИ",
    categoryLabelEn: "TACTICS • ROLE ANALYSIS",
    titleRu:
      "Бенефис Ашрафа Хакими в системе Луиса Энрике: как правый латераль «ПСЖ» превратился в скрытую «десятку»",
    titleEn:
      "Achraf Hakimi's Positional Liberation: How Luis Enrique Transformed PSG's Right-Back Into an Auxiliary Number Ten",
    subtitleRu:
      "Свобода перемещений между флангом и центром штрафной позволила марокканцу выдать самый результативный отрезок в профессиональной карьере.",
    subtitleEn:
      "Freed to roam from the touchline into the penalty spot, the Moroccan defender is producing elite attacking numbers in Paris.",
    authorRu: "Артур Арутюнян",
    authorEn: "Arthur Harutyunyan",
    publishedAtRu: "30 окт, 18:20",
    publishedAtEn: "Oct 30, 18:20",
    readTimeMinutes: 5,
    imageUrl: "https://a.espncdn.com/photo/2026/1030/r1738690_1296x729_16-9.jpg",
    clubNameRu: "ПСЖ",
    clubNameEn: "Paris Saint-Germain",
    relatedMatchId: "ucl-bay-psg",
  },
  {
    id: "fp-art-7",
    slug: "harry-kane-gerd-muller-trophy-bayern-scoring-evolution",
    category: "ucl",
    categoryLabelRu: "ЛИГА ЧЕМПИОНОВ • ПРОФИЛЬ",
    categoryLabelEn: "CHAMPIONS LEAGUE • PROFILE",
    titleRu:
      "Трофей Герда Мюллера и эволюция Гарри Кейна: как английский снайпер стал главным диспетчером атак «Баварии»",
    titleEn:
      "The Gerd Muller Trophy and Harry Kane's Evolution: Inside Bayern Munich's Complete Number Nine",
    subtitleRu:
      "Завоевав награду лучшему бомбардиру сезона, форвард мюнхенцев совмещает феноменальную реализацию с ролью глубинного плеймейкера для Мусиалы.",
    subtitleEn:
      "Fresh off claiming Europe's top scorer prize, the England captain pairs penalty-box efficiency with deep playmaking for Jamal Musiala.",
    authorRu: "Станислав Рынкевич",
    authorEn: "Stanislav Rynkevich",
    publishedAtRu: "30 окт, 17:15",
    publishedAtEn: "Oct 30, 17:15",
    readTimeMinutes: 5,
    imageUrl: "https://a.espncdn.com/photo/2026/1026/r1736765_3_1296x729_16-9.jpg",
    clubNameRu: "Бавария",
    clubNameEn: "Bayern Munich",
    relatedMatchId: "ucl-bay-psg",
  },
  {
    id: "fp-art-8",
    slug: "christian-pulisic-ac-milan-contract-extension-serie-a",
    category: "serie-a",
    categoryLabelRu: "СЕРИЯ А • КОНТРАКТЫ",
    categoryLabelEn: "SERIE A • CONTRACTS",
    titleRu:
      "Американский мотор «Сан-Сиро»: почему Кристиан Пулишич стал самым незаменимым игроком атаки «Милана»",
    titleEn:
      "San Siro's American Catalyst: Why Christian Pulisic Earned AC Milan's Cornerstone Contract Extension",
    subtitleRu:
      "Переехав в Италию, лидер сборной США обрел стабильность мирового класса, лидируя в Серии А по числу результативных действий.",
    subtitleEn:
      "Since arriving in Lombardy, the USMNT captain has delivered relentless end-product across Serie A and Europe.",
    authorRu: "Алексей Логинов",
    authorEn: "Alexey Loginov",
    publishedAtRu: "30 окт, 16:30",
    publishedAtEn: "Oct 30, 16:30",
    readTimeMinutes: 4,
    imageUrl: "https://a.espncdn.com/photo/2026/1028/r1737505_1296x729_16-9.jpg",
    clubNameRu: "Милан",
    clubNameEn: "AC Milan",
    relatedMatchId: "seriea-int-juv",
    transferReliability: 100,
  },
  {
    id: "fp-art-9",
    slug: "inter-ac-milan-new-725m-san-siro-stadium-project",
    category: "serie-a",
    categoryLabelRu: "СЕРИЯ А • БИЗНЕС И АРЕНЫ",
    categoryLabelEn: "SERIE A • STADIUM BUSINESS",
    titleRu:
      "Мегапроект на 725 миллионов долларов: как «Интер» и «Милан» строят новый стадион рядом с «Сан-Сиро»",
    titleEn:
      "Inside the $725 Million San Siro Successor: How Inter and AC Milan Plan to Close Europe's Stadium Revenue Gap",
    subtitleRu:
      "Два миланских гранда объединили усилия вокруг ультрасовременной арены на 71 500 зрителей, чтобы удвоить доходы в день матча.",
    subtitleEn:
      "Both Milanese giants have aligned behind a shared 71,500-seat arena designed to double matchday commercial income.",
    authorRu: "Алексей Логинов",
    authorEn: "Alexey Loginov",
    publishedAtRu: "30 окт, 15:45",
    publishedAtEn: "Oct 30, 15:45",
    readTimeMinutes: 6,
    imageUrl: "https://a.espncdn.com/photo/2026/1029/r1738250_1296x729_16-9.jpg",
    clubNameRu: "Интер",
    clubNameEn: "Inter Milan",
    relatedMatchId: "seriea-int-juv",
  },
  {
    id: "fp-art-10",
    slug: "global-club-power-rankings-top-20-tactical-metrics",
    category: "tactics",
    categoryLabelRu: "ТАКТИКА • ИНДЕКС СИЛЫ",
    categoryLabelEn: "TACTICS • POWER INDEX",
    titleRu:
      "Индекс силы Golason Топ-20: почему «Ливерпуль», «Реал» и «Барселона» оторвались от остальной Европы по метрикам",
    titleEn:
      "Golason Global Power Rankings Top 20: Why Liverpool, Real Madrid, and Barcelona Lead Europe's Underlying Metrics",
    subtitleRu:
      "Комплексная модель оценки команд на основе ожидаемой угрозы с игры (npxG), интенсивности прессинга PPDA и глубины состава.",
    subtitleEn:
      "A deep analytical ranking weighing non-penalty expected threat, PPDA pressing efficiency, and schedule-adjusted dominance.",
    authorRu: "Вадим Лукомский",
    authorEn: "Vadim Lukomskiy",
    publishedAtRu: "30 окт, 15:00",
    publishedAtEn: "Oct 30, 15:00",
    readTimeMinutes: 6,
    imageUrl: "https://a.espncdn.com/photo/2026/1030/r1738425_1296x729_16-9.jpg",
    clubNameRu: "Реал Мадрид",
    clubNameEn: "Real Madrid",
    relatedMatchId: "ucl-rma-mci",
    isTrending: true,
  },
  {
    id: "fp-art-11",
    slug: "manchester-city-premier-league-title-race-rodri-void",
    category: "epl",
    categoryLabelRu: "АПЛ • РАЗБОР СОСТАВА",
    categoryLabelEn: "PREMIER LEAGUE • SQUAD FOCUS",
    titleRu:
      "Чемпионская гонка АПЛ без Родри: как «Манчестер Сити» перестроил опорную зону и готовит зимний трансферный ход",
    titleEn:
      "Navigating the Premier League Title Race Without Rodri: How Manchester City Rebuilt Their Pivot Zone",
    subtitleRu:
      "Пеп Гвардиола распределил функции обладателя «Золотого мяча» между Ковачичем и Льюисом, пока скауты клуба изучают зимний рынок.",
    subtitleEn:
      "Pep Guardiola has split his Ballon d'Or winner's responsibilities between Mateo Kovacic and Rico Lewis ahead of January.",
    authorRu: "Денис Пузырев",
    authorEn: "Denis Puzyrev",
    publishedAtRu: "30 окт, 14:10",
    publishedAtEn: "Oct 30, 14:10",
    readTimeMinutes: 5,
    imageUrl: "https://a.espncdn.com/photo/2026/1030/r1738598_1296x729_16-9.jpg",
    clubNameRu: "Манчестер Сити",
    clubNameEn: "Manchester City",
    relatedMatchId: "ucl-rma-mci",
    transferReliability: 50,
  },
  {
    id: "fp-art-12",
    slug: "liverpool-transfer-move-monaco-midfielder-maghnes-akliouche",
    category: "transfers",
    categoryLabelRu: "ТРАНСФЕРЫ • СКАУТИНГ",
    categoryLabelEn: "TRANSFERS • SCOUTING",
    titleRu:
      "Скаутский радар «Энфилда»: «Ливерпуль» готовит предметное предложение по креативному хавбеку «Монако» Магнесу Аклиушу",
    titleEn:
      "Anfield Recruitment Radar: Liverpool Prepare Concrete Move for AS Monaco Creative Midfielder Maghnes Akliouche",
    subtitleRu:
      "Аналитический отдел мерсисайдцев впечатлен прогрессом 24-летнего француза в Лиге чемпионов и рассматривает его как партнера для Собослаи.",
    subtitleEn:
      "Liverpool's data-driven recruitment team have tracked the 24-year-old French playmaker across the Champions League campaign.",
    authorRu: "Кирилл Хаит",
    authorEn: "Kirill Khait",
    publishedAtRu: "30 окт, 13:20",
    publishedAtEn: "Oct 30, 13:20",
    readTimeMinutes: 5,
    imageUrl: "https://a.espncdn.com/photo/2026/1029/r1738253_1296x729_16-9.jpg",
    clubNameRu: "Монако",
    clubNameEn: "AS Monaco",
    relatedMatchId: "epl-ars-liv",
    transferReliability: 75,
  },
];

const SIDEBAR_LIVE_MATCHES: NewspaperFrontPageMatchItem[] = [
  {
    id: "ucl-rma-mci",
    competitionRu: "Лига чемпионов",
    competitionEn: "Champions League",
    status: "LIVE",
    minuteLabelRu: "68'",
    minuteLabelEn: "68'",
    homeTeamRu: "Реал Мадрид",
    homeTeamEn: "Real Madrid",
    homeShort: "RMA",
    homeScore: 2,
    awayTeamRu: "Манчестер Сити",
    awayTeamEn: "Man City",
    awayShort: "MCI",
    awayScore: 1,
  },
  {
    id: "match-el-clasico",
    competitionRu: "Ла Лига • Тур 11",
    competitionEn: "La Liga • MD 11",
    status: "FT",
    minuteLabelRu: "Завершен",
    minuteLabelEn: "FT",
    homeTeamRu: "Реал Мадрид",
    homeTeamEn: "Real Madrid",
    homeShort: "RMA",
    homeScore: 3,
    awayTeamRu: "Барселона",
    awayTeamEn: "Barcelona",
    awayShort: "BAR",
    awayScore: 2,
  },
  {
    id: "epl-ars-liv",
    competitionRu: "АПЛ • Тур 10",
    competitionEn: "Premier League",
    status: "LIVE",
    minuteLabelRu: "79'",
    minuteLabelEn: "79'",
    homeTeamRu: "Арсенал",
    homeTeamEn: "Arsenal",
    homeShort: "ARS",
    homeScore: 2,
    awayTeamRu: "Ливерпуль",
    awayTeamEn: "Liverpool",
    awayShort: "LIV",
    awayScore: 2,
  },
  {
    id: "ucl-bay-psg",
    competitionRu: "Лига чемпионов",
    competitionEn: "Champions League",
    status: "HT",
    minuteLabelRu: "Перерыв",
    minuteLabelEn: "HT",
    homeTeamRu: "Бавария",
    homeTeamEn: "Bayern Munich",
    homeShort: "BAY",
    homeScore: 2,
    awayTeamRu: "ПСЖ",
    awayTeamEn: "PSG",
    awayShort: "PSG",
    awayScore: 1,
  },
  {
    id: "seriea-int-juv",
    competitionRu: "Серия А • Дерби",
    competitionEn: "Serie A • Derby",
    status: "UPCOMING",
    minuteLabelRu: "22:45",
    minuteLabelEn: "20:45",
    homeTeamRu: "Интер",
    homeTeamEn: "Inter Milan",
    homeShort: "INT",
    homeScore: 0,
    awayTeamRu: "Ювентус",
    awayTeamEn: "Juventus",
    awayShort: "JUV",
    awayScore: 0,
  },
];

const SIDEBAR_TOP_TRANSFERS: NewspaperFrontPageTransferDeal[] = [
  {
    id: "tr-trent",
    playerRu: "Трент Александер-Арнольд",
    playerEn: "Trent Alexander-Arnold",
    positionRu: "Правый защитник",
    positionEn: "Right-Back",
    fromClubRu: "Ливерпуль",
    fromClubEn: "Liverpool",
    toClubRu: "Реал Мадрид",
    toClubEn: "Real Madrid",
    fee: "Свободный / Продление",
    reliability: 90,
    statusLabelRu: "Финальная стадия",
    statusLabelEn: "Advanced Talks",
    articleSlug: "trent-alexander-arnold-real-madrid-liverpool-contract-dossier",
  },
  {
    id: "tr-yamal",
    playerRu: "Ламин Ямаль",
    playerEn: "Lamine Yamal",
    positionRu: "Правый вингер",
    positionEn: "Right Winger",
    fromClubRu: "Барселона",
    fromClubEn: "Barcelona",
    toClubRu: "Барселона (2031)",
    toClubEn: "Barcelona (2031)",
    fee: "€1,000M Клаусула",
    reliability: 100,
    statusLabelRu: "Подписано",
    statusLabelEn: "Official",
    articleSlug: "barcelona-lamine-yamal-hansi-flick-high-line-evolution",
  },
  {
    id: "tr-pulisic",
    playerRu: "Кристиан Пулишич",
    playerEn: "Christian Pulisic",
    positionRu: "Атакующий хавбек",
    positionEn: "Attacking Midfielder",
    fromClubRu: "Милан",
    fromClubEn: "AC Milan",
    toClubRu: "Милан (2029)",
    toClubEn: "AC Milan (2029)",
    fee: "Официальное продление",
    reliability: 100,
    statusLabelRu: "Официально",
    statusLabelEn: "Confirmed",
    articleSlug: "christian-pulisic-ac-milan-contract-extension-serie-a",
  },
  {
    id: "tr-akliouche",
    playerRu: "Магнес Аклиуш",
    playerEn: "Maghnes Akliouche",
    positionRu: "Инсайд / АПЗ",
    positionEn: "Attacking Midfielder",
    fromClubRu: "Монако",
    fromClubEn: "AS Monaco",
    toClubRu: "Ливерпуль",
    toClubEn: "Liverpool",
    fee: "€58M Оценка",
    reliability: 75,
    statusLabelRu: "Переговоры",
    statusLabelEn: "Scouting Dossier",
    articleSlug: "liverpool-transfer-move-monaco-midfielder-maghnes-akliouche",
  },
];

export const EDITORIAL_CATEGORY_TABS: {
  id: EditorialCategoryId;
  labelRu: string;
  labelEn: string;
}[] = [
  { id: "all", labelRu: "Все материалы", labelEn: "All Stories" },
  { id: "la-liga", labelRu: "Ла Лига", labelEn: "La Liga" },
  { id: "epl", labelRu: "АПЛ", labelEn: "Premier League" },
  { id: "ucl", labelRu: "Лига чемпионов", labelEn: "Champions League" },
  { id: "serie-a", labelRu: "Серия А", labelEn: "Serie A" },
  { id: "transfers", labelRu: "Трансферы", labelEn: "Transfers" },
  { id: "tactics", labelRu: "Тактика", labelEn: "Tactics" },
];

export function NewspaperFrontPage({
  lang,
  locale,
  articles = REAL_EDITORIAL_ARTICLES,
  initialCategory = "all",
  className = "",
}: NewspaperFrontPageProps) {
  const activeLang: "ru" | "en" = lang ?? locale ?? "ru";
  const isRu = activeLang === "ru";
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] =
    useState<EditorialCategoryId>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [standingsLeague, setStandingsLeague] = useState<"laliga" | "epl">(
    "laliga"
  );

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed.length > 0) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/search");
    }
  };

  const filteredArticles = useMemo(() => {
    const sourceList =
      articles && articles.length > 0 ? articles : REAL_EDITORIAL_ARTICLES;
    return sourceList.filter((item) => {
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.trim().toLowerCase();
        const text = [
          item.titleRu,
          item.titleEn,
          item.subtitleRu,
          item.subtitleEn,
          item.clubNameRu,
          item.clubNameEn,
          item.authorRu,
          item.authorEn,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return text.includes(q);
      }
      return true;
    });
  }, [articles, selectedCategory, searchQuery]);

  const leadStory =
    filteredArticles.find((a: EditorialArticleInput) => a.isLeadStory) ??
    filteredArticles[0] ??
    FRONT_PAGE_ARTICLES[0];

  const remainingStories = filteredArticles.filter(
    (a: EditorialArticleInput) => a.id !== leadStory.id
  );

  const subLeadStories =
    remainingStories.length >= 2
      ? remainingStories.slice(0, 2)
      : FRONT_PAGE_ARTICLES.slice(1, 3);

  const riverStories = useMemo(() => {
    const afterSubLeads = remainingStories.slice(2);
    if (afterSubLeads.length >= 8) {
      return afterSubLeads;
    }
    const existingIds = new Set(
      afterSubLeads.map((a: EditorialArticleInput) => a.id)
    );
    const supplement = FRONT_PAGE_ARTICLES.filter(
      (a: EditorialArticleInput) =>
        a.id !== leadStory.id && !existingIds.has(a.id)
    );
    return [...afterSubLeads, ...supplement].slice(0, 9);
  }, [remainingStories, leadStory.id]);

  const mostReadTop5 = useMemo(() => {
    const trending = FRONT_PAGE_ARTICLES.filter((a) => a.isTrending);
    const pool = [...trending, ...FRONT_PAGE_ARTICLES];
    const unique: EditorialArticleInput[] = [];
    const seen = new Set<string>();
    for (const item of pool) {
      if (!seen.has(item.id)) {
        seen.add(item.id);
        unique.push(item);
      }
      if (unique.length === 5) break;
    }
    return unique;
  }, []);

  const sidebarLiveMatches =
    REAL_FRONT_PAGE_MATCHES.length > 0
      ? REAL_FRONT_PAGE_MATCHES.slice(0, 7)
      : SIDEBAR_LIVE_MATCHES;

  const realStandingsEntries =
    standingsLeague === "laliga"
      ? REAL_MULTI_LEAGUE_STANDINGS["LA LIGA"]?.entries
      : REAL_MULTI_LEAGUE_STANDINGS["EPL"]?.entries;

  const currentStandings =
    realStandingsEntries && realStandingsEntries.length > 0
      ? realStandingsEntries.map((r) => ({
          rank: r.rank,
          leagueKey: standingsLeague,
          team: { ru: r.teamNameRu || r.teamName, en: r.teamName },
          shortName: r.shortName || r.teamName.slice(0, 3).toUpperCase(),
          played: r.played,
          won: r.won,
          drawn: r.drawn,
          lost: r.lost,
          goalsFor: r.goalsFor,
          goalsAgainst: r.goalsAgainst,
          goalDiff: r.goalDiff,
          points: r.points,
          form: r.form,
        }))
      : MOCK_STANDINGS[standingsLeague] ?? MOCK_STANDINGS.laliga;

  return (
    <div
      className={`golason-newspaper-frontpage ${className}`}
      style={{
        backgroundColor: "#FFFFFF",
        color: "#111827",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .golason-newspaper-frontpage ::selection {
              background-color: #111827;
              color: #FFFFFF;
            }
            .golason-editorial-card-link:hover .golason-editorial-card-photo {
              transform: scale(1.028);
            }
            .golason-editorial-card-link:hover .golason-editorial-card-headline {
              color: #DC2626 !important;
              text-decoration: underline;
              text-underline-offset: 3px;
              text-decoration-thickness: 1.5px;
            }
            .golason-editorial-card-link:focus-visible,
            .golason-newspaper-frontpage a:focus-visible,
            .golason-newspaper-frontpage button:focus-visible,
            .golason-newspaper-frontpage input:focus-visible {
              outline: 2px solid #111827;
              outline-offset: 2px;
            }
            @media (max-width: 1024px) {
              .golason-newspaper-12col-grid {
                grid-template-columns: 1fr !important;
              }
              .golason-newspaper-sidebar-col {
                border-left: none !important;
                padding-left: 0 !important;
                border-top: 2px solid #111827 !important;
                padding-top: 28px !important;
              }
            }
            @media (max-width: 768px) {
              .golason-sublead-2col-grid {
                grid-template-columns: 1fr !important;
              }
              .golason-sublead-col-right {
                border-left: none !important;
                padding-left: 0 !important;
              }
              .golason-editorial-horizontal-layout {
                grid-template-columns: 1fr !important;
                gap: 12px !important;
              }
            }
          `,
        }}
      />

      <div
        style={{
          maxWidth: "1360px",
          margin: "0 auto",
          padding: "20px 20px 64px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* 1. Top Leaderboard Ad Banner (728x90 / 970x90) for pageview monetization */}
        <aside
          aria-label="Top Leaderboard Advertisement"
          data-ad-slot="golason-frontpage-leaderboard-970x90"
          style={{
            width: "100%",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            padding: "12px 18px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #E5E7EB",
              paddingBottom: "6px",
              marginBottom: "10px",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#4B5563",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            <span>РЕКЛАМА • SPONSORED LEADERBOARD</span>
            <span>970×90 / 728×90 AD SLOT</span>
          </div>

          <div
            style={{
              minHeight: "72px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <ins
              className="adsbygoogle"
              data-ad-client="ca-pub-golason-media"
              data-ad-slot="frontpage-top-970x90"
              data-ad-format="horizontal"
              data-full-width-responsive="true"
              style={{ display: "none" }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#DC2626",
                }}
              >
                {isRu
                  ? "ПАРТНЕР ВЫПУСКА • GOLASON X ФУТБОЛЬНАЯ ЖАРА"
                  : "EDITION PARTNER • GOLASON X FUTBOLNAYA JARA"}
              </div>
              <div
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                {isRu
                  ? "Прямые видеоповторы голов, xG-телеметрия и закрытые инсайды туров 24/7"
                  : "Instant goal highlights, live xG telemetry, and verified transfer scoops 24/7"}
              </div>
            </div>

            <a
              href="https://t.me/futbolnaya_jara"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "9px 16px",
                backgroundColor: "#111827",
                color: "#FFFFFF",
                fontSize: "11.5px",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              {isRu ? "Подписаться в Telegram →" : "Join Telegram Desk →"}
            </a>
          </div>
        </aside>

        {/* 2. Category Filter Bar + Search (/search?q=...) + Quick Section Links */}
        <section
          aria-label="Editorial Navigation and Search"
          style={{
            borderTop: "2px solid #111827",
            borderBottom: "1px solid #E5E7EB",
            padding: "12px 0",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            {/* Category Tabs */}
            <nav
              aria-label="Editorial Categories"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                flexWrap: "wrap",
              }}
            >
              {EDITORIAL_CATEGORY_TABS.map((tab) => {
                const isActive = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedCategory(tab.id)}
                    style={{
                      cursor: "pointer",
                      padding: "7px 13px",
                      fontSize: "12.5px",
                      fontWeight: isActive ? 800 : 600,
                      letterSpacing: "0.02em",
                      backgroundColor: isActive ? "#111827" : "#FFFFFF",
                      color: isActive ? "#FFFFFF" : "#111827",
                      border: isActive
                        ? "1px solid #111827"
                        : "1px solid #E5E7EB",
                      transition: "background-color 0.15s ease, color 0.15s ease",
                    }}
                  >
                    {isRu ? tab.labelRu : tab.labelEn}
                  </button>
                );
              })}
            </nav>

            {/* Search Input (/search?q=...) + Direct Desk Links */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <form
                onSubmit={handleSearchSubmit}
                role="search"
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #111827",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isRu
                      ? "Поиск по статьям, клубам..."
                      : "Search articles, clubs..."
                  }
                  aria-label={
                    isRu ? "Поиск материалов" : "Search editorial articles"
                  }
                  style={{
                    border: "none",
                    padding: "6px 10px",
                    fontSize: "12.5px",
                    color: "#111827",
                    backgroundColor: "#FFFFFF",
                    minWidth: "190px",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    border: "none",
                    borderLeft: "1px solid #111827",
                    backgroundColor: "#111827",
                    color: "#FFFFFF",
                    padding: "6px 12px",
                    fontSize: "11.5px",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  {isRu ? "Найти" : "Search"}
                </button>
              </form>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                <Link
                  href="/live"
                  style={{
                    color: "#DC2626",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {isRu ? "Матчи LIVE" : "Live Scores"}
                </Link>
                <span style={{ color: "#E5E7EB" }}>|</span>
                <Link
                  href="/transfers"
                  style={{
                    color: "#111827",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {isRu ? "Трансферы" : "Transfers"}
                </Link>
                <span style={{ color: "#E5E7EB" }}>|</span>
                <Link
                  href="/standings"
                  style={{
                    color: "#111827",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {isRu ? "Таблицы" : "Standings"}
                </Link>
                <span style={{ color: "#E5E7EB" }}>|</span>
                <Link
                  href="/news"
                  style={{
                    color: "#111827",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {isRu ? "Архив" : "All News"}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Asymmetric 12-Column Newspaper Grid (8-Col Main Well + 1px Rule + 4-Col Right Sidebar) */}
        <div
          className="golason-newspaper-12col-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 8fr) minmax(300px, 4fr)",
            gap: "28px",
            alignItems: "start",
          }}
        >
          {/* LEFT / CENTER 8-COLUMN MAIN EDITORIAL WELL */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "28px",
              minWidth: 0,
            }}
          >
            {/* a) Lead Cover Story (variant="lead") */}
            <ArticleCard
              article={leadStory}
              variant="lead"
              lang={activeLang}
              priority
            />

            {/* b) 2-Column Sub-Lead Photo Stories (variant="grid") */}
            <section aria-label={isRu ? "Ключевые сюжеты дня" : "Featured Sub-Lead Stories"}>
              <div
                className="golason-sublead-2col-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: "24px",
                  borderBottom: "1px solid #E5E7EB",
                  paddingBottom: "24px",
                }}
              >
                <div>
                  <ArticleCard
                    article={subLeadStories[0]}
                    variant="grid"
                    lang={activeLang}
                    showDivider={false}
                  />
                </div>
                <div
                  className="golason-sublead-col-right"
                  style={{
                    borderLeft: "1px solid #E5E7EB",
                    paddingLeft: "24px",
                  }}
                >
                  <ArticleCard
                    article={subLeadStories[1] ?? FRONT_PAGE_ARTICLES[2]}
                    variant="grid"
                    lang={activeLang}
                    showDivider={false}
                  />
                </div>
              </div>
            </section>

            {/* c) Mid-Page Native Ad Slot (РЕКЛАМА • SPONSORED) */}
            <aside
              aria-label="Mid-Page Native Advertisement"
              data-ad-slot="golason-frontpage-mid-native"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E7EB",
                padding: "16px 20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #E5E7EB",
                  paddingBottom: "6px",
                  marginBottom: "12px",
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#4B5563",
                }}
              >
                <span>РЕКЛАМА • SPONSORED</span>
                <span>NATIVE EDITORIAL SLOT</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ maxWidth: "64ch" }}>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#EA580C",
                      marginBottom: "4px",
                    }}
                  >
                    {isRu
                      ? "РАДАР ТРАНСФЕРОВ • ДОСЬЕ КЛУБОВ"
                      : "TRANSFER RADAR • CLUB DOSSIERS"}
                  </div>
                  <div
                    style={{
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#111827",
                      marginBottom: "4px",
                    }}
                  >
                    {isRu
                      ? "Полная таблица подтвержденных сделок, клаусул и контрактов Европы"
                      : "Complete index of verified deals, release clauses, and contract timelines"}
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "13px",
                      lineHeight: 1.5,
                      color: "#4B5563",
                    }}
                  >
                    {isRu
                      ? "Только верифицированные источники Tier 1–3 с почасовым обновлением статуса переговоров."
                      : "Strictly verified Tier 1–3 reporting with real-time negotiation status updates."}
                  </p>
                </div>

                <Link
                  href="/transfers"
                  style={{
                    padding: "9px 16px",
                    border: "1px solid #111827",
                    backgroundColor: "#FFFFFF",
                    color: "#111827",
                    fontSize: "11.5px",
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  {isRu ? "Открыть Радар →" : "Open Transfer Radar →"}
                </Link>
              </div>
            </aside>

            {/* d) "Лента главных материалов / Latest Stories" river (variant="horizontal") with 8+ stories */}
            <section aria-label={isRu ? "Лента главных материалов" : "Latest Stories"}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  borderTop: "2px solid #111827",
                  borderBottom: "1px solid #E5E7EB",
                  padding: "10px 0",
                  marginBottom: "4px",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#111827",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {isRu
                    ? "Лента главных материалов / Latest Stories"
                    : "Latest Stories / Лента главных материалов"}
                </h2>
                <Link
                  href="/news"
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#DC2626",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {isRu ? "Все новости →" : "All Archive →"}
                </Link>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {riverStories.map((story, idx) => (
                  <ArticleCard
                    key={`${story.id}-${idx}`}
                    article={story}
                    variant="horizontal"
                    lang={activeLang}
                    showDivider={idx < riverStories.length - 1}
                  />
                ))}
              </div>
            </section>

            {/* e) "Тактический разбор дня" spotlight preview */}
            <section
              aria-label={isRu ? "Тактический разбор дня" : "Tactical Spotlight of the Day"}
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #111827",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  flexWrap: "wrap",
                  borderBottom: "1px solid #E5E7EB",
                  paddingBottom: "12px",
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
                      backgroundColor: "#111827",
                      color: "#FFFFFF",
                      fontSize: "10.5px",
                      fontWeight: 800,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "3px 8px",
                    }}
                  >
                    {isRu ? "ТАКТИЧЕСКИЙ РАЗБОР ДНЯ" : "TACTICAL SPOTLIGHT"}
                  </span>
                  <span
                    style={{
                      fontSize: "11.5px",
                      fontWeight: 800,
                      color: "#DC2626",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {isRu
                      ? "ЛИГА ЧЕМПИОНОВ УЕФА • РЕАЛ МАДРИД — МАНЧЕСТЕР СИТИ"
                      : "UEFA CHAMPIONS LEAGUE • REAL MADRID VS MAN CITY"}
                  </span>
                </div>

                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#4B5563",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  4-3-1-2 vs 3-2-4-1
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      fontSize: "22px",
                      fontWeight: 700,
                      lineHeight: 1.25,
                      color: "#111827",
                    }}
                  >
                    {isRu
                      ? "Как ромб Анчелотти перекрывает опорный квадрат Гвардиолы и запускает Мбаппе в полуфланги"
                      : "How Ancelotti's Midfield Diamond Traps Guardiola's Box Pivot and Launches Mbappe Into Channels"}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      lineHeight: 1.6,
                      color: "#4B5563",
                    }}
                  >
                    {isRu
                      ? "Интерактивная тактическая доска: стартовые расстановки, тепловые зоны прессинга, ключевые замены и хронология ударов."
                      : "Interactive tactical board: confirmed starting formations, pressing zones, key substitutions, and shot map telemetry."}
                  </p>
                </div>

                <div
                  style={{
                    border: "1px solid #E5E7EB",
                    padding: "14px",
                    backgroundColor: "#F9FAFB",
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
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#111827",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <ClubLogo teamName="Real Madrid" size={18} />
                      <span>{isRu ? "Реал Мадрид" : "Real Madrid"}</span>
                    </span>
                    <span style={{ color: "#DC2626", fontWeight: 800 }}>2 : 1</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <span>{isRu ? "Ман Сити" : "Man City"}</span>
                      <ClubLogo teamName="Manchester City" size={18} />
                    </span>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "8px",
                      borderTop: "1px solid #E5E7EB",
                      paddingTop: "8px",
                      fontSize: "11px",
                      color: "#4B5563",
                      textAlign: "center",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    <div>
                      <strong style={{ color: "#111827", display: "block" }}>
                        1.94 — 1.42
                      </strong>
                      <span>xG</span>
                    </div>
                    <div>
                      <strong style={{ color: "#111827", display: "block" }}>
                        46% — 54%
                      </strong>
                      <span>{isRu ? "Владение" : "Possession"}</span>
                    </div>
                    <div>
                      <strong style={{ color: "#111827", display: "block" }}>
                        8.4 — 9.1
                      </strong>
                      <span>PPDA</span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  flexWrap: "wrap",
                  paddingTop: "12px",
                  borderTop: "1px solid #E5E7EB",
                }}
              >
                <Link
                  href="/matches/ucl-rma-mci"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 18px",
                    backgroundColor: "#DC2626",
                    color: "#FFFFFF",
                    fontSize: "12.5px",
                    fontWeight: 800,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  {isRu
                    ? "Открыть полный Матч-центр и составы →"
                    : "Open Full Match Center & Lineups →"}
                </Link>

                <Link
                  href="/live"
                  style={{
                    fontSize: "12.5px",
                    fontWeight: 700,
                    color: "#111827",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {isRu ? "Все матчи дня (/live) →" : "All Live Matches (/live) →"}
                </Link>
              </div>
            </section>
          </div>

          {/* RIGHT 4-COLUMN SIDEBAR (separated by 1px solid #E5E7EB vertical rule) */}
          <aside
            className="golason-newspaper-sidebar-col"
            style={{
              borderLeft: "1px solid #E5E7EB",
              paddingLeft: "28px",
              display: "flex",
              flexDirection: "column",
              gap: "28px",
              minWidth: 0,
            }}
          >
            {/* a) Матч-центр LIVE box */}
            <section
              aria-label="Матч-центр LIVE"
              style={{
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
              }}
            >
              <div
                style={{
                  padding: "12px 14px",
                  borderBottom: "2px solid #111827",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    aria-hidden="true"
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: "#DC2626",
                      display: "inline-block",
                    }}
                  />
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "13px",
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#111827",
                    }}
                  >
                    {isRu ? "Матч-центр LIVE" : "LIVE Match Center"}
                  </h3>
                </div>
                <Link
                  href="/live"
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#DC2626",
                    textDecoration: "none",
                    textTransform: "uppercase",
                  }}
                >
                  {isRu ? "Табло →" : "All →"}
                </Link>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {sidebarLiveMatches.map((m, idx) => {
                  const isLive = m.status === "LIVE" || m.status === "HT";
                  return (
                    <Link
                      key={m.id}
                      href={`/matches/${m.id}`}
                      style={{
                        display: "block",
                        padding: "11px 14px",
                        borderBottom:
                          idx < sidebarLiveMatches.length - 1
                            ? "1px solid #E5E7EB"
                            : "none",
                        textDecoration: "none",
                        color: "#111827",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          fontSize: "10.5px",
                          fontWeight: 700,
                          color: "#4B5563",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        <span>
                          {isRu ? m.competitionRu : m.competitionEn}
                        </span>
                        <span
                          style={{
                            color: isLive ? "#DC2626" : "#4B5563",
                            fontWeight: 800,
                          }}
                        >
                          {isRu ? m.minuteLabelRu : m.minuteLabelEn}
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "8px",
                          fontSize: "13px",
                          fontWeight: 700,
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "7px",
                            minWidth: 0,
                          }}
                        >
                          <ClubLogo
                            teamName={m.homeTeamEn}
                            teamNameRu={m.homeTeamRu}
                            size={18}
                          />
                          <span
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {isRu ? m.homeTeamRu : m.homeTeamEn}
                          </span>
                        </div>
                        <span>
                          {m.status === "UPCOMING" ? "—" : m.homeScore}
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "8px",
                          fontSize: "13px",
                          fontWeight: 700,
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "7px",
                            minWidth: 0,
                          }}
                        >
                          <ClubLogo
                            teamName={m.awayTeamEn}
                            teamNameRu={m.awayTeamRu}
                            size={18}
                          />
                          <span
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {isRu ? m.awayTeamRu : m.awayTeamEn}
                          </span>
                        </div>
                        <span>
                          {m.status === "UPCOMING" ? "—" : m.awayScore}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div
                style={{
                  padding: "10px 14px",
                  borderTop: "1px solid #E5E7EB",
                  backgroundColor: "#F9FAFB",
                  textAlign: "center",
                }}
              >
                <Link
                  href="/live"
                  style={{
                    fontSize: "11.5px",
                    fontWeight: 800,
                    color: "#111827",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {isRu
                    ? "Открыть полное табло матчей (/live) →"
                    : "Open Full Live Scoreboard (/live) →"}
                </Link>
              </div>
            </section>

            {/* b) 300x250 Sidebar Ad Slot */}
            <aside
              aria-label="Sidebar 300x250 Advertisement"
              data-ad-slot="golason-sidebar-300x250"
              style={{
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
                padding: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #E5E7EB",
                  paddingBottom: "6px",
                  marginBottom: "12px",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#4B5563",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <span>РЕКЛАМА • SPONSORED</span>
                <span>300×250 MPU</span>
              </div>

              <div
                style={{
                  minHeight: "220px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "12px",
                  padding: "14px",
                  border: "1px solid #E5E7EB",
                  backgroundColor: "#F9FAFB",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span
                    style={{
                      fontSize: "10.5px",
                      fontWeight: 800,
                      letterSpacing: "0.09em",
                      textTransform: "uppercase",
                      color: "#DC2626",
                    }}
                  >
                    {isRu ? "GOLASON МАТЧ-ЦЕНТР" : "GOLASON MATCH DESK"}
                  </span>
                  <div
                    style={{
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      fontSize: "18px",
                      fontWeight: 700,
                      lineHeight: 1.3,
                      color: "#111827",
                    }}
                  >
                    {isRu
                      ? "Стартовые составы, тактические расстановки и замены в реальном времени"
                      : "Confirmed lineups, tactical pitch boards, and live substitutions"}
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "12.5px",
                      lineHeight: 1.5,
                      color: "#4B5563",
                    }}
                  >
                    {isRu
                      ? "Следите за перестановками тренеров и рейтингами игроков всех топ-5 лиг Европы."
                      : "Follow in-game coaching adjustments and player ratings across Europe's top five leagues."}
                  </p>
                </div>

                <Link
                  href="/live"
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "9px 14px",
                    backgroundColor: "#111827",
                    color: "#FFFFFF",
                    fontSize: "11.5px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  {isRu ? "Перейти в Матч-центр →" : "Explore Match Center →"}
                </Link>
              </div>
            </aside>

            {/* c) Топ-5 самых читаемых (Most Read) numbered 01-05 */}
            <section
              aria-label={
                isRu ? "Топ-5 самых читаемых" : "Top 5 Most Read Stories"
              }
            >
              <div
                style={{
                  borderTop: "2px solid #111827",
                  borderBottom: "1px solid #E5E7EB",
                  padding: "10px 0",
                  marginBottom: "4px",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#111827",
                  }}
                >
                  {isRu
                    ? "Топ-5 самых читаемых / Most Read"
                    : "Most Read / Топ-5 самых читаемых"}
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {mostReadTop5.map((story, idx) => (
                  <ArticleCard
                    key={story.id}
                    article={story}
                    variant="compact"
                    rank={idx + 1}
                    lang={activeLang}
                    showDivider={idx < mostReadTop5.length - 1}
                  />
                ))}
              </div>
            </section>

            {/* d) Трансферный Радар (Top Deals) mini-box */}
            <section
              aria-label={isRu ? "Трансферный Радар" : "Transfer Radar"}
              style={{
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
              }}
            >
              <div
                style={{
                  padding: "12px 14px",
                  borderBottom: "2px solid #111827",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#111827",
                  }}
                >
                  {isRu
                    ? "Трансферный Радар (Top Deals)"
                    : "Transfer Radar (Top Deals)"}
                </h3>
                <Link
                  href="/transfers"
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#EA580C",
                    textDecoration: "none",
                    textTransform: "uppercase",
                  }}
                >
                  {isRu ? "Все →" : "All →"}
                </Link>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {SIDEBAR_TOP_TRANSFERS.map((deal, idx) => (
                  <Link
                    key={deal.id}
                    href={`/news/${deal.articleSlug}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      padding: "12px 14px",
                      borderBottom:
                        idx < SIDEBAR_TOP_TRANSFERS.length - 1
                          ? "1px solid #E5E7EB"
                          : "none",
                      textDecoration: "none",
                      color: "#111827",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "8px",
                      }}
                    >
                      <span style={{ fontSize: "13.5px", fontWeight: 700 }}>
                        {isRu ? deal.playerRu : deal.playerEn}
                      </span>
                      <span
                        style={{
                          fontSize: "10.5px",
                          fontWeight: 800,
                          color:
                            deal.reliability === 100 ? "#DC2626" : "#EA580C",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {deal.reliability}% •{" "}
                        {isRu ? deal.statusLabelRu : deal.statusLabelEn}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "8px",
                        fontSize: "12px",
                        color: "#4B5563",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <ClubLogo
                          teamName={deal.fromClubEn}
                          teamNameRu={deal.fromClubRu}
                          size={15}
                        />
                        <span>{isRu ? deal.fromClubRu : deal.fromClubEn}</span>
                        <span>→</span>
                        <ClubLogo
                          teamName={deal.toClubEn}
                          teamNameRu={deal.toClubRu}
                          size={15}
                        />
                        <strong style={{ color: "#111827" }}>
                          {isRu ? deal.toClubRu : deal.toClubEn}
                        </strong>
                      </span>
                      <span style={{ fontWeight: 600, color: "#111827" }}>
                        {deal.fee}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <div
                style={{
                  padding: "10px 14px",
                  borderTop: "1px solid #E5E7EB",
                  backgroundColor: "#F9FAFB",
                  textAlign: "center",
                }}
              >
                <Link
                  href="/transfers"
                  style={{
                    fontSize: "11.5px",
                    fontWeight: 800,
                    color: "#111827",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {isRu
                    ? "Открыть все сделки (/transfers) →"
                    : "View All Transfer Deals (/transfers) →"}
                </Link>
              </div>
            </section>

            {/* e) Таблица Ла Лиги / АПЛ mini-box */}
            <section
              aria-label={isRu ? "Таблица Ла Лиги / АПЛ" : "League Standings"}
              style={{
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
              }}
            >
              <div
                style={{
                  padding: "12px 14px",
                  borderBottom: "2px solid #111827",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#111827",
                  }}
                >
                  {isRu ? "Таблица Ла Лиги / АПЛ" : "La Liga / EPL Table"}
                </h3>

                <div style={{ display: "inline-flex", gap: "4px" }}>
                  <button
                    type="button"
                    onClick={() => setStandingsLeague("laliga")}
                    style={{
                      cursor: "pointer",
                      padding: "3px 8px",
                      fontSize: "11px",
                      fontWeight: 700,
                      border: "1px solid #111827",
                      backgroundColor:
                        standingsLeague === "laliga" ? "#111827" : "#FFFFFF",
                      color:
                        standingsLeague === "laliga" ? "#FFFFFF" : "#111827",
                    }}
                  >
                    {isRu ? "Ла Лига" : "La Liga"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStandingsLeague("epl")}
                    style={{
                      cursor: "pointer",
                      padding: "3px 8px",
                      fontSize: "11px",
                      fontWeight: 700,
                      border: "1px solid #111827",
                      backgroundColor:
                        standingsLeague === "epl" ? "#111827" : "#FFFFFF",
                      color: standingsLeague === "epl" ? "#FFFFFF" : "#111827",
                    }}
                  >
                    {isRu ? "АПЛ" : "EPL"}
                  </button>
                </div>
              </div>

              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "12.5px",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom: "1px solid #E5E7EB",
                      backgroundColor: "#F9FAFB",
                      color: "#4B5563",
                      fontSize: "11px",
                      textTransform: "uppercase",
                    }}
                  >
                    <th
                      style={{
                        padding: "8px 10px",
                        textAlign: "left",
                        fontWeight: 700,
                      }}
                    >
                      #
                    </th>
                    <th
                      style={{
                        padding: "8px 6px",
                        textAlign: "left",
                        fontWeight: 700,
                      }}
                    >
                      {isRu ? "Клуб" : "Club"}
                    </th>
                    <th
                      style={{
                        padding: "8px 6px",
                        textAlign: "center",
                        fontWeight: 700,
                      }}
                    >
                      {isRu ? "И" : "P"}
                    </th>
                    <th
                      style={{
                        padding: "8px 6px",
                        textAlign: "center",
                        fontWeight: 700,
                      }}
                    >
                      {isRu ? "РМ" : "GD"}
                    </th>
                    <th
                      style={{
                        padding: "8px 10px",
                        textAlign: "right",
                        fontWeight: 800,
                      }}
                    >
                      {isRu ? "О" : "Pts"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentStandings.slice(0, 5).map((row) => (
                    <tr
                      key={row.shortName}
                      style={{ borderBottom: "1px solid #E5E7EB" }}
                    >
                      <td
                        style={{
                          padding: "9px 10px",
                          fontWeight: 700,
                          color: row.rank <= 4 ? "#DC2626" : "#4B5563",
                        }}
                      >
                        {row.rank}
                      </td>
                      <td style={{ padding: "9px 6px", fontWeight: 700 }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "7px",
                          }}
                        >
                          <ClubLogo
                            teamName={row.team.en}
                            teamNameRu={row.team.ru}
                            size={16}
                          />
                          <span>{isRu ? row.team.ru : row.team.en}</span>
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "9px 6px",
                          textAlign: "center",
                          color: "#4B5563",
                        }}
                      >
                        {row.played}
                      </td>
                      <td
                        style={{
                          padding: "9px 6px",
                          textAlign: "center",
                          color: "#4B5563",
                        }}
                      >
                        {row.goalDiff > 0 ? `+${row.goalDiff}` : row.goalDiff}
                      </td>
                      <td
                        style={{
                          padding: "9px 10px",
                          textAlign: "right",
                          fontWeight: 800,
                          color: "#111827",
                        }}
                      >
                        {row.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div
                style={{
                  padding: "10px 14px",
                  backgroundColor: "#F9FAFB",
                  textAlign: "center",
                }}
              >
                <Link
                  href="/standings"
                  style={{
                    fontSize: "11.5px",
                    fontWeight: 800,
                    color: "#111827",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {isRu
                    ? "Полная таблица всех лиг (/standings) →"
                    : "Full League Standings (/standings) →"}
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default NewspaperFrontPage;
