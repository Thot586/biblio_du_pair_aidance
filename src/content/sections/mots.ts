import type { Section } from '../types';

export const motsSection: Section = {
  id: 'mots',
  slug: 'mots',
  question: 'Quels mots utiliser pour chercher ?',
  promise:
    'Vous avez votre question ? Il reste à la traduire en mots qu’un outil de recherche comprendra. C’est plus simple qu’il n’y paraît : nous allons trouver vos mots, les passer en anglais si besoin, puis apprendre à les combiner.',
  lessons: [
    {
      slug: 'trouver-mes-mots',
      question: 'Comment trouver mes mots-clés ?',
      minutes: 5,
      summary:
        'Repartez de votre question et soulignez les deux ou trois idées importantes. Pour chacune, notez les synonymes et les mots proches. Plus votre vocabulaire est riche, meilleurs seront vos résultats.',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Un outil de recherche ne comprend pas vraiment votre question : il cherche des mots dans des documents. Si vous tapez votre question entière, il risque de vous répondre n’importe quoi. Il faut donc en extraire les [[mot-cle|mots-clés]].',
        },
        {
          kind: 'paragraph',
          text: 'Reprenons la question de Sam : « Comment une personne pair-aidante trouve-t-elle sa place dans une équipe d’addictologie ? ». Trois idées ressortent : la pair-aidance, l’addictologie et la place dans l’équipe.',
        },
        {
          kind: 'table',
          caption: 'Les idées de Sam, et les mots qui vont avec',
          headers: ['L’idée', 'Les mots possibles'],
          rows: [
            [
              'La pair-aidance',
              'pair-aidant, pair-aidance, médiateur de santé pair, travailleur pair',
            ],
            ['L’addictologie', 'addictologie, addiction, conduites addictives'],
            [
              'La place dans l’équipe',
              'intégration, équipe de soins, rôle, identité professionnelle',
            ],
          ],
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Où trouver des synonymes ?',
          text: 'Regardez d’abord votre [[carte-mentale|carte mentale]]. Ensuite, le [CNRTL](https://www.cnrtl.fr/) propose des définitions et des synonymes. Et lors de vos premières lectures, notez les mots qu’emploient les auteurs : ce sont souvent les bons.',
        },
        {
          kind: 'more',
          title: 'Pourquoi ne pas taper ma question telle quelle ?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Les mots « comment », « une », « dans » n’apportent rien à la recherche, et ils peuvent même la brouiller. Un outil d’IA peut comprendre une phrase entière, mais PubMed ou une [[base-de-donnees|base de données]] cherchent surtout des mots précis.',
            },
          ],
        },
      ],
      takeaways: [
        'Partez de votre question, et gardez deux ou trois idées principales.',
        'Pour chaque idée, notez plusieurs mots : synonymes, sigles, mots proches.',
        'Vos premières lectures vous donneront de nouveaux mots.',
      ],
    },
    {
      slug: 'anglais',
      question: 'Dois-je chercher en anglais ?',
      minutes: 6,
      summary:
        'Vous pouvez faire un très bon mémoire avec des sources en français. L’anglais ouvre cependant l’accès à beaucoup plus de recherches, notamment sur PubMed. Quelques mots suffisent, et des outils vous aident à les trouver.',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Si l’anglais vous inquiète, rassurez-vous : personne ne vous demande de lire des articles entiers sans aide. Il s’agit surtout de connaître quelques mots pour chercher, puis de vous appuyer sur le résumé ou sur une traduction.',
        },
        {
          kind: 'table',
          caption: 'Quelques mots utiles, vérifiés dans PubMed',
          headers: ['En français', 'En anglais', 'Mot-clé officiel de PubMed ?'],
          rows: [
            ['pair-aidance', 'peer support', 'Non, à chercher en texte libre'],
            ['groupe de pairs', 'peer group', 'Oui : Peer Group'],
            ['rétablissement', 'mental health recovery', 'Oui : Mental Health Recovery'],
            ['santé mentale', 'mental health', 'Oui : Mental Health'],
            ['stigmatisation', 'social stigma', 'Oui : Social Stigma'],
            ['pouvoir d’agir', 'empowerment', 'Oui : Empowerment'],
            ['addictions', 'substance-related disorders', 'Oui : Substance-Related Disorders'],
            ['schizophrénie', 'schizophrenia', 'Oui : Schizophrenia'],
            ['autisme', 'autism spectrum disorder', 'Oui : Autism Spectrum Disorder'],
            ['équipe soignante', 'patient care team', 'Oui : Patient Care Team'],
          ],
        },
        {
          kind: 'paragraph',
          text: 'Et pour un mot qui n’est pas dans ce tableau ? PubMed utilise sa propre liste de mots-clés, le [[mesh|MeSH]]. Le site HeTOP permet de la consulter en français. Regardons comment Sam s’y prend.',
        },
        { kind: 'scene', scene: 'traduire-mesh' },
        {
          kind: 'links',
          title: 'Les deux outils à connaître',
          links: [
            {
              label: 'HeTOP',
              url: 'https://www.hetop.eu/hetop/',
              description: 'pour trouver le terme exact en plusieurs langues',
            },
            {
              label: 'MeSH bilingue',
              url: 'https://mesh.inserm.fr/FrenchMesh/',
              description: 'le MeSH en français, proposé par l’Inserm',
            },
          ],
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Une astuce de documentaliste',
          text: 'Faites d’abord une recherche en anglais sur Google Scholar. Les titres des résultats vous montreront les mots que les chercheurs utilisent vraiment.',
        },
      ],
      takeaways: [
        'L’anglais n’est pas obligatoire, mais il ouvre beaucoup de portes.',
        'Quelques mots suffisent pour chercher.',
        'HeTOP vous aide à trouver le terme anglais exact.',
      ],
    },
    {
      slug: 'combiner',
      question: 'Comment combiner mes mots ?',
      minutes: 6,
      summary:
        'Trois petits mots font tout le travail : **ET** resserre la recherche, **OU** l’élargit, **SAUF** retire un mot. On les appelle les [[operateurs|opérateurs]]. Avec eux, vous construisez votre [[equation|équation de recherche]].',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Le mot « équation » fait peur, mais il n’y a aucune mathématique là-dedans. Une équation de recherche est simplement une façon claire d’écrire ce que vous cherchez. L’animation vous montre ce que fait chaque opérateur.',
        },
        { kind: 'scene', scene: 'et-ou-sauf' },
        {
          kind: 'table',
          caption: 'Que choisir ?',
          headers: ['Je veux…', 'J’utilise', 'Exemple'],
          rows: [
            ['Des documents qui parlent des deux idées', 'ET', 'pair-aidance ET addictologie'],
            [
              'Des documents avec l’un ou l’autre mot',
              'OU',
              'pair-aidance OU médiateur de santé pair',
            ],
            ['Écarter un sujet qui revient trop', 'SAUF', 'pair-aidance SAUF cancer'],
          ],
        },
        {
          kind: 'paragraph',
          text: 'La plupart du temps, on combine les deux premiers. Les synonymes vont ensemble avec OU, entre parenthèses, et les idées différentes se relient avec ET. Voici l’équation de Sam :',
        },
        {
          kind: 'callout',
          tone: 'example',
          title: 'L’équation de Sam',
          text: '(pair-aidance OU « médiateur de santé pair ») ET (addictologie OU addiction)',
        },
        {
          kind: 'paragraph',
          text: 'Inutile de l’écrire à la main : l’outil ci-dessous la construit à partir de vos mots.',
        },
        { kind: 'tool', tool: 'constructeur-equation' },
        {
          kind: 'more',
          title: 'ET, AND ou un espace ?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Cela dépend de l’outil. Les outils français acceptent en général ET, OU, SAUF. PubMed attend AND, OR, NOT, en majuscules. Sur Google et Google Scholar, un simple espace vaut ET, et le signe moins remplace SAUF.',
            },
            {
              kind: 'paragraph',
              text: 'Semantic Scholar, lui, ne comprend aucun de ces opérateurs. Dans le doute, cherchez le lien « Recherche avancée » de l’outil : il propose souvent des cases à remplir.',
            },
          ],
        },
      ],
      takeaways: [
        'ET resserre, OU élargit, SAUF retire.',
        'Les synonymes vont avec OU entre parenthèses, les idées se relient avec ET.',
        'Chaque outil a sa propre façon d’écrire ces opérateurs.',
      ],
    },
    {
      slug: 'guillemets-asterisque',
      question: 'À quoi servent les guillemets et l’astérisque ?',
      minutes: 4,
      summary:
        'Les **guillemets** demandent une expression exacte. L’**astérisque** remplace la fin d’un mot : c’est la [[troncature|troncature]]. Ces deux petits signes changent beaucoup vos résultats.',
      blocks: [
        { kind: 'scene', scene: 'guillemets-asterisque' },
        {
          kind: 'paragraph',
          text: 'Prenons un exemple. Si vous tapez *médiateur de santé pair* sans guillemets, l’outil peut trouver des documents où ces mots sont éparpillés. Avec des guillemets, il cherche ces mots collés, dans cet ordre.',
        },
        {
          kind: 'paragraph',
          text: 'L’astérisque, lui, évite d’écrire toutes les variantes d’un mot. En tapant psychiatr*, vous trouverez psychiatre, psychiatrie, psychiatrique et même psychiatres.',
        },
        {
          kind: 'callout',
          tone: 'warning',
          title: 'Tous les outils n’acceptent pas l’astérisque',
          text: 'PubMed demande au moins quatre lettres avant l’astérisque. Google Scholar et Semantic Scholar ne s’en servent pas pour trouver les fins de mots. En cas de doute, écrivez les variantes avec OU.',
        },
      ],
      takeaways: [
        'Les guillemets servent à chercher une expression exacte.',
        'L’astérisque remplace la fin d’un mot.',
        'Vérifiez ce que chaque outil accepte.',
      ],
    },
    {
      slug: 'mots-de-chaque-base',
      question: 'Pourquoi chaque base a-t-elle ses propres mots ?',
      minutes: 4,
      summary:
        'Vous pouvez chercher avec vos propres mots, c’est le langage libre. Beaucoup de bases utilisent aussi une liste de mots-clés choisis par des spécialistes, le [[thesaurus|thésaurus]]. Utiliser ces mots rend la recherche plus précise.',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Imaginez une bibliothèque où chaque livre porte des étiquettes posées par des bibliothécaires. Vous pouvez chercher un mot dans les titres, ou directement consulter une étiquette. Les deux méthodes sont utiles.',
        },
        {
          kind: 'table',
          caption: 'Deux façons de chercher',
          headers: ['En pratique', 'Le langage libre', 'Les mots-clés d’un thésaurus'],
          rows: [
            [
              'Comment ?',
              'Vous tapez vos propres mots',
              'Vous choisissez dans la liste de la base',
            ],
            [
              'Avantage',
              'C’est simple, et on trouve beaucoup',
              'C’est précis, avec moins de résultats hors sujet',
            ],
            [
              'Limite',
              'Il faut penser à tous les synonymes',
              'Il faut connaître les mots de la base',
            ],
            ['Quand ?', 'Pour commencer et explorer', 'Pour affiner une recherche'],
          ],
        },
        {
          kind: 'callout',
          tone: 'warning',
          title: 'Une recherche ne se copie pas d’une base à l’autre',
          text: 'Chaque base a son propre langage. Une équation qui marche dans SantéPsy devra être adaptée pour PubMed. C’est tout à fait normal.',
        },
      ],
      takeaways: [
        'Commencez avec vos mots, en langage libre.',
        'Regardez ensuite les mots-clés de la base pour affiner.',
        'Adaptez votre recherche à chaque outil.',
      ],
    },
  ],
  quiz: [
    {
      id: 'idees',
      prompt:
        'Vous cherchez des documents sur la pair-aidance en équipe mobile. Quelle recherche est la mieux construite ?',
      choices: [
        {
          text: 'pair-aidance ET « équipe mobile »',
          correct: true,
          feedback: 'Oui : deux idées reliées par ET, et une expression entre guillemets.',
        },
        {
          text: 'Quel est le rôle des pair-aidants dans les équipes mobiles ?',
          correct: false,
          feedback: 'Une phrase entière brouille souvent la recherche. Gardez les mots importants.',
        },
      ],
    },
    {
      id: 'ou',
      prompt: 'Vous avez trop peu de résultats. Quel opérateur vous aide à en trouver plus ?',
      choices: [
        {
          text: 'OU',
          correct: true,
          feedback: 'Oui, OU ajoute des synonymes et élargit la recherche.',
        },
        {
          text: 'ET',
          correct: false,
          feedback: 'ET fait l’inverse : il exige que tous les mots soient présents.',
        },
        {
          text: 'SAUF',
          correct: false,
          feedback: 'SAUF retire des résultats. Vous en auriez encore moins.',
        },
      ],
    },
    {
      id: 'guillemets',
      prompt: 'Pourquoi mettre « médiateur de santé pair » entre guillemets ?',
      choices: [
        {
          text: 'Pour chercher cette expression exacte.',
          correct: true,
          feedback: 'Oui, les mots doivent être côte à côte, dans cet ordre.',
        },
        {
          text: 'Pour montrer que c’est une citation.',
          correct: false,
          feedback: 'Dans un outil de recherche, les guillemets servent à figer une expression.',
        },
      ],
    },
    {
      id: 'astérisque',
      prompt: 'Que trouvera la recherche psychiatr* ?',
      choices: [
        {
          text: 'Les mots qui commencent par psychiatr : psychiatrie, psychiatre, psychiatrique.',
          correct: true,
          feedback: 'Exactement. Attention : tous les outils ne l’acceptent pas.',
        },
        {
          text: 'Uniquement le mot psychiatr, avec une étoile.',
          correct: false,
          feedback: 'L’astérisque remplace la fin du mot, il ne se cherche pas lui-même.',
        },
      ],
    },
    {
      id: 'copier',
      prompt: 'Votre recherche marche très bien dans SantéPsy. Que faites-vous pour PubMed ?',
      choices: [
        {
          text: 'Vous l’adaptez : anglais, AND et OR, mots de PubMed.',
          correct: true,
          feedback: 'Oui, chaque outil a son propre langage.',
        },
        {
          text: 'Vous la copiez telle quelle.',
          correct: false,
          feedback:
            'Elle risque de ne rien donner : PubMed attend de l’anglais et ses propres mots.',
        },
      ],
    },
  ],
};
