import { Link } from 'react-router';
import type { Block } from '@/content/types';
import { findTool } from '@/features/tools/catalog';
import { Callout } from '@/shared/ui/Callout';
import { ExternalLink } from '@/shared/ui/ExternalLink';
import { InlineText } from '@/shared/ui/InlineText';
import { MoreDetails } from '@/shared/ui/MoreDetails';
import { SceneBlockView } from './SceneBlockView';
import styles from './BlockList.module.css';

export function BlockList({ blocks }: { blocks: readonly Block[] }) {
  return (
    <div className={styles.flow}>
      {blocks.map((block, index) => (
        <BlockView key={index} block={block} />
      ))}
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case 'paragraph':
      return (
        <p>
          <InlineText text={block.text} />
        </p>
      );
    case 'heading':
      return <h2 className={styles.heading}>{block.text}</h2>;
    case 'list': {
      const List = block.ordered ? 'ol' : 'ul';
      return (
        <List className={styles.list}>
          {block.items.map((item) => (
            <li key={item}>
              <InlineText text={item} />
            </li>
          ))}
        </List>
      );
    }
    case 'callout':
      return <Callout tone={block.tone} title={block.title} text={block.text} />;
    case 'more':
      return (
        <MoreDetails title={block.title}>
          <BlockList blocks={block.blocks} />
        </MoreDetails>
      );
    case 'scene':
      return <SceneBlockView id={block.scene} />;
    case 'tool': {
      const tool = findTool(block.tool);
      return (
        <p className={styles.tool}>
          <span className={styles.toolTitle}>{tool.title}</span>
          <span>{tool.summary}</span>
          <Link to={`/outils/${tool.slug}`} className={styles.toolLink}>
            Ouvrir l'outil
          </Link>
        </p>
      );
    }
    case 'links':
      return (
        <div className={styles.links}>
          {block.title && <p className={styles.linksTitle}>{block.title}</p>}
          <ul className={styles.list}>
            {block.links.map((link) => (
              <li key={link.url}>
                <ExternalLink href={link.url}>{link.label}</ExternalLink>
                {link.description && <> : {link.description}</>}
              </li>
            ))}
          </ul>
        </div>
      );
    case 'table':
      return (
        <table className={styles.table}>
          <caption className={styles.caption}>{block.caption}</caption>
          <thead>
            <tr>
              {block.headers.map((header) => (
                <th key={header} scope="col">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row.join('|')}>
                {row.map((cell, index) =>
                  index === 0 ? (
                    <th key={index} scope="row">
                      <InlineText text={cell} />
                    </th>
                  ) : (
                    <td key={index} data-label={block.headers[index]}>
                      <InlineText text={cell} />
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      );
    case 'compare':
      return (
        <div className={styles.compare}>
          <div className={styles.before}>
            <p className={styles.compareLabel}>{block.before.label}</p>
            <p>
              <InlineText text={block.before.text} />
            </p>
          </div>
          <div className={styles.after}>
            <p className={styles.compareLabel}>{block.after.label}</p>
            <p>
              <InlineText text={block.after.text} />
            </p>
          </div>
          {block.why && (
            <p className={styles.why}>
              <InlineText text={block.why} />
            </p>
          )}
        </div>
      );
    case 'reference':
      return (
        <div className={styles.reference}>
          {block.label && <p className={styles.referenceLabel}>{block.label}</p>}
          <p className={styles.referenceText}>
            <InlineText text={block.reference} />
          </p>
          {block.inText && (
            <p className={styles.referenceInText}>
              Dans votre texte : <InlineText text={block.inText} />
            </p>
          )}
        </div>
      );
  }
}
