import {
  appear,
  Arrow,
  Card,
  Label,
  Lines,
  Marker,
  sceneColor,
  Stage,
} from '@/features/scene-player/kit';
import type { SceneDefinition, SceneFrame } from '@/features/scene-player/types';

const PARAGRAPH_LEFT = 28;
const rowY = (row: number) => 56 + row * 42;

/** Lignes grises du paragraphe : `row` donne la rangée, `width` la longueur. */
const GREY_LINES = [
  { row: 0, width: 276 },
  { row: 1, width: 276 },
  { row: 2, width: 106 },
  { row: 3, width: 276 },
  { row: 6, width: 190 },
] as const;

interface Reference {
  lines: readonly string[];
  y: number;
  /** Hauteur de l'arrivée de la flèche, et point de départ dans le paragraphe. */
  arrowY: number;
  fromRow: number;
}

/** Une seule citation renvoie à deux références : les trois lignes ont donc leur citation. */
const REFERENCES: readonly Reference[] = [
  { lines: ['Castro, 2020'], y: 100, arrowY: 93, fromRow: 2 },
  { lines: ['Franck & Cellard,', '2020'], y: 166, arrowY: 172, fromRow: 4 },
  { lines: ['Le Cardinal et al.,', '2013'], y: 258, arrowY: 265, fromRow: 5 },
];

function CitationListVisual(frame: SceneFrame) {
  const list = appear(frame, 1, 0, 0.4);
  const rule = appear(frame, 3);
  return (
    <Stage>
      <Card x={16} y={20} width={300} height={336} stroke="line" opacity={appear(frame, 0)}>
        {GREY_LINES.map((line) => (
          <rect
            key={line.row}
            x={PARAGRAPH_LEFT}
            y={rowY(line.row) - 7}
            width={line.width}
            height={14}
            fill={sceneColor('line')}
          />
        ))}
        <Label x={144} y={rowY(2) + 7} size={20} weight={700} color="accent">
          (Castro, 2020)
        </Label>
        <Label x={PARAGRAPH_LEFT} y={rowY(4) + 7} size={20} weight={700} color="accent">
          (Franck & Cellard, 2020 ;
        </Label>
        <Label x={PARAGRAPH_LEFT} y={rowY(5) + 7} size={20} weight={700} color="accent">
          Le Cardinal et al., 2013)
        </Label>
      </Card>
      <Card x={392} y={20} width={236} height={336} stroke="line" opacity={list}>
        <Label x={404} y={56} size={22} weight={700} display>
          Bibliographie
        </Label>
        {REFERENCES.map((reference) => (
          <Lines
            key={reference.y}
            x={404}
            y={reference.y}
            size={20}
            lineHeight={1.3}
            lines={reference.lines}
          />
        ))}
      </Card>
      {REFERENCES.map((reference, index) => (
        <g key={reference.y}>
          <Arrow
            from={[320, rowY(reference.fromRow)]}
            to={[396, reference.arrowY]}
            progress={appear(frame, 1, 0.2 + index * 0.2, 0.5 + index * 0.2)}
          />
          <Marker
            x={400}
            y={reference.y - 22}
            width={24}
            height={30}
            progress={appear(frame, 2, index * 0.25, 0.3 + index * 0.25)}
          />
        </g>
      ))}
      <Card x={40} y={372} width={560} height={56} fill="accent" corner={14} opacity={rule}>
        <Label x={288} y={409} anchor="end" size={24} weight={700} color="paper">
          Citation
        </Label>
        <Arrow from={[320, 400]} to={[296, 400]} color="paper" />
        <Arrow from={[320, 400]} to={[344, 400]} color="paper" />
        <Label x={352} y={409} size={24} weight={700} color="paper">
          référence
        </Label>
      </Card>
    </Stage>
  );
}

const scene: SceneDefinition = {
  id: 'citer-texte-liste',
  title: 'Du texte à la liste',
  steps: [
    {
      caption: 'Dans votre texte, chaque idée empruntée porte une citation : le nom et l’année.',
      durationMs: 5000,
    },
    {
      caption: 'Cette citation renvoie à une ligne de votre [[bibliographie|bibliographie]].',
      durationMs: 4000,
    },
    {
      caption: 'La liste est rangée par ordre alphabétique, selon le premier auteur.',
      durationMs: 4000,
    },
    {
      caption: 'Retenez la règle : à chaque citation sa référence, à chaque référence sa citation.',
      durationMs: 5000,
    },
  ],
  Visual: CitationListVisual,
};

export default scene;
