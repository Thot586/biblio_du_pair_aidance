import {
  appear,
  Arrow,
  Browser,
  Card,
  Label,
  lerp,
  Marker,
  Pointer,
  sceneColor,
  SearchField,
  Stage,
  typed,
} from '@/features/scene-player/kit';
import type { SceneDefinition, SceneFrame } from '@/features/scene-player/types';

const CONTENT_X = 44;
const CONTENT_WIDTH = 552;

function SemanticVisual(frame: SceneFrame) {
  const result = appear(frame, 1);
  const summary = appear(frame, 2);
  const cite = appear(frame, 3, 0, 0.4);
  const reference = appear(frame, 3, 0.5, 0.8);
  const toField = appear(frame, 0, 0, 0.3);
  const pointerX = lerp(lerp(lerp(lerp(330, 440, toField), 300, result), 420, summary), 146, cite);
  const pointerY = lerp(lerp(lerp(lerp(380, 134, toField), 262, result), 318, summary), 372, cite);
  return (
    <Stage>
      <Browser address="semanticscholar.org">
        <Label x={CONTENT_X} y={98} size={24} weight={700} color="accent" display>
          Semantic Scholar
        </Label>
        <SearchField
          x={CONTENT_X}
          y={110}
          width={CONTENT_WIDTH}
          size={22}
          text={typed('"peer support"', appear(frame, 0, 0.3, 0.9))}
        />
        <Card
          x={CONTENT_X}
          y={168}
          width={CONTENT_WIDTH}
          height={228}
          stroke="line"
          corner={14}
          opacity={result}
        >
          <Label x={60} y={204} size={24} color="accent">
            Peer support in recovery
          </Label>
          <rect x={60} y={218} width={500} height={10} rx={3} fill={sceneColor('line')} />
          <Label x={64} y={266} size={22}>
            128 citations
          </Label>
        </Card>
        <Marker x={54} y={242} width={240} height={34} progress={appear(frame, 1, 0.3, 0.9)} />
        <Card
          x={60}
          y={288}
          width={520}
          height={46}
          fill="accentSoft"
          corner={10}
          opacity={summary}
        >
          <Label x={74} y={318} size={20} weight={700} color="accent">
            TLDR
          </Label>
          <Label x={166} y={318} size={20} weight={500}>
            Un résumé en une ligne
          </Label>
        </Card>
        <Card x={60} y={344} width={96} height={42} fill="accent" corner={10} opacity={cite}>
          <Label x={108} y={372} anchor="middle" size={20} weight={700} color="paper">
            Cite
          </Label>
        </Card>
        <Label x={172} y={372} size={20} weight={500} opacity={reference}>
          Référence APA
        </Label>
        <Arrow from={[384, 365]} to={[446, 365]} progress={appear(frame, 3, 0.6, 0.9)} />
        <Card
          x={458}
          y={344}
          width={122}
          height={42}
          fill="soft"
          stroke="accent"
          corner={10}
          opacity={appear(frame, 3, 0.75, 1)}
        >
          <Label x={519} y={372} anchor="middle" size={20} weight={700}>
            L’article
          </Label>
        </Card>
        <Pointer x={pointerX} y={pointerY} pressed={frame.step === 3 && frame.progress > 0.42} />
      </Browser>
    </Stage>
  );
}

const scene: SceneDefinition = {
  id: 'semantic-scholar',
  title: 'Explorer avec Semantic Scholar',
  steps: [
    { caption: 'Sam tape sa recherche en anglais, avec des guillemets.', durationMs: 4000 },
    { caption: 'Chaque résultat indique combien de fois il a été cité.', durationMs: 4000 },
    {
      caption: 'Dans certains domaines, un résumé très court aide à voir de quoi parle l’article.',
      durationMs: 5000,
    },
    {
      caption:
        'Le bouton Cite donne la référence en [[apa|APA]]. Reste à ouvrir l’article pour le vérifier.',
      durationMs: 5000,
    },
  ],
  Visual: SemanticVisual,
};

export default scene;
