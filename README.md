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
- `lib/importWorkbook.ts`: import utility abstraction for future xlsx parsing
- `lib/derived.ts`: match derivation, win %, rankings, H2H analytics

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
- `data/`: seeded workbook data

## Future migration path to Supabase/Postgres

1. Keep `types/models.ts` unchanged for API contracts.
2. Replace `store/useAppStore.ts` local mutations with server actions or API calls.
3. Keep `lib/derived.ts` pure for reuse on backend.
4. Replace `importWorkbookSeed` with upload + server parser (`xlsx`) and data insertion.
5. Add auth and role-based access for coaches/admin.

## Notes

- Session Log is the primary source of truth.
- Match Data is auto-generated from Session Log entries with opponent + score.
- Settings includes reset demo data, export/import JSON, and regenerate matches.
