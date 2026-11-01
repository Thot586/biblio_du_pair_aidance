import { LAST_CHECKED } from '../site';
import type { Section } from '../types';

export const iaSection: Section = {
  id: 'ia',
  slug: 'ia',
  question: 'L’IA peut-elle m’aider ?',
  shortTitle: 'L’IA',
  promise:
    'Oui, et elle peut même beaucoup vous aider, à condition de savoir ce qu’elle fait et de garder la main. Voyons ensemble ce qui est permis dans le DU, à quoi servent les outils, où sont les pièges, et comment protéger les personnes dont vous parlez.',
  lessons: [
    {
      slug: 'comment-ca-marche',
      question: 'Qu’est-ce qu’une IA générative ?',
      minutes: 4,
      summary:
        'Une [[ia-generative|IA générative]] comme ChatGPT écrit en prédisant le mot le plus probable après ceux qui précèdent. Elle imite très bien le langage, mais elle ne sait pas si ce qu’elle dit est vrai.',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Pour bien utiliser ces outils, il faut comprendre une chose essentielle. Quand vous posez une question à une IA, elle ne va pas chercher la réponse dans une encyclopédie. Elle calcule, mot après mot, la suite de texte la plus probable, à partir d’une énorme quantité de textes qu’elle a déjà vus.',
        },
        { kind: 'scene', scene: 'mot-suivant' },
        {
          kind: 'paragraph',
          text: 'C’est pour cela que ses réponses paraissent si naturelles, et que ses erreurs sont si difficiles à repérer. Elle affirme avec la même assurance ce qui est juste et ce qui est faux.',
        },
        {
          kind: 'more',
          title: 'Et les IA qui citent leurs sources ?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Certains outils, comme Perplexity ou Consensus, cherchent d’abord dans des documents, puis rédigent une réponse à partir de ce qu’ils ont trouvé. Vous pouvez donc remonter aux [[source|sources]], ce qui est un vrai progrès. Il reste nécessaire de vérifier, car l’outil peut mal résumer un document.',
            },
          ],
        },
        {
          kind: 'links',
          title: 'Pour mieux comprendre',
          links: [
            {
              label: 'Comment fonctionnent les modèles de langage',
              url: 'https://developmentalsystems.org/chatgpt_5_minutes/fr/',
              description: 'une série de vidéos du centre Inria de l’université de Bordeaux',
            },
            {
              label: 'Comprendre l’IA pour la démystifier',
              url: 'https://framamia.org/fr/',
              description: 'le site de l’association Framasoft',
            },
          ],
        },
      ],
      takeaways: [
        'Une IA générative prédit la suite la plus probable d’un texte.',
        'Elle imite le langage, sans vérifier ce qu’elle affirme.',
        'Plus elle parle avec assurance, plus il faut garder l’esprit critique.',
      ],
    },
    {
      slug: 'ce-qui-est-permis',
      question: 'Qu’ai-je le droit de faire dans le DU ?',
      minutes: 5,
      summary:
        'Vous pouvez utiliser l’IA à toutes les étapes, y compris pour vous aider à rédiger. Trois conditions : tout vérifier et tout ajuster, ne jamais y mettre de données sensibles, et déclarer votre usage en annexe.',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Imaginez l’IA comme une personne stagiaire très rapide, qui a beaucoup lu mais qui invente parfois. Elle peut vous faire gagner du temps. Mais c’est vous qui signez le mémoire, et c’est vous qui en répondrez devant le jury.',
        },
        { kind: 'scene', scene: 'cycle-ia' },
        {
          kind: 'callout',
          tone: 'rule',
          title: 'Les trois conditions du DU',
          text: [
            '**1. Vous vérifiez et vous ajustez tout.** Chaque information, chaque [[reference|référence]], chaque phrase. Votre texte doit rester le vôtre, avec votre réflexion et votre voix.',
            '**2. Vous protégez les données sensibles.** Aucune information qui permette de reconnaître une personne. Il faut [[anonymisation|anonymiser]].',
            '**3. Vous jouez la transparence.** Vous déclarez votre usage de l’IA dans une [[annexe]] de votre mémoire.',
          ],
        },
        {
          kind: 'table',
          caption: 'L’IA à chaque étape de votre travail',
          headers: ['Étape', 'Ce que l’IA peut faire', 'Ce qui reste à vous'],
          rows: [
            [
              'Trouver des idées',
              'Proposer des pistes, poser des questions',
              'Choisir ce qui vous parle',
            ],
            [
              'Chercher',
              'Repérer des articles et des [[mot-cle|mots-clés]]',
              'Vérifier que les documents existent',
            ],
            ['Lire', 'Résumer un document autorisé', 'Lire vous-même les textes importants'],
            ['Faire le plan', 'Proposer une organisation', 'Décider de votre fil conducteur'],
            ['Rédiger', 'Aider à reformuler un passage', 'Écrire votre pensée, ajuster le texte'],
            ['Corriger', 'Repérer les fautes, clarifier', 'Accepter ou refuser chaque correction'],
          ],
        },
        {
          kind: 'callout',
          tone: 'warning',
          title: 'Un texte entièrement écrit par une IA ne convient pas',
          text: 'Le jury attend votre réflexion et votre lien avec l’expérience vécue. À l’oral, il vous interrogera sur votre travail : vous devez pouvoir expliquer et défendre chaque idée de votre mémoire.',
        },
        {
          kind: 'more',
          title: 'Dyslexie, dysorthographie : l’IA peut-elle m’aider à corriger ?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Oui, les consignes du DU le prévoient explicitement. Vous pouvez utiliser ces outils pour vous corriger, et vous pouvez aussi vous faire relire par une personne de confiance.',
            },
          ],
        },
        {
          kind: 'more',
          title: 'Le jury peut-il détecter un texte écrit par une IA ?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Les logiciels de détection sont peu fiables. Une étude a testé 14 outils : aucun ne dépassait 80 % d’exactitude (Weber-Wulff et al., 2023). Une autre a montré qu’ils se trompent davantage sur les textes de personnes qui n’écrivent pas dans leur langue maternelle (Liang et al., 2023).',
            },
            {
              kind: 'paragraph',
              text: 'Ce n’est donc pas la meilleure question à se poser. Ce qui compte, c’est de pouvoir défendre votre travail à l’oral, et d’être honnête sur la façon dont vous l’avez fait.',
            },
            {
              kind: 'reference',
              reference:
                'Liang, W., Yuksekgonul, M., Mao, Y., Wu, E., & Zou, J. (2023). GPT detectors are biased against non-native English writers. *Patterns*, *4*(7), 100779. https://doi.org/10.1016/j.patter.2023.100779',
            },
            {
              kind: 'reference',
              reference:
                'Weber-Wulff, D., Anohina-Naumeca, A., Bjelobaba, S., Foltýnek, T., Guerrero-Dib, J., Popoola, O., Šigut, P., & Waddington, L. (2023). Testing of detection tools for AI-generated text. *International Journal for Educational Integrity*, *19*, 26. https://doi.org/10.1007/s40979-023-00146-z',
            },
          ],
        },
      ],
      takeaways: [
        'L’IA est permise à toutes les étapes, si vous gardez la main.',
        'Trois conditions : vérifier et ajuster, protéger les données, déclarer.',
        'Vous devez pouvoir défendre chaque idée de votre mémoire à l’oral.',
      ],
    },
    {
      slug: 'quels-outils',
      question: 'Quels outils pour quoi faire ?',
      minutes: 7,
      summary:
        'Il existe des outils pour discuter, pour chercher des articles, pour interroger vos documents et pour corriger. Inutile de tous les essayer : choisissez-en un par besoin.',
      blocks: [
        {
          kind: 'paragraph',
          text: `Ces outils changent très vite, et leurs prix aussi. Les informations ci-dessous ont été vérifiées le ${LAST_CHECKED}. Avant de vous inscrire, regardez la page de l’outil.`,
        },
        {
          kind: 'table',
          caption: 'Les grandes familles d’outils',
          headers: ['Votre besoin', 'Outils', 'Vos textes servent-ils à entraîner l’IA ?'],
          rows: [
            [
              'Discuter, trouver des idées',
              'ChatGPT, Le Chat (Mistral), Gemini, Claude, Copilot',
              'Souvent oui par défaut : vérifiez vos réglages',
            ],
            [
              'Chercher avec les [[source|sources]] visibles',
              'Perplexity, Consensus',
              'Perplexity : oui par défaut. Consensus annonce que non',
            ],
            [
              'Trouver et résumer des articles',
              'Elicit, Semantic Scholar',
              'Selon l’outil : lisez sa page',
            ],
            [
              'Interroger vos propres documents',
              'NotebookLM, SciSpace, Humata',
              'NotebookLM et SciSpace annoncent que non',
            ],
            [
              'Corriger votre français',
              'LanguageTool, Scribens, Antidote',
              'LanguageTool annonce que non. Scribens annonce ne pas conserver le texte',
            ],
            ['Traduire', 'DeepL', 'Version gratuite : oui, et données personnelles interdites'],
          ],
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Par où commencer ?',
          text: 'Prenez un outil de discussion pour trouver des idées, Perplexity ou Consensus pour repérer des articles, et un correcteur pour relire. C’est largement suffisant pour un mémoire.',
        },
        {
          kind: 'more',
          title: 'Comment refuser que mes textes entraînent l’IA ?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'La plupart des outils proposent un réglage dans leurs paramètres de confidentialité. La CNIL a publié [la marche à suivre pour les principaux outils](https://www.cnil.fr/fr/ia-comment-sopposer-la-reutilisation-de-ses-donnees-personnelles-entrainement-agent-conversationnel).',
            },
            {
              kind: 'paragraph',
              text: 'Ces informations viennent des [[editeur|éditeurs]] eux-mêmes, et personne ne les a contrôlées de façon indépendante. Même avec ce réglage, ne saisissez jamais de données sensibles.',
            },
          ],
        },
        {
          kind: 'more',
          title: 'Faut-il payer ?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Non, pour un mémoire, les versions gratuites suffisent en général. Elles limitent seulement le nombre de demandes ou de documents.',
            },
          ],
        },
      ],
      takeaways: [
        'Choisissez un outil par besoin, sans chercher à tout essayer.',
        'Regardez si vos textes servent à entraîner l’outil, et changez le réglage.',
        'Les versions gratuites suffisent en général pour un mémoire.',
      ],
    },
    {
      slug: 'ce-quelle-apporte',
      question: 'En quoi l’IA peut-elle vraiment m’aider ?',
      minutes: 4,
      summary:
        'Bien utilisée, l’IA vous aide à démarrer, à comprendre un texte difficile, à trouver vos mots et à corriger votre français. Elle peut rendre plus accessible un travail d’écriture qui fait parfois peur.',
      blocks: [
        {
          kind: 'paragraph',
          text: 'On parle beaucoup des dangers de l’IA, et nous y viendrons. Mais si vous n’avez pas l’habitude des travaux universitaires, elle peut aussi être une vraie aide. Voici ce qu’elle fait bien.',
        },
        {
          kind: 'list',
          items: [
            '**Vous sortir de la page blanche**, en vous posant des questions sur votre sujet.',
            '**Expliquer un texte difficile** avec des mots plus simples, ou en français pour un article en anglais.',
            '**Vous proposer des pistes de vocabulaire** : des [[mot-cle|mots-clés]] et des synonymes pour vos recherches.',
            '**Vous aider à organiser vos idées** quand vous en avez beaucoup.',
            '**Corriger votre orthographe** et clarifier vos phrases, ce qui aide en cas de dyslexie.',
            '**Vous entraîner à l’oral**, en jouant le rôle du jury.',
          ],
        },
        {
          kind: 'callout',
          tone: 'example',
          title: 'Sam s’entraîne pour la soutenance',
          text: 'Sam demande à l’IA : « Tu joues un jury de DU. Pose-moi cinq questions difficiles sur ma question de recherche, une par une. » Sam répond à voix haute, et repère ainsi ses points faibles.',
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Demandez-lui de vous questionner plutôt que de répondre',
          text: 'C’est l’usage le plus formateur. Une IA qui vous pose des questions vous fait réfléchir, alors qu’une IA qui écrit à votre place vous fait perdre l’occasion d’apprendre.',
        },
      ],
      takeaways: [
        'L’IA est utile pour démarrer, comprendre, reformuler et corriger.',
        'Elle peut rendre l’écrit plus accessible.',
        'Le meilleur usage : lui demander de vous poser des questions.',
      ],
    },
    {
      slug: 'ses-limites',
      question: 'Quelles sont ses limites ?',
      minutes: 6,
      summary:
        'La première limite est qu’une IA invente : c’est ce qu’on appelle une [[hallucination]]. Elle peut créer un article qui n’existe pas, avec de vrais noms d’auteurs. Elle reproduit aussi les préjugés des textes dont elle a appris.',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Regardons le piège le plus courant dans un mémoire : la fausse [[reference|référence]]. L’IA vous donne un titre crédible, une revue qui existe, une année, parfois même un [[doi|DOI]]. Et pourtant, l’article n’a jamais été écrit.',
        },
        { kind: 'scene', scene: 'hallucination' },
        {
          kind: 'callout',
          tone: 'warning',
          title: 'Ce n’est pas un cas rare',
          text: 'Dans une étude sur la santé mentale, près d’une référence sur cinq donnée par GPT-4o était inventée, et près de la moitié des références réelles contenaient des erreurs (Linardon et al., 2025). Les outils progressent, mais la vérification reste indispensable.',
        },
        { kind: 'tool', tool: 'verifier-reference' },
        { kind: 'heading', text: 'Elle peut aussi reproduire des préjugés' },
        {
          kind: 'paragraph',
          text: 'Une IA apprend à partir de textes écrits par des humains, avec leurs stéréotypes. Ce point vous concerne directement. Une étude a montré que des modèles de langage expriment de la stigmatisation envers certains troubles, davantage pour la schizophrénie et l’alcool que pour la dépression (Moore et al., 2025).',
        },
        {
          kind: 'paragraph',
          text: 'Votre expérience de pair-aidance est donc précieuse : elle vous aide à repérer ces préjugés, et à ne pas les laisser passer dans votre texte.',
        },
        {
          kind: 'more',
          title: 'Voir les références citées dans cette page',
          blocks: [
            {
              kind: 'reference',
              reference:
                'Linardon, J., Jarman, H. K., McClure, Z., Anderson, C., Liu, C., & Messer, M. (2025). Influence of topic familiarity and prompt specificity on citation fabrication in mental health research using large language models: Experimental study. *JMIR Mental Health*, *12*, e80371. https://doi.org/10.2196/80371',
            },
            {
              kind: 'reference',
              reference:
                'Moore, J., Grabb, D., Agnew, W., Klyman, K., Chancellor, S., Ong, D. C., & Haber, N. (2025). Expressing stigma and inappropriate responses prevents LLMs from safely replacing mental health providers. In *Proceedings of the 2025 ACM Conference on Fairness, Accountability, and Transparency* (p. 599-627). https://doi.org/10.1145/3715275.3732039',
            },
          ],
        },
        {
          kind: 'more',
          title: 'Autres limites à connaître',
          blocks: [
            {
              kind: 'list',
              items: [
                '**Ses connaissances peuvent être datées**, si elle ne cherche pas en ligne.',
                '**Elle connaît mal le contexte français** de la pair-aidance, souvent moins documenté en ligne.',
                '**Elle ne trouve pas ce qui n’est pas en ligne** : livres, mémoires, [[litterature-grise|littérature grise]].',
                '**Elle vous donne souvent raison**, même quand vous avez tort. Demandez-lui de vous contredire.',
              ],
            },
          ],
        },
      ],
      takeaways: [
        'Vérifiez que chaque référence existe, et que le document dit bien cela.',
        'Une IA peut reproduire des préjugés sur la santé mentale.',
        'Votre expérience vous aide à repérer ce qui sonne faux.',
      ],
    },
    {
      slug: 'donnees-sensibles',
      question: 'Que ne faut-il jamais mettre dans une IA ?',
      minutes: 6,
      summary:
        'Ne saisissez jamais d’information qui permette de reconnaître une personne : patient, personne accompagnée, collègue ou proche. Ce que vous écrivez part sur des serveurs, et peut être conservé. Avant toute demande, il faut [[anonymisation|anonymiser]].',
      blocks: [
        {
          kind: 'paragraph',
          text: 'C’est sans doute le point le plus important de cette section, car il touche aux personnes que vous accompagnez. En pair-aidance, on nous confie des histoires très personnelles. Ces histoires ne doivent pas se retrouver sur les serveurs d’une entreprise.',
        },
        { kind: 'scene', scene: 'anonymiser' },
        {
          kind: 'table',
          caption: 'Ce qu’il faut retirer, et comment',
          headers: ['À ne jamais écrire', 'À remplacer par'],
          rows: [
            ['Nom, prénom, initiales reconnaissables', 'Une personne, un homme, une femme'],
            ['Âge exact, date de naissance', 'Une trentaine d’années'],
            ['Date précise d’un séjour', 'Au printemps, ou l’an dernier'],
            ['Nom de l’hôpital, du service, de la ville', 'Un service d’addictologie, en France'],
            ['Métier rare, détail unique de l’histoire', 'Une description générale'],
          ],
        },
        {
          kind: 'callout',
          tone: 'warning',
          title: 'Retirer le nom ne suffit pas',
          text: 'Remplacer un nom par un faux prénom, c’est de la [[pseudonymisation]]. Si l’âge, la ville et le métier restent, on peut parfois encore reconnaître la personne. Demandez-vous : quelqu’un qui connaît cette personne pourrait-il la reconnaître ?',
        },
        {
          kind: 'callout',
          tone: 'rule',
          title: 'Ce que dit la CNIL',
          text: 'Selon la CNIL, on ne soumet à un outil d’IA que ce qu’on est autorisé à partager. Sa fiche grand public déconseille d’y saisir son nom, son adresse, ses mots de passe, ses données bancaires ou ses problèmes personnels.',
        },
        {
          kind: 'paragraph',
          text: 'Pensez aussi à vous : votre propre parcours de soin est une [[donnee-sante|donnée de santé]]. Vous êtes libre de le partager, mais faites-le en connaissance de cause.',
        },
        {
          kind: 'more',
          title: 'Le secret professionnel me concerne-t-il ?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Cela dépend de votre statut et de votre lieu d’exercice. Le code pénal punit la révélation d’une information confidentielle par une personne qui la détient par sa profession ou sa fonction. Posez la question à votre employeur ou à votre association.',
            },
            {
              kind: 'paragraph',
              text: 'Dans tous les cas, retenez la règle simple : ce qu’on vous a confié ne va pas dans une IA.',
            },
          ],
        },
        {
          kind: 'links',
          title: 'Pour aller plus loin',
          links: [
            {
              label: 'Anonymisation et pseudonymisation, par la CNIL',
              url: 'https://www.cnil.fr/fr/lanonymisation-de-donnees-personnelles',
            },
            {
              label: 'IA générative et vie privée, l’affiche de la CNIL',
              url: 'https://www.cnil.fr/sites/default/files/2026-05/affiche_ia_generative_et_vie_privee_fr.pdf',
            },
          ],
        },
      ],
      takeaways: [
        'Aucune information qui permette de reconnaître une personne.',
        'Remplacer un nom ne suffit pas : retirez aussi les détails identifiants.',
        'Ce qu’on vous a confié ne va pas dans une IA.',
      ],
    },
    {
      slug: 'autres-risques',
      question: 'Quels sont les autres risques ?',
      minutes: 6,
      summary:
        'Si l’IA fait tout à votre place, vous apprenez moins. Elle n’est pas non plus un soutien en cas de crise. Il faut aussi penser aux droits d’auteur et à son coût pour l’environnement.',
      blocks: [
        { kind: 'heading', text: 'Moins apprendre' },
        {
          kind: 'paragraph',
          text: 'Dans une étude menée auprès de lycéens, ceux qui s’entraînaient avec GPT-4 réussissaient mieux pendant l’exercice, puis moins bien que les autres une fois l’outil retiré (Bastani et al., 2025). Ces résultats ne portent pas sur des adultes, mais ils rappellent une chose simple : c’est en faisant soi-même qu’on progresse. Or votre mémoire vous prépare aussi à votre métier.',
        },
        { kind: 'heading', text: 'Une IA n’est pas un soutien' },
        {
          kind: 'paragraph',
          text: 'Ces outils sont conçus pour être agréables : ils ont tendance à vous donner raison (Cheng et al., 2026). Dans des situations de fragilité, cela peut poser problème. Des études ont aussi montré que leurs réponses peuvent être inadaptées quand une personne va mal (Moore et al., 2025). On ignore encore à quelle fréquence, et pour qui, mais la prudence s’impose.',
        },
        {
          kind: 'callout',
          tone: 'warning',
          title: 'Si vous allez mal',
          text: 'Parlez-en à une personne, pas à un outil. Si vous pensez au suicide, ou si vous vous inquiétez pour quelqu’un, le **3114** est le numéro national de prévention du suicide : il est gratuit, ouvert 24 heures sur 24 et 7 jours sur 7. Plus d’informations sur [3114.fr](https://3114.fr/).',
        },
        { kind: 'heading', text: 'Les droits d’auteur' },
        {
          kind: 'paragraph',
          text: 'Déposer un article dans une IA n’est pas anodin, car il reste protégé par le droit d’auteur. Il n’existe pas de règle française simple sur ce point. Par prudence, ne déposez que des documents en [[open-access|accès libre]] ou vos propres textes.',
        },
        { kind: 'heading', text: 'L’environnement' },
        {
          kind: 'paragraph',
          text: 'Une demande simple consommerait de l’ordre de 0,24 à 0,55 Wh selon les estimations, soit à peu près autant qu’une recherche Google estimée en 2009. Les demandes longues, le raisonnement approfondi et la vidéo coûtent bien plus. À grande échelle, les centres de données représentaient environ 1,5 % de l’électricité mondiale en 2024, et pourraient plus que doubler d’ici 2030 (Agence internationale de l’énergie, 2025).',
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Un usage sobre, c’est aussi un bon usage',
          text: 'Posez une question claire plutôt que dix questions vagues, et évitez de générer des images ou des vidéos sans besoin. Vous y gagnerez aussi en qualité.',
        },
        {
          kind: 'more',
          title: 'Pourquoi ces chiffres sont-ils incertains ?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Les entreprises publient peu de données, et chacune mesure à sa façon. Le chiffre de 0,24 Wh vient de Google, celui de 0,34 Wh d’OpenAI, sans méthode publiée, et celui de 0,42 Wh d’une prépublication universitaire. Le chiffre de Google pour la recherche classique date de 2009. Retenez donc un ordre de grandeur, et non un chiffre précis.',
            },
          ],
        },
        {
          kind: 'more',
          title: 'Voir les références citées dans cette page',
          blocks: [
            {
              kind: 'reference',
              reference:
                'Agence internationale de l’énergie. (2025). *Energy and AI*. https://www.iea.org/reports/energy-and-ai',
            },
            {
              kind: 'reference',
              reference:
                'Bastani, H., Bastani, O., Sungu, A., Ge, H., Kabakcı, Ö., & Mariman, R. (2025). Generative AI without guardrails can harm learning: Evidence from high school mathematics. *Proceedings of the National Academy of Sciences*, *122*(26), e2422633122. https://doi.org/10.1073/pnas.2422633122',
            },
            {
              kind: 'reference',
              reference:
                'Cheng, M., Lee, C., Khadpe, P., Yu, S., Han, D., & Jurafsky, D. (2026). Sycophantic AI decreases prosocial intentions and promotes dependence. *Science*, *391*(6792), eaec8352. https://doi.org/10.1126/science.aec8352',
            },
            {
              kind: 'reference',
              reference:
                'Moore, J., Grabb, D., Agnew, W., Klyman, K., Chancellor, S., Ong, D. C., & Haber, N. (2025). Expressing stigma and inappropriate responses prevents LLMs from safely replacing mental health providers. In *Proceedings of the 2025 ACM Conference on Fairness, Accountability, and Transparency* (p. 599-627). https://doi.org/10.1145/3715275.3732039',
            },
          ],
        },
      ],
      takeaways: [
        'Faites vous-même ce qui vous fait progresser.',
        'Une IA n’est pas un soutien : en cas de crise, appelez une personne, ou le 3114.',
        'Ne déposez que des documents en accès libre ou vos propres textes.',
      ],
    },
    {
      slug: 'bien-demander',
      question: 'Comment bien formuler ma demande ?',
      minutes: 5,
      summary:
        'Un bon [[prompt]] se construit avec la méthode **ACTIF** : l’Action demandée, le Contexte, la Tonalité, l’Identité donnée à l’IA et le Format attendu. Puis on dialogue, on précise et on ajuste.',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Une IA répond à ce que vous lui demandez, ni plus ni moins. Si votre demande est vague, la réponse le sera aussi. Prenons le temps de voir comment Sam améliore sa demande, en cinq étapes.',
        },
        { kind: 'scene', scene: 'actif' },
        {
          kind: 'compare',
          before: { label: 'Une demande vague', text: 'Parle-moi de la pair-aidance.' },
          after: {
            label: 'Une demande claire',
            text: 'Tu es documentaliste en santé mentale. Je prépare un mémoire de DU sur l’arrivée d’une personne pair-aidante dans une équipe d’addictologie. Propose-moi dix [[mot-cle|mots-clés]] en français et en anglais, sous forme de tableau, dans un langage simple.',
          },
        },
        { kind: 'tool', tool: 'preparer-prompt' },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Laissez-la vous poser des questions',
          text: 'Ajoutez à la fin de votre demande : « Avant de répondre, pose-moi trois questions pour mieux comprendre ce que je cherche. » C’est souvent ce qui change tout.',
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: 'Continuez la conversation',
          text: 'La première réponse est rarement la bonne. Relancez, corrigez, demandez un exemple. Vous pouvez aussi demander : « Quelles sont les limites de ta réponse ? »',
        },
      ],
      takeaways: [
        'ACTIF : Action, Contexte, Tonalité, Identité, Format.',
        'Demandez à l’IA de vous poser des questions.',
        'Relancez et précisez : c’est un dialogue.',
      ],
    },
    {
      slug: 'declarer',
      question: 'Comment déclarer mon usage de l’IA ?',
      minutes: 4,
      summary:
        'Une IA n’est pas une [[source]] : elle ne se cite pas et ne va pas dans la [[bibliographie|bibliographie]]. Vous indiquez plutôt, dans une [[annexe]], quel outil vous avez utilisé, à quelle étape, et avec quelle demande.',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Pourquoi ne pas citer une IA comme un article ? Parce que votre lecteur ne pourrait pas vérifier : la même question donne une réponse différente à chaque fois. La BU de Lyon 1 recommande donc une déclaration d’usage, sous forme de tableau en annexe.',
        },
        {
          kind: 'table',
          caption: 'Un exemple : la déclaration de Sam',
          headers: ['Outil', 'Étape', 'Demande utilisée', 'Ce que j’ai vérifié ou modifié'],
          rows: [
            [
              'Le Chat',
              'Trouver des [[mot-cle|mots-clés]]',
              'Propose dix mots-clés sur…',
              'J’ai gardé quatre mots, vérifiés dans PubMed',
            ],
            [
              'Perplexity',
              'Chercher des articles',
              'Quels travaux sur…',
              'J’ai lu les deux articles retenus',
            ],
            [
              'LanguageTool',
              'Corriger',
              'Correction automatique',
              'J’ai accepté ou refusé chaque correction',
            ],
          ],
        },
        {
          kind: 'paragraph',
          text: 'Prenez l’habitude de noter vos usages au fur et à mesure, dans votre journal de bord. L’outil ci-dessous prépare ensuite ce tableau pour vous.',
        },
        { kind: 'tool', tool: 'declaration-ia' },
        {
          kind: 'links',
          title: 'Pour aller plus loin',
          links: [
            {
              label: 'Le module IA du Tuto des BU de Lyon 1',
              url: 'https://foad.univ-lyon1.fr/mod/book/view.php?id=3026&chapterid=477&lang=en',
            },
            {
              label: 'IA et recherche documentaire, formation de l’URFIST',
              url: 'https://callisto-formation.fr/course/view.php?id=952',
            },
          ],
        },
      ],
      takeaways: [
        'Une IA ne se cite pas comme une source.',
        'Déclarez en annexe : l’outil, l’étape, la demande, ce que vous avez vérifié.',
        'Notez vos usages au fur et à mesure.',
      ],
    },
  ],
  quiz: [
    {
      id: 'fonctionne',
      prompt: 'Comment une IA générative produit-elle ses réponses ?',
      choices: [
        {
          text: 'Elle prédit, mot après mot, la suite de texte la plus probable.',
          correct: true,
          feedback: 'Oui. C’est pourquoi elle peut se tromper avec beaucoup d’assurance.',
        },
        {
          text: 'Elle consulte une grande encyclopédie vérifiée.',
          correct: false,
          feedback:
            'Non, elle ne vérifie pas. Certains outils cherchent en ligne, mais ils peuvent quand même mal résumer.',
        },
      ],
    },
    {
      id: 'reference',
      prompt: 'Une IA vous donne une référence très crédible. Que faites-vous ?',
      choices: [
        {
          text: 'Je vérifie qu’elle existe, puis je lis le document.',
          correct: true,
          feedback: 'Exactement. Une référence peut être entièrement inventée.',
        },
        {
          text: 'Je l’ajoute à ma bibliographie, puisqu’elle a l’air sérieuse.',
          correct: false,
          feedback: 'C’est le piège : une référence inventée a souvent l’air très sérieuse.',
        },
      ],
    },
    {
      id: 'donnees',
      prompt:
        'Vous voulez de l’aide pour analyser la situation d’une personne accompagnée. Que faites-vous ?',
      choices: [
        {
          text: 'Je décris une situation générale, sans aucun détail qui permette de la reconnaître.',
          correct: true,
          feedback: 'Oui, et pensez à retirer aussi le lieu, les dates et les détails rares.',
        },
        {
          text: 'Je colle mes notes en changeant seulement le prénom.',
          correct: false,
          feedback:
            'Changer le prénom ne suffit pas : les autres détails peuvent suffire à la reconnaître.',
        },
      ],
    },
    {
      id: 'permis',
      prompt: 'Dans le DU, que devez-vous faire si vous utilisez l’IA pour vous aider à rédiger ?',
      multiple: true,
      choices: [
        {
          text: 'Vérifier et ajuster le texte.',
          correct: true,
          feedback: 'Oui, c’est votre texte et votre réflexion.',
        },
        {
          text: 'Déclarer votre usage en annexe.',
          correct: true,
          feedback: 'Oui, la transparence fait partie des conditions.',
        },
        {
          text: 'La citer comme un auteur dans la bibliographie.',
          correct: false,
          feedback: 'Non, une IA n’est pas une source : on déclare son usage en annexe.',
        },
      ],
    },
    {
      id: 'actif',
      prompt: 'Que signifie le F de la méthode ACTIF ?',
      choices: [
        {
          text: 'Format : la forme attendue de la réponse.',
          correct: true,
          feedback: 'Oui, par exemple un tableau ou trois points.',
        },
        {
          text: 'Fiabilité : le degré de confiance dans l’IA.',
          correct: false,
          feedback: 'Non, F veut dire Format. La fiabilité, c’est à vous de la vérifier !',
        },
      ],
    },
    {
      id: 'crise',
      prompt: 'Une personne de votre entourage va très mal. Que lui conseillez-vous ?',
      choices: [
        {
          text: 'De parler à une personne de confiance, à un soignant ou d’appeler le 3114.',
          correct: true,
          feedback:
            'Oui, une personne et pas un outil. Le 3114 est gratuit et ouvert jour et nuit.',
        },
        {
          text: 'De discuter avec un chatbot en attendant.',
          correct: false,
          feedback: 'Une IA n’est pas un soutien fiable dans ces moments-là.',
        },
      ],
    },
  ],
};
