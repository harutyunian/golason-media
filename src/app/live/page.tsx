"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ClubLogo, getClubLogoUrl } from "@/lib/clubLogos";
import { LiveScoreTicker } from "@/components/ticker";
import {
  TacticalPitch,
  SubstitutionCard,
  type TacticalPitchMatchInput,
  type SubstitutionBroadcastEvent,
} from "@/components/match";
import {
  REAL_MADRID_LINEUP,
  BARCELONA_LINEUP,
  ARSENAL_LINEUP,
  LIVERPOOL_LINEUP,
} from "@/lib/mockData";
import rawSnapshot from "@/lib/realDataSnapshot.json";

type PortalLang = "ru" | "en";
type CompetitionId = "UCL" | "LA LIGA" | "EPL" | "SERIE A" | "SAUDI";
type MatchStatusCode = "LIVE" | "HT" | "FT" | "UPCOMING";

interface LiveCenterScorer {
  minute: string;
  playerRu: string;
  playerEn: string;
  team: "home" | "away";
  noteRu?: string;
  noteEn?: string;
}

interface LiveCenterMatch {
  id: string;
  competitionId: CompetitionId;
  stageRu: string;
  stageEn: string;
  status: MatchStatusCode;
  minuteLabelRu: string;
  minuteLabelEn: string;
  venueRu: string;
  venueEn: string;
  refereeRu: string;
  refereeEn: string;
  homeTeam: {
    id: string;
    nameRu: string;
    nameEn: string;
    shortName: string;
    score?: number;
    formation: string;
    primaryColor: string;
  };
  awayTeam: {
    id: string;
    nameRu: string;
    nameEn: string;
    shortName: string;
    score?: number;
    formation: string;
    primaryColor: string;
  };
  scorers: LiveCenterScorer[];
  possessionHome: number;
  xgHome: string;
  xgAway: string;
  shotsOnTargetHome: number;
  shotsOnTargetAway: number;
  telegramUrl: string;
}

const COMPETITION_META: Record<
  CompetitionId,
  {
    id: CompetitionId;
    titleRu: string;
    titleEn: string;
    subtitleRu: string;
    subtitleEn: string;
    code: string;
  }
> = {
  UCL: {
    id: "UCL",
    titleRu: "Лига чемпионов УЕФА",
    titleEn: "UEFA Champions League",
    subtitleRu: "Общий этап и плей-офф европейской элиты",
    subtitleEn: "League Phase & European Knockout Stage",
    code: "UCL",
  },
  "LA LIGA": {
    id: "LA LIGA",
    titleRu: "Ла Лига Испания",
    titleEn: "La Liga EA Sports",
    subtitleRu: "Чемпионат Испании • Примера Дивизион",
    subtitleEn: "Spanish Primera División • Matchday 28",
    code: "ESP",
  },
  EPL: {
    id: "EPL",
    titleRu: "Английская Премьер-лига",
    titleEn: "Premier League",
    subtitleRu: "Чемпионат Англии • Высший дивизион",
    subtitleEn: "English Top Flight • Matchday 29",
    code: "ENG",
  },
  "SERIE A": {
    id: "SERIE A",
    titleRu: "Серия А Италия",
    titleEn: "Serie A Enilive",
    subtitleRu: "Чемпионат Италии • Кальчо",
    subtitleEn: "Italian Top Flight • Matchday 29",
    code: "ITA",
  },
  SAUDI: {
    id: "SAUDI",
    titleRu: "Саудовская Про-лига",
    titleEn: "Saudi Pro League",
    subtitleRu: "Чемпионат Саудовской Аравии • Дерби Эр-Рияда",
    subtitleEn: "Roshn Saudi League • Matchday 25",
    code: "KSA",
  },
};

const COMPETITION_ORDER: CompetitionId[] = [
  "UCL",
  "LA LIGA",
  "EPL",
  "SERIE A",
  "SAUDI",
];

const REAL_SNAPSHOT_LIVE_MATCHES: LiveCenterMatch[] = (
  rawSnapshot.matches || []
).map((m) => {
  const validComp: CompetitionId =
    m.tickerLeague === "LA LIGA" ||
    m.tickerLeague === "EPL" ||
    m.tickerLeague === "SERIE A" ||
    m.tickerLeague === "UCL" ||
    m.tickerLeague === "SAUDI"
      ? (m.tickerLeague as CompetitionId)
      : "UCL";
  return {
    id: String(m.id),
    competitionId: validComp,
    stageRu: `${m.competitionRu} • ${m.dateLabelRu}`,
    stageEn: `${m.competitionEn} • ${m.dateLabelRu}`,
    status: (m.status as MatchStatusCode) || "UPCOMING",
    minuteLabelRu: m.statusTextRu,
    minuteLabelEn: m.statusTextEn,
    venueRu: m.stadiumRu || "Стадион матча",
    venueEn: m.stadiumEn || "Match Stadium",
    refereeRu: "Официальная бригада арбитров",
    refereeEn: "Official Match Referee",
    homeTeam: {
      id: m.homeTeam.nameEn,
      nameRu: m.homeTeam.nameRu,
      nameEn: m.homeTeam.nameEn,
      shortName: m.homeTeam.shortName,
      score: m.homeTeam.score,
      formation: "4-3-3",
      primaryColor: "#16A34A",
    },
    awayTeam: {
      id: m.awayTeam.nameEn,
      nameRu: m.awayTeam.nameRu,
      nameEn: m.awayTeam.nameEn,
      shortName: m.awayTeam.shortName,
      score: m.awayTeam.score,
      formation: "4-2-3-1",
      primaryColor: "#0284C7",
    },
    scorers: (m.events || [])
      .filter((ev) => ev.type === "goal")
      .map((ev) => ({
        minute: ev.minute,
        playerRu: ev.playerRu,
        playerEn: ev.playerEn,
        team: (ev.teamSide as "home" | "away") || "home",
      })),
    possessionHome: 53,
    xgHome: m.homeTeam.score > 0 ? (m.homeTeam.score * 0.82 + 0.4).toFixed(2) : "1.18",
    xgAway: m.awayTeam.score > 0 ? (m.awayTeam.score * 0.78 + 0.35).toFixed(2) : "0.94",
    shotsOnTargetHome: Math.max(3, m.homeTeam.score * 2 + 2),
    shotsOnTargetAway: Math.max(2, m.awayTeam.score * 2 + 2),
    telegramUrl: "https://t.me/futbolnaya_jara",
  };
});

