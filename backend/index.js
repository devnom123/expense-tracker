import { ApolloServer } from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import mergeResolver from './resolvers/index.js';
import typeDefs from './typeDefs/index.js';

import http from 'http';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config({
  path:'../.env'
});
import { connectDb } from './db/connectDb.js';

import passport from 'passport';
import session from 'express-session';
import connectMongodbSession from 'connect-mongodb-session';

import { GraphQLLocalStrategy, buildContext } from "graphql-passport";

import { passportConfig } from './passport/passport.js';

const app = express();

const httpServer = http.createServer(app);

const MongoDBStore = connectMongodbSession(session);

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions' // The MongoDB collection to store session data
});

store.on('error', function(error) {
  console.log(error);
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    // httpOnly: true,
  }
}));

app.use(passport.initialize());

app.use(passport.session());

const server = new ApolloServer({
  typeDefs,
  resolvers: mergeResolver,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

// app.use('/graphql', cors(), express.json(), expressMiddleware(server))

app.use(
  '/',
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    // context: async ({ req }) => ({ token: req.headers.token }),
    context: async ({ req,res }) => buildContext({ req,res }),
  }),
);

// const { url } = await startStandaloneServer(server);
// console.log(`🚀 Server ready at ${url}`);

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

await connectDb();

console.log(`🚀 Server ready at http://localhost:4000/`);