// mongoDB DB 모델 정의
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
  },
  {
    // createdAt, updatedAt 컬럼 사용
    timestamps: true,
  }
);

// 모델 생성. 첫번째 인자에 설정한  스키마명의 복수(...s) 형태로 컬렉션명 생성 ('Book'로 설정 시, 'books'로 컬렉션명으로 생성됨.)
const Book = mongoose.model("Book", bookSchema);

export default Book;
