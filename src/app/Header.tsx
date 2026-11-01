import { useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { course } from '@/content/course';
import { PreferencesDialog } from '@/features/preferences/PreferencesDialog';
import { SiteSearch } from '@/features/search/SiteSearch';
import styles from './Header.module.css';
import { useMenuFit } from './useMenuFit';

const NAV_ITEMS = [
  { to: '/outils', label: 'Boîte à outils' },
  { to: '/glossaire', label: 'Glossaire' },
  { to: '/aide', label: 'Aide' },
] as const;

/** L'accueil, les sections et leurs leçons forment le parcours : l'onglet reste allumé. */
function isInCourse(pathname: string): boolean {
  return (
    pathname === '/' ||
    course.some(({ slug }) => pathname === `/${slug}` || pathname.startsWith(`/${slug}/`))
  );
}

export function Header() {
  const dialog = useRef<HTMLDialogElement>(null);
  const menu = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  useMenuFit(menu);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <svg viewBox="0 0 32 32" className={styles.logo} aria-hidden="true" focusable="false">
            <path d="M0 32A32 32 0 0 1 32 0v32z" fill="var(--sarcelle)" />
            <circle cx="23" cy="9" r="5" fill="var(--rose)" />
          </svg>
          <span className={styles.brandName}>Recherche documentaire et IA</span>
        </Link>
        <nav ref={menu} aria-label="Navigation principale" className={styles.nav}>
          <Link
            to="/"
            className={styles.navLink}
            aria-current={isInCourse(pathname) ? 'true' : undefined}
          >
            Parcours
          </Link>
          {NAV_ITEMS.map(({ to, label }) => (
            <NavLink key={to} to={to} className={styles.navLink}>
              {label}
            </NavLink>
          ))}
        </nav>
        <SiteSearch className={styles.search} />
        <button
          type="button"
          className={styles.displayButton}
          onClick={() => dialog.current?.showModal()}
        >
          Affichage
        </button>
      </div>
      <PreferencesDialog ref={dialog} />
    </header>
  );
}
