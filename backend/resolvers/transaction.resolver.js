import Transaction from "../models/transaction.model";

const transactionResolver = {
    Mutation:{
        addTransaction: async(_, {input}, context) => {
            try {
                if (!context.req.isAuthenticated()) {
                    throw new Error("User not authenticated");
                }
                const { description, paymentType, category, amount, location, date } = input;
                const transaction = new Transaction({
                    userId: context.req.user._id,
                    description,
                    paymentType,
                    category,
                    amount,
                    location,
                    date,
                });
                await transaction.save();
                return transaction;
            }
            catch (error) {
                throw new Error(error.message);
            }
        },
        updateTransaction: async(_, {input}, context) => {
            try {
                if (!context.req.isAuthenticated()) {
                    throw new Error("User not authenticated");
                }
                const { id, description, paymentType, category, amount, location, date } = input;
                const transaction = await Transaction.findById(id);
                if (!transaction) {
                    throw new Error("Transaction not found");
                }
                if (transaction.userId.toString() !== context.req.user._id.toString()) {
                    throw new Error("You are not authorized to update this transaction");
                }
                transaction.description = description;
                transaction.paymentType = paymentType;
                transaction.category = category;
                transaction.amount = amount;
                transaction.location = location;
                transaction.date = date;
                await transaction.save();
                return transaction;
            }
            catch (error) {
                throw new Error(error.message);
            }
        },
        deleteTransaction: async(_, {id}, context) => {
            try {
                if (!context.req.isAuthenticated()) {
                    throw new Error("User not authenticated");
                }
                const transaction = await Transaction.findById(id);
                if (!transaction) {
                    throw new Error("Transaction not found");
                }
                if (transaction.userId.toString() !== context.req.user._id.toString()) {
                    throw new Error("You are not authorized to delete this transaction");
                }
                await transaction.remove();
                return transaction;
            }
            catch (error) {
                throw new Error(error.message);
            }
        }
    },
    Query: {
        transactions: async(_,__,context) => {
            try {
                if (!context.req.isAuthenticated()) {
                    throw new Error("User not authenticated");
                }
                return await Transaction.find({ userId: context.req.user._id });
            }
            catch (error) {
                throw new Error(error.message);
            }
        },
        transaction: async(_, {id}, context) => {
            try {
                if (!context.req.isAuthenticated()) {
                    throw new Error("User not authenticated");
                }
                return await Transaction.findById(id);
            }
            catch (error) {
                throw new Error(error.message);
            }
        },
    },
};

export default transactionResolver;