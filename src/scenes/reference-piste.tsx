import {
  appear,
  Arrow,
  Card,
  Label,
  Stage,
  sceneColor,
  type SceneColor,
} from '@/features/scene-player/kit';
import type { SceneDefinition, SceneFrame } from '@/features/scene-player/types';

interface Bar {
  x: number;
  y: number;
  width: number;
}

const PAGE_BARS: readonly Bar[] = [
  { x: 48, y: 74, width: 188 },
  { x: 48, y: 104, width: 170 },
  { x: 48, y: 134, width: 188 },
  { x: 48, y: 164, width: 120 },
  { x: 48, y: 262, width: 188 },
  { x: 48, y: 292, width: 160 },
  { x: 48, y: 322, width: 188 },
  { x: 48, y: 352, width: 96 },
];

const BIBLIOGRAPHY_BARS: readonly Bar[] = [
  { x: 360, y: 148, width: 236 },
  { x: 360, y: 168, width: 190 },
];

const ARTICLE_BARS: readonly Bar[] = [
  { x: 360, y: 330, width: 236 },
  { x: 360, y: 352, width: 210 },
  { x: 360, y: 374, width: 150 },
];

const TO_BIBLIOGRAPHY = { from: [252, 214], to: [348, 118] } as const;
const TO_ARTICLE = { from: [478, 196], to: [478, 264] } as const;

function Bars({ bars }: { bars: readonly Bar[] }) {
  return (
    <>
      {bars.map((bar) => (
        <rect
          key={`${bar.x}-${bar.y}`}
          x={bar.x}
          y={bar.y}
          width={bar.width}
          height={10}
          fill={sceneColor('line')}
        />
      ))}
    </>
  );
}

function Highlight({
  x,
  y,
  width,
  text,
  fill,
  opacity,
}: {
  x: number;
  y: number;
  width: number;
  text: string;
  fill: SceneColor;
  opacity: number;
}) {
  return (
    <g opacity={opacity}>
      <rect x={x} y={y} width={width} height={42} rx={6} fill={sceneColor(fill)} />
      <Label x={x + width / 2} y={y + 29} anchor="middle" size={22} weight={700}>
        {text}
      </Label>
    </g>
  );
}

function ReferenceTrailVisual(frame: SceneFrame) {
  const citation = appear(frame, 0);
  const bibliography = appear(frame, 1, 0.25, 0.8);
  const article = appear(frame, 2, 0.25, 0.8);
  return (
    <Stage>
      <Card x={24} y={40} width={236} height={360} stroke="line">
        <Bars bars={PAGE_BARS} />
      </Card>
      <Highlight
        x={36}
        y={194}
        width={212}
        text="(Castro, 2020)"
        fill="accentSoft"
        opacity={citation}
      />

      <Card x={340} y={30} width={276} height={166} stroke="line" opacity={bibliography}>
        <Label x={360} y={72} weight={700}>
          Bibliographie
        </Label>
        <Bars bars={BIBLIOGRAPHY_BARS} />
      </Card>
      <Highlight
        x={352}
        y={92}
        width={252}
        text="Castro, D. (2020)"
        fill="accentSoft"
        opacity={bibliography}
      />

      <Card x={340} y={270} width={276} height={136} stroke="line" opacity={article}>
        <Label x={360} y={312} size={28} weight={700} display>
          L’article
        </Label>
        <Bars bars={ARTICLE_BARS} />
      </Card>

      <Arrow {...TO_BIBLIOGRAPHY} progress={appear(frame, 1, 0, 0.4)} />
      <Arrow {...TO_ARTICLE} progress={appear(frame, 2, 0, 0.4)} />
      <Arrow {...TO_BIBLIOGRAPHY} progress={appear(frame, 3, 0, 0.4)} color="warm" width={6} />
      <Arrow {...TO_ARTICLE} progress={appear(frame, 3, 0.4, 0.8)} color="warm" width={6} />
    </Stage>
  );
}

const scene: SceneDefinition = {
  id: 'reference-piste',
  title: 'À quoi sert une référence ?',
  steps: [
    {
      caption: 'Dans son mémoire, Sam présente une idée, et ajoute (Castro, 2020) juste après.',
      durationMs: 4000,
    },
    {
      caption:
        'À la fin du mémoire, la [[bibliographie|bibliographie]] donne la référence complète de ce document.',
      durationMs: 5000,
    },
    {
      caption:
        'Grâce à cette référence, un lecteur peut retrouver l’article et le lire à son tour.',
      durationMs: 5000,
    },
    {
      caption:
        'C’est tout l’intérêt d’une référence : laisser une piste que d’autres peuvent suivre.',
      durationMs: 5000,
    },
  ],
  Visual: ReferenceTrailVisual,
};

export default scene;
