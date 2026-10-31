import { compareFrench } from '@/shared/lib/text';
import type { GlossaryEntry } from './types';

/**
 * `definition` s'affiche au survol, `detail` au clic.
 * `forms` liste les façons d'écrire le terme : un test vérifie qu'une leçon qui les emploie
 * propose bien l'explication au moins une fois.
 */
const ENTRIES: readonly GlossaryEntry[] = [
  {
    id: 'abstract',
    term: 'Résumé (abstract)',
    definition: 'Le court texte au début d’un article, qui dit ce qui a été fait et trouvé.',
    detail:
      'Il fait environ 200 mots. Lire le résumé permet de savoir si l’article vaut la peine d’être lu en entier. Ne citez jamais un article à partir de son seul résumé si vous pouvez obtenir le texte complet.',
    forms: ['abstract'],
  },
  {
    id: 'annexe',
    term: 'Annexe',
    definition: 'Un document placé à la fin du mémoire, après la bibliographie.',
    detail:
      'On y met ce qui aide à comprendre sans entrer dans le fil du texte : grille d’entretien, tableau, déclaration d’usage de l’IA.',
    forms: ['annexe', 'annexes'],
  },
  {
    id: 'anonymisation',
    term: 'Anonymisation',
    definition: 'Rendre impossible de savoir de qui on parle, même en recoupant les informations.',
    detail:
      'Retirer un nom ne suffit pas toujours. Un âge, une ville et un métier peuvent suffire à reconnaître quelqu’un. Avant de coller un texte dans une IA, retirez tout ce qui permet de reconnaître une personne, un service ou un lieu.',
    forms: ['anonymiser', 'anonymisation', 'anonymisé', 'anonymisée'],
  },
  {
    id: 'apa',
    term: 'APA',
    definition: 'Une façon normée de citer ses sources, demandée pour le mémoire du DU.',
    detail:
      'Le sigle vient de l’American Psychological Association, une association de psychologues américaine. Ce site suit la 7e édition, comme le guide de la BU Lyon 1.',
    forms: ['APA'],
  },
  {
    id: 'base-de-donnees',
    term: 'Base de données',
    definition: 'Un grand catalogue de documents, classés et décrits, où l’on peut chercher.',
    detail:
      'Contrairement à Google, une base est constituée par des spécialistes. PubMed et SantéPsy sont des bases de données. Elles donnent des références, et parfois le document lui-même.',
    forms: ['base de données', 'bases de données'],
  },
  {
    id: 'bibliographie',
    term: 'Bibliographie',
    definition: 'La liste, à la fin du mémoire, de tous les documents que vous citez.',
    detail:
      'Chaque document cité dans le texte doit y figurer, et chaque document de la liste doit être cité dans le texte. Avec la norme APA, on y met seulement ce qu’on a lu et cité.',
    forms: ['bibliographie', 'bibliographies'],
  },
  {
    id: 'bruit',
    term: 'Bruit',
    definition: 'Trop de résultats, dont beaucoup ne répondent pas à votre question.',
    detail:
      'Pour réduire le bruit : ajoutez un mot avec ET, mettez une expression entre guillemets, ou filtrez par date.',
    forms: ['bruit'],
  },
  {
    id: 'carte-mentale',
    term: 'Carte mentale',
    definition: 'Un schéma de vos idées autour d’un mot central, avec des branches.',
    detail:
      'Elle aide à voir tout ce qui touche à un sujet, sur une seule page. Une feuille et un crayon suffisent.',
    forms: ['carte mentale', 'cartes mentales'],
  },
  {
    id: 'citation',
    term: 'Citation dans le texte',
    definition: 'La courte mention qui renvoie à une source : (Nom, année).',
    detail:
      'Elle est placée juste après l’idée ou la phrase empruntée. Le lecteur retrouve ensuite la référence complète dans la bibliographie.',
    forms: ['citation dans le texte', 'citations dans le texte'],
  },
  {
    id: 'comite-de-lecture',
    term: 'Comité de lecture',
    definition: 'Des spécialistes qui relisent un article avant sa publication.',
    detail:
      'Ils peuvent demander des corrections ou refuser l’article. C’est un gage de sérieux, sans être une garantie absolue.',
    forms: ['comité de lecture', 'comités de lecture'],
  },
  {
    id: 'communication-personnelle',
    term: 'Communication personnelle',
    definition: 'Un échange qu’on ne peut pas retrouver : entretien, propos en cours, message.',
    detail:
      'Elle se cite seulement dans le texte, avec le nom, la mention et la date. Elle ne va pas dans la bibliographie, car le lecteur ne peut pas la consulter.',
    forms: ['communication personnelle'],
  },
  {
    id: 'doi',
    term: 'DOI',
    definition: 'Un numéro unique attribué à un article ou un livre en ligne.',
    detail:
      'Il permet de retrouver le document à coup sûr, même si son adresse web change. Il commence par 10. et s’écrit en lien : https://doi.org/10.1684/ipe.2013.1070.',
    forms: ['DOI'],
  },
  {
    id: 'donnee-sante',
    term: 'Donnée de santé',
    definition: 'Toute information sur la santé physique ou mentale d’une personne.',
    detail:
      'Un diagnostic, un traitement ou une hospitalisation sont des données de santé. La loi les protège davantage que les autres données personnelles.',
    forms: ['donnée de santé', 'données de santé'],
  },
  {
    id: 'editeur',
    term: 'Éditeur',
    definition: 'La maison qui publie un livre ou une revue, comme Elsevier Masson ou Érès.',
    detail:
      'Attention : en anglais, « editor » veut dire la personne qui coordonne un livre. C’est pourquoi une référence APA peut contenir « (Ed.) ».',
    forms: ['éditeur', 'éditeurs'],
  },
  {
    id: 'equation',
    term: 'Équation de recherche',
    definition: 'Vos mots de recherche, combinés avec ET, OU, SAUF, prêts à être lancés.',
    detail:
      'Ce n’est pas des mathématiques : c’est une phrase de recherche construite. Gardez-la dans votre journal de bord pour pouvoir la relancer.',
    forms: ['équation de recherche', 'équations de recherche'],
  },
  {
    id: 'hallucination',
    term: 'Hallucination',
    definition: 'Quand une IA invente une information qui semble vraie.',
    detail:
      'Une IA peut inventer un article, un auteur ou un DOI, avec un style très sûr. C’est pourquoi toute référence donnée par une IA doit être vérifiée.',
    forms: ['hallucination', 'hallucinations'],
  },
  {
    id: 'ia-generative',
    term: 'IA générative',
    definition: 'Un programme qui produit du texte ou des images à partir d’une demande écrite.',
    detail:
      'ChatGPT, Le Chat, Claude, Gemini ou Copilot en sont des exemples. Ces outils prédisent la suite la plus probable d’un texte. Ils ne vérifient pas si c’est vrai.',
    forms: ['IA générative', 'IA génératives'],
  },
  {
    id: 'imrad',
    term: 'IMRaD',
    definition: 'Le plan classique d’un article : Introduction, Méthode, Résultats, Discussion.',
    detail:
      'Le a minuscule vient du mot anglais « and ». Connaître ce plan permet d’aller directement à ce qui vous intéresse.',
    forms: ['IMRaD'],
  },
  {
    id: 'isbn',
    term: 'ISBN',
    definition: 'Le numéro unique d’un livre, imprimé au dos, près du code-barres.',
    detail:
      'Si un document a un ISBN, c’est un livre. Le numéro ne figure pas dans la référence APA, mais il aide à retrouver le livre.',
    forms: ['ISBN'],
  },
  {
    id: 'litterature-grise',
    term: 'Littérature grise',
    definition: 'Les documents publiés hors édition classique : rapports, guides, mémoires.',
    detail:
      'Elle compte beaucoup en pair-aidance : guides d’association, rapports d’expérimentation, témoignages publiés. Vérifiez toujours qui l’a écrite, et quand.',
    forms: ['littérature grise'],
  },
  {
    id: 'mesh',
    term: 'MeSH',
    definition: 'La liste officielle de mots-clés de PubMed, en anglais.',
    detail:
      'Le sigle veut dire Medical Subject Headings. Le site HeTOP permet de trouver le terme anglais à partir du français.',
    forms: ['MeSH'],
  },
  {
    id: 'mot-cle',
    term: 'Mot-clé',
    definition: 'Un mot choisi pour décrire le contenu d’un document et le retrouver.',
    detail:
      'Vos mots-clés sont vos mots de recherche. Dans une base de données, ce sont aussi des étiquettes posées par des spécialistes sur chaque document.',
    forms: ['mot-clé', 'mots-clés'],
  },
  {
    id: 'moteur-de-recherche',
    term: 'Moteur de recherche',
    definition: 'Un outil qui parcourt le web ou de grands ensembles de documents.',
    detail:
      'Google et Google Scholar sont des moteurs de recherche. Ils ratissent large, sans tri par des spécialistes : à vous de juger la qualité de ce que vous trouvez.',
    forms: ['moteur de recherche', 'moteurs de recherche'],
  },
  {
    id: 'open-access',
    term: 'Accès libre',
    definition: 'Un document que tout le monde peut lire gratuitement en ligne.',
    detail:
      'On dit aussi « open access ». HAL, par exemple, rassemble des documents en accès libre.',
    forms: ['accès libre', 'open access'],
  },
  {
    id: 'operateurs',
    term: 'Opérateurs ET, OU, SAUF',
    definition: 'Des petits mots qui combinent vos termes pour resserrer ou élargir une recherche.',
    detail:
      'ET resserre : les deux mots doivent être présents. OU élargit : l’un ou l’autre. SAUF exclut. En anglais : AND, OR, NOT. On les appelle aussi opérateurs booléens.',
    forms: ['opérateurs', 'opérateur'],
  },
  {
    id: 'paraphrase',
    term: 'Reformulation',
    definition: 'Dire avec vos mots l’idée d’une autre personne, en citant sa source.',
    detail:
      'La norme APA préfère la reformulation à la citation exacte. Changer trois mots ne suffit pas : il faut vraiment réécrire, et toujours indiquer (Nom, année).',
    forms: ['reformulation', 'reformuler'],
  },
  {
    id: 'plagiat',
    term: 'Plagiat',
    definition: 'Reprendre le travail d’une autre personne sans dire d’où il vient.',
    detail:
      'C’est une faute, même sans le vouloir. Pour l’éviter : citez chaque idée empruntée, et notez vos sources dès que vous lisez.',
    forms: ['plagiat', 'plagier'],
  },
  {
    id: 'problematique',
    term: 'Problématique',
    definition: 'La question centrale qui oriente tout le mémoire.',
    detail:
      'Votre réponse devient l’idée que vous défendez. Les consignes du DU demandent de la développer avec des arguments et des exemples, plutôt que d’enchaîner des idées en surface.',
    forms: ['problématique'],
  },
  {
    id: 'prompt',
    term: 'Prompt',
    definition: 'La demande que vous écrivez à une IA.',
    detail:
      'Plus elle est claire, plus la réponse est utile. La méthode ACTIF aide à la construire. N’y mettez jamais de données sensibles.',
    forms: ['prompt', 'prompts'],
  },
  {
    id: 'pseudonymisation',
    term: 'Pseudonymisation',
    definition: 'Remplacer un nom par un code ou un faux prénom.',
    detail:
      'On peut parfois encore retrouver la personne. Ce n’est donc pas une vraie anonymisation, et les informations restent protégées par la loi.',
    forms: ['pseudonymisation', 'pseudonymiser'],
  },
  {
    id: 'reference',
    term: 'Référence',
    definition: 'Les informations qui permettent de retrouver un document.',
    detail:
      'Selon le type de document : auteur, date, titre, revue, éditeur, adresse web. C’est une ligne de votre bibliographie.',
    forms: ['référence', 'références'],
  },
  {
    id: 'revue-scientifique',
    term: 'Revue scientifique',
    definition: 'Un journal spécialisé qui publie des articles relus par des spécialistes.',
    detail:
      'Une revue paraît en volumes et en numéros, un peu comme un magazine, mais pour un public spécialisé. Exemple : L’information psychiatrique.',
    forms: ['revue scientifique', 'revues scientifiques'],
  },
  {
    id: 'savoir-experientiel',
    term: 'Savoir expérientiel',
    definition: 'Ce qu’une personne a appris en vivant une situation, par exemple la maladie.',
    detail:
      'C’est le cœur de la pair-aidance. Il complète les savoirs issus de la recherche et de la formation, et votre mémoire vous invite à le relier à vos lectures.',
    forms: ['savoir expérientiel', 'savoirs expérientiels'],
  },
  {
    id: 'silence',
    term: 'Silence',
    definition: 'Trop peu de résultats, alors que des documents existent sans doute.',
    detail:
      'Pour réduire le silence : ajoutez des synonymes avec OU, essayez l’anglais, ou changez d’outil.',
    forms: ['silence'],
  },
  {
    id: 'source',
    term: 'Source',
    definition: 'Un document sur lequel vous vous appuyez : article, livre, rapport, loi, vidéo.',
    detail:
      'Le DU attend des sources variées : articles, ouvrages de référence, témoignages. Une IA n’est pas une source.',
    forms: ['source', 'sources'],
  },
  {
    id: 'sudoc',
    term: 'Sudoc',
    definition: 'Le catalogue commun des bibliothèques universitaires françaises.',
    detail:
      'Il indique dans quelle bibliothèque se trouve un livre, une revue ou une thèse. C’est une bonne source pour une référence fiable.',
    forms: ['Sudoc'],
  },
  {
    id: 'texte-integral',
    term: 'Texte intégral',
    definition: 'Le document complet, et pas seulement son résumé.',
    detail:
      'Une base de données ne donne pas toujours le texte intégral. Votre documentaliste peut vous aider à l’obtenir.',
    forms: ['texte intégral'],
  },
  {
    id: 'thesaurus',
    term: 'Thésaurus',
    definition: 'La liste organisée des mots-clés utilisés par une base de données.',
    detail:
      'Chaque base a le sien. Une recherche écrite pour une base ne se copie donc pas telle quelle dans une autre.',
    forms: ['thésaurus'],
  },
  {
    id: 'troncature',
    term: 'Troncature',
    definition: 'L’astérisque placé après le début d’un mot, pour trouver toutes ses terminaisons.',
    detail:
      'psychiatr* trouve psychiatre, psychiatrie, psychiatrique. Dans PubMed, il faut au moins quatre lettres avant l’astérisque.',
    forms: ['troncature'],
  },
  {
    id: 'zotero',
    term: 'Zotero',
    definition: 'Un logiciel gratuit qui garde vos références et fabrique votre bibliographie.',
    detail:
      'Il s’installe sur ordinateur et s’ajoute à votre navigateur et à Word. Sans rien installer, ZoteroBib fait une bibliographie simple en ligne.',
    forms: ['Zotero'],
  },
];

export const glossary: readonly GlossaryEntry[] = [...ENTRIES].sort((a, b) =>
  compareFrench(a.term, b.term),
);

export function findGlossaryEntry(id: string): GlossaryEntry | undefined {
  return glossary.find((entry) => entry.id === id);
}
