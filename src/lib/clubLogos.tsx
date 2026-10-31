"use client";

import React, { useState } from "react";
import rawSnapshot from "./realDataSnapshot.json";

const DYNAMIC_LOGO_MAP: Record<string, string> = {};
for (const m of rawSnapshot.matches || []) {
  for (const side of [m.homeTeam, m.awayTeam]) {
    if (side?.logoUrl) {
      if (side.id) DYNAMIC_LOGO_MAP[String(side.id).toLowerCase()] = side.logoUrl;
      if (side.nameEn) DYNAMIC_LOGO_MAP[side.nameEn.toLowerCase()] = side.logoUrl;
      if (side.nameRu) DYNAMIC_LOGO_MAP[side.nameRu.toLowerCase()] = side.logoUrl;
    }
  }
}
for (const lg of Object.values(rawSnapshot.standings || {})) {
  const entries = (lg as { entries?: Array<{ teamId?: string; teamName?: string; teamNameRu?: string; logoUrl?: string }> }).entries || [];
  for (const row of entries) {
    if (row?.logoUrl) {
      if (row.teamId) DYNAMIC_LOGO_MAP[String(row.teamId).toLowerCase()] = row.logoUrl;
      if (row.teamName) DYNAMIC_LOGO_MAP[row.teamName.toLowerCase()] = row.logoUrl;
      if (row.teamNameRu) DYNAMIC_LOGO_MAP[row.teamNameRu.toLowerCase()] = row.logoUrl;
    }
  }
}

