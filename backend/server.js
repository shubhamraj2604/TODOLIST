import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { sql } from './config/db.js';
import todoroutes from './routes/todoroutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ For ES Modules (__dirname workaround)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(morgan("dev"));

// ✅ API routes
app.use("/api/todo", todoroutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "frontend", "dist", "index.html"));
});
}

console.log("NODE_ENV is:", process.env.NODE_ENV);

async function initDb() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        description VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("✅ DATABASE INITIALIZED SUCCESSFULLY");
  } catch (error) {
    console.error("❌ Database Error:", error);
  }
}

initDb().then(() => {
  app.listen(PORT, () => {
    console.log("🚀 Server running on port", PORT);
  });
});
