'use strict'

const mongoose = require('mongoose');

const FAInfoSchema = new mongoose.Schema({
	author: {
		type: String,
		required: true,
		minlength: 1,
		unique: true,
	},
	firstname: {
		type: String,
		required: true,
		minlength: 1,
		unique: false,
	},
	lastname: {
		type: String,
		required: true,
		minlength: 1,
		unique: false,
	},
	intro: {
		type: String,
		required: true,
		minlength: 1,
		unique: false,
	},
	fields: [String],
	points: {
		type: Number,
		required: true,
		unique: false,
	}
})

const FAInfo = mongoose.model('FAInfo', FAInfoSchema);

module.exports = { FAInfo };