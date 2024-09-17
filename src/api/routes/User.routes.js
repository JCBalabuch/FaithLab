// Imports
const { isAuth } = require('../../middlewares/isAuth');
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
userRoutes.get('/', isAuth('Master'), getUsers); // Solo Autorizados Masters
userRoutes.get('/get-user', getUser);
userRoutes.get('/users-by-pz', isAuth('Master'), getUsersByPZ); // Solo Autorizados Masters
userRoutes.get('/users-by-parish', isAuth('Master', 'Admin'), getUsersByParish); // Solo Autorizados Masters o Admin
userRoutes.put('/update-user/:id', isAuth('Master', 'Admin'), updateUser); // Solo Autorizados Admin
userRoutes.put('/update-itself/:id', userUpdateItself);
userRoutes.delete(
  '/delete-user/:id',
  isAuth('Master', 'Admin', 'User'),
  deleteUser
); // Solo Autorizados Admin o el propio usuario

// Exports
module.exports = userRoutes;
