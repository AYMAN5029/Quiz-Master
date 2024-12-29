export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export type QuizStatus = 'idle' | 'active' | 'completed';

export interface QuizState {
  userAnswers: string[];
  timePerQuestion: number[];
}