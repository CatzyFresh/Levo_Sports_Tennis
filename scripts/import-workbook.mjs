import fs from 'node:fs';
import path from 'node:path';
import xlsx from 'xlsx';

const file = process.argv[2];
if (!file) {
  console.error('Usage: npm run import:workbook -- <path-to-xlsx>');
  process.exit(1);
}

const workbook = xlsx.readFile(file);
const pick = (name) => {
  const sheetName = workbook.SheetNames.find((n) => n.toLowerCase() === name.toLowerCase())
    || workbook.SheetNames.find((n) => n.toLowerCase().includes(name.toLowerCase()));
  return sheetName ? xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' }) : [];
};

const output = {
  playerProfile: pick('Player Profile'),
  sessionLog: pick('Session Log'),
  skillMetrics: pick('Skill Metrics'),
  attendance: pick('Attendance'),
  tournaments: pick('Tournaments'),
  goals: pick('Goals')
};

const outPath = path.join(process.cwd(), 'data', 'workbook-import.json');
fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
console.log(`Wrote ${outPath}`);
