import { formatDate } from './formatReference';
import { surname } from './names';
import type { Creator, ReferenceEntry } from './types';

export interface InTextCitation {
  /** Entre parenthèses, après la phrase : (Castro, 2020). */
  parenthetical: string;
  /** Dans la phrase : Castro (2020). */
  narrative: string;
  /** La première mention d'un organisme qui a un sigle. */
  firstMention?: string;
}

function yearOf(entry: ReferenceEntry): string {
  const year = entry.date?.year.trim();
  return year ? year : formatDate(undefined);
}

function nameFor(creators: readonly Creator[], connector: string): string {
  const [first, second] = creators;
  if (!first) return '';
  if (creators.length === 1) return surname(first);
  if (creators.length === 2 && second) return `${surname(first)} ${connector} ${surname(second)}`;
  return `${surname(first)} et al.`;
}

export function citeInText(entry: ReferenceEntry): InTextCitation {
  const year = yearOf(entry);

  if (entry.type === 'legal') {
    return {
      parenthetical: `(${entry.title.trim()}, ${year})`,
      narrative: `${entry.title.trim()} (${year})`,
    };
  }

  if (entry.creators.length === 0) {
    return {
      parenthetical: `(« ${entry.title.trim()} », ${year})`,
      narrative: `« ${entry.title.trim()} » (${year})`,
    };
  }

  const citation: InTextCitation = {
    parenthetical: `(${nameFor(entry.creators, '&')}, ${year})`,
    narrative: `${nameFor(entry.creators, 'et')} (${year})`,
  };

  const [first] = entry.creators;
  if (entry.creators.length === 1 && first?.kind === 'organization' && first.abbreviation?.trim()) {
    citation.firstMention = `${first.name.trim()} (${first.abbreviation.trim()}, ${year})`;
  }
  return citation;
}

export function withPage(citation: string, page: string): string {
  const cleanPage = page.trim();
  if (!cleanPage) return citation;
  const label = /[-–]/.test(cleanPage) ? 'pp.' : 'p.';
  return citation.replace(/\)$/, `, ${label} ${cleanPage})`);
}

/** Un entretien ou des propos tenus en cours : à citer dans le texte, jamais dans la liste. */
export function personalCommunication(person: string, date: string): string {
  return `(${person.trim()}, communication personnelle, ${date.trim()})`;
}
