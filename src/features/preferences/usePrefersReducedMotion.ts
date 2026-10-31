import { useSyncExternalStore } from 'react';
import { preferencesStore } from './preferencesStore';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(listener: () => void): () => void {
  const media = window.matchMedia(QUERY);
  media.addEventListener('change', listener);
  const unsubscribe = preferencesStore.subscribe(listener);
  return () => {
    media.removeEventListener('change', listener);
    unsubscribe();
  };
}

function getSnapshot(): boolean {
  return preferencesStore.get().reduceMotion || window.matchMedia(QUERY).matches;
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
