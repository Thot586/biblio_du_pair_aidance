import {
  appear,
  Card,
  Label,
  Lines,
  lerp,
  Marker,
  Stage,
  sceneColor,
} from '@/features/scene-player/kit';
import type { SceneDefinition, SceneFrame } from '@/features/scene-player/types';

interface Word {
  text: string;
  y: number;
}

interface Branch {
  name: string;
  /** Position de la petite carte de branche, dans un coin de la scène. */
  x: number;
  y: number;
  /** Trait, du bord de la carte centrale vers la carte de branche. */
  from: readonly [number, number];
  to: readonly [number, number];
  wordX: number;
  anchor: 'start' | 'end';
  words: readonly Word[];
}

const BRANCH_WIDTH = 210;
const BRANCH_HEIGHT = 50;

const BRANCHES: readonly Branch[] = [
  {
    name: 'Le sujet',
    x: 16,
    y: 20,
    from: [260, 175],
    to: [226, 70],
    wordX: 28,
    anchor: 'start',
    words: [
      { text: 'accueil', y: 104 },
      { text: 'premiers mois', y: 138 },
    ],
  },
  {
    name: 'Les personnes',
    x: 414,
    y: 20,
    from: [380, 175],
    to: [414, 70],
    wordX: 612,
    anchor: 'end',
    words: [
      { text: 'pair-aidants', y: 104 },
      { text: 'soignants', y: 138 },
    ],
  },
  {
    name: 'Les outils',
    x: 16,
    y: 370,
    from: [260, 265],
    to: [226, 370],
    wordX: 28,
    anchor: 'start',
    words: [
      { text: 'réunions', y: 316 },
      { text: 'transmissions', y: 350 },
    ],
  },
  {
    name: 'Le contexte',
    x: 414,
    y: 370,
    from: [380, 265],
    to: [414, 370],
    wordX: 612,
    anchor: 'end',
    words: [
      { text: 'secret partagé', y: 316 },
      { text: 'hôpital', y: 350 },
    ],
  },
];

/** Cadres autour des mots retenus à la dernière étape. */
const MARKS = [
  { x: 18, y: 82, width: 106, height: 34 },
  { x: 18, y: 294, width: 122, height: 34 },
  { x: 426, y: 294, width: 196, height: 34 },
] as const;

function MindMapVisual(frame: SceneFrame) {
  const subject = appear(frame, 0);
  return (
    <Stage>
      {BRANCHES.map((branch, branchIndex) => {
        const start = branchIndex * 0.15;
        const grown = appear(frame, 1, start, start + 0.4);
        return (
          <g key={branch.name}>
            <line
              x1={branch.from[0]}
              y1={branch.from[1]}
              x2={lerp(branch.from[0], branch.to[0], grown)}
              y2={lerp(branch.from[1], branch.to[1], grown)}
              stroke={sceneColor('accent')}
              strokeWidth={4}
              strokeLinecap="round"
              opacity={grown > 0 ? 1 : 0}
            />
            <Card
              x={branch.x}
              y={branch.y}
              width={BRANCH_WIDTH}
              height={BRANCH_HEIGHT}
              fill="accentSoft"
              corner={14}
              opacity={grown}
            >
              <Label
                x={branch.x + BRANCH_WIDTH / 2}
                y={branch.y + 34}
                anchor="middle"
                size={24}
                weight={700}
              >
                {branch.name}
              </Label>
            </Card>
            {branch.words.map((word, wordIndex) => {
              const wordStart = (branchIndex * 2 + wordIndex) * 0.09;
              return (
                <Label
                  key={word.text}
                  x={branch.wordX}
                  y={word.y}
                  anchor={branch.anchor}
                  size={22}
                  weight={500}
                  opacity={appear(frame, 2, wordStart, wordStart + 0.25)}
                >
                  {word.text}
                </Label>
              );
            })}
          </g>
        );
      })}
      <Card x={195} y={175} width={250} height={90} fill="accent" corner={22} opacity={subject}>
        <Lines
          x={320}
          y={212}
          anchor="middle"
          size={24}
          weight={700}
          color="paper"
          lines={['Pair-aidance', 'en addictologie']}
          display
        />
      </Card>
      {MARKS.map((mark, index) => (
        <Marker
          key={mark.x + mark.y}
          {...mark}
          progress={appear(frame, 3, index * 0.2, index * 0.2 + 0.4)}
        />
      ))}
    </Stage>
  );
}

const scene: SceneDefinition = {
  id: 'carte-mentale',
  title: 'Dessiner ses idées',
  steps: [
    {
      caption: 'Sam écrit son sujet au milieu de la feuille.',
      durationMs: 4000,
    },
    {
      caption: 'Sam trace quatre branches : le sujet, les personnes, les outils, le contexte.',
      durationMs: 4000,
    },
    {
      caption: 'Sur chaque branche, Sam ajoute des mots, comme ils viennent, sans les trier.',
      durationMs: 4000,
    },
    {
      caption:
        'Sam relit, et entoure ce qui l’attire le plus. Voilà de nouvelles pistes de lecture !',
      durationMs: 5000,
    },
  ],
  Visual: MindMapVisual,
};

export default scene;
