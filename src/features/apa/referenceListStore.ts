import { createStore, useStore } from '@/shared/lib/createStore';
import { formatReference, segmentsToHtml, segmentsToPlainText } from './domain/formatReference';
import { sortReferences } from './domain/sortReferences';
import type { ReferenceEntry } from './domain/types';

export interface SavedReference extends ReferenceEntry {
  id: string;
}

const referenceListStore = createStore<SavedReference[]>('biblio-du:references:v1', []);

export function useReferenceList(): SavedReference[] {
  return sortReferences(useStore(referenceListStore));
}

export function addReference(entry: ReferenceEntry): void {
  referenceListStore.update((list) => [...list, { ...entry, id: crypto.randomUUID() }]);
}

export function removeReference(id: string): void {
  referenceListStore.update((list) => list.filter((reference) => reference.id !== id));
}

export function clearReferences(): void {
  referenceListStore.set([]);
}

/** Interligne 2 et retrait de 1,25 cm, comme le demande le guide de la BU pour la liste. */
const WORD_PARAGRAPH_STYLE = 'margin-left:1.25cm;text-indent:-1.25cm;line-height:2';

export function listToHtml(list: readonly ReferenceEntry[]): string {
  return list
    .map(
      (entry) => `<p style="${WORD_PARAGRAPH_STYLE}">${segmentsToHtml(formatReference(entry))}</p>`,
    )
    .join('');
}

export function listToPlainText(list: readonly ReferenceEntry[]): string {
  return list.map((entry) => segmentsToPlainText(formatReference(entry))).join('\n\n');
}
