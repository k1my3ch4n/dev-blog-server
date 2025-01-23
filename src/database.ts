import "reflect-metadata";
import { DataSource } from "typeorm";
import { Post } from "./entities/Post";

import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: [Post],
});
