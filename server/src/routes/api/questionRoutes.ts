import { Router } from 'express';
import Question from '../../models/Question.js';

const router = Router();

// GET /api/questions
// Returns _all_ questions (or change to sample if you prefer)
router.get('/', async (_req, res) => {
  try {
    const all = await Question.find({});
    return res.json(all);
  } catch (err: any) {
    console.error('Error fetching all questions:', err);
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/questions/random
// Returns 10 random questions
router.get('/random', async (_req, res) => {
  try {
    const randomQs = await Question.aggregate([{ $sample: { size: 10 } }]);
    return res.json(randomQs);
  } catch (err: any) {
    console.error('Error fetching random questions:', err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
