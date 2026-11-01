import { course, sectionMinutes } from '@/content/course';
import { lessonKey, type Section } from '@/content/types';
import {
  isLessonRead,
  sectionCompletion,
  useProgress,
  type Progress,
} from '@/features/progress/progressStore';
import { formatDuration, pluralize } from '@/shared/lib/text';
import { LinkRow, LinkRowList } from '@/shared/ui/LinkRow';
import { Tile } from './Tile';
import styles from './Mosaic.module.css';

function statusLabel(section: Section, progress: Progress): string {
  const completion = sectionCompletion(section, progress);
  if (completion >= 1) return 'Terminé';
  if (completion <= 0) {
    return `${pluralize(section.lessons.length, 'page')}, environ ${formatDuration(sectionMinutes(section))}`;
  }
  const read = section.lessons.filter((lesson) =>
    isLessonRead(progress, lessonKey(section, lesson)),
  ).length;
  return `En cours : ${pluralize(read, 'page lue', 'pages lues')} sur ${section.lessons.length}`;
}

/** Le plan du parcours : chaque tuile se colore à mesure qu’on avance dans sa section. */
export function Mosaic() {
  const progress = useProgress();

  return (
    <LinkRowList ordered columns={2}>
      {course.map((section, index) => (
        <li key={section.id}>
          <LinkRow
            to={`/${section.slug}`}
            title={`${index + 1}. ${section.question}`}
            lead={
              <span className={styles.tile}>
                <Tile pattern={index} completion={sectionCompletion(section, progress)} />
              </span>
            }
          >
            {statusLabel(section, progress)}
          </LinkRow>
        </li>
      ))}
    </LinkRowList>
  );
}
