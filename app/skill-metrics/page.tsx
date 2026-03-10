"use client";
import { DataTable } from "@/components/data-table";
import { id } from "@/lib/client";
import { useAppStore } from "@/store/useAppStore";

export default function SkillMetricsPage() {
  const { players, skillMetrics, addMetric } = useAppStore();
  return <div className="space-y-4"><h2 className="text-2xl font-bold">Skill Metrics</h2>
  <button className="bg-cyan-600 px-3 py-1 rounded" onClick={() => addMetric({ id: id("SM"), date: new Date().toISOString().slice(0,10), playerId: players[0].id, metricType: "rally consistency", metricValue: 80, unit: "%", context: "quick add" })}>Quick add sample metric</button>
  <DataTable headers={["Date", "Player", "Metric", "Value", "Context"]} rows={skillMetrics.map((m) => [m.date, players.find((p) => p.id === m.playerId)?.fullName ?? m.playerId, m.metricType, `${m.metricValue}${m.unit}`, m.context ?? "-"])} />
  </div>;
}