const LIVE_CENTER_MATCHES: LiveCenterMatch[] = [
  ...REAL_SNAPSHOT_LIVE_MATCHES,
  {
    id: "ucl-rma-mci",
    competitionId: "UCL",
    stageRu: "1/4 финала • Ответный матч",
    stageEn: "Quarter-Final • Second Leg",
    status: "LIVE",
    minuteLabelRu: "LIVE 78'",
    minuteLabelEn: "LIVE 78'",
    venueRu: "Сантьяго Бернабеу, Мадрид",
    venueEn: "Santiago Bernabéu, Madrid",
    refereeRu: "Клеман Тюрпен (Франция)",
    refereeEn: "Clément Turpin (France)",
    homeTeam: {
      id: "real-madrid",
      nameRu: "Реал Мадрид",
      nameEn: "Real Madrid",
      shortName: "RMA",
      score: 3,
      formation: "4-3-1-2",
      primaryColor: "#16A34A",
    },
    awayTeam: {
      id: "man-city",
      nameRu: "Манчестер Сити",
      nameEn: "Manchester City",
      shortName: "MCI",
      score: 2,
      formation: "4-2-3-1",
      primaryColor: "#0284C7",
    },
    scorers: [
      {
        minute: "14'",
        playerRu: "Килиан Мбаппе",
        playerEn: "Kylian Mbappé",
        team: "home",
        noteRu: "пас Беллингема",
        noteEn: "ast. Bellingham",
      },
      {
        minute: "29'",
        playerRu: "Эрлинг Холанд",
        playerEn: "Erling Haaland",
        team: "away",
        noteRu: "пас Фодена",
        noteEn: "ast. Foden",
      },
      {
        minute: "52'",
        playerRu: "Фил Фоден",
        playerEn: "Phil Foden",
        team: "away",
      },
      {
        minute: "64'",
        playerRu: "Килиан Мбаппе",
        playerEn: "Kylian Mbappé",
        team: "home",
        noteRu: "пас Винисиуса",
        noteEn: "ast. Vinícius Jr.",
      },
      {
        minute: "76'",
        playerRu: "Килиан Мбаппе",
        playerEn: "Kylian Mbappé",
        team: "home",
        noteRu: "хет-трик • пас Вальверде",
        noteEn: "hat-trick • ast. Valverde",
      },
    ],
    possessionHome: 46,
    xgHome: "2.64",
    xgAway: "1.88",
    shotsOnTargetHome: 7,
    shotsOnTargetAway: 6,
    telegramUrl: "https://t.me/futbolnaya_jara/4821",
  },
  {
    id: "ucl-bay-psg",
    competitionId: "UCL",
    stageRu: "1/4 финала • Центральный матч",
    stageEn: "Quarter-Final • First Leg",
    status: "UPCOMING",
    minuteLabelRu: "22:00 МСК",
    minuteLabelEn: "22:00 CET",
    venueRu: "Альянц Арена, Мюнхен",
    venueEn: "Allianz Arena, Munich",
    refereeRu: "Даниэле Орсато (Италия)",
    refereeEn: "Daniele Orsato (Italy)",
    homeTeam: {
      id: "bayern",
      nameRu: "Бавария",
      nameEn: "Bayern Munich",
      shortName: "BAY",
      formation: "4-2-3-1",
      primaryColor: "#DC2626",
    },
    awayTeam: {
      id: "psg",
      nameRu: "Пари Сен-Жермен",
      nameEn: "Paris Saint-Germain",
      shortName: "PSG",
      formation: "4-3-3",
      primaryColor: "#1E3A8A",
    },
    scorers: [],
    possessionHome: 50,
    xgHome: "0.00",
    xgAway: "0.00",
    shotsOnTargetHome: 0,
    shotsOnTargetAway: 0,
    telegramUrl: "https://t.me/futbolnaya_jara/4832",
  },
  {
    id: "match-el-clasico",
    competitionId: "LA LIGA",
    stageRu: "Тур 28 • Эль-Класико",
    stageEn: "Matchday 28 • El Clásico",
    status: "LIVE",
    minuteLabelRu: "LIVE 87'",
    minuteLabelEn: "LIVE 87'",
    venueRu: "Сантьяго Бернабеу, Мадрид",
    venueEn: "Santiago Bernabéu, Madrid",
    refereeRu: "Хесус Хиль Мансано (Испания)",
    refereeEn: "Jesús Gil Manzano (Spain)",
    homeTeam: {
      id: "real-madrid",
      nameRu: "Реал Мадрид",
      nameEn: "Real Madrid",
      shortName: "RMA",
      score: 3,
      formation: "4-3-1-2",
      primaryColor: "#16A34A",
    },
    awayTeam: {
      id: "barcelona",
      nameRu: "Барселона",
      nameEn: "Barcelona",
      shortName: "BAR",
      score: 2,
      formation: "4-2-3-1",
      primaryColor: "#D97706",
    },
    scorers: [
      {
        minute: "14'",
        playerRu: "Килиан Мбаппе",
        playerEn: "Kylian Mbappé",
        team: "home",
        noteRu: "пас Беллингема",
        noteEn: "ast. Bellingham",
      },
      {
        minute: "29'",
        playerRu: "Ламин Ямаль",
        playerEn: "Lamine Yamal",
        team: "away",
        noteRu: "пас Педри",
        noteEn: "ast. Pedri",
      },
      {
        minute: "51'",
        playerRu: "Роберт Левандовски",
        playerEn: "Robert Lewandowski",
        team: "away",
        noteRu: "пас Ямаля",
        noteEn: "ast. Yamal",
      },
      {
        minute: "63'",
        playerRu: "Килиан Мбаппе",
        playerEn: "Kylian Mbappé",
        team: "home",
        noteRu: "пас Винисиуса",
        noteEn: "ast. Vinícius Jr.",
      },
      {
        minute: "79'",
        playerRu: "Килиан Мбаппе",
        playerEn: "Kylian Mbappé",
        team: "home",
        noteRu: "пас Вальверде",
        noteEn: "ast. Valverde",
      },
    ],
    possessionHome: 44,
    xgHome: "2.82",
    xgAway: "2.05",
    shotsOnTargetHome: 8,
    shotsOnTargetAway: 6,
    telegramUrl: "https://t.me/futbolnaya_jara",
  },
  {
    id: "laliga-bar-atm",
    competitionId: "LA LIGA",
    stageRu: "Тур 28 • Битва за лидерство",
    stageEn: "Matchday 28 • Title Six-Pointer",
    status: "LIVE",
    minuteLabelRu: "LIVE 64'",
    minuteLabelEn: "LIVE 64'",
    venueRu: "Олимпийский стадион Монжуик, Барселона",
    venueEn: "Estadi Olímpic Lluís Companys, Barcelona",
    refereeRu: "Хосе Мария Санчес Мартинес",
    refereeEn: "José María Sánchez Martínez",
    homeTeam: {
      id: "barcelona",
      nameRu: "Барселона",
      nameEn: "Barcelona",
      shortName: "BAR",
      score: 2,
      formation: "4-2-3-1",
      primaryColor: "#1D4ED8",
    },
    awayTeam: {
      id: "atletico",
      nameRu: "Атлетико Мадрид",
      nameEn: "Atlético Madrid",
      shortName: "ATM",
      score: 1,
      formation: "5-3-2",
      primaryColor: "#DC2626",
    },
    scorers: [
      {
        minute: "19'",
        playerRu: "Ламин Ямаль",
        playerEn: "Lamine Yamal",
        team: "home",
        noteRu: "пас Педри",
        noteEn: "ast. Pedri",
      },
      {
        minute: "38'",
        playerRu: "Хулиан Альварес",
        playerEn: "Julián Álvarez",
        team: "away",
      },
      {
        minute: "57'",
        playerRu: "Роберт Левандовски",
        playerEn: "Robert Lewandowski",
        team: "home",
        noteRu: "пас Рафиньи",
        noteEn: "ast. Raphinha",
      },
    ],
    possessionHome: 64,
    xgHome: "2.18",
    xgAway: "0.94",
    shotsOnTargetHome: 6,
    shotsOnTargetAway: 3,
    telegramUrl: "https://t.me/futbolnaya_jara/4824",
  },
  {
    id: "epl-ars-liv",
    competitionId: "EPL",
    stageRu: "Тур 29 • Битва за титул АПЛ",
    stageEn: "Matchday 29 • Premier League Title Clash",
    status: "LIVE",
    minuteLabelRu: "LIVE 83'",
    minuteLabelEn: "LIVE 83'",
    venueRu: "Эмирейтс, Лондон",
    venueEn: "Emirates Stadium, London",
    refereeRu: "Энтони Тейлор (Англия)",
    refereeEn: "Anthony Taylor (England)",
    homeTeam: {
      id: "arsenal",
      nameRu: "Арсенал",
      nameEn: "Arsenal",
      shortName: "ARS",
      score: 2,
      formation: "4-3-3",
      primaryColor: "#DC2626",
    },
    awayTeam: {
      id: "liverpool",
      nameRu: "Ливерпуль",
      nameEn: "Liverpool",
      shortName: "LIV",
      score: 2,
      formation: "4-2-3-1",
      primaryColor: "#0D9488",
    },
    scorers: [
      {
        minute: "9'",
        playerRu: "Букайо Сака",
        playerEn: "Bukayo Saka",
        team: "home",
        noteRu: "пас Эдегора",
        noteEn: "ast. Ødegaard",
      },
      {
        minute: "24'",
        playerRu: "Вирджил ван Дейк",
        playerEn: "Virgil van Dijk",
        team: "away",
        noteRu: "пас Александер-Арнольда",
        noteEn: "ast. Alexander-Arnold",
      },
      {
        minute: "43'",
        playerRu: "Кай Хаверц",
        playerEn: "Kai Havertz",
        team: "home",
        noteRu: "пас Райса",
        noteEn: "ast. Rice",
      },
      {
        minute: "69'",
        playerRu: "Мохамед Салах",
        playerEn: "Mohamed Salah",
        team: "away",
        noteRu: "пас Нуньеса",
        noteEn: "ast. Núñez",
      },
    ],
    possessionHome: 52,
    xgHome: "1.96",
    xgAway: "1.84",
    shotsOnTargetHome: 5,
    shotsOnTargetAway: 5,
    telegramUrl: "https://t.me/futbolnaya_jara/4829",
  },
  {
    id: "seriea-int-juv",
    competitionId: "SERIE A",
    stageRu: "Тур 29 • Дерби Италии",
    stageEn: "Matchday 29 • Derby d'Italia",
    status: "FT",
    minuteLabelRu: "ЗАВЕРШЕН • 90+4'",
    minuteLabelEn: "FULL TIME • 90+4'",
    venueRu: "Джузеппе Меацца (Сан-Сиро), Милан",
    venueEn: "San Siro (Giuseppe Meazza), Milan",
    refereeRu: "Марко Гуида (Италия)",
    refereeEn: "Marco Guida (Italy)",
    homeTeam: {
      id: "inter",
      nameRu: "Интер Милан",
      nameEn: "Inter Milan",
      shortName: "INT",
      score: 2,
      formation: "3-5-2",
      primaryColor: "#1D4ED8",
    },
    awayTeam: {
      id: "juventus",
      nameRu: "Ювентус",
      nameEn: "Juventus",
      shortName: "JUV",
      score: 0,
      formation: "4-2-3-1",
      primaryColor: "#334155",
    },
    scorers: [
      {
        minute: "34'",
        playerRu: "Лаутаро Мартинес",
        playerEn: "Lautaro Martínez",
        team: "home",
        noteRu: "пас Бареллы",
        noteEn: "ast. Barella",
      },
      {
        minute: "71'",
        playerRu: "Хакан Чалханоглу",
        playerEn: "Hakan Çalhanoğlu",
        team: "home",
        noteRu: "пенальти",
        noteEn: "penalty",
      },
    ],
    possessionHome: 56,
    xgHome: "2.12",
    xgAway: "0.73",
    shotsOnTargetHome: 6,
    shotsOnTargetAway: 2,
    telegramUrl: "https://t.me/futbolnaya_jara/4815",
  },
  {
    id: "saudi-nas-hil",
    competitionId: "SAUDI",
    stageRu: "Тур 25 • Дерби Эр-Рияда",
    stageEn: "Matchday 25 • Riyadh Derby",
    status: "LIVE",
    minuteLabelRu: "LIVE 51'",
    minuteLabelEn: "LIVE 51'",
    venueRu: "Аль-Авваль Парк, Эр-Рияд",
    venueEn: "Al-Awwal Park, Riyadh",
    refereeRu: "Шимон Марчиняк (Польша)",
    refereeEn: "Szymon Marciniak (Poland)",
    homeTeam: {
      id: "al-nassr",
      nameRu: "Аль-Наср",
      nameEn: "Al-Nassr",
      shortName: "NAS",
      score: 2,
      formation: "4-2-3-1",
      primaryColor: "#CA8A04",
    },
    awayTeam: {
      id: "al-hilal",
      nameRu: "Аль-Хиляль",
      nameEn: "Al-Hilal",
      shortName: "HIL",
      score: 1,
      formation: "4-3-3",
      primaryColor: "#2563EB",
    },
    scorers: [
      {
        minute: "19'",
        playerRu: "Криштиану Роналду",
        playerEn: "Cristiano Ronaldo",
        team: "home",
        noteRu: "пас Мане",
        noteEn: "ast. Mané",
      },
      {
        minute: "37'",
        playerRu: "Александар Митрович",
        playerEn: "Aleksandar Mitrović",
        team: "away",
      },
      {
        minute: "49'",
        playerRu: "Криштиану Роналду",
        playerEn: "Cristiano Ronaldo",
        team: "home",
        noteRu: "926-й гол в карьере",
        noteEn: "926th career goal",
      },
    ],
    possessionHome: 48,
    xgHome: "1.79",
    xgAway: "1.41",
    shotsOnTargetHome: 6,
    shotsOnTargetAway: 4,
    telegramUrl: "https://t.me/futbolnaya_jara/4830",
  },
];

