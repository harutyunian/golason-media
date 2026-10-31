'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type EditorialLang = 'ru' | 'en';

export interface EditorialNavItem {
  href: string;
  labelRu: string;
  labelEn: string;
  isLiveSection?: boolean;
}

export const EDITORIAL_NAV_ITEMS: EditorialNavItem[] = [
  { href: '/', labelRu: 'Главная', labelEn: 'Front Page' },
  { href: '/news', labelRu: 'Новости', labelEn: 'News' },
  {
    href: '/live',
    labelRu: 'Матч-центр LIVE',
    labelEn: 'Match Center LIVE',
    isLiveSection: true,
  },
  { href: '/transfers', labelRu: 'Трансферы', labelEn: 'Transfers' },
  { href: '/standings', labelRu: 'Таблицы', labelEn: 'Standings' },
];

export interface EditorialMastheadProps {
  lang?: EditorialLang;
  locale?: EditorialLang;
  onLangChange?: (lang: EditorialLang) => void;
  onLanguageChange?: (lang: EditorialLang) => void;
  activePath?: string;
  currentPath?: string;
  searchQuery?: string;
  initialSearchQuery?: string;
  dateText?: string;
  editionLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

function formatEditorialDate(lang: EditorialLang): string {
  const fallbackRu = 'СУББОТА, 31 ОКТЯБРЯ 2026 Г.';
  const fallbackEn = 'SATURDAY, OCTOBER 31, 2026';
  try {
    const now = new Date();
    if (Number.isNaN(now.getTime())) {
      return lang === 'ru' ? fallbackRu : fallbackEn;
    }
    return new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : 'en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
      .format(now)
      .toUpperCase();
  } catch {
    return lang === 'ru' ? fallbackRu : fallbackEn;
  }
}

export function EditorialMasthead({
  lang,
  locale,
  onLangChange,
  onLanguageChange,
  activePath,
  currentPath,
  searchQuery,
  initialSearchQuery = '',
  dateText,
  editionLabel,
  className,
  style,
}: EditorialMastheadProps) {
  const pathname = usePathname();
  const [internalLang, setInternalLang] = useState<EditorialLang>(
    lang ?? locale ?? 'ru'
  );
  const [query, setQuery] = useState<string>(
    searchQuery ?? initialSearchQuery
  );

  const activeLang: EditorialLang = lang ?? locale ?? internalLang;
  const isRu = activeLang === 'ru';
  const resolvedPath = activePath ?? currentPath ?? pathname ?? '/';

  const handleLanguageSelect = (nextLang: EditorialLang) => {
    setInternalLang(nextLang);
    onLangChange?.(nextLang);
    onLanguageChange?.(nextLang);
  };

  const isRouteActive = (href: string): boolean => {
    if (href === '/') {
      return resolvedPath === '/';
    }
    if (href === '/live') {
      return (
        resolvedPath === '/live' ||
        resolvedPath.startsWith('/live/') ||
        resolvedPath.startsWith('/matches/')
      );
    }
    return resolvedPath === href || resolvedPath.startsWith(`${href}/`);
  };

  const displayDate = dateText ?? formatEditorialDate(activeLang);
  const displayEdition =
    editionLabel ??
    (isRu
      ? 'МЕЖДУНАРОДНОЕ ФУТБОЛЬНОЕ ИЗДАНИЕ'
      : 'INTERNATIONAL FOOTBALL EDITION');

  return (
    <header
      role="banner"
      className={`golason-masthead ${className ?? ''}`}
      style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        color: '#111827',
        borderBottom: '1px solid #E5E7EB',
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <style>{`
        @media (max-width: 900px) {
          .golason-masthead-edition-label,
          .golason-masthead-tagline {
            display: none !important;
          }
          .golason-masthead-main-bar {
            padding: 10px 14px !important;
            gap: 10px !important;
          }
          .golason-masthead-top-bar {
            padding: 5px 14px !important;
            font-size: 10px !important;
          }
          .golason-masthead-nav {
            width: 100% !important;
            order: 3 !important;
            gap: 14px !important;
            border-top: 1px solid #F3F4F6 !important;
            padding-top: 6px !important;
            -webkit-overflow-scrolling: touch;
          }
          .golason-masthead-search {
            flex: 1 1 100% !important;
            order: 4 !important;
            min-width: 0 !important;
          }
        }
      `}</style>
      {/* Top Utility Strip: Date, Edition (RU / EN switch), Telegram Channel Link */}
      <div
        style={{
          borderBottom: '1px solid #E5E7EB',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div
          className="golason-masthead-top-bar"
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '7px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap',
            fontSize: '11px',
            letterSpacing: '0.06em',
            color: '#4B5563',
          }}
        >
          {/* Left: Date & Edition */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexWrap: 'wrap',
            }}
          >
            <time
              style={{
                fontWeight: 700,
                color: '#111827',
                textTransform: 'uppercase',
              }}
            >
              {displayDate}
            </time>
            <span
              className="golason-masthead-edition-label"
              aria-hidden="true"
              style={{
                width: '1px',
                height: '11px',
                backgroundColor: '#D1D5DB',
                display: 'inline-block',
              }}
            />
            <span
              className="golason-masthead-edition-label"
              style={{
                fontWeight: 600,
                color: '#6B7280',
                textTransform: 'uppercase',
              }}
            >
              {displayEdition}
            </span>
          </div>

          {/* Right: Edition Language Switch (RU / EN) + Telegram Channel */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <div
              role="group"
              aria-label={isRu ? 'Выбор языка издания' : 'Edition language'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#6B7280',
                }}
              >
                {isRu ? 'ИЗДАНИЕ:' : 'EDITION:'}
              </span>
              <div
                style={{
                  display: 'inline-flex',
                  border: '1px solid #E5E7EB',
                  backgroundColor: '#F9FAFB',
                }}
              >
                <button
                  type="button"
                  onClick={() => handleLanguageSelect('ru')}
                  aria-pressed={activeLang === 'ru'}
                  style={{
                    cursor: 'pointer',
                    border: 'none',
                    borderRight: '1px solid #E5E7EB',
                    padding: '3px 9px',
                    fontSize: '10.5px',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    backgroundColor:
                      activeLang === 'ru' ? '#111827' : 'transparent',
                    color: activeLang === 'ru' ? '#FFFFFF' : '#4B5563',
                    transition: 'background-color 0.15s ease, color 0.15s ease',
                  }}
                >
                  RU
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageSelect('en')}
                  aria-pressed={activeLang === 'en'}
                  style={{
                    cursor: 'pointer',
                    border: 'none',
                    padding: '3px 9px',
                    fontSize: '10.5px',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    backgroundColor:
                      activeLang === 'en' ? '#111827' : 'transparent',
                    color: activeLang === 'en' ? '#FFFFFF' : '#4B5563',
                    transition: 'background-color 0.15s ease, color 0.15s ease',
                  }}
                >
                  EN
                </button>
              </div>
            </div>

