// Imports
const Parish = require('../../api/models/parish.model');

// Function to add users data in MongoDB
async function parishSeed(parishData) {
  try {
    const allParishes = await Parish.find();

    if (allParishes.length) {
      console.log('Deleting Parishes Data');

      await Parish.collection.drop();

      console.log('Parishes Data deleted');
    }

    console.log('Inserting new Parishes Data');

    await Parish.insertMany(parishData);

    console.log('Parishes Data inserted on DataBase');

    console.log('Parishes', parishData);
  } catch (error) {
    console.error(`Error creating Parishes Data: ${error}`);
  }
}

// Exports
module.exports = parishSeed;
