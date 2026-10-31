import {
  appear,
  Arrow,
  Browser,
  Card,
  during,
  Label,
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

const CONTENT_X = 44;
const CONTENT_WIDTH = 552;

/** Le pointeur enchaîne ses déplacements, chacun pendant une partie de son étape. */
const POINTER_STOPS: readonly Stop[] = [
  { step: 0, x: 62, y: 96, from: 0.05, to: 0.35 },
  { step: 0, x: 170, y: 156, from: 0.55, to: 0.8 },
  { step: 1, x: 420, y: 226, to: 0.3 },
  { step: 2, x: 560, y: 350 },
  { step: 3, x: 324, y: 226 },
  { step: 4, x: 126, y: 226 },
];

function HomeScreen({ frame }: { frame: SceneFrame }) {
  const menu = appear(frame, 0, 0.35, 0.5);
  return (
    <g>
      <g stroke={sceneColor('ink')} strokeWidth={4} strokeLinecap="round">
        <line x1={46} y1={80} x2={78} y2={80} />
        <line x1={46} y1={92} x2={78} y2={92} />
        <line x1={46} y1={104} x2={78} y2={104} />
      </g>
      <Label x={320} y={246} anchor="middle" size={34} weight={700} display>
        Google Scholar
      </Label>
      <SearchField x={100} y={268} width={440} height={48} text="" />
      <Card x={CONTENT_X} y={120} width={230} height={64} stroke="line" corner={12} opacity={menu}>
        <Label x={62} y={160} size={24}>
          Paramètres
        </Label>
      </Card>
    </g>
  );
}

function SettingsScreen({ frame }: { frame: SceneFrame }) {
  const added = appear(frame, 1, 0.65, 0.85);
  return (
    <g opacity={during(frame, [1])}>
      <Label x={CONTENT_X} y={104} size={28} weight={700} display>
        Paramètres
      </Label>
      <Card x={CONTENT_X} y={124} width={CONTENT_WIDTH} height={58} fill="soft" corner={12}>
        <Label x={60} y={161} size={22}>
          Liens vers des bibliothèques
        </Label>
      </Card>
      <SearchField
        x={CONTENT_X}
        y={200}
        width={CONTENT_WIDTH}
        height={48}
        size={22}
        text={typed('Lyon 1', appear(frame, 1, 0.3, 0.6))}
      />
      <Card x={CONTENT_X} y={268} width={130} height={48} fill="accent" corner={12} opacity={added}>
        <Label x={109} y={300} anchor="middle" size={22} weight={700} color="paper">
          Lyon 1
        </Label>
      </Card>
    </g>
  );
}

function ResultsScreen({ frame }: { frame: SceneFrame }) {
  const results = appear(frame, 2, 0.55, 0.9);
  const reference = appear(frame, 4, 0.3, 0.7);
  return (
    <g opacity={during(frame, [2, 3, 4])}>
      <SearchField
        x={CONTENT_X}
        y={76}
        width={CONTENT_WIDTH}
        size={22}
        text={typed('"pair-aidance"', appear(frame, 2, 0.05, 0.5))}
      />
      <g opacity={results}>
        <Label x={CONTENT_X} y={152} size={22} color="accent">
          Un article sur la pair-aidance
        </Label>
        <Bar x={CONTENT_X} y={164} width={500} />
        <Bar x={CONTENT_X} y={182} width={380} />
        <Label x={52} y={222} size={20}>
          Citer
        </Label>
        <Label x={160} y={222} size={20}>
          Cité par 34
        </Label>
        <Label x={CONTENT_X} y={278} size={22} color="accent">
          Un autre article
        </Label>
        <Bar x={CONTENT_X} y={290} width={500} />
        <Bar x={CONTENT_X} y={308} width={380} />
      </g>
      <Marker x={152} y={200} width={186} height={30} progress={appear(frame, 3, 0, 0.5)} />
      <Arrow from={[348, 215]} to={[400, 215]} progress={appear(frame, 3, 0.4, 0.8)} />
      <Label x={412} y={222} size={20} weight={500} opacity={appear(frame, 3, 0.5, 0.9)}>
        Plus récents
      </Label>
      <Marker x={44} y={200} width={100} height={30} progress={appear(frame, 4, 0, 0.4)} />
      <Card
        x={CONTENT_X}
        y={246}
        width={CONTENT_WIDTH}
        height={150}
        fill="accentSoft"
        stroke="accent"
        corner={14}
        opacity={reference}
      >
        <Label x={64} y={284} size={22} weight={700}>
          Référence APA
        </Label>
        <rect x={64} y={300} width={500} height={10} rx={3} fill={sceneColor('paper')} />
        <rect x={64} y={318} width={360} height={10} rx={3} fill={sceneColor('paper')} />
        <Label x={64} y={370} size={22} weight={700} color="warm">
          À relire
        </Label>
      </Card>
    </g>
  );
}

function ScholarVisual(frame: SceneFrame) {
  const [pointerX, pointerY] = travel(frame, [330, 360], POINTER_STOPS);
  const pressed =
    (frame.step === 0 && frame.progress > 0.82) ||
    (frame.step === 3 && frame.progress > 0.2 && frame.progress < 0.3) ||
    (frame.step === 4 && frame.progress > 0.55);
  return (
    <Stage>
      <Browser address="scholar.google.com">
        {frame.step === 0 && <HomeScreen frame={frame} />}
        {frame.step === 1 && <SettingsScreen frame={frame} />}
        {frame.step >= 2 && <ResultsScreen frame={frame} />}
        <Pointer x={pointerX} y={pointerY} pressed={pressed} />
      </Browser>
    </Stage>
  );
}

const scene: SceneDefinition = {
  id: 'scholar',
  title: 'Trois réglages sur Google Scholar',
  steps: [
    { caption: 'Sam ouvre Google Scholar, puis le menu des paramètres.', durationMs: 4000 },
    { caption: 'Dans « Liens vers des bibliothèques », Sam ajoute Lyon 1.', durationMs: 4000 },
    { caption: 'Sam lance sa recherche, et lit les premiers résultats.', durationMs: 4000 },
    {
      caption: 'Sous un résultat, « Cité par » mène à des travaux plus récents sur le même sujet.',
      durationMs: 5000,
    },
    {
      caption: 'Le bouton « Citer » donne la référence en [[apa|APA]]. Il faudra la relire.',
      durationMs: 4000,
    },
  ],
  Visual: ScholarVisual,
};

export default scene;
