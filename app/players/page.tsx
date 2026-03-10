"use client";
import { DataTable } from "@/components/data-table";
import { EditModal } from "@/components/edit-modal";
import { id } from "@/lib/client";
import { Player } from "@/types/models";
import { useAppStore } from "@/store/useAppStore";
import { useState } from "react";

export default function PlayersPage() {
  const { players, addPlayer, updatePlayer, deletePlayer } = useAppStore();
  const [name, setName] = useState("");
  const [editing, setEditing] = useState<Player | null>(null);

  return <div className="space-y-4">
    <h2 className="text-2xl font-bold">Players</h2>
    <div className="bg-card p-3 rounded border border-slate-800 flex gap-2"><input placeholder="Quick add player" value={name} onChange={(e) => setName(e.target.value)} /><button className="bg-cyan-600 px-3 rounded" onClick={() => { if (!name) return; addPlayer({ id: id("P"), fullName: name, active: true, createdAt: new Date().toISOString().slice(0,10) }); setName(""); }}>Add</button></div>
    <DataTable headers={["ID", "Name", "Age", "Category", "Hand", "Actions"]} rows={players.map((p) => [p.id, p.fullName, p.age ?? "-", p.category ?? "-", p.handedness ?? "-", <div key={p.id} className="flex gap-2"><button className="text-cyan-300" onClick={() => setEditing(p)}>Edit</button><button className="text-red-300" onClick={() => deletePlayer(p.id)}>Delete</button></div>])} />

    <EditModal open={!!editing} title="Edit player" onClose={() => setEditing(null)}>
      {editing && <div className="grid grid-cols-2 gap-2">
        <input value={editing.fullName} onChange={(e) => setEditing({ ...editing, fullName: e.target.value })} placeholder="Full name" />
        <input type="number" value={editing.age ?? ""} onChange={(e) => setEditing({ ...editing, age: e.target.value ? Number(e.target.value) : undefined })} placeholder="Age" />
        <input value={editing.category ?? ""} onChange={(e) => setEditing({ ...editing, category: e.target.value || undefined })} placeholder="Category" />
        <input value={editing.handedness ?? ""} onChange={(e) => setEditing({ ...editing, handedness: e.target.value || undefined })} placeholder="Handedness" />
        <div className="col-span-2 flex justify-end gap-2"><button className="bg-slate-700 px-3 py-1 rounded" onClick={() => setEditing(null)}>Cancel</button><button className="bg-cyan-600 px-3 py-1 rounded" onClick={() => { updatePlayer(editing); setEditing(null); }}>Save</button></div>
      </div>}
    </EditModal>
  </div>;
}
