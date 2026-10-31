import type { Section } from '../types';

export const questionSection: Section = {
  id: 'question',
  slug: 'question',
  question: 'Comment trouver ma question de recherche ?',
  promise:
    'C’est souvent l’étape la plus difficile, et aussi la plus utile. Dans cette section, nous allons partir d’un thème qui vous tient à cœur pour arriver à une question claire, à laquelle votre mémoire pourra répondre.',
  lessons: [
    {
      slug: 'sujet-ou-question',
      question: 'Quelle différence entre un sujet et une question ?',
      minutes: 4,
      summary:
        'Un **sujet** est un thème large, comme « la pair-aidance ». Une **question de recherche** dit précisément ce que vous voulez comprendre sur ce thème. C’est elle qui guidera vos lectures, puis votre écriture.',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Beaucoup de personnes commencent avec un sujet et se lancent directement dans les lectures. Elles se sentent alors vite submergées, parce que tout semble intéressant. Votre mémoire fait 25 à 30 pages : vous ne pourrez pas tout dire sur la pair-aidance, et personne ne vous le demande. Il s’agit de choisir un angle.',
        },
        {
          kind: 'paragraph',
          text: 'Pour voir comment on passe de l’un à l’autre, suivons Sam. Sam est une personne imaginaire de la promotion, qui travaille en addictologie. Nous retrouverons cet exemple tout au long du parcours.',
        },
        { kind: 'scene', scene: 'entonnoir' },
        {
          kind: 'compare',
          before: { label: 'Le sujet de Sam', text: 'La pair-aidance en addictologie.' },
          after: {
            label: 'Sa question de recherche',
            text: 'Comment une personne pair-aidante trouve-t-elle sa place dans une équipe d’addictologie ?',
          },
          why: 'Vous voyez la différence ? Avec la question, Sam sait de qui on parle, où cela se passe et ce qu’il faut comprendre. Sam sait donc aussi ce qu’il faut lire, et ce qu’on peut laisser de côté.',
        },
        {
          kind: 'callout',
          tone: 'rule',
          title: 'Ce que le DU attend de vous',
          text: 'Votre mémoire doit avoir un lien clair avec la pair-aidance. Il doit aussi montrer comment vous reliez votre expérience à votre travail, sans pour autant devenir une biographie.',
        },
        {
          kind: 'more',
          title: 'On m’a parlé de « problématique » : est-ce la même chose ?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Presque. Les consignes du DU parlent de [[problematique|problématique]] : c’est la question qui oriente tout le mémoire, et votre réponse devient l’idée que vous allez défendre avec des arguments et des exemples.',
            },
            {
              kind: 'paragraph',
              text: 'Pour l’instant, pensez simplement « ma question ». Elle prendra sa forme définitive au fil de vos lectures.',
            },
          ],
        },
      ],
      takeaways: [
        'Le sujet, c’est le thème. La question, c’est ce que vous voulez comprendre sur ce thème.',
        'Une bonne question vous évite de tout lire : elle vous dit quoi garder et quoi laisser.',
        'Votre question va sans doute évoluer pendant vos lectures, et c’est très bien ainsi.',
      ],
    },
    {
      slug: 'preciser',
      question: 'Comment préciser mon sujet ?',
      minutes: 5,
      summary:
        'Le plus simple est de poser six petites questions à votre sujet : Quoi ? Qui ? Où ? Quand ? Comment ? Pourquoi ? En y répondant, vous verrez apparaître un angle plus précis.',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Si vous avez l’impression que votre sujet est encore flou, c’est normal à ce stade. Plutôt que de chercher la bonne formule du premier coup, commencez par y voir plus clair. Voici comment Sam s’y est pris.',
        },
        { kind: 'scene', scene: 'qqoqcp' },
        {
          kind: 'table',
          caption: 'Les réponses de Sam',
          headers: ['Question', 'Ce qu’elle vous demande', 'La réponse de Sam'],
          rows: [
            ['Quoi ?', 'Quel est votre thème ?', 'La place de la pair-aidance en addictologie'],
            [
              'Qui ?',
              'Quelles personnes sont concernées ?',
              'Une personne pair-aidante et l’équipe soignante',
            ],
            ['Où ?', 'Dans quel lieu ?', 'Un service d’addictologie, en France'],
            ['Quand ?', 'À quel moment ?', 'Les premiers mois après l’arrivée dans l’équipe'],
            ['Comment ?', 'Sous quel angle ?', 'À partir de ce que vivent les personnes'],
            [
              'Pourquoi ?',
              'Pourquoi est-ce important ?',
              'Pour aider les équipes à mieux accueillir les pair-aidants',
            ],
          ],
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Et si je n’ai pas toutes les réponses ?',
          text: 'Ce n’est pas grave du tout. Une réponse qui vous manque est souvent une bonne piste de lecture : notez-la, et passez à la suite.',
        },
        {
          kind: 'paragraph',
          text: 'À vous maintenant. L’atelier ci-dessous vous pose ces six questions, puis vous aide à en tirer une première question de recherche. Vous pourrez y revenir autant de fois que vous voulez.',
        },
        { kind: 'tool', tool: 'atelier-question' },
        {
          kind: 'more',
          title: 'D’où vient cette méthode ?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'On l’appelle souvent **QQOQCP**, d’après les premières lettres des six questions. Les documentalistes du Centre ressource de réhabilitation l’utilisent dans leur atelier de recherche documentaire avec les promotions du DU.',
            },
          ],
        },
      ],
      takeaways: [
        'Six questions simples suffisent à préciser un sujet : Quoi, Qui, Où, Quand, Comment, Pourquoi.',
        'Une réponse qui vous manque n’est pas un problème : c’est une piste de lecture.',
        'L’atelier du site vous aide à passer de vos réponses à une première question.',
      ],
    },
    {
      slug: 'bonne-question',
      question: 'À quoi ressemble une bonne question ?',
      minutes: 6,
      summary:
        'Une bonne question est ouverte, précise et neutre, et vous pouvez y répondre dans le temps dont vous disposez. Elle commence souvent par « Comment » ou « En quoi ».',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Vous avez une première version de votre question ? Très bien. Regardons maintenant si elle tient la route. Voici cinq points que vous pouvez vérifier vous-même.',
        },
        {
          kind: 'list',
          ordered: true,
          items: [
            '**Elle est ouverte** : on ne peut pas y répondre simplement par oui ou par non.',
            '**Elle est précise** : on comprend de qui et de quoi vous parlez.',
            '**Elle est neutre** : elle ne contient pas déjà votre réponse.',
            '**Elle est faisable** : vous trouverez assez de documents dans le temps que vous avez.',
            '**Elle parle de pair-aidance** : le lien avec votre expérience ou vos observations est clair.',
          ],
        },
        {
          kind: 'paragraph',
          text: 'Pour vous entraîner, regardons trois questions qui posent problème, et la façon de les retravailler.',
        },
        {
          kind: 'compare',
          before: { label: 'Trop large', text: 'Quel est le rôle des pair-aidants ?' },
          after: {
            label: 'Plus précise',
            text: 'Quel rôle une personne pair-aidante joue-t-elle à la sortie d’une hospitalisation en psychiatrie ?',
          },
          why: 'La première version pourrait occuper un livre entier. La seconde choisit un moment précis du parcours.',
        },
        {
          kind: 'compare',
          before: {
            label: 'Fermée',
            text: 'La pair-aidance est-elle utile en addictologie ?',
          },
          after: {
            label: 'Ouverte',
            text: 'En quoi une personne pair-aidante change-t-elle le parcours de soins en addictologie ?',
          },
          why: 'À la première, on pourrait répondre « oui » et s’arrêter là. La seconde invite à explorer et à argumenter.',
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
          why: 'La première affirme que les soignants rejettent les pair-aidants. C’est peut-être ce que vous avez vécu, mais c’est justement ce qu’il faut aller vérifier.',
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Un bon réflexe : demander un avis',
          text: 'Faites lire votre question à une personne de votre promotion, ou à un proche. Si elle la comprend sans que vous ayez besoin de l’expliquer, c’est très bon signe.',
        },
        { kind: 'tool', tool: 'atelier-question' },
      ],
      takeaways: [
        'Évitez les questions auxquelles on peut répondre par oui ou par non.',
        'Dites de qui et de quoi vous parlez, le plus concrètement possible.',
        'Gardez votre avis pour la fin du mémoire : la question doit rester neutre.',
      ],
    },
    {
      slug: 'carte-mentale',
      question: 'Comment explorer mon sujet avec une carte mentale ?',
      minutes: 5,
      summary:
        'Une [[carte-mentale|carte mentale]] est un dessin de vos idées : votre sujet au centre, et tout ce qui s’y rattache sur des branches. C’est aussi une excellente façon de trouver vos futurs [[mot-cle|mots-clés]].',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Certaines personnes réfléchissent mieux avec un dessin qu’avec une liste. Si c’est votre cas, ou si la page blanche vous bloque, essayez la carte mentale. Les promotions du DU la pratiquent en atelier, et elle débloque souvent les choses.',
        },
        { kind: 'scene', scene: 'carte-mentale' },
        {
          kind: 'paragraph',
          text: 'Voici comment vous y prendre, en dix minutes environ.',
        },
        {
          kind: 'list',
          ordered: true,
          items: [
            'Écrivez votre sujet au milieu d’une feuille.',
            'Tracez quatre branches : ce qui vous intéresse, les personnes concernées, les outils, le contexte de travail.',
            'Ajoutez des mots sur chaque branche, comme ils viennent, sans les trier.',
            'Relisez, puis entourez ce qui vous attire le plus.',
          ],
        },
        {
          kind: 'callout',
          tone: 'example',
          title: 'Ce que la carte a apporté à Sam',
          text: 'En dessinant sa carte, Sam a noté « accueil », « secret partagé » et « place dans les réunions ». Sam n’y avait pas pensé au départ. Ces trois mots sont devenus de vraies pistes de lecture.',
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Faut-il un logiciel ?',
          text: 'Non, une feuille et un crayon suffisent largement. Prenez simplement votre carte en photo pour la garder avec vos notes.',
        },
      ],
      takeaways: [
        'Écrivez d’abord sans trier : le tri viendra ensuite.',
        'Les mots de vos branches vous serviront directement pour vos recherches.',
      ],
    },
  ],
  quiz: [
    {
      id: 'sujet',
      prompt: 'Parmi ces trois propositions, laquelle est une question de recherche ?',
      choices: [
        {
          text: 'La stigmatisation en santé mentale.',
          correct: false,
          feedback:
            'Ici, nous avons un sujet. Il est intéressant, mais on ne sait pas encore ce que vous voulez comprendre.',
        },
        {
          text: 'Comment des personnes pair-aidantes vivent-elles leur première année en équipe mobile ?',
          correct: true,
          feedback: 'On sait de qui on parle, où cela se passe et ce qu’on cherche à comprendre.',
        },
        {
          text: 'Les pair-aidants sont-ils utiles ?',
          correct: false,
          feedback:
            'Celle-ci est trop large, et on pourrait y répondre par oui ou par non. Comment la préciseriez-vous ?',
        },
      ],
    },
    {
      id: 'fermee',
      prompt:
        'Pourquoi vaut-il mieux éviter une question à laquelle on répond par oui ou par non ?',
      choices: [
        {
          text: 'Parce qu’elle laisse peu de place pour développer votre réflexion.',
          correct: true,
          feedback:
            'C’est bien cela. Une question ouverte vous laisse de la place pour explorer et argumenter.',
        },
        {
          text: 'Parce que ce type de question est interdit dans le DU.',
          correct: false,
          feedback:
            'Rien ne l’interdit, c’est un conseil de méthode. Une question ouverte vous aidera simplement à aller plus loin.',
        },
      ],
    },
    {
      id: 'neutre',
      prompt: 'Laquelle de ces deux questions contient déjà sa réponse ?',
      choices: [
        {
          text: 'Comment les familles perçoivent-elles la pair-aidance ?',
          correct: false,
          feedback: 'Celle-ci est neutre : elle ne dit pas à l’avance ce que pensent les familles.',
        },
        {
          text: 'Pourquoi les hôpitaux refusent-ils de recruter des pair-aidants ?',
          correct: true,
          feedback:
            'Elle part du principe que les hôpitaux refusent. C’est peut-être vrai, mais c’est justement ce qu’il faudrait vérifier.',
        },
      ],
    },
    {
      id: 'qqoqcp',
      prompt: 'Vous ne savez pas quoi répondre à la question « Où ? ». Que faites-vous ?',
      choices: [
        {
          text: 'Vous changez de sujet.',
          correct: false,
          feedback: 'Surtout pas ! Une réponse qui manque est tout à fait normale au début.',
        },
        {
          text: 'Vous le notez : c’est une piste de lecture.',
          correct: true,
          feedback: 'Exactement. Vos lectures vous aideront à y répondre.',
        },
      ],
    },
    {
      id: 'carte',
      prompt: 'À quoi peut vous servir une carte mentale ?',
      multiple: true,
      choices: [
        {
          text: 'À voir d’un coup d’œil tout ce qui touche à votre sujet.',
          correct: true,
          feedback: 'Oui, tout tient sur une seule page.',
        },
        {
          text: 'À trouver des mots-clés pour vos recherches.',
          correct: true,
          feedback: 'Oui, les mots de vos branches deviendront vos mots de recherche.',
        },
        {
          text: 'À rédiger directement votre mémoire.',
          correct: false,
          feedback: 'Elle prépare votre réflexion, mais la rédaction viendra plus tard.',
        },
      ],
    },
  ],
};
