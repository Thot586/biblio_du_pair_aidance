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

export function previousSection(section: Section): Section | undefined {
  return course[course.indexOf(section) - 1];
}

export function nextSection(section: Section): Section | undefined {
  return course[course.indexOf(section) + 1];
}

/** Temps de lecture d'une section, en minutes, sans compter le quiz. */
export function sectionMinutes(section: Section): number {
  return section.lessons.reduce((total, lesson) => total + lesson.minutes, 0);
}

/** Temps de lecture de tout le parcours, en minutes. */
export function courseMinutes(): number {
  return course.reduce((total, section) => total + sectionMinutes(section), 0);
}

export function lessonCount(): number {
  return course.reduce((total, section) => total + section.lessons.length, 0);
}
