// Imports
const Parish = require('../models/Parish.model');
const User = require('../models/user.model');

// CRUD
// Function to create a Parish
const createParish = async (req, res, next) => {
  try {
    const { parishName } = req.body;
    const existingParish = await Parish.findOne({ parishName });

    if (existingParish) {
      return res
        .status(400)
        .json({ message: `La Parroquia ${parishName} ya existe en la BBDD` });
    }

    const newParish = new Parish(req.body);

    const parishSaved = await newParish.save();

    return res.status(201).json(parishSaved);
  } catch (error) {
    return res.status(500).json({ message: `Error creating Parish: ${error}` });
  }
};

// Function to get al parishes
const getParishes = async (req, res, next) => {
  try {
    const parishes = await Parish.find().populate({
      path: 'users',
      model: User,
    });
    console.log(parishes[0].users);

    return res.status(200).json(parishes);
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Error getting Parishes: ${error}` });
  }
};

// Function to get a Parish
const getParish = async (req, res, next) => {
  try {
    const { id } = req.params;
    const parish = await Parish.findById(id).populate('users');

    if (!parish) {
      return res.status(400).json(`La Parroquia no se encuentra en la BBDD`);
    }

    return res.status(200).json(parish);
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Error getting this Parish: ${error}` });
  }
};

// Function to update a Parish
const updateParish = async (req, res, next) => {
  try {
    const { id } = req.params;

    const parishUpdated = await Parish.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!parishUpdated) {
      return res
        .status(400)
        .json({ message: `Parroquia no encontrada en la BBDD` });
    }

    return res.status(201).json(parishUpdated);
  } catch (error) {
    return res.status(500).json({
      message: `Error updating parish: ${error}`,
    });
  }
};

// Function to delete Parish
const deleteParish = async (req, res, next) => {
  try {
    const { id } = req.params;

    const parishDeleted = await Parish.findByIdAndDelete(id);

    if (!parishDeleted) {
      return res
        .status(404)
        .json({ message: `Parroquia no encontrada en la BBDD` });
    }

    return res.status(200).json({
      message: `La Parroquia ${parishDeleted.parishName} ha sido eliminada de la BBDD`,
      element: parishDeleted,
    });
  } catch (error) {
    return res.status(400).json({ message: `Error deleting Parish: ${error}` });
  }
};

// Exports
module.exports = {
  createParish,
  getParishes,
  getParish,
  updateParish,
  deleteParish,
};
