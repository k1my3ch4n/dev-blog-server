import { gql } from "apollo-server";

export const typeDefs = gql`
  type Post {
    postId: String!
    title: String!
    createdDate: String!
  }

  type Query {
    getPost(postId: String!): Post
  }

  type Mutation {
    createPost(postId: String!, title: String!, createdDate: String!): Post
  }
`;
