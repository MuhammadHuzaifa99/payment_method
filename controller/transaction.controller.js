// const { json } = require('express');
const Transaction = require('../module/transaction.module')

exports.createTransaction = async (req, res) => {
    try {
        console.log(req.body)
        const transaction = await Transaction.create(req.body);

        if (!transaction) {
            res.status(404).json({
                msg: "transaction did not created",
            })
        }

        res.status(200).json({
            status: 'transaction created',
            data: transaction,
        })
    } catch (error) {
        res.status(404).json({
            status: "error",
            msg: error.message
        })
    }
}

exports.allTransaction = async (req, res) => {
    try {
        const transactions = await Transaction.find({id: req.params.id});

        if (transactions.length == 0) {
           return res.status(200).json({
                msg: 'transaction not found'
            })
        }

        res.status(200).json({
            msg: 'Transactions fetched',
            data: transactions
        })

    } catch (error) {
        res.status(404).json({
            status: "error",
            msg: error.message
        })
    }
}