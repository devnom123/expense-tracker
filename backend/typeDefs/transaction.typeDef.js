const transactionTypeDef = `#graphql
    type Transaction {
        id: ID!
        userId: ID!
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        location: String!
        date: String!
    }
    
    type Query {
        transactions: [Transaction!]
        transaction(id: ID!): Transaction
    }
    
    type Mutation {
        addTransaction(input: AddTransactionInput!): Transaction
        updateTransaction(input: UpdateTransactionInput!): Transaction
        deleteTransaction(id: ID!): Transaction
    }
    
    input AddTransactionInput {
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        location: String!
        date: String!
    }
    
    input UpdateTransactionInput {
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        location: String!
        date: String!
    }
    `;

export default transactionTypeDef;    