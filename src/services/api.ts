import { Question } from '../types/quiz';
import { decodeHTML } from '../utils/htmlDecoder';

const API_BASE_URL = 'https://opentdb.com/api.php';

export async function fetchQuestions(category: string, amount: number = 25): Promise<Question[]> {
  const categoryMap: Record<string, number> = {
    science: 17,
    technology: 18,
    history: 23,
    geography: 22,
    programming: 19,
    english: 10
  };

  const url = `${API_BASE_URL}?amount=${amount}&category=${categoryMap[category]}&type=multiple`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    return data.results.map((q: any, index: number): Question => ({
      id: index + 1,
      question: decodeHTML(q.question),
      options: q.incorrect_answers
        .concat(q.correct_answer)
        .map(decodeHTML)
        .sort(() => Math.random() - 0.5),
      correctAnswer: decodeHTML(q.correct_answer)
    }));
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
}