import { useState } from 'react';
import { Link } from 'react-router';
import { createStore, useStore } from '@/shared/lib/createStore';
import { Button } from '@/shared/ui/Button';
import { CopyButton } from '@/shared/ui/CopyButton';
import { Field } from '@/shared/ui/Field';
import panel from '@/shared/ui/Panel.module.css';
import {
  EMPTY_ANSWERS,
  reviewQuestion,
  suggestQuestions,
  SUBJECT_FIELDS,
  type SubjectAnswers,
} from './questionLogic';

interface Workshop {
  answers: SubjectAnswers;
  question: string;
}

const workshopStore = createStore<Workshop>('biblio-du:atelier-question:v1', {
  answers: EMPTY_ANSWERS,
  question: '',
});

const SELF_CHECKS = [
  'Une personne de ma promotion la comprend sans explication.',
  'Elle ne contient pas déjà ma réponse.',
  'Je peux trouver des sources dans le temps que j’ai.',
  'Elle me donne envie de chercher.',
] as const;

export function QuestionBuilder() {
  const { answers, question } = useStore(workshopStore);
  const [checks, setChecks] = useState<ReadonlySet<number>>(new Set());
  const suggestions = suggestQuestions(answers);
  const remarks = reviewQuestion(question);

  const setAnswer = (key: keyof SubjectAnswers, value: string) =>
    workshopStore.update((current) => ({
      ...current,
      answers: { ...current.answers, [key]: value },
    }));
  const setQuestion = (value: string) =>
    workshopStore.update((current) => ({ ...current, question: value }));

  return (
    <div className={panel.tool}>
      <section className={panel.step} aria-labelledby="etape-reponses">
        <h2 id="etape-reponses" className={panel.stepTitle}>
          1. Répondez à ce que vous pouvez
        </h2>
        <p>Écrivez quelques mots, sans chercher la bonne formule. Rien n’est envoyé.</p>
        {SUBJECT_FIELDS.map((field) => (
          <Field
            key={field.key}
            label={field.label}
            hint={field.hint}
            placeholder={`Exemple : ${field.example}`}
            value={answers[field.key]}
            onChange={(value) => setAnswer(field.key, value)}
          />
        ))}
      </section>

      <section className={panel.step} aria-labelledby="etape-idees">
        <h2 id="etape-idees" className={panel.stepTitle}>
          2. Choisissez un point de départ
        </h2>
        {suggestions.length === 0 ? (
          <p>Remplissez au moins « Quoi ? » et « Qui ? » pour voir des idées.</p>
        ) : (
          <>
            <p>Ce sont des brouillons. Choisissez le plus proche de votre idée.</p>
            <ul className={panel.choices}>
              {suggestions.map((suggestion) => (
                <li key={suggestion}>
                  <Button variant="secondary" onClick={() => setQuestion(suggestion)}>
                    {suggestion}
                  </Button>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section className={panel.step} aria-labelledby="etape-question">
        <h2 id="etape-question" className={panel.stepTitle}>
          3. Écrivez-la avec vos mots
        </h2>
        <Field
          multiline
          label="Ma question de recherche"
          hint="Commencez par exemple par « Comment » ou « En quoi »."
          value={question}
          onChange={setQuestion}
        />
        {remarks.length > 0 && (
          <div role="status">
            <p>À regarder :</p>
            <ul className={panel.remarks}>
              {remarks.map((remark) => (
                <li key={remark}>{remark}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className={panel.step} aria-labelledby="etape-verifier">
        <h2 id="etape-verifier" className={panel.stepTitle}>
          4. Vérifiez-la
        </h2>
        <ul className={panel.choices}>
          {SELF_CHECKS.map((check, index) => (
            <li key={check}>
              <label className={panel.choice}>
                <input
                  type="checkbox"
                  checked={checks.has(index)}
                  onChange={() =>
                    setChecks((current) => {
                      const next = new Set(current);
                      if (next.has(index)) next.delete(index);
                      else next.add(index);
                      return next;
                    })
                  }
                />
                {check}
              </label>
            </li>
          ))}
        </ul>
        {question.trim() && (
          <div className={panel.result}>
            <p>{question}</p>
            <div className={panel.actions}>
              <CopyButton label="Copier ma question" html={question} text={question} />
              <Link to="/outils/mes-mots-de-recherche">Trouver mes mots de recherche</Link>
            </div>
          </div>
        )}
        <p className={panel.note}>
          Votre question reste sur cet appareil. Elle évoluera avec vos lectures : c’est normal.
        </p>
      </section>
    </div>
  );
}
