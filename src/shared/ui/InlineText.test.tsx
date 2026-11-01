import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { InlineText } from './InlineText';

function renderText(text: string) {
  return render(
    <MemoryRouter>
      <p>
        <InlineText text={text} />
      </p>
    </MemoryRouter>,
  );
}

describe('InlineText', () => {
  it('rend un terme du glossaire à l’intérieur d’un gras, sans afficher le balisage', async () => {
    const user = userEvent.setup();
    const { container } = renderText('Entre **5 et 25 [[reference|références]]**, au plus.');

    expect(container).not.toHaveTextContent('[[');
    expect(container).not.toHaveTextContent('**');
    const strong = container.querySelector('strong');
    const trigger = screen.getByRole('button', { name: 'références' });
    expect(strong).toContainElement(trigger);

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('rend un lien à l’intérieur d’un gras', () => {
    const { container } = renderText('**Essayez [Unpaywall](https://unpaywall.org/)** pour cela.');

    expect(container).not.toHaveTextContent('](');
    expect(container.querySelector('strong')).toContainElement(
      screen.getByRole('link', { name: /Unpaywall/ }),
    );
  });
});
