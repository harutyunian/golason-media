'use client';

import React, { useState } from 'react';
import {
  BilingualLabel,
  MatchLanguage,
  PlayerPositionCode,
  getFotmobPortraitUrl,
  resolveBilingualText,
} from './PlayerNode';

export interface SubstitutionBroadcastPlayer {
  name: BilingualLabel | string;
  number: number;
  position: PlayerPositionCode;
  fotmobId: number;
  photoUrl?: string;
  rating?: number;
  goals?: number;
  assists?: number;
  achievementBadge?: BilingualLabel | string;
  subStatLabel?: BilingualLabel | string;
}

export interface SubstitutionBroadcastEvent {
  id: string;
  matchId?: string;
  team: 'home' | 'away';
  teamName: BilingualLabel | string;
  teamLogoUrl?: string;
  minute: string;
  playerIn: SubstitutionBroadcastPlayer;
  playerOut: SubstitutionBroadcastPlayer;
  achievementBadge?: BilingualLabel | string;
  reason?: BilingualLabel | string;
  tacticalNote?: BilingualLabel | string;
  summary?: BilingualLabel | string;
}

export interface BroadcastScoreboardTeam {
  name: BilingualLabel | string;
  shortName?: string;
  logoUrl?: string;
  score: number;
}

export interface SubstitutionCardProps {
  substitution?: SubstitutionBroadcastEvent;
  substitutions?: SubstitutionBroadcastEvent[];
  homeTeam?: BroadcastScoreboardTeam;
  awayTeam?: BroadcastScoreboardTeam;
  lang?: MatchLanguage;
  locale?: MatchLanguage;
  className?: string;
}

const DEFAULT_SUBSTITUTIONS: SubstitutionBroadcastEvent[] = [
  {
    id: 'sub-mbappe-endrick-86',
    matchId: 'match-el-clasico',
    team: 'home',
    teamName: { ru: 'Реал Мадрид', en: 'Real Madrid' },
    teamLogoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/86.png',
    minute: "86'",
    playerIn: {
      name: { ru: 'Эндрик Фелипе', en: 'Endrick Felipe' },
      number: 16,
      position: 'FWD',
      fotmobId: 1330505,
      photoUrl: 'https://images.fotmob.com/image_resources/playerimages/1330505.png',
      rating: 6.9,
      subStatLabel: {
        ru: '⚡ СВЕЖАЯ СИЛА НА ПОЛЕ',
        en: '⚡ FRESH LEGS IN ATTACK',
      },
    },
    playerOut: {
      name: { ru: 'Килиан Мбаппе', en: 'Kylian Mbappé' },
      number: 9,
      position: 'FWD',
      fotmobId: 701154,
      photoUrl: 'https://images.fotmob.com/image_resources/playerimages/701154.png',
      rating: 9.6,
      goals: 3,
      achievementBadge: {
        ru: '⚽ ХЕТ-ТРИК В МАТЧЕ!',
        en: '⚽ HAT-TRICK HERO',
      },
    },
    achievementBadge: {
      ru: '⚽ ХЕТ-ТРИК В МАТЧЕ!',
      en: '⚽ HAT-TRICK HERO',
    },
    reason: {
      ru: 'Овации «Сантьяго Бернабеу» после исторического хет-трика в Эль-Класико',
      en: 'Standing ovation at the Santiago Bernabéu after a historic El Clásico hat-trick',
    },
    tacticalNote: {
      ru: 'Килиан Мбаппе покидает поле под стоячие овации после трёх забитых мячей (22\', 54\', 79\'), 6 ударов в створ и оценки 9.6. Эндрик выходит освежить прессинг в концовке встречи.',
      en: 'Kylian Mbappé leaves the pitch to a standing ovation after netting three clinical goals (22\', 54\', 79\'), recording 6 shots on target and a 9.6 match rating. Endrick enters to press the backline in the closing minutes.',
    },
  },
  {
    id: 'sub-rodrygo-brahim-78',
    matchId: 'match-el-clasico',
    team: 'home',
    teamName: { ru: 'Реал Мадрид', en: 'Real Madrid' },
    teamLogoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/86.png',
    minute: "78'",
    playerIn: {
      name: { ru: 'Браим Диас', en: 'Brahim Díaz' },
      number: 21,
      position: 'MID',
      fotmobId: 750056,
      photoUrl: 'https://images.fotmob.com/image_resources/playerimages/750056.png',
      rating: 7.2,
      subStatLabel: {
        ru: '🎯 КОНТРОЛЬ МЕЖДУ ЛИНИЯМИ',
        en: '🎯 HALF-SPACE CREATOR',
      },
    },
    playerOut: {
      name: { ru: 'Родриго Гоэс', en: 'Rodrygo Goes' },
      number: 11,
      position: 'FWD',
      fotmobId: 895369,
      photoUrl: 'https://images.fotmob.com/image_resources/playerimages/895369.png',
      rating: 7.6,
      achievementBadge: {
        ru: "🔥 ОТЫГРАЛ 78' • 91% ТОЧНЫХ ПАСОВ",
        en: "🔥 PLAYED 78' • 91% PASS ACCURACY",
      },
    },
    tacticalNote: {
      ru: 'Карло Анчелотти насыщает среднюю линию: Браим Диас добавляет удержание мяча и дриблинг на правом полуфланге.',
      en: 'Carlo Ancelotti reinforces midfield control: Brahim Díaz adds ball retention and close-control dribbling in the right half-space.',
    },
  },
];

