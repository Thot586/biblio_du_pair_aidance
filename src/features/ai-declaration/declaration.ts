export interface DeclarationRow {
  id: string;
  tool: string;
  step: string;
  prompt: string;
  check: string;
}

export const DECLARATION_STEPS = [
  'Trouver des idées',
  'Chercher des documents',
  'Résumer ou comprendre un texte',
  'Faire le plan',
  'Aider à rédiger',
  'Corriger le français',
  'Traduire',
] as const;

export const DECLARATION_HEADERS = [
  'Outil utilisé',
  'Étape',
  'Demande utilisée',
  'Ce que j’ai vérifié ou modifié',
] as const;

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function cells(row: DeclarationRow): string[] {
  return [row.tool, row.step, row.prompt, row.check];
}

/** Un tableau à coller dans Word, à placer en annexe du mémoire. */
export function declarationToHtml(rows: readonly DeclarationRow[]): string {
  const cell = (tag: string, text: string) =>
    `<${tag} style="border:1px solid #000;padding:4px">${escapeHtml(text)}</${tag}>`;
  const head = DECLARATION_HEADERS.map((header) => cell('th', header)).join('');
  const body = rows
    .map(
      (row) =>
        `<tr>${cells(row)
          .map((text) => cell('td', text))
          .join('')}</tr>`,
    )
    .join('');
  return `<table style="border-collapse:collapse"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

export function declarationToText(rows: readonly DeclarationRow[]): string {
  return [DECLARATION_HEADERS.join('\t'), ...rows.map((row) => cells(row).join('\t'))].join('\n');
}
