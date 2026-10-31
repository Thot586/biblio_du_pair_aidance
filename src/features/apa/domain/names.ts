import type { Creator, PersonName } from './types';

/** « Jean-Luc » donne « J.-L. », « Marie Anne » donne « M. A. ». */
export function initials(given: string): string {
  return given
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) =>
      word
        .split('-')
        .filter(Boolean)
        .map((part) => (part.endsWith('.') ? part : `${part.charAt(0).toUpperCase()}.`))
        .join('-'),
    )
    .join(' ');
}

const LOWERCASE_PARTICLE = /^(de|du|d’|d'|des|van|von)\s*/;

/** Une particule en minuscule passe après les initiales : « Singly, F. de ». */
function splitParticle(family: string): { particle: string; rest: string } {
  const match = family.trim().match(LOWERCASE_PARTICLE);
  if (!match) return { particle: '', rest: family.trim() };
  return { particle: match[0].trim(), rest: family.trim().slice(match[0].length) };
}

/** Pour la liste de références : « Nom, I. ». */
export function invertedName(creator: Creator): string {
  if (creator.kind === 'organization') return creator.name.trim();
  const { particle, rest } = splitParticle(creator.family);
  const given = initials(creator.given);
  return [`${rest}${given ? `, ${given}` : ''}`, particle].filter(Boolean).join(' ');
}

/** Pour un livre collectif cité dans un chapitre : « I. Nom ». */
export function directName(person: PersonName): string {
  return [initials(person.given), person.family.trim()].filter(Boolean).join(' ');
}

/** Pour la citation dans le texte : le nom seul, sans particule détachée. */
export function surname(creator: Creator): string {
  if (creator.kind === 'organization') {
    return creator.abbreviation?.trim() || creator.name.trim();
  }
  return creator.family.trim();
}

/** Le nom qui sert à classer la liste par ordre alphabétique. */
export function sortingName(creator: Creator): string {
  if (creator.kind === 'organization') return creator.name.trim();
  return splitParticle(creator.family).rest;
}

const MAXIMUM_LISTED_CREATORS = 20;

/** La norme APA liste 20 noms au plus : au-delà, 19 noms, des points de suspension, le dernier. */
export function creatorList(creators: readonly Creator[]): string {
  const names = creators.map(invertedName);
  if (names.length === 0) return '';
  if (names.length === 1) return names[0] ?? '';
  if (names.length > MAXIMUM_LISTED_CREATORS) {
    return `${names.slice(0, MAXIMUM_LISTED_CREATORS - 1).join(', ')}, ... ${names.at(-1)}`;
  }
  return `${names.slice(0, -1).join(', ')}, & ${names.at(-1)}`;
}

/** « (Ed.) » ou « (Eds.) », la mention utilisée par le guide de la BU Lyon 1. */
export function editorLabel(count: number): string {
  return count > 1 ? '(Eds.)' : '(Ed.)';
}

export function directNameList(people: readonly PersonName[]): string {
  const names = people.map(directName);
  if (names.length < 2) return names[0] ?? '';
  return `${names.slice(0, -1).join(', ')} & ${names.at(-1)}`;
}
