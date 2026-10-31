import {
  frenchEquation,
  otherLinks,
  parseWords,
  primaryLinks,
  pubmedQuery,
  scholarQuery,
  simpleQuery,
  suggestEnglish,
  type Idea,
} from './searchLogic';

const ideas: Idea[] = [
  { french: 'pair-aidance, médiateur de santé pair', english: 'peer support' },
  { french: 'addictologie', english: 'substance use, addiction' },
  { french: '', english: '' },
];

describe('parseWords', () => {
  it('sépare les mots et retire les vides', () => {
    expect(parseWords(' a, b ;c\n,, ')).toEqual(['a', 'b', 'c']);
  });
});

describe('les équations', () => {
  it('écrit l’équation en français', () => {
    expect(frenchEquation(ideas)).toBe(
      '(pair-aidance OU "médiateur de santé pair") ET addictologie',
    );
  });

  it('écrit la requête PubMed avec les champs titre et résumé', () => {
    expect(pubmedQuery(ideas)).toBe(
      '"peer support"[tiab] AND ("substance use"[tiab] OR "addiction"[tiab])',
    );
  });

  it('écrit la requête Google Scholar sans parenthèses', () => {
    expect(scholarQuery(ideas)).toBe('pair-aidance OR "médiateur de santé pair" addictologie');
  });

  it('garde le premier mot de chaque idée pour les outils simples', () => {
    expect(simpleQuery(ideas)).toBe('pair-aidance addictologie');
  });
});

describe('les liens de recherche', () => {
  it('prépare un lien SantéPsy avec le paramètre indispensable', () => {
    const [santePsy] = primaryLinks(ideas);
    expect(santePsy?.name).toBe('SantéPsy');
    expect(santePsy?.url).toContain('autolevel1=1');
  });

  it('relie Google Scholar à Lyon 1', () => {
    const scholar = primaryLinks(ideas).find((link) => link.name === 'Google Scholar');
    expect(scholar?.url).toContain('inst=4673467114206109391');
  });

  it('n’ajoute pas PubMed sans mot anglais', () => {
    const french: Idea[] = [{ french: 'pair-aidance', english: '' }];
    expect(primaryLinks(french).map((link) => link.name)).not.toContain('PubMed');
    expect(otherLinks(french).map((link) => link.name)).not.toContain('Semantic Scholar');
  });

  it('encode les caractères spéciaux', () => {
    const pubmed = primaryLinks(ideas).find((link) => link.name === 'PubMed');
    expect(pubmed?.url).toContain('%22peer%20support%22%5Btiab%5D');
  });

  it('ne propose rien sans aucun mot', () => {
    expect(primaryLinks([{ french: ' ', english: ' ' }])).toEqual([]);
  });
});

describe('suggestEnglish', () => {
  it('reconnaît les mots, avec ou sans accents', () => {
    expect(suggestEnglish('pair-aidance, retablissement')).toEqual([
      'peer support',
      'mental health recovery',
    ]);
  });

  it('ne propose rien pour un mot inconnu', () => {
    expect(suggestEnglish('jardinage')).toEqual([]);
  });
});
