/* server.js for react-express-authentication */
"use strict"
const log = console.log

const env = process.env.NODE_ENV // read the environment variable (will be 'production' in production mode)

const { localMongoURI } = require('./db/config.js');
const express = require("express")
const app = express()
const MongoStore = require('connect-mongo') // to store session information on the database in production
const bodyParser = require('body-parser')
app.use(bodyParser.json());

// enable cors if not in production 
const cors = require('cors')
if (env !== 'production') { app.use(cors()) }

// express-session for managing user sessions
const session = require("express-session");
const { ObjectID } = require('mongodb')
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

const { User } = require("./models/user");

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

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

/*** Session handling **************************************/
// Create a session and session cookie
app.use(
    session({
        secret: process.env.SESSION_SECRET || "our hardcoded secret", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        },
        // store the sessions on the database in production
        store: env === 'production' ? MongoStore.create({
                    mongoUrl: process.env.MONGODB_URI || localMongoURI
        }) : null
    })
);

/**************************
 ROUTES FOR USERS
 *************************/ 

app.post("/users/login", (req, res) => {
    const username = req.body.userName;
    const password = req.body.password;
    console.log(req.body);
    console.log("username from login: ", username);
    console.log("password from login: ", password);

    User.findByUserNamePassword(username, password)
        .then(user => {
            // Add the user's id to the session.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            req.session.username = user.username; // we will later send the email to the browser when checking if someone is logged in through GET /check-session (we will display it on the frontend dashboard. You could however also just send a boolean flag).
            console.log(req.session);
            res.send({ currentUser: user });
        })
        .catch(error => {
            console.log("did not log in");
            res.status(400).send("hereeeee")
        });
 });

 // User API Route
app.post("/users/signup", mongoChecker, async (req, res) => {
    log(req.body)

    // Create a new user
    const user = new User({
        username: req.body.userName,
        password: req.body.confirmPassword,
        userLevel: req.body.userLevel,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        occupation: req.body.occupation,
        gender: req.body.gender,
        email: req.body.email,
        birthday: req.body.birthday,
        salary: req.body.salary,
    })

    try {
        // Save the user
        const newUser = await user.save()
        res.send(newUser)
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

// A route to check if a user is logged in on the session
app.get("/users/check-session", (req, res) => {
    console.log("session user: ", req.session)
    if (req.session.user) {
        res.send({ currentUser: req.session.username });
    } else {
        res.status(401).send("ERRORRRRR");
    }
});
/**************************
 ROUTES FOR SPENDINGS
 *************************/ 

app.get('/spendings/transactions', async (req, res) => {
	res.sendStatus(200)
})

app.delete('/spendings/transaction', async (req, res) => {
   res.sendStatus(200)
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})