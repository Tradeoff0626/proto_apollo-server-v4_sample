// Scala 정의 - GraphQL은 ID, Int, Float, String, Boolean 스키마만 정의되므로 timestamp와 같은 스키마는 따로 정의되어야함.
import { GraphQLScalarType, Kind } from 'graphql';

// 사용되는 scala 타입 정의 목록
const typeDefs = `#graphql
    scalar DateTime
`;


// 각 scalar 기능 정의도 K-V 형식의 리터럴 객체로 선언
const resolvers = {
    // 참조(https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/) 
    DateTime : new GraphQLScalarType({
        name: 'DateTime',
        description: 'DateTime custom scalar type',
        serialize(value) {
          // 조회 시 출력 날짜를 ISO 날짜 형식으로 변환 
          return new Date(value).toISOString();
        },
        parseValue(value) {
          // 입력 시 정수를 날짜로 변환
          return new Date(value);
        },
        parseLiteral(ast) {
          // 하드 코딩된 AST 문자열을 정수로 변환한 다음 날짜로 변환. - AST(Abstract Syntax Trees)
          if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10));
          }
          return null;
        },
      }), 
}

// scalar도 typeDefs, resolvers에 각각 정의된 부분을 적용해야 됨.
const scalas = { typeDefs, resolvers }

export default scalas;
