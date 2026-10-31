'use client';

import React, { useState } from 'react';
import { ClubLogo } from '@/lib/clubLogos';

export type MatchStatus = 'LIVE' | 'HT' | 'FT' | 'UPCOMING';

export type TickerLeagueKey = 'ALL' | 'LA LIGA' | 'EPL' | 'UCL' | 'SERIE A' | 'SAUDI';

export interface TickerTeamInfo {
  id?: string;
  name: string;
  nameRu?: string;
  shortName?: string;
  crest: string;
  crestBg?: string;
  score?: number;
  redCards?: number;
}

export interface TickerMatch {
  id: string;
  league: Exclude<TickerLeagueKey, 'ALL'> | string;
  leagueLabelRu?: string;
  status: MatchStatus;
  statusText: string;
  statusTextRu?: string;
  minute?: number;
  homeTeam: TickerTeamInfo;
  awayTeam: TickerTeamInfo;
  telegramHighlightUrl?: string;
  highlightCount?: number;
  isFeatured?: boolean;
}

export interface MatchPillProps {
  match: TickerMatch;
  lang?: 'ru' | 'en';
  locale?: 'ru' | 'en';
  isSelected?: boolean;
  onSelect?: (match: TickerMatch) => void;
}

export function MatchPill({
  match,
  lang,
  locale,
  isSelected = false,
  onSelect,
}: MatchPillProps) {
  const [isHovered, setIsHovered] = useState(false);
  const activeLang: 'ru' | 'en' = lang ?? locale ?? 'ru';

  const isLive = match.status === 'LIVE' || match.status === 'HT';
  const isFinished = match.status === 'FT';
  const isUpcoming = match.status === 'UPCOMING';

  const homeScore = match.homeTeam.score ?? 0;
  const awayScore = match.awayTeam.score ?? 0;
  const homeWinning = !isUpcoming && homeScore > awayScore;
  const awayWinning = !isUpcoming && awayScore > homeScore;

  const displayStatus =
    activeLang === 'ru' && match.statusTextRu ? match.statusTextRu : match.statusText;

  const displayLeague =
    activeLang === 'ru' && match.leagueLabelRu ? match.leagueLabelRu : match.league;

  const homeName =
    activeLang === 'ru' && match.homeTeam.nameRu
      ? match.homeTeam.nameRu
      : match.homeTeam.name;

  const awayName =
    activeLang === 'ru' && match.awayTeam.nameRu
      ? match.awayTeam.nameRu
      : match.awayTeam.name;

  const tgUrl = match.telegramHighlightUrl || 'https://t.me/futbolnaya_jara';

  const borderColor = isSelected
    ? '#EA580C'
    : isLive
    ? 'rgba(255, 98, 0, 0.55)'
    : isHovered
    ? '#94A3B8'
    : '#E2E8F0';

  const cardBackground = isSelected
    ? 'linear-gradient(145deg, #FFF7ED 0%, #FFFFFF 100%)'
    : isLive
    ? 'linear-gradient(145deg, #FFFFFF 0%, #FFF7ED 100%)'
    : '#FFFFFF';

  return (
    <div
      role={onSelect ? 'button' : 'article'}
      tabIndex={onSelect ? 0 : undefined}
      aria-label={`${homeName} vs ${awayName} (${displayStatus})`}
      onClick={() => onSelect?.(match)}
      onKeyDown={(e) => {
        if (onSelect && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onSelect(match);
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        minWidth: '218px',
        maxWidth: '240px',
        background: cardBackground,
        border: `1px solid ${borderColor}`,
        borderRadius: '10px',
        padding: '8px 11px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '6px',
        cursor: onSelect ? 'pointer' : 'default',
        transition: 'transform 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease',
        transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
        boxShadow: isLive
          ? '0 4px 14px rgba(255, 98, 0, 0.12)'
          : isHovered
          ? '0 4px 12px rgba(15, 23, 42, 0.08)'
          : '0 2px 6px rgba(15, 23, 42, 0.04)',
        flexShrink: 0,
        userSelect: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top accent bar for LIVE matches */}
      {isLive && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, #FF6200 0%, #FFC400 50%, #FF6200 100%)',
          }}
        />
      )}

      {/* Header row: League label + Status badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '6px',
        }}
      >
        <span
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#64748B',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {displayLeague}
        </span>

        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '2px 6px',
            borderRadius: '999px',
            fontSize: '10px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            background: isLive
              ? 'rgba(255, 98, 0, 0.2)'
              : isFinished
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(255, 196, 0, 0.12)',
            color: isLive
              ? 'var(--accent-orange, #FF6200)'
              : isFinished
              ? '#94A3B8'
              : 'var(--accent-gold, #FFC400)',
            border: isLive
              ? '1px solid rgba(255, 98, 0, 0.45)'
              : isFinished
              ? '1px solid rgba(255, 255, 255, 0.08)'
              : '1px solid rgba(255, 196, 0, 0.28)',
          }}
        >
          {isLive && (
            <span
              aria-hidden="true"
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#FF6200',
                boxShadow: '0 0 8px #FF6200, 0 0 12px #FFC400',
                display: 'inline-block',
                animation: 'golasonPulse 1.4s ease-in-out infinite',
              }}
            />
          )}
          {displayStatus}
        </span>
      </div>

      {/* Teams & Scores */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {/* Home Team Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              minWidth: 0,
              flex: 1,
            }}
          >
            <ClubLogo
              teamId={match.homeTeam.id}
              teamName={match.homeTeam.name}
              teamNameRu={match.homeTeam.nameRu}
              fallbackText={match.homeTeam.crest}
              size={22}
            />
            <span
              style={{
                fontSize: '12.5px',
                fontWeight: homeWinning || isLive ? 800 : 600,
                color:
                  isFinished && awayWinning
                    ? '#64748B'
                    : '#0F172A',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {homeName}
            </span>
            {(match.homeTeam.redCards ?? 0) > 0 && (
              <span
                title={
                  activeLang === 'ru' ? 'Красная карточка' : 'Red Card'
                }
                style={{
                  width: '6px',
                  height: '9px',
                  borderRadius: '1.5px',
                  backgroundColor: '#EF4444',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
            )}
          </div>

          <span
            style={{
              fontSize: '13.5px',
              fontWeight: 800,
              fontVariantNumeric: 'tabular-nums',
              color: isUpcoming
                ? '#94A3B8'
                : isLive || homeWinning
                ? '#EA580C'
                : '#0F172A',
              textShadow: 'none',
            }}
          >
            {isUpcoming ? '—' : homeScore}
          </span>
        </div>

        {/* Away Team Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              minWidth: 0,
              flex: 1,
            }}
          >
            <ClubLogo
              teamId={match.awayTeam.id}
              teamName={match.awayTeam.name}
              teamNameRu={match.awayTeam.nameRu}
              fallbackText={match.awayTeam.crest}
              size={22}
            />
            <span
              style={{
                fontSize: '12.5px',
                fontWeight: awayWinning || isLive ? 800 : 600,
                color:
                  isFinished && homeWinning
                    ? '#64748B'
                    : '#0F172A',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {awayName}
            </span>
            {(match.awayTeam.redCards ?? 0) > 0 && (
              <span
                title={
                  activeLang === 'ru' ? 'Красная карточка' : 'Red Card'
                }
                style={{
                  width: '6px',
                  height: '9px',
                  borderRadius: '1.5px',
                  backgroundColor: '#EF4444',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
            )}
          </div>

          <span
            style={{
              fontSize: '13.5px',
              fontWeight: 800,
              fontVariantNumeric: 'tabular-nums',
              color: isUpcoming
                ? '#94A3B8'
                : isLive || awayWinning
                ? '#EA580C'
                : '#0F172A',
              textShadow: 'none',
            }}
          >
            {isUpcoming ? '—' : awayScore}
          </span>
        </div>
      </div>

      {/* Footer: Telegram Video Highlights Link */}
      <div
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '6px',
        }}
      >
        <a
          href={tgUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '10.5px',
            fontWeight: 700,
            color: isLive ? '#FFC400' : '#FF6200',
            textDecoration: 'none',
            letterSpacing: '0.02em',
          }}
        >
          <span aria-hidden="true" style={{ fontSize: '11px' }}>
            ▶
          </span>
          <span>
            {activeLang === 'ru'
              ? isUpcoming
                ? 'Превью в TG'
                : 'Видео голов · TG'
              : isUpcoming
              ? 'TG Match Preview'
              : 'TG Video Highlights'}
          </span>
        </a>

        {match.highlightCount && match.highlightCount > 0 ? (
          <span
            style={{
              fontSize: '9.5px',
              fontWeight: 700,
              color: '#091324',
              backgroundColor: '#FFC400',
              borderRadius: '4px',
              padding: '1px 4px',
            }}
          >
            {match.highlightCount} {activeLang === 'ru' ? 'клипа' : 'clips'}
          </span>
        ) : (
          <span
            style={{
              fontSize: '9.5px',
              fontWeight: 600,
              color: 'rgba(148, 163, 184, 0.65)',
            }}
          >
            @futbolnaya_jara
          </span>
        )}
      </div>
    </div>
  );
}

export default MatchPill;
