import React, { useState, useEffect } from 'react';
import { Topic, Question, QuizStatus } from './types/quiz';
import { topics } from './data/topics';
import { fetchQuestions } from './services/api';
import TopicCard from './components/TopicCard';
import QuizQuestion from './components/QuizQuestion';
import QuizResults from './components/QuizResults';

function App() {
  const [status, setStatus] = useState<QuizStatus>('idle');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (status === 'active' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && status === 'active') {
      handleNextQuestion();
    }
  }, [timeLeft, status]);

  const startQuiz = async (topicId: string) => {
    setSelectedTopic(topicId);
    const fetchedQuestions = await fetchQuestions(topicId);
    setQuestions(fetchedQuestions);
    setStatus('active');
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(25);
    setUserAnswers([]);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    setUserAnswers(prev => [...prev, answer]);
    
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(handleNextQuestion, 1500);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(25);
    } else {
      setStatus('completed');
    }
  };

  const resetQuiz = () => {
    setStatus('idle');
    setSelectedTopic(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(25);
    setUserAnswers([]);
  };

  if (status === 'idle') {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Quiz Master</h1>
            <p className="text-xl text-gray-600">Choose a topic to start your quiz journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                onSelect={startQuiz}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (status === 'active' && questions.length > 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <QuizQuestion
            question={questions[currentQuestionIndex]}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
            showResult={showResult}
            timeLeft={timeLeft}
          />
        </div>
      </div>
    );
  }

  if (status === 'completed') {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <QuizResults
          score={score}
          totalQuestions={questions.length}
          questions={questions}
          userAnswers={userAnswers}
          onRetry={() => startQuiz(selectedTopic!)}
          onHome={resetQuiz}
        />
      </div>
    );
  }

  return null;
}

export default App;