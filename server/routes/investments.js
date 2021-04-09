const routes = require('express').Router()

const log = console.log

const actions = require('./actions')
const mongoChecker = actions.mongoChecker
const authenticate = actions.authenticate

const { mongoose } = require("../db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

const { User } = require("../models/user");

let yhFinance = require("yahoo-finance");

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

// gets the user's stock entries
// GET /investments
routes.get('/', mongoChecker, authenticate, async (req, res) => {

    const userID = req.session.user

    // normal promise version
    User.findById(userID).then((user) => {
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




// adds a stock entry
// POST /investments
routes.post('/', mongoChecker, authenticate, async (req, res) => {

    const userID = req.session.user

    //create new stock entry
    //all of the values in the object needs to be calculated again
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
        if (Object.keys(quotes).length === 0) {
            console.log(quotes);
            console.log("Incorrect buy entry!");
            res.send("tickerError")
            return;
        } else closingPrice = quotes[0]['close'];
        console.log("CLOSING PRICE")
        console.log(closingPrice);
        User.findById(userID).then((user) => {
            if (!user) {
                res.status(400).send('User not found')
            } else if (closingPrice == -1.0) {
                res.status(400).send('Invalid stock entry')
            } else {

                // let obj = user.investments.filter(obj => {
                //     return obj["Name"] === req.body["Name"];
                // })

                let obj = user.investments.find(x => x["Name"] === req.body["Name"]);
                console.log(obj)


                if (typeof obj != "undefined") {
                    //The stock with the same ticker is already in the table!!! so update that row

                    let newStocksList = user.investments.filter(res => res["Name"] != req.body["Name"]);
                    let index = user.investments.findIndex(function (item, i) {
                        return item["Name"] === req.body["Name"]
                    });
                    //assign the values, making sure to round to 2 decimal palces if necessary
                    stock_entry["Quantity"] = parseFloat(obj["Quantity"]) + parseFloat(req.body["Quantity"]);
                    stock_entry["Price"] = Math.round(closingPrice * 100) / 100;
                    stock_entry["Price"] = Math.round(stock_entry["Price"] * 100) / 100;

                    stock_entry["Average Cost"] = (parseFloat(req.body["Quantity"] * closingPrice) + parseFloat(obj["Book Cost"])) / (parseFloat(obj["Quantity"]) + parseFloat(req.body["Quantity"]));
                    stock_entry["Average Cost"] = Math.round(stock_entry["Average Cost"] * 100) / 100;

                    stock_entry["Market Value"] = stock_entry["Price"] * stock_entry["Quantity"];
                    stock_entry["Market Value"] = Math.round(stock_entry["Market Value"] * 100) / 100;

                    stock_entry["Book Cost"] = stock_entry["Average Cost"] * stock_entry["Quantity"];
                    stock_entry["Book Cost"] = Math.round(stock_entry["Book Cost"] * 100) / 100;

                    stock_entry["Gain/Loss"] = stock_entry["Market Value"] - stock_entry["Book Cost"];
                    stock_entry["Gain/Loss"] = Math.round(stock_entry["Gain/Loss"] * 100) / 100;


                    newStocksList.splice(index, 0, stock_entry);
                    user.investments = newStocksList;
                    console.log("!")

                    console.log(user.investments);
                } else {
                    //Not in the table, so add it to the table
                    stock_entry["Quantity"] = parseFloat(req.body["Quantity"]);
                    stock_entry["Price"] = closingPrice;
                    stock_entry["Price"] = Math.round(stock_entry["Price"] * 100) / 100;


                    stock_entry["Average Cost"] = closingPrice;
                    stock_entry["Average Cost"] = Math.round(stock_entry["Average Cost"] * 100) / 100;

                    stock_entry["Market Value"] = stock_entry["Price"] * stock_entry["Quantity"];
                    stock_entry["Market Value"] = Math.round(stock_entry["Market Value"] * 100) / 100;

                    stock_entry["Book Cost"] = stock_entry["Average Cost"] * stock_entry["Quantity"];
                    stock_entry["Book Cost"] = Math.round(stock_entry["Book Cost"] * 100) / 100;

                    stock_entry["Gain/Loss"] = stock_entry["Market Value"] - stock_entry["Book Cost"];
                    stock_entry["Gain/Loss"] = Math.round(stock_entry["Gain/Loss"] * 100) / 100;

                    user.investments.unshift(stock_entry);
                    console.log("!!")
                    console.log(user.investments);
                }

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
    });
})

// DELETE investments/<stock name>/
routes.delete('/:name/:numToDelete', mongoChecker, authenticate, async (req, res) => {

    const userID = req.session.user

    const stockNameToEdit = req.params.name;
    const numToDelete = req.params.numToDelete;
    let stock_entry = req.body;
    let closingPrice;

    let endDate = new Date().toISOString();
    console.log(endDate);
    let startDate = getLastWeek(endDate);
    yhFinance.historical({
        symbol: stock_entry["Name"],
        from: startDate,
        to: endDate,
    }, function (err, quotes) {
        //check if it's valid
        console.log('quotes')
        console.log(quotes)
        if (Object.keys(quotes).length === 0) {
            console.log("Incorrect buy entry!");
            return;
        } else closingPrice = quotes[0]['close'];
        console.log("CLOSING PRICE")
        console.log(closingPrice);


        User.findById(userID).then((user) => {
            if (!user) {
                res.status(404).send('User not found')  // could not find this restaurant
            } else {
                for (let i = 0; i < user.investments.length; i++) {
                    console.log(user.investments[i]._id)
                    if (user.investments[i]["Name"] == stockNameToEdit) {
                        console.log(user.investments[i])
                        //newStockList excludes the one that is being sold
                        let newStockEntry = req.body;//this is the stock to edit(delete)
                        //remove the number of stocks needed
                        if (numToDelete > newStockEntry["Quantity"] || numToDelete < 0) {
                            res.status(500).send("Invalid number of stocks to sell!");
                            return;
                        }

                        let today = new Date();
                        let dd = today.getDate();

                        let mm = today.getMonth()+1; 
                        let yyyy = today.getFullYear();
                        let dateString = mm + '/' + dd + '/' + yyyy;

                        let newStocksList = user.investments.filter(res => res._id != user.investments[i]._id);
                        if (numToDelete < newStockEntry["Quantity"]) {
                            //console.log(today);
                            newStockEntry["Last Traded Date"] = dateString;
                            newStockEntry["Quantity"] = newStockEntry["Quantity"] - numToDelete;

                            newStockEntry["Price"] = closingPrice;
                            newStockEntry["Price"] = Math.round(newStockEntry["Price"] * 100) / 100;

                            newStockEntry["Average Cost"] = newStockEntry["Average Cost"];
                            newStockEntry["Average Cost"] = Math.round(newStockEntry["Average Cost"] * 100) / 100;

                            newStockEntry["Market Value"] = newStockEntry["Quantity"] * closingPrice;
                            newStockEntry["Market Value"] = Math.round(newStockEntry["Market Value"] * 100) / 100;

                            newStockEntry["Book Cost"] = newStockEntry["Quantity"] * newStockEntry["Average Cost"];
                            newStockEntry["Book Cost"] = Math.round(newStockEntry["Book Cost"] * 100) / 100;

                            newStockEntry["Gain/Loss"] = newStockEntry["Market Value"] - newStockEntry["Book Cost"];
                            newStockEntry["Gain/Loss"] = Math.round(newStockEntry["Gain/Loss"] * 100) / 100;

                            newStocksList.splice(i, 0, newStockEntry);
                        }

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
    });
})


module.exports = routes