const DEFAULT_SCOREBOARD_HOME: BroadcastScoreboardTeam = {
  name: { ru: 'Реал Мадрид', en: 'Real Madrid' },
  shortName: 'RMA',
  logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/86.png',
  score: 3,
};

const DEFAULT_SCOREBOARD_AWAY: BroadcastScoreboardTeam = {
  name: { ru: 'Барселона', en: 'Barcelona' },
  shortName: 'BAR',
  logoUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/83.png',
  score: 2,
};

function PortraitWithRing({
  player,
  ringColor,
  lang,
}: {
  player: SubstitutionBroadcastPlayer;
  ringColor: '#22C55E' | '#EF4444';
  lang: MatchLanguage;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const fullName = resolveBilingualText(player.name, lang);
  const portraitSrc =
    player.photoUrl && player.photoUrl.trim().length > 0
      ? player.photoUrl
      : getFotmobPortraitUrl(player.fotmobId);

  return (
    <div
      style={{
        position: 'relative',
        width: '124px',
        height: '124px',
        margin: '0 auto',
      }}
    >
      {/* Outer Glow + Colored Ring (#22C55E for SUB ON, #EF4444 for SUB OFF) */}
      <div
        style={{
          width: '124px',
          height: '124px',
          borderRadius: '9999px',
          backgroundColor: '#F2F4F8',
          border: `5px solid ${ringColor}`,
          boxShadow:
            ringColor === '#22C55E'
              ? '0 0 28px rgba(34, 197, 94, 0.45), inset 0 2px 8px rgba(0, 0, 0, 0.15)'
              : '0 0 28px rgba(239, 68, 68, 0.45), inset 0 2px 8px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        {!imgFailed ? (
          <img
            src={portraitSrc}
            alt={fullName}
            loading="lazy"
            onError={() => setImgFailed(true)}
            style={{
              width: '94%',
              height: '94%',
              objectFit: 'cover',
              objectPosition: 'top center',
              display: 'block',
            }}
          />
        ) : (
          <svg
            viewBox="0 0 64 64"
            width="92"
            height="92"
            style={{ display: 'block', marginBottom: '-4px' }}
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

      {/* Jersey Number Badge (Bottom Center of Studio Circle) */}
      <span
        style={{
          position: 'absolute',
          bottom: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: ringColor === '#22C55E' ? '#15803D' : '#B91C1C',
          color: '#FFFFFF',
          border: '2px solid #FFFFFF',
          borderRadius: '8px',
          padding: '2px 10px',
          fontSize: '12px',
          fontWeight: 900,
          letterSpacing: '0.03em',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
          whiteSpace: 'nowrap',
        }}
      >
        #{player.number} • {player.position}
      </span>

      {/* Sofascore Match Rating Pill (Top-Right of Studio Circle) */}
      {player.rating !== undefined && (
        <span
          style={{
            position: 'absolute',
            top: '0px',
            right: '-6px',
            backgroundColor: player.rating >= 8.5 ? '#0284C7' : '#16A34A',
            color: '#FFFFFF',
            border: '2px solid #FFFFFF',
            borderRadius: '8px',
            padding: '2px 7px',
            fontSize: '12px',
            fontWeight: 900,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          ★ {player.rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

export function SubstitutionCard({
  substitution,
  substitutions,
  homeTeam,
  awayTeam,
  lang,
  locale,
  className = '',
}: SubstitutionCardProps) {
  const activeLang: MatchLanguage = lang || locale || 'ru';

  const eventsList: SubstitutionBroadcastEvent[] =
    substitutions && substitutions.length > 0
      ? substitutions
      : substitution
      ? [substitution]
      : DEFAULT_SUBSTITUTIONS;

  const [activeIndex, setActiveIndex] = useState(0);
  const currentEvent = eventsList[Math.min(activeIndex, eventsList.length - 1)] || DEFAULT_SUBSTITUTIONS[0];

  const resolvedHome = homeTeam || DEFAULT_SCOREBOARD_HOME;
  const resolvedAway = awayTeam || DEFAULT_SCOREBOARD_AWAY;

  const teamNameText = resolveBilingualText(
    currentEvent.teamName,
    activeLang,
    activeLang === 'ru' ? 'Реал Мадрид' : 'Real Madrid'
  );
  const playerInName = resolveBilingualText(currentEvent.playerIn.name, activeLang);
  const playerOutName = resolveBilingualText(currentEvent.playerOut.name, activeLang);

  const incomingStatLabel = resolveBilingualText(
    currentEvent.playerIn.subStatLabel,
    activeLang,
    activeLang === 'ru' ? '⚡ СВЕЖАЯ СИЛА НА ПОЛЕ' : '⚡ FRESH LEGS ON PITCH'
  );

  const outgoingAchievement = resolveBilingualText(
    currentEvent.playerOut.achievementBadge || currentEvent.achievementBadge,
    activeLang,
    activeLang === 'ru' ? '⚽ ХЕТ-ТРИК В МАТЧЕ!' : '⚽ HAT-TRICK HERO'
  );

  const summaryText = resolveBilingualText(
    currentEvent.summary || currentEvent.tacticalNote || currentEvent.reason,
    activeLang,
    activeLang === 'ru'
      ? `Килиан Мбаппе покидает поле на ${currentEvent.minute} под стоячие овации трибун после блестящего выступления.`
      : `Kylian Mbappé leaves the pitch at ${currentEvent.minute} to a standing ovation after a match-winning display.`
  );

  const reasonHeadline = resolveBilingualText(currentEvent.reason, activeLang);
  const watermarkLogo =
    currentEvent.teamLogoUrl ||
    (currentEvent.team === 'home' ? resolvedHome.logoUrl : resolvedAway.logoUrl) ||
    DEFAULT_SCOREBOARD_HOME.logoUrl;

  const homeName = resolveBilingualText(resolvedHome.name, activeLang);
  const awayName = resolveBilingualText(resolvedAway.name, activeLang);

  return (
    <section
      className={`golason-substitution-card ${className}`.trim()}
      aria-label={
        activeLang === 'ru'
          ? `Замена в матче: ${playerInName} вместо ${playerOutName}`
          : `Match substitution: ${playerInName} on for ${playerOutName}`
      }
      style={{
        position: 'relative',
        backgroundColor: '#091324',
        backgroundImage:
          'radial-gradient(circle at 50% 38%, rgba(24, 48, 88, 0.92) 0%, rgba(9, 19, 36, 0.98) 72%)',
        borderRadius: '18px',
        border: '1px solid rgba(255, 196, 0, 0.28)',
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.6)',
        padding: '20px',
        overflow: 'hidden',
        color: '#FFFFFF',
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Subtle Faded Club Crest Watermark in Center Background */}
      {watermarkLogo && (
        <img
          src={watermarkLogo}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '44%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '260px',
            height: '260px',
            objectFit: 'contain',
            opacity: 0.08,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      )}

      {/* Top TV Broadcast Header Bar */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '18px',
        }}
      >
        {/* Left Broadcast Pill: Clock + ЗАМЕНА / SUBSTITUTION */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'rgba(14, 29, 52, 0.95)',
            border: '2px solid #FF6200',
            borderRadius: '999px',
            padding: '6px 16px',
            boxShadow: '0 4px 14px rgba(255, 98, 0, 0.25)',
          }}
        >
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '999px',
              backgroundColor: '#FFC400',
              boxShadow: '0 0 8px #FFC400',
            }}
          />
          <span
            style={{
              color: '#FFC400',
              fontSize: '13px',
              fontWeight: 900,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            {currentEvent.minute} •{' '}
            {activeLang === 'ru' ? 'ЗАМЕНА' : 'TV SUBSTITUTION'} (
            {teamNameText.toUpperCase()})
          </span>
        </div>

        {/* Multi-Sub Event Selector Tabs + Brand Emblem */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {eventsList.length > 1 &&
            eventsList.map((ev, idx) => {
              const isSelected = idx === activeIndex;
              const pInShort = resolveBilingualText(ev.playerIn.name, activeLang)
                .split(' ')
                .slice(-1)[0];
              return (
                <button
                  key={ev.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  style={{
                    backgroundColor: isSelected
                      ? '#FF6200'
                      : 'rgba(255, 255, 255, 0.07)',
                    color: isSelected ? '#FFFFFF' : '#D1D5DB',
                    border: isSelected
                      ? '1px solid #FFC400'
                      : '1px solid rgba(255, 255, 255, 0.14)',
                    borderRadius: '999px',
                    padding: '5px 12px',
                    fontSize: '11px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {ev.minute} {pInShort}
                </button>
              );
            })}

          <span
            style={{
              backgroundColor: 'rgba(255, 196, 0, 0.12)',
              border: '1px solid rgba(255, 196, 0, 0.4)',
              color: '#FFC400',
              borderRadius: '999px',
              padding: '5px 11px',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.04em',
            }}
          >
            🔥 ФУТБОЛЬНАЯ ЖАРА TV
          </span>
        </div>
      </div>

      {/* Main Broadcast Split Grid: Left (SUB ON #22C55E) | Center Swap | Right (SUB OFF #EF4444) */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '18px',
          alignItems: 'stretch',
        }}
      >
        {/* LEFT PANEL: INCOMING PLAYER (▲ ВЫХОДИТ НА ПОЛЕ / ▲ SUB ON in Emerald Green #22C55E) */}
        <div
          data-testid="sub-in-panel"
          style={{
            backgroundColor: 'rgba(14, 34, 58, 0.86)',
            border: '2.5px solid #22C55E',
            borderRadius: '20px',
            padding: '20px 18px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: 'inset 0 0 32px rgba(34, 197, 94, 0.12)',
          }}
        >
          {/* Top Emerald Pill: ▲ ВЫХОДИТ НА ПОЛЕ / ▲ SUB ON */}
          <div
            style={{
              backgroundColor: 'rgba(16, 78, 42, 0.92)',
              border: '1.5px solid #22C55E',
              color: '#8CFFBA',
              borderRadius: '999px',
              padding: '5px 16px',
              fontSize: '12px',
              fontWeight: 900,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            {activeLang === 'ru'
              ? '▲ ВЫХОДИТ НА ПОЛЕ • SUB ON'
              : '▲ SUB ON • ВЫХОДИТ НА ПОЛЕ'}
          </div>

          {/* Studio Portrait with #22C55E Ring */}
          <PortraitWithRing
            player={currentEvent.playerIn}
            ringColor="#22C55E"
            lang={activeLang}
          />

          {/* Player Name */}
          <h3
            style={{
              margin: '18px 0 8px',
              fontSize: '20px',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              color: '#FFFFFF',
            }}
          >
            {playerInName}
          </h3>

          {/* Sub-Stat Pill */}
          <div
            style={{
              marginTop: 'auto',
              backgroundColor: 'rgba(16, 78, 42, 0.85)',
              border: '1.5px solid #22C55E',
              color: '#AAFFC8',
              borderRadius: '10px',
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
            }}
          >
            {incomingStatLabel}
          </div>
        </div>

        {/* RIGHT PANEL: OUTGOING PLAYER (▼ ПОКИДАЕТ ПОЛЕ / ▼ SUB OFF in Crimson Red #EF4444) */}
        <div
          data-testid="sub-out-panel"
          style={{
            backgroundColor: 'rgba(14, 34, 58, 0.86)',
            border: '2.5px solid #EF4444',
            borderRadius: '20px',
            padding: '20px 18px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: 'inset 0 0 32px rgba(239, 68, 68, 0.12)',
          }}
        >
          {/* Top Crimson Pill: ▼ ПОКИДАЕТ ПОЛЕ / ▼ SUB OFF */}
          <div
            style={{
              backgroundColor: 'rgba(88, 20, 26, 0.92)',
              border: '1.5px solid #EF4444',
              color: '#FFA5A5',
              borderRadius: '999px',
              padding: '5px 16px',
              fontSize: '12px',
              fontWeight: 900,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            {activeLang === 'ru'
              ? '▼ ПОКИДАЕТ ПОЛЕ • SUB OFF'
              : '▼ SUB OFF • ПОКИДАЕТ ПОЛЕ'}
          </div>

          {/* Studio Portrait with #EF4444 Ring */}
          <PortraitWithRing
            player={currentEvent.playerOut}
            ringColor="#EF4444"
            lang={activeLang}
          />

          {/* Player Name */}
          <h3
            style={{
              margin: '18px 0 8px',
              fontSize: '20px',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              color: '#FFFFFF',
            }}
          >
            {playerOutName}
          </h3>

          {/* Match Achievement Badge (⚽ ХЕТ-ТРИК В МАТЧЕ! / HAT-TRICK HERO) */}
          <div
            data-testid="match-achievement-badge"
            style={{
              marginTop: 'auto',
              backgroundColor: 'rgba(65, 48, 12, 0.95)',
              border: '1.5px solid #FFC400',
              color: '#FFC400',
              borderRadius: '10px',
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 900,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              boxShadow: '0 4px 14px rgba(255, 196, 0, 0.22)',
            }}
          >
            {outgoingAchievement}
          </div>
        </div>
      </div>

      {/* Match Achievement & Tactical Summary Box */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          marginTop: '16px',
          backgroundColor: 'rgba(14, 29, 52, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderLeft: '4px solid #FFC400',
          borderRadius: '12px',
          padding: '12px 16px',
        }}
      >
        {reasonHeadline && (
          <div
            style={{
              fontSize: '12px',
              fontWeight: 800,
              color: '#FFC400',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '4px',
            }}
          >
            🎙️ {reasonHeadline}
          </div>
        )}
        <p
          style={{
            margin: 0,
            fontSize: '13px',
            lineHeight: 1.5,
            color: '#E5E7EB',
          }}
        >
          {summaryText}
        </p>
      </div>

      {/* Bottom TV Broadcast Live Scoreboard Bar */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          marginTop: '16px',
          backgroundColor: '#0E1D34',
          border: '2px solid #FFC400',
          borderRadius: '14px',
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.45)',
        }}
      >
        {/* Home Team */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
          {resolvedHome.logoUrl && (
            <img
              src={resolvedHome.logoUrl}
              alt={homeName}
              style={{ width: '32px', height: '32px', objectFit: 'contain' }}
            />
          )}
          <span
            style={{
              fontSize: '14px',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
            }}
          >
            {homeName}
          </span>
        </div>

        {/* Center Score Pill */}
        <div
          style={{
            backgroundColor: '#091324',
            border: '1.5px solid #FF6200',
            borderRadius: '10px',
            padding: '4px 16px',
            fontSize: '20px',
            fontWeight: 900,
            color: '#FFC400',
            letterSpacing: '0.08em',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {resolvedHome.score} : {resolvedAway.score}
        </div>

        {/* Away Team */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '10px',
            flex: 1,
          }}
        >
          <span
            style={{
              fontSize: '14px',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
              textAlign: 'right',
            }}
          >
            {awayName}
          </span>
          {resolvedAway.logoUrl && (
            <img
              src={resolvedAway.logoUrl}
              alt={awayName}
              style={{ width: '32px', height: '32px', objectFit: 'contain' }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default SubstitutionCard;
