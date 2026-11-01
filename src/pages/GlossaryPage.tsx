import { useMemo, useState } from 'react';
import { glossary } from '@/content/glossary';
import { usePageTitle } from '@/shared/lib/usePageTitle';
import { normalizeForSearch } from '@/shared/lib/text';
import { InlineText } from '@/shared/ui/InlineText';
import styles from './GlossaryPage.module.css';

export function GlossaryPage() {
  usePageTitle('Glossaire');
  const [search, setSearch] = useState('');

  const entries = useMemo(() => {
    const needle = normalizeForSearch(search);
    if (!needle) return glossary;
    return glossary.filter((entry) =>
      normalizeForSearch(`${entry.term} ${entry.definition}`).includes(needle),
    );
  }, [search]);

  return (
    <article className={styles.page}>
      <h1>Glossaire</h1>
      <p>Les mots de la recherche, expliqués simplement.</p>
      <label className={styles.search}>
        Filtrer cette liste
        <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} />
      </label>
      {entries.length === 0 ? (
        <p>Ce mot n’est pas encore dans le glossaire. Essayez un autre mot, plus court.</p>
      ) : (
        <dl className={styles.list}>
          {entries.map((entry) => (
            <div key={entry.id} id={entry.id} className={styles.entry}>
              <dt className={styles.term}>{entry.term}</dt>
              <dd className={styles.definition}>
                <InlineText text={entry.definition} /> <InlineText text={entry.detail} />
              </dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}
