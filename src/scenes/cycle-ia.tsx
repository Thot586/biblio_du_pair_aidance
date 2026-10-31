import { appear, Arrow, Card, during, Label, Marker, Stage } from '@/features/scene-player/kit';
import type { SceneDefinition, SceneFrame } from '@/features/scene-player/types';

const TILE_WIDTH = 150;
const TILE_HEIGHT = 60;
const LAST_STEP = 6;

interface Tile {
  text: string;
  /** Centre de la tuile, sur une ellipse autour de la carte « Vous ». */
  x: number;
  y: number;
  arrowFrom: readonly [number, number];
  arrowTo: readonly [number, number];
}

const TILES: readonly Tile[] = [
  { text: 'Idées', x: 320, y: 55, arrowFrom: [320, 90], arrowTo: [320, 154] },
  { text: 'Recherche', x: 523, y: 137, arrowFrom: [446, 160], arrowTo: [406, 190] },
  { text: 'Lecture', x: 523, y: 303, arrowFrom: [446, 280], arrowTo: [406, 250] },
  { text: 'Plan', x: 320, y: 385, arrowFrom: [320, 350], arrowTo: [320, 286] },
  { text: 'Rédaction', x: 117, y: 303, arrowFrom: [194, 280], arrowTo: [234, 250] },
  { text: 'Correction', x: 117, y: 137, arrowFrom: [194, 160], arrowTo: [234, 190] },
];

function CycleVisual(frame: SceneFrame) {
  return (
    <Stage>
      {TILES.map((tile, index) => {
        const lit = appear(frame, index);
        const active = during(frame, [index]);
        const card = {
          x: tile.x - TILE_WIDTH / 2,
          y: tile.y - TILE_HEIGHT / 2,
          width: TILE_WIDTH,
          height: TILE_HEIGHT,
          corner: 14,
        };
        return (
          <g key={tile.text}>
            <Card {...card} stroke="line" />
            <Card {...card} fill="accentSoft" opacity={lit} />
            <Card {...card} fill="accent" opacity={active} />
            <Label
              x={tile.x}
              y={tile.y + 9}
              anchor="middle"
              size={22}
              weight={700}
              opacity={1 - active}
            >
              {tile.text}
            </Label>
            <Label
              x={tile.x}
              y={tile.y + 9}
              anchor="middle"
              size={22}
              weight={700}
              color="paper"
              opacity={active}
            >
              {tile.text}
            </Label>
            <Arrow
              from={tile.arrowFrom}
              to={tile.arrowTo}
              progress={appear(frame, index, 0.3, 0.9)}
            />
          </g>
        );
      })}
      <Card x={240} y={160} width={160} height={120} fill="ink" corner={22}>
        <Label x={320} y={236} anchor="middle" size={44} weight={700} color="paper" display>
          Vous
        </Label>
      </Card>
      <Marker x={232} y={152} width={176} height={136} progress={appear(frame, LAST_STEP)} />
    </Stage>
  );
}

const scene: SceneDefinition = {
  id: 'cycle-ia',
  title: 'L’IA à chaque étape, et vous au centre',
  steps: [
    {
      caption: 'Vous pouvez vous faire aider pour trouver des idées.',
      durationMs: 4000,
    },
    {
      caption: 'L’IA peut vous aider à repérer des articles. À vous de vérifier qu’ils existent.',
      durationMs: 5000,
    },
    {
      caption: 'Elle peut résumer un texte. Lisez vous-même ceux qui comptent vraiment.',
      durationMs: 4000,
    },
    {
      caption: 'Elle peut proposer un plan. C’est vous qui décidez de votre fil conducteur.',
      durationMs: 5000,
    },
    {
      caption: 'Elle peut vous aider à reformuler. Le texte final doit rester le vôtre.',
      durationMs: 4000,
    },
    {
      caption: 'Elle peut corriger votre français. Vous acceptez ou refusez chaque correction.',
      durationMs: 5000,
    },
    {
      caption: 'À chaque étape, vous gardez la main : vous vérifiez, vous ajustez, vous décidez.',
      durationMs: 5000,
    },
  ],
  Visual: CycleVisual,
};

export default scene;
