'use strict'

const mongoose = require('mongoose');

const FAInfoSchema = new mongoose.Schema({
	FAName: {
		type: String,
		required: true,
		minlength: 1,
		unique: true,
	},
	FAFirstname: {
		type: String,
		required: true,
		minlength: 1,
		unique: false,
	},
	FALastname: {
		type: String,
		required: true,
		minlength: 1,
		unique: false,
	},
	FAIntro: {
		type: String,
		required: true,
		minlength: 1,
		unique: false,
	},
	FAFields: {
		type: String,
		required: true,
		minlength: 1,
		unique: false,
	},
	FAPoints: {
		type: Number,
		required: true,
		unique: false,
	}
})

const FAInfo = mongoose.model('FAInfo', FAInfoSchema);

module.exports = { FAInfo };