'use client';

import React, { useState } from 'react';

export type MatchLanguage = 'ru' | 'en';

export type PlayerPositionCode = 'GK' | 'DEF' | 'MID' | 'FWD';

export interface BilingualLabel {
  ru: string;
  en: string;
}

export interface PitchPlayerNodeData {
  id: string;
  fotmobId: number;
  name: BilingualLabel | string;
  nameRu?: string;
  nameEn?: string;
  number: number;
  position: PlayerPositionCode;
  role?: BilingualLabel | string;
  /** Horizontal coordinate on dark tactical pitch (0 = left goal line, 100 = right goal line) */
  x: number;
  /** Vertical coordinate on dark tactical pitch (0 = top touchline, 100 = bottom touchline) */
  y: number;
  rating?: number;
  isCaptain?: boolean;
  goals?: number;
  assists?: number;
  yellowCard?: boolean;
  redCard?: boolean;
  subbedOutMinute?: number;
  subbedInMinute?: number;
  photoUrl?: string;
}

export interface PlayerNodeProps {
  player: PitchPlayerNodeData;
  teamSide?: 'home' | 'away';
  teamColor?: string;
  lang?: MatchLanguage;
  locale?: MatchLanguage;
  isSelected?: boolean;
  onSelect?: (player: PitchPlayerNodeData) => void;
  positioned?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function getFotmobPortraitUrl(fotmobId: number | string): string {
  return `https://images.fotmob.com/image_resources/playerimages/${fotmobId}.png`;
}

export function resolveBilingualText(
  value: BilingualLabel | string | undefined,
  lang: MatchLanguage,
  fallback = ''
): string {
  if (!value) return fallback;
  if (typeof value === 'string') return value;
  return value[lang] || value.ru || value.en || fallback;
}

export function formatShortPlayerName(fullName: string, jerseyNumber?: number): string {
  const trimmed = fullName.trim();
  if (!trimmed) return jerseyNumber ? `#${jerseyNumber}` : '';
  const parts = trimmed.split(/\s+/);
  let shortName = trimmed;
  if (parts.length >= 2) {
    const firstInitial = parts[0].charAt(0);
    const lastName = parts[parts.length - 1];
    const candidate = `${firstInitial}. ${lastName}`;
    shortName = candidate.length > 15 ? lastName : candidate;
  }
  return jerseyNumber !== undefined ? `${jerseyNumber} ${shortName}` : shortName;
}

function getRatingColor(rating?: number): { bg: string; border: string; text: string } {
  if (!rating) {
    return { bg: '#374151', border: '#4B5563', text: '#F9FAFB' };
  }
  if (rating >= 8.5) {
    return { bg: '#0284C7', border: '#38BDF8', text: '#FFFFFF' };
  }
  if (rating >= 7.5) {
    return { bg: '#16A34A', border: '#4ADE80', text: '#FFFFFF' };
  }
  if (rating >= 6.8) {
    return { bg: '#D97706', border: '#FBBF24', text: '#FFFFFF' };
  }
  return { bg: '#DC2626', border: '#F87171', text: '#FFFFFF' };
}

export function PlayerNode({
  player,
  teamSide = 'home',
  teamColor,
  lang,
  locale,
  isSelected = false,
  onSelect,
  positioned = true,
  size = 'md',
  className = '',
}: PlayerNodeProps) {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const activeLang: MatchLanguage = lang || locale || 'ru';
  const rawName =
    typeof player.name === 'object'
      ? player.name[activeLang]
      : activeLang === 'ru'
      ? player.nameRu || player.name
      : player.nameEn || player.name;

  const displayName = formatShortPlayerName(rawName, player.number);
  const fullDisplayName = rawName || `#${player.number}`;
  const roleLabel = resolveBilingualText(player.role, activeLang);

  const portraitSrc =
    player.photoUrl && player.photoUrl.trim().length > 0
      ? player.photoUrl
      : getFotmobPortraitUrl(player.fotmobId);

  const avatarPx = size === 'lg' ? 62 : size === 'sm' ? 42 : 50;
  const defaultTeamPillColor = teamSide === 'home' ? '#22A64E' : '#D89620';
  const jerseyBadgeBg = teamColor || defaultTeamPillColor;
  const ratingStyle = getRatingColor(player.rating);
  const activeHighlight = isSelected || isHovered;

  const containerStyle: React.CSSProperties = positioned
    ? {
        position: 'absolute',
        left: `${player.x}%`,
        top: `${player.y}%`,
        transform: `translate(-50%, -50%) scale(${activeHighlight ? 1.08 : 1})`,
        zIndex: activeHighlight ? 30 : 10,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        userSelect: 'none',
        transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), z-index 0.18s ease',
      }
    : {
        position: 'relative',
        cursor: onSelect ? 'pointer' : 'default',
        display: ' inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        userSelect: 'none',
        transform: `scale(${activeHighlight ? 1.05 : 1})`,
        transition: 'transform 0.18s ease',
      };

