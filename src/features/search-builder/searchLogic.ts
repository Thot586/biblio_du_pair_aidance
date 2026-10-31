import { normalizeForSearch } from '@/shared/lib/text';

/** Une idée de la question, avec ses mots en français et en anglais, séparés par des virgules. */
export interface Idea {
  french: string;
  english: string;
}

export function parseWords(text: string): string[] {
  return text
    .split(/[,;\n]/)
    .map((word) => word.trim())
    .filter(Boolean);
}

function quoteIfExpression(word: string): string {
  return /\s/.test(word) ? `"${word}"` : word;
}

function wordGroups(ideas: readonly Idea[], language: keyof Idea): string[][] {
  return ideas.map((idea) => parseWords(idea[language])).filter((words) => words.length > 0);
}

function group(words: readonly string[], separator: string): string {
  const joined = words.join(separator);
  return words.length > 1 ? `(${joined})` : joined;
}

/** L'équation lisible, avec ET et OU. */
export function frenchEquation(ideas: readonly Idea[]): string {
  return wordGroups(ideas, 'french')
    .map((words) => group(words.map(quoteIfExpression), ' OU '))
    .join(' ET ');
}

/** PubMed : chaque mot est cherché dans le titre et le résumé. */
export function pubmedQuery(ideas: readonly Idea[]): string {
  return wordGroups(ideas, 'english')
    .map((words) =>
      group(
        words.map((word) => `"${word}"[tiab]`),
        ' OR ',
      ),
    )
    .join(' AND ');
}

/** Google Scholar : un espace vaut ET, et OU s'écrit en anglais. */
export function scholarQuery(ideas: readonly Idea[], language: keyof Idea = 'french'): string {
  return wordGroups(ideas, language)
    .map((words) => words.map(quoteIfExpression).join(' OR '))
    .join(' ');
}

/** Les outils sans opérateurs : le premier mot de chaque idée. */
export function simpleQuery(ideas: readonly Idea[], language: keyof Idea = 'french'): string {
  return wordGroups(ideas, language)
    .map((words) => quoteIfExpression(words[0] ?? ''))
    .join(' ');
}

/** Identifiant de Lyon 1 dans Google Scholar : il ajoute les liens « Acces Lyon 1 ». */
const SCHOLAR_LYON1_ID = '4673467114206109391';

export interface SearchLink {
  name: string;
  query: string;
  url: string;
  language: 'français' | 'anglais';
}

const encode = encodeURIComponent;

export function primaryLinks(ideas: readonly Idea[]): SearchLink[] {
  const links: SearchLink[] = [];
  const french = simpleQuery(ideas, 'french');
  const scholar = scholarQuery(ideas, 'french');
  const pubmed = pubmedQuery(ideas);
  const scholarEnglish = scholarQuery(ideas, 'english');

  if (french) {
    links.push({
      name: 'SantéPsy',
      language: 'français',
      query: french,
      url: `https://santepsy.ascodocpsy.org/index.php?lvl=more_results&autolevel1=1&user_query=${encode(french)}`,
    });
    links.push({
      name: 'Cairn',
      language: 'français',
      query: french,
      url: `https://shs.cairn.info/recherche?lang=fr&term=${encode(french)}`,
    });
  }
  if (scholar) {
    links.push({
      name: 'Google Scholar',
      language: 'français',
      query: scholar,
      url: `https://scholar.google.com/scholar?hl=fr&inst=${SCHOLAR_LYON1_ID}&q=${encode(scholar)}`,
    });
  }
  if (pubmed) {
    links.push({
      name: 'PubMed',
      language: 'anglais',
      query: pubmed,
      url: `https://pubmed.ncbi.nlm.nih.gov/?term=${encode(pubmed)}`,
    });
  }
  if (scholarEnglish) {
    links.push({
      name: 'Google Scholar',
      language: 'anglais',
      query: scholarEnglish,
      url: `https://scholar.google.com/scholar?hl=fr&inst=${SCHOLAR_LYON1_ID}&q=${encode(scholarEnglish)}`,
    });
  }
  return links;
}

export function otherLinks(ideas: readonly Idea[]): SearchLink[] {
  const french = simpleQuery(ideas, 'french');
  const english = simpleQuery(ideas, 'english');
  const links: SearchLink[] = [];

  if (french) {
    const add = (name: string, url: string) =>
      links.push({ name, language: 'français', query: french, url });
    add(
      'Sudoc',
      `https://www.sudoc.abes.fr/cbs/xslt/DB=2.1/CMD?ACT=SRCHA&IKT=1016&SRT=RLV&TRM=${encode(french)}`,
    );
    add('theses.fr', `https://theses.fr/resultats?q=${encode(french)}`);
    add('DUMAS', `https://dumas.ccsd.cnrs.fr/search/index?q=${encode(french)}`);
    add('HAL', `https://hal.science/search/index?q=${encode(french)}`);
  }
  if (english) {
    links.push({
      name: 'Semantic Scholar',
      language: 'anglais',
      query: english,
      url: `https://www.semanticscholar.org/search?q=${encode(english)}`,
    });
  }
  return links;
}

/** Traductions fréquentes dans le champ de la pair-aidance. */
const LEXICON: readonly (readonly [string, string])[] = [
  ['pair-aidance', 'peer support'],
  ['pair-aidant', 'peer support worker'],
  ['pair aidant', 'peer support worker'],
  ['médiateur de santé pair', 'peer support worker'],
  ['travailleur pair', 'peer support worker'],
  ['addictologie', 'substance-related disorders'],
  ['addiction', 'substance use'],
  ['rétablissement', 'mental health recovery'],
  ['santé mentale', 'mental health'],
  ['stigmatisation', 'social stigma'],
  ['pouvoir d’agir', 'empowerment'],
  ['schizophrénie', 'schizophrenia'],
  ['bipolaire', 'bipolar disorder'],
  ['dépression', 'depression'],
  ['autisme', 'autism spectrum disorder'],
  ['tdah', 'attention deficit disorder with hyperactivity'],
  ['équipe', 'patient care team'],
  ['soignant', 'health personnel'],
  ['aidant', 'caregivers'],
  ['proche', 'caregivers'],
  ['suicide', 'suicide'],
  ['logement', 'housing'],
  ['emploi', 'supported employment'],
  ['hospitalisation', 'hospitalization'],
  ['psychiatrie', 'psychiatry'],
  ['neurodiversité', 'neurodiversity'],
];

/** Propose des mots anglais pour les mots français reconnus. */
export function suggestEnglish(french: string): string[] {
  const suggestions = parseWords(french).flatMap((word) => {
    const needle = normalizeForSearch(word);
    return LEXICON.filter(([known]) => needle.includes(normalizeForSearch(known))).map(
      ([, english]) => english,
    );
  });
  return [...new Set(suggestions)];
}
