const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRE, JWT_COOKIE_EXPIRE } = require('../config/config');

// Generate JWT token and set cookie
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRE }
  );

  // Remove password from output
  user.password = undefined;

  // Cookie options
  const options = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true, // Cookie cannot be accessed by client-side JavaScript
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'strict'
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user
    });
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  sendTokenResponse,
  verifyToken
};