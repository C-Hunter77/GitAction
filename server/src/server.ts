import express from 'express';
import dotenv from 'dotenv';
import { resolve, join } from 'path';
import db from './config/connection.js';
import questionRouter from './routes/api/questionRoutes.js';

// ← Import your new seeder
import seedDB from './seeds/seed.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Mount API
app.use(express.json());
app.use('/api/questions', questionRouter);

// Serve client/dist
const clientDist = resolve(process.cwd(), 'client', 'dist');
app.use(express.static(clientDist));
app.get('*', (_req, res) => res.sendFile(join(clientDist, 'index.html')));

// When Mongo connects, seed then start
db.once('open', async () => {
  try {
    await seedDB();
  } catch (err) {
    console.error('Seeding failed:', err);
  }
  app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  );
});
