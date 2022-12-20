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
        books: async (parent, args, { models }) => {
            //console.log(process.env.DB_HOST);
            return await models.Book.find();
        },
        book: async (parent, args, { models }) => {
            return models.Book.findById(args.id);
        },
    },
    Mutation: {
        newBook: async (parent, args, { models }) => {
            return await models.Book.create({
              title: args.title,
              author: args.author,
            });
          },
        editBook: async (parent, { id, title }, { models }) => {
            return await models.Book.findOneAndUpdate(
                {
                    _id: id,
                },
                {
                    $set: {
                        title
                    }
                },
                {
                    new: true
                }
            )
        }, 
        delBook: async (parent, args, { models }) => {
            const delBookObj = await models.Book.findById(args.id);
            if(delBookObj) await models.Book.findOneAndDelete({_id: args.id});
            return delBookObj;
          },
    } 
}

const books = { typeDefs, resolvers };

export default books;