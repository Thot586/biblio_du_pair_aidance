/** Compare du texte français : les accents et les majuscules ne comptent pas. */
export function normalizeForSearch(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}

const frenchCollator = new Intl.Collator('fr', { sensitivity: 'base', numeric: true });

export function compareFrench(a: string, b: string): number {
  return frenchCollator.compare(a, b);
}

export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count > 1 ? plural : singular}`;
}
