"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ClubLogo, getClubLogoUrl } from "@/lib/clubLogos";
import { LiveScoreTicker } from "@/components/ticker";
import {
  TacticalPitch,
  SubstitutionCard,
  TelegramHighlightBanner,
  type TacticalPitchMatchInput,
  type SubstitutionBroadcastEvent,
  type HighlightGoalClipItem,
} from "@/components/match";
import {
  REAL_MADRID_LINEUP,
  BARCELONA_LINEUP,
  ARSENAL_LINEUP,
  LIVERPOOL_LINEUP,
} from "@/lib/mockData";

type PortalLang = "ru" | "en";
type MatchDetailTab = "all" | "report" | "tactics" | "highlights";

interface TimelineEventItem {
  minute: string;
  type: "goal" | "sub" | "card" | "var" | "whistle";
  team: "home" | "away" | "neutral";
  titleRu: string;
  titleEn: string;
  detailRu: string;
  detailEn: string;
  scoreAfter?: string;
}

interface StatComparisonItem {
  labelRu: string;
  labelEn: string;
  homeVal: string;
  awayVal: string;
  homePercent: number;
}

interface DetailedMatchDossier {
  id: string;
  leagueRu: string;
  leagueEn: string;
  stageRu: string;
  stageEn: string;
  status: "LIVE" | "HT" | "FT" | "UPCOMING";
  minuteRu: string;
  minuteEn: string;
  stadiumRu: string;
  stadiumEn: string;
  refereeRu: string;
  refereeEn: string;
  attendance: string;
  heroPhotoUrl: string;
  homeTeam: {
    id: string;
    nameRu: string;
    nameEn: string;
    shortName: string;
    score: number;
    formation: string;
    coachRu: string;
    coachEn: string;
    primaryColor: string;
  };
  awayTeam: {
    id: string;
    nameRu: string;
    nameEn: string;
    shortName: string;
    score: number;
    formation: string;
    coachRu: string;
    coachEn: string;
    primaryColor: string;
  };
  scorers: {
    minute: string;
    playerRu: string;
    playerEn: string;
    team: "home" | "away";
    assistRu?: string;
    assistEn?: string;
    scoreAfter: string;
  }[];
  headlineRu: string;
  headlineEn: string;
  leadRu: string;
  leadEn: string;
  reportParagraphsRu: string[];
  reportParagraphsEn: string[];
  timeline: TimelineEventItem[];
  stats: StatComparisonItem[];
  relatedArticleSlug: string;
  relatedArticleTitleRu: string;
  relatedArticleTitleEn: string;
  telegramUrl: string;
}

