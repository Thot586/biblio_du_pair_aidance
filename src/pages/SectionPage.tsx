import { useParams } from 'react-router';
import {
  course,
  findSection,
  nextSection,
  previousSection,
  sectionMinutes,
} from '@/content/course';
import { lessonKey, type Section } from '@/content/types';
import { nextStepInSection } from '@/features/progress/nextStep';
import { isLessonRead, sectionCompletion, useProgress } from '@/features/progress/progressStore';
import { usePageTitle } from '@/shared/lib/usePageTitle';
import { formatDuration, frenchSpacing, pluralize } from '@/shared/lib/text';
import { Breadcrumb } from '@/shared/ui/Breadcrumb';
import { LinkButton } from '@/shared/ui/Button';
import { CheckIcon } from '@/shared/ui/icons';
import { InlineText } from '@/shared/ui/InlineText';
import { LinkRow, LinkRowList } from '@/shared/ui/LinkRow';
import { NotFoundPage } from './NotFoundPage';
import styles from './SectionPage.module.css';

function PageMark({ number, done }: { number: number; done: boolean }) {
  return (
    <span className={styles.mark} data-done={done}>
      {done ? <CheckIcon className={styles.check} /> : number}
    </span>
  );
}

function SectionPager({ section, finished }: { section: Section; finished: boolean }) {
  const previous = previousSection(section);
  const next = nextSection(section);
  return (
    <nav aria-label="Sections voisines" className={styles.pager}>
      {previous && (
        <LinkButton variant="secondary" to={`/${previous.slug}`}>
          Section précédente
        </LinkButton>
      )}
      <LinkButton variant={finished ? 'primary' : 'secondary'} to={next ? `/${next.slug}` : '/'}>
        {next ? `Section suivante : ${next.shortTitle}` : 'Retour au parcours'}
      </LinkButton>
    </nav>
  );
}

export function SectionPage() {
  const { sectionSlug } = useParams();
  const section = findSection(sectionSlug);
  usePageTitle(section?.question ?? 'Page introuvable');
  const progress = useProgress();

  if (!section) return <NotFoundPage />;

  const quizResult = progress.quizzes[section.slug];
  const step = nextStepInSection(section, progress);
  const started = sectionCompletion(section, progress) > 0;

  return (
    <article className={styles.section}>
      <div className={styles.top}>
        <Breadcrumb crumbs={[{ label: 'Parcours', to: '/' }, { label: section.shortTitle }]} />
        <h1>{frenchSpacing(section.question)}</h1>
        <p className={styles.meta}>
          Section {course.indexOf(section) + 1} sur {course.length}, environ{' '}
          {formatDuration(sectionMinutes(section))}
        </p>
      </div>

      <p className={styles.promise}>
        <InlineText text={section.promise} />
      </p>

      {step && (
        <div>
          <LinkButton to={step.to}>
            {started ? 'Continuer cette section' : 'Commencer cette section'}
          </LinkButton>
        </div>
      )}

      <LinkRowList ordered>
        {section.lessons.map((lesson, index) => {
          const read = isLessonRead(progress, lessonKey(section, lesson));
          return (
            <li key={lesson.slug}>
              <LinkRow
                to={`/${section.slug}/${lesson.slug}`}
                title={lesson.question}
                lead={<PageMark number={index + 1} done={read} />}
              >
                {pluralize(lesson.minutes, 'minute')}
                {read && ', déjà lu'}
              </LinkRow>
            </li>
          );
        })}
        <li>
          <LinkRow
            to={`/${section.slug}/quiz`}
            title="Ai-je bien compris ? Le quiz"
            lead={<PageMark number={section.lessons.length + 1} done={Boolean(quizResult)} />}
          >
            {quizResult
              ? `Meilleur résultat : ${quizResult.correct} sur ${quizResult.total}`
              : `${pluralize(section.quiz.length, 'question')}, sans note`}
          </LinkRow>
        </li>
      </LinkRowList>

      <SectionPager section={section} finished={!step} />
    </article>
  );
}
