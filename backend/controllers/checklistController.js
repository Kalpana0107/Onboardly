const Employee = require('../models/Employee');

/**
 * GET /api/checklist
 * Returns user's tasks and overall progress (0-100)
 */
const getChecklist = async (req, res) => {
  try {
    const userId = req.user.userId;
    const checklistData = Employee.getChecklist(userId);
    return res.status(200).json(checklistData);
  } catch (err) {
    console.error('getChecklist error:', err);
    return res.status(500).json({ error: 'Failed to retrieve onboarding checklist.', detail: err.message });
  }
};

const db = require('../db/database');
const { sendCompletionEmail } = require('../utils/emailService');

/**
 * PATCH /api/checklist/:taskId
 * Toggles status and returns updated task and progress
 */
const toggleTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { taskId } = req.params;

    const id = parseInt(taskId, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid taskId — must be a number.' });
    }

    const updated = Employee.toggleTask(userId, id);

    // If progress reaches exactly 100%, trigger completion email check
    if (updated.progress === 100) {
      const empInfo = db.prepare('SELECT completionEmailSent FROM employees_info WHERE userId = ?').get(userId);
      
      if (empInfo && empInfo.completionEmailSent === 0) {
        // Fetch candidate details
        const userObj = db.prepare('SELECT fullName, email, role FROM users WHERE id = ?').get(userId);
        const checklist = Employee.getChecklist(userId);

        if (userObj) {
          // Trigger async email send without blocking client response
          sendCompletionEmail({
            employeeName: userObj.fullName,
            employeeEmail: userObj.email,
            role: userObj.role,
            completedTasks: checklist.tasks
          }).then((mailRes) => {
            if (mailRes && mailRes.success) {
              db.prepare('UPDATE employees_info SET completionEmailSent = 1 WHERE userId = ?').run(userId);
            }
          }).catch((err) => {
            console.error('Asynchronous completion email dispatch failed:', err);
          });
        }
      }
    }

    return res.status(200).json(updated);
  } catch (err) {
    console.error('toggleTask error:', err);
    return res.status(500).json({ error: 'Failed to update task completion.', detail: err.message });
  }
};

module.exports = { getChecklist, toggleTask };
