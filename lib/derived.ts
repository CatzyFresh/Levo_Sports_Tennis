import { MatchRecord, Player, SessionLogEntry } from "@/types/models";

export function deriveResult(scoreFor?: number, scoreAgainst?: number): "win" | "loss" | "draw" | "NA" {
  if (scoreFor == null || scoreAgainst == null) return "NA";
  if (scoreFor > scoreAgainst) return "win";
  if (scoreFor < scoreAgainst) return "loss";
  return "draw";
}

export function deriveMatchesFromSessionLogs(logs: SessionLogEntry[]): MatchRecord[] {
  return logs
    .filter((l) => l.opponentName && l.scoreFor != null && l.scoreAgainst != null)
    .map((l) => ({
      id: `M-${l.id}`,
      date: l.date,
      playerId: l.playerId,
      opponentName: l.opponentName!,
      format: l.format ?? l.activityType,
      scoreFor: l.scoreFor!,
      scoreAgainst: l.scoreAgainst!,
      result: l.result && l.result !== "NA" ? l.result : deriveResult(l.scoreFor, l.scoreAgainst),
      sourceSessionLogId: l.id,
      notes: "derived from session log"
    })) as MatchRecord[];
}

export function playerStats(playerId: string, matches: MatchRecord[]) {
  const pm = matches.filter((m) => m.playerId === playerId);
  const wins = pm.filter((m) => m.result === "win").length;
  const losses = pm.filter((m) => m.result === "loss").length;
  const total = pm.length;
  const winPct = total ? (wins / total) * 100 : 0;
  return { total, wins, losses, winPct };
}

export function rankings(players: Player[], matches: MatchRecord[], logs: SessionLogEntry[]) {
  return players
    .map((p) => {
      const stats = playerStats(p.id, matches);
      const playerMatches = matches.filter((m) => m.playerId === p.id).slice(-5);
      const recentForm = playerMatches.length
        ? (playerMatches.filter((m) => m.result === "win").length / playerMatches.length) * 100
        : 0;
      const activity = logs.filter((l) => l.playerId === p.id).length;
      const maxActivity = Math.max(...players.map((x) => logs.filter((l) => l.playerId === x.id).length), 1);
      const activityScore = (activity / maxActivity) * 100;
      // MVP ranking formula: 60% win %, 25% recent form, 15% activity volume.
      const rankingScore = stats.winPct * 0.6 + recentForm * 0.25 + activityScore * 0.15;
      return { ...p, ...stats, recentForm, activityScore, rankingScore };
    })
    .sort((a, b) => b.rankingScore - a.rankingScore)
    .map((item, idx) => ({ ...item, rank: idx + 1 }));
}

export function headToHead(playerA: string, playerBName: string, matches: MatchRecord[]) {
  const h2h = matches.filter(
    (m) => (m.playerId === playerA && m.opponentName === playerBName) || (m.playerId !== playerA && m.opponentName === playerA)
  );
  const aWins = h2h.filter((m) => m.playerId === playerA && m.result === "win").length;
  const bWins = h2h.filter((m) => m.playerId === playerA && m.result === "loss").length;
  return { total: h2h.length, aWins, bWins, lastResult: h2h.at(-1)?.result ?? "NA", history: h2h };
}
