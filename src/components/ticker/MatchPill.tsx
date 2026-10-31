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
  const matchHref = `/matches/${match.id}`;

  const borderColor = isSelected
    ? '#DC2626'
    : isLive
    ? '#EA580C'
    : isHovered
    ? '#9CA3AF'
    : '#E5E7EB';

  return (
    <a
      href={matchHref}
      aria-label={`${homeName} vs ${awayName} (${displayStatus})`}
      onClick={() => {
        onSelect?.(match);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        minWidth: '220px',
        maxWidth: '242px',
        backgroundColor: '#FFFFFF',
        border: `1px solid ${borderColor}`,
        padding: '9px 12px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '7px',
        cursor: 'pointer',
        textDecoration: 'none',
        color: '#111827',
        transition: 'border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease',
        transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
        boxShadow: isHovered
          ? '0 4px 12px rgba(17, 24, 39, 0.06)'
          : '0 1px 2px rgba(17, 24, 39, 0.03)',
        flexShrink: 0,
        userSelect: 'none',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Top 2px editorial accent bar for LIVE matches */}
      {isLive && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            backgroundColor: '#DC2626',
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
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            color: '#6B7280',
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
            fontSize: '10px',
            fontWeight: 800,
            letterSpacing: '0.05em',
            backgroundColor: isLive
              ? '#FEF2F2'
              : isFinished
              ? '#F3F4F6'
              : '#FFF7ED',
            color: isLive
              ? '#DC2626'
              : isFinished
              ? '#4B5563'
              : '#EA580C',
            border: isLive
              ? '1px solid #FECACA'
              : isFinished
              ? '1px solid #E5E7EB'
              : '1px solid #FED7AA',
          }}
        >
          {isLive && (
            <span
              aria-hidden="true"
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#DC2626',
                display: 'inline-block',
                animation: 'golasonPulse 1.4s ease-in-out infinite',
              }}
            />
          )}
          {displayStatus}
        </span>
      </div>

      {/* Teams & Scores */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
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
              fallbackText={match.homeTeam.shortName || match.homeTeam.name.slice(0, 3)}
              size={20}
            />
            <span
              style={{
                fontSize: '12.5px',
                fontWeight: homeWinning || isLive ? 800 : 600,
                color: isFinished && awayWinning ? '#6B7280' : '#111827',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {homeName}
            </span>
            {(match.homeTeam.redCards ?? 0) > 0 && (
              <span
                title={activeLang === 'ru' ? 'Красная карточка' : 'Red Card'}
                style={{
                  width: '6px',
                  height: '9px',
                  backgroundColor: '#DC2626',
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
                ? '#9CA3AF'
                : isLive || homeWinning
                ? '#DC2626'
                : '#111827',
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
              fallbackText={match.awayTeam.shortName || match.awayTeam.name.slice(0, 3)}
              size={20}
            />
            <span
              style={{
                fontSize: '12.5px',
                fontWeight: awayWinning || isLive ? 800 : 600,
                color: isFinished && homeWinning ? '#6B7280' : '#111827',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {awayName}
            </span>
            {(match.awayTeam.redCards ?? 0) > 0 && (
              <span
                title={activeLang === 'ru' ? 'Красная карточка' : 'Red Card'}
                style={{
                  width: '6px',
                  height: '9px',
                  backgroundColor: '#DC2626',
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
                ? '#9CA3AF'
                : isLive || awayWinning
                ? '#DC2626'
                : '#111827',
            }}
          >
            {isUpcoming ? '—' : awayScore}
          </span>
        </div>
      </div>

      {/* Footer: Match Center Report + Telegram Video Action */}
      <div
        style={{
          borderTop: '1px solid #E5E7EB',
          paddingTop: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '6px',
        }}
      >
        <span
          role="link"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (typeof window !== 'undefined') {
              window.open(tgUrl, '_blank', 'noopener,noreferrer');
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              if (typeof window !== 'undefined') {
                window.open(tgUrl, '_blank', 'noopener,noreferrer');
              }
            }
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '10.5px',
            fontWeight: 700,
            color: '#EA580C',
            letterSpacing: '0.02em',
            cursor: 'pointer',
          }}
        >
          <svg
            width="9"
            height="9"
            viewBox="0 0 12 12"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M2.5 1.75L10.25 6L2.5 10.25V1.75Z" />
          </svg>
          <span>
            {activeLang === 'ru'
              ? isUpcoming
                ? 'Превью · TG'
                : 'Видео голов · TG'
              : isUpcoming
              ? 'Preview · TG'
              : 'Highlights · TG'}
          </span>
        </span>

        <span
          style={{
            fontSize: '9.5px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: '#4B5563',
          }}
        >
          {match.highlightCount && match.highlightCount > 0
            ? `${match.highlightCount} ${activeLang === 'ru' ? 'клипа' : 'clips'}`
            : activeLang === 'ru'
            ? 'Матч-центр'
            : 'Match Center'}
        </span>
      </div>
    </a>
  );
}

export default MatchPill;
