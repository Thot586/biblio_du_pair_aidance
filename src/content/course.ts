import { questionSection } from './sections/question';
import type { Lesson, Section } from './types';

/** L'ordre conseillé. Chaque section se lit aussi seule. */
export const course: readonly Section[] = [questionSection];

export function findSection(slug: string | undefined): Section | undefined {
  return course.find((section) => section.slug === slug);
}

export function findLesson(section: Section, slug: string | undefined): Lesson | undefined {
  return section.lessons.find((lesson) => lesson.slug === slug);
}
