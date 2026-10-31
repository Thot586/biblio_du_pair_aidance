import type { QuizQuestion } from '@/content/types';

export function isAnswerCorrect(question: QuizQuestion, selected: ReadonlySet<number>): boolean {
  return question.choices.every((choice, index) => choice.correct === selected.has(index));
}

export function toggleChoice(
  question: QuizQuestion,
  selected: ReadonlySet<number>,
  index: number,
): Set<number> {
  if (!question.multiple) return new Set([index]);
  const next = new Set(selected);
  if (next.has(index)) next.delete(index);
  else next.add(index);
  return next;
}

/** Un bilan encourageant : le quiz sert à apprendre, pas à classer. */
export function resultMessage(correct: number, total: number): string {
  if (correct === total) return 'Tout est juste. Vous pouvez passer à la suite.';
  if (correct >= total / 2) return 'C’est une bonne base. Relisez les points qui vous ont surpris.';
  return 'Ces notions sont nouvelles, c’est normal. Relisez les leçons et réessayez quand vous voulez.';
}
