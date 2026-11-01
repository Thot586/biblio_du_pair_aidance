import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { frenchSpacing } from '@/shared/lib/text';
import { ChevronIcon } from './icons';
import styles from './LinkRow.module.css';

interface LinkRowProps {
  to: string;
  title: string;
  /** Ce qui précède le titre : un numéro, une tuile, une coche. */
  lead?: ReactNode;
  /** La précision sous le titre. */
  children?: ReactNode;
}

/** Une ligne cliquable en entier : le titre, sa précision et son repère forment une seule cible. */
export function LinkRow({ to, title, lead, children }: LinkRowProps) {
  return (
    <Link to={to} className={styles.row}>
      {lead && <span className={styles.lead}>{lead}</span>}
      <span className={styles.text}>
        <span className={styles.title}>{frenchSpacing(title)}</span>
        {children && <span className={styles.detail}>{children}</span>}
      </span>
      <ChevronIcon className={styles.chevron} />
    </Link>
  );
}

export function LinkRowList({
  ordered = false,
  columns = 1,
  children,
}: {
  ordered?: boolean;
  columns?: 1 | 2;
  children: ReactNode;
}) {
  const List = ordered ? 'ol' : 'ul';
  return (
    <List className={styles.list} data-columns={columns}>
      {children}
    </List>
  );
}
