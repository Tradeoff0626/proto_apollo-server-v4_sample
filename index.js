import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLScalarType, Kind } from 'graphql';

import models from './src/models.js'

import dotenv from "dotenv";
import db from "./db.js";

dotenv.config();

const port = process.env.PORT || 4000;
const db_host = process.env.DB_HOST;

const typeDefs = `#graphql
  scalar DateTime

  type Book {
    id: ID!
    title: String!
    author: String!
    createdAt: DateTime!
    updatedAt: DateTime!
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

// 참조(https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/)
const dateScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'DateTime custom scalar type',
  serialize(value) {
    return new Date(value).toISOString();
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  },
});

const resolvers = {
  DateTime: dateScalar,
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
        author: args.author,
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
    listen: { port: port },
  });
  
  console.log(`🚀  Server ready at: ${url}`);