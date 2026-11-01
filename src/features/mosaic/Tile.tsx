type PieceShape =
  | 'quarterTopLeft'
  | 'quarterTopRight'
  | 'quarterBottomLeft'
  | 'quarterBottomRight'
  | 'triangleTopLeft'
  | 'triangleTopRight'
  | 'triangleBottomLeft'
  | 'triangleBottomRight'
  | 'halfTop'
  | 'halfBottom'
  | 'circle'
  | 'square';

type PieceColor = 'a' | 'b' | 'c';

const PIECE_PATHS: Record<PieceShape, string> = {
  quarterTopLeft: 'M0 50A50 50 0 0 1 50 0V50Z',
  quarterTopRight: 'M0 0A50 50 0 0 1 50 50H0Z',
  quarterBottomLeft: 'M0 0H50A50 50 0 0 1 0 50Z',
  quarterBottomRight: 'M50 0V50H0A50 50 0 0 1 50 0Z',
  triangleTopLeft: 'M0 0H50L0 50Z',
  triangleTopRight: 'M0 0H50V50Z',
  triangleBottomLeft: 'M0 0V50H50Z',
  triangleBottomRight: 'M50 0V50H0Z',
  halfTop: 'M0 50A25 25 0 0 1 50 50Z',
  halfBottom: 'M0 0A25 25 0 0 0 50 0Z',
  circle: 'M25 0A25 25 0 1 1 25 50A25 25 0 1 1 25 0Z',
  square: 'M0 0H50V50H0Z',
};

type Piece = readonly [PieceShape, PieceColor];

/** Chaque section a son dessin, inspiré des tuiles de la charte du Vinatier. */
export const TILE_PATTERNS: readonly (readonly [Piece, Piece, Piece, Piece])[] = [
  [
    ['quarterTopLeft', 'b'],
    ['triangleTopLeft', 'a'],
    ['circle', 'c'],
    ['quarterBottomRight', 'a'],
  ],
  [
    ['halfBottom', 'a'],
    ['quarterTopRight', 'c'],
    ['triangleBottomRight', 'b'],
    ['halfTop', 'a'],
  ],
  [
    ['square', 'c'],
    ['quarterBottomLeft', 'b'],
    ['quarterTopRight', 'a'],
    ['triangleTopRight', 'c'],
  ],
  [
    ['triangleBottomLeft', 'a'],
    ['circle', 'b'],
    ['halfTop', 'c'],
    ['quarterTopLeft', 'a'],
  ],
  [
    ['quarterBottomRight', 'c'],
    ['square', 'a'],
    ['circle', 'b'],
    ['triangleTopLeft', 'c'],
  ],
  [
    ['circle', 'a'],
    ['quarterTopLeft', 'b'],
    ['quarterBottomLeft', 'c'],
    ['halfBottom', 'b'],
  ],
  [
    ['triangleTopRight', 'b'],
    ['halfBottom', 'c'],
    ['square', 'a'],
    ['quarterTopRight', 'b'],
  ],
];

const CELL_ORIGINS = [
  [0, 0],
  [50, 0],
  [0, 50],
  [50, 50],
] as const;

/** Nombre de pièces colorées pour une part parcourue : une pièce dès le premier pas. */
export function filledPieces(completion: number): number {
  if (completion <= 0) return 0;
  if (completion >= 1) return 4;
  return Math.max(1, Math.min(3, Math.floor(completion * 4)));
}

interface TileProps {
  pattern: number;
  /** Part parcourue, entre 0 et 1. */
  completion: number;
}

export function Tile({ pattern, completion }: TileProps) {
  const pieces = TILE_PATTERNS[pattern % TILE_PATTERNS.length] ?? TILE_PATTERNS[0];
  const filled = filledPieces(completion);
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false" style={{ display: 'block' }}>
      {pieces?.map(([shape, color], index) => {
        const [x, y] = CELL_ORIGINS[index] ?? [0, 0];
        return (
          <path
            key={`${shape}-${index}`}
            transform={`translate(${x} ${y})`}
            d={PIECE_PATHS[shape]}
            fill={`var(--tile-${color})`}
            opacity={index < filled ? 1 : 0.2}
          />
        );
      })}
    </svg>
  );
}
