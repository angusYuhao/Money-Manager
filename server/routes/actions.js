const log = console.log

const config = require('../config')
const ENV = process.env.NODE_ENV == 'production' ? 'production' : config.ENV
const TEST_USER_ID = config.TEST_USER_ID
const TEST_USER_NAME = config.TEST_USER_NAME

const { User } = require("../models/user");

const { mongoose } = require("../db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    } else {
        next()
    }
}

const authenticate = (req, res, next) => {

    next()
    // if (ENV !== 'production') {
    //     req.session.user = TEST_USER_ID // test user on development. (remember to run `TEST_USER_ON=true node server.js` if you want to use this user.)
    //     req.session.username = TEST_USER_NAME // test user on development. (remember to run `TEST_USER_ON=true node server.js` if you want to use this user.)
    // }

    // if (req.session.user) {
    //     User.findById(req.session.user).then((user) => {
    //         if (!user) {
    //             return Promise.reject()
    //         } else {
    //             next()
    //         }
    //     }).catch((error) => {
    //         res.status(401).send("Unauthorized")
    //     })
    // } else {
    //     res.status(401).send("Unauthorized")
    // }
}

const isMongoError = (error) => { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

module.exports = {
    mongoChecker: mongoChecker,
    authenticate: authenticate,
    isMongoError: isMongoError
}