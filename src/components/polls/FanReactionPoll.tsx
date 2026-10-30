"use client";

import React, { useState, useEffect } from "react";

export type PollLocale = "en" | "ru";

export interface PollOption {
  id: string;
  labelEn: string;
  labelRu: string;
  emoji: string;
  baseVotes: number;
  accentColor: string;
}

export interface FanPollQuestion {
  id: string;
  badgeEn: string;
  badgeRu: string;
  questionEn: string;
  questionRu: string;
  subtitleEn: string;
  subtitleRu: string;
  options: PollOption[];
}

const STORAGE_KEY = "golason_fan_reaction_polls_v1";

export const DEFAULT_FAN_POLLS: FanPollQuestion[] = [
  {
    id: "poll-el-clasico-winner",
    badgeEn: "MATCH OF THE WEEK",
    badgeRu: "МАТЧ НЕДЕЛИ",
    questionEn: "Who wins El Clasico?",
    questionRu: "Кто победит в Эль-Класико? (Who wins El Clasico?)",
    subtitleEn: "1-click instant fan pulse • Santiago Bernabéu / Camp Nou showdown",
    subtitleRu: "Голосование в 1 клик без регистрации • Битва титанов Ла Лиги",
    options: [
      {
        id: "real-madrid",
        labelEn: "Real Madrid",
        labelRu: "Реал Мадрид (Real Madrid)",
        emoji: "👑",
        baseVotes: 1842,
        accentColor: "#FF5722",
      },
      {
        id: "barcelona",
        labelEn: "FC Barcelona",
        labelRu: "Барселона (FC Barcelona)",
        emoji: "🔵🔴",
        baseVotes: 1765,
        accentColor: "#38BDF8",
      },
      {
        id: "draw",
        labelEn: "High-Scoring Draw",
        labelRu: "Результативная ничья (Draw)",
        emoji: "⚡",
        baseVotes: 618,
        accentColor: "#F59E0B",
      },
    ],
  },
  {
    id: "poll-var-red-card",
    badgeEn: "REFEREE CONTROVERSY",
    badgeRu: "СУДЕЙСКИЙ РАЗБОР VAR",
    questionEn: "Was the VAR red card fair?",
    questionRu: "Справедлива ли красная карточка VAR? (Was the VAR red card fair?)",
    subtitleEn: "88th-minute tactical foul review • 500fps optical tracking frame",
    subtitleRu: "Разбор фола последней надежды на 88-й минуте • Оптический трекинг",
    options: [
      {
        id: "var-fair",
        labelEn: "Yes — 100% Clear Red Card",
        labelRu: "Да — 100% чистая красная карточка",
        emoji: "🟥",
        baseVotes: 1290,
        accentColor: "#10B981",
      },
      {
        id: "var-harsh",
        labelEn: "No — Too Harsh (Yellow Only)",
        labelRu: "Нет — слишком строго (только жёлтая)",
        emoji: "🟨",
        baseVotes: 1640,
        accentColor: "#FF5722",
      },
      {
        id: "var-inconsistent",
        labelEn: "VAR Protocol Was Inconsistent",
        labelRu: "Протокол VAR применён непоследовательно",
        emoji: "📺",
        baseVotes: 512,
        accentColor: "#A855F7",
      },
    ],
  },
  {
    id: "poll-ballon-dor-favorite",
    badgeEn: "GLOBAL POWER RANKING",
    badgeRu: "МИРОВОЙ РЕЙТИНГ",
    questionEn: "Ballon d'Or favorite?",
    questionRu: "Главный фаворит на «Золотой мяч»? (Ballon d'Or favorite?)",
    subtitleEn: "Who lifts football's ultimate individual trophy in Paris?",
    subtitleRu: "Кто заберёт главную индивидуальную награду мирового футбола?",
    options: [
      {
        id: "lamine-yamal",
        labelEn: "Lamine Yamal",
        labelRu: "Ламин Ямаль (Lamine Yamal)",
        emoji: "🌟",
        baseVotes: 2110,
        accentColor: "#FF5722",
      },
      {
        id: "kylian-mbappe",
        labelEn: "Kylian Mbappé",
        labelRu: "Килиан Мбаппе (Kylian Mbappé)",
        emoji: "🐢",
        baseVotes: 1935,
        accentColor: "#38BDF8",
      },
      {
        id: "vinicius-jr",
        labelEn: "Vinícius Júnior",
        labelRu: "Винисиус Жуниор (Vinícius Jr.)",
        emoji: "🔥",
        baseVotes: 1580,
        accentColor: "#10B981",
      },
      {
        id: "raphinha-salah",
        labelEn: "Raphinha / Mohamed Salah",
        labelRu: "Рафинья / Мохамед Салах",
        emoji: "👑",
        baseVotes: 1425,
        accentColor: "#F59E0B",
      },
    ],
  },
];

