import express from 'express';
import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import db from './config/connection.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 👇 ESM-compatible __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());

// ✅ Serve static assets from client/dist
app.use(express.static(join(__dirname, '../../client/dist')));

// ✅ Fallback route for React Router
app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, '../../client/dist/index.html'));
});

// Start after DB connects
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
