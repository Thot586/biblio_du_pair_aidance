import { Link } from 'react-router';
import { course } from '@/content/course';
import { sectionCompletion, useProgress } from '@/features/progress/progressStore';
import { frenchSpacing } from '@/shared/lib/text';
import { Tile } from './Tile';
import styles from './Mosaic.module.css';

function statusLabel(completion: number): string {
  if (completion <= 0) return 'À découvrir';
  return completion >= 1 ? 'Terminé' : 'En cours';
}

/** La carte du site : chaque tuile se colore à mesure qu’on parcourt la section. */
export function Mosaic() {
  const progress = useProgress();

  return (
    <ul className={styles.mosaic}>
      {course.map((section, index) => {
        const completion = sectionCompletion(section, progress);
        return (
          <li key={section.id} className={styles.cell}>
            <Link to={`/${section.slug}`} className={styles.link}>
              <span className={styles.tile}>
                <Tile pattern={index} completion={completion} />
              </span>
              <span className={styles.question}>{frenchSpacing(section.question)}</span>
              <span className={styles.status}>{statusLabel(completion)}</span>
            </Link>
          </li>
        );
      })}
      <li className={styles.cell}>
        <Link to="/outils" className={styles.link}>
          <span className={styles.tile}>
            <Tile pattern={course.length} completion={1} alwaysFull />
          </span>
          <span className={styles.question}>{frenchSpacing('Où retrouver tous les outils ?')}</span>
          <span className={styles.status}>Boîte à outils</span>
        </Link>
      </li>
    </ul>
  );
}
