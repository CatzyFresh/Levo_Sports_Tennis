import { ReactNode } from "react";

export function DataTable({ headers, rows }: { headers: string[]; rows: Array<Array<ReactNode>> }) {
  return (
    <div className="overflow-auto rounded-lg border border-slate-800">
      <table className="w-full text-sm">
        <thead className="bg-slate-900"><tr>{headers.map((h) => <th key={h} className="text-left p-2">{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i} className="border-t border-slate-800">{r.map((c, j) => <td key={j} className="p-2">{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
