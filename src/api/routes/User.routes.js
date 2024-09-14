// Imports
const {
  register,
  login,
  getUsers,
  getUser,
  getUsersByPZ,
  getUsersByParish,
  deleteUser,
  userUpdateItself,
  updateUser,
} = require('../controllers/user.controller');

const userRoutes = require('express').Router();

// Routes
userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.get('/', getUsers);
userRoutes.get('/get-user', getUser);
userRoutes.get('/users-by-pz', getUsersByPZ);
userRoutes.get('/users-by-parish', getUsersByParish);
userRoutes.get('/update-user/:id', updateUser);
userRoutes.get('/update-itself/:id', userUpdateItself);
userRoutes.get('/delete-user/:id', deleteUser);

// Exports
module.exports = userRoutes;
