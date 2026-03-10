"use client";
import { importWorkbookSeed } from "@/lib/importWorkbook";
import { deriveMatchesFromSessionLogs } from "@/lib/derived";
import { AppData, AttendanceEntry, Goal, MatchRecord, Player, SessionLogEntry, SkillMetricEntry, Tournament } from "@/types/models";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AppState = AppData & {
  addPlayer: (player: Player) => void;
  updatePlayer: (player: Player) => void;
  deletePlayer: (id: string) => void;

  addAttendance: (row: AttendanceEntry) => void;
  updateAttendance: (row: AttendanceEntry) => void;
  deleteAttendance: (id: string) => void;

  addSession: (row: SessionLogEntry) => void;
  updateSession: (row: SessionLogEntry) => void;
  deleteSession: (id: string) => void;

  addMetric: (row: SkillMetricEntry) => void;
  updateMetric: (row: SkillMetricEntry) => void;
  deleteMetric: (id: string) => void;

  addMatch: (row: MatchRecord) => void;
  updateMatch: (row: MatchRecord) => void;
  deleteMatch: (id: string) => void;

  addTournament: (row: Tournament) => void;
  updateTournament: (row: Tournament) => void;
  deleteTournament: (id: string) => void;

  addGoal: (row: Goal) => void;
  updateGoal: (row: Goal) => void;
  deleteGoal: (id: string) => void;

  regenerateMatches: () => void;
  clearAllData: () => void;
  resetDemoData: () => void;
  exportJson: () => string;
  importJson: (value: string) => void;
  importAppData: (data: AppData) => void;
};

const seed = importWorkbookSeed();

function dedupeMatches(matches: MatchRecord[]) {
  const map = new Map<string, MatchRecord>();
  matches.forEach((m) => {
    const key = `${m.date}|${m.playerId}|${m.opponentName.toLowerCase()}|${m.scoreFor}|${m.scoreAgainst}`;
    if (!map.has(key)) map.set(key, m);
  });
  return [...map.values()];
}

function computeMatches(sessionLogs: SessionLogEntry[], existingMatches: MatchRecord[]) {
  const derived = deriveMatchesFromSessionLogs(sessionLogs);
  const manual = existingMatches.filter((m) => !m.sourceSessionLogId);
  return dedupeMatches([...derived, ...manual]);
}

seed.matches = computeMatches(seed.sessionLogs, seed.matches);

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...seed,
      addPlayer: (player) => set((s) => ({ players: [player, ...s.players] })),
      updatePlayer: (player) => set((s) => ({ players: s.players.map((p) => (p.id === player.id ? player : p)) })),
      deletePlayer: (id) => set((s) => ({ players: s.players.filter((p) => p.id !== id) })),

      addAttendance: (row) => set((s) => ({ attendance: [row, ...s.attendance] })),
      updateAttendance: (row) => set((s) => ({ attendance: s.attendance.map((a) => (a.id === row.id ? row : a)) })),
      deleteAttendance: (id) => set((s) => ({ attendance: s.attendance.filter((a) => a.id !== id) })),

      addSession: (row) => set((s) => {
        const sessionLogs = [row, ...s.sessionLogs];
        return { sessionLogs, matches: computeMatches(sessionLogs, s.matches) };
      }),
      updateSession: (row) => set((s) => {
        const sessionLogs = s.sessionLogs.map((x) => (x.id === row.id ? row : x));
        return { sessionLogs, matches: computeMatches(sessionLogs, s.matches) };
      }),
      deleteSession: (id) => set((s) => {
        const sessionLogs = s.sessionLogs.filter((x) => x.id !== id);
        return { sessionLogs, matches: computeMatches(sessionLogs, s.matches) };
      }),

      addMetric: (row) => set((s) => ({ skillMetrics: [row, ...s.skillMetrics] })),
      updateMetric: (row) => set((s) => ({ skillMetrics: s.skillMetrics.map((m) => (m.id === row.id ? row : m)) })),
      deleteMetric: (id) => set((s) => ({ skillMetrics: s.skillMetrics.filter((m) => m.id !== id) })),

      addMatch: (row) => set((s) => ({ matches: dedupeMatches([row, ...s.matches]) })),
      updateMatch: (row) => set((s) => ({ matches: s.matches.map((m) => (m.id === row.id ? row : m)) })),
      deleteMatch: (id) => set((s) => ({ matches: s.matches.filter((m) => m.id !== id) })),

      addTournament: (row) => set((s) => ({ tournaments: [row, ...s.tournaments] })),
      updateTournament: (row) => set((s) => ({ tournaments: s.tournaments.map((t) => (t.id === row.id ? row : t)) })),
      deleteTournament: (id) => set((s) => ({ tournaments: s.tournaments.filter((t) => t.id !== id) })),

      addGoal: (row) => set((s) => ({ goals: [row, ...s.goals] })),
      updateGoal: (row) => set((s) => ({ goals: s.goals.map((g) => (g.id === row.id ? row : g)) })),
      deleteGoal: (id) => set((s) => ({ goals: s.goals.filter((g) => g.id !== id) })),

      regenerateMatches: () => set((s) => ({ matches: computeMatches(s.sessionLogs, s.matches) })),
      clearAllData: () => set(() => ({ players: [], attendance: [], sessionLogs: [], skillMetrics: [], matches: [], tournaments: [], goals: [] })),
      resetDemoData: () => set(() => ({ ...seed })),
      exportJson: () => JSON.stringify({
        players: get().players,
        attendance: get().attendance,
        sessionLogs: get().sessionLogs,
        skillMetrics: get().skillMetrics,
        matches: get().matches,
        tournaments: get().tournaments,
        goals: get().goals,
      }, null, 2),
      importJson: (value) => {
        const parsed = JSON.parse(value) as AppData;
        set(() => ({ ...parsed, matches: computeMatches(parsed.sessionLogs, parsed.matches ?? []) }));
      },
      importAppData: (data) => set(() => ({ ...data, matches: computeMatches(data.sessionLogs, data.matches ?? []) }))
    }),
    {
      name: "levo-tennis-store",
      partialize: (s) => ({
        players: s.players,
        attendance: s.attendance,
        sessionLogs: s.sessionLogs,
        skillMetrics: s.skillMetrics,
        matches: s.matches,
        tournaments: s.tournaments,
        goals: s.goals
      })
    }
  )
);
