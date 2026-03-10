"use client";
import { mapWorkbookToAppData, ImportPreview } from "@/lib/import/mapWorkbookToAppData";
import { parseWorkbook } from "@/lib/import/parseWorkbook";
import { validateImportedData } from "@/lib/import/validateImport";
import { useAppStore } from "@/store/useAppStore";
import { useState } from "react";

export default function SettingsPage() {
  const { clearAllData, resetDemoData, exportJson, importJson, regenerateMatches, importAppData } = useAppStore();
  const [json, setJson] = useState("");
  const [preview, setPreview] = useState<ImportPreview | null>(null);
  const [importWarnings, setImportWarnings] = useState<string[]>([]);

  const onExcelPick = async (file?: File) => {
    if (!file) return;
    const workbook = await parseWorkbook(file);
    const p = mapWorkbookToAppData(workbook);
    setImportWarnings([...p.warnings, ...validateImportedData(p.mapped)]);
    setPreview(p);
  };

  return <div className="space-y-4"><h2 className="text-2xl font-bold">Settings / Data Tools</h2>
    <div className="flex flex-wrap gap-2">
      <button className="bg-red-700 px-3 py-1 rounded" onClick={() => { if (confirm("Clear ALL data? This cannot be undone.")) clearAllData(); }}>Clear All Data</button>
      <button className="bg-slate-700 px-3 py-1 rounded" onClick={() => { if (confirm("Reset to demo data?")) resetDemoData(); }}>Reset to Demo Data</button>
      <button className="bg-cyan-600 px-3 py-1 rounded" onClick={regenerateMatches}>Regenerate derived match data</button>
      <button className="bg-slate-700 px-3 py-1 rounded" onClick={() => setJson(exportJson())}>Export JSON Backup</button>
      <button className="bg-cyan-600 px-3 py-1 rounded" onClick={() => importJson(json)}>Import JSON Backup</button>
    </div>

    <div className="bg-card p-3 rounded border border-slate-800 space-y-2">
      <h3 className="font-semibold">Import Excel (.xlsx)</h3>
      <input type="file" accept=".xlsx" onChange={(e) => onExcelPick(e.target.files?.[0])} />
      {preview && <div className="text-sm space-y-2">
        <p className="text-slate-300">Detected sheets: {Object.entries(preview.detectedSheets).filter(([, v]) => v).map(([k, v]) => `${k} → ${v}`).join(" | ")}</p>
        <p>Rows: {Object.entries(preview.sheetRowCounts).map(([n, c]) => `${n}: ${c}`).join(" | ")}</p>
        <p>Will import: {preview.mapped.players.length} players, {preview.mapped.sessionLogs.length} sessions, {preview.mapped.skillMetrics.length} metrics, {preview.mapped.matches.length} matches, {preview.mapped.tournaments.length} tournaments, {preview.mapped.goals.length} goals.</p>
        {importWarnings.length > 0 && <ul className="list-disc ml-5 text-amber-300">{importWarnings.map((w, i) => <li key={i}>{w}</li>)}</ul>}
        <div className="flex gap-2"><button className="bg-cyan-600 px-3 py-1 rounded" onClick={() => { importAppData(preview.mapped); setPreview(null); }}>Confirm Import</button><button className="bg-slate-700 px-3 py-1 rounded" onClick={() => setPreview(null)}>Cancel Import</button></div>
      </div>}
    </div>

    <textarea className="w-full min-h-80" value={json} onChange={(e) => setJson(e.target.value)} placeholder="paste app-model JSON" />
  </div>;
}
