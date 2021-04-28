  
'use strict';
const server = require('./src/server'); // Added this 
require('dotenv').config();// Added this

const PORT = process.env.PORT || 3333 // Added this

// Start up DB Server
const mongoose = require('mongoose');
const options = {
  useNewUrlParser: true,
  useCreateIndex: true, // I dont know if this is needed
  useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGODB_URI, options);
  server.start(PORT);