  return (
    <div
      className={`golason-player-node ${className}`.trim()}
      style={containerStyle}
      onClick={() => onSelect?.(player)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`${fullDisplayName} (#${player.number})`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect?.(player);
        }
      }}
    >
      {/* Avatar Wrapper with Studio Circle & Micro-Badges */}
      <div
        style={{
          position: 'relative',
          width: `${avatarPx}px`,
          height: `${avatarPx}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Studio Off-White Circular Backdrop (Sofascore style) */}
        <div
          style={{
            width: `${avatarPx}px`,
            height: `${avatarPx}px`,
            borderRadius: '9999px',
            backgroundColor: '#F2F4F8',
            border: activeHighlight
              ? '2.5px solid #FFC400'
              : `2px solid ${teamSide === 'home' ? '#FFFFFF' : '#E5E7EB'}`,
            boxShadow: activeHighlight
              ? '0 0 0 4px rgba(255, 196, 0, 0.28), 0 8px 20px rgba(0, 0, 0, 0.65)'
              : '0 4px 12px rgba(0, 0, 0, 0.48)',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          {!imgError ? (
            <img
              src={portraitSrc}
              alt={fullDisplayName}
              loading="lazy"
              onError={() => setImgError(true)}
              style={{
                width: '94%',
                height: '94%',
                objectFit: 'cover',
                objectPosition: 'top center',
                display: 'block',
              }}
            />
          ) : (
            /* Sofascore-style Grey Studio Silhouette Fallback */
            <svg
              viewBox="0 0 64 64"
              width={avatarPx - 6}
              height={avatarPx - 6}
              style={{ display: 'block', marginBottom: '-2px' }}
              aria-hidden="true"
            >
              <circle cx="32" cy="22" r="12" fill="#969CA5" />
              <path
                d="M12 58c0-11.046 8.954-20 20-20s20 8.954 20 20H12z"
                fill="#969CA5"
              />
            </svg>
          )}
        </div>

        {/* Top-Left Captain Armband or Substitution Indicator */}
        {player.isCaptain && (
          <span
            title={activeLang === 'ru' ? 'Капитан команды' : 'Team Captain'}
            style={{
              position: 'absolute',
              top: '-4px',
              left: '-6px',
              backgroundColor: '#FFC400',
              color: '#091324',
              fontSize: '9px',
              fontWeight: 900,
              lineHeight: 1,
              padding: '2px 4px',
              borderRadius: '5px',
              border: '1.5px solid #091324',
              boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
              letterSpacing: '0.02em',
            }}
          >
            C
          </span>
        )}

        {/* Substitution Out / In Badge (Top-Left or Mid-Left) */}
        {(player.subbedOutMinute !== undefined || player.subbedInMinute !== undefined) && (
          <span
            title={
              player.subbedOutMinute
                ? activeLang === 'ru'
                  ? `Заменен на ${player.subbedOutMinute}'`
                  : `Subbed off ${player.subbedOutMinute}'`
                : activeLang === 'ru'
                ? `Вышел на ${player.subbedInMinute}'`
                : `Subbed on ${player.subbedInMinute}'`
            }
            style={{
              position: 'absolute',
              top: player.isCaptain ? '13px' : '-4px',
              left: '-8px',
              backgroundColor: player.subbedOutMinute ? '#EF4444' : '#22C55E',
              color: '#FFFFFF',
              fontSize: '9px',
              fontWeight: 800,
              lineHeight: 1,
              padding: '2px 4px',
              borderRadius: '999px',
              border: '1.5px solid #181A1E',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.45)',
            }}
          >
            <span>{player.subbedOutMinute ? '▼' : '▲'}</span>
            <span>{player.subbedOutMinute || player.subbedInMinute}&apos;</span>
          </span>
        )}

        {/* Top-Right Sofascore Rating Pill */}
        {player.rating !== undefined && (
          <span
            title={activeLang === 'ru' ? `Оценка: ${player.rating.toFixed(1)}` : `Rating: ${player.rating.toFixed(1)}`}
            style={{
              position: 'absolute',
              top: '-5px',
              right: '-10px',
              backgroundColor: ratingStyle.bg,
              color: ratingStyle.text,
              border: `1.5px solid ${ratingStyle.border}`,
              fontSize: '10px',
              fontWeight: 800,
              lineHeight: 1,
              padding: '2px 5px',
              borderRadius: '6px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {player.rating.toFixed(1)}
          </span>
        )}

        {/* Goal Icon Badge (Bottom-Right of Portrait) */}
        {player.goals !== undefined && player.goals > 0 && (
          <span
            title={
              activeLang === 'ru'
                ? `Голы: ${player.goals}`
                : `Goals: ${player.goals}`
            }
            style={{
              position: 'absolute',
              bottom: '4px',
              right: '-9px',
              backgroundColor: '#111827',
              color: '#FFC400',
              border: '1.5px solid #FFC400',
              borderRadius: '999px',
              padding: '1px 4px',
              fontSize: '9px',
              fontWeight: 800,
              lineHeight: 1.1,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.55)',
            }}
          >
            <span>⚽</span>
            {player.goals > 1 && <span>x{player.goals}</span>}
          </span>
        )}

        {/* Yellow / Red Card Micro-Icon (Bottom-Left of Portrait) */}
        {(player.yellowCard || player.redCard) && (
          <span
            title={
              player.redCard
                ? activeLang === 'ru'
                  ? 'Красная карточка'
                  : 'Red Card'
                : activeLang === 'ru'
                ? 'Желтая карточка'
                : 'Yellow Card'
            }
            style={{
              position: 'absolute',
              bottom: '6px',
              left: '-6px',
              width: '9px',
              height: '12px',
              borderRadius: '2px',
              backgroundColor: player.redCard ? '#EF4444' : '#FACC15',
              border: '1px solid #111827',
              boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
            }}
          />
        )}

        {/* Overlapping Jersey Number Pill at Bottom Center of Portrait */}
        <span
          style={{
            position: 'absolute',
            bottom: '-7px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: jerseyBadgeBg,
            color: '#FFFFFF',
            border: '1.5px solid rgba(255, 255, 255, 0.92)',
            borderRadius: '5px',
            padding: '1px 6px',
            fontSize: '10px',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '0.02em',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
            whiteSpace: 'nowrap',
          }}
        >
          #{player.number}
        </span>
      </div>

      {/* Crisp Russian / English Player Name Plaque */}
      <div
        style={{
          marginTop: '9px',
          backgroundColor: activeHighlight ? 'rgba(9, 19, 36, 0.95)' : 'rgba(17, 20, 26, 0.84)',
          border: activeHighlight
            ? '1px solid rgba(255, 196, 0, 0.7)'
            : '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '6px',
          padding: '2px 7px',
          maxWidth: '116px',
          textAlign: 'center',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <div
          style={{
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 700,
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            letterSpacing: '0.01em',
          }}
        >
          {displayName}
        </div>
        {activeHighlight && roleLabel && (
          <div
            style={{
              color: '#FFC400',
              fontSize: '9px',
              fontWeight: 600,
              lineHeight: 1.15,
              marginTop: '1px',
              whiteSpace: 'nowrap',
            }}
          >
            {roleLabel}
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayerNode;
