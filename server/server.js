/* server.js for react-express-authentication */
"use strict"
const env = process.env.NODE_ENV // read the environment variable (will be 'production' in production mode)

const express = require("express")
const app = express()

// enable cors if not in production 
const cors = require('cors')
if (env !== 'production') { app.use(cors()) }

const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

const { User } = require("./models/user");

/**************************
 ROUTES FOR SPENDINGS
 *************************/ 

app.get('/spendings/transactions', async (req, res) => {
	res.sendStatus(200)
})

app.delete('/spendings/transaction', async (req, res) => {
   res.sendStatus(200)
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})