import { declarationToHtml, declarationToText, type DeclarationRow } from './declaration';

const row: DeclarationRow = {
  id: '1',
  tool: 'Le Chat',
  step: 'Trouver des idées',
  prompt: 'Propose <dix> mots-clés',
  check: 'J’ai gardé quatre mots',
};

describe('declarationToHtml', () => {
  it('produit un tableau avec ses en-têtes', () => {
    const html = declarationToHtml([row]);
    expect(html).toContain('<table');
    expect(html).toContain('Outil utilisé');
    expect(html).toContain('Le Chat');
  });

  it('neutralise le balisage saisi par la personne', () => {
    expect(declarationToHtml([row])).toContain('Propose &lt;dix&gt; mots-clés');
  });
});

describe('declarationToText', () => {
  it('sépare les colonnes par des tabulations', () => {
    expect(declarationToText([row]).split('\n')[1]).toBe(
      'Le Chat\tTrouver des idées\tPropose <dix> mots-clés\tJ’ai gardé quatre mots',
    );
  });
});
