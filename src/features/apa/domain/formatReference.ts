import { creatorList, directNameList, editorLabel } from './names';
import type { ReferenceDate, ReferenceEntry, Segment, SegmentRole } from './types';

/**
 * Rédige une référence selon le guide APA de la BU Lyon 1 (juillet 2026).
 * Le résultat est une suite de morceaux : on peut ainsi l'afficher en couleur,
 * le copier avec ses italiques, ou le lire en texte simple.
 */

type Group = Segment[];

function piece(text: string, role: SegmentRole, italic = false): Segment {
  return italic ? { text, role, italic } : { text, role };
}

/** Assemble des groupes de mots, séparés par une espace, en ignorant les groupes vides. */
function assemble(...groups: Group[]): Segment[] {
  return groups
    .filter((group) => group.length > 0)
    .flatMap((group, index) => (index === 0 ? group : [piece(' ', 'details'), ...group]));
}

export function formatDate(date: ReferenceDate | undefined): string {
  if (!date?.year.trim()) return 's. d.';
  const { year, month, day } = date;
  if (!month?.trim()) return year.trim();
  return [`${year.trim()},`, month.trim(), day?.trim()].filter(Boolean).join(' ');
}

export function normalizeDoi(doi: string): string {
  return doi
    .trim()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//i, '')
    .replace(/^doi:\s*/i, '');
}

function linkOf(entry: ReferenceEntry): string {
  if (entry.doi?.trim()) return `https://doi.org/${normalizeDoi(entry.doi)}`;
  return entry.url?.trim() ?? '';
}

function link(entry: ReferenceEntry): Group {
  const address = linkOf(entry);
  return address ? [piece(address, 'link')] : [];
}

