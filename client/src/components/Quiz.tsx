// client/src/components/Quiz.tsx
import { useState } from 'react';
import type { Question, Answer } from '../models/Question.js';
import { getQuestions } from '../services/questionApi.js';

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const startQuiz = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getQuestions();
      setQuestions(data);
      setStarted(true);
    } catch (err: any) {
      console.error('Failed to fetch questions:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading…</div>;
  if (error)   return <div className="error">Error: {error}</div>;
  if (!started) return <button onClick={startQuiz}>Start Quiz</button>;
  if (questions.length === 0) return <div>No questions available.</div>;
  if (finished) {
    return (
      <div className="results">
        <h2>Your score: {score} / {questions.length}</h2>
      </div>
    );
  }

  const q = questions[currentIdx];
  const handleAnswer = (ans: Answer) => {
    if (ans.isCorrect) setScore(s => s + 1);
    const next = currentIdx + 1;
    if (next < questions.length) {
      setCurrentIdx(next);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="quiz">
      <h3>{currentIdx + 1}. {q.question}</h3>  {/* ← use q.question */}
      <ul>
        {q.answers.map((ans) => (
          <li key={ans._id}>
            <button onClick={() => handleAnswer(ans)}>
              {ans.text}
            </button>
          </li>
        ))}
      </ul>
      <p>Score: {score}</p>
    </div>
  );
}
