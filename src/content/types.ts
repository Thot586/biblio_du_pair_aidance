/**
 * Modèle du contenu pédagogique. Le contenu est de la donnée pure : pour corriger un
 * texte, on édite les fichiers de `src/content/sections`, sans toucher aux composants.
 *
 * Mini-syntaxe des textes (`InlineText`) :
 *   **gras**   *italique*   [[doi]] ou [[doi|le DOI]] pour un terme du glossaire
 *   [texte du lien](https://adresse)
 */
export type InlineText = string;

export type SectionId =
  'commencer' | 'question' | 'mots' | 'ou-chercher' | 'trier' | 'citer' | 'ia';

export type SceneId =
  | 'six-etapes'
  | 'reference-piste'
  | 'entonnoir'
  | 'qqoqcp'
  | 'carte-mentale'
  | 'et-ou-sauf'
  | 'guillemets-asterisque'
  | 'traduire-mesh'
  | 'scholar'
  | 'pubmed'
  | 'semantic-scholar'
  | 'cairn-lyon1'
  | 'bruit-silence'
  | 'fiabilite'
  | 'imrad'
  | 'citer-texte-liste'
  | 'anatomie-reference'
  | 'zotero'
  | 'mot-suivant'
  | 'cycle-ia'
  | 'hallucination'
  | 'anonymiser'
  | 'actif';

export type ToolId =
  | 'atelier-question'
  | 'constructeur-equation'
  | 'choisir-outil'
  | 'mise-en-forme-apa'
  | 'verifier-reference'
  | 'preparer-prompt'
  | 'declaration-ia';

export interface ExternalLinkData {
  label: string;
  url: string;
  /** Ce que la personne trouvera, en quelques mots. */
  description?: string;
}

export type CalloutTone = 'tip' | 'warning' | 'example' | 'rule';

export interface ParagraphBlock {
  kind: 'paragraph';
  text: InlineText;
}

export interface ListBlock {
  kind: 'list';
  items: InlineText[];
  ordered?: boolean;
}

export interface CalloutBlock {
  kind: 'callout';
  tone: CalloutTone;
  title: string;
  text: InlineText | InlineText[];
}

/** Détail facultatif, replié par défaut. */
export interface MoreBlock {
  kind: 'more';
  title: string;
  blocks: Block[];
}

/** Une animation avec ses boutons lecture, pause, retour. */
export interface SceneBlock {
  kind: 'scene';
  scene: SceneId;
}

export interface ToolBlock {
  kind: 'tool';
  tool: ToolId;
}

export interface LinksBlock {
  kind: 'links';
  title?: string;
  links: ExternalLinkData[];
}

export interface TableBlock {
  kind: 'table';
  caption: string;
  headers: string[];
  rows: InlineText[][];
}

/** Deux formulations côte à côte : ce qu'on évite, ce qu'on préfère. */
export interface CompareBlock {
  kind: 'compare';
  before: { label: string; text: InlineText };
  after: { label: string; text: InlineText };
  why?: InlineText;
}

/** Un exemple de référence APA, avec ou sans sa citation dans le texte. */
export interface ReferenceExampleBlock {
  kind: 'reference';
  label?: string;
  reference: InlineText;
  inText?: InlineText;
}

export interface HeadingBlock {
  kind: 'heading';
  text: string;
}

export type Block =
  | ParagraphBlock
  | HeadingBlock
  | ListBlock
  | CalloutBlock
  | MoreBlock
  | SceneBlock
  | ToolBlock
  | LinksBlock
  | TableBlock
  | CompareBlock
  | ReferenceExampleBlock;

export interface Lesson {
  slug: string;
  /** Le titre est toujours la question que se pose l'étudiant ou l'étudiante. */
  question: string;
  /** La réponse courte, affichée en premier. */
  summary: InlineText;
  minutes: number;
  blocks: Block[];
  /** Deux à quatre points à garder en tête. */
  takeaways: InlineText[];
}

export interface QuizChoice {
  text: InlineText;
  correct: boolean;
  /** Affiché quand la personne choisit cette réponse. */
  feedback: InlineText;
}

export interface QuizQuestion {
  id: string;
  prompt: InlineText;
  /** `multiple` : plusieurs réponses justes possibles. */
  multiple?: boolean;
  choices: QuizChoice[];
}

export interface Section {
  id: SectionId;
  slug: string;
  question: string;
  /** Un ou deux mots : le fil d'Ariane ne doit jamais passer à la ligne. */
  shortTitle: string;
  /** Ce que la personne saura faire à la fin. */
  promise: InlineText;
  lessons: Lesson[];
  quiz: QuizQuestion[];
}

export interface GlossaryEntry {
  id: string;
  term: string;
  /** Une phrase simple, affichée au survol. */
  definition: InlineText;
  /** Le complément, affiché au clic. */
  detail: InlineText;
  /** Les formes du mot dans les textes, pour vérifier qu'il est bien expliqué. */
  forms: readonly string[];
}

export type LessonKey = `${string}/${string}`;

export function lessonKey(section: Pick<Section, 'slug'>, lesson: Pick<Lesson, 'slug'>): LessonKey {
  return `${section.slug}/${lesson.slug}`;
}
