export type SourceType =
  | 'article'
  | 'book'
  | 'chapter'
  | 'thesis'
  | 'report'
  | 'webpage'
  | 'legal'
  | 'video'
  | 'broadcast'
  | 'conference'
  | 'dictionary'
  | 'other';

export interface PersonName {
  kind: 'person';
  family: string;
  given: string;
}

export interface OrganizationName {
  kind: 'organization';
  name: string;
  /** Sigle courant, par exemple HAS. */
  abbreviation?: string;
}

export type Creator = PersonName | OrganizationName;

export interface ReferenceDate {
  year: string;
  /** Mois en toutes lettres, par exemple « janvier ». */
  month?: string;
  day?: string;
}

export interface ReferenceEntry {
  type: SourceType;
  creators: Creator[];
  /** Année, ou date complète pour une page web, une vidéo, une émission. Absente = « s. d. ». */
  date?: ReferenceDate;
  title: string;
  /** Revue, livre, site web, émission ou dictionnaire qui contient le document. */
  container?: string;
  /** Personnes qui dirigent le livre, pour un chapitre ou un livre collectif. */
  editors?: PersonName[];
  /** Le livre entier est dirigé par `creators` : on ajoute « (Ed.) ». */
  creatorsAreEditors?: boolean;
  volume?: string;
  issue?: string;
  pages?: string;
  edition?: string;
  publisher?: string;
  /** Pour un mémoire ou une thèse, par exemple « Mémoire de DU ». */
  degree?: string;
  university?: string;
  /** Pour une référence en ligne de mémoire ou de thèse : HAL, DUMAS, Sudoc. */
  archive?: string;
  /** Mention entre crochets : Vidéo, Émission de radio, Podcast, Jeu éducatif. */
  mediaLabel?: string;
  /** Pour une communication : ville ou lieu. */
  place?: string;
  /** Date de consultation, utile quand le document n'a pas de date. */
  consulted?: string;
  doi?: string;
  url?: string;
  translators?: PersonName[];
  /** Année de la première édition, pour un livre traduit ou réédité. */
  originalYear?: string;
}

/** Une partie de la référence. Le rôle sert à colorer et expliquer chaque morceau. */
export type SegmentRole = 'creator' | 'date' | 'title' | 'container' | 'details' | 'link';

export interface Segment {
  text: string;
  role: SegmentRole;
  italic?: boolean;
}
