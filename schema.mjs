import { gql } from 'graphql-tag';
import pool from './db.mjs';

export const typeDefs = gql`
  type Post {
    id: Int!
    postKey: String!
    title: String!
    tags: [String]!
  }

  type Query {
    getPosts: [Post!]!
    getPost(postId: String!): Post
  }

  type Mutation {
    addPost(title: String!, postKey: String!, tags: [String]!): Post!
    deletePost(postId: String!): Boolean
  }
`;

export const resolvers = {
  Query: {
    getPosts: async () => {
      const { rows } = await pool.query('SELECT * FROM posts');
      return rows;
    },
    getPost: async (_, { id }) => {
      const { rows } = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
      return rows[0];
    },
  },
  Mutation: {
    addPost: async (_, { postKey, title, tags }) => {
      const result = await pool.query(
        'INSERT INTO posts ("postKey", title, tags) VALUES ($1, $2, $3) RETURNING *',
        [postKey, title, tags || []],
      );

      const newPost = result.rows[0];

      return newPost;
    },
    deletePost: async (_, { id }) => {
      const result = await pool.query('DELETE FROM posts WHERE id = $1', [id]);
      return result.rowCount > 0;
    },
  },
};
