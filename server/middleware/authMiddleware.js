const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // This will contain both id and username
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
};

module.exports = authMiddleware;
