import { useSyncExternalStore } from 'react';
import { readJson, writeJson } from './storage';

export interface Store<T> {
  get: () => T;
  set: (next: T) => void;
  update: (change: (current: T) => T) => void;
  subscribe: (listener: () => void) => () => void;
}

/** Petit magasin d'état partagé, sauvegardé dans le navigateur de la personne. */
export function createStore<T>(storageKey: string, initial: T): Store<T> {
  let state = readJson<T>(storageKey, initial);
  const listeners = new Set<() => void>();

  const set = (next: T) => {
    state = next;
    writeJson(storageKey, next);
    listeners.forEach((listener) => listener());
  };

  return {
    get: () => state,
    set,
    update: (change) => set(change(state)),
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

export function useStore<T>(store: Store<T>): T {
  return useSyncExternalStore(store.subscribe, store.get, store.get);
}
