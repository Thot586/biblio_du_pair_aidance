import { createHashRouter } from 'react-router';
import { AboutPage } from '@/pages/AboutPage';
import { GlossaryPage } from '@/pages/GlossaryPage';
import { HelpPage } from '@/pages/HelpPage';
import { HomePage } from '@/pages/HomePage';
import { LessonPage } from '@/pages/LessonPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { QuizPage } from '@/pages/QuizPage';
import { SectionPage } from '@/pages/SectionPage';
import { SourcesPage } from '@/pages/SourcesPage';
import { ToolboxPage } from '@/pages/ToolboxPage';
import { ToolPage } from '@/pages/ToolPage';
import { RootLayout } from './RootLayout';

/**
 * Routage par ancre (`#/...`) : GitHub Pages sert des fichiers statiques et ne connaît pas
 * les adresses du site. Ainsi, un lien partagé fonctionne toujours.
 */
export const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'outils', element: <ToolboxPage /> },
      { path: 'outils/:toolSlug', element: <ToolPage /> },
      { path: 'glossaire', element: <GlossaryPage /> },
      { path: 'aide', element: <HelpPage /> },
      { path: 'sources', element: <SourcesPage /> },
      { path: 'a-propos', element: <AboutPage /> },
      { path: ':sectionSlug', element: <SectionPage /> },
      { path: ':sectionSlug/quiz', element: <QuizPage /> },
      { path: ':sectionSlug/:lessonSlug', element: <LessonPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
