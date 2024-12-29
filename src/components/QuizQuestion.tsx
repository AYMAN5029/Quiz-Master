import React from 'react';
import { Question } from '../types/quiz';

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  showResult: boolean;
  timeLeft: number;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  showResult,
  timeLeft,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-semibold text-gray-600">Time Left: {timeLeft}s</span>
        <div className="w-20 h-20 rounded-full border-4 border-blue-500 flex items-center justify-center">
          <span className="text-2xl font-bold text-blue-500">{timeLeft}</span>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mb-6">{question.question}</h2>
      
      <div className="grid grid-cols-1 gap-4">
        {question.options.map((option) => {
          let buttonClass = "p-4 rounded-lg border-2 text-left transition-all duration-300 ";
          
          if (showResult) {
            if (option === question.correctAnswer) {
              buttonClass += "bg-green-100 border-green-500 text-green-700";
            } else if (option === selectedAnswer) {
              buttonClass += "bg-red-100 border-red-500 text-red-700";
            } else {
              buttonClass += "border-gray-200 text-gray-600";
            }
          } else {
            buttonClass += selectedAnswer === option
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-200 hover:border-blue-500 hover:bg-blue-50";
          }
          
          return (
            <button
              key={option}
              onClick={() => !showResult && onAnswerSelect(option)}
              disabled={showResult}
              className={buttonClass}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuizQuestion;