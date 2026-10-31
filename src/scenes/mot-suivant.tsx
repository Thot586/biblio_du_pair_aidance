import { appear, Card, Label, lerp, Marker, Stage } from '@/features/scene-player/kit';
import type { SceneDefinition, SceneFrame } from '@/features/scene-player/types';

const SENTENCE_LEFT = 50;
const SENTENCE_LINE_2 = 116;
const BAR_LEFT = 40;
const BAR_HEIGHT = 54;
const barY = (index: number) => 166 + index * 70;

interface Bar {
  word: string;
  length: number;
}

interface Round {
  /** Le premier mot est celui que l'IA choisit : c'est toujours le plus probable. */
  bars: readonly [Bar, Bar, Bar];
  /** Position du mot choisi sur la deuxième ligne de la phrase. */
  targetX: number;
  timing: (frame: SceneFrame) => { shown: number; picked: number; flown: number };
}

/** Les deux derniers tours s'enchaînent pendant la dernière étape. */
const fastRound = (start: number) => (frame: SceneFrame) => ({
  shown: appear(frame, 3, start, start + 0.1),
  picked: appear(frame, 3, start + 0.1, start + 0.18),
  flown: appear(frame, 3, start + 0.2, start + 0.35),
});

const ROUNDS: readonly Round[] = [
  {
    bars: [
      { word: 'vécu', length: 480 },
      { word: 'partage', length: 340 },
      { word: 'travail', length: 200 },
    ],
    targetX: SENTENCE_LEFT,
    timing: (frame) => ({
      shown: appear(frame, 1),
      picked: appear(frame, 2, 0, 0.35),
      flown: appear(frame, 2, 0.4, 0.95),
    }),
  },
  {
    bars: [
      { word: 'des', length: 460 },
      { word: 'du', length: 280 },
      { word: 'en', length: 170 },
    ],
    targetX: SENTENCE_LEFT + 74,
    timing: fastRound(0),
  },
  {
    bars: [
      { word: 'personnes', length: 500 },
      { word: 'pairs', length: 300 },
      { word: 'autres', length: 190 },
    ],
    targetX: SENTENCE_LEFT + 130,
    timing: fastRound(0.35),
  },
];

function RoundBars({ round, frame }: { round: Round; frame: SceneFrame }) {
  const { shown, picked, flown } = round.timing(frame);
  if (shown === 0) return null;
  const [chosen] = round.bars;
  return (
    <g>
      {round.bars.map((bar, index) => (
        <g key={bar.word} opacity={1 - flown}>
          <Card
            x={BAR_LEFT}
            y={barY(index)}
            width={Math.max(bar.length * shown, 20)}
            height={BAR_HEIGHT}
            fill={index === 0 ? 'accentSoft' : 'soft'}
            corner={12}
            opacity={shown}
          />
          {index > 0 ? (
            <Label x={BAR_LEFT + 16} y={barY(index) + 37} opacity={shown}>
              {bar.word}
            </Label>
          ) : null}
        </g>
      ))}
      <g opacity={1 - flown}>
        <Marker
          x={BAR_LEFT - 6}
          y={barY(0) - 6}
          width={chosen.length + 12}
          height={BAR_HEIGHT + 12}
          progress={picked}
        />
      </g>
      <Label
        x={lerp(BAR_LEFT + 16, round.targetX, flown)}
        y={lerp(barY(0) + 37, SENTENCE_LINE_2, flown)}
        opacity={shown}
        weight={flown === 1 ? 700 : 600}
        color={flown === 1 ? 'accent' : 'ink'}
      >
        {chosen.word}
      </Label>
    </g>
  );
}

function NextWordVisual(frame: SceneFrame) {
  const warning = appear(frame, 3, 0.75, 0.95);
  return (
    <Stage>
      <Card x={30} y={28} width={580} height={116} stroke="line" opacity={appear(frame, 0)}>
        <Label x={SENTENCE_LEFT} y={74}>
          La pair-aidance repose sur le
        </Label>
      </Card>
      {ROUNDS.map((round) => (
        <RoundBars key={round.bars[0].word} round={round} frame={frame} />
      ))}
      <Card x={130} y={210} width={380} height={100} stroke="warm" opacity={warning}>
        <Label x={320} y={270} anchor="middle" weight={700}>
          Vrai ? Jamais vérifié.
        </Label>
      </Card>
    </Stage>
  );
}

const scene: SceneDefinition = {
  id: 'mot-suivant',
  title: 'Comment une IA écrit',
  steps: [
    {
      caption: 'Une IA reçoit le début d’une phrase.',
      durationMs: 4000,
    },
    {
      caption:
        'Elle calcule quels mots pourraient venir ensuite, d’après tous les textes qu’elle a vus.',
      durationMs: 5000,
    },
    {
      caption: 'Elle choisit un mot probable, l’ajoute, et recommence.',
      durationMs: 4000,
    },
    {
      caption: 'Mot après mot, le texte s’écrit. À aucun moment, elle ne vérifie si c’est vrai.',
      durationMs: 5000,
    },
  ],
  Visual: NextWordVisual,
};

export default scene;
