import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import models from './src/models.js'

import dotenv from "dotenv";
import db from "./db.js";

dotenv.config();

const port = process.env.PORT || 4000;
const db_host = process.env.DB_HOST;

const typeDefs = `#graphql
  type Book {
    id: ID
    title: String
    author: String
  }

  type Query {
    books: [Book]
    book(id: ID!): Book!
  }

  type Mutation {
    newBook(title: String!, author: String!): Book
    delBook(id: ID!): Book
	}
`;

const resolvers = {
  Query: {
    books: async () => {
      //console.log(process.env.DB_HOST);
      return await models.Book.find();
    },
    book: async (parent, args) => {
      return models.Book.findById(args.id);
    },
  },
  Mutation: {
    newBook: async (parent, args) => {
      return await models.Book.create({
        title: args.title,
        author: args.author
      });
    },
    delBook: async (parent, args) => {
      const delBookObj = await models.Book.findById(args.id);
      if(delBookObj) await models.Book.findOneAndDelete({_id: args.id});
      return delBookObj;
    }
  },
};

db.connect(db_host);

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);