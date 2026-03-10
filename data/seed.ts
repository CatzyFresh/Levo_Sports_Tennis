import { AppData } from "@/types/models";

// Seed mapped from workbook screenshots: Player Profile + Session Log tabs and aligned sheets.
export const workbookSeed: AppData = {
  players: [
    { id: "P-001", fullName: "Prativ", age: 15, category: "Advanced", handedness: "Right", playingStyle: "Aggressive baseliner", strengths: ["Game Sense"], weaknesses: ["Serve", "Topspin"], notes: "Workbook notes: Yes", active: true, createdAt: "2026-01-10" },
    { id: "P-002", fullName: "Bhavishnu", age: 16, category: "Advanced", handedness: "Right", playingStyle: "Power baseliner", strengths: ["Power"], weaknesses: ["Consistency"], notes: "Workbook notes: Yes", active: true, createdAt: "2026-01-10" },
    { id: "P-003", fullName: "Aarish", age: 19, category: "Advanced", handedness: "Right", strengths: ["Variation"], weaknesses: ["Tactics and technique"], active: true, createdAt: "2026-01-10" },
    { id: "P-004", fullName: "Johith", age: 13, category: "Advanced", handedness: "Right", strengths: ["Consistency"], weaknesses: ["Court positioning"], active: true, createdAt: "2026-01-10" },
    { id: "P-005", fullName: "Gowtham", age: 17, category: "Advanced", handedness: "Right", strengths: ["Court Coverage", "All court"], weaknesses: ["Tactics"], active: true, createdAt: "2026-01-10" },
    { id: "P-006", fullName: "Athray", age: 16, category: "Advanced", handedness: "Right", strengths: ["Good Counter Puncher"], weaknesses: ["Serve", "NetPlay"], active: true, createdAt: "2026-01-10" },
    { id: "P-007", fullName: "Arya", age: 16, category: "Advanced", handedness: "Right", strengths: ["Hard Hitter"], weaknesses: ["Consistency and Approach"], active: true, createdAt: "2026-01-10" },
    { id: "P-008", fullName: "Alan", age: 15, category: "Advanced", handedness: "Right", active: true, createdAt: "2026-01-10" },
    { id: "P-009", fullName: "Fedelesh", age: 42, category: "Members", handedness: "Right", active: true, createdAt: "2026-01-10" },
    { id: "P-010", fullName: "Vivek", age: 25, category: "Members", handedness: "Right", active: true, createdAt: "2026-01-10" },
    { id: "P-011", fullName: "Stephen", age: 25, category: "Coach", handedness: "Right", active: true, createdAt: "2026-01-10" },
    { id: "P-012", fullName: "Srinivas", age: 26, category: "Coach", handedness: "Right", active: true, createdAt: "2026-01-10" },
    { id: "P-013", fullName: "Elan", age: 28, category: "Coach", handedness: "Right", active: true, createdAt: "2026-01-10" }
  ],
  attendance: [
    "P-001,P-002,P-003,P-004,P-005,P-006,P-007,P-008".split(",").map((pid, i) => ({ id: `AT-1${i}`, date: "2026-09-03", sessionType: "morning" as const, playerId: pid, present: true })),
    "P-001,P-002,P-003,P-004,P-005,P-006,P-007,P-008".split(",").map((pid, i) => ({ id: `AT-2${i}`, date: "2026-09-04", sessionType: "morning" as const, playerId: pid, present: i !== 3 })),
    "P-001,P-002,P-003,P-004,P-005".split(",").map((pid, i) => ({ id: `AT-3${i}`, date: "2026-09-05", sessionType: "evening" as const, playerId: pid, present: true }))
  ].flat(),
  sessionLogs: [
    { id: "SL-1", date: "2026-09-03", sessionType: "morning", playerId: "P-001", activityType: "rally", drillName: "Down the Line Rally", description: "Workbook row", durationMin: 10, coachNotes: "Coach Elan", rallyConsistency: 76 },
    { id: "SL-2", date: "2026-09-03", sessionType: "morning", playerId: "P-001", activityType: "rally", drillName: "Crosscourt Rally", description: "Workbook row", durationMin: 10, rallyConsistency: 78 },
    { id: "SL-3", date: "2026-09-03", sessionType: "morning", playerId: "P-001", activityType: "volley", drillName: "Volleys", description: "Workbook row", durationMin: 10, targetAccuracy: 73 },
    { id: "SL-4", date: "2026-09-03", sessionType: "morning", playerId: "P-001", activityType: "super tiebreak", drillName: "Super Tiebreak", description: "vs Aarish", durationMin: 30, opponentName: "Aarish", scoreFor: 10, scoreAgainst: 7, result: "win", format: "Super Tiebreak" },
    { id: "SL-5", date: "2026-09-03", sessionType: "morning", playerId: "P-001", activityType: "set", drillName: "Set", description: "vs Elan (Coach)", durationMin: 30, opponentName: "Elan", scoreFor: 4, scoreAgainst: 6, result: "loss", format: "Set" },
    { id: "SL-6", date: "2026-09-03", sessionType: "morning", playerId: "P-002", activityType: "rally", drillName: "Down the Line Rally", description: "Workbook row", durationMin: 10, partnerName: "Elan (Coach)", rallyConsistency: 80 },
    { id: "SL-7", date: "2026-09-03", sessionType: "morning", playerId: "P-002", activityType: "rally", drillName: "Crosscourt Rally", description: "Workbook row", durationMin: 10, opponentName: "Aarish", rallyConsistency: 82 },
    { id: "SL-8", date: "2026-09-03", sessionType: "morning", playerId: "P-002", activityType: "volley", drillName: "Volleys", description: "Workbook row", durationMin: 10, partnerName: "Elan (Coach)", targetAccuracy: 75 },
    { id: "SL-9", date: "2026-09-03", sessionType: "morning", playerId: "P-003", activityType: "rally", drillName: "Down the Line Rally", description: "Workbook row", durationMin: 10, partnerName: "Prativ", rallyConsistency: 79 },
    { id: "SL-10", date: "2026-09-04", sessionType: "morning", playerId: "P-003", activityType: "match play", drillName: "Practice Set", description: "vs Bhavishnu", durationMin: 35, opponentName: "Bhavishnu", scoreFor: 6, scoreAgainst: 4, result: "win", format: "Set" },
    { id: "SL-11", date: "2026-09-04", sessionType: "morning", playerId: "P-004", activityType: "match play", drillName: "Practice Set", description: "vs Gowtham", durationMin: 35, opponentName: "Gowtham", scoreFor: 3, scoreAgainst: 6, result: "loss", format: "Set" },
    { id: "SL-12", date: "2026-09-05", sessionType: "evening", playerId: "P-005", activityType: "target practice", drillName: "Cone Targets", description: "Deuce court targets", durationMin: 20, targetAccuracy: 84 }
  ],
  skillMetrics: [
    { id: "SM-1", date: "2026-09-03", playerId: "P-001", metricType: "rally consistency", metricValue: 76, unit: "%", context: "Morning session" },
    { id: "SM-2", date: "2026-09-04", playerId: "P-001", metricType: "target accuracy", metricValue: 74, unit: "%" },
    { id: "SM-3", date: "2026-09-03", playerId: "P-002", metricType: "rally consistency", metricValue: 81, unit: "%" },
    { id: "SM-4", date: "2026-09-04", playerId: "P-003", metricType: "rally consistency", metricValue: 79, unit: "%" },
    { id: "SM-5", date: "2026-09-05", playerId: "P-005", metricType: "target accuracy", metricValue: 84, unit: "%" }
  ],
  matches: [],
  tournaments: [
    { id: "T-1", title: "Chennai Junior Open", location: "Chennai", startDate: "2026-09-20", endDate: "2026-09-23", category: "U18", surface: "Hard", status: "upcoming", linkedPlayerIds: ["P-001", "P-002", "P-003"] },
    { id: "T-2", title: "Club Ranking Event", location: "Levo Sports", startDate: "2026-09-14", category: "Academy", surface: "Hard", status: "upcoming", linkedPlayerIds: ["P-004", "P-005", "P-006"] }
  ],
  goals: [
    { id: "G-1", playerId: "P-001", title: "Raise first-serve percentage", category: "technical", targetDate: "2026-10-10", status: "in progress", progressPercent: 55 },
    { id: "G-2", playerId: "P-002", title: "Improve rally consistency to 85%", category: "technical", targetDate: "2026-10-05", status: "in progress", progressPercent: 62 },
    { id: "G-3", title: "Academy attendance above 90%", category: "attendance", targetDate: "2026-09-30", status: "in progress", progressPercent: 71 }
  ]
};
