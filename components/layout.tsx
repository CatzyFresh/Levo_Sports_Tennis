"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  ["/dashboard", "Dashboard"], ["/players", "Players"], ["/attendance", "Attendance"], ["/session-log", "Session Log"],
  ["/skill-metrics", "Skill Metrics"], ["/match-data", "Match Data"], ["/rankings", "Rankings"], ["/head-to-head", "Head-to-Head"],
  ["/progress", "Progress"], ["/tournaments", "Tournaments"], ["/goals", "Goals"], ["/settings", "Settings / Data Tools"]
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const p = usePathname();
  return (
    <div className="min-h-screen md:flex">
      <aside className="md:w-64 border-r border-slate-800 p-3 sticky top-0 h-screen overflow-auto">
        <h1 className="text-xl font-semibold mb-4">Levo Sports Tennis</h1>
        <nav className="space-y-1">
          {nav.map(([href, label]) => (
            <Link key={href} href={href} className={cn("block rounded px-2 py-2 text-sm", p === href ? "bg-cyan-600 text-white" : "hover:bg-slate-800 text-slate-200")}>{label}</Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-4 md:p-6">{children}</main>
    </div>
  );
}
