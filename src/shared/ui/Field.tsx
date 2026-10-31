import { useId, type ReactNode } from 'react';
import styles from './Field.module.css';

interface FieldProps {
  label: ReactNode;
  hint?: ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  type?: 'text' | 'url' | 'email';
  inputMode?: 'text' | 'numeric' | 'url';
  autoComplete?: string;
}

export function Field({
  label,
  hint,
  value,
  onChange,
  placeholder,
  multiline = false,
  type = 'text',
  inputMode,
  autoComplete = 'off',
}: FieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-aide` : undefined;

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      {multiline ? (
        <textarea
          id={id}
          className={styles.input}
          value={value}
          rows={3}
          placeholder={placeholder}
          aria-describedby={hintId}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          id={id}
          className={styles.input}
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          value={value}
          placeholder={placeholder}
          aria-describedby={hintId}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </div>
  );
}
