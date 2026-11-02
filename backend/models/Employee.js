const db = require('../db/database');

// Create onboarding_tasks and employees_info tables if they do not exist
db.exec(`
  CREATE TABLE IF NOT EXISTS employees_info (
    userId INTEGER PRIMARY KEY,
    department TEXT NOT NULL DEFAULT 'Engineering',
    progress INTEGER NOT NULL DEFAULT 0,
    completionEmailSent INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS onboarding_tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    title TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0, -- 0 for false, 1 for true
    completedAt DATETIME,
    FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
  );
`);

const Employee = {
  /**
   * Initialize a standard checklist for a new employee.
   */
  initChecklist: (userId) => {
    try {
      db.prepare(`
        INSERT OR IGNORE INTO employees_info (userId, department, progress, completionEmailSent)
        VALUES (?, 'Engineering', 0, 0)
      `).run(userId);
    } catch (e) {
      // Table will be created above
    }

    const defaultTasks = [
      'Complete Profile & Identity Verification',
      'Review Code of Conduct & IT Security Policy',
      'Set up 2FA & Work Credentials',
      'Join Department Slack/Teams Channels',
      'Schedule 1-on-1 Intro with Manager'
    ];

    const checkStmt = db.prepare('SELECT COUNT(*) AS count FROM onboarding_tasks WHERE userId = ?');
    const existingCount = checkStmt.get(userId).count;

    if (existingCount === 0) {
      const insertStmt = db.prepare('INSERT INTO onboarding_tasks (userId, title, completed) VALUES (?, ?, 0)');
      for (const task of defaultTasks) {
        insertStmt.run(userId, task);
      }
    }
  },

  /**
   * Get employee checklist tasks and calculated progress.
   */
  getChecklist: (userId) => {
    // Ensure tasks exist and employee_info exists
    Employee.initChecklist(userId);

    const tasks = db.prepare('SELECT id, title, completed, completedAt FROM onboarding_tasks WHERE userId = ?').all(userId);
    
    // Parse completed flag as boolean and date
    const formattedTasks = tasks.map(t => ({
      id: t.id,
      title: t.title,
      completed: !!t.completed,
      completedAt: t.completedAt
    }));

    const total = formattedTasks.length;
    const completedCount = formattedTasks.filter(t => t.completed).length;
    const progress = total > 0 ? Math.round((completedCount / total) * 100) : 0;

    // Sync with employees_info progress column
    db.prepare('UPDATE employees_info SET progress = ? WHERE userId = ?').run(progress, userId);

    return {
      tasks: formattedTasks,
      progress
    };
  },

  /**
   * Toggles task completion state and recalculates progress.
   */
  toggleTask: (userId, taskId) => {
    Employee.initChecklist(userId);

    const task = db.prepare('SELECT * FROM onboarding_tasks WHERE id = ? AND userId = ?').get(taskId, userId);
    if (!task) {
      throw new Error(`Task with id ${taskId} not found.`);
    }

    const nextCompletedState = task.completed === 1 ? 0 : 1;
    const completedAt = nextCompletedState === 1 ? new Date().toISOString() : null;

    db.prepare('UPDATE onboarding_tasks SET completed = ?, completedAt = ? WHERE id = ? AND userId = ?')
      .run(nextCompletedState, completedAt, taskId, userId);

    // Calculate new overall progress
    const total = db.prepare('SELECT COUNT(*) AS count FROM onboarding_tasks WHERE userId = ?').get(userId).count;
    const completedCount = db.prepare('SELECT COUNT(*) AS count FROM onboarding_tasks WHERE userId = ? AND completed = 1').get(userId).count;
    const progress = total > 0 ? Math.round((completedCount / total) * 100) : 0;

    // Sync with employees_info progress column
    db.prepare('UPDATE employees_info SET progress = ? WHERE userId = ?').run(progress, userId);

    return {
      taskId,
      completed: nextCompletedState === 1,
      completedAt,
      progress
    };
  }
};

module.exports = Employee;
