import type { Ref } from 'react';
import { clearProgress } from '@/features/progress/progressStore';
import { useStore } from '@/shared/lib/createStore';
import { Button } from '@/shared/ui/Button';
import { preferencesStore, type Preferences } from './preferencesStore';
import styles from './PreferencesDialog.module.css';

interface Option<K extends keyof Preferences> {
  value: Preferences[K];
  label: string;
  /** Le nom d'une police s'écrit dans cette police : on la voit avant de la choisir. */
  inOwnFont?: boolean;
}

const TEXT_SIZES: Option<'textSize'>[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'large', label: 'Grand' },
  { value: 'xlarge', label: 'Très grand' },
];

const THEMES: Option<'theme'>[] = [
  { value: 'auto', label: 'Comme mon appareil' },
  { value: 'light', label: 'Clair' },
  { value: 'dark', label: 'Sombre' },
];

const FONTS: Option<'readingFont'>[] = [
  { value: 'standard', label: 'Police du site' },
  { value: 'dyslexic', label: 'OpenDyslexic', inOwnFont: true },
];

const FONT_HINT =
  'OpenDyslexic est une police au dessin particulier, souvent proposée aux personnes dyslexiques. Certaines la trouvent plus confortable, d’autres non : essayez-la et gardez ce qui vous convient.';

function update<K extends keyof Preferences>(key: K, value: Preferences[K]): void {
  preferencesStore.update((current) => ({ ...current, [key]: value }));
}

function ChoiceGroup<K extends keyof Preferences>({
  name,
  legend,
  options,
  hint,
}: {
  name: K;
  legend: string;
  options: Option<K>[];
  /** Une phrase qui explique le choix, lue avec le groupe par les lecteurs d'écran. */
  hint?: string;
}) {
  const preferences = useStore(preferencesStore);
  const hintId = `aide-${name}`;
  return (
    <fieldset className={styles.group} aria-describedby={hint ? hintId : undefined}>
      <legend className={styles.legend}>{legend}</legend>
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      {options.map((option) => (
        <label key={String(option.value)} className={styles.option}>
          <input
            type="radio"
            name={name}
            checked={preferences[name] === option.value}
            onChange={() => update(name, option.value)}
          />
          <span className={option.inOwnFont ? styles.dyslexicName : undefined}>{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
}

export function PreferencesDialog({ ref }: { ref: Ref<HTMLDialogElement> }) {
  const preferences = useStore(preferencesStore);

  return (
    <dialog ref={ref} className={styles.dialog} aria-labelledby="titre-affichage">
      <form method="dialog" className={styles.form}>
        <h2 id="titre-affichage">Affichage</h2>
        <p>Pour lire plus confortablement. Ces réglages restent sur cet appareil.</p>
        <ChoiceGroup name="textSize" legend="Taille du texte" options={TEXT_SIZES} />
        <ChoiceGroup
          name="readingFont"
          legend="Police de lecture"
          options={FONTS}
          hint={FONT_HINT}
        />
        <ChoiceGroup name="theme" legend="Couleurs" options={THEMES} />
        <label className={styles.option}>
          <input
            type="checkbox"
            checked={preferences.reduceMotion}
            onChange={(event) => update('reduceMotion', event.target.checked)}
          />
          Réduire les mouvements des animations
        </label>
        <div className={styles.actions}>
          <Button type="submit">Fermer</Button>
          <Button
            variant="secondary"
            onClick={() => {
              if (window.confirm('Effacer votre progression sur cet appareil ?')) clearProgress();
            }}
          >
            Effacer ma progression
          </Button>
        </div>
      </form>
    </dialog>
  );
}
