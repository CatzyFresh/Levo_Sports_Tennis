import * as XLSX from "xlsx";
import { detectWorkbookSheets } from "@/lib/import/detectSheets";
import { mapWorkbookJsonToAppData } from "@/lib/workbookMapper";
import { AppData } from "@/types/models";

export type ImportPreview = {
  detectedSheets: ReturnType<typeof detectWorkbookSheets>;
  sheetRowCounts: Record<string, number>;
  warnings: string[];
  mapped: AppData;
};

export function mapWorkbookToAppData(workbook: XLSX.WorkBook): ImportPreview {
  const detectedSheets = detectWorkbookSheets(workbook.SheetNames);
  const read = (name?: string) => (name ? XLSX.utils.sheet_to_json(workbook.Sheets[name], { defval: "" }) : []);

  const payload = {
    playerProfile: read(detectedSheets.playerProfile),
    sessionLog: read(detectedSheets.sessionLog),
    skillMetrics: read(detectedSheets.skillMetrics),
    attendance: read(detectedSheets.attendance),
    tournaments: read(detectedSheets.tournaments),
    goals: read(detectedSheets.goals)
  };

  const mapped = mapWorkbookJsonToAppData(payload);

  const sheetRowCounts: Record<string, number> = {};
  workbook.SheetNames.forEach((n) => {
    sheetRowCounts[n] = XLSX.utils.sheet_to_json(workbook.Sheets[n], { defval: "" }).length;
  });

  const warnings: string[] = [];
  if (!detectedSheets.playerProfile) warnings.push("Player Profile sheet not detected. Players may be auto-created from Session Log names only.");
  if (!detectedSheets.sessionLog) warnings.push("Session Log sheet not detected. Derived matches and analytics may be limited.");
  if (mapped.players.length === 0) warnings.push("No players mapped from workbook.");

  return { detectedSheets, sheetRowCounts, warnings, mapped };
}
