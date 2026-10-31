import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { Term } from './Term';

function renderTerm() {
  render(
    <MemoryRouter>
      <p>
        Un <Term id="doi" /> sert à retrouver un article.
      </p>
    </MemoryRouter>,
  );
  return screen.getByRole('button', { name: 'DOI' });
}

describe('Term', () => {
  it('montre l’explication courte au survol, sans le détail', async () => {
    const user = userEvent.setup();
    const trigger = renderTerm();

    await user.hover(trigger);

    expect(await screen.findByText(/numéro unique/)).toBeInTheDocument();
    expect(screen.getByText('Cliquez pour en savoir plus.')).toBeInTheDocument();
    expect(screen.queryByText(/même si son adresse web change/)).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('montre le détail et le lien vers le glossaire au clic', async () => {
    const user = userEvent.setup();
    const trigger = renderTerm();

    await user.click(trigger);

    expect(screen.getByText(/même si son adresse web change/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Voir tout le glossaire' })).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('s’ouvre au clavier et se ferme avec Échap', async () => {
    const user = userEvent.setup();
    renderTerm();

    await user.tab();
    expect(screen.getByText(/numéro unique/)).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByText(/numéro unique/)).not.toBeInTheDocument();
  });

  it('affiche simplement le texte si le terme est inconnu', () => {
    render(
      <MemoryRouter>
        <Term id="terme-inconnu" label="un mot" />
      </MemoryRouter>,
    );
    expect(screen.getByText('un mot')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
