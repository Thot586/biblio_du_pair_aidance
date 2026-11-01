import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router';
import { Header } from '@/app/Header';
import { routes } from '@/app/router';
import { course } from '@/content/course';
import type { Block } from '@/content/types';
import { BlockList } from '@/features/content-blocks/BlockList';
import { DEFAULT_PREFERENCES, preferencesStore } from './preferencesStore';

// jsdom ne sait pas encore ouvrir une fenêtre modale : on reproduit juste l'attribut.
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
    this.setAttribute('open', '');
  };
  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
    this.removeAttribute('open');
  };
});

afterEach(() => preferencesStore.set(DEFAULT_PREFERENCES));

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  return render(<RouterProvider router={router} />);
}

function hasDisplayBlock(blocks: readonly Block[]): boolean {
  return blocks.some((block) =>
    block.kind === 'more' ? hasDisplayBlock(block.blocks) : block.kind === 'display',
  );
}

describe('la fenêtre Affichage', () => {
  it('s’ouvre avec le bouton du haut, qui annonce le réglage du texte', async () => {
    const user = userEvent.setup();
    renderAt('/');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(within(screen.getByRole('banner')).getByRole('button', { name: 'Affichage' }));
    expect(screen.getByRole('dialog', { name: 'Affichage' })).toBeInTheDocument();
  });

  it('s’ouvre depuis le pied de page, sur toutes les pages', async () => {
    const user = userEvent.setup();
    renderAt('/glossaire');

    await user.click(
      within(screen.getByRole('contentinfo')).getByRole('button', {
        name: 'Affichage : texte, police, couleurs',
      }),
    );
    expect(screen.getByRole('dialog', { name: 'Affichage' })).toBeInTheDocument();
  });

  it('s’ouvre depuis « À propos »', async () => {
    const user = userEvent.setup();
    renderAt('/a-propos');

    // Deux phrases de la page citent le bouton : les deux ouvrent la fenêtre.
    for (const button of within(screen.getByRole('main')).getAllByRole('button', {
      name: 'Affichage',
    })) {
      await user.click(button);
      expect(screen.getByRole('dialog', { name: 'Affichage' })).toBeInTheDocument();
      screen.getByRole<HTMLDialogElement>('dialog').close();
    }
  });

  it('s’ouvre depuis un bloc « display » de leçon', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Header />
        <BlockList blocks={[{ kind: 'display', label: 'Changer la police de lecture' }]} />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: 'Changer la police de lecture' }));
    expect(screen.getByRole('dialog', { name: 'Affichage' })).toBeInTheDocument();
  });

  it('est proposée dans une leçon du parcours, là où la dyslexie est abordée', () => {
    const lessons = course.flatMap((section) =>
      section.lessons.filter((lesson) => hasDisplayBlock(lesson.blocks)),
    );
    expect(lessons.length).toBeGreaterThan(0);
  });

  it('explique la police avant qu’on la choisisse, puis la garde', async () => {
    const user = userEvent.setup();
    renderAt('/');
    await user.click(within(screen.getByRole('banner')).getByRole('button', { name: 'Affichage' }));

    const group = screen.getByRole('group', { name: 'Police de lecture' });
    expect(group).toHaveAccessibleDescription(/souvent proposée aux personnes dyslexiques/);
    expect(group).toHaveAccessibleDescription(/gardez ce qui vous convient/);

    await user.click(within(group).getByRole('radio', { name: 'OpenDyslexic' }));
    expect(preferencesStore.get().readingFont).toBe('dyslexic');
  });
});
