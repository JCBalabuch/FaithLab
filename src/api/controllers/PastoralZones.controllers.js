// Imports
const Parish = require('../models/Parish.model');
const PastoralZone = require('../models/PastoralZones.model');
const User = require('../models/user.model');

// CRUD

// Function to create a Pastoral Zone
const createPastoralZone = async (req, res, next) => {
  try {
    const { zoneName } = req.body;
    const existingZone = await PastoralZone.findOne({ zoneName });

    if (existingZone) {
      return res.status(400).json({
        message: `La Zona Pastoral ${existingZone} ya existe en la BBDD`,
      });
    }

    const newZone = new PastoralZone(req.body);

    const zoneSaved = await newZone.save();

    return res.status(201).json(zoneSaved);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error creating Pastoral Area: ${error}` });
  }
};

// Function to get all Pastoral Zones
const getPastoralZones = async (req, res, next) => {
  try {
    const pastoralZones = await PastoralZone.find().populate({
      path: 'parishes',
      model: Parish,
      populate: { path: 'users', model: User },
    });
    return res.status(200).json(pastoralZones);
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Error getting Pastoral Zones ${error}` });
  }
};

// Function to get one Pastoral Zone
const getPastoralZone = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pastoralZone = await PastoralZone.findById(id);

    if (!pastoralZone) {
      return res.status(400).json({
        message: `La Zona Pastoral ${pastoralZone} no se encuentra en la BBDD`,
      });
    }

    return res.status(200).json(pastoralZone);
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Error getting this Pastoral Area ${error}` });
  }
};

// Function to update a Pastoral Zone
const updatePastoralZone = async (req, res, next) => {
  try {
    const { id } = req.params;

    const zoneUpdated = await PastoralZone.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!zoneUpdated) {
      return res
        .status(404)
        .json({ message: `Zona Pastoral no encontrada en la BBDD` });
    }

    return res.status(201).json(zoneUpdated);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error updating Pastoral Zone: ${error}` });
  }
};

// Function to delete a Pastoral Zone
const deletePastoralZone = async (req, res, next) => {
  try {
    const { id } = req.params;

    const zoneDeleted = await PastoralZone.findByIdAndDelete(id);

    if (!zoneDeleted) {
      return res.status(404).json('Zona Pastoral no encontrada en la BBDD');
    }

    return res.status(200).json({
      message: `La Zona Pastoral ${zoneDeleted.zoneName} ha sido eliminada de la BBDD`,
      element: zoneDeleted,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Error deleting the Pastoral Zone, ${error}` });
  }
};

// Exports
module.exports = {
  createPastoralZone,
  getPastoralZones,
  getPastoralZone,
  updatePastoralZone,
  deletePastoralZone,
};
