import type { Section } from '../types';

export const trierSection: Section = {
  id: 'trier',
  slug: 'trier',
  question: 'Comment trier ce que je trouve ?',
  promise:
    'Vous avez lancé vos premières recherches, et les résultats arrivent. Comment savoir ce qui mérite votre temps ? Voyons comment ajuster une recherche, juger un document, lire un article efficacement et obtenir le texte complet.',
  lessons: [
    {
      slug: 'trop-ou-pas-assez',
      question: 'J’ai trop de résultats, ou pas assez : que faire ?',
      minutes: 4,
      summary:
        'Trop de résultats ? C’est le [[bruit]] : resserrez avec ET, avec des guillemets ou par la date. Trop peu ? C’est le [[silence]] : élargissez avec des synonymes, en anglais ou dans un autre outil.',
      blocks: [
        {
          kind: 'paragraph',
          text: 'C’est le problème le plus fréquent, et c’est aussi le plus facile à régler. Une première recherche donne rarement le bon résultat du premier coup, même pour les documentalistes. On ajuste, on relance, on ajuste encore.',
        },
        { kind: 'scene', scene: 'bruit-silence' },
        {
          kind: 'table',
          caption: 'Que faire selon la situation',
          headers: ['Ce que vous constatez', 'Ce que vous pouvez essayer'],
          rows: [
            [
              'Des milliers de résultats',
              'Ajoutez une idée avec ET, ou filtrez par date et par type de document',
            ],
            [
              'Beaucoup de résultats hors sujet',
              'Mettez une expression entre guillemets, ou cherchez dans le titre',
            ],
            ['Très peu de résultats', 'Ajoutez des synonymes avec OU, ou retirez une idée'],
            ['Aucun résultat', 'Vérifiez l’orthographe, essayez l’anglais ou un autre outil'],
          ],
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Combien de résultats viser ?',
          text: 'Il n’y a pas de bon chiffre. Regardez les dix premiers : s’ils sont en lien avec votre question, votre recherche est bonne. Et n’oubliez pas de noter vos essais dans votre journal de bord.',
        },
      ],
      takeaways: [
        'Trop de résultats : resserrez. Trop peu : élargissez.',
        'Ajuster sa recherche plusieurs fois est tout à fait normal.',
        'Jugez une recherche d’après ses dix premiers résultats.',
      ],
    },
    {
      slug: 'fiable',
      question: 'Comment savoir si une source est fiable ?',
      minutes: 6,
      summary:
        'Posez quatre questions à chaque document : qui l’a écrit, quand, où a-t-il été publié, et dans quel but ? Ces questions suffisent à écarter la plupart des [[source|sources]] douteuses.',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Sur Internet, chacun peut publier ce qu’il veut. Dans une revue sérieuse, un texte passe par un [[comite-de-lecture|comité de lecture]]. Cela ne veut pas dire qu’un blog ne vaut rien, ni qu’un article est toujours juste. Il faut simplement savoir ce qu’on a sous les yeux.',
        },
        { kind: 'scene', scene: 'fiabilite' },
        {
          kind: 'table',
          caption: 'Quatre questions à poser à un document',
          headers: ['Question', 'Ce que vous regardez'],
          rows: [
            ['Qui ?', 'L’auteur est-il nommé ? Quelle est sa formation, ou son expérience ?'],
            ['Quand ?', 'La date est-elle indiquée ? Le document est-il encore à jour ?'],
            ['Où ?', 'Une revue, un site institutionnel, une association, un blog personnel ?'],
            ['Pourquoi ?', 'Veut-il informer, convaincre ou vendre quelque chose ?'],
          ],
        },
        {
          kind: 'callout',
          tone: 'rule',
          title: 'Un témoignage est une source à part entière',
          text: 'En pair-aidance, un témoignage ou un blog de personne concernée peut être très précieux. Présentez-le simplement pour ce qu’il est : une parole située, qui ne vaut pas preuve générale.',
        },
        {
          kind: 'more',
          title: 'Comment reconnaître une revue sérieuse ?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Une [[revue-scientifique|revue scientifique]] indique son comité de lecture, ses règles de publication et son [[editeur|éditeur]]. Dans le doute, vérifiez si elle apparaît dans PubMed ou dans Cairn, ou demandez à votre documentaliste.',
            },
            {
              kind: 'paragraph',
              text: 'Méfiez-vous des sites qui ressemblent à des revues mais publient contre paiement, sans vraie relecture. Un document peu fiable se repère souvent à l’absence de date, d’auteur ou de sources.',
            },
          ],
        },
      ],
      takeaways: [
        'Quatre questions : qui, quand, où, pourquoi.',
        'Un témoignage est précieux : présentez-le pour ce qu’il est.',
        'Dans le doute, demandez à un documentaliste.',
      ],
    },
    {
      slug: 'lire-un-article',
      question: 'Comment lire un article sans tout lire ?',
      minutes: 6,
      summary:
        'Un article scientifique ne se lit pas comme un roman. Commencez par le titre et le [[abstract|résumé]], passez à la conclusion, et n’entrez dans le détail que si le texte vous sert vraiment.',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Beaucoup de personnes abandonnent un article au bout de deux pages, parce qu’il semble trop difficile. Or il existe une méthode. La plupart des articles suivent le même plan, appelé [[imrad|IMRaD]]. Une fois ce plan connu, vous savez où aller.',
        },
        { kind: 'scene', scene: 'imrad' },
        {
          kind: 'list',
          ordered: true,
          items: [
            '**Lisez le titre et le résumé.** En deux minutes, vous savez si l’article parle de votre question.',
            '**Allez à la conclusion ou à la discussion.** Vous y trouverez ce que les auteurs ont retenu.',
            '**Regardez la méthode.** Combien de personnes ont participé ? Où ? Comment ?',
            '**Lisez le reste seulement si cela vous aide.** Vous avez le droit de ne pas tout comprendre.',
          ],
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Prenez des notes en lisant',
          text: 'Notez la [[reference|référence]], l’idée principale et ce que cela apporte à votre question, en deux ou trois lignes avec vos propres mots. Votre rédaction sera bien plus facile, et vous éviterez le [[plagiat]] sans le vouloir.',
        },
        {
          kind: 'more',
          title: 'Et les articles en anglais ?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Vous pouvez vous aider d’un outil de traduction, en commençant par le résumé. Rappelez-vous que vous devez citer l’article d’origine. Votre traduction d’une idée compte comme une [[paraphrase|reformulation]].',
            },
          ],
        },
      ],
      takeaways: [
        'Titre, résumé, conclusion : c’est l’ordre de lecture le plus efficace.',
        'La plupart des articles suivent le plan IMRaD.',
        'Notez vos idées avec vos propres mots dès la lecture.',
      ],
    },
    {
      slug: 'texte-complet',
      question: 'Comment obtenir le texte complet ?',
      minutes: 4,
      summary:
        'Si un article n’est pas accessible, ne renoncez pas. Regardez d’abord s’il existe en [[open-access|accès libre]], passez ensuite par votre accès Lyon 1, puis demandez à la bibliothèque du CRR.',
      blocks: [
        {
          kind: 'paragraph',
          text: 'C’est frustrant de tomber sur un article payant au moment où l’on trouve enfin ce qu’on cherchait. Avant de passer à autre chose, essayez ces quatre pistes, dans cet ordre.',
        },
        {
          kind: 'list',
          ordered: true,
          items: [
            '**Cherchez le titre exact** dans Google Scholar : une version gratuite apparaît parfois à droite des résultats.',
            '**Essayez votre accès Lyon 1**, si vous en avez un : il ouvre de nombreuses revues.',
            '**Essayez [Unpaywall](https://unpaywall.org/)** : ce service repère les versions légales et gratuites d’un article.',
            '**Écrivez à la bibliothèque du CRR**, avec la [[reference|référence]] la plus complète possible.',
          ],
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Comment demander un document',
          text: 'Envoyez à [bibliotheque-crr@ch-le-vinatier.fr](mailto:bibliotheque-crr@ch-le-vinatier.fr) les auteurs, le titre, la revue, l’année et le [[doi|DOI]]. Plus votre référence est précise, plus la réponse sera rapide.',
        },
        {
          kind: 'callout',
          tone: 'warning',
          title: 'Le prêt et les droits',
          text: 'Les documents obtenus par une bibliothèque ou un abonnement restent protégés. Gardez-les pour votre usage personnel, et ne les déposez pas sur Internet ni dans un outil d’IA sans autorisation.',
        },
      ],
      takeaways: [
        'Vérifiez d’abord s’il existe une version en accès libre.',
        'Votre accès Lyon 1 et la bibliothèque du CRR sont là pour vous aider.',
        'Donnez toujours la référence la plus complète possible.',
      ],
    },
  ],
  quiz: [
    {
      id: 'bruit',
      prompt: 'Vous obtenez 12 000 résultats, souvent hors sujet. Que faites-vous ?',
      choices: [
        {
          text: 'Vous resserrez avec ET, des guillemets ou un filtre de date.',
          correct: true,
          feedback: 'Oui, c’est ce qu’on appelle réduire le bruit.',
        },
        {
          text: 'Vous les parcourez tous, un par un.',
          correct: false,
          feedback: 'Ce serait épuisant et peu utile. Mieux vaut d’abord ajuster la recherche.',
        },
      ],
    },
    {
      id: 'silence',
      prompt: 'Votre recherche donne deux résultats. Que pouvez-vous essayer ?',
      multiple: true,
      choices: [
        {
          text: 'Ajouter des synonymes avec OU.',
          correct: true,
          feedback: 'Oui, cela élargit la recherche.',
        },
        {
          text: 'Essayer en anglais ou dans un autre outil.',
          correct: true,
          feedback: 'Oui, chaque outil couvre des documents différents.',
        },
        {
          text: 'Ajouter un mot de plus avec ET.',
          correct: false,
          feedback: 'Cela réduirait encore le nombre de résultats.',
        },
      ],
    },
    {
      id: 'fiable',
      prompt: 'Une page web n’a ni auteur ni date. Que pensez-vous ?',
      choices: [
        {
          text: 'Je m’en méfie, et je cherche une source plus solide.',
          correct: true,
          feedback: 'C’est le bon réflexe. Sans auteur ni date, difficile de la juger.',
        },
        {
          text: 'Elle est fiable si elle est bien présentée.',
          correct: false,
          feedback: 'Une belle présentation ne dit rien de la qualité du contenu.',
        },
      ],
    },
    {
      id: 'lire',
      prompt: 'Quel est l’ordre de lecture le plus efficace pour un article ?',
      choices: [
        {
          text: 'Titre, résumé, conclusion, puis le reste si besoin.',
          correct: true,
          feedback: 'Oui, vous savez vite si l’article vous sera utile.',
        },
        {
          text: 'De la première à la dernière page, sans rien sauter.',
          correct: false,
          feedback:
            'Vous pouvez le faire, mais c’est long. Commencez plutôt par repérer l’essentiel.',
        },
      ],
    },
    {
      id: 'texte',
      prompt: 'Un article est payant. Quelle est la bonne démarche ?',
      choices: [
        {
          text: 'Chercher une version gratuite, essayer Lyon 1, puis demander à la bibliothèque.',
          correct: true,
          feedback: 'Exactement, il y a souvent une solution.',
        },
        {
          text: 'Citer l’article à partir de son seul résumé.',
          correct: false,
          feedback: 'Citez ce que vous avez lu. Essayez plutôt d’obtenir le texte complet.',
        },
      ],
    },
  ],
};
