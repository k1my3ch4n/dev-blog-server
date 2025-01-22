import { ApolloServer, gql } from "apollo-server";
import sqlite3 from "sqlite3";

// 데이터베이스 설정
const db = new sqlite3.Database("./users.db");
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  )
`);

// GraphQL 스키마 정의
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User!]!
  }

  type Mutation {
    createUser(name: String!): User
    updateUser(id: ID!, name: String!): User
    deleteUser(id: ID!): String
  }
`;

const resolvers = {
  Query: {
    getUser: (_, { id }) =>
      new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      }),
    getUsers: () =>
      new Promise((resolve, reject) => {
        db.all(`SELECT * FROM users`, [], (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
      }),
  },
  Mutation: {
    createUser: (_, { name }) =>
      new Promise((resolve, reject) => {
        db.run(`INSERT INTO users (name) VALUES (?)`, [name], function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, name });
        });
      }),
    updateUser: (_, { id, name }) =>
      new Promise((resolve, reject) => {
        db.run(
          `UPDATE users SET name = ? WHERE id = ?`,
          [name, id],
          function (err) {
            if (err) reject(err);
            else resolve({ id, name });
          }
        );
      }),
    deleteUser: (_, { id }) =>
      new Promise((resolve, reject) => {
        db.run(`DELETE FROM users WHERE id = ?`, [id], function (err) {
          if (err) reject(err);
          else resolve(`User with id ${id} deleted`);
        });
      }),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
