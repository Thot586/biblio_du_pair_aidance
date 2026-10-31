import {
  appear,
  Browser,
  Card,
  during,
  Label,
  Marker,
  Pointer,
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
const LOGIN_X = 120;
const LOGIN_WIDTH = 400;

/** Le pointeur enchaîne ses déplacements, chacun pendant une partie de son étape. */
const POINTER_STOPS: readonly Stop[] = [
  { step: 0, x: 420, y: 150, from: 0.2, to: 0.6 },
  { step: 1, x: 300, y: 276, from: 0.3, to: 0.7 },
  { step: 2, x: 400, y: 326, from: 0.6, to: 0.8 },
  { step: 3, x: 480, y: 134, to: 0.3 },
  { step: 4, x: 292, y: 264, to: 0.35 },
];

function PortalScreen({ frame }: { frame: SceneFrame }) {
  const list = appear(frame, 1, 0, 0.4);
  return (
    <g>
      <Label x={CONTENT_X} y={100} size={26} weight={700} display>
        Bibliothèques Lyon 1
      </Label>
      <Card x={CONTENT_X} y={118} width={CONTENT_WIDTH} height={56} fill="soft" corner={12}>
        <Label x={60} y={155} size={24}>
          Bibliothèque en ligne
        </Label>
      </Card>
      <g opacity={list}>
        <Bar x={60} y={211} width={240} />
        <Card x={CONTENT_X} y={246} width={CONTENT_WIDTH} height={54} stroke="line" corner={12}>
          <Label x={60} y={282} size={24} weight={700} color="accent">
            Cairn
          </Label>
        </Card>
        <Bar x={60} y={335} width={280} />
      </g>
      <Marker
        x={CONTENT_X}
        y={246}
        width={CONTENT_WIDTH}
        height={54}
        progress={appear(frame, 1, 0.5, 0.95)}
      />
    </g>
  );
}

function LoginScreen({ frame }: { frame: SceneFrame }) {
  return (
    <g opacity={during(frame, [2])}>
      <Label x={320} y={106} anchor="middle" size={28} weight={700} display>
        Connexion Lyon 1
      </Label>
      <Label x={LOGIN_X} y={144} size={20} weight={500} color="muted">
        Identifiant
      </Label>
      <SearchField
        x={LOGIN_X}
        y={152}
        width={LOGIN_WIDTH}
        text={typed('sam.exemple', appear(frame, 2, 0.1, 0.35))}
      />
      <Label x={LOGIN_X} y={226} size={20} weight={500} color="muted">
        Mot de passe
      </Label>
      <SearchField
        x={LOGIN_X}
        y={234}
        width={LOGIN_WIDTH}
        text={typed('••••••••', appear(frame, 2, 0.35, 0.55))}
      />
      <Card x={LOGIN_X} y={300} width={LOGIN_WIDTH} height={50} fill="accent" corner={12}>
        <Label x={320} y={333} anchor="middle" size={22} weight={700} color="paper">
          Se connecter
        </Label>
      </Card>
    </g>
  );
}

function CairnScreen({ frame }: { frame: SceneFrame }) {
  const result = appear(frame, 3, 0.6, 0.9);
  const fullText = appear(frame, 4, 0.5, 0.9);
  return (
    <g opacity={during(frame, [3, 4])}>
      <Label x={CONTENT_X} y={98} size={24} weight={700} color="accent" display>
        Cairn
      </Label>
      <SearchField
        x={CONTENT_X}
        y={110}
        width={CONTENT_WIDTH}
        size={22}
        text={typed('pair-aidance', appear(frame, 3, 0.2, 0.55))}
      />
      <Card
        x={CONTENT_X}
        y={168}
        width={CONTENT_WIDTH}
        height={120}
        stroke="line"
        corner={14}
        opacity={result}
      >
        <Label x={60} y={202} size={22} color="accent">
          Un article sur la pair-aidance
        </Label>
        <Bar x={60} y={216} width={480} />
        <Card x={60} y={240} width={240} height={38} fill="accentSoft" corner={10}>
          <Label x={180} y={266} anchor="middle" size={20} weight={700}>
            Texte intégral
          </Label>
        </Card>
      </Card>
      <Card
        x={CONTENT_X}
        y={300}
        width={CONTENT_WIDTH}
        height={96}
        fill="soft"
        corner={14}
        opacity={fullText}
      >
        <Bar x={60} y={318} width={500} />
        <Bar x={60} y={338} width={470} />
        <Bar x={60} y={358} width={320} />
      </Card>
    </g>
  );
}

function CairnVisual(frame: SceneFrame) {
  const [pointerX, pointerY] = travel(frame, [330, 370], POINTER_STOPS);
  const pressed =
    (frame.step === 0 && frame.progress > 0.65) ||
    (frame.step === 1 && frame.progress > 0.75) ||
    (frame.step === 2 && frame.progress > 0.85) ||
    (frame.step === 4 && frame.progress > 0.4);
  const address =
    frame.step <= 1
      ? 'portaildoc.univ-lyon1.fr'
      : frame.step === 2
        ? 'docelec.univ-lyon1.fr'
        : 'shs.cairn.info';
  return (
    <Stage>
      <Browser address={address}>
        {frame.step <= 1 && <PortalScreen frame={frame} />}
        {frame.step === 2 && <LoginScreen frame={frame} />}
        {frame.step >= 3 && <CairnScreen frame={frame} />}
        <Pointer x={pointerX} y={pointerY} pressed={pressed} />
      </Browser>
    </Stage>
  );
}

const scene: SceneDefinition = {
  id: 'cairn-lyon1',
  title: 'Ouvrir Cairn avec Lyon 1',
  steps: [
    {
      caption: 'Sam ouvre le portail des bibliothèques de Lyon 1, puis la bibliothèque en ligne.',
      durationMs: 5000,
    },
    { caption: 'Sam y trouve Cairn, dans la liste des ressources.', durationMs: 4000 },
    { caption: 'Une page demande de se connecter avec son compte Lyon 1.', durationMs: 4000 },
    { caption: 'Cairn s’ouvre, et Sam tape son mot de recherche.', durationMs: 4000 },
    { caption: 'Quand un texte est accessible, Sam peut le lire en entier.', durationMs: 4000 },
  ],
  Visual: CairnVisual,
};

export default scene;