const MATCH_DOSSIERS: Record<string, DetailedMatchDossier> = {
  "ucl-rma-mci": {
    id: "ucl-rma-mci",
    leagueRu: "Лига чемпионов УЕФА",
    leagueEn: "UEFA Champions League",
    stageRu: "1/4 финала • Ответный матч",
    stageEn: "Quarter-Final • Second Leg",
    status: "LIVE",
    minuteRu: "LIVE 78'",
    minuteEn: "LIVE 78'",
    stadiumRu: "Сантьяго Бернабеу, Мадрид",
    stadiumEn: "Santiago Bernabéu, Madrid",
    refereeRu: "Клеман Тюрпен (Франция)",
    refereeEn: "Clément Turpin (France)",
    attendance: "81,044",
    heroPhotoUrl: "https://a.espncdn.com/photo/2026/1030/r1738494_1296x729_16-9.jpg",
    homeTeam: {
      id: "real-madrid",
      nameRu: "Реал Мадрид",
      nameEn: "Real Madrid",
      shortName: "RMA",
      score: 3,
      formation: "4-3-1-2",
      coachRu: "Карло Анчелотти",
      coachEn: "Carlo Ancelotti",
      primaryColor: "#16A34A",
    },
    awayTeam: {
      id: "man-city",
      nameRu: "Манчестер Сити",
      nameEn: "Manchester City",
      shortName: "MCI",
      score: 2,
      formation: "4-2-3-1",
      coachRu: "Хосеп Гвардиола",
      coachEn: "Pep Guardiola",
      primaryColor: "#0284C7",
    },
    scorers: [
      {
        minute: "14'",
        playerRu: "Килиан Мбаппе",
        playerEn: "Kylian Mbappé",
        team: "home",
        assistRu: "Джуд Беллингем",
        assistEn: "Jude Bellingham",
        scoreAfter: "1:0",
      },
      {
        minute: "29'",
        playerRu: "Эрлинг Холанд",
        playerEn: "Erling Haaland",
        team: "away",
        assistRu: "Фил Фоден",
        assistEn: "Phil Foden",
        scoreAfter: "1:1",
      },
      {
        minute: "52'",
        playerRu: "Фил Фоден",
        playerEn: "Phil Foden",
        team: "away",
        scoreAfter: "1:2",
      },
      {
        minute: "64'",
        playerRu: "Килиан Мбаппе",
        playerEn: "Kylian Mbappé",
        team: "home",
        assistRu: "Винисиус Жуниор",
        assistEn: "Vinícius Júnior",
        scoreAfter: "2:2",
      },
      {
        minute: "76'",
        playerRu: "Килиан Мбаппе",
        playerEn: "Kylian Mbappé",
        team: "home",
        assistRu: "Федерико Вальверде",
        assistEn: "Federico Valverde",
        scoreAfter: "3:2",
      },
    ],
    headlineRu:
      "Европейская классика на «Бернабеу»: хет-трик Мбаппе переворачивает четвертьфинал против «Ман Сити»",
    headlineEn:
      "Bernabéu European Classic: Mbappé Hat-Trick Flips Champions League Quarter-Final Against Man City",
    leadRu:
      "Уступая 1:2 в начале второго тайма после дальнего выстрела Фила Фодена, мадридский «Реал» включил фирменный режим Лиги чемпионов: Килиан Мбаппе дважды наказал высокую оборону Гвардиолы за 12 минут.",
    leadEn:
      "Trailing 1-2 early in the second half after Phil Foden's top-corner strike, Real Madrid ignited their trademark Champions League surge as Kylian Mbappé punished Guardiola's high line twice in 12 minutes.",
    reportParagraphsRu: [
      "Карло Анчелотти выстроил асимметричный ромб 4-3-1-2, где Федерико Вальверде страховал правый полуфланг, а Джуд Беллингем опускался в зону опорного для первого вертикального паса. Уже на 14-й минуте эта заготовка сработала: Беллингем в одно касание бросил Мбаппе в коридор между Диашем и Аканджи — 1:0.",
      "«Манчестер Сити» ответил затяжным позиционным контролем (54% владения) и перевернул счет усилиями связки Фоден — Холанд. Однако выход Луки Модрича во втором тайме изменил ритм переходов: хорват разогнал две подряд контратаки, которые завершились дублем и хет-триком Мбаппе.",
    ],
    reportParagraphsEn: [
      "Carlo Ancelotti deployed an asymmetrical 4-3-1-2 diamond with Federico Valverde covering the right channel while Jude Bellingham dropped deep to trigger vertical transitions. In the 14th minute, Bellingham's first-time pass split Rúben Dias and Akanji for Mbappé's opener.",
      "Manchester City responded through sustained positional superiority (54% possession) to take a 2-1 lead via Haaland and Foden. Yet Luka Modrić's introduction altered the tempo of Madrid's counter-attacks, unlocking space for Mbappé to complete a clinical hat-trick on 76 minutes.",
    ],
    timeline: [
      {
        minute: "14'",
        type: "goal",
        team: "home",
        titleRu: "ГОЛ! Килиан Мбаппе (Реал Мадрид)",
        titleEn: "GOAL! Kylian Mbappé (Real Madrid)",
        detailRu: "Вертикальный рывок за спину защитникам после разрезающей передачи Беллингема.",
        detailEn: "Clinical low finish into the far corner off Jude Bellingham's through-ball.",
        scoreAfter: "1 : 0",
      },
      {
        minute: "29'",
        type: "goal",
        team: "away",
        titleRu: "ГОЛ! Эрлинг Холанд (Манчестер Сити)",
        titleEn: "GOAL! Erling Haaland (Manchester City)",
        detailRu: "Замыкание прострела Фила Фодена с линии вратарской в одно касание.",
        detailEn: "First-time tap-in at the near post from Phil Foden's low cutback.",
        scoreAfter: "1 : 1",
      },
      {
        minute: "41'",
        type: "card",
        team: "home",
        titleRu: "Желтая карточка: Антонио Рюдигер",
        titleEn: "Yellow Card: Antonio Rüdiger",
        detailRu: "Тактический фол в центральном круге против Эрлинга Холанда.",
        detailEn: "Tactical foul in the center circle to halt Haaland's transition.",
      },
      {
        minute: "52'",
        type: "goal",
        team: "away",
        titleRu: "ГОЛ! Фил Фоден (Манчестер Сити)",
        titleEn: "GOAL! Phil Foden (Manchester City)",
        detailRu: "Мощный обводящий удар левой ногой с 20 метров точно в верхний угол ворот Куртуа.",
        detailEn: "Curling 20-yard left-footed strike into the top corner past Courtois.",
        scoreAfter: "1 : 2",
      },
      {
        minute: "64'",
        type: "goal",
        team: "home",
        titleRu: "ГОЛ! Килиан Мбаппе (Реал Мадрид)",
        titleEn: "GOAL! Kylian Mbappé (Real Madrid)",
        detailRu: "Перевод Винисиуса с левого фланга и точный удар Мбаппе в противоход вратарю.",
        detailEn: "Vinícius Jr. switches play from the left wing for Mbappé to slot home.",
        scoreAfter: "2 : 2",
      },
      {
        minute: "68'",
        type: "sub",
        team: "home",
        titleRu: "Замена: Лука Модрич вместо Орельена Тчуамени",
        titleEn: "Substitution: Luka Modrić on for Aurélien Tchouaméni",
        detailRu: "Переход «Реала» к контролю темпа через диагонали Модрича.",
        detailEn: "Tactical shift to control midfield tempo and launch diagonal switches.",
      },
      {
        minute: "76'",
        type: "goal",
        team: "home",
        titleRu: "ХЕТ-ТРИК! Килиан Мбаппе (Реал Мадрид)",
        titleEn: "HAT-TRICK! Kylian Mbappé (Real Madrid)",
        detailRu: "Прострел Вальверде справа и мгновенное завершение в ближний угол!",
        detailEn: "Valverde drives down the right channel and feeds Mbappé for his third goal!",
        scoreAfter: "3 : 2",
      },
    ],
    stats: [
      { labelRu: "Ожидаемые голы (xG)", labelEn: "Expected Goals (xG)", homeVal: "2.64", awayVal: "1.88", homePercent: 58 },
      { labelRu: "Владение мячом", labelEn: "Ball Possession", homeVal: "46%", awayVal: "54%", homePercent: 46 },
      { labelRu: "Удары (в створ)", labelEn: "Shots (On Target)", homeVal: "15 (7)", awayVal: "14 (6)", homePercent: 52 },
      { labelRu: "Явные голевые моменты", labelEn: "Big Chances Created", homeVal: "5", awayVal: "3", homePercent: 62 },
      { labelRu: "Точность передач", labelEn: "Pass Accuracy", homeVal: "89%", awayVal: "92%", homePercent: 49 },
    ],
    relatedArticleSlug: "mbappe-el-clasico-hat-trick-endrick-cameo-bernabeu",
    relatedArticleTitleRu: "Как «Реал» взламывает высокую линию обороны: разбор хет-трика Мбаппе",
    relatedArticleTitleEn: "How Real Madrid Shatter High Defensive Lines: Mbappé Tactical Breakdown",
    telegramUrl: "https://t.me/futbolnaya_jara/4821",
  },
  "match-el-clasico": {
    id: "match-el-clasico",
    leagueRu: "Ла Лига Испания",
    leagueEn: "La Liga EA Sports",
    stageRu: "Тур 28 • Эль-Класико",
    stageEn: "Matchday 28 • El Clásico",
    status: "LIVE",
    minuteRu: "LIVE 87'",
    minuteEn: "LIVE 87'",
    stadiumRu: "Сантьяго Бернабеу, Мадрид",
    stadiumEn: "Santiago Bernabéu, Madrid",
    refereeRu: "Хесус Хиль Мансано (Испания)",
    refereeEn: "Jesús Gil Manzano (Spain)",
    attendance: "83,186",
    heroPhotoUrl: "https://a.espncdn.com/photo/2026/1027/r1736915_1296x729_16-9.jpg",
    homeTeam: {
      id: "real-madrid",
      nameRu: "Реал Мадрид",
      nameEn: "Real Madrid",
      shortName: "RMA",
      score: 3,
      formation: "4-3-1-2",
      coachRu: "Карло Анчелотти",
      coachEn: "Carlo Ancelotti",
      primaryColor: "#16A34A",
    },
    awayTeam: {
      id: "barcelona",
      nameRu: "Барселона",
      nameEn: "Barcelona",
      shortName: "BAR",
      score: 2,
      formation: "4-2-3-1",
      coachRu: "Ханси Флик",
      coachEn: "Hansi Flick",
      primaryColor: "#D97706",
    },
    scorers: [
      {
        minute: "14'",
        playerRu: "Килиан Мбаппе",
        playerEn: "Kylian Mbappé",
        team: "home",
        assistRu: "Джуд Беллингем",
        assistEn: "Jude Bellingham",
        scoreAfter: "1:0",
      },
      {
        minute: "29'",
        playerRu: "Ламин Ямаль",
        playerEn: "Lamine Yamal",
        team: "away",
        assistRu: "Педри",
        assistEn: "Pedri",
        scoreAfter: "1:1",
      },
      {
        minute: "51'",
        playerRu: "Роберт Левандовски",
        playerEn: "Robert Lewandowski",
        team: "away",
        assistRu: "Ламин Ямаль",
        assistEn: "Lamine Yamal",
        scoreAfter: "1:2",
      },
      {
        minute: "63'",
        playerRu: "Килиан Мбаппе",
        playerEn: "Kylian Mbappé",
        team: "home",
        assistRu: "Винисиус Жуниор",
        assistEn: "Vinícius Júnior",
        scoreAfter: "2:2",
      },
      {
        minute: "79'",
        playerRu: "Килиан Мбаппе",
        playerEn: "Kylian Mbappé",
        team: "home",
        assistRu: "Федерико Вальверде",
        assistEn: "Federico Valverde",
        scoreAfter: "3:2",
      },
    ],
    headlineRu:
      "Огненное Эль-Класико: хет-трик Мбаппе, рекорд Ямаля и выход Эндрика на 86-й минуте",
    headlineEn:
      "Electric El Clásico: Mbappé Hat-Trick, Yamal Age Record & Endrick's Late Bernabéu Cameo",
    leadRu:
      "Драматичный поединок против высокой линии обороны Ханси Флика (42,4 м) завершился бенефисом Килиана Мбаппе и историческим достижением Ламина Ямаля (гол + пас).",
    leadEn:
      "A high-octane tactical duel against Hansi Flick's 42.4m defensive line saw Kylian Mbappé net a clinical hat-trick while Lamine Yamal became the youngest player to record a goal and assist at the Bernabéu.",
    reportParagraphsRu: [
      "«Барселона» приехала в Мадрид с самой высокой линией обороны в Европе, но во втором тайме диагональные рывки Мбаппе из глубины разрушили офсайдную ловушку гостей.",
      "На 86-й минуте под овации трибун вместо автора хет-трика вышел Эндрик и сразу проверил тер Штегена плотным ударом.",
    ],
    reportParagraphsEn: [
      "Barcelona arrived in Madrid with Europe's boldest offside trap, yet Mbappé's curved runs from deep repeatedly broke the line in the second half.",
      "In the 86th minute, Endrick replaced hat-trick hero Mbappé to a standing ovation and immediately tested ter Stegen.",
    ],
    timeline: [
      {
        minute: "14'",
        type: "goal",
        team: "home",
        titleRu: "ГОЛ! Килиан Мбаппе (1:0)",
        titleEn: "GOAL! Kylian Mbappé (1-0)",
        detailRu: "Выход один на один после паса Джуда Беллингема.",
        detailEn: "Breakaway finish off Jude Bellingham's vertical pass.",
        scoreAfter: "1 : 0",
      },
      {
        minute: "29'",
        type: "goal",
        team: "away",
        titleRu: "ГОЛ! Ламин Ямаль (1:1)",
        titleEn: "GOAL! Lamine Yamal (1-1)",
        detailRu: "Фирменный удар внешней стороной стопы в дальнюю девятку.",
        detailEn: "Trademark trivela curler into the top-left corner.",
        scoreAfter: "1 : 1",
      },
      {
        minute: "51'",
        type: "goal",
        team: "away",
        titleRu: "ГОЛ! Роберт Левандовски (1:2)",
        titleEn: "GOAL! Robert Lewandowski (1-2)",
        detailRu: "Точный удар головой после выверенного кросса Ламина Ямаля.",
        detailEn: "Bullet header from Lamine Yamal's pinpoint cross.",
        scoreAfter: "1 : 2",
      },
      {
        minute: "63'",
        type: "goal",
        team: "home",
        titleRu: "ГОЛ! Килиан Мбаппе (2:2)",
        titleEn: "GOAL! Kylian Mbappé (2-2)",
        detailRu: "Замыкание прострела Винисиуса Жуниора на дальней штанге.",
        detailEn: "Far-post finish from Vinícius Júnior's low cross.",
        scoreAfter: "2 : 2",
      },
      {
        minute: "79'",
        type: "goal",
        team: "home",
        titleRu: "ГОЛ! Килиан Мбаппе (3:2)",
        titleEn: "GOAL! Kylian Mbappé (3-2)",
        detailRu: "Хет-трик после скоростного прохода Федерико Вальверде.",
        detailEn: "Hat-trick sealed following Federico Valverde's box surge.",
        scoreAfter: "3 : 2",
      },
      {
        minute: "86'",
        type: "sub",
        team: "home",
        titleRu: "Замена: Эндрик вместо Килиана Мбаппе",
        titleEn: "Substitution: Endrick on for Kylian Mbappé",
        detailRu: "Стоячие овации «Бернабеу» автору трех голов.",
        detailEn: "Standing ovation at the Bernabéu for the hat-trick scorer.",
      },
    ],
    stats: [
      { labelRu: "Ожидаемые голы (xG)", labelEn: "Expected Goals (xG)", homeVal: "2.82", awayVal: "2.05", homePercent: 58 },
      { labelRu: "Владение мячом", labelEn: "Ball Possession", homeVal: "44%", awayVal: "56%", homePercent: 44 },
      { labelRu: "Удары (в створ)", labelEn: "Shots (On Target)", homeVal: "16 (8)", awayVal: "13 (6)", homePercent: 55 },
      { labelRu: "Офсайды", labelEn: "Offsides", homeVal: "5", awayVal: "1", homePercent: 83 },
      { labelRu: "Точность передач", labelEn: "Pass Accuracy", homeVal: "88%", awayVal: "91%", homePercent: 49 },
    ],
    relatedArticleSlug: "lamine-yamal-youngest-el-clasico-goal-assist-record",
    relatedArticleTitleRu: "Исторический рекорд Ламина Ямаля: самый молодой автор «гол+пас» на «Бернабеу»",
    relatedArticleTitleEn: "Lamine Yamal Makes History: Youngest Player to Record Goal + Assist at the Bernabéu",
    telegramUrl: "https://t.me/futbolnaya_jara",
  },
  "laliga-bar-atm": {
    id: "laliga-bar-atm",
    leagueRu: "Ла Лига Испания",
    leagueEn: "La Liga EA Sports",
    stageRu: "Тур 28 • Центральный матч",
    stageEn: "Matchday 28 • Title Clash",
    status: "LIVE",
    minuteRu: "LIVE 64'",
    minuteEn: "LIVE 64'",
    stadiumRu: "Олимпийский стадион Монжуик, Барселона",
    stadiumEn: "Estadi Olímpic Lluís Companys, Barcelona",
    refereeRu: "Хосе Мария Санчес Мартинес",
    refereeEn: "José María Sánchez Martínez",
    attendance: "50,112",
    heroPhotoUrl: "https://a.espncdn.com/photo/2026/1027/r1736915_1296x729_16-9.jpg",
    homeTeam: {
      id: "barcelona",
      nameRu: "Барселона",
      nameEn: "Barcelona",
      shortName: "BAR",
      score: 2,
      formation: "4-2-3-1",
      coachRu: "Ханси Флик",
      coachEn: "Hansi Flick",
      primaryColor: "#1D4ED8",
    },
    awayTeam: {
      id: "atletico",
      nameRu: "Атлетико Мадрид",
      nameEn: "Atlético Madrid",
      shortName: "ATM",
      score: 1,
      formation: "5-3-2",
      coachRu: "Диего Симеоне",
      coachEn: "Diego Simeone",
      primaryColor: "#DC2626",
    },
    scorers: [
      {
        minute: "19'",
        playerRu: "Ламин Ямаль",
        playerEn: "Lamine Yamal",
        team: "home",
        assistRu: "Педри",
        assistEn: "Pedri",
        scoreAfter: "1:0",
      },
      {
        minute: "38'",
        playerRu: "Хулиан Альварес",
        playerEn: "Julián Álvarez",
        team: "away",
        scoreAfter: "1:1",
      },
      {
        minute: "57'",
        playerRu: "Роберт Левандовски",
        playerEn: "Robert Lewandowski",
        team: "home",
        assistRu: "Рафинья",
        assistEn: "Raphinha",
        scoreAfter: "2:1",
      },
    ],
    headlineRu:
      "«Барселона» дожимает «Атлетико» на Монжуике: голы Ямаля и Левандовски вскрыли блок Симеоне",
    headlineEn:
      "Barcelona Break Down Simeone's Block as Yamal & Lewandowski Seal 2-1 Lead Over Atlético",
    leadRu:
      "Команда Ханси Флика контролирует 64% времени мяч и находит ключи к плотной схеме 5-3-2 «матрасников» через перегрузы на флангах.",
    leadEn:
      "Hansi Flick's side command 64% possession, unlocking Atlético Madrid's compact 5-3-2 low block through wide overloads from Yamal and Raphinha.",
    reportParagraphsRu: [
      "Педри и Касадо полностью забрали подбор в центральной зоне, вынудив «Атлетико» обороняться в пределах собственной трети поля.",
      "После ответного мяча Хулиана Альвареса хозяева усилили давление и вышли вперед на 57-й минуте благодаря связке Рафиньи и Левандовски.",
    ],
    reportParagraphsEn: [
      "Pedri and Casadó dominated second balls in midfield, pinning Atlético inside their defensive third for long spells.",
      "After Julián Álvarez equalized against the run of play, Raphinha whipped in a low cross for Robert Lewandowski to restore Barcelona's advantage.",
    ],
    timeline: [
      {
        minute: "19'",
        type: "goal",
        team: "home",
        titleRu: "ГОЛ! Ламин Ямаль (1:0)",
        titleEn: "GOAL! Lamine Yamal (1-0)",
        detailRu: "Смещение с правого фланга и точный удар в ближний угол.",
        detailEn: "Cut inside from the right wing and clinical low strike.",
        scoreAfter: "1 : 0",
      },
      {
        minute: "38'",
        type: "goal",
        team: "away",
        titleRu: "ГОЛ! Хулиан Альварес (1:1)",
        titleEn: "GOAL! Julián Álvarez (1-1)",
        detailRu: "Мгновенная контратака гостей и удар под перекладину.",
        detailEn: "Rapid counter-attack finished high into the roof of the net.",
        scoreAfter: "1 : 1",
      },
      {
        minute: "57'",
        type: "goal",
        team: "home",
        titleRu: "ГОЛ! Роберт Левандовски (2:1)",
        titleEn: "GOAL! Robert Lewandowski (2-1)",
        detailRu: "Замыкание прострела Рафиньи из района 11-метровой отметки.",
        detailEn: "Clinical finish from the penalty spot off Raphinha's cutback.",
        scoreAfter: "2 : 1",
      },
    ],
    stats: [
      { labelRu: "Ожидаемые голы (xG)", labelEn: "Expected Goals (xG)", homeVal: "2.18", awayVal: "0.94", homePercent: 70 },
      { labelRu: "Владение мячом", labelEn: "Ball Possession", homeVal: "64%", awayVal: "36%", homePercent: 64 },
      { labelRu: "Удары (в створ)", labelEn: "Shots (On Target)", homeVal: "14 (6)", awayVal: "6 (3)", homePercent: 70 },
      { labelRu: "Точность передач", labelEn: "Pass Accuracy", homeVal: "91%", awayVal: "82%", homePercent: 53 },
    ],
    relatedArticleSlug: "barcelona-offside-trap-tactical-analysis",
    relatedArticleTitleRu: "Внутри высокой линии Ханси Флика на 42 метрах: телеметрия обороны «Барсы»",
    relatedArticleTitleEn: "Inside Hansi Flick's 42-Meter High Line: Barcelona Tactical Telemetry",
    telegramUrl: "https://t.me/futbolnaya_jara/4824",
  },
  "epl-ars-liv": {
    id: "epl-ars-liv",
    leagueRu: "Английская Премьер-лига",
    leagueEn: "Premier League",
    stageRu: "Тур 29 • Битва за титул",
    stageEn: "Matchday 29 • Title Showdown",
    status: "LIVE",
    minuteRu: "LIVE 83'",
    minuteEn: "LIVE 83'",
    stadiumRu: "Эмирейтс, Лондон",
    stadiumEn: "Emirates Stadium, London",
    refereeRu: "Энтони Тейлор (Англия)",
    refereeEn: "Anthony Taylor (England)",
    attendance: "60,704",
    heroPhotoUrl: "https://a.espncdn.com/photo/2026/1030/r1738605_1296x729_16-9.jpg",
    homeTeam: {
      id: "arsenal",
      nameRu: "Арсенал",
      nameEn: "Arsenal",
      shortName: "ARS",
      score: 2,
      formation: "4-3-3",
      coachRu: "Микель Артета",
      coachEn: "Mikel Arteta",
      primaryColor: "#DC2626",
    },
    awayTeam: {
      id: "liverpool",
      nameRu: "Ливерпуль",
      nameEn: "Liverpool",
      shortName: "LIV",
      score: 2,
      formation: "4-2-3-1",
      coachRu: "Арне Слот",
      coachEn: "Arne Slot",
      primaryColor: "#0D9488",
    },
    scorers: [
      {
        minute: "9'",
        playerRu: "Букайо Сака",
        playerEn: "Bukayo Saka",
        team: "home",
        assistRu: "Мартин Эдегор",
        assistEn: "Martin Ødegaard",
        scoreAfter: "1:0",
      },
      {
        minute: "24'",
        playerRu: "Вирджил ван Дейк",
        playerEn: "Virgil van Dijk",
        team: "away",
        assistRu: "Трент Александер-Арнольд",
        assistEn: "Trent Alexander-Arnold",
        scoreAfter: "1:1",
      },
      {
        minute: "43'",
        playerRu: "Кай Хаверц",
        playerEn: "Kai Havertz",
        team: "home",
        assistRu: "Деклан Райс",
        assistEn: "Declan Rice",
        scoreAfter: "2:1",
      },
      {
        minute: "69'",
        playerRu: "Мохамед Салах",
        playerEn: "Mohamed Salah",
        team: "away",
        assistRu: "Дарвин Нуньес",
        assistEn: "Darwin Núñez",
        scoreAfter: "2:2",
      },
    ],
    headlineRu:
      "Триллер на «Эмирейтс»: Сака и Хаверц выводили «Арсенал» вперед, но Салах сравнял счет в концовке",
    headlineEn:
      "Emirates Thriller: Saka & Havertz Twice Put Arsenal Ahead Before Salah Levels for Liverpool",
    leadRu:
      "Высочайший темп прессинга от команд Микеля Артеты и Арне Слота: оба клуба создали почти по 2.00 xG и обменялись голами со стандартов и быстрых отрывов.",
    leadEn:
      "Relentless pressing intensity from Mikel Arteta and Arne Slot sees Arsenal and Liverpool trade set-piece goals and rapid transitions in a 2-2 classic.",
    reportParagraphsRu: [
      "«Арсенал» открыл счет уже на 9-й минуте благодаря рывку Букайо Сака за спину Робертсону, а перед перерывом вновь вышел вперед после подачи Деклана Райса на Кая Хаверца.",
      "Во втором тайме Арне Слот перестроил правый фланг: длинная диагональ Александер-Арнольда запустила комбинацию Нуньеса и Салаха — 2:2.",
    ],
    reportParagraphsEn: [
      "Arsenal struck early in the 9th minute through Bukayo Saka before Kai Havertz headed home Declan Rice's pinpoint set-piece delivery just before half-time.",
      "After the interval, Arne Slot adjusted Liverpool's right-side progression as Trent Alexander-Arnold released Darwin Núñez to tee up Mohamed Salah for the 69th-minute equalizer.",
    ],
    timeline: [
      {
        minute: "9'",
        type: "goal",
        team: "home",
        titleRu: "ГОЛ! Букайо Сака (1:0)",
        titleEn: "GOAL! Bukayo Saka (1-0)",
        detailRu: "Сольный проход справа и мощный удар под ближнюю штангу.",
        detailEn: "Cut inside from the right wing and emphatic near-post finish.",
        scoreAfter: "1 : 0",
      },
      {
        minute: "24'",
        type: "goal",
        team: "away",
        titleRu: "ГОЛ! Вирджил ван Дейк (1:1)",
        titleEn: "GOAL! Virgil van Dijk (1-1)",
        detailRu: "Удар головой после углового в исполнении Александер-Арнольда.",
        detailEn: "Towering header from Trent Alexander-Arnold's inswinging corner.",
        scoreAfter: "1 : 1",
      },
      {
        minute: "43'",
        type: "goal",
        team: "home",
        titleRu: "ГОЛ! Кай Хаверц (2:1)",
        titleEn: "GOAL! Kai Havertz (2-1)",
        detailRu: "Подача Деклана Райса со штрафного и точный кивок головой в дальний угол.",
        detailEn: "Glancing header into the far corner from Declan Rice's free-kick.",
        scoreAfter: "2 : 1",
      },
      {
        minute: "69'",
        type: "goal",
        team: "away",
        titleRu: "ГОЛ! Мохамед Салах (2:2)",
        titleEn: "GOAL! Mohamed Salah (2-2)",
        detailRu: "Молниеносный контрвыпад: пас Нуньеса и удар Салаха в касание.",
        detailEn: "Lightning counter-attack as Darwin Núñez squares for Salah to finish.",
        scoreAfter: "2 : 2",
      },
      {
        minute: "72'",
        type: "sub",
        team: "home",
        titleRu: "Замена: Леандро Троссард вместо Габриэла Мартинелли",
        titleEn: "Substitution: Leandro Trossard on for Gabriel Martinelli",
        detailRu: "Артета усиливает игру в полуфланге на финальные 20 минут.",
        detailEn: "Arteta adds fresh combination play in the left half-space.",
      },
    ],
    stats: [
      { labelRu: "Ожидаемые голы (xG)", labelEn: "Expected Goals (xG)", homeVal: "1.96", awayVal: "1.84", homePercent: 52 },
      { labelRu: "Владение мячом", labelEn: "Ball Possession", homeVal: "52%", awayVal: "48%", homePercent: 52 },
      { labelRu: "Удары (в створ)", labelEn: "Shots (On Target)", homeVal: "13 (5)", awayVal: "12 (5)", homePercent: 52 },
      { labelRu: "Угловые удары", labelEn: "Corner Kicks", homeVal: "7", awayVal: "5", homePercent: 58 },
    ],
    relatedArticleSlug: "real-madrid-right-back-contract-agreement-official",
    relatedArticleTitleRu: "Контрактное досье Трента Александер-Арнольда и интерес европейских грандов",
    relatedArticleTitleEn: "Right-Back Dossier: Trent Alexander-Arnold's Progressive Passing & Contract Radar",
    telegramUrl: "https://t.me/futbolnaya_jara/4829",
  },
  "seriea-int-juv": {
    id: "seriea-int-juv",
    leagueRu: "Серия А Италия",
    leagueEn: "Serie A Enilive",
    stageRu: "Тур 29 • Дерби Италии",
    stageEn: "Matchday 29 • Derby d'Italia",
    status: "FT",
    minuteRu: "ЗАВЕРШЕН • 90+4'",
    minuteEn: "FULL TIME • 90+4'",
    stadiumRu: "Джузеппе Меацца (Сан-Сиро), Милан",
    stadiumEn: "San Siro (Giuseppe Meazza), Milan",
    refereeRu: "Марко Гуида (Италия)",
    refereeEn: "Marco Guida (Italy)",
    attendance: "75,584",
    heroPhotoUrl: "https://a.espncdn.com/photo/2026/1029/r1738250_1296x729_16-9.jpg",
    homeTeam: {
      id: "inter",
      nameRu: "Интер Милан",
      nameEn: "Inter Milan",
      shortName: "INT",
      score: 2,
      formation: "3-5-2",
      coachRu: "Симоне Индзаги",
      coachEn: "Simone Inzaghi",
      primaryColor: "#1D4ED8",
    },
    awayTeam: {
      id: "juventus",
      nameRu: "Ювентус",
      nameEn: "Juventus",
      shortName: "JUV",
      score: 0,
      formation: "4-2-3-1",
      coachRu: "Тьяго Мотта",
      coachEn: "Thiago Motta",
      primaryColor: "#334155",
    },
    scorers: [
      {
        minute: "34'",
        playerRu: "Лаутаро Мартинес",
        playerEn: "Lautaro Martínez",
        team: "home",
        assistRu: "Николо Барелла",
        assistEn: "Nicolò Barella",
        scoreAfter: "1:0",
      },
      {
        minute: "71'",
        playerRu: "Хакан Чалханоглу",
        playerEn: "Hakan Çalhanoğlu",
        team: "home",
        assistRu: "пенальти",
        assistEn: "penalty",
        scoreAfter: "2:0",
      },
    ],
    headlineRu:
      "Уверенная победа «Интера» в Дерби Италии: Лаутаро и Чалханоглу оставляют «Ювентус» без очков",
    headlineEn:
      "Inter Command Derby d'Italia as Lautaro Martínez & Çalhanoğlu Sink Juventus 2-0",
    leadRu:
      "Эталонная структура 3-5-2 Симоне Индзаги позволила миланцам нейтрализовать прессинг «Ювентуса» и одержать сухую домашнюю победу на «Сан-Сиро».",
    leadEn:
      "Simone Inzaghi's 3-5-2 clinic neutralized Juventus in midfield before Lautaro Martínez and Hakan Çalhanoğlu sealed all three points at San Siro.",
    reportParagraphsRu: [
      "«Интер» открыл счет на 34-й минуте после быстрой трехходовки с участием Бастони, Бареллы и Лаутаро Мартинеса.",
      "Во втором тайме Хакан Чалханоглу безупречно реализовал пенальти, доведя свою серию точных 11-метровых в Серии А до рекорда.",
    ],
    reportParagraphsEn: [
      "Inter broke the deadlock on 34 minutes through a slick three-man passing move involving Bastoni, Barella, and Lautaro Martínez.",
      "Hakan Çalhanoğlu sealed the result from the penalty spot in the 71st minute to extend his flawless spot-kick record in Serie A.",
    ],
    timeline: [
      {
        minute: "34'",
        type: "goal",
        team: "home",
        titleRu: "ГОЛ! Лаутаро Мартинес (1:0)",
        titleEn: "GOAL! Lautaro Martínez (1-0)",
        detailRu: "Точный удар с лета после черпачка Николо Бареллы.",
        detailEn: "Crisp half-volley inside the box from Barella's chipped pass.",
        scoreAfter: "1 : 0",
      },
      {
        minute: "71'",
        type: "goal",
        team: "home",
        titleRu: "ГОЛ! Хакан Чалханоглу — пенальти (2:0)",
        titleEn: "GOAL! Hakan Çalhanoğlu — penalty (2-0)",
        detailRu: "Безукоризненный удар с 11-метровой отметки в левый нижний угол.",
        detailEn: "Unstoppable low penalty into the bottom-left corner.",
        scoreAfter: "2 : 0",
      },
    ],
    stats: [
      { labelRu: "Ожидаемые голы (xG)", labelEn: "Expected Goals (xG)", homeVal: "2.12", awayVal: "0.73", homePercent: 74 },
      { labelRu: "Владение мячом", labelEn: "Ball Possession", homeVal: "56%", awayVal: "44%", homePercent: 56 },
      { labelRu: "Удары (в створ)", labelEn: "Shots (On Target)", homeVal: "15 (6)", awayVal: "8 (2)", homePercent: 65 },
    ],
    relatedArticleSlug: "ancelotti-asymmetrical-4-3-1-2-bellingham-valverde-tactical-analysis",
    relatedArticleTitleRu: "Тактическая лаборатория: как гибридные схемы полузащиты доминируют в Европе",
    relatedArticleTitleEn: "Tactical Lab: How Hybrid Midfield Rotations Dominate European Derbies",
    telegramUrl: "https://t.me/futbolnaya_jara/4815",
  },
  "saudi-nas-hil": {
    id: "saudi-nas-hil",
    leagueRu: "Саудовская Про-лига",
    leagueEn: "Saudi Pro League",
    stageRu: "Тур 25 • Дерби Эр-Рияда",
    stageEn: "Matchday 25 • Riyadh Derby",
    status: "LIVE",
    minuteRu: "LIVE 51'",
    minuteEn: "LIVE 51'",
    stadiumRu: "Аль-Авваль Парк, Эр-Рияд",
    stadiumEn: "Al-Awwal Park, Riyadh",
    refereeRu: "Шимон Марчиняк (Польша)",
    refereeEn: "Szymon Marciniak (Poland)",
    attendance: "25,000",
    heroPhotoUrl: "https://a.espncdn.com/photo/2026/1030/r1738425_1296x729_16-9.jpg",
    homeTeam: {
      id: "al-nassr",
      nameRu: "Аль-Наср",
      nameEn: "Al-Nassr",
      shortName: "NAS",
      score: 2,
      formation: "4-2-3-1",
      coachRu: "Стефано Пиоли",
      coachEn: "Stefano Pioli",
      primaryColor: "#CA8A04",
    },
    awayTeam: {
      id: "al-hilal",
      nameRu: "Аль-Хиляль",
      nameEn: "Al-Hilal",
      shortName: "HIL",
      score: 1,
      formation: "4-3-3",
      coachRu: "Жорже Жезуш",
      coachEn: "Jorge Jesus",
      primaryColor: "#2563EB",
    },
    scorers: [
      {
        minute: "19'",
        playerRu: "Криштиану Роналду",
        playerEn: "Cristiano Ronaldo",
        team: "home",
        assistRu: "Садио Мане",
        assistEn: "Sadio Mané",
        scoreAfter: "1:0",
      },
      {
        minute: "37'",
        playerRu: "Александар Митрович",
        playerEn: "Aleksandar Mitrović",
        team: "away",
        scoreAfter: "1:1",
      },
      {
        minute: "49'",
        playerRu: "Криштиану Роналду",
        playerEn: "Cristiano Ronaldo",
        team: "home",
        assistRu: "Отавио",
        assistEn: "Otávio",
        scoreAfter: "2:1",
      },
    ],
    headlineRu:
      "Дерби Эр-Рияда: дубль Криштиану Роналду на пути к 1000 голам выводит «Аль-Наср» вперед",
    headlineEn:
      "Riyadh Derby: Cristiano Ronaldo's Brace on the Road to 1,000 Career Goals Gives Al-Nassr 2-1 Lead",
    leadRu:
      "Капитан «Аль-Насра» забил в обоих таймах принципиального матча против «Аль-Хиляля», продолжая исторический поход за отметкой в 1000 официальных мячей.",
    leadEn:
      "Al-Nassr's captain struck in each half against reigning champions Al-Hilal, extending his all-time world record tally past 925 official career goals.",
    reportParagraphsRu: [
      "Связка Садио Мане и Криштиану Роналду открыла счет на 19-й минуте, а сразу после перерыва португалец оформил дубль с передачи Отавио.",
      "«Аль-Хиляль» ответил точным ударом головой Александара Митровича и продолжает давить через правый фланг Канселу и Малкома.",
    ],
    reportParagraphsEn: [
      "Sadio Mané and Cristiano Ronaldo combined for the 19th-minute opener before Ronaldo restored Al-Nassr's lead early in the second half off Otávio's pass.",
      "Aleksandar Mitrović headed home Al-Hilal's equalizer in the 37th minute as both sides trade high-tempo attacks in Riyadh.",
    ],
    timeline: [
      {
        minute: "19'",
        type: "goal",
        team: "home",
        titleRu: "ГОЛ! Криштиану Роналду (1:0)",
        titleEn: "GOAL! Cristiano Ronaldo (1-0)",
        detailRu: "Мощный удар в касание после прострела Садио Мане.",
        detailEn: "First-time finish inside the box off Sadio Mané's low cross.",
        scoreAfter: "1 : 0",
      },
      {
        minute: "37'",
        type: "goal",
        team: "away",
        titleRu: "ГОЛ! Александар Митрович (1:1)",
        titleEn: "GOAL! Aleksandar Mitrović (1-1)",
        detailRu: "Ударом головой замкнул навес с правого фланга.",
        detailEn: "Towering header from a right-wing delivery.",
        scoreAfter: "1 : 1",
      },
      {
        minute: "49'",
        type: "goal",
        team: "home",
        titleRu: "ГОЛ! Криштиану Роналду (2:1)",
        titleEn: "GOAL! Cristiano Ronaldo (2-1)",
        detailRu: "Дубль капитана «Аль-Насра» после тонкого паса Отавио!",
        detailEn: "Ronaldo's second of the night off Otávio's through-ball!",
        scoreAfter: "2 : 1",
      },
    ],
    stats: [
      { labelRu: "Ожидаемые голы (xG)", labelEn: "Expected Goals (xG)", homeVal: "1.79", awayVal: "1.41", homePercent: 56 },
      { labelRu: "Владение мячом", labelEn: "Ball Possession", homeVal: "48%", awayVal: "52%", homePercent: 48 },
      { labelRu: "Удары (в створ)", labelEn: "Shots (On Target)", homeVal: "12 (6)", awayVal: "11 (4)", homePercent: 52 },
    ],
    relatedArticleSlug: "cristiano-ronaldo-925-career-goals-riyadh-derby-hat-trick",
    relatedArticleTitleRu: "Феномен Криштиану Роналду: курс на 1000 официальных голов в карьере",
    relatedArticleTitleEn: "Cristiano Ronaldo's March Past 900+ Goals: Road to 1,000 Official Strikes",
    telegramUrl: "https://t.me/futbolnaya_jara/4830",
  },
  "ucl-bay-psg": {
    id: "ucl-bay-psg",
    leagueRu: "Лига чемпионов УЕФА",
    leagueEn: "UEFA Champions League",
    stageRu: "1/4 финала • Превью и составы",
    stageEn: "Quarter-Final • Tactical Preview & Lineups",
    status: "UPCOMING",
    minuteRu: "СЕГОДНЯ • 22:00 МСК",
    minuteEn: "TONIGHT • 22:00 CET",
    stadiumRu: "Альянц Арена, Мюнхен",
    stadiumEn: "Allianz Arena, Munich",
    refereeRu: "Даниэле Орсато (Италия)",
    refereeEn: "Daniele Orsato (Italy)",
    attendance: "75,024",
    heroPhotoUrl: "https://a.espncdn.com/photo/2026/1026/r1736765_3_1296x729_16-9.jpg",
    homeTeam: {
      id: "bayern",
      nameRu: "Бавария",
      nameEn: "Bayern Munich",
      shortName: "BAY",
      score: 0,
      formation: "4-2-3-1",
      coachRu: "Венсан Компани",
      coachEn: "Vincent Kompany",
      primaryColor: "#DC2626",
    },
    awayTeam: {
      id: "psg",
      nameRu: "Пари Сен-Жермен",
      nameEn: "Paris Saint-Germain",
      shortName: "PSG",
      score: 0,
      formation: "4-3-3",
      coachRu: "Луис Энрике",
      coachEn: "Luis Enrique",
      primaryColor: "#1E3A8A",
    },
    scorers: [],
    headlineRu:
      "Тактическое превью «Бавария» — «ПСЖ»: высокий прессинг Компани против владения Луиса Энрике",
    headlineEn:
      "Bayern Munich vs. PSG Tactical Preview: Kompany's High Press Against Luis Enrique's Fluid 4-3-3",
    leadRu:
      "Гарри Кейн и Джамал Мусиала возглавляют атаку мюнхенцев на «Альянц Арене», тогда как «ПСЖ» делает ставку на скорость Баркола и Дембеле на флангах.",
    leadEn:
      "Harry Kane and Jamal Musiala lead Bayern's attack at the Allianz Arena while PSG counter with Bradley Barcola and Ousmane Dembélé on the wings.",
    reportParagraphsRu: [
      "Ключевая дуэль вечера развернется в опорной зоне: Йозуа Киммих против Витиньи и Жоау Невеша.",
      "Обе команды опубликовали ориентировочные стартовые сочетания, доступные на интерактивной тактической доске ниже.",
    ],
    reportParagraphsEn: [
      "The decisive tactical battle will unfold in central midfield as Joshua Kimmich faces Vitinha and João Neves.",
      "Both sides have confirmed their tactical setups, mapped out on the interactive Sofascore pitch below.",
    ],
    timeline: [
      {
        minute: "20:45",
        type: "whistle",
        team: "neutral",
        titleRu: "Опубликованы тактические схемы команд",
        titleEn: "Official Tactical Formations Confirmed",
        detailRu: "«Бавария» выходит по схеме 4-2-3-1, «ПСЖ» использует 4-3-3 с ложной девяткой.",
        detailEn: "Bayern line up in a 4-2-3-1 while PSG deploy a fluid 4-3-3.",
      },
    ],
    stats: [
      { labelRu: "Среднее владение в ЛЧ", labelEn: "UCL Avg Possession", homeVal: "61%", awayVal: "63%", homePercent: 49 },
      { labelRu: "Удары за 90 мин", labelEn: "Shots per 90m", homeVal: "18.4", awayVal: "17.2", homePercent: 52 },
      { labelRu: "Точность передач", labelEn: "Pass Completion", homeVal: "90%", awayVal: "91%", homePercent: 50 },
    ],
    relatedArticleSlug: "florian-wirtz-man-city-bayern-insider-update",
    relatedArticleTitleRu: "Трансферное досье «Баварии»: переговоры по Флориану Вирцу и планы на лето",
    relatedArticleTitleEn: "Bayern Transfer Dossier: Florian Wirtz Negotiations & Summer Blueprint",
    telegramUrl: "https://t.me/futbolnaya_jara/4832",
  },
};

