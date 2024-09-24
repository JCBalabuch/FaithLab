// Imports
const { isAuth } = require('../../middlewares/isAuth');
const {
  register,
  login,
  getUsers,
  getUser,
  getUsersByIter,
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
userRoutes.get('/', isAuth('Master'), getUsers);
userRoutes.get('/get-user', getUser);
userRoutes.get('/users-by-iter', isAuth('Master'), getUsersByIter);
userRoutes.get('/users-by-pz', isAuth('Master'), getUsersByPZ);
userRoutes.get('/users-by-parish', isAuth('Master', 'Admin'), getUsersByParish);
userRoutes.put('/update-user/:id', isAuth('Master', 'Admin'), updateUser);
userRoutes.put('/update-itself/:id', userUpdateItself);
userRoutes.delete('/delete-user/:id', isAuth('Master', 'Admin'), deleteUser);

// Exports
module.exports = userRoutes;
