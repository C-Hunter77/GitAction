// client/src/components/Quiz.tsx
import { useState } from 'react';
import type { Question } from '../models/Question.js';
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

  // 1) Show loading state
  if (loading) {
    return <div className="loader">Loading…</div>;
  }

  // 2) Show error state
  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  // 3) Show Start button before quiz begins
  if (!started) {
    return <button onClick={startQuiz}>Start Quiz</button>;
  }

  // 4) If we fetched but got no questions
  if (questions.length === 0) {
    return <div>No questions available.</div>;
  }

  // 5) Show final score when done
  if (finished) {
    return (
      <div className="results">
        <h2>Your score: {score} / {questions.length}</h2>
      </div>
    );
  }

  // 6) Render the current question
  const q = questions[currentIdx];
  const handleAnswer = (choiceIdx: number) => {
    if (q.correct === choiceIdx) {
      setScore(s => s + 1);
    }
    const next = currentIdx + 1;
    if (next < questions.length) {
      setCurrentIdx(next);
    } else {
      setFinished(true);
    }
  };

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
