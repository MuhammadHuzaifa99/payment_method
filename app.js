const express = require('express')
const auth = require('./route/auth.route')
const transaction = require('./route/transaction.auth')
const cors = require('cors')
const app = express()

app.use(express.json());
app.use(cors())
app.use("/api/v1/auth", auth)
app.use('/api/v1/transaction', transaction)
module.exports = app