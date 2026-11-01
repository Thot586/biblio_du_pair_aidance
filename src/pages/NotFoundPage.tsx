import { Link } from 'react-router';
import styles from './SimplePage.module.css';

export function NotFoundPage() {
  return (
    <article className={styles.page}>
      <h1>Cette page n’existe pas</h1>
      <p>
        Le lien est peut-être ancien. Essayez le champ de recherche en haut de la page, ou repartez
        du <Link to="/">parcours</Link>.
      </p>
    </article>
  );
}
