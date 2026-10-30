import { MOCK_MATCHES, REAL_MADRID_LINEUP, BARCELONA_LINEUP } from './mockData';
import {
  BilingualText,
  FutbolnayaJaraMatchState,
  FutbolnayaJaraStateFile,
  LeagueKey,
  LiveFeedResult,
  MatchItem,
  MatchScorerEvent,
  MatchStatus,
} from './types';

interface NodeFsPromises {
  readFile(path: string, encoding: 'utf-8'): Promise<string>;
}

async function readServerTextFile(filePath: string): Promise<string | null> {
  try {
    const dynamicImporter = new Function('specifier', 'return import(specifier)') as (
      specifier: string
    ) => Promise<NodeFsPromises>;
    const fsPromises = await dynamicImporter('node:fs/promises');
    return await fsPromises.readFile(filePath, 'utf-8');
  } catch {
    return null;
  }
}

export const DEFAULT_TRACKER_STATE_PATH = '/root/futbolnaya_jara/state/matches_state.json';
export const DEFAULT_RU_NAMES_CACHE_PATH = '/root/futbolnaya_jara/state/ru_names_cache.json';

const ESPN_LEAGUE_ENDPOINTS: Array<{ slug: string; leagueKey: LeagueKey; label: BilingualText }> = [
  {
    slug: 'esp.1',
    leagueKey: 'laliga',
    label: { ru: 'Ла Лига', en: 'La Liga' },
  },
  {
    slug: 'eng.1',
    leagueKey: 'epl',
    label: { ru: 'АПЛ', en: 'Premier League' },
  },
  {
    slug: 'uefa.champions',
    leagueKey: 'ucl',
    label: { ru: 'Лига чемпионов УЕФА', en: 'UEFA Champions League' },
  },
];

const TEAM_RU_DICTIONARY: Record<string, string> = {
  'Real Madrid': 'Реал Мадрид',
  Barcelona: 'Барселона',
  Arsenal: 'Арсенал',
  Liverpool: 'Ливерпуль',
  Chelsea: 'Челси',
  'Manchester United': 'Манчестер Юнайтед',
  'Manchester City': 'Манчестер Сити',
  'Tottenham Hotspur': 'Тоттенхэм',
  'Aston Villa': 'Астон Вилла',
  'Newcastle United': 'Ньюкасл',
  Everton: 'Эвертон',
  'Paris Saint-Germain': 'ПСЖ',
  'AS Monaco': 'Монако',
  'Bayern Munich': 'Бавария',
  'Borussia Dortmund': 'Боруссия Дортмунд',
  'Atlético Madrid': 'Атлетико Мадрид',
  'Inter Milan': 'Интер',
  'Al-Nassr': 'Аль-Наср',
  'Al-Hilal': 'Аль-Хилаль',
  'Inter Miami CF': 'Интер Майами',
  LAFC: 'Лос-Анджелес ФК',
};

export async function readRuNamesCache(
  cachePath: string = DEFAULT_RU_NAMES_CACHE_PATH
): Promise<Record<string, string>> {
  try {
    const raw = await readServerTextFile(cachePath);
    if (!raw) {
      return { ...TEAM_RU_DICTIONARY };
    }
    const parsed = JSON.parse(raw) as Record<string, string>;
    return { ...TEAM_RU_DICTIONARY, ...parsed };
  } catch {
    return { ...TEAM_RU_DICTIONARY };
  }
}

