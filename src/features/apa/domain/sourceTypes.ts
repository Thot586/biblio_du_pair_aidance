import type { ReferenceEntry, SourceType } from './types';

export type TextFieldKey =
  | 'title'
  | 'container'
  | 'volume'
  | 'issue'
  | 'pages'
  | 'edition'
  | 'publisher'
  | 'degree'
  | 'university'
  | 'archive'
  | 'mediaLabel'
  | 'place'
  | 'consulted'
  | 'doi'
  | 'url'
  | 'originalYear';

export interface FieldSpec {
  key: TextFieldKey;
  label: string;
  hint?: string;
  placeholder?: string;
  required?: boolean;
}

export interface SourceTypeDefinition {
  id: SourceType;
  label: string;
  /** Comment reconnaître ce type de document. */
  clue: string;
  frequent: boolean;
  creatorsLabel: string;
  /** Une loi n'a pas d'auteur. */
  hasCreators: boolean;
  /** Pages web, vidéos, émissions et colloques : date complète si on la connaît. */
  fullDate: boolean;
  /** Chapitre : on saisit aussi les personnes qui dirigent le livre. */
  hasEditors: boolean;
  /** Livre : la personne indiquée dirige l'ouvrage. */
  canBeEdited: boolean;
  fields: readonly FieldSpec[];
}

const DOI_FIELD: FieldSpec = {
  key: 'doi',
  label: 'DOI',
  hint: 'Si le document en a un. Il commence par 10.',
  placeholder: '10.1684/ipe.2013.1070',
};

const URL_FIELD: FieldSpec = {
  key: 'url',
  label: 'Adresse web',
  placeholder: 'https://',
};

const CONSULTED_FIELD: FieldSpec = {
  key: 'consulted',
  label: 'Date à laquelle vous avez consulté la page',
  hint: 'Utile seulement si le document n’a pas de date.',
  placeholder: '31 octobre 2026',
};

