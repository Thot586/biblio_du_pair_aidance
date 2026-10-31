import { useState } from 'react';
import { Link } from 'react-router';
import { citeInText, personalCommunication, withPage } from '../domain/citeInText';
import { formatReference, segmentsToHtml, segmentsToPlainText } from '../domain/formatReference';
import {
  missingInformation,
  SOURCE_TYPES,
  sourceTypeDefinition,
  type FieldSpec,
  type SourceTypeDefinition,
} from '../domain/sourceTypes';
import type { Creator, PersonName, ReferenceEntry, SourceType } from '../domain/types';
import { addReference } from '../referenceListStore';
import { Button } from '@/shared/ui/Button';
import { CopyButton } from '@/shared/ui/CopyButton';
import { Field } from '@/shared/ui/Field';
import { MoreDetails } from '@/shared/ui/MoreDetails';
import { CreatorsEditor } from './CreatorsEditor';
import { QuickFill } from './QuickFill';
import { ReferenceLegend, ReferenceText } from './ReferenceText';
import { ReferenceListPanel } from './ReferenceListPanel';
import panel from '@/shared/ui/Panel.module.css';
import styles from './ApaGenerator.module.css';

const EMPTY_PERSON: Creator = { kind: 'person', family: '', given: '' };

const MONTHS = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
] as const;

function emptyEntry(type: SourceType): ReferenceEntry {
  const hasCreators = sourceTypeDefinition(type).hasCreators;
  return { type, creators: hasCreators ? [EMPTY_PERSON] : [], title: '' };
}

/** Les lignes vides du formulaire ne doivent pas apparaître dans la référence. */
function withoutEmptyCreators(entry: ReferenceEntry): ReferenceEntry {
  const filled = (creator: Creator) =>
    creator.kind === 'person' ? Boolean(creator.family.trim()) : Boolean(creator.name.trim());
  const editors = entry.editors?.filter(filled);
  return {
    ...entry,
    creators: entry.creators.filter(filled),
    ...(editors ? { editors } : {}),
  };
}

function TypeChoice({
  definition,
  selected,
  onSelect,
}: {
  definition: SourceTypeDefinition;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <label className={styles.typeChoice} data-selected={selected}>
      <input type="radio" name="type-document" checked={selected} onChange={onSelect} />
      <span>
        <span className={styles.typeLabel}>{definition.label}</span>
        <span className={styles.typeClue}>{definition.clue}</span>
      </span>
    </label>
  );
}

