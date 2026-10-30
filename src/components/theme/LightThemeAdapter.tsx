"use client";

import { useEffect } from "react";
import type { ThemeMode } from "@/lib/theme";

const ORIG_BG_ATTR = "data-orig-bg";
const ORIG_BG_IMG_ATTR = "data-orig-bg-img";
const ORIG_COLOR_ATTR = "data-orig-color";
const ORIG_BORDER_ATTR = "data-orig-border";
const ORIG_SHADOW_ATTR = "data-orig-shadow";

function isDarkNavyColor(val: string): boolean {
  const v = val.replace(/\s+/g, "").toLowerCase();
  if (
    v.includes("rgb(9,19,36") ||
    v.includes("rgba(9,19,36") ||
    v.includes("rgb(6,13,26") ||
    v.includes("rgb(5,11,20") ||
    v.includes("rgb(7,16,30") ||
    v.includes("rgb(11,21,40") ||
    v.includes("rgb(11,23,42") ||
    v.includes("rgb(13,27,50") ||
    v.includes("rgb(14,30,56") ||
    v.includes("rgb(15,29,54") ||
    v.includes("rgba(15,29,54") ||
    v.includes("rgba(11,21,40") ||
    v.includes("rgba(13,27,50") ||
    v.includes("rgba(14,34,58") ||
    v.includes("rgb(16,35,66") ||
    v.includes("rgb(17,34,64") ||
    v.includes("rgb(20,38,70") ||
    v.includes("#091324") ||
    v.includes("#060d1a") ||
    v.includes("#0b1528") ||
    v.includes("#0b172a") ||
    v.includes("#0d1b32") ||
    v.includes("#0f1d36") ||
    v.includes("#112240")
  ) {
    return true;
  }
  return false;
}

function isLightWhiteText(val: string): boolean {
  const v = val.replace(/\s+/g, "").toLowerCase();
  return (
    v === "rgb(255,255,255)" ||
    v === "rgb(248,250,252)" ||
    v === "rgb(241,245,249)" ||
    v === "rgb(226,232,240)" ||
    v === "rgb(203,213,225)" ||
    v === "#ffffff" ||
    v === "#fff" ||
    v === "#f8fafc" ||
    v === "#f1f5f9" ||
    v === "#e2e8f0" ||
    v === "#cbd5e1"
  );
}

function isMutedSlateText(val: string): boolean {
  const v = val.replace(/\s+/g, "").toLowerCase();
  return (
    v === "rgb(148,163,184)" ||
    v === "#94a3b8" ||
    v.includes("rgba(255,255,255,0.7") ||
    v.includes("rgba(255,255,255,0.6") ||
    v.includes("rgba(248,250,252,0.7")
  );
}

function isVibrantBadgeOrPitch(el: HTMLElement): boolean {
  if (el.closest("[data-keep-dark='true']")) return true;
  const bg = (el.style.background || el.style.backgroundColor || el.style.backgroundImage || "")
    .replace(/\s+/g, "")
    .toLowerCase();
  // Keep orange/gold/blue/green/red pills and dark green/charcoal pitch turf untouched
  if (
    bg.includes("255,98,0") ||
    bg.includes("255,87,34") ||
    bg.includes("34,158,217") ||
    bg.includes("34,197,94") ||
    bg.includes("22,163,74") ||
    bg.includes("239,68,68") ||
    bg.includes("220,38,38") ||
    bg.includes("2,132,199") ||
    bg.includes("34,36,40") ||
    bg.includes("#222428")
  ) {
    return true;
  }
  return false;
}

