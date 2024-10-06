import { mergeTypeDefs } from "@graphql-tools/merge";

import transactionTypeDef from "./transaction.typeDef.js";
import userTypeDef from "./user.typedef.js";

const typeDefs = [userTypeDef, transactionTypeDef];

export default mergeTypeDefs(typeDefs);