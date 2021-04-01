const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    "Date": String,
    "Amount": String,
    "Description": String,
    "Category": String
})

const TransactionsSchema = new mongoose.Schema({
    "Transactions": [TransactionSchema],
    "Projected Spendings": Number
})

const SpendingsByMonthSchema = new mongoose.Schema({
    "Month": String,
    "Data": [TransactionsSchema]
})

const SpendingsSchema = new mongoose.Schema({
    "Year": String,
    "Data": [SpendingsByMonthSchema]
})

// const Spendings = mongoose.model('Spendings', SpendingsSchema);  
module.exports = { SpendingsSchema };  