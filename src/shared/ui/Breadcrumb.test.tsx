import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Breadcrumb } from './Breadcrumb';

function renderTrail() {
  render(
    <MemoryRouter>
      <Breadcrumb
        crumbs={[
          { label: 'Parcours', to: '/' },
          { label: 'Citer', to: '/citer' },
          { label: 'Comment citer dans mon texte ?' },
        ]}
      />
    </MemoryRouter>,
  );
  return screen.getByRole('navigation', { name: 'Fil d’Ariane' });
}

describe('Breadcrumb', () => {
  it('relie chaque niveau à sa page', () => {
    const trail = renderTrail();
    expect(within(trail).getByRole('link', { name: 'Citer' })).toHaveAttribute('href', '/citer');
  });

  it('montre la page en cours sans en faire un lien', () => {
    const trail = renderTrail();
    expect(within(trail).getAllByRole('link')).toHaveLength(2);
    expect(within(trail).getByText(/Comment citer/)).toHaveAttribute('aria-current', 'page');
  });
});
