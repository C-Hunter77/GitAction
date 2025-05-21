import path from 'path';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// ✅ Serve static files from built client
app.use(express.static(path.join(process.cwd(), 'client', 'dist')));

// ✅ Fallback route for SPA (Vite, React Router)
app.get('*', (_req, res) => {
  res.sendFile(path.join(process.cwd(), 'client', 'dist', 'index.html'));
});

// ✅ Connect to DB and start server
import db from './config/connection.js';

db.once('open', () => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  );
});
