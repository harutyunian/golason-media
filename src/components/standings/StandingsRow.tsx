'use client';

import React, { useState } from 'react';
import { ClubLogo } from '@/lib/clubLogos';

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
        color: '#16A34A',
        bg: '#F0FDF4',
        label:
          lang === 'ru'
            ? 'Лига чемпионов УЕФА'
            : 'Champions League Qualification',
      };
    case 'uel':
      return {
        color: '#2563EB',
        bg: '#EFF6FF',
        label: lang === 'ru' ? 'Лига Европы УЕФА' : 'Europa League Qualification',
      };
    case 'uecl':
    case 'playoff':
      return {
        color: '#D97706',
        bg: '#FFFBEB',
        label:
          lang === 'ru'
            ? 'Лига конференций / Плей-офф'
            : 'Conference League / Playoff',
      };
    case 'relegation':
      return {
        color: '#DC2626',
        bg: '#FEF2F2',
        label: lang === 'ru' ? 'Зона вылета' : 'Relegation Zone',
      };
    default:
      return {
        color: 'transparent',
        bg: '#F3F4F6',
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
    ? '#FFF7ED'
    : isHovered
    ? '#F3F4F6'
    : entry.rank % 2 === 0
    ? '#F9FAFB'
    : '#FFFFFF';

  const renderFormPill = (res: FormResult, idx: number) => {
    const isWin = res === 'W';
    const isDraw = res === 'D';
    const bg = isWin ? '#DCFCE7' : isDraw ? '#F3F4F6' : '#FEE2E2';
    const border = isWin ? '#86EFAC' : isDraw ? '#D1D5DB' : '#FCA5A5';
    const color = isWin ? '#15803D' : isDraw ? '#4B5563' : '#B91C1C';
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
          width: '20px',
          height: '20px',
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
        transition: 'background 0.12s ease',
        borderBottom: '1px solid #E5E7EB',
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
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            top: '2px',
            bottom: '2px',
            width: '3px',
            backgroundColor: isActiveTeam ? '#EA580C' : zoneMeta.color,
          }}
        />
        <span
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '4px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 800,
            backgroundColor: isActiveTeam
              ? '#FFEDD5'
              : entry.zone && entry.zone !== 'none'
              ? zoneMeta.bg
              : '#F3F4F6',
            color: isActiveTeam
              ? '#C2410C'
              : entry.zone && entry.zone !== 'none'
              ? zoneMeta.color
              : '#374151',
          }}
        >
          {entry.rank}
        </span>
      </td>

      {/* Club Crest + Name */}
      <td
        style={{
          padding: '10px 8px',
          minWidth: '150px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <ClubLogo
            teamId={entry.teamId}
            teamName={entry.teamName}
            teamNameRu={entry.teamNameRu}
            fallbackText={entry.crest}
            size={24}
          />

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
                fontSize: '13.5px',
                fontWeight: isActiveTeam || entry.rank <= 4 ? 700 : 600,
                color: isActiveTeam ? '#C2410C' : '#111827',
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
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FECACA',
                  color: '#DC2626',
                }}
              >
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
          fontSize: '13px',
          fontWeight: 600,
          color: '#374151',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {entry.played}
      </td>

      {/* Won / Drawn / Lost */}
      {!compact && (
        <>
          <td
            style={{
              padding: '10px 6px',
              textAlign: 'center',
              fontSize: '13px',
              color: '#4B5563',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {entry.won}
          </td>
          <td
            style={{
              padding: '10px 6px',
              textAlign: 'center',
              fontSize: '13px',
              color: '#4B5563',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {entry.drawn}
          </td>
          <td
            style={{
              padding: '10px 6px',
              textAlign: 'center',
              fontSize: '13px',
              color: '#4B5563',
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
          fontSize: '13px',
          fontWeight: 700,
          color:
            entry.goalDiff > 0
              ? '#15803D'
              : entry.goalDiff < 0
              ? '#B91C1C'
              : '#4B5563',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {formattedGD}
      </td>

      {/* Points (Crisp Dark Ink for all rows) */}
      <td
        style={{
          padding: '10px 10px',
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: 800,
          fontVariantNumeric: 'tabular-nums',
          color: '#111827',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            minWidth: '30px',
            padding: '3px 7px',
            borderRadius: '4px',
            backgroundColor: isActiveTeam
              ? '#FFEDD5'
              : entry.zone === 'ucl'
              ? '#F0FDF4'
              : '#F3F4F6',
            border: isActiveTeam
              ? '1px solid #FDBA74'
              : entry.zone === 'ucl'
              ? '1px solid #BBF7D0'
              : '1px solid #E5E7EB',
            color: '#111827',
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
