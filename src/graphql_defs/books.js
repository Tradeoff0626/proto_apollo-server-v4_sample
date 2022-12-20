// Book 객체에 관련된 정보만 정의된 샘플 파일

// Book에 사용되는 타입 정의 파일
// mongoose에서 기본적으로 ID 및 timestamp관련 컬럼(createdAt, updatedAt)이 정의되므로 추가가 필요.
const typeDefs = `#graphql
    type Book {
    id: ID!
    title: String!
    author: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    }
`;

// Book의 기능 구현부
// Query 및 Mutation의 arguments는 (parent, args, context, info)가 사용됨.
// args는 각 GraphQL 호출 시 넘겨지는 파라미터 값, context는 서버 어플리케이션에서 넘겨지는 정보가 넘어옴.
// 구현 함수는 mongoose 문서 참조.(https://mongoosejs.com/docs/api.html)
const resolvers = {
    Query: {
        //Book 전체 조회
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