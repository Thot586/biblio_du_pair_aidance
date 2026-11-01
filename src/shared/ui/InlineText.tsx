import { frenchSpacing } from '@/shared/lib/text';
import { ExternalLink } from './ExternalLink';
import { type InlineNode, parseInline } from './inlineText/parseInline';
import { Term } from './Term';

function renderNodes(nodes: InlineNode[]) {
  return nodes.map((node, index) => {
    switch (node.type) {
      case 'text':
        return frenchSpacing(node.value);
      case 'strong':
        return <strong key={index}>{renderNodes(node.children)}</strong>;
      case 'em':
        return <em key={index}>{renderNodes(node.children)}</em>;
      case 'term':
        return <Term key={index} id={node.id} label={node.label} />;
      case 'link':
        return (
          <ExternalLink key={index} href={node.url}>
            {node.label}
          </ExternalLink>
        );
    }
  });
}

/** Affiche un texte du contenu, avec son gras, ses liens et ses termes du glossaire. */
export function InlineText({ text }: { text: string }) {
  return <>{renderNodes(parseInline(text))}</>;
}
