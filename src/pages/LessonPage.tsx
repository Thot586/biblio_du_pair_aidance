import { Link, useParams } from 'react-router';
import { findLesson, findSection } from '@/content/course';
import { lessonKey, type Lesson, type Section } from '@/content/types';
import { BlockList } from '@/features/content-blocks/BlockList';
import { isLessonRead, setLessonRead, useProgress } from '@/features/progress/progressStore';
import { usePageTitle } from '@/shared/lib/usePageTitle';
import { pluralize } from '@/shared/lib/text';
import { InlineText } from '@/shared/ui/InlineText';
import { NotFoundPage } from './NotFoundPage';
import styles from './LessonPage.module.css';

function SectionRail({ section, current }: { section: Section; current: Lesson }) {
  const progress = useProgress();
  return (
    <nav aria-label="Dans cette section" className={styles.rail}>
      <Link to={`/${section.slug}`} className={styles.railTitle}>
        {section.question}
      </Link>
      <ol className={styles.railList}>
        {section.lessons.map((lesson) => (
          <li key={lesson.slug}>
            <Link
              to={`/${section.slug}/${lesson.slug}`}
              aria-current={lesson.slug === current.slug ? 'page' : undefined}
              data-read={isLessonRead(progress, lessonKey(section, lesson))}
            >
              {lesson.question}
            </Link>
          </li>
        ))}
        <li>
          <Link to={`/${section.slug}/quiz`}>Le quiz</Link>
        </li>
      </ol>
    </nav>
  );
}

export function LessonPage() {
  const { sectionSlug, lessonSlug } = useParams();
  const section = findSection(sectionSlug);
  const lesson = section && findLesson(section, lessonSlug);
  usePageTitle(lesson?.question ?? 'Page introuvable');
  const progress = useProgress();

  if (!section || !lesson) return <NotFoundPage />;

  const key = lessonKey(section, lesson);
  const read = isLessonRead(progress, key);
  const index = section.lessons.indexOf(lesson);
  const next = section.lessons[index + 1];
  const nextTo = next ? `/${section.slug}/${next.slug}` : `/${section.slug}/quiz`;
  const nextLabel = next ? next.question : 'Vérifier ce que j’ai compris avec le quiz';

  return (
    <div className={styles.layout}>
      <SectionRail section={section} current={lesson} />

      <article className={styles.lesson}>
        <h1>{lesson.question}</h1>
        <p className={styles.meta}>Environ {pluralize(lesson.minutes, 'minute')}</p>

        <p className={styles.summary}>
          <InlineText text={lesson.summary} />
        </p>

        <BlockList blocks={lesson.blocks} />

        <section className={styles.takeaways} aria-labelledby="titre-retenir">
          <h2 id="titre-retenir">À retenir</h2>
          <ul>
            {lesson.takeaways.map((takeaway) => (
              <li key={takeaway}>
                <InlineText text={takeaway} />
              </li>
            ))}
          </ul>
        </section>

        <div className={styles.end} data-print="hide">
          <label className={styles.readToggle}>
            <input
              type="checkbox"
              checked={read}
              onChange={(event) => setLessonRead(key, event.target.checked)}
            />
            J’ai lu cette page
          </label>
          <p>
            Et ensuite : <Link to={nextTo}>{nextLabel}</Link>
          </p>
        </div>
      </article>
    </div>
  );
}
