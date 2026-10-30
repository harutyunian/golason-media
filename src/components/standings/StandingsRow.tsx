'use client';

import React, { useState } from 'react';

export type QualificationZone =
  | 'ucl'
  | 'uel'
  | 'uecl'
  | 'playoff'
  | 'relegation'
  | 'none';

export type FormResult = 'W' | 'D' | 'L';

export interface StandingsEntry {
  rank: number;
  teamId: string;
  teamName: string;
  teamNameRu?: string;
  shortName?: string;
  crest: string;
  crestBg?: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
  form: FormResult[];
  zone?: QualificationZone;
  isLiveActive?: boolean;
  liveMatchScore?: string;
}

export interface StandingsRowProps {
  entry: StandingsEntry;
  lang?: 'ru' | 'en';
  locale?: 'ru' | 'en';
  isHighlighted?: boolean;
  compact?: boolean;
  onSelectTeam?: (entry: StandingsEntry) => void;
}

export function getZoneMetadata(
  zone: QualificationZone = 'none',
  lang: 'ru' | 'en' = 'ru'
): { color: string; bg: string; label: string } {
  switch (zone) {
    case 'ucl':
      return {
        color: '#FFC400',
        bg: 'rgba(255, 196, 0, 0.16)',
        label:
          lang === 'ru'
            ? 'Лига чемпионов УЕФА / Элита'
            : 'Champions League Qualification',
      };
    case 'uel':
      return {
        color: '#FF6200',
        bg: 'rgba(255, 98, 0, 0.16)',
        label: lang === 'ru' ? 'Лига Европы УЕФА' : 'Europa League Qualification',
      };
    case 'uecl':
    case 'playoff':
      return {
        color: '#38BDF8',
        bg: 'rgba(56, 189, 248, 0.16)',
        label:
          lang === 'ru'
            ? 'Лига конференций / Плей-офф'
            : 'Conference League / Playoff',
      };
    case 'relegation':
      return {
        color: '#EF4444',
        bg: 'rgba(239, 68, 68, 0.16)',
        label: lang === 'ru' ? 'Зона вылета' : 'Relegation Zone',
      };
    default:
      return {
        color: 'transparent',
        bg: 'rgba(255, 255, 255, 0.05)',
        label: '',
      };
  }
}

