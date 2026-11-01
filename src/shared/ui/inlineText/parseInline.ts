export type InlineNode =
  | { type: 'text'; value: string }
  | { type: 'strong'; children: InlineNode[] }
  | { type: 'em'; children: InlineNode[] }
  | { type: 'term'; id: string; label?: string }
  | { type: 'link'; label: string; url: string };

const INLINE_PATTERN =
  /\*\*(?<strong>[^*]+)\*\*|\*(?<em>[^*]+)\*|\[\[(?<term>[^\]|]+)(?:\|(?<termLabel>[^\]]+))?\]\]|\[(?<linkLabel>[^\]]+)\]\((?<linkUrl>[^)\s]+)\)/g;

/** Découpe la mini-syntaxe décrite dans `content/types.ts`. Un terme ou un lien peut se trouver dans un gras. */
export function parseInline(source: string): InlineNode[] {
  const nodes: InlineNode[] = [];
  let cursor = 0;

  for (const match of source.matchAll(INLINE_PATTERN)) {
    if (match.index > cursor) {
      nodes.push({ type: 'text', value: source.slice(cursor, match.index) });
    }
    nodes.push(toNode(match.groups ?? {}));
    cursor = match.index + match[0].length;
  }

  if (cursor < source.length) {
    nodes.push({ type: 'text', value: source.slice(cursor) });
  }
  return nodes;
}

function toNode(groups: Record<string, string | undefined>): InlineNode {
  const { strong, em, term, termLabel, linkLabel, linkUrl } = groups;
  if (strong !== undefined) return { type: 'strong', children: parseInline(strong) };
  if (em !== undefined) return { type: 'em', children: parseInline(em) };
  if (term !== undefined)
    return termLabel ? { type: 'term', id: term, label: termLabel } : { type: 'term', id: term };
  return { type: 'link', label: linkLabel ?? '', url: linkUrl ?? '' };
}

function plainText(nodes: InlineNode[]): string {
  return nodes
    .map((node) => {
      switch (node.type) {
        case 'text':
          return node.value;
        case 'strong':
        case 'em':
          return plainText(node.children);
        case 'term':
          return node.label ?? node.id;
        case 'link':
          return node.label;
      }
    })
    .join('');
}

/** Le même texte sans aucune marque, pour la lecture à voix haute et les contrôles de lisibilité. */
export function stripInline(source: string): string {
  return plainText(parseInline(source));
}
