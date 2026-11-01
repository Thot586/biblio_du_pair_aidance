import { useParams } from 'react-router';
import { findSection } from '@/content/course';
import { Quiz } from '@/features/quiz/Quiz';
import { usePageTitle } from '@/shared/lib/usePageTitle';
import { Breadcrumb } from '@/shared/ui/Breadcrumb';
import { NotFoundPage } from './NotFoundPage';
import styles from './SimplePage.module.css';

export function QuizPage() {
  const { sectionSlug } = useParams();
  const section = findSection(sectionSlug);
  usePageTitle(section ? `Quiz : ${section.question}` : 'Page introuvable');

  if (!section) return <NotFoundPage />;

  return (
    <article className={styles.page}>
      <Breadcrumb
        crumbs={[
          { label: 'Parcours', to: '/' },
          { label: section.shortTitle, to: `/${section.slug}` },
          { label: 'Le quiz' },
        ]}
      />
      <h1>Ai-je bien compris ?</h1>
      <p>
        Ce quiz n’est pas noté. Rien n’est envoyé. Vous pouvez le refaire autant de fois que vous
        voulez.
      </p>
      <Quiz section={section} />
    </article>
  );
}
