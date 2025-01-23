import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/PostResolver";
import { AppDataSource } from "./database";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  // 데이터베이스 연결
  await AppDataSource.initialize();
  console.log("Database connected!");

  // GraphQL 스키마 생성
  const schema = await buildSchema({
    resolvers: [PostResolver],
  });

  // Apollo Server 생성
  const server = new ApolloServer({
    schema,
  });

  // 서버 시작
  const { url } = await startStandaloneServer(server, {
    listen: { port: parseInt(process.env.PORT || "4000", 10) },
  });
  console.log(`Server is running at ${url}`);
}

startServer().catch((err) => console.error(err));
