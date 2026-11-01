import { TOOL_GROUPS } from '@/features/tools/catalog';
import { usePageTitle } from '@/shared/lib/usePageTitle';
import { LinkRow, LinkRowList } from '@/shared/ui/LinkRow';
import styles from './ToolboxPage.module.css';

export function ToolboxPage() {
  usePageTitle('Boîte à outils');

  return (
    <article className={styles.page}>
      <h1>Boîte à outils</h1>
      <p className={styles.lead}>
        Que voulez-vous faire ? Ces outils fonctionnent dans votre navigateur : ce que vous écrivez
        reste sur votre appareil.
      </p>
      {TOOL_GROUPS.map((group) => (
        <section key={group.title} className={styles.group}>
          <h2>{group.title}</h2>
          <LinkRowList>
            {group.tools.map((tool) => (
              <li key={tool.id}>
                <LinkRow to={`/outils/${tool.slug}`} title={tool.title}>
                  {tool.summary}
                </LinkRow>
              </li>
            ))}
          </LinkRowList>
        </section>
      ))}
    </article>
  );
}
