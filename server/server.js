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

// get the year index from the year 
function getIndexFromYear(year, arr) {
    let index = undefined
    arr.map((yearObj, i) => {
        const yearFromObj = yearObj["Year"]
        if (yearFromObj == year) index = i
    })
    return index
}

// get the month index from the month
function getIndexFromMonth(month, arr) {
    let index = undefined
    arr.map((yearObj, i) => {
        const monthFromObj = yearObj["Month"]
        if (monthFromObj == month) index = i
    })
    return index
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

// gets the entire spendings data as well as user defined categories 
app.get('/spendings/transactions', async (req, res) => {

    const username = "user"
    const password = "user"

    try {
        const user = await User.findByUserNamePassword(username, password)
        res.send({ spendings: user.spendings, categories: user.spendings_categories })
    }
    
    catch (error) {
        res.status(400).send()
    }

})

// adds a new user defined category to the database 
app.post('/spendings/categories', async (req, res) => {

    const username = "user"
    const password = "user"
    const newCategory = req.body.newCategory

    try {
        const user = await User.findByUserNamePassword(username, password)
        // only add to database if it's not a duplicate of existing category
        if (!user.spendings_categories.includes(newCategory)) {
            user.spendings_categories.push(newCategory)
            const updatedCategories = await user.save()
            res.send(updatedCategories.spendings_categories)
        }
        else {
            res.status(400).send()
        }
    }

    catch (error) {
        res.status(400).send()
    }

})

// deletes a new user defined category from the database 
app.delete('/spendings/categories', async (req, res) => {

    const username = "user"
    const password = "user"
    const deleteCategory = req.body.deleteCategory

    try {
        const user = await User.findByUserNamePassword(username, password)
        user.spendings_categories.pull(deleteCategory)
        const updatedCategories = await user.save()
        res.send(updatedCategories.spendings_categories)
    }

    catch (error) {
        res.status(400).send()
    }

})

// adds a new transaction to a specific year and month sheet 
app.post('/spendings/transaction/:yearIndex/:monthIndex', async (req, res) => {

    const username = "user"
    const password = "user"

    const yearIndex = req.params.yearIndex
    const monthIndex = req.params.monthIndex
    const newTransaction = req.body

    try {
        const user = await User.findByUserNamePassword(username, password)
        user.spendings[yearIndex]["Data"][monthIndex]["Data"]["Transactions"].unshift(newTransaction)
        const updatedSpendings = await user.save()
        res.send(updatedSpendings.spendings[yearIndex]["Data"][monthIndex]["Data"]["Transactions"])
    }

    catch (error) {
        res.status(400).send()
    }

})

// modifies a transaction from a specific year and month sheet 
app.patch('/spendings/transaction/:yearIndex/:monthIndex', async (req, res) => {

    const username = "user"
    const password = "user"

    const yearIndex = req.params.yearIndex
    const monthIndex = req.params.monthIndex
    const editTransaction = req.body
    editTransaction._id = mongoose.Types.ObjectId(editTransaction._id)

    try {
        const user = await User.findByUserNamePassword(username, password)
        const index = user.spendings[yearIndex]["Data"][monthIndex]["Data"]["Transactions"].findIndex(t => parseInt(t._id) == parseInt(editTransaction._id))
        user.spendings[yearIndex]["Data"][monthIndex]["Data"]["Transactions"][index] = editTransaction
        const updatedSpendings = await user.save()
        res.send(updatedSpendings.spendings[yearIndex]["Data"][monthIndex]["Data"]["Transactions"])
    }

    catch (error) {
        res.status(400).send()
    }

})

// deletes a transaction from a specific year and month sheet 
app.delete('/spendings/transaction/:yearIndex/:monthIndex', async (req, res) => {

    const username = "user"
    const password = "user"

    const yearIndex = req.params.yearIndex
    const monthIndex = req.params.monthIndex
    const deleteTransaction = req.body
    const _id = mongoose.Types.ObjectId(deleteTransaction._id)

    try {
        const user = await User.findByUserNamePassword(username, password)
        user.spendings[yearIndex]["Data"][monthIndex]["Data"]["Transactions"].pull(_id)
        const updatedSpendings = await user.save()
        res.send(updatedSpendings.spendings[yearIndex]["Data"][monthIndex]["Data"]["Transactions"])
    }

    catch (error) {
        res.status(400).send()
    }

})

// adds a new sheet for the spendings, year and month specified in body 
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
            user.spendings.push(newObj)
        }

        const yearIndex = getIndexFromYear(year, user.spendings)

        // if attempting to create an exisiting month/year combination, return 
        if (checkIfInArray(month, user.spendings[yearIndex]["Data"], "Month")) {
            console.log("Month/Year already exists!")
            res.status(201).send(user.spendings)
        }

        // create new object for the month 
        else {
            let newObj = new Object()
            newObj["Month"] = month
            newObj["Data"] = new Object()
            user.spendings[yearIndex]["Data"].push(newObj)
        }

        const monthIndex = getIndexFromMonth(month, user.spendings[yearIndex]["Data"])

        user.spendings[yearIndex]["Data"][monthIndex]["Data"]["Transactions"] = []
        user.spendings[yearIndex]["Data"][monthIndex]["Data"]["Projected Spendings"] = projectedSpendings

        const updatedSpendings = await user.save()
        res.send(updatedSpendings.spendings)

    }

    catch (error) {
        res.status(400).send()
    }
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})