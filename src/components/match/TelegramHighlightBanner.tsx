'use client';

import React, { useState } from 'react';
import {
  BilingualLabel,
  MatchLanguage,
  resolveBilingualText,
} from './PlayerNode';

export interface HighlightGoalClipItem {
  minute: string;
  scorer: BilingualLabel | string;
  team?: 'home' | 'away';
  scoreAfter?: string;
}

export interface TelegramHighlightBannerProps {
  matchTitle?: BilingualLabel | string;
  telegramUrl?: string;
  channelHandle?: string;
  goalsCount?: number;
  clips?: HighlightGoalClipItem[];
  lang?: MatchLanguage;
  locale?: MatchLanguage;
  compact?: boolean;
  className?: string;
}

const DEFAULT_CLIPS: HighlightGoalClipItem[] = [
  {
    minute: "22'",
    scorer: { ru: 'К. Мбаппе', en: 'K. Mbappé' },
    team: 'home',
    scoreAfter: '1:0',
  },
  {
    minute: "38'",
    scorer: { ru: 'Л. Ямаль', en: 'L. Yamal' },
    team: 'away',
    scoreAfter: '1:1',
  },
  {
    minute: "54'",
    scorer: { ru: 'К. Мбаппе', en: 'K. Mbappé' },
    team: 'home',
    scoreAfter: '2:1',
  },
  {
    minute: "79'",
    scorer: { ru: 'К. Мбаппе (Хет-трик)', en: 'K. Mbappé (Hat-trick)' },
    team: 'home',
    scoreAfter: '3:2',
  },
];

