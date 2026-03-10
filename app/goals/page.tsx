"use client";
import { DataTable } from "@/components/data-table";
import { EditModal } from "@/components/edit-modal";
import { id } from "@/lib/client";
import { Goal } from "@/types/models";
import { useAppStore } from "@/store/useAppStore";
import { useState } from "react";

export default function GoalsPage() {
  const { goals, players, addGoal, updateGoal, deleteGoal } = useAppStore();
  const [editing, setEditing] = useState<Goal | null>(null);
  return <div className="space-y-4"><h2 className="text-2xl font-bold">Goals</h2>
  <button className="bg-cyan-600 px-3 py-1 rounded" onClick={() => addGoal({ id: id("G"), title: "New tactical goal", category: "tactical", status: "not started", progressPercent: 0 })}>Add Goal</button>
  <DataTable headers={["Title", "Player", "Category", "Status", "Progress", "Due", "Actions"]} rows={goals.map((g) => [g.title, g.playerId ? (players.find((p) => p.id === g.playerId)?.fullName ?? g.playerId) : "Academy", g.category, g.status, `${g.progressPercent}%`, g.targetDate ?? "-", <div key={g.id} className="flex gap-2"><button className="text-cyan-300" onClick={() => setEditing(g)}>Edit</button><button className="text-red-300" onClick={() => deleteGoal(g.id)}>Delete</button></div>])} />
  <EditModal open={!!editing} title="Edit goal" onClose={() => setEditing(null)}>
    {editing && <div className="grid grid-cols-2 gap-2">
      <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
      <input type="number" value={editing.progressPercent} onChange={(e) => setEditing({ ...editing, progressPercent: Number(e.target.value) })} />
      <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as any })}><option>not started</option><option>in progress</option><option>achieved</option><option>paused</option></select>
      <input type="date" value={editing.targetDate ?? ""} onChange={(e) => setEditing({ ...editing, targetDate: e.target.value || undefined })} />
      <div className="col-span-2 flex justify-end gap-2"><button className="bg-slate-700 px-3 py-1 rounded" onClick={() => setEditing(null)}>Cancel</button><button className="bg-cyan-600 px-3 py-1 rounded" onClick={() => { updateGoal(editing); setEditing(null); }}>Save</button></div>
    </div>}
  </EditModal>
  </div>;
}
