const Database = require("better-sqlite3");
const path = require("path");

const dbPath = process.env.DB_PATH || path.join(__dirname, "../smarthire.db");
const db = new Database(dbPath);

db.exec(`CREATE TABLE IF NOT EXISTS candidates(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT,
    filepath TEXT NOT NULL,
    skills TEXT,
    match_score REAL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`);

module.exports = db;
