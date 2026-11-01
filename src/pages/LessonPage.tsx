import { Link, useParams } from 'react-router';
import { findLesson, findSection } from '@/content/course';
import { lessonKey, type Lesson, type Section } from '@/content/types';
import { BlockList } from '@/features/content-blocks/BlockList';
import { isLessonRead, setLessonRead, useProgress } from '@/features/progress/progressStore';
import { usePageTitle } from '@/shared/lib/usePageTitle';
import { frenchSpacing, pluralize } from '@/shared/lib/text';
import { Breadcrumb } from '@/shared/ui/Breadcrumb';
import { LinkButton } from '@/shared/ui/Button';
import { InlineText } from '@/shared/ui/InlineText';
import { MoreDetails } from '@/shared/ui/MoreDetails';
import { NotFoundPage } from './NotFoundPage';
import styles from './LessonPage.module.css';

function SectionPageList({ section, current }: { section: Section; current: Lesson }) {
  const progress = useProgress();
  return (
    <ol className={styles.pageList}>
      {section.lessons.map((lesson) => (
        <li key={lesson.slug}>
          <Link
            to={`/${section.slug}/${lesson.slug}`}
            aria-current={lesson.slug === current.slug ? 'page' : undefined}
            data-read={isLessonRead(progress, lessonKey(section, lesson))}
          >
            {frenchSpacing(lesson.question)}
          </Link>
        </li>
      ))}
      <li>
        <Link to={`/${section.slug}/quiz`}>Le quiz</Link>
      </li>
    </ol>
  );
}

function LessonPager({ section, lesson }: { section: Section; lesson: Lesson }) {
  const index = section.lessons.indexOf(lesson);
  const previous = section.lessons[index - 1];
  const next = section.lessons[index + 1];
  const nextTo = next ? `/${section.slug}/${next.slug}` : `/${section.slug}/quiz`;
  const nextLabel = next
    ? `Page suivante : ${next.question}`
    : 'Vérifier ce que j’ai compris avec le quiz';

  return (
    <nav aria-label="Pages voisines" className={styles.pager}>
      {previous && (
        <LinkButton variant="secondary" to={`/${section.slug}/${previous.slug}`}>
          Page précédente
        </LinkButton>
      )}
      <LinkButton to={nextTo} onClick={() => setLessonRead(lessonKey(section, lesson), true)}>
        {frenchSpacing(nextLabel)}
      </LinkButton>
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

  return (
    <div className={styles.layout}>
      <nav aria-label="Dans cette section" className={styles.rail}>
        <Link to={`/${section.slug}`} className={styles.railTitle}>
          {frenchSpacing(section.question)}
        </Link>
        <SectionPageList section={section} current={lesson} />
      </nav>

      <article className={styles.lesson}>
        <div className={styles.top}>
          <Breadcrumb
            crumbs={[
              { label: 'Parcours', to: '/' },
              { label: section.shortTitle, to: `/${section.slug}` },
              { label: lesson.question },
            ]}
          />
          <h1>{frenchSpacing(lesson.question)}</h1>
          <p className={styles.meta}>
            Page {section.lessons.indexOf(lesson) + 1} sur {section.lessons.length}, environ{' '}
            {pluralize(lesson.minutes, 'minute')}
          </p>
        </div>

        <section className={styles.essential} aria-labelledby="titre-essentiel">
          <h2 id="titre-essentiel">L’essentiel</h2>
          <p className={styles.summary}>
            <InlineText text={lesson.summary} />
          </p>
          <ul>
            {lesson.takeaways.map((takeaway) => (
              <li key={takeaway}>
                <InlineText text={takeaway} />
              </li>
            ))}
          </ul>
        </section>

        <div className={styles.pagesOnPhone}>
          <MoreDetails title="Voir toutes les pages de cette section">
            <SectionPageList section={section} current={lesson} />
          </MoreDetails>
        </div>

        <BlockList blocks={lesson.blocks} />

        <div className={styles.end} data-print="hide">
          <label className={styles.readToggle}>
            <input
              type="checkbox"
              checked={isLessonRead(progress, key)}
              onChange={(event) => setLessonRead(key, event.target.checked)}
            />
            J’ai lu cette page
          </label>
          <LessonPager section={section} lesson={lesson} />
        </div>
      </article>
    </div>
  );
}
