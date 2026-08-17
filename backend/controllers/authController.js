const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'smarthire_dev_secret_change_in_production';
const JWT_EXPIRES_IN = '7d';

/**
 * POST /api/auth/register
 * Body: { fullName, email, password, role? }
 * Returns: { token, user: { id, fullName, email, role } }
 */
const register = async (req, res) => {
  try {
    const { fullName, name, email, password, role } = req.body;

    // Support both 'fullName' and 'name' from the frontend
    const displayName = fullName || name;

    if (!displayName || !email || !password) {
      return res.status(400).json({ error: 'fullName, email, and password are required.' });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    const allowedRoles = ['hr', 'employee'];
    const userRole = allowedRoles.includes(role) ? role : 'employee';

    // Check if email already taken
    const existing = User.findByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = User.create({
      fullName: displayName,
      email,
      password: hashedPassword,
      role: userRole,
    });

    const token = jwt.sign(
      { userId: newUser.id, role: newUser.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.status(201).json({
      token,
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
};

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Returns: { token, user: { id, fullName, email, role } }
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Login failed. Please try again.' });
  }
};

module.exports = { register, login };
