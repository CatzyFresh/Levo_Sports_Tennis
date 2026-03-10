export function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="bg-card rounded-lg border border-slate-800 p-4"><h3 className="font-semibold mb-3">{title}</h3><div className="h-64">{children}</div></div>;
}
