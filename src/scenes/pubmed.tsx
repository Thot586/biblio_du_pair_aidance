import {
  appear,
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
  Bar,
  travel,
  type Stop,
} from '@/features/scene-player/kit';
import type { SceneDefinition, SceneFrame } from '@/features/scene-player/types';

/** Colonne de filtres à gauche, résultats à droite. */
const FILTER_X = 44;
const RESULT_X = 272;
const RESULT_WIDTH = 324;
const SLIDER = { start: 44, end: 220, tenYears: 132, y: 274 } as const;

function Checkbox({ x, y, checked }: { x: number; y: number; checked: number }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={24}
        height={24}
        rx={4}
        fill={sceneColor('paper')}
        stroke={sceneColor('ink')}
        strokeWidth={2}
      />
      <rect
        x={x}
        y={y}
        width={24}
        height={24}
        rx={4}
        fill={sceneColor('accent')}
        opacity={checked}
      />
      <path
        d={`M${x + 5} ${y + 12}l5 6 9-12`}
        fill="none"
        stroke={sceneColor('paper')}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={checked}
      />
    </g>
  );
}

function ResultRow({ title, y, opacity = 1 }: { title: string; y: number; opacity?: number }) {
  return (
    <g opacity={opacity}>
      <Label x={RESULT_X} y={y + 24} size={20} color="accent">
        {title}
      </Label>
      <Bar x={RESULT_X} y={y + 38} width={RESULT_WIDTH} />
      <Bar x={RESULT_X} y={y + 54} width={240} />
    </g>
  );
}

/** Le pointeur enchaîne ses déplacements, chacun pendant une partie de son étape. */
const POINTER_STOPS: readonly Stop[] = [
  { step: 0, x: 440, y: 134, to: 0.3 },
  { step: 1, x: 150, y: 340 },
  { step: 2, x: 56, y: 188 },
  { step: 3, x: SLIDER.start, y: SLIDER.y, to: 0.3 },
  { step: 3, x: SLIDER.tenYears, y: SLIDER.y, from: 0.35, to: 0.8 },
  { step: 4, x: 586, y: 198, to: 0.4 },
];

function PubmedVisual(frame: SceneFrame) {
  const page = appear(frame, 1, 0.1, 0.6);
  const freeOnly = appear(frame, 2, 0.5, 0.8);
  const sliderX = lerp(SLIDER.start, SLIDER.tenYears, appear(frame, 3, 0.35, 0.8));
  const [pointerX, pointerY] = travel(frame, [330, 370], POINTER_STOPS);
  const pressed =
    (frame.step === 2 && frame.progress > 0.45) ||
    (frame.step === 3 && frame.progress > 0.3) ||
    (frame.step === 4 && frame.progress > 0.4);
  return (
    <Stage>
      <Browser address="pubmed.ncbi.nlm.nih.gov">
        <Label x={FILTER_X} y={98} size={24} weight={700} color="accent" display>
          PubMed
        </Label>
        <SearchField
          x={FILTER_X}
          y={110}
          width={552}
          size={22}
          text={typed('"peer support"[tiab]', appear(frame, 0, 0.3, 0.9))}
        />
        <g opacity={page}>
          <Checkbox x={FILTER_X} y={176} checked={freeOnly} />
          <Label x={76} y={195} size={20} weight={500}>
            Free full text
          </Label>
          <Label x={FILTER_X} y={246} size={20} weight={500}>
            Dates
          </Label>
          <line
            x1={SLIDER.start}
            y1={SLIDER.y}
            x2={SLIDER.end}
            y2={SLIDER.y}
            stroke={sceneColor('line')}
            strokeWidth={6}
            strokeLinecap="round"
          />
          <line
            x1={sliderX}
            y1={SLIDER.y}
            x2={SLIDER.end}
            y2={SLIDER.y}
            stroke={sceneColor('accent')}
            strokeWidth={6}
            strokeLinecap="round"
          />
          <circle cx={sliderX} cy={SLIDER.y} r={11} fill={sceneColor('accent')} />
          <circle cx={SLIDER.end} cy={SLIDER.y} r={11} fill={sceneColor('accent')} />
          <ResultRow title="Peer support" y={166} />
          <ResultRow title="Peer workers" y={238} opacity={1 - freeOnly} />
          <ResultRow title="Peer-led groups" y={lerp(310, 238, freeOnly)} />
        </g>
        <Label
          x={FILTER_X}
          y={314}
          size={20}
          weight={700}
          color="accent"
          opacity={appear(frame, 3, 0.6, 0.9)}
        >
          10 ans
        </Label>
        <Card
          x={524}
          y={168}
          width={72}
          height={36}
          fill="accent"
          corner={10}
          opacity={appear(frame, 4, 0, 0.3)}
        >
          <Label x={560} y={193} anchor="middle" size={20} weight={700} color="paper">
            Cite
          </Label>
        </Card>
        <Marker x={518} y={162} width={84} height={48} progress={appear(frame, 4, 0.1, 0.45)} />
        <Card
          x={RESULT_X}
          y={312}
          width={RESULT_WIDTH}
          height={84}
          fill="accentSoft"
          corner={12}
          opacity={appear(frame, 4, 0.45, 0.7)}
        >
          <Label x={286} y={338} size={20} weight={500} color="muted">
            Référence APA
          </Label>
          <Label x={286} y={374} size={22}>
            Peer support
          </Label>
        </Card>
        <Marker x={280} y={352} width={74} height={32} progress={appear(frame, 4, 0.7, 0.95)} />
        <Pointer x={pointerX} y={pointerY} pressed={pressed} />
      </Browser>
    </Stage>
  );
}

const scene: SceneDefinition = {
  id: 'pubmed',
  title: 'Une première recherche sur PubMed',
  steps: [
    { caption: 'Sam ouvre PubMed et tape "peer support"[tiab].', durationMs: 4000 },
    { caption: 'Les résultats s’affichent, en anglais.', durationMs: 4000 },
    {
      caption: 'À gauche, Sam coche le filtre Free full text pour voir les textes gratuits.',
      durationMs: 5000,
    },
    { caption: 'Sam garde les dix dernières années, avec le filtre de dates.', durationMs: 4000 },
    {
      caption: 'Le bouton Cite donne la référence en APA. Sam vérifie les majuscules.',
      durationMs: 5000,
    },
  ],
  Visual: PubmedVisual,
};

export default scene;
