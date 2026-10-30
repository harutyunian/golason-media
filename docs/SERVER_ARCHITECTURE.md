# Multi-Project VPS & Server Architecture (`SERVER_ARCHITECTURE.md`)

This document specifies the production server topology, port allocation map, Nginx reverse-proxy routing, and process supervision for **Golason Media** alongside co-hosted services on the shared Linux production VPS.

---

## 1. Multi-Project VPS Port Map & Service Matrix

To guarantee zero port collisions and deterministic process isolation across all production workloads on the host, each web application and background daemon is bound to a dedicated loopback port or systemd unit:

| Service / Project | Runtime / Stack | Internal Bind Address | Public Domain / Endpoint | Process Manager | Primary Role |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Golason Media** | Next.js 15 / React 19 / Node 22 | `127.0.0.1:3001` (`:3001`) | `golason.media` | `systemd` / `pm2` | Bilingual (`EN`/`RU`) football newsroom, Transfer Reliability Radar, live match center & 1-click fan polls |
| **RealGTA** | Node.js / Web App | `127.0.0.1:3002` (`:3002`) | `realgta.com` | `systemd` / `pm2` | Interactive gaming & community portal |
| **Dawr.me** | Node.js / Web App | `127.0.0.1:3003` (`:3003`) | `dawr.me` | `systemd` / `pm2` | Regional commerce & directory platform |
| **Futbolnaya Jara Daemon** | Python 3 / Telegram Bot API | Background Worker (No TCP port) | `@futbolnaya_jara` | `systemd` (`futbolnaya-jara.service`) | Automated live football alerts, video highlight publisher & Telegram editorial bridge |

---

## 2. System Topology Diagram

```text
                        +---------------------------------------+
                        |       Public Internet (HTTPS/443)     |
                        +-------------------+-------------------+
                                            |
                                            v
                        +---------------------------------------+
                        |     Nginx Reverse Proxy (Port 80/443) |
                        |   TLS 1.3 Termination + Gzip/Brotli   |
                        +-----+-------------+-------------+-----+
                              |             |             |
        golason.media         |             | realgta.com | dawr.me
              +---------------+             |             +---------------+
              |                             |                             |
              v                             v                             v
+---------------------------+ +---------------------------+ +---------------------------+
|   Golason Media (:3001)   | |      RealGTA (:3002)      | |      Dawr.me (:3003)      |
|  Next.js 15 App Router    | |   Node.js Web Service     | |   Node.js Web Service     |
|  127.0.0.1:3001           | |   127.0.0.1:3002          | |   127.0.0.1:3003          |
+-------------+-------------+ +---------------------------+ +---------------------------+
              |
              | Deep Links & Highlight CTAs
              v
+---------------------------+
|  Futbolnaya Jara Daemon   |
|  (@futbolnaya_jara Bot)   |
|  systemd Background Unit  |
+---------------------------+
```

---

## 3. Nginx Reverse-Proxy Configuration

All external HTTP (`:80`) and HTTPS (`:443`) traffic is terminated by Nginx and proxied over loopback (`127.0.0.1`) to each isolated upstream port.

### `/etc/nginx/sites-available/multi-project-vps.conf`

```nginx
# Upstream definitions for co-hosted Node.js applications
upstream golason_media_upstream {
    server 127.0.0.1:3001;
    keepalive 64;
}

upstream realgta_upstream {
    server 127.0.0.1:3002;
    keepalive 32;
}

upstream dawr_me_upstream {
    server 127.0.0.1:3003;
    keepalive 32;
}

# 1. Golason Media (:3001)
server {
    listen 80;
    listen [::]:80;
    server_name golason.media www.golason.media;

    location / {
        proxy_pass http://golason_media_upstream;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /_next/static/ {
        proxy_pass http://golason_media_upstream;
        expires 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}

# 2. RealGTA (:3002)
server {
    listen 80;
    listen [::]:80;
    server_name realgta.com www.realgta.com;

    location / {
        proxy_pass http://realgta_upstream;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# 3. Dawr.me (:3003)
server {
    listen 80;
    listen [::]:80;
    server_name dawr.me www.dawr.me;

    location / {
        proxy_pass http://dawr_me_upstream;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 4. Process Supervision (`systemd`)

### Golason Media Service (`/etc/systemd/system/golason-media.service`)

```ini
[Unit]
Description=Golason Media Next.js 15 Production Server (:3001)
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/golason-media
Environment=NODE_ENV=production
Environment=PORT=3001
ExecStart=/usr/bin/npm run start
Restart=always
RestartSec=5
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

### Futbolnaya Jara Daemon (`/etc/systemd/system/futbolnaya-jara.service`)

The **Futbolnaya Jara daemon** operates as a persistent background worker without binding an HTTP port, streaming live match events and video highlights to `@futbolnaya_jara`, which Golason Media links to directly from `NewsHeroCard` and `NewsArticleGrid`.

```ini
[Unit]
Description=Futbolnaya Jara Telegram Live Match & Video Highlight Daemon
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=root
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

---

## 5. CI/CD Pipeline & Verification Checklist

Every pull request and push to `main` is validated by `.github/workflows/ci.yml`:
1. **Node.js 22 Environment**: Matches production runtime (`@types/node ^22.0.0`).
2. **Strict TypeScript Verification**: `npm run typecheck` (`tsc --noEmit`) ensures zero type regressions across bilingual news, Transfer Radar, tactical pitch, and poll components.
3. **Production Build Verification**: `npm run build` (`next build`) compiles static and dynamic routes before deployment to `:3001`.