export async function readFutbolnayaJaraTrackerState(
  statePath: string = DEFAULT_TRACKER_STATE_PATH
): Promise<FutbolnayaJaraStateFile | null> {
  try {
    const raw = await readServerTextFile(statePath);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as FutbolnayaJaraStateFile;
    if (!parsed || typeof parsed !== 'object' || !parsed.matches) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function parseTrackerSeenEvents(seenEvents: string[] = []): MatchScorerEvent[] {
  const scorers: MatchScorerEvent[] = [];
  for (const raw of seenEvents) {
    const parts = raw.split('_');
    if (parts.length < 2) {
      continue;
    }
    const minute = parts[0] || "45'";
    const playerName = parts[1] || 'Goal';
    const isHome = parts[2] !== 'False';
    const isPenalty = parts[3] === 'True';
    scorers.push({
      minute,
      player: { ru: playerName, en: playerName },
      team: isHome ? 'home' : 'away',
      isPenalty,
    });
  }
  return scorers;
}

function inferStatusFromTracker(entry: FutbolnayaJaraMatchState): MatchStatus {
  if (entry.ft_sent) {
    return 'FT';
  }
  if (entry.ht_sent && !entry.second_half_sent) {
    return 'HT';
  }
  if (entry.kickoff_sent || entry.second_half_sent) {
    return 'LIVE';
  }
  return 'UPCOMING';
}

interface EspnCompetitor {
  homeAway?: 'home' | 'away';
  score?: string;
  team?: {
    displayName?: string;
    shortDisplayName?: string;
    abbreviation?: string;
    color?: string;
    logo?: string;
  };
}

interface EspnEvent {
  id?: string;
  date?: string;
  status?: {
    displayClock?: string;
    type?: {
      state?: 'pre' | 'in' | 'post';
      shortDetail?: string;
    };
  };
  competitions?: Array<{
    venue?: { fullName?: string };
    competitors?: EspnCompetitor[];
  }>;
}

export async function fetchEspnScoreboard(
  ruDict: Record<string, string> = TEAM_RU_DICTIONARY
): Promise<MatchItem[]> {
  const collected: MatchItem[] = [];

  await Promise.all(
    ESPN_LEAGUE_ENDPOINTS.map(async ({ slug, leagueKey, label }) => {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 3000);
        const fetchOptions: RequestInit & { next?: { revalidate: number } } = {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
          next: { revalidate: 45 },
        };
        const response = await fetch(
          `https://site.api.espn.com/apis/site/v2/sports/soccer/${slug}/scoreboard`,
          fetchOptions
        );
        clearTimeout(timer);

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { events?: EspnEvent[] };
        const events = Array.isArray(data.events) ? data.events.slice(0, 3) : [];

        for (const ev of events) {
          const comp = ev.competitions?.[0];
          const competitors = comp?.competitors ?? [];
          const home = competitors.find((c) => c.homeAway === 'home') ?? competitors[0];
          const away = competitors.find((c) => c.homeAway === 'away') ?? competitors[1];
          if (!home?.team?.displayName || !away?.team?.displayName) {
            continue;
          }

          const homeEn = home.team.displayName;
          const awayEn = away.team.displayName;
          const homeRu = ruDict[homeEn] ?? homeEn;
          const awayRu = ruDict[awayEn] ?? awayEn;

          const rawState = ev.status?.type?.state;
          let status: MatchStatus = 'UPCOMING';
          let minute = ev.status?.type?.shortDetail ?? '21:00';
          if (rawState === 'in') {
            status = minute.toUpperCase().includes('HT') ? 'HT' : 'LIVE';
            minute = ev.status?.displayClock ?? minute;
          } else if (rawState === 'post') {
            status = 'FT';
            minute = 'FT';
          }

          collected.push({
            id: `espn-${ev.id ?? `${slug}-${homeEn}`}`,
            espnEventId: ev.id,
            league: label,
            leagueKey,
            status,
            minute,
            kickoffIso: ev.date ?? new Date().toISOString(),
            venue: {
              ru: comp?.venue?.fullName ?? 'Стадион УЕФА',
              en: comp?.venue?.fullName ?? 'Stadium',
            },
            homeTeam: {
              name: { ru: homeRu, en: homeEn },
              shortName: home.team.abbreviation ?? homeEn.slice(0, 3).toUpperCase(),
              logoUrl: home.team.logo,
              primaryColor: home.team.color ? `#${home.team.color}` : '#1D4ED8',
              score: Number.parseInt(home.score ?? '0', 10) || 0,
              formation: '4-3-3',
            },
            awayTeam: {
              name: { ru: awayRu, en: awayEn },
              shortName: away.team.abbreviation ?? awayEn.slice(0, 3).toUpperCase(),
              logoUrl: away.team.logo,
              primaryColor: away.team.color ? `#${away.team.color}` : '#DC2626',
              score: Number.parseInt(away.score ?? '0', 10) || 0,
              formation: '4-2-3-1',
            },
            scorers: [],
            homeLineup: REAL_MADRID_LINEUP,
            awayLineup: BARCELONA_LINEUP,
            substitutions: [],
            telegramHighlightUrl: 'https://t.me/futbolnaya_jara',
            isTrackedByBot: false,
          });
        }
      } catch {
        // Ignore network errors and rely on local tracker + rich mock seed data
      }
    })
  );

  return collected;
}

