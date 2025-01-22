import { ApolloServer, gql } from "apollo-server";
import Database from "better-sqlite3";
import { typeDefs } from "./schema.js";

// SQLite 데이터베이스 연결
const db = new Database("./posts.db");

// 테이블 생성
db.prepare(
  `
    CREATE TABLE IF NOT EXISTS posts (
      postId TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      createdDate TEXT NOT NULL
    )
  `
).run();

const resolvers = {
  Query: {
    getPost: (_, { postId }) => {
      const row = db
        .prepare("SELECT * FROM posts WHERE postId = ?")
        .get(postId);
      return row || null;
    },
  },
  Mutation: {
    createPost: (_, { postId, title, createdDate }) => {
      try {
        db.prepare(
          "INSERT INTO posts (postId, title, createdDate) VALUES (?, ?, ?)"
        ).run(postId, title, createdDate);
        return { postId, title, createdDate };
      } catch (error) {
        throw new Error("Failed to create post: " + error.message);
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
