// Imports
const mongoose = require('mongoose');

// Schema
const parishSchema = mongoose.Schema(
  {
    parishName: { type: String, required: true },
    parishPriest: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String },
    email: {
      type: String,
      unique: true,
    },
    rrss: {
      type: String,
      enum: ['Facebook', 'Instagram', 'Youtube', 'TikTok'],
    },
    webPage: { type: String },
    zoneName: { type: String, required: true },
    users: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
  },
  {
    timestamps: true,
    collection: 'parishes',
  }
);

const Parish = mongoose.model('parishes', parishSchema, 'parishes');

// Exports
module.exports = Parish;
