import { Link } from 'react-router';
import { frenchSpacing } from '@/shared/lib/text';
import buttonStyles from './Button.module.css';
import { ChevronIcon } from './icons';
import styles from './PagerLink.module.css';

interface PagerLinkProps {
  to: string;
  direction: 'previous' | 'next';
  /** Le sens, en toutes lettres : « Page précédente », « Section suivante »… */
  label: string;
  /** Le titre de la destination. Il est obligatoire : un lien ne se résume jamais à son sens. */
  title: string;
  primary?: boolean;
  onClick?: () => void;
}

/** Un bouton qui dit où il mène : le sens en petit, puis le titre de la page ou de la section. */
export function PagerLink({ to, direction, label, title, primary, onClick }: PagerLinkProps) {
  return (
    <Link
      to={to}
      className={`${buttonStyles.button} ${styles.pager}`}
      data-variant={primary ? 'primary' : 'secondary'}
      data-direction={direction}
      onClick={onClick}
    >
      <span className={styles.label}>
        {direction === 'previous' && <ChevronIcon className={styles.back} />}
        {label}
        {direction === 'next' && <ChevronIcon className={styles.forward} />}
      </span>
      <span className="visually-hidden"> : </span>
      <span>{frenchSpacing(title)}</span>
    </Link>
  );
}
