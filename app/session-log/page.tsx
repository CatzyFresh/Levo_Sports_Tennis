"use client";
import { DataTable } from "@/components/data-table";
import { EditModal } from "@/components/edit-modal";
import { deriveResult } from "@/lib/derived";
import { id } from "@/lib/client";
import { SessionLogEntry } from "@/types/models";
import { useAppStore } from "@/store/useAppStore";
import { useState } from "react";

export default function SessionLogPage() {
  const { players, sessionLogs, addSession, updateSession, deleteSession } = useAppStore();
  const [playerId, setPlayerId] = useState(players[0]?.id ?? "");
  const [scoreFor, setScoreFor] = useState("");
  const [scoreAgainst, setScoreAgainst] = useState("");
  const [opponentName, setOpponentName] = useState("");
  const [editing, setEditing] = useState<SessionLogEntry | null>(null);
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
  <DataTable headers={["Date", "Player", "Activity", "Drill", "Opponent", "Score", "Result", "Dur", "Actions"]} rows={sessionLogs.map((s) => [s.date, players.find((p) => p.id === s.playerId)?.fullName ?? s.playerId, s.activityType, s.drillName, s.opponentName ?? "-", s.scoreFor != null ? `${s.scoreFor}-${s.scoreAgainst}` : "-", s.result ?? "NA", s.durationMin, <div key={s.id} className="flex gap-2"><button className="text-cyan-300" onClick={() => setEditing(s)}>Edit</button><button className="text-red-300" onClick={() => deleteSession(s.id)}>Delete</button></div>])} />

  <EditModal open={!!editing} title="Edit session log" onClose={() => setEditing(null)}>
    {editing && <div className="grid grid-cols-2 gap-2">
      <input type="date" value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} />
      <select value={editing.playerId} onChange={(e) => setEditing({ ...editing, playerId: e.target.value })}>{players.map((p) => <option key={p.id} value={p.id}>{p.fullName}</option>)}</select>
      <input value={editing.drillName} onChange={(e) => setEditing({ ...editing, drillName: e.target.value })} />
      <input value={editing.opponentName ?? ""} onChange={(e) => setEditing({ ...editing, opponentName: e.target.value || undefined })} placeholder="Opponent" />
      <input type="number" value={editing.scoreFor ?? ""} onChange={(e) => { const sf = e.target.value ? Number(e.target.value) : undefined; setEditing({ ...editing, scoreFor: sf, result: deriveResult(sf, editing.scoreAgainst) }); }} placeholder="Score for" />
      <input type="number" value={editing.scoreAgainst ?? ""} onChange={(e) => { const sa = e.target.value ? Number(e.target.value) : undefined; setEditing({ ...editing, scoreAgainst: sa, result: deriveResult(editing.scoreFor, sa) }); }} placeholder="Score against" />
      <div className="col-span-2 flex justify-end gap-2"><button className="bg-slate-700 px-3 py-1 rounded" onClick={() => setEditing(null)}>Cancel</button><button className="bg-cyan-600 px-3 py-1 rounded" onClick={() => { updateSession(editing); setEditing(null); }}>Save</button></div>
    </div>}
  </EditModal>
  </div>;
}
