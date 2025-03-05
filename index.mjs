import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import bodyParser from "body-parser";
import { typeDefs, resolvers } from "./schema.mjs";
import { initDB } from "./db.mjs";

const VALIDATED_API_KEY = [process.env.VALIDATED_API_KEY];

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const apiKey = req.headers["x-api-key"];

        if (!apiKey || !VALIDATED_API_KEY.includes(apiKey)) {
          throw new Error("Unauthorized: Invalid API Key");
        }

        console.log("Authorized: Valid API Key");
      },
    })
  );

  const PORT = 4000;

  app.listen(PORT, () => {
    console.log(`🚀 Server ready`);
  });

  await initDB();
}

startServer();
