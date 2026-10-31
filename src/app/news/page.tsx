"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArticleCard,
  EditorialCategoryId,
} from "@/components/editorial/ArticleCard";
import {
  EDITORIAL_CATEGORY_TABS,
  FRONT_PAGE_ARTICLES,
} from "@/components/editorial/NewspaperFrontPage";

export default function EditorialNewsArchivePage() {
  const router = useRouter();
  const [lang, setLang] = useState<"ru" | "en">("ru");
  const [selectedCategory, setSelectedCategory] =
    useState<EditorialCategoryId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"river" | "grid">("river");

  const isRu = lang === "ru";

  const filteredArticles = useMemo(() => {
    return FRONT_PAGE_ARTICLES.filter((article) => {
      if (
        selectedCategory !== "all" &&
        article.category !== selectedCategory
      ) {
        return false;
      }
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.trim().toLowerCase();
        const haystack = [
          article.titleRu,
          article.titleEn,
          article.subtitleRu,
          article.subtitleEn,
          article.authorRu,
          article.authorEn,
          article.clubNameRu,
          article.clubNameEn,
          article.categoryLabelRu,
          article.categoryLabelEn,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const featuredArticle = filteredArticles[0] ?? FRONT_PAGE_ARTICLES[0];
  const secondaryGridArticles = filteredArticles.slice(1, 3);
  const archiveListArticles =
    filteredArticles.length > 3
      ? filteredArticles.slice(3)
      : filteredArticles.slice(1);

  const mostReadArticles = useMemo(
    () => FRONT_PAGE_ARTICLES.filter((a) => a.isTrending).slice(0, 5),
    []
  );

  const handleGlobalSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed.length > 0) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <div
      className="golason-news-archive-page"
      style={{
        minHeight: "100vh",
        backgroundColor: "#FFFFFF",
        color: "#111827",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .golason-news-archive-page ::selection {
              background-color: #111827;
              color: #FFFFFF;
            }
            .golason-editorial-card-link:hover .golason-editorial-card-photo {
              transform: scale(1.028);
            }
            .golason-editorial-card-link:hover .golason-editorial-card-headline {
              color: #DC2626 !important;
              text-decoration: underline;
              text-underline-offset: 3px;
              text-decoration-thickness: 1.5px;
            }
            .golason-news-archive-page a:focus-visible,
            .golason-news-archive-page button:focus-visible,
            .golason-news-archive-page input:focus-visible {
              outline: 2px solid #111827;
              outline-offset: 2px;
            }
            @media (max-width: 1024px) {
              .golason-archive-12col-grid {
                grid-template-columns: 1fr !important;
              }
              .golason-archive-sidebar {
                border-left: none !important;
                padding-left: 0 !important;
                border-top: 2px solid #111827 !important;
                padding-top: 28px !important;
              }
            }
            @media (max-width: 768px) {
              .golason-archive-2col-grid {
                grid-template-columns: 1fr !important;
              }
              .golason-editorial-horizontal-layout {
                grid-template-columns: 1fr !important;
                gap: 12px !important;
              }
            }
          `,
        }}
      />

      {/* Top Editorial Masthead Strip */}
      <header
        style={{
          backgroundColor: "#FFFFFF",
          borderBottom: "2px solid #111827",
        }}
      >
        <div
          style={{
            maxWidth: "1360px",
            margin: "0 auto",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                textDecoration: "none",
                color: "#111827",
              }}
            >
              <img
                src="/logo.jpg"
                alt="GOLASON"
                width={38}
                height={38}
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1px solid #111827",
                }}
              />
              <div>
                <div
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "22px",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    color: "#111827",
                  }}
                >
                  GOLASON.COM
                </div>
                <div
                  style={{
                    fontSize: "10.5px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#DC2626",
                  }}
                >
                  {isRu
                    ? "ФУТБОЛЬНОЕ ИЗДАНИЕ • АРХИВ МАТЕРИАЛОВ"
                    : "FOOTBALL EDITION • EDITORIAL ARCHIVE"}
                </div>
              </div>
            </Link>
          </div>

          <nav
            aria-label="Primary Editorial Navigation"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              flexWrap: "wrap",
              fontSize: "12.5px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            <Link
              href="/"
              style={{ color: "#111827", textDecoration: "none" }}
            >
              {isRu ? "Главная полоса" : "Front Page"}
            </Link>
            <Link
              href="/news"
              style={{
                color: "#DC2626",
                textDecoration: "none",
                borderBottom: "2px solid #DC2626",
                paddingBottom: "2px",
              }}
            >
              {isRu ? "Все новости" : "All News"}
            </Link>
            <Link
              href="/live"
              style={{ color: "#111827", textDecoration: "none" }}
            >
              {isRu ? "Матч-центр LIVE" : "Live Scores"}
            </Link>
            <Link
              href="/transfers"
              style={{ color: "#111827", textDecoration: "none" }}
            >
              {isRu ? "Трансферы" : "Transfers"}
            </Link>
            <Link
              href="/standings"
              style={{ color: "#111827", textDecoration: "none" }}
            >
              {isRu ? "Таблицы" : "Standings"}
            </Link>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              role="group"
              aria-label="Language switch"
              style={{
                display: "inline-flex",
                border: "1px solid #111827",
              }}
            >
              <button
                type="button"
                onClick={() => setLang("ru")}
                style={{
                  cursor: "pointer",
                  border: "none",
                  padding: "5px 10px",
                  fontSize: "11px",
                  fontWeight: 800,
                  backgroundColor: lang === "ru" ? "#111827" : "#FFFFFF",
                  color: lang === "ru" ? "#FFFFFF" : "#111827",
                }}
              >
                RU
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                style={{
                  cursor: "pointer",
                  border: "none",
                  borderLeft: "1px solid #111827",
                  padding: "5px 10px",
                  fontSize: "11px",
                  fontWeight: 800,
                  backgroundColor: lang === "en" ? "#111827" : "#FFFFFF",
                  color: lang === "en" ? "#FFFFFF" : "#111827",
                }}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      <main
        style={{
          maxWidth: "1360px",
          margin: "0 auto",
          padding: "24px 20px 72px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* Top Leaderboard Ad Slot */}
        <aside
          aria-label="Archive Leaderboard Advertisement"
          data-ad-slot="golason-news-archive-leaderboard-970x90"
          style={{
            width: "100%",
            border: "1px solid #E5E7EB",
            backgroundColor: "#FFFFFF",
            padding: "12px 18px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #E5E7EB",
              paddingBottom: "5px",
              marginBottom: "10px",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#4B5563",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            <span>РЕКЛАМА • SPONSORED</span>
            <span>970×90 / 728×90 LEADERBOARD</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "10.5px",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#DC2626",
                }}
              >
                {isRu
                  ? "ОФИЦИАЛЬНЫЙ ТЕЛЕГРАМ-КАНАЛ РЕДАКЦИИ"
                  : "OFFICIAL EDITORIAL TELEGRAM CHANNEL"}
              </div>
              <div
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "16.5px",
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                {isRu
                  ? "@futbolnaya_jara — видео голов без задержек, разборы матчей и срочные новости"
                  : "@futbolnaya_jara — instant goal replays, tactical breakdowns, and breaking alerts"}
              </div>
            </div>
            <a
              href="https://t.me/futbolnaya_jara"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "8px 14px",
                backgroundColor: "#111827",
                color: "#FFFFFF",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              {isRu ? "Открыть @futbolnaya_jara →" : "Open @futbolnaya_jara →"}
            </a>
          </div>
        </aside>

        {/* Page Title & Category Filter / Search Controls */}
        <section
          aria-label="Archive Filters and Search"
          style={{
            borderBottom: "2px solid #111827",
            paddingBottom: "18px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(28px, 3.5vw, 40px)",
                  fontWeight: 700,
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  color: "#111827",
                }}
              >
                {isRu
                  ? "Все материалы и редакционный архив"
                  : "All News & Editorial Archive"}
              </h1>
              <p
                style={{
                  margin: "6px 0 0 0",
                  fontSize: "14.5px",
                  color: "#4B5563",
                  maxWidth: "68ch",
                }}
              >
                {isRu
                  ? "Репортажи со стадионов, тактические разборы, проверенные трансферные досье и аналитика ведущих европейских лиг."
                  : "Match reports, tactical deep dives, verified transfer dossiers, and longform journalism across European football."}
              </p>
            </div>

            <div
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#4B5563",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {isRu
                ? `Найдено материалов: ${filteredArticles.length}`
                : `Showing ${filteredArticles.length} articles`}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              flexWrap: "wrap",
              paddingTop: "12px",
              borderTop: "1px solid #E5E7EB",
            }}
          >
            {/* Category Tabs */}
            <div
              role="tablist"
              aria-label="News category filter"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                flexWrap: "wrap",
              }}
            >
              {EDITORIAL_CATEGORY_TABS.map((tab) => {
                const active = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCategory(tab.id)}
                    style={{
                      cursor: "pointer",
                      padding: "7px 13px",
                      fontSize: "12.5px",
                      fontWeight: active ? 800 : 600,
                      backgroundColor: active ? "#111827" : "#FFFFFF",
                      color: active ? "#FFFFFF" : "#111827",
                      border: active
                        ? "1px solid #111827"
                        : "1px solid #E5E7EB",
                    }}
                  >
                    {isRu ? tab.labelRu : tab.labelEn}
                  </button>
                );
              })}
            </div>

            {/* Search Bar + Layout Switcher */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <form
                onSubmit={handleGlobalSearchSubmit}
                role="search"
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #111827",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isRu
                      ? "Фильтр по клубу, автору, теме..."
                      : "Filter by club, author, topic..."
                  }
                  aria-label="Search archive articles"
                  style={{
                    border: "none",
                    padding: "6px 10px",
                    fontSize: "12.5px",
                    color: "#111827",
                    backgroundColor: "#FFFFFF",
                    minWidth: "210px",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    border: "none",
                    borderLeft: "1px solid #111827",
                    backgroundColor: "#111827",
                    color: "#FFFFFF",
                    padding: "6px 12px",
                    fontSize: "11.5px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  {isRu ? "Поиск" : "Search"}
                </button>
              </form>

              <div
                role="group"
                aria-label="Archive layout mode"
                style={{
                  display: "inline-flex",
                  border: "1px solid #E5E7EB",
                }}
              >
                <button
                  type="button"
                  onClick={() => setViewMode("river")}
                  style={{
                    cursor: "pointer",
                    border: "none",
                    padding: "6px 10px",
                    fontSize: "11.5px",
                    fontWeight: 700,
                    backgroundColor:
                      viewMode === "river" ? "#111827" : "#FFFFFF",
                    color: viewMode === "river" ? "#FFFFFF" : "#4B5563",
                  }}
                >
                  {isRu ? "Лента" : "River"}
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  style={{
                    cursor: "pointer",
                    border: "none",
                    borderLeft: "1px solid #E5E7EB",
                    padding: "6px 10px",
                    fontSize: "11.5px",
                    fontWeight: 700,
                    backgroundColor:
                      viewMode === "grid" ? "#111827" : "#FFFFFF",
                    color: viewMode === "grid" ? "#FFFFFF" : "#4B5563",
                  }}
                >
                  {isRu ? "Сетка" : "Grid"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Main 12-Column Editorial Archive Grid */}
        <div
          className="golason-archive-12col-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 8fr) minmax(300px, 4fr)",
            gap: "28px",
            alignItems: "start",
          }}
        >
          {/* Left 8-Col Archive Well */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "28px",
              minWidth: 0,
            }}
          >
            {filteredArticles.length === 0 ? (
              <div
                style={{
                  border: "1px solid #E5E7EB",
                  padding: "36px 24px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    margin: "0 0 12px 0",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  {isRu
                    ? "По вашему запросу материалов не найдено."
                    : "No editorial stories match your current filter."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                  style={{
                    cursor: "pointer",
                    padding: "8px 16px",
                    backgroundColor: "#111827",
                    color: "#FFFFFF",
                    border: "none",
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  {isRu ? "Сбросить фильтры" : "Reset Filters"}
                </button>
              </div>
            ) : (
              <>
                {/* Lead Story of Selected Category */}
                <ArticleCard
                  article={featuredArticle}
                  variant="lead"
                  lang={lang}
                  priority
                />

                {/* 2-Col Secondary Photo Grid */}
                {secondaryGridArticles.length > 0 && (
                  <div
                    className="golason-archive-2col-grid"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                      gap: "24px",
                      borderBottom: "1px solid #E5E7EB",
                      paddingBottom: "24px",
                    }}
                  >
                    {secondaryGridArticles.map((art) => (
                      <ArticleCard
                        key={art.id}
                        article={art}
                        variant="grid"
                        lang={lang}
                        showDivider={false}
                      />
                    ))}
                  </div>
                )}

                {/* Full Photo-Illustrated Article List */}
                <section aria-label={isRu ? "Хронология публикаций" : "Chronological Story Feed"}>
                  <div
                    style={{
                      borderTop: "2px solid #111827",
                      borderBottom: "1px solid #E5E7EB",
                      padding: "10px 0",
                      marginBottom: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h2
                      style={{
                        margin: 0,
                        fontFamily: "Georgia, 'Times New Roman', serif",
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "#111827",
                      }}
                    >
                      {isRu
                        ? "Полная лента публикаций"
                        : "Complete Story Stream"}
                    </h2>
                    <span
                      style={{
                        fontSize: "11.5px",
                        color: "#4B5563",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {isRu ? "Нажмите на заголовок или фото для чтения" : "Click any headline or photo to read"}
                    </span>
                  </div>

                  {viewMode === "grid" ? (
                    <div
                      className="golason-archive-2col-grid"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                        gap: "24px",
                        paddingTop: "12px",
                      }}
                    >
                      {archiveListArticles.map((art) => (
                        <ArticleCard
                          key={art.id}
                          article={art}
                          variant="grid"
                          lang={lang}
                        />
                      ))}
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {archiveListArticles.map((art, idx) => (
                        <ArticleCard
                          key={art.id}
                          article={art}
                          variant="horizontal"
                          lang={lang}
                          showDivider={idx < archiveListArticles.length - 1}
                        />
                      ))}
                    </div>
                  )}
                </section>
              </>
            )}
          </div>

          {/* Right 4-Col Sidebar with Ad Slot & Most Read */}
          <aside
            className="golason-archive-sidebar"
            style={{
              borderLeft: "1px solid #E5E7EB",
              paddingLeft: "28px",
              display: "flex",
              flexDirection: "column",
              gap: "28px",
              minWidth: 0,
            }}
          >
            {/* Sidebar 300x250 Ad Slot */}
            <aside
              aria-label="Sidebar Advertisement"
              data-ad-slot="golason-news-sidebar-300x250"
              style={{
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
                padding: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #E5E7EB",
                  paddingBottom: "6px",
                  marginBottom: "12px",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#4B5563",
                }}
              >
                <span>РЕКЛАМА • SPONSORED</span>
                <span>300×250 AD</span>
              </div>
              <div
                style={{
                  minHeight: "210px",
                  border: "1px solid #E5E7EB",
                  backgroundColor: "#F9FAFB",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "10.5px",
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#EA580C",
                      marginBottom: "6px",
                    }}
                  >
                    {isRu ? "РАДАР ТРАНСФЕРОВ" : "TRANSFER RADAR"}
                  </div>
                  <div
                    style={{
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      fontSize: "17px",
                      fontWeight: 700,
                      lineHeight: 1.3,
                      color: "#111827",
                      marginBottom: "6px",
                    }}
                  >
                    {isRu
                      ? "Верифицированная таблица трансферов и сумм отступных"
                      : "Verified Transfer Deals & Release Clause Index"}
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "12.5px",
                      lineHeight: 1.5,
                      color: "#4B5563",
                    }}
                  >
                    {isRu
                      ? "Индекс надежности источников 100% / 90% / 50% по каждому переходу."
                      : "Source reliability ratings across all European club negotiations."}
                  </p>
                </div>
                <Link
                  href="/transfers"
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "9px 12px",
                    backgroundColor: "#111827",
                    color: "#FFFFFF",
                    fontSize: "11.5px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  {isRu ? "Открыть /transfers →" : "Open /transfers →"}
                </Link>
              </div>
            </aside>

            {/* Most Read Top-5 */}
            <section aria-label={isRu ? "Самое читаемое" : "Most Read"}>
              <div
                style={{
                  borderTop: "2px solid #111827",
                  borderBottom: "1px solid #E5E7EB",
                  padding: "10px 0",
                  marginBottom: "4px",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#111827",
                  }}
                >
                  {isRu
                    ? "Топ-5 самых читаемых / Most Read"
                    : "Most Read / Топ-5 самых читаемых"}
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {mostReadArticles.map((art, index) => (
                  <ArticleCard
                    key={art.id}
                    article={art}
                    variant="compact"
                    rank={index + 1}
                    lang={lang}
                    showDivider={index < mostReadArticles.length - 1}
                  />
                ))}
              </div>
            </section>

            {/* Quick Sections Box */}
            <section
              aria-label={isRu ? "Разделы портала" : "Portal Sections"}
              style={{
                border: "1px solid #E5E7EB",
                padding: "16px",
                backgroundColor: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#111827",
                  borderBottom: "1px solid #E5E7EB",
                  paddingBottom: "8px",
                }}
              >
                {isRu ? "Спецразделы Golason" : "Golason Special Desks"}
              </div>
              <Link
                href="/live"
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#DC2626",
                  textDecoration: "none",
                }}
              >
                {isRu
                  ? "Матч-центр LIVE и тактические схемы →"
                  : "LIVE Match Center & Tactical Lineups →"}
              </Link>
              <Link
                href="/transfers"
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#111827",
                  textDecoration: "none",
                }}
              >
                {isRu
                  ? "Трансферный Радар (Tier 1–3) →"
                  : "Transfer Reliability Radar (Tier 1–3) →"}
              </Link>
              <Link
                href="/standings"
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#111827",
                  textDecoration: "none",
                }}
              >
                {isRu
                  ? "Турнирные таблицы топ-5 лиг →"
                  : "Top 5 European League Standings →"}
              </Link>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
