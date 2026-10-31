import type { ComponentType } from 'react';
import type { SceneId } from '@/content/types';

/** Position dans une animation : `progress` va de 0 à 1 à l'intérieur de l'étape. */
export interface SceneFrame {
  step: number;
  progress: number;
}

export interface SceneStep {
  /** Le texte affiché à côté de l'animation et lu par le bouton Écouter. Accepte `[[terme]]`. */
  caption: string;
  durationMs: number;
}

export interface SceneDefinition {
  id: SceneId;
  title: string;
  steps: SceneStep[];
  /** Une scène dessine une image à partir de la position : mêmes entrées, même image. */
  Visual: ComponentType<SceneFrame>;
}
