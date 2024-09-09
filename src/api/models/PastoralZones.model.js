// Imports
const mongoose = require('mongoose');

// Schema
const pastoralZoneSchema = mongoose.Schema(
  {
    zoneName: { type: String, required: true },
    number: { type: String, required: true },
    city: { type: String, required: true },
    parishes: [{ type: String, required: true }],
    // parishes: [{ type: mongoose.Types.ObjectId, ref: 'parishes' }],
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
