import type { SceneId } from '@/content/types';
import type { SceneDefinition } from '@/features/scene-player/types';

type SceneLoader = () => Promise<{ default: SceneDefinition }>;

/** Chaque animation est chargée à la demande, pour garder le site léger sur téléphone. */
export const sceneLoaders: Record<SceneId, SceneLoader> = {
  'six-etapes': () => import('./six-etapes'),
  'reference-piste': () => import('./reference-piste'),
  entonnoir: () => import('./entonnoir'),
  qqoqcp: () => import('./qqoqcp'),
  'carte-mentale': () => import('./carte-mentale'),
  'et-ou-sauf': () => import('./et-ou-sauf'),
  'guillemets-asterisque': () => import('./guillemets-asterisque'),
  'traduire-mesh': () => import('./traduire-mesh'),
  scholar: () => import('./scholar'),
  pubmed: () => import('./pubmed'),
  'semantic-scholar': () => import('./semantic-scholar'),
  'cairn-lyon1': () => import('./cairn-lyon1'),
  'bruit-silence': () => import('./bruit-silence'),
  fiabilite: () => import('./fiabilite'),
  imrad: () => import('./imrad'),
  'citer-texte-liste': () => import('./citer-texte-liste'),
  'anatomie-reference': () => import('./anatomie-reference'),
  zotero: () => import('./zotero'),
  'mot-suivant': () => import('./mot-suivant'),
  'cycle-ia': () => import('./cycle-ia'),
  hallucination: () => import('./hallucination'),
  anonymiser: () => import('./anonymiser'),
  actif: () => import('./actif'),
};
