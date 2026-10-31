import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { findGlossaryEntry } from '@/content/glossary';
import { bubblePosition } from './bubblePosition';
import { InlineText } from './InlineText';
import { stripInline } from './inlineText/parseInline';
import styles from './Term.module.css';

type TermMode = 'closed' | 'preview' | 'detail';

const CLOSE_DELAY_MS = 180;

/**
 * Un mot technique. Survol ou clavier : l’explication courte.
 * Clic ou toucher : le détail, puis le lien vers le glossaire.
 */
export function Term({ id, label }: { id: string; label?: string | undefined }) {
  const entry = findGlossaryEntry(id);
  const [mode, setMode] = useState<TermMode>('closed');
  const root = useRef<HTMLSpanElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const bubble = useRef<HTMLSpanElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const bubbleId = useId();

  const place = useCallback(() => {
    if (!trigger.current || !bubble.current) return;
    const { left, top } = bubblePosition(
      trigger.current.getBoundingClientRect(),
      { width: bubble.current.offsetWidth, height: bubble.current.offsetHeight },
      { width: window.innerWidth, height: window.innerHeight },
    );
    bubble.current.style.left = `${left}px`;
    bubble.current.style.top = `${top}px`;
  }, []);

  const cancelClose = () => window.clearTimeout(closeTimer.current);

  const openPreview = () => {
    cancelClose();
    setMode((current) => (current === 'closed' ? 'preview' : current));
  };

  const closePreviewSoon = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(
      () => setMode((current) => (current === 'preview' ? 'closed' : current)),
      CLOSE_DELAY_MS,
    );
  };

  const toggleDetail = () => {
    cancelClose();
    setMode((current) => (current === 'detail' ? 'closed' : 'detail'));
  };

  // La taille de la bulle dépend de son contenu : on la mesure avant de l’afficher à l’écran.
  useLayoutEffect(() => place(), [mode, place]);

  useEffect(() => {
    if (mode === 'closed') return undefined;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMode('closed');
    };
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setMode('closed');
    };
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOnOutsideClick);
    window.addEventListener('scroll', place, true);
    window.addEventListener('resize', place);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      window.removeEventListener('scroll', place, true);
      window.removeEventListener('resize', place);
    };
  }, [mode, place]);

  useEffect(() => cancelClose, []);

  if (!entry) return <>{label ?? id}</>;

  return (
    <span
      ref={root}
      className={styles.term}
      onPointerEnter={(event) => event.pointerType === 'mouse' && openPreview()}
      onPointerLeave={(event) => event.pointerType === 'mouse' && closePreviewSoon()}
    >
      <button
        ref={trigger}
        type="button"
        className={styles.trigger}
        aria-expanded={mode === 'detail'}
        aria-describedby={mode === 'closed' ? undefined : bubbleId}
        onClick={toggleDetail}
        onFocus={openPreview}
        onBlur={closePreviewSoon}
      >
        {label ?? entry.term}
      </button>
      {mode !== 'closed' && (
        <span ref={bubble} id={bubbleId} className={styles.bubble}>
          <strong className={styles.bubbleTerm}>{entry.term}</strong>
          <span>{stripInline(entry.definition)}</span>
          {mode === 'preview' ? (
            <span className={styles.hint}>Cliquez pour en savoir plus.</span>
          ) : (
            <>
              <span>
                <InlineText text={entry.detail} />
              </span>
              <Link to={`/glossaire#${entry.id}`} className={styles.more}>
                Voir tout le glossaire
              </Link>
            </>
          )}
        </span>
      )}
    </span>
  );
}
