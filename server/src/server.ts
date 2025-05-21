import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

import db from './config/connection.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// ✅ Serve static files from client/dist (correct path for Render)
app.use(express.static(path.resolve('client', 'dist')));

// ✅ Fallback route for SPA support (e.g., React Router)
app.get('*', (_req, res) => {
  res.sendFile(path.resolve('client', 'dist', 'index.html'));
});

// ✅ Connect to DB and start server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
