import { Link } from 'react-router';
import { TOOLS } from '@/features/tools/catalog';
import { usePageTitle } from '@/shared/lib/usePageTitle';
import styles from './ToolboxPage.module.css';

export function ToolboxPage() {
  usePageTitle('Boîte à outils');

  return (
    <article className={styles.page}>
      <h1>Où retrouver tous les outils ?</h1>
      <p className={styles.lead}>
        Ces outils fonctionnent dans votre navigateur. Ce que vous écrivez reste sur votre appareil.
      </p>
      <ul className={styles.tools}>
        {TOOLS.map((tool) => (
          <li key={tool.id} className={styles.tool}>
            <Link to={`/outils/${tool.slug}`} className={styles.title}>
              {tool.title}
            </Link>
            <p>{tool.summary}</p>
          </li>
        ))}
      </ul>
      <p>
        Il vous manque un mot ? Consultez <Link to="/glossaire">le glossaire</Link>. Besoin d’une
        personne ? Voyez <Link to="/aide">qui peut vous aider</Link>.
      </p>
    </article>
  );
}
