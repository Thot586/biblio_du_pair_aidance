import { render } from '@testing-library/react';
import type { SceneId } from '@/content/types';
import { STAGE } from '@/features/scene-player/kit';
import { sceneLoaders } from './registry';

const SCENE_IDS = Object.keys(sceneLoaders) as SceneId[];

/** Taille minimale pour rester lisible sur un téléphone de 360 px. */
const MINIMUM_TEXT_SIZE = 20;
/** La barre d'adresse du navigateur redessiné est un simple décor. */
const ADDRESS_BAR_SIZE = 15;
/** Largeur moyenne d'un caractère, rapportée à la taille du texte. */
const CHARACTER_WIDTH = 0.5;

function textBounds(element: SVGTextElement): { left: number; right: number } {
  const x = Number(element.getAttribute('x'));
  const size = Number(element.getAttribute('font-size'));
  const width = (element.textContent ?? '').length * size * CHARACTER_WIDTH;
  const anchor = element.getAttribute('text-anchor');
  if (anchor === 'middle') return { left: x - width / 2, right: x + width / 2 };
  if (anchor === 'end') return { left: x - width, right: x };
  return { left: x, right: x + width };
}

describe.each(SCENE_IDS)('l’animation %s', (id) => {
  it('a un scénario complet et lisible', async () => {
    const { default: scene } = await sceneLoaders[id]();
    expect(scene.id).toBe(id);
    expect(scene.title.length).toBeGreaterThan(3);
    expect(scene.steps.length).toBeGreaterThanOrEqual(3);
    for (const step of scene.steps) {
      expect(step.caption.length).toBeLessThanOrEqual(150);
      expect(step.durationMs).toBeGreaterThanOrEqual(2500);
    }
    expect(new Set(scene.steps.map((step) => step.caption)).size).toBe(scene.steps.length);
  });

  it('se dessine à chaque étape, sans texte trop petit ni débordement', async () => {
    const { default: scene } = await sceneLoaders[id]();
    const { Visual } = scene;
    const faults = new Set<string>();

    scene.steps.forEach((_, step) => {
      for (const progress of [0, 0.5, 1]) {
        const { container, unmount } = render(<Visual step={step} progress={progress} />);
        container.querySelectorAll('text').forEach((element) => {
          const label = `étape ${step + 1} : ${element.textContent}`;
          const size = Number(element.getAttribute('font-size'));
          if (size < MINIMUM_TEXT_SIZE && size !== ADDRESS_BAR_SIZE) {
            faults.add(`${label} (taille ${size})`);
          }
          // Une image de transition peut glisser depuis l'extérieur : on contrôle l'image finale.
          if (progress === 1) {
            const { left, right } = textBounds(element);
            if (left < 0 || right > STAGE.width) faults.add(`${label} (déborde)`);
          }
        });
        unmount();
      }
    });

    expect([...faults]).toEqual([]);
  });
});
