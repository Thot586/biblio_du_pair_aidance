const listeners = new Set<() => void>();

/** Ouvre la fenêtre « Affichage », depuis n'importe quelle page. */
export function openDisplaySettings(): void {
  listeners.forEach((listener) => listener());
}

/** Appelé par la fenêtre elle-même, qui est la seule à savoir s'ouvrir. */
export function onOpenDisplaySettings(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
