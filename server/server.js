/* server.js for react-express-authentication */
"use strict"
const log = console.log

const env = process.env.NODE_ENV // read the environment variable (will be 'production' in production mode)

const express = require("express")
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json());

// enable cors if not in production 
const cors = require('cors')
if (env !== 'production') { app.use(cors()) }

const { ObjectID } = require('mongodb')
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

const { User } = require("./models/user");

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

function checkIfInArray(key, arr, type) {
    let exists = false
    arr.map(obj => {
      if (obj[type] == key) exists = true
    })
    return exists
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

/**************************
 ROUTES FOR USERS
 *************************/

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findByUserNamePassword(username, password)
        .then(user => {
            // Add the user's id to the session.
            // We can check later if this exists to ensure we are logged in.
            req.user = user._id;
            req.username = user.username; // we will later send the email to the browser when checking if someone is logged in through GET /check-session (we will display it on the frontend dashboard. You could however also just send a boolean flag).
            res.send({ currentUser: user.username });
        })
        .catch(error => {
            res.status(400).send()
        });
});

// User API Route
app.post("/signup", async (req, res) => {
    log(req.body)

    // Create a new user
    const user = new User({
        username: req.body.username,
        password: req.body.password
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
/**************************
 ROUTES FOR SPENDINGS
 *************************/

app.get('/spendings/transactions', async (req, res) => {

    const username = "user"
    const password = "user"

    try {
        const user = await User.findByUserNamePassword(username, password)
        res.send(user.spendings)
    }

    catch (error) {
        res.status(400).send()
    }

})

app.post('/spendings/sheet', async (req, res) => {

    const username = "user"
    const password = "user"

    const month = req.body.month
    const year = req.body.year
    const projectedSpendings = req.body.projectedSpendings

    try {

        const user = await User.findByUserNamePassword(username, password)
        
        // create new object for the year if the year doesn't exist
        if (!checkIfInArray(year, user.spendings, "Year")) {
            let newObj = new Object()
            newObj["Year"] = year
            newObj["Data"] = []
            user.spendings.unshift(newObj)
        }    

        // if attempting to create an exisiting month/year combination, return 
        if (checkIfInArray(month, user.spendings[0]["Data"], "Month")) {
            console.log("Month/Year already exists!")
            res.status(201).send(user.spendings)
        }

        // create new object for the month 
        else {
            let newObj = new Object()
            newObj["Month"] = month
            newObj["Data"] = new Object()
            user.spendings[0]["Data"].unshift(newObj)
        }

        user.spendings[0]["Data"][0]["Data"]["Transactions"] = []
        user.spendings[0]["Data"][0]["Data"]["Projected Spendings"] = projectedSpendings
    
        const updatedSpendings = await user.save()
        res.send(updatedSpendings.spendings)

    }

    catch (error) {
        res.status(400).send()
    }
})

app.delete('/spendings/transaction', async (req, res) => {
    res.sendStatus(200)
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})