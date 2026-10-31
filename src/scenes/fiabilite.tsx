import { appear, Arrow, Card, Label, Marker, Stage } from '@/features/scene-player/kit';
import type { SceneDefinition, SceneFrame } from '@/features/scene-player/types';

interface Row {
  question: string;
  zone: string;
  y: number;
}

const ROWS: readonly Row[] = [
  { question: 'Qui ?', zone: 'Auteur', y: 108 },
  { question: 'Quand ?', zone: 'Date', y: 180 },
  { question: 'Où ?', zone: 'Lieu de parution', y: 252 },
  { question: 'Pourquoi ?', zone: 'But du texte', y: 324 },
];

const ROW_HEIGHT = 60;

function ReliabilityVisual(frame: SceneFrame) {
  const shown = appear(frame, 0);
  return (
    <Stage>
      <Card x={24} y={34} width={300} height={370} stroke="line" opacity={shown}>
        <Label x={174} y={80} anchor="middle" weight={700} display>
          Document
        </Label>
        {ROWS.map((row) => (
          <Card
            key={row.zone}
            x={40}
            y={row.y}
            width={268}
            height={ROW_HEIGHT}
            fill="soft"
            corner={12}
          >
            <Label x={56} y={row.y + 39} size={24} weight={500}>
              {row.zone}
            </Label>
          </Card>
        ))}
      </Card>
      {ROWS.map((row, index) => {
        const step = index + 1;
        const asked = appear(frame, step);
        const middle = row.y + ROW_HEIGHT / 2;
        return (
          <g key={row.question}>
            <Card
              x={374}
              y={row.y}
              width={242}
              height={ROW_HEIGHT}
              fill="line"
              corner={12}
              opacity={shown * 0.35}
            />
            <Card
              x={374}
              y={row.y}
              width={242}
              height={ROW_HEIGHT}
              fill="accentSoft"
              corner={12}
              opacity={asked}
            >
              <Label x={495} y={row.y + 40} anchor="middle" size={28} weight={700} display>
                {row.question}
              </Label>
            </Card>
            <Marker
              x={36}
              y={row.y - 4}
              width={276}
              height={ROW_HEIGHT + 8}
              progress={appear(frame, step, 0.2, 0.8)}
            />
            <Arrow
              from={[370, middle]}
              to={[318, middle]}
              color="warm"
              progress={appear(frame, step, 0.4, 0.9)}
            />
          </g>
        );
      })}
    </Stage>
  );
}

const scene: SceneDefinition = {
  id: 'fiabilite',
  title: 'Quatre questions à poser à un document',
  steps: [
    {
      caption: 'Vous avez trouvé un document. Avant de l’utiliser, posez-lui quatre questions.',
      durationMs: 5000,
    },
    {
      caption: 'Qui l’a écrit ? L’auteur est-il nommé, et quelle est son expérience ?',
      durationMs: 4000,
    },
    {
      caption: 'Quand a-t-il été écrit ? Le document est-il encore à jour ?',
      durationMs: 4000,
    },
    {
      caption: 'Où a-t-il été publié ? Dans une revue, sur un site officiel, sur un blog ?',
      durationMs: 4000,
    },
    {
      caption: 'Pourquoi a-t-il été écrit ? Pour informer, convaincre ou vendre ?',
      durationMs: 4000,
    },
  ],
  Visual: ReliabilityVisual,
};

export default scene;
