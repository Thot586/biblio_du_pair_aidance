import type { ReactNode } from 'react';
import {
  appear,
  Card,
  clamp01,
  Label,
  lerp,
  Marker,
  Stage,
  sceneColor,
} from '@/features/scene-player/kit';
import type { SceneDefinition, SceneFrame } from '@/features/scene-player/types';

const COLUMNS = 7;
const ROWS = 5;
const CELL = 38;
const SQUARE = 20;
const CLOUD_TOP = 84;
const SQUARE_COUNT = COLUMNS * ROWS;
const INDEXES = Array.from({ length: SQUARE_COUNT }, (_, index) => index);

const LEFT_X = 20;
const RIGHT_X = 330;
const PANEL_WIDTH = 290;

/** Résultats utiles : les carrés en couleur. Tout est écrit à la main, sans hasard. */
const NOISE_USEFUL: readonly number[] = [3, 11, 17, 26, 32];
const NOISE_KEPT: readonly number[] = [9, 23, 30];
const SILENCE_START: readonly number[] = [10, 17, 24];
const SILENCE_ADDED: readonly number[] = [3, 8, 12, 15, 19, 22, 26, 31];
const SILENCE_USEFUL: readonly number[] = [3, 12, 17, 19, 26, 31];

function squarePosition(index: number, panelX: number, gather: number) {
  const row = Math.floor(index / COLUMNS);
  const column = index % COLUMNS;
  // Petit décalage fixe : le nuage paraît désordonné, mais il reste identique à chaque image.
  const x = panelX + 12 + column * CELL + ((index * 7) % 5) * 2;
  const y = CLOUD_TOP + row * CELL + ((index * 3) % 5) * 2;
  const centerX = panelX + PANEL_WIDTH / 2 - SQUARE / 2;
  const centerY = CLOUD_TOP + (ROWS * CELL) / 2 - SQUARE / 2;
  return {
    x: lerp(x, centerX, gather * 0.25),
    y: lerp(y, centerY, gather * 0.25),
  };
}

function formatCount(value: number): string {
  return String(Math.round(value)).replace(/\B(?=(\d{3})+$)/g, ' ');
}

function Panel({
  x,
  title,
  count,
  opacity,
  children,
}: {
  x: number;
  title: string;
  count: number;
  opacity: number;
  children: ReactNode;
}) {
  const middle = x + PANEL_WIDTH / 2;
  return (
    <Card x={x} y={20} width={PANEL_WIDTH} height={400} stroke="line" opacity={opacity}>
      <Label x={middle} y={62} anchor="middle" weight={700} display>
        {title}
      </Label>
      {children}
      <Label x={middle} y={356} anchor="middle" size={44} weight={700} display>
        {formatCount(count)}
      </Label>
      <Label x={middle} y={398} anchor="middle" size={22} weight={500} color="muted">
        résultats
      </Label>
    </Card>
  );
}

function NoiseSilenceVisual(frame: SceneFrame) {
  const narrowed = appear(frame, 1);
  const silence = appear(frame, 2, 0, 0.4);
  const widened = appear(frame, 3);
  const adjusted = appear(frame, 4);
  return (
    <Stage>
      <Panel
        x={LEFT_X}
        title="Le bruit"
        count={lerp(12400, 180, narrowed)}
        opacity={appear(frame, 0, 0, 0.4)}
      >
        {INDEXES.map((index) => {
          const useful = NOISE_USEFUL.includes(index);
          const stays = useful || NOISE_KEPT.includes(index);
          const leaveAt = ((index * 5) % SQUARE_COUNT) / SQUARE_COUNT;
          const opacity = stays ? 1 : 1 - clamp01((narrowed - leaveAt * 0.7) / 0.3);
          const { x, y } = squarePosition(index, LEFT_X, narrowed);
          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={SQUARE}
              height={SQUARE}
              fill={sceneColor(useful ? 'accent' : 'line')}
              opacity={opacity}
            />
          );
        })}
      </Panel>
      <Panel x={RIGHT_X} title="Le silence" count={lerp(3, 150, widened)} opacity={silence}>
        {[...SILENCE_START, ...SILENCE_ADDED].map((index, order) => {
          const added = order - SILENCE_START.length;
          const start = (added / SILENCE_ADDED.length) * 0.7;
          const opacity = added < 0 ? 1 : clamp01((widened - start) / 0.3);
          const { x, y } = squarePosition(index, RIGHT_X, 1 - widened);
          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={SQUARE}
              height={SQUARE}
              fill={sceneColor(SILENCE_USEFUL.includes(index) ? 'accent' : 'line')}
              opacity={opacity}
            />
          );
        })}
      </Panel>
      <Marker x={LEFT_X + 35} y={310} width={220} height={64} progress={adjusted} />
      <Marker x={RIGHT_X + 35} y={310} width={220} height={64} progress={adjusted} />
    </Stage>
  );
}

const scene: SceneDefinition = {
  id: 'bruit-silence',
  title: 'Le bruit et le silence',
  steps: [
    {
      caption:
        'Une recherche trop large donne du [[bruit|bruit]] : beaucoup de résultats, mais peu d’utiles.',
      durationMs: 5000,
    },
    {
      caption: 'Pour réduire le bruit, on resserre : ET, guillemets, filtre de date.',
      durationMs: 4000,
    },
    {
      caption:
        'À l’inverse, une recherche trop étroite donne du [[silence|silence]] : presque rien.',
      durationMs: 4000,
    },
    {
      caption: 'Pour réduire le silence, on élargit : OU, synonymes, anglais, autre outil.',
      durationMs: 4000,
    },
    {
      caption: 'On ajuste ainsi plusieurs fois, jusqu’à obtenir des résultats vraiment utiles.',
      durationMs: 4000,
    },
  ],
  Visual: NoiseSilenceVisual,
};

export default scene;
