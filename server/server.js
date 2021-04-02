/* server.js for react-express-authentication */
"use strict"
const log = console.log

const env = process.env.NODE_ENV // read the environment variable (will be 'production' in production mode)

const { localMongoURI } = require('./db/config.js');
const express = require("express")
const app = express()

const MongoStore = require('connect-mongo') // to store session information on the database in production
const bodyParser = require('body-parser')
app.use(bodyParser.json());

// enable cors if not in production 
const cors = require('cors')
if (env !== 'production') { app.use(cors()) }

// express-session for managing user sessions
const session = require("express-session");
const { ObjectID } = require('mongodb')
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

const { User } = require("./models/user");
const { FAInfo } = require("./models/FAInfo");
const { Post } = require("./models/posts");

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
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

/*** Session handling **************************************/
// Create a session and session cookie
app.use(
    session({
        secret: process.env.SESSION_SECRET || "our hardcoded secret", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        },
        // store the sessions on the database in production
        store: env === 'production' ? MongoStore.create({
                    mongoUrl: process.env.MONGODB_URI || localMongoURI
        }) : null
    })
);

/**************************
 ROUTES FOR USERS
 *************************/

app.post("/users/login", (req, res) => {
    const username = req.body.userName;
    const password = req.body.password;
    console.log(req.body);
    console.log("username from login: ", username);
    console.log("password from login: ", password);

    User.findByUserNamePassword(username, password)
        .then(user => {
            // Add the user's id to the session.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            req.session.username = user.username; // we will later send the email to the browser when checking if someone is logged in through GET /check-session (we will display it on the frontend dashboard. You could however also just send a boolean flag).
            console.log(req.session);
            res.send({ currentUser: user });
        })
        .catch(error => {
            console.log("did not log in");
            res.status(400).send("hereeeee")
        });
});

 // A route to logout a user
app.get("/users/logout", (req, res) => {
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});
 // User API Route
app.post("/users/signup", mongoChecker, async (req, res) => {
    log(req.body)

    // Create a new user
    const user = new User({
        username: req.body.userName,
        password: req.body.confirmPassword,
        userLevel: req.body.userLevel,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        occupation: req.body.occupation,
        gender: req.body.gender,
        email: req.body.email,
        birthday: req.body.birthday,
        salary: req.body.salary,
        bio: req.body.bio,
        FAName: req.body.userName,
        FAIntro: req.body.FAIntro,
        FAFields: req.body.FAFields,
        FAPoints: req.body.FAPoints
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

// A route to check if a user is logged in on the session
app.get("/users/check-session", (req, res) => {
    console.log("session user: ", req.session)
    if (req.session.user) {
        res.send({ currentUser: req.session.username });
    } else {
        res.status(401).send("ERRORRRRR");
    }
});

/**************************
 ROUTES FOR SPENDINGS
 *************************/

// gets the entire spendings data as well as user defined categories 
app.get('/spendings/transactions', async (req, res) => {

    const username = "user"
    const password = "user"

    try {
        const user = await User.findByUserNamePassword(username, password)
        res.send({ spendings: user.spendings, categories: user.spendings_categories })
    }
    
    catch (error) {
        res.status(400).send()
    }

})

// adds a new user defined category to the database 
app.post('/spendings/categories', async (req, res) => {

    const username = "user"
    const password = "user"
    const newCategory = req.body.newCategory

    try {
        const user = await User.findByUserNamePassword(username, password)
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
app.delete('/spendings/categories', async (req, res) => {

    const username = "user"
    const password = "user"
    const deleteCategory = req.body.deleteCategory

    try {
        const user = await User.findByUserNamePassword(username, password)
        user.spendings_categories.pull(deleteCategory)
        const updatedCategories = await user.save()
        res.send(updatedCategories.spendings_categories)
    }

    catch (error) {
        res.status(400).send()
    }

})

// adds a new transaction to a specific year and month sheet 
app.post('/spendings/transaction/:yearIndex/:monthIndex', async (req, res) => {

    const username = "user"
    const password = "user"

    const yearIndex = req.params.yearIndex
    const monthIndex = req.params.monthIndex
    const newTransaction = req.body

    try {
        const user = await User.findByUserNamePassword(username, password)
        user.spendings[yearIndex]["Data"][monthIndex]["Data"]["Transactions"].unshift(newTransaction)
        const updatedSpendings = await user.save()
        res.send(updatedSpendings.spendings[yearIndex]["Data"][monthIndex]["Data"]["Transactions"])
    }

    catch (error) {
        res.status(400).send()
    }

})

// modifies a transaction from a specific year and month sheet 
app.patch('/spendings/transaction/:yearIndex/:monthIndex', async (req, res) => {

    const username = "user"
    const password = "user"

    const yearIndex = req.params.yearIndex
    const monthIndex = req.params.monthIndex
    const editTransaction = req.body
    editTransaction._id = mongoose.Types.ObjectId(editTransaction._id)

    try {
        const user = await User.findByUserNamePassword(username, password)
        const index = user.spendings[yearIndex]["Data"][monthIndex]["Data"]["Transactions"].findIndex(t => parseInt(t._id) == parseInt(editTransaction._id))
        user.spendings[yearIndex]["Data"][monthIndex]["Data"]["Transactions"][index] = editTransaction
        const updatedSpendings = await user.save()
        res.send(updatedSpendings.spendings[yearIndex]["Data"][monthIndex]["Data"]["Transactions"])
    }

    catch (error) {
        res.status(400).send()
    }

})

// deletes a transaction from a specific year and month sheet 
app.delete('/spendings/transaction/:yearIndex/:monthIndex', async (req, res) => {

    const username = "user"
    const password = "user"

    const yearIndex = req.params.yearIndex
    const monthIndex = req.params.monthIndex
    const deleteTransaction = req.body
    const _id = mongoose.Types.ObjectId(deleteTransaction._id)

    try {
        const user = await User.findByUserNamePassword(username, password)
        user.spendings[yearIndex]["Data"][monthIndex]["Data"]["Transactions"].pull(_id)
        const updatedSpendings = await user.save()
        res.send(updatedSpendings.spendings[yearIndex]["Data"][monthIndex]["Data"]["Transactions"])
    }

    catch (error) {
        res.status(400).send()
    }

})

// adds a new sheet for the spendings, year and month specified in body 
app.post('/spendings/sheet', async (req, res) => {

    const username = "user"
    const password = "user"

    const month = req.body.month
    const year = req.body.year
    const projectedSpendings = req.body.projectedSpendings

    try {

        const user = await User.findByUserNamePassword(username, password)

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

        const updatedSpendings = await user.save()
        res.send(updatedSpendings.spendings)

    }

    catch (error) {
        res.status(400).send()
    }
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
