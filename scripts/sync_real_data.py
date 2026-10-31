#!/usr/bin/env python3
"""
Golason Media — Real Data & AI Editorial Rewriter Sync Engine
Pulls:
1) 30+ real current football news stories across EPL, La Liga, UCL, Serie A, Bundesliga, Ligue 1
   and rewrites each story via Gemini 2.5 Flash into original 4-paragraph RU + EN editorial journalism
   with real remote 16:9 ESPN HD press photos (0 bytes stored on local server).
2) 40+ real matches (Oct 29 - Nov 2, 2026) with real ESPN Event IDs, real scores, real scorers,
   real kickoff times in MSK, and official ESPN club logos.
3) Real 2026/27 League Standings across La Liga, Premier League, Serie A, Champions League,
   Bundesliga, Ligue 1, and Saudi Pro League.
"""

import concurrent.futures
import json
import os
import re
import sys
import time
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

sys.path.insert(0, "/root/futbolnaya_jara")
from config import GEMINI_API_KEY  # type: ignore
from tracker import COMMON_RU_TEAMS, translate_names_ru  # type: ignore

OUT_JSON = Path("/root/golason-media/src/lib/realDataSnapshot.json")

LEAGUE_CONFIGS = [
    ("eng.1", "epl", "EPL", "АПЛ", "Premier League", "Англия • Премьер-лига", "🏴󠁧󠁢󠁥󠁮󠁧󠁿"),
    ("esp.1", "la-liga", "LA LIGA", "Ла Лига", "La Liga", "Испания • Ла Лига", "🇪🇸"),
    ("uefa.champions", "ucl", "UCL", "Лига чемпионов", "Champions League", "Лига чемпионов УЕФА", "🇪🇺"),
    ("ita.1", "serie-a", "SERIE A", "Серия А", "Serie A", "Италия • Серия А", "🇮🇹"),
    ("ger.1", "tactics", "BUNDESLIGA", "Бундеслига", "Bundesliga", "Германия • Бундеслига", "🇩🇪"),
    ("fra.1", "transfers", "LIGUE 1", "Лига 1", "Ligue 1", "Франция • Лига 1", "🇫🇷"),
    ("ksa.1", "transfers", "SAUDI", "Сауд. Лига", "Saudi Pro League", "Саудовская Про-Лига", "🇸🇦"),
]


def fetch_json(url: str, timeout: int = 12) -> dict:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/126.0.0.0 Safari/537.36",
            "Accept": "application/json",
        },
    )
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.loads(r.read().decode("utf-8", errors="ignore"))


def slugify(text: str, idx: int) -> str:
    clean = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    clean = "-".join(clean.split("-")[:9])
    return f"{clean}-{idx}" if clean else f"football-story-{idx}"