export function LightThemeAdapter({ theme }: { theme: ThemeMode }) {
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-golason-theme", theme);

    const applyThemeToDom = () => {
      const allElements = document.querySelectorAll<HTMLElement>("body *");

      if (theme === "dark") {
        allElements.forEach((el) => {
          if (el.hasAttribute(ORIG_BG_ATTR)) {
            el.style.backgroundColor = el.getAttribute(ORIG_BG_ATTR) || "";
            el.removeAttribute(ORIG_BG_ATTR);
          }
          if (el.hasAttribute(ORIG_BG_IMG_ATTR)) {
            el.style.backgroundImage = el.getAttribute(ORIG_BG_IMG_ATTR) || "";
            el.removeAttribute(ORIG_BG_IMG_ATTR);
          }
          if (el.hasAttribute(ORIG_COLOR_ATTR)) {
            el.style.color = el.getAttribute(ORIG_COLOR_ATTR) || "";
            el.removeAttribute(ORIG_COLOR_ATTR);
          }
          if (el.hasAttribute(ORIG_BORDER_ATTR)) {
            el.style.borderColor = el.getAttribute(ORIG_BORDER_ATTR) || "";
            el.removeAttribute(ORIG_BORDER_ATTR);
          }
          if (el.hasAttribute(ORIG_SHADOW_ATTR)) {
            el.style.boxShadow = el.getAttribute(ORIG_SHADOW_ATTR) || "";
            el.removeAttribute(ORIG_SHADOW_ATTR);
          }
        });
        return;
      }

      // Light mode adaptation
      allElements.forEach((el) => {
        if (isVibrantBadgeOrPitch(el)) return;

        const inlineBg = el.style.backgroundColor;
        const inlineBgImg = el.style.backgroundImage;
        const inlineColor = el.style.color;

        if (inlineBg && isDarkNavyColor(inlineBg)) {
          if (!el.hasAttribute(ORIG_BG_ATTR)) {
            el.setAttribute(ORIG_BG_ATTR, inlineBg);
          }
          el.style.backgroundColor = "#FFFFFF";
          if (!el.hasAttribute(ORIG_SHADOW_ATTR)) {
            el.setAttribute(ORIG_SHADOW_ATTR, el.style.boxShadow || "");
          }
          el.style.boxShadow = "0 6px 20px rgba(15, 23, 42, 0.06)";
        }

        if (inlineBgImg && isDarkNavyColor(inlineBgImg)) {
          if (!el.hasAttribute(ORIG_BG_IMG_ATTR)) {
            el.setAttribute(ORIG_BG_IMG_ATTR, inlineBgImg);
          }
          el.style.backgroundImage =
            "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 60%, #FFF7ED 100%)";
          if (!el.hasAttribute(ORIG_SHADOW_ATTR)) {
            el.setAttribute(ORIG_SHADOW_ATTR, el.style.boxShadow || "");
          }
          el.style.boxShadow = "0 8px 24px rgba(15, 23, 42, 0.07)";
        }

        if (inlineColor) {
          if (isLightWhiteText(inlineColor)) {
            // Only flip white text to dark navy if the element is not inside a vibrant button/pill
            const parentBg = (
              el.parentElement?.style.backgroundColor ||
              el.parentElement?.style.background ||
              ""
            )
              .replace(/\s+/g, "")
              .toLowerCase();
            const onVibrantParent =
              parentBg.includes("255,98,0") ||
              parentBg.includes("34,158,217") ||
              parentBg.includes("22,163,74") ||
              parentBg.includes("239,68,68");
            if (!onVibrantParent) {
              if (!el.hasAttribute(ORIG_COLOR_ATTR)) {
                el.setAttribute(ORIG_COLOR_ATTR, inlineColor);
              }
              el.style.color = "#0F172A";
            }
          } else if (isMutedSlateText(inlineColor)) {
            if (!el.hasAttribute(ORIG_COLOR_ATTR)) {
              el.setAttribute(ORIG_COLOR_ATTR, inlineColor);
            }
            el.style.color = "#475569";
          } else if (
            inlineColor.replace(/\s+/g, "").toLowerCase() === "rgb(255,196,0)" ||
            inlineColor.toLowerCase() === "#ffc400"
          ) {
            if (!el.hasAttribute(ORIG_COLOR_ATTR)) {
              el.setAttribute(ORIG_COLOR_ATTR, inlineColor);
            }
            el.style.color = "#D97706";
          }
        }
      });
    };

    applyThemeToDom();
    const timer = setTimeout(applyThemeToDom, 120);
    const observer = new MutationObserver(() => {
      if (theme === "light") {
        applyThemeToDom();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [theme]);

  return null;
}