export default function LiveMatchCenterPage() {
  const [lang, setLang] = useState<PortalLang>("ru");
  const [competitionFilter, setCompetitionFilter] = useState<"ALL" | CompetitionId>("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "LIVE" | "FT" | "UPCOMING">("ALL");
  const [spotlightMatchId, setSpotlightMatchId] = useState<string>("ucl-rma-mci");

  const isRu = lang === "ru";

  const filteredMatches = useMemo(() => {
    return LIVE_CENTER_MATCHES.filter((match) => {
      if (competitionFilter !== "ALL" && match.competitionId !== competitionFilter) {
        return false;
      }
      if (statusFilter !== "ALL") {
        if (statusFilter === "LIVE" && match.status !== "LIVE" && match.status !== "HT") {
          return false;
        }
        if (statusFilter === "FT" && match.status !== "FT") {
          return false;
        }
        if (statusFilter === "UPCOMING" && match.status !== "UPCOMING") {
          return false;
        }
      }
      return true;
    });
  }, [competitionFilter, statusFilter]);

  const spotlightMatch = useMemo(() => {
    return (
      LIVE_CENTER_MATCHES.find((m) => m.id === spotlightMatchId) ||
      LIVE_CENTER_MATCHES[0]
    );
  }, [spotlightMatchId]);

  const pitchInput: TacticalPitchMatchInput = useMemo(() => {
    const isEpl = spotlightMatch.id === "epl-ars-liv";
    return {
      id: spotlightMatch.id,
      league: {
        ru: `${COMPETITION_META[spotlightMatch.competitionId].titleRu} • ${spotlightMatch.stageRu}`,
        en: `${COMPETITION_META[spotlightMatch.competitionId].titleEn} • ${spotlightMatch.stageEn}`,
      },
      status: spotlightMatch.status,
      minute: isRu ? spotlightMatch.minuteLabelRu : spotlightMatch.minuteLabelEn,
      homeTeam: {
        name: {
          ru: spotlightMatch.homeTeam.nameRu,
          en: spotlightMatch.homeTeam.nameEn,
        },
        shortName: spotlightMatch.homeTeam.shortName,
        logoUrl:
          getClubLogoUrl(
            spotlightMatch.homeTeam.id,
            spotlightMatch.homeTeam.nameEn,
            spotlightMatch.homeTeam.nameRu
          ) || undefined,
        primaryColor: spotlightMatch.homeTeam.primaryColor,
        score: spotlightMatch.homeTeam.score ?? 0,
        formation: spotlightMatch.homeTeam.formation,
      },
      awayTeam: {
        name: {
          ru: spotlightMatch.awayTeam.nameRu,
          en: spotlightMatch.awayTeam.nameEn,
        },
        shortName: spotlightMatch.awayTeam.shortName,
        logoUrl:
          getClubLogoUrl(
            spotlightMatch.awayTeam.id,
            spotlightMatch.awayTeam.nameEn,
            spotlightMatch.awayTeam.nameRu
          ) || undefined,
        primaryColor: spotlightMatch.awayTeam.primaryColor,
        score: spotlightMatch.awayTeam.score ?? 0,
        formation: spotlightMatch.awayTeam.formation,
      },
      homeLineup: isEpl ? ARSENAL_LINEUP : REAL_MADRID_LINEUP,
      awayLineup: isEpl ? LIVERPOOL_LINEUP : BARCELONA_LINEUP,
    };
  }, [spotlightMatch, isRu]);

  const spotlightSubstitutions: SubstitutionBroadcastEvent[] = useMemo(() => {
    if (spotlightMatch.id === "epl-ars-liv") {
      return [
        {
          id: "sub-ars-liv-trossard",
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
              ru: "ПЕРЕГРУЗ ЛЕВОГО ПОЛУФЛАНГА",
              en: "LEFT HALF-SPACE OVERLOAD",
            },
          },
          playerOut: {
            name: { ru: "Габриэл Мартинелли", en: "Gabriel Martinelli" },
            number: 11,
            position: "FWD",
            fotmobId: 1021586,
            rating: 7.4,
            achievementBadge: {
              ru: "4 УСПЕШНЫХ ОБВОДКИ • 72 МИНУТЫ",
              en: "4 COMPLETED DRIBBLES • 72 MINS",
            },
          },
          reason: {
            ru: "Тактическая ротация Микеля Артеты для комбинаций в штрафной",
            en: "Mikel Arteta tactical tweak for tight-space box combinations",
          },
          tacticalNote: {
            ru: "Троссард смещается между линиями и открывает коридор для подключений Деклана Райса вторым темпом.",
            en: "Trossard drifts inside the channel to create a passing lane for Declan Rice's late box arrivals.",
          },
        },
      ];
    }
    return [];
  }, [spotlightMatch.id]);

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
      {/* Top Editorial Navigation Bar */}
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
                  ? "Матч-центр и живая статистика"
                  : "Live Match Center & Tactical Hub"}
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
                href: "/news/mbappe-el-clasico-hat-trick-endrick-cameo-bernabeu",
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
                  transition: "background-color 0.15s ease",
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
                  boxShadow:
                    lang === "ru" ? "0 1px 2px rgba(15, 23, 42, 0.08)" : "none",
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
                  boxShadow:
                    lang === "en" ? "0 1px 2px rgba(15, 23, 42, 0.08)" : "none",
                }}
              >
                EN
              </button>
            </div>

            <a
              href="https://t.me/futbolnaya_jara"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                backgroundColor: "#EA580C",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "12px",
                padding: "8px 14px",
                borderRadius: "8px",
                whiteSpace: "nowrap",
              }}
            >
              @futbolnaya_jara
            </a>
          </div>
        </div>
      </header>

      {/* Live Score Ticker Strip */}
      <LiveScoreTicker
        lang={lang}
        selectedMatchId={spotlightMatchId}
        onSelectMatch={(m) => setSpotlightMatchId(m.id)}
      />

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
        {/* Top Leaderboard Ad Banner Slot */}
        <aside
          aria-label="Sponsored Leaderboard"
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
                textTransform: "uppercase",
                color: "#64748B",
                border: "1px solid #CBD5E1",
                borderRadius: "4px",
                padding: "3px 7px",
                backgroundColor: "#F8FAFC",
              }}
            >
              {isRu ? "РЕКЛАМНЫЙ СЛОТ • 728x90" : "AD SLOT • 728x90 LEADERBOARD"}
            </span>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 800, color: "#0F172A" }}>
                {isRu
                  ? "GOLASON PRO и Telegram-канал «Футбольная Жара» — прямые видео голов за 25 секунд"
                  : "GOLASON PRO x @futbolnaya_jara — Instant 1080p Goal Replays Within 25 Seconds"}
              </div>
              <div style={{ fontSize: "12px", color: "#64748B", marginTop: "2px" }}>
                {isRu
                  ? "Подпишитесь на официальный канал и получайте пуш-уведомления о стартовых составах и голах"
                  : "Subscribe to our verified broadcast feed for starting XIs, xG telemetry, and goal clips"}
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
              whiteSpace: "nowrap",
            }}
          >
            {isRu ? "Перейти в Telegram →" : "Open Telegram Feed →"}
          </a>
        </aside>

        {/* Page Title & Filter Bar */}
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
                  ? "Live Матч-центр: табло, авторы голов и тактические обзоры"
                  : "Live Match Center: Scores, Goal Timelines & Tactical Reports"}
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
                  ? "Все матчи дня сгруппированы по турнирам. Переходите в карточку любого матча для просмотра стартовых составов Sofascore, хронологии событий и видеоповторов."
                  : "All fixtures grouped by competition. Open any match report for full Sofascore tactical formations, key events timeline, and instant highlight clips."}
              </p>
            </div>

            {/* Status Filter Buttons */}
            <div
              role="group"
              aria-label="Filter matches by status"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                flexWrap: "wrap",
              }}
            >
              {(
                [
                  { id: "ALL", labelRu: "Все матчи", labelEn: "All Matches" },
                  { id: "LIVE", labelRu: "В эфире (LIVE)", labelEn: "Live Now" },
                  { id: "FT", labelRu: "Завершенные", labelEn: "Finished" },
                  { id: "UPCOMING", labelRu: "Скоро", labelEn: "Upcoming" },
                ] as const
              ).map((st) => {
                const active = statusFilter === st.id;
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setStatusFilter(st.id)}
                    style={{
                      padding: "7px 12px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: active ? 800 : 600,
                      cursor: "pointer",
                      border: active ? "1px solid #EA580C" : "1px solid #E2E8F0",
                      backgroundColor: active ? "#FFF7ED" : "#F8FAFC",
                      color: active ? "#C2410C" : "#475569",
                    }}
                  >
                    {isRu ? st.labelRu : st.labelEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Competition Filter Pills */}
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
            <button
              type="button"
              onClick={() => setCompetitionFilter("ALL")}
              style={{
                padding: "7px 14px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: competitionFilter === "ALL" ? 800 : 600,
                cursor: "pointer",
                border:
                  competitionFilter === "ALL"
                    ? "1px solid #0F172A"
                    : "1px solid #E2E8F0",
                backgroundColor:
                  competitionFilter === "ALL" ? "#0F172A" : "#FFFFFF",
                color: competitionFilter === "ALL" ? "#FFFFFF" : "#334155",
              }}
            >
              {isRu ? "Все турниры (5)" : "All Competitions (5)"}
            </button>
            {COMPETITION_ORDER.map((compId) => {
              const comp = COMPETITION_META[compId];
              const active = competitionFilter === compId;
              return (
                <button
                  key={compId}
                  type="button"
                  onClick={() => setCompetitionFilter(compId)}
                  style={{
                    padding: "7px 14px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: active ? 800 : 600,
                    cursor: "pointer",
                    border: active ? "1px solid #0F172A" : "1px solid #E2E8F0",
                    backgroundColor: active ? "#0F172A" : "#FFFFFF",
                    color: active ? "#FFFFFF" : "#334155",
                  }}
                >
                  {isRu ? comp.titleRu : comp.titleEn}
                </button>
              );
            })}
          </div>
        </section>

        {/* Matches Grouped by Competition */}
        {COMPETITION_ORDER.map((compId) => {
          const compMatches = filteredMatches.filter(
            (m) => m.competitionId === compId
          );
          if (compMatches.length === 0) return null;
          const compMeta = COMPETITION_META[compId];

          return (
            <section
              key={compId}
              aria-label={isRu ? compMeta.titleRu : compMeta.titleEn}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {/* Competition Group Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  padding: "12px 18px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 900,
                      letterSpacing: "0.06em",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      backgroundColor: "#F1F5F9",
                      color: "#0F172A",
                      border: "1px solid #CBD5E1",
                    }}
                  >
                    {compMeta.code}
                  </span>
                  <div>
                    <h2
                      style={{
                        margin: 0,
                        fontSize: "17px",
                        fontWeight: 900,
                        color: "#0F172A",
                      }}
                    >
                      {isRu ? compMeta.titleRu : compMeta.titleEn}
                    </h2>
                    <div style={{ fontSize: "12px", color: "#64748B" }}>
                      {isRu ? compMeta.subtitleRu : compMeta.subtitleEn}
                    </div>
                  </div>
                </div>

                <Link
                  href="/standings"
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#EA580C",
                    textDecoration: "none",
                  }}
                >
                  {isRu ? "Таблица турнира →" : "Standings Table →"}
                </Link>
              </div>

              {/* Competition Match Cards Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(min(100%, 420px), 1fr))",
                  gap: "16px",
                }}
              >
                {compMatches.map((match) => {
                  const isLive = match.status === "LIVE" || match.status === "HT";
                  const isUpcoming = match.status === "UPCOMING";
                  const homeScorers = match.scorers.filter((s) => s.team === "home");
                  const awayScorers = match.scorers.filter((s) => s.team === "away");

                  return (
                    <article
                      key={match.id}
                      style={{
                        backgroundColor: "#FFFFFF",
                        border:
                          spotlightMatchId === match.id
                            ? "1px solid #EA580C"
                            : "1px solid #E2E8F0",
                        borderRadius: "14px",
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        gap: "16px",
                        boxShadow: "0 2px 10px rgba(15, 23, 42, 0.04)",
                      }}
                    >
                      {/* Top Bar: Stage + Minute Badge */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "10px",
                          paddingBottom: "12px",
                          borderBottom: "1px solid #E2E8F0",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "#64748B",
                          }}
                        >
                          {isRu ? match.stageRu : match.stageEn}
                        </span>

                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "11px",
                            fontWeight: 800,
                            padding: "4px 10px",
                            borderRadius: "999px",
                            backgroundColor: isLive
                              ? "#FEF2F2"
                              : isUpcoming
                              ? "#EFF6FF"
                              : "#F1F5F9",
                            color: isLive
                              ? "#DC2626"
                              : isUpcoming
                              ? "#1D4ED8"
                              : "#475569",
                            border: isLive
                              ? "1px solid #FECACA"
                              : isUpcoming
                              ? "1px solid #BFDBFE"
                              : "1px solid #CBD5E1",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          {isLive && (
                            <span
                              style={{
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                backgroundColor: "#DC2626",
                              }}
                            />
                          )}
                          {isRu ? match.minuteLabelRu : match.minuteLabelEn}
                        </span>
                      </div>

                      {/* Teams & Scoreboard */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr auto 1fr",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        {/* Home Team */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <ClubLogo
                            teamId={match.homeTeam.id}
                            teamName={match.homeTeam.nameEn}
                            teamNameRu={match.homeTeam.nameRu}
                            size={40}
                          />
                          <div>
                            <div
                              style={{
                                fontSize: "15px",
                                fontWeight: 800,
                                color: "#0F172A",
                                lineHeight: 1.25,
                              }}
                            >
                              {isRu
                                ? match.homeTeam.nameRu
                                : match.homeTeam.nameEn}
                            </div>
                            <div
                              style={{
                                fontSize: "11px",
                                color: "#64748B",
                                fontWeight: 600,
                                marginTop: "2px",
                              }}
                            >
                              {match.homeTeam.formation}
                            </div>
                          </div>
                        </div>

                        {/* Center Score */}
                        <div
                          style={{
                            backgroundColor: "#F8FAFC",
                            border: "1px solid #E2E8F0",
                            borderRadius: "10px",
                            padding: "8px 16px",
                            fontSize: "22px",
                            fontWeight: 900,
                            color: "#0F172A",
                            fontVariantNumeric: "tabular-nums",
                            textAlign: "center",
                            minWidth: "78px",
                          }}
                        >
                          {isUpcoming
                            ? "vs"
                            : `${match.homeTeam.score ?? 0} : ${match.awayTeam.score ?? 0}`}
                        </div>

                        {/* Away Team */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            gap: "10px",
                            textAlign: "right",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                fontSize: "15px",
                                fontWeight: 800,
                                color: "#0F172A",
                                lineHeight: 1.25,
                              }}
                            >
                              {isRu
                                ? match.awayTeam.nameRu
                                : match.awayTeam.nameEn}
                            </div>
                            <div
                              style={{
                                fontSize: "11px",
                                color: "#64748B",
                                fontWeight: 600,
                                marginTop: "2px",
                              }}
                            >
                              {match.awayTeam.formation}
                            </div>
                          </div>
                          <ClubLogo
                            teamId={match.awayTeam.id}
                            teamName={match.awayTeam.nameEn}
                            teamNameRu={match.awayTeam.nameRu}
                            size={40}
                          />
                        </div>
                      </div>

                      {/* Goal Scorers List */}
                      {match.scorers.length > 0 ? (
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "12px",
                            backgroundColor: "#F8FAFC",
                            border: "1px solid #E2E8F0",
                            borderRadius: "10px",
                            padding: "10px 12px",
                            fontSize: "12px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "4px",
                            }}
                          >
                            {homeScorers.map((sc, i) => (
                              <div key={i} style={{ color: "#334155" }}>
                                <strong
                                  style={{
                                    color: "#EA580C",
                                    fontVariantNumeric: "tabular-nums",
                                  }}
                                >
                                  {sc.minute}
                                </strong>{" "}
                                <span style={{ fontWeight: 700 }}>
                                  {isRu ? sc.playerRu : sc.playerEn}
                                </span>
                                {(sc.noteRu || sc.noteEn) && (
                                  <span style={{ color: "#64748B", fontSize: "11px" }}>
                                    {" "}
                                    ({isRu ? sc.noteRu : sc.noteEn})
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "4px",
                              textAlign: "right",
                            }}
                          >
                            {awayScorers.map((sc, i) => (
                              <div key={i} style={{ color: "#334155" }}>
                                <span style={{ fontWeight: 700 }}>
                                  {isRu ? sc.playerRu : sc.playerEn}
                                </span>{" "}
                                <strong
                                  style={{
                                    color: "#EA580C",
                                    fontVariantNumeric: "tabular-nums",
                                  }}
                                >
                                  {sc.minute}
                                </strong>
                                {(sc.noteRu || sc.noteEn) && (
                                  <span style={{ color: "#64748B", fontSize: "11px" }}>
                                    {" "}
                                    ({isRu ? sc.noteRu : sc.noteEn})
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div
                          style={{
                            backgroundColor: "#F8FAFC",
                            border: "1px solid #E2E8F0",
                            borderRadius: "10px",
                            padding: "10px 12px",
                            fontSize: "12px",
                            color: "#64748B",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>{isRu ? match.venueRu : match.venueEn}</span>
                          <span>
                            {isRu
                              ? "Стартовые составы за 60 мин до игры"
                              : "Starting XIs confirmed 60m before kickoff"}
                          </span>
                        </div>
                      )}

                      {/* Quick Telemetry Strip */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "8px",
                          fontSize: "11.5px",
                          color: "#64748B",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        <span>
                          xG:{" "}
                          <strong style={{ color: "#0F172A" }}>
                            {match.xgHome} — {match.xgAway}
                          </strong>
                        </span>
                        <span>
                          {isRu ? "Владение:" : "Possession:"}{" "}
                          <strong style={{ color: "#0F172A" }}>
                            {match.possessionHome}% / {100 - match.possessionHome}%
                          </strong>
                        </span>
                        <span>
                          {isRu ? "Удары в створ:" : "Shots on target:"}{" "}
                          <strong style={{ color: "#0F172A" }}>
                            {match.shotsOnTargetHome} : {match.shotsOnTargetAway}
                          </strong>
                        </span>
                      </div>

                      {/* Primary Action Link to /matches/[id] + Tactical Spotlight Trigger */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          paddingTop: "8px",
                          borderTop: "1px solid #E2E8F0",
                          flexWrap: "wrap",
                        }}
                      >
                        <Link
                          href={`/matches/${match.id}`}
                          style={{
                            flex: "1 1 auto",
                            textAlign: "center",
                            textDecoration: "none",
                            backgroundColor: "#0F172A",
                            color: "#FFFFFF",
                            fontWeight: 800,
                            fontSize: "12.5px",
                            padding: "10px 14px",
                            borderRadius: "8px",
                          }}
                        >
                          {isRu
                            ? "Смотреть составы, статистику и обзор матча →"
                            : "Смотреть составы, статистику и обзор матча →"}
                        </Link>

                        <button
                          type="button"
                          onClick={() => setSpotlightMatchId(match.id)}
                          style={{
                            padding: "10px 12px",
                            borderRadius: "8px",
                            border: "1px solid #CBD5E1",
                            backgroundColor:
                              spotlightMatchId === match.id ? "#FFF7ED" : "#FFFFFF",
                            color:
                              spotlightMatchId === match.id ? "#C2410C" : "#334155",
                            fontSize: "12px",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          {isRu ? "На схему ↓" : "Pitch View ↓"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* Embedded TacticalPitch & SubstitutionCard Spotlight */}
        <section
          id="live-tactical-spotlight"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: "16px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "22px",
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
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "clamp(20px, 2.5vw, 26px)",
                  fontWeight: 900,
                  color: "#0F172A",
                }}
              >
                {isRu
                  ? `Тактический фокус: ${spotlightMatch.homeTeam.nameRu} — ${spotlightMatch.awayTeam.nameRu}`
                  : `Tactical Spotlight: ${spotlightMatch.homeTeam.nameEn} vs ${spotlightMatch.awayTeam.nameEn}`}
              </h2>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: "13px",
                  color: "#64748B",
                }}
              >
                {isRu
                  ? "Интерактивная расстановка Sofascore и ключевые замены выбранного матча"
                  : "Interactive Sofascore tactical pitch and broadcast substitution breakdown"}
              </p>
            </div>

            <Link
              href={`/matches/${spotlightMatch.id}`}
              style={{
                textDecoration: "none",
                backgroundColor: "#EA580C",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "13px",
                padding: "10px 16px",
                borderRadius: "8px",
              }}
            >
              {isRu
                ? "Открыть полный отчет о матче →"
                : "Open Dedicated Match Report →"}
            </Link>
          </div>

          <TacticalPitch match={pitchInput} lang={lang} />
          <SubstitutionCard
            substitutions={
              spotlightSubstitutions.length > 0 ? spotlightSubstitutions : undefined
            }
            homeTeam={{
              name: {
                ru: spotlightMatch.homeTeam.nameRu,
                en: spotlightMatch.homeTeam.nameEn,
              },
              shortName: spotlightMatch.homeTeam.shortName,
              logoUrl:
                getClubLogoUrl(
                  spotlightMatch.homeTeam.id,
                  spotlightMatch.homeTeam.nameEn,
                  spotlightMatch.homeTeam.nameRu
                ) || undefined,
              score: spotlightMatch.homeTeam.score ?? 0,
            }}
            awayTeam={{
              name: {
                ru: spotlightMatch.awayTeam.nameRu,
                en: spotlightMatch.awayTeam.nameEn,
              },
              shortName: spotlightMatch.awayTeam.shortName,
              logoUrl:
                getClubLogoUrl(
                  spotlightMatch.awayTeam.id,
                  spotlightMatch.awayTeam.nameEn,
                  spotlightMatch.awayTeam.nameRu
                ) || undefined,
              score: spotlightMatch.awayTeam.score ?? 0,
            }}
            lang={lang}
          />
        </section>
      </main>
    </div>
  );
}
