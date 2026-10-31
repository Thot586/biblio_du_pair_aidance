import {
  appear,
  Arrow,
  Card,
  Label,
  SearchField,
  Stage,
  sceneColor,
  typed,
} from '@/features/scene-player/kit';
import type { SceneDefinition, SceneFrame } from '@/features/scene-player/types';

interface Pill {
  step: number;
  text: string;
  x: number;
  rowY: number;
  width: number;
}

const ROWS = [140, 205, 270, 335] as const;

/** Mots surlignés : éparpillés à la première étape, côte à côte à la deuxième. */
const PILLS: readonly Pill[] = [
  { step: 0, text: 'partagé', x: 340, rowY: 140, width: 116 },
  { step: 0, text: 'secret', x: 120, rowY: 270, width: 100 },
  { step: 1, text: 'secret partagé', x: 200, rowY: 205, width: 196 },
];

const TAGS = [
  { end: 'e', y: 110 },
  { end: 'ie', y: 190 },
  { end: 'ique', y: 270 },
] as const;

const STEM = 'psychiatr';

function searchText(frame: SceneFrame): string {
  if (frame.step >= 2) return typed(`${STEM}*`, appear(frame, 2, 0, 0.5));
  if (frame.step === 1) return typed('"secret partagé"', appear(frame, 1, 0, 0.5));
  return typed('secret partagé', appear(frame, 0, 0, 0.5));
}

/** Le mot en deux couleurs : `Label` n'en porte qu'une. */
function SplitWord({ x, y, size, end }: { x: number; y: number; size: number; end: string }) {
  return (
    <text
      x={x}
      y={y}
      fill={sceneColor('ink')}
      fontSize={size}
      fontWeight={700}
      fontFamily="var(--font-body)"
    >
      <tspan>{STEM}</tspan>
      <tspan fill={sceneColor('warm')}>{end}</tspan>
    </text>
  );
}

function QuotesAsteriskVisual(frame: SceneFrame) {
  const documentShown = 1 - appear(frame, 2, 0, 0.3);
  const wildcard = appear(frame, 2, 0.3, 0.7);
  return (
    <Stage>
      <SearchField x={40} y={24} width={560} height={56} size={24} text={searchText(frame)} />

      <Card x={40} y={100} width={560} height={296} stroke="line" opacity={documentShown}>
        {ROWS.map((rowY) => (
          <rect key={rowY} x={72} y={rowY - 6} width={496} height={12} fill={sceneColor('line')} />
        ))}
        {PILLS.map((pill) => (
          <g
            key={pill.text}
            opacity={frame.step === pill.step ? appear(frame, pill.step, 0.55, 0.95) : 0}
          >
            <rect
              x={pill.x}
              y={pill.rowY - 21}
              width={pill.width}
              height={42}
              rx={6}
              fill={sceneColor('accentSoft')}
            />
            <Label
              x={pill.x + pill.width / 2}
              y={pill.rowY + 8}
              anchor="middle"
              size={22}
              weight={700}
            >
              {pill.text}
            </Label>
          </g>
        ))}
      </Card>

      <g opacity={wildcard}>
        <SplitWord x={24} y={236} size={38} end="*" />
      </g>
      {TAGS.map((tag, index) => {
        const start = index * 0.2;
        const shown = appear(frame, 3, start, start + 0.4);
        return (
          <g key={tag.end}>
            <Arrow from={[264, 222]} to={[348, tag.y + 32]} progress={shown} />
            <Card
              x={356}
              y={tag.y}
              width={260}
              height={64}
              stroke="line"
              corner={14}
              opacity={shown}
            >
              <SplitWord x={376} y={tag.y + 42} size={26} end={tag.end} />
            </Card>
          </g>
        );
      })}
    </Stage>
  );
}

const scene: SceneDefinition = {
  id: 'guillemets-asterisque',
  title: 'Guillemets et astérisque',
  steps: [
    {
      caption: 'Sans guillemets, l’outil peut trouver vos mots éparpillés dans le document.',
      durationMs: 4000,
    },
    {
      caption: 'Avec des guillemets, il cherche ces mots collés, dans cet ordre.',
      durationMs: 4000,
    },
    {
      caption: 'L’astérisque, lui, remplace la fin d’un mot.',
      durationMs: 4000,
    },
    {
      caption: 'Ainsi, psychiatr* trouve psychiatre, psychiatrie et psychiatrique.',
      durationMs: 4000,
    },
  ],
  Visual: QuotesAsteriskVisual,
};

export default scene;