            <a
              href="https://t.me/futbolnaya_jara"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#DC2626',
                fontWeight: 700,
                fontSize: '11px',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                textTransform: 'uppercase',
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
              <span>t.me/futbolnaya_jara</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Masthead Bar: Logo Crest + Wordmark, Multi-page Navigation, Working /search Form */}
      <div
        className="golason-masthead-main-bar"
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        {/* Brand Identity: Circular /logo.jpg Crest + Bold GOLASON Wordmark */}
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            color: '#111827',
            flexShrink: 0,
          }}
        >
          <img
            src="/logo.jpg"
            alt="GOLASON"
            width={40}
            height={40}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '1px solid #111827',
              flexShrink: 0,
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '8px',
              }}
            >
              <span
                style={{
                  fontFamily:
                    "'Montserrat', Georgia, 'Times New Roman', serif",
                  fontWeight: 900,
                  fontSize: 'clamp(20px, 2.6vw, 28px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  color: '#111827',
                }}
              >
                GOLASON
              </span>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#DC2626',
                }}
              >
                {isRu ? 'ФУТБОЛЬНАЯ ЖАРА' : 'FOOTBALL DESK'}
              </span>
            </div>
            <span
              className="golason-masthead-tagline"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: '11.5px',
                color: '#4B5563',
                letterSpacing: '0.01em',
              }}
            >
              {isRu
                ? 'Хроника матчей, тактический разбор и трансферное досье'
                : 'Matchday Chronicle, Tactical Analysis & Transfer Dossier'}
            </span>
          </div>
        </Link>

        {/* Primary Multi-Page Editorial Navigation (Zero Emojis) */}
        <nav
          className="golason-masthead-nav"
          aria-label={isRu ? 'Основная навигация' : 'Primary navigation'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '22px',
            overflowX: 'auto',
            flexWrap: 'nowrap',
          }}
        >
          {EDITORIAL_NAV_ITEMS.map((item) => {
            const active = isRouteActive(item.href);
            const label = isRu ? item.labelRu : item.labelEn;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 2px',
                  fontSize: '13px',
                  fontWeight: active ? 800 : 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: active ? '#111827' : '#374151',
                  textDecoration: 'none',
                  borderBottom: active
                    ? '2px solid #DC2626'
                    : '2px solid transparent',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.15s ease, border-color 0.15s ease',
                }}
              >
                {item.isLiveSection && (
                  <span
                    aria-hidden="true"
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#DC2626',
                      display: 'inline-block',
                      flexShrink: 0,
                    }}
                  />
                )}
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Working Search Form: GET /search?q=... */}
        <form
          className="golason-masthead-search"
          action="/search"
          method="GET"
          role="search"
          aria-label={isRu ? 'Поиск по изданию' : 'Site search'}
          style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #D1D5DB',
            backgroundColor: '#F9FAFB',
            minWidth: '220px',
            flex: '0 1 280px',
          }}
        >
          <input
            type="search"
            name="q"
            value={searchQuery !== undefined ? searchQuery : query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isRu
                ? 'Поиск статей, клубов, игроков...'
                : 'Search articles, clubs, players...'
            }
            aria-label={
              isRu
                ? 'Поиск статей, клубов, игроков'
                : 'Search articles, clubs, players'
            }
            style={{
              width: '100%',
              border: 'none',
              background: 'transparent',
              padding: '8px 12px',
              fontSize: '12.5px',
              color: '#111827',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
          <button
            type="submit"
            aria-label={isRu ? 'Найти' : 'Search'}
            style={{
              cursor: 'pointer',
              border: 'none',
              borderLeft: '1px solid #E5E7EB',
              backgroundColor: '#111827',
              color: '#FFFFFF',
              padding: '8px 12px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle
                cx="8.5"
                cy="8.5"
                r="5.75"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M13 13L17 17"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="square"
              />
            </svg>
          </button>
        </form>
      </div>
    </header>
  );
}

export default EditorialMasthead;
