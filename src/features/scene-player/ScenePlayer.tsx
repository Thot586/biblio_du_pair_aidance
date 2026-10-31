import { useEffect, useId, useState } from 'react';
import { InlineText } from '@/shared/ui/InlineText';
import { stripInline } from '@/shared/ui/inlineText/parseInline';
import { MoreDetails } from '@/shared/ui/MoreDetails';
import { isSpeechAvailable, speak, stopSpeaking } from './speech';
import type { SceneDefinition } from './types';
import { useScenePlayer } from './useScenePlayer';
import styles from './ScenePlayer.module.css';

const SPEEDS = [0.75, 1, 1.25, 1.5] as const;

export function ScenePlayer({ scene }: { scene: SceneDefinition }) {
  const { state, frame, dispatch, isRunning } = useScenePlayer(scene.steps);
  const [soundOn, setSoundOn] = useState(false);
  const speedFieldId = useId();
  const { Visual, steps } = scene;
  const caption = steps[state.step]?.caption ?? '';

  useEffect(() => {
    if (!soundOn || !isRunning) {
      stopSpeaking();
      dispatch({ type: 'setHeld', held: false });
      return undefined;
    }
    dispatch({ type: 'setHeld', held: true });
    speak(stripInline(caption), state.speed, () => dispatch({ type: 'setHeld', held: false }));
    return stopSpeaking;
  }, [soundOn, isRunning, caption, state.speed, dispatch]);

  const playLabel = isRunning ? 'Pause' : state.status === 'ended' ? 'Revoir' : 'Lecture';

  return (
    <figure className={styles.player} aria-label={`Animation : ${scene.title}`}>
      <div className={styles.stage}>
        <Visual step={frame.step} progress={frame.progress} />
      </div>

      <div className={styles.side}>
        <figcaption className={styles.title}>{scene.title}</figcaption>
        <p className={styles.counter}>
          Étape {state.step + 1} sur {steps.length}
        </p>
        <p className={styles.caption} aria-live="polite">
          <InlineText text={caption} />
        </p>

        <div className={styles.dots}>
          {steps.map((step, index) => (
            <button
              key={step.caption}
              type="button"
              className={styles.dot}
              aria-label={`Aller à l’étape ${index + 1}`}
              aria-current={index === state.step ? 'step' : undefined}
              data-done={index <= state.step}
              onClick={() => dispatch({ type: 'goTo', step: index })}
            />
          ))}
        </div>

        <div className={styles.transport}>
          <button
            type="button"
            className={styles.iconButton}
            aria-label="Étape précédente"
            disabled={state.step === 0}
            onClick={() => dispatch({ type: 'previous' })}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 5h2.5v14H6zM19 5v14L9 12z" />
            </svg>
          </button>
          <button
            type="button"
            className={styles.playButton}
            onClick={() => dispatch({ type: 'toggle' })}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {isRunning ? (
                <path d="M6 5h4.5v14H6zM13.5 5H18v14h-4.5z" />
              ) : (
                <path d="M7 4v16l13-8z" />
              )}
            </svg>
            {playLabel}
          </button>
          <button
            type="button"
            className={styles.iconButton}
            aria-label="Étape suivante"
            disabled={state.step === steps.length - 1}
            onClick={() => dispatch({ type: 'next' })}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15.5 5H18v14h-2.5zM5 5v14l10-7z" />
            </svg>
          </button>
        </div>

        <div className={styles.options}>
          <label className={styles.speed} htmlFor={speedFieldId}>
            <span className="visually-hidden">Vitesse de l’animation</span>
            <select
              id={speedFieldId}
              value={state.speed}
              onChange={(event) =>
                dispatch({ type: 'setSpeed', speed: Number(event.target.value) })
              }
            >
              {SPEEDS.map((speed) => (
                <option key={speed} value={speed}>
                  {`${String(speed).replace('.', ',')} ×`}
                </option>
              ))}
            </select>
          </label>

          {isSpeechAvailable() && (
            <button
              type="button"
              className={styles.listenButton}
              aria-pressed={soundOn}
              onClick={() => setSoundOn((on) => !on)}
            >
              Écouter
            </button>
          )}
        </div>
      </div>

      <div className={styles.transcript}>
        <MoreDetails title="Lire tout le texte de l’animation">
          <ol>
            {steps.map((step) => (
              <li key={step.caption}>
                <InlineText text={step.caption} />
              </li>
            ))}
          </ol>
        </MoreDetails>
      </div>
    </figure>
  );
}
