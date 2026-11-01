import { course } from '@/content/course';
import { lessonKey } from '@/content/types';
import { findNextStep, hasStarted, nextStepInSection, readLessonCount } from './nextStep';
import type { Progress } from './progressStore';

const EMPTY: Progress = { readLessons: {}, quizzes: {} };

function everyLessonRead(): Progress['readLessons'] {
  return Object.fromEntries(
    course.flatMap((section) =>
      section.lessons.map((lesson) => [lessonKey(section, lesson), true]),
    ),
  );
}

const firstSection = course[0];
if (!firstSection) throw new Error('Le parcours est vide.');

describe('la prochaine étape', () => {
  it('propose la toute première page à une personne qui arrive', () => {
    const [firstLesson] = firstSection.lessons;
    expect(findNextStep(EMPTY)?.to).toBe(`/${firstSection.slug}/${firstLesson?.slug}`);
    expect(hasStarted(EMPTY)).toBe(false);
  });

  it('propose la première page non lue', () => {
    const [firstLesson, secondLesson] = firstSection.lessons;
    if (!firstLesson || !secondLesson) throw new Error('Il faut deux leçons.');
    const progress: Progress = {
      readLessons: { [lessonKey(firstSection, firstLesson)]: true },
      quizzes: {},
    };

    expect(findNextStep(progress)?.label).toBe(secondLesson.question);
    expect(hasStarted(progress)).toBe(true);
    expect(readLessonCount(progress)).toBe(1);
  });

  it('propose le quiz quand toutes les pages de la section sont lues', () => {
    const progress: Progress = { readLessons: everyLessonRead(), quizzes: {} };
    expect(nextStepInSection(firstSection, progress)?.to).toBe(`/${firstSection.slug}/quiz`);
  });

  it('ne propose plus rien quand tout est fait', () => {
    const quizzes = Object.fromEntries(
      course.map((section) => [section.slug, { correct: 1, total: 1 }]),
    );
    expect(findNextStep({ readLessons: everyLessonRead(), quizzes })).toBeUndefined();
  });

  it('compte un quiz fait comme un début de parcours', () => {
    const progress: Progress = {
      readLessons: {},
      quizzes: { [firstSection.slug]: { correct: 1, total: 2 } },
    };
    expect(hasStarted(progress)).toBe(true);
  });
});
