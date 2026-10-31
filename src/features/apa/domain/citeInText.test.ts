import { citeInText, personalCommunication, withPage } from './citeInText';
import type { PersonName, ReferenceEntry } from './types';

const person = (family: string): PersonName => ({ kind: 'person', family, given: 'Alix' });
const base: ReferenceEntry = {
  type: 'article',
  creators: [person('Castro')],
  date: { year: '2020' },
  title: 'Un titre',
};

describe('citeInText', () => {
  it('cite une seule personne', () => {
    expect(citeInText(base)).toEqual({
      parenthetical: '(Castro, 2020)',
      narrative: 'Castro (2020)',
    });
  });

  it('écrit & entre parenthèses, et « et » dans la phrase', () => {
    const citation = citeInText({ ...base, creators: [person('Brown'), person('Dolby')] });
    expect(citation.parenthetical).toBe('(Brown & Dolby, 2020)');
    expect(citation.narrative).toBe('Brown et Dolby (2020)');
  });

  it('abrège à partir de trois auteurs', () => {
    expect(
      citeInText({ ...base, creators: [person('A'), person('B'), person('C')] }).parenthetical,
    ).toBe('(A et al., 2020)');
  });

  it('écrit « s. d. » sans date', () => {
    const { date: _date, ...undated } = base;
    expect(citeInText(undated).parenthetical).toBe('(Castro, s. d.)');
  });

  it('propose le sigle d’un organisme, avec sa première mention complète', () => {
    const citation = citeInText({
      ...base,
      creators: [{ kind: 'organization', name: 'Haute Autorité de santé', abbreviation: 'HAS' }],
    });
    expect(citation.parenthetical).toBe('(HAS, 2020)');
    expect(citation.firstMention).toBe('Haute Autorité de santé (HAS, 2020)');
  });

  it('met le titre entre guillemets quand il n’y a pas d’auteur', () => {
    expect(citeInText({ ...base, creators: [] }).parenthetical).toBe('(« Un titre », 2020)');
  });

  it('cite un texte de loi par son nom', () => {
    expect(
      citeInText({ ...base, type: 'legal', creators: [], title: 'Loi n° 2005-102' }).parenthetical,
    ).toBe('(Loi n° 2005-102, 2020)');
  });
});

describe('withPage', () => {
  it('ajoute une page ou plusieurs pages', () => {
    expect(withPage('(Castro, 2020)', '12')).toBe('(Castro, 2020, p. 12)');
    expect(withPage('(Castro, 2020)', '112-113')).toBe('(Castro, 2020, pp. 112-113)');
  });

  it('ne change rien sans numéro de page', () => {
    expect(withPage('(Castro, 2020)', ' ')).toBe('(Castro, 2020)');
  });
});

describe('personalCommunication', () => {
  it('suit la forme du guide de la BU', () => {
    expect(personalCommunication('A. Martin', '3 mars 2026')).toBe(
      '(A. Martin, communication personnelle, 3 mars 2026)',
    );
  });
});
