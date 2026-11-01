import type { ToolId } from '@/content/types';

export interface ToolEntry {
  id: ToolId;
  slug: string;
  title: string;
  summary: string;
  /** Les autres noms qu'on donne à l'outil ailleurs : la recherche du site les connaît. */
  aliases?: readonly string[];
}

/** Liste des outils interactifs : uniquement du texte, pour rester léger partout. */
export const TOOLS: readonly ToolEntry[] = [
  {
    id: 'atelier-question',
    slug: 'atelier-question',
    title: 'Atelier de question de recherche',
    summary: 'Répondez à six questions simples, et repartez avec une question de recherche.',
  },
  {
    id: 'constructeur-equation',
    slug: 'mes-mots-de-recherche',
    title: 'Mes mots de recherche',
    summary:
      'Notez vos mots, et obtenez une recherche prête pour PubMed, Google Scholar et d’autres.',
  },
  {
    id: 'choisir-outil',
    slug: 'quel-outil',
    title: 'Quel outil choisir ?',
    summary: 'Dites ce que vous cherchez, et voyez par où commencer.',
  },
  {
    id: 'mise-en-forme-apa',
    // L'adresse garde son premier nom : les liens déjà partagés continuent de fonctionner.
    slug: 'generateur-apa',
    title: 'Mettre ma référence en APA',
    summary:
      'Remplissez quelques champs ou collez un DOI : votre référence APA est prête à copier.',
    aliases: ['générateur de références APA', 'citation', 'bibliographie'],
  },
  {
    id: 'verifier-reference',
    slug: 'verifier-une-reference',
    title: 'Cette référence existe-t-elle ?',
    summary: 'Vérifiez une référence donnée par une IA avant de vous en servir.',
  },
  {
    id: 'preparer-prompt',
    slug: 'preparer-ma-demande',
    title: 'Préparer ma demande à une IA',
    summary: 'Construisez une demande claire avec la méthode ACTIF, sans données sensibles.',
  },
  {
    id: 'declaration-ia',
    slug: 'declaration-ia',
    title: 'Ma déclaration d’usage de l’IA',
    summary: 'Préparez le tableau à placer en annexe de votre mémoire.',
  },
];

export function findTool(id: ToolId): ToolEntry {
  const tool = TOOLS.find((entry) => entry.id === id);
  if (!tool) throw new Error(`Outil inconnu : ${id}`);
  return tool;
}

export interface ToolGroup {
  title: string;
  tools: readonly ToolEntry[];
}

/** Les outils, rangés selon ce que la personne veut faire. */
export const TOOL_GROUPS: readonly ToolGroup[] = [
  {
    title: 'Préparer ma recherche',
    tools: [
      findTool('atelier-question'),
      findTool('constructeur-equation'),
      findTool('choisir-outil'),
    ],
  },
  {
    title: 'Citer mes sources',
    tools: [findTool('mise-en-forme-apa'), findTool('verifier-reference')],
  },
  {
    title: 'Utiliser une IA avec prudence',
    tools: [findTool('preparer-prompt'), findTool('declaration-ia')],
  },
];
