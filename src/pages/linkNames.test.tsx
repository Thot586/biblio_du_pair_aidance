import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { routes } from '@/app/router';
import { course } from '@/content/course';

/**
 * Un lien doit dire où il mène, sans que l'on ait besoin de lire autour : c'est ce que lit une
 * personne qui parcourt la liste des liens, et ce que retient quelqu'un qui survole la page.
 */
const GENERIC_NAME =
  /^(page|section|étape)\s+(précédente|suivante)$|^ouvrir l[’']outil$|^(voir plus|en savoir plus|cliquez ici|ici|lire la suite|suite)$/i;

const PATHS = [
  '/',
  '/outils',
  '/glossaire',
  '/aide',
  '/a-propos',
  '/sources',
  ...course.flatMap((section) => [
    `/${section.slug}`,
    `/${section.slug}/quiz`,
    ...section.lessons.map((lesson) => `/${section.slug}/${lesson.slug}`),
  ]),
];

function linkNamesByDestination(container: HTMLElement): Map<string, Set<string>> {
  const destinations = new Map<string, Set<string>>();
  for (const link of container.querySelectorAll('a[href]')) {
    const name = (link.getAttribute('aria-label') ?? link.textContent ?? '')
      .replace(/\s+/g, ' ')
      .trim();
    if (!name) continue;
    destinations.set(
      name,
      (destinations.get(name) ?? new Set()).add(link.getAttribute('href') ?? ''),
    );
  }
  return destinations;
}

describe('les noms des liens', () => {
  it.each(PATHS)('%s : chaque lien dit où il mène', (path) => {
    const router = createMemoryRouter(routes, { initialEntries: [path] });
    const { container } = render(<RouterProvider router={router} />);
    const destinations = linkNamesByDestination(container);

    const generic = [...destinations.keys()].filter((name) => GENERIC_NAME.test(name));
    const ambiguous = [...destinations].filter(([, hrefs]) => hrefs.size > 1).map(([name]) => name);

    expect({ generic, ambiguous }).toEqual({ generic: [], ambiguous: [] });
  });
});
