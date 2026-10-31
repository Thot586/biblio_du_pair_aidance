import type { ReactNode } from 'react';
import {
  appear,
  Browser,
  Card,
  during,
  Label,
  Marker,
  Pointer,
  sceneColor,
  Stage,
  Bar,
  travel,
  type Stop,
} from '@/features/scene-player/kit';
import type { SceneDefinition, SceneFrame } from '@/features/scene-player/types';

const CONTENT_X = 44;
const CONTENT_WIDTH = 552;

const REFERENCES = ['Castro, 2020', 'Franck & Cellard, 2020', 'Le Cardinal et al., 2013'] as const;

/** Fenêtre de logiciel, sur le modèle de `Browser`, avec un nom à la place de l'adresse. */
function AppWindow({ name, children }: { name: string; children: ReactNode }) {
  return (
    <g>
      <rect
        x={20}
        y={20}
        width={600}
        height={400}
        rx={10}
        fill={sceneColor('paper')}
        stroke={sceneColor('line')}
        strokeWidth={2}
      />
      <path
        d="M30 20h580a10 10 0 0 1 10 10v30h-600v-30a10 10 0 0 1 10-10z"
        fill={sceneColor('soft')}
      />
      <Label x={40} y={48} size={20} weight={700}>
        {name}
      </Label>
      {children}
    </g>
  );
}

/** Le pointeur enchaîne ses déplacements, chacun pendant une partie de son étape. */
const POINTER_STOPS: readonly Stop[] = [
  { step: 0, x: 470, y: 330 },
  { step: 1, x: 472, y: 226, to: 0.4 },
  { step: 2, x: 500, y: 126 },
  { step: 3, x: 520, y: 180 },
  { step: 4, x: 520, y: 366 },
];

function ArticleScreen({ frame }: { frame: SceneFrame }) {
  return (
    <Browser address="revue.exemple.org">
      <Label x={CONTENT_X} y={106} size={26} weight={700} display>
        Un article
      </Label>
      <Bar x={CONTENT_X} y={124} width={530} />
      <Bar x={CONTENT_X} y={146} width={490} />
      <Bar x={CONTENT_X} y={168} width={510} />
      <Card x={CONTENT_X} y={200} width={420} height={52} fill="accent" corner={12}>
        <Label x={254} y={234} anchor="middle" size={22} weight={700} color="paper">
          Enregistrer dans Zotero
        </Label>
      </Card>
      <Card
        x={CONTENT_X}
        y={270}
        width={170}
        height={46}
        fill="accentSoft"
        corner={12}
        opacity={appear(frame, 1, 0.5, 0.8)}
      >
        <Label x={129} y={301} anchor="middle" size={22} weight={700}>
          Enregistré
        </Label>
      </Card>
    </Browser>
  );
}

function LibraryScreen({ frame }: { frame: SceneFrame }) {
  return (
    <g opacity={during(frame, [2])}>
      <AppWindow name="Zotero">
        {REFERENCES.map((reference, index) => {
          const y = 90 + index * 84;
          return (
            <Card
              key={reference}
              x={CONTENT_X}
              y={y}
              width={CONTENT_WIDTH}
              height={72}
              fill={index === 0 ? 'accentSoft' : 'soft'}
              corner={12}
            >
              <Label x={64} y={y + 45} size={24}>
                {reference}
              </Label>
            </Card>
          );
        })}
        <Marker
          x={CONTENT_X}
          y={90}
          width={CONTENT_WIDTH}
          height={72}
          progress={appear(frame, 2, 0.3, 0.9)}
        />
      </AppWindow>
    </g>
  );
}

function WordScreen({ frame }: { frame: SceneFrame }) {
  const bibliography = appear(frame, 4, 0.1, 0.6);
  return (
    <g opacity={during(frame, [3, 4])}>
      <AppWindow name="Word">
        <Bar x={60} y={92} width={510} />
        <Bar x={60} y={120} width={480} />
        <Bar x={60} y={154} width={280} />
        <Label
          x={352}
          y={167}
          size={22}
          weight={700}
          color="accent"
          opacity={appear(frame, 3, 0.4, 0.8)}
        >
          (Castro, 2020)
        </Label>
        <Bar x={60} y={188} width={400} />
        <g opacity={bibliography}>
          <line x1={60} y1={222} x2={580} y2={222} stroke={sceneColor('line')} strokeWidth={2} />
          <Label x={60} y={262} size={24} weight={700} display>
            Bibliographie
          </Label>
          <Label x={60} y={302} size={22} weight={500}>
            Castro, D. (2020).
          </Label>
          <Bar x={60} y={318} width={420} />
          <Label x={60} y={372} size={22} weight={700} color="warm">
            À relire
          </Label>
        </g>
      </AppWindow>
    </g>
  );
}

function ZoteroVisual(frame: SceneFrame) {
  const [pointerX, pointerY] = travel(frame, [300, 380], POINTER_STOPS);
  const pressed =
    (frame.step === 1 && frame.progress > 0.42) || (frame.step === 3 && frame.progress > 0.35);
  return (
    <Stage>
      {frame.step <= 1 && <ArticleScreen frame={frame} />}
      {frame.step === 2 && <LibraryScreen frame={frame} />}
      {frame.step >= 3 && <WordScreen frame={frame} />}
      <Pointer x={pointerX} y={pointerY} pressed={pressed} />
    </Stage>
  );
}

const scene: SceneDefinition = {
  id: 'zotero',
  title: 'Zotero en cinq gestes',
  steps: [
    { caption: 'Sam ouvre un article dans son navigateur.', durationMs: 4000 },
    { caption: 'Un clic sur le bouton de Zotero enregistre la référence.', durationMs: 4000 },
    { caption: 'Sam la retrouve dans sa bibliothèque Zotero, avec les autres.', durationMs: 4000 },
    { caption: 'Dans Word, Sam insère la citation en deux clics.', durationMs: 4000 },
    { caption: 'Zotero écrit la bibliographie tout seul. Il reste à la relire.', durationMs: 4000 },
  ],
  Visual: ZoteroVisual,
};

export default scene;