export interface FanReactionPollProps {
  polls?: FanPollQuestion[];
  lang?: PollLocale;
  locale?: PollLocale;
  storageKey?: string;
  className?: string;
}

export function FanReactionPoll({
  polls = DEFAULT_FAN_POLLS,
  lang,
  locale,
  storageKey = STORAGE_KEY,
  className = "",
}: FanReactionPollProps) {
  const activeLocale: PollLocale = lang ?? locale ?? "en";

  // Map of pollId -> selected optionId
  const [userVotes, setUserVotes] = useState<Record<string, string>>({});
  const [hydrated, setHydrated] = useState(false);

  // Load persisted votes from localStorage on mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const raw = window.localStorage.getItem(storageKey);
        if (raw) {
          const parsed = JSON.parse(raw) as Record<string, string>;
          if (parsed && typeof parsed === "object") {
            setUserVotes(parsed);
          }
        }
      }
    } catch {
      // Ignore storage access errors in restricted environments
    } finally {
      setHydrated(true);
    }
  }, [storageKey]);

  const handleVote = (pollId: string, optionId: string) => {
    setUserVotes((prev: Record<string, string>) => {
      const updated = {
        ...prev,
        [pollId]: optionId,
      };
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          window.localStorage.setItem(storageKey, JSON.stringify(updated));
        }
      } catch {
        // Ignore quota or private browsing errors
      }
      return updated;
    });
  };

  const handleClearVote = (pollId: string) => {
    setUserVotes((prev: Record<string, string>) => {
      const updated = { ...prev };
      delete updated[pollId];
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          window.localStorage.setItem(storageKey, JSON.stringify(updated));
        }
      } catch {
        // Ignore storage errors
      }
      return updated;
    });
  };

  return (
    <section
      className={`fan-reaction-poll-widget ${className}`}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "24px",
        borderRadius: "20px",
        background:
          "linear-gradient(160deg, #0A1128 0%, #0F172A 75%, rgba(255, 87, 34, 0.14) 100%)",
        border: "1px solid rgba(255, 87, 34, 0.3)",
        boxShadow: "0 16px 40px rgba(5, 10, 25, 0.55)",
        color: "#F8FAFC",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          paddingBottom: "14px",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#FF5722",
              marginBottom: "4px",
            }}
          >
            <span>🗳️</span>
            <span>
              {activeLocale === "ru"
                ? "Интерактивный пульс трибун • 1 клик"
                : "1-Click Live Fan Reaction Polls"}
            </span>
          </div>
          <h3
            style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: 900,
              color: "#FFFFFF",
            }}
          >
            {activeLocale === "ru"
              ? "Голос болельщиков (Без регистрации)"
              : "Voice of the Terraces (No Login Required)"}
          </h3>
        </div>

        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            padding: "5px 10px",
            borderRadius: "999px",
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            color: "#34D399",
          }}
        >
          {hydrated
            ? activeLocale === "ru"
              ? "● Live-синхронизация (localStorage)"
              : "● Live Persistent Votes"
            : "● Loading Poll Telemetry..."}
        </span>
      </div>

      {/* Poll Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: "18px",
        }}
      >
        {polls.map((poll) => {
          const selectedOptionId = userVotes[poll.id];
          const hasVoted = Boolean(selectedOptionId);

          const totalVotes = poll.options.reduce((sum, opt) => {
            const bonus = selectedOptionId === opt.id ? 1 : 0;
            return sum + opt.baseVotes + bonus;
          }, 0);

          const badge =
            activeLocale === "ru" ? poll.badgeRu : poll.badgeEn;
          const question =
            activeLocale === "ru" ? poll.questionRu : poll.questionEn;
          const subtitle =
            activeLocale === "ru" ? poll.subtitleRu : poll.subtitleEn;

          return (
            <div
              key={poll.id}
              data-poll-id={poll.id}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "14px",
                padding: "18px",
                borderRadius: "14px",
                backgroundColor: "rgba(15, 23, 42, 0.85)",
                border: hasVoted
                  ? "1px solid rgba(255, 87, 34, 0.45)"
                  : "1px solid rgba(255, 255, 255, 0.09)",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 800,
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      padding: "3px 8px",
                      borderRadius: "6px",
                      backgroundColor: "rgba(255, 87, 34, 0.16)",
                      color: "#FF8A65",
                    }}
                  >
                    {badge}
                  </span>

                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#94A3B8",
                    }}
                  >
                    {totalVotes.toLocaleString()}{" "}
                    {activeLocale === "ru" ? "голосов" : "votes"}
                  </span>
                </div>

                <h4
                  style={{
                    margin: "0 0 6px 0",
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "#FFFFFF",
                    lineHeight: 1.35,
                  }}
                >
                  {question}
                </h4>

                <p
                  style={{
                    margin: "0 0 14px 0",
                    fontSize: "12px",
                    color: "#94A3B8",
                    lineHeight: 1.45,
                  }}
                >
                  {subtitle}
                </p>

                {/* Options List with Live Animated Percentage Bars */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {poll.options.map((opt) => {
                    const isSelected = selectedOptionId === opt.id;
                    const optionVotes = opt.baseVotes + (isSelected ? 1 : 0);
                    const pct =
                      totalVotes > 0
                        ? Math.round((optionVotes / totalVotes) * 100)
                        : 0;
                    const label =
                      activeLocale === "ru" ? opt.labelRu : opt.labelEn;

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleVote(poll.id, opt.id)}
                        aria-pressed={isSelected}
                        style={{
                          position: "relative",
                          width: "100%",
                          textAlign: "left",
                          padding: "10px 12px",
                          borderRadius: "10px",
                          backgroundColor: "rgba(10, 17, 40, 0.9)",
                          border: isSelected
                            ? `1.5px solid ${opt.accentColor}`
                            : "1px solid rgba(255, 255, 255, 0.12)",
                          color: "#F8FAFC",
                          cursor: "pointer",
                          overflow: "hidden",
                          transition: "border-color 200ms ease",
                        }}
                      >
                        {/* Live Animated Percentage Fill Bar */}
                        <div
                          aria-hidden="true"
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            bottom: 0,
                            width: `${pct}%`,
                            background: `linear-gradient(90deg, ${opt.accentColor}38 0%, ${opt.accentColor}18 100%)`,
                            transition:
                              "width 550ms cubic-bezier(0.22, 1, 0.36, 1)",
                            pointerEvents: "none",
                          }}
                        />

                        {/* Foreground Label & Percentage */}
                        <div
                          style={{
                            position: "relative",
                            zIndex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "8px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "13px",
                              fontWeight: isSelected ? 800 : 700,
                              color: isSelected ? "#FFFFFF" : "#E2E8F0",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "7px",
                            }}
                          >
                            <span>{opt.emoji}</span>
                            <span>{label}</span>
                            {isSelected && (
                              <span
                                style={{
                                  fontSize: "10px",
                                  padding: "1px 6px",
                                  borderRadius: "999px",
                                  backgroundColor: opt.accentColor,
                                  color: "#0A1128",
                                  fontWeight: 900,
                                }}
                              >
                                {activeLocale === "ru" ? "Ваш выбор" : "Voted"}
                              </span>
                            )}
                          </span>

                          <span
                            style={{
                              fontSize: "13px",
                              fontWeight: 900,
                              color: isSelected ? opt.accentColor : "#CBD5E1",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {pct}%
                          </span>
                        </div>

                        {/* Dedicated Bottom Progress Bar Track */}
                        <div
                          style={{
                            position: "relative",
                            zIndex: 1,
                            marginTop: "7px",
                            width: "100%",
                            height: "4px",
                            borderRadius: "999px",
                            backgroundColor: "rgba(255, 255, 255, 0.08)",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${pct}%`,
                              height: "100%",
                              borderRadius: "999px",
                              backgroundColor: opt.accentColor,
                              transition:
                                "width 550ms cubic-bezier(0.22, 1, 0.36, 1)",
                            }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Card Footer Status */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "8px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                  fontSize: "11px",
                  color: "#94A3B8",
                }}
              >
                <span>
                  {hasVoted
                    ? activeLocale === "ru"
                      ? "✓ Голос учтён в браузере"
                      : "✓ Vote saved in browser"
                    : activeLocale === "ru"
                      ? "Нажмите на вариант для голосования"
                      : "Click any option to vote"}
                </span>

                {hasVoted && (
                  <button
                    type="button"
                    onClick={() => handleClearVote(poll.id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#38BDF8",
                      fontSize: "11px",
                      fontWeight: 700,
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    {activeLocale === "ru" ? "Изменить голос" : "Change vote"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FanReactionPoll;
