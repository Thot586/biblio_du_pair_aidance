import { CREDITS } from '@/content/sources';
import { usePageTitle } from '@/shared/lib/usePageTitle';
import { ExternalLink } from '@/shared/ui/ExternalLink';
import styles from './SimplePage.module.css';

export function SourcesPage() {
  usePageTitle('Sources');

  return (
    <article className={styles.page}>
      <h1>Sources</h1>
      <p>
        Ce support a été réécrit pour le rendre plus simple et plus progressif. Voici les documents
        sur lesquels il s'appuie.
      </p>
      <ul className={styles.list}>
        {CREDITS.map((credit) => (
          <li key={credit.title}>
            {credit.url ? (
              <ExternalLink href={credit.url}>{credit.title}</ExternalLink>
            ) : (
              credit.title
            )}
            {credit.note && <> : {credit.note}</>}
          </li>
        ))}
      </ul>
    </article>
  );
}