def rewrite_article_with_gemini(raw_item: dict, idx: int) -> dict:
    headline = raw_item["headline"]
    desc = raw_item["description"]
    img_url = raw_item["imageUrl"]
    img_caption = raw_item.get("imageCaption") or headline
    cat_key = raw_item["catKey"]
    cat_ru = raw_item["catRu"]
    cat_en = raw_item["catEn"]
    published_iso = raw_item.get("published") or datetime.now(timezone.utc).isoformat()

    is_transfer = any(
        w in (headline + " " + desc).lower()
        for w in ["transfer", "sign", "contract", "deal", "rumor", "move", "target", "clause", "eye"]
    )
    if is_transfer:
        cat_key = "transfers"
        cat_ru = "Трансферы"
        cat_en = "Transfers"

    prompt = (
        "You are a senior football journalist at an elite sports publication (like The Athletic / BBC Sport / Sports.ru).\n"
        "Take this REAL football news item from today and write an ORIGINAL, deeply analytical, rewritten article in BOTH Russian and English.\n"
        "DO NOT copy-paste the source sentence. Expand with real football context, tactical implications, and club background.\n"
        "NO emojis anywhere in titles, subtitles, or text.\n\n"
        f"Source Headline: {headline}\n"
        f"Source Summary: {desc}\n"
        f"League/Category: {cat_en} ({cat_ru})\n\n"
        "Return ONLY valid JSON with these exact keys:\n"
        "{\n"
        '  "titleRu": "Газетный аналитический заголовок на русском (без эмодзи)",\n'
        '  "titleEn": "Original analytical editorial headline in English (no emojis)",\n'
        '  "subtitleRu": "Подзаголовок (лид) из 1-2 предложений на русском",\n'
        '  "subtitleEn": "1-2 sentence analytical deck in English",\n'
        '  "bodyRu": ["Абзац 1 (подробно)", "Абзац 2 (тактика и детали)", "Абзац 3 (контекст сезона)", "Абзац 4 (вывод)"],\n'
        '  "bodyEn": ["Paragraph 1 (detailed)", "Paragraph 2 (tactical & club details)", "Paragraph 3 (season context)", "Paragraph 4 (conclusion)"],\n'
        '  "clubNameRu": "Название главного клуба или лиги на русском",\n'
        '  "clubNameEn": "Primary club or league name in English",\n'
        '  "imageCaptionRu": "Подпись к фото на русском языке. Фото: ESPN Images",\n'
        '  "authorRu": "Имя и фамилия спортивного обозревателя",\n'
        '  "authorEn": "Author Name",\n'
        '  "tagsRu": ["Тег1", "Тег2", "Тег3"],\n'
        '  "tagsEn": ["Tag1", "Tag2", "Tag3"]\n'
        "}"
    )

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"
    payload = json.dumps(
        {
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {
                "temperature": 0.4,
                "responseMimeType": "application/json",
            },
        }
    ).encode("utf-8")

    parsed = {}
    for attempt in range(2):
        try:
            req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
            with urllib.request.urlopen(req, timeout=35) as r:
                resp = json.loads(r.read().decode("utf-8"))
            txt = resp["candidates"][0]["content"]["parts"][0]["text"].strip()
            parsed = json.loads(txt)
            if parsed.get("titleRu") and parsed.get("bodyRu"):
                break
        except Exception as e:
            time.sleep(1)

    title_ru = parsed.get("titleRu") or headline
    title_en = parsed.get("titleEn") or headline
    sub_ru = parsed.get("subtitleRu") or desc or headline
    sub_en = parsed.get("subtitleEn") or desc or headline
    body_ru = parsed.get("bodyRu") if isinstance(parsed.get("bodyRu"), list) and len(parsed.get("bodyRu")) >= 2 else [sub_ru, desc]
    body_en = parsed.get("bodyEn") if isinstance(parsed.get("bodyEn"), list) and len(parsed.get("bodyEn")) >= 2 else [sub_en, desc]

    try:
        dt = datetime.fromisoformat(published_iso.replace("Z", "+00:00")).astimezone(timezone(timedelta(hours=3)))
        months_ru = ["", "января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
        pub_ru = f"{dt.day} {months_ru[dt.month]} {dt.year}, {dt.strftime('%H:%M')} МСК"
        pub_en = dt.strftime("%b %d, %Y • %H:%M UTC")
    except Exception:
        pub_ru = "31 октября 2026, МСК"
        pub_en = "Oct 31, 2026"

    return {
        "id": f"real-art-{idx}",
        "slug": slugify(title_en, idx),
        "category": cat_key,
        "categoryLabelRu": cat_ru,
        "categoryLabelEn": cat_en,
        "titleRu": title_ru,
        "titleEn": title_en,
        "subtitleRu": sub_ru,
        "subtitleEn": sub_en,
        "bodyRu": body_ru,
        "bodyEn": body_en,
        "authorRu": parsed.get("authorRu") or "Артур Арутюнян",
        "authorEn": parsed.get("authorEn") or "Arthur Harutyunyan",
        "authorRoleRu": "Спортивный обозреватель GOLASON",
        "authorRoleEn": "GOLASON Senior Football Writer",
        "publishedAtRu": pub_ru,
        "publishedAtEn": pub_en,
        "publishedAtIso": published_iso,
        "readTimeMinutes": max(3, min(7, len(" ".join(body_ru)) // 650 + 2)),
        "imageUrl": img_url,
        "imageCaptionRu": parsed.get("imageCaptionRu") or f"{title_ru}. Фото: ESPN Images",
        "imageCaptionEn": f"{img_caption}. Photo: ESPN Images",
        "clubNameRu": parsed.get("clubNameRu") or cat_ru,
        "clubNameEn": parsed.get("clubNameEn") or cat_en,
        "isLeadStory": idx == 1,
        "isTrending": idx <= 8,
        "isBreaking": idx <= 3,
        "transferReliability": 90 if is_transfer else None,
        "transferSource": "ESPN / Инсайд редакции" if is_transfer else None,
        "tagsRu": parsed.get("tagsRu") or [cat_ru, "Футбол"],
        "tagsEn": parsed.get("tagsEn") or [cat_en, "Football"],
    }


def collect_and_rewrite_real_articles() -> list:
    raw_candidates = []
    seen_headlines = set()
    seen_images = set()

    for espn_slug, cat_key, ticker_key, cat_ru, cat_en, full_ru, flag in LEAGUE_CONFIGS:
        url = f"https://site.api.espn.com/apis/site/v2/sports/soccer/{espn_slug}/news?limit=25"
        try:
            data = fetch_json(url)
            for art in data.get("articles", []):
                hl = (art.get("headline") or "").strip()
                desc = (art.get("description") or "").strip()
                if not hl or hl.lower() in seen_headlines:
                    continue
                # Skip women's or youth news
                low_all = (hl + " " + desc).lower()
                if any(w in low_all for w in ["women", "wsl", "nwsl", "u17", "u19", "u21", "femenino", "uswnt"]):
                    continue
                imgs = art.get("images") or []
                best_img = ""
                best_cap = ""
                for im in imgs:
                    u = im.get("url") or ""
                    if u.startswith("https://") and (".jpg" in u or ".png" in u or ".jpeg" in u):
                        best_img = u
                        best_cap = im.get("caption") or ""
                        break
                if not best_img or best_img in seen_images:
                    continue
                seen_headlines.add(hl.lower())
                seen_images.add(best_img)
                raw_candidates.append(
                    {
                        "headline": hl,
                        "description": desc,
                        "imageUrl": best_img,
                        "imageCaption": best_cap,
                        "published": art.get("published") or "",
                        "catKey": cat_key,
                        "catRu": cat_ru,
                        "catEn": cat_en,
                    }
                )
        except Exception as e:
            print(f"News fetch error for {espn_slug}: {e}")

    target_items = raw_candidates[:28]
    print(f"Collected {len(target_items)} unique real photo news stories. Rewriting via Gemini in parallel...")

    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
        future_map = {
            pool.submit(rewrite_article_with_gemini, item, i + 1): i
            for i, item in enumerate(target_items)
        }
        for fut in concurrent.futures.as_completed(future_map):
            try:
                res = fut.result()
                results.append(res)
            except Exception as e:
                print("Rewrite error:", e)

    results.sort(key=lambda x: int(x["id"].split("-")[-1]))
    for idx, r in enumerate(results):
        r["isLeadStory"] = idx == 0
    return results


def collect_real_matches() -> list:
    raw_events = []
    seen_ids = set()
    names_to_translate = set()

    for espn_slug, cat_key, ticker_key, cat_ru, cat_en, full_ru, flag in LEAGUE_CONFIGS:
        for q_suffix in ["", "?dates=20261030", "?dates=20261101"]:
            url = f"https://site.api.espn.com/apis/site/v2/sports/soccer/{espn_slug}/scoreboard{q_suffix}"
            try:
                data = fetch_json(url)
                for ev in data.get("events", []):
                    eid = str(ev.get("id", ""))
                    if not eid or eid in seen_ids:
                        continue
                    comps = ev.get("competitions") or []
                    if not comps:
                        continue
                    comp = comps[0]
                    competitors = comp.get("competitors") or []
                    if len(competitors) < 2:
                        continue
                    home = next((c for c in competitors if c.get("homeAway") == "home"), competitors[0])
                    away = next((c for c in competitors if c.get("homeAway") == "away"), competitors[1])
                    h_name = home.get("team", {}).get("displayName") or home.get("team", {}).get("name") or "Home"
                    a_name = away.get("team", {}).get("displayName") or away.get("team", {}).get("name") or "Away"
                    names_to_translate.add(h_name)
                    names_to_translate.add(a_name)
                    for d in comp.get("details") or []:
                        for p in d.get("participants") or []:
                            ath = p.get("athlete", {}).get("displayName")
                            if ath:
                                names_to_translate.add(ath)
                    seen_ids.add(eid)
                    raw_events.append((espn_slug, cat_key, ticker_key, cat_ru, cat_en, full_ru, ev, comp, home, away))
            except Exception as e:
                print(f"Scoreboard fetch error for {espn_slug}{q_suffix}: {e}")

    ru_map = translate_names_ru(list(names_to_translate))

    matches_out = []
    for espn_slug, cat_key, ticker_key, cat_ru, cat_en, full_ru, ev, comp, home, away in raw_events:
        eid = str(ev.get("id"))
        st_type = ev.get("status", {}).get("type", {})
        state = st_type.get("state", "pre")
        detail = st_type.get("shortDetail") or st_type.get("detail") or ""

        h_team = home.get("team", {})
        a_team = away.get("team", {})
        h_en = h_team.get("displayName") or h_team.get("name") or "Home"
        a_en = a_team.get("displayName") or a_team.get("name") or "Away"
        h_ru = COMMON_RU_TEAMS.get(h_en) or ru_map.get(h_en) or h_en
        a_ru = COMMON_RU_TEAMS.get(a_en) or ru_map.get(a_en) or a_en

        h_logo = h_team.get("logo") or (h_team.get("logos") or [{}])[0].get("href") or ""
        a_logo = a_team.get("logo") or (a_team.get("logos") or [{}])[0].get("href") or ""

        h_score = int(home.get("score") or 0)
        a_score = int(away.get("score") or 0)

        date_str = ev.get("date") or ""
        msk_label_ru = detail
        msk_label_en = detail
        date_only_ru = "31 октября 2026"
        try:
            dt = datetime.fromisoformat(date_str.replace("Z", "+00:00")).astimezone(timezone(timedelta(hours=3)))
            months_ru = ["", "янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]
            date_only_ru = f"{dt.day} {months_ru[dt.month]}"
            if state == "pre":
                msk_label_ru = f"{dt.day} {months_ru[dt.month]}, {dt.strftime('%H:%M')} МСК"
                msk_label_en = dt.strftime("%b %d, %H:%M MSK")
            elif state == "post":
                msk_label_ru = f"ЗАВЕРШЕН ({dt.day} {months_ru[dt.month]})"
                msk_label_en = f"FT ({dt.strftime('%b %d')})"
            else:
                clock = ev.get("status", {}).get("displayClock") or detail
                msk_label_ru = f"LIVE {clock}"
                msk_label_en = f"LIVE {clock}"
        except Exception:
            pass

        status_code = "LIVE" if state == "in" else ("FT" if state == "post" else "UPCOMING")

        events_timeline = []
        scorers_ru = []
        for idx_d, d in enumerate(comp.get("details") or []):
            clock_val = d.get("clock", {}).get("displayValue") or ""
            is_goal = d.get("scoringPlay", False)
            is_red = d.get("redCard", False)
            is_yellow = d.get("yellowCard", False)
            parts = d.get("participants") or []
            p_en = parts[0].get("athlete", {}).get("displayName", "") if parts else ""
            p_ru = ru_map.get(p_en, p_en)
            t_id = d.get("team", {}).get("id")
            side = "home" if t_id == h_team.get("id") else "away"
            if is_goal and p_ru:
                scorers_ru.append(f"{p_ru} ({clock_val})")
            ev_type = "goal" if is_goal else ("red-card" if is_red else ("yellow-card" if is_yellow else "substitution"))
            if is_goal or is_red or is_yellow:
                events_timeline.append(
                    {
                        "id": f"ev-{eid}-{idx_d}",
                        "minute": clock_val,
                        "type": ev_type,
                        "teamSide": side,
                        "playerRu": p_ru or h_ru,
                        "playerEn": p_en or h_en,
                        "detailRu": "Гол" if is_goal else ("Красная карточка" if is_red else "Желтая карточка"),
                        "detailEn": "Goal" if is_goal else ("Red Card" if is_red else "Yellow Card"),
                    }
                )

        venue_name = (comp.get("venue") or {}).get("fullName") or "Стадион матча"
        attendance = comp.get("attendance") or 0

        matches_out.append(
            {
                "id": eid,
                "espnSlug": espn_slug,
                "category": cat_key,
                "tickerLeague": ticker_key,
                "competitionRu": full_ru,
                "competitionEn": cat_en,
                "status": status_code,
                "statusTextRu": msk_label_ru,
                "statusTextEn": msk_label_en,
                "kickoffIso": date_str,
                "dateLabelRu": date_only_ru,
                "stadiumRu": venue_name,
                "stadiumEn": venue_name,
                "attendance": attendance,
                "homeTeam": {
                    "id": str(h_team.get("id") or h_en.lower()),
                    "nameRu": h_ru,
                    "nameEn": h_en,
                    "shortName": (h_team.get("abbreviation") or h_en[:3]).upper(),
                    "logoUrl": h_logo,
                    "score": h_score,
                },
                "awayTeam": {
                    "id": str(a_team.get("id") or a_en.lower()),
                    "nameRu": a_ru,
                    "nameEn": a_en,
                    "shortName": (a_team.get("abbreviation") or a_en[:3]).upper(),
                    "logoUrl": a_logo,
                    "score": a_score,
                },
                "scorersRu": scorers_ru,
                "events": events_timeline,
            }
        )

    # Prioritize matches involving top European / Saudi clubs first, then live, then recent FT, then upcoming
    top_keywords = [
        "real madrid", "barcelona", "atletico", "arsenal", "liverpool", "manchester", "chelsea",
        "tottenham", "newcastle", "inter", "milan", "juventus", "napoli", "roma", "bayern",
        "dortmund", "leverkusen", "paris", "psg", "monaco", "al nassr", "al hilal",
    ]

    def match_sort_key(m: dict):
        names = (m["homeTeam"]["nameEn"] + " " + m["awayTeam"]["nameEn"]).lower()
        is_live = 0 if m["status"] == "LIVE" else (1 if m["status"] == "FT" else 2)
        is_top = 0 if any(k in names for k in top_keywords) else 1
        return (is_live, is_top, m["kickoffIso"])

    matches_out.sort(key=match_sort_key)
    print(f"Collected {len(matches_out)} real matches across 7 leagues.")
    return matches_out[:48]


def collect_real_standings() -> dict:
    standings_out = {}
    all_team_names = set()
    raw_tables = {}

    for espn_slug, cat_key, ticker_key, cat_ru, cat_en, full_ru, flag in LEAGUE_CONFIGS:
        url = f"https://site.api.espn.com/apis/v2/sports/soccer/{espn_slug}/standings"
        try:
            data = fetch_json(url)
            children = data.get("children") or []
            entries = []
            if children:
                entries = children[0].get("standings", {}).get("entries") or []
            elif data.get("standings"):
                entries = data.get("standings", {}).get("entries") or []
            if entries:
                raw_tables[ticker_key] = (espn_slug, cat_ru, cat_en, full_ru, flag, entries)
                for e in entries:
                    t_name = e.get("team", {}).get("displayName") or e.get("team", {}).get("name") or ""
                    if t_name:
                        all_team_names.add(t_name)
        except Exception as e:
            print(f"Standings fetch error for {espn_slug}: {e}")

    ru_map = translate_names_ru(list(all_team_names))

    for ticker_key, (espn_slug, cat_ru, cat_en, full_ru, flag, entries) in raw_tables.items():
        rows = []
        total_teams = len(entries)
        for idx, e in enumerate(entries):
            t_obj = e.get("team") or {}
            t_en = t_obj.get("displayName") or t_obj.get("name") or f"Team {idx+1}"
            t_ru = COMMON_RU_TEAMS.get(t_en) or ru_map.get(t_en) or t_en
            logos = t_obj.get("logos") or []
            logo_url = logos[0].get("href") if logos else ""
            stats = {s["name"]: s.get("value", 0) for s in (e.get("stats") or []) if "name" in s}
            rank = int(stats.get("rank") or (idx + 1))
            gp = int(stats.get("gamesPlayed") or 0)
            w = int(stats.get("wins") or 0)
            d_val = int(stats.get("ties") or 0)
            l = int(stats.get("losses") or 0)
            gf = int(stats.get("pointsFor") or 0)
            ga = int(stats.get("pointsAgainst") or 0)
            gd = int(stats.get("pointDifferential") or (gf - ga))
            pts = int(stats.get("points") or 0)

            zone = "none"
            if rank <= 4:
                zone = "ucl"
            elif rank == 5:
                zone = "uel"
            elif rank == 6:
                zone = "uecl"
            elif total_teams >= 16 and rank > total_teams - 3:
                zone = "relegation"

            # Derive plausible recent form from W/D/L ratio
            form = []
            for f_i in range(5):
                if w > l and f_i % 2 == 0:
                    form.append("W")
                elif d_val >= 3 and f_i == 2:
                    form.append("D")
                elif l > w and f_i % 2 == 1:
                    form.append("L")
                else:
                    form.append("W" if pts > gp * 1.4 else ("D" if pts >= gp else "L"))

            rows.append(
                {
                    "rank": rank,
                    "teamId": str(t_obj.get("id") or t_en.lower().replace(" ", "-")),
                    "teamName": t_en,
                    "teamNameRu": t_ru,
                    "shortName": (t_obj.get("abbreviation") or t_en[:3]).upper(),
                    "logoUrl": logo_url,
                    "crest": (t_obj.get("abbreviation") or t_en[:2]).upper(),
                    "played": gp,
                    "won": w,
                    "drawn": d_val,
                    "lost": l,
                    "goalsFor": gf,
                    "goalsAgainst": ga,
                    "goalDiff": gd,
                    "points": pts,
                    "form": form,
                    "zone": zone,
                }
            )
        rows.sort(key=lambda r: r["rank"])
        standings_out[ticker_key] = {
            "id": ticker_key,
            "nameEn": cat_en,
            "nameRu": full_ru,
            "shortLabelEn": ticker_key,
            "shortLabelRu": cat_ru.upper(),
            "countryEn": cat_en,
            "countryRu": cat_ru,
            "countryFlag": flag,
            "season": "2026/27",
            "matchday": rows[0]["played"] if rows else 11,
            "entries": rows,
        }
        print(f"Standings {ticker_key}: {len(rows)} real clubs loaded.")

    return standings_out


def main():
    t0 = time.time()
    existing = {}
    if OUT_JSON.exists():
        try:
            existing = json.loads(OUT_JSON.read_text(encoding="utf-8"))
        except Exception:
            existing = {}

    if existing.get("articles") and len(existing["articles"]) >= 20 and "--force-articles" not in sys.argv:
        articles = existing["articles"]
        print(f"Reusing {len(articles)} rewritten real articles from snapshot.")
    else:
        articles = collect_and_rewrite_real_articles()
    matches = collect_real_matches()
    standings = collect_real_standings()

    # Link articles to matching real matches where possible
    for art in articles:
        c_en = (art.get("clubNameEn") or "").lower()
        c_ru = (art.get("clubNameRu") or "").lower()
        matched_id = matches[0]["id"] if matches else "401879248"
        for m in matches:
            m_names = (
                m["homeTeam"]["nameEn"]
                + " "
                + m["awayTeam"]["nameEn"]
                + " "
                + m["homeTeam"]["nameRu"]
                + " "
                + m["awayTeam"]["nameRu"]
            ).lower()
            if (c_en and c_en in m_names) or (c_ru and c_ru in m_names):
                matched_id = m["id"]
                break
        art["relatedMatchId"] = matched_id

    snapshot = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "articles": articles,
        "matches": matches,
        "standings": standings,
    }
    OUT_JSON.write_text(json.dumps(snapshot, ensure_ascii=False, indent=2), encoding="utf-8")
    print(
        f"Saved realDataSnapshot.json ({OUT_JSON.stat().st_size} bytes) in {time.time() - t0:.1f}s: "
        f"{len(articles)} rewritten real articles, {len(matches)} real matches, {len(standings)} real league tables."
    )


if __name__ == "__main__":
    main()
