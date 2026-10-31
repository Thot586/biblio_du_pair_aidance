import type { ReactNode } from 'react';
import type { SceneFrame } from './types';

/**
 * Boîte à outils pour dessiner les animations.
 * La scène fait 640 × 440 : sur un téléphone de 360 px, un texte de taille 26 reste lisible.
 * Tout dépend uniquement de la position (`frame`), jamais de CSS animé : lecture, pause et
 * retour arrière donnent donc toujours la même image.
 */
export const STAGE = { width: 640, height: 440 } as const;

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
export const easeOut = (t: number) => 1 - (1 - t) ** 3;
export const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

/** De 0 à 1 pendant l'étape `at`, restant à 1 ensuite. `from` et `to` découpent l'étape. */
export function appear(frame: SceneFrame, at: number, from = 0, to = 0.6): number {
  if (frame.step > at) return 1;
  if (frame.step < at) return 0;
  return easeOut(clamp01((frame.progress - from) / (to - from)));
}

/** Vaut 1 uniquement pendant les étapes indiquées, avec un fondu à l'entrée. */
export function during(frame: SceneFrame, steps: readonly number[]): number {
  if (!steps.includes(frame.step)) return 0;
  return steps[0] === frame.step ? easeOut(clamp01(frame.progress / 0.4)) : 1;
}

export function typed(text: string, t: number): string {
  return text.slice(0, Math.round(text.length * clamp01(t)));
}

export function Stage({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox={`0 0 ${STAGE.width} ${STAGE.height}`}
      aria-hidden="true"
      focusable="false"
      style={{ display: 'block', width: '100%', height: 'auto' }}
    >
      <rect width={STAGE.width} height={STAGE.height} fill="var(--scene-bg)" />
      {children}
    </svg>
  );
}

export type SceneColor =
  'ink' | 'muted' | 'accent' | 'warm' | 'paper' | 'soft' | 'accentSoft' | 'line';

const COLOR_VARIABLES: Record<SceneColor, string> = {
  ink: 'var(--scene-ink)',
  muted: 'var(--scene-muted)',
  accent: 'var(--scene-accent)',
  warm: 'var(--scene-warm)',
  paper: 'var(--scene-paper)',
  soft: 'var(--scene-soft)',
  accentSoft: 'var(--scene-accent-soft)',
  line: 'var(--scene-line)',
};

export const sceneColor = (color: SceneColor) => COLOR_VARIABLES[color];

interface LabelProps {
  x: number;
  y: number;
  children: string;
  size?: number;
  weight?: number;
  color?: SceneColor;
  anchor?: 'start' | 'middle' | 'end';
  opacity?: number;
  display?: boolean;
}

export function Label({
  x,
  y,
  children,
  size = 26,
  weight = 600,
  color = 'ink',
  anchor = 'start',
  opacity = 1,
  display = false,
}: LabelProps) {
  return (
    <text
      x={x}
      y={y}
      fill={sceneColor(color)}
      fontSize={size}
      fontWeight={weight}
      fontFamily={display ? 'var(--font-display)' : 'var(--font-body)'}
      textAnchor={anchor}
      opacity={opacity}
    >
      {children}
    </text>
  );
}

interface LinesProps extends Omit<LabelProps, 'children'> {
  lines: readonly string[];
  lineHeight?: number;
}

export function Lines({ lines, lineHeight = 1.25, size = 26, y, ...rest }: LinesProps) {
  return (
    <>
      {lines.map((line, index) => (
        <Label key={line} y={y + index * size * lineHeight} size={size} {...rest}>
          {line}
        </Label>
      ))}
    </>
  );
}

interface CardProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: SceneColor;
  stroke?: SceneColor;
  strokeWidth?: number;
  /** Rayon du coin haut droit, comme les quarts de cercle de la mosaïque. */
  corner?: number;
  opacity?: number;
  children?: ReactNode;
}

