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
parishRouter.post('/create-parish', createParish);
parishRouter.get('/', getParishes);
parishRouter.get('/get-parish/:id', getParish);
parishRouter.put('/update-parish/:id', updateParish);
parishRouter.delete('/delete-parish/:id', deleteParish);

// Exports
module.exports = parishRouter;
