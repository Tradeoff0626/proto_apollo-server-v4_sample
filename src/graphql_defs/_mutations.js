const typeDefs = `#graphql
    type Mutation {
    newBook(title: String!, author: String!): Book
    delBook(id: ID!): Book
    }
`;
export default typeDefs;