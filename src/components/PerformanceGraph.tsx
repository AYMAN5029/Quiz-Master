import React from 'react';
import { Question } from '../types/quiz';

interface PerformanceGraphProps {
  questions: Question[];
  userAnswers: string[];
}

const PerformanceGraph: React.FC<PerformanceGraphProps> = ({ questions, userAnswers }) => {
  const correctAnswers = questions.map((q, i) => q.correctAnswer === userAnswers[i]);
  
  const calculatePerformance = () => {
    let cumulative = 0;
    return correctAnswers.map((correct) => {
      if (correct) cumulative++;
      // Round to nearest whole number
      return Math.round((cumulative / questions.length) * 100);
    });
  };

  const performance = calculatePerformance();

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <h3 className="text-xl font-semibold mb-4">Performance Analysis</h3>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="h-64 relative">
          {performance.map((value, index) => (
            <div
              key={index}
              className="absolute bottom-0 border-b border-l border-gray-300"
              style={{
                left: `${(index / (questions.length - 1)) * 100}%`,
                height: `${value}%`,
                width: '2px',
                backgroundColor: correctAnswers[index] ? '#10B981' : '#EF4444'
              }}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <span>Question 1</span>
          <span>Question {questions.length}</span>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-lg font-medium mb-2">Accuracy</h4>
          <p className="text-3xl font-bold text-blue-600">
            {Math.round((correctAnswers.filter(Boolean).length / questions.length) * 100)}%
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-lg font-medium mb-2">Total Score</h4>
          <p className="text-3xl font-bold text-green-600">
            {correctAnswers.filter(Boolean).length}/{questions.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceGraph;