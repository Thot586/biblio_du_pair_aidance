import type { ReactNode } from 'react';
import { Link } from 'react-router';

/** Un lien vers un autre site s'ouvre à part, pour ne pas perdre sa place dans le cours. */
export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith('/')) return <Link to={href}>{children}</Link>;
  if (href.startsWith('mailto:')) return <a href={href}>{children}</a>;
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
      <span className="visually-hidden"> (s'ouvre dans un nouvel onglet)</span>
    </a>
  );
}
