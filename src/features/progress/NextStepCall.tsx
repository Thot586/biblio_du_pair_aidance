import { course, courseMinutes, lessonCount } from '@/content/course';
import { formatDuration, frenchSpacing, pluralize } from '@/shared/lib/text';
import { LinkButton } from '@/shared/ui/Button';
import { findNextStep, hasStarted, readLessonCount } from './nextStep';
import { useProgress } from './progressStore';
import styles from './NextStepCall.module.css';

/** L'action principale de l'accueil : un seul bouton, qui dépend de ce qui a déjà été lu. */
export function NextStepCall() {
  const progress = useProgress();
  const step = findNextStep(progress);

  if (!step) {
    return (
      <div className={styles.call}>
        <LinkButton to="/outils">Ouvrir la boîte à outils</LinkButton>
        <p className={styles.note}>
          Vous avez terminé le parcours. Les outils restent là quand vous en avez besoin.
        </p>
      </div>
    );
  }

  if (!hasStarted(progress)) {
    return (
      <div className={styles.call}>
        <LinkButton to={step.to}>Commencer le parcours</LinkButton>
        <p className={styles.note}>
          {pluralize(course.length, 'section')}, environ {formatDuration(courseMinutes())} au total,
          à votre rythme.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.call}>
      <LinkButton to={step.to}>Continuer le parcours</LinkButton>
      <p className={styles.note}>
        {pluralize(readLessonCount(progress), 'page lue', 'pages lues')} sur {lessonCount()}. Page
        suivante : {frenchSpacing(step.label)}
      </p>
    </div>
  );
}