function resolveMatchDossier(rawId: string): DetailedMatchDossier {
  if (MATCH_DOSSIERS[rawId]) return MATCH_DOSSIERS[rawId];
  if (rawId === "match-real-barca") return MATCH_DOSSIERS["match-el-clasico"];
  if (rawId === "match-arsenal-liverpool") return MATCH_DOSSIERS["epl-ars-liv"];
  if (rawId === "match-alnassr-alhilal") return MATCH_DOSSIERS["saudi-nas-hil"];
  return MATCH_DOSSIERS["ucl-rma-mci"];
}

export default function MatchReportDetailPage() {
  const params = useParams<{ id?: string }>();
  const matchId = typeof params?.id === "string" ? params.id : "ucl-rma-mci";

  const [lang, setLang] = useState<PortalLang>("ru");
  const [activeTab, setActiveTab] = useState<MatchDetailTab>("all");

  const isRu = lang === "ru";
  const dossier = useMemo(() => resolveMatchDossier(matchId), [matchId]);

  const homeScorers = useMemo(
    () => dossier.scorers.filter((s) => s.team === "home"),
    [dossier]
  );
  const awayScorers = useMemo(
    () => dossier.scorers.filter((s) => s.team === "away"),
    [dossier]
  );

  const pitchMatchInput: TacticalPitchMatchInput = useMemo(() => {
    const isEpl = dossier.id === "epl-ars-liv";
    return {
      id: dossier.id,
      league: {
        ru: `${dossier.leagueRu} • ${dossier.stageRu}`,
        en: `${dossier.leagueEn} • ${dossier.stageEn}`,
      },
      status: dossier.status,
      minute: isRu ? dossier.minuteRu : dossier.minuteEn,
      homeTeam: {
        name: { ru: dossier.homeTeam.nameRu, en: dossier.homeTeam.nameEn },
        shortName: dossier.homeTeam.shortName,
        logoUrl:
          getClubLogoUrl(
            dossier.homeTeam.id,
            dossier.homeTeam.nameEn,
            dossier.homeTeam.nameRu
          ) || undefined,
        primaryColor: dossier.homeTeam.primaryColor,
        score: dossier.homeTeam.score,
        formation: dossier.homeTeam.formation,
      },
      awayTeam: {
        name: { ru: dossier.awayTeam.nameRu, en: dossier.awayTeam.nameEn },
        shortName: dossier.awayTeam.shortName,
        logoUrl:
          getClubLogoUrl(
            dossier.awayTeam.id,
            dossier.awayTeam.nameEn,
            dossier.awayTeam.nameRu
          ) || undefined,
        primaryColor: dossier.awayTeam.primaryColor,
        score: dossier.awayTeam.score,
        formation: dossier.awayTeam.formation,
      },
      homeLineup: isEpl ? ARSENAL_LINEUP : REAL_MADRID_LINEUP,
      awayLineup: isEpl ? LIVERPOOL_LINEUP : BARCELONA_LINEUP,
    };
  }, [dossier, isRu]);

  const highlightClips: HighlightGoalClipItem[] = useMemo(() => {
    if (dossier.scorers.length === 0) return [];
    return dossier.scorers.map((s) => ({
      minute: s.minute,
      scorer: { ru: s.playerRu, en: s.playerEn },
      team: s.team,
      scoreAfter: s.scoreAfter,
    }));
  }, [dossier]);

  const matchSubstitutions: SubstitutionBroadcastEvent[] | undefined = useMemo(() => {
    if (dossier.id === "epl-ars-liv") {
      return [
        {
          id: "sub-ars-liv-1",
          matchId: "epl-ars-liv",
          team: "home",
          teamName: { ru: "Арсенал", en: "Arsenal" },
          teamLogoUrl:
            getClubLogoUrl("arsenal", "Arsenal", "Арсенал") || undefined,
          minute: "72'",
          playerIn: {
            name: { ru: "Леандро Троссард", en: "Leandro Trossard" },
            number: 19,
            position: "FWD",
            fotmobId: 318615,
            rating: 7.5,
            subStatLabel: {
              ru: "ПЕРЕГРУЗ ПОЛУФЛАНГА",
              en: "HALF-SPACE OVERLOAD",
            },
          },
          playerOut: {
            name: { ru: "Габриэл Мартинелли", en: "Gabriel Martinelli" },
            number: 11,
            position: "FWD",
            fotmobId: 1021586,
            rating: 7.4,
            achievementBadge: {
              ru: "72 МИНУТЫ • 4 ОБВОДКИ",
              en: "72 MINS • 4 DRIBBLES",
            },
          },
          reason: {
            ru: "Усиление комбинационной игры между линиями обороны «Ливерпуля»",
            en: "Adding tight-space combination play against Liverpool's right channel",
          },
        },
      ];
    }
    return undefined;
  }, [dossier.id]);

  const otherMatches = useMemo(
    () => Object.values(MATCH_DOSSIERS).filter((m) => m.id !== dossier.id),
    [dossier.id]
  );

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
                {isRu ? "Тактический отчет о матче" : "Match Report & Tactical Center"}
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
              { href: "/live", labelRu: "Матч-центр", labelEn: "Live Center", active: true },
              {
                href: `/news/${dossier.relatedArticleSlug}`,
                labelRu: "Статьи",
                labelEn: "News",
              },
              { href: "/transfers", labelRu: "Трансферы", labelEn: "Transfers" },
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
      <LiveScoreTicker lang={lang} selectedMatchId={dossier.id} />

      <main
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "24px 20px 72px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* Top Breadcrumb + Top Ad Banner Slot */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px" }}>
            <Link
              href="/live"
              style={{
                color: "#EA580C",
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              {isRu ? "← Все матчи дня (/live)" : "← All Live Matches (/live)"}
            </Link>
            <span style={{ color: "#CBD5E1" }}>/</span>
            <span style={{ color: "#475569", fontWeight: 600 }}>
              {isRu ? dossier.leagueRu : dossier.leagueEn}
            </span>
          </div>

          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "8px",
              padding: "6px 14px",
              fontSize: "12px",
              color: "#475569",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                fontWeight: 800,
                color: "#64748B",
                border: "1px solid #CBD5E1",
                borderRadius: "4px",
                padding: "1px 5px",
              }}
            >
              AD
            </span>
            <span>
              {isRu
                ? "Прямые видеоповторы всех голов матча в Telegram @futbolnaya_jara"
                : "Instant 1080p goal clips on Telegram @futbolnaya_jara"}
            </span>
          </div>
        </div>

        {/* Full Match Scoreboard Header */}
        <section
          aria-label="Match Header Scoreboard"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: "16px",
            padding: "28px 24px",
            boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
            display: "flex",
            flexDirection: "column",
            gap: "22px",
          }}
        >
          {/* Meta Info Row: League, Stadium, Referee, Attendance */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              flexWrap: "wrap",
              paddingBottom: "16px",
              borderBottom: "1px solid #E2E8F0",
              fontSize: "12.5px",
              color: "#475569",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <span
                style={{
                  backgroundColor: "#0F172A",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: "11px",
                  padding: "4px 10px",
                  borderRadius: "6px",
                }}
              >
                {isRu ? dossier.leagueRu : dossier.leagueEn}
              </span>
              <span style={{ fontWeight: 700, color: "#0F172A" }}>
                {isRu ? dossier.stageRu : dossier.stageEn}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <span>
                <strong style={{ color: "#0F172A" }}>
                  {isRu ? "Стадион:" : "Venue:"}
                </strong>{" "}
                {isRu ? dossier.stadiumRu : dossier.stadiumEn} ({dossier.attendance})
              </span>
              <span>
                <strong style={{ color: "#0F172A" }}>
                  {isRu ? "Главный арбитр:" : "Referee:"}
                </strong>{" "}
                {isRu ? dossier.refereeRu : dossier.refereeEn}
              </span>
            </div>
          </div>

          {/* Center Scoreboard Grid with ClubLogo size={56} */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {/* Home Team */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <ClubLogo
                teamId={dossier.homeTeam.id}
                teamName={dossier.homeTeam.nameEn}
                teamNameRu={dossier.homeTeam.nameRu}
                size={56}
              />
              <div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: "clamp(20px, 3vw, 28px)",
                    fontWeight: 900,
                    color: "#0F172A",
                    lineHeight: 1.15,
                  }}
                >
                  {isRu ? dossier.homeTeam.nameRu : dossier.homeTeam.nameEn}
                </h1>
                <div
                  style={{
                    marginTop: "6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "12px",
                    color: "#64748B",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#F1F5F9",
                      border: "1px solid #CBD5E1",
                      color: "#0F172A",
                      fontWeight: 800,
                      padding: "2px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    {dossier.homeTeam.formation}
                  </span>
                  <span>
                    {isRu ? dossier.homeTeam.coachRu : dossier.homeTeam.coachEn}
                  </span>
                </div>
              </div>
            </div>

            {/* Score & Status Pill */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#F8FAFC",
                  border: "1px solid #CBD5E1",
                  borderRadius: "14px",
                  padding: "10px 26px",
                  fontSize: "clamp(26px, 4vw, 38px)",
                  fontWeight: 900,
                  color: "#0F172A",
                  fontVariantNumeric: "tabular-nums",
                  letterSpacing: "0.04em",
                }}
              >
                {dossier.status === "UPCOMING"
                  ? "vs"
                  : `${dossier.homeTeam.score} : ${dossier.awayTeam.score}`}
              </div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  padding: "4px 12px",
                  borderRadius: "999px",
                  backgroundColor:
                    dossier.status === "LIVE" ? "#FEF2F2" : "#F1F5F9",
                  color: dossier.status === "LIVE" ? "#DC2626" : "#475569",
                  border:
                    dossier.status === "LIVE"
                      ? "1px solid #FECACA"
                      : "1px solid #CBD5E1",
                }}
              >
                {isRu ? dossier.minuteRu : dossier.minuteEn}
              </span>
            </div>

            {/* Away Team */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "16px",
                textAlign: "right",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "clamp(20px, 3vw, 28px)",
                    fontWeight: 900,
                    color: "#0F172A",
                    lineHeight: 1.15,
                  }}
                >
                  {isRu ? dossier.awayTeam.nameRu : dossier.awayTeam.nameEn}
                </h2>
                <div
                  style={{
                    marginTop: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: "8px",
                    fontSize: "12px",
                    color: "#64748B",
                    flexWrap: "wrap",
                  }}
                >
                  <span>
                    {isRu ? dossier.awayTeam.coachRu : dossier.awayTeam.coachEn}
                  </span>
                  <span
                    style={{
                      backgroundColor: "#F1F5F9",
                      border: "1px solid #CBD5E1",
                      color: "#0F172A",
                      fontWeight: 800,
                      padding: "2px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    {dossier.awayTeam.formation}
                  </span>
                </div>
              </div>
              <ClubLogo
                teamId={dossier.awayTeam.id}
                teamName={dossier.awayTeam.nameEn}
                teamNameRu={dossier.awayTeam.nameRu}
                size={56}
              />
            </div>
          </div>

          {/* Scorers & Minutes Summary Strip */}
          {dossier.scorers.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                paddingTop: "16px",
                borderTop: "1px solid #E2E8F0",
                fontSize: "13px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {homeScorers.map((s, idx) => (
                  <div key={idx} style={{ color: "#1E293B" }}>
                    <strong
                      style={{
                        color: "#EA580C",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {s.minute}
                    </strong>{" "}
                    <span style={{ fontWeight: 800 }}>
                      {isRu ? s.playerRu : s.playerEn}
                    </span>
                    {(s.assistRu || s.assistEn) && (
                      <span style={{ color: "#64748B", fontSize: "12px" }}>
                        {" "}
                        ({isRu ? s.assistRu : s.assistEn})
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  textAlign: "right",
                }}
              >
                {awayScorers.map((s, idx) => (
                  <div key={idx} style={{ color: "#1E293B" }}>
                    <span style={{ fontWeight: 800 }}>
                      {isRu ? s.playerRu : s.playerEn}
                    </span>{" "}
                    <strong
                      style={{
                        color: "#EA580C",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {s.minute}
                    </strong>
                    {(s.assistRu || s.assistEn) && (
                      <span style={{ color: "#64748B", fontSize: "12px" }}>
                        {" "}
                        ({isRu ? s.assistRu : s.assistEn})
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Section Switcher Tabs */}
          <div
            role="tablist"
            aria-label="Match Center Sections"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
              paddingTop: "12px",
              borderTop: "1px solid #E2E8F0",
            }}
          >
            {(
              [
                {
                  id: "all",
                  labelRu: "Полный обзор (Все разделы)",
                  labelEn: "Full Match Dossier (All)",
                },
                {
                  id: "report",
                  labelRu: "Отчет, хронология и статистика",
                  labelEn: "Editorial Report & Timeline",
                },
                {
                  id: "tactics",
                  labelRu: "Тактическая схема Sofascore и замены",
                  labelEn: "Sofascore Tactical Pitch & Subs",
                },
                {
                  id: "highlights",
                  labelRu: "Видео голов в Telegram",
                  labelEn: "Video Highlights",
                },
              ] as const
            ).map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: active ? 800 : 600,
                    cursor: "pointer",
                    border: active ? "1px solid #0F172A" : "1px solid #E2E8F0",
                    backgroundColor: active ? "#0F172A" : "#F8FAFC",
                    color: active ? "#FFFFFF" : "#334155",
                  }}
                >
                  {isRu ? tab.labelRu : tab.labelEn}
                </button>
              );
            })}
          </div>
        </section>

        {/* Main Two-Column Content Grid + Right Sidebar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {/* Left / Primary Column (Spans 2 columns on desktop via flex/grid) */}
          <div
            style={{
              gridColumn: "span 2",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {/* (a) Editorial Match Report & Key Events Timeline */}
            {(activeTab === "all" || activeTab === "report") && (
              <section
                aria-label="Editorial Match Report and Timeline"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "16px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    aspectRatio: "16 / 9",
                    maxHeight: "380px",
                    width: "100%",
                    overflow: "hidden",
                    backgroundColor: "#E2E8F0",
                  }}
                >
                  <img
                    src={dossier.heroPhotoUrl}
                    alt={isRu ? dossier.headlineRu : dossier.headlineEn}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>

                <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "clamp(20px, 2.6vw, 28px)",
                      fontWeight: 900,
                      color: "#0F172A",
                      lineHeight: 1.25,
                    }}
                  >
                    {isRu ? dossier.headlineRu : dossier.headlineEn}
                  </h2>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: 600,
                      lineHeight: 1.65,
                      color: "#1E293B",
                      backgroundColor: "#F8FAFC",
                      border: "1px solid #E2E8F0",
                      padding: "16px",
                      borderRadius: "12px",
                    }}
                  >
                    {isRu ? dossier.leadRu : dossier.leadEn}
                  </p>

                  {(isRu ? dossier.reportParagraphsRu : dossier.reportParagraphsEn).map(
                    (para, idx) => (
                      <p
                        key={idx}
                        style={{
                          margin: 0,
                          fontSize: "15px",
                          lineHeight: 1.75,
                          color: "#334155",
                          maxWidth: "72ch",
                        }}
                      >
                        {para}
                      </p>
                    )
                  )}

                  {/* Key Events Timeline */}
                  <div
                    style={{
                      marginTop: "10px",
                      paddingTop: "20px",
                      borderTop: "1px solid #E2E8F0",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "17px",
                        fontWeight: 900,
                        color: "#0F172A",
                      }}
                    >
                      {isRu
                        ? "Хронология ключевых событий матча"
                        : "Key Match Events Timeline"}
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {dossier.timeline.map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "64px 1fr auto",
                            alignItems: "start",
                            gap: "12px",
                            padding: "12px 14px",
                            borderRadius: "10px",
                            backgroundColor: "#F8FAFC",
                            border: "1px solid #E2E8F0",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "13px",
                              fontWeight: 900,
                              color: "#EA580C",
                              fontVariantNumeric: "tabular-nums",
                            }}
                          >
                            {item.minute}
                          </span>
                          <div>
                            <div
                              style={{
                                fontSize: "14px",
                                fontWeight: 800,
                                color: "#0F172A",
                              }}
                            >
                              {isRu ? item.titleRu : item.titleEn}
                            </div>
                            <div
                              style={{
                                fontSize: "13px",
                                color: "#475569",
                                marginTop: "3px",
                                lineHeight: 1.5,
                              }}
                            >
                              {isRu ? item.detailRu : item.detailEn}
                            </div>
                          </div>
                          {item.scoreAfter && (
                            <span
                              style={{
                                backgroundColor: "#FFFFFF",
                                border: "1px solid #CBD5E1",
                                borderRadius: "6px",
                                padding: "3px 8px",
                                fontSize: "12px",
                                fontWeight: 900,
                                color: "#0F172A",
                                fontVariantNumeric: "tabular-nums",
                              }}
                            >
                              {item.scoreAfter}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* (b) Horizontal Sofascore TacticalPitch + SubstitutionCard */}
            {(activeTab === "all" || activeTab === "tactics") && (
              <section
                aria-label="Tactical Pitch and Substitutions"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <TacticalPitch match={pitchMatchInput} lang={lang} />
                <SubstitutionCard
                  substitutions={matchSubstitutions}
                  homeTeam={{
                    name: {
                      ru: dossier.homeTeam.nameRu,
                      en: dossier.homeTeam.nameEn,
                    },
                    shortName: dossier.homeTeam.shortName,
                    logoUrl:
                      getClubLogoUrl(
                        dossier.homeTeam.id,
                        dossier.homeTeam.nameEn,
                        dossier.homeTeam.nameRu
                      ) || undefined,
                    score: dossier.homeTeam.score,
                  }}
                  awayTeam={{
                    name: {
                      ru: dossier.awayTeam.nameRu,
                      en: dossier.awayTeam.nameEn,
                    },
                    shortName: dossier.awayTeam.shortName,
                    logoUrl:
                      getClubLogoUrl(
                        dossier.awayTeam.id,
                        dossier.awayTeam.nameEn,
                        dossier.awayTeam.nameRu
                      ) || undefined,
                    score: dossier.awayTeam.score,
                  }}
                  lang={lang}
                />
              </section>
            )}

            {/* (c) TelegramHighlightBanner Video Highlights */}
            {(activeTab === "all" || activeTab === "highlights") && (
              <TelegramHighlightBanner
                matchTitle={{
                  ru: `${dossier.homeTeam.nameRu} ${dossier.homeTeam.score} : ${dossier.awayTeam.score} ${dossier.awayTeam.nameRu}`,
                  en: `${dossier.homeTeam.nameEn} ${dossier.homeTeam.score} : ${dossier.awayTeam.score} ${dossier.awayTeam.nameEn}`,
                }}
                telegramUrl={dossier.telegramUrl}
                clips={highlightClips.length > 0 ? highlightClips : undefined}
                lang={lang}
              />
            )}
          </div>

          {/* Right Sidebar: Match Telemetry Stats, Sidebar Ad Slot & Related Links */}
          <aside
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* Head-to-Head Match Telemetry */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "16px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "16px",
                  fontWeight: 900,
                  color: "#0F172A",
                }}
              >
                {isRu ? "Статистика матча (Opta)" : "Match Telemetry (Opta)"}
              </h3>

              {dossier.stats.map((st, idx) => (
                <div
                  key={idx}
                  style={{ display: "flex", flexDirection: "column", gap: "6px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12.5px",
                      fontWeight: 700,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    <span style={{ color: "#0F172A" }}>{st.homeVal}</span>
                    <span style={{ color: "#64748B", fontWeight: 600 }}>
                      {isRu ? st.labelRu : st.labelEn}
                    </span>
                    <span style={{ color: "#0F172A" }}>{st.awayVal}</span>
                  </div>
                  <div
                    style={{
                      height: "6px",
                      borderRadius: "999px",
                      backgroundColor: "#E2E8F0",
                      overflow: "hidden",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        width: `${st.homePercent}%`,
                        backgroundColor: "#EA580C",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Related Editorial Analysis Article */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "16px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#EA580C",
                }}
              >
                {isRu ? "Аналитический материал по матчу" : "Related Tactical Article"}
              </div>
              <Link
                href={`/news/${dossier.relatedArticleSlug}`}
                style={{
                  fontSize: "15px",
                  fontWeight: 800,
                  color: "#0F172A",
                  textDecoration: "none",
                  lineHeight: 1.4,
                }}
              >
                {isRu ? dossier.relatedArticleTitleRu : dossier.relatedArticleTitleEn} →
              </Link>
            </div>

            {/* Sidebar 300x250 Ad Slot */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "16px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
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
                {isRu ? "РЕКЛАМНЫЙ БЛОК • 300x250" : "SPONSORED • 300x250"}
              </span>
              <div style={{ fontSize: "15px", fontWeight: 900, color: "#0F172A" }}>
                {isRu
                  ? "Трансферный Радар GOLASON.COM"
                  : "GOLASON Transfer Reliability Radar"}
              </div>
              <p style={{ margin: 0, fontSize: "12.5px", color: "#475569", lineHeight: 1.5 }}>
                {isRu
                  ? "Следите за подтвержденными сделками Tier-1 (100% Official) и инсайдами Фабрицио Романо в реальном времени."
                  : "Track confirmed Tier-1 deals (100% Official) and verified insider reports in real time."}
              </p>
              <Link
                href="/transfers"
                style={{
                  textDecoration: "none",
                  textAlign: "center",
                  backgroundColor: "#0F172A",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: "12px",
                  padding: "10px 14px",
                  borderRadius: "8px",
                }}
              >
                {isRu ? "Открыть центр трансферов →" : "Open Transfer Center →"}
              </Link>
            </div>

            {/* Other Match Reports Links */}
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
              <h3
                style={{
                  margin: 0,
                  fontSize: "15px",
                  fontWeight: 900,
                  color: "#0F172A",
                }}
              >
                {isRu ? "Другие матчи тура" : "Other Featured Matches"}
              </h3>

              {otherMatches.map((m) => (
                <Link
                  key={m.id}
                  href={`/matches/${m.id}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    backgroundColor: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    textDecoration: "none",
                    color: "#0F172A",
                    fontSize: "13px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <ClubLogo
                      teamId={m.homeTeam.id}
                      teamName={m.homeTeam.nameEn}
                      size={20}
                    />
                    <span style={{ fontWeight: 700 }}>
                      {isRu ? m.homeTeam.nameRu : m.homeTeam.nameEn}
                    </span>
                    <span style={{ color: "#64748B" }}>vs</span>
                    <ClubLogo
                      teamId={m.awayTeam.id}
                      teamName={m.awayTeam.nameEn}
                      size={20}
                    />
                    <span style={{ fontWeight: 700 }}>
                      {isRu ? m.awayTeam.nameRu : m.awayTeam.nameEn}
                    </span>
                  </div>
                  <span
                    style={{
                      fontWeight: 900,
                      color: "#EA580C",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {m.status === "UPCOMING"
                      ? isRu
                        ? "Превью"
                        : "Preview"
                      : `${m.homeTeam.score}:${m.awayTeam.score}`}
                  </span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
