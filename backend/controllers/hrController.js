const bcrypt = require('bcryptjs');
const User = require('../models/User');
const db = require('../db/database');

// Create employees_info table for storing department/progress metadata
db.exec(`
  CREATE TABLE IF NOT EXISTS employees_info (
    userId INTEGER PRIMARY KEY,
    department TEXT NOT NULL DEFAULT 'Engineering',
    progress INTEGER NOT NULL DEFAULT 0,
    completionEmailSent INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
  );
`);

/**
 * POST /api/hr/create-employee
 * provisions employee user + employee_info record
 */
const createEmployee = async (req, res) => {
  try {
    const { name, email, password, department, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    // Check if email already taken
    const existing = User.findByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = User.create({
      fullName: name,
      email,
      password: hashedPassword,
      role: role || 'employee',
    });

    // Create entry in employees_info for department/progress
    db.prepare('INSERT INTO employees_info (userId, department, progress) VALUES (?, ?, ?)')
      .run(newUser.id, department || 'Engineering', 0);

    return res.status(201).json({
      message: 'Employee account created successfully.',
      employee: {
        id: newUser.id,
        name: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        department: department || 'Engineering',
        progress: 0,
      },
    });
  } catch (err) {
    console.error('Create employee error:', err);
    return res.status(500).json({ error: 'Failed to provision employee account.', detail: err.message });
  }
};

/**
 * GET /api/employees
 * returns all employees + their department & onboarding progress
 */
const getEmployees = async (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT 
        u.id, 
        u.fullName AS name, 
        u.email, 
        u.role, 
        u.created_at, 
        COALESCE(ei.department, 'Engineering') AS department,
        COALESCE(ei.progress, 0) AS progress
      FROM users u
      LEFT JOIN employees_info ei ON u.id = ei.userId
      WHERE u.role = 'employee'
    `).all();

    return res.status(200).json({ employees: rows });
  } catch (err) {
    console.error('Get employees error:', err);
    return res.status(500).json({ error: 'Failed to retrieve employees list.', detail: err.message });
  }
};

module.exports = { createEmployee, getEmployees };
