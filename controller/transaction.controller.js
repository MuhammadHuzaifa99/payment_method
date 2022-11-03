// const { json } = require('express');
const Transaction = require('../module/transaction.module')

exports.createTransaction = async (req, res) => {
    try {
        console.log(req.body)
        const transaction = await Transaction.create(req.body);

        if(!transaction){
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