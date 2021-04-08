const mongoose = require('mongoose')

const RecommendationSchema = new mongoose.Schema({
    "FAName": String,
    "Recommendation Action": String,
    "Recommendation Text": String,
})

module.exports = { RecommendationSchema };  