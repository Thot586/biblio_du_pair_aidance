import {
  appear,
  Card,
  Label,
  lerp,
  sceneColor,
  Stage,
  type SceneColor,
} from '@/features/scene-player/kit';
import type { SceneDefinition, SceneFrame } from '@/features/scene-player/types';

const TEXT_SIZE = 24;

interface Line {
  text: string;
  y: number;
  italic?: boolean;
}

interface Block {
  tag: string;
  y: number;
  height: number;
  fill: SceneColor;
  textColor: SceneColor;
  stroke?: SceneColor;
  lines: readonly Line[];
}

const BLOCKS: readonly Block[] = [
  {
    tag: 'Qui',
    y: 18,
    height: 66,
    fill: 'soft',
    textColor: 'ink',
    lines: [{ text: 'Castro, D.', y: 60 }],
  },
  {
    tag: 'Quand',
    y: 94,
    height: 66,
    fill: 'accentSoft',
    textColor: 'ink',
    lines: [{ text: '(2020).', y: 136 }],
  },
  {
    tag: 'Quoi',
    y: 170,
    height: 66,
    fill: 'line',
    textColor: 'ink',
    lines: [{ text: 'Une brève synthèse…', y: 212 }],
  },
  {
    tag: 'Où',
    y: 246,
    height: 100,
    fill: 'accent',
    textColor: 'paper',
    lines: [
      { text: 'Le Journal des psychologues,', y: 286, italic: true },
      { text: '(374), 18-23.', y: 322 },
    ],
  },
  {
    tag: 'Lien',
    y: 356,
    height: 66,
    fill: 'paper',
    textColor: 'ink',
    stroke: 'accent',
    lines: [{ text: 'doi.org/10.3917/jdp.374.0018', y: 398 }],
  },
];

/** `Label` ne sait pas écrire en italique : il le faut pour le nom de la revue. */
function ItalicLabel({
  x,
  y,
  color,
  children,
}: {
  x: number;
  y: number;
  color: SceneColor;
  children: string;
}) {
  return (
    <text
      x={x}
      y={y}
      fill={sceneColor(color)}
      fontSize={TEXT_SIZE}
      fontWeight={600}
      fontStyle="italic"
      fontFamily="var(--font-body)"
    >
      {children}
    </text>
  );
}

function ReferenceAnatomyVisual(frame: SceneFrame) {
  return (
    <Stage>
      {BLOCKS.map((block, index) => {
        const shown = appear(frame, index);
        return (
          <g key={block.tag} opacity={shown} transform={`translate(${lerp(-24, 0, shown)} 0)`}>
            <Card x={20} y={block.y} width={110} height={block.height} fill="ink" corner={12}>
              <Label
                x={75}
                y={block.y + block.height / 2 + 9}
                anchor="middle"
                size={24}
                weight={700}
                color="paper"
              >
                {block.tag}
              </Label>
            </Card>
            <Card
              x={140}
              y={block.y}
              width={480}
              height={block.height}
              fill={block.fill}
              stroke={block.stroke}
              corner={14}
            >
              {block.lines.map((line) =>
                line.italic ? (
                  <ItalicLabel key={line.text} x={156} y={line.y} color={block.textColor}>
                    {line.text}
                  </ItalicLabel>
                ) : (
                  <Label
                    key={line.text}
                    x={156}
                    y={line.y}
                    size={TEXT_SIZE}
                    color={block.textColor}
                  >
                    {line.text}
                  </Label>
                ),
              )}
            </Card>
          </g>
        );
      })}
    </Stage>
  );
}

const scene: SceneDefinition = {
  id: 'anatomie-reference',
  title: 'Les morceaux d’une référence',
  steps: [
    {
      caption: 'Une référence répond toujours aux mêmes questions. D’abord : qui a écrit ?',
      durationMs: 5000,
    },
    {
      caption: 'Quand ? L’année vient juste après, entre parenthèses.',
      durationMs: 4000,
    },
    {
      caption: 'Quoi ? C’est le titre du document.',
      durationMs: 4000,
    },
    {
      caption: 'Où ? C’est là que le texte est paru : ici, une revue, son numéro et ses pages.',
      durationMs: 5000,
    },
    {
      caption: 'Enfin, le lien permet de le retrouver en un clic.',
      durationMs: 4000,
    },
  ],
  Visual: ReferenceAnatomyVisual,
};

export default scene;
