export interface PromptFields {
  action: string;
  context: string;
  tone: string;
  identity: string;
  format: string;
  askQuestions: boolean;
}

export const EMPTY_PROMPT: PromptFields = {
  action: '',
  context: '',
  tone: '',
  identity: '',
  format: '',
  askQuestions: true,
};

function sentence(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return '';
  return /[.!?:]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

/** Assemble une demande claire, dans l'ordre où une personne la lirait. */
export function buildPrompt(fields: PromptFields): string {
  const identity = fields.identity.trim();
  const tone = fields.tone.trim();
  const format = fields.format.trim();
  const lines = [
    identity ? `Tu es ${sentence(identity)}` : '',
    sentence(fields.context),
    sentence(fields.action),
    tone ? `Utilise un ton ${sentence(tone)}` : '',
    format ? `Présente ta réponse ainsi : ${sentence(format)}` : '',
  ].filter(Boolean);

  if (lines.length === 0) return '';
  if (fields.askQuestions) {
    lines.push(
      'Avant de répondre, pose-moi trois questions pour mieux comprendre ce que je cherche.',
    );
  }
  return lines.join('\n');
}

export interface SensitiveMatch {
  label: string;
  text: string;
}

const SENSITIVE_PATTERNS: readonly { label: string; pattern: RegExp }[] = [
  { label: 'une adresse e-mail', pattern: /[\w.+-]+@[\w-]+\.[\w.-]+/g },
  { label: 'un numéro de téléphone', pattern: /(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}/g },
  {
    label: 'un numéro de sécurité sociale',
    pattern: /\b[12]\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{3}\s?\d{3}\b/g,
  },
  {
    label: 'une date précise',
    pattern:
      /\b\d{1,2}(?:\/\d{1,2}\/\d{2,4}|\s(?:janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)(?:\s\d{4})?)\b/gi,
  },
  { label: 'un âge exact', pattern: /\b\d{1,3}\s?ans\b/gi },
  {
    label: 'une personne nommée',
    pattern:
      /\b(?:M\.|Mme|Mlle|Monsieur|Madame|Dr|Docteur|Pr)\s+[\p{Lu}][\p{L}'’-]*\.?(?:\s[\p{Lu}][\p{L}'’-]*)?/gu,
  },
  {
    label: 'le nom d’un établissement',
    pattern:
      /\b(?:hôpital|clinique|CHU|CHRU|EPSM|CH)\s+(?:de\s+|du\s+|d’|d')?[\p{Lu}][\p{L}'’-]*/gu,
  },
];

/**
 * Repère, sur l'appareil, ce qui ressemble à une donnée identifiante.
 * C'est une aide à la relecture : ce contrôle ne voit pas tout.
 */
export function findSensitiveData(text: string): SensitiveMatch[] {
  return SENSITIVE_PATTERNS.flatMap(({ label, pattern }) =>
    [...text.matchAll(pattern)].map((match) => ({ label, text: match[0] })),
  );
}
