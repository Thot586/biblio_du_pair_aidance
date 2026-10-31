import { Link } from 'react-router';
import { SITE_SUBTITLE, SITE_TITLE } from '@/content/site';
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
        <p className={styles.subtitle}>{SITE_SUBTITLE}</p>
        <p className={styles.lead}>
          Bienvenue. Vous préparez votre mémoire et vous n’avez jamais fait de recherche
          documentaire ? Ne vous inquiétez pas, ce support est fait pour vous. Nous allons voir
          ensemble, étape par étape, comment trouver votre question, chercher des documents, les
          citer correctement et vous servir de l’IA avec prudence.
        </p>
      </section>

      <section aria-labelledby="titre-parcours" className={styles.block}>
        <h2 id="titre-parcours">Par où voulez-vous commencer ?</h2>
        <p className={styles.intro}>
          Chaque tuile correspond à une question que vous vous posez peut-être. Vous pouvez les
          suivre dans l’ordre si vous débutez, ou aller directement à celle qui vous aide
          aujourd’hui. Elles se colorent au fil de votre lecture.
        </p>
        <Mosaic />
      </section>

      <section aria-labelledby="titre-raccourcis" className={styles.block}>
        <h2 id="titre-raccourcis">Un point précis vous bloque ?</h2>
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
