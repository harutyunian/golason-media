'use client';

import React, { useMemo, useState } from 'react';
import {
  BilingualLabel,
  MatchLanguage,
  PitchPlayerNodeData,
  PlayerNode,
  getFotmobPortraitUrl,
  resolveBilingualText,
} from './PlayerNode';

export interface PitchTeamHeaderInfo {
  name: BilingualLabel | string;
  shortName?: string;
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  score?: number;
  formation: string;
}

export interface TacticalPitchMatchInput {
  id?: string;
  league?: BilingualLabel | string;
  status?: string;
  minute?: string;
  homeTeam: PitchTeamHeaderInfo;
  awayTeam: PitchTeamHeaderInfo;
  homeLineup: PitchPlayerNodeData[];
  awayLineup: PitchPlayerNodeData[];
}

export interface TacticalPitchProps {
  match?: TacticalPitchMatchInput;
  homeTeam?: PitchTeamHeaderInfo;
  awayTeam?: PitchTeamHeaderInfo;
  homeLineup?: PitchPlayerNodeData[];
  awayLineup?: PitchPlayerNodeData[];
  homeFormation?: string;
  awayFormation?: string;
  competition?: BilingualLabel | string;
  lang?: MatchLanguage;
  locale?: MatchLanguage;
  onSelectPlayer?: (player: PitchPlayerNodeData, side: 'home' | 'away') => void;
  className?: string;
}

const DEFAULT_HOME_TEAM: PitchTeamHeaderInfo = {
  name: { ru: 'Реал Мадрид', en: 'Real Madrid' },
  shortName: 'RMA',
  logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/86.png',
  primaryColor: '#22A64E',
  secondaryColor: '#FFFFFF',
  score: 3,
  formation: '4-3-3',
};

const DEFAULT_AWAY_TEAM: PitchTeamHeaderInfo = {
  name: { ru: 'Барселона', en: 'Barcelona' },
  shortName: 'BAR',
  logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/83.png',
  primaryColor: '#D89620',
  secondaryColor: '#A50044',
  score: 2,
  formation: '4-2-3-1',
};

const DEFAULT_HOME_LINEUP: PitchPlayerNodeData[] = [
  {
    id: 'rma-1',
    fotmobId: 170323,
    name: { ru: 'Тибо Куртуа', en: 'Thibaut Courtois' },
    number: 1,
    position: 'GK',
    role: { ru: 'Вратарь', en: 'Goalkeeper' },
    x: 6.5,
    y: 50,
    rating: 7.4,
  },
  {
    id: 'rma-2',
    fotmobId: 281974,
    name: { ru: 'Дани Карвахаль', en: 'Dani Carvajal' },
    number: 2,
    position: 'DEF',
    role: { ru: 'Правый защитник', en: 'Right Back' },
    x: 18,
    y: 82,
    rating: 7.2,
    isCaptain: true,
  },
  {
    id: 'rma-3',
    fotmobId: 794435,
    name: { ru: 'Эдер Милитао', en: 'Éder Militão' },
    number: 3,
    position: 'DEF',
    role: { ru: 'Центральный защитник', en: 'Center Back' },
    x: 17,
    y: 61,
    rating: 7.1,
  },
  {
    id: 'rma-22',
    fotmobId: 242702,
    name: { ru: 'Антонио Рюдигер', en: 'Antonio Rüdiger' },
    number: 22,
    position: 'DEF',
    role: { ru: 'Центральный защитник', en: 'Center Back' },
    x: 17,
    y: 39,
    rating: 7.5,
    yellowCard: true,
  },
  {
    id: 'rma-23',
    fotmobId: 631002,
    name: { ru: 'Ферлан Менди', en: 'Ferland Mendy' },
    number: 23,
    position: 'DEF',
    role: { ru: 'Левый защитник', en: 'Left Back' },
    x: 18,
    y: 18,
    rating: 6.9,
  },
  {
    id: 'rma-8',
    fotmobId: 739150,
    name: { ru: 'Федерико Вальверде', en: 'Federico Valverde' },
    number: 8,
    position: 'MID',
    role: { ru: 'Центральный полузащитник', en: 'Box-to-Box Midfielder' },
    x: 31,
    y: 74,
    rating: 8.1,
    assists: 1,
  },
  {
    id: 'rma-14',
    fotmobId: 950561,
    name: { ru: 'Орельен Тчуамени', en: 'Aurélien Tchouaméni' },
    number: 14,
    position: 'MID',
    role: { ru: 'Опорный полузащитник', en: 'Defensive Midfielder' },
    x: 29,
    y: 50,
    rating: 7.3,
  },
  {
    id: 'rma-5',
    fotmobId: 1077894,
    name: { ru: 'Джуд Беллингем', en: 'Jude Bellingham' },
    number: 5,
    position: 'MID',
    role: { ru: 'Атакующий полузащитник', en: 'Attacking Midfielder' },
    x: 31,
    y: 26,
    rating: 8.4,
    assists: 2,
  },
  {
    id: 'rma-11',
    fotmobId: 895369,
    name: { ru: 'Родриго Гоэс', en: 'Rodrygo Goes' },
    number: 11,
    position: 'FWD',
    role: { ru: 'Правый вингер', en: 'Right Winger' },
    x: 43,
    y: 78,
    rating: 7.6,
    subbedOutMinute: 78,
  },
  {
    id: 'rma-9',
    fotmobId: 701154,
    name: { ru: 'Килиан Мбаппе', en: 'Kylian Mbappé' },
    number: 9,
    position: 'FWD',
    role: { ru: 'Центральный нападающий', en: 'Center Forward' },
    x: 45,
    y: 50,
    rating: 9.6,
    goals: 3,
    subbedOutMinute: 86,
  },
  {
    id: 'rma-7',
    fotmobId: 846033,
    name: { ru: 'Винисиус Жуниор', en: 'Vinícius Júnior' },
    number: 7,
    position: 'FWD',
    role: { ru: 'Левый вингер', en: 'Left Winger' },
    x: 43,
    y: 22,
    rating: 8.7,
    assists: 1,
  },
];

