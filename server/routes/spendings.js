const routes = require('express').Router()
const ENV = "development" // used for setting session info manually when testing

const { mongoose } = require("../db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

const { User } = require("../models/user");

function sortDataByKey(a, b) {
    // keys can be either month or year, want the latest to be on top 
    const keyA = "Year" in a ? parseInt(a["Year"]) : parseInt(a["Month"])
    const keyB = "Year" in b ? parseInt(b["Year"]) : parseInt(b["Month"])
    if (keyA > keyB) return -1
    else return 1
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

// gets the entire spendings data as well as user defined categories 
routes.get('/transactions', async (req, res) => {

    if (ENV == "development") req.session.user = '606748daddb69e65d498df46'
    const userID = req.session.user

    try {
        const user = await User.findById(userID)
        res.send({ spendings: user.spendings, categories: user.spendings_categories })
    }

    catch (error) {
        res.status(400).send()
    }

})

// adds a new user defined category to the database 
routes.post('/categories', async (req, res) => {

    if (ENV == "development") req.session.user = '606748daddb69e65d498df46'
    const userID = req.session.user
    const newCategory = req.body.newCategory

    try {
        const user = await User.findById(userID)
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
routes.delete('/categories', async (req, res) => {

    if (ENV == "development") req.session.user = '606748daddb69e65d498df46'
    const userID = req.session.user
    const deleteCategory = req.body.deleteCategory

    try {
        const user = await User.findById(userID)
        user.spendings_categories.pull(deleteCategory)
        const updatedCategories = await user.save()
        res.send(updatedCategories.spendings_categories)
    }

    catch (error) {
        res.status(400).send()
    }

})

// adds a new transaction to a specific year and month sheet 
routes.post('/transaction/:yearIndex/:monthIndex', async (req, res) => {

    if (ENV == "development") req.session.user = '606748daddb69e65d498df46'
    const userID = req.session.user

    const yearIndex = req.params.yearIndex
    const monthIndex = req.params.monthIndex
    const newTransaction = req.body

    try {
        const user = await User.findById(userID)
        user.spendings[yearIndex]["Data"][monthIndex]["Data"]["Transactions"].push(newTransaction)
        user.spendings.map((yearObj, index) => {
            user.spendings[index]["Data"].sort(sortDataByKey)
        })
        user.spendings.sort(sortDataByKey)
        const updatedSpendings = await user.save()
        res.send({ transaction: updatedSpendings.spendings[yearIndex]["Data"][monthIndex]["Data"]["Transactions"], entire_data: updatedSpendings.spendings })
    }

    catch (error) {
        res.status(400).send()
    }

})

// modifies a transaction from a specific year and month sheet 
routes.patch('/transaction/:yearIndex/:monthIndex', async (req, res) => {

    if (ENV == "development") req.session.user = '606748daddb69e65d498df46'
    const userID = req.session.user

    const yearIndex = req.params.yearIndex
    const monthIndex = req.params.monthIndex
    const editTransaction = req.body
    editTransaction._id = mongoose.Types.ObjectId(editTransaction._id)

    try {
        const user = await User.findById(userID)
        const index = user.spendings[yearIndex]["Data"][monthIndex]["Data"]["Transactions"].findIndex(t => t._id.equals(editTransaction._id))
        user.spendings[yearIndex]["Data"][monthIndex]["Data"]["Transactions"][index] = editTransaction
        const updatedSpendings = await user.save()
        res.send({ transaction: updatedSpendings.spendings[yearIndex]["Data"][monthIndex]["Data"]["Transactions"], entire_data: updatedSpendings.spendings })
    }

    catch (error) {
        res.status(400).send()
    }

})

// deletes a transaction from a specific year and month sheet 
routes.delete('/transaction/:yearIndex/:monthIndex', async (req, res) => {

    if (ENV == "development") req.session.user = '606748daddb69e65d498df46'
    const userID = req.session.user

    const yearIndex = req.params.yearIndex
    const monthIndex = req.params.monthIndex
    const deleteTransaction = req.body
    const _id = mongoose.Types.ObjectId(deleteTransaction._id)

    try {
        const user = await User.findById(userID)
        user.spendings[yearIndex]["Data"][monthIndex]["Data"]["Transactions"].pull(_id)
        user.spendings.map((yearObj, index) => {
            user.spendings[index]["Data"].sort(sortDataByKey)
        })
        user.spendings.sort(sortDataByKey)
        const updatedSpendings = await user.save()
        res.send({ transaction: updatedSpendings.spendings[yearIndex]["Data"][monthIndex]["Data"]["Transactions"], entire_data: updatedSpendings.spendings })
    }

    catch (error) {
        res.status(400).send()
    }

})

// deletes a sheet for the spendings
routes.delete('/sheet/:yearIndex/:monthIndex', async (req, res) => {
    
    if (ENV == "development") req.session.user = '606748daddb69e65d498df46'
    const userID = req.session.user

    const yearIndex = req.params.yearIndex
    const monthIndex = req.params.monthIndex

    try {

        const user = await User.findById(userID)
        user.spendings[yearIndex]["Data"].splice(monthIndex, 1)
        if (user.spendings[yearIndex]["Data"].length == 0) {
            user.spendings.splice(yearIndex, 1)
        }
        user.spendings.map((yearObj, index) => {
            user.spendings[index]["Data"].sort(sortDataByKey)
        })
        user.spendings.sort(sortDataByKey)
        const updatedSpendings = await user.save()
        res.send(updatedSpendings.spendings)

    }

    catch (error) {
        res.status(400).send()
    }

})

// adds a new sheet for the spendings, year and month specified in body 
routes.post('/sheet', async (req, res) => {

    if (ENV == "development") req.session.user = '606748daddb69e65d498df46'
    const userID = req.session.user

    const month = req.body.month
    const year = req.body.year
    const projectedSpendings = req.body.projectedSpendings

    try {

        const user = await User.findById(userID)

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
        user.spendings.map((yearObj, index) => {
            user.spendings[index]["Data"].sort(sortDataByKey)
        })
        user.spendings.sort(sortDataByKey)
        const updatedSpendings = await user.save()
        res.send(updatedSpendings.spendings)

    }

    catch (error) {
        res.status(400).send()
    }

})

module.exports = routes