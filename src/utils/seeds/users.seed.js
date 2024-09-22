// Imports
const User = require('../../api/models/user.model');

// Function to add users data in MongoDB
async function usersSeed(usersData) {
  try {
    const allUsers = await User.find();

    if (allUsers.length) {
      console.log('Deleting Users Data');

      await User.collection.drop();

      console.log('Users Data deleted');
    }

    console.log('Inserting new Users Data');

    await User.insertMany(usersData);

    console.log('Users Data inserted on DataBase');

    console.log('Users', usersData);
  } catch (error) {
    console.error(`Error creating Users Data: ${error}`);
  }
}

// Exports
module.exports = usersSeed;