const CLUB_LOGO_MAP: Record<string, string> = {
  // Spain - La Liga
  "real-madrid": "https://a.espncdn.com/i/teamlogos/soccer/500/86.png",
  "real madrid": "https://a.espncdn.com/i/teamlogos/soccer/500/86.png",
  "реал мадрид": "https://a.espncdn.com/i/teamlogos/soccer/500/86.png",
  barcelona: "https://a.espncdn.com/i/teamlogos/soccer/500/83.png",
  "fc barcelona": "https://a.espncdn.com/i/teamlogos/soccer/500/83.png",
  барселона: "https://a.espncdn.com/i/teamlogos/soccer/500/83.png",
  "atletico-madrid": "https://a.espncdn.com/i/teamlogos/soccer/500/1068.png",
  atletico: "https://a.espncdn.com/i/teamlogos/soccer/500/1068.png",
  "atletico madrid": "https://a.espncdn.com/i/teamlogos/soccer/500/1068.png",
  "атлетико м": "https://a.espncdn.com/i/teamlogos/soccer/500/1068.png",
  "атлетико мадрид": "https://a.espncdn.com/i/teamlogos/soccer/500/1068.png",
  "athletic-bilbao": "https://a.espncdn.com/i/teamlogos/soccer/500/93.png",
  "athletic-club": "https://a.espncdn.com/i/teamlogos/soccer/500/93.png",
  "athletic club": "https://a.espncdn.com/i/teamlogos/soccer/500/93.png",
  "атлетик бильбао": "https://a.espncdn.com/i/teamlogos/soccer/500/93.png",
  villarreal: "https://a.espncdn.com/i/teamlogos/soccer/500/102.png",
  вильярреал: "https://a.espncdn.com/i/teamlogos/soccer/500/102.png",
  "real-betis": "https://a.espncdn.com/i/teamlogos/soccer/500/244.png",
  "real betis": "https://a.espncdn.com/i/teamlogos/soccer/500/244.png",
  "реал бетис": "https://a.espncdn.com/i/teamlogos/soccer/500/244.png",
  бетис: "https://a.espncdn.com/i/teamlogos/soccer/500/244.png",
  "real-sociedad": "https://a.espncdn.com/i/teamlogos/soccer/500/89.png",
  "real sociedad": "https://a.espncdn.com/i/teamlogos/soccer/500/89.png",
  "реал сосьедад": "https://a.espncdn.com/i/teamlogos/soccer/500/89.png",
  sevilla: "https://a.espncdn.com/i/teamlogos/soccer/500/243.png",
  севилья: "https://a.espncdn.com/i/teamlogos/soccer/500/243.png",
  girona: "https://a.espncdn.com/i/teamlogos/soccer/500/9812.png",
  жирона: "https://a.espncdn.com/i/teamlogos/soccer/500/9812.png",

  // England - Premier League
  "man-city": "https://a.espncdn.com/i/teamlogos/soccer/500/382.png",
  "manchester-city": "https://a.espncdn.com/i/teamlogos/soccer/500/382.png",
  "man city": "https://a.espncdn.com/i/teamlogos/soccer/500/382.png",
  "manchester city": "https://a.espncdn.com/i/teamlogos/soccer/500/382.png",
  "ман сити": "https://a.espncdn.com/i/teamlogos/soccer/500/382.png",
  "манчестер сити": "https://a.espncdn.com/i/teamlogos/soccer/500/382.png",
  arsenal: "https://a.espncdn.com/i/teamlogos/soccer/500/359.png",
  арсенал: "https://a.espncdn.com/i/teamlogos/soccer/500/359.png",
  liverpool: "https://a.espncdn.com/i/teamlogos/soccer/500/364.png",
  ливерпуль: "https://a.espncdn.com/i/teamlogos/soccer/500/364.png",
  chelsea: "https://a.espncdn.com/i/teamlogos/soccer/500/363.png",
  челси: "https://a.espncdn.com/i/teamlogos/soccer/500/363.png",
  "man-united": "https://a.espncdn.com/i/teamlogos/soccer/500/360.png",
  "manchester-united": "https://a.espncdn.com/i/teamlogos/soccer/500/360.png",
  "manchester united": "https://a.espncdn.com/i/teamlogos/soccer/500/360.png",
  "манчестер юнайтед": "https://a.espncdn.com/i/teamlogos/soccer/500/360.png",
  tottenham: "https://a.espncdn.com/i/teamlogos/soccer/500/367.png",
  "tottenham hotspur": "https://a.espncdn.com/i/teamlogos/soccer/500/367.png",
  тоттенхэм: "https://a.espncdn.com/i/teamlogos/soccer/500/367.png",
  newcastle: "https://a.espncdn.com/i/teamlogos/soccer/500/361.png",
  "newcastle-united": "https://a.espncdn.com/i/teamlogos/soccer/500/361.png",
  "newcastle united": "https://a.espncdn.com/i/teamlogos/soccer/500/361.png",
  ньюкасл: "https://a.espncdn.com/i/teamlogos/soccer/500/361.png",
  "aston-villa": "https://a.espncdn.com/i/teamlogos/soccer/500/362.png",
  "aston villa": "https://a.espncdn.com/i/teamlogos/soccer/500/362.png",
  "астон вилла": "https://a.espncdn.com/i/teamlogos/soccer/500/362.png",
  "nottingham-forest": "https://a.espncdn.com/i/teamlogos/soccer/500/393.png",
  "nottingham forest": "https://a.espncdn.com/i/teamlogos/soccer/500/393.png",
  "ноттингем форест": "https://a.espncdn.com/i/teamlogos/soccer/500/393.png",
  brighton: "https://a.espncdn.com/i/teamlogos/soccer/500/331.png",
  брайтон: "https://a.espncdn.com/i/teamlogos/soccer/500/331.png",

  // Italy - Serie A
  inter: "https://a.espncdn.com/i/teamlogos/soccer/500/110.png",
  "inter-milan": "https://a.espncdn.com/i/teamlogos/soccer/500/110.png",
  "inter milan": "https://a.espncdn.com/i/teamlogos/soccer/500/110.png",
  интер: "https://a.espncdn.com/i/teamlogos/soccer/500/110.png",
  juventus: "https://a.espncdn.com/i/teamlogos/soccer/500/111.png",
  ювентус: "https://a.espncdn.com/i/teamlogos/soccer/500/111.png",
  "ac-milan": "https://a.espncdn.com/i/teamlogos/soccer/500/103.png",
  "ac milan": "https://a.espncdn.com/i/teamlogos/soccer/500/103.png",
  milan: "https://a.espncdn.com/i/teamlogos/soccer/500/103.png",
  милан: "https://a.espncdn.com/i/teamlogos/soccer/500/103.png",
  napoli: "https://a.espncdn.com/i/teamlogos/soccer/500/114.png",
  наполи: "https://a.espncdn.com/i/teamlogos/soccer/500/114.png",
  roma: "https://a.espncdn.com/i/teamlogos/soccer/500/104.png",
  "as-roma": "https://a.espncdn.com/i/teamlogos/soccer/500/104.png",
  "as roma": "https://a.espncdn.com/i/teamlogos/soccer/500/104.png",
  рома: "https://a.espncdn.com/i/teamlogos/soccer/500/104.png",
  lazio: "https://a.espncdn.com/i/teamlogos/soccer/500/112.png",
  лацио: "https://a.espncdn.com/i/teamlogos/soccer/500/112.png",
  atalanta: "https://a.espncdn.com/i/teamlogos/soccer/500/105.png",
  аталанта: "https://a.espncdn.com/i/teamlogos/soccer/500/105.png",
  fiorentina: "https://a.espncdn.com/i/teamlogos/soccer/500/109.png",
  фиорентина: "https://a.espncdn.com/i/teamlogos/soccer/500/109.png",

  // Germany & France
  bayern: "https://a.espncdn.com/i/teamlogos/soccer/500/132.png",
  "bayern-munich": "https://a.espncdn.com/i/teamlogos/soccer/500/132.png",
  "bayern munich": "https://a.espncdn.com/i/teamlogos/soccer/500/132.png",
  бавария: "https://a.espncdn.com/i/teamlogos/soccer/500/132.png",
  dortmund: "https://a.espncdn.com/i/teamlogos/soccer/500/124.png",
  "borussia-dortmund": "https://a.espncdn.com/i/teamlogos/soccer/500/124.png",
  "borussia dortmund": "https://a.espncdn.com/i/teamlogos/soccer/500/124.png",
  "боруссия д": "https://a.espncdn.com/i/teamlogos/soccer/500/124.png",
  leverkusen: "https://a.espncdn.com/i/teamlogos/soccer/500/131.png",
  "bayer-leverkusen": "https://a.espncdn.com/i/teamlogos/soccer/500/131.png",
  "bayer leverkusen": "https://a.espncdn.com/i/teamlogos/soccer/500/131.png",
  "байер леверкузен": "https://a.espncdn.com/i/teamlogos/soccer/500/131.png",
  байер: "https://a.espncdn.com/i/teamlogos/soccer/500/131.png",
  psg: "https://a.espncdn.com/i/teamlogos/soccer/500/160.png",
  "paris-saint-germain": "https://a.espncdn.com/i/teamlogos/soccer/500/160.png",
  "paris saint-germain": "https://a.espncdn.com/i/teamlogos/soccer/500/160.png",
  псж: "https://a.espncdn.com/i/teamlogos/soccer/500/160.png",
  monaco: "https://a.espncdn.com/i/teamlogos/soccer/500/174.png",
  "as-monaco": "https://a.espncdn.com/i/teamlogos/soccer/500/174.png",
  монако: "https://a.espncdn.com/i/teamlogos/soccer/500/174.png",

  // Saudi Pro League & MLS
  "al-nassr": "https://a.espncdn.com/i/teamlogos/soccer/500/817.png",
  "al nassr": "https://a.espncdn.com/i/teamlogos/soccer/500/817.png",
  "аль-наср": "https://a.espncdn.com/i/teamlogos/soccer/500/817.png",
  "al-hilal": "https://a.espncdn.com/i/teamlogos/soccer/500/929.png",
  "al hilal": "https://a.espncdn.com/i/teamlogos/soccer/500/929.png",
  "аль-хиляль": "https://a.espncdn.com/i/teamlogos/soccer/500/929.png",
  "al-ittihad": "https://a.espncdn.com/i/teamlogos/soccer/500/2276.png",
  "al ittihad": "https://a.espncdn.com/i/teamlogos/soccer/500/2276.png",
  "аль-иттихад": "https://a.espncdn.com/i/teamlogos/soccer/500/2276.png",
  "al-ahli": "https://a.espncdn.com/i/teamlogos/soccer/500/8346.png",
  "al ahli": "https://a.espncdn.com/i/teamlogos/soccer/500/8346.png",
  "аль-ахли": "https://a.espncdn.com/i/teamlogos/soccer/500/8346.png",
  "al-qadsiah": "https://images.fotmob.com/image_resources/logo/teamlogo/101922.png",
  "al qadsiah": "https://images.fotmob.com/image_resources/logo/teamlogo/101922.png",
  "аль-кадисия": "https://images.fotmob.com/image_resources/logo/teamlogo/101922.png",
  "al-shabab": "https://images.fotmob.com/image_resources/logo/teamlogo/101918.png",
  "al shabab": "https://images.fotmob.com/image_resources/logo/teamlogo/101918.png",
  "аль-шабаб": "https://images.fotmob.com/image_resources/logo/teamlogo/101918.png",
  "inter-miami": "https://a.espncdn.com/i/teamlogos/soccer/500/20232.png",
  "inter miami": "https://a.espncdn.com/i/teamlogos/soccer/500/20232.png",
  "интер майами": "https://a.espncdn.com/i/teamlogos/soccer/500/20232.png",
};

