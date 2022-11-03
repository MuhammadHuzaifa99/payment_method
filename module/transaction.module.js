const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    id: {
        required: [true, 'Sender Id must be entered'],
        type: Number
    },
    cardNo: {
        required: [true, 'receiver Id must be entered'],
        type: String
    },
    name : {
        type: String,
        required: [true, 'Name must be entered']
    }
})

const Transaction = new mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;