import {
  appear,
  Arrow,
  Browser,
  Card,
  Label,
  lerp,
  Marker,
  Pointer,
  SearchField,
  Stage,
  typed,
} from '@/features/scene-player/kit';
import type { SceneDefinition, SceneFrame } from '@/features/scene-player/types';

const CONTENT_X = 44;
const CONTENT_WIDTH = 552;

function TranslateVisual(frame: SceneFrame) {
  const term = appear(frame, 1);
  const english = appear(frame, 2);
  const nextTool = appear(frame, 3);
  const pointerX = lerp(lerp(420, 460, term), 356, english);
  const pointerY = lerp(lerp(lerp(370, 140, appear(frame, 0)), 240, term), 336, english);
  return (
    <Stage>
      <Browser address="hetop.eu">
        <Label x={CONTENT_X} y={98} size={26} weight={700} color="accent" display>
          HeTOP
        </Label>
        <SearchField
          x={CONTENT_X}
          y={112}
          width={CONTENT_WIDTH}
          height={48}
          size={22}
          text={typed('stigmatisation', appear(frame, 0, 0.15, 0.75))}
        />
        <Card
          x={CONTENT_X}
          y={178}
          width={CONTENT_WIDTH}
          height={212}
          fill="soft"
          corner={14}
          opacity={term}
        >
          <Label x={64} y={212} size={20} weight={500} color="muted">
            Terme officiel
          </Label>
          <Label x={64} y={250} size={28} weight={700}>
            Stigmatisation sociale
          </Label>
        </Card>
        <Label x={64} y={296} size={20} weight={500} color="muted" opacity={english}>
          En anglais
        </Label>
        <Label x={64} y={336} size={28} weight={700} color="accent" opacity={english}>
          Social Stigma
        </Label>
        <Marker x={54} y={308} width={296} height={42} progress={appear(frame, 2, 0.25, 0.85)} />
        <Arrow from={[358, 330]} to={[408, 330]} progress={nextTool} />
        <Card x={420} y={306} width={150} height={48} fill="accent" corner={12} opacity={nextTool}>
          <Label x={495} y={338} anchor="middle" size={24} weight={700} color="paper">
            PubMed
          </Label>
        </Card>
        <Pointer
          x={lerp(pointerX, 540, nextTool)}
          y={lerp(pointerY, 342, nextTool)}
          pressed={frame.step === 3 && frame.progress > 0.75}
        />
      </Browser>
    </Stage>
  );
}

const scene: SceneDefinition = {
  id: 'traduire-mesh',
  title: 'Trouver le mot anglais',
  steps: [
    { caption: 'Sam ouvre HeTOP et tape un mot en français : stigmatisation.', durationMs: 4000 },
    { caption: 'Le site propose le terme officiel.', durationMs: 4000 },
    {
      caption: 'Juste en dessous, Sam trouve sa version anglaise : Social Stigma.',
      durationMs: 4000,
    },
    { caption: 'Sam peut maintenant utiliser ce terme dans PubMed.', durationMs: 4000 },
  ],
  Visual: TranslateVisual,
};

export default scene;
