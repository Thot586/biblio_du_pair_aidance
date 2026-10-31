import type { Section } from '../types';

export const ouChercherSection: Section = {
  id: 'ou-chercher',
  slug: 'ou-chercher',
  question: 'Où chercher : quel outil choisir ?',
  promise:
    'Il existe beaucoup d’outils, et c’est sans doute ce qui impressionne le plus au début. Rassurez-vous, trois ou quatre suffisent pour un mémoire. Voyons lesquels choisir, et comment vous en servir.',
  lessons: [
    {
      slug: 'quel-outil',
      question: 'Quel outil pour quel besoin ?',
      minutes: 5,
      summary:
        'Commencez par des outils en français, comme la bibliothèque du CRR, Cairn et SantéPsy. Élargissez ensuite avec Google Scholar. Passez à PubMed quand vous cherchez des études internationales en santé.',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Posez-vous d’abord cette question : qu’est-ce que je cherche, là, maintenant ? Une définition, un témoignage, une étude, un texte de loi ? Selon la réponse, l’outil ne sera pas le même.',
        },
        { kind: 'tool', tool: 'choisir-outil' },
        {
          kind: 'table',
          caption: 'Les outils les plus utiles pour votre mémoire',
          headers: ['Outil', 'Idéal pour', 'Langue'],
          rows: [
            [
              'Bibliothèque du CRR',
              'Pair-aidance, réhabilitation, mémoires des promotions passées',
              'Français',
            ],
            ['SantéPsy', 'La documentation française en santé mentale', 'Français'],
            ['Cairn', 'Les revues et livres français de sciences humaines', 'Français'],
            ['Google Scholar', 'Un premier tour large', 'Français et anglais'],
            ['PubMed', 'Les études internationales en santé', 'Anglais'],
            ['Semantic Scholar', 'Comprendre vite un article en anglais', 'Anglais'],
            ['[[sudoc|Sudoc]]', 'Trouver où se trouve un livre ou une thèse', 'Français'],
          ],
        },
        {
          kind: 'more',
          title: 'Moteur de recherche ou base de données : quelle différence ?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Un [[moteur-de-recherche|moteur de recherche]] comme Google Scholar ratisse très large, sans que personne ne trie à l’avance. Une [[base-de-donnees|base de données]] comme PubMed ou SantéPsy est constituée par des spécialistes, qui décrivent chaque document.',
            },
            {
              kind: 'paragraph',
              text: 'Autrement dit, un moteur trouve plus, mais c’est à vous de faire le tri. Une base trouve moins, et ce qu’elle trouve est souvent plus fiable.',
            },
          ],
        },
        {
          kind: 'links',
          title: 'Pour aller plus loin',
          links: [
            {
              label: 'Allo la doc ?',
              url: 'https://www.ascodocpsy.org/allo-la-doc/',
              description: 'des guides courts du réseau Ascodocpsy',
            },
            {
              label: 'DocToBib',
              url: 'https://www.youtube.com/@DocToBib',
              description: 'des tutoriels vidéo sur la recherche en santé',
            },
          ],
        },
      ],
      takeaways: [
        'Partez de ce que vous cherchez, puis choisissez l’outil.',
        'Commencez en français, puis élargissez.',
        'Trois ou quatre outils suffisent pour un mémoire.',
      ],
    },
    {
      slug: 'en-francais',
      question: 'Comment chercher en français ?',
      minutes: 7,
      summary:
        'Vous avez trois points d’entrée : la bibliothèque du CRR pour la pair-aidance, Cairn pour les revues et les livres, SantéPsy pour la santé mentale. Votre compte Lyon 1, si vous en avez un, ouvre l’accès à beaucoup de textes complets.',
      blocks: [
        { kind: 'heading', text: 'La bibliothèque du Centre ressource de réhabilitation' },
        {
          kind: 'paragraph',
          text: 'C’est votre premier contact pour le mémoire. Elle est spécialisée en réhabilitation et en pair-aidance, et elle conserve une sélection de mémoires des promotions passées. Consulter ces mémoires est très utile pour voir ce qu’on attend de vous.',
        },
        {
          kind: 'callout',
          tone: 'warning',
          title: 'Le catalogue en ligne est annoncé indisponible',
          text: 'Fin octobre 2026, le site du CRR indique que son catalogue est temporairement fermé. En attendant, écrivez à [bibliotheque-crr@ch-le-vinatier.fr](mailto:bibliotheque-crr@ch-le-vinatier.fr), en précisant votre sujet : l’équipe vous répondra.',
        },
        { kind: 'heading', text: 'Cairn, avec votre accès Lyon 1' },
        {
          kind: 'paragraph',
          text: 'Cairn rassemble des revues et des livres français en sciences humaines. Sans vous identifier, vous pouvez déjà lire les [[abstract|résumés]] et une partie des articles. Avec un accès Lyon 1, vous accédez à beaucoup plus de [[texte-integral|textes complets]].',
        },
        { kind: 'scene', scene: 'cairn-lyon1' },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Un doute sur vos accès ?',
          text: 'Les droits d’accès dépendent de votre inscription. Si la connexion ne fonctionne pas, écrivez à la BU à [docelec@univ-lyon1.fr](mailto:docelec@univ-lyon1.fr), ou demandez conseil à votre documentaliste.',
        },
        { kind: 'heading', text: 'SantéPsy' },
        {
          kind: 'paragraph',
          text: 'SantéPsy est la base du réseau Ascodocpsy, spécialisée en psychiatrie et en santé mentale. Elle est libre d’accès. Vous pouvez commencer par un mot simple, puis affiner avec les filtres : type de document, date, [[mot-cle|mots-clés]].',
        },
        {
          kind: 'links',
          links: [
            {
              label: 'Portail des bibliothèques de Lyon 1',
              url: 'https://portaildoc.univ-lyon1.fr/',
            },
            {
              label: 'Cairn, connexion par Lyon 1',
              url: 'https://docelec.univ-lyon1.fr/login?url=https://shs.cairn.info/',
            },
            { label: 'Cairn, sans connexion', url: 'https://shs.cairn.info/' },
            { label: 'SantéPsy', url: 'https://santepsy.ascodocpsy.org/' },
            {
              label: 'LiSSa',
              url: 'https://www.lissa.fr/dc/#env=lissa',
              description: 'la littérature de santé en français',
            },
            {
              label: 'Bibliothèque du CRR',
              url: 'https://centre-ressource-rehabilitation.org/nos-actions/la-bibliotheque/article/la-bibliotheque',
            },
          ],
        },
      ],
      takeaways: [
        'Commencez par la bibliothèque du CRR, spécialisée en pair-aidance.',
        'Sur Cairn, connectez-vous par Lyon 1 pour lire plus de textes complets.',
        'SantéPsy est gratuite et centrée sur la santé mentale.',
      ],
    },
    {
      slug: 'google-scholar',
      question: 'Comment utiliser Google Scholar ?',
      minutes: 6,
      summary:
        'Google Scholar est un Google réservé aux travaux académiques. C’est un excellent point de départ, en français comme en anglais. Son grand avantage : le bouton « Cité par », qui mène à des travaux plus récents.',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Si vous savez utiliser Google, vous savez presque utiliser Google Scholar. Trois réglages vont pourtant vous changer la vie. Regardons-les ensemble.',
        },
        { kind: 'scene', scene: 'scholar' },
        {
          kind: 'list',
          ordered: true,
          items: [
            '**Reliez-le à Lyon 1.** Dans les paramètres, ouvrez « Liens vers des bibliothèques », puis ajoutez Lyon 1. Des liens d’accès apparaîtront à côté des résultats.',
            '**Utilisez la recherche avancée.** Le menu vous propose des cases : tous les mots, expression exacte, au moins un des mots, aucun des mots, dans le titre.',
            '**Suivez « Cité par ».** Sous chaque résultat, ce lien montre les travaux qui ont cité ce document. C’est une très bonne façon de trouver des études récentes.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warning',
          title: 'Restez critique',
          text: 'Google Scholar ne trie pas pour vous : on y trouve le meilleur comme le moins bon. Son bouton « Citer » est pratique, mais il fait parfois des erreurs. Relisez toujours la [[reference|référence]].',
        },
        {
          kind: 'more',
          title: 'On m’a parlé de l’opérateur AROUND',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Vous verrez peut-être cet [[operateurs|opérateur]] dans d’anciens supports. Il ne figure pas dans l’aide de Google Scholar, et nos essais n’ont montré aucun effet clair. Préférez les guillemets, ou le champ « dans le titre » de la recherche avancée.',
            },
          ],
        },
        {
          kind: 'links',
          links: [{ label: 'Ouvrir Google Scholar', url: 'https://scholar.google.com/?hl=fr' }],
        },
      ],
      takeaways: [
        'Reliez Google Scholar à Lyon 1 dans ses paramètres.',
        'Le lien « Cité par » mène à des travaux plus récents.',
        'Vérifiez toujours ce que vous trouvez, et relisez le bouton « Citer ».',
      ],
    },
    {
      slug: 'pubmed',
      question: 'Comment utiliser PubMed ?',
      minutes: 7,
      summary:
        'PubMed est la grande [[base-de-donnees|base de données]] internationale en santé, gratuite et en anglais. Elle est très utile pour trouver des études sur l’efficacité de la pair-aidance. Quelques filtres suffisent pour bien démarrer.',
      blocks: [
        {
          kind: 'paragraph',
          text: 'L’interface en anglais peut impressionner, mais les gestes sont simples. Suivons Sam dans sa première recherche.',
        },
        { kind: 'scene', scene: 'pubmed' },
        {
          kind: 'table',
          caption: 'Les réglages les plus utiles',
          headers: ['Je veux…', 'Je fais…'],
          rows: [
            ['Chercher un mot dans le titre ou le résumé', 'J’écris "peer support"[tiab]'],
            ['Chercher avec un [[mot-cle|mot-clé]] officiel', 'J’écris "Peer Group"[mh]'],
            ['Lire des textes gratuits', 'Je coche le filtre Free full text'],
            ['Garder les travaux récents', 'Je choisis une période dans le filtre de dates'],
            [
              'Obtenir la [[reference|référence]]',
              'Je clique sur Cite, puis je choisis [[apa|APA]]',
            ],
          ],
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'PubMed n’a pas de mot-clé « peer support »',
          text: 'Aucun mot-clé officiel ne correspond exactement à la pair-aidance. Cherchez donc plutôt "peer support"[tiab], c’est-à-dire dans les titres et les résumés.',
        },
        {
          kind: 'callout',
          tone: 'warning',
          title: 'PubMed donne des références, pas toujours les textes',
          text: 'Pour lire un article, il faut souvent passer par le lien de l’[[editeur|éditeur]]. La section sur le tri vous explique comment obtenir le [[texte-integral|texte complet]].',
        },
        {
          kind: 'more',
          title: 'Que veulent dire [tiab] et [mh] ?',
          blocks: [
            {
              kind: 'paragraph',
              text: '[tiab] signifie « title/[[abstract|abstract]] » : le mot est cherché dans le titre et le résumé. [mh] signifie « MeSH heading » : on cherche un [[mesh|mot-clé officiel]]. [ti] limite la recherche au titre.',
            },
          ],
        },
        {
          kind: 'links',
          links: [
            { label: 'Ouvrir PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/' },
            {
              label: 'La recherche avancée de PubMed',
              url: 'https://pubmed.ncbi.nlm.nih.gov/advanced/',
            },
          ],
        },
      ],
      takeaways: [
        'PubMed est gratuite, en anglais, et centrée sur la santé.',
        'Pour la pair-aidance, cherchez "peer support"[tiab].',
        'Le bouton Cite propose le format APA, à relire.',
      ],
    },
    {
      slug: 'semantic-scholar',
      question: 'Comment utiliser Semantic Scholar ?',
      minutes: 4,
      summary:
        'Semantic Scholar est un [[moteur-de-recherche|moteur de recherche]] d’articles gratuit, qui s’appuie sur l’intelligence artificielle. Il est utile pour repérer vite les articles importants en anglais et, dans certains domaines, pour lire un résumé en une phrase.',
      blocks: [
        { kind: 'scene', scene: 'semantic-scholar' },
        {
          kind: 'paragraph',
          text: 'Son intérêt principal est de vous aider à comprendre rapidement de quoi parle un article, et lesquels sont les plus cités. Dans les domaines biomédical et informatique, il propose un résumé très court, le « TLDR ».',
        },
        {
          kind: 'table',
          caption: 'Quand le choisir, ou pas',
          headers: ['Ce qu’il fait bien', 'Ses limites'],
          rows: [
            ['Trier par nombre de citations', 'Il couvre surtout des travaux en anglais'],
            ['Signaler les citations les plus influentes', 'Pas de ET, OU, SAUF, ni d’astérisque'],
            [
              'Suivre un sujet avec un compte gratuit',
              'Le résumé court ne couvre pas tous les domaines',
            ],
          ],
        },
        {
          kind: 'links',
          links: [{ label: 'Ouvrir Semantic Scholar', url: 'https://www.semanticscholar.org/' }],
        },
      ],
      takeaways: [
        'Utile pour explorer rapidement la recherche en anglais.',
        'Pas d’[[operateurs|opérateurs]] ET, OU : seuls les guillemets fonctionnent.',
        'Son résumé automatique se vérifie toujours en lisant l’article.',
      ],
    },
    {
      slug: 'memoires-theses',
      question: 'Où trouver des mémoires, des thèses et des rapports ?',
      minutes: 4,
      summary:
        'Pour la pair-aidance, ces documents sont très précieux, car la recherche y est encore jeune. On les appelle la [[litterature-grise|littérature grise]]. Le [[sudoc|Sudoc]], theses.fr, DUMAS et HAL vous aideront à les trouver.',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Beaucoup de savoirs sur la pair-aidance se trouvent ailleurs que dans les revues : dans des guides d’association, des rapports d’expérimentation ou des mémoires. Voici où chercher.',
        },
        {
          kind: 'table',
          caption: 'Où chercher quoi ?',
          headers: ['Outil', 'Ce que vous y trouverez'],
          rows: [
            [
              '[Sudoc](https://www.sudoc.abes.fr/cbs/)',
              'Le catalogue des bibliothèques universitaires : livres, thèses, mémoires',
            ],
            ['[theses.fr](https://theses.fr/)', 'Les thèses soutenues en France depuis 1985'],
            [
              '[DUMAS](https://dumas.ccsd.cnrs.fr/)',
              'Des mémoires et des thèses d’exercice en [[open-access|accès libre]]',
            ],
            ['[HAL](https://hal.science/)', 'Une archive ouverte de travaux scientifiques'],
            [
              '[BASE](https://www.base-search.net/)',
              'Un [[moteur-de-recherche|moteur de recherche]] d’archives ouvertes du monde entier',
            ],
          ],
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Consultez aussi les supports du DU',
          text: 'La [[bibliographie|bibliographie]] du guide du DU rassemble déjà des dossiers, des guides et des vidéos sur la pair-aidance. C’est un excellent point de départ.',
        },
      ],
      takeaways: [
        'Mémoires, rapports et guides sont très utiles en pair-aidance.',
        'Le Sudoc localise les documents, DUMAS et HAL donnent accès aux textes.',
        'Vérifiez toujours qui a écrit le document, et quand.',
      ],
    },
  ],
  quiz: [
    {
      id: 'choisir',
      prompt:
        'Vous cherchez des études internationales sur l’efficacité de la pair-aidance. Où allez-vous ?',
      choices: [
        {
          text: 'PubMed',
          correct: true,
          feedback: 'Oui, c’est la grande base internationale en santé.',
        },
        {
          text: 'Le Sudoc',
          correct: false,
          feedback:
            'Le Sudoc est utile pour localiser un livre ou une thèse, moins pour des études.',
        },
      ],
    },
    {
      id: 'francais',
      prompt:
        'Vous cherchez un article de revue française en sciences humaines. Par quoi commencez-vous ?',
      choices: [
        { text: 'Cairn', correct: true, feedback: 'Oui, Cairn rassemble ces revues.' },
        {
          text: 'PubMed',
          correct: false,
          feedback: 'PubMed couvre surtout la recherche biomédicale internationale.',
        },
      ],
    },
    {
      id: 'scholar',
      prompt: 'À quoi sert le lien « Cité par » de Google Scholar ?',
      choices: [
        {
          text: 'À trouver des travaux plus récents qui ont cité ce document.',
          correct: true,
          feedback: 'Exactement, c’est une excellente façon d’avancer dans le temps.',
        },
        {
          text: 'À copier la référence en APA.',
          correct: false,
          feedback: 'Cela, c’est le bouton « Citer ». Pensez à relire le résultat.',
        },
      ],
    },
    {
      id: 'pubmed',
      prompt: 'Sur PubMed, comment chercher la pair-aidance dans les titres et les résumés ?',
      choices: [
        { text: '"peer support"[tiab]', correct: true, feedback: 'Oui, c’est la bonne écriture.' },
        {
          text: 'pair-aidance',
          correct: false,
          feedback: 'PubMed fonctionne en anglais : il vous faut le terme anglais.',
        },
      ],
    },
    {
      id: 'gris',
      prompt: 'Qu’appelle-t-on la littérature grise ?',
      choices: [
        {
          text: 'Les rapports, guides et mémoires publiés hors édition classique.',
          correct: true,
          feedback: 'Oui, et elle compte beaucoup en pair-aidance.',
        },
        {
          text: 'Les vieux livres qui ne sont plus édités.',
          correct: false,
          feedback:
            'Le mot « grise » veut dire qu’elle se trouve hors du circuit classique d’édition.',
        },
      ],
    },
  ],
};
