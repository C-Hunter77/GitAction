// client/src/App.tsx (or wherever your Quiz lives)
import { useState } from 'react';

interface Question {
  _id: string;
  question: string;
  answers: string[];
  correct: number;
}

export default function App() {
  const [questions, setQuestions] = useState<Question[]|null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const handleStart = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/questions');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Question[] = await res.json();
      console.log('questions loaded', data);
      setQuestions(data);
    } catch (err: any) {
      console.error('fetch questions failed', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 1. show error if it happened
  if (error) return <div className="error">Error: {error}</div>;

  // 2. show loading spinner
  if (loading) {
    return (
      <div className="spinner">
        <div className="loader">Loading…</div>
      </div>
    );
  }

  // 3. show start button if we haven’t loaded questions yet
  if (!questions) {
    return <button onClick={handleStart}>Start Quiz</button>;
  }

  // 4. render your quiz once questions are loaded
  return (
    <div>
      {questions.map((q, i) => (
        <div key={q._id}>
          <h3>{i + 1}. {q.question}</h3>
          {/* your answer buttons… */}
        </div>
      ))}
    </div>
  );
}
