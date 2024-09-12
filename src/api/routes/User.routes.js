// Imports
const { register, login } = require('../controllers/user.controller');

const userRoutes = require('express').Router();

// Routes
userRoutes.post('/register', register);
userRoutes.post('/login', login);

// Exports
module.exports = userRoutes;