const DEFAULT_AWAY_LINEUP: PitchPlayerNodeData[] = [
  {
    id: 'bar-1',
    fotmobId: 184554,
    name: { ru: 'Марк-Андре тер Штеген', en: 'Marc-André ter Stegen' },
    number: 1,
    position: 'GK',
    role: { ru: 'Вратарь', en: 'Goalkeeper' },
    x: 93.5,
    y: 50,
    rating: 6.8,
    isCaptain: true,
  },
  {
    id: 'bar-23',
    fotmobId: 737066,
    name: { ru: 'Жюль Кунде', en: 'Jules Koundé' },
    number: 23,
    position: 'DEF',
    role: { ru: 'Правый защитник', en: 'Right Back' },
    x: 82,
    y: 20,
    rating: 7.0,
  },
  {
    id: 'bar-2',
    fotmobId: 1526606,
    name: { ru: 'Пау Кубарси', en: 'Pau Cubarsí' },
    number: 2,
    position: 'DEF',
    role: { ru: 'Центральный защитник', en: 'Center Back' },
    x: 83,
    y: 40,
    rating: 7.1,
  },
  {
    id: 'bar-5',
    fotmobId: 212867,
    name: { ru: 'Иньиго Мартинес', en: 'Íñigo Martínez' },
    number: 5,
    position: 'DEF',
    role: { ru: 'Центральный защитник', en: 'Center Back' },
    x: 83,
    y: 60,
    rating: 6.9,
    yellowCard: true,
  },
  {
    id: 'bar-3',
    fotmobId: 1199268,
    name: { ru: 'Алехандро Бальде', en: 'Alejandro Balde' },
    number: 3,
    position: 'DEF',
    role: { ru: 'Левый защитник', en: 'Left Back' },
    x: 82,
    y: 80,
    rating: 7.2,
  },
  {
    id: 'bar-17',
    fotmobId: 1391376,
    name: { ru: 'Марк Касадо', en: 'Marc Casadó' },
    number: 17,
    position: 'MID',
    role: { ru: 'Опорный полузащитник', en: 'Defensive Midfielder' },
    x: 72,
    y: 36,
    rating: 7.1,
    subbedOutMinute: 74,
  },
  {
    id: 'bar-8',
    fotmobId: 1083323,
    name: { ru: 'Педри Гонсалес', en: 'Pedri González' },
    number: 8,
    position: 'MID',
    role: { ru: 'Центральный полузащитник', en: 'Central Midfielder' },
    x: 72,
    y: 64,
    rating: 8.0,
    assists: 1,
  },
  {
    id: 'bar-19',
    fotmobId: 1467236,
    name: { ru: 'Ламин Ямаль', en: 'Lamine Yamal' },
    number: 19,
    position: 'FWD',
    role: { ru: 'Правый инсайд', en: 'Right Inside Forward' },
    x: 62,
    y: 22,
    rating: 8.5,
    goals: 1,
  },
  {
    id: 'bar-20',
    fotmobId: 604480,
    name: { ru: 'Дани Ольмо', en: 'Dani Olmo' },
    number: 20,
    position: 'MID',
    role: { ru: 'Десятка / Плеймейкер', en: 'Attacking Midfielder' },
    x: 63,
    y: 50,
    rating: 7.5,
  },
  {
    id: 'bar-11',
    fotmobId: 696365,
    name: { ru: 'Рафинья Диас', en: 'Raphinha Dias' },
    number: 11,
    position: 'FWD',
    role: { ru: 'Левый вингер', en: 'Left Winger' },
    x: 62,
    y: 78,
    rating: 8.2,
    goals: 1,
    assists: 1,
  },
  {
    id: 'bar-9',
    fotmobId: 93447,
    name: { ru: 'Роберт Левандовски', en: 'Robert Lewandowski' },
    number: 9,
    position: 'FWD',
    role: { ru: 'Центральный нападающий', en: 'Striker' },
    x: 54.5,
    y: 50,
    rating: 7.4,
  },
];

