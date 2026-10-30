"use client";

import React from "react";

export type TransferTier = 1 | 2 | 3;
export type SupportedLocale = "en" | "ru";

export interface TransferRadarTierMeta {
  tier: TransferTier;
  percentage: number;
  labelEn: string;
  labelRu: string;
  shortLabelEn: string;
  shortLabelRu: string;
  icon: string;
  accentColor: string;
  bgColor: string;
  borderColor: string;
  barGradient: string;
  defaultSource: string;
}

export const TRANSFER_RADAR_TIERS: Record<TransferTier, TransferRadarTierMeta> = {
  1: {
    tier: 1,
    percentage: 100,
    labelEn: "Tier 1: 100% Official 🔥",
    labelRu: "Tier 1: 100% Official 🔥 • Официально",
    shortLabelEn: "100% Official 🔥",
    shortLabelRu: "100% Официально 🔥",
    icon: "🔥",
    accentColor: "#FF5722",
    bgColor: "rgba(255, 87, 34, 0.14)",
    borderColor: "rgba(255, 87, 34, 0.45)",
    barGradient: "linear-gradient(90deg, #FF5722 0%, #FF8A50 100%)",
    defaultSource: "Official Club Statement",
  },
  2: {
    tier: 2,
    percentage: 90,
    labelEn: "Tier 2: 90% Verified Insider 🟢",
    labelRu: "Tier 2: 90% Verified Insider 🟢 • Инсайдер",
    shortLabelEn: "90% Verified Insider 🟢",
    shortLabelRu: "90% Проверенный инсайдер 🟢",
    icon: "🟢",
    accentColor: "#10B981",
    bgColor: "rgba(16, 185, 129, 0.14)",
    borderColor: "rgba(16, 185, 129, 0.45)",
    barGradient: "linear-gradient(90deg, #059669 0%, #34D399 100%)",
    defaultSource: "Fabrizio Romano / David Ornstein",
  },
  3: {
    tier: 3,
    percentage: 50,
    labelEn: "Tier 3: 50% Hot Rumor 🟡",
    labelRu: "Tier 3: 50% Hot Rumor 🟡 • Слух",
    shortLabelEn: "50% Hot Rumor 🟡",
    shortLabelRu: "50% Горячий слух 🟡",
    icon: "🟡",
    accentColor: "#F59E0B",
    bgColor: "rgba(245, 158, 11, 0.14)",
    borderColor: "rgba(245, 158, 11, 0.45)",
    barGradient: "linear-gradient(90deg, #D97706 0%, #FBBF24 100%)",
    defaultSource: "Spanish / UK Tabloid Press",
  },
};

export interface TransferRadarBadgeProps {
  tier?: TransferTier | "1" | "2" | "3" | "tier1" | "tier2" | "tier3";
  reliability?: number;
  source?: string;
  lang?: SupportedLocale;
  locale?: SupportedLocale;
  compact?: boolean;
  showProgressBar?: boolean;
  className?: string;
}

function normalizeTier(
  input?: TransferRadarBadgeProps["tier"],
  reliability?: number
): TransferTier {
  if (input === 1 || input === "1" || input === "tier1") return 1;
  if (input === 2 || input === "2" || input === "tier2") return 2;
  if (input === 3 || input === "3" || input === "tier3") return 3;
  if (typeof reliability === "number") {
    if (reliability >= 95) return 1;
    if (reliability >= 75) return 2;
    return 3;
  }
  return 1;
}

export function TransferRadarBadge({
  tier,
  reliability,
  source,
  lang,
  locale,
  compact = false,
  showProgressBar = true,
  className = "",
}: TransferRadarBadgeProps) {
  const activeLocale: SupportedLocale = lang ?? locale ?? "en";
  const resolvedTier = normalizeTier(tier, reliability);
  const meta = TRANSFER_RADAR_TIERS[resolvedTier];
  const score = Math.max(
    0,
    Math.min(100, typeof reliability === "number" ? reliability : meta.percentage)
  );
  const resolvedSource = source?.trim() || meta.defaultSource;
  const displayLabel = activeLocale === "ru" ? meta.labelRu : meta.labelEn;

  return (
    <div
      className={`transfer-radar-badge ${className}`}
      data-tier={resolvedTier}
      data-reliability={score}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        gap: compact ? "5px" : "7px",
        padding: compact ? "6px 10px" : "10px 14px",
        borderRadius: "10px",
        backgroundColor: meta.bgColor,
        border: `1px solid ${meta.borderColor}`,
        backdropFilter: "blur(8px)",
        color: "#F8FAFC",
        minWidth: compact ? "200px" : "250px",
        maxWidth: "100%",
        boxShadow: "0 4px 16px rgba(10, 17, 40, 0.35)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontSize: compact ? "11px" : "12px",
            fontWeight: 800,
            letterSpacing: "0.02em",
            color: "#FFFFFF",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "9999px",
              backgroundColor: meta.accentColor,
              boxShadow: `0 0 8px ${meta.accentColor}`,
            }}
          />
          {displayLabel}
        </span>

        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            padding: "2px 7px",
            borderRadius: "999px",
            backgroundColor: "rgba(10, 17, 40, 0.72)",
            color: meta.accentColor,
            border: `1px solid ${meta.borderColor}`,
          }}
        >
          {score}%
        </span>
      </div>

      {showProgressBar && (
        <div
          aria-label={`Transfer reliability ${score}%`}
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{
            width: "100%",
            height: compact ? "5px" : "6px",
            borderRadius: "999px",
            backgroundColor: "rgba(15, 23, 42, 0.75)",
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div
            style={{
              width: `${score}%`,
              height: "100%",
              borderRadius: "999px",
              background: meta.barGradient,
              transition: "width 350ms cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: `0 0 10px ${meta.accentColor}`,
            }}
          />
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          fontSize: compact ? "10px" : "11px",
          color: "#CBD5E1",
        }}
      >
        <span style={{ fontWeight: 600, color: "#94A3B8" }}>
          {activeLocale === "ru" ? "Источник радара:" : "Radar Source:"}
        </span>
        <span
          style={{
            fontWeight: 700,
            color: "#E2E8F0",
            padding: "1px 6px",
            borderRadius: "4px",
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={resolvedSource}
        >
          {resolvedSource}
        </span>
      </div>
    </div>
  );
}

export default TransferRadarBadge;
