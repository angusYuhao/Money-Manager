/*Investments Models */
//references:
//https://stackoverflow.com/questions/33557730/mongoose-float-values
const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

let SchemaTypes = mongoose.Schema.Types;


const StockEntrySchema = new mongoose.Schema({
    Name: String,
    Quantity: Number,
    Price: SchemaTypes.Double,
    AverageCost: SchemaTypes.Double,
    MarketValue: SchemaTypes.Double,
    BookCost:SchemaTypes.Double,
    GainLoss:SchemaTypes.Double,
});

const StockEntry = mongoose.model('StockEntry', StockEntrySchema);

module.exports = { StockEntry };