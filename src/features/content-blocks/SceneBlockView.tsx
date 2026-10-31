import { Suspense, use } from 'react';
import type { SceneId } from '@/content/types';
import { ScenePlayer } from '@/features/scene-player/ScenePlayer';
import type { SceneDefinition } from '@/features/scene-player/types';
import { sceneLoaders } from '@/scenes/registry';

const loadedScenes = new Map<SceneId, Promise<SceneDefinition>>();

function loadScene(id: SceneId): Promise<SceneDefinition> {
  const known = loadedScenes.get(id);
  if (known) return known;

  const loader = sceneLoaders[id];
  if (!loader) throw new Error(`Animation inconnue : ${id}`);
  const loading = loader().then((module) => module.default);
  loadedScenes.set(id, loading);
  return loading;
}

function LoadedScene({ id }: { id: SceneId }) {
  return <ScenePlayer scene={use(loadScene(id))} />;
}

export function SceneBlockView({ id }: { id: SceneId }) {
  if (!sceneLoaders[id]) return null;
  return (
    <Suspense fallback={<p>Chargement de l'animation.</p>}>
      <LoadedScene id={id} />
    </Suspense>
  );
}
