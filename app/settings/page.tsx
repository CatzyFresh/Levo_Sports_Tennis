"use client";
import { useAppStore } from "@/store/useAppStore";
import { useState } from "react";

export default function SettingsPage() {
  const { resetDemoData, exportJson, importJson, regenerateMatches } = useAppStore();
  const [json, setJson] = useState("");
  return <div className="space-y-4"><h2 className="text-2xl font-bold">Settings / Data Tools</h2>
    <div className="flex flex-wrap gap-2">
      <button className="bg-slate-700 px-3 py-1 rounded" onClick={resetDemoData}>Reset demo data</button>
      <button className="bg-cyan-600 px-3 py-1 rounded" onClick={regenerateMatches}>Regenerate derived match data</button>
      <button className="bg-slate-700 px-3 py-1 rounded" onClick={() => setJson(exportJson())}>Export JSON</button>
      <button className="bg-cyan-600 px-3 py-1 rounded" onClick={() => importJson(json)}>Import JSON</button>
    </div>
    <textarea className="w-full min-h-80" value={json} onChange={(e) => setJson(e.target.value)} placeholder="paste exported JSON" />
  </div>;
}
