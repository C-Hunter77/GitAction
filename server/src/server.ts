import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import db from './config/connection.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// ✅ Serve static files from client/dist (adjusted for compiled dist/server.js path)
app.use(express.static(path.join(__dirname, '../../client/dist')));

// ✅ Fallback route for SPA support
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

// ✅ Start server after DB connects
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
