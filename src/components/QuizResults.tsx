import React from 'react';
import PerformanceGraph from './PerformanceGraph';
import { Question } from '../types/quiz';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  questions: Question[];
  userAnswers: string[];
  onRetry: () => void;
  onHome: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  totalQuestions,
  questions,
  userAnswers,
  onRetry,
  onHome,
}) => {
  // Round to nearest whole number
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Quiz Completed!</h2>
      
      <div className="mb-8 text-center">
        <div className="w-48 h-48 mx-auto relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-blue-600">{percentage}%</span>
          </div>
          <svg className="transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="8"
              strokeDasharray={`${percentage * 2.83} 283`}
            />
          </svg>
        </div>
      </div>
      
      <PerformanceGraph questions={questions} userAnswers={userAnswers} />
      
      <div className="flex space-x-4 justify-center mt-8">
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={onHome}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default QuizResults;