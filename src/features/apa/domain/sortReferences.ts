import { compareFrench } from '@/shared/lib/text';
import { sortingName } from './names';
import type { ReferenceEntry } from './types';

function nameKey(entry: ReferenceEntry): string {
  const [first] = entry.creators;
  return first ? sortingName(first) : entry.title;
}

function yearKey(entry: ReferenceEntry): number {
  const year = Number.parseInt(entry.date?.year ?? '', 10);
  return Number.isNaN(year) ? Number.MIN_SAFE_INTEGER : year;
}

/** Ordre de la liste : alphabétique, un auteur seul avant ses cosignatures, puis par date. */
export function compareReferences(a: ReferenceEntry, b: ReferenceEntry): number {
  return (
    compareFrench(nameKey(a), nameKey(b)) ||
    a.creators.length - b.creators.length ||
    yearKey(a) - yearKey(b) ||
    compareFrench(a.title, b.title)
  );
}

export function sortReferences<T extends ReferenceEntry>(entries: readonly T[]): T[] {
  return [...entries].sort(compareReferences);
}

/** Le DU demande au moins 5 références, 25 au plus, avec une tolérance jusqu'à 30. */
export type ListSizeStatus = 'tooFew' | 'good' | 'tolerated' | 'tooMany';

export const REFERENCES_MINIMUM = 5;
export const REFERENCES_TARGET_MAXIMUM = 25;
export const REFERENCES_TOLERATED_MAXIMUM = 30;

export function listSizeStatus(count: number): ListSizeStatus {
  if (count < REFERENCES_MINIMUM) return 'tooFew';
  if (count <= REFERENCES_TARGET_MAXIMUM) return 'good';
  return count <= REFERENCES_TOLERATED_MAXIMUM ? 'tolerated' : 'tooMany';
}
