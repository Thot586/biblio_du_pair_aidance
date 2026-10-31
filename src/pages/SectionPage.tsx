import { Link, useParams } from 'react-router';
import { findSection } from '@/content/course';
import { lessonKey } from '@/content/types';
import { isLessonRead, useProgress } from '@/features/progress/progressStore';
import { usePageTitle } from '@/shared/lib/usePageTitle';
import { pluralize } from '@/shared/lib/text';
import { InlineText } from '@/shared/ui/InlineText';
import { NotFoundPage } from './NotFoundPage';
import styles from './SectionPage.module.css';

export function SectionPage() {
  const { sectionSlug } = useParams();
  const section = findSection(sectionSlug);
  usePageTitle(section?.question ?? 'Page introuvable');
  const progress = useProgress();

  if (!section) return <NotFoundPage />;

  const quizResult = progress.quizzes[section.slug];

  return (
    <article className={styles.section}>
      <h1>{section.question}</h1>
      <p className={styles.promise}>
        <InlineText text={section.promise} />
      </p>
      <ol className={styles.lessons}>
        {section.lessons.map((lesson) => {
          const read = isLessonRead(progress, lessonKey(section, lesson));
          return (
            <li key={lesson.slug} className={styles.lesson}>
              <Link to={`/${section.slug}/${lesson.slug}`} className={styles.lessonLink}>
                {lesson.question}
              </Link>
              <span className={styles.meta}>
                {pluralize(lesson.minutes, 'minute')}
                {read && ', déjà lu'}
              </span>
            </li>
          );
        })}
        <li className={styles.lesson}>
          <Link to={`/${section.slug}/quiz`} className={styles.lessonLink}>
            Ai-je bien compris ? Le quiz
          </Link>
          <span className={styles.meta}>
            {quizResult
              ? `Meilleur résultat : ${quizResult.correct} sur ${quizResult.total}`
              : `${pluralize(section.quiz.length, 'question')}, sans note`}
          </span>
        </li>
      </ol>
    </article>
  );
}
