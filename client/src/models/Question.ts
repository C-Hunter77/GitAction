// client/src/models/Question.ts
export interface Answer {
  _id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  _id: string;
  question: string;    // ← note: "question" not "text"
  answers: Answer[];
}
