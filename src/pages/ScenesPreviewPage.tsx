import { Suspense, use } from 'react';
import type { SceneId } from '@/content/types';
import type { SceneDefinition } from '@/features/scene-player/types';
import { sceneLoaders } from '@/scenes/registry';

const IDS = Object.keys(sceneLoaders) as SceneId[];
const allScenes = Promise.all(IDS.map((id) => sceneLoaders[id]().then((module) => module.default)));

function Thumbnail({ scene, step }: { scene: SceneDefinition; step: number }) {
  const { Visual } = scene;
  return (
    <figure style={{ margin: 0, width: 340 }}>
      <figcaption style={{ fontSize: 14 }}>
        {scene.id}, étape {step + 1} sur {scene.steps.length}
      </figcaption>
      <Visual step={step} progress={1} />
    </figure>
  );
}

function Sheet() {
  const scenes = use(allScenes);
  const page = new URLSearchParams(window.location.search).get('etape');
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {scenes.map((scene) => {
        const last = scene.steps.length - 1;
        const step = page === 'milieu' ? Math.floor(last / 2) : last;
        return <Thumbnail key={scene.id} scene={scene} step={step} />;
      })}
    </div>
  );
}

/** Planche de contrôle, en développement seulement : toutes les animations à taille de téléphone. */
export function ScenesPreviewPage() {
  return (
    <Suspense fallback={<p>Chargement.</p>}>
      <Sheet />
    </Suspense>
  );
}
