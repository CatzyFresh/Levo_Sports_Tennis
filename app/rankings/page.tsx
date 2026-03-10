"use client";
import { DataTable } from "@/components/data-table";
import { rankings } from "@/lib/derived";
import { useAppStore } from "@/store/useAppStore";

export default function RankingsPage() {
  const { players, matches, sessionLogs } = useAppStore();
  const rows = rankings(players, matches, sessionLogs);
  return <div className="space-y-4"><h2 className="text-2xl font-bold">Academy Rankings</h2>
  <p className="text-sm text-slate-400">Formula: 60% win % + 25% recent form + 15% activity volume.</p>
  <DataTable headers={["Rank", "Player", "Win %", "Recent Form", "Activity", "Total Matches", "Score"]} rows={rows.map((r) => [r.rank, r.fullName, r.winPct.toFixed(1), r.recentForm.toFixed(1), r.activityScore.toFixed(1), r.total, r.rankingScore.toFixed(1)])} />
  </div>;
}
