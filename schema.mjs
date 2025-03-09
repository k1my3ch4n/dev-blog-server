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
    posts(orderBy: String, tag: String!): [Post!]!
    post(postKey: String!): Post!
    allTags: [String!]!
    postsByTag(tag: String!, orderBy: String): [Post!]!
  }

  type Mutation {
    addPost(title: String!, postKey: String!, tags: [String]!): Post!
    deletePost(postKey: String!): Boolean
  }
`;

export const resolvers = {
  Query: {
    posts: async (_, { tag, orderBy = "DESC" }) => {
      const order = orderBy.toUpperCase() === "DESC" ? "DESC" : "ASC";

      let query = "SELECT * FROM posts";
      const queryParams = [];

      console.log(tag);

      if (tag) {
        query += " WHERE $1 = ANY(tags)";
        queryParams.push(tag);
      }

      const { rows } = await pool.query(
        `${query} ORDER BY id ${order}`,
        queryParams
      );

      return rows;
    },
    post: async (_, { postKey }) => {
      const { rows } = await pool.query(
        'SELECT * FROM posts WHERE "postKey" = $1',
        [postKey]
      );

      return rows[0];
    },
    allTags: async (_, __) => {
      const { rows } = await pool.query(
        "SELECT DISTINCT UNNEST(tags) AS tag FROM posts ORDER BY tag;"
      );
      return rows.map((row) => row.tag);
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
      const result = await pool.query(
        'DELETE FROM posts WHERE "postKey" = $1',
        [postKey]
      );

      return result.rowCount > 0;
    },
  },
};
