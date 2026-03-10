"use client";
import { DataTable } from "@/components/data-table";
import { id } from "@/lib/client";
import { useAppStore } from "@/store/useAppStore";
import { useState } from "react";

export default function PlayersPage() {
  const { players, addPlayer } = useAppStore();
  const [name, setName] = useState("");
  return <div className="space-y-4">
    <h2 className="text-2xl font-bold">Players</h2>
    <div className="bg-card p-3 rounded border border-slate-800 flex gap-2"><input placeholder="Quick add player" value={name} onChange={(e) => setName(e.target.value)} /><button className="bg-cyan-600 px-3 rounded" onClick={() => { if (!name) return; addPlayer({ id: id("P"), fullName: name, active: true, createdAt: new Date().toISOString().slice(0,10) }); setName(""); }}>Add</button></div>
    <DataTable headers={["ID", "Name", "Age", "Category", "Hand", "Strengths", "Weaknesses"]} rows={players.map((p) => [p.id, p.fullName, p.age ?? "-", p.category ?? "-", p.handedness ?? "-", (p.strengths ?? []).join(", "), (p.weaknesses ?? []).join(", ")])} />
  </div>;
}
