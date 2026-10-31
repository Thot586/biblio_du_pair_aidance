import styles from './SimplePage.module.css';

/** Affichée si une page plante : elle ne dépend d’aucune autre partie du site. */
export function ErrorPage() {
  return (
    <main className={styles.page} style={{ margin: '0 auto', padding: '2rem 1rem' }}>
      <h1>Cette page n’a pas pu s’afficher</h1>
      <p>
        Le problème ne vient pas de vous. Rechargez la page. Si cela ne suffit pas, repartez de
        l’accueil : votre progression est conservée.
      </p>
      <p>
        <a href={import.meta.env.BASE_URL}>Revenir à l’accueil</a>
      </p>
    </main>
  );
}
