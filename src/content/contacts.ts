export interface ContactPerson {
  name: string;
  email: string;
}

export interface ContactPlace {
  name: string;
  topics: string;
  details?: string;
  people: readonly ContactPerson[];
}

/** Coordonnées reprises des supports de formation du DU (octobre 2026). */
export const CONTACT_PLACES: readonly ContactPlace[] = [
  {
    name: 'Bibliothèque du Centre ressource de réhabilitation (CRR)',
    topics: 'Réhabilitation psychosociale, remédiation cognitive, pair-aidance.',
    details:
      'C’est votre premier contact pour le mémoire. Envoyez la référence la plus complète possible : l’équipe regarde comment obtenir le document.',
    people: [
      { name: 'Adresse de la bibliothèque', email: 'bibliotheque-crr@ch-le-vinatier.fr' },
      { name: 'Mme LONG Aude', email: 'aude.long@ch-le-vinatier.fr' },
      { name: 'Mme LOTHON Maëva', email: 'maeva.lothon@ch-le-vinatier.fr' },
    ],
  },
  {
    name: 'Bibliothèque de psychiatrie du Vinatier',
    topics: 'Psychiatrie, pédopsychiatrie, psychologie, psychanalyse, sciences humaines.',
    details:
      'Bâtiment 314, Agora du pôle Ouest, au sein du tiers-lieu Synapse. Ouverte de 9 h à 12 h et de 13 h à 17 h.',
    people: [{ name: 'Mme DARTEVEL Anne-Céline', email: 'anne-celine.dartevel@ch-le-vinatier.fr' }],
  },
  {
    name: 'Centre de documentation des instituts de formation',
    topics: 'Relation soignant-soigné, soins infirmiers, santé publique, management.',
    people: [{ name: 'M. GRIFFAULT Henri', email: 'henri.griffault@ch-le-vinatier.fr' }],
  },
  {
    name: 'Centre de documentation de la Ferme du Vinatier',
    topics: 'Création artistique et culture, anthropologie, architecture des lieux de soin.',
    people: [{ name: 'Mme PIGEON Émilie', email: 'emilie.pigeon@ch-le-vinatier.fr' }],
  },
  {
    name: 'Centre d’information et de documentation du CRA Rhône-Alpes',
    topics: 'Autisme et troubles du spectre de l’autisme.',
    people: [{ name: 'M. BELHOUCHAT Paul', email: 'paul.belhouchat@ch-le-vinatier.fr' }],
  },
];

export const AUTHOR_CONTACT: ContactPerson = {
  name: 'Dr FENOHASINA T.J. Félicien',
  email: 'toto-jean-felicien.fenohasina@ch-le-vinatier.fr',
};
