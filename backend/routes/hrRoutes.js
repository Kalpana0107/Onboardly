const express = require('express');
const router = express.Router();
const { authMiddleware, isHR } = require('../middleware/auth');
const hrController = require('../controllers/hrController');

// POST /api/hr/create-employee
router.post('/hr/create-employee', authMiddleware, isHR, hrController.createEmployee);

// GET /api/employees
router.get('/employees', authMiddleware, isHR, hrController.getEmployees);

module.exports = router;
