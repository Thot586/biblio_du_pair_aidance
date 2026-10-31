import { useRef } from 'react';
import { Link, NavLink } from 'react-router';
import { PreferencesDialog } from '@/features/preferences/PreferencesDialog';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { to: '/', label: 'Le parcours', end: true },
  { to: '/outils', label: 'Boîte à outils', end: false },
  { to: '/glossaire', label: 'Glossaire', end: false },
  { to: '/aide', label: "Qui peut m'aider ?", end: false },
] as const;

export function Header() {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          Recherche documentaire et IA
        </Link>
        <nav aria-label="Navigation principale" className={styles.nav}>
          {NAV_ITEMS.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={styles.navLink}>
              {label}
            </NavLink>
          ))}
          <button
            type="button"
            className={styles.displayButton}
            onClick={() => dialog.current?.showModal()}
          >
            Affichage
          </button>
        </nav>
      </div>
      <PreferencesDialog ref={dialog} />
    </header>
  );
}
