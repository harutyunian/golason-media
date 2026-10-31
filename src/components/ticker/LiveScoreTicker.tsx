'use client';

import React, { useMemo, useRef, useState } from 'react';
import { MatchPill, TickerLeagueKey, TickerMatch } from './MatchPill';
import { REAL_TICKER_MATCHES } from '@/lib/realDataBridge';

export interface LeagueFilterOption {
  id: TickerLeagueKey;
  labelEn: string;
  labelRu: string;
  badge?: string;
}

export const TICKER_LEAGUE_FILTERS: LeagueFilterOption[] = [
  { id: 'ALL', labelEn: 'ALL', labelRu: 'ВСЕ', badge: '' },
  { id: 'LA LIGA', labelEn: 'LA LIGA', labelRu: 'ЛА ЛИГА', badge: '' },
  { id: 'EPL', labelEn: 'EPL', labelRu: 'АПЛ', badge: '' },
  { id: 'UCL', labelEn: 'UCL', labelRu: 'ЛЧ УЕФА', badge: '' },
  { id: 'SERIE A', labelEn: 'SERIE A', labelRu: 'СЕРИЯ А', badge: '' },
  { id: 'SAUDI', labelEn: 'SAUDI', labelRu: 'САУД. ЛИГА', badge: '' },
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
      crest: 'RMA',
      crestBg: 'rgba(255, 196, 0, 0.22)',
      score: 3,
    },
    awayTeam: {
      id: 'man-city',
      name: 'Man City',
      nameRu: 'Ман Сити',
      shortName: 'MCI',
      crest: 'MCI',
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
      crest: 'BAR',
      crestBg: 'rgba(220, 38, 38, 0.24)',
      score: 2,
    },
    awayTeam: {
      id: 'atletico',
      name: 'Atlético Madrid',
      nameRu: 'Атлетико М',
      shortName: 'ATM',
      crest: 'ATM',
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
      crest: 'ARS',
      crestBg: 'rgba(239, 68, 68, 0.25)',
      score: 2,
    },
    awayTeam: {
      id: 'liverpool',
      name: 'Liverpool',
      nameRu: 'Ливерпуль',
      shortName: 'LIV',
      crest: 'LIV',
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
      crest: 'INT',
      crestBg: 'rgba(37, 99, 235, 0.25)',
      score: 2,
    },
    awayTeam: {
      id: 'juventus',
      name: 'Juventus',
      nameRu: 'Ювентус',
      shortName: 'JUV',
      crest: 'JUV',
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
      crest: 'NAS',
      crestBg: 'rgba(255, 196, 0, 0.24)',
      score: 2,
    },
    awayTeam: {
      id: 'al-hilal',
      name: 'Al-Hilal',
      nameRu: 'Аль-Хиляль',
      shortName: 'HIL',
      crest: 'HIL',
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
      crest: 'BAY',
      crestBg: 'rgba(220, 38, 38, 0.25)',
    },
    awayTeam: {
      id: 'psg',
      name: 'Paris SG',
      nameRu: 'ПСЖ',
      shortName: 'PSG',
      crest: 'PSG',
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
      crest: 'RSO',
      crestBg: 'rgba(59, 130, 246, 0.2)',
      score: 1,
    },
    awayTeam: {
      id: 'villarreal',
      name: 'Villarreal',
      nameRu: 'Вильярреал',
      shortName: 'VIL',
      crest: 'VIL',
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
      crest: 'MIL',
      crestBg: 'rgba(185, 28, 28, 0.25)',
    },
    awayTeam: {
      id: 'napoli',
      name: 'Napoli',
      nameRu: 'Наполи',
      shortName: 'NAP',
      crest: 'NAP',
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
  matches = REAL_TICKER_MATCHES,
  lang,
  locale,
  initialLeague = 'ALL',
  selectedMatchId,
  onSelectMatch,
  onLeagueChange,
}: LiveScoreTickerProps) {
  const [activeLeague, setActiveLeague] = useState<TickerLeagueKey>(initialLeague);
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
      return (
        activeLeague === 'ALL' ||
        m.league.toUpperCase() === activeLeague.toUpperCase()
      );
    });
  }, [matches, activeLeague]);

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
        position: 'relative',
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        color: '#111827',
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
          height: 3px;
        }
        .golason-ticker-scroll::-webkit-scrollbar-track {
          background: #F3F4F6;
        }
        .golason-ticker-scroll::-webkit-scrollbar-thumb {
          background: #D1D5DB;
        }
      `}</style>

      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '8px 20px 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {/* Top Control Bar: Live Center Route Link + Clean League Filter Tabs + Scroll Arrows */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          {/* Left: LIVE ЦЕНТР Link (/live) + Pure Typography League Filter Tabs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              overflowX: 'auto',
              paddingBottom: '2px',
            }}
          >
            {/* LIVE ЦЕНТР Direct Navigation Button -> /live */}
            <a
              href="/live"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.href = '/live';
                }
              }}
              title={
                activeLang === 'ru'
                  ? 'Перейти в Матч-центр LIVE'
                  : 'Go to LIVE Match Center'
              }
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '5px 11px',
                border: '1px solid #DC2626',
                backgroundColor: '#DC2626',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  animation: 'golasonPulse 1.4s ease-in-out infinite',
                }}
              />
              <span>
                {activeLang === 'ru' ? 'LIVE ЦЕНТР' : 'LIVE CENTER'} ({liveCount})
              </span>
            </a>

            <span
              aria-hidden="true"
              style={{
                width: '1px',
                height: '18px',
                backgroundColor: '#E5E7EB',
                margin: '0 4px',
                flexShrink: 0,
              }}
            />

            {/* League Filter Tabs: ВСЕ, ЛА ЛИГА, АПЛ, ЛЧ УЕФА, СЕРИЯ А, САУД. ЛИГА (Zero Emojis) */}
            <div
              role="tablist"
              aria-label={
                activeLang === 'ru' ? 'Фильтр турниров' : 'League filter tabs'
              }
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
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
                      justifyContent: 'center',
                      padding: '5px 10px',
                      fontSize: '11px',
                      fontWeight: isActive ? 800 : 600,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      border: isActive
                        ? '1px solid #111827'
                        : '1px solid #E5E7EB',
                      backgroundColor: isActive ? '#111827' : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : '#374151',
                      whiteSpace: 'nowrap',
                    }}
                  >
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
                color: '#111827',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 10px',
                backgroundColor: '#F9FAFB',
                border: '1px solid #E5E7EB',
                whiteSpace: 'nowrap',
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M21 3L3 10.5L10.2 13.5M21 3L14.5 21L10.2 13.5M21 3L10.2 13.5"
                  stroke="#DC2626"
                  strokeWidth="2"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
              </svg>
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
                  border: '1px solid #E5E7EB',
                  backgroundColor: '#FFFFFF',
                  color: '#111827',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M10 3.5L5.5 8L10 12.5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="square"
                  />
                </svg>
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
                  border: '1px solid #E5E7EB',
                  backgroundColor: '#FFFFFF',
                  color: '#111827',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6 3.5L10.5 8L6 12.5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="square"
                  />
                </svg>
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
                border: '1px solid #E5E7EB',
                backgroundColor: '#F9FAFB',
                color: '#6B7280',
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
