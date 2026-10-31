"use client";

import React, { useState, useEffect } from "react";
import { EditorialMasthead } from "@/components/editorial/EditorialMasthead";
import { NewspaperFrontPage } from "@/components/editorial/NewspaperFrontPage";
import { EditorialFooter } from "@/components/editorial/EditorialFooter";
import { LiveScoreTicker } from "@/components/ticker";

type PortalLang = "ru" | "en";

const LANG_STORAGE_KEY = "golason_editorial_lang_v1";

export default function GolasonHomePage() {
  const [lang, setLang] = useState<PortalLang>("ru");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === "ru" || saved === "en") {
        setLang(saved);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const handleLangChange = (nextLang: PortalLang) => {
    setLang(nextLang);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, nextLang);
    } catch {
      // ignore storage errors
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FFFFFF",
        color: "#111827",
      }}
    >
      <EditorialMasthead
        lang={lang}
        onLangChange={handleLangChange}
        activePath="/"
      />
      <LiveScoreTicker lang={lang} />
      <NewspaperFrontPage lang={lang} />
      <EditorialFooter lang={lang} />
    </div>
  );
}
