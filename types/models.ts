export type SessionType = "morning" | "evening" | "fitness" | "match" | "other";
export type ActivityType =
  | "rally"
  | "volley"
  | "serve"
  | "return"
  | "target practice"
  | "points"
  | "set"
  | "super tiebreak"
  | "match play"
  | "fitness"
  | "other";

export type Player = {
  id: string;
  fullName: string;
  age?: number;
  category?: string;
  handedness?: string;
  playingStyle?: string;
  strengths?: string[];
  weaknesses?: string[];
  notes?: string;
  active: boolean;
  createdAt: string;
};

export type AttendanceEntry = {
  id: string;
  date: string;
  sessionType: SessionType;
  playerId: string;
  present: boolean;
  remarks?: string;
};

export type SessionLogEntry = {
  id: string;
  date: string;
  sessionType: SessionType;
  playerId: string;
  activityType: ActivityType;
  drillName: string;
  description: string;
  durationMin: number;
  opponentName?: string;
  partnerName?: string;
  format?: string;
  scoreFor?: number;
  scoreAgainst?: number;
  result?: "win" | "loss" | "draw" | "NA";
  rallyConsistency?: number;
  targetAccuracy?: number;
  coachNotes?: string;
};

export type SkillMetricEntry = {
  id: string;
  date: string;
  playerId: string;
  metricType: string;
  metricValue: number;
  unit: string;
  context?: string;
  notes?: string;
};

export type MatchRecord = {
  id: string;
  date: string;
  playerId: string;
  opponentName: string;
  format: string;
  scoreFor: number;
  scoreAgainst: number;
  result: "win" | "loss" | "draw";
  sourceSessionLogId?: string;
  notes?: string;
};

export type Tournament = {
  id: string;
  title: string;
  location?: string;
  startDate: string;
  endDate?: string;
  category?: string;
  surface?: string;
  status: "upcoming" | "completed" | "cancelled";
  linkedPlayerIds: string[];
  notes?: string;
};

export type Goal = {
  id: string;
  playerId?: string;
  title: string;
  description?: string;
  category:
    | "technical"
    | "tactical"
    | "physical"
    | "mental"
    | "tournament"
    | "ranking"
    | "attendance"
    | "other";
  targetDate?: string;
  status: "not started" | "in progress" | "achieved" | "paused";
  progressPercent: number;
  notes?: string;
};

export type AppData = {
  players: Player[];
  attendance: AttendanceEntry[];
  sessionLogs: SessionLogEntry[];
  skillMetrics: SkillMetricEntry[];
  matches: MatchRecord[];
  tournaments: Tournament[];
  goals: Goal[];
};
