import {
  appear,
  Card,
  Label,
  Marker,
  Stage,
  typed,
  type SceneColor,
} from '@/features/scene-player/kit';
import type { SceneDefinition, SceneFrame } from '@/features/scene-player/types';

const TILE_SIZE = 66;
const TILE_LEFT = 24;
const LINE_LEFT = 110;

interface Row {
  letter: string;
  text: string;
  y: number;
  fill: SceneColor;
  textColor: SceneColor;
}

const ROWS: readonly Row[] = [
  { letter: 'A', text: 'Propose-moi des mots-clés.', y: 31, fill: 'accent', textColor: 'paper' },
  { letter: 'C', text: 'Mémoire sur la pair-aidance.', y: 109, fill: 'warm', textColor: 'paper' },
  { letter: 'T', text: 'Emploie un langage simple.', y: 187, fill: 'soft', textColor: 'ink' },
  {
    letter: 'I',
    text: 'Agis comme un documentaliste.',
    y: 265,
    fill: 'accentSoft',
    textColor: 'ink',
  },
  { letter: 'F', text: 'Présente-les dans un tableau.', y: 343, fill: 'line', textColor: 'ink' },
];

function ActifVisual(frame: SceneFrame) {
  return (
    <Stage>
      {ROWS.map((row, index) => {
        const lit = appear(frame, index, 0, 0.3);
        const tile = { x: TILE_LEFT, y: row.y, width: TILE_SIZE, height: TILE_SIZE, corner: 14 };
        const letterX = TILE_LEFT + TILE_SIZE / 2;
        const letterY = row.y + 45;
        return (
          <g key={row.letter}>
            <Card {...tile} stroke="line" />
            <Card {...tile} fill={row.fill} opacity={lit} />
            <Label
              x={letterX}
              y={letterY}
              anchor="middle"
              size={34}
              weight={700}
              color="muted"
              opacity={1 - lit}
              display
            >
              {row.letter}
            </Label>
            <Label
              x={letterX}
              y={letterY}
              anchor="middle"
              size={34}
              weight={700}
              color={row.textColor}
              opacity={lit}
              display
            >
              {row.letter}
            </Label>
            <Card
              x={LINE_LEFT}
              y={row.y}
              width={510}
              height={TILE_SIZE}
              fill={row.fill}
              corner={14}
              opacity={lit}
            >
              <Label x={LINE_LEFT + 16} y={row.y + 42} size={22} color={row.textColor}>
                {typed(row.text, appear(frame, index, 0.2, 0.95))}
              </Label>
            </Card>
          </g>
        );
      })}
      <Marker x={102} y={23} width={526} height={394} progress={appear(frame, 5, 0, 0.7)} />
    </Stage>
  );
}

const scene: SceneDefinition = {
  id: 'actif',
  title: 'La méthode ACTIF',
  steps: [
    {
      caption: 'A comme Action : que voulez-vous obtenir ? Par exemple, des mots-clés.',
      durationMs: 4000,
    },
    {
      caption: 'C comme Contexte : parlez de votre mémoire et de votre question.',
      durationMs: 4000,
    },
    {
      caption: 'T comme Tonalité : demandez un langage simple, par exemple.',
      durationMs: 4000,
    },
    {
      caption: 'I comme Identité : donnez un rôle à l’IA, comme celui de documentaliste.',
      durationMs: 4000,
    },
    {
      caption: 'F comme Format : précisez la forme attendue, par exemple un tableau.',
      durationMs: 4000,
    },
    {
      caption: 'Votre demande est prête. Vérifiez qu’elle ne contient aucune donnée sensible.',
      durationMs: 5000,
    },
  ],
  Visual: ActifVisual,
};

export default scene;
