'use client';

import React from 'react';

export type AdBannerVariant = 'leaderboard' | 'sidebar-mpu' | 'in-article';

export interface AdBannerSlotProps {
  variant?: AdBannerVariant;
  slotId?: string;
  adSlot?: string;
  adClient?: string;
  lang?: 'ru' | 'en';
  locale?: 'ru' | 'en';
  label?: string;
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  sponsorName?: string;
  className?: string;
  style?: React.CSSProperties;
}

interface VariantPreset {
  defaultSlotId: string;
  formatTag: string;
  adFormat: 'horizontal' | 'rectangle' | 'fluid';
  sponsorRu: string;
  sponsorEn: string;
  headlineRu: string;
  headlineEn: string;
  subheadlineRu: string;
  subheadlineEn: string;
  ctaRu: string;
  ctaEn: string;
  href: string;
}

const VARIANT_PRESETS: Record<AdBannerVariant, VariantPreset> = {
  leaderboard: {
    defaultSlotId: 'golason-leaderboard-970x90',
    formatTag: '970×90 / 728×90',
    adFormat: 'horizontal',
    sponsorRu: 'ПАРТНЕР ВЫПУСКА • ФУТБОЛЬНАЯ ЖАРА',
    sponsorEn: 'EDITION PARTNER • FUTBOLNAYA JARA',
    headlineRu: 'Мгновенные видео голов, xG-графика и инсайды 24/7 в официальном канале',
    headlineEn: 'Instant goal clips, tactical xG charts, and breaking transfer scoops 24/7',
    subheadlineRu: 'Прямые трансляции туров Ла Лиги, АПЛ, Серии А и Лиги чемпионов УЕФА без задержек.',
    subheadlineEn: 'Live matchday coverage across La Liga, Premier League, Serie A, and UEFA Champions League.',
    ctaRu: 'Открыть канал',
    ctaEn: 'Open Channel',
    href: 'https://t.me/futbolnaya_jara',
  },
  'sidebar-mpu': {
    defaultSlotId: 'golason-sidebar-mpu-300x250',
    formatTag: '300×250 MPU',
    adFormat: 'rectangle',
    sponsorRu: 'GOLASON TACTICAL DESK',
    sponsorEn: 'GOLASON TACTICAL DESK',
    headlineRu: 'Матч-центр LIVE: стартовые составы и тактические схемы',
    headlineEn: 'LIVE Match Center: Confirmed Lineups & Tactical Shapes',
    subheadlineRu: 'Отслеживайте замены, рейтинги игроков и ключевые перестановки тренеров в реальном времени.',
    subheadlineEn: 'Track live substitutions, player ratings, and in-game tactical adjustments in real time.',
    ctaRu: 'Перейти в Матч-центр',
    ctaEn: 'Explore Match Center',
    href: '/live',
  },
  'in-article': {
    defaultSlotId: 'golason-in-article-native',
    formatTag: 'NATIVE EDITORIAL',
    adFormat: 'fluid',
    sponsorRu: 'РАДАР ТРАНСФЕРОВ • ДОСЬЕ GOLASON',
    sponsorEn: 'TRANSFER RADAR • GOLASON DOSSIER',
    headlineRu: 'Верифицированная база инсайдов: только источники Tier 1–3',
    headlineEn: 'Verified Transfer Intelligence: Tier 1–3 Reliability Index',
    subheadlineRu: 'Полная хронология переговоров, суммы отступных и статус контрактов европейских топ-клубов.',
    subheadlineEn: 'Complete negotiation timelines, release clauses, and contract statuses across European football.',
    ctaRu: 'Смотреть трансферы',
    ctaEn: 'View Transfer Radar',
    href: '/transfers',
  },
};