export async function getLiveFeedSnapshot(options?: {
  includeEspn?: boolean;
  statePath?: string;
}): Promise<LiveFeedResult> {
  const includeEspn = options?.includeEspn ?? true;
  const [trackerState, ruDict] = await Promise.all([
    readFutbolnayaJaraTrackerState(options?.statePath),
    readRuNamesCache(),
  ]);

  const trackerEntries = trackerState?.matches ?? {};
  const trackerIds = Object.keys(trackerEntries);

  // Enrich our 6 curated flagship matches with live state from /root/futbolnaya_jara/state/matches_state.json
  const enrichedFlagshipMatches: MatchItem[] = MOCK_MATCHES.map((match) => {
    const trackerEntry = match.espnEventId ? trackerEntries[match.espnEventId] : undefined;
    if (!trackerEntry) {
      return match;
    }

    const parsedScorers = parseTrackerSeenEvents(trackerEntry.seen_events);
    const derivedStatus = inferStatusFromTracker(trackerEntry);

    return {
      ...match,
      isTrackedByBot: true,
      status: match.status === 'LIVE' ? 'LIVE' : derivedStatus,
      scorers: match.scorers.length > 0 ? match.scorers : parsedScorers,
    };
  });

  let espnMatches: MatchItem[] = [];
  if (includeEspn) {
    espnMatches = await fetchEspnScoreboard(ruDict);
  }

  // Mark any ESPN matches that are actively tracked in matches_state.json
  const syncedEspnMatches = espnMatches.map((item) => {
    if (item.espnEventId && trackerEntries[item.espnEventId]) {
      const trackerScorers = parseTrackerSeenEvents(trackerEntries[item.espnEventId].seen_events);
      return {
        ...item,
        isTrackedByBot: true,
        scorers: item.scorers.length > 0 ? item.scorers : trackerScorers,
      };
    }
    return item;
  });

  // Deduplicate keeping all 6 flagship matches first so tactical pitch & substitutions always have rich data
  const seenIds = new Set(enrichedFlagshipMatches.map((m) => m.espnEventId ?? m.id));
  const mergedMatches = [
    ...enrichedFlagshipMatches,
    ...syncedEspnMatches.filter((m) => !seenIds.has(m.espnEventId ?? m.id)).slice(0, 4),
  ];

  const hasTracker = trackerIds.length > 0;
  const hasEspn = espnMatches.length > 0;
  const source: LiveFeedResult['source'] =
    hasTracker && hasEspn
      ? 'espn+tracker'
      : hasTracker
        ? 'tracker+mock'
        : hasEspn
          ? 'espn+mock'
          : 'mock';

  return {
    matches: mergedMatches,
    trackerActiveMatchIds: trackerIds,
    trackerTrackedCount: trackerIds.length,
    source,
    fetchedAt: new Date().toISOString(),
  };
}

export async function getLiveMatches(): Promise<MatchItem[]> {
  const snapshot = await getLiveFeedSnapshot({ includeEspn: false });
  return snapshot.matches;
}