export function TelegramHighlightBanner({
  matchTitle,
  telegramUrl = 'https://t.me/futbolnaya_jara',
  channelHandle = '@futbolnaya_jara',
  goalsCount,
  clips,
  lang,
  locale,
  compact = false,
  className = '',
}: TelegramHighlightBannerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const activeLang: MatchLanguage = lang || locale || 'ru';

  const resolvedClips = clips && clips.length > 0 ? clips : DEFAULT_CLIPS;
  const totalGoals = goalsCount ?? resolvedClips.length;

  const resolvedMatchTitle = resolveBilingualText(
    matchTitle,
    activeLang,
    activeLang === 'ru' ? 'Реал Мадрид 3 : 2 Барселона' : 'Real Madrid 3 : 2 Barcelona'
  );

  const safeHref =
    telegramUrl && telegramUrl.trim().length > 0
      ? telegramUrl
      : 'https://t.me/futbolnaya_jara';

  return (
    <aside
      className={`golason-telegram-highlight-banner ${className}`.trim()}
      aria-label={
        activeLang === 'ru'
          ? 'Смотреть видео голов и хайлайты в Telegram-канале Футбольная Жара'
          : 'Watch instant goal video highlights on @futbolnaya_jara Telegram'
      }
      style={{
        position: 'relative',
        backgroundColor: '#091324',
        backgroundImage:
          'linear-gradient(135deg, #091324 0%, #102342 52%, #1C1624 100%)',
        borderRadius: '18px',
        border: '1.5px solid rgba(255, 98, 0, 0.55)',
        boxShadow: '0 18px 42px rgba(0, 0, 0, 0.55), 0 0 28px rgba(255, 98, 0, 0.14)',
        padding: compact ? '16px 20px' : '22px 24px',
        overflow: 'hidden',
        color: '#FFFFFF',
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Top Fiery Orange/Gold Accent Bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #FF6200 0%, #FFC400 50%, #229ED9 100%)',
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: compact
            ? '1fr'
            : 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '22px',
          alignItems: 'center',
        }}
      >
        {/* Left Column: High-Converting Bilingual Copy & Goal Clip Chips */}
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255, 98, 0, 0.16)',
              border: '1px solid #FF6200',
              borderRadius: '999px',
              padding: '4px 12px',
              marginBottom: '12px',
            }}
          >
            <span style={{ fontSize: '13px' }}>🔥</span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 900,
                color: '#FFC400',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {activeLang === 'ru'
                ? 'МГНОВЕННЫЕ ВИДЕО ГОЛОВ • MP4 HD'
                : 'INSTANT GOAL VIDEOS • MP4 HD'}
            </span>
            <span
              style={{
                backgroundColor: '#229ED9',
                color: '#FFFFFF',
                fontSize: '10px',
                fontWeight: 800,
                padding: '1px 6px',
                borderRadius: '999px',
              }}
            >
              {channelHandle}
            </span>
          </div>

          <h3
            style={{
              margin: '0 0 8px',
              fontSize: compact ? '19px' : '23px',
              fontWeight: 900,
              lineHeight: 1.22,
              color: '#FFFFFF',
            }}
          >
            {activeLang === 'ru' ? (
              <>
                Смотрите все голы матча{' '}
                <span style={{ color: '#FFC400' }}>{resolvedMatchTitle}</span> в{' '}
                <span style={{ color: '#38BDF8' }}>«Футбольной Жаре»</span>!
              </>
            ) : (
              <>
                Watch Every Goal from{' '}
                <span style={{ color: '#FFC400' }}>{resolvedMatchTitle}</span> on{' '}
                <span style={{ color: '#38BDF8' }}>{channelHandle}</span>!
              </>
            )}
          </h3>

          <p
            style={{
              margin: '0 0 14px',
              fontSize: '13.5px',
              lineHeight: 1.5,
              color: '#D1D5DB',
            }}
          >
            {activeLang === 'ru'
              ? `Прямые ТВ-повторы всех ${totalGoals} голов с оригинальным интершумом и комментатором появляются в нашем Telegram-канале через 25–30 секунд после взятия ворот.`
              : `Direct TV broadcast replays of all ${totalGoals} goals with original stadium commentary are published to our Telegram channel within 25–30 seconds of the ball hitting the net.`}
          </p>

          {/* Goal Clips Timeline Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '18px',
            }}
          >
            {resolvedClips.map((clip, idx) => (
              <a
                key={`${clip.minute}-${idx}`}
                href={safeHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.07)',
                  border: '1px solid rgba(255, 196, 0, 0.35)',
                  borderRadius: '8px',
                  padding: '5px 10px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: '#F9FAFB',
                  textDecoration: 'none',
                }}
              >
                <span style={{ color: '#FFC400' }}>▶ {clip.minute}</span>
                <span>{resolveBilingualText(clip.scorer, activeLang)}</span>
                {clip.scoreAfter && (
                  <span
                    style={{
                      backgroundColor: 'rgba(255, 98, 0, 0.25)',
                      color: '#FFC400',
                      padding: '1px 5px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 800,
                    }}
                  >
                    {clip.scoreAfter}
                  </span>
                )}
              </a>
            ))}
          </div>

          {/* Primary CTA Anchor Button to https://t.me/futbolnaya_jara */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <a
              href={safeHref}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="telegram-highlight-cta-link"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: isHovered
                  ? 'linear-gradient(90deg, #FF771A 0%, #FFD026 100%)'
                  : 'linear-gradient(90deg, #FF6200 0%, #FFC400 100%)',
                color: '#091324',
                fontWeight: 900,
                fontSize: '14px',
                padding: '12px 22px',
                borderRadius: '12px',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                boxShadow: isHovered
                  ? '0 8px 25px rgba(255, 196, 0, 0.45)'
                  : '0 6px 18px rgba(255, 98, 0, 0.35)',
                transform: isHovered ? 'translateY(-1px)' : 'none',
                transition: 'all 0.16s ease',
              }}
            >
              {/* Telegram Paper Plane Vector Icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              <span>
                {activeLang === 'ru'
                  ? `СМОТРЕТЬ ВИДЕО ГОЛОВ В ${channelHandle.toUpperCase()}`
                  : `WATCH GOAL HIGHLIGHTS ON ${channelHandle.toUpperCase()}`}
              </span>
            </a>

            <span
              style={{
                fontSize: '12px',
                color: '#9CA3AF',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '999px',
                  backgroundColor: '#22C55E',
                }}
              />
              {activeLang === 'ru'
                ? 'Бесплатно • Без VPN и рекламы'
                : 'Free • Instant 1080p MP4 Clips'}
            </span>
          </div>
        </div>

        {/* Right Column: Watermarked Broadcast MP4 Video Preview Card */}
        {!compact && (
          <a
            href={safeHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'relative',
              display: 'block',
              borderRadius: '14px',
              overflow: 'hidden',
              border: '2px solid rgba(255, 196, 0, 0.45)',
              backgroundColor: '#131D31',
              aspectRatio: '16 / 9',
              textDecoration: 'none',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6)',
            }}
          >
            {/* Broadcast Pitch Gradient Backdrop */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 50% 50%, rgba(28, 78, 48, 0.72) 0%, rgba(9, 19, 36, 0.96) 90%)',
              }}
            />

            {/* Top-Left Broadcast Score Bug */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                backgroundColor: 'rgba(9, 19, 36, 0.88)',
                border: '1px solid #FFC400',
                borderRadius: '6px',
                padding: '3px 8px',
                fontSize: '10px',
                fontWeight: 900,
                color: '#FFFFFF',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ color: '#EF4444' }}>● LIVE MP4</span>
              <span>{resolvedMatchTitle}</span>
            </div>

            {/* Top-Right Audio & Resolution Badge */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: 'rgba(9, 19, 36, 0.85)',
                borderRadius: '6px',
                padding: '3px 8px',
                fontSize: '10px',
                fontWeight: 800,
                color: '#4ADE80',
              }}
            >
              🔊 1080p • 60 FPS
            </div>

            {/* Center Semi-Transparent Watermark (ФУТБОЛЬНАЯ ЖАРА / T.ME/FUTBOLNAYA_JARA + Emblem Below) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '12px',
              }}
            >
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 900,
                  letterSpacing: '0.1em',
                  color: 'rgba(255, 255, 255, 0.42)',
                  textTransform: 'uppercase',
                }}
              >
                ФУТБОЛЬНАЯ ЖАРА
              </div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  color: 'rgba(255, 196, 0, 0.48)',
                  marginBottom: '10px',
                }}
              >
                T.ME/FUTBOLNAYA_JARA
              </div>

              {/* Play Button Pulse Overlay */}
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(255, 98, 0, 0.92)',
                  border: '2.5px solid #FFC400',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 24px rgba(255, 98, 0, 0.65)',
                }}
              >
                <span
                  style={{
                    color: '#FFFFFF',
                    fontSize: '20px',
                    marginLeft: '3px',
                  }}
                >
                  ▶
                </span>
              </div>
            </div>

            {/* Bottom Caption Bar inside Video Preview */}
            <div
              style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                backgroundColor: 'rgba(9, 19, 36, 0.88)',
                padding: '7px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: '#E5E7EB',
              }}
            >
              <span>
                ⚽{' '}
                {activeLang === 'ru'
                  ? 'Все голы и повторы с нескольких камер'
                  : 'Multi-angle goal replays & commentary'}
              </span>
              <span style={{ color: '#FFC400', fontWeight: 800 }}>
                t.me/futbolnaya_jara ↗
              </span>
            </div>
          </a>
        )}
      </div>
    </aside>
  );
}

export default TelegramHighlightBanner;
