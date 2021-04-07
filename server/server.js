/* server.js for react-express-authentication */
"use strict"
const log = console.log

const env = process.env.NODE_ENV // read the environment variable (will be 'production' in production mode)

const { localMongoURI } = require('./db/config.js');
const express = require("express")
const path = require('path')

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
        accountName: req.body.accountName,
        accountNumber: req.body.accountNumber,
        investmentCurrency: req.body.investmentCurrency,
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

/// a PATCH route for making *specific* changes to a resource.
// modifies profile of user by username
app.patch('/users/profile/:username', async (req, res) => {
    
    const username = req.params.username;

    console.log("in patch", username)

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
		const updateProfile = await User.findOneAndUpdate({username: username}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false})
		if (!updateProfile) {
			res.status(404).send('Resource not found')
		} else {   
			res.send(updateProfile);
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

// A route to check if a user is logged in on the session
app.get("/users/check-session", (req, res) => {
    console.log("session user: ", req.session)
    if (req.session.user) {
        res.send({ currentUser: req.session.username });
    } else {
        res.status(401).send("ERRORRRRR");
    }
});

// add a post to user's profile userPosts
app.post("/users/profile/userPosts/:username", async (req, res) => {

    const targetUsername = req.params.username

    // check mongoose connection
	if (mongoose.connection.readyState != 1) {
		log('mongoose connection issue!')
		res.status(500).send('internal server error')
	}

    // const newPost = new Post({
    //     postID: req.body.postID,
    //     author: req.body.author,
    //     authorUsertype: req.body.authorUsertype,
    //     title: req.body.title,
    //     category: req.body.category,
    //     content: req.body.content,
    //     numUpvotes: req.body.numUpvotes,
    //     numDownvotes: req.body.numDownvotes,
    //     comments: []
    // })
    // console.log(req.body.postID)
    // console.log("im here!!!", newPost)

    try{
        let targetUser = await User.find({ username: targetUsername })
        if (!targetUser) {
            res.status(404).send("resource not found")
        }
        else {
            await targetUser[0].userPosts.unshift(req.body.postID)
            await targetUser[0].save()
            let ret = targetUser[0].userPosts[0]
            console.log("the ret value", ret)
            res.status(200).send("success")
        }
    }
    catch(error) {
        console.log(error)
        if (isMongoError(error)) {
            res.status(500).send("internal server error")
        }
        else {
            res.status(400).send("bad request")
        }
    }
})

// delete a post from user's profile userPosts
app.delete('/users/profile/userPosts/:username/:postID', async (req, res) => {

    const targetUsername = req.params.username
    const targetPostID = req.params.postID

    console.log("delete id:", targetPostID)
    console.log("target user:", targetUsername)

    // check mongoose connection
    if (mongoose.connection.readyState != 1) {
        log('mongoose connection issue!')
        res.status(500).send('internal server error')
    }

    try {
        let targetUser = await User.find({ username: targetUsername })
        if (!targetUser) {
            res.status(404).send("resource not found")
        }
        else {
            let newPosts = targetUser[0].userPosts.filter((ID) => ID != targetPostID)
            targetUser[0].userPosts = newPosts
            await targetUser[0].save()
            res.status(200).send(targetUser[0])
            // // let targetPost = await targetUser[0].userPosts.findOneAndDelete({ postID: targetPostID })
            // await targetUser[0]
            // if (!targetPost) {
            //     res.status(404).send("resource not found")
            // }
            // else {
            //     res.status(200).send(targetPost)
            // }
        }
    }
    catch(error) {
        log(error)
        res.status(500).send('internal server error')
    }
})

// add a post to user's profile userSavedPosts
app.post("/users/profile/userSavedPosts/:username", async (req, res) => {

    const targetUsername = req.params.username

    // check mongoose connection
	if (mongoose.connection.readyState != 1) {
		log('mongoose connection issue!')
		res.status(500).send('internal server error')
	}

    try{
        let targetUser = await User.find({ username: targetUsername })
        if (!targetUser) {
            res.status(404).send("resource not found")
        }
        else {
            await targetUser[0].userSavedPosts.unshift(req.body.postID)
            await targetUser[0].save()
            let ret = targetUser[0].userSavedPosts[0]
            console.log("the ret value", ret)
            res.status(200).send("success")
        }
    }
    catch(error) {
        console.log(error)
        if (isMongoError(error)) {
            res.status(500).send("internal server error")
        }
        else {
            res.status(400).send("bad request")
        }
    }
})

// delete a post from user's profile userSavedPosts
app.delete('/users/profile/userSavedPosts/:username/:postID', async (req, res) => {

    const targetUsername = req.params.username
    const targetPostID = req.params.postID

    console.log("delete id:", targetPostID)
    console.log("target user:", targetUsername)

    // check mongoose connection
    if (mongoose.connection.readyState != 1) {
        log('mongoose connection issue!')
        res.status(500).send('internal server error')
    }

    try {
        let targetUser = await User.find({ username: targetUsername })
        console.log("target user!!:", targetUsername)
        if (!targetUser) {
            res.status(404).send("resource not found")
        }
        else {
            let newPosts = targetUser[0].userSavedPosts.filter((ID) => ID != targetPostID)
            targetUser[0].userSavedPosts = newPosts
            await targetUser[0].save()
            res.status(200).send(targetUser[0])
        }
    }
    catch(error) {
        log(error)
        res.status(500).send('internal server error')
    }
})


// add a post to user's profile userUpvotedPosts
app.post("/users/profile/userUpvotedPosts/:username", async (req, res) => {

    const targetUsername = req.params.username

    // check mongoose connection
	if (mongoose.connection.readyState != 1) {
		log('mongoose connection issue!')
		res.status(500).send('internal server error')
	}

    try{
        let targetUser = await User.find({ username: targetUsername })
        if (!targetUser) {
            res.status(404).send("resource not found")
        }
        else {
            await targetUser[0].userUpvotedPosts.unshift(req.body.postID)
            await targetUser[0].save()
            let ret = targetUser[0].userUpvotedPosts[0]
            console.log("the ret value", ret)
            res.status(200).send("success")
        }
    }
    catch(error) {
        console.log(error)
        if (isMongoError(error)) {
            res.status(500).send("internal server error")
        }
        else {
            res.status(400).send("bad request")
        }
    }
})

// delete a post from user's profile userUpvotedPosts
app.delete('/users/profile/userUpvotedPosts/:username/:postID', async (req, res) => {

    const targetUsername = req.params.username
    const targetPostID = req.params.postID

    console.log("delete id:", targetPostID)
    console.log("target user:", targetUsername)

    // check mongoose connection
    if (mongoose.connection.readyState != 1) {
        log('mongoose connection issue!')
        res.status(500).send('internal server error')
    }

    try {
        let targetUser = await User.find({ username: targetUsername })
        console.log("target user!!:", targetUsername)
        if (!targetUser) {
            res.status(404).send("resource not found")
        }
        else {
            let newPosts = targetUser[0].userUpvotedPosts.filter((ID) => ID != targetPostID)
            targetUser[0].userUpvotedPosts = newPosts
            await targetUser[0].save()
            res.status(200).send(targetUser[0])
        }
    }
    catch(error) {
        log(error)
        res.status(500).send('internal server error')
    }
})


// add a post to user's profile userDownvotedPosts
app.post("/users/profile/userDownvotedPosts/:username", async (req, res) => {

    const targetUsername = req.params.username

    // check mongoose connection
	if (mongoose.connection.readyState != 1) {
		log('mongoose connection issue!')
		res.status(500).send('internal server error')
	}

    try{
        let targetUser = await User.find({ username: targetUsername })
        if (!targetUser) {
            res.status(404).send("resource not found")
        }
        else {
            await targetUser[0].userDownvotedPosts.unshift(req.body.postID)
            await targetUser[0].save()
            let ret = targetUser[0].userDownvotedPosts[0]
            console.log("the ret value", ret)
            res.status(200).send("success")
        }
    }
    catch(error) {
        console.log(error)
        if (isMongoError(error)) {
            res.status(500).send("internal server error")
        }
        else {
            res.status(400).send("bad request")
        }
    }
})

// delete a post from user's profile userDownvotedPosts
app.delete('/users/profile/userDownvotedPosts/:username/:postID', async (req, res) => {

    const targetUsername = req.params.username
    const targetPostID = req.params.postID

    console.log("delete id:", targetPostID)
    console.log("target user:", targetUsername)

    // check mongoose connection
    if (mongoose.connection.readyState != 1) {
        log('mongoose connection issue!')
        res.status(500).send('internal server error')
    }

    try {
        let targetUser = await User.find({ username: targetUsername })
        console.log("target user!!:", targetUsername)
        if (!targetUser) {
            res.status(404).send("resource not found")
        }
        else {
            let newPosts = targetUser[0].userDownvotedPosts.filter((ID) => ID != targetPostID)
            targetUser[0].userDownvotedPosts = newPosts
            await targetUser[0].save()
            res.status(200).send(targetUser[0])
        }
    }
    catch(error) {
        log(error)
        res.status(500).send('internal server error')
    }
})

// add a FA to user's profile userFollows
app.post("/users/profile/userFollows/:username", async (req, res) => {

    const targetUsername = req.params.username

    // check mongoose connection
	if (mongoose.connection.readyState != 1) {
		log('mongoose connection issue!')
		res.status(500).send('internal server error')
	}

    try{
        let targetUser = await User.find({ username: targetUsername })
        if (!targetUser) {
            res.status(404).send("resource not found")
        }
        else {
            await targetUser[0].userFollows.unshift(req.body.FAusername)
            await targetUser[0].save()
            let ret = targetUser[0].userFollows[0]
            console.log("the ret value", ret)
            res.status(200).send("success")
        }
    }
    catch(error) {
        console.log(error)
        if (isMongoError(error)) {
            res.status(500).send("internal server error")
        }
        else {
            res.status(400).send("bad request")
        }
    }
})

// delete a FA from user's profile userFollows
app.delete('/users/profile/userFollows/:username/:FAusername', async (req, res) => {

    const targetUsername = req.params.username
    const targetFAusername = req.params.FAusername

    console.log("delete FA:", targetFAusername)
    console.log("target user:", targetUsername)

    // check mongoose connection
    if (mongoose.connection.readyState != 1) {
        log('mongoose connection issue!')
        res.status(500).send('internal server error')
    }

    try {
        let targetUser = await User.find({ username: targetUsername })
        console.log("target user!!:", targetUsername)
        if (!targetUser) {
            res.status(404).send("resource not found")
        }
        else {
            let newFAs = targetUser[0].userFollows.filter((name) => name != targetFAusername)
            targetUser[0].userFollows = newFAs
            await targetUser[0].save()
            res.status(200).send(targetUser[0])
        }
    }
    catch(error) {
        log(error)
        res.status(500).send('internal server error')
    }
})


// add FAInfo into FAInfo database
app.post('/users/FAInfo', async (req, res) => {

    // check mongoose connection
    if (mongoose.connection.readyState != 1) {
        log('mongoose connection issue!')
        res.status(500).send('internal server error')
    }

    const newFAInfo = new FAInfo({
        FAName: req.body.FAName,
        FAFirstname: req.body.FAFirstname,
        FALastname: req.body.FALastname,
        FAIntro: req.body.FAIntro,
        FAFields: req.body.FAFields,
        FAPoints: req.body.FAPoints
    })

    console.log("=========", newFAInfo)

    try{
        const result = await newFAInfo.save()
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

/**************************
 ROUTES FOR INVESTMENTS
 *************************/ 
const { StockEntrySchema } = require('./models/investments')

// gets the user's stock entries
// GET /investments
app.get('/investments',async (req, res) => {
    if (mongoose.connection.readyState != 1) {  
        log('Issue with mongoose connection')  
        res.status(500).send('Internal server error')  
        return;  
    }    

    const username = "user"
    const pw = "user"

    // normal promise version
	User.findByUserNamePassword(username, pw).then((user) => {
        if(!user){
            res.status(400).send('User not found')
        }else{
            //just send the entire list of stocks
		    res.send(user.investments)
        }
	})
	.catch((error) => {
		log(error)
		res.status(500).send("Internal Server Error")
	})
})

// adds a stock entry
// POST /investments
app.post('/investments', async (req, res) => {
    if (mongoose.connection.readyState != 1) {  
        log('Issue with mongoose connection')  
        res.status(500).send('Internal server error')  
        return;  
    }   
    
    const username = "user";
    const pw = "user";

    //create new stock entry
    let stock_entry =  new Object()
    
    stock_entry["Name"]= req.body.Name,
    stock_entry["Quantity"]= req.body.Quantity,
    stock_entry["Price"]= req.body.Price,
    stock_entry["Average Cost"]= req.body["Average Cost"],
    stock_entry["Market Value"]= req.body["Market Value"],
    stock_entry["Book Cost"]= req.body["Book Cost"],
    stock_entry["Gain/Loss"]= req.body["Gain/Loss"],
    


    User.findByUserNamePassword(username, pw).then((user) => {
		if(!user){
            res.status(400).send('User not found')
        }else{
            //just send the entire list of stocks
            if( user.investments.some(item => item["Name"] === req.body.Name)){
                res.send("duplicate");
                return;
            }
		    user.investments.unshift(stock_entry);
            user.save().then((result) => {
				res.send(user.investments);
			}).catch((error) => {
				log(error) // log server error to the console, not to the client.
				if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
					res.status(500).send('Internal server error')
				} else {
					res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
				}
			})
        }
	})
})

// DELETE investments/<stock name>/
app.delete('/investments/:name', async (req, res) => {
    if (mongoose.connection.readyState != 1) {  
        log('Issue with mongoose connection')  
        res.status(500).send('Internal server error')  
        return;  
    }   
    const stockNameToDelete = req.params.name;
    
    const username = "user";
    const pw = "user";

    User.findByUserNamePassword(username, pw).then((user) => {
		if (!user) {
			res.status(404).send('User not found')  // could not find this restaurant
		} else {
			//save the one to delete such that you can return it later...or else it'll be gone!
			
            for(let i = 0; i< user.investments.length;i++){
                if(user.investments[i]["Name"] == stockNameToDelete){
                    let newStocksList = user.investments.filter(res => res._id != user.investments[i]._id);
                    user.investments = newStocksList;
                    user.save().then((result) => {
                        res.send(user.investments)
                    }).catch((error) => {
                        log(error) // log server error to the console, not to the client.
                        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
                            res.status(500).send('Internal server error')
                        } else {
                            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
                        }
                    })
                    
                }
            }
			
		}
	})
	.catch((error) => {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	})		
})

//PATCH investments/<old stock name>/
app.patch('/investments/:name', async (req, res) => {
    if (mongoose.connection.readyState != 1) {  
        log('Issue with mongoose connection')  
        res.status(500).send('Internal server error')  
        return;  
    }   
    const stockNameToEdit = req.params.name;    
    const username = "user";
    const pw = "user";
    const newStockEntry = req.body;
    newStockEntry._id = mongoose.Types.ObjectId(newStockEntry._id)
    console.log(newStockEntry);
    User.findByUserNamePassword(username, pw).then((user) => {
		if (!user) {
			res.status(404).send('User not found')  // could not find this restaurant
		} else {
            if( user.investments.some(item => item["Name"] === req.body.Name)){
                res.send("duplicate");
                return;
            }
            for(let i = 0; i< user.investments.length;i++){
                if(user.investments[i]["Name"] == stockNameToEdit){
                    let newStocksList = user.investments.filter(res => res._id != user.investments[i]._id);
                    newStocksList.splice(i, 0, newStockEntry);
                    user.investments = newStocksList;
                    user.save().then((result) => {
                        res.send(user.investments)
                    }).catch((error) => {
                        log(error) // log server error to the console, not to the client.
                        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
                            res.status(500).send('Internal server error')
                        } else {
                            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
                        }
                    })
                    
                }
            }
			
		}
	})
	.catch((error) => {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	})		
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

    // console.log("im here", newPost)

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
            // console.log("check", req.body.commenter)
            // console.log("check", req.body.commentContent)
            // console.log("check1", targetPost)
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

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "../client/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    // const goodPageRoutes = ["/", "/login", "/dashboard"];
    // if (!goodPageRoutes.includes(req.url)) {
    //     // if url not in expected page routes, set status to 404.
    //     res.status(404);
    // }

    // send index.html
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})
