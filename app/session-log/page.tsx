"use client";
import { DataTable } from "@/components/data-table";
import { deriveResult } from "@/lib/derived";
import { id } from "@/lib/client";
import { useAppStore } from "@/store/useAppStore";
import { useState } from "react";

export default function SessionLogPage() {
  const { players, sessionLogs, addSession } = useAppStore();
  const [playerId, setPlayerId] = useState(players[0]?.id ?? "");
  const [scoreFor, setScoreFor] = useState("");
  const [scoreAgainst, setScoreAgainst] = useState("");
  const [opponentName, setOpponentName] = useState("");
  return <div className="space-y-4"><h2 className="text-2xl font-bold">Session Log (source of truth)</h2>
  <div className="bg-card p-3 rounded border border-slate-800 grid md:grid-cols-7 gap-2">
    <input type="date" defaultValue="2026-09-05" id="date" />
    <select id="stype"><option>morning</option><option>evening</option><option>fitness</option><option>match</option><option>other</option></select>
    <select value={playerId} onChange={(e) => setPlayerId(e.target.value)}>{players.map((p) => <option key={p.id} value={p.id}>{p.fullName}</option>)}</select>
    <select id="atype"><option>rally</option><option>volley</option><option>serve</option><option>return</option><option>target practice</option><option>points</option><option>set</option><option>super tiebreak</option><option>match play</option><option>fitness</option><option>other</option></select>
    <input placeholder="Drill" id="drill" />
    <input placeholder="Opponent" value={opponentName} onChange={(e) => setOpponentName(e.target.value)} />
    <div className="flex gap-2"><input className="w-16" placeholder="For" value={scoreFor} onChange={(e) => setScoreFor(e.target.value)} /><input className="w-16" placeholder="Ag" value={scoreAgainst} onChange={(e) => setScoreAgainst(e.target.value)} /></div>
    <button className="bg-cyan-600 px-3 py-1 rounded" onClick={() => {
      const sf = scoreFor ? Number(scoreFor) : undefined; const sa = scoreAgainst ? Number(scoreAgainst) : undefined;
      addSession({ id: id("SL"), date: (document.getElementById("date") as HTMLInputElement).value, sessionType: (document.getElementById("stype") as HTMLSelectElement).value as any, playerId,
        activityType: (document.getElementById("atype") as HTMLSelectElement).value as any, drillName: (document.getElementById("drill") as HTMLInputElement).value || "Custom Drill", description: "Quick logged", durationMin: 20,
        opponentName: opponentName || undefined, scoreFor: sf, scoreAgainst: sa, result: deriveResult(sf, sa), format: "Practice" });
      setScoreFor(""); setScoreAgainst(""); setOpponentName("");
    }}>Quick Add</button>
  </div>
  <DataTable headers={["Date", "Player", "Activity", "Drill", "Opponent", "Score", "Result", "Dur(min)"]} rows={sessionLogs.map((s) => [s.date, players.find((p) => p.id === s.playerId)?.fullName ?? s.playerId, s.activityType, s.drillName, s.opponentName ?? "-", s.scoreFor != null ? `${s.scoreFor}-${s.scoreAgainst}` : "-", s.result ?? "NA", s.durationMin])} />
  </div>;
}
