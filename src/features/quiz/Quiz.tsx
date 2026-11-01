import { useId, useRef, useState } from 'react';
import { nextSection } from '@/content/course';
import type { Section } from '@/content/types';
import { recordQuizResult } from '@/features/progress/progressStore';
import { Button, LinkButton } from '@/shared/ui/Button';
import { InlineText } from '@/shared/ui/InlineText';
import { pluralize } from '@/shared/lib/text';
import { isAnswerCorrect, resultMessage, toggleChoice } from './quizLogic';
import styles from './Quiz.module.css';

export function Quiz({ section }: { section: Section }) {
  const questions = section.quiz;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<ReadonlySet<number>>(new Set());
  const [answers, setAnswers] = useState<readonly boolean[]>([]);
  const [checked, setChecked] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const groupName = useId();

  const question = questions[index];
  const correct = answers.filter(Boolean).length;
  const finished = index >= questions.length;

  const check = () => {
    if (!question) return;
    setAnswers((previous) => [...previous, isAnswerCorrect(question, selected)]);
    setChecked(true);
  };

  const goNext = () => {
    const nextIndex = index + 1;
    if (nextIndex >= questions.length) {
      recordQuizResult(section.slug, { correct, total: questions.length });
    }
    setIndex(nextIndex);
    setSelected(new Set());
    setChecked(false);
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const restart = () => {
    setIndex(0);
    setSelected(new Set());
    setAnswers([]);
    setChecked(false);
  };

  if (finished || !question) {
    const next = nextSection(section);
    return (
      <div className={styles.result}>
        <h2 ref={headingRef} tabIndex={-1}>
          {pluralize(correct, 'bonne réponse', 'bonnes réponses')} sur {questions.length}
        </h2>
        <p>{resultMessage(correct, questions.length)}</p>
        <div className={styles.actions}>
          <LinkButton to={next ? `/${next.slug}` : '/'}>
            {next ? `Section suivante : ${next.shortTitle}` : 'Retour au parcours'}
          </LinkButton>
          <Button variant="secondary" onClick={restart}>
            Recommencer le quiz
          </Button>
        </div>
      </div>
    );
  }

  const answeredCorrectly = isAnswerCorrect(question, selected);

  return (
    <div className={styles.quiz}>
      <p className={styles.counter}>
        Question {index + 1} sur {questions.length}
      </p>
      <fieldset className={styles.fieldset} disabled={checked}>
        <legend className={styles.prompt}>
          <span ref={headingRef} tabIndex={-1}>
            <InlineText text={question.prompt} />
          </span>
          {question.multiple && <span className={styles.hint}>Plusieurs réponses possibles.</span>}
        </legend>
        <ul className={styles.choices}>
          {question.choices.map((choice, choiceIndex) => {
            const isSelected = selected.has(choiceIndex);
            const reveal = checked && (isSelected || choice.correct);
            return (
              <li
                key={choice.text}
                className={styles.choice}
                data-state={reveal ? (choice.correct ? 'right' : 'wrong') : undefined}
              >
                <label className={styles.choiceLabel}>
                  <input
                    type={question.multiple ? 'checkbox' : 'radio'}
                    name={groupName}
                    checked={isSelected}
                    onChange={() =>
                      setSelected((current) => toggleChoice(question, current, choiceIndex))
                    }
                  />
                  <span>
                    <InlineText text={choice.text} />
                  </span>
                </label>
                {reveal && (
                  <p className={styles.feedback}>
                    <strong>{choice.correct ? 'Oui. ' : 'Pas tout à fait. '}</strong>
                    <InlineText text={choice.feedback} />
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </fieldset>

      <div role="status" className={styles.verdict}>
        {checked && (answeredCorrectly ? 'Bonne réponse.' : 'Regardez les explications ci-dessus.')}
      </div>

      <div className={styles.actions}>
        {checked ? (
          <Button onClick={goNext}>
            {index + 1 < questions.length ? 'Question suivante' : 'Voir mon résultat'}
          </Button>
        ) : (
          <Button onClick={check} disabled={selected.size === 0}>
            Vérifier ma réponse
          </Button>
        )}
      </div>
    </div>
  );
}
