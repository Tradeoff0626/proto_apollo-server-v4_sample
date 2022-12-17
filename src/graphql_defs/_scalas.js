import { GraphQLScalarType, Kind } from 'graphql';

const typeDefs = `#graphql
    scalar DateTime
`;


// 참조(https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/)
const resolvers = { 
    DateTime : new GraphQLScalarType({
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
      }), 
}


const scalas = { typeDefs, resolvers }

export default scalas;
