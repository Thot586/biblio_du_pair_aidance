import { appear, Card, during, Label, Stage, sceneColor } from '@/features/scene-player/kit';
import type { SceneDefinition, SceneFrame } from '@/features/scene-player/types';

const RADIUS = 115;
const LEFT_X = 235;
const RIGHT_X = 405;
const CENTER_Y = 180;

/** Les deux cercles se croisent sur la verticale x = 320. */
const MIDDLE_X = (LEFT_X + RIGHT_X) / 2;
const HALF_CHORD = Math.sqrt(RADIUS ** 2 - (MIDDLE_X - LEFT_X) ** 2);
const TOP = `${MIDDLE_X} ${CENTER_Y - HALF_CHORD}`;
const BOTTOM = `${MIDDLE_X} ${CENTER_Y + HALF_CHORD}`;
const ARC = `${RADIUS} ${RADIUS} 0`;

/** Des tracés plutôt qu'un clipPath : pas d'identifiant à partager entre scènes. */
const INTERSECTION = `M${TOP}A${ARC} 0 1 ${BOTTOM}A${ARC} 0 1 ${TOP}z`;
const LEFT_ONLY = `M${TOP}A${ARC} 1 0 ${BOTTOM}A${ARC} 0 1 ${TOP}z`;

const STEP_ET = 1;
const STEP_OU = 2;
const STEP_SAUF = 3;

const OPERATORS = [
  { step: STEP_ET, word: 'ET' },
  { step: STEP_OU, word: 'OU' },
  { step: STEP_SAUF, word: 'SAUF' },
] as const;

function VennVisual(frame: SceneFrame) {
  const left = appear(frame, 0, 0, 0.4);
  const right = appear(frame, 0, 0.3, 0.7);
  const accent = sceneColor('accent');
  const outline = sceneColor('muted');
  return (
    <Stage>
      <Label x={170} y={44} anchor="middle" size={24} weight={700} opacity={left}>
        pair-aidance
      </Label>
      <Label x={470} y={44} anchor="middle" size={24} weight={700} opacity={right}>
        addictologie
      </Label>
      <circle cx={LEFT_X} cy={CENTER_Y} r={RADIUS} fill={sceneColor('paper')} opacity={left} />
      <circle cx={RIGHT_X} cy={CENTER_Y} r={RADIUS} fill={sceneColor('paper')} opacity={right} />
      <path d={INTERSECTION} fill={accent} opacity={during(frame, [STEP_ET])} />
      <g fill={accent} opacity={during(frame, [STEP_OU])}>
        <circle cx={LEFT_X} cy={CENTER_Y} r={RADIUS} />
        <circle cx={RIGHT_X} cy={CENTER_Y} r={RADIUS} />
      </g>
      <path d={LEFT_ONLY} fill={accent} opacity={during(frame, [STEP_SAUF])} />
      <circle
        cx={LEFT_X}
        cy={CENTER_Y}
        r={RADIUS}
        fill="none"
        stroke={outline}
        strokeWidth={3}
        opacity={left}
      />
      <circle
        cx={RIGHT_X}
        cy={CENTER_Y}
        r={RADIUS}
        fill="none"
        stroke={outline}
        strokeWidth={3}
        opacity={right}
      />
      <Card
        x={40}
        y={322}
        width={560}
        height={84}
        stroke="line"
        opacity={appear(frame, STEP_ET, 0, 0.4)}
      >
        <Label x={276} y={372} anchor="end" size={24} weight={700}>
          pair-aidance
        </Label>
        <Label x={364} y={372} size={24} weight={700}>
          addictologie
        </Label>
        {OPERATORS.map(({ step, word }) => (
          <Label
            key={word}
            x={320}
            y={374}
            anchor="middle"
            size={26}
            weight={700}
            color="warm"
            opacity={during(frame, [step])}
          >
            {word}
          </Label>
        ))}
      </Card>
    </Stage>
  );
}

const scene: SceneDefinition = {
  id: 'et-ou-sauf',
  title: 'ET, OU, SAUF',
  steps: [
    {
      caption:
        'Imaginons deux tas de documents : ceux sur la pair-aidance, et ceux sur l’addictologie.',
      durationMs: 5000,
    },
    {
      caption:
        'Avec ET, vous gardez seulement les documents qui parlent des deux. La recherche se resserre.',
      durationMs: 5000,
    },
    {
      caption:
        'Avec OU, vous gardez tout ce qui parle de l’un ou de l’autre. La recherche s’élargit.',
      durationMs: 5000,
    },
    {
      caption: 'Avec SAUF, vous retirez les documents qui parlent du second mot.',
      durationMs: 4000,
    },
  ],
  Visual: VennVisual,
};

export default scene;
