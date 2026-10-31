import { compareFrench, frenchSpacing, normalizeForSearch, pluralize } from './text';

describe('frenchSpacing', () => {
  it('protège les espaces avant la ponctuation haute', () => {
    expect(frenchSpacing('Où chercher ? Ici : là ; non !')).toBe('Où chercher ? Ici : là ; non !');
  });

  it('protège les espaces à l’intérieur des guillemets', () => {
    expect(frenchSpacing('« bonjour »')).toBe('« bonjour »');
  });
});

describe('normalizeForSearch', () => {
  it('ignore les accents et les majuscules', () => {
    expect(normalizeForSearch(' Thésaurus ')).toBe('thesaurus');
  });
});

describe('compareFrench', () => {
  it('classe les accents avec leur lettre', () => {
    expect(['Zola', 'Émile', 'Durand'].sort(compareFrench)).toEqual(['Durand', 'Émile', 'Zola']);
  });
});

describe('pluralize', () => {
  it('accorde selon le nombre', () => {
    expect(pluralize(1, 'référence')).toBe('1 référence');
    expect(pluralize(2, 'référence')).toBe('2 références');
  });
});
