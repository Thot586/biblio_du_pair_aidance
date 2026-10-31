import type { QuizQuestion } from '@/content/types';
import { isAnswerCorrect, resultMessage, toggleChoice } from './quizLogic';

const single: QuizQuestion = {
  id: 'q1',
  prompt: 'Question',
  choices: [
    { text: 'A', correct: false, feedback: '' },
    { text: 'B', correct: true, feedback: '' },
  ],
};

const multiple: QuizQuestion = {
  id: 'q2',
  prompt: 'Question',
  multiple: true,
  choices: [
    { text: 'A', correct: true, feedback: '' },
    { text: 'B', correct: true, feedback: '' },
    { text: 'C', correct: false, feedback: '' },
  ],
};

describe('isAnswerCorrect', () => {
  it('exige la seule bonne réponse', () => {
    expect(isAnswerCorrect(single, new Set([1]))).toBe(true);
    expect(isAnswerCorrect(single, new Set([0]))).toBe(false);
  });

  it('exige toutes les bonnes réponses et aucune mauvaise', () => {
    expect(isAnswerCorrect(multiple, new Set([0, 1]))).toBe(true);
    expect(isAnswerCorrect(multiple, new Set([0]))).toBe(false);
    expect(isAnswerCorrect(multiple, new Set([0, 1, 2]))).toBe(false);
  });
});

describe('toggleChoice', () => {
  it('remplace le choix pour une question à réponse unique', () => {
    expect([...toggleChoice(single, new Set([0]), 1)]).toEqual([1]);
  });

  it('ajoute et retire pour une question à plusieurs réponses', () => {
    const once = toggleChoice(multiple, new Set(), 0);
    expect([...toggleChoice(multiple, once, 2)].sort()).toEqual([0, 2]);
    expect([...toggleChoice(multiple, once, 0)]).toEqual([]);
  });
});

describe('resultMessage', () => {
  it('reste encourageant, même sans bonne réponse', () => {
    expect(resultMessage(0, 5)).toContain('normal');
    expect(resultMessage(5, 5)).toContain('Tout est juste');
  });
});
