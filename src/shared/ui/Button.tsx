import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ variant = 'primary', className, type = 'button', ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={[styles.button, className].filter(Boolean).join(' ')}
      data-variant={variant}
      {...rest}
    />
  );
}

export function LinkButton({
  to,
  variant = 'primary',
  onClick,
  children,
}: {
  to: string;
  variant?: Variant;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <Link to={to} className={styles.button} data-variant={variant} onClick={onClick}>
      {children}
    </Link>
  );
}
