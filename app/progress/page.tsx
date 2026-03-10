"use client";
import { ChartCard } from "@/components/chart-card";
import { useAppStore } from "@/store/useAppStore";
import { useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart } from "recharts";

export default function ProgressPage() {
  const { players, attendance, sessionLogs } = useAppStore();
  const [pid, setPid] = useState(players[0]?.id ?? "");
  const logs = sessionLogs.filter((l) => l.playerId === pid);
  const attendanceTrend = attendance.filter((a) => a.playerId === pid).map((a) => ({ date: a.date.slice(5), present: a.present ? 1 : 0 }));
  const consistencyTrend = logs.filter((l) => l.rallyConsistency != null).map((l) => ({ date: l.date.slice(5), value: l.rallyConsistency }));
  const accuracyTrend = logs.filter((l) => l.targetAccuracy != null).map((l) => ({ date: l.date.slice(5), value: l.targetAccuracy }));
  const volume = logs.reduce<Record<string, number>>((acc, l) => { acc[l.date] = (acc[l.date] ?? 0) + 1; return acc; }, {});
  return <div className="space-y-4"><h2 className="text-2xl font-bold">Progress</h2><select value={pid} onChange={(e) => setPid(e.target.value)}>{players.map((p) => <option key={p.id} value={p.id}>{p.fullName}</option>)}</select>
  <div className="grid lg:grid-cols-2 gap-4">
    <ChartCard title="Attendance trend"><ResponsiveContainer width="100%" height="100%"><LineChart data={attendanceTrend}><XAxis dataKey="date"/><YAxis/><Tooltip/><Line dataKey="present" stroke="#34d399"/></LineChart></ResponsiveContainer></ChartCard>
    <ChartCard title="Rally consistency"><ResponsiveContainer width="100%" height="100%"><LineChart data={consistencyTrend}><XAxis dataKey="date"/><YAxis/><Tooltip/><Line dataKey="value" stroke="#22d3ee"/></LineChart></ResponsiveContainer></ChartCard>
    <ChartCard title="Target accuracy"><ResponsiveContainer width="100%" height="100%"><LineChart data={accuracyTrend}><XAxis dataKey="date"/><YAxis/><Tooltip/><Line dataKey="value" stroke="#a78bfa"/></LineChart></ResponsiveContainer></ChartCard>
    <ChartCard title="Activity volume"><ResponsiveContainer width="100%" height="100%"><BarChart data={Object.entries(volume).map(([date, count]) => ({ date: date.slice(5), count }))}><XAxis dataKey="date"/><YAxis/><Tooltip/><Bar dataKey="count" fill="#f59e0b"/></BarChart></ResponsiveContainer></ChartCard>
  </div></div>;
}
