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

/** Espaces insécables du français : un « ? » ne reste jamais seul en début de ligne. */
export function frenchSpacing(text: string): string {
  return text.replace(/ ([?!:;»])/g, '\u00a0$1').replace(/« /g, '«\u00a0');
}

export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count > 1 ? plural : singular}`;
}

const DURATION_STEP_MINUTES = 5;

/** Une durée arrondie aux 5 minutes, facile à lire : « 45 minutes », « 3 h 25 ». */
export function formatDuration(minutes: number): string {
  const rounded = Math.round(minutes / DURATION_STEP_MINUTES) * DURATION_STEP_MINUTES;
  if (rounded < 60) return `${rounded} minutes`;
  const remainder = rounded % 60;
  const hours = `${Math.floor(rounded / 60)} h`;
  return remainder === 0 ? hours : `${hours} ${String(remainder).padStart(2, '0')}`;
}
