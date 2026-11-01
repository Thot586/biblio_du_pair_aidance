import { CONTACT_PLACES } from '@/content/contacts';
import { course } from '@/content/course';
import { glossary } from '@/content/glossary';
import { SHORTCUTS } from '@/content/shortcuts';
import type { Block, Lesson, Section } from '@/content/types';
import { TOOLS } from '@/features/tools/catalog';
import { stripInline } from '@/shared/ui/inlineText/parseInline';

export type SearchKind = 'course' | 'tool' | 'term' | 'page';

export interface SearchDocument {
  id: string;
  kind: SearchKind;
  to: string;
  title: string;
  /** Le texte affiché sous le titre. */
  excerpt: string;
  /** Les formes d'un mot, ou la façon dont on formule le besoin. */
  keywords: string;
  /** Le reste du texte : on y cherche, sans jamais l'afficher. */
  body: string;
}

function blockText(block: Block): string {
  switch (block.kind) {
    case 'paragraph':
    case 'heading':
      return block.text;
    case 'list':
      return block.items.join(' ');
    case 'callout':
      return [block.title, block.text].flat().join(' ');
    case 'more':
      return [block.title, ...block.blocks.map(blockText)].join(' ');
    case 'links':
      return block.links.map((link) => `${link.label} ${link.description ?? ''}`).join(' ');
    case 'table':
      return [block.caption, ...block.headers, ...block.rows.flat()].join(' ');
    case 'compare':
      return [block.before.text, block.after.text, block.why ?? ''].join(' ');
    case 'reference':
    case 'scene':
    case 'tool':
      return '';
  }
}

/** Les types de documents montrés en exemple : « citer un livre » doit mener à l'exemple du livre. */
function referenceLabels(blocks: readonly Block[]): string[] {
  return blocks.flatMap((block) => {
    if (block.kind === 'reference') return block.label ?? [];
    return block.kind === 'more' ? referenceLabels(block.blocks) : [];
  });
}

function lessonDocument(section: Section, lesson: Lesson): SearchDocument {
  return {
    id: `lesson:${section.slug}/${lesson.slug}`,
    kind: 'course',
    to: `/${section.slug}/${lesson.slug}`,
    title: lesson.question,
    excerpt: stripInline(lesson.summary),
    keywords: [section.shortTitle, ...referenceLabels(lesson.blocks)].join(' '),
    body: stripInline([...lesson.takeaways, ...lesson.blocks.map(blockText)].join(' ')),
  };
}

function sectionDocuments(section: Section): SearchDocument[] {
  return [
    {
      id: `section:${section.slug}`,
      kind: 'course',
      to: `/${section.slug}`,
      title: section.question,
      excerpt: stripInline(section.promise),
      keywords: section.shortTitle,
      body: '',
    },
    {
      id: `quiz:${section.slug}`,
      kind: 'course',
      to: `/${section.slug}/quiz`,
      title: `Le quiz : ${section.shortTitle}`,
      excerpt: 'Pour vérifier ce que vous avez compris, sans note.',
      keywords: 'quiz test exercice',
      body: '',
    },
    ...section.lessons.map((lesson) => lessonDocument(section, lesson)),
  ];
}

function toolDocuments(): SearchDocument[] {
  return TOOLS.map((tool) => {
    const to = `/outils/${tool.slug}`;
    const needs = SHORTCUTS.filter((shortcut) => shortcut.to === to);
    return {
      id: `tool:${tool.slug}`,
      kind: 'tool',
      to,
      title: tool.title,
      excerpt: tool.summary,
      keywords: ['outil', ...(tool.aliases ?? []), ...needs.map((shortcut) => shortcut.label)].join(
        ' ',
      ),
      body: '',
    };
  });
}

function termDocuments(): SearchDocument[] {
  return glossary.map((entry) => ({
    id: `term:${entry.id}`,
    kind: 'term',
    to: `/glossaire#${entry.id}`,
    title: entry.term,
    excerpt: stripInline(entry.definition),
    keywords: entry.forms.join(' '),
    body: stripInline(entry.detail),
  }));
}

const PAGE_DOCUMENTS: readonly SearchDocument[] = [
  {
    id: 'page:aide',
    kind: 'page',
    to: '/aide',
    title: 'Qui peut m’aider ?',
    excerpt: 'Les documentalistes et les bibliothèques qui peuvent vous accompagner.',
    keywords: 'aide contact documentaliste bibliothèque bibliothécaire personne',
    body: CONTACT_PLACES.map(
      (place) =>
        `${place.name} ${place.topics} ${place.people.map((person) => person.name).join(' ')}`,
    ).join(' '),
  },
  {
    id: 'page:outils',
    kind: 'page',
    to: '/outils',
    title: 'Boîte à outils',
    excerpt: 'Tous les outils du site, rangés selon ce que vous voulez faire.',
    keywords: 'outils',
    body: '',
  },
  {
    id: 'page:glossaire',
    kind: 'page',
    to: '/glossaire',
    title: 'Glossaire',
    excerpt: 'Les mots de la recherche, expliqués simplement.',
    keywords: 'mots définition vocabulaire lexique',
    body: '',
  },
  {
    id: 'page:sources',
    kind: 'page',
    to: '/sources',
    title: 'Sources',
    excerpt: 'Les documents sur lesquels s’appuie ce support.',
    keywords: 'sources références',
    body: '',
  },
  {
    id: 'page:a-propos',
    kind: 'page',
    to: '/a-propos',
    title: 'À propos et confidentialité',
    excerpt: 'Qui a conçu ce support, et ce que deviennent vos données.',
    keywords: 'confidentialité données auteurs conception',
    body: '',
  },
];

/** Tout ce que la recherche du site peut trouver. */
export function buildSearchDocuments(): SearchDocument[] {
  return [
    ...course.flatMap(sectionDocuments),
    ...toolDocuments(),
    ...termDocuments(),
    ...PAGE_DOCUMENTS,
  ];
}
