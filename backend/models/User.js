/**
 * User model using SQLite (better-sqlite3).
 * Fields: id, fullName, email, password (hashed), role ('hr' | 'employee'), created_at
 */
const db = require('../db/database');

// Create users table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('hr', 'employee')) DEFAULT 'employee',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const User = {
  /**
   * Find a user by email. Returns the row or undefined.
   */
  findByEmail: (email) => {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  },

  /**
   * Find a user by id. Returns the row or undefined.
   */
  findById: (id) => {
    return db.prepare('SELECT id, fullName, email, role, created_at FROM users WHERE id = ?').get(id);
  },

  /**
   * Create a new user. Returns the newly created user row (without password).
   */
  create: ({ fullName, email, password, role = 'employee' }) => {
    const result = db
      .prepare('INSERT INTO users (fullName, email, password, role) VALUES (?, ?, ?, ?)')
      .run(fullName, email, password, role);

    return db
      .prepare('SELECT id, fullName, email, role, created_at FROM users WHERE id = ?')
      .get(result.lastInsertRowid);
  },
};

module.exports = User;
