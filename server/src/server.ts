import express from 'express';
import dotenv from 'dotenv';
import { resolve, join } from 'path';
import db from './config/connection.js';
import questionRouter from './routes/api/questionRoutes.js';
import seedDB from './seeds/seed.js'; // <-- matches the file above

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// JSON API
app.use(express.json());
app.use('/api/questions', questionRouter);

// Serve React build
const clientDist = resolve(process.cwd(), 'client', 'dist');
app.use(express.static(clientDist));
app.get('*', (_req, res) => {
  res.sendFile(join(clientDist, 'index.html'));
});

// Connect & seed on open
db.once('open', async () => {
  try {
    await seedDB();
  } catch (err) {
    console.error('Seeding error:', err);
  }
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