export function Card({
  x,
  y,
  width,
  height,
  fill = 'paper',
  stroke,
  strokeWidth = 2,
  corner = 18,
  opacity = 1,
  children,
}: CardProps) {
  const path = `M${x} ${y}h${width - corner}a${corner} ${corner} 0 0 1 ${corner} ${corner}v${height - corner}h${-width}z`;
  return (
    <g opacity={opacity}>
      <path
        d={path}
        fill={sceneColor(fill)}
        stroke={stroke ? sceneColor(stroke) : 'none'}
        strokeWidth={strokeWidth}
      />
      {children}
    </g>
  );
}

interface ArrowProps {
  from: readonly [number, number];
  to: readonly [number, number];
  progress?: number;
  color?: SceneColor;
  width?: number;
}

export function Arrow({ from, to, progress = 1, color = 'accent', width = 4 }: ArrowProps) {
  if (progress <= 0) return null;
  const [x1, y1] = from;
  const x2 = lerp(x1, to[0], progress);
  const y2 = lerp(y1, to[1], progress);
  const angle = Math.atan2(to[1] - y1, to[0] - x1);
  const head = 13;
  const wing = (offset: number) =>
    `${x2 - head * Math.cos(angle + offset)} ${y2 - head * Math.sin(angle + offset)}`;
  return (
    <g stroke={sceneColor(color)} strokeWidth={width} strokeLinecap="round" fill="none">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      <path d={`M${wing(0.5)}L${x2} ${y2}L${wing(-0.5)}`} strokeLinejoin="round" />
    </g>
  );
}

/** Pointeur de souris, pour les visites d'écran. */
export function Pointer({ x, y, pressed = false }: { x: number; y: number; pressed?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${pressed ? 0.9 : 1.05})`}>
      <path
        d="M0 0v26l7-6 5 11 6-3-5-10h9z"
        fill="var(--scene-ink)"
        stroke="var(--scene-paper)"
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </g>
  );
}

/** Cadre qui se dessine autour d'un bouton ou d'un champ à repérer. */
export function Marker({
  x,
  y,
  width,
  height,
  progress = 1,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  progress?: number;
}) {
  const perimeter = 2 * (width + height);
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={6}
      fill="none"
      stroke="var(--scene-warm)"
      strokeWidth={4}
      strokeDasharray={perimeter}
      strokeDashoffset={perimeter * (1 - clamp01(progress))}
    />
  );
}

interface BrowserProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  address: string;
  children: ReactNode;
}

/** Fenêtre de navigateur redessinée : un site simplifié, pas une capture. */
export function Browser({
  x = 20,
  y = 20,
  width = 600,
  height = 400,
  address,
  children,
}: BrowserProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={10}
        fill="var(--scene-paper)"
        stroke="var(--scene-line)"
        strokeWidth={2}
      />
      <path
        d={`M${x + 10} ${y}h${width - 20}a10 10 0 0 1 10 10v30h${-width}v-30a10 10 0 0 1 10-10z`}
        fill="var(--scene-line)"
        opacity={0.45}
      />
      <rect x={x + 16} y={y + 9} width={width - 32} height={23} rx={11} fill="var(--scene-paper)" />
      <Label x={x + 30} y={y + 26} size={15} weight={500} color="muted">
        {address}
      </Label>
      {children}
    </g>
  );
}

/** Champ de saisie, avec du texte en train de s'écrire. */
export function SearchField({
  x,
  y,
  width,
  height = 44,
  text,
  size = 20,
}: {
  x: number;
  y: number;
  width: number;
  height?: number;
  text: string;
  size?: number;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={6}
        fill="var(--scene-bg)"
        stroke="var(--scene-line)"
        strokeWidth={2}
      />
      <Label x={x + 12} y={y + height / 2 + size * 0.35} size={size} weight={500}>
        {text}
      </Label>
    </g>
  );
}

/** Quart de cercle : la forme de base de la mosaïque, utile comme repère visuel. */
export function QuarterTile({
  x,
  y,
  size,
  color = 'accent',
  opacity = 1,
}: {
  x: number;
  y: number;
  size: number;
  color?: SceneColor;
  opacity?: number;
}) {
  return (
    <path
      d={`M${x} ${y + size}a${size} ${size} 0 0 1 ${size} ${-size}v${size}z`}
      fill={sceneColor(color)}
      opacity={opacity}
    />
  );
}
