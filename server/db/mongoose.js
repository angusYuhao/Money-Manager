/* This module will hold our connection to 
   our mongo server through the Mongoose API.
   We will access the connection in our express server. */
const mongoose = require('mongoose')

const config = require('../config')
const ENV = process.env.NODE_ENV == 'production' ? 'production' : config.ENV

const configDB = (ENV !== "production") ? require('./config.js') : null;

// const { localMongoURI } = require('./config')

/* Connnect to our database */
// Get the URI of the local database, or the one specified on deployment.
const mongoURI = process.env.MONGODB_URI || configDB.localMongoURI

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

module.exports = { mongoose }  // Export the active connection.