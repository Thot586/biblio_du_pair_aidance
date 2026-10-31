import { useState, type SyntheticEvent } from 'react';
import { Link } from 'react-router';
import {
  extractDoi,
  fetchWorkByDoi,
  LookupError,
  searchWorks,
  type CrossrefWork,
} from '@/features/apa/domain/crossref';
import { Button } from '@/shared/ui/Button';
import { ExternalLink } from '@/shared/ui/ExternalLink';
import { Field } from '@/shared/ui/Field';
import { Term } from '@/shared/ui/Term';
import panel from '@/shared/ui/Panel.module.css';

type Status = 'idle' | 'loading' | 'done' | 'error';

function WorkSummary({ work }: { work: CrossrefWork }) {
  const year = work.issued?.['date-parts']?.[0]?.[0];
  const authors = (work.author ?? [])
    .slice(0, 3)
    .map((author) => author.family ?? author.name)
    .filter(Boolean)
    .join(', ');
  return (
    <li>
      <strong>{work.title?.[0] ?? 'Titre inconnu'}</strong>
      <p>{[authors, work['container-title']?.[0], year].filter(Boolean).join(', ')}</p>
      <ExternalLink href={`https://doi.org/${work.DOI}`}>Ouvrir ce document</ExternalLink>
    </li>
  );
}

export function ReferenceChecker() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [works, setWorks] = useState<CrossrefWork[]>([]);
  const [askedDoi, setAskedDoi] = useState(false);
  const scholarUrl = `https://scholar.google.com/scholar?hl=fr&q=${encodeURIComponent(text.trim())}`;
  const sudocUrl = `https://www.sudoc.abes.fr/cbs/xslt/DB=2.1/CMD?ACT=SRCHA&IKT=1016&SRT=RLV&TRM=${encodeURIComponent(text.trim())}`;

  const check = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = text.trim();
    if (!query) return;

    const doi = extractDoi(query);
    setAskedDoi(Boolean(doi));
    setStatus('loading');
    setWorks([]);
    try {
      setWorks(doi ? [await fetchWorkByDoi(doi)] : await searchWorks(query, 3));
      setStatus('done');
    } catch (error) {
      if (error instanceof LookupError && error.kind === 'notFound') setStatus('done');
      else setStatus('error');
    }
  };

  return (
    <div className={panel.tool}>
      <form className={panel.step} onSubmit={(event) => void check(event)}>
        <Field
          multiline
          label={
            <>
              Collez la référence, son titre ou son <Term id="doi" />
            </>
          }
          hint="Seul ce texte est envoyé à Crossref, une grande base internationale de références."
          value={text}
          onChange={setText}
        />
        <div className={panel.actions}>
          <Button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Vérification en cours' : 'Vérifier cette référence'}
          </Button>
        </div>
      </form>

      <div aria-live="polite">
        {status === 'error' && (
          <p>
            La vérification n’a pas abouti. Vérifiez votre connexion et réessayez, ou cherchez le
            titre dans Google Scholar.
          </p>
        )}

        {status === 'done' && works.length === 0 && (
          <section className={panel.result}>
            <h2 className={panel.stepTitle}>Rien de trouvé dans Crossref</h2>
            <p>
              {askedDoi
                ? 'Ce DOI n’existe pas dans Crossref. C’est souvent le signe d’une référence inventée.'
                : 'Cela ne prouve pas que la référence est fausse : Crossref ne contient pas tout, surtout pour les documents français.'}{' '}
              Faites encore ces deux vérifications avant de l’écarter.
            </p>
            <ul className={panel.choices}>
              <li>
                <ExternalLink href={scholarUrl}>Chercher dans Google Scholar</ExternalLink>
              </li>
              <li>
                <ExternalLink href={sudocUrl}>Chercher dans le Sudoc</ExternalLink>, pour un livre
                ou une thèse
              </li>
            </ul>
            <p>
              Toujours rien ? Écartez cette référence, ou demandez à{' '}
              <Link to="/aide">votre documentaliste</Link>.
            </p>
          </section>
        )}

        {status === 'done' && works.length > 0 && (
          <section className={panel.result}>
            <h2 className={panel.stepTitle}>
              {askedDoi ? 'Ce DOI existe' : 'Voici les documents les plus proches'}
            </h2>
            <ul className={panel.choices}>
              {works.map((work) => (
                <WorkSummary key={work.DOI} work={work} />
              ))}
            </ul>
            <p>
              <strong>Regardez bien :</strong> une référence inventée emprunte souvent de vrais noms
              ou une vraie revue. Vérifiez que le titre, les auteurs et l’année correspondent tous.
            </p>
            <p>
              Si c’est le bon document, ouvrez-le et vérifiez qu’il dit bien ce que l’IA affirme.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
