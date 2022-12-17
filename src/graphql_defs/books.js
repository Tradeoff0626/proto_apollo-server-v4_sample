import models from "../models.js";

const typeDefs = `#graphql
    type Book {
    id: ID!
    title: String!
    author: String!
    createdAt: DateTime!
    updatedAt: DateTime!
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
              author: args.author,
            });
          },
          delBook: async (parent, args) => {
            const delBookObj = await models.Book.findById(args.id);
            if(delBookObj) await models.Book.findOneAndDelete({_id: args.id});
            return delBookObj;
          },
    } 
}

const books = { typeDefs, resolvers };

export default books;