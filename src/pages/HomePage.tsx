import { Link } from 'react-router';
import { SITE_TITLE } from '@/content/site';
import { SHORTCUTS } from '@/content/shortcuts';
import { Mosaic } from '@/features/mosaic/Mosaic';
import { usePageTitle } from '@/shared/lib/usePageTitle';
import styles from './HomePage.module.css';

export function HomePage() {
  usePageTitle('Accueil');

  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.title}>{SITE_TITLE}</h1>
        <p className={styles.lead}>
          Vous savez déjà des choses que les livres ne disent pas. Ce guide vous aide à les relier à
          ce qui a été écrit, pas à pas, sans prérequis.
        </p>
      </section>

      <section aria-labelledby="titre-parcours" className={styles.block}>
        <h2 id="titre-parcours">Commencez par la question qui vous parle</h2>
        <p className={styles.intro}>
          Vous pouvez suivre l'ordre ou choisir ce qui vous intéresse. Chaque tuile se colore à
          mesure que vous avancez.
        </p>
        <Mosaic />
      </section>

      <section aria-labelledby="titre-raccourcis" className={styles.block}>
        <h2 id="titre-raccourcis">Vous avez une situation précise ?</h2>
        <ul className={styles.shortcuts}>
          {SHORTCUTS.map((shortcut) => (
            <li key={shortcut.to}>
              <Link to={shortcut.to}>{shortcut.label}</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
