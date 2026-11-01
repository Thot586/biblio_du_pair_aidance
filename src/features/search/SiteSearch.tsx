import { useState, type SyntheticEvent } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { SearchIcon } from '@/shared/ui/icons';
import styles from './SiteSearch.module.css';

const RESULTS_PATH = '/recherche';

/**
 * Le champ de recherche, présent sur toutes les pages. La page ne change qu'à la validation :
 * elle ne se transforme jamais pendant que la personne tape.
 */
export function SiteSearch({ className }: { className?: string | undefined }) {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const addressQuery =
    pathname === RESULTS_PATH ? (new URLSearchParams(search).get('q') ?? '') : '';
  const [value, setValue] = useState(addressQuery);
  const [shownQuery, setShownQuery] = useState(addressQuery);

  // Le champ suit l'adresse : retour en arrière, ou départ vers une autre page.
  if (addressQuery !== shownQuery) {
    setShownQuery(addressQuery);
    setValue(addressQuery);
  }

  const submit = (event: SyntheticEvent) => {
    event.preventDefault();
    const query = value.trim();
    void navigate(query ? `${RESULTS_PATH}?q=${encodeURIComponent(query)}` : RESULTS_PATH);
  };

  return (
    <form
      role="search"
      aria-label="Sur tout le site"
      action="#"
      className={[styles.form, className].filter(Boolean).join(' ')}
      onSubmit={submit}
    >
      <label className="visually-hidden" htmlFor="recherche-site">
        Rechercher sur le site
      </label>
      <input
        id="recherche-site"
        type="search"
        className={styles.input}
        placeholder="Rechercher"
        enterKeyHint="search"
        autoComplete="off"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button type="submit" className={styles.submit} aria-label="Lancer la recherche">
        <SearchIcon className={styles.icon} />
      </button>
    </form>
  );
}
