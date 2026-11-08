"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const GTM_ID = "GTM-WWG6VJWJ";
export const GA4_ID = "G-ZPT15DVDBY";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

function GolasonRouteTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (!pathname || typeof window === "undefined") return;

    const query = searchParams?.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;
    const pageLocation = window.location.href;
    const pageTitle = document.title;

    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_view",
      page_path: pagePath,
      page_location: pageLocation,
      page_title: pageTitle,
    });

    if (typeof window.gtag === "function") {
      window.gtag("config", GA4_ID, {
        page_path: pagePath,
        page_location: pageLocation,
        page_title: pageTitle,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export default function GolasonAnalytics() {
  return (
    <Suspense fallback={null}>
      <GolasonRouteTrackerInner />
    </Suspense>
  );
}
