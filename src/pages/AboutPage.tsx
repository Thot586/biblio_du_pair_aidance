import { Link } from 'react-router';
import { AUTHOR_CONTACT } from '@/content/contacts';
import { AUTHORS, LAST_CHECKED, SITE_FULL_TITLE } from '@/content/site';
import { usePageTitle } from '@/shared/lib/usePageTitle';
import { ExternalLink } from '@/shared/ui/ExternalLink';
import styles from './SimplePage.module.css';

export function AboutPage() {
  usePageTitle('À propos et confidentialité');

  return (
    <article className={styles.page}>
      <h1>À propos et confidentialité</h1>
      <p>{SITE_FULL_TITLE}.</p>

      <h2>Qui a fait ce support ?</h2>
      <p>Conception : {AUTHORS.join(' et ')}.</p>
      <p>
        Ce support s’appuie sur les ressources du DU et des bibliothèques partenaires, créditées sur
        la page <Link to="/sources">Sources</Link>. Pour signaler une erreur :{' '}
        <a href={`mailto:${AUTHOR_CONTACT.email}`}>{AUTHOR_CONTACT.email}</a>.
      </p>

      <h2>Vos données</h2>
      <ul className={styles.list}>
        <li>Pas de compte, pas de publicité, pas de mesure d’audience, pas de cookie.</li>
        <li>
          Votre progression, vos réglages et votre liste de références restent dans le navigateur de
          cet appareil. Nous n’y avons pas accès. Sur un poste partagé, pensez à les effacer depuis
          le bouton Affichage.
        </li>
        <li>
          Si vous collez un DOI ou un titre dans un outil, votre navigateur interroge{' '}
          <ExternalLink href="https://www.crossref.org/">Crossref</ExternalLink>, une base
          internationale de références. Seul ce texte est envoyé : n’y mettez jamais de nom de
          personne accompagnée ni d’information de santé.
        </li>
        <li>
          Le site est hébergé par{' '}
          <ExternalLink href="https://docs.github.com/fr/pages">GitHub Pages</ExternalLink>, qui
          peut enregistrer des données techniques de connexion.
        </li>
      </ul>

      <h2>Accessibilité</h2>
      <p>
        Le site se lit au clavier, sur téléphone et avec un lecteur d’écran. Le bouton Affichage
        permet d’agrandir le texte, de changer de police ou de réduire les mouvements. Chaque
        animation a son texte complet. Un problème ? Écrivez-nous à l’adresse ci-dessus.
      </p>

      <h2>Mise à jour</h2>
      <p>
        Les outils en ligne changent vite. Les liens et les descriptions ont été vérifiés le{' '}
        {LAST_CHECKED}.
      </p>
    </article>
  );
}
