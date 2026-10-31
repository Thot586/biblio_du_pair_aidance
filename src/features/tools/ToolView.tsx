import { lazy } from 'react';
import type { ToolId } from '@/content/types';

// Le code d'un outil n'est chargé que lorsqu'on l'ouvre.
const QuestionBuilder = lazy(() =>
  import('@/features/question-builder/QuestionBuilder').then((module) => ({
    default: module.QuestionBuilder,
  })),
);
const ApaGenerator = lazy(() =>
  import('@/features/apa/components/ApaGenerator').then((module) => ({
    default: module.ApaGenerator,
  })),
);

export function ToolView({ id }: { id: ToolId }) {
  switch (id) {
    case 'atelier-question':
      return <QuestionBuilder />;
    case 'generateur-apa':
      return <ApaGenerator />;
    default:
      return <p>Cet outil arrive bientôt.</p>;
  }
}
