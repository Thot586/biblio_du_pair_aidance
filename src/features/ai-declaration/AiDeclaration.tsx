import { useState } from 'react';
import { createStore, useStore } from '@/shared/lib/createStore';
import { Button } from '@/shared/ui/Button';
import { CopyButton } from '@/shared/ui/CopyButton';
import { Field } from '@/shared/ui/Field';
import { findSensitiveData } from '@/features/prompt-builder/promptLogic';
import panel from '@/shared/ui/Panel.module.css';
import {
  DECLARATION_STEPS,
  declarationToHtml,
  declarationToText,
  type DeclarationRow,
} from './declaration';
import styles from './AiDeclaration.module.css';

const rowsStore = createStore<DeclarationRow[]>('biblio-du:declaration-ia:v1', []);

const EMPTY_DRAFT = { tool: '', step: DECLARATION_STEPS[0], prompt: '', check: '' };

export function AiDeclaration() {
  const rows = useStore(rowsStore);
  const [draft, setDraft] = useState<Omit<DeclarationRow, 'id'>>(EMPTY_DRAFT);
  const sensitive = findSensitiveData(`${draft.prompt} ${draft.check}`);
  const canAdd = Boolean(draft.tool.trim());

  const add = () => {
    rowsStore.update((current) => [...current, { ...draft, id: crypto.randomUUID() }]);
    setDraft(EMPTY_DRAFT);
  };

  return (
    <div className={panel.tool}>
      <section className={panel.step} aria-labelledby="declaration-ajouter">
        <h2 id="declaration-ajouter" className={panel.stepTitle}>
          1. Ajoutez chaque usage
        </h2>
        <p>
          Ajoutez une ligne dès que vous vous servez d’une IA : ce sera bien plus simple que d’y
          penser à la fin. Vos lignes restent sur cet appareil.
        </p>
        <Field
          label="Quel outil ?"
          placeholder="Le Chat, ChatGPT, Perplexity…"
          value={draft.tool}
          onChange={(tool) => setDraft({ ...draft, tool })}
        />
        <div className={styles.selectField}>
          <label htmlFor="etape-ia">À quelle étape ?</label>
          <select
            id="etape-ia"
            value={draft.step}
            onChange={(event) => setDraft({ ...draft, step: event.target.value })}
          >
            {DECLARATION_STEPS.map((step) => (
              <option key={step} value={step}>
                {step}
              </option>
            ))}
          </select>
        </div>
        <Field
          multiline
          label="Quelle demande avez-vous écrite ?"
          hint="Vous pouvez la résumer."
          value={draft.prompt}
          onChange={(prompt) => setDraft({ ...draft, prompt })}
        />
        <Field
          multiline
          label="Qu’avez-vous vérifié ou modifié ?"
          placeholder="J’ai gardé quatre mots-clés, vérifiés dans PubMed."
          value={draft.check}
          onChange={(check) => setDraft({ ...draft, check })}
        />
        {sensitive.length > 0 && (
          <p role="alert" className={panel.remarks}>
            Votre annexe sera lue par le jury : retirez toute information qui permettrait de
            reconnaître une personne ({sensitive[0]?.text}).
          </p>
        )}
        <div className={panel.actions}>
          <Button onClick={add} disabled={!canAdd}>
            Ajouter cette ligne
          </Button>
        </div>
      </section>

      <section className={panel.step} aria-labelledby="declaration-tableau">
        <h2 id="declaration-tableau" className={panel.stepTitle}>
          2. Votre tableau pour l’annexe
        </h2>
        {rows.length === 0 ? (
          <p>Votre tableau apparaîtra ici.</p>
        ) : (
          <>
            <ul className={styles.rows}>
              {rows.map((row) => (
                <li key={row.id} className={styles.row}>
                  <p>
                    <strong>{row.tool}</strong>, {row.step.toLowerCase()}
                  </p>
                  {row.prompt && <p>Demande : {row.prompt}</p>}
                  {row.check && <p>Vérification : {row.check}</p>}
                  <Button
                    variant="secondary"
                    onClick={() =>
                      rowsStore.update((current) => current.filter((item) => item.id !== row.id))
                    }
                  >
                    Retirer
                  </Button>
                </li>
              ))}
            </ul>
            <div className={panel.actions}>
              <CopyButton
                label="Copier le tableau pour Word"
                html={declarationToHtml(rows)}
                text={declarationToText(rows)}
              />
            </div>
          </>
        )}
        <p className={panel.note}>
          Collez ce tableau dans une annexe de votre mémoire, pas dans la bibliographie. La BU de
          Lyon 1 demande d’indiquer le type d’usage, le nom de l’outil et la demande.
        </p>
      </section>
    </div>
  );
}
