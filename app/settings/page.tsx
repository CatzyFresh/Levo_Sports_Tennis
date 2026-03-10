"use client";
import { useAppStore } from "@/store/useAppStore";
import { useState } from "react";

export default function SettingsPage() {
  const { resetDemoData, exportJson, importJson, regenerateMatches } = useAppStore();
  const [json, setJson] = useState("");
  return <div className="space-y-4"><h2 className="text-2xl font-bold">Settings / Data Tools</h2>
    <div className="bg-slate-900/60 border border-slate-800 rounded p-3 text-sm text-slate-300">
      <p className="font-semibold text-white mb-1">Workbook upload (2-day data) workflow</p>
      <ol className="list-decimal ml-5 space-y-1">
        <li>Run <code>npm run import:workbook -- ./your-file.xlsx</code> locally.</li>
        <li>Map <code>data/workbook-import.json</code> via <code>mapWorkbookJsonToAppData</code> to app JSON.</li>
        <li>Paste the app JSON below and click <strong>Import JSON</strong>.</li>
      </ol>
    </div>
    <div className="flex flex-wrap gap-2">
      <button className="bg-slate-700 px-3 py-1 rounded" onClick={resetDemoData}>Reset demo data</button>
      <button className="bg-cyan-600 px-3 py-1 rounded" onClick={regenerateMatches}>Regenerate derived match data</button>
      <button className="bg-slate-700 px-3 py-1 rounded" onClick={() => setJson(exportJson())}>Export JSON</button>
      <button className="bg-cyan-600 px-3 py-1 rounded" onClick={() => importJson(json)}>Import JSON</button>
    </div>
    <textarea className="w-full min-h-80" value={json} onChange={(e) => setJson(e.target.value)} placeholder="paste app-model JSON" />
  </div>;
}
