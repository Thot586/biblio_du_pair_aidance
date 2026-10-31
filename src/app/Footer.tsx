import { Link } from 'react-router';
import { AUTHORS, SITE_FULL_TITLE } from '@/content/site';
import styles from './Footer.module.css';

const LOGOS = [
  {
    file: 'universite-lyon-1.svg',
    alt: 'Université Claude Bernard Lyon 1',
    href: 'https://www.univ-lyon1.fr/',
  },
  {
    file: 'le-vinatier.png',
    alt: 'Le Vinatier, psychiatrie universitaire Lyon Métropole',
    href: 'https://www.ch-le-vinatier.fr/',
  },
  {
    file: 'centre-ressource-rehabilitation.png',
    alt: 'Centre ressource de réhabilitation psychosociale',
    href: 'https://centre-ressource-rehabilitation.org/',
  },
] as const;

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <p className={styles.title}>{SITE_FULL_TITLE}</p>
          <p>Conception : {AUTHORS.join(' et ')}.</p>
          <p className={styles.links}>
            <Link to="/sources">Sources</Link>
            <Link to="/aide">Qui peut m’aider ?</Link>
            <Link to="/a-propos">À propos et confidentialité</Link>
          </p>
        </div>
        <ul className={styles.logos}>
          {LOGOS.map((logo) => (
            <li key={logo.file}>
              <a href={logo.href} target="_blank" rel="noreferrer">
                <img
                  src={`${import.meta.env.BASE_URL}logos/${logo.file}`}
                  alt={logo.alt}
                  loading="lazy"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
