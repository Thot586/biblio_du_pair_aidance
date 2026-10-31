import { Link } from 'react-router';
import styles from './SimplePage.module.css';

export function NotFoundPage() {
  return (
    <article className={styles.page}>
      <h1>Cette page n'existe pas</h1>
      <p>
        Le lien est peut-être ancien. Repartez de <Link to="/">la page d'accueil</Link>, ou cherchez
        un mot dans <Link to="/glossaire">le glossaire</Link>.
      </p>
    </article>
  );
}
