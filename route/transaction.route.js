const express = require('express')
const { createTransaction, allTransaction } = require('../controller/transaction.controller')
const router = express.Router();

router.post('/create', createTransaction)
router.get('/all-transactions/:id', allTransaction)

module.exports = router;