import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import db from './config/connection.js';

// 👇 Import your actual API router:
import questionRoutes from './routes/api/questionRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// 1) Mount your API under /api *before* any static/fallback
app.use('/api/questions', questionRoutes);
// (if you have more API endpoints, mount them here too)
// e.g. app.use('/api/users', userRoutes);

// 2) Serve the React build
const clientDist = path.resolve(process.cwd(), 'client', 'dist');
app.use(express.static(clientDist));

// 3) Only now do the SPA fallback for *other* routes
app.get('*', (_req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

// 4) Connect to DB and start listening
db.once('open', () => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  );
});
