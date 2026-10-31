import { appear, Card, Label, lerp, sceneColor, Stage } from '@/features/scene-player/kit';
import type { SceneDefinition, SceneFrame } from '@/features/scene-player/types';

const TEXT_SIZE = 24;
const NOTE_LEFT = 50;
const AGE_LEFT_BEFORE = 156;
const AGE_LEFT_AFTER = 220;
const ROW_Y = [104, 160, 216, 272] as const;

/** Largeur estimée, pour que le trait couvre le texte barré. */
const textWidth = (text: string) => text.length * 0.55 * TEXT_SIZE;

interface Replacement {
  before: string;
  after?: string;
  x: number;
  afterX?: number;
  y: number;
  step: number;
}

/** Un mot barré, qui s'efface ensuite au profit de sa version générale (s'il y en a une). */
function Rewrite({ item, frame }: { item: Replacement; frame: SceneFrame }) {
  const strike = appear(frame, item.step, 0, 0.4);
  const changed = appear(frame, item.step, 0.5, 0.9);
  return (
    <g>
      <Label x={item.x} y={item.y} size={TEXT_SIZE} weight={500} opacity={1 - changed}>
        {item.before}
      </Label>
      <line
        x1={item.x}
        y1={item.y - 8}
        x2={item.x + textWidth(item.before) * strike}
        y2={item.y - 8}
        stroke={sceneColor('warm')}
        strokeWidth={4}
        opacity={strike === 0 ? 0 : 1 - changed}
      />
      {item.after ? (
        <Label
          x={item.afterX ?? item.x}
          y={item.y}
          size={TEXT_SIZE}
          weight={700}
          color="accent"
          opacity={changed}
        >
          {item.after}
        </Label>
      ) : null}
    </g>
  );
}

function AnonymizeVisual(frame: SceneFrame) {
  const ageX = lerp(AGE_LEFT_BEFORE, AGE_LEFT_AFTER, appear(frame, 1, 0, 0.4));
  const replacements: readonly Replacement[] = [
    { before: 'Mme D.,', after: 'Une personne', x: NOTE_LEFT, y: ROW_Y[0], step: 1 },
    {
      before: '42 ans',
      after: 'd’une quarantaine d’années',
      x: ageX,
      afterX: AGE_LEFT_AFTER,
      y: ROW_Y[0],
      step: 2,
    },
    { before: 'hospitalisée à Bron', after: 'hospitalisée', x: NOTE_LEFT, y: ROW_Y[1], step: 3 },
    { before: 'en mars 2026', after: 'l’an dernier', x: NOTE_LEFT, y: ROW_Y[2], step: 3 },
    { before: 'ancienne pharmacienne', x: NOTE_LEFT, y: ROW_Y[3], step: 4 },
  ];
  return (
    <Stage>
      <Card x={30} y={24} width={580} height={276} stroke="line" opacity={appear(frame, 0)}>
        <Label x={NOTE_LEFT} y={60} size={20} weight={500} color="muted">
          Note fictive
        </Label>
        {replacements.map((item) => (
          <Rewrite key={item.before} item={item} frame={frame} />
        ))}
      </Card>
      <Card
        x={60}
        y={330}
        width={520}
        height={80}
        fill="accent"
        corner={14}
        opacity={appear(frame, 5)}
      >
        <Label x={320} y={379} anchor="middle" size={24} weight={700} color="paper">
          Rien ne permet de la reconnaître
        </Label>
      </Card>
    </Stage>
  );
}

const scene: SceneDefinition = {
  id: 'anonymiser',
  title: 'Anonymiser avant d’écrire',
  steps: [
    {
      caption: 'Voici une note fictive. Sam aimerait l’aide d’une IA, mais pas dans cet état.',
      durationMs: 5000,
    },
    {
      caption: 'D’abord, le nom. Même une initiale peut suffire à reconnaître quelqu’un.',
      durationMs: 4000,
    },
    {
      caption: 'L’âge exact devient une tranche d’âge.',
      durationMs: 4000,
    },
    {
      caption: 'Le lieu et la date deviennent généraux.',
      durationMs: 4000,
    },
    {
      caption: 'Le métier rare disparaît, car il rend la personne reconnaissable.',
      durationMs: 4000,
    },
    {
      caption:
        'Dernière question : quelqu’un qui la connaît pourrait-il la reconnaître ? Si le doute reste, on n’envoie rien.',
      durationMs: 5000,
    },
  ],
  Visual: AnonymizeVisual,
};

export default scene;
