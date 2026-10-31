import type { Creator, PersonName } from '../domain/types';
import { Button } from '@/shared/ui/Button';
import { Field } from '@/shared/ui/Field';
import styles from './ApaGenerator.module.css';

const EMPTY_PERSON: PersonName = { kind: 'person', family: '', given: '' };

interface CreatorsEditorProps {
  legend: string;
  creators: readonly Creator[];
  allowOrganizations?: boolean;
  onChange: (creators: Creator[]) => void;
}

export function CreatorsEditor({
  legend,
  creators,
  allowOrganizations = true,
  onChange,
}: CreatorsEditorProps) {
  const replace = (index: number, creator: Creator) =>
    onChange(creators.map((current, position) => (position === index ? creator : current)));
  const remove = (index: number) => onChange(creators.filter((_, position) => position !== index));

  return (
    <fieldset className={styles.creators}>
      <legend className={styles.legend}>{legend}</legend>
      {creators.map((creator, index) => (
        <div key={index} className={styles.creatorRow}>
          {creator.kind === 'person' ? (
            <>
              <Field
                label={`Nom ${creators.length > 1 ? index + 1 : ''}`}
                value={creator.family}
                onChange={(family) => replace(index, { ...creator, family })}
              />
              <Field
                label="Prénom"
                hint="Il deviendra une initiale."
                value={creator.given}
                onChange={(given) => replace(index, { ...creator, given })}
              />
            </>
          ) : (
            <>
              <Field
                label={`Organisme ${creators.length > 1 ? index + 1 : ''}`}
                placeholder="Haute Autorité de santé"
                value={creator.name}
                onChange={(name) => replace(index, { ...creator, name })}
              />
              <Field
                label="Sigle"
                hint="S’il en a un."
                placeholder="HAS"
                value={creator.abbreviation ?? ''}
                onChange={(abbreviation) => replace(index, { ...creator, abbreviation })}
              />
            </>
          )}
          <Button
            variant="secondary"
            aria-label={`Retirer le nom ${index + 1}`}
            onClick={() => remove(index)}
          >
            Retirer
          </Button>
        </div>
      ))}
      <div className={styles.creatorActions}>
        <Button variant="secondary" onClick={() => onChange([...creators, EMPTY_PERSON])}>
          Ajouter une personne
        </Button>
        {allowOrganizations && (
          <Button
            variant="secondary"
            onClick={() => onChange([...creators, { kind: 'organization', name: '' }])}
          >
            Ajouter un organisme
          </Button>
        )}
      </div>
    </fieldset>
  );
}
