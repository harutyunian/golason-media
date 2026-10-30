'use client';

import React, { useMemo, useRef, useState } from 'react';
import { MatchPill, TickerLeagueKey, TickerMatch } from './MatchPill';

export interface LeagueFilterOption {
  id: TickerLeagueKey;
  labelEn: string;
  labelRu: string;
  badge: string;
}

export const TICKER_LEAGUE_FILTERS: LeagueFilterOption[] = [
  { id: 'ALL', labelEn: 'ALL', labelRu: 'ВСЕ', badge: '🔥' },
  { id: 'LA LIGA', labelEn: 'LA LIGA', labelRu: 'ЛА ЛИГА', badge: '🇪🇸' },
  { id: 'EPL', labelEn: 'EPL', labelRu: 'АПЛ', badge: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'UCL', labelEn: 'UCL', labelRu: 'ЛЧ УЕФА', badge: '⭐' },
  { id: 'SERIE A', labelEn: 'SERIE A', labelRu: 'СЕРИЯ А', badge: '🇮🇹' },
  { id: 'SAUDI', labelEn: 'SAUDI', labelRu: 'САУД. ЛИГА', badge: '🇸🇦' },
];

export const DEFAULT_TICKER_MATCHES: TickerMatch[] = [
  {
    id: 'ucl-rma-mci',
    league: 'UCL',
    leagueLabelRu: 'ЛЧ УЕФА',
    status: 'LIVE',
    statusText: "LIVE 78'",
    statusTextRu: "LIVE 78'",
    minute: 78,
    homeTeam: {
      id: 'real-madrid',
      name: 'Real Madrid',
      nameRu: 'Реал Мадрид',
      shortName: 'RMA',
      crest: '👑',
      crestBg: 'rgba(255, 196, 0, 0.22)',
      score: 3,
    },
    awayTeam: {
      id: 'man-city',
      name: 'Man City',
      nameRu: 'Ман Сити',
      shortName: 'MCI',
      crest: '💠',
      crestBg: 'rgba(56, 189, 248, 0.22)',
      score: 2,
    },
    telegramHighlightUrl: 'https://t.me/futbolnaya_jara/4821',
    highlightCount: 5,
    isFeatured: true,
  },
  {
    id: 'laliga-bar-atm',
    league: 'LA LIGA',
    leagueLabelRu: 'ЛА ЛИГА',
    status: 'LIVE',
    statusText: "LIVE 64'",
    statusTextRu: "LIVE 64'",
    minute: 64,
    homeTeam: {
      id: 'barcelona',
      name: 'Barcelona',
      nameRu: 'Барселона',
      shortName: 'BAR',
      crest: '🔵',
      crestBg: 'rgba(220, 38, 38, 0.24)',
      score: 2,
    },
    awayTeam: {
      id: 'atletico',
      name: 'Atlético Madrid',
      nameRu: 'Атлетико М',
      shortName: 'ATM',
      crest: '🔴',
      crestBg: 'rgba(239, 68, 68, 0.2)',
      score: 1,
      redCards: 1,
    },
    telegramHighlightUrl: 'https://t.me/futbolnaya_jara/4824',
    highlightCount: 3,
  },
  {
    id: 'epl-ars-liv',
    league: 'EPL',
    leagueLabelRu: 'АПЛ',
    status: 'LIVE',
    statusText: "LIVE 83'",
    statusTextRu: "LIVE 83'",
    minute: 83,
    homeTeam: {
      id: 'arsenal',
      name: 'Arsenal',
      nameRu: 'Арсенал',
      shortName: 'ARS',
      crest: '🛡️',
      crestBg: 'rgba(239, 68, 68, 0.25)',
      score: 2,
    },
    awayTeam: {
      id: 'liverpool',
      name: 'Liverpool',
      nameRu: 'Ливерпуль',
      shortName: 'LIV',
      crest: '🦅',
      crestBg: 'rgba(185, 28, 28, 0.28)',
      score: 2,
    },
    telegramHighlightUrl: 'https://t.me/futbolnaya_jara/4829',
    highlightCount: 4,
  },
  {
    id: 'seriea-int-juv',
    league: 'SERIE A',
    leagueLabelRu: 'СЕРИЯ А',
    status: 'FT',
    statusText: 'FT',
    statusTextRu: 'ЗАВЕРШЕН',
    homeTeam: {
      id: 'inter',
      name: 'Inter Milan',
      nameRu: 'Интер',
      shortName: 'INT',
      crest: '🐍',
      crestBg: 'rgba(37, 99, 235, 0.25)',
      score: 2,
    },
    awayTeam: {
      id: 'juventus',
      name: 'Juventus',
      nameRu: 'Ювентус',
      shortName: 'JUV',
      crest: '🦓',
      crestBg: 'rgba(255, 255, 255, 0.14)',
      score: 0,
    },
    telegramHighlightUrl: 'https://t.me/futbolnaya_jara/4815',
    highlightCount: 2,
  },
  {
    id: 'saudi-nas-hil',
    league: 'SAUDI',
    leagueLabelRu: 'САУД. ЛИГА',
    status: 'LIVE',
    statusText: "LIVE 51'",
    statusTextRu: "LIVE 51'",
    minute: 51,
    homeTeam: {
      id: 'al-nassr',
      name: 'Al-Nassr',
      nameRu: 'Аль-Наср',
      shortName: 'NAS',
      crest: '⚡',
      crestBg: 'rgba(255, 196, 0, 0.24)',
      score: 2,
    },
    awayTeam: {
      id: 'al-hilal',
      name: 'Al-Hilal',
      nameRu: 'Аль-Хиляль',
      shortName: 'HIL',
      crest: '🌙',
      crestBg: 'rgba(59, 130, 246, 0.24)',
      score: 1,
    },
    telegramHighlightUrl: 'https://t.me/futbolnaya_jara/4830',
    highlightCount: 3,
  },
  {
    id: 'ucl-bay-psg',
    league: 'UCL',
    leagueLabelRu: 'ЛЧ УЕФА',
    status: 'UPCOMING',
    statusText: '22:00 MSK',
    statusTextRu: '22:00 МСК',
    homeTeam: {
      id: 'bayern',
      name: 'Bayern Munich',
      nameRu: 'Бавария',
      shortName: 'BAY',
      crest: '🔴',
      crestBg: 'rgba(220, 38, 38, 0.25)',
    },
    awayTeam: {
      id: 'psg',
      name: 'Paris SG',
      nameRu: 'ПСЖ',
      shortName: 'PSG',
      crest: '🗼',
      crestBg: 'rgba(30, 64, 175, 0.28)',
    },
    telegramHighlightUrl: 'https://t.me/futbolnaya_jara/4832',
  },
  {
    id: 'laliga-soc-vil',
    league: 'LA LIGA',
    leagueLabelRu: 'ЛА ЛИГА',
    status: 'FT',
    statusText: 'FT',
    statusTextRu: 'ЗАВЕРШЕН',
    homeTeam: {
      id: 'real-sociedad',
      name: 'Real Sociedad',
      nameRu: 'Реал Сосьедад',
      shortName: 'RSO',
      crest: '⚪',
      crestBg: 'rgba(59, 130, 246, 0.2)',
      score: 1,
    },
    awayTeam: {
      id: 'villarreal',
      name: 'Villarreal',
      nameRu: 'Вильярреал',
      shortName: 'VIL',
      crest: '🟡',
      crestBg: 'rgba(250, 204, 21, 0.22)',
      score: 1,
    },
    telegramHighlightUrl: 'https://t.me/futbolnaya_jara/4812',
    highlightCount: 2,
  },
  {
    id: 'seriea-mil-nap',
    league: 'SERIE A',
    leagueLabelRu: 'СЕРИЯ А',
    status: 'UPCOMING',
    statusText: '22:45 MSK',
    statusTextRu: '22:45 МСК',
    homeTeam: {
      id: 'ac-milan',
      name: 'AC Milan',
      nameRu: 'Милан',
      shortName: 'MIL',
      crest: '👹',
      crestBg: 'rgba(185, 28, 28, 0.25)',
    },
    awayTeam: {
      id: 'napoli',
      name: 'Napoli',
      nameRu: 'Наполи',
      shortName: 'NAP',
      crest: '🌊',
      crestBg: 'rgba(14, 165, 233, 0.25)',
    },
    telegramHighlightUrl: 'https://t.me/futbolnaya_jara/4835',
  },
];

