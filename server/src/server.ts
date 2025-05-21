// server/src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import { resolve, join } from 'path';
import db from './config/connection.js';
import questionRouter from './routes/api/questionRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 1️⃣ JSON API under /api/questions
app.use(express.json());
app.use('/api/questions', questionRouter);

// 2️⃣ Serve static React build from client/dist
const clientDistPath = resolve(process.cwd(), 'client', 'dist');
app.use(express.static(clientDistPath));

// 3️⃣ SPA fallback — everything else returns index.html
app.get('*', (_req, res) => {
  res.sendFile(join(clientDistPath, 'index.html'));
});

// 4️⃣ Connect DB & start server
db.once('open', () => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  );
});
