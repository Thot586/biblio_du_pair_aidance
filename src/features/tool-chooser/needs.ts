export interface ToolAdvice {
  name: string;
  url: string;
  why: string;
}

export interface Need {
  id: string;
  label: string;
  /** Le conseil général, comme le dirait une documentaliste. */
  advice: string;
  tools: readonly ToolAdvice[];
  lesson: { label: string; to: string };
}

const CRR_LIBRARY: ToolAdvice = {
  name: 'Bibliothèque du CRR',
  url: 'https://centre-ressource-rehabilitation.org/nos-actions/la-bibliotheque/article/la-bibliotheque',
  why: 'Elle est spécialisée en pair-aidance et en réhabilitation.',
};

const GOOGLE_SCHOLAR: ToolAdvice = {
  name: 'Google Scholar',
  url: 'https://scholar.google.com/?hl=fr',
  why: 'Il ratisse large, en français comme en anglais.',
};

const SANTE_PSY: ToolAdvice = {
  name: 'SantéPsy',
  url: 'https://santepsy.ascodocpsy.org/',
  why: 'C’est la base française en psychiatrie et en santé mentale.',
};

const SUDOC: ToolAdvice = {
  name: 'Sudoc',
  url: 'https://www.sudoc.abes.fr/cbs/',
  why: 'Il indique dans quelle bibliothèque se trouve un document.',
};

export const NEEDS: readonly Need[] = [
  {
    id: 'decouvrir',
    label: 'Je découvre le sujet',
    advice:
      'Commencez simple : lisez deux ou trois textes généraux avant de chercher plus précisément.',
    tools: [
      CRR_LIBRARY,
      GOOGLE_SCHOLAR,
      {
        name: 'CNRTL',
        url: 'https://www.cnrtl.fr/',
        why: 'Il donne les définitions et les synonymes des mots de votre sujet.',
      },
    ],
    lesson: { label: 'Quels mots utiliser pour chercher ?', to: '/mots' },
  },
  {
    id: 'articles-fr',
    label: 'Je cherche des articles en français',
    advice: 'Ces trois outils couvrent l’essentiel des revues françaises dans votre domaine.',
    tools: [
      SANTE_PSY,
      {
        name: 'Cairn, par Lyon 1',
        url: 'https://docelec.univ-lyon1.fr/login?url=https://shs.cairn.info/',
        why: 'Il rassemble les revues françaises de sciences humaines.',
      },
      {
        name: 'LiSSa',
        url: 'https://www.lissa.fr/dc/#env=lissa',
        why: 'Il recense la littérature de santé en français.',
      },
    ],
    lesson: { label: 'Comment chercher en français ?', to: '/ou-chercher/en-francais' },
  },
  {
    id: 'etudes',
    label: 'Je cherche des études internationales',
    advice: 'Il vous faudra quelques mots d’anglais. Commencez par "peer support".',
    tools: [
      {
        name: 'PubMed',
        url: 'https://pubmed.ncbi.nlm.nih.gov/',
        why: 'C’est la grande base internationale en santé.',
      },
      {
        name: 'Semantic Scholar',
        url: 'https://www.semanticscholar.org/',
        why: 'Il aide à repérer vite les articles les plus cités.',
      },
      GOOGLE_SCHOLAR,
    ],
    lesson: { label: 'Comment utiliser PubMed ?', to: '/ou-chercher/pubmed' },
  },
  {
    id: 'livres',
    label: 'Je cherche un livre',
    advice: 'Demandez d’abord à la bibliothèque du CRR : elle prête ses ouvrages gratuitement.',
    tools: [
      CRR_LIBRARY,
      {
        name: 'Portail des BU de Lyon 1',
        url: 'https://portaildoc.univ-lyon1.fr/',
        why: 'Il donne accès au catalogue et aux livres numériques de Lyon 1.',
      },
      SUDOC,
    ],
    lesson: { label: 'Comment chercher en français ?', to: '/ou-chercher/en-francais' },
  },
  {
    id: 'memoires',
    label: 'Je cherche des mémoires ou des thèses',
    advice: 'Lire d’anciens mémoires est très utile pour voir ce que le DU attend de vous.',
    tools: [
      CRR_LIBRARY,
      {
        name: 'DUMAS',
        url: 'https://dumas.ccsd.cnrs.fr/',
        why: 'Il propose des mémoires et des thèses d’exercice en accès libre.',
      },
      {
        name: 'theses.fr',
        url: 'https://theses.fr/',
        why: 'Il recense les thèses soutenues en France depuis 1985.',
      },
    ],
    lesson: {
      label: 'Où trouver des mémoires, des thèses et des rapports ?',
      to: '/ou-chercher/memoires-theses',
    },
  },
  {
    id: 'temoignages',
    label: 'Je cherche des témoignages, des guides ou des rapports',
    advice: 'Vérifiez bien qui parle, et quand : ces documents ne sont pas relus comme un article.',
    tools: [
      CRR_LIBRARY,
      SANTE_PSY,
      {
        name: 'Allo la doc ?',
        url: 'https://www.ascodocpsy.org/allo-la-doc/',
        why: 'Ces guides expliquent comment repérer une information fiable.',
      },
    ],
    lesson: { label: 'Comment savoir si une source est fiable ?', to: '/trier/fiable' },
  },
  {
    id: 'loi',
    label: 'Je cherche un texte de loi',
    advice: 'Passez par le site officiel : c’est la seule version qui fait foi.',
    tools: [
      {
        name: 'Légifrance',
        url: 'https://www.legifrance.gouv.fr/',
        why: 'C’est le site officiel du droit français.',
      },
    ],
    lesson: { label: 'À quoi ressemble chaque type de référence ?', to: '/citer/exemples' },
  },
];
