# Monorepo 로 블로그 , 포트폴리오 구현 프로젝트 ( 서버 )

<div align="center">

<a href='https://server-384003056882.asia-northeast1.run.app/graphql' target="_blank">
   <img src='https://img.shields.io/badge/server-site-skyblue?style=for-the-badge&labelColor=4C566A'>
</a>

</div>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" alt="rainbow" />

Monorepo 프로젝트의 서버를 구현했습니다. 게시글의 데이터를 가지고 있고 , 이를 조회 , 추가 및 삭제하는 기능이 구현되어 있습니다.
<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" alt="rainbow" />

## 🔶 Technology Stack

- [javascript](https://js.org/index.html)
- [GraphQL](https://graphql.org/)
- [apollo-server](https://www.apollographql.com/docs/apollo-server)
- [express](https://expressjs.com/)

## Queries

### 전체 게시글 조회

```gql
query GetPosts {
  posts {
    id
    postKey
    title
    tags
  }
}
```

### 특정 게시글 조회

```gql
query GetPostWithPostKey($postKey: String!) {
  post(postKey: $postKey2) {
    id
    postKey
    title
    tags
  }
}
```

## Mutations

### 게시글 추가

```gql
mutation AddPost($title: String!, $postKey: String!, $tags: [String]!) {
  addPost(title: $title, postKey: $postKey, tags: $tags) {
    id
    postKey
    title
    tags
  }
}
```

### 게시글 삭제

```gql
mutation DeletePost($postKey: String!) {
  deletePost(postKey: $postKey)
}
```
