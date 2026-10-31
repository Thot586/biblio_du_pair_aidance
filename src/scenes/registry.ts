import type { SceneId } from '@/content/types';
import type { SceneDefinition } from '@/features/scene-player/types';

type SceneLoader = () => Promise<{ default: SceneDefinition }>;

/** Chaque animation est chargée à la demande, pour garder le site léger sur téléphone. */
export const sceneLoaders: Partial<Record<SceneId, SceneLoader>> = {
  entonnoir: () => import('./entonnoir'),
};
