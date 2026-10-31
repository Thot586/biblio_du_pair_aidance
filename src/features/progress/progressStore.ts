import type { LessonKey, Section } from '@/content/types';
import { lessonKey } from '@/content/types';
import { createStore, useStore } from '@/shared/lib/createStore';

export interface QuizResult {
  correct: number;
  total: number;
}

export interface Progress {
  readLessons: Partial<Record<LessonKey, true>>;
  quizzes: Partial<Record<string, QuizResult>>;
}

const EMPTY_PROGRESS: Progress = { readLessons: {}, quizzes: {} };

export const progressStore = createStore<Progress>('biblio-du:progress:v1', EMPTY_PROGRESS);

export function useProgress(): Progress {
  return useStore(progressStore);
}

export function isLessonRead(progress: Progress, key: LessonKey): boolean {
  return progress.readLessons[key] === true;
}

export function setLessonRead(key: LessonKey, read: boolean): void {
  progressStore.update((current) => {
    const { [key]: _previous, ...others } = current.readLessons;
    return { ...current, readLessons: read ? { ...others, [key]: true } : others };
  });
}

export function recordQuizResult(sectionSlug: string, result: QuizResult): void {
  progressStore.update((current) => {
    const best = current.quizzes[sectionSlug];
    if (best && best.correct >= result.correct) return current;
    return { ...current, quizzes: { ...current.quizzes, [sectionSlug]: result } };
  });
}

export function clearProgress(): void {
  progressStore.set(EMPTY_PROGRESS);
}

/** Part de la section parcourue, entre 0 et 1. Le quiz compte comme une leçon. */
export function sectionCompletion(section: Section, progress: Progress): number {
  const lessonsRead = section.lessons.filter((lesson) =>
    isLessonRead(progress, lessonKey(section, lesson)),
  ).length;
  const quizDone = progress.quizzes[section.slug] ? 1 : 0;
  return (lessonsRead + quizDone) / (section.lessons.length + 1);
}
