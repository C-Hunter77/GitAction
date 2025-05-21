// server/src/seeds/seed.ts
import Question from '../models/Question.js';
import pythonQuestions from './pythonQuestions.json' assert { type: 'json' };

export default async function seedDB() {
  // 🗑️ wipe the collection
  const deleted = await Question.deleteMany({});
  console.log(`Cleared ${deleted.deletedCount} old questions.`);

  // 🌱 insert fresh ones
  const inserted = await Question.insertMany(pythonQuestions);
  console.log(`Inserted ${inserted.length} questions.`);
}
