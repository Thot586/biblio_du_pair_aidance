import MiniSearch from 'minisearch';
import { normalizeForSearch } from '@/shared/lib/text';
import { buildSearchDocuments, type SearchDocument, type SearchKind } from './documents';

export interface SearchGroup {
  kind: SearchKind;
  title: string;
  results: readonly SearchDocument[];
}

const GROUP_TITLES: Record<SearchKind, string> = {
  course: 'Dans le parcours',
  tool: 'Dans la boîte à outils',
  term: 'Dans le glossaire',
  page: 'Sur le site',
};

/** Les mots qui ne disent rien du sujet : on peut taper une vraie question. */
const STOP_WORDS: ReadonlySet<string> = new Set(
  (
    'a au aux avec c ce ces cet cette comment d dans de des du elle en est et faire faut il j je ' +
    'l la le les leur lui m ma me mes mon n ne nous on ou par pas plus pour puis qu quand que quel ' +
    'quelle quelles quels qui quoi s sa se ses si son sont sur t ta te tes ton tu un une vos votre ' +
    'vous y'
  ).split(' '),
);

const MIN_PREFIX_LENGTH = 3;
const MIN_FUZZY_LENGTH = 5;

/** Accents, majuscules et pluriels ne comptent pas : « Références » trouve « référence ». */
function normalizeTerm(term: string): string {
  const normalized = normalizeForSearch(term);
  return normalized.length > 3 ? normalized.replace(/[sx]$/, '') : normalized;
}

function createIndex() {
  const documents = buildSearchDocuments();
  const index = new MiniSearch<SearchDocument>({
    fields: ['title', 'keywords', 'excerpt', 'body'],
    processTerm: normalizeTerm,
    searchOptions: {
      boost: { title: 4, keywords: 6, excerpt: 2 },
      // Une liste d'exemples ou de formes d'un mot n'est pas moins pertinente parce qu'elle est longue.
      bm25: { k: 1.2, b: 0.2, d: 0.5 },
      prefix: (term) => term.length >= MIN_PREFIX_LENGTH,
      fuzzy: (term) => (term.length >= MIN_FUZZY_LENGTH ? 0.2 : false),
      maxFuzzy: 2,
    },
  });
  index.addAll(documents);
  return { index, documents: new Map(documents.map((document) => [document.id, document])) };
}

let searchEngine: ReturnType<typeof createIndex> | undefined;

function subjectWords(query: string): string[] {
  const words = normalizeForSearch(query)
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);
  const subject = words.filter((word) => !STOP_WORDS.has(word));
  return subject.length > 0 ? subject : words;
}

/**
 * Cherche sur tout le site. On essaie d'abord de trouver tous les mots, puis l'un d'eux :
 * la plupart des gens ne reformulent pas une recherche qui n'a rien donné.
 */
export function searchSite(query: string): SearchGroup[] {
  searchEngine ??= createIndex();
  const { index, documents } = searchEngine;
  const subject = subjectWords(query).join(' ');
  if (!subject) return [];

  const allWords = index.search(subject, { combineWith: 'AND' });
  const hits = allWords.length > 0 ? allWords : index.search(subject, { combineWith: 'OR' });

  const groups = new Map<SearchKind, SearchDocument[]>();
  for (const hit of hits) {
    const document = documents.get(String(hit.id));
    if (!document) continue;
    groups.set(document.kind, [...(groups.get(document.kind) ?? []), document]);
  }
  return [...groups].map(([kind, results]) => ({ kind, title: GROUP_TITLES[kind], results }));
}