export const SOURCE_TYPES: readonly SourceTypeDefinition[] = [
  {
    id: 'article',
    label: 'Un article de revue',
    clue: 'Il paraît dans une revue, avec un numéro et des pages. Il a souvent un DOI.',
    frequent: true,
    creatorsLabel: 'Auteurs de l’article',
    hasCreators: true,
    fullDate: false,
    hasEditors: false,
    canBeEdited: false,
    fields: [
      { key: 'title', label: 'Titre de l’article', required: true },
      {
        key: 'container',
        label: 'Nom de la revue',
        placeholder: 'L’information psychiatrique',
        required: true,
      },
      {
        key: 'volume',
        label: 'Volume',
        hint: 'Le chiffre seul, s’il y en a un.',
        placeholder: '89',
      },
      { key: 'issue', label: 'Numéro', hint: 'Le chiffre seul, sans « n° ».', placeholder: '5' },
      { key: 'pages', label: 'Pages', placeholder: '365-370' },
      DOI_FIELD,
      URL_FIELD,
    ],
  },
  {
    id: 'book',
    label: 'Un livre',
    clue: 'Il a un éditeur et un ISBN.',
    frequent: true,
    creatorsLabel: 'Auteurs du livre',
    hasCreators: true,
    fullDate: false,
    hasEditors: false,
    canBeEdited: true,
    fields: [
      { key: 'title', label: 'Titre du livre', required: true },
      {
        key: 'edition',
        label: 'Édition',
        hint: 'Seulement si ce n’est pas la première.',
        placeholder: '2e éd.',
      },
      {
        key: 'publisher',
        label: 'Maison d’édition',
        placeholder: 'Elsevier Masson',
        required: true,
      },
      {
        key: 'originalYear',
        label: 'Année de la première parution',
        hint: 'Pour un livre traduit ou réédité.',
      },
      DOI_FIELD,
      { ...URL_FIELD, hint: 'Pour un livre numérique.' },
    ],
  },
  {
    id: 'chapter',
    label: 'Un chapitre de livre',
    clue: 'C’est une partie d’un livre, avec son propre titre et ses propres pages.',
    frequent: true,
    creatorsLabel: 'Auteurs du chapitre',
    hasCreators: true,
    fullDate: false,
    hasEditors: true,
    canBeEdited: false,
    fields: [
      { key: 'title', label: 'Titre du chapitre', required: true },
      { key: 'container', label: 'Titre du livre', required: true },
      { key: 'pages', label: 'Pages du chapitre', placeholder: '47-60', required: true },
      { key: 'publisher', label: 'Maison d’édition', required: true },
      DOI_FIELD,
    ],
  },
  {
    id: 'thesis',
    label: 'Un mémoire ou une thèse',
    clue: 'C’est un travail universitaire, souvent en ligne sur DUMAS, HAL ou le Sudoc.',
    frequent: true,
    creatorsLabel: 'Auteur ou autrice',
    hasCreators: true,
    fullDate: false,
    hasEditors: false,
    canBeEdited: false,
    fields: [
      { key: 'title', label: 'Titre', required: true },
      {
        key: 'degree',
        label: 'Type de travail',
        placeholder: 'Thèse de psychologie',
        required: true,
      },
      { key: 'university', label: 'Université', placeholder: 'Université Lyon 1', required: true },
      {
        key: 'archive',
        label: 'Site où vous l’avez trouvé',
        hint: 'Par exemple DUMAS, HAL ou Sudoc. Laissez vide pour une version papier.',
      },
      URL_FIELD,
    ],
  },
  {
    id: 'report',
    label: 'Un rapport ou un guide',
    clue: 'Il est publié par une institution ou une association, en dehors des éditeurs classiques.',
    frequent: true,
    creatorsLabel: 'Organisme ou auteurs',
    hasCreators: true,
    fullDate: false,
    hasEditors: false,
    canBeEdited: false,
    fields: [{ key: 'title', label: 'Titre du rapport', required: true }, URL_FIELD],
  },
  {
    id: 'webpage',
    label: 'Une page web',
    clue: 'À choisir seulement si aucun autre type ne convient.',
    frequent: true,
    creatorsLabel: 'Auteur ou organisme',
    hasCreators: true,
    fullDate: true,
    hasEditors: false,
    canBeEdited: false,
    fields: [
      { key: 'title', label: 'Titre de la page', required: true },
      { key: 'container', label: 'Nom du site', placeholder: 'Organisation mondiale de la Santé' },
      { ...URL_FIELD, required: true },
      CONSULTED_FIELD,
    ],
  },
  {
    id: 'legal',
    label: 'Une loi ou un décret',
    clue: 'Un texte officiel, le plus souvent publié sur Légifrance.',
    frequent: false,
    creatorsLabel: '',
    hasCreators: false,
    fullDate: false,
    hasEditors: false,
    canBeEdited: false,
    fields: [
      {
        key: 'title',
        label: 'Nom complet du texte',
        placeholder: 'Loi n° 2005-102 du 11 février 2005 pour l’égalité des droits…',
        required: true,
      },
      URL_FIELD,
    ],
  },
  {
    id: 'video',
    label: 'Une vidéo',
    clue: 'Une vidéo en ligne, par exemple sur YouTube.',
    frequent: false,
    creatorsLabel: 'Auteur ou chaîne',
    hasCreators: true,
    fullDate: true,
    hasEditors: false,
    canBeEdited: false,
    fields: [
      { key: 'title', label: 'Titre de la vidéo', required: true },
      { key: 'mediaLabel', label: 'Support', placeholder: 'Vidéo', required: true },
      { key: 'container', label: 'Plateforme', placeholder: 'YouTube' },
      { ...URL_FIELD, required: true },
    ],
  },
  {
    id: 'broadcast',
    label: 'Un podcast ou une émission de radio',
    clue: 'Un épisode à écouter, souvent sur le site de la station.',
    frequent: false,
    creatorsLabel: 'Personne qui produit ou anime',
    hasCreators: true,
    fullDate: true,
    hasEditors: false,
    canBeEdited: false,
    fields: [
      { key: 'title', label: 'Titre de l’épisode', required: true },
      { key: 'mediaLabel', label: 'Support', placeholder: 'Émission de radio', required: true },
      { key: 'container', label: 'Nom de l’émission' },
      { key: 'publisher', label: 'Station ou plateforme', placeholder: 'France Culture' },
      URL_FIELD,
    ],
  },
  {
    id: 'conference',
    label: 'Une intervention dans un colloque',
    clue: 'Une conférence ou un poster, non publié dans une revue.',
    frequent: false,
    creatorsLabel: 'Personnes qui interviennent',
    hasCreators: true,
    fullDate: true,
    hasEditors: false,
    canBeEdited: false,
    fields: [
      { key: 'title', label: 'Titre de l’intervention', required: true },
      { key: 'container', label: 'Nom du colloque', required: true },
      { key: 'place', label: 'Ville' },
      DOI_FIELD,
      URL_FIELD,
    ],
  },
  {
    id: 'dictionary',
    label: 'Une définition de dictionnaire en ligne',
    clue: 'Par exemple sur le CNRTL ou Larousse.',
    frequent: false,
    creatorsLabel: 'Auteur ou organisme',
    hasCreators: true,
    fullDate: false,
    hasEditors: false,
    canBeEdited: false,
    fields: [
      { key: 'title', label: 'Mot défini', required: true },
      { key: 'container', label: 'Nom du dictionnaire', required: true },
      { ...URL_FIELD, required: true },
      CONSULTED_FIELD,
    ],
  },
  {
    id: 'other',
    label: 'Autre chose : MOOC, logiciel, image, jeu',
    clue: 'Pour tout autre support. Dites entre crochets de quoi il s’agit.',
    frequent: false,
    creatorsLabel: 'Auteur ou organisme',
    hasCreators: true,
    fullDate: false,
    hasEditors: false,
    canBeEdited: false,
    fields: [
      { key: 'title', label: 'Titre', required: true },
      {
        key: 'mediaLabel',
        label: 'Type de support',
        placeholder: 'Cours en ligne',
        required: true,
      },
      { key: 'container', label: 'Éditeur ou plateforme' },
      URL_FIELD,
    ],
  },
];

export function sourceTypeDefinition(type: SourceType): SourceTypeDefinition {
  const definition = SOURCE_TYPES.find((candidate) => candidate.id === type);
  if (!definition) throw new Error(`Type inconnu : ${type}`);
  return definition;
}

/** Les informations indispensables encore absentes, à signaler sans bloquer. */
export function missingInformation(entry: ReferenceEntry): string[] {
  const definition = sourceTypeDefinition(entry.type);
  const missing: string[] = [];

  const hasCreator = entry.creators.some((creator) =>
    creator.kind === 'person' ? creator.family.trim() : creator.name.trim(),
  );
  if (definition.hasCreators && !hasCreator) missing.push(definition.creatorsLabel);
  if (!entry.date?.year.trim() && definition.hasCreators && !definition.fullDate) {
    missing.push('Année');
  }
  for (const field of definition.fields) {
    if (field.required && !entry[field.key]?.toString().trim()) missing.push(field.label);
  }
  return missing;
}
