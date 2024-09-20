// Imports
const fs = require('fs');
const csv = require('csv-parser');
const User = require('src/api/models/User.model.js');
const Parish = require('src/api/models/Parish.model.js');
const PastoralZone = require('src/api/models/PastoralZones.model.js');

// Paths to CSV files
const usersURL = 'src/utils/handleFiles/usersData-FL.csv';
const parishesURL = 'src/utils/handleFiles/parishesData-FL.csv';
const pastZonesURL = 'src/utils/handleFiles/PastoralZonesData-FL.csv';

// Function to read and process csv data for Users
const processUsers = async () => {
  const usersData = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(usersURL)
      .pipe(csv({ separator: ';' }))
      .on('data', (row) => {
        const cleanedRow = {};
        for (const key in row) {
          cleanedRow[key.trim()] = row[key];
        }
        const newUser = new User({
          names: cleanedRow.names,
          surnames: cleanedRow.surnames,
          email: cleanedRow.email,
          phoneNumber: cleanedRow.phoneNumber,
          parishName: cleanedRow.parishName,
          zoneName: cleanedRow.zoneName,
          pathOfFaith: cleanedRow.pathOfFaith,
          stage: cleanedRow.stage,
          profile: cleanedRow.profile,
        });
        usersData.push(newUser);
      })
      .on('end', () => {
        resolve(usersData);
      })
      .on('error', (error) => reject(error));
  });
};

// Function to read and process csv data for Parishes
const processParishes = async (usersData) => {
  const parishesData = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(parishesURL)
      .pipe(csv({ separator: ';' }))
      .on('data', (row) => {
        const cleanedRow = {};
        for (const key in row) {
          cleanedRow[key.trim()] = row[key];
        }

        const usersIdsByParishes = usersData
          .filter((user) => user.parishName === cleanedRow.parishName)
          .map((user) => user._id);

        const newParish = new Parish({
          parishName: cleanedRow.parishName,
          parishPriest: cleanedRow.parishPriest,
          address: cleanedRow.address,
          city: cleanedRow.city,
          phone: cleanedRow.phone,
          email: cleanedRow.email,
          zoneName: cleanedRow.zoneName,
          users: usersIdsByParishes,
        });
        parishesData.push(newParish);
      })
      .on('end', () => {
        resolve(parishesData);
      })
      .on('error', (error) => reject(error));
  });
};

// Function to read and process csv data for Pastoral Zones
const processPastoralZones = async (usersData, parishesData) => {
  const pastoralZonesData = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(pastZonesURL)
      .pipe(csv({ separator: ';' }))
      .on('data', (row) => {
        const cleanedRow = {};
        for (const key in row) {
          cleanedRow[key.trim()] = row[key];
        }

        const usersIdsByPastZones = usersData
          .filter((user) => user.zoneName === cleanedRow.zoneName)
          .map((user) => user._id);

        const parishesIdsByPastZones = usersData
          .filter((user) => user.zoneName === cleanedRow.zoneName)
          .map((user) => {
            const parish = parishesData.find(
              (parish) => parish.parishName === user.parishName
            );
            return parish ? parish._id : null;
          })
          .filter(Boolean);

        const newPastoralZone = new PastoralZone({
          zoneName: cleanedRow.zoneName,
          number: cleanedRow.number,
          parishes: parishesIdsByPastZones,
          users: usersIdsByPastZones,
        });

        pastoralZonesData.push(newPastoralZone);
      })
      .on('end', () => {
        resolve(pastoralZonesData);
      })
      .on('error', (error) => reject(error));
  });
};

// Exports
module.exports = { processUsers, processParishes, processPastoralZones };
