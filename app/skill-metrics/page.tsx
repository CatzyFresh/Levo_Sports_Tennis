"use client";
import { DataTable } from "@/components/data-table";
import { EditModal } from "@/components/edit-modal";
import { id } from "@/lib/client";
import { SkillMetricEntry } from "@/types/models";
import { useAppStore } from "@/store/useAppStore";
import { useState } from "react";

export default function SkillMetricsPage() {
  const { players, skillMetrics, addMetric, updateMetric, deleteMetric } = useAppStore();
  const [editing, setEditing] = useState<SkillMetricEntry | null>(null);
  return <div className="space-y-4"><h2 className="text-2xl font-bold">Skill Metrics</h2>
  <button className="bg-cyan-600 px-3 py-1 rounded" onClick={() => addMetric({ id: id("SM"), date: new Date().toISOString().slice(0,10), playerId: players[0].id, metricType: "rally consistency", metricValue: 80, unit: "%", context: "quick add" })}>Quick add sample metric</button>
  <DataTable headers={["Date", "Player", "Metric", "Value", "Context", "Actions"]} rows={skillMetrics.map((m) => [m.date, players.find((p) => p.id === m.playerId)?.fullName ?? m.playerId, m.metricType, `${m.metricValue}${m.unit}`, m.context ?? "-", <div key={m.id} className="flex gap-2"><button className="text-cyan-300" onClick={() => setEditing(m)}>Edit</button><button className="text-red-300" onClick={() => deleteMetric(m.id)}>Delete</button></div>])} />
  <EditModal open={!!editing} title="Edit skill metric" onClose={() => setEditing(null)}>
    {editing && <div className="grid grid-cols-2 gap-2">
      <input type="date" value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} />
      <select value={editing.playerId} onChange={(e) => setEditing({ ...editing, playerId: e.target.value })}>{players.map((p) => <option key={p.id} value={p.id}>{p.fullName}</option>)}</select>
      <input value={editing.metricType} onChange={(e) => setEditing({ ...editing, metricType: e.target.value })} />
      <input type="number" value={editing.metricValue} onChange={(e) => setEditing({ ...editing, metricValue: Number(e.target.value) })} />
      <div className="col-span-2 flex justify-end gap-2"><button className="bg-slate-700 px-3 py-1 rounded" onClick={() => setEditing(null)}>Cancel</button><button className="bg-cyan-600 px-3 py-1 rounded" onClick={() => { updateMetric(editing); setEditing(null); }}>Save</button></div>
    </div>}
  </EditModal>
  </div>;
}
