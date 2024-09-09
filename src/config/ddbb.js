// Imports
const mongoose = require('mongoose');

// Function to connect to DDBB
const connectDDBB = async (req, res, next) => {
    try {
        await mongoose.connect(process.env.DDBB_URL);
        console.log('Successfully connected to the Database');
    } catch (error) {
        console.error(`Error connecting to de DataBase: ${error}`);
    }
}

// Exports
module.exports = { connectDDBB }