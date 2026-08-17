const express = require('express');
const router = express.Router();
const { authMiddleware, isEmployee } = require('../middleware/auth');
const ragController = require('../controllers/ragController');

// POST /api/rag/query
router.post('/rag/query', authMiddleware, isEmployee, ragController.queryPolicy);

module.exports = router;
