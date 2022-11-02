const express = require('express')
const auth  = require('./route/auth.route')
const app = express()

app.use(express.json());

app.use("/api/v1/auth", auth)

module.exports = app