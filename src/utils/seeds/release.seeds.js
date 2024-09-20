// Imports
require('dotenv').config();
const mongoose = require('mongoose');
const {
  processUsers,
  processParishes,
  processPastoralZones,
} = require('../handleFiles/handleCSV');
const usersSeed = require('./users.seed');
const parishSeed = require('./parishes.seed');
const pastoralZonesSeed = require('./pastZones.seed');

// DataBase URL
const URL = process.env.DDBB_URL;

// Function to release all seeds
async function releaseSeeds() {
  try {
    // Connect with MongoDB
    await mongoose.connect(URL);
    console.log('Seed connected with MongoDB');

    // Process CVS Data
    const users = await processUsers();
    const parishes = await processParishes(users);
    const pastoralZones = await processPastoralZones(users, parishes);

    //Release seeds
    await usersSeed(users);
    await parishSeed(parishes);
    await pastoralZonesSeed(pastoralZones);
  } catch (error) {
    console.error(`Error executing seeds: ${error}`);
  } finally {
    process.exit();
  }
}

// Function's execution
releaseSeeds();
