"use client";
import { importWorkbookSeed } from "@/lib/importWorkbook";
import { deriveMatchesFromSessionLogs } from "@/lib/derived";
import { AppData, AttendanceEntry, Goal, Player, SessionLogEntry, SkillMetricEntry, Tournament } from "@/types/models";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AppState = AppData & {
  addPlayer: (player: Player) => void;
  addAttendance: (row: AttendanceEntry) => void;
  addSession: (row: SessionLogEntry) => void;
  addMetric: (row: SkillMetricEntry) => void;
  addTournament: (row: Tournament) => void;
  addGoal: (row: Goal) => void;
  regenerateMatches: () => void;
  resetDemoData: () => void;
  exportJson: () => string;
  importJson: (value: string) => void;
};

const seed = importWorkbookSeed();
seed.matches = deriveMatchesFromSessionLogs(seed.sessionLogs);

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...seed,
      addPlayer: (player) => set((s) => ({ players: [player, ...s.players] })),
      addAttendance: (row) => set((s) => ({ attendance: [row, ...s.attendance] })),
      addSession: (row) =>
        set((s) => {
          const sessionLogs = [row, ...s.sessionLogs];
          return { sessionLogs, matches: deriveMatchesFromSessionLogs(sessionLogs) };
        }),
      addMetric: (row) => set((s) => ({ skillMetrics: [row, ...s.skillMetrics] })),
      addTournament: (row) => set((s) => ({ tournaments: [row, ...s.tournaments] })),
      addGoal: (row) => set((s) => ({ goals: [row, ...s.goals] })),
      regenerateMatches: () => set((s) => ({ matches: deriveMatchesFromSessionLogs(s.sessionLogs) })),
      resetDemoData: () => set(() => ({ ...seed })),
      exportJson: () => JSON.stringify(get(), null, 2),
      importJson: (value) => {
        const parsed = JSON.parse(value) as AppData;
        set(() => ({ ...parsed, matches: deriveMatchesFromSessionLogs(parsed.sessionLogs) }));
      }
    }),
    { name: "levo-tennis-store", partialize: (s) => ({
      players: s.players, attendance: s.attendance, sessionLogs: s.sessionLogs, skillMetrics: s.skillMetrics, matches: s.matches, tournaments: s.tournaments, goals: s.goals
    }) }
  )
);
