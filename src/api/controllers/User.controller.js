// Imports
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { generateSign } = require('../../utils/jwt');
const { mongoose } = require('mongoose');

// Register & Login
// Function to register a user
const register = async (req, res, next) => {
  try {
    const user = new User({
      names: req.body.names,
      surnames: req.body.surnames,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      parish: req.body.parish,
      zoneName: req.body.zoneName,
      pathOfFaith: req.body.pathOfFaith,
      stage: req.body.stage,
      profile: req.body.profile,
    });

    const existingUser = await User.findOne({ email: user.email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'El usuario ya existe en la Base de Datos' });
    }

    const userSaved = await user.save();
    return res.status(201).json({
      message: 'Usuario registrado exitosamente',
      element: userSaved,
    });
  } catch (error) {
    return res.status(500).json({ message: `Error creating User: ${error}` });
  }
};

// Function to login a user
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    console.log('l37', user.password);

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Usuario o contraseña incorrectos' });
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = generateSign(user._id);
      return res.status(200).json({ token, user });
    } else {
      return res
        .status(400)
        .json({ message: 'Usuario o contraseña incorrectos' });
    }
  } catch (error) {
    return res.status(400).json({ message: 'Error login user', error });
  }
};

// RUD
// Function to get all users
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ message: 'Error getting users', error });
  }
};

// Function to get a user
const getUser = async (req, res, next) => {
  try {
    const { searchBy } = req.query;
    const searchValue = searchBy === 'id' ? req.query.value : req.body.email;

    let user;

    user =
      searchBy === 'id'
        ? await User.findById(searchValue)
        : await User.findOne({ email: searchValue });

    if (!user) {
      return res
        .status(404)
        .json({ message: 'Usuario no encontrado en la Base de Datos' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ message: 'Error getting the user', error });
  }
};

// Function to change password
// const changePass = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { password } = req.body;
//   } catch (error) {
//     return res.status(404).json({ message: 'Error updating password', error });
//   }
// };

// Function to get all users by Pastoral Zone
const getUsersByPZ = async (req, res, next) => {
  try {
    const { zoneName } = req.body;

    if (!zoneName) {
      return res
        .status(400)
        .json({ message: 'Debes escoger una Zona Pastoral' });
    }

    const usersByPZ = await User.find({ zoneName });
    return res.status(200).json(usersByPZ);
  } catch (error) {
    return res
      .status(404)
      .json({ message: 'Error getting the users by Pastoral Zone', error });
  }
};

// Function to get all users by Parish
const getUsersByParish = async (req, res, next) => {
  try {
    const { parish } = req.body;

    if (!parish) {
      return res.status(400).json({ message: 'Debes escoger una Parroquia' });
    }

    const usersByParish = await User.find({ parish });
    return res.status(200).json(usersByParish);
  } catch (error) {
    return res
      .status(404)
      .json({ message: 'Error getting the users by Pastoral Zone', error });
  }
};

// Function to update a user
// Function to delete a user

// Exports
module.exports = {
  register,
  login,
  getUsers,
  getUser,
  getUsersByPZ,
  getUsersByParish,
};
