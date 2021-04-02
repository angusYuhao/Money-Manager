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
const { FAInfo } = require("./models/FAInfo");
const { Post } = require("./models/posts");

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
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

app.get('/spendings/transactions', async (req, res) => {
	res.sendStatus(200)
})

app.delete('/spendings/transaction', async (req, res) => {
   res.sendStatus(200)
})

/**************************
 ROUTES FOR COMMUNITY
 *************************/ 

 // get all posts
 app.get('/community/posts', async (req, res) => {

    // check mongoose connection
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('internal server error')
		return
	}

    try {
        const allPosts = await Post.find()
        console.log(allPosts)
        res.send(allPosts)
    }
    catch(error) {
        log(error)
		res.status(500).send("internal server error")
    }
 })

 // get posts by username
 app.get('/community/posts/:username', async (req, res) => {

    const targetUsername = req.params.username

    // check mongoose connection
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('internal server error')
		return
	}

    try {
        const postsByUsername = await Post.find({ username: targetUsername })
        if (!postsByUsername) {
            res.status(404),send("resouce not found")
        }
        else {
            res.send(postsByUsername)
        }
    }
    catch(error) {
        log(error)
		res.status(500).send("internal server error")
    }
 })

 // add new post
 app.post('/community/posts', async (req, res) => {

    // check mongoose connection
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('internal server error')
		return
	}

    const newPost = new Post({
        postID: req.body.postID,
        author: req.body.author,
        authorUsertype: req.body.authorUsertype,
        title: req.body.title,
        category: req.body.category,
        content: req.body.content,
        numUpvotes: req.body.numUpvotes,
        numDownvotes: req.body.numDownvotes,
        comments: []
    })

    console.log("im here", newPost)

    try{
        const result = await newPost.save()
        res.status(200).send(result)
    }
    catch(error) {
        log(error)
        if (isMongoError(error)) {
            res.status(500).send("internal server error")
        }
        else {
            res.status(400).send("bad request")
        }
    }
 })

 // delete a post
 app.delete('/community/posts/:postID', async (req, res) => {

    const targetPostID = req.params.postID

    console.log("delete id:", targetPostID)

    // check mongoose connection
	if (mongoose.connection.readyState != 1) {
		log('mongoose connection issue!')
		res.status(500).send('internal server error')
	}

    try {
        let targetPost = await Post.findOneAndDelete({ postID: targetPostID })
        // targetPost = Post.find()
        if (!targetPost) {
            res.status(404).send('resource not found')
        }
        else {
            res.send(targetPost)
        }
    }
    catch(error) {
        log(error)
		res.status(500).send('internal server error')
    }
 })

 // edit the post (upvotes and downvotes)
 /*
[
  { "op": "replace", "path": "/numUpvotes", "value": 4 },
  { "op": "replace", "path": "/numDownvotes", "value": 5 },
  ...
]
*/
 app.patch('/community/posts/:postID', async (req, res) => {

    const targetPostID = req.params.postID

    console.log("in patch", targetPostID)

    // check mongoose connection
	if (mongoose.connection.readyState != 1) {
		log('mongoose connection issue!')
		res.status(500).send('internal server error')
	}

    // Find the fields to update and their values.
	const fieldsToUpdate = {}
	req.body.map((change) => {
		const propertyToChange = change.path.substr(1) // getting rid of the '/' character
		fieldsToUpdate[propertyToChange] = change.value
	})

    // Update the student by their id.
	try {
		const retPost = await Post.findOneAndUpdate({postID: targetPostID}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false})
		if (!retPost) {
			res.status(404).send('Resource not found')
		} else {   
			res.send(retPost)
		}
	} catch (error) {
		log(error)
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // bad request for changing the student.
		}
	}
 })

 // add new comment to a post
 app.post('/community/posts/:postID', async (req, res) => {

    const targetPostID = req.params.postID

    console.log(targetPostID)

    // check mongoose connection
	if (mongoose.connection.readyState != 1) {
		log('mongoose connection issue!')
		res.status(500).send('internal server error')
	}

    try {
        let targetPost = await Post.find({ postID: targetPostID })
        if (!targetPost) {
            res.status(404).send('resouce not found')
        }
        else {
            console.log("check", req.body.commenter)
            console.log("check", req.body.commentContent)
            console.log("check1", targetPost)
            let ret = await targetPost[0].comments.unshift({ commenter: req.body.commenter, commentContent: req.body.commentContent })
            ret = await targetPost[0].save()
            let comment = targetPost[0].comments[0]
            res.status(200).send(comment)
        }
    }
    catch(error) {
        log(error)
		if (isMongoError(error)) {
			res.status(500).send('internal server error')
		}
		else {
			res.status(400).send('bad request')
		}
    }
 })


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})
