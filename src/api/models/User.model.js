// Imports
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { sendEmail } = require('../../utils/sendEmail');

// Schema
const userSchema = new mongoose.Schema(
  {
    names: { type: String, required: true },
    surnames: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    phoneNumber: { type: String, required: true },
    parishName: { type: String, required: true },
    zoneName: { type: String, required: true },
    pathOfFaith: {
      type: String,
      enum: ['ICA', 'ICAJov', 'IUSMA'],
      required: true,
    },
    stage: { type: String, enum: ['I', 'II', 'III', 'IV'] },
    rol: {
      type: String,
      enum: ['Master', 'Admin', 'User'],
      required: true,
      default: 'User',
    },
    profile: {
      type: String,
      enum: [
        'Asesor Diocesano',
        'Coordinador Diocesano',
        'Formador',
        'Sacerdote',
        'Coordinador',
        'Catequista',
      ],
      required: true,
    },
    status: {
      type: String,
      enum: ['Activo', 'Por Autorizar', 'Eliminado'],
      required: true,
      default: 'Por Autorizar',
    },
  },
  {
    timestamps: true,
    collection: 'users',
  }
);

userSchema.pre('save', async function (next) {
  if (this.isNew) {
    const randomPassword = crypto.randomBytes(4).toString('hex');

    console.log(randomPassword);

    this.password = bcrypt.hashSync(randomPassword, 10);

    await sendEmail(this.email, this.names, randomPassword);
  }
  next();
});

const User = mongoose.model('users', userSchema, 'users');

// Exports
module.exports = User;
