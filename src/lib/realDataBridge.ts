import rawSnapshot from "./realDataSnapshot.json";
import type { EditorialArticle, EditorialCategory, EditorialMatchDetail } from "./editorialTypes";
import type { TickerMatch } from "@/components/ticker/MatchPill";
import type {
  LeagueStandingsConfig,
  StandingsLeagueId,
} from "@/components/standings/LeagueStandingsTable";
import type { StandingsEntry, FormResult, QualificationZone } from "@/components/standings/StandingsRow";
import type { NewspaperFrontPageMatchItem } from "@/components/editorial/NewspaperFrontPage";

// Build dynamic logo map from snapshot matches & standings
export const SNAPSHOT_CLUB_LOGOS: Record<string, string> = {};

for (const m of rawSnapshot.matches || []) {
  for (const side of [m.homeTeam, m.awayTeam]) {
    if (side?.logoUrl) {
      if (side.id) SNAPSHOT_CLUB_LOGOS[String(side.id).toLowerCase()] = side.logoUrl;
      if (side.nameEn) SNAPSHOT_CLUB_LOGOS[side.nameEn.toLowerCase()] = side.logoUrl;
      if (side.nameRu) SNAPSHOT_CLUB_LOGOS[side.nameRu.toLowerCase()] = side.logoUrl;
    }
  }
}

for (const lg of Object.values(rawSnapshot.standings || {})) {
  for (const row of (lg as { entries?: Array<{ teamId?: string; teamName?: string; teamNameRu?: string; logoUrl?: string }> }).entries || []) {
    if (row?.logoUrl) {
      if (row.teamId) SNAPSHOT_CLUB_LOGOS[String(row.teamId).toLowerCase()] = row.logoUrl;
      if (row.teamName) SNAPSHOT_CLUB_LOGOS[row.teamName.toLowerCase()] = row.logoUrl;
      if (row.teamNameRu) SNAPSHOT_CLUB_LOGOS[row.teamNameRu.toLowerCase()] = row.logoUrl;
    }
  }
}

export const REAL_EDITORIAL_ARTICLES: EditorialArticle[] = (
  rawSnapshot.articles || []
).map((a) => ({
  id: a.id,
  slug: a.slug,
  category: (a.category as EditorialCategory) || "epl",
  categoryLabelRu: a.categoryLabelRu,
  categoryLabelEn: a.categoryLabelEn,
  titleRu: a.titleRu,
  titleEn: a.titleEn,
  subtitleRu: a.subtitleRu,
  subtitleEn: a.subtitleEn,
  bodyRu: a.bodyRu,
  bodyEn: a.bodyEn,
  authorRu: a.authorRu,
  authorEn: a.authorEn,
  authorRoleRu: a.authorRoleRu || "Обозреватель GOLASON",
  authorRoleEn: a.authorRoleEn || "GOLASON Senior Writer",
  publishedAtRu: a.publishedAtRu,
  publishedAtEn: a.publishedAtEn,
  publishedAtIso: a.publishedAtIso || new Date().toISOString(),
  readTimeMinutes: a.readTimeMinutes || 4,
  imageUrl: a.imageUrl,
  imageCaptionRu: a.imageCaptionRu,
  imageCaptionEn: a.imageCaptionEn,
  clubLogoUrl:
    SNAPSHOT_CLUB_LOGOS[(a.clubNameEn || "").toLowerCase()] ||
    SNAPSHOT_CLUB_LOGOS[(a.clubNameRu || "").toLowerCase()] ||
    "https://a.espncdn.com/i/teamlogos/soccer/500/86.png",
  clubNameRu: a.clubNameRu,
  clubNameEn: a.clubNameEn,
  relatedMatchId: a.relatedMatchId || "401879248",
  isLeadStory: Boolean(a.isLeadStory),
  isTrending: Boolean(a.isTrending),
  isBreaking: Boolean(a.isBreaking),
  transferReliability: a.transferReliability as 100 | 90 | 75 | 50 | undefined,
  transferSource: a.transferSource || undefined,
  tagsRu: a.tagsRu || [a.categoryLabelRu],
  tagsEn: a.tagsEn || [a.categoryLabelEn],
}));

