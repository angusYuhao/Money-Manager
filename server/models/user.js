'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const {StockEntrySchema} = require('./investments');
const { SpendingsSchema } = require("./spendings");
const { RecommendationSchema } = require("./recommendation");
const { postSchema } = require('./posts.js');

// Making a Mongoose model a little differently: a Mongoose Schema
// Allows us to add additional functionality.
const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 1,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 4,
	},
	userLevel: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	occupation: {
		type: String,
		required: false,
	},
	gender: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	birthday: {
		type: String,
		required: true,
	},
	salary: {
		type: Number,
		required: false,
	},
	accountName: {
		type: String,
		required: false,
	},
	accountNumber: {
		type: String,
		required: false,
	},
	investmentCurrency: {
		type: String,
		required: false,
	},
	bio: {
		type: String,
		required: false,
	},
	FAName: {
		type: String
	},
	FAIntro: {
		type: String
	},
	FAFields: {
		type: String
	},
	FAPoints: {
		type: Number
	},
	spendings: [SpendingsSchema],
	spendings_categories: {
		type: [String],
		default: ["Food", "Personal", "Transit", "Home"]
  	},
  	investments: [StockEntrySchema],
	userFollows: [String],
	userPosts: [Number],
	userUpvotedPosts: [Number],
	userDownvotedPosts: [Number],
	userSavedPosts: [Number],
	userFollowers: [String],
	userRecommendations: [RecommendationSchema]
})

// An example of Mongoose middleware.
// This function will run immediately prior to saving the document
// in the database.
UserSchema.pre('save', function (next) {
	const user = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

// A static method on the document model.
// Allows us to find a User document by comparing the hashed password
//  to a given one, for example when logging in.
UserSchema.statics.findByUserNamePassword = function (username, password) {
	const User = this // binds this to the User model
	
	// First find the user by their email
	return User.findOne({ username: username }).then((user) => {
		if (!user) {
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
					reject()
				}
			})
		})
	})
}

const User = mongoose.model('User', UserSchema);

module.exports = { User };