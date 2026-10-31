import { appear, Arrow, Card, Label, Stage } from '@/features/scene-player/kit';
import type { SceneDefinition, SceneFrame } from '@/features/scene-player/types';

type Point = readonly [number, number];

interface Tile {
  number: string;
  word: string;
  x: number;
  y: number;
}

const TILE_WIDTH = 170;
const TILE_HEIGHT = 140;

/** Le chemin serpente : la sixième tuile arrive juste sous la première. */
const TILES: readonly Tile[] = [
  { number: '1', word: 'Question', x: 24, y: 30 },
  { number: '2', word: 'Mots', x: 235, y: 30 },
  { number: '3', word: 'Outils', x: 446, y: 30 },
  { number: '4', word: 'Documents', x: 446, y: 250 },
  { number: '5', word: 'Tri', x: 235, y: 250 },
  { number: '6', word: 'Citation', x: 24, y: 250 },
];

const LINKS: readonly (readonly [Point, Point])[] = [
  [
    [198, 100],
    [231, 100],
  ],
  [
    [409, 100],
    [442, 100],
  ],
  [
    [531, 174],
    [531, 246],
  ],
  [
    [442, 320],
    [409, 320],
  ],
  [
    [231, 320],
    [198, 320],
  ],
];

function TileContent({ tile, color }: { tile: Tile; color: 'muted' | 'paper' }) {
  return (
    <>
      <Label x={tile.x + 18} y={tile.y + 56} size={40} weight={700} color={color} display>
        {tile.number}
      </Label>
      <Label x={tile.x + 18} y={tile.y + 112} size={26} weight={700} color={color}>
        {tile.word}
      </Label>
    </>
  );
}

function SixStepsVisual(frame: SceneFrame) {
  return (
    <Stage>
      {LINKS.map(([from, to], index) => (
        <g key={from.join()}>
          <Arrow from={from} to={to} color="line" />
          <Arrow from={from} to={to} progress={appear(frame, index + 1, 0, 0.4)} />
        </g>
      ))}
      {TILES.map((tile, index) => (
        <g key={tile.word}>
          <Card
            x={tile.x}
            y={tile.y}
            width={TILE_WIDTH}
            height={TILE_HEIGHT}
            stroke="line"
            corner={28}
          >
            <TileContent tile={tile} color="muted" />
          </Card>
          <Card
            x={tile.x}
            y={tile.y}
            width={TILE_WIDTH}
            height={TILE_HEIGHT}
            fill="accent"
            corner={28}
            opacity={appear(frame, index)}
          >
            <TileContent tile={tile} color="paper" />
          </Card>
        </g>
      ))}
      <Arrow from={[109, 246]} to={[109, 174]} progress={appear(frame, 6)} color="warm" width={5} />
    </Stage>
  );
}

const scene: SceneDefinition = {
  id: 'six-etapes',
  title: 'Les six étapes d’une recherche',
  steps: [
    {
      caption: 'Tout commence par votre question : que voulez-vous comprendre ?',
      durationMs: 4000,
    },
    {
      caption: 'Ensuite, vous choisissez les mots qui décrivent votre question.',
      durationMs: 4000,
    },
    {
      caption:
        'Puis vous décidez où chercher : une bibliothèque, une [[base-de-donnees|base de données]], un [[moteur-de-recherche|moteur de recherche]].',
      durationMs: 5000,
    },
    {
      caption: 'Vous repérez les documents utiles, et vous obtenez le texte complet.',
      durationMs: 4000,
    },
    {
      caption: 'Vous les triez : sont-ils fiables ? Répondent-ils à votre question ?',
      durationMs: 4000,
    },
    {
      caption: 'Enfin, vous citez dans votre mémoire ce que vous avez utilisé.',
      durationMs: 4000,
    },
    {
      caption: 'Et souvent, on revient en arrière pour ajuster. C’est tout à fait normal !',
      durationMs: 4000,
    },
  ],
  Visual: SixStepsVisual,
};

export default scene;
