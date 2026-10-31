"use client";

import { useEffect } from "react";
import type { ThemeMode } from "@/lib/theme";

const ORIG_STYLE_ATTR = "data-orig-inline-style";

function parseRgb(colorStr: string): [number, number, number, number] | null {
  const m = colorStr.match(
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/i
  );
  if (!m) return null;
  return [
    parseInt(m[1], 10),
    parseInt(m[2], 10),
    parseInt(m[3], 10),
    m[4] !== undefined ? parseFloat(m[4]) : 1,
  ];
}

function isDarkSurfaceRgb(r: number, g: number, b: number, a: number): boolean {
  if (a < 0.12) return false;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum < 78;
}

function isLightTextRgb(r: number, g: number, b: number): boolean {
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 170;
}

function hasDarkRgbInGradient(bgImg: string): boolean {
  if (!bgImg || bgImg === "none") return false;
  const matches = Array.from(
    bgImg.matchAll(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/gi)
  );
  for (const m of matches) {
    const r = parseInt(m[1], 10);
    const g = parseInt(m[2], 10);
    const b = parseInt(m[3], 10);
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (lum < 78) return true;
  }
  return false;
}

export function LightThemeAdapter({ theme }: { theme: ThemeMode }) {
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-golason-theme", theme);

    const applyThemeToDom = () => {
      const allElements = document.querySelectorAll<HTMLElement>("body *");

      allElements.forEach((el) => {
        if (el.closest("[data-keep-dark='true']")) return;
        const tag = el.tagName.toLowerCase();
        if (
          tag === "svg" ||
          tag === "path" ||
          tag === "circle" ||
          tag === "rect" ||
          tag === "line" ||
          tag === "script" ||
          tag === "style" ||
          tag === "img"
        ) {
          return;
        }

        if (!el.hasAttribute(ORIG_STYLE_ATTR)) {
          el.setAttribute(ORIG_STYLE_ATTR, el.getAttribute("style") || "");
        }

        const cs = window.getComputedStyle(el);

        // 1. Handle gradient-clipped text
        const webkitClip =
          (el.style as unknown as Record<string, string>).webkitBackgroundClip ||
          cs.getPropertyValue("-webkit-background-clip");
        if (webkitClip === "text") {
          (el.style as unknown as Record<string, string>).webkitBackgroundClip =
            "initial";
          (el.style as unknown as Record<string, string>).webkitTextFillColor =
            "#0F172A";
          el.style.backgroundImage = "none";
          el.style.color = "#0F172A";
          return;
        }

        const bgRgb = parseRgb(cs.backgroundColor);
        const bgImg = cs.backgroundImage;

        // 2. Keep bright orange, blue, green, red buttons/badges untouched
        const isPureVibrantPill =
          (bgRgb &&
            bgRgb[3] > 0.45 &&
            ((bgRgb[0] > 180 && bgRgb[1] < 155 && bgRgb[2] < 80) ||
              (bgRgb[1] > 140 && bgRgb[0] < 90) ||
              (bgRgb[2] > 175 && bgRgb[0] < 70))) ||
          ((bgImg.includes("255, 98, 0") ||
            bgImg.includes("255, 87, 34") ||
            bgImg.includes("34, 158, 217")) &&
            !hasDarkRgbInGradient(bgImg));

        if (isPureVibrantPill) {
          return;
        }

        // 3. Convert any dark gradient or dark surface to crisp White / Slate
        let surfaceFlipped = false;
        if (hasDarkRgbInGradient(bgImg)) {
          el.style.backgroundImage = "none";
          el.style.backgroundColor = "#FFFFFF";
          el.style.borderColor = "#E2E8F0";
          el.style.boxShadow = "0 4px 18px rgba(15, 23, 42, 0.06)";
          surfaceFlipped = true;
        } else if (
          bgRgb &&
          isDarkSurfaceRgb(bgRgb[0], bgRgb[1], bgRgb[2], bgRgb[3])
        ) {
          const isInputOrPill =
            tag === "input" ||
            tag === "button" ||
            tag === "select" ||
            el.clientHeight < 48;
          el.style.backgroundColor = isInputOrPill ? "#F1F5F9" : "#FFFFFF";
          el.style.borderColor = "#CBD5E1";
          if (!isInputOrPill) {
            el.style.boxShadow = "0 4px 16px rgba(15, 23, 42, 0.05)";
          }
          surfaceFlipped = true;
        }

        // 4. Flip light/white text to dark navy (#0F172A) or slate (#475569)
        const textRgb = parseRgb(cs.color);
        if (textRgb) {
          const [tr, tg, tb] = textRgb;
          if (tr > 230 && tg > 175 && tb < 50) {
            el.style.color = "#B45309";
          } else if (isLightTextRgb(tr, tg, tb)) {
            el.style.color =
              tr > 235 && tg > 235 && tb > 235 ? "#0F172A" : "#334155";
          } else if (surfaceFlipped) {
            el.style.color = "#0F172A";
          }
        }
      });
    };

    applyThemeToDom();
    const t1 = setTimeout(applyThemeToDom, 60);
    const t2 = setTimeout(applyThemeToDom, 250);

    const observer = new MutationObserver(() => {
      applyThemeToDom();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      observer.disconnect();
    };
  }, [theme]);

  return null;
}
