import type { CalloutTone } from '@/content/types';
import { InlineText } from './InlineText';
import styles from './Callout.module.css';

const SHAPES: Record<CalloutTone, string> = {
  tip: 'M12 2a10 10 0 1 1 0 20a10 10 0 0 1 0-20z',
  warning: 'M12 2l11 20H1z',
  example: 'M2 2h20v20H2z',
  rule: 'M2 22A20 20 0 0 1 22 2v20z',
};

const TONE_NAMES: Record<CalloutTone, string> = {
  tip: 'Astuce',
  warning: 'Attention',
  example: 'Exemple',
  rule: 'Règle',
};

interface CalloutProps {
  tone: CalloutTone;
  title: string;
  text: string | readonly string[];
}

export function Callout({ tone, title, text }: CalloutProps) {
  const paragraphs = typeof text === 'string' ? [text] : text;
  return (
    <aside className={styles.callout} data-tone={tone} aria-label={TONE_NAMES[tone]}>
      <svg className={styles.shape} viewBox="0 0 24 24" aria-hidden="true">
        <path d={SHAPES[tone]} />
      </svg>
      <div className={styles.body}>
        <p className={styles.title}>{title}</p>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>
            <InlineText text={paragraph} />
          </p>
        ))}
      </div>
    </aside>
  );
}
