import { Suspense } from 'react';
import { Link, useParams } from 'react-router';
import { TOOLS } from '@/features/tools/catalog';
import { ToolView } from '@/features/tools/ToolView';
import { usePageTitle } from '@/shared/lib/usePageTitle';
import { NotFoundPage } from './NotFoundPage';
import styles from './SimplePage.module.css';

export function ToolPage() {
  const { toolSlug } = useParams();
  const tool = TOOLS.find((entry) => entry.slug === toolSlug);
  usePageTitle(tool?.title ?? 'Page introuvable');

  if (!tool) return <NotFoundPage />;

  return (
    <article className={styles.page}>
      <p>
        <Link to="/outils">Boîte à outils</Link>
      </p>
      <h1>{tool.title}</h1>
      <p>{tool.summary}</p>
      <Suspense fallback={<p>Chargement de l'outil.</p>}>
        <ToolView id={tool.id} />
      </Suspense>
    </article>
  );
}
