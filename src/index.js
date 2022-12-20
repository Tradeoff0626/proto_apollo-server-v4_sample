import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import scalas from './graphql_defs/_scalas.js';
import queries from './graphql_defs/_queries.js';
import mutations from './graphql_defs/_mutations.js';
import books from './graphql_defs/books.js'

import models from './models.js';

import dotenv from "dotenv";
import db from "./db.js";

dotenv.config();

const port = process.env.PORT || 4000;
const db_host = process.env.DB_HOST;

db.connect(db_host);

const typeDefs = [
  queries,
  mutations,
  scalas.typeDefs,
  books.typeDefs,
];

const resolvers = [
  scalas.resolvers,
  books.resolvers,
];

const server = new ApolloServer({
    typeDefs,
    resolvers
 });
  

const { url } = await startStandaloneServer(server, {
    listen: { port: port },
    context: () => {
      return { models };
    }
 });
  
 console.log(`🚀  Server ready at: ${url}`);