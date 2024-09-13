// Imports
const {
  register,
  login,
  getUsers,
  getUser,
  getUsersByPZ,
  getUsersByParish,
} = require('../controllers/user.controller');

const userRoutes = require('express').Router();

// Routes
userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.get('/', getUsers);
userRoutes.get('/get-user', getUser);
userRoutes.get('/users-by-pz', getUsersByPZ);
userRoutes.get('/users-by-parish', getUsersByParish);

// Exports
module.exports = userRoutes;
