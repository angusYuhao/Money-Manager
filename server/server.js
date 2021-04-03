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

const { ObjectID, ResumeToken } = require('mongodb')
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

const { User } = require("./models/user");

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



const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})