import { createStore } from '@/shared/lib/createStore';

export type TextSize = 'normal' | 'large' | 'xlarge';
export type ThemeChoice = 'auto' | 'light' | 'dark';
export type ReadingFont = 'standard' | 'dyslexic';

export interface Preferences {
  textSize: TextSize;
  theme: ThemeChoice;
  readingFont: ReadingFont;
  reduceMotion: boolean;
}

export const DEFAULT_PREFERENCES: Preferences = {
  textSize: 'normal',
  theme: 'auto',
  readingFont: 'standard',
  reduceMotion: false,
};

export const preferencesStore = createStore<Preferences>(
  'biblio-du:preferences:v1',
  DEFAULT_PREFERENCES,
);

function resolveTheme(choice: ThemeChoice): 'light' | 'dark' {
  if (choice !== 'auto') return choice;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyToDocument({ textSize, theme, readingFont }: Preferences): void {
  const { dataset } = document.documentElement;
  dataset.textSize = textSize;
  dataset.readingFont = readingFont;
  dataset.theme = resolveTheme(theme);
}

/** Pose les préférences sur `<html>` et les suit ensuite. À appeler une fois au démarrage. */
export function startApplyingPreferences(): void {
  applyToDocument(preferencesStore.get());
  preferencesStore.subscribe(() => applyToDocument(preferencesStore.get()));
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => applyToDocument(preferencesStore.get()));
}
