'use client';

import React, { useMemo, useState } from 'react';
import { StandingsEntry, StandingsRow } from './StandingsRow';

export type StandingsLeagueId =
  | 'LA LIGA'
  | 'EPL'
  | 'SERIE A'
  | 'UCL'
  | 'SAUDI';

export interface LeagueStandingsConfig {
  id: StandingsLeagueId;
  nameEn: string;
  nameRu: string;
  shortEn: string;
  shortRu: string;
  countryFlag: string;
  matchdayLabelEn: string;
  matchdayLabelRu: string;
  entries: StandingsEntry[];
}

export const DEFAULT_MULTI_LEAGUE_STANDINGS: Record<
  StandingsLeagueId,
  LeagueStandingsConfig
> = {
  'LA LIGA': {
    id: 'LA LIGA',
    nameEn: 'La Liga EA Sports',
    nameRu: 'Ла Лига Испания',
    shortEn: 'La Liga',
    shortRu: 'Ла Лига',
    countryFlag: '🇪🇸',
    matchdayLabelEn: 'Matchday 28 · Live Table',
    matchdayLabelRu: 'Тур 28 · Live таблица',
    entries: [
      {
        rank: 1,
        teamId: 'barcelona',
        teamName: 'Barcelona',
        teamNameRu: 'Барселона',
        shortName: 'BAR',
        crest: '🔵',
        crestBg: 'rgba(220, 38, 38, 0.25)',
        played: 28,
        won: 21,
        drawn: 4,
        lost: 3,
        goalsFor: 72,
        goalsAgainst: 26,
        goalDiff: 46,
        points: 67,
        form: ['W', 'W', 'W', 'D', 'W'],
        zone: 'ucl',
        isLiveActive: true,
        liveMatchScore: 'BAR 2:1 ATM',
      },
      {
        rank: 2,
        teamId: 'real-madrid',
        teamName: 'Real Madrid',
        teamNameRu: 'Реал Мадрид',
        shortName: 'RMA',
        crest: '👑',
        crestBg: 'rgba(255, 196, 0, 0.25)',
        played: 28,
        won: 20,
        drawn: 5,
        lost: 3,
        goalsFor: 64,
        goalsAgainst: 24,
        goalDiff: 40,
        points: 65,
        form: ['W', 'D', 'W', 'W', 'W'],
        zone: 'ucl',
        isLiveActive: true,
        liveMatchScore: 'RMA 3:2 MCI',
      },
      {
        rank: 3,
        teamId: 'atletico',
        teamName: 'Atlético Madrid',
        teamNameRu: 'Атлетико Мадрид',
        shortName: 'ATM',
        crest: '🔴',
        crestBg: 'rgba(239, 68, 68, 0.24)',
        played: 28,
        won: 17,
        drawn: 6,
        lost: 5,
        goalsFor: 51,
        goalsAgainst: 25,
        goalDiff: 26,
        points: 57,
        form: ['W', 'D', 'L', 'W', 'L'],
        zone: 'ucl',
        isLiveActive: true,
        liveMatchScore: 'BAR 2:1 ATM',
      },
      {
        rank: 4,
        teamId: 'athletic-club',
        teamName: 'Athletic Club',
        teamNameRu: 'Атлетик Бильбао',
        shortName: 'ATH',
        crest: '🦁',
        crestBg: 'rgba(220, 38, 38, 0.22)',
        played: 28,
        won: 15,
        drawn: 8,
        lost: 5,
        goalsFor: 46,
        goalsAgainst: 26,
        goalDiff: 20,
        points: 53,
        form: ['D', 'W', 'W', 'D', 'W'],
        zone: 'ucl',
      },
      {
        rank: 5,
        teamId: 'villarreal',
        teamName: 'Villarreal',
        teamNameRu: 'Вильярреал',
        shortName: 'VIL',
        crest: '🟡',
        crestBg: 'rgba(250, 204, 21, 0.22)',
        played: 28,
        won: 13,
        drawn: 8,
        lost: 7,
        goalsFor: 48,
        goalsAgainst: 38,
        goalDiff: 10,
        points: 47,
        form: ['W', 'D', 'W', 'L', 'D'],
        zone: 'uel',
      },
      {
        rank: 6,
        teamId: 'real-betis',
        teamName: 'Real Betis',
        teamNameRu: 'Реал Бетис',
        shortName: 'BET',
        crest: '🟢',
        crestBg: 'rgba(16, 185, 129, 0.22)',
        played: 28,
        won: 12,
        drawn: 8,
        lost: 8,
        goalsFor: 39,
        goalsAgainst: 33,
        goalDiff: 6,
        points: 44,
        form: ['W', 'W', 'D', 'W', 'L'],
        zone: 'uecl',
      },
      {
        rank: 7,
        teamId: 'real-sociedad',
        teamName: 'Real Sociedad',
        teamNameRu: 'Реал Сосьедад',
        shortName: 'RSO',
        crest: '⚪',
        crestBg: 'rgba(59, 130, 246, 0.22)',
        played: 28,
        won: 11,
        drawn: 8,
        lost: 9,
        goalsFor: 34,
        goalsAgainst: 30,
        goalDiff: 4,
        points: 41,
        form: ['D', 'L', 'W', 'D', 'D'],
        zone: 'none',
      },
      {
        rank: 18,
        teamId: 'valencia',
        teamName: 'Valencia',
        teamNameRu: 'Валенсия',
        shortName: 'VAL',
        crest: '🦇',
        crestBg: 'rgba(249, 115, 22, 0.2)',
        played: 28,
        won: 6,
        drawn: 9,
        lost: 13,
        goalsFor: 28,
        goalsAgainst: 44,
        goalDiff: -16,
        points: 27,
        form: ['L', 'D', 'L', 'W', 'D'],
        zone: 'relegation',
      },
    ],
  },
  EPL: {
    id: 'EPL',
    nameEn: 'Premier League',
    nameRu: 'Английская Премьер-лига',
    shortEn: 'Premier League',
    shortRu: 'АПЛ',
    countryFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    matchdayLabelEn: 'Matchday 29 · Live Table',
    matchdayLabelRu: 'Тур 29 · Live таблица',
    entries: [
      {
        rank: 1,
        teamId: 'liverpool',
        teamName: 'Liverpool',
        teamNameRu: 'Ливерпуль',
        shortName: 'LIV',
        crest: '🦅',
        crestBg: 'rgba(185, 28, 28, 0.28)',
        played: 29,
        won: 21,
        drawn: 6,
        lost: 2,
        goalsFor: 68,
        goalsAgainst: 26,
        goalDiff: 42,
        points: 69,
        form: ['W', 'W', 'D', 'W', 'D'],
        zone: 'ucl',
        isLiveActive: true,
        liveMatchScore: 'ARS 2:2 LIV',
      },
      {
        rank: 2,
        teamId: 'arsenal',
        teamName: 'Arsenal',
        teamNameRu: 'Арсенал',
        shortName: 'ARS',
        crest: '🛡️',
        crestBg: 'rgba(239, 68, 68, 0.25)',
        played: 29,
        won: 18,
        drawn: 8,
        lost: 3,
        goalsFor: 59,
        goalsAgainst: 24,
        goalDiff: 35,
        points: 62,
        form: ['W', 'D', 'W', 'W', 'D'],
        zone: 'ucl',
        isLiveActive: true,
        liveMatchScore: 'ARS 2:2 LIV',
      },
      {
        rank: 3,
        teamId: 'man-city',
        teamName: 'Manchester City',
        teamNameRu: 'Манчестер Сити',
        shortName: 'MCI',
        crest: '💠',
        crestBg: 'rgba(56, 189, 248, 0.24)',
        played: 29,
        won: 18,
        drawn: 6,
        lost: 5,
        goalsFor: 63,
        goalsAgainst: 34,
        goalDiff: 29,
        points: 60,
        form: ['W', 'L', 'W', 'W', 'D'],
        zone: 'ucl',
        isLiveActive: true,
        liveMatchScore: 'RMA 3:2 MCI',
      },
      {
        rank: 4,
        teamId: 'chelsea',
        teamName: 'Chelsea',
        teamNameRu: 'Челси',
        shortName: 'CHE',
        crest: '🦁',
        crestBg: 'rgba(37, 99, 235, 0.28)',
        played: 29,
        won: 15,
        drawn: 7,
        lost: 7,
        goalsFor: 54,
        goalsAgainst: 36,
        goalDiff: 18,
        points: 52,
        form: ['W', 'W', 'L', 'D', 'W'],
        zone: 'ucl',
      },
      {
        rank: 5,
        teamId: 'newcastle',
        teamName: 'Newcastle United',
        teamNameRu: 'Ньюкасл Юнайтед',
        shortName: 'NEW',
        crest: '⚫',
        crestBg: 'rgba(255, 255, 255, 0.15)',
        played: 29,
        won: 15,
        drawn: 5,
        lost: 9,
        goalsFor: 50,
        goalsAgainst: 38,
        goalDiff: 12,
        points: 50,
        form: ['W', 'L', 'W', 'W', 'L'],
        zone: 'uel',
      },
      {
        rank: 6,
        teamId: 'aston-villa',
        teamName: 'Aston Villa',
        teamNameRu: 'Астон Вилла',
        shortName: 'AVL',
        crest: '🟣',
        crestBg: 'rgba(147, 51, 234, 0.24)',
        played: 29,
        won: 14,
        drawn: 6,
        lost: 9,
        goalsFor: 46,
        goalsAgainst: 41,
        goalDiff: 5,
        points: 48,
        form: ['D', 'W', 'L', 'W', 'D'],
        zone: 'uecl',
      },
      {
        rank: 18,
        teamId: 'ipswich',
        teamName: 'Ipswich Town',
        teamNameRu: 'Ипсвич Таун',
        shortName: 'IPS',
        crest: '🐴',
        crestBg: 'rgba(59, 130, 246, 0.2)',
        played: 29,
        won: 4,
        drawn: 8,
        lost: 17,
        goalsFor: 27,
        goalsAgainst: 58,
        goalDiff: -31,
        points: 20,
        form: ['L', 'L', 'D', 'L', 'L'],
        zone: 'relegation',
      },
    ],
  },
  'SERIE A': {
    id: 'SERIE A',
    nameEn: 'Serie A Enilive',
    nameRu: 'Серия А Италия',
    shortEn: 'Serie A',
    shortRu: 'Серия А',
    countryFlag: '🇮🇹',
    matchdayLabelEn: 'Matchday 29 · Standings',
    matchdayLabelRu: 'Тур 29 · Таблица',
    entries: [
      {
        rank: 1,
        teamId: 'inter',
        teamName: 'Inter Milan',
        teamNameRu: 'Интер Милан',
        shortName: 'INT',
        crest: '🐍',
        crestBg: 'rgba(37, 99, 235, 0.25)',
        played: 29,
        won: 20,
        drawn: 6,
        lost: 3,
        goalsFor: 66,
        goalsAgainst: 25,
        goalDiff: 41,
        points: 66,
        form: ['W', 'W', 'D', 'W', 'W'],
        zone: 'ucl',
      },
      {
        rank: 2,
        teamId: 'napoli',
        teamName: 'Napoli',
        teamNameRu: 'Наполи',
        shortName: 'NAP',
        crest: '🌊',
        crestBg: 'rgba(14, 165, 233, 0.25)',
        played: 28,
        won: 18,
        drawn: 7,
        lost: 3,
        goalsFor: 48,
        goalsAgainst: 22,
        goalDiff: 26,
        points: 61,
        form: ['W', 'D', 'D', 'W', 'W'],
        zone: 'ucl',
      },
      {
        rank: 3,
        teamId: 'atalanta',
        teamName: 'Atalanta',
        teamNameRu: 'Аталанта',
        shortName: 'ATA',
        crest: '⚡',
        crestBg: 'rgba(30, 64, 175, 0.28)',
        played: 29,
        won: 17,
        drawn: 7,
        lost: 5,
        goalsFor: 61,
        goalsAgainst: 29,
        goalDiff: 32,
        points: 58,
        form: ['W', 'W', 'L', 'D', 'W'],
        zone: 'ucl',
      },
      {
        rank: 4,
        teamId: 'juventus',
        teamName: 'Juventus',
        teamNameRu: 'Ювентус',
        shortName: 'JUV',
        crest: '🦓',
        crestBg: 'rgba(255, 255, 255, 0.14)',
        played: 29,
        won: 14,
        drawn: 11,
        lost: 4,
        goalsFor: 45,
        goalsAgainst: 26,
        goalDiff: 19,
        points: 53,
        form: ['W', 'W', 'W', 'L', 'L'],
        zone: 'ucl',
      },
      {
        rank: 5,
        teamId: 'lazio',
        teamName: 'Lazio',
        teamNameRu: 'Лацио',
        shortName: 'LAZ',
        crest: '🦅',
        crestBg: 'rgba(56, 189, 248, 0.22)',
        played: 29,
        won: 15,
        drawn: 6,
        lost: 8,
        goalsFor: 50,
        goalsAgainst: 37,
        goalDiff: 13,
        points: 51,
        form: ['D', 'W', 'D', 'W', 'L'],
        zone: 'uel',
      },
      {
        rank: 6,
        teamId: 'ac-milan',
        teamName: 'AC Milan',
        teamNameRu: 'Милан',
        shortName: 'MIL',
        crest: '👹',
        crestBg: 'rgba(185, 28, 28, 0.25)',
        played: 28,
        won: 13,
        drawn: 8,
        lost: 7,
        goalsFor: 44,
        goalsAgainst: 33,
        goalDiff: 11,
        points: 47,
        form: ['W', 'L', 'L', 'W', 'W'],
        zone: 'uecl',
      },
    ],
  },
  UCL: {
    id: 'UCL',
    nameEn: 'UEFA Champions League · League Phase',
    nameRu: 'Лига чемпионов УЕФА · Общий этап',
    shortEn: 'UCL',
    shortRu: 'ЛЧ УЕФА',
    countryFlag: '⭐',
    matchdayLabelEn: 'Top 8 Direct R16 · Live Standings',
    matchdayLabelRu: 'Топ-8 напрямую в 1/8 · Live таблица',
    entries: [
      {
        rank: 1,
        teamId: 'liverpool',
        teamName: 'Liverpool',
        teamNameRu: 'Ливерпуль',
        shortName: 'LIV',
        crest: '🦅',
        crestBg: 'rgba(185, 28, 28, 0.28)',
        played: 8,
        won: 7,
        drawn: 0,
        lost: 1,
        goalsFor: 19,
        goalsAgainst: 5,
        goalDiff: 14,
        points: 21,
        form: ['W', 'W', 'W', 'W', 'L'],
        zone: 'ucl',
        isLiveActive: true,
        liveMatchScore: 'ARS 2:2 LIV',
      },
      {
        rank: 2,
        teamId: 'barcelona',
        teamName: 'Barcelona',
        teamNameRu: 'Барселона',
        shortName: 'BAR',
        crest: '🔵',
        crestBg: 'rgba(220, 38, 38, 0.25)',
        played: 8,
        won: 6,
        drawn: 1,
        lost: 1,
        goalsFor: 28,
        goalsAgainst: 13,
        goalDiff: 15,
        points: 19,
        form: ['W', 'W', 'W', 'W', 'D'],
        zone: 'ucl',
        isLiveActive: true,
        liveMatchScore: 'BAR 2:1 ATM',
      },
      {
        rank: 3,
        teamId: 'arsenal',
        teamName: 'Arsenal',
        teamNameRu: 'Арсенал',
        shortName: 'ARS',
        crest: '🛡️',
        crestBg: 'rgba(239, 68, 68, 0.25)',
        played: 8,
        won: 6,
        drawn: 1,
        lost: 1,
        goalsFor: 16,
        goalsAgainst: 3,
        goalDiff: 13,
        points: 19,
        form: ['W', 'W', 'W', 'W', 'D'],
        zone: 'ucl',
        isLiveActive: true,
        liveMatchScore: 'ARS 2:2 LIV',
      },
      {
        rank: 4,
        teamId: 'inter',
        teamName: 'Inter Milan',
        teamNameRu: 'Интер Милан',
        shortName: 'INT',
        crest: '🐍',
        crestBg: 'rgba(37, 99, 235, 0.25)',
        played: 8,
        won: 6,
        drawn: 1,
        lost: 1,
        goalsFor: 11,
        goalsAgainst: 1,
        goalDiff: 10,
        points: 19,
        form: ['W', 'W', 'L', 'W', 'W'],
        zone: 'ucl',
      },
      {
        rank: 5,
        teamId: 'atletico',
        teamName: 'Atlético Madrid',
        teamNameRu: 'Атлетико Мадрид',
        shortName: 'ATM',
        crest: '🔴',
        crestBg: 'rgba(239, 68, 68, 0.24)',
        played: 8,
        won: 6,
        drawn: 0,
        lost: 2,
        goalsFor: 20,
        goalsAgainst: 12,
        goalDiff: 8,
        points: 18,
        form: ['W', 'W', 'W', 'W', 'W'],
        zone: 'ucl',
        isLiveActive: true,
        liveMatchScore: 'BAR 2:1 ATM',
      },
      {
        rank: 9,
        teamId: 'real-madrid',
        teamName: 'Real Madrid',
        teamNameRu: 'Реал Мадрид',
        shortName: 'RMA',
        crest: '👑',
        crestBg: 'rgba(255, 196, 0, 0.25)',
        played: 8,
        won: 5,
        drawn: 0,
        lost: 3,
        goalsFor: 20,
        goalsAgainst: 12,
        goalDiff: 8,
        points: 15,
        form: ['L', 'W', 'W', 'W', 'W'],
        zone: 'playoff',
        isLiveActive: true,
        liveMatchScore: 'RMA 3:2 MCI',
      },
      {
        rank: 11,
        teamId: 'man-city',
        teamName: 'Manchester City',
        teamNameRu: 'Манчестер Сити',
        shortName: 'MCI',
        crest: '💠',
        crestBg: 'rgba(56, 189, 248, 0.24)',
        played: 8,
        won: 4,
        drawn: 2,
        lost: 2,
        goalsFor: 18,
        goalsAgainst: 14,
        goalDiff: 4,
        points: 14,
        form: ['D', 'L', 'L', 'W', 'W'],
        zone: 'playoff',
        isLiveActive: true,
        liveMatchScore: 'RMA 3:2 MCI',
      },
    ],
  },
  SAUDI: {
    id: 'SAUDI',
    nameEn: 'Saudi Pro League (Roshn)',
    nameRu: 'Саудовская Про-лига',
    shortEn: 'Saudi Pro',
    shortRu: 'Сауд. Лига',
    countryFlag: '🇸🇦',
    matchdayLabelEn: 'Matchday 25 · Live Standings',
    matchdayLabelRu: 'Тур 25 · Live таблица',
    entries: [
      {
        rank: 1,
        teamId: 'al-ittihad',
        teamName: 'Al-Ittihad',
        teamNameRu: 'Аль-Иттихад',
        shortName: 'ITT',
        crest: '🐯',
        crestBg: 'rgba(245, 158, 11, 0.25)',
        played: 25,
        won: 20,
        drawn: 3,
        lost: 2,
        goalsFor: 61,
        goalsAgainst: 23,
        goalDiff: 38,
        points: 63,
        form: ['W', 'W', 'D', 'W', 'W'],
        zone: 'ucl',
      },
      {
        rank: 2,
        teamId: 'al-hilal',
        teamName: 'Al-Hilal',
        teamNameRu: 'Аль-Хиляль',
        shortName: 'HIL',
        crest: '🌙',
        crestBg: 'rgba(59, 130, 246, 0.25)',
        played: 25,
        won: 18,
        drawn: 4,
        lost: 3,
        goalsFor: 68,
        goalsAgainst: 26,
        goalDiff: 42,
        points: 58,
        form: ['W', 'D', 'L', 'W', 'L'],
        zone: 'ucl',
        isLiveActive: true,
        liveMatchScore: 'NAS 2:1 HIL',
      },
      {
        rank: 3,
        teamId: 'al-nassr',
        teamName: 'Al-Nassr',
        teamNameRu: 'Аль-Наср',
        shortName: 'NAS',
        crest: '⚡',
        crestBg: 'rgba(255, 196, 0, 0.26)',
        played: 25,
        won: 17,
        drawn: 5,
        lost: 3,
        goalsFor: 56,
        goalsAgainst: 25,
        goalDiff: 31,
        points: 56,
        form: ['W', 'W', 'D', 'W', 'W'],
        zone: 'ucl',
        isLiveActive: true,
        liveMatchScore: 'NAS 2:1 HIL',
      },
      {
        rank: 4,
        teamId: 'al-qadsiah',
        teamName: 'Al-Qadsiah',
        teamNameRu: 'Аль-Кадисия',
        shortName: 'QAD',
        crest: '🛡️',
        crestBg: 'rgba(239, 68, 68, 0.22)',
        played: 25,
        won: 16,
        drawn: 3,
        lost: 6,
        goalsFor: 42,
        goalsAgainst: 24,
        goalDiff: 18,
        points: 51,
        form: ['W', 'L', 'W', 'W', 'D'],
        zone: 'none',
      },
      {
        rank: 5,
        teamId: 'al-ahli',
        teamName: 'Al-Ahli Saudi',
        teamNameRu: 'Аль-Ахли Джидда',
        shortName: 'AHL',
        crest: '🟢',
        crestBg: 'rgba(16, 185, 129, 0.24)',
        played: 25,
        won: 15,
        drawn: 3,
        lost: 7,
        goalsFor: 48,
        goalsAgainst: 27,
        goalDiff: 21,
        points: 48,
        form: ['W', 'W', 'L', 'W', 'D'],
        zone: 'none',
      },
    ],
  },
};

