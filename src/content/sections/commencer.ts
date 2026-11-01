import type { Section } from '../types';

export const commencerSection: Section = {
  id: 'commencer',
  slug: 'commencer',
  question: 'Par où commencer ?',
  shortTitle: 'Commencer',
  promise:
    'Si vous n’avez jamais fait de recherche documentaire, vous êtes au bon endroit. Prenons le temps de voir à quoi cela sert, quels mots on utilise, et comment se déroule une recherche du début à la fin.',
  lessons: [
    {
      slug: 'pourquoi-chercher',
      question: 'Pourquoi chercher ce que d’autres ont écrit ?',
      minutes: 4,
      summary:
        'Votre mémoire repose sur deux piliers : votre expérience, et ce que d’autres ont déjà écrit sur le sujet. Les lectures vous aident à prendre du recul sur ce que vous avez vécu et à appuyer ce que vous avancez.',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Vous vous demandez peut-être à quoi servent tous ces articles, alors que vous connaissez le sujet de l’intérieur. C’est une question tout à fait légitime. Votre [[savoir-experientiel|savoir expérientiel]] est précieux, et le DU vous demande justement de le mobiliser.',
        },
        {
          kind: 'paragraph',
          text: 'Seulement, un mémoire s’adresse à des personnes qui n’ont pas vécu ce que vous avez vécu. Pour les convaincre, vous allez montrer que votre réflexion rejoint, complète ou discute ce que d’autres ont observé. C’est tout l’intérêt de la recherche documentaire.',
        },
        {
          kind: 'callout',
          tone: 'example',
          title: 'Prenons l’exemple de Sam',
          text: 'Sam a remarqué que son arrivée dans l’équipe a été difficile. En lisant, Sam découvre que d’autres personnes pair-aidantes décrivent la même chose. Son impression devient alors un argument : « Mon expérience rejoint ce que décrivent d’autres travaux ».',
        },
        {
          kind: 'callout',
          tone: 'rule',
          title: 'Ce que le DU demande',
          text: [
            'Votre mémoire comporte **entre 5 et 25 [[reference|références]]**, avec une tolérance jusqu’à 30. Elles sont présentées selon la norme [[apa|APA]].',
            'Le jury regarde aussi leur variété : articles scientifiques, ouvrages de référence, témoignages.',
          ],
        },
        {
          kind: 'more',
          title: 'Dois-je tout lire sur mon sujet ?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Non, et c’est même impossible. On vous demande de lire quelques textes bien choisis, puis de montrer ce qu’ils vous apprennent. Il vaut mieux dix documents bien compris que trente survolés.',
            },
          ],
        },
      ],
      takeaways: [
        'Votre expérience reste au cœur du mémoire : les lectures viennent la nourrir et l’appuyer.',
        'Le DU attend entre 5 et 25 références, jusqu’à 30 au maximum, de types variés.',
        'Mieux vaut peu de documents bien lus que beaucoup de documents survolés.',
      ],
    },
    {
      slug: 'vocabulaire',
      question: 'Que veulent dire source, référence et bibliographie ?',
      minutes: 4,
      summary:
        'Une **source** est le document que vous avez lu. Sa **référence** est sa carte d’identité. La **bibliographie** est la liste de toutes ces [[reference|références]], à la fin de votre mémoire.',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Ces trois mots reviennent sans arrêt, et ils se ressemblent. Une fois que vous les aurez bien en tête, tout le reste sera plus simple. Le plus parlant est de voir à quoi sert une référence.',
        },
        { kind: 'scene', scene: 'reference-piste' },
        {
          kind: 'paragraph',
          text: 'Voici une vraie référence. Elle renvoie à un article sur la pair-aidance publié en 2020. Avec ces informations, n’importe qui peut retrouver le texte que vous avez lu.',
        },
        {
          kind: 'reference',
          label: 'Une référence',
          reference:
            'Castro, D. (2020). Une brève synthèse de la littérature sur la notion de pair-aidance. *Le Journal des psychologues*, (374), 18-23. https://doi.org/10.3917/jdp.374.0018',
        },
        {
          kind: 'paragraph',
          text: 'Dans votre texte, vous n’allez pas recopier tout cela à chaque fois. Vous écrirez simplement (Castro, 2020) : c’est la [[citation|citation dans le texte]]. Votre lecteur retrouvera ensuite la référence complète dans la [[bibliographie]].',
        },
        {
          kind: 'more',
          title: 'Et le mot « sources » dans les consignes ?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Dans les consignes du DU, « les [[source|sources]] » désigne tous les documents que vous utilisez. Un article, un livre, un rapport, une loi ou une vidéo peuvent être des sources. Une réponse d’IA n’en est pas une : nous verrons pourquoi dans la section sur l’IA.',
            },
          ],
        },
      ],
      takeaways: [
        'La source est le document, la référence est sa carte d’identité.',
        'Dans le texte, on écrit (Nom, année). La référence complète va dans la bibliographie.',
        'Une référence sert à une chose : permettre à votre lecteur de retrouver le document.',
      ],
    },
    {
      slug: 'etapes',
      question: 'Quelles sont les grandes étapes d’une recherche ?',
      minutes: 3,
      summary:
        'Une recherche documentaire se fait en six étapes : préciser sa question, choisir ses mots, choisir ses outils, trouver les documents, les évaluer, puis les citer. On fait souvent des allers-retours entre ces étapes.',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Pour ne pas vous perdre, regardons d’abord le chemin dans son ensemble. Cette animation présente les six étapes. Chacune correspond à une section de ce site, vous pourrez donc y revenir à votre rythme.',
        },
        { kind: 'scene', scene: 'six-etapes' },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Vous reviendrez en arrière, et c’est normal',
          text: 'Une lecture peut vous faire changer de mots, ou même reformuler votre question. Cela ne veut pas dire que vous faites fausse route : votre réflexion avance, tout simplement.',
        },
      ],
      takeaways: [
        'Six étapes : question, mots, outils, documents, évaluation, citation.',
        'Les allers-retours entre les étapes font partie du travail.',
      ],
    },
    {
      slug: 'organiser',
      question: 'Comment m’organiser pour ne pas me perdre ?',
      minutes: 4,
      summary:
        'Le meilleur réflexe est de tenir un journal de bord dès votre première recherche. Vous y notez ce que vous avez cherché, où, et ce que vous avez trouvé. Vous vous épargnerez bien des heures de travail.',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Au début, on pense qu’on se souviendra de tout. Puis, trois semaines plus tard, impossible de retrouver cet article si intéressant. Cela arrive à tout le monde ! Un simple tableau suffit à l’éviter.',
        },
        {
          kind: 'table',
          caption: 'Un exemple de journal de bord, celui de Sam',
          headers: ['Date', 'Où j’ai cherché', 'Mots utilisés', 'Ce que j’ai trouvé'],
          rows: [
            [
              '12 nov.',
              'Cairn',
              'pair-aidance ET addictologie',
              '4 résultats, 1 article intéressant',
            ],
            ['12 nov.', 'SantéPsy', 'pair-aidance', 'Beaucoup de résultats, à préciser'],
            [
              '14 nov.',
              'PubMed',
              '"peer support" AND "substance use"',
              'Très nombreux, en anglais',
            ],
          ],
        },
        {
          kind: 'paragraph',
          text: 'Vous pouvez le tenir dans un cahier, dans un tableur ou dans un document Word. L’important est de noter vos recherches au fur et à mesure, et de garder la [[reference|référence]] de ce que vous lisez dès que vous le lisez.',
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'N’attendez pas de bloquer pour demander de l’aide',
          text: 'Les documentalistes sont là pour cela, et leur demander conseil fait partie du travail. Vous trouverez leurs coordonnées sur la page [Qui peut m’aider ?](/aide).',
        },
        {
          kind: 'more',
          title: 'Combien de temps prévoir ?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Cela dépend de votre sujet et de votre rythme. Pensez surtout à commencer tôt, par petites séances. Une heure régulière vaut mieux qu’une journée entière juste avant de rendre votre mémoire.',
            },
          ],
        },
      ],
      takeaways: [
        'Tenez un journal de bord dès votre première recherche.',
        'Notez la référence d’un document dès que vous le lisez.',
        'Demander de l’aide aux documentalistes fait partie du travail.',
      ],
    },
  ],
  quiz: [
    {
      id: 'pourquoi',
      prompt: 'Pourquoi le DU vous demande-t-il de lire ce que d’autres ont écrit ?',
      choices: [
        {
          text: 'Pour remplacer votre expérience par des connaissances universitaires.',
          correct: false,
          feedback:
            'Votre expérience garde toute sa place. Les lectures viennent l’éclairer et l’appuyer.',
        },
        {
          text: 'Pour prendre du recul et appuyer ce que vous avancez.',
          correct: true,
          feedback: 'C’est bien cela. Vos lectures et votre expérience se répondent.',
        },
      ],
    },
    {
      id: 'combien',
      prompt: 'Combien de références le DU attend-il dans votre mémoire ?',
      choices: [
        {
          text: 'Entre 5 et 25, avec une tolérance jusqu’à 30.',
          correct: true,
          feedback: 'Oui. Gardez en tête qu’il vaut mieux peu de documents bien lus.',
        },
        {
          text: 'Au moins 50.',
          correct: false,
          feedback: 'Ce serait beaucoup trop ! Le DU attend entre 5 et 25 références.',
        },
      ],
    },
    {
      id: 'vocabulaire',
      prompt: 'Dans votre texte, que signifie (Castro, 2020) ?',
      choices: [
        {
          text: 'C’est une citation qui renvoie à la référence complète, dans la bibliographie.',
          correct: true,
          feedback: 'Exactement. Votre lecteur sait où retrouver le document.',
        },
        {
          text: 'C’est une note de bas de page.',
          correct: false,
          feedback: 'La norme APA n’utilise pas de notes de bas de page pour citer ses sources.',
        },
      ],
    },
    {
      id: 'journal',
      prompt: 'À quoi sert un journal de bord ?',
      multiple: true,
      choices: [
        {
          text: 'À retrouver ce que vous avez déjà cherché.',
          correct: true,
          feedback: 'Oui, et à ne pas refaire deux fois la même recherche.',
        },
        {
          text: 'À noter les mots que vous avez utilisés.',
          correct: true,
          feedback: 'Oui, vous pourrez les réutiliser ou les ajuster.',
        },
        {
          text: 'À remplacer votre bibliographie.',
          correct: false,
          feedback: 'Il reste un outil personnel : la bibliographie, elle, figure dans le mémoire.',
        },
      ],
    },
  ],
};