export function AdBannerSlot({
  variant = 'leaderboard',
  slotId,
  adSlot,
  adClient = 'ca-pub-golason-media',
  lang,
  locale,
  label = 'РЕКЛАМА • AD SLOT',
  headline,
  subheadline,
  ctaText,
  ctaHref,
  sponsorName,
  className,
  style,
}: AdBannerSlotProps) {
  const activeLang: 'ru' | 'en' = lang ?? locale ?? 'ru';
  const isRu = activeLang === 'ru';
  const preset = VARIANT_PRESETS[variant] ?? VARIANT_PRESETS.leaderboard;

  const resolvedSlotId = adSlot ?? slotId ?? preset.defaultSlotId;
  const resolvedSponsor =
    sponsorName ?? (isRu ? preset.sponsorRu : preset.sponsorEn);
  const resolvedHeadline =
    headline ?? (isRu ? preset.headlineRu : preset.headlineEn);
  const resolvedSubheadline =
    subheadline ?? (isRu ? preset.subheadlineRu : preset.subheadlineEn);
  const resolvedCta = ctaText ?? (isRu ? preset.ctaRu : preset.ctaEn);
  const resolvedHref = ctaHref ?? preset.href;
  const isExternal = resolvedHref.startsWith('http');

  const isLeaderboard = variant === 'leaderboard';
  const isSidebarMpu = variant === 'sidebar-mpu';

  return (
    <aside
      aria-label={label}
      data-ad-slot={resolvedSlotId}
      data-ad-variant={variant}
      data-ad-format={preset.adFormat}
      data-ad-client={adClient}
      className={className}
      style={{
        width: '100%',
        maxWidth: isLeaderboard ? '970px' : isSidebarMpu ? '340px' : '100%',
        margin: isLeaderboard ? '0 auto' : '0',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E7EB',
        color: '#111827',
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {/* Top Editorial Disclosure Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '5px 12px',
          backgroundColor: '#F9FAFB',
          borderBottom: '1px solid #E5E7EB',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#6B7280',
        }}
      >
        <span>{label}</span>
        <span
          style={{
            fontVariantNumeric: 'tabular-nums',
            color: '#9CA3AF',
            fontWeight: 600,
          }}
        >
          {preset.formatTag}
        </span>
      </div>

      {/* AdSense / GAM Mount Container + Native Editorial Partner Fallback */}
      <div
        style={{
          position: 'relative',
          minHeight: isLeaderboard ? '90px' : isSidebarMpu ? '250px' : '108px',
          padding: isLeaderboard
            ? '14px 20px'
            : isSidebarMpu
            ? '20px 18px'
            : '18px 22px',
          display: 'flex',
          flexDirection: isSidebarMpu ? 'column' : 'row',
          alignItems: isSidebarMpu ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: isSidebarMpu ? '16px' : '20px',
          flexWrap: 'wrap',
          backgroundColor: '#FFFFFF',
        }}
      >
        <ins
          className="adsbygoogle"
          data-ad-client={adClient}
          data-ad-slot={resolvedSlotId}
          data-ad-format={preset.adFormat}
          data-full-width-responsive="true"
          style={{
            display: 'none',
          }}
        />

        <div
          style={{
            flex: '1 1 260px',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: '6px',
                height: '6px',
                backgroundColor: '#DC2626',
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: '10.5px',
                fontWeight: 800,
                letterSpacing: '0.09em',
                textTransform: 'uppercase',
                color: '#DC2626',
              }}
            >
              {resolvedSponsor}
            </span>
          </div>

          <div
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: isLeaderboard ? '17px' : isSidebarMpu ? '18px' : '17px',
              fontWeight: 700,
              lineHeight: 1.3,
              color: '#111827',
              letterSpacing: '-0.01em',
            }}
          >
            {resolvedHeadline}
          </div>

          <p
            style={{
              margin: 0,
              fontSize: '12.5px',
              lineHeight: 1.45,
              color: '#4B5563',
              maxWidth: '68ch',
            }}
          >
            {resolvedSubheadline}
          </p>
        </div>

        <div
          style={{
            flexShrink: 0,
            width: isSidebarMpu ? '100%' : 'auto',
            paddingTop: isSidebarMpu ? '8px' : '0',
            borderTop: isSidebarMpu ? '1px solid #E5E7EB' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isSidebarMpu ? 'space-between' : 'flex-end',
          }}
        >
          <a
            href={resolvedHref}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer sponsored' : undefined}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: isSidebarMpu ? '100%' : 'auto',
              padding: '9px 16px',
              backgroundColor: '#111827',
              color: '#FFFFFF',
              border: '1px solid #111827',
              fontSize: '11.5px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'background-color 0.15s ease, border-color 0.15s ease',
            }}
          >
            <span>{resolvedCta}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="square"
              />
            </svg>
          </a>
        </div>
      </div>
    </aside>
  );
}

export default AdBannerSlot;
