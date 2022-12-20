// 아폴로 서버 4버전은 require를 사용하는 commonJS가 아닌 import를 사용하는 module 방식으로 구현해야 됨.
// packaage.json에 ["type": "module"] 추가 필요.
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import scalas from './graphql_defs/_scalas.js';
import queries from './graphql_defs/_queries.js';
import mutations from './graphql_defs/_mutations.js';
import books from './graphql_defs/books.js'

import models from './models.js';

import dotenv from "dotenv";
import db from "./db.js";

// 이후 '.env'에 정의된 변수명과 'process.env.{변수명}' 조합으로 사용 가능
dotenv.config();

const port = process.env.PORT || 4000;
const db_host = process.env.DB_HOST;

// mongoDB를 mongoose 모듈을 이용하여 연결
db.connect(db_host);

// GraphQL 타입 정의부 - typeDefs 설정.(파일을 분할하여 배열로 합하여 설정 가능. 리팩토링.)
const typeDefs = [
  queries,
  mutations,
  scalas.typeDefs,
  books.typeDefs,
];

// GraphQL의 코드 로직 구현부 - resolvers 설정.(파일을 분할하여 배열로 합하여 설정 가능. 리팩토링.)
const resolvers = [
  scalas.resolvers,
  books.resolvers,
];

// Apollo 서버 설정
const server = new ApolloServer({
    typeDefs,
    resolvers
 });
  

// Apollo 서버 시작. context는 resolver에 서버 application이 정보를 넘겨줄 값이 있을 경우 사용.
// 여기서는 DB Model정보를 전달해준다. (이후 각 resolver마다 model을 import 할 필요가 없음.)
const { url } = await startStandaloneServer(server, {
    listen: { port: port },
    context: () => {
      return { models };
    }
 });
  
 console.log(`🚀  Server ready at: ${url}`);