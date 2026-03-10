export type DetectedSheets = {
  playerProfile?: string;
  sessionLog?: string;
  skillMetrics?: string;
  matchData?: string;
  performanceDashboard?: string;
  attendance?: string;
  tournaments?: string;
  goals?: string;
};

const includesAny = (name: string, terms: string[]) => terms.some((t) => name.includes(t));

export function detectWorkbookSheets(sheetNames: string[]): DetectedSheets {
  const lowered = sheetNames.map((s) => ({ original: s, low: s.toLowerCase() }));
  const pick = (terms: string[]) => lowered.find((s) => includesAny(s.low, terms))?.original;
  return {
    playerProfile: pick(["player profile", "player", "profile"]),
    sessionLog: pick(["session log", "session", "activity"]),
    skillMetrics: pick(["skill metrics", "metrics", "skill"]),
    matchData: pick(["match data", "match"]),
    performanceDashboard: pick(["performance dashboard", "dashboard", "performance"]),
    attendance: pick(["attendance"]),
    tournaments: pick(["tournament"]),
    goals: pick(["goal"])
  };
}
