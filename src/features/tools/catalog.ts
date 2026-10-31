import type { ToolId } from '@/content/types';

export interface ToolEntry {
  id: ToolId;
  slug: string;
  title: string;
  summary: string;
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
    id: 'generateur-apa',
    slug: 'generateur-apa',
    title: 'Générateur de références APA',
    summary:
      'Remplissez quelques champs ou collez un DOI : votre référence APA est prête à copier.',
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
