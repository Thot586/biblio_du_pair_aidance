import type { Section } from '../types';

export const questionSection: Section = {
  id: 'question',
  slug: 'question',
  question: 'Comment trouver ma question de recherche ?',
  promise:
    'À la fin de cette section, vous aurez transformé un thème qui vous tient à cœur en une question claire, à laquelle votre mémoire peut répondre.',
  lessons: [
    {
      slug: 'sujet-ou-question',
      question: 'Quelle différence entre un sujet et une question ?',
      minutes: 4,
      summary:
        'Un **sujet** est un thème large. Une **question de recherche** dit précisément ce que vous voulez comprendre. C’est elle qui guide vos lectures et votre mémoire.',
      blocks: [
        {
          kind: 'paragraph',
          text: '« La pair-aidance » est un sujet. Des livres entiers en parlent. Votre mémoire fait 25 à 30 pages : vous devez donc choisir un angle.',
        },
        { kind: 'scene', scene: 'entonnoir' },
        {
          kind: 'compare',
          before: { label: 'Un sujet', text: 'La pair-aidance en addictologie.' },
          after: {
            label: 'Une question de recherche',
            text: 'Comment une personne pair-aidante trouve-t-elle sa place dans une équipe d’addictologie ?',
          },
          why: 'La question dit de qui on parle, où, et ce qu’on veut comprendre. Elle indique aussi quoi lire, et quoi laisser de côté.',
        },
        {
          kind: 'callout',
          tone: 'rule',
          title: 'Ce que le DU attend',
          text: 'Votre mémoire doit faire un lien clair avec la pair-aidance. Il montre aussi comment vous reliez votre expérience à votre travail, sans devenir une biographie.',
        },
        {
          kind: 'more',
          title: 'Question de recherche ou problématique : est-ce pareil ?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Les consignes du DU parlent de [[problematique|problématique]]. C’est la question qui oriente tout le mémoire. Votre réponse devient l’idée que vous défendez, avec des arguments et des exemples.',
            },
            {
              kind: 'paragraph',
              text: 'Pour commencer, pensez simplement « ma question ». Elle prendra sa forme finale au fil de vos lectures.',
            },
          ],
        },
      ],
      takeaways: [
        'Un sujet est large. Une question est précise.',
        'Une bonne question vous dit quoi lire, et quoi laisser de côté.',
        'Votre question peut changer pendant vos lectures : c’est normal.',
      ],
    },
    {
      slug: 'preciser',
      question: 'Comment préciser mon sujet ?',
      minutes: 5,
      summary:
        'Posez six petites questions à votre sujet : Quoi ? Qui ? Où ? Quand ? Comment ? Pourquoi ? Vos réponses font apparaître un angle précis.',
      blocks: [
        { kind: 'scene', scene: 'qqoqcp' },
        {
          kind: 'table',
          caption: 'Les réponses de Sam, étudiant fictif de la promotion',
          headers: ['Question', 'Ce qu’elle demande', 'Réponse de Sam'],
          rows: [
            ['Quoi ?', 'Le thème', 'La place de la pair-aidance en addictologie'],
            [
              'Qui ?',
              'Les personnes concernées',
              'Une personne pair-aidante et l’équipe soignante',
            ],
            ['Où ?', 'Le lieu', 'Un service d’addictologie, en France'],
            ['Quand ?', 'La période', 'Les premiers mois après l’arrivée dans l’équipe'],
            ['Comment ?', 'Le point de vue', 'À partir de ce que vivent les personnes'],
            ['Pourquoi ?', 'L’intérêt', 'Aider les équipes à mieux accueillir les pair-aidants'],
          ],
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Une réponse vous manque ?',
          text: 'Ce n’est pas grave. C’est souvent une bonne piste de lecture. Notez-la et continuez.',
        },
        { kind: 'tool', tool: 'atelier-question' },
        {
          kind: 'more',
          title: 'D’où vient cette méthode ?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'On l’appelle **QQOQCP**, avec les premières lettres des six questions. Les documentalistes du Centre ressource de réhabilitation l’utilisent dans leur atelier de recherche documentaire.',
            },
          ],
        },
      ],
      takeaways: [
        'Six questions suffisent pour préciser un sujet.',
        'Une réponse manquante est une piste de lecture.',
        'L’atelier du site transforme vos réponses en question.',
      ],
    },
    {
      slug: 'bonne-question',
      question: 'À quoi ressemble une bonne question ?',
      minutes: 6,
      summary:
        'Une bonne question est ouverte, précise et neutre. Elle commence souvent par « Comment » ou « En quoi ». Et vous pouvez y répondre dans le temps que vous avez.',
      blocks: [
        { kind: 'heading', text: 'Cinq vérifications' },
        {
          kind: 'list',
          ordered: true,
          items: [
            '**Elle est ouverte.** On ne peut pas y répondre par oui ou non.',
            '**Elle est précise.** On sait de qui et de quoi on parle.',
            '**Elle est neutre.** Elle ne contient pas déjà la réponse.',
            '**Elle est faisable.** Vous trouverez assez de sources dans le temps que vous avez.',
            '**Elle parle de pair-aidance**, et de ce que vous avez vécu ou observé.',
          ],
        },
        { kind: 'heading', text: 'Trois questions à retravailler' },
        {
          kind: 'compare',
          before: { label: 'Trop large', text: 'Quel est le rôle des pair-aidants ?' },
          after: {
            label: 'Plus précise',
            text: 'Quel rôle une personne pair-aidante joue-t-elle à la sortie d’une hospitalisation en psychiatrie ?',
          },
        },
        {
          kind: 'compare',
          before: {
            label: 'Fermée : oui ou non',
            text: 'La pair-aidance est-elle utile en addictologie ?',
          },
          after: {
            label: 'Ouverte',
            text: 'En quoi une personne pair-aidante change-t-elle le parcours de soins en addictologie ?',
          },
        },
        {
          kind: 'compare',
          before: {
            label: 'La réponse est déjà dedans',
            text: 'Pourquoi les soignants rejettent-ils les pair-aidants ?',
          },
          after: {
            label: 'Neutre',
            text: 'Comment les soignants perçoivent-ils l’arrivée d’une personne pair-aidante dans leur équipe ?',
          },
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Demandez un avis',
          text: 'Faites lire votre question à une personne de votre promotion. Si elle la comprend sans explication, c’est bon signe.',
        },
        { kind: 'tool', tool: 'atelier-question' },
      ],
      takeaways: [
        'Évitez les questions qui se répondent par oui ou non.',
        'Dites de qui et de quoi vous parlez.',
        'Ne mettez pas votre réponse dans la question.',
      ],
    },
    {
      slug: 'carte-mentale',
      question: 'Comment explorer mon sujet avec une carte mentale ?',
      minutes: 5,
      summary:
        'Une [[carte-mentale|carte mentale]] est un dessin de vos idées. Votre sujet est au centre, et les branches montrent ce qui s’y rattache. Elle vous donne aussi vos futurs mots-clés.',
      blocks: [
        { kind: 'scene', scene: 'carte-mentale' },
        { kind: 'heading', text: 'Comment faire' },
        {
          kind: 'list',
          ordered: true,
          items: [
            'Écrivez votre sujet au centre d’une feuille.',
            'Tracez quatre branches : le sujet qui vous intéresse, les personnes, les outils, le contexte de travail.',
            'Ajoutez des mots sur chaque branche, sans les trier.',
            'Entourez ce qui vous attire le plus.',
          ],
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Une feuille et un crayon suffisent',
          text: 'Vous n’avez pas besoin de logiciel. Une photo de votre carte peut rejoindre vos notes.',
        },
        {
          kind: 'callout',
          tone: 'example',
          title: 'Ce que la carte de Sam a fait apparaître',
          text: 'En dessinant sa carte, Sam a noté « accueil », « secret partagé » et « place dans les réunions ». Ces trois mots sont devenus des pistes de lecture.',
        },
      ],
      takeaways: [
        'Écrivez sans trier, le tri viendra ensuite.',
        'Les mots de vos branches serviront pour vos recherches.',
      ],
    },
  ],
  quiz: [
    {
      id: 'sujet',
      prompt: 'Laquelle de ces phrases est une question de recherche ?',
      choices: [
        {
          text: 'La stigmatisation en santé mentale.',
          correct: false,
          feedback: 'C’est un sujet : on ne sait pas encore ce que vous voulez comprendre.',
        },
        {
          text: 'Comment des personnes pair-aidantes vivent-elles leur première année en équipe mobile ?',
          correct: true,
          feedback: 'On sait de qui on parle, où, et ce qu’on veut comprendre.',
        },
        {
          text: 'Les pair-aidants sont-ils utiles ?',
          correct: false,
          feedback: 'On peut y répondre par oui ou non, et elle reste très large.',
        },
      ],
    },
    {
      id: 'fermee',
      prompt: 'Pourquoi éviter une question à laquelle on répond par oui ou non ?',
      choices: [
        {
          text: 'Parce qu’elle laisse peu de place pour développer votre réflexion.',
          correct: true,
          feedback: 'Une question ouverte permet d’explorer et d’argumenter.',
        },
        {
          text: 'Parce que le jury n’aime pas les points d’interrogation.',
          correct: false,
          feedback:
            'Le point d’interrogation n’est pas le problème. Une question ouverte permet simplement d’aller plus loin.',
        },
      ],
    },
    {
      id: 'neutre',
      prompt: 'Quelle question contient déjà sa réponse ?',
      choices: [
        {
          text: 'Comment les familles perçoivent-elles la pair-aidance ?',
          correct: false,
          feedback: 'Cette question est neutre : elle ne dit pas ce que les familles pensent.',
        },
        {
          text: 'Pourquoi les hôpitaux refusent-ils de recruter des pair-aidants ?',
          correct: true,
          feedback:
            'Elle affirme que les hôpitaux refusent. C’est à vérifier, pas à poser au départ.',
        },
      ],
    },
    {
      id: 'qqoqcp',
      prompt: 'Vous ne savez pas répondre à la question « Où ? ». Que faites-vous ?',
      choices: [
        {
          text: 'Vous changez de sujet.',
          correct: false,
          feedback: 'Pas besoin. Une réponse manquante est normale au début.',
        },
        {
          text: 'Vous le notez : c’est une piste de lecture.',
          correct: true,
          feedback: 'Vos lectures vous aideront à répondre.',
        },
      ],
    },
    {
      id: 'carte',
      prompt: 'À quoi sert une carte mentale ?',
      multiple: true,
      choices: [
        {
          text: 'À voir tout ce qui touche à votre sujet.',
          correct: true,
          feedback: 'Elle donne une vue d’ensemble sur une seule page.',
        },
        {
          text: 'À trouver des mots-clés pour vos recherches.',
          correct: true,
          feedback: 'Les mots des branches deviennent vos mots de recherche.',
        },
        {
          text: 'À rédiger directement votre mémoire.',
          correct: false,
          feedback: 'Elle prépare votre réflexion, mais elle ne remplace pas la rédaction.',
        },
      ],
    },
  ],
};