export function StandingsRow({
  entry,
  lang,
  locale,
  isHighlighted = false,
  compact = false,
  onSelectTeam,
}: StandingsRowProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const activeLang: 'ru' | 'en' = lang ?? locale ?? 'ru';

  const isActiveTeam = Boolean(entry.isLiveActive || isHighlighted);
  const zoneMeta = getZoneMetadata(entry.zone ?? 'none', activeLang);

  const displayTeamName =
    activeLang === 'ru' && entry.teamNameRu ? entry.teamNameRu : entry.teamName;

  const formattedGD =
    entry.goalDiff > 0 ? `+${entry.goalDiff}` : `${entry.goalDiff}`;

  const rowBackground = isActiveTeam
    ? 'linear-gradient(90deg, rgba(255, 196, 0, 0.2) 0%, rgba(255, 98, 0, 0.1) 60%, rgba(9, 19, 36, 0.85) 100%)'
    : isHovered
    ? 'rgba(255, 255, 255, 0.05)'
    : entry.rank % 2 === 0
    ? 'rgba(13, 25, 46, 0.55)'
    : 'transparent';

  const renderFormPill = (res: FormResult, idx: number) => {
    const isWin = res === 'W';
    const isDraw = res === 'D';
    const bg = isWin
      ? 'rgba(16, 185, 129, 0.22)'
      : isDraw
      ? 'rgba(148, 163, 184, 0.2)'
      : 'rgba(239, 68, 68, 0.22)';
    const border = isWin
      ? 'rgba(16, 185, 129, 0.5)'
      : isDraw
      ? 'rgba(148, 163, 184, 0.4)'
      : 'rgba(239, 68, 68, 0.5)';
    const color = isWin ? '#34D399' : isDraw ? '#CBD5E1' : '#F87171';
    const text =
      activeLang === 'ru'
        ? isWin
          ? 'В'
          : isDraw
          ? 'Н'
          : 'П'
        : res;

    return (
      <span
        key={`${entry.teamId}-form-${idx}`}
        style={{
          width: '18px',
          height: '18px',
          borderRadius: '4px',
          background: bg,
          border: `1px solid ${border}`,
          color,
          fontSize: '10px',
          fontWeight: 800,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: 1,
        }}
      >
        {text}
      </span>
    );
  };

  return (
    <tr
      onClick={() => onSelectTeam?.(entry)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: rowBackground,
        cursor: onSelectTeam ? 'pointer' : 'default',
        transition: 'background 0.15s ease',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      {/* Rank + Qualification Zone Indicator */}
      <td
        title={zoneMeta.label || undefined}
        style={{
          padding: '10px 8px 10px 12px',
          position: 'relative',
          width: '44px',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {/* Left Qualification Zone Bar */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            top: '3px',
            bottom: '3px',
            width: '3.5px',
            borderRadius: '0 4px 4px 0',
            backgroundColor: isActiveTeam ? '#FF6200' : zoneMeta.color,
            boxShadow:
              entry.zone === 'ucl' || isActiveTeam
                ? `0 0 8px ${isActiveTeam ? '#FF6200' : zoneMeta.color}`
                : 'none',
          }}
        />
        <span
          style={{
            width: '22px',
            height: '22px',
            borderRadius: '6px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11.5px',
            fontWeight: 800,
            backgroundColor: isActiveTeam
              ? 'var(--accent-gold, #FFC400)'
              : zoneMeta.bg,
            color: isActiveTeam
              ? '#091324'
              : entry.zone && entry.zone !== 'none'
              ? zoneMeta.color
              : '#CBD5E1',
          }}
        >
          {entry.rank}
        </span>
      </td>

      {/* Club Crest + Name + Active Match Badge */}
      <td
        style={{
          padding: '10px 8px',
          minWidth: '165px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '9px',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: entry.crestBg || 'rgba(255, 255, 255, 0.08)',
              border: isActiveTeam
                ? '1px solid #FFC400'
                : '1px solid rgba(255, 255, 255, 0.14)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              flexShrink: 0,
            }}
          >
            {entry.crest}
          </span>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              flexWrap: 'wrap',
              minWidth: 0,
            }}
          >
            <span
              style={{
                fontSize: '13px',
                fontWeight: isActiveTeam || entry.rank <= 4 ? 700 : 600,
                color: isActiveTeam
                  ? 'var(--accent-gold, #FFC400)'
                  : '#F8FAFC',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {displayTeamName}
            </span>

            {isActiveTeam && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '1px 6px',
                  borderRadius: '999px',
                  fontSize: '9.5px',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  backgroundColor: 'rgba(255, 98, 0, 0.24)',
                  border: '1px solid rgba(255, 196, 0, 0.55)',
                  color: '#FFC400',
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    backgroundColor: '#FF6200',
                    boxShadow: '0 0 6px #FF6200',
                  }}
                />
                <span>{entry.liveMatchScore || 'LIVE'}</span>
              </span>
            )}
          </div>
        </div>
      </td>

      {/* Played */}
      <td
        style={{
          padding: '10px 6px',
          textAlign: 'center',
          fontSize: '12.5px',
          fontWeight: 600,
          color: '#CBD5E1',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {entry.played}
      </td>

      {/* Won / Drawn / Lost (shown when not compact) */}
      {!compact && (
        <>
          <td
            style={{
              padding: '10px 6px',
              textAlign: 'center',
              fontSize: '12px',
              color: '#94A3B8',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {entry.won}
          </td>
          <td
            style={{
              padding: '10px 6px',
              textAlign: 'center',
              fontSize: '12px',
              color: '#94A3B8',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {entry.drawn}
          </td>
          <td
            style={{
              padding: '10px 6px',
              textAlign: 'center',
              fontSize: '12px',
              color: '#94A3B8',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {entry.lost}
          </td>
        </>
      )}

      {/* Goal Difference */}
      <td
        style={{
          padding: '10px 6px',
          textAlign: 'center',
          fontSize: '12.5px',
          fontWeight: 700,
          color:
            entry.goalDiff > 0
              ? '#34D399'
              : entry.goalDiff < 0
              ? '#F87171'
              : '#94A3B8',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {formattedGD}
      </td>

      {/* Points (Fiery Gold for active or UCL zone teams) */}
      <td
        style={{
          padding: '10px 10px',
          textAlign: 'center',
          fontSize: '13.5px',
          fontWeight: 800,
          fontVariantNumeric: 'tabular-nums',
          color:
            isActiveTeam || entry.zone === 'ucl'
              ? 'var(--accent-gold, #FFC400)'
              : '#FFFFFF',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            minWidth: '28px',
            padding: '2px 6px',
            borderRadius: '6px',
            backgroundColor: isActiveTeam
              ? 'rgba(255, 98, 0, 0.28)'
              : entry.zone === 'ucl'
              ? 'rgba(255, 196, 0, 0.12)'
              : 'rgba(255, 255, 255, 0.05)',
            border: isActiveTeam
              ? '1px solid rgba(255, 196, 0, 0.5)'
              : '1px solid transparent',
          }}
        >
          {entry.points}
        </span>
      </td>

      {/* Recent Form (Last 5) */}
      {!compact && (
        <td
          style={{
            padding: '10px 12px 10px 6px',
            textAlign: 'right',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {entry.form.map((res, idx) => renderFormPill(res, idx))}
          </div>
        </td>
      )}
    </tr>
  );
}

export default StandingsRow;
