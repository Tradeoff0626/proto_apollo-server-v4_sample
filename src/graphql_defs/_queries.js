const typeDefs = `#graphql
    type Query {
        books: [Book]
        book(id: ID!): Book!
    }
`;

export default typeDefs;