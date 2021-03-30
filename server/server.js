/* server.js for react-express-authentication */
"use strict"

const express = require("express")
const app = express()

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})