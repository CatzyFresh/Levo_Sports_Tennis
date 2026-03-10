"use client";
import { DataTable } from "@/components/data-table";
import { headToHead } from "@/lib/derived";
import { useAppStore } from "@/store/useAppStore";
import { useState } from "react";

export default function HeadToHeadPage() {
  const { players, matches } = useAppStore();
  const [a, setA] = useState(players[0]?.id ?? "");
  const [b, setB] = useState(players[1]?.fullName ?? "");
  const h2h = headToHead(a, b, matches);
  return <div className="space-y-4"><h2 className="text-2xl font-bold">Head-to-Head</h2>
  <div className="flex gap-2"><select value={a} onChange={(e) => setA(e.target.value)}>{players.map((p) => <option key={p.id} value={p.id}>{p.fullName}</option>)}</select><select value={b} onChange={(e) => setB(e.target.value)}>{players.map((p) => <option key={p.id}>{p.fullName}</option>)}</select></div>
  <p>Total meetings: {h2h.total} | A wins: {h2h.aWins} | B wins: {h2h.bWins} | Last result: {h2h.lastResult}</p>
  <DataTable headers={["Date", "Player", "Opponent", "Score", "Result"]} rows={h2h.history.map((m) => [m.date, players.find((p) => p.id === m.playerId)?.fullName ?? m.playerId, m.opponentName, `${m.scoreFor}-${m.scoreAgainst}`, m.result])} />
  </div>;
}