export function getClubLogoUrl(
  teamId?: string,
  teamName?: string,
  teamNameRu?: string
): string | null {
  const candidates = [teamId, teamName, teamNameRu]
    .filter(Boolean)
    .map((s) => (s as string).trim().toLowerCase());

  for (const c of candidates) {
    if (DYNAMIC_LOGO_MAP[c]) return DYNAMIC_LOGO_MAP[c];
    if (CLUB_LOGO_MAP[c]) return CLUB_LOGO_MAP[c];
  }
  for (const c of candidates) {
    for (const [key, url] of Object.entries(CLUB_LOGO_MAP)) {
      if (c.includes(key) || key.includes(c)) {
        return url;
      }
    }
    for (const [key, url] of Object.entries(DYNAMIC_LOGO_MAP)) {
      if (key.length > 3 && (c.includes(key) || key.includes(c))) {
        return url;
      }
    }
  }
  return null;
}

export function ClubLogo({
  teamId,
  teamName,
  teamNameRu,
  fallbackText,
  size = 22,
}: {
  teamId?: string;
  teamName?: string;
  teamNameRu?: string;
  fallbackText?: string;
  size?: number;
}) {
  const [imgError, setImgError] = useState(false);
  const logoUrl = getClubLogoUrl(teamId, teamName, teamNameRu);

  if (logoUrl && !imgError) {
    return (
      <img
        src={logoUrl}
        alt={teamName || teamNameRu || "Club crest"}
        width={size}
        height={size}
        onError={() => setImgError(true)}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          objectFit: "contain",
          flexShrink: 0,
          display: "inline-block",
        }}
      />
    );
  }

  return (
    <span
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        backgroundColor: "#F1F5F9",
        border: "1px solid #CBD5E1",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: `${Math.max(10, size - 10)}px`,
        fontWeight: 800,
        color: "#0F172A",
        flexShrink: 0,
      }}
    >
      {(fallbackText || teamName || "⚽").slice(0, 2)}
    </span>
  );
}