/**
 * Ensures every player has valid horizontal pitch coordinates (x: 0..100, y: 0..100).
 * If coordinates are already defined, preserves them; otherwise computes columns from formation.
 */
function ensureFormationCoordinates(
  players: PitchPlayerNodeData[],
  formation: string,
  side: 'home' | 'away'
): PitchPlayerNodeData[] {
  if (!players || players.length === 0) return [];
  const hasExplicitCoords = players.every(
    (p) => typeof p.x === 'number' && typeof p.y === 'number' && (p.x > 0 || p.y > 0)
  );
  if (hasExplicitCoords) {
    return players;
  }

  const parsedCounts = formation
    .split('-')
    .map((n) => parseInt(n.trim(), 10))
    .filter((n) => !Number.isNaN(n) && n > 0);
  const counts =
    parsedCounts.reduce((acc, v) => acc + v, 0) === 10 ? parsedCounts : [4, 3, 3];

  const columns: PitchPlayerNodeData[][] = [[players[0]]];
  let idx = 1;
  for (const count of counts) {
    columns.push(players.slice(idx, idx + count));
    idx += count;
  }

  const totalCols = columns.length;
  const result: PitchPlayerNodeData[] = [];
  columns.forEach((col, cIdx) => {
    const xPos =
      side === 'home'
        ? cIdx === 0
          ? 6.5
          : 17 + ((cIdx - 1) * 28) / Math.max(1, totalCols - 2)
        : cIdx === 0
        ? 93.5
        : 83 - ((cIdx - 1) * 28) / Math.max(1, totalCols - 2);

    col.forEach((player, rIdx) => {
      const yPos = ((rIdx + 1) * 100) / (col.length + 1);
      result.push({
        ...player,
        x: Number(xPos.toFixed(1)),
        y: Number(yPos.toFixed(1)),
      });
    });
  });

  return result;
}

