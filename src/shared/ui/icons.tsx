import type { ReactNode } from 'react';

interface IconProps {
  className?: string | undefined;
}

function Icon({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {children}
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </Icon>
  );
}

export function ChevronIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="m9 5 7 7-7 7" />
    </Icon>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="m5 13 4 4 10-10" />
    </Icon>
  );
}
