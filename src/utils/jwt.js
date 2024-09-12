// Imports
const jwt = require('jsonwebtoken');

// Generate sign
const generateSign = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Verify sign
const verifySign = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// Exports
module.exports = { generateSign, verifySign };
