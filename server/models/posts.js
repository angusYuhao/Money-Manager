'use strict'

const { Timestamp } = require('bson');
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

    commenter: {
		type: String,
		required: true,
		minlength: 1,
		unique: false,
	},
    commentContent: {
        type: String,
		required: true,
		minlength: 1,
		unique: false,
    }

})

const postSchema = new mongoose.Schema({
    postID: {
        type: Number,
        required: true,
		minlength: 1,
		unique: true,
    },
	author: {
		type: String,
		required: true,
		minlength: 1,
		unique: false,
	},
	authorUsertype: {
        type: String,
        required: true,
		minlength: 2,
		unique: false,
    },
    title: {
        type: String,
        required: true,
		minlength: 1,
		unique: false,
    },
    category: {
        type: String,
        required: true,
		minlength: 1,
		unique: false,
    },
    content: {
        type: String,
        required: true,
		minlength: 1,
		unique: false,
    },
    numUpvotes: {
        type: Number,
        required: true,
		minlength: 1,
		unique: false,
    },
    numDownvotes: {
        type: Number,
        required: true,
		minlength: 1,
		unique: false,
    },
    comments: [commentSchema]
})

const Post = mongoose.model('Post', postSchema);

module.exports = { Post, postSchema };