# ⚽ Golason Media — Bilingual Football Newsroom, Transfer Radar & Tactical Match Center

**Golason Media** (`golason-media`) is a high-performance bilingual (**English / Russian**) football editorial platform, Transfer Reliability Radar, interactive tactical pitch analyzer, and live match center built with **Next.js 15**, **React 19**, and **TypeScript 5.7** (running on port **`:3001`**).

---

## ✨ Core Features & Modules

### 1. 📡 Transfer Reliability Radar (`src/components/news/TransferRadarBadge.tsx`)
Every transfer story and insider report is graded with a visual reliability progress bar and verified source badge:
- **Tier 1: 100% Official 🔥** — Club communiqués, league registrations, and official federation releases.
- **Tier 2: 90% Verified Insider 🟢** — Tier-1 transfer journalists (Fabrizio Romano, David Ornstein, Relevo, The Athletic).
- **Tier 3: 50% Hot Rumor 🟡** — Early scouting reports and regional tabloid speculation.

### 2. 📰 Editorial Spotlight & Bilingual News Grid (`src/components/news/`)
- **`NewsHeroCard.tsx`**: Lead breaking story card styled with a Midnight Navy (`#0A1128`) & Fiery Orange (`#FF5722`) gradient overlay, category pill, reading-time estimator, integrated Transfer Radar badge, expandable reader drawer, and direct Telegram video highlight CTA (`@futbolnaya_jara`).
- **`NewsArticleGrid.tsx`**: Filterable bilingual (`en` / `ru`) news and transfer feed with category filters (`Transfers`, `Insiders`, `Tactical Lab`, `Breaking`), Transfer Tier filters (`Tier 1–3`), instant search, full-article modal & inline reader, and 1-click social share hooks for **Reddit**, **Pinterest**, **Telegram**, and **Threads**.

### 3. 🗳️ 1-Click Interactive Fan Reaction Polls (`src/components/polls/FanReactionPoll.tsx`)
- Zero-friction, no-login fan reaction polls featuring:
  - *"Who wins El Clasico?"*
  - *"Was the VAR red card fair?"*
  - *"Ballon d'Or favorite?"*
- Persists votes in browser `localStorage` and renders live animated percentage bars with instant vote recalculation.

### 4. 🏟️ Live Match Ticker, Tactical Pitch & Standings
- **Live Match Ticker & League Standings**: Real-time scoreboard strip and multi-league tables (LaLiga, Premier League, UEFA Champions League).
- **2D SVG Tactical Pitch**: Interactive formation visualizer, player ratings, and substitution timeline.

---

## 🖥️ Multi-Project VPS Architecture & Port Map

Golason Media runs alongside co-hosted production applications behind an **Nginx** reverse proxy on a shared Linux VPS. Each service is strictly isolated by port:

| Project / Service | Port / Binding | Domain / Channel | Description |
| :--- | :--- | :--- | :--- |
| **Golason Media** | `127.0.0.1:3001` (`:3001`) | `golason.media` | Next.js 15 bilingual football newsroom, Transfer Radar & tactical match center |
| **RealGTA** | `127.0.0.1:3002` (`:3002`) | `realgta.com` | Co-hosted web platform proxied via Nginx upstream `:3002` |
| **Dawr.me** | `127.0.0.1:3003` (`:3003`) | `dawr.me` | Co-hosted directory & commerce web service proxied via Nginx upstream `:3003` |
| **Futbolnaya Jara Daemon** | Background `systemd` unit | `@futbolnaya_jara` | Automated Telegram live football alerts & video highlight bot daemon |

See [`docs/SERVER_ARCHITECTURE.md`](./docs/SERVER_ARCHITECTURE.md) for the complete Nginx reverse-proxy configuration, upstream definitions, and `systemd` unit files.

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- **Node.js 22+**
- **npm 10+**

### Installation & Commands

```bash
# Install dependencies
npm install

# Start development server on http://localhost:3001
npm run dev

# Run strict TypeScript check
npm run typecheck

# Build production bundle
npm run build

# Start production server on http://localhost:3001
npm run start
```

---

## ⚙️ Continuous Integration (`.github/workflows/ci.yml`)

GitHub Actions automatically validates every `push` and `pull_request` targeting `main`:
1. Provisions **Node.js 22** on `ubuntu-latest`.
2. Installs project dependencies (`npm install`).
3. Executes strict TypeScript verification (`npm run typecheck`).
4. Compiles the Next.js 15 production bundle (`npm run build`).
