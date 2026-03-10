import { AppData } from "@/types/models";

export function validateImportedData(data: AppData): string[] {
  const warnings: string[] = [];
  if (data.players.some((p) => !p.fullName)) warnings.push("Some players are missing names.");
  if (data.sessionLogs.some((s) => !s.playerId || !s.date)) warnings.push("Some session logs are missing player/date and were filtered.");
  return warnings;
}
