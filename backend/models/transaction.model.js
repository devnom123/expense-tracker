import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    description: {
        type: String,
        default: null,
    },
    paymentType: {
        type: String,
        enum: ["cash","card"],
        default: null,
    },
    category: {
        type: String,
        enum: ["saving","expense","investment"],
        default: null,
    },
    amount: {
        type: Number,
        default: 0,
    },
    location: {
        type: String,
        default: null,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;