export const STANDINGS_LEAGUE_ORDER: StandingsLeagueId[] = [
  'LA LIGA',
  'EPL',
  'SERIE A',
  'UCL',
  'SAUDI',
];

export interface LeagueStandingsTableProps {
  lang?: 'ru' | 'en';
  locale?: 'ru' | 'en';
  initialLeague?: StandingsLeagueId;
  activeTeamIds?: string[];
  compact?: boolean;
  leaguesData?: Record<StandingsLeagueId, LeagueStandingsConfig>;
  onSelectTeam?: (entry: StandingsEntry, league: StandingsLeagueId) => void;
  onLeagueChange?: (league: StandingsLeagueId) => void;
}

export function LeagueStandingsTable({
  lang,
  locale,
  initialLeague = 'LA LIGA',
  activeTeamIds = [],
  compact: initialCompact = false,
  leaguesData = DEFAULT_MULTI_LEAGUE_STANDINGS,
  onSelectTeam,
  onLeagueChange,
}: LeagueStandingsTableProps) {
  const [selectedLeague, setSelectedLeague] =
    useState<StandingsLeagueId>(initialLeague);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyLiveTeams, setOnlyLiveTeams] = useState<boolean>(false);
  const [isCompact, setIsCompact] = useState<boolean>(initialCompact);
  const [internalLang, setInternalLang] = useState<'ru' | 'en'>(
    lang ?? locale ?? 'ru'
  );

  const activeLang: 'ru' | 'en' = lang ?? locale ?? internalLang;
  const currentLeagueConfig =
    leaguesData[selectedLeague] || leaguesData['LA LIGA'];

  const activeSet = useMemo(() => new Set(activeTeamIds), [activeTeamIds]);

  const filteredEntries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return currentLeagueConfig.entries.filter((entry) => {
      const isLive = Boolean(entry.isLiveActive || activeSet.has(entry.teamId));
      if (onlyLiveTeams && !isLive) {
        return false;
      }
      if (!query) return true;
      return (
        entry.teamName.toLowerCase().includes(query) ||
        (entry.teamNameRu && entry.teamNameRu.toLowerCase().includes(query)) ||
        (entry.shortName && entry.shortName.toLowerCase().includes(query))
      );
    });
  }, [currentLeagueConfig, searchQuery, onlyLiveTeams, activeSet]);

  const handleLeagueTabClick = (leagueId: StandingsLeagueId) => {
    setSelectedLeague(leagueId);
    onLeagueChange?.(leagueId);
  };

  return (
    <div
      style={{
        background:
          'linear-gradient(165deg, rgba(13, 26, 48, 0.98) 0%, var(--bg-navy, #091324) 100%)',
        border: '1px solid rgba(255, 196, 0, 0.2)',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: '0 14px 34px rgba(0, 0, 0, 0.42)',
        color: '#F8FAFC',
        fontFamily:
          'var(--font-sans, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
      }}
    >
      {/* Top Header Banner */}
      <div
        style={{
          padding: '16px 18px 14px',
          background:
            'linear-gradient(90deg, rgba(255, 98, 0, 0.16) 0%, rgba(255, 196, 0, 0.07) 55%, rgba(9, 19, 36, 0.95) 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              aria-hidden="true"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background:
                  'linear-gradient(135deg, #FF6200 0%, #FFC400 100%)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                boxShadow: '0 4px 12px rgba(255, 98, 0, 0.35)',
              }}
            >
              {currentLeagueConfig.countryFlag}
            </span>
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: '16px',
                    fontWeight: 800,
                    letterSpacing: '-0.01em',
                    color: '#FFFFFF',
                  }}
                >
                  {activeLang === 'ru'
                    ? currentLeagueConfig.nameRu
                    : currentLeagueConfig.nameEn}
                </h3>
                <span
                  style={{
                    padding: '2px 7px',
                    borderRadius: '999px',
                    fontSize: '10px',
                    fontWeight: 800,
                    background: 'rgba(255, 196, 0, 0.15)',
                    color: '#FFC400',
                    border: '1px solid rgba(255, 196, 0, 0.35)',
                  }}
                >
                  2025/26
                </span>
              </div>
              <p
                style={{
                  margin: '2px 0 0',
                  fontSize: '11.5px',
                  color: '#94A3B8',
                }}
              >
                {activeLang === 'ru'
                  ? currentLeagueConfig.matchdayLabelRu
                  : currentLeagueConfig.matchdayLabelEn}
              </p>
            </div>
          </div>

          {/* Right Controls: Live Highlight Filter + Compact Toggle + Lang Toggle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              onClick={() => setOnlyLiveTeams((prev: boolean) => !prev)}
              style={{
                padding: '5px 10px',
                borderRadius: '7px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                border: onlyLiveTeams
                  ? '1px solid #FFC400'
                  : '1px solid rgba(255, 255, 255, 0.14)',
                background: onlyLiveTeams
                  ? 'rgba(255, 196, 0, 0.2)'
                  : 'rgba(15, 29, 54, 0.75)',
                color: onlyLiveTeams ? '#FFC400' : '#CBD5E1',
              }}
            >
              ⚡ {activeLang === 'ru' ? 'В игре (LIVE)' : 'In Live Action'}
            </button>

            <button
              type="button"
              onClick={() => setIsCompact((prev: boolean) => !prev)}
              style={{
                padding: '5px 9px',
                borderRadius: '7px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                background: 'rgba(15, 29, 54, 0.75)',
                color: '#CBD5E1',
              }}
            >
              {isCompact
                ? activeLang === 'ru'
                  ? 'Полная'
                  : 'Full View'
                : activeLang === 'ru'
                ? 'Компакт'
                : 'Compact'}
            </button>

            {!lang && !locale && (
              <button
                type="button"
                onClick={() =>
                  setInternalLang((prev: 'ru' | 'en') =>
                    prev === 'ru' ? 'en' : 'ru'
                  )
                }
                style={{
                  padding: '5px 8px',
                  borderRadius: '7px',
                  fontSize: '11px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 98, 0, 0.4)',
                  background: 'rgba(255, 98, 0, 0.14)',
                  color: '#FFC400',
                }}
              >
                {activeLang.toUpperCase()}
              </button>
            )}
          </div>
        </div>

        {/* Multi-League Selector Tabs */}
        <div
          role="tablist"
          aria-label={
            activeLang === 'ru' ? 'Выбор лиги' : 'Select football league'
          }
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            overflowX: 'auto',
            paddingBottom: '2px',
          }}
        >
          {STANDINGS_LEAGUE_ORDER.map((leagueKey) => {
            const league = leaguesData[leagueKey];
            if (!league) return null;
            const isSelected = selectedLeague === leagueKey;
            const tabLabel =
              activeLang === 'ru' ? league.shortRu : league.shortEn;

            return (
              <button
                key={leagueKey}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => handleLeagueTabClick(leagueKey)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: isSelected ? 800 : 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                  border: isSelected
                    ? '1px solid var(--accent-gold, #FFC400)'
                    : '1px solid rgba(255, 255, 255, 0.09)',
                  background: isSelected
                    ? 'linear-gradient(135deg, #FF6200 0%, #FFC400 100%)'
                    : 'rgba(9, 19, 36, 0.78)',
                  color: isSelected ? '#091324' : '#E2E8F0',
                  boxShadow: isSelected
                    ? '0 3px 12px rgba(255, 98, 0, 0.35)'
                    : 'none',
                }}
              >
                <span aria-hidden="true">{league.countryFlag}</span>
                <span>{tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Club Search Input */}
        <div style={{ position: 'relative' }}>
          <input
            type="search"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            placeholder={
              activeLang === 'ru'
                ? 'Поиск клуба (например, Реал Мадрид, Арсенал, Аль-Наср)...'
                : 'Filter club (e.g., Real Madrid, Arsenal, Al-Nassr)...'
            }
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '7px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              background: 'rgba(9, 19, 36, 0.85)',
              color: '#F8FAFC',
              fontSize: '12px',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Standings Table */}
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
          }}
        >
          <thead>
            <tr
              style={{
                background: 'rgba(9, 19, 36, 0.95)',
                borderBottom: '1px solid rgba(255, 196, 0, 0.22)',
                fontSize: '10.5px',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#94A3B8',
              }}
            >
              <th style={{ padding: '10px 8px 10px 12px', width: '44px' }}>#</th>
              <th style={{ padding: '10px 8px' }}>
                {activeLang === 'ru' ? 'Клуб' : 'Club'}
              </th>
              <th
                style={{ padding: '10px 6px', textAlign: 'center' }}
                title={activeLang === 'ru' ? 'Матчи' : 'Matches Played'}
              >
                {activeLang === 'ru' ? 'И' : 'P'}
              </th>
              {!isCompact && (
                <>
                  <th
                    style={{ padding: '10px 6px', textAlign: 'center' }}
                    title={activeLang === 'ru' ? 'Победы' : 'Won'}
                  >
                    {activeLang === 'ru' ? 'В' : 'W'}
                  </th>
                  <th
                    style={{ padding: '10px 6px', textAlign: 'center' }}
                    title={activeLang === 'ru' ? 'Ничьи' : 'Drawn'}
                  >
                    {activeLang === 'ru' ? 'Н' : 'D'}
                  </th>
                  <th
                    style={{ padding: '10px 6px', textAlign: 'center' }}
                    title={activeLang === 'ru' ? 'Поражения' : 'Lost'}
                  >
                    {activeLang === 'ru' ? 'П' : 'L'}
                  </th>
                </>
              )}
              <th
                style={{ padding: '10px 6px', textAlign: 'center' }}
                title={
                  activeLang === 'ru' ? 'Разница мячей' : 'Goal Difference'
                }
              >
                {activeLang === 'ru' ? 'РМ' : 'GD'}
              </th>
              <th
                style={{
                  padding: '10px 10px',
                  textAlign: 'center',
                  color: 'var(--accent-gold, #FFC400)',
                }}
              >
                {activeLang === 'ru' ? 'ОЧК' : 'PTS'}
              </th>
              {!isCompact && (
                <th
                  style={{
                    padding: '10px 12px 10px 6px',
                    textAlign: 'right',
                  }}
                >
                  {activeLang === 'ru' ? 'Форма' : 'Form'}
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {filteredEntries.length > 0 ? (
              filteredEntries.map((entry) => (
                <StandingsRow
                  key={`${selectedLeague}-${entry.teamId}`}
                  entry={entry}
                  lang={activeLang}
                  compact={isCompact}
                  isHighlighted={
                    Boolean(entry.isLiveActive) || activeSet.has(entry.teamId)
                  }
                  onSelectTeam={(selected) =>
                    onSelectTeam?.(selected, selectedLeague)
                  }
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={isCompact ? 5 : 9}
                  style={{
                    padding: '24px 16px',
                    textAlign: 'center',
                    fontSize: '12.5px',
                    color: '#94A3B8',
                  }}
                >
                  {activeLang === 'ru'
                    ? 'Команды по вашему запросу не найдены.'
                    : 'No clubs matching your filter.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Qualification Zones Legend Footer */}
      <div
        style={{
          padding: '10px 16px',
          background: 'rgba(6, 13, 25, 0.9)',
          borderTop: '1px solid rgba(255, 255, 255, 0.07)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          fontSize: '11px',
          color: '#94A3B8',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '2px',
                backgroundColor: '#FFC400',
                boxShadow: '0 0 6px #FFC400',
              }}
            />
            <span>
              {activeLang === 'ru'
                ? 'Лига чемпионов / Элита'
                : 'UCL Qualification'}
            </span>
          </span>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '2px',
                backgroundColor: '#FF6200',
              }}
            />
            <span>
              {activeLang === 'ru' ? 'Лига Европы' : 'Europa League'}
            </span>
          </span>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '2px',
                backgroundColor: '#38BDF8',
              }}
            />
            <span>
              {activeLang === 'ru'
                ? 'Лига конференций / Плей-офф'
                : 'UECL / Playoff'}
            </span>
          </span>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '2px',
                backgroundColor: '#EF4444',
              }}
            />
            <span>
              {activeLang === 'ru' ? 'Зона вылета' : 'Relegation'}
            </span>
          </span>
        </div>

        <span style={{ color: '#FFC400', fontWeight: 700 }}>
          {activeLang === 'ru'
            ? '● Золотым выделены клубы в LIVE-матчах'
            : '● Fiery Gold = Active LIVE match'}
        </span>
      </div>
    </div>
  );
}

export default LeagueStandingsTable;
