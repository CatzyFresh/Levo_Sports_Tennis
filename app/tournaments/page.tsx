"use client";
import { DataTable } from "@/components/data-table";
import { EditModal } from "@/components/edit-modal";
import { id } from "@/lib/client";
import { Tournament } from "@/types/models";
import { useAppStore } from "@/store/useAppStore";
import { useState } from "react";

export default function TournamentsPage() {
  const { tournaments, players, addTournament, updateTournament, deleteTournament } = useAppStore();
  const [editing, setEditing] = useState<Tournament | null>(null);
  return <div className="space-y-4"><h2 className="text-2xl font-bold">Tournaments</h2>
  <button className="bg-cyan-600 px-3 py-1 rounded" onClick={() => addTournament({ id: id("T"), title: "New Event", startDate: new Date().toISOString().slice(0,10), status: "upcoming", linkedPlayerIds: [players[0].id] })}>Quick Add Tournament</button>
  <DataTable headers={["Title", "Start", "Status", "Category", "Players", "Actions"]} rows={tournaments.map((t) => [t.title, t.startDate, t.status, t.category ?? "-", t.linkedPlayerIds.map((pid) => players.find((p) => p.id === pid)?.fullName ?? pid).join(", "), <div key={t.id} className="flex gap-2"><button className="text-cyan-300" onClick={() => setEditing(t)}>Edit</button><button className="text-red-300" onClick={() => deleteTournament(t.id)}>Delete</button></div>])} />
  <EditModal open={!!editing} title="Edit tournament" onClose={() => setEditing(null)}>
    {editing && <div className="grid grid-cols-2 gap-2">
      <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
      <input type="date" value={editing.startDate} onChange={(e) => setEditing({ ...editing, startDate: e.target.value })} />
      <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as any })}><option>upcoming</option><option>completed</option><option>cancelled</option></select>
      <div className="col-span-2 flex justify-end gap-2"><button className="bg-slate-700 px-3 py-1 rounded" onClick={() => setEditing(null)}>Cancel</button><button className="bg-cyan-600 px-3 py-1 rounded" onClick={() => { updateTournament(editing); setEditing(null); }}>Save</button></div>
    </div>}
  </EditModal>
  </div>;
}
