import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { routes } from '@/app/router';
import { course } from '@/content/course';
import type { LessonKey } from '@/content/types';
import { clearProgress, setLessonRead } from '@/features/progress/progressStore';
import { TOOL_GROUPS, TOOLS } from '@/features/tools/catalog';
import { frenchSpacing } from '@/shared/lib/text';

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  return render(<RouterProvider router={router} />);
}

function markRead(...keys: LessonKey[]) {
  for (const key of keys) setLessonRead(key, true);
}

async function expectNoAccessibilityViolation(container: HTMLElement) {
  const results = await axe.run(container, {
    rules: { 'color-contrast': { enabled: false }, region: { enabled: false } },
  });
  expect(results.violations.map((violation) => `${violation.id} : ${violation.help}`)).toEqual([]);
}

describe('l’accueil', () => {
  it('présente le titre et toutes les sections', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Recherche documentaire et IA, pas à pas',
    );
    for (const section of course) {
      expect(
        screen.getByRole('link', { name: new RegExp(frenchSpacing(section.question)) }),
      ).toBeInTheDocument();
    }
  });

  it('nomme les auteurs et affiche les logos', () => {
    renderAt('/');
    const footer = screen.getByRole('contentinfo');
    expect(
      within(footer).getByText(/Dr FENOHASINA T\.J\. Félicien et Mme LONG Aude/),
    ).toBeInTheDocument();
    expect(within(footer).getAllByRole('img')).toHaveLength(3);
  });

  it('est accessible', async () => {
    const { container } = renderAt('/');
    await expectNoAccessibilityViolation(container);
  });

  it('propose de commencer à une personne qui arrive', () => {
    clearProgress();
    renderAt('/');
    expect(screen.getByRole('link', { name: 'Commencer le parcours' })).toHaveAttribute(
      'href',
      `/${course[0]?.slug}/${course[0]?.lessons[0]?.slug}`,
    );
  });

  it('propose de continuer à une personne qui a déjà lu', () => {
    clearProgress();
    markRead('commencer/pourquoi-chercher');
    renderAt('/');
    expect(screen.getByRole('link', { name: 'Continuer le parcours' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Commencer le parcours' })).not.toBeInTheDocument();
    expect(screen.getByText(/1 page lue sur 40/)).toBeInTheDocument();
    clearProgress();
  });

  it('dit combien de temps prend chaque section', () => {
    renderAt('/');
    expect(screen.queryByText('À découvrir')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Comment citer et faire/ })).toHaveTextContent(
      /\d+ pages, environ/,
    );
  });
});

describe('la navigation', () => {
  it('garde l’onglet Parcours allumé dans une leçon', () => {
    renderAt('/citer/exemples');
    const nav = screen.getByRole('navigation', { name: 'Navigation principale' });
    expect(within(nav).getByRole('link', { name: 'Parcours' })).toHaveAttribute(
      'aria-current',
      'true',
    );
  });

  it('allume l’onglet de la boîte à outils dans un outil', () => {
    renderAt('/outils/generateur-apa');
    const nav = screen.getByRole('navigation', { name: 'Navigation principale' });
    expect(within(nav).getByRole('link', { name: 'Parcours' })).not.toHaveAttribute('aria-current');
    expect(within(nav).getByRole('link', { name: 'Boîte à outils' })).toHaveAttribute(
      'aria-current',
    );
  });
});

describe('la recherche', () => {
  it('mène à la page de résultats depuis n’importe quelle page', async () => {
    const user = userEvent.setup();
    renderAt('/aide');

    await user.type(
      screen.getByRole('searchbox', { name: 'Rechercher sur le site' }),
      'doi{Enter}',
    );

    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(/Résultats pour/);
    expect(screen.getByRole('link', { name: /^DOI/ })).toHaveAttribute('href', '/glossaire#doi');
  });

  it('ne change pas de page pendant la frappe', async () => {
    const user = userEvent.setup();
    renderAt('/aide');

    await user.type(screen.getByRole('searchbox', { name: 'Rechercher sur le site' }), 'doi');

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Qui peut m’aider');
  });

  it('remet la recherche dans le champ quand on arrive par un lien', () => {
    renderAt('/recherche?q=apa');
    expect(screen.getByRole('searchbox', { name: 'Rechercher sur le site' })).toHaveValue('apa');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('apa');
  });

  it('aide à repartir quand rien n’est trouvé', () => {
    renderAt('/recherche?q=xylophone');
    expect(screen.getByText(/Rien ne correspond/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Je ne sais pas où chercher/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'qui contacter' })).toHaveAttribute('href', '/aide');
  });

  it('propose des situations quand le champ est vide', () => {
    renderAt('/recherche');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Que cherchez-vous');
    expect(screen.getByRole('link', { name: /Je ne sais pas où chercher/ })).toBeInTheDocument();
  });

  it('est accessible', async () => {
    const { container } = renderAt('/recherche?q=apa');
    await expectNoAccessibilityViolation(container);
  });
});

describe('une section', () => {
  it('liste ses leçons et son quiz', () => {
    renderAt('/question');
    expect(screen.getByRole('link', { name: /Comment préciser mon sujet/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Le quiz/ })).toBeInTheDocument();
  });

  it('propose de commencer, puis de continuer', () => {
    clearProgress();
    const { unmount } = renderAt('/question');
    expect(screen.getByRole('link', { name: 'Commencer cette section' })).toBeInTheDocument();
    unmount();

    markRead('question/bonne-question');
    renderAt('/question');
    expect(screen.getByRole('link', { name: 'Continuer cette section' })).toBeInTheDocument();
    clearProgress();
  });

  it('mène à la section suivante', () => {
    renderAt('/question');
    expect(screen.getByRole('link', { name: 'Section suivante : Mes mots' })).toHaveAttribute(
      'href',
      '/mots',
    );
  });

  it('montre où l’on se trouve', () => {
    renderAt('/question');
    const trail = screen.getByRole('navigation', { name: 'Fil d’Ariane' });
    expect(within(trail).getByRole('link', { name: 'Parcours' })).toHaveAttribute('href', '/');
  });
});

