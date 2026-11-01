import { Link, useSearchParams } from 'react-router';
import type { SearchDocument } from '@/features/search/documents';
import { searchSite, type SearchGroup } from '@/features/search/searchSite';
import { ShortcutList } from '@/features/search/ShortcutList';
import { usePageTitle } from '@/shared/lib/usePageTitle';
import { frenchSpacing, pluralize } from '@/shared/lib/text';
import { LinkRow, LinkRowList } from '@/shared/ui/LinkRow';
import { MoreDetails } from '@/shared/ui/MoreDetails';
import styles from './SearchPage.module.css';

const FIRST_RESULTS = 5;

function ResultRows({ results }: { results: readonly SearchDocument[] }) {
  return (
    <LinkRowList>
      {results.map((result) => (
        <li key={result.id}>
          <LinkRow to={result.to} title={result.title}>
            <span className={styles.excerpt}>{frenchSpacing(result.excerpt)}</span>
          </LinkRow>
        </li>
      ))}
    </LinkRowList>
  );
}

function ResultGroup({ group }: { group: SearchGroup }) {
  const others = group.results.slice(FIRST_RESULTS);
  return (
    <section className={styles.group} aria-labelledby={`resultats-${group.kind}`}>
      <h2 id={`resultats-${group.kind}`}>{group.title}</h2>
      <ResultRows results={group.results.slice(0, FIRST_RESULTS)} />
      {others.length > 0 && (
        <MoreDetails
          title={`Voir ${pluralize(others.length, 'autre résultat', 'autres résultats')}`}
        >
          <ResultRows results={others} />
        </MoreDetails>
      )}
    </section>
  );
}

function NoResult() {
  return (
    <>
      <p className={styles.lead}>
        Rien ne correspond à cette recherche. C’est fréquent : essayez un seul mot, plus simple, par
        exemple « citer » ou « PubMed ».
      </p>
      <section className={styles.group} aria-labelledby="titre-frequent">
        <h2 id="titre-frequent">Vous êtes peut-être dans l’une de ces situations ?</h2>
        <ShortcutList />
      </section>
      <p>
        Si vous ne trouvez toujours pas, une personne peut vous aider : voyez{' '}
        <Link to="/aide">qui contacter</Link>.
      </p>
    </>
  );
}

function SearchHome() {
  return (
    <>
      <p className={styles.lead}>
        Tapez un mot dans le champ de recherche, en haut de la page. Vous pouvez aussi partir d’une
        situation.
      </p>
      <ShortcutList />
    </>
  );
}

export function SearchPage() {
  const [params] = useSearchParams();
  const query = (params.get('q') ?? '').trim();
  usePageTitle(query ? `Résultats pour ${query}` : 'Recherche');

  const groups = searchSite(query);
  const total = groups.reduce((sum, group) => sum + group.results.length, 0);

  if (!query) {
    return (
      <article className={styles.page}>
        <h1>Que cherchez-vous ?</h1>
        <SearchHome />
      </article>
    );
  }

  return (
    <article className={styles.page}>
      <h1>{frenchSpacing(`Résultats pour « ${query} »`)}</h1>
      {total === 0 ? (
        <NoResult />
      ) : (
        <>
          <p className={styles.count}>{pluralize(total, 'résultat')}</p>
          {groups.map((group) => (
            <ResultGroup key={group.kind} group={group} />
          ))}
        </>
      )}
    </article>
  );
}
