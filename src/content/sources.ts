export interface Credit {
  title: string;
  url?: string;
  note?: string;
}

export const CREDITS: readonly Credit[] = [
  {
    title: 'Les clés pour réussir ses recherches biblio (octobre 2026)',
    note: 'support de Mme DARTEVEL Anne-Céline, Bibliothèque de psychiatrie du Vinatier',
  },
  {
    title: 'Préparer le mémoire du DU : collecte documentaire (promotions 2024-2025 et 2025-2026)',
    note: 'supports de Mme LONG Aude et Mme LOTHON Maëva, documentalistes au Centre ressource de réhabilitation',
  },
  {
    title:
      'Guide bibliographique Norme APA 7e éd. / Zotero 9 et sa foire aux questions (juillet 2026)',
    url: 'https://portaildoc.univ-lyon1.fr/les-collections/explorer-par-themes/guide-bibliographique-de-la-norme-apa-7th-zotero',
    note: 'BU Lyon 1 (licence CC BY-NC-ND), référence pour les règles APA de ce site. À consulter pour tous les cas particuliers.',
  },
  {
    title: 'Attendus du mémoire et critères d’évaluation du DU de pair-aidance',
    note: 'Université Lyon 1, Le Vinatier, Centre ressource de réhabilitation',
  },
  {
    title: 'Tutoriels : recherches documentaires et bibliographie',
    url: 'https://centre-ressource-rehabilitation.org/tutoriels-recherches-documentaires-et-bibliographie',
    note: 'Centre ressource de réhabilitation',
  },
];
