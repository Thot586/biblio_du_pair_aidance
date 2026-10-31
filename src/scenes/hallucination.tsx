import {
  appear,
  Card,
  during,
  Label,
  Marker,
  sceneColor,
  Stage,
} from '@/features/scene-player/kit';
import type { SceneDefinition, SceneFrame } from '@/features/scene-player/types';

const ROW_X = 40;
const ROW_WIDTH = 560;
const ROW_HEIGHT = 74;
const MARK_X = 552;

type Verdict = 'found' | 'invented' | 'doubtful';

interface Row {
  name: string;
  y: number;
  verdict: Verdict;
}

const ROWS: readonly Row[] = [
  { name: 'Article A', y: 104, verdict: 'found' },
  { name: 'Article B', y: 182, verdict: 'invented' },
  { name: 'Article C', y: 260, verdict: 'doubtful' },
];

/** Coche, croix ou point d'interrogation : la forme dit le verdict, pas seulement la couleur. */
function VerdictMark({ verdict, y, opacity }: { verdict: Verdict; y: number; opacity: number }) {
  const stroke = {
    stroke: sceneColor('paper'),
    strokeWidth: 6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'none',
  } as const;
  const fill = sceneColor(
    verdict === 'found' ? 'accent' : verdict === 'invented' ? 'warm' : 'muted',
  );
  return (
    <g opacity={opacity}>
      <circle cx={MARK_X} cy={y} r={27} fill={fill} />
      {verdict === 'found' && <path d={`M${MARK_X - 12} ${y}l9 10 16-20`} {...stroke} />}
      {verdict === 'invented' && (
        <path d={`M${MARK_X - 10} ${y - 10}l20 20m0-20l-20 20`} {...stroke} />
      )}
      {verdict === 'doubtful' && (
        <Label x={MARK_X} y={y + 13} anchor="middle" size={36} weight={700} color="paper">
          ?
        </Label>
      )}
    </g>
  );
}

function HallucinationVisual(frame: SceneFrame) {
  return (
    <Stage>
      <Label x={296} y={56} anchor="end" size={20} weight={700} color="muted">
        Sam
      </Label>
      <Card
        x={310}
        y={18}
        width={310}
        height={60}
        fill="accent"
        corner={16}
        opacity={appear(frame, 0)}
      >
        <Label x={328} y={56} size={22} color="paper">
          Trois articles ?
        </Label>
      </Card>
      <Card
        x={20}
        y={92}
        width={600}
        height={252}
        fill="soft"
        corner={16}
        opacity={appear(frame, 1, 0, 0.3)}
      >
        <Label x={36} y={84} size={20} weight={700} color="muted">
          IA
        </Label>
        {ROWS.map((row, index) => {
          const shown = appear(frame, 1, 0.1 + index * 0.2, 0.4 + index * 0.2);
          return (
            <g key={row.name} opacity={shown}>
              <Label x={ROW_X + 8} y={row.y + 28} size={26} weight={700}>
                {row.name}
              </Label>
              <rect
                x={ROW_X + 8}
                y={row.y + 42}
                width={380}
                height={10}
                rx={3}
                fill={sceneColor('line')}
              />
              <rect
                x={ROW_X + 8}
                y={row.y + 58}
                width={260}
                height={10}
                rx={3}
                fill={sceneColor('line')}
              />
            </g>
          );
        })}
      </Card>
      {ROWS.map((row, index) => (
        <g key={row.name}>
          <VerdictMark
            verdict={row.verdict}
            y={row.y + ROW_HEIGHT / 2}
            opacity={appear(frame, index + 2, 0.3, 0.7)}
          />
          <g opacity={during(frame, [index + 2])}>
            <Marker
              x={ROW_X - 8}
              y={row.y - 2}
              width={ROW_WIDTH + 16}
              height={ROW_HEIGHT + 4}
              progress={appear(frame, index + 2, 0, 0.5)}
            />
          </g>
        </g>
      ))}
      <Card
        x={20}
        y={358}
        width={600}
        height={64}
        fill="accent"
        corner={16}
        opacity={appear(frame, 5)}
      >
        <Label x={320} y={400} anchor="middle" size={28} weight={700} color="paper" display>
          On vérifie, et on lit
        </Label>
      </Card>
    </Stage>
  );
}

const scene: SceneDefinition = {
  id: 'hallucination',
  title: 'La fausse référence',
  steps: [
    { caption: 'Sam demande à une IA trois articles sur son sujet.', durationMs: 4000 },
    { caption: 'L’IA répond avec assurance : auteurs, titre, revue, année.', durationMs: 4000 },
    { caption: 'Sam vérifie le premier article : il existe bien.', durationMs: 4000 },
    {
      caption:
        'Le deuxième est introuvable. Il a été inventé, et il semblait pourtant très crédible.',
      durationMs: 5000,
    },
    { caption: 'Le troisième existe, mais il ne dit pas ce que l’IA affirme.', durationMs: 4000 },
    {
      caption: 'La leçon est simple : on vérifie chaque référence, et on lit le document.',
      durationMs: 5000,
    },
  ],
  Visual: HallucinationVisual,
};

export default scene;
