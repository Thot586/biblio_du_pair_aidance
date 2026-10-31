import { useCallback, useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router';
import { findGlossaryEntry } from '@/content/glossary';
import { InlineText } from './InlineText';
import { stripInline } from './inlineText/parseInline';
import styles from './Term.module.css';

type TermMode = 'closed' | 'preview' | 'detail';

const BUBBLE_WIDTH_REM = 20;
const VIEWPORT_MARGIN_PX = 16;
const GAP_PX = 6;
const CLOSE_DELAY_MS = 180;

function bubblePosition(trigger: DOMRect): CSSProperties {
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const width = Math.min(BUBBLE_WIDTH_REM * rem, window.innerWidth - 2 * VIEWPORT_MARGIN_PX);
  const left = Math.max(
    VIEWPORT_MARGIN_PX,
    Math.min(trigger.left, window.innerWidth - VIEWPORT_MARGIN_PX - width),
  );
  const spaceBelow = window.innerHeight - trigger.bottom;
  const openAbove = spaceBelow < 200 && trigger.top > spaceBelow;
  return openAbove
    ? { left, width, bottom: window.innerHeight - trigger.top + GAP_PX }
    : { left, width, top: trigger.bottom + GAP_PX };
}

/**
 * Un mot technique. Survol ou clavier : l'explication courte.
 * Clic ou toucher : le détail, puis le lien vers le glossaire.
 */
export function Term({ id, label }: { id: string; label?: string | undefined }) {
  const entry = findGlossaryEntry(id);
  const [mode, setMode] = useState<TermMode>('closed');
  const [position, setPosition] = useState<CSSProperties>({});
  const root = useRef<HTMLSpanElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const bubbleId = useId();

  const place = useCallback(() => {
    if (trigger.current) setPosition(bubblePosition(trigger.current.getBoundingClientRect()));
  }, []);

  const cancelClose = () => window.clearTimeout(closeTimer.current);

  const openPreview = () => {
    cancelClose();
    place();
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
    place();
    setMode((current) => (current === 'detail' ? 'closed' : 'detail'));
  };

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
        <span id={bubbleId} className={styles.bubble} style={position}>
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
