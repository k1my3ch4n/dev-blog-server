import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export async function initDB() {
  const client = await pool.connect();
  try {
    // 실행 시 테이블 삭제
    await client.query(`
      DROP TABLE IF EXISTS posts;
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        "postKey" TEXT NOT NULL,
        title TEXT NOT NULL,
        tags TEXT[] DEFAULT '{}'
      )
    `);
    console.log('Database initialized');
  } finally {
    client.release();
  }
}

export default pool;
