"use client";
import { DataTable } from "@/components/data-table";
import { EditModal } from "@/components/edit-modal";
import { MatchRecord } from "@/types/models";
import { useAppStore } from "@/store/useAppStore";
import { useState } from "react";

export default function MatchDataPage() {
  const { players, matches, regenerateMatches, updateMatch, deleteMatch } = useAppStore();
  const [editing, setEditing] = useState<MatchRecord | null>(null);
  return <div className="space-y-4"><h2 className="text-2xl font-bold">Match Data (derived + manual)</h2>
  <button className="bg-cyan-600 px-3 py-1 rounded" onClick={regenerateMatches}>Regenerate from Session Log</button>
  <DataTable headers={["Date", "Player", "Opponent", "Format", "Score", "Result", "Source", "Actions"]} rows={matches.map((m) => [m.date, players.find((p) => p.id === m.playerId)?.fullName ?? m.playerId, m.opponentName, m.format, `${m.scoreFor}-${m.scoreAgainst}`, m.result, m.sourceSessionLogId ? "derived" : "manual/imported", <div key={m.id} className="flex gap-2"><button className="text-cyan-300" onClick={() => setEditing(m)}>Edit</button><button className="text-red-300" onClick={() => deleteMatch(m.id)}>Delete</button></div>])} />
  <EditModal open={!!editing} title="Edit match" onClose={() => setEditing(null)}>
    {editing && <div className="grid grid-cols-2 gap-2">
      <input type="date" value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} />
      <input value={editing.opponentName} onChange={(e) => setEditing({ ...editing, opponentName: e.target.value })} />
      <input type="number" value={editing.scoreFor} onChange={(e) => setEditing({ ...editing, scoreFor: Number(e.target.value) })} />
      <input type="number" value={editing.scoreAgainst} onChange={(e) => setEditing({ ...editing, scoreAgainst: Number(e.target.value) })} />
      <select value={editing.result} onChange={(e) => setEditing({ ...editing, result: e.target.value as any })}><option>win</option><option>loss</option><option>draw</option></select>
      <div className="col-span-2 flex justify-end gap-2"><button className="bg-slate-700 px-3 py-1 rounded" onClick={() => setEditing(null)}>Cancel</button><button className="bg-cyan-600 px-3 py-1 rounded" onClick={() => { updateMatch(editing); setEditing(null); }}>Save</button></div>
    </div>}
  </EditModal>
  </div>;
}
