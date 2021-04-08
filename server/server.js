/* server.js for react-express-authentication */
"use strict"
const log = console.log

const env = process.env.NODE_ENV // read the environment variable (will be 'production' in production mode)

const { localMongoURI } = require('./db/config.js');
const express = require("express")
const path = require('path')

const app = express()
const spendingsRoutes = require('./routes/spendings')

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
            res.status(200).send(targetUser[0])
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
            res.status(200).send(targetUser[0])
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
            res.status(200).send(targetUser[0])
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
            res.status(200).send(targetUser[0])
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

// get list of all FAInfo
app.get('/users/FAInfo', async (req, res) => {

    // check mongoose connection
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('internal server error')
        return
    }

    try {
        const allFAInfo = await FAInfo.find()
        console.log(allFAInfo)
        res.send(allFAInfo)
    }
    catch (error) {
        log(error)
        res.status(500).send("internal server error")
    }
})

// patch FAInfo
app.patch('/users/FAInfo/:username', async (req, res) => {
    
    const username = req.params.username;

    console.log("in FAInfo patch", username)

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

	try {
		const updateFAInfo = await FAInfo.findOneAndUpdate({FAName: username}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false})
		if (!updateFAInfo) {
			res.status(404).send('Resource not found')
		} else {   
			res.status(200).send(updateFAInfo);
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


/**************************
 ROUTES FOR INVESTMENTS
 *************************/ 
let yhFinance = require("yahoo-finance");

// gets the user's stock entries
// GET /investments
app.get('/investments', async (req, res) => {
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }

    const username = "user"
    const pw = "user"

    // normal promise version
    User.findByUserNamePassword(username, pw).then((user) => {
        if (!user) {
            res.status(400).send('User not found')
        } else {
            //just send the entire list of stocks
            res.send(user.investments)
        }
    })
        .catch((error) => {
            log(error)
            res.status(500).send("Internal Server Error")
        })
})

//Use this function to get the toDate to accomodate for entry dates enterred in a non-trading day like Good Friday :)
//Reference: https://stackoverflow.com/questions/12805981/get-last-week-date-with-jquery-javascript/12806057
function getLastWeek(fromDateStr) {
    let fromDate = new Date(fromDateStr);
    let lastWeek = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() - 7);
  
    let lastWeekMonth = (lastWeek.getMonth() + 1).toString();
    if((lastWeek.getMonth() + 1) < 10) lastWeekMonth = '0' + lastWeekMonth;
    let lastWeekDay = (lastWeek.getDate()).toString();
    if(lastWeek.getDate() < 10) lastWeekDay = '0' + lastWeekDay; 
    let lastWeekYear = (lastWeek.getFullYear()).toString();
    console.log(lastWeekMonth)
    console.log(lastWeekDay)
    console.log(lastWeekYear)
    let returnIsoDate = lastWeekYear + '-' + lastWeekMonth + '-' + lastWeekDay;
    console.log("line 153")
    console.log(returnIsoDate);
    return returnIsoDate;
}



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
    //all of the below needs to be calculated again
    // stock_entry["Price"]= req.body["Price"];
    // stock_entry["Average Cost"]= req.body["Average Cost"];
    // stock_entry["Market Value"]= req.body["Market Value"];
    // stock_entry["Book Cost"]= req.body["Book Cost"];
    // stock_entry["Gain/Loss"]= req.body["Gain/Loss"];
    let stock_entry =  new Object();
    stock_entry["Last Traded Date"]= req.body["Last Traded Date"];
    stock_entry["Name"]= req.body["Name"];


    let isoDate= stock_entry["Last Traded Date"].replace('/', '-') 
    let year = isoDate.substring(6,isoDate.length);
    let monthDay = isoDate.substring(0,5);
    isoDate = year.concat('-');//cuz there's no - in the original str behind year
    isoDate = isoDate.concat(monthDay);
    console.log(isoDate);
   
    let fromDate = getLastWeek(isoDate);

    let closingPrice = 0;

    console.log("Sending")
    console.log(stock_entry["Name"])
    console.log(fromDate)
    console.log(isoDate)
    yhFinance.historical({
        symbol: stock_entry["Name"],
        from: fromDate,
        to: isoDate,
    }, function(err, quotes) {
        //check if it's valid
        console.log('quotes')
        console.log(quotes)
        if(Object.keys(quotes).length === 0) closingPrice = -1.0;
        else closingPrice = quotes[0]['close'];
        console.log("CLOSING PRICE")
        console.log(closingPrice);
    });

    

    User.findByUserNamePassword(username, pw).then((user) => {
		if(!user){
            res.status(400).send('User not found')
        }else if(closingPrice == -1.0){
            res.status(400).send('Invalid stock entry')
        }else{
            


            let obj = user.investments.filter(obj => {
                return obj["Name"] === req.body["Name"];
            })
            if (typeof obj != "undefined") {
                //The stock with the same ticker is already in the table!!! so update that row

                let newStocksList = user.investments.filter(res => res["Name"] != req.body.Name);
                let index = user.investments.findIndex(function(item, i){
                    return item["Name"] === req.body["Name"]
                });


                stock_entry["Price"] = closingPrice;
                stock_entry["Average Cost"]= ( parseFloat(req.body["Quantity"] * closingPrice ) + parseFloat(obj["Book Cost"]))/(parseFloat( obj["Quantity"]) + parseFloat(req.body["Quantity"]));
                stock_entry["Quantity"]= parseFloat(obj["Quantity"]) + parseFloat(req.body["Quantity"]);
                stock_entry["Market Value"]= stock_entry["Price"] * stock_entry["Quantity"];
                stock_entry["Book Cost"]= stock_entry["Average Cost"] * stock_entry["Quantity"];
                stock_entry["Gain/Loss"]= stock_entry["Market Value"] - stock_entry["Book Cost"];
                console.log(stock_entry);
                newStocksList.splice(index, 0, stock_entry);
                user.investments = newStocksList;
            }else{
                //Not in the table, so add it to the table
                user.investments.unshift(stock_entry);
            }

            console.log(user.investments);
		    
            user.save().then((result) => {
                console.log(user.investments);
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

            for (let i = 0; i < user.investments.length; i++) {
                if (user.investments[i]["Name"] == stockNameToDelete) {
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
    const oldStockEntry = req.body[0];
    const newStockEntry = req.body[1];
    console.log(newStockEntry);
    newStockEntry._id = mongoose.Types.ObjectId(newStockEntry._id)
    console.log(newStockEntry._id)
    User.findByUserNamePassword(username, pw).then((user) => {
		if (!user) {
			res.status(404).send('User not found')  // could not find this restaurant
		} else {
            let listExclusingCurrent = user.investments.filter(res => res["Name"] != oldStockEntry["Name"]);
            if( listExclusingCurrent.some(item =>(item["Name"] === newStockEntry["Name"] ))){
                
                console.log("Duplicate")
                res.send("duplicate");
                return;
            }
            for(let i = 0; i< user.investments.length;i++){
                console.log(user.investments[i]._id)
                if(user.investments[i]["Name"] == stockNameToEdit){
                    console.log(user.investments[i])
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

/**************************
 ROUTES FOR SPENDINGS
 *************************/

app.use('/spendings', spendingsRoutes)

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
    catch (error) {
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
            res.status(404), send("resouce not found")
        }
        else {
            res.send(postsByUsername)
        }
    }
    catch (error) {
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

    try {
        const result = await newPost.save()
        res.status(200).send(result)
    }
    catch (error) {
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
    catch (error) {
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
        const retPost = await Post.findOneAndUpdate({ postID: targetPostID }, { $set: fieldsToUpdate }, { new: true, useFindAndModify: false })
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
    catch (error) {
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









require("dotenv").config();

// const timePeriod = require("./constants");

app.post("/stock", cors(), async (req, res) => {
  const body = JSON.parse(JSON.stringify(req.body));
  const { ticker, type } = body;
  console.log("stocks-api.js 14 | body", body.ticker);
  const request = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=8N55YD54SG1F6RCN`
  );
  const data = await request.json();
  res.json({ data: data });
});







const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})
