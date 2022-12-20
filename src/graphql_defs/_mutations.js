// Mutation 타입 공통 정의 파일(mutation - Create/ Update/ Delete 등의 값이 변경되는 기능을 정의) 
const typeDefs = `#graphql
    type Mutation {
        newBook(title: String!, author: String!): Book
        editBook(id: ID!, title: String!): Book! 
        delBook(id: ID!): Book
    }
`;
export default typeDefs;