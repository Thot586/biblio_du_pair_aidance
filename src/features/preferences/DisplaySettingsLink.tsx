import type { ReactNode } from 'react';
import { openDisplaySettings } from './displaySettings';
import styles from './DisplaySettingsLink.module.css';

/** Un bouton qui se lit comme un lien dans une phrase : il ouvre la fenêtre « Affichage ». */
export function DisplaySettingsLink({ children }: { children: ReactNode }) {
  return (
    <button type="button" className={styles.link} onClick={openDisplaySettings}>
      {children}
    </button>
  );
}
