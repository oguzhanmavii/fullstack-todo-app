const jwt = require('jsonwebtoken');
const { User } = require('../models');
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Token not provided' });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        console.error('JWT verification error:', err);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }
      const user = await User.findOne({ where: { username: decoded.username } });
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized: User not found' });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = authMiddleware;
