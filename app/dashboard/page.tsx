"use client";
import { StatCard } from "@/components/stat-card";
import { useAppStore } from "@/store/useAppStore";
import { rankings } from "@/lib/derived";
import { DataTable } from "@/components/data-table";
import { ChartCard } from "@/components/chart-card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function DashboardPage() {
  const { players, attendance, sessionLogs, matches, tournaments, goals } = useAppStore();
  const today = "2026-09-05";
  const activePlayers = players.filter((p) => p.active).length;
  const attendanceToday = attendance.filter((a) => a.date === today && a.present).length;
  const sessionsThisWeek = sessionLogs.filter((s) => s.date >= "2026-09-01").length;
  const rank = rankings(players, matches, sessionLogs).slice(0, 5);
  const dueGoals = goals.filter((g) => g.targetDate && g.status !== "achieved").slice(0, 5);
  const trend = ["2026-09-03", "2026-09-04", "2026-09-05"].map((d) => ({ date: d.slice(5), attendance: attendance.filter((a) => a.date === d && a.present).length }));
  return <div className="space-y-4">
    <h2 className="text-2xl font-bold">Dashboard</h2>
    <div className="grid md:grid-cols-4 gap-3">
      <StatCard title="Total Active Players" value={activePlayers} />
      <StatCard title="Attendance Today" value={attendanceToday} />
      <StatCard title="Sessions This Week" value={sessionsThisWeek} />
      <StatCard title="Matches Logged" value={matches.length} />
    </div>
    <div className="grid lg:grid-cols-2 gap-4">
      <ChartCard title="Attendance Trend"><ResponsiveContainer width="100%" height="100%"><LineChart data={trend}><XAxis dataKey="date"/><YAxis/><Tooltip/><Line type="monotone" dataKey="attendance" stroke="#22d3ee"/></LineChart></ResponsiveContainer></ChartCard>
      <div className="bg-card border border-slate-800 rounded-lg p-4">
        <h3 className="font-semibold mb-3">Top 5 Rankings</h3>
        <DataTable headers={["Rank", "Player", "Score", "Win %"]} rows={rank.map((r) => [r.rank, r.fullName, r.rankingScore.toFixed(1), r.winPct.toFixed(1)])} />
      </div>
    </div>
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="bg-card border border-slate-800 rounded-lg p-4"><h3 className="font-semibold mb-2">Upcoming tournaments</h3>{tournaments.filter((t) => t.status === "upcoming").map((t) => <p key={t.id} className="text-sm text-slate-300">{t.title} ({t.startDate})</p>)}</div>
      <div className="bg-card border border-slate-800 rounded-lg p-4"><h3 className="font-semibold mb-2">Goals nearing deadline</h3>{dueGoals.map((g) => <p key={g.id} className="text-sm text-slate-300">{g.title} - {g.targetDate}</p>)}</div>
    </div>
  </div>;
}
