import { Link } from 'react-router';
import { frenchSpacing } from '@/shared/lib/text';
import styles from './Breadcrumb.module.css';

export interface Crumb {
  label: string;
  /** Absent pour la page en cours : un lien vers soi-même ne mènerait nulle part. */
  to?: string;
}

/** « Où suis-je ? ». Sur téléphone, seul le niveau parent reste, pour ne pas passer à la ligne. */
export function Breadcrumb({ crumbs }: { crumbs: readonly Crumb[] }) {
  return (
    <nav aria-label="Fil d’Ariane" className={styles.breadcrumb}>
      <ol className={styles.list}>
        {crumbs.map(({ label, to }) => (
          <li key={label} className={styles.crumb}>
            {to ? (
              <Link to={to} className={styles.link}>
                {frenchSpacing(label)}
              </Link>
            ) : (
              <span aria-current="page" className={styles.current}>
                {frenchSpacing(label)}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
