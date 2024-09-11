// Imports
const { register } = require('../controllers/user.controller');

const userRoutes = require('express').Router();

// Routes
userRoutes.post('/register', register);

// Exports
module.exports = userRoutes;
