// Imports
const PastoralZones = require('src/api/models/PastoralZones.model.js');

// Function to add users data in MongoDB
async function pastoralZonesSeed(pastoralZonesData) {
  try {
    const allPastoralZones = await PastoralZones.find();

    if (allPastoralZones.length) {
      console.log('Deleting Pastoral Zones Data');

      await PastoralZones.collection.drop();

      console.log('Pastoral Zones Data deleted');
    }

    console.log('Inserting new Pastoral Zones Data');

    await PastoralZones.insertMany(pastoralZonesData);

    console.log('Pastoral Zones Data inserted on DataBase');

    console.log('Pastoral Zones', pastoralZonesData);
  } catch (error) {
    console.error(`Error creating Pastoral Zones Data: ${error}`);
  }
}

// Exports
module.exports = pastoralZonesSeed;
