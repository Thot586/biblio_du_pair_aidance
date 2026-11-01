import { lazy } from 'react';
import type { ToolId } from '@/content/types';

// Le code d’un outil n’est chargé que lorsqu’on l’ouvre.
const QuestionBuilder = lazy(() =>
  import('@/features/question-builder/QuestionBuilder').then((module) => ({
    default: module.QuestionBuilder,
  })),
);
const SearchBuilder = lazy(() =>
  import('@/features/search-builder/SearchBuilder').then((module) => ({
    default: module.SearchBuilder,
  })),
);
const ToolChooser = lazy(() =>
  import('@/features/tool-chooser/ToolChooser').then((module) => ({
    default: module.ToolChooser,
  })),
);
const ApaFormatter = lazy(() =>
  import('@/features/apa/components/ApaFormatter').then((module) => ({
    default: module.ApaFormatter,
  })),
);
const ReferenceChecker = lazy(() =>
  import('@/features/reference-checker/ReferenceChecker').then((module) => ({
    default: module.ReferenceChecker,
  })),
);
const PromptBuilder = lazy(() =>
  import('@/features/prompt-builder/PromptBuilder').then((module) => ({
    default: module.PromptBuilder,
  })),
);
const AiDeclaration = lazy(() =>
  import('@/features/ai-declaration/AiDeclaration').then((module) => ({
    default: module.AiDeclaration,
  })),
);

export function ToolView({ id }: { id: ToolId }) {
  switch (id) {
    case 'atelier-question':
      return <QuestionBuilder />;
    case 'constructeur-equation':
      return <SearchBuilder />;
    case 'choisir-outil':
      return <ToolChooser />;
    case 'mise-en-forme-apa':
      return <ApaFormatter />;
    case 'verifier-reference':
      return <ReferenceChecker />;
    case 'preparer-prompt':
      return <PromptBuilder />;
    case 'declaration-ia':
      return <AiDeclaration />;
  }
}
