import { useState } from 'react';
import type { Question } from '../models/Question.js';
import { getQuestions } from '../services/questionApi.js';

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string| null>(null);
  const [finished, setFinished] = useState(false);

  async function startQuiz() {
    setLoading(true);
    setError(null);
    try {
      const data = await getQuestions();
      setQuestions(data);
      setStarted(true);
    } catch (err: any) {
      console.error('fetch questions failed', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleAnswer(choiceIdx: number) {
    if (questions[currentIdx].correct === choiceIdx) {
      setScore(s => s + 1);
    }
    const next = currentIdx + 1;
    if (next < questions.length) {
      setCurrentIdx(next);
    } else {
      setFinished(true);
    }
  }

  // 1) Loading state
  if (loading) return <div className="loader">Loading…</div>;
  // 2) Error state
  if (error) return <div className="error">Error: {error}</div>;
  // 3) Not started
  if (!started) return <button onClick={startQuiz}>Start Quiz</button>;
  // 4) Finished
  if (finished) {
    return (
      <div className="results">
        <h2>Your score: {score} / {questions.length}</h2>
      </div>
    );
  }

  // 5) Show current question
  const q = questions[currentIdx];
  return (
    <div className="quiz">
      <h3>{currentIdx + 1}. {q.question}</h3>
      <ul>
        {q.answers.map((ans, i) => (
          <li key={i}>
            <button onClick={() => handleAnswer(i)}>{ans}</button>
          </li>
        ))}
      </ul>
      <p>Score: {score}</p>
    </div>
  );
}