function DateFields({
  entry,
  fullDate,
  onChange,
}: {
  entry: ReferenceEntry;
  fullDate: boolean;
  onChange: (date: ReferenceEntry['date']) => void;
}) {
  const date = entry.date ?? { year: '' };
  return (
    <div className={styles.dateRow}>
      <Field
        label="Année"
        hint={fullDate ? 'Laissez vide s’il n’y a pas de date.' : undefined}
        inputMode="numeric"
        placeholder="2020"
        value={date.year}
        onChange={(year) => onChange({ ...date, year })}
      />
      {fullDate && (
        <>
          <div className={styles.monthField}>
            <label htmlFor="mois">Mois</label>
            <select
              id="mois"
              value={date.month ?? ''}
              onChange={(event) => onChange({ ...date, month: event.target.value })}
            >
              <option value="">Inconnu</option>
              {MONTHS.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <Field
            label="Jour"
            inputMode="numeric"
            value={date.day ?? ''}
            onChange={(day) => onChange({ ...date, day })}
          />
        </>
      )}
    </div>
  );
}

function SpokenSourceHelper() {
  const [person, setPerson] = useState('');
  const [date, setDate] = useState('');
  const citation = personalCommunication(person || 'A. Martin', date || '3 mars 2026');
  return (
    <div className={panel.step}>
      <p>
        Un entretien, une discussion ou ce qu’une personne a dit en cours ne peuvent pas être
        retrouvés par votre lecteur. Cela ne va donc pas dans la bibliographie : vous le citez
        seulement dans votre texte, de cette façon.
      </p>
      <Field label="Initiale et nom" placeholder="A. Martin" value={person} onChange={setPerson} />
      <Field label="Date" placeholder="3 mars 2026" value={date} onChange={setDate} />
      <p className={styles.citation}>{citation}</p>
      <p className={panel.note}>
        Si l’entretien figure en annexe de votre mémoire, renvoyez plutôt à l’annexe : « Selon la
        personne interrogée B. (Annexe 1)… ». Pensez à l’anonymat des personnes.
      </p>
    </div>
  );
}

export function ApaGenerator() {
  const [entry, setEntry] = useState<ReferenceEntry>(() => emptyEntry('article'));
  const [page, setPage] = useState('');
  const [added, setAdded] = useState(false);

  const definition = sourceTypeDefinition(entry.type);
  const clean = withoutEmptyCreators(entry);
  const segments = formatReference(clean);
  const missing = missingInformation(clean);
  const citation = citeInText(clean);
  const hasContent = Boolean(entry.title.trim());

  const change = (next: ReferenceEntry) => {
    setEntry(next);
    setAdded(false);
  };
  const setField = (field: FieldSpec, value: string) => change({ ...entry, [field.key]: value });
  const selectType = (type: SourceType) => change({ ...emptyEntry(type), title: entry.title });

  return (
    <div className={panel.tool}>
      <section className={panel.step} aria-labelledby="etape-raccourci">
        <h2 id="etape-raccourci" className={panel.stepTitle}>
          Le plus rapide
        </h2>
        <QuickFill onFill={change} />
      </section>

      <section className={panel.step} aria-labelledby="etape-type">
        <h2 id="etape-type" className={panel.stepTitle}>
          1. Qu’avez-vous entre les mains ?
        </h2>
        <p>
          La façon d’écrire une référence dépend du type de document. Si vous hésitez, regardez les
          indices sous chaque choix.
        </p>
        <div className={styles.types}>
          {SOURCE_TYPES.filter((type) => type.frequent).map((type) => (
            <TypeChoice
              key={type.id}
              definition={type}
              selected={entry.type === type.id}
              onSelect={() => selectType(type.id)}
            />
          ))}
        </div>
        <MoreDetails title="Voir les autres types de documents">
          <div className={styles.types}>
            {SOURCE_TYPES.filter((type) => !type.frequent).map((type) => (
              <TypeChoice
                key={type.id}
                definition={type}
                selected={entry.type === type.id}
                onSelect={() => selectType(type.id)}
              />
            ))}
          </div>
        </MoreDetails>
        <MoreDetails title="C’est un entretien, un témoignage oral ou un cours">
          <SpokenSourceHelper />
        </MoreDetails>
        <MoreDetails title="C’est une réponse donnée par une IA">
          <p>
            Une IA n’est pas une source : sa réponse ne peut être ni retrouvée ni vérifiée. Elle ne
            va donc pas dans la bibliographie. Vous déclarez plutôt votre usage en annexe.
          </p>
          <p>
            <Link to="/outils/declaration-ia">Préparer ma déclaration d’usage de l’IA</Link>
          </p>
        </MoreDetails>
      </section>

      <section className={panel.step} aria-labelledby="etape-champs">
        <h2 id="etape-champs" className={panel.stepTitle}>
          2. Recopiez les informations
        </h2>
        <p>Remplissez ce que vous trouvez. La référence se construit au fur et à mesure.</p>

        {definition.hasCreators && (
          <CreatorsEditor
            legend={definition.creatorsLabel}
            creators={entry.creators}
            onChange={(creators) => change({ ...entry, creators })}
          />
        )}
        {definition.canBeEdited && (
          <label className={panel.choice}>
            <input
              type="checkbox"
              checked={Boolean(entry.creatorsAreEditors)}
              onChange={(event) => change({ ...entry, creatorsAreEditors: event.target.checked })}
            />
            Ces personnes dirigent un livre collectif, elles n’écrivent pas tout le livre.
          </label>
        )}
        <DateFields
          entry={entry}
          fullDate={definition.fullDate}
          onChange={(date) => change(date ? { ...entry, date } : entry)}
        />
        {definition.fields.map((field) => (
          <Field
            key={field.key}
            label={field.label}
            hint={field.hint}
            placeholder={field.placeholder}
            value={String(entry[field.key] ?? '')}
            onChange={(value) => setField(field, value)}
          />
        ))}
        {definition.hasEditors && (
          <CreatorsEditor
            legend="Personnes qui dirigent le livre, s’il y en a"
            creators={entry.editors ?? []}
            allowOrganizations={false}
            onChange={(editors) => change({ ...entry, editors: editors as PersonName[] })}
          />
        )}
      </section>

      <section className={panel.step} aria-labelledby="etape-resultat" aria-live="polite">
        <h2 id="etape-resultat" className={panel.stepTitle}>
          3. Votre référence
        </h2>
        {!hasContent ? (
          <p>Votre référence apparaîtra ici dès que vous aurez écrit un titre.</p>
        ) : (
          <div className={panel.result}>
            <ReferenceText segments={segments} />
            <ReferenceLegend />
            {missing.length > 0 && (
              <p className={styles.missing}>Il manque encore : {missing.join(', ')}.</p>
            )}
            <div className={panel.actions}>
              <CopyButton html={segmentsToHtml(segments)} text={segmentsToPlainText(segments)} />
              <Button
                disabled={added}
                onClick={() => {
                  addReference(clean);
                  setAdded(true);
                }}
              >
                {added ? 'Ajoutée à ma liste' : 'Ajouter à ma liste'}
              </Button>
            </div>
            <p className={panel.note}>
              Relisez toujours le résultat : un outil ne remplace pas vos yeux. Vérifiez notamment
              les majuscules du titre et l’orthographe des noms.
            </p>
          </div>
        )}
      </section>

      {hasContent && (
        <section className={panel.step} aria-labelledby="etape-texte">
          <h2 id="etape-texte" className={panel.stepTitle}>
            4. Comment le citer dans votre texte
          </h2>
          <ul className={styles.citations}>
            {citation.firstMention && (
              <li>
                La première fois : <span className={styles.citation}>{citation.firstMention}</span>
              </li>
            )}
            <li>
              À la fin d’une phrase :{' '}
              <span className={styles.citation}>{withPage(citation.parenthetical, page)}</span>
            </li>
            <li>
              Dans la phrase : Selon <span className={styles.citation}>{citation.narrative}</span>, …
            </li>
          </ul>
          <Field
            label="Vous recopiez une phrase mot pour mot ? Indiquez la page"
            hint="La page est obligatoire pour une citation exacte, entre guillemets."
            placeholder="12"
            value={page}
            onChange={setPage}
          />
        </section>
      )}

      <section className={panel.step} aria-labelledby="etape-liste">
        <h2 id="etape-liste" className={panel.stepTitle}>
          Ma liste de références
        </h2>
        <ReferenceListPanel />
      </section>
    </div>
  );
}
