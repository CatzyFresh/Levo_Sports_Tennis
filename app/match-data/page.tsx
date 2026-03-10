"use client";
import { DataTable } from "@/components/data-table";
import { useAppStore } from "@/store/useAppStore";

export default function MatchDataPage() {
  const { players, matches, regenerateMatches } = useAppStore();
  return <div className="space-y-4"><h2 className="text-2xl font-bold">Match Data (derived)</h2>
  <button className="bg-cyan-600 px-3 py-1 rounded" onClick={regenerateMatches}>Regenerate from Session Log</button>
  <DataTable headers={["Date", "Player", "Opponent", "Format", "Score", "Result", "Source"]} rows={matches.map((m) => [m.date, players.find((p) => p.id === m.playerId)?.fullName ?? m.playerId, m.opponentName, m.format, `${m.scoreFor}-${m.scoreAgainst}`, m.result, m.sourceSessionLogId ? "derived from session log" : "manual"])} />
  </div>;
}
