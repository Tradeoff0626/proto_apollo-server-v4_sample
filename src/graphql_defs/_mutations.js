const typeDefs = `#graphql
    type Mutation {
        newBook(title: String!, author: String!): Book
        editBook(id: ID!, title: String!): Book! 
        delBook(id: ID!): Book
    }
`;
export default typeDefs;