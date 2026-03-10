"use client";
import { DataTable } from "@/components/data-table";
import { id } from "@/lib/client";
import { useAppStore } from "@/store/useAppStore";
import { useState } from "react";

export default function AttendancePage() {
  const { players, attendance, addAttendance } = useAppStore();
  const [playerId, setPlayerId] = useState(players[0]?.id ?? "");
  const [date, setDate] = useState("2026-09-05");
  const [sessionType, setSessionType] = useState("morning");
  return <div className="space-y-4"><h2 className="text-2xl font-bold">Attendance</h2>
  <div className="bg-card p-3 rounded border border-slate-800 flex flex-wrap gap-2 items-center">
    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
    <select value={sessionType} onChange={(e) => setSessionType(e.target.value)}><option>morning</option><option>evening</option><option>fitness</option><option>match</option><option>other</option></select>
    <select value={playerId} onChange={(e) => setPlayerId(e.target.value)}>{players.map((p) => <option key={p.id} value={p.id}>{p.fullName}</option>)}</select>
    <button className="bg-cyan-600 px-3 py-1 rounded" onClick={() => addAttendance({ id: id("AT"), date, sessionType: sessionType as any, playerId, present: true })}>Mark Present</button>
  </div>
  <DataTable headers={["Date", "Session", "Player", "Present"]} rows={attendance.map((a) => [a.date, a.sessionType, players.find((p) => p.id === a.playerId)?.fullName ?? a.playerId, a.present ? "Yes" : "No"])} />
  </div>;
}
