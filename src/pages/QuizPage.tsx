import { Link, useParams } from 'react-router';
import { findSection } from '@/content/course';
import { Quiz } from '@/features/quiz/Quiz';
import { usePageTitle } from '@/shared/lib/usePageTitle';
import { NotFoundPage } from './NotFoundPage';
import styles from './SimplePage.module.css';

export function QuizPage() {
  const { sectionSlug } = useParams();
  const section = findSection(sectionSlug);
  usePageTitle(section ? `Quiz : ${section.question}` : 'Page introuvable');

  if (!section) return <NotFoundPage />;

  return (
    <article className={styles.page}>
      <p>
        <Link to={`/${section.slug}`}>{section.question}</Link>
      </p>
      <h1>Ai-je bien compris ?</h1>
      <p>
        Ce quiz n’est pas noté. Rien n’est envoyé. Vous pouvez le refaire autant de fois que vous
        voulez.
      </p>
      <Quiz section={section} />
    </article>
  );
}
