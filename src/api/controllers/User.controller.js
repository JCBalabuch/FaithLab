// Imports
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { generateSign } = require('../../utils/jwt');

// Register & Login
// Function to register a user
const register = async (req, res, next) => {
  try {
    const user = new User(req.body);

    const existingUser = await User.findOne({ email: user.email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'El usuario ya existe en la Base de Datos' });
    }

    const userSaved = await user.save();
    return res.status(200).json({
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

// CRUD
// Function to create user
// Function to get all users
// Function to get all users by Pastoral Zone
// Function to get all users by Parish
// Function to update a user
// Function to delete a user

// Exports
module.exports = { register, login };
