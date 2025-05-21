// client/src/services/questionApi.ts
import type { Question } from '../models/Question.js';

export async function getQuestions(): Promise<Question[]> {
  const res = await fetch('/api/questions');
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  return res.json();
}
