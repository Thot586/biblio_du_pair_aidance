import { useState } from 'react';
import { CopyButton } from '@/shared/ui/CopyButton';
import { Field } from '@/shared/ui/Field';
import { Term } from '@/shared/ui/Term';
import panel from '@/shared/ui/Panel.module.css';
import { buildPrompt, EMPTY_PROMPT, findSensitiveData, type PromptFields } from './promptLogic';

const FIELDS: readonly {
  key: Exclude<keyof PromptFields, 'askQuestions'>;
  label: string;
  hint: string;
  example: string;
}[] = [
  {
    key: 'action',
    label: 'A comme Action',
    hint: 'Que voulez-vous obtenir ?',
    example: 'Propose-moi dix mots-clés en français et en anglais',
  },
  {
    key: 'context',
    label: 'C comme Contexte',
    hint: 'Qu’est-ce que l’IA doit savoir de votre travail ?',
    example: 'Je prépare un mémoire de DU sur l’arrivée d’une personne pair-aidante en équipe',
  },
  {
    key: 'tone',
    label: 'T comme Tonalité',
    hint: 'Quel style souhaitez-vous ?',
    example: 'simple et clair',
  },
  {
    key: 'identity',
    label: 'I comme Identité',
    hint: 'Quel rôle donnez-vous à l’IA ?',
    example: 'documentaliste en santé mentale',
  },
  {
    key: 'format',
    label: 'F comme Format',
    hint: 'Quelle forme doit prendre la réponse ?',
    example: 'un tableau à deux colonnes',
  },
];

export function PromptBuilder() {
  const [fields, setFields] = useState<PromptFields>(EMPTY_PROMPT);
  const prompt = buildPrompt(fields);
  const sensitive = findSensitiveData(prompt);

  return (
    <div className={panel.tool}>
      <section className={panel.step} aria-labelledby="prompt-actif">
        <h2 id="prompt-actif" className={panel.stepTitle}>
          1. Remplissez ce qui vous est utile
        </h2>
        <p>
          Il s’agit de préparer votre <Term id="prompt" label="demande" /> à l’IA. Vous n’avez pas
          besoin de tout remplir. Ce que vous écrivez ici n’est pas envoyé.
        </p>
        {FIELDS.map((field) => (
          <Field
            key={field.key}
            multiline={field.key === 'action' || field.key === 'context'}
            label={field.label}
            hint={field.hint}
            placeholder={`Exemple : ${field.example}`}
            value={fields[field.key]}
            onChange={(value) => setFields((current) => ({ ...current, [field.key]: value }))}
          />
        ))}
        <label className={panel.choice}>
          <input
            type="checkbox"
            checked={fields.askQuestions}
            onChange={(event) =>
              setFields((current) => ({ ...current, askQuestions: event.target.checked }))
            }
          />
          Demander à l’IA de me poser des questions d’abord
        </label>
      </section>

      <section className={panel.step} aria-labelledby="prompt-resultat" aria-live="polite">
        <h2 id="prompt-resultat" className={panel.stepTitle}>
          2. Votre demande
        </h2>
        {!prompt ? (
          <p>Elle s’écrira ici au fur et à mesure.</p>
        ) : (
          <div className={panel.result}>
            <p style={{ whiteSpace: 'pre-line' }}>{prompt}</p>

            {sensitive.length > 0 && (
              <div role="alert">
                <p>
                  <strong>Attention, votre demande semble contenir :</strong>
                </p>
                <ul className={panel.remarks}>
                  {sensitive.map((match) => (
                    <li key={`${match.label}-${match.text}`}>
                      {match.label} (« {match.text} »)
                    </li>
                  ))}
                </ul>
                <p>Retirez ces informations avant de l’envoyer à une IA.</p>
              </div>
            )}

            <div className={panel.actions}>
              <CopyButton label="Copier ma demande" html={prompt} text={prompt} />
            </div>
            <p className={panel.note}>
              Ce contrôle automatique ne voit pas tout. Relisez votre demande : quelqu’un
              pourrait-il reconnaître une personne, un service ou un lieu ? Si le doute reste,{' '}
              <Term id="anonymisation" label="anonymisez" /> encore.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
