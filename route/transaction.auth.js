const express = require('express')
const { createTransaction } = require('../controller/transaction.controller')
const router = express.Router();

router.post('/create', createTransaction)

module.exports = router;