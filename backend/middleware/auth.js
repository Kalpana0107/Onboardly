const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'smarthire_dev_secret_change_in_production';

/**
 * authMiddleware — verifies JWT from Authorization header.
 * Attaches { userId, role } to req.user on success.
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Session expired. Please log in again.' });
    }
    return res.status(401).json({ error: 'Invalid token.' });
  }
};

/**
 * isHR — role guard middleware. Must be used AFTER authMiddleware.
 */
const isHR = (req, res, next) => {
  if (req.user?.role !== 'hr') {
    return res.status(403).json({ error: 'Access denied. HR role required.' });
  }
  next();
};

/**
 * isEmployee — role guard middleware. Must be used AFTER authMiddleware.
 */
const isEmployee = (req, res, next) => {
  if (req.user?.role !== 'employee') {
    return res.status(403).json({ error: 'Access denied. Employee role required.' });
  }
  next();
};

module.exports = { authMiddleware, isHR, isEmployee };