export interface LiveScoreTickerProps {
  matches?: TickerMatch[];
  lang?: 'ru' | 'en';
  locale?: 'ru' | 'en';
  initialLeague?: TickerLeagueKey;
  selectedMatchId?: string;
  onSelectMatch?: (match: TickerMatch) => void;
  onLeagueChange?: (league: TickerLeagueKey) => void;
}

export function LiveScoreTicker({
  matches = DEFAULT_TICKER_MATCHES,
  lang,
  locale,
  initialLeague = 'ALL',
  selectedMatchId,
  onSelectMatch,
  onLeagueChange,
}: LiveScoreTickerProps) {
  const [activeLeague, setActiveLeague] = useState<TickerLeagueKey>(initialLeague);
  const [onlyLive, setOnlyLive] = useState<boolean>(false);
  const [internalSelectedId, setInternalSelectedId] = useState<string | undefined>(
    selectedMatchId
  );
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const activeLang: 'ru' | 'en' = lang ?? locale ?? 'ru';
  const currentSelectedId = selectedMatchId ?? internalSelectedId;

  const liveCount = useMemo(
    () => matches.filter((m) => m.status === 'LIVE' || m.status === 'HT').length,
    [matches]
  );

  const filteredMatches = useMemo(() => {
    return matches.filter((m) => {
      const leagueMatch =
        activeLeague === 'ALL' ||
        m.league.toUpperCase() === activeLeague.toUpperCase();
      const liveMatch = !onlyLive || m.status === 'LIVE' || m.status === 'HT';
      return leagueMatch && liveMatch;
    });
  }, [matches, activeLeague, onlyLive]);

  const handleLeagueSelect = (leagueId: TickerLeagueKey) => {
    setActiveLeague(leagueId);
    onLeagueChange?.(leagueId);
  };

  const handleMatchSelect = (match: TickerMatch) => {
    setInternalSelectedId(match.id);
    onSelectMatch?.(match);
  };

  const scrollTicker = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const offset = direction === 'left' ? -460 : 460;
    scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section
      aria-label={
        activeLang === 'ru' ? 'Табло текущих матчей' : 'Live Match Score Ticker'
      }
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        background:
          'linear-gradient(180deg, var(--bg-navy, #091324) 0%, rgba(9, 19, 36, 0.96) 100%)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 98, 0, 0.32)',
        boxShadow: '0 8px 28px rgba(0, 0, 0, 0.48)',
        color: '#F8FAFC',
        fontFamily:
          'var(--font-sans, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
      }}
    >
      <style>{`
        @keyframes golasonPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.45);
            opacity: 0.45;
          }
        }
        .golason-ticker-scroll::-webkit-scrollbar {
          height: 4px;
        }
        .golason-ticker-scroll::-webkit-scrollbar-track {
          background: rgba(9, 19, 36, 0.6);
        }
        .golason-ticker-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 98, 0, 0.45);
          border-radius: 999px;
        }
      `}</style>

      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '8px 16px 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {/* Top Control Bar: Live Center Badge + League Filter Pills + Scroll Arrows */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          {/* Left: Brand Live Indicator + Filter Tabs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              overflowX: 'auto',
              paddingBottom: '2px',
            }}
          >
            {/* Live Match Center Pill */}
            <button
              type="button"
              onClick={() => setOnlyLive((prev) => !prev)}
              title={
                activeLang === 'ru'
                  ? 'Показать только LIVE матчи'
                  : 'Filter LIVE matches only'
              }
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '6px',
                border: onlyLive
                  ? '1px solid #FFC400'
                  : '1px solid rgba(255, 98, 0, 0.5)',
                background: onlyLive
                  ? 'linear-gradient(135deg, #FF6200 0%, #FFC400 100%)'
                  : 'rgba(255, 98, 0, 0.16)',
                color: onlyLive ? '#091324' : '#FFC400',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: onlyLive ? '#091324' : '#FF6200',
                  boxShadow: onlyLive ? 'none' : '0 0 8px #FF6200',
                  animation: 'golasonPulse 1.4s ease-in-out infinite',
                }}
              />
              <span>
                {activeLang === 'ru' ? 'LIVE ЦЕНТР' : 'LIVE CENTER'} ({liveCount})
              </span>
            </button>

            <span
              aria-hidden="true"
              style={{
                width: '1px',
                height: '18px',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                margin: '0 2px',
                flexShrink: 0,
              }}
            />

            {/* League Filter Pills: ALL, LA LIGA, EPL, UCL, SERIE A, SAUDI */}
            <div
              role="tablist"
              aria-label={
                activeLang === 'ru' ? 'Фильтр турниров' : 'League filter tabs'
              }
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              {TICKER_LEAGUE_FILTERS.map((filter) => {
                const isActive = activeLeague === filter.id;
                const label =
                  activeLang === 'ru' ? filter.labelRu : filter.labelEn;

                return (
                  <button
                    key={filter.id}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() => handleLeagueSelect(filter.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: isActive ? 800 : 600,
                      letterSpacing: '0.04em',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      border: isActive
                        ? '1px solid var(--accent-gold, #FFC400)'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      background: isActive
                        ? 'linear-gradient(135deg, #FF6200 0%, #FF8800 100%)'
                        : 'rgba(15, 29, 54, 0.85)',
                      color: isActive ? '#FFFFFF' : '#CBD5E1',
                      boxShadow: isActive
                        ? '0 2px 10px rgba(255, 98, 0, 0.35)'
                        : 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span aria-hidden="true" style={{ fontSize: '11px' }}>
                      {filter.badge}
                    </span>
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Telegram Live Stream link + Horizontal Scroll Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <a
              href="https://t.me/futbolnaya_jara"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--accent-gold, #FFC400)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 9px',
                borderRadius: '6px',
                background: 'rgba(255, 196, 0, 0.1)',
                border: '1px solid rgba(255, 196, 0, 0.25)',
                whiteSpace: 'nowrap',
              }}
            >
              <span>⚡</span>
              <span>
                {activeLang === 'ru'
                  ? 'Футбольная Жара · TG'
                  : 'Futbolnaya Jara · TG'}
              </span>
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                type="button"
                aria-label={
                  activeLang === 'ru' ? 'Прокрутить влево' : 'Scroll left'
                }
                onClick={() => scrollTicker('left')}
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  background: 'rgba(15, 29, 54, 0.9)',
                  color: '#F8FAFC',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 800,
                }}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label={
                  activeLang === 'ru' ? 'Прокрутить вправо' : 'Scroll right'
                }
                onClick={() => scrollTicker('right')}
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  background: 'rgba(15, 29, 54, 0.9)',
                  color: '#F8FAFC',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 800,
                }}
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Match Pills Strip */}
        <div
          ref={scrollContainerRef}
          className="golason-ticker-scroll"
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '4px',
            scrollBehavior: 'smooth',
          }}
        >
          {filteredMatches.length > 0 ? (
            filteredMatches.map((match) => (
              <MatchPill
                key={match.id}
                match={match}
                lang={activeLang}
                isSelected={currentSelectedId === match.id}
                onSelect={handleMatchSelect}
              />
            ))
          ) : (
            <div
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px dashed rgba(255, 196, 0, 0.25)',
                color: '#94A3B8',
                fontSize: '12px',
                textAlign: 'center',
              }}
            >
              {activeLang === 'ru'
                ? 'Нет активных матчей для выбранного фильтра лиги.'
                : 'No active matches found for the selected league filter.'}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default LiveScoreTicker;
