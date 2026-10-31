export interface SubjectAnswers {
  what: string;
  who: string;
  where: string;
  when: string;
  how: string;
  why: string;
}

export const EMPTY_ANSWERS: SubjectAnswers = {
  what: '',
  who: '',
  where: '',
  when: '',
  how: '',
  why: '',
};

export const SUBJECT_FIELDS: readonly {
  key: keyof SubjectAnswers;
  label: string;
  hint: string;
  example: string;
}[] = [
  {
    key: 'what',
    label: 'Quoi ?',
    hint: 'Quel est votre thème ?',
    example: 'la pair-aidance en addictologie',
  },
  {
    key: 'who',
    label: 'Qui ?',
    hint: 'Quelles personnes sont concernées ?',
    example: 'les équipes soignantes',
  },
  {
    key: 'where',
    label: 'Où ?',
    hint: 'Dans quel lieu ou quel territoire ?',
    example: 'dans un service hospitalier',
  },
  {
    key: 'when',
    label: 'Quand ?',
    hint: 'À quel moment, sur quelle période ?',
    example: 'à l’arrivée dans l’équipe',
  },
  {
    key: 'how',
    label: 'Comment ?',
    hint: 'Quel point de vue vous intéresse ?',
    example: 'à partir de témoignages',
  },
  {
    key: 'why',
    label: 'Pourquoi ?',
    hint: 'Pourquoi ce sujet compte-t-il pour vous ?',
    example: 'pour mieux préparer l’accueil',
  },
];

/** « de la pair-aidance », « du soutien », « des pairs », « d'un groupe ». */
export function withDe(phrase: string): string {
  const text = phrase.trim();
  if (/^le\s/i.test(text)) return `du ${text.slice(3)}`;
  if (/^les\s/i.test(text)) return `des ${text.slice(4)}`;
  if (/^[aàâeéèêiîoôuûh]/i.test(text)) return `d’${text}`;
  return `de ${text}`;
}

function tail(answers: SubjectAnswers): string {
  const parts = [answers.where, answers.when].map((part) => part.trim()).filter(Boolean);
  return parts.length > 0 ? ` ${parts.join(' ')}` : '';
}

/** Des débuts de question à reprendre avec ses propres mots. Il faut au moins Quoi et Qui. */
export function suggestQuestions(answers: SubjectAnswers): string[] {
  const what = answers.what.trim();
  const who = answers.who.trim();
  if (!what || !who) return [];
  const context = tail(answers);
  return [
    `Comment ${who} perçoivent-ils ou perçoivent-elles la place ${withDe(what)}${context} ?`,
    `Quels sont les freins et les leviers ${withDe(what)} pour ${who}${context} ?`,
    `Quel est l’apport ${withDe(what)} pour ${who}${context} ?`,
  ];
}

const CLOSED_OPENINGS =
  /^(est-ce|est-il|est-elle|peut-on|faut-il|doit-on|y a-t-il|a-t-on|sont-ils|sont-elles)\b/i;
const LOADED_WORDS = /\b(toujours|jamais|inutile|inefficace|rejettent|refusent|évidemment)\b/i;
const MINIMUM_WORDS = 6;
const MAXIMUM_WORDS = 32;

/** Des remarques simples, pour attirer l'attention. Elles ne remplacent pas un avis humain. */
export function reviewQuestion(rawQuestion: string): string[] {
  const question = rawQuestion.trim();
  if (!question) return [];

  const remarks: string[] = [];
  const wordCount = question.split(/\s+/).length;

  if (!question.endsWith('?')) remarks.push('Terminez par un point d’interrogation.');
  if (CLOSED_OPENINGS.test(question)) {
    remarks.push('On peut y répondre par oui ou non. Essayez « Comment » ou « En quoi ».');
  }
  if (LOADED_WORDS.test(question)) {
    remarks.push('Un mot de votre question semble contenir un avis. Gardez-la neutre.');
  }
  if (wordCount < MINIMUM_WORDS) remarks.push('Elle semble courte : précisez qui et où.');
  if (wordCount > MAXIMUM_WORDS) remarks.push('Elle semble longue : gardez une seule idée.');
  if (!/pair|médiateur|mediateur|travail pair/i.test(question)) {
    remarks.push('Vérifiez que le lien avec la pair-aidance est clair.');
  }
  return remarks;
}
