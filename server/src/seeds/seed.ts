// server/src/seeds/seed.ts
import cleanDB from './cleanDb.js';
import Question from '../models/Question.js';
import { createRequire } from 'module';

// Create a CommonJS require so we can load JSON
const require = createRequire(import.meta.url);
const pythonQuestions: {
  question: string;
  answers: string[];
  correct: number;
}[] = require('./pythonQuestions.json');

export default async function seedDB() {
  // 1️⃣ Clean the collection
  await cleanDB('Question', 'questions');
  console.log('🗑  questions collection cleaned.');

  // 2️⃣ Insert your JSON data
  const inserted = await Question.insertMany(pythonQuestions);
  console.log(`✅ Inserted ${inserted.length} questions.`);
}
