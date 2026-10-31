import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Footer } from './Footer';
import { Header } from './Header';
import styles from './RootLayout.module.css';

export function RootLayout() {
  const { pathname } = useLocation();
  const main = useRef<HTMLElement>(null);
  const previousPath = useRef(pathname);

  // Après un changement de page, le clavier et les lecteurs d’écran repartent du contenu.
  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    window.scrollTo(0, 0);
    main.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <div className={styles.page}>
      <a
        className={styles.skipLink}
        href="#contenu"
        onClick={(event) => {
          event.preventDefault();
          main.current?.focus();
        }}
      >
        Aller au contenu
      </a>
      <Header />
      <main id="contenu" ref={main} tabIndex={-1} className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
