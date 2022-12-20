// Query 타입 공통 정의 파일(query - Read 값이 조회되는 기능을 정의)
const typeDefs = `#graphql
    type Query {
        books: [Book]
        book(id: ID!): Book!
    }
`;

export default typeDefs;