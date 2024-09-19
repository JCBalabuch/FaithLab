const { isAuth } = require('../../middlewares/isAuth');
const {
  createParish,
  getParishes,
  getParish,
  updateParish,
  deleteParish,
} = require('../controllers/Parish.controller');

// Imports
const parishRouter = require('express').Router();

// Routes
parishRouter.post('/create-parish', isAuth('Master'), createParish);
parishRouter.get('/', isAuth('Master'), getParishes);
parishRouter.get('/get-parish/:id', getParish);
parishRouter.put('/update-parish/:id', isAuth('Master'), updateParish);
parishRouter.delete('/delete-parish/:id', isAuth('Master'), deleteParish);

// Exports
module.exports = parishRouter;
