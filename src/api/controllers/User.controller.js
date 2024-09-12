// Imports
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { generateSign } = require('../../utils/jwt');
const { mongoose } = require('mongoose');

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

// Functionto get a user
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

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

// Function to get user by email
// const getUserByEmail = async (req, res, next) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res
//         .status(404)
//         .json({ message: 'Usuario no encontrado en la Base de Datos' });
//     }

//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(404).json({ message: 'Error getting the user', error });
//   }
// };

// Function to get a user
const getUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    // const { id } = req.params;

    let user = await User.findOne({ email });

    // if (id) {
    //   user = await User.findById(id);
    // } else if (email) {
    //   user = await User.findOne({ email });
    // } else {
    //   return res.status(404).json({
    //     message: 'Debe proporcionar un email o escoger un usuario a mostrar',
    //   });
    // }

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

// Function to return forgotten password

// Function to get all users by Pastoral Zone

// Function to get all users by Parish
// Function to update a user
// Function to delete a user

// Exports
module.exports = {
  register,
  login,
  getUsers,
  getUserById,
  // getUserByEmail,
  getUser,
};
