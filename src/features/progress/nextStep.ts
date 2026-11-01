import { course } from '@/content/course';
import { lessonKey, type Section } from '@/content/types';
import { isLessonRead, type Progress } from './progressStore';

export interface NextStep {
  to: string;
  label: string;
}

/** Dans une section : la première page non lue, puis le quiz. */
export function nextStepInSection(section: Section, progress: Progress): NextStep | undefined {
  const lesson = section.lessons.find(
    (candidate) => !isLessonRead(progress, lessonKey(section, candidate)),
  );
  if (lesson) return { to: `/${section.slug}/${lesson.slug}`, label: lesson.question };
  if (progress.quizzes[section.slug]) return undefined;
  return { to: `/${section.slug}/quiz`, label: `Le quiz : ${section.shortTitle}` };
}

/** Ce que la personne n'a pas encore fait, dans l'ordre conseillé. */
export function findNextStep(progress: Progress): NextStep | undefined {
  for (const section of course) {
    const step = nextStepInSection(section, progress);
    if (step) return step;
  }
  return undefined;
}

export function readLessonCount(progress: Progress): number {
  return course
    .flatMap((section) => section.lessons.map((lesson) => lessonKey(section, lesson)))
    .filter((key) => isLessonRead(progress, key)).length;
}

export function hasStarted(progress: Progress): boolean {
  return readLessonCount(progress) > 0 || Object.keys(progress.quizzes).length > 0;
}
