// config/authConfig.js
module.exports = {
    secret: process.env.JWT_SECRET,
    expiresIn: '1h', // Token expiration time
  };
  