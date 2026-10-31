import { CONTACT_PLACES } from '@/content/contacts';
import { usePageTitle } from '@/shared/lib/usePageTitle';
import { ExternalLink } from '@/shared/ui/ExternalLink';
import styles from './SimplePage.module.css';

export function HelpPage() {
  usePageTitle("Qui peut m'aider ?");

  return (
    <article className={styles.page}>
      <h1>Qui peut m'aider ?</h1>
      <p>
        Les documentalistes aident à chercher, à trouver un document et à faire sa bibliographie.
        Leur demander de l'aide est normal, et c'est même une bonne façon d'avancer.
      </p>
      {CONTACT_PLACES.map((place) => (
        <section key={place.name}>
          <h2>{place.name}</h2>
          <p>{place.topics}</p>
          {place.details && <p>{place.details}</p>}
          <ul className={styles.list}>
            {place.people.map((person) => (
              <li key={person.email}>
                {person.name} : <a href={`mailto:${person.email}`}>{person.email}</a>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <section>
        <h2>À l'Université Lyon 1</h2>
        <p>
          Le portail des bibliothèques propose des ressources à distance, des tutoriels et des
          ateliers Zotero.
        </p>
        <ul className={styles.list}>
          <li>
            <ExternalLink href="https://portaildoc.univ-lyon1.fr/">
              Portail des bibliothèques de Lyon 1
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://portaildoc.univ-lyon1.fr/se-former/ateliers-de-formation/les-ateliers-zotero">
              Ateliers Zotero
            </ExternalLink>
          </li>
        </ul>
      </section>
    </article>
  );
}
