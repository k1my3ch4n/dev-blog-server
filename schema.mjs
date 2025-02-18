import { gql } from "graphql-tag";
import pool from "./db.mjs";

export const typeDefs = gql`
  type Post {
    id: Int!
    postKey: String!
    title: String!
    tags: [String]!
  }

  type Query {
    posts(orderBy: String): [Post!]!
    post(postKey: String!): Post!
  }

  type Mutation {
    addPost(title: String!, postKey: String!, tags: [String]!): Post!
    deletePost(postKey: String!): Boolean
  }
`;

export const resolvers = {
  Query: {
    posts: async (_, { orderBy = "ASC" }) => {
      const order = orderBy.toUpperCase() === "DESC" ? "DESC" : "ASC";

      const { rows } = await pool.query(
        `SELECT * FROM posts ORDER BY id ${order}`
      );

      return rows;
    },
    post: async (_, { postKey }) => {
      const { rows } = await pool.query(
        "SELECT * FROM posts WHERE postKey = $1",
        [postKey]
      );

      return rows[0];
    },
  },
  Mutation: {
    addPost: async (_, { postKey, title, tags }) => {
      const result = await pool.query(
        'INSERT INTO posts ("postKey", title, tags) VALUES ($1, $2, $3) RETURNING *',
        [postKey, title, tags || []]
      );

      const newPost = result.rows[0];

      return newPost;
    },
    deletePost: async (_, { postKey }) => {
      const result = await pool.query("DELETE FROM posts WHERE postKey = $1", [
        postKey,
      ]);

      return result.rowCount > 0;
    },
  },
};
