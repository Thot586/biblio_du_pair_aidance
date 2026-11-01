import type { Section } from '../types';

const LYON1_GUIDE =
  'https://portaildoc.univ-lyon1.fr/les-collections/explorer-par-themes/guide-bibliographique-de-la-norme-apa-7th-zotero';

export const citerSection: Section = {
  id: 'citer',
  slug: 'citer',
  question: 'Comment citer et faire ma bibliographie ?',
  shortTitle: 'Citer',
  promise:
    'La norme APA a mauvaise réputation, mais elle repose sur une logique simple. Nous allons voir comment citer dans votre texte, comment écrire une référence pour chaque type de document, et comment vous faire aider par des outils.',
  lessons: [
    {
      slug: 'pourquoi-citer',
      question: 'Pourquoi citer, et qu’est-ce que le plagiat ?',
      minutes: 4,
      summary:
        'Citer, c’est dire d’où vient une idée. Cela permet à votre lecteur de vérifier, et cela donne du poids à ce que vous écrivez. Reprendre une idée sans le dire, même sans le vouloir, c’est du [[plagiat]].',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Citer n’a rien d’une simple formalité. Quand vous écrivez « selon Castro, la pair-aidance… », vous montrez que vous avez lu, vous rendez à l’autrice ce qui lui appartient, et votre lecteur peut aller vérifier. C’est une marque de sérieux, et de respect.',
        },
        {
          kind: 'paragraph',
          text: 'Vous avez deux façons d’utiliser un texte. Vous pouvez recopier une phrase mot pour mot, entre guillemets : c’est une citation exacte. Ou vous pouvez dire l’idée avec vos mots : c’est une [[paraphrase|reformulation]]. Dans les deux cas, vous indiquez la [[source|source]].',
        },
        {
          kind: 'compare',
          before: {
            label: 'Du plagiat',
            text: 'Copier une phrase ou une idée d’un article sans indiquer d’où elle vient, même en changeant quelques mots.',
          },
          after: {
            label: 'Une bonne pratique',
            text: 'Dire l’idée avec vos propres mots, puis ajouter (Nom, année) juste après.',
          },
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Le réflexe qui protège',
          text: 'Quand vous lisez, notez les idées avec vos propres mots, et notez toujours la [[reference|référence]] à côté. Le plagiat involontaire vient presque toujours de notes mal tenues.',
        },
      ],
      takeaways: [
        'Citer permet de vérifier, et donne du poids à votre travail.',
        'Toute idée empruntée se cite, même reformulée.',
        'Notez vos sources dès la lecture.',
      ],
    },
    {
      slug: 'citer-dans-le-texte',
      question: 'Comment citer dans mon texte ?',
      minutes: 7,
      summary:
        'Avec la norme [[apa|APA]], on indique simplement le nom et l’année, entre parenthèses : (Castro, 2020). Il n’y a pas de note de bas de page. Votre lecteur retrouve le reste dans la bibliographie.',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Le principe tient en une phrase : chaque [[citation|citation dans le texte]] renvoie à une ligne de la [[bibliographie]]. L’animation vous montre le lien entre les deux.',
        },
        { kind: 'scene', scene: 'citer-texte-liste' },
        {
          kind: 'table',
          caption: 'Comment écrire la citation selon le nombre d’auteurs',
          headers: ['Situation', 'Ce que vous écrivez'],
          rows: [
            ['Un auteur', '(Castro, 2020)'],
            ['Deux auteurs', '(Franck & Cellard, 2020)'],
            ['Trois auteurs ou plus', '(Le Cardinal et al., 2013)'],
            ['Un organisme avec un sigle', 'Haute Autorité de santé (HAS, 2024), puis (HAS, 2024)'],
            ['Pas de date', '(Castro, s. d.)'],
            ['Plusieurs [[source|sources]] à la fois', '(Castro, 2020; Le Cardinal et al., 2013)'],
          ],
        },
        { kind: 'heading', text: 'Reprendre les mots exacts d’un auteur' },
        {
          kind: 'paragraph',
          text: 'La norme APA préfère la [[paraphrase|reformulation]]. Mais une phrase est parfois si juste qu’on a envie de la garder telle quelle. Dans ce cas, deux cas se présentent.',
        },
        {
          kind: 'list',
          items: [
            '**Moins de 40 mots** : vous mettez la phrase entre guillemets, avec le numéro de page : (Castro, 2020, p. 19).',
            '**40 mots ou plus** : vous la placez dans un paragraphe à part, en retrait de 1,25 cm, sans guillemets, suivie de la [[reference|référence]] et de la page.',
          ],
        },
        {
          kind: 'callout',
          tone: 'example',
          title: 'Sam reformule une idée',
          text: 'Sam écrit : « Pour Le Cardinal et ses collègues, la pair-aidance s’inscrit dans une évolution vers des pratiques orientées vers le rétablissement (Le Cardinal et al., 2013). »',
        },
        {
          kind: 'more',
          title: 'Et si je veux citer un auteur que je n’ai pas lu directement ?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Il arrive qu’un article parle d’un texte que vous ne pouvez pas obtenir. Essayez d’abord de lire le texte d’origine. Si c’est impossible, écrivez (Deegan, 1988, cité par Castro, 2020).',
            },
            {
              kind: 'paragraph',
              text: 'Dans votre bibliographie, seule la source que vous avez réellement lue apparaît : ici, Castro.',
            },
          ],
        },
        {
          kind: 'more',
          title: 'Puis-je utiliser des notes de bas de page, ou « Ibid. » ?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Non, la norme APA ne les utilise pas pour citer. Si vous citez à nouveau la même source, répétez simplement (Nom, année).',
            },
          ],
        },
      ],
      takeaways: [
        'Dans le texte : (Nom, année). Pas de note de bas de page.',
        'Trois auteurs ou plus : le premier nom suivi de « et al. ».',
        'Citation exacte : guillemets et numéro de page.',
      ],
    },
    {
      slug: 'ecrire-une-reference',
      question: 'Comment écrire une référence ?',
      minutes: 6,
      summary:
        'Une [[reference|référence]] répond toujours à quatre questions dans le même ordre : qui a écrit, quand, quoi, et où c’est publié. Le générateur du site l’écrit pour vous, et vous montre à quoi sert chaque morceau.',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Une référence peut sembler pleine de pièges, avec ses points, ses virgules et ses italiques. Pourtant, la logique est toujours la même. Regardons comment elle se construit.',
        },
        { kind: 'scene', scene: 'anatomie-reference' },
        { kind: 'tool', tool: 'generateur-apa' },
        {
          kind: 'callout',
          tone: 'rule',
          title: 'La règle suivie sur ce site',
          text: `Il n’existe pas de traduction française officielle de la norme [[apa|APA]]. Ce site suit le [guide de la BU Lyon 1](${LYON1_GUIDE}), mis à jour en juillet 2026. C’est lui qu’il faut consulter pour les cas particuliers.`,
        },
        {
          kind: 'more',
          title: 'Comment présenter ma liste dans Word ?',
          blocks: [
            {
              kind: 'list',
              items: [
                'Classez les références par ordre alphabétique du premier auteur.',
                'Mettez un interligne double.',
                'Ajoutez un retrait de 1,25 cm à partir de la deuxième ligne.',
                'Utilisez la même police que dans votre mémoire : Calibri ou Times New Roman, taille 12.',
              ],
            },
          ],
        },
      ],
      takeaways: [
        'Toujours le même ordre : qui, quand, quoi, où.',
        'Le titre de la revue ou du livre est en italique.',
        'Relisez toujours une référence, même produite par un outil.',
      ],
    },
    {
      slug: 'exemples',
      question: 'À quoi ressemble chaque type de référence ?',
      minutes: 8,
      summary:
        'La forme d’une [[reference|référence]] [[apa|APA]] change un peu selon le document. Voici un exemple réel pour chaque cas fréquent. Gardez cette page sous la main : vous y reviendrez en écrivant votre [[bibliographie|bibliographie]].',
      blocks: [
        { kind: 'heading', text: 'Les plus fréquents' },
        {
          kind: 'reference',
          label: 'Un article de revue, avec volume et numéro',
          reference:
            'Le Cardinal, P., Roelandt, J.-L., Rafael, F., Vasseur-Bacle, S., François, G., & Marsili, M. (2013). Pratiques orientées vers le rétablissement et pair-aidance : historique, études et perspectives. *L’information psychiatrique*, *89*(5), 365-370. https://doi.org/10.1684/ipe.2013.1070',
          inText: '(Le Cardinal et al., 2013)',
        },
        {
          kind: 'reference',
          label: 'Un article d’une revue qui n’a qu’un numéro',
          reference:
            'Castro, D. (2020). Une brève synthèse de la littérature sur la notion de pair-aidance. *Le Journal des psychologues*, (374), 18-23. https://doi.org/10.3917/jdp.374.0018',
          inText: '(Castro, 2020)',
        },
        {
          kind: 'reference',
          label: 'Un article en anglais',
          reference:
            'Dennis, C.-L. (2003). Peer support within a health care context: A concept analysis. *International Journal of Nursing Studies*, *40*(3), 321-332. https://doi.org/10.1016/S0020-7489(02)00092-5',
          inText: '(Dennis, 2003)',
        },
        {
          kind: 'reference',
          label: 'Un livre collectif',
          reference:
            'Franck, N., & Cellard, C. (Eds.). (2020). *Pair-aidance en santé mentale : une entraide professionnalisée*. Elsevier Masson.',
          inText: '(Franck & Cellard, 2020)',
        },
        {
          kind: 'reference',
          label: 'Un chapitre de ce livre',
          reference:
            'Durand, B. (2020). Concept de pair-aidance professionnelle. In N. Franck & C. Cellard (Eds.), *Pair-aidance en santé mentale : une entraide professionnalisée* (p. 47-60). Elsevier Masson. https://doi.org/10.1016/B978-2-294-77119-4.00004-3',
          inText: '(Durand, 2020)',
        },
        {
          kind: 'reference',
          label: 'Une thèse en ligne',
          reference:
            'Rodier, P. (2023). *Pair-aidance en santé mentale et médicaments utilisés en psychiatrie : quel positionnement dans la pratique professionnelle ?* [Thèse d’exercice en pharmacie, Université de Montpellier]. DUMAS. https://dumas.ccsd.cnrs.fr/dumas-04314075v1',
          inText: '(Rodier, 2023)',
        },
        {
          kind: 'reference',
          label: 'Un guide publié par une institution',
          reference:
            'Centre ressource de réhabilitation psychosociale. (2019). *Comment intégrer un travailleur pair dans une équipe de santé mentale ? Petit guide pratique à l’usage des équipes qui souhaitent se lancer*. https://centre-ressource-rehabilitation.org/sites/centre-ressource-rehabilitation.org/IMG/pdf/livret_integrertravailleurpair.pdf',
          inText: '(Centre ressource de réhabilitation psychosociale, 2019)',
        },
        {
          kind: 'reference',
          label: 'Une page web',
          reference:
            'OMS. (2026, septembre 11). *Santé mentale*. Organisation mondiale de la Santé. https://www.who.int/fr/news-room/fact-sheets/detail/mental-health-strengthening-our-response',
          inText: '(OMS, 2026)',
        },
        {
          kind: 'more',
          title: 'Voir les autres types : loi, vidéo, podcast, dictionnaire, colloque',
          blocks: [
            {
              kind: 'reference',
              label: 'Une loi',
              reference:
                'Loi n° 2005-102 du 11 février 2005 pour l’égalité des droits et des chances, la participation et la citoyenneté des personnes handicapées. (2005). https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000809647/',
              inText:
                '(Loi n° 2005-102 du 11 février 2005 pour l’égalité des droits et des chances, la participation et la citoyenneté des personnes handicapées, 2005)',
            },
            {
              kind: 'reference',
              label: 'Une vidéo en ligne',
              reference:
                'Centre ressource réhabilitation psychosociale. (2020, février 3). *Pair aidance professionnelle en santé mentale* [Vidéo]. YouTube. https://www.youtube.com/watch?v=4wdoD7pvo7k',
              inText: '(Centre ressource réhabilitation psychosociale, 2020)',
            },
            {
              kind: 'reference',
              label: 'Une définition de dictionnaire en ligne, sans date',
              reference:
                'CNRTL. (s. d.). Pair. In *Portail lexical*. Consulté 31 octobre 2026, à l’adresse https://www.cnrtl.fr/definition/pair',
              inText: '(CNRTL, s. d.)',
            },
            {
              kind: 'reference',
              label: 'Une émission de radio (exemple inventé pour montrer la forme)',
              reference:
                'Martin, A. (2025, mars 4). Devenir pair-aidant [Émission de radio]. In *Les chemins du rétablissement*. Radio Exemple. https://www.exemple.fr/emission',
            },
            {
              kind: 'reference',
              label: 'Une intervention dans un colloque (exemple inventé pour montrer la forme)',
              reference:
                'Martin, A. (2025, juin 12). *Ma première année de pair-aidance*. Journée régionale de la pair-aidance, Lyon.',
            },
          ],
        },
        {
          kind: 'links',
          title: 'Pour les cas particuliers',
          links: [
            {
              label: 'Le guide APA de la BU Lyon 1 et sa foire aux questions',
              url: LYON1_GUIDE,
            },
            {
              label: 'L’outil bibliographique Diapason',
              url: 'https://mondiapason.ca/fr/outil-bibliographique',
              description:
                'pratique, mais ses règles québécoises diffèrent parfois de celles de Lyon 1',
            },
          ],
        },
      ],
      takeaways: [
        'Article : c’est la revue qui est en italique. Livre : c’est le titre du livre.',
        'Une revue sans volume s’écrit avec le numéro entre parenthèses.',
        'Le [[doi|DOI]] s’écrit toujours sous forme de lien.',
      ],
    },
    {
      slug: 'reference-trouvee',
      question: 'J’ai trouvé une référence : comment l’ajouter ?',
      minutes: 5,
      summary:
        'Si vous avez un [[doi|DOI]], collez-le dans le générateur : la [[reference|référence]] se remplit toute seule. Sinon, vous pouvez partir du bouton « Citer » de Google Scholar ou de PubMed. Dans tous les cas, relisez le résultat.',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Vous avez trouvé un article, un livre, ou même une référence copiée dans la [[bibliographie|bibliographie]] d’un autre texte. Voici le chemin le plus simple, selon ce que vous avez sous la main.',
        },
        {
          kind: 'table',
          caption: 'Que faire selon ce que vous avez',
          headers: ['Ce que vous avez', 'Le plus simple'],
          rows: [
            ['Un DOI', 'Collez-le dans le [générateur APA](/outils/generateur-apa)'],
            ['Un titre d’article', 'Collez-le dans le générateur, puis choisissez le bon résultat'],
            [
              'Un livre français',
              'Cherchez-le dans le [[sudoc|Sudoc]], puis recopiez les informations',
            ],
            [
              'Un résultat Google Scholar',
              'Cliquez sur « Citer », copiez la ligne [[apa|APA]], puis vérifiez-la',
            ],
            [
              'Un résultat PubMed',
              'Cliquez sur Cite, choisissez APA, puis vérifiez les majuscules',
            ],
            [
              'Une référence donnée par une IA',
              '[Vérifiez d’abord qu’elle existe](/outils/verifier-une-reference)',
            ],
          ],
        },
        {
          kind: 'callout',
          tone: 'warning',
          title: 'Ne recopiez pas une référence sans vérifier',
          text: 'Les boutons « Citer » font des erreurs : majuscules, noms mal découpés, [[editeur|éditeur]] manquant. Une bibliographie trouvée ailleurs peut aussi suivre une autre norme. Vérifiez auteur, année, titre et lien.',
        },
        {
          kind: 'callout',
          tone: 'rule',
          title: 'Ne citez que ce que vous avez lu',
          text: 'Selon le guide de la BU Lyon 1, on ne met pas dans sa liste un document qu’on n’a pas lu, même s’il semble intéressant. Si vous l’avez seulement croisé dans un autre texte, utilisez la forme « cité par ».',
        },
      ],
      takeaways: [
        'Un DOI ou un titre suffit pour remplir le générateur.',
        'Les boutons « Citer » aident, mais il faut toujours relire.',
        'Votre liste contient seulement ce que vous avez lu et cité.',
      ],
    },
    {
      slug: 'temoignage-entretien-cours',
      question: 'Comment citer un témoignage, un entretien ou un cours ?',
      minutes: 5,
      summary:
        'Si le document est publié, comme un témoignage en ligne, citez-le comme une page web ou une vidéo. Si votre lecteur ne peut pas le retrouver, comme un entretien ou des propos tenus en cours, il s’agit d’une [[communication-personnelle|communication personnelle]].',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Cette question revient souvent dans le DU, car les paroles de personnes concernées comptent beaucoup. Tout dépend d’une seule chose : votre lecteur peut-il retrouver ce que vous citez ?',
        },
        {
          kind: 'table',
          caption: 'Que faire selon la situation',
          headers: ['Situation', 'Dans le texte', 'Dans la bibliographie'],
          rows: [
            [
              'Un témoignage publié en ligne',
              '(Nom, année)',
              'Oui, comme une page web ou une vidéo',
            ],
            [
              'Un entretien que vous avez mené, placé en [[annexe|annexe]]',
              'Selon la personne B. (Annexe 1)',
              'Non',
            ],
            [
              'Un entretien qui n’est pas en annexe',
              '(A. Martin, communication personnelle, 3 mars 2026)',
              'Non',
            ],
            [
              'Des propos tenus en cours',
              '(A. Martin, communication personnelle, 3 mars 2026)',
              'Non',
            ],
            ['Un cours en ligne de type MOOC', '(Nom, année)', 'Oui, avec [Cours en ligne]'],
          ],
        },
        {
          kind: 'callout',
          tone: 'warning',
          title: 'Pensez à l’anonymat',
          text: 'Pour un entretien, obtenez l’accord de la personne, et demandez-vous si elle peut être reconnue. Dans un mémoire, utilisez une initiale et retirez les détails qui permettraient de l’identifier.',
        },
        {
          kind: 'more',
          title: 'Et mon propre témoignage ?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Votre expérience n’a pas besoin de [[reference|référence]] : vous écrivez en votre nom. Veillez simplement à ce qu’elle serve votre réflexion. Les attendus du DU rappellent que le mémoire n’est pas une biographie.',
            },
          ],
        },
      ],
      takeaways: [
        'Votre lecteur peut retrouver le document ? Il va dans la [[bibliographie|bibliographie]].',
        'Entretien ou cours : communication personnelle, dans le texte seulement.',
        'Protégez toujours l’anonymat des personnes.',
      ],
    },
    {
      slug: 'zotero',
      question: 'Zotero peut-il faire le travail à ma place ?',
      minutes: 6,
      summary:
        '[[zotero|Zotero]] est un logiciel gratuit qui garde vos [[reference|références]] et fabrique votre [[bibliographie|bibliographie]] dans Word. Si vous voulez aller vite sans rien installer, ZoteroBib fait une bibliographie simple en ligne.',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Pour un mémoire de 5 à 25 références, le générateur de ce site suffit largement. Zotero devient très utile si vous avez beaucoup de lectures, ou si vous comptez continuer à écrire après le DU. Regardons ce qu’il fait.',
        },
        { kind: 'scene', scene: 'zotero' },
        {
          kind: 'table',
          caption: 'Lequel choisir ?',
          headers: ['Outil', 'Pour qui ?', 'Installation'],
          rows: [
            ['Le générateur de ce site', 'Vous voulez apprendre et garder la main', 'Aucune'],
            [
              '[ZoteroBib](https://zbib.org/)',
              'Vous voulez une liste rapide, sans compte',
              'Aucune',
            ],
            [
              '[Zotero](https://www.zotero.org/)',
              'Vous avez beaucoup de lectures',
              'Un logiciel et une extension pour le navigateur',
            ],
          ],
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Faites-vous accompagner',
          text: 'La BU de Lyon 1 propose des [tutoriels Zotero](https://portaildoc.univ-lyon1.fr/se-former/gerer-sa-bibliographie) et des [ateliers](https://portaildoc.univ-lyon1.fr/se-former/ateliers-de-formation/les-ateliers-zotero). Une heure en atelier vous fera gagner beaucoup de temps.',
        },
        {
          kind: 'callout',
          tone: 'warning',
          title: 'Zotero ne corrige pas tout',
          text: 'Il recopie ce qu’il trouve sur les sites, avec leurs erreurs. Vérifiez chaque fiche : type de document, auteurs, année et titre.',
        },
      ],
      takeaways: [
        'Zotero range vos références et écrit votre bibliographie dans Word.',
        'ZoteroBib convient pour une liste rapide, sans rien installer.',
        'Vérifiez toujours les fiches : l’outil recopie les erreurs des sites.',
      ],
    },
    {
      slug: 'erreurs-frequentes',
      question: 'Quelles sont les erreurs les plus fréquentes ?',
      minutes: 3,
      summary:
        'La plupart des erreurs se ressemblent, et elles sont faciles à éviter. Avant de rendre votre mémoire, prenez dix minutes pour relire votre [[bibliographie|bibliographie]] avec cette liste.',
      blocks: [
        {
          kind: 'list',
          items: [
            '**Un auteur cité dans le texte manque dans la bibliographie**, ou l’inverse. Vérifiez dans les deux sens.',
            '**L’année ne correspond pas** entre le texte et la liste.',
            '**Le titre est en italique** alors qu’il s’agit d’un article : pour un article, c’est la revue qui est en italique.',
            '**« vol. » et « n° » sont écrits** dans la [[reference|référence]] : gardez seulement les chiffres.',
            '**Le prénom est écrit en entier** : il faut seulement l’initiale.',
            '**Les références ne sont pas classées** par ordre alphabétique.',
            '**La liste mélange plusieurs normes**, parce qu’elle vient de plusieurs outils.',
          ],
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Une relecture efficace',
          text: 'Parcourez votre mémoire du début à la fin. À chaque citation, cochez la référence dans votre liste. À la fin, toutes les lignes doivent être cochées.',
        },
      ],
      takeaways: [
        'Chaque citation a sa référence, et chaque référence a sa citation.',
        'Pour un article, c’est la revue qui est en italique.',
        'Gardez une seule norme, du début à la fin.',
      ],
    },
  ],
  quiz: [
    {
      id: 'reformuler',
      prompt: 'Vous reformulez une idée d’un article avec vos mots. Devez-vous citer la source ?',
      choices: [
        {
          text: 'Oui, toujours.',
          correct: true,
          feedback: 'Oui, l’idée reste celle de l’auteur, même dite avec vos mots.',
        },
        {
          text: 'Non, puisque j’ai changé les mots.',
          correct: false,
          feedback: 'Changer les mots ne suffit pas : sans citation, c’est du plagiat.',
        },
      ],
    },
    {
      id: 'trois',
      prompt:
        'Un article a quatre auteurs : Long, Martin, Durand et Petit (2021). Comment le citez-vous dans le texte ?',
      choices: [
        {
          text: '(Long et al., 2021)',
          correct: true,
          feedback: 'Oui, dès trois auteurs on écrit « et al. ».',
        },
        {
          text: '(Long, Martin, Durand & Petit, 2021)',
          correct: false,
          feedback:
            'Dans le texte, on abrège dès trois auteurs. La liste complète va dans la bibliographie.',
        },
      ],
    },
    {
      id: 'italique',
      prompt: 'Dans la référence d’un article, qu’est-ce qui se met en italique ?',
      choices: [
        { text: 'Le nom de la revue et le volume.', correct: true, feedback: 'Exactement.' },
        {
          text: 'Le titre de l’article.',
          correct: false,
          feedback:
            'Le titre de l’article reste droit. Pour un livre, en revanche, le titre est en italique.',
        },
      ],
    },
    {
      id: 'entretien',
      prompt:
        'Vous citez ce qu’une personne vous a dit en entretien, et il n’est pas en annexe. Que faites-vous ?',
      choices: [
        {
          text: 'Je le cite dans le texte comme communication personnelle, sans l’ajouter à la bibliographie.',
          correct: true,
          feedback: 'Oui, votre lecteur ne peut pas le retrouver, il ne va donc pas dans la liste.',
        },
        {
          text: 'Je l’ajoute à la bibliographie comme un article.',
          correct: false,
          feedback: 'La bibliographie contient seulement ce que votre lecteur peut retrouver.',
        },
      ],
    },
    {
      id: 'citer-bouton',
      prompt: 'Le bouton « Citer » de Google Scholar vous donne une référence. Que faites-vous ?',
      choices: [
        {
          text: 'Je la copie, puis je la vérifie.',
          correct: true,
          feedback: 'Oui, ce bouton fait parfois des erreurs.',
        },
        {
          text: 'Je la copie les yeux fermés.',
          correct: false,
          feedback: 'Il vaut mieux relire : les erreurs y sont fréquentes.',
        },
      ],
    },
    {
      id: 'lu',
      prompt:
        'Un document vous semble intéressant, mais vous ne l’avez pas lu. Pouvez-vous le mettre dans votre liste ?',
      choices: [
        {
          text: 'Non, on cite seulement ce qu’on a lu.',
          correct: true,
          feedback: 'Exactement, c’est la règle du guide de la BU Lyon 1.',
        },
        {
          text: 'Oui, cela allonge ma bibliographie.',
          correct: false,
          feedback: 'Le jury préfère une liste courte et bien utilisée.',
        },
      ],
    },
  ],
};
