// Imports
const {
  register,
  login,
  getUsers,
  getUserById,
  //   getUserByEmail,
  getUser,
} = require('../controllers/user.controller');

const userRoutes = require('express').Router();

// Routes
userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUserById);
userRoutes.get('/email', getUser);

// Exports
module.exports = userRoutes;
