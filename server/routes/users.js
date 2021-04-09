const routes = require('express').Router()

const config = require('../config')
const ENV = process.env.NODE_ENV == 'production' ? 'production' : config.ENV
const TEST_USER_ID = config.TEST_USER_ID
const TEST_USER_NAME = config.TEST_USER_NAME

const actions = require('./actions')
const mongoChecker = actions.mongoChecker
const authenticate = actions.authenticate
const isMongoError = actions.isMongoError

const { mongoose } = require("../db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

const { User } = require("../models/user");
const { FAInfo } = require("../models/FAInfo");

routes.get("/info", mongoChecker, authenticate, async (req, res) => {
    
    // if (ENV == "development") req.session.user = '606eae1f6bca5706c81f462a'
    // const userID = req.session.user
    try {
        const userInfos = await User.find()
        if (!userInfos) {
            res.status(400).send("resource not found")
        }
        else {
            res.status(200).send(userInfos)
        }
    }
    catch (error) {
        console.log(error)
        res.status(400).send("bad request")
    }
})

// route to get all the users that currently follow the FA 
routes.get("/manage", mongoChecker, authenticate, async (req, res) => {

    const userID = req.session.user

    try {

        const user = await User.findById(userID) // FA user 
        const userFollowers = user.userFollowers // usernames that follow the above FA 

        // all the entirety User info of each users that follow the above FA
        const userFollowersArray = await Promise.all(userFollowers.map(async username => {
            const user = await User.findOne({ username: username })
            return user
        }))

        let clientsArray = []

        userFollowersArray.map(follower => {
            const clientObj = new Object()
            clientObj["username"] = follower.username
            clientObj["firstName"] = follower.firstName
            clientObj["lastName"] = follower.lastName
            clientObj["email"] = follower.email
            clientObj["birthday"] = follower.birthday
            clientObj["occupation"] = follower.occupation
            clientObj["salary"] = follower.salary
            clientObj["gender"] = follower.gender
            clientObj["totalSpendings"] = '$5,000'
            clientObj["totalGain"] = '$10,000'
            clientObj["totalLoss"] = '$100'
            clientsArray.push(clientObj)
        })

        res.send(clientsArray)

    }

    catch (error) {
        res.status(400).send()
    }

})

// route for FA to make a recommendation to a regular user 
routes.post("/manage/recommend/:targetUsername", mongoChecker, authenticate, async (req, res) => {

    const userID = req.session.user

    const targetUsername = req.params.targetUsername

    try {

        const FA = await User.findById(userID)
        const FAName = FA.username
        const targetUser = await User.findOne({ username: targetUsername })

        const newRec = req.body
        newRec["FAName"] = FAName

        targetUser.userRecommendations.unshift(newRec)
        await targetUser.save()
        res.sendStatus(200).send()

    }

    catch (error) {
        res.status(400).send()
    }

})

routes.post("/login", (req, res) => {
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
routes.get("/logout", (req, res) => {
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
routes.post("/signup", mongoChecker, async (req, res) => {
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
routes.patch('/profile', mongoChecker, authenticate, async (req, res) => {

    const username = req.session.username;

    console.log("in patch", username)

    // Find the fields to update and their values.
    const fieldsToUpdate = {}
    req.body.map((change) => {
        const propertyToChange = change.path.substr(1) // getting rid of the '/' character
        fieldsToUpdate[propertyToChange] = change.value
    })

    // Update the student by their id.
    try {
        const updateProfile = await User.findOneAndUpdate({ username: username }, { $set: fieldsToUpdate }, { new: true, useFindAndModify: false })
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
routes.get("/check-session", async (req, res) => {
    console.log("session user: ", req.session)

    if (ENV !== "production") {
        req.session.user = TEST_USER_ID;
    }

    const userID = req.session.user

    if (req.session.user) {
        const user = await User.findById(userID)
        res.send({ currentUser: user });
    } else {
        res.status(401).send("ERRORRRRR");
    }
});

// add a post to user's profile userPosts
routes.post("/profile/userPosts", mongoChecker, authenticate, async (req, res) => {

    const targetUsername = req.session.username

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

    try {
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
    catch (error) {
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
routes.delete('/profile/userPosts/:postID', mongoChecker, authenticate, async (req, res) => {

    const targetUsername = req.session.username
    const targetPostID = req.params.postID

    console.log("delete id:", targetPostID)
    console.log("target user:", targetUsername)

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
    catch (error) {
        log(error)
        res.status(500).send('internal server error')
    }
})

// add a post to user's profile userSavedPosts
routes.post("/profile/userSavedPosts", mongoChecker, authenticate, async (req, res) => {

    const targetUsername = req.session.username

    try {
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
    catch (error) {
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
routes.delete('/profile/userSavedPosts/:postID', mongoChecker, authenticate, async (req, res) => {

    const targetUsername = req.session.username
    const targetPostID = req.params.postID

    console.log("delete id:", targetPostID)
    console.log("target user:", targetUsername)

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
    catch (error) {
        log(error)
        res.status(500).send('internal server error')
    }
})


// add a post to user's profile userUpvotedPosts
routes.post("/profile/userUpvotedPosts", mongoChecker, authenticate, async (req, res) => {

    const targetUsername = req.session.username

    try {
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
    catch (error) {
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
routes.delete('/profile/userUpvotedPosts/:postID', mongoChecker, authenticate, async (req, res) => {

    const targetUsername = req.session.username
    const targetPostID = req.params.postID

    console.log("delete id:", targetPostID)
    console.log("target user:", targetUsername)

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
    catch (error) {
        log(error)
        res.status(500).send('internal server error')
    }
})


// add a post to user's profile userDownvotedPosts
routes.post("/profile/userDownvotedPosts", mongoChecker, authenticate, async (req, res) => {

    const targetUsername = req.session.username

    try {
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
    catch (error) {
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
routes.delete('/profile/userDownvotedPosts/:postID', mongoChecker, authenticate, async (req, res) => {

    const targetUsername = req.session.username
    const targetPostID = req.params.postID

    console.log("delete id:", targetPostID)
    console.log("target user:", targetUsername)

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
    catch (error) {
        log(error)
        res.status(500).send('internal server error')
    }
})

// add a FA to user's profile userFollows
routes.post("/profile/userFollows", mongoChecker, authenticate, async (req, res) => {

    const targetUsername = req.session.username
    const FAUsername = req.body.FAusername

    try {

        // saving the regular user into FA's userFollowers
        let FA = await User.findOne({ username: FAUsername })
        FA.userFollowers.push(targetUsername)
        await FA.save()

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
    catch (error) {
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
routes.delete('/profile/userFollows/:FAusername', mongoChecker, authenticate, async (req, res) => {

    const targetUsername = req.session.username
    const targetFAusername = req.params.FAusername

    console.log("delete FA:", targetFAusername)
    console.log("target user:", targetUsername)

    try {

        let targetUser = await User.find({ username: targetUsername })
        let FA = await User.findOne({ username: targetFAusername })

        // deleting the regular user from FA's userFollowers
        FA.userFollowers.pull(targetUser[0].username)
        await FA.save()

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
    catch (error) {
        log(error)
        res.status(500).send('internal server error')
    }
})


// add FAInfo into FAInfo database
routes.post('/FAInfo', mongoChecker, authenticate, async (req, res) => {

    const newFAInfo = new FAInfo({
        FAName: req.body.FAName,
        FAFirstname: req.body.FAFirstname,
        FALastname: req.body.FALastname,
        FAIntro: req.body.FAIntro,
        FAFields: req.body.FAFields,
        FAPoints: req.body.FAPoints
    })

    console.log("=========", newFAInfo)

    try {
        const result = await newFAInfo.save()
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

// get list of all FAInfo
routes.get('/FAInfo', mongoChecker, authenticate, async (req, res) => {

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
routes.patch('/FAInfo/', mongoChecker, authenticate, async (req, res) => {

    const username = req.session.username;

    console.log("in FAInfo patch", username)

    // Find the fields to update and their values.
    const fieldsToUpdate = {}
    req.body.map((change) => {
        const propertyToChange = change.path.substr(1) // getting rid of the '/' character
        fieldsToUpdate[propertyToChange] = change.value
    })

    try {
        const updateFAInfo = await FAInfo.findOneAndUpdate({ FAName: username }, { $set: fieldsToUpdate }, { new: true, useFindAndModify: false })
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

module.exports = routes