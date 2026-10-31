import { appear, Card, during, Label, sceneColor, Stage } from '@/features/scene-player/kit';
import type { SceneDefinition, SceneFrame } from '@/features/scene-player/types';

interface Block {
  text: string;
  y: number;
  /** Moment où ce bloc s'éclaire de nouveau pendant la dernière étape, s'il est à lire. */
  readAt?: number;
}

const BLOCKS: readonly Block[] = [
  { text: 'Introduction', y: 98 },
  { text: 'Méthode', y: 178, readAt: 0.6 },
  { text: 'Résultats', y: 258 },
  { text: 'Discussion', y: 338, readAt: 0.3 },
];

const LAST_STEP = 5;
const BLOCK_HEIGHT = 70;

/** Pastille numérotée : l'ordre de lecture conseillé. */
function ReadingBadge({ y, number, shown }: { y: number; number: string; shown: number }) {
  return (
    <g opacity={shown}>
      <circle cx={92} cy={y} r={26} fill={sceneColor('warm')} />
      <Label x={92} y={y + 10} anchor="middle" size={28} weight={700} color="paper">
        {number}
      </Label>
    </g>
  );
}

function ArticlePlanVisual(frame: SceneFrame) {
  const summary = appear(frame, LAST_STEP, 0, 0.3);
  return (
    <Stage>
      <Card x={130} y={16} width={380} height={408} stroke="line" opacity={appear(frame, 0)}>
        <rect
          x={150}
          y={38}
          width={340}
          height={12}
          fill={sceneColor('line')}
          opacity={1 - summary}
        />
        <rect
          x={150}
          y={62}
          width={260}
          height={12}
          fill={sceneColor('line')}
          opacity={1 - summary}
        />
        <Card x={150} y={30} width={340} height={56} fill="accent" corner={12} opacity={summary}>
          <Label x={320} y={68} anchor="middle" weight={700} color="paper">
            Résumé
          </Label>
        </Card>
        {BLOCKS.map((block, index) => {
          const step = index + 1;
          const again =
            block.readAt === undefined
              ? 0
              : appear(frame, LAST_STEP, block.readAt, block.readAt + 0.3);
          const lit = Math.max(during(frame, [step]), again);
          const card = { x: 150, y: block.y, width: 340, height: BLOCK_HEIGHT, corner: 12 };
          const textY = block.y + 45;
          return (
            <g key={block.text}>
              <Card {...card} fill="soft" />
              <Card {...card} fill="accentSoft" opacity={appear(frame, step)} />
              <Card {...card} fill="accent" opacity={lit} />
              <Label x={320} y={textY} anchor="middle" size={28} weight={700} opacity={1 - lit}>
                {block.text}
              </Label>
              <Label
                x={320}
                y={textY}
                anchor="middle"
                size={28}
                weight={700}
                color="paper"
                opacity={lit}
              >
                {block.text}
              </Label>
            </g>
          );
        })}
      </Card>
      <ReadingBadge y={58} number="1" shown={summary} />
      <ReadingBadge y={373} number="2" shown={appear(frame, LAST_STEP, 0.3, 0.6)} />
      <ReadingBadge y={213} number="3" shown={appear(frame, LAST_STEP, 0.6, 0.9)} />
    </Stage>
  );
}

const scene: SceneDefinition = {
  id: 'imrad',
  title: 'Le plan d’un article',
  steps: [
    {
      caption: 'La plupart des articles suivent le même plan, en quatre parties.',
      durationMs: 4000,
    },
    {
      caption: 'L’introduction explique pourquoi cette recherche a été faite.',
      durationMs: 4000,
    },
    {
      caption: 'La méthode dit comment : avec qui, où, de quelle façon.',
      durationMs: 4000,
    },
    {
      caption: 'Les résultats présentent ce qui a été trouvé.',
      durationMs: 4000,
    },
    {
      caption: 'La discussion dit ce qu’il faut en retenir, et quelles sont les limites.',
      durationMs: 4000,
    },
    {
      caption: 'Pour aller à l’essentiel : le résumé, puis la discussion, puis la méthode.',
      durationMs: 5000,
    },
  ],
  Visual: ArticlePlanVisual,
};

export default scene;
