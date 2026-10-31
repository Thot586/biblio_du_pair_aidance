import { creatorList, directName, initials, invertedName, sortingName } from './names';
import type { PersonName } from './types';

const person = (family: string, given: string): PersonName => ({ kind: 'person', family, given });

describe('initials', () => {
  it('garde le tiret des prénoms composés', () => {
    expect(initials('Jean-Luc')).toBe('J.-L.');
  });

  it('sépare les prénoms multiples par une espace', () => {
    expect(initials('Marie Anne')).toBe('M. A.');
  });

  it('accepte des initiales déjà écrites', () => {
    expect(initials('T. J.')).toBe('T. J.');
  });
});

describe('invertedName', () => {
  it('écrit le nom, puis les initiales', () => {
    expect(invertedName(person('Roelandt', 'Jean-Luc'))).toBe('Roelandt, J.-L.');
  });

  it('place la particule en minuscule après les initiales', () => {
    expect(invertedName(person('de Singly', 'François'))).toBe('Singly, F. de');
  });

  it('garde une particule qui porte une majuscule', () => {
    expect(invertedName(person('De Morand', 'Anne'))).toBe('De Morand, A.');
  });

  it('écrit une institution telle quelle', () => {
    expect(invertedName({ kind: 'organization', name: 'Haute Autorité de santé' })).toBe(
      'Haute Autorité de santé',
    );
  });
});

describe('directName', () => {
  it('écrit les initiales avant le nom', () => {
    expect(directName(person('Franck', 'Nicolas'))).toBe('N. Franck');
  });
});

describe('sortingName', () => {
  it('classe sans tenir compte de la particule en minuscule', () => {
    expect(sortingName(person('de Singly', 'François'))).toBe('Singly');
  });
});

describe('creatorList', () => {
  it('relie deux noms avec &', () => {
    expect(creatorList([person('Long', 'Aude'), person('Lothon', 'Maëva')])).toBe(
      'Long, A., & Lothon, M.',
    );
  });

  it('liste vingt noms au plus', () => {
    const many = Array.from({ length: 24 }, (_, index) => person(`Nom${index + 1}`, 'Alix'));
    const list = creatorList(many);
    expect(list).toContain('Nom19, A., ... Nom24, A.');
    expect(list).not.toContain('Nom20');
  });
});
