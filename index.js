// Imports
require('dotenv').config();
const express = require('express');
const { connectDDBB } = require('./src/config/ddbb');
const zonesRouter = require('./src/api/routes/PastoralZones.routes');
const parishRouter = require('./src/api/routes/Parish.routes');

// Port
const PORT = 3000;

// Express application instance
const app = express();

// Connections
connectDDBB();

// Enable to read JSON
app.use(express.json());

//Routes
app.use('/faithlab/zones', zonesRouter);
app.use('/faithlab/parishes', parishRouter);

// Handle routes not found
app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server run in http://localhost:${PORT}`);
});
