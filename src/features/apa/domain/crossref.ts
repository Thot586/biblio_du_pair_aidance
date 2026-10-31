import type { PersonName, ReferenceEntry, SourceType } from './types';

const API_ROOT = 'https://api.crossref.org/works';
const TIMEOUT_MS = 12000;
const FIELDS =
  'DOI,type,title,author,editor,issued,container-title,publisher,page,volume,issue,URL';

interface CrossrefPerson {
  family?: string;
  given?: string;
  name?: string;
}

export interface CrossrefWork {
  DOI: string;
  type?: string;
  title?: string[];
  author?: CrossrefPerson[];
  editor?: CrossrefPerson[];
  issued?: { 'date-parts'?: (number | null)[][] };
  'container-title'?: string[];
  publisher?: string;
  page?: string;
  volume?: string;
  issue?: string;
}

const TYPE_BY_CROSSREF: Record<string, SourceType> = {
  'journal-article': 'article',
  book: 'book',
  monograph: 'book',
  'edited-book': 'book',
  'reference-book': 'book',
  'book-chapter': 'chapter',
  'book-section': 'chapter',
  'book-part': 'chapter',
  'proceedings-article': 'conference',
  report: 'report',
  dissertation: 'thesis',
};

/** Crossref renvoie parfois du balisage ou des entités dans les titres. */
function cleanText(text: string | undefined): string {
  if (!text) return '';
  return text
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;|&apos;/g, '’')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Crossref écrit parfois « Volume 89 » ou place le numéro dans le volume : « n° 374 ». */
export function cleanVolumeAndIssue(
  volume: string | undefined,
  issue: string | undefined,
): { volume: string; issue: string } {
  const rawVolume = cleanText(volume);
  const issueInVolume = rawVolume.match(/^n[°o]\s*(\d+)$/i);
  if (issueInVolume) return { volume: '', issue: issueInVolume[1] ?? '' };
  return {
    volume: rawVolume.replace(/^vol(ume|\.)?\s*/i, ''),
    issue: cleanText(issue).replace(/^n[°o]\s*/i, ''),
  };
}

function toPerson(person: CrossrefPerson): PersonName {
  return {
    kind: 'person',
    family: cleanText(person.family ?? person.name),
    given: cleanText(person.given),
  };
}

export function workToEntry(work: CrossrefWork): ReferenceEntry {
  const year = work.issued?.['date-parts']?.[0]?.[0];
  const type = TYPE_BY_CROSSREF[work.type ?? ''] ?? 'other';
  const authors = (work.author ?? []).map((author): ReferenceEntry['creators'][number] =>
    author.family || !author.name
      ? toPerson(author)
      : { kind: 'organization', name: cleanText(author.name) },
  );
  const editors = (work.editor ?? []).map(toPerson);
  const isEditedBook = type === 'book' && authors.length === 0 && editors.length > 0;

  const entry: ReferenceEntry = {
    type,
    creators: isEditedBook ? editors : authors,
    title: cleanText(work.title?.[0]),
    container: cleanText(work['container-title']?.[0]),
    pages: cleanText(work.page).replace(/[–—]/g, '-'),
    publisher: cleanText(work.publisher),
    doi: work.DOI,
    ...cleanVolumeAndIssue(work.volume, work.issue),
  };
  if (year) entry.date = { year: String(year) };
  if (isEditedBook) entry.creatorsAreEditors = true;
  if (type === 'chapter' && editors.length > 0) entry.editors = editors;
  return entry;
}

export const DOI_PATTERN = /10\.\d{4,9}\/\S+/;

/** Reconnaît un DOI, même collé avec son adresse complète. */
export function extractDoi(text: string): string | null {
  const match = text.trim().match(DOI_PATTERN);
  return match ? match[0].replace(/[.,;)\]]+$/, '') : null;
}

export type LookupErrorKind = 'notFound' | 'network';

export class LookupError extends Error {
  readonly kind: LookupErrorKind;

  constructor(kind: LookupErrorKind) {
    super(kind);
    this.kind = kind;
  }
}

async function request<T>(url: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  } catch {
    throw new LookupError('network');
  }
  if (response.status === 404) throw new LookupError('notFound');
  if (!response.ok) throw new LookupError('network');
  return (await response.json()) as T;
}

export async function fetchWorkByDoi(doi: string): Promise<CrossrefWork> {
  const data = await request<{ message: CrossrefWork }>(`${API_ROOT}/${encodeURIComponent(doi)}`);
  return data.message;
}

export async function searchWorks(text: string, rows = 5): Promise<CrossrefWork[]> {
  const query = new URLSearchParams({
    'query.bibliographic': text,
    rows: String(rows),
    select: FIELDS,
  });
  const data = await request<{ message: { items: CrossrefWork[] } }>(`${API_ROOT}?${query}`);
  return data.message.items;
}
