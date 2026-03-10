export function StatCard({ title, value, hint }: { title: string; value: string | number; hint?: string }) {
  return <div className="bg-card rounded-lg border border-slate-800 p-4"><p className="text-sm text-slate-400">{title}</p><p className="text-2xl font-bold">{value}</p>{hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}</div>;
}
