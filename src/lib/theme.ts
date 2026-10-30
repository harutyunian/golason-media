export type ThemeMode = "dark" | "light";

export interface ThemePalette {
  mode: ThemeMode;
  pageBg: string;
  pageBgGradient: string;
  headerBg: string;
  headerBorder: string;
  cardBg: string;
  cardSecondaryBg: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accentOrange: string;
  accentGold: string;
  pillBg: string;
  pillBorder: string;
  footerBg: string;
}

export const DARK_PALETTE: ThemePalette = {
  mode: "dark",
  pageBg: "#060D1A",
  pageBgGradient:
    "radial-gradient(circle at 50% 0%, #102342 0%, #091324 45%, #050B14 100%)",
  headerBg: "rgba(9, 19, 36, 0.94)",
  headerBorder: "rgba(255, 196, 0, 0.22)",
  cardBg: "#0B172A",
  cardSecondaryBg: "#0F213C",
  cardBorder: "rgba(148, 163, 184, 0.2)",
  textPrimary: "#F8FAFC",
  textSecondary: "#CBD5E1",
  textMuted: "#94A3B8",
  accentOrange: "#FF6200",
  accentGold: "#FFC400",
  pillBg: "rgba(15, 29, 54, 0.75)",
  pillBorder: "rgba(148, 163, 184, 0.22)",
  footerBg: "#050A14",
};

export const LIGHT_PALETTE: ThemePalette = {
  mode: "light",
  pageBg: "#F1F5F9",
  pageBgGradient:
    "radial-gradient(circle at 50% 0%, #FFFFFF 0%, #F1F5F9 55%, #E2E8F0 100%)",
  headerBg: "rgba(255, 255, 255, 0.95)",
  headerBorder: "rgba(226, 232, 240, 0.95)",
  cardBg: "#FFFFFF",
  cardSecondaryBg: "#F8FAFC",
  cardBorder: "#CBD5E1",
  textPrimary: "#0F172A",
  textSecondary: "#334155",
  textMuted: "#64748B",
  accentOrange: "#EA580C",
  accentGold: "#D97706",
  pillBg: "#F1F5F9",
  pillBorder: "#CBD5E1",
  footerBg: "#FFFFFF",
};

export function getThemePalette(mode: ThemeMode): ThemePalette {
  return mode === "light" ? LIGHT_PALETTE : DARK_PALETTE;
}
