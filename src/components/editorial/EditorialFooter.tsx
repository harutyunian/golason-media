'use client';

import React from 'react';
import Link from 'next/link';

export interface EditorialFooterProps {
  lang?: 'ru' | 'en';
  locale?: 'ru' | 'en';
  className?: string;
  style?: React.CSSProperties;
}

export function EditorialFooter({
  lang,
  locale,
  className,
  style,
}: EditorialFooterProps) {
  const activeLang: 'ru' | 'en' = lang ?? locale ?? 'ru';
  const isRu = activeLang === 'ru';

  const sectionLinks = [
    {
      href: '/',
      labelRu: 'Главная полоса',
      labelEn: 'Front Page',
    },
    {
      href: '/news',
      labelRu: 'Новости и репортажи',
      labelEn: 'News & Match Reports',
    },
    {
      href: '/live',
      labelRu: 'Матч-центр LIVE',
      labelEn: 'Match Center LIVE',
    },
    {
      href: '/transfers',
      labelRu: 'Радар трансферов',
      labelEn: 'Transfer Radar',
    },
    {
      href: '/standings',
      labelRu: 'Таблицы турниров',
      labelEn: 'League Standings',
    },
    {
      href: '/search',
      labelRu: 'Поиск по архиву',
      labelEn: 'Archive Search',
    },
  ];

  const competitionLinks = [
    {
      href: '/standings',
      labelRu: 'Лига чемпионов УЕФА',
      labelEn: 'UEFA Champions League',
    },
    {
      href: '/standings',
      labelRu: 'Испанская Ла Лига',
      labelEn: 'Spanish La Liga',
    },
    {
      href: '/standings',
      labelRu: 'Английская Премьер-лига',
      labelEn: 'English Premier League',
    },
    {
      href: '/standings',
      labelRu: 'Итальянская Серия А',
      labelEn: 'Italian Serie A',
    },
    {
      href: '/live',
      labelRu: 'Тактические схемы и замены',
      labelEn: 'Tactical Lineups & Substitutions',
    },
  ];

  return (
    <footer
      role="contentinfo"
      className={className}
      style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        color: '#111827',
        borderTop: '2px solid #111827',
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '44px 20px 28px',
        }}
      >
        {/* Multi-column Newspaper Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '32px',
            paddingBottom: '36px',
            borderBottom: '1px solid #E5E7EB',
          }}
        >
          {/* Column 1: Editorial Masthead & Colophon */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                textDecoration: 'none',
                color: '#111827',
              }}
            >
              <img
                src="/logo.jpg"
                alt="GOLASON"
                width={38}
                height={38}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1px solid #111827',
                  flexShrink: 0,
                }}
              />
              <div>
                <div
                  style={{
                    fontFamily:
                      "'Montserrat', Georgia, 'Times New Roman', serif",
                    fontWeight: 900,
                    fontSize: '20px',
                    letterSpacing: '-0.02em',
                    color: '#111827',
                    lineHeight: 1.1,
                  }}
                >
                  GOLASON
                </div>
                <div
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#DC2626',
                  }}
                >
                  {isRu ? 'ФУТБОЛЬНАЯ ЖАРА' : 'FOOTBALL CHRONICLE'}
                </div>
              </div>
            </Link>

            <p
              style={{
                margin: 0,
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: '13.5px',
                lineHeight: 1.6,
                color: '#4B5563',
                maxWidth: '38ch',
              }}
            >
              {isRu
                ? 'Ежедневное двуязычное футбольное издание: хроника матчей, верифицированный радар трансферов (Tier 1–3), тактические схемы стартовых составов и прямые видеообзоры.'
                : 'Daily bilingual football publication covering live matchday chronicles, verified Tier 1–3 transfer intelligence, tactical starting XI shapes, and instant video highlights.'}
            </p>

            <div style={{ paddingTop: '4px' }}>
              <a
                href="https://t.me/futbolnaya_jara"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  border: '1px solid #111827',
                  backgroundColor: '#111827',
                  color: '#FFFFFF',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M21 3L3 10.5L10.2 13.5M21 3L14.5 21L10.2 13.5M21 3L10.2 13.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                  />
                </svg>
                <span>@futbolnaya_jara</span>
              </a>
            </div>
          </div>

          {/* Column 2: Primary Sections */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#111827',
                paddingBottom: '8px',
                borderBottom: '1px solid #E5E7EB',
              }}
            >
              {isRu ? 'Рубрики издания' : 'Editorial Sections'}
            </h2>
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '9px',
              }}
            >
              {sectionLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#374151',
                      textDecoration: 'none',
                    }}
                  >
                    {isRu ? item.labelRu : item.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Competitions & Match Center */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#111827',
                paddingBottom: '8px',
                borderBottom: '1px solid #E5E7EB',
              }}
            >
              {isRu ? 'Турниры и аналитика' : 'Competitions & Desk'}
            </h2>
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '9px',
              }}
            >
              {competitionLinks.map((item, idx) => (
                <li key={`${item.href}-${idx}`}>
                  <Link
                    href={item.href}
                    style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#4B5563',
                      textDecoration: 'none',
                    }}
                  >
                    {isRu ? item.labelRu : item.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Syndication, Search & Sitemap */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#111827',
                paddingBottom: '8px',
                borderBottom: '1px solid #E5E7EB',
              }}
            >
              {isRu ? 'Индекс и дистрибуция' : 'Index & Syndication'}
            </h2>
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '9px',
              }}
            >
              <li>
                <a
                  href="https://t.me/futbolnaya_jara"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#DC2626',
                    textDecoration: 'none',
                  }}
                >
                  {isRu
                    ? 'Telegram-канал @futbolnaya_jara'
                    : 'Telegram Channel @futbolnaya_jara'}
                </a>
              </li>
              <li>
                <Link
                  href="/search"
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#4B5563',
                    textDecoration: 'none',
                  }}
                >
                  {isRu ? 'Поиск по сайту (/search)' : 'Site Search (/search)'}
                </Link>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#4B5563',
                    textDecoration: 'none',
                  }}
                >
                  {isRu ? 'Карта сайта (sitemap.xml)' : 'XML Sitemap (/sitemap.xml)'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Colophon Strip */}
        <div
          style={{
            paddingTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
            fontSize: '11.5px',
            color: '#6B7280',
          }}
        >
          <div>
            © {new Date().getFullYear()} GOLASON.COM × @futbolnaya_jara.{' '}
            {isRu
              ? 'Все права защищены. Редакционный стандарт точности данных.'
              : 'All rights reserved. Editorial sports data journalism.'}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <Link
              href="/"
              style={{ color: '#4B5563', textDecoration: 'none', fontWeight: 600 }}
            >
              /
            </Link>
            <Link
              href="/news"
              style={{ color: '#4B5563', textDecoration: 'none', fontWeight: 600 }}
            >
              /news
            </Link>
            <Link
              href="/live"
              style={{ color: '#4B5563', textDecoration: 'none', fontWeight: 600 }}
            >
              /live
            </Link>
            <Link
              href="/transfers"
              style={{ color: '#4B5563', textDecoration: 'none', fontWeight: 600 }}
            >
              /transfers
            </Link>
            <Link
              href="/standings"
              style={{ color: '#4B5563', textDecoration: 'none', fontWeight: 600 }}
            >
              /standings
            </Link>
            <Link
              href="/search"
              style={{ color: '#4B5563', textDecoration: 'none', fontWeight: 600 }}
            >
              /search
            </Link>
            <a
              href="/sitemap.xml"
              style={{ color: '#4B5563', textDecoration: 'none', fontWeight: 600 }}
            >
              /sitemap.xml
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default EditorialFooter;
