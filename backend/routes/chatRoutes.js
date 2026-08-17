const express = require('express');
const router = express.Router();
const { authMiddleware, isEmployee } = require('../middleware/auth');
const chatController = require('../controllers/chatController');

// POST /api/chat
router.post('/chat', authMiddleware, isEmployee, chatController.chat);

module.exports = router;
