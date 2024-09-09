// Imports
const {
  createPastoralZone,
  getPastoralZones,
  getPastoralZone,
  updatePastoralZone,
  deletePastoralZone,
} = require('../controllers/PastoralZones.controllers');
const zonesRouter = require('express').Router();

// Routes
zonesRouter.post('/create-zone', createPastoralZone);
zonesRouter.get('/', getPastoralZones);
zonesRouter.get('/get-zone/:id', getPastoralZone);
zonesRouter.put('/update-zone/:id', updatePastoralZone);
zonesRouter.delete('/delete-zone/:id', deletePastoralZone);

// Exports
module.exports = zonesRouter;