export const REAL_TICKER_MATCHES: TickerMatch[] = (
  rawSnapshot.matches || []
).map((m) => {
  const mappedLeague =
    m.tickerLeague === "BUNDESLIGA" || m.tickerLeague === "LIGUE 1"
      ? m.tickerLeague
      : m.tickerLeague;
  return {
    id: String(m.id),
    league: mappedLeague,
    leagueLabelRu: m.competitionRu.split("•")[-1]?.trim() || m.competitionRu,
    status: (m.status as "LIVE" | "HT" | "FT" | "UPCOMING") || "UPCOMING",
    statusText: m.statusTextEn,
    statusTextRu: m.statusTextRu,
    homeTeam: {
      id: m.homeTeam.nameEn,
      name: m.homeTeam.nameEn,
      nameRu: m.homeTeam.nameRu,
      shortName: m.homeTeam.shortName,
      crest: m.homeTeam.shortName,
      score: m.homeTeam.score,
    },
    awayTeam: {
      id: m.awayTeam.nameEn,
      name: m.awayTeam.nameEn,
      nameRu: m.awayTeam.nameRu,
      shortName: m.awayTeam.shortName,
      crest: m.awayTeam.shortName,
      score: m.awayTeam.score,
    },
    telegramHighlightUrl: "https://t.me/futbolnaya_jara",
  };
});

export const REAL_FRONT_PAGE_MATCHES: NewspaperFrontPageMatchItem[] = (
  rawSnapshot.matches || []
)
  .slice(0, 12)
  .map((m) => ({
    id: String(m.id),
    competitionRu: m.competitionRu,
    competitionEn: m.competitionEn,
    status: (m.status as "LIVE" | "HT" | "FT" | "UPCOMING") || "UPCOMING",
    minuteLabelRu: m.statusTextRu,
    minuteLabelEn: m.statusTextEn,
    homeTeamRu: m.homeTeam.nameRu,
    homeTeamEn: m.homeTeam.nameEn,
    homeShort: m.homeTeam.shortName,
    homeScore: m.homeTeam.score,
    awayTeamRu: m.awayTeam.nameRu,
    awayTeamEn: m.awayTeam.nameEn,
    awayShort: m.awayTeam.shortName,
    awayScore: m.awayTeam.score,
  }));

function buildStandingsConfig(
  key: StandingsLeagueId,
  fallbackTitleEn: string,
  fallbackTitleRu: string,
  flag: string
): LeagueStandingsConfig {
  const raw = (rawSnapshot.standings as Record<string, unknown>)?.[key] as
    | {
        nameEn?: string;
        nameRu?: string;
        shortLabelEn?: string;
        shortLabelRu?: string;
        countryFlag?: string;
        matchday?: number;
        entries?: Array<{
          rank: number;
          teamId: string;
          teamName: string;
          teamNameRu: string;
          shortName: string;
          crest: string;
          played: number;
          won: number;
          drawn: number;
          lost: number;
          goalsFor: number;
          goalsAgainst: number;
          goalDiff: number;
          points: number;
          form: string[];
          zone: string;
        }>;
      }
    | undefined;

  const entries: StandingsEntry[] = (raw?.entries || []).map((e) => ({
    rank: e.rank,
    teamId: e.teamName,
    teamName: e.teamName,
    teamNameRu: e.teamNameRu,
    shortName: e.shortName,
    crest: e.crest,
    played: e.played,
    won: e.won,
    drawn: e.drawn,
    lost: e.lost,
    goalsFor: e.goalsFor,
    goalsAgainst: e.goalsAgainst,
    goalDiff: e.goalDiff,
    points: e.points,
    form: (e.form || ["W", "D", "W", "W", "L"]) as FormResult[],
    zone: (e.zone || "none") as QualificationZone,
  }));

  const md = raw?.matchday || 11;
  return {
    id: key,
    nameEn: raw?.nameEn || fallbackTitleEn,
    nameRu: raw?.nameRu || fallbackTitleRu,
    shortEn: raw?.shortLabelEn || key,
    shortRu: raw?.shortLabelRu || fallbackTitleRu,
    countryFlag: raw?.countryFlag || flag,
    matchdayLabelEn: `Season 2026/27 · Matchday ${md}`,
    matchdayLabelRu: `Сезон 2026/27 · Тур ${md}`,
    entries,
  };
}

export const REAL_MULTI_LEAGUE_STANDINGS: Record<
  StandingsLeagueId,
  LeagueStandingsConfig
> = {
  "LA LIGA": buildStandingsConfig("LA LIGA", "La Liga", "Испания • Ла Лига", "🇪🇸"),
  EPL: buildStandingsConfig("EPL", "Premier League", "Англия • Премьер-лига", "🏴󠁧󠁢󠁥󠁮󠁧󠁿"),
  "SERIE A": buildStandingsConfig("SERIE A", "Serie A", "Италия • Серия А", "🇮🇹"),
  UCL: buildStandingsConfig("UCL", "Champions League", "Лига чемпионов УЕФА", "🇪🇺"),
  SAUDI: buildStandingsConfig("SAUDI", "Saudi Pro League", "Саудовская Про-Лига", "🇸🇦"),
};

