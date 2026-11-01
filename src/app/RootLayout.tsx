import { useEffect, useRef } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import { Footer } from './Footer';
import { Header } from './Header';
import styles from './RootLayout.module.css';

export function RootLayout() {
  const { pathname, search } = useLocation();
  const address = `${pathname}${search}`;
  const main = useRef<HTMLElement>(null);
  const previousAddress = useRef(address);

  // Après un changement de page, le clavier et les lecteurs d’écran repartent du contenu.
  useEffect(() => {
    if (previousAddress.current === address) return;
    previousAddress.current = address;
    main.current?.focus({ preventScroll: true });
  }, [address]);

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
      <ScrollRestoration />
    </div>
  );
}
