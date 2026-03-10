# Levo Sports Tennis MVP

Production-ready MVP coaching web app built with Next.js 14 App Router + TypeScript + Tailwind + Zustand + Recharts.

## Setup

```bash
npm install
npm run dev
npm run build
```

Deploy directly to Vercel (no extra setup).

## Workbook mapping and seed strategy

The provided workbook screenshots were used as source-of-truth for initial schema labels and records:
- **Player Profile** sheet fields mapped into `Player`
- **Session Log** sheet rows mapped into `SessionLogEntry` (primary source of truth)
- Derived sheets (**Match Data**, **Performance Dashboard**) are represented via analytics in code
- Additional entities (Attendance, Skill Metrics, Tournaments, Goals) were seeded in the same structure so the app is immediately usable

Files:
- `types/models.ts`: app domain model
- `data/seed.ts`: workbook-derived seed dataset
- `lib/importWorkbook.ts`: import utility abstraction for startup seed loading
- `lib/workbookMapper.ts`: workbook-json to app-data mapper for real imports
- `lib/derived.ts`: match derivation, win %, rankings, H2H analytics

---

## How to upload your 2-day sheet into the app

Use this workflow whenever you have a new workbook with 1+ days of coaching data.

### 1) Put your Excel workbook in the project root
Example:
- `tennis_player_training_tracker_final.xlsx`

### 2) Convert workbook sheets to normalized JSON
Run:

```bash
npm run import:workbook -- ./tennis_player_training_tracker_final.xlsx
```

This generates:
- `data/workbook-import.json`

### 3) Map that workbook JSON to app model JSON
Create a small one-time Node/TS runner that imports `mapWorkbookJsonToAppData` from `lib/workbookMapper.ts` and writes an output file (for example `data/app-import.json`).

Expected source sheet names (or close matches):
- `Player Profile`
- `Session Log`
- `Skill Metrics`
- `Attendance` (optional)
- `Tournaments` (optional)
- `Goals` (optional)

### 4) Start the app

```bash
npm run dev
```

### 5) Open Settings / Data Tools in the app
- Click **Import JSON** area
- Paste the contents of your generated app-model JSON
- Click **Import JSON** button

The app will automatically:
- store imported rows,
- regenerate derived `Match Data` from `Session Log`,
- update rankings, win %, H2H, and dashboard.

### 6) Validate your 2-day data
Check pages in this order:
1. Session Log (all rows visible)
2. Match Data (auto-derived rows)
3. Rankings
4. Dashboard stats
5. Progress charts

> Tip: if you need to re-run import, use **Reset demo data** first, then import again.

---

## Ranking formula (MVP)

Implemented in `lib/derived.ts`:
- 60% win percentage
- 25% recent form (last 5 matches)
- 15% activity volume (session count normalized)

Shown in Rankings UI for transparency.

## Architecture

- `app/`: page routes (dashboard, players, attendance, session log, skill metrics, match data, rankings, head-to-head, progress, tournaments, goals, settings)
- `components/`: reusable UI blocks (app shell, cards, table)
- `store/`: Zustand store + localStorage persistence
- `lib/`: utility logic and derivations
- `types/`: TypeScript types
- `data/`: seeded workbook data + generated workbook import files
- `scripts/`: CLI helpers for workbook import

## Future migration path to Supabase/Postgres

1. Keep `types/models.ts` unchanged for API contracts.
2. Replace `store/useAppStore.ts` local mutations with server actions or API calls.
3. Keep `lib/derived.ts` pure for reuse on backend.
4. Replace local import pipeline with upload API + parser worker.
5. Add auth and role-based access for coaches/admin.

## Notes

- Session Log is the primary source of truth.
- Match Data is auto-generated from Session Log entries with opponent + score.
- Settings includes reset demo data, export/import JSON, and regenerate matches.
