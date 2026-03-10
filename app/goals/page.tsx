"use client";
import { DataTable } from "@/components/data-table";
import { id } from "@/lib/client";
import { useAppStore } from "@/store/useAppStore";

export default function GoalsPage() {
  const { goals, players, addGoal } = useAppStore();
  return <div className="space-y-4"><h2 className="text-2xl font-bold">Goals</h2>
  <button className="bg-cyan-600 px-3 py-1 rounded" onClick={() => addGoal({ id: id("G"), title: "New tactical goal", category: "tactical", status: "not started", progressPercent: 0 })}>Add Goal</button>
  <DataTable headers={["Title", "Player", "Category", "Status", "Progress", "Due"]} rows={goals.map((g) => [g.title, g.playerId ? (players.find((p) => p.id === g.playerId)?.fullName ?? g.playerId) : "Academy", g.category, g.status, `${g.progressPercent}%`, g.targetDate ?? "-"])} />
  </div>;
}
