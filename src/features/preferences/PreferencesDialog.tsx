import type { Ref } from 'react';
import { clearProgress } from '@/features/progress/progressStore';
import { useStore } from '@/shared/lib/createStore';
import { Button } from '@/shared/ui/Button';
import { preferencesStore, type Preferences } from './preferencesStore';
import styles from './PreferencesDialog.module.css';

interface Option<K extends keyof Preferences> {
  value: Preferences[K];
  label: string;
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
  { value: 'dyslexic', label: 'OpenDyslexic' },
];

function update<K extends keyof Preferences>(key: K, value: Preferences[K]): void {
  preferencesStore.update((current) => ({ ...current, [key]: value }));
}

function ChoiceGroup<K extends keyof Preferences>({
  name,
  legend,
  options,
}: {
  name: K;
  legend: string;
  options: Option<K>[];
}) {
  const preferences = useStore(preferencesStore);
  return (
    <fieldset className={styles.group}>
      <legend className={styles.legend}>{legend}</legend>
      {options.map((option) => (
        <label key={String(option.value)} className={styles.option}>
          <input
            type="radio"
            name={name}
            checked={preferences[name] === option.value}
            onChange={() => update(name, option.value)}
          />
          {option.label}
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
        <p>Ces réglages restent sur cet appareil.</p>
        <ChoiceGroup name="textSize" legend="Taille du texte" options={TEXT_SIZES} />
        <ChoiceGroup name="readingFont" legend="Police de lecture" options={FONTS} />
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
