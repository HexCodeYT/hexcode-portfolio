import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "uptime.sqlite");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS uptime_checks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service_name TEXT NOT NULL,
    service_url TEXT NOT NULL,
    status TEXT NOT NULL,
    status_code INTEGER,
    latency_ms INTEGER,
    checked_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_uptime_service_checked_at
  ON uptime_checks (service_name, checked_at);
`);