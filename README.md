
# Rekaz Work Manager (PWA)

Single-user, offline-first PWA for Oman Oil (WO) and NAMA (WNSC). **No seed/demo data**. All forms start blank. Charts and exports gracefully handle empty DB.

## Tech
- Next.js 14 + TypeScript
- next-pwa (Workbox) for offline
- IndexedDB (Dexie) for storage
- Recharts for charts
- No server, deploy on Vercel

## Install
```bash
npm i
npm run dev
```

## Deploy (Vercel)
- Push this repository to GitHub
- Import into Vercel
- Build command: `npm run build`
- No custom server; `vercel.json` sets cache headers

## A2HS (iOS)
- Open in Safari (online first visit) → Share → Add to Home Screen.

## Notes
- No sample records, no seed files, no auto dates.
- CSV export returns header row only when DB is empty.
- PDF export returns a minimal page with "No data" when DB is empty.