function withFinalPeriod(text: string): string {
  const trimmed = text.trim();
  return /[.!?…]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function sentence(text: string | undefined, role: SegmentRole): Group {
  return text?.trim() ? [piece(withFinalPeriod(text), role)] : [];
}

function titleIsItalic(entry: ReferenceEntry): boolean {
  return !['article', 'chapter', 'legal', 'dictionary'].includes(entry.type);
}

/** Auteur et date. Sans auteur, le titre prend la première place. */
function opening(entry: ReferenceEntry): Group {
  const date = piece(`(${formatDate(entry.date)}).`, 'date');
  const names = creatorList(entry.creators);

  if (!names) {
    return assemble([piece(withFinalPeriod(entry.title), 'title', titleIsItalic(entry))], [date]);
  }

  const editors = entry.creatorsAreEditors ? ` ${editorLabel(entry.creators.length)}.` : '';
  return assemble([piece(`${withFinalPeriod(names)}${editors}`, 'creator')], [date]);
}

/** Le titre et ce qui le précise : (2e éd.), [Vidéo]… */
function titleBlock(entry: ReferenceEntry, bracket?: string): Group {
  if (entry.creators.length === 0) return [];

  const notes: string[] = [];
  if (entry.translators?.length) notes.push(`${directNameList(entry.translators)}, Trad.`);
  if (entry.edition?.trim()) notes.push(entry.edition.trim());

  const parenthesis = notes.length > 0 ? ` (${notes.join('; ')})` : '';
  const brackets = bracket?.trim() ? ` [${bracket.trim()}]` : '';
  const italic = titleIsItalic(entry);

  if (!parenthesis && !brackets) return [piece(withFinalPeriod(entry.title), 'title', italic)];
  return [
    piece(entry.title.trim(), 'title', italic),
    piece(`${parenthesis}${brackets}.`, 'details'),
  ];
}

function articleSegments(entry: ReferenceEntry): Segment[] {
  const volume = entry.volume?.trim();
  const issue = entry.issue?.trim();
  const pages = entry.pages?.trim();
  const journal: Group = [piece(entry.container?.trim() ?? '', 'container', true)];

  if (volume) {
    journal.push(piece(', ', 'details'), piece(volume, 'details', true));
    if (issue) journal.push(piece(`(${issue})`, 'details'));
  } else if (issue) {
    journal.push(piece(`, (${issue})`, 'details'));
  }
  if (pages) journal.push(piece(`, ${pages}`, 'details'));
  journal.push(piece('.', 'details'));

  return assemble(opening(entry), titleBlock(entry), journal, link(entry));
}

function bookSegments(entry: ReferenceEntry): Segment[] {
  const original = entry.originalYear?.trim();
  return assemble(
    opening(entry),
    titleBlock(entry),
    sentence(entry.publisher, 'container'),
    original ? [piece(`(Ouvrage original publié en ${original})`, 'details')] : [],
    link(entry),
  );
}

function chapterSegments(entry: ReferenceEntry): Segment[] {
  const editors = entry.editors ?? [];
  const lead =
    editors.length > 0 ? `In ${directNameList(editors)} ${editorLabel(editors.length)}, ` : 'In ';
  const pages = entry.pages?.trim();
  return assemble(
    opening(entry),
    titleBlock(entry),
    [
      piece(lead, 'details'),
      piece(entry.container?.trim() ?? '', 'container', true),
      piece(pages ? ` (p. ${pages}).` : '.', 'details'),
    ],
    sentence(entry.publisher, 'details'),
    link(entry),
  );
}

function thesisSegments(entry: ReferenceEntry): Segment[] {
  const degree = entry.degree?.trim() ?? '';
  const university = entry.university?.trim() ?? '';
  const online = Boolean(linkOf(entry) || entry.archive?.trim());
  const bracket = online ? [degree, university].filter(Boolean).join(', ') : degree;
  return assemble(
    opening(entry),
    titleBlock(entry, bracket),
    online ? sentence(entry.archive, 'details') : sentence(university, 'details'),
    link(entry),
  );
}

/** Sans date, on indique le jour où l'on a consulté le document. */
function consultedThenLink(entry: ReferenceEntry): Group {
  const address = linkOf(entry);
  if (!address) return [];
  const undated = !entry.date?.year.trim();
  if (undated && entry.consulted?.trim()) {
    return assemble(
      [piece(`Consulté ${entry.consulted.trim()}, à l’adresse`, 'details')],
      [piece(address, 'link')],
    );
  }
  return [piece(address, 'link')];
}

function webpageSegments(entry: ReferenceEntry): Segment[] {
  return assemble(
    opening(entry),
    titleBlock(entry),
    sentence(entry.container, 'container'),
    consultedThenLink(entry),
  );
}

function reportSegments(entry: ReferenceEntry): Segment[] {
  return assemble(
    opening(entry),
    titleBlock(entry),
    sentence(entry.publisher, 'details'),
    link(entry),
  );
}

/** Pour une loi ou un décret, le texte tient lieu d'auteur et de titre. */
function legalSegments(entry: ReferenceEntry): Segment[] {
  return assemble(
    [piece(withFinalPeriod(entry.title), 'title')],
    [piece(`(${entry.date?.year.trim() || 's. d.'}).`, 'date')],
    link(entry),
  );
}

function mediaSegments(entry: ReferenceEntry): Segment[] {
  return assemble(
    opening(entry),
    titleBlock(entry, entry.mediaLabel),
    sentence(entry.container, 'container'),
    link(entry),
  );
}

function broadcastSegments(entry: ReferenceEntry): Segment[] {
  const label = entry.mediaLabel?.trim();
  return assemble(
    opening(entry),
    [piece(entry.title.trim(), 'title'), piece(label ? ` [${label}].` : '.', 'details')],
    entry.container?.trim()
      ? [piece('In ', 'details'), piece(`${entry.container.trim()}.`, 'container', true)]
      : [],
    sentence(entry.publisher, 'details'),
    link(entry),
  );
}

function conferenceSegments(entry: ReferenceEntry): Segment[] {
  const meeting = [entry.container?.trim(), entry.place?.trim()].filter(Boolean).join(', ');
  return assemble(opening(entry), titleBlock(entry), sentence(meeting, 'container'), link(entry));
}

function dictionarySegments(entry: ReferenceEntry): Segment[] {
  return assemble(
    opening(entry),
    titleBlock(entry),
    [piece('In ', 'details'), piece(`${entry.container?.trim() ?? ''}.`, 'container', true)],
    consultedThenLink(entry),
  );
}

export function formatReference(entry: ReferenceEntry): Segment[] {
  switch (entry.type) {
    case 'article':
      return articleSegments(entry);
    case 'book':
      return bookSegments(entry);
    case 'chapter':
      return chapterSegments(entry);
    case 'thesis':
      return thesisSegments(entry);
    case 'report':
      return reportSegments(entry);
    case 'webpage':
      return webpageSegments(entry);
    case 'legal':
      return legalSegments(entry);
    case 'video':
    case 'other':
      return mediaSegments(entry);
    case 'broadcast':
      return broadcastSegments(entry);
    case 'conference':
      return conferenceSegments(entry);
    case 'dictionary':
      return dictionarySegments(entry);
  }
}

export function segmentsToPlainText(segments: readonly Segment[]): string {
  return segments.map((segment) => segment.text).join('');
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Version à coller dans Word : elle garde les italiques. */
export function segmentsToHtml(segments: readonly Segment[]): string {
  return segments
    .map((segment) => {
      const text = escapeHtml(segment.text);
      return segment.italic ? `<i>${text}</i>` : text;
    })
    .join('');
}
