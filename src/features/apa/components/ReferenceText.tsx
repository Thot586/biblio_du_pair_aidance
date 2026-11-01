import type { Segment } from '../domain/types';
import styles from './ApaFormatter.module.css';

/** La référence avec ses morceaux en couleur : on voit à quoi sert chaque partie. */
export function ReferenceText({ segments }: { segments: readonly Segment[] }) {
  return (
    <p className={styles.reference}>
      {segments.map((segment, index) => {
        const content = segment.italic ? <i>{segment.text}</i> : segment.text;
        return (
          <span key={index} data-role={segment.role}>
            {content}
          </span>
        );
      })}
    </p>
  );
}

const LEGEND = [
  { role: 'creator', label: 'Qui a écrit' },
  { role: 'date', label: 'Quand' },
  { role: 'title', label: 'Quoi' },
  { role: 'container', label: 'Où c’est publié' },
  { role: 'link', label: 'Le lien' },
] as const;

export function ReferenceLegend() {
  return (
    <ul className={styles.legendList}>
      {LEGEND.map((item) => (
        <li key={item.role} data-role={item.role}>
          {item.label}
        </li>
      ))}
    </ul>
  );
}
