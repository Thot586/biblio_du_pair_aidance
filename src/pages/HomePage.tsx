import { SITE_SUBTITLE, SITE_TITLE } from '@/content/site';
import { Mosaic } from '@/features/mosaic/Mosaic';
import { NextStepCall } from '@/features/progress/NextStepCall';
import { ShortcutList } from '@/features/search/ShortcutList';
import { usePageTitle } from '@/shared/lib/usePageTitle';
import styles from './HomePage.module.css';

export function HomePage() {
  usePageTitle('Accueil');

  return (
    <>
      <div className={styles.top}>
        <section className={styles.hero}>
          <h1 className={styles.title}>{SITE_TITLE}</h1>
          <p className={styles.subtitle}>{SITE_SUBTITLE}</p>
          <p className={styles.lead}>
            Vous n’avez jamais fait de recherche documentaire ? Ne vous inquiétez pas, nous allons
            avancer ensemble.
          </p>
          <NextStepCall />
        </section>

        <section aria-labelledby="titre-raccourcis" className={styles.urgent}>
          <h2 id="titre-raccourcis">Un point précis vous bloque ?</h2>
          <ShortcutList />
        </section>
      </div>

      <section aria-labelledby="titre-parcours" className={styles.block}>
        <h2 id="titre-parcours">Le parcours, section par section</h2>
        <p className={styles.intro}>
          Suivez les sections dans l’ordre si vous débutez, ou allez directement à celle qui vous
          aide aujourd’hui. Chaque tuile se colore au fil de votre lecture.
        </p>
        <Mosaic />
      </section>
    </>
  );
}
