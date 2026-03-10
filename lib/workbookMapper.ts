import { AppData, SessionLogEntry, SkillMetricEntry } from "@/types/models";
import { deriveMatchesFromSessionLogs, deriveResult } from "@/lib/derived";

type SheetRows = Record<string, string | number | boolean | null | undefined>[];

type WorkbookJson = {
  playerProfile?: SheetRows;
  sessionLog?: SheetRows;
  skillMetrics?: SheetRows;
  attendance?: SheetRows;
  tournaments?: SheetRows;
  goals?: SheetRows;
};

const normalize = (value: unknown) => String(value ?? "").trim();
const lower = (value: unknown) => normalize(value).toLowerCase();

const toNumber = (value: unknown): number | undefined => {
  if (value === null || value === undefined || value === "") return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
};

const toDate = (value: unknown) => {
  const raw = normalize(value);
  if (!raw) return "";
  // Supports dd-mm-yyyy and yyyy-mm-dd strings for coach workbook exports.
  const ddmmyyyy = raw.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (ddmmyyyy) return `${ddmmyyyy[3]}-${ddmmyyyy[2]}-${ddmmyyyy[1]}`;
  return raw;
};

export function mapWorkbookJsonToAppData(input: WorkbookJson): AppData {
  const players = (input.playerProfile ?? []).map((row, idx) => ({
    id: normalize(row["Player ID"] ?? row["id"] ?? `P-${String(idx + 1).padStart(3, "0")}`),
    fullName: normalize(row["Player Name"] ?? row["fullName"]),
    age: toNumber(row["Age"]),
    category: normalize(row["Level"] ?? row["Category"]) || undefined,
    handedness: normalize(row["Dominant Hand"] ?? row["Handedness"]) || undefined,
    playingStyle: normalize(row["Playing Style"]) || undefined,
    strengths: normalize(row["Strengths"])?.split(",").map((x) => x.trim()).filter(Boolean),
    weaknesses: normalize(row["Improvement Areas"] ?? row["Weaknesses"])?.split(",").map((x) => x.trim()).filter(Boolean),
    notes: normalize(row["Notes"]) || undefined,
    active: lower(row["Active"] ?? "yes") !== "no",
    createdAt: new Date().toISOString().slice(0, 10)
  }));

  const playerByName = new Map(players.map((p) => [p.fullName.toLowerCase(), p.id]));

  const sessionLogs: SessionLogEntry[] = (input.sessionLog ?? []).map((row, idx) => {
    const sf = toNumber(row["Score For"] ?? row["scoreFor"]);
    const sa = toNumber(row["Score Against"] ?? row["scoreAgainst"]);
    const activity = lower(row["Activity Category"] ?? row["activityType"] ?? "other") as SessionLogEntry["activityType"];
    const playerName = normalize(row["Player Name"] ?? row["playerName"]);
    return {
      id: normalize(row["Activity ID"] ?? row["id"] ?? `SL-${idx + 1}`),
      date: toDate(row["Date"]),
      sessionType: (lower(row["Session"] ?? row["sessionType"] ?? "other") as SessionLogEntry["sessionType"]) || "other",
      playerId: playerByName.get(playerName.toLowerCase()) ?? normalize(row["Player ID"]) ?? "",
      activityType: activity,
      drillName: normalize(row["Drill / Activity"] ?? row["drillName"] ?? "Session Item"),
      description: normalize(row["Description"] ?? row["Coach"] ?? "Imported from workbook"),
      durationMin: toNumber(row["Final Duration (min)"] ?? row["Manual Duration (min)"] ?? row["durationMin"]) ?? 0,
      opponentName: normalize(row["Partner / Opponent"] ?? row["opponentName"]) || undefined,
      scoreFor: sf,
      scoreAgainst: sa,
      result: (lower(row["result"]) as SessionLogEntry["result"]) || deriveResult(sf, sa),
      format: normalize(row["Format"] ?? row["Session Type"]) || undefined,
      rallyConsistency: toNumber(row["Rally Consistency"]),
      targetAccuracy: toNumber(row["Target Accuracy"]),
      coachNotes: normalize(row["Coach Notes"]) || undefined
    };
  }).filter((row) => row.playerId && row.date);

  const attendance = (input.attendance ?? []).map((row, idx) => ({
    id: normalize(row["id"] ?? `AT-${idx + 1}`),
    date: toDate(row["Date"]),
    sessionType: lower(row["Session"] ?? row["sessionType"] ?? "other") as AppData["attendance"][number]["sessionType"],
    playerId: playerByName.get(normalize(row["Player Name"]).toLowerCase()) ?? normalize(row["Player ID"]),
    present: lower(row["Present"] ?? "yes") !== "no",
    remarks: normalize(row["Remarks"]) || undefined
  })).filter((a) => a.playerId && a.date);

  const skillMetrics: SkillMetricEntry[] = (input.skillMetrics ?? []).map((row, idx) => ({
    id: normalize(row["id"] ?? `SM-${idx + 1}`),
    date: toDate(row["Date"]),
    playerId: playerByName.get(normalize(row["Player Name"]).toLowerCase()) ?? normalize(row["Player ID"]),
    metricType: normalize(row["Metric Type"] ?? row["metricType"] ?? "custom metric"),
    metricValue: toNumber(row["Metric Value"] ?? row["metricValue"]) ?? 0,
    unit: normalize(row["Unit"] ?? "%") || "%",
    context: normalize(row["Context"]) || undefined,
    notes: normalize(row["Notes"]) || undefined
  })).filter((m) => m.playerId && m.date);

  const tournaments = (input.tournaments ?? []).map((row, idx) => ({
    id: normalize(row["id"] ?? `T-${idx + 1}`),
    title: normalize(row["Title"]),
    location: normalize(row["Location"]) || undefined,
    startDate: toDate(row["Start Date"]),
    endDate: toDate(row["End Date"]) || undefined,
    category: normalize(row["Category"]) || undefined,
    surface: normalize(row["Surface"]) || undefined,
    status: (lower(row["Status"] ?? "upcoming") as AppData["tournaments"][number]["status"]),
    linkedPlayerIds: normalize(row["Linked Players"])
      .split(",")
      .map((name) => playerByName.get(name.trim().toLowerCase()) ?? "")
      .filter(Boolean),
    notes: normalize(row["Notes"]) || undefined
  })).filter((t) => t.title && t.startDate);

  const goals = (input.goals ?? []).map((row, idx) => ({
    id: normalize(row["id"] ?? `G-${idx + 1}`),
    playerId: playerByName.get(normalize(row["Player Name"]).toLowerCase()) || undefined,
    title: normalize(row["Title"]),
    description: normalize(row["Description"]) || undefined,
    category: (lower(row["Category"] ?? "other") as AppData["goals"][number]["category"]),
    targetDate: toDate(row["Target Date"]) || undefined,
    status: (lower(row["Status"] ?? "not started") as AppData["goals"][number]["status"]),
    progressPercent: toNumber(row["Progress %"] ?? row["progressPercent"]) ?? 0,
    notes: normalize(row["Notes"]) || undefined
  })).filter((g) => g.title);

  const matches = deriveMatchesFromSessionLogs(sessionLogs);

  return { players, attendance, sessionLogs, skillMetrics, matches, tournaments, goals };
}