export function TacticalPitch({
  match,
  homeTeam,
  awayTeam,
  homeLineup,
  awayLineup,
  homeFormation,
  awayFormation,
  competition,
  lang,
  locale,
  onSelectPlayer,
  className = '',
}: TacticalPitchProps) {
  const activeLang: MatchLanguage = lang || locale || 'ru';
  const [teamFilter, setTeamFilter] = useState<'both' | 'home' | 'away'>('both');

  const resolvedHomeTeam: PitchTeamHeaderInfo = useMemo(() => {
    const base = match?.homeTeam || homeTeam || DEFAULT_HOME_TEAM;
    return {
      ...base,
      formation: homeFormation || base.formation || '4-3-3',
      primaryColor: base.primaryColor || '#22A64E',
    };
  }, [match?.homeTeam, homeTeam, homeFormation]);

  const resolvedAwayTeam: PitchTeamHeaderInfo = useMemo(() => {
    const base = match?.awayTeam || awayTeam || DEFAULT_AWAY_TEAM;
    return {
      ...base,
      formation: awayFormation || base.formation || '4-2-3-1',
      primaryColor: base.primaryColor || '#D89620',
    };
  }, [match?.awayTeam, awayTeam, awayFormation]);

  const resolvedHomePlayers = useMemo(() => {
    const raw =
      (match?.homeLineup && match.homeLineup.length > 0
        ? match.homeLineup
        : homeLineup && homeLineup.length > 0
        ? homeLineup
        : DEFAULT_HOME_LINEUP
      ).slice(0, 11);
    return ensureFormationCoordinates(raw, resolvedHomeTeam.formation, 'home');
  }, [match?.homeLineup, homeLineup, resolvedHomeTeam.formation]);

  const resolvedAwayPlayers = useMemo(() => {
    const raw =
      (match?.awayLineup && match.awayLineup.length > 0
        ? match.awayLineup
        : awayLineup && awayLineup.length > 0
        ? awayLineup
        : DEFAULT_AWAY_LINEUP
      ).slice(0, 11);
    return ensureFormationCoordinates(raw, resolvedAwayTeam.formation, 'away');
  }, [match?.awayLineup, awayLineup, resolvedAwayTeam.formation]);

  const [selectedState, setSelectedState] = useState<{
    player: PitchPlayerNodeData;
    side: 'home' | 'away';
  } | null>(() => {
    const starPlayer =
      resolvedHomePlayers.find((p) => (p.goals || 0) > 0) || resolvedHomePlayers[0];
    return starPlayer ? { player: starPlayer, side: 'home' } : null;
  });

  const homeTeamName = resolveBilingualText(resolvedHomeTeam.name, activeLang, 'Home');
  const awayTeamName = resolveBilingualText(resolvedAwayTeam.name, activeLang, 'Away');
  const competitionLabel = resolveBilingualText(
    competition || match?.league,
    activeLang,
    activeLang === 'ru'
      ? 'СТАРТОВЫЕ СОСТАВЫ • SOFASCORE TACTICAL PITCH'
      : 'STARTING XI • SOFASCORE TACTICAL PITCH'
  );

  const handlePlayerClick = (player: PitchPlayerNodeData, side: 'home' | 'away') => {
    setSelectedState({ player, side });
    onSelectPlayer?.(player, side);
  };

  const avgHomeRating = useMemo(() => {
    const rated = resolvedHomePlayers.filter((p) => typeof p.rating === 'number');
    if (rated.length === 0) return '7.5';
    const sum = rated.reduce((acc, p) => acc + (p.rating || 0), 0);
    return (sum / rated.length).toFixed(2);
  }, [resolvedHomePlayers]);

  const avgAwayRating = useMemo(() => {
    const rated = resolvedAwayPlayers.filter((p) => typeof p.rating === 'number');
    if (rated.length === 0) return '7.3';
    const sum = rated.reduce((acc, p) => acc + (p.rating || 0), 0);
    return (sum / rated.length).toFixed(2);
  }, [resolvedAwayPlayers]);

  const activePlayer = selectedState?.player;
  const activeSide = selectedState?.side || 'home';

  return (
    <section
      className={`golason-tactical-pitch ${className}`.trim()}
      aria-label={
        activeLang === 'ru'
          ? `Тактическая схема матча: ${homeTeamName} против ${awayTeamName}`
          : `Tactical match lineup: ${homeTeamName} vs ${awayTeamName}`
      }
      style={{
        backgroundColor: '#222428',
        borderRadius: '18px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.55)',
        overflow: 'hidden',
        color: '#FFFFFF',
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Top Broadcast Header Bar (Midnight Navy #091324 + Fiery Gold Accent) */}
      <header
        style={{
          backgroundColor: '#091324',
          padding: '14px 20px',
          borderBottom: '3px solid #FF6200',
          backgroundImage:
            'radial-gradient(circle at 50% 0%, rgba(255, 98, 0, 0.16), transparent 70%)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        {/* Left: Home Team + Formation Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {resolvedHomeTeam.logoUrl ? (
            <img
              src={resolvedHomeTeam.logoUrl}
              alt={homeTeamName}
              style={{
                width: '40px',
                height: '40px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))',
              }}
            />
          ) : (
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '999px',
                backgroundColor: '#22A64E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '13px',
              }}
            >
              {resolvedHomeTeam.shortName || homeTeamName.slice(0, 3).toUpperCase()}
            </div>
          )}

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '16px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                  color: '#FFFFFF',
                }}
              >
                {homeTeamName}
              </span>
              <span
                data-testid="home-formation-badge"
                style={{
                  backgroundColor: 'rgba(34, 166, 78, 0.22)',
                  border: '1.5px solid #22C55E',
                  color: '#4ADE80',
                  fontSize: '12px',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '999px',
                  letterSpacing: '0.04em',
                }}
              >
                {resolvedHomeTeam.formation}
              </span>
            </div>
            <div
              style={{
                fontSize: '11px',
                color: '#9CA3AF',
                marginTop: '2px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>
                {activeLang === 'ru' ? 'Ср. рейтинг:' : 'Avg Rating:'}{' '}
                <strong style={{ color: '#4ADE80' }}>{avgHomeRating}</strong>
              </span>
              <span>•</span>
              <span>{activeLang === 'ru' ? 'Хозяева' : 'Home XI'}</span>
            </div>
          </div>
        </div>

        {/* Center: Competition Title & Interactive View Filter */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#FFC400',
              textAlign: 'center',
            }}
          >
            🔥 {competitionLabel}
          </div>

          <div
            style={{
              display: 'inline-flex',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              borderRadius: '999px',
              padding: '2px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            {(
              [
                {
                  key: 'both',
                  labelRu: 'Обе схемы',
                  labelEn: 'Full Pitch',
                },
                {
                  key: 'home',
                  labelRu: `${resolvedHomeTeam.formation} (${
                    resolvedHomeTeam.shortName || 'Д'
                  })`,
                  labelEn: `${resolvedHomeTeam.formation} (${
                    resolvedHomeTeam.shortName || 'H'
                  })`,
                },
                {
                  key: 'away',
                  labelRu: `${resolvedAwayTeam.formation} (${
                    resolvedAwayTeam.shortName || 'Г'
                  })`,
                  labelEn: `${resolvedAwayTeam.formation} (${
                    resolvedAwayTeam.shortName || 'A'
                  })`,
                },
              ] as const
            ).map((tab) => {
              const isActive = teamFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setTeamFilter(tab.key)}
                  style={{
                    backgroundColor: isActive ? '#FF6200' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#D1D5DB',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '4px 10px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {activeLang === 'ru' ? tab.labelRu : tab.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Away Team + Formation Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginLeft: 'auto',
          }}
        >
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '8px',
              }}
            >
              <span
                data-testid="away-formation-badge"
                style={{
                  backgroundColor: 'rgba(216, 150, 32, 0.22)',
                  border: '1.5px solid #F59E0B',
                  color: '#FBBF24',
                  fontSize: '12px',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '999px',
                  letterSpacing: '0.04em',
                }}
              >
                {resolvedAwayTeam.formation}
              </span>
              <span
                style={{
                  fontSize: '16px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                  color: '#FFFFFF',
                }}
              >
                {awayTeamName}
              </span>
            </div>
            <div
              style={{
                fontSize: '11px',
                color: '#9CA3AF',
                marginTop: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '6px',
              }}
            >
              <span>{activeLang === 'ru' ? 'Гости' : 'Away XI'}</span>
              <span>•</span>
              <span>
                {activeLang === 'ru' ? 'Ср. рейтинг:' : 'Avg Rating:'}{' '}
                <strong style={{ color: '#FBBF24' }}>{avgAwayRating}</strong>
              </span>
            </div>
          </div>

          {resolvedAwayTeam.logoUrl ? (
            <img
              src={resolvedAwayTeam.logoUrl}
              alt={awayTeamName}
              style={{
                width: '40px',
                height: '40px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))',
              }}
            />
          ) : (
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '999px',
                backgroundColor: '#D89620',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '13px',
              }}
            >
              {resolvedAwayTeam.shortName || awayTeamName.slice(0, 3).toUpperCase()}
            </div>
          )}
        </div>
      </header>

      {/* Horizontal Dark-Mode Tactical Pitch Surface (#222428) */}
      <div
        style={{
          width: '100%',
          overflowX: 'auto',
          backgroundColor: '#222428',
          padding: '16px',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            minWidth: '780px',
            aspectRatio: '1600 / 920',
            backgroundColor: '#222428',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: 'inset 0 0 60px rgba(0, 0, 0, 0.45)',
          }}
        >
          {/* Crisp SVG Football Pitch Markings (Sofascore Dark Theme #222428 / #5C6068) */}
          <svg
            viewBox="0 0 1600 920"
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              display: 'block',
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          >
            {/* Dark Pitch Base */}
            <rect x="0" y="0" width="1600" height="920" fill="#222428" />

            {/* Subtle Vertical Mow Stripes */}
            {Array.from({ length: 16 }).map((_, idx) => (
              <rect
                key={idx}
                x={36 + idx * 95.5}
                y="28"
                width="47.75"
                height="864"
                fill="rgba(255, 255, 255, 0.014)"
              />
            ))}

            {/* Pitch Boundary Lines & Markings */}
            <g stroke="#5C6068" strokeWidth="3" fill="none">
              {/* Outer Touchlines & Goal Lines */}
              <rect x="36" y="28" width="1528" height="864" rx="2" />

              {/* Halfway Line */}
              <line x1="800" y1="28" x2="800" y2="892" />

              {/* Center Circle & Center Kickoff Spot */}
              <circle cx="800" cy="460" r="115" />
              <circle cx="800" cy="460" r="5" fill="#5C6068" />

              {/* Left Penalty Box (18-yard) & 6-yard Goal Area */}
              <rect x="36" y="240" width="190" height="440" />
              <rect x="36" y="355" width="72" height="210" />
              <circle cx="168" cy="460" r="4" fill="#5C6068" />
              {/* Left Penalty Arc (D) */}
              <path d="M 226 385 A 92 92 0 0 1 226 535" />
              {/* Left Goal Net */}
              <rect
                x="14"
                y="404"
                width="22"
                height="112"
                stroke="#464A52"
                strokeWidth="2"
                fill="rgba(255,255,255,0.03)"
              />

              {/* Right Penalty Box (18-yard) & 6-yard Goal Area */}
              <rect x="1374" y="240" width="190" height="440" />
              <rect x="1492" y="355" width="72" height="210" />
              <circle cx="1432" cy="460" r="4" fill="#5C6068" />
              {/* Right Penalty Arc (D) */}
              <path d="M 1374 385 A 92 92 0 0 0 1374 535" />
              {/* Right Goal Net */}
              <rect
                x="1564"
                y="404"
                width="22"
                height="112"
                stroke="#464A52"
                strokeWidth="2"
                fill="rgba(255,255,255,0.03)"
              />

              {/* 4 Corner Arcs */}
              <path d="M 36 54 A 26 26 0 0 0 62 28" />
              <path d="M 62 892 A 26 26 0 0 0 36 866" />
              <path d="M 1538 28 A 26 26 0 0 0 1564 54" />
              <path d="M 1564 866 A 26 26 0 0 0 1538 892" />
            </g>

            {/* Subtle Attacking Direction Arrows on Pitch */}
            <g opacity="0.22" fill="#9CA3AF" fontSize="18" fontWeight="800">
              <text x="410" y="56" textAnchor="middle">
                {homeTeamName.toUpperCase()} ({resolvedHomeTeam.formation}) ➔
              </text>
              <text x="1190" y="56" textAnchor="middle">
                ⬅ ({resolvedAwayTeam.formation}) {awayTeamName.toUpperCase()}
              </text>
            </g>
          </svg>

          {/* Interactive Home Squad Nodes (Left Side, 4-3-3) */}
          {(teamFilter === 'both' || teamFilter === 'home') &&
            resolvedHomePlayers.map((player) => (
              <PlayerNode
                key={`home-${player.id}-${player.number}`}
                player={player}
                teamSide="home"
                teamColor={resolvedHomeTeam.primaryColor || '#22A64E'}
                lang={activeLang}
                isSelected={
                  activePlayer?.id === player.id && activeSide === 'home'
                }
                onSelect={(p) => handlePlayerClick(p, 'home')}
              />
            ))}

          {/* Interactive Away Squad Nodes (Right Side, 4-2-3-1) */}
          {(teamFilter === 'both' || teamFilter === 'away') &&
            resolvedAwayPlayers.map((player) => (
              <PlayerNode
                key={`away-${player.id}-${player.number}`}
                player={player}
                teamSide="away"
                teamColor={resolvedAwayTeam.primaryColor || '#D89620'}
                lang={activeLang}
                isSelected={
                  activePlayer?.id === player.id && activeSide === 'away'
                }
                onSelect={(p) => handlePlayerClick(p, 'away')}
              />
            ))}
        </div>
      </div>

      {/* Interactive Player Spotlight & Legend Footer Bar */}
      {activePlayer && (
        <div
          style={{
            backgroundColor: '#16181D',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '12px 20px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
          }}
        >
          {/* Selected Player Studio Card */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '999px',
                backgroundColor: '#F2F4F8',
                border: `2px solid ${
                  activeSide === 'home' ? '#22C55E' : '#F59E0B'
                }`,
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <img
                src={
                  activePlayer.photoUrl ||
                  getFotmobPortraitUrl(activePlayer.fotmobId)
                }
                alt={resolveBilingualText(activePlayer.name, activeLang)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    backgroundColor:
                      activeSide === 'home' ? '#22A64E' : '#D89620',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '2px 6px',
                    borderRadius: '5px',
                  }}
                >
                  #{activePlayer.number}
                </span>
                <span style={{ fontSize: '15px', fontWeight: 800 }}>
                  {resolveBilingualText(activePlayer.name, activeLang)}
                </span>
                {activePlayer.rating !== undefined && (
                  <span
                    style={{
                      backgroundColor:
                        activePlayer.rating >= 8.0 ? '#0284C7' : '#16A34A',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '2px 7px',
                      borderRadius: '6px',
                    }}
                  >
                    ★ {activePlayer.rating.toFixed(1)}
                  </span>
                )}
              </div>

              <div
                style={{
                  fontSize: '12px',
                  color: '#9CA3AF',
                  marginTop: '3px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span>
                  {activeSide === 'home' ? homeTeamName : awayTeamName} (
                  {activeSide === 'home'
                    ? resolvedHomeTeam.formation
                    : resolvedAwayTeam.formation}
                  )
                </span>
                {activePlayer.role && (
                  <>
                    <span>•</span>
                    <span style={{ color: '#D1D5DB' }}>
                      {resolveBilingualText(activePlayer.role, activeLang)}
                    </span>
                  </>
                )}
                {activePlayer.goals ? (
                  <span style={{ color: '#FFC400', fontWeight: 700 }}>
                    ⚽ {activePlayer.goals}{' '}
                    {activeLang === 'ru' ? 'гол(а)' : 'goal(s)'}
                  </span>
                ) : null}
                {activePlayer.assists ? (
                  <span style={{ color: '#38BDF8', fontWeight: 700 }}>
                    👟 {activePlayer.assists}{' '}
                    {activeLang === 'ru' ? 'ассист(а)' : 'assist(s)'}
                  </span>
                ) : null}
                {activePlayer.subbedOutMinute ? (
                  <span style={{ color: '#F87171', fontWeight: 700 }}>
                    ▼ {activeLang === 'ru' ? 'Заменен на' : 'Subbed off'}{' '}
                    {activePlayer.subbedOutMinute}&apos;
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          {/* Pitch Legend */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '12px',
              fontSize: '11px',
              color: '#9CA3AF',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '999px',
                  backgroundColor: '#22C55E',
                }}
              />
              {activeLang === 'ru' ? '▲ Вышел' : '▲ Sub On'}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '999px',
                  backgroundColor: '#EF4444',
                }}
              />
              {activeLang === 'ru' ? '▼ Заменен' : '▼ Sub Off'}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span>⚽</span>
              {activeLang === 'ru' ? 'Гол' : 'Goal'}
            </span>
            <span style={{ color: '#6B7280' }}>
              {activeLang === 'ru'
                ? 'Нажмите на игрока для статистики'
                : 'Click any player node for stats'}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

export default TacticalPitch;
