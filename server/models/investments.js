/*Investments Models */
//references:
//https://stackoverflow.com/questions/33557730/mongoose-float-values
const mongoose = require('mongoose');
// require('mongoose-double')(mongoose);

const StockEntrySchema = new mongoose.Schema({
    "Name": String,
    "Quantity": Number,
    "Price": Number,
    "Average Cost": Number,
    "Market Value": Number,
    "Book Cost":Number,
    "Gain/Loss":Number,
});

// const StockEntry = mongoose.model('StockEntry', StockEntrySchema);

module.exports = { StockEntrySchema };