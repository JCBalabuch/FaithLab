// Imports
const {
  createPastoralZone,
  getPastoralZones,
  getPastoralZone,
  updatePastoralZone,
  deletePastoralZone,
} = require('../controllers/pastoralZones.controllers');
const { isAuth } = require('../../middlewares/isAuth');
const zonesRouter = require('express').Router();

// Routes
zonesRouter.post('/create-zone', isAuth('Master'), createPastoralZone);
zonesRouter.get('/', isAuth('Master'), getPastoralZones);
zonesRouter.get('/get-zone/:id', isAuth('Master'), getPastoralZone);
zonesRouter.put('/update-zone/:id', isAuth('Master'), updatePastoralZone);
zonesRouter.delete('/delete-zone/:id', isAuth('Master'), deletePastoralZone);

// Exports
module.exports = zonesRouter;