describe('une leçon', () => {
  it('s’affiche, enregistre la lecture et propose la suite', async () => {
    const user = userEvent.setup();
    renderAt('/question/bonne-question');

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'À quoi ressemble une bonne question ?',
    );
    const read = screen.getByRole('checkbox', { name: 'J’ai lu cette page' });
    await user.click(read);
    expect(read).toBeChecked();
    expect(screen.getByRole('link', { name: /^Page suivante/ })).toHaveTextContent(
      'Comment explorer mon sujet avec une carte mentale ?',
    );
    clearProgress();
  });

  it('place l’essentiel avant le détail de la page', () => {
    renderAt('/question/bonne-question');
    const essential = screen.getByRole('region', { name: 'L’essentiel' });
    const firstDetail = screen.getByRole('checkbox', { name: 'J’ai lu cette page' });
    expect(
      essential.compareDocumentPosition(firstDetail) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('dit à quelle page de la section on se trouve', () => {
    renderAt('/citer/exemples');
    expect(screen.getByText(/Page 4 sur 8/)).toBeInTheDocument();
  });

  it('marque la page comme lue quand on passe à la suivante', async () => {
    const user = userEvent.setup();
    clearProgress();
    renderAt('/question/bonne-question');

    await user.click(screen.getByRole('link', { name: /^Page suivante/ }));

    await user.click(await screen.findByRole('link', { name: 'Page précédente' }));
    expect(await screen.findByRole('checkbox', { name: 'J’ai lu cette page' })).toBeChecked();
    clearProgress();
  });

  it('mène au quiz depuis la dernière page d’une section', () => {
    renderAt('/citer/erreurs-frequentes');
    expect(
      screen.getByRole('link', { name: 'Vérifier ce que j’ai compris avec le quiz' }),
    ).toHaveAttribute('href', '/citer/quiz');
  });

  it('est accessible', async () => {
    const { container } = renderAt('/citer/exemples');
    await expectNoAccessibilityViolation(container);
  });
});

describe('un quiz', () => {
  it('explique la réponse puis passe à la suite', async () => {
    const user = userEvent.setup();
    renderAt('/question/quiz');

    expect(screen.getByRole('button', { name: 'Vérifier ma réponse' })).toBeDisabled();
    await user.click(
      screen.getByRole('radio', { name: frenchSpacing('Les pair-aidants sont-ils utiles ?') }),
    );
    await user.click(screen.getByRole('button', { name: 'Vérifier ma réponse' }));

    expect(screen.getByText(/Celle-ci est trop large/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Question suivante' }));
    expect(screen.getByText('Question 2 sur 5')).toBeInTheDocument();
  });
});

describe('la boîte à outils', () => {
  it('range chaque outil dans un seul groupe', () => {
    const grouped = TOOL_GROUPS.flatMap((group) => group.tools.map((tool) => tool.id));
    expect([...grouped].sort()).toEqual(TOOLS.map((tool) => tool.id).sort());
  });

  it('nomme les groupes selon ce que la personne veut faire', () => {
    renderAt('/outils');
    for (const group of TOOL_GROUPS) {
      expect(screen.getByRole('heading', { name: group.title })).toBeInTheDocument();
    }
  });
});

describe('les outils', () => {
  it.each(TOOLS.map((tool) => [tool.title, tool.slug] as const))(
    '%s s’ouvre',
    async (title, slug) => {
      const { container } = renderAt(`/outils/${slug}`);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(title);
      await waitFor(() => expect(screen.queryByText(/Chargement/)).not.toBeInTheDocument(), {
        timeout: 5000,
      });
      await expectNoAccessibilityViolation(container);
    },
  );
});

describe('les pages de service', () => {
  it('affiche une page inconnue sans planter', () => {
    renderAt('/page-qui-nexiste-pas');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Cette page n’existe pas');
  });

  it('cherche dans le glossaire', async () => {
    const user = userEvent.setup();
    renderAt('/glossaire');
    await user.type(screen.getByRole('searchbox', { name: 'Filtrer cette liste' }), 'thesaurus');
    expect(screen.getByText('Thésaurus')).toBeInTheDocument();
    expect(screen.queryByText('DOI')).not.toBeInTheDocument();
  });

  it('laisse la page sur le mot visé par un lien vers le glossaire', async () => {
    const scrollToTop = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    const scrollToWord = vi.fn();
    Element.prototype.scrollIntoView = scrollToWord;
    const router = createMemoryRouter(routes, { initialEntries: ['/aide'] });
    render(<RouterProvider router={router} />);
    scrollToTop.mockClear();

    await act(() => router.navigate('/glossaire#doi'));

    expect(scrollToWord).toHaveBeenCalled();
    expect(scrollToTop).not.toHaveBeenCalled();
    scrollToTop.mockRestore();
  });

  it('donne les contacts des documentalistes', () => {
    renderAt('/aide');
    expect(
      screen.getByRole('link', { name: 'bibliotheque-crr@ch-le-vinatier.fr' }),
    ).toHaveAttribute('href', 'mailto:bibliotheque-crr@ch-le-vinatier.fr');
  });
});
