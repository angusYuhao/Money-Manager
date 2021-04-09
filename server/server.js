/* server.js for react-express-authentication */
"use strict"
const log = console.log

const env = process.env.NODE_ENV // read the environment variable (will be 'production' in production mode)
const ENV = "development" // used for setting session info manually when testing

const { localMongoURI } = require('./db/config.js');
const express = require("express")
const path = require('path')

const app = express()
const spendingsRoutes = require('./routes/spendings')
const usersRoutes = require('./routes/users')
const communityRoutes = require('./routes/community')

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
        store: env === 'production' ? MongoStore.create({
            mongoUrl: process.env.MONGODB_URI || localMongoURI
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
    if ((lastWeek.getMonth() + 1) < 10) lastWeekMonth = '0' + lastWeekMonth;
    let lastWeekDay = (lastWeek.getDate()).toString();
    if (lastWeek.getDate() < 10) lastWeekDay = '0' + lastWeekDay;
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
    let stock_entry = new Object();
    stock_entry["Last Traded Date"] = req.body["Last Traded Date"];
    stock_entry["Name"] = req.body["Name"];


    let isoDate = stock_entry["Last Traded Date"].replace('/', '-')
    let year = isoDate.substring(6, isoDate.length);
    let monthDay = isoDate.substring(0, 5);
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
    }, function (err, quotes) {
        //check if it's valid
        console.log('quotes')
        console.log(quotes)
        if (Object.keys(quotes).length === 0) closingPrice = -1.0;
        else closingPrice = quotes[0]['close'];
        console.log("CLOSING PRICE")
        console.log(closingPrice);
    });



    User.findByUserNamePassword(username, pw).then((user) => {
        if (!user) {
            res.status(400).send('User not found')
        } else if (closingPrice == -1.0) {
            res.status(400).send('Invalid stock entry')
        } else {



            let obj = user.investments.filter(obj => {
                return obj["Name"] === req.body["Name"];
            })
            if (typeof obj != "undefined") {
                //The stock with the same ticker is already in the table!!! so update that row

                let newStocksList = user.investments.filter(res => res["Name"] != req.body.Name);
                let index = user.investments.findIndex(function (item, i) {
                    return item["Name"] === req.body["Name"]
                });


                stock_entry["Price"] = closingPrice;
                stock_entry["Average Cost"] = (parseFloat(req.body["Quantity"] * closingPrice) + parseFloat(obj["Book Cost"])) / (parseFloat(obj["Quantity"]) + parseFloat(req.body["Quantity"]));
                stock_entry["Quantity"] = parseFloat(obj["Quantity"]) + parseFloat(req.body["Quantity"]);
                stock_entry["Market Value"] = stock_entry["Price"] * stock_entry["Quantity"];
                stock_entry["Book Cost"] = stock_entry["Average Cost"] * stock_entry["Quantity"];
                stock_entry["Gain/Loss"] = stock_entry["Market Value"] - stock_entry["Book Cost"];
                console.log(stock_entry);
                newStocksList.splice(index, 0, stock_entry);
                user.investments = newStocksList;
            } else {
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
            if (listExclusingCurrent.some(item => (item["Name"] === newStockEntry["Name"]))) {

                console.log("Duplicate")
                res.send("duplicate");
                return;
            }
            for (let i = 0; i < user.investments.length; i++) {
                console.log(user.investments[i]._id)
                if (user.investments[i]["Name"] == stockNameToEdit) {
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
