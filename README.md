## node.js 기반 아폴로 서버(ver.4) 샘플 코드

https://www.apollographql.com/docs/apollo-server/


### 설치
- $ <code>npm i</code>
---

### 테스트 방법
1. $ <code>npm start</code>
2. http://localhost:4000 접속
3. operation에 다음 하기 graphQL 쿼리를 입력하여 테스트
---

### 입력
```XML
mutation($title: String!, $author: String!) {
  newBook(title: "입력 값", author: "입력 값") {
    id
    title
    author
    createdAt
    updatedAt
  }
}
```
---

### 조회
```XML
query($bookId: ID!, $bookId2: ID!) {
  books {
    id
    title
    author
    createdAt
    updatedAt
  }
  book(id: "조회할할 항목의 id") {
    id
    title
    author
    createdAt
    updatedAt
  }
}
```
---

### 수정
```XML
mutation($title: String!, $author: String!, $editBookId: ID!, $editBookTitle2: String!) {
 editBook(id: "수정할 ID", title: "수정할 값") {
   id
   title
   author
   createdAt
   updatedAt
 }
}
```
---

### 삭제
```XML
mutation($delBookId: ID!) {
  delBook(id: "삭제할 ID") {
    id
    title
    author
  }
}
```
---
