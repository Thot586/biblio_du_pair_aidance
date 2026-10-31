import {
  appear,
  Card,
  Label,
  Lines,
  lerp,
  Stage,
  type SceneColor,
} from '@/features/scene-player/kit';
import type { SceneDefinition, SceneFrame } from '@/features/scene-player/types';

interface Layer {
  text: string;
  width: number;
  y: number;
  fill: SceneColor;
  textColor: SceneColor;
}

const LAYERS: readonly Layer[] = [
  { text: 'La pair-aidance', width: 560, y: 34, fill: 'soft', textColor: 'ink' },
  { text: 'en addictologie', width: 450, y: 104, fill: 'accentSoft', textColor: 'ink' },
  { text: 'dans une équipe', width: 350, y: 174, fill: 'line', textColor: 'ink' },
  { text: 'à son arrivée', width: 260, y: 244, fill: 'accent', textColor: 'paper' },
];

function FunnelVisual(frame: SceneFrame) {
  const question = appear(frame, 4);
  return (
    <Stage>
      {LAYERS.map((layer, index) => {
        const shown = appear(frame, index);
        const x = (640 - layer.width) / 2;
        return (
          <Card
            key={layer.text}
            x={x}
            y={lerp(layer.y - 26, layer.y, shown)}
            width={layer.width}
            height={58}
            fill={layer.fill}
            corner={14}
            opacity={shown}
          >
            <Label
              x={320}
              y={lerp(layer.y - 26, layer.y, shown) + 39}
              anchor="middle"
              size={27}
              weight={700}
              color={layer.textColor}
            >
              {layer.text}
            </Label>
          </Card>
        );
      })}
      <Card x={40} y={318} width={560} height={104} fill="paper" stroke="ink" opacity={question}>
        <Lines
          x={320}
          y={358}
          anchor="middle"
          size={24}
          weight={700}
          lines={['Comment une personne pair-aidante', 'trouve-t-elle sa place dans l’équipe ?']}
          display
        />
      </Card>
    </Stage>
  );
}

const scene: SceneDefinition = {
  id: 'entonnoir',
  title: 'Du sujet à la question',
  steps: [
    {
      caption: 'Sam part d’un sujet très large : la pair-aidance.',
      durationMs: 3500,
    },
    {
      caption: 'Sam choisit un domaine : l’addictologie, là où Sam travaille.',
      durationMs: 3500,
    },
    {
      caption: 'Sam choisit un cadre : le travail dans une équipe de soin.',
      durationMs: 3500,
    },
    {
      caption: 'Sam choisit un moment : l’arrivée dans cette équipe.',
      durationMs: 3500,
    },
    {
      caption: 'Il reste une question précise. Sam sait maintenant quoi chercher et quoi lire.',
      durationMs: 5000,
    },
  ],
  Visual: FunnelVisual,
};

export default scene;
