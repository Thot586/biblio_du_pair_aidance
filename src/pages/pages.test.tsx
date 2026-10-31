import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { routes } from '@/app/router';
import { course } from '@/content/course';
import { TOOLS } from '@/features/tools/catalog';
import { frenchSpacing } from '@/shared/lib/text';

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  return render(<RouterProvider router={router} />);
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
});

describe('une section', () => {
  it('liste ses leçons et son quiz', () => {
    renderAt('/question');
    expect(
      screen.getByRole('link', { name: frenchSpacing('Comment préciser mon sujet ?') }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /quiz/ })).toBeInTheDocument();
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
    expect(screen.getByText(/Et ensuite/)).toHaveTextContent(
      'Comment explorer mon sujet avec une carte mentale ?',
    );
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
    await user.type(screen.getByRole('searchbox'), 'thesaurus');
    expect(screen.getByText('Thésaurus')).toBeInTheDocument();
    expect(screen.queryByText('DOI')).not.toBeInTheDocument();
  });

  it('laisse la page sur le mot visé par un lien vers le glossaire', async () => {
    const scrollToTop = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    const scrollToWord = vi.fn();
    Element.prototype.scrollIntoView = scrollToWord;
    const router = createMemoryRouter(routes, { initialEntries: ['/aide'] });
    render(<RouterProvider router={router} />);

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
