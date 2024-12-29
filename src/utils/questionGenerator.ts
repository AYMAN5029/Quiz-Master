import { Question } from '../types/quiz';

const generateScienceQuestions = (): Question[] => {
  const questions: Question[] = [
    {
      id: 1,
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Fe", "Cu"],
      correctAnswer: "Au"
    },
    // Add more questions here...
  ];
  return shuffleArray(questions).slice(0, 25);
};

const generateTechnologyQuestions = (): Question[] => {
  const questions: Question[] = [
    {
      id: 1,
      question: "Who founded Microsoft?",
      options: ["Bill Gates", "Steve Jobs", "Mark Zuckerberg", "Larry Page"],
      correctAnswer: "Bill Gates"
    },
    // Add more questions here...
  ];
  return shuffleArray(questions).slice(0, 25);
};

// Add similar functions for other topics...

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export const getQuestions = (topic: string): Question[] => {
  switch (topic) {
    case 'science':
      return generateScienceQuestions();
    case 'technology':
      return generateTechnologyQuestions();
    // Add other cases...
    default:
      return [];
  }
};