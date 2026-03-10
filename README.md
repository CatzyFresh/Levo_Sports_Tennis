# Levo Sports Tennis MVP

Upgraded coaching/admin app with editable records, safe data tools, and in-website Excel import.

## Run locally

```bash
npm install
npm run dev
npm run build
```

## What was upgraded

### 1) Edit existing entries (all core entities)
You can now edit and delete existing rows from these pages:
- Players
- Attendance
- Session Log
- Skill Metrics
- Match Data
- Tournaments
- Goals

Each row has **Edit** + **Delete** actions. Edit opens a modal form and persists to localStorage.

### 2) Data tools (safe destructive actions)
In **Settings / Data Tools**:
- **Clear All Data** (with confirmation)
- **Reset to Demo Data** (with confirmation)
- **Export JSON Backup**
- **Import JSON Backup**
- **Regenerate derived match data**

### 3) Direct Excel upload inside website
In **Settings / Data Tools**:
1. Choose `.xlsx` file
2. App parses workbook client-side using SheetJS (`xlsx`)
3. App detects sheet names robustly (best-fit matching)
4. App maps workbook rows to internal entities
5. Import preview is shown (detected sheets, row counts, entity counts, warnings)
6. Click **Confirm Import** to save
7. Analytics/derived data recompute automatically

## Import pipeline modules
- `lib/import/parseWorkbook.ts` → reads file to workbook
- `lib/import/detectSheets.ts` → robust sheet detection
- `lib/import/mapWorkbookToAppData.ts` → maps workbook to app data + preview
- `lib/import/validateImport.ts` → import warnings
- `lib/workbookMapper.ts` → detailed row/column mapping to app entities

## Workbook mapping assumptions
### Player Profile
Maps player id/name/age/category/hand/style/strengths/weaknesses/notes.

### Session Log (primary source of truth)
Maps date, session, player, activity/drill, duration, opponent, score, result, consistency/accuracy, notes.
If session rows reference players not in player profile, missing players are auto-created.

### Skill Metrics
Maps player/date/type/value/unit/context/notes.

### Match Data
Imported manual matches are preserved, while derived matches are still generated from Session Log.
Duplicate match rows are deduplicated by date/player/opponent/score key.

### Performance Dashboard
Used only as reference (not source-of-truth). App recomputes insights from source entities.

## Derived analytics behavior
- Session Log edits/add/delete automatically trigger match regeneration
- Win %, rankings, head-to-head, progress charts, and dashboard recompute from store state
- Rankings formula remains: **60% win% + 25% recent form + 15% activity**

## Deployment
Deploy directly to Vercel (Next.js defaults, no extra setup).