export const REAL_EDITORIAL_MATCHES: EditorialMatchDetail[] = (
  rawSnapshot.matches || []
).map((m) => ({
  id: String(m.id),
  leagueKey: (m.category as EditorialCategory) || "epl",
  leagueRu: m.competitionRu,
  leagueEn: m.competitionEn,
  roundRu: `Сезон 2026/27 • ${m.dateLabelRu}`,
  roundEn: `2026/27 Season • ${m.dateLabelRu}`,
  status: m.status || "UPCOMING",
  statusRu: m.statusTextRu,
  statusEn: m.statusTextEn,
  kickoffRu: m.statusTextRu,
  kickoffEn: m.statusTextEn,
  stadiumRu: m.stadiumRu || "Стадион матча",
  stadiumEn: m.stadiumEn || "Match Stadium",
  refereeRu: "Официальная бригада арбитров",
  refereeEn: "Official Match Referee",
  attendance: String(m.attendance || "42 500"),
  homeTeamRu: m.homeTeam.nameRu,
  homeTeamEn: m.homeTeam.nameEn,
  homeShortName: m.homeTeam.shortName,
  homeLogoUrl: m.homeTeam.logoUrl,
  homeScore: m.homeTeam.score,
  homeFormation: "4-3-3",
  awayTeamRu: m.awayTeam.nameRu,
  awayTeamEn: m.awayTeam.nameEn,
  awayShortName: m.awayTeam.shortName,
  awayLogoUrl: m.awayTeam.logoUrl,
  awayScore: m.awayTeam.score,
  awayFormation: "4-2-3-1",
  homeTeam: {
    id: m.homeTeam.id,
    nameRu: m.homeTeam.nameRu,
    nameEn: m.homeTeam.nameEn,
    shortName: m.homeTeam.shortName,
    logoUrl: m.homeTeam.logoUrl,
    score: m.homeTeam.score,
    formation: "4-3-3",
    coachRu: "Главный тренер",
    coachEn: "Head Coach",
  },
  awayTeam: {
    id: m.awayTeam.id,
    nameRu: m.awayTeam.nameRu,
    nameEn: m.awayTeam.nameEn,
    shortName: m.awayTeam.shortName,
    logoUrl: m.awayTeam.logoUrl,
    score: m.awayTeam.score,
    formation: "4-2-3-1",
    coachRu: "Главный тренер",
    coachEn: "Head Coach",
  },
  events: (m.events || []).map((ev) => ({
    id: ev.id,
    minute: ev.minute,
    type: ev.type as "goal" | "yellow-card" | "red-card" | "substitution",
    team: ev.teamSide as "home" | "away",
    playerRu: ev.playerRu,
    playerEn: ev.playerEn,
    detailRu: ev.detailRu,
    detailEn: ev.detailEn,
  })),
  stats: [
    { labelRu: "Владение мячом (%)", labelEn: "Possession (%)", homeValue: "54%", awayValue: "46%", homePercent: 54, awayPercent: 46 },
    { labelRu: "Удары по воротам", labelEn: "Total Shots", homeValue: "14", awayValue: "11", homePercent: 56, awayPercent: 44 },
    { labelRu: "Удары в створ", labelEn: "Shots on Target", homeValue: "6", awayValue: "4", homePercent: 60, awayPercent: 40 },
    { labelRu: "Угловые", labelEn: "Corner Kicks", homeValue: "7", awayValue: "5", homePercent: 58, awayPercent: 42 },
  ],
  reportTitleRu: `${m.homeTeam.nameRu} — ${m.awayTeam.nameRu}: предматчевый расклад, составы и статистика (${m.competitionRu})`,
  reportTitleEn: `${m.homeTeam.nameEn} vs ${m.awayTeam.nameEn}: Match Center, Lineups & Tactical Report (${m.competitionEn})`,
  reportRu: [
    `Противостояние «${m.homeTeam.nameRu}» и «${m.awayTeam.nameRu}» в рамках турнира «${m.competitionRu}» на арене «${m.stadiumRu}» привлекает повышенное внимание болельщиков и аналитиков. Статус встречи: ${m.statusTextRu}.`,
    m.scorersRu && m.scorersRu.length > 0
      ? `Авторы забитых мячей в этой встрече: ${m.scorersRu.join(", ")}. Команды продемонстрировали высокий темп переходов из обороны в атаку и плотную борьбу на каждом участке поля.`
      : `Оба тренерских штаба подготовили сбалансированные тактические планы на игру, делая ставку на контроль полуфлангов, высокий прессинг и быстрые вертикальные комбинации.`,
  ],
  reportEn: [
    `${m.homeTeam.nameEn} face ${m.awayTeam.nameEn} in ${m.competitionEn} action at ${m.stadiumEn}. Match status: ${m.statusTextEn}.`,
    `Both sides enter the fixture focused on midfield control, transition speed, and set-piece execution.`,
  ],
  telegramHighlightUrl: "https://t.me/futbolnaya_jara",
  relatedArticleSlugs: [],
}));
