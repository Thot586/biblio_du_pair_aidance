import { appear, Card, during, Label, Lines, lerp, Stage } from '@/features/scene-player/kit';
import type { SceneDefinition, SceneFrame } from '@/features/scene-player/types';

interface Question {
  word: string;
  x: number;
  y: number;
}

const CARD_WIDTH = 190;
const CARD_HEIGHT = 64;

const QUESTIONS: readonly Question[] = [
  { word: 'Quoi ?', x: 20, y: 24 },
  { word: 'Qui ?', x: 225, y: 24 },
  { word: 'Où ?', x: 430, y: 24 },
  { word: 'Quand ?', x: 20, y: 352 },
  { word: 'Comment ?', x: 225, y: 352 },
  { word: 'Pourquoi ?', x: 430, y: 352 },
];

/** Une réponse courte par étape, coupée à la main pour tenir dans la carte centrale. */
const ANSWERS: readonly (readonly string[])[] = [
  ['La place de', 'la pair-aidance'],
  ['Personne pair-aidante', 'et équipe soignante'],
  ['Service d’addictologie'],
  ['Les premiers mois', 'après l’arrivée'],
  ['À partir de ce que', 'vivent les personnes'],
  ['Mieux accueillir', 'les pair-aidants'],
  ['Un sujet bien précis'],
];

const LAST_STEP = 6;

function QuestionsVisual(frame: SceneFrame) {
  const allDone = during(frame, [LAST_STEP]);
  return (
    <Stage>
      <Card x={40} y={112} width={560} height={216} stroke="line" corner={28}>
        <Label x={320} y={160} anchor="middle" size={24} weight={700} display>
          La pair-aidance en addictologie
        </Label>
        <line x1={80} y1={182} x2={560} y2={182} stroke="var(--scene-line)" strokeWidth={2} />
        {ANSWERS.map((lines, index) => (
          <Lines
            key={lines[0]}
            x={320}
            y={lines.length === 1 ? 262 : 246}
            anchor="middle"
            weight={700}
            color={index === LAST_STEP ? 'accent' : 'ink'}
            opacity={during(frame, [index])}
            lines={lines}
          />
        ))}
      </Card>
      {QUESTIONS.map((question, index) => {
        const shown = appear(frame, index, 0, 0.4);
        const top = lerp(question.y + 14, question.y, shown);
        const textY = top + 43;
        const textX = question.x + CARD_WIDTH / 2;
        return (
          <g key={question.word} opacity={shown}>
            <Card
              x={question.x}
              y={top}
              width={CARD_WIDTH}
              height={CARD_HEIGHT}
              fill="accentSoft"
              corner={14}
            >
              <Label x={textX} y={textY} anchor="middle" size={28} weight={700}>
                {question.word}
              </Label>
            </Card>
            <Card
              x={question.x}
              y={top}
              width={CARD_WIDTH}
              height={CARD_HEIGHT}
              fill="accent"
              corner={14}
              opacity={Math.max(during(frame, [index]), allDone)}
            >
              <Label x={textX} y={textY} anchor="middle" size={28} weight={700} color="paper">
                {question.word}
              </Label>
            </Card>
          </g>
        );
      })}
    </Stage>
  );
}

const scene: SceneDefinition = {
  id: 'qqoqcp',
  title: 'Six questions pour préciser son sujet',
  steps: [
    {
      caption:
        'Sam part de son sujet, et lui pose une première question : quoi ? Ici, la place de la pair-aidance.',
      durationMs: 5000,
    },
    {
      caption: 'Qui est concerné ? Une personne pair-aidante, et l’équipe soignante.',
      durationMs: 4000,
    },
    {
      caption: 'Où cela se passe-t-il ? Dans un service d’addictologie.',
      durationMs: 4000,
    },
    {
      caption: 'Quand ? Dans les premiers mois, après l’arrivée dans l’équipe.',
      durationMs: 4000,
    },
    {
      caption: 'Comment l’aborder ? À partir de ce que vivent les personnes.',
      durationMs: 4000,
    },
    {
      caption:
        'Pourquoi est-ce important ? Pour aider les équipes à mieux accueillir les pair-aidants.',
      durationMs: 5000,
    },
    {
      caption: 'Avec ces six réponses, le sujet de Sam est déjà beaucoup plus précis.',
      durationMs: 4000,
    },
  ],
  Visual: QuestionsVisual,
};

export default scene;
