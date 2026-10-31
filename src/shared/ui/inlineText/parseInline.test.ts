import { parseInline, stripInline } from './parseInline';

describe('parseInline', () => {
  it('laisse le texte simple intact', () => {
    expect(parseInline('Bonjour')).toEqual([{ type: 'text', value: 'Bonjour' }]);
  });

  it('reconnaît le gras, l’italique, un terme et un lien', () => {
    expect(parseInline('**A** *B* [[doi]] [[doi|le DOI]] [ici](https://a.fr/b)')).toEqual([
      { type: 'strong', value: 'A' },
      { type: 'text', value: ' ' },
      { type: 'em', value: 'B' },
      { type: 'text', value: ' ' },
      { type: 'term', id: 'doi' },
      { type: 'text', value: ' ' },
      { type: 'term', id: 'doi', label: 'le DOI' },
      { type: 'text', value: ' ' },
      { type: 'link', label: 'ici', url: 'https://a.fr/b' },
    ]);
  });

  it('garde l’astérisque seul de la troncature', () => {
    expect(parseInline('psychiatr* donne psychiatrie')).toEqual([
      { type: 'text', value: 'psychiatr* donne psychiatrie' },
    ]);
  });
});

describe('stripInline', () => {
  it('retire les marques et garde les libellés', () => {
    expect(stripInline('Un **mot** et [[doi|le DOI]] et [ce lien](https://a.fr)')).toBe(
      'Un mot et le DOI et ce lien',
    );
  });
});
