/* server.js for react-express-authentication */
"use strict"
const log = console.log

const env = process.env.NODE_ENV // read the environment variable (will be 'production' in production mode)

const config = require('./config')
const ENV = config.ENV

// const ENV = "production"

const configDB = (ENV !== "production") ? require('./db/config.js') : null;
const express = require("express")
const path = require('path')

const app = express()
const spendingsRoutes = require('./routes/spendings')
const usersRoutes = require('./routes/users')
const communityRoutes = require('./routes/community')
const investmentRoutes = require('./routes/investments')

const MongoStore = require('connect-mongo') // to store session information on the database in production
const bodyParser = require('body-parser')
app.use(bodyParser.json());

// enable cors if not in production 
const cors = require('cors')
if (ENV !== 'production') { app.use(cors()) }

// express-session for managing user sessions
const session = require("express-session");
const { ObjectID } = require('mongodb')
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

const { User } = require("./models/user");
const { Post } = require("./models/posts");

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
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
        store: ENV === "production" ? MongoStore.create({
            mongoUrl: process.env.MONGODB_URI || configDB.localMongoURI
        }) : null
    })
);

/**************************
 ROUTES FOR USERS
 *************************/
app.use('/users', usersRoutes)

/**************************
 ROUTES FOR INVESTMENTS
 *************************/
app.use('/investments', investmentRoutes)


/**************************
 ROUTES FOR SPENDINGS
 *************************/

app.use('/spendings', spendingsRoutes)

/**************************
 ROUTES FOR COMMUNITY
 *************************/
 app.use('/community', communityRoutes)

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
