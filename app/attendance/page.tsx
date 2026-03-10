"use client";
import { DataTable } from "@/components/data-table";
import { EditModal } from "@/components/edit-modal";
import { id } from "@/lib/client";
import { AttendanceEntry } from "@/types/models";
import { useAppStore } from "@/store/useAppStore";
import { useState } from "react";

export default function AttendancePage() {
  const { players, attendance, addAttendance, updateAttendance, deleteAttendance } = useAppStore();
  const [playerId, setPlayerId] = useState(players[0]?.id ?? "");
  const [date, setDate] = useState("2026-09-05");
  const [sessionType, setSessionType] = useState("morning");
  const [editing, setEditing] = useState<AttendanceEntry | null>(null);
  return <div className="space-y-4"><h2 className="text-2xl font-bold">Attendance</h2>
  <div className="bg-card p-3 rounded border border-slate-800 flex flex-wrap gap-2 items-center">
    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
    <select value={sessionType} onChange={(e) => setSessionType(e.target.value)}><option>morning</option><option>evening</option><option>fitness</option><option>match</option><option>other</option></select>
    <select value={playerId} onChange={(e) => setPlayerId(e.target.value)}>{players.map((p) => <option key={p.id} value={p.id}>{p.fullName}</option>)}</select>
    <button className="bg-cyan-600 px-3 py-1 rounded" onClick={() => addAttendance({ id: id("AT"), date, sessionType: sessionType as any, playerId, present: true })}>Mark Present</button>
  </div>
  <DataTable headers={["Date", "Session", "Player", "Present", "Actions"]} rows={attendance.map((a) => [a.date, a.sessionType, players.find((p) => p.id === a.playerId)?.fullName ?? a.playerId, a.present ? "Yes" : "No", <div key={a.id} className="flex gap-2"><button className="text-cyan-300" onClick={() => setEditing(a)}>Edit</button><button className="text-red-300" onClick={() => deleteAttendance(a.id)}>Delete</button></div>])} />
  <EditModal open={!!editing} title="Edit attendance" onClose={() => setEditing(null)}>
    {editing && <div className="grid gap-2">
      <input type="date" value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} />
      <select value={editing.sessionType} onChange={(e) => setEditing({ ...editing, sessionType: e.target.value as any })}><option>morning</option><option>evening</option><option>fitness</option><option>match</option><option>other</option></select>
      <select value={editing.playerId} onChange={(e) => setEditing({ ...editing, playerId: e.target.value })}>{players.map((p) => <option key={p.id} value={p.id}>{p.fullName}</option>)}</select>
      <label className="text-sm"><input type="checkbox" checked={editing.present} onChange={(e) => setEditing({ ...editing, present: e.target.checked })} /> Present</label>
      <div className="flex justify-end gap-2"><button className="bg-slate-700 px-3 py-1 rounded" onClick={() => setEditing(null)}>Cancel</button><button className="bg-cyan-600 px-3 py-1 rounded" onClick={() => { updateAttendance(editing); setEditing(null); }}>Save</button></div>
    </div>}
  </EditModal>
  </div>;
}
