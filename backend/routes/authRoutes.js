const express = require('express');
const router = express.Router();
const { register, login, googleSync } = require('../controllers/authController');

// POST /api/auth/register
router.post('/auth/register', register);

// POST /api/auth/login
router.post('/auth/login', login);

// POST /api/auth/google-sync
router.post('/auth/google-sync', googleSync);

module.exports = router;
