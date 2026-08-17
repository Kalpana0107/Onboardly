const express = require('express');
const router = express.Router();
const { authMiddleware, isEmployee } = require('../middleware/auth');
const checklistController = require('../controllers/checklistController');

// GET /api/checklist
router.get('/checklist', authMiddleware, isEmployee, checklistController.getChecklist);

// PATCH /api/checklist/:taskId
router.patch('/checklist/:taskId', authMiddleware, isEmployee, checklistController.toggleTask);

module.exports = router;
