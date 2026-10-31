import { cleanVolumeAndIssue, extractDoi, workToEntry } from './crossref';

describe('extractDoi', () => {
  it('reconnaît un DOI nu, un lien et une mention « doi: »', () => {
    expect(extractDoi('10.1684/ipe.2013.1070')).toBe('10.1684/ipe.2013.1070');
    expect(extractDoi('https://doi.org/10.1684/ipe.2013.1070')).toBe('10.1684/ipe.2013.1070');
    expect(extractDoi('doi: 10.1684/ipe.2013.1070.')).toBe('10.1684/ipe.2013.1070');
  });

  it('garde les parenthèses qui font partie du DOI', () => {
    expect(extractDoi('10.1016/S0140-6736(18)31470-3')).toBe('10.1016/S0140-6736(18)31470-3');
  });

  it('ne voit pas de DOI dans un titre', () => {
    expect(extractDoi('Pair-aidance en santé mentale')).toBeNull();
  });
});

describe('cleanVolumeAndIssue', () => {
  it('retire le mot Volume', () => {
    expect(cleanVolumeAndIssue('Volume 89', '5')).toEqual({ volume: '89', issue: '5' });
  });

  it('remet un numéro placé par erreur dans le volume', () => {
    expect(cleanVolumeAndIssue('n° 374', '2')).toEqual({ volume: '', issue: '374' });
  });
});

describe('workToEntry', () => {
  it('convertit un article', () => {
    const entry = workToEntry({
      DOI: '10.1684/ipe.2013.1070',
      type: 'journal-article',
      title: ['Pratiques orientées vers le rétablissement'],
      author: [{ family: 'Le Cardinal', given: 'Patrick' }],
      issued: { 'date-parts': [[2013, 6, 7]] },
      'container-title': ['L&apos;information psychiatrique'],
      volume: 'Volume 89',
      issue: '5',
      page: '365–370',
    });
    expect(entry).toMatchObject({
      type: 'article',
      date: { year: '2013' },
      container: 'L’information psychiatrique',
      volume: '89',
      issue: '5',
      pages: '365-370',
      doi: '10.1684/ipe.2013.1070',
    });
    expect(entry.creators[0]).toEqual({ kind: 'person', family: 'Le Cardinal', given: 'Patrick' });
  });

  it('retire le balisage des titres', () => {
    expect(
      workToEntry({ DOI: '10.1/a', type: 'journal-article', title: ['Un <i>titre</i> ici'] }).title,
    ).toBe('Un titre ici');
  });

  it('reconnaît un chapitre avec ses directeurs', () => {
    const entry = workToEntry({
      DOI: '10.1/b',
      type: 'book-chapter',
      title: ['Un chapitre'],
      author: [{ family: 'Durand', given: 'Bernard' }],
      editor: [{ family: 'Franck', given: 'Nicolas' }],
    });
    expect(entry.type).toBe('chapter');
    expect(entry.editors).toEqual([{ kind: 'person', family: 'Franck', given: 'Nicolas' }]);
  });

  it('traite un livre sans auteur comme un livre dirigé', () => {
    const entry = workToEntry({
      DOI: '10.1/c',
      type: 'edited-book',
      title: ['Un livre'],
      editor: [{ family: 'Roelandt', given: 'Jean-Luc' }],
    });
    expect(entry.creatorsAreEditors).toBe(true);
    expect(entry.creators).toHaveLength(1);
  });

  it('garde un organisme comme auteur', () => {
    expect(
      workToEntry({ DOI: '10.1/d', type: 'report', title: ['Rapport'], author: [{ name: 'OMS' }] })
        .creators,
    ).toEqual([{ kind: 'organization', name: 'OMS' }]);
  });
});
