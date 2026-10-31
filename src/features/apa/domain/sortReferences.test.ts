import { listSizeStatus, sortReferences } from './sortReferences';
import type { PersonName, ReferenceEntry } from './types';

const person = (family: string): PersonName => ({ kind: 'person', family, given: 'A' });
const entry = (families: string[], year: string, title = 'Titre'): ReferenceEntry => ({
  type: 'book',
  creators: families.map(person),
  date: { year },
  title,
});
const names = (entries: ReferenceEntry[]) =>
  entries.map(
    (item) =>
      `${item.creators.map((c) => (c.kind === 'person' ? c.family : c.name)).join('+')} ${item.date?.year}`,
  );

describe('sortReferences', () => {
  it('classe par ordre alphabétique, sans tenir compte des accents', () => {
    expect(
      names(
        sortReferences([
          entry(['Zola'], '2000'),
          entry(['Émile'], '2000'),
          entry(['Durand'], '2000'),
        ]),
      ),
    ).toEqual(['Durand 2000', 'Émile 2000', 'Zola 2000']);
  });

  it('place un auteur seul avant ses cosignatures', () => {
    expect(
      names(sortReferences([entry(['Davison', 'McCabe'], '2015'), entry(['Davison'], '2019')])),
    ).toEqual(['Davison 2019', 'Davison+McCabe 2015']);
  });

  it('classe les textes d’un même auteur du plus ancien au plus récent', () => {
    expect(names(sortReferences([entry(['Franck'], '2020'), entry(['Franck'], '2016')]))).toEqual([
      'Franck 2016',
      'Franck 2020',
    ]);
  });

  it('classe une particule en minuscule au nom principal', () => {
    expect(
      names(sortReferences([entry(['Roelandt'], '2016'), entry(['de Singly'], '2020')])),
    ).toEqual(['Roelandt 2016', 'de Singly 2020']);
  });
});

describe('listSizeStatus', () => {
  it('suit la consigne du DU', () => {
    expect(listSizeStatus(4)).toBe('tooFew');
    expect(listSizeStatus(5)).toBe('good');
    expect(listSizeStatus(25)).toBe('good');
    expect(listSizeStatus(26)).toBe('tolerated');
    expect(listSizeStatus(30)).toBe('tolerated');
    expect(listSizeStatus(31)).toBe('tooMany');
  });
});
