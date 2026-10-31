import { useState, type SyntheticEvent } from 'react';
import {
  extractDoi,
  fetchWorkByDoi,
  LookupError,
  searchWorks,
  workToEntry,
  type CrossrefWork,
} from '../domain/crossref';
import type { ReferenceEntry } from '../domain/types';
import { Button } from '@/shared/ui/Button';
import { Field } from '@/shared/ui/Field';
import { Term } from '@/shared/ui/Term';
import panel from '@/shared/ui/Panel.module.css';

type Status = 'idle' | 'loading' | 'notFound' | 'error';

function describeWork(work: CrossrefWork): string {
  const year = work.issued?.['date-parts']?.[0]?.[0];
  const author = work.author?.[0];
  const name = author?.family ?? author?.name;
  return [work.title?.[0], name, work['container-title']?.[0], year].filter(Boolean).join(', ');
}

/** Remplit le formulaire à partir d’un DOI ou d’un titre, grâce à Crossref. */
export function QuickFill({ onFill }: { onFill: (entry: ReferenceEntry) => void }) {
  const [text, setText] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [candidates, setCandidates] = useState<CrossrefWork[]>([]);

  const submit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = text.trim();
    if (!query) return;

    setStatus('loading');
    setCandidates([]);
    try {
      const doi = extractDoi(query);
      if (doi) {
        onFill(workToEntry(await fetchWorkByDoi(doi)));
        setStatus('idle');
        return;
      }
      const works = await searchWorks(query);
      setCandidates(works);
      setStatus(works.length > 0 ? 'idle' : 'notFound');
    } catch (error) {
      setStatus(error instanceof LookupError && error.kind === 'notFound' ? 'notFound' : 'error');
    }
  };

  return (
    <form className={panel.step} onSubmit={(event) => void submit(event)}>
      <Field
        label={
          <>
            Vous avez un <Term id="doi" /> ou un titre ? Collez-le ici
          </>
        }
        hint="Nous chercherons la référence dans Crossref, une grande base internationale. Cela marche très bien pour les articles, moins bien pour les livres français."
        value={text}
        onChange={setText}
      />
      <div className={panel.actions}>
        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Recherche en cours' : 'Chercher la référence'}
        </Button>
      </div>

      <div role="status">
        {status === 'notFound' && (
          <p>
            Rien de trouvé dans Crossref. Pas d’inquiétude, c’est fréquent pour les documents
            français : remplissez simplement le formulaire ci-dessous.
          </p>
        )}
        {status === 'error' && (
          <p>
            La recherche n’a pas abouti. Vérifiez votre connexion et réessayez, ou remplissez le
            formulaire à la main.
          </p>
        )}
      </div>

      {candidates.length > 0 && (
        <div className={panel.step}>
          <p>Lequel de ces documents est le vôtre ?</p>
          <ul className={panel.choices}>
            {candidates.map((work) => (
              <li key={work.DOI}>
                <Button
                  variant="secondary"
                  onClick={() => {
                    onFill(workToEntry(work));
                    setCandidates([]);
                  }}
                >
                  {describeWork(work)}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}
