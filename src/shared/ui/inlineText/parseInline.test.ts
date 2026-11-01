import { parseInline, stripInline } from './parseInline';

describe('parseInline', () => {
  it('laisse le texte simple intact', () => {
    expect(parseInline('Bonjour')).toEqual([{ type: 'text', value: 'Bonjour' }]);
  });

  it('reconnaît le gras, l’italique, un terme et un lien', () => {
    expect(parseInline('**A** *B* [[doi]] [[doi|le DOI]] [ici](https://a.fr/b)')).toEqual([
      { type: 'strong', children: [{ type: 'text', value: 'A' }] },
      { type: 'text', value: ' ' },
      { type: 'em', children: [{ type: 'text', value: 'B' }] },
      { type: 'text', value: ' ' },
      { type: 'term', id: 'doi' },
      { type: 'text', value: ' ' },
      { type: 'term', id: 'doi', label: 'le DOI' },
      { type: 'text', value: ' ' },
      { type: 'link', label: 'ici', url: 'https://a.fr/b' },
    ]);
  });

  it('reconnaît un terme ou un lien à l’intérieur d’un gras ou d’une italique', () => {
    expect(parseInline('**entre 5 et 25 [[reference|références]]** ici')).toEqual([
      {
        type: 'strong',
        children: [
          { type: 'text', value: 'entre 5 et 25 ' },
          { type: 'term', id: 'reference', label: 'références' },
        ],
      },
      { type: 'text', value: ' ici' },
    ]);
    expect(parseInline('**Essayez [Unpaywall](https://unpaywall.org/)**')).toEqual([
      {
        type: 'strong',
        children: [
          { type: 'text', value: 'Essayez ' },
          { type: 'link', label: 'Unpaywall', url: 'https://unpaywall.org/' },
        ],
      },
    ]);
    expect(parseInline('*un [[doi]]*')).toEqual([
      {
        type: 'em',
        children: [
          { type: 'text', value: 'un ' },
          { type: 'term', id: 'doi' },
        ],
      },
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

  it('retire aussi les marques imbriquées dans un gras', () => {
    expect(stripInline('**Voir [[doi|le DOI]] et [ce lien](https://a.fr)**')).toBe(
      'Voir le DOI et ce lien',
    );
  });
});
