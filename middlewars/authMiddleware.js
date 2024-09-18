// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const { secret } = require('../config/authConfig');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send('No token provided');
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send('Unauthorized');
    }
    req.userId = decoded.id;
    next();
  });
};
