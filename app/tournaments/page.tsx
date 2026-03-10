"use client";
import { DataTable } from "@/components/data-table";
import { id } from "@/lib/client";
import { useAppStore } from "@/store/useAppStore";

export default function TournamentsPage() {
  const { tournaments, players, addTournament } = useAppStore();
  return <div className="space-y-4"><h2 className="text-2xl font-bold">Tournaments</h2>
  <button className="bg-cyan-600 px-3 py-1 rounded" onClick={() => addTournament({ id: id("T"), title: "New Event", startDate: new Date().toISOString().slice(0,10), status: "upcoming", linkedPlayerIds: [players[0].id] })}>Quick Add Tournament</button>
  <DataTable headers={["Title", "Start", "Status", "Category", "Players"]} rows={tournaments.map((t) => [t.title, t.startDate, t.status, t.category ?? "-", t.linkedPlayerIds.map((pid) => players.find((p) => p.id === pid)?.fullName ?? pid).join(", ")])} />
  </div>;
}
