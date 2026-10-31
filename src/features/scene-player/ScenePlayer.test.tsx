import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScenePlayer } from './ScenePlayer';
import type { SceneDefinition, SceneFrame } from './types';

function Visual({ step, progress }: SceneFrame) {
  return <p data-testid="visual">{`${step}:${progress}`}</p>;
}

const scene: SceneDefinition = {
  id: 'entonnoir',
  title: 'Une animation',
  steps: [
    { caption: 'Première étape.', durationMs: 100 },
    { caption: 'Deuxième étape.', durationMs: 100 },
    { caption: 'Troisième étape.', durationMs: 100 },
  ],
  Visual,
};

describe('ScenePlayer', () => {
  it('ne démarre jamais seul et montre une image complète', () => {
    render(<ScenePlayer scene={scene} />);
    expect(screen.getByTestId('visual')).toHaveTextContent('0:1');
    expect(screen.getByRole('button', { name: 'Lecture' })).toBeInTheDocument();
    expect(screen.getByText('Étape 1 sur 3')).toBeInTheDocument();
  });

  it('avance d’une étape avec le bouton Suivant, au clavier', async () => {
    const user = userEvent.setup();
    render(<ScenePlayer scene={scene} />);

    screen.getByRole('button', { name: 'Étape suivante' }).focus();
    await user.keyboard('{Enter}');

    expect(screen.getByText('Étape 2 sur 3')).toBeInTheDocument();
    expect(screen.getAllByText('Deuxième étape.')[0]).toBeInTheDocument();
  });

  it('permet d’aller directement à une étape', async () => {
    const user = userEvent.setup();
    render(<ScenePlayer scene={scene} />);

    await user.click(screen.getByRole('button', { name: 'Aller à l’étape 3' }));

    expect(screen.getByText('Étape 3 sur 3')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Étape suivante' })).toBeDisabled();
  });

  it('propose le texte complet de l’animation', () => {
    render(<ScenePlayer scene={scene} />);
    expect(screen.getByText('Lire tout le texte de l’animation')).toBeInTheDocument();
    expect(screen.getAllByText('Troisième étape.').length).toBeGreaterThan(0);
  });

  it('passe de Lecture à Pause', async () => {
    const user = userEvent.setup();
    render(<ScenePlayer scene={scene} />);

    await user.click(screen.getByRole('button', { name: 'Lecture' }));
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();

    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Pause' }));
    });
    expect(screen.getByRole('button', { name: 'Lecture' })).toBeInTheDocument();
  });
});
