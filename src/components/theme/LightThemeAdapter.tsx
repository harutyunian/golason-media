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
  if (a < 0.15) return false;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum < 55 && b >= r;
}

function isLightTextRgb(r: number, g: number, b: number): boolean {
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 175;
}

function isDarkGradientString(bgImg: string): boolean {
  if (!bgImg || bgImg === "none") return false;
  const low = bgImg.replace(/\s+/g, "").toLowerCase();
  return (
    low.includes("rgb(6,11,20") ||
    low.includes("rgb(9,19,36") ||
    low.includes("rgba(9,19,36") ||
    low.includes("rgb(11,21,40") ||
    low.includes("rgba(11,21,40") ||
    low.includes("rgb(13,27,50") ||
    low.includes("rgba(13,27,50") ||
    low.includes("rgb(15,29,54") ||
    low.includes("rgba(15,29,54") ||
    low.includes("rgb(16,35,66") ||
    low.includes("rgb(10,20,38") ||
    low.includes("rgb(7,14,26") ||
    low.includes("#060b14") ||
    low.includes("#091324") ||
    low.includes("#0b1528") ||
    low.includes("#0d1b32") ||
    low.includes("#0f1d36")
  );
}

export function LightThemeAdapter({ theme }: { theme: ThemeMode }) {
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-golason-theme", theme);

    const applyThemeToDom = () => {
      const allElements = document.querySelectorAll<HTMLElement>("body *");

      if (theme === "dark") {
        allElements.forEach((el) => {
          if (el.hasAttribute(ORIG_STYLE_ATTR)) {
            const orig = el.getAttribute(ORIG_STYLE_ATTR) || "";
            el.setAttribute("style", orig);
            el.removeAttribute(ORIG_STYLE_ATTR);
          }
        });
        return;
      }

      // Light Mode transformation
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
          tag === "style"
        ) {
          return;
        }

        if (!el.hasAttribute(ORIG_STYLE_ATTR)) {
          el.setAttribute(ORIG_STYLE_ATTR, el.getAttribute("style") || "");
        }

        const cs = window.getComputedStyle(el);

        // 1. Handle gradient-clipped text (e.g. white gradient headings)
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

        // 2. Check if element is a vibrant orange/blue/green/red button or badge
        const bgRgb = parseRgb(cs.backgroundColor);
        const bgImg = cs.backgroundImage;
        const isVibrantBg =
          (bgRgb &&
            bgRgb[3] > 0.4 &&
            ((bgRgb[0] > 180 && bgRgb[1] < 150) ||
              (bgRgb[1] > 140 && bgRgb[0] < 80) ||
              (bgRgb[2] > 180 && bgRgb[0] < 60))) ||
          bgImg.includes("255, 98, 0") ||
          bgImg.includes("255, 87, 34") ||
          bgImg.includes("34, 158, 217");

        if (isVibrantBg) {
          return;
        }

        // 3. Transform dark background colors and dark gradients to clean White / Slate surfaces
        let surfaceFlipped = false;
        if (isDarkGradientString(bgImg)) {
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
            el.clientHeight < 52;
          el.style.backgroundColor = isInputOrPill ? "#F1F5F9" : "#FFFFFF";
          el.style.borderColor = "#CBD5E1";
          if (!isInputOrPill) {
            el.style.boxShadow = "0 4px 16px rgba(15, 23, 42, 0.05)";
          }
          surfaceFlipped = true;
        }

        // 4. Flip light/white text to high-contrast dark navy (#0F172A) or slate (#475569)
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
    const t1 = setTimeout(applyThemeToDom, 80);
    const t2 = setTimeout(applyThemeToDom, 300);

    const observer = new MutationObserver(() => {
      if (theme === "light") {
        applyThemeToDom();
      }
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
