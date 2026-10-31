import type { ReactNode } from 'react';
import { frenchSpacing } from '@/shared/lib/text';
import styles from './MoreDetails.module.css';

/** Le « voir plus » du site : le détail reste replié tant qu’on ne le demande pas. */
export function MoreDetails({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className={styles.more}>
      <summary className={styles.summary}>{frenchSpacing(title)}</summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
}
