import { citerSection } from './sections/citer';
import { commencerSection } from './sections/commencer';
import { iaSection } from './sections/ia';
import { motsSection } from './sections/mots';
import { ouChercherSection } from './sections/ouChercher';
import { questionSection } from './sections/question';
import { trierSection } from './sections/trier';
import type { Lesson, Section } from './types';

/** L'ordre conseillé. Chaque section se lit aussi seule. */
export const course: readonly Section[] = [
  commencerSection,
  questionSection,
  motsSection,
  ouChercherSection,
  trierSection,
  citerSection,
  iaSection,
];

export function findSection(slug: string | undefined): Section | undefined {
  return course.find((section) => section.slug === slug);
}

export function findLesson(section: Section, slug: string | undefined): Lesson | undefined {
  return section.lessons.find((lesson) => lesson.slug === slug);
}
