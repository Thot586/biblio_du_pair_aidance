import { formatReference } from '../domain/formatReference';
import {
  listSizeStatus,
  REFERENCES_MINIMUM,
  REFERENCES_TARGET_MAXIMUM,
  REFERENCES_TOLERATED_MAXIMUM,
  type ListSizeStatus,
} from '../domain/sortReferences';
import {
  clearReferences,
  listToHtml,
  listToPlainText,
  removeReference,
  useReferenceList,
} from '../referenceListStore';
import { Button } from '@/shared/ui/Button';
import { CopyButton } from '@/shared/ui/CopyButton';
import { pluralize } from '@/shared/lib/text';
import { ReferenceText } from './ReferenceText';
import panel from '@/shared/ui/Panel.module.css';
import styles from './ApaFormatter.module.css';

const SIZE_MESSAGES: Record<ListSizeStatus, string> = {
  tooFew: `Le DU demande au moins ${REFERENCES_MINIMUM} références. Continuez, vous êtes sur la bonne voie.`,
  good: `C’est dans les attentes du DU : entre ${REFERENCES_MINIMUM} et ${REFERENCES_TARGET_MAXIMUM} références.`,
  tolerated: `Vous dépassez ${REFERENCES_TARGET_MAXIMUM} références. C’est toléré jusqu’à ${REFERENCES_TOLERATED_MAXIMUM}.`,
  tooMany: `Vous dépassez ${REFERENCES_TOLERATED_MAXIMUM} références : gardez les plus utiles à votre question.`,
};

export function ReferenceListPanel() {
  const list = useReferenceList();

  if (list.length === 0) {
    return (
      <p>
        Votre liste est vide pour l’instant. Quand une référence vous convient, cliquez sur «
        Ajouter à ma liste » : elle viendra se ranger ici, par ordre alphabétique.
      </p>
    );
  }

  return (
    <div className={panel.step}>
      <p>
        <strong>{pluralize(list.length, 'référence')}.</strong>{' '}
        {SIZE_MESSAGES[listSizeStatus(list.length)]}
      </p>
      <ol className={styles.savedList}>
        {list.map((reference) => (
          <li key={reference.id} className={styles.savedItem}>
            <ReferenceText segments={formatReference(reference)} />
            <Button variant="secondary" onClick={() => removeReference(reference.id)}>
              Retirer
            </Button>
          </li>
        ))}
      </ol>
      <div className={panel.actions}>
        <CopyButton
          label="Copier toute ma liste pour Word"
          html={listToHtml(list)}
          text={listToPlainText(list)}
        />
        <Button
          variant="secondary"
          onClick={() => {
            if (window.confirm('Effacer toute votre liste sur cet appareil ?')) clearReferences();
          }}
        >
          Vider ma liste
        </Button>
      </div>
      <p className={panel.note}>
        Votre liste reste dans ce navigateur. Pensez à la copier dans votre mémoire : si vous
        changez d’appareil ou videz votre navigateur, elle disparaît.
      </p>
    </div>
  );
}
