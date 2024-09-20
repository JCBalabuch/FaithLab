// Imports
const mongoose = require('mongoose');

// Schema
const pastoralZoneSchema = mongoose.Schema(
  {
    zoneName: { type: String, required: true },
    number: {
      type: String,
      enum: ['I', 'II', 'III', 'IV', 'V', 'VI'],
      required: true,
    },
    // parishes: [{ type: String, required: true }],
    parishes: [{ type: mongoose.Types.ObjectId, ref: 'parishes' }],
    // users: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
  },
  {
    timestamps: true,
    collection: 'pastoralZones',
  }
);

const PastoralZone = mongoose.model(
  'pastoralZones',
  pastoralZoneSchema,
  'pastoralZones'
);

// Exports
module.exports = PastoralZone;
