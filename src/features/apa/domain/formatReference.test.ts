import {
  formatDate,
  formatReference,
  normalizeDoi,
  segmentsToHtml,
  segmentsToPlainText,
} from './formatReference';
import type { PersonName, ReferenceEntry } from './types';

const person = (family: string, given: string): PersonName => ({ kind: 'person', family, given });
const plain = (entry: ReferenceEntry) => segmentsToPlainText(formatReference(entry));

const leCardinal: ReferenceEntry = {
  type: 'article',
  creators: [
    person('Le Cardinal', 'Patrick'),
    person('Roelandt', 'Jean-Luc'),
    person('Rafael', 'Florentina'),
    person('Vasseur-Bacle', 'Simon'),
    person('François', 'Guillaume'),
    person('Marsili', 'Massimo'),
  ],
  date: { year: '2013' },
  title:
    'Pratiques orientées vers le rétablissement et pair-aidance : historique, études et perspectives',
  container: 'L’information psychiatrique',
  volume: '89',
  issue: '5',
  pages: '365-370',
  doi: '10.1684/ipe.2013.1070',
};

describe('formatReference', () => {
  it('rédige un article avec son volume, son numéro et son DOI', () => {
    expect(plain(leCardinal)).toBe(
      'Le Cardinal, P., Roelandt, J.-L., Rafael, F., Vasseur-Bacle, S., François, G., & Marsili, M. (2013). Pratiques orientées vers le rétablissement et pair-aidance : historique, études et perspectives. L’information psychiatrique, 89(5), 365-370. https://doi.org/10.1684/ipe.2013.1070',
    );
  });

  it('met en italique la revue et le volume, pas le titre de l’article', () => {
    const html = segmentsToHtml(formatReference(leCardinal));
    expect(html).toContain('<i>L’information psychiatrique</i>, <i>89</i>(5), 365-370.');
    expect(html).not.toContain('<i>Pratiques');
  });

  it('accepte une revue qui n’a qu’un numéro', () => {
    expect(
      plain({
        type: 'article',
        creators: [person('Castro', 'Dana')],
        date: { year: '2020' },
        title: 'Une brève synthèse de la littérature sur la notion de pair-aidance',
        container: 'Le Journal des psychologues',
        issue: '374',
        pages: '18-23',
        doi: 'https://doi.org/10.3917/jdp.374.0018',
      }),
    ).toBe(
      'Castro, D. (2020). Une brève synthèse de la littérature sur la notion de pair-aidance. Le Journal des psychologues, (374), 18-23. https://doi.org/10.3917/jdp.374.0018',
    );
  });

  it('rédige un chapitre de livre collectif', () => {
    expect(
      plain({
        type: 'chapter',
        creators: [person('Durand', 'Bernard')],
        date: { year: '2020' },
        title: 'Concept de pair-aidance professionnelle',
        editors: [person('Franck', 'Nicolas'), person('Cellard', 'Caroline')],
        container: 'Pair-aidance en santé mentale',
        pages: '47-60',
        publisher: 'Elsevier Masson',
      }),
    ).toBe(
      'Durand, B. (2020). Concept de pair-aidance professionnelle. In N. Franck & C. Cellard (Eds.), Pair-aidance en santé mentale (p. 47-60). Elsevier Masson.',
    );
  });

  it('rédige un chapitre d’un livre écrit par un seul auteur', () => {
    expect(
      plain({
        type: 'chapter',
        creators: [person('Dupont', 'Alix')],
        date: { year: '2021' },
        title: 'Un chapitre',
        container: 'Un livre',
        pages: '10-20',
        publisher: 'Éditeur',
      }),
    ).toBe('Dupont, A. (2021). Un chapitre. In Un livre (p. 10-20). Éditeur.');
  });

  it('rédige un livre, avec ou sans direction d’ouvrage', () => {
    const book: ReferenceEntry = {
      type: 'book',
      creators: [person('Franck', 'Nicolas')],
      date: { year: '2020' },
      title: 'Pair-aidance en santé mentale',
      publisher: 'Elsevier Masson',
    };
    expect(plain(book)).toBe('Franck, N. (2020). Pair-aidance en santé mentale. Elsevier Masson.');
    expect(plain({ ...book, creatorsAreEditors: true })).toBe(
      'Franck, N. (Ed.). (2020). Pair-aidance en santé mentale. Elsevier Masson.',
    );
    expect(plain({ ...book, edition: '2e éd.' })).toBe(
      'Franck, N. (2020). Pair-aidance en santé mentale (2e éd.). Elsevier Masson.',
    );
  });

  it('rédige un livre traduit et réédité', () => {
    expect(
      plain({
        type: 'book',
        creators: [person('Goffman', 'Erving')],
        date: { year: '1975' },
        title: 'Stigmate',
        translators: [person('Kihm', 'Alain')],
        publisher: 'Minuit',
        originalYear: '1963',
      }),
    ).toBe(
      'Goffman, E. (1975). Stigmate (A. Kihm, Trad.). Minuit. (Ouvrage original publié en 1963)',
    );
  });

  it('rédige une thèse en ligne et un mémoire imprimé', () => {
    const thesis: ReferenceEntry = {
      type: 'thesis',
      creators: [person('Rodier', 'Philippine')],
      date: { year: '2023' },
      title: 'Pair-aidance en santé mentale et médicaments utilisés en psychiatrie',
      degree: 'Thèse d’exercice en pharmacie',
      university: 'Université de Montpellier',
      archive: 'DUMAS',
      url: 'https://dumas.ccsd.cnrs.fr/dumas-04314075v1',
    };
    expect(plain(thesis)).toBe(
      'Rodier, P. (2023). Pair-aidance en santé mentale et médicaments utilisés en psychiatrie [Thèse d’exercice en pharmacie, Université de Montpellier]. DUMAS. https://dumas.ccsd.cnrs.fr/dumas-04314075v1',
    );
    expect(plain({ ...thesis, archive: '', url: '', degree: 'Mémoire de DU' })).toBe(
      'Rodier, P. (2023). Pair-aidance en santé mentale et médicaments utilisés en psychiatrie [Mémoire de DU]. Université de Montpellier.',
    );
  });

  it('rédige une page web datée et une page sans date', () => {
    const page: ReferenceEntry = {
      type: 'webpage',
      creators: [{ kind: 'organization', name: 'OMS' }],
      date: { year: '2023', month: 'janvier', day: '30' },
      title: 'Réadaptation',
      container: 'Organisation mondiale de la Santé',
      url: 'https://www.who.int/exemple',
    };
    expect(plain(page)).toBe(
      'OMS. (2023, janvier 30). Réadaptation. Organisation mondiale de la Santé. https://www.who.int/exemple',
    );
    const { date: _date, ...undated } = page;
    expect(plain({ ...undated, consulted: '25 mars 2024' })).toBe(
      'OMS. (s. d.). Réadaptation. Organisation mondiale de la Santé. Consulté 25 mars 2024, à l’adresse https://www.who.int/exemple',
    );
  });

  it('rédige un rapport institutionnel', () => {
    expect(
      plain({
        type: 'report',
        creators: [{ kind: 'organization', name: 'Haute Autorité de santé' }],
        date: { year: '2024' },
        title: 'Un rapport',
        url: 'https://www.has-sante.fr/exemple',
      }),
    ).toBe('Haute Autorité de santé. (2024). Un rapport. https://www.has-sante.fr/exemple');
  });

  it('rédige un texte de loi sans auteur', () => {
    expect(
      plain({
        type: 'legal',
        creators: [],
        date: { year: '2005' },
        title: 'Loi n° 2005-102 du 11 février 2005',
        url: 'https://www.legifrance.gouv.fr/exemple',
      }),
    ).toBe('Loi n° 2005-102 du 11 février 2005. (2005). https://www.legifrance.gouv.fr/exemple');
  });

  it('rédige une vidéo en ligne et une émission de radio', () => {
    expect(
      plain({
        type: 'video',
        creators: [{ kind: 'organization', name: 'Centre ressource réhabilitation psychosociale' }],
        date: { year: '2020', month: 'février', day: '3' },
        title: 'Pair aidance professionnelle en santé mentale',
        mediaLabel: 'Vidéo',
        container: 'YouTube',
        url: 'https://www.youtube.com/watch?v=4wdoD7pvo7k',
      }),
    ).toBe(
      'Centre ressource réhabilitation psychosociale. (2020, février 3). Pair aidance professionnelle en santé mentale [Vidéo]. YouTube. https://www.youtube.com/watch?v=4wdoD7pvo7k',
    );
    expect(
      plain({
        type: 'broadcast',
        creators: [person('Martin', 'Alix')],
        date: { year: '2021', month: 'mars', day: '2' },
        title: 'Un épisode',
        mediaLabel: 'Émission de radio',
        container: 'Une émission',
        publisher: 'France Culture',
        url: 'https://www.radiofrance.fr/exemple',
      }),
    ).toBe(
      'Martin, A. (2021, mars 2). Un épisode [Émission de radio]. In Une émission. France Culture. https://www.radiofrance.fr/exemple',
    );
  });

  it('rédige une communication de colloque et une entrée de dictionnaire', () => {
    expect(
      plain({
        type: 'conference',
        creators: [person('Martin', 'Alix')],
        date: { year: '2019', month: 'octobre', day: '17' },
        title: 'Une communication',
        container: '34e Congrès',
        place: 'Bordeaux',
      }),
    ).toBe('Martin, A. (2019, octobre 17). Une communication. 34e Congrès, Bordeaux.');
    expect(
      plain({
        type: 'dictionary',
        creators: [{ kind: 'organization', name: 'CNRTL' }],
        title: 'Pair',
        container: 'Portail lexical',
        consulted: '31 octobre 2026',
        url: 'https://www.cnrtl.fr/definition/pair',
      }),
    ).toBe(
      'CNRTL. (s. d.). Pair. In Portail lexical. Consulté 31 octobre 2026, à l’adresse https://www.cnrtl.fr/definition/pair',
    );
  });

  it('met le titre en tête quand il n’y a pas d’auteur', () => {
    expect(
      plain({
        type: 'webpage',
        creators: [],
        date: { year: '2020' },
        title: 'Une page',
        url: 'https://a.fr',
      }),
    ).toBe('Une page. (2020). https://a.fr');
  });

  it('ne double pas le point après un titre terminé par un point d’interrogation', () => {
    expect(
      plain({
        type: 'book',
        creators: [person('Martin', 'Alix')],
        date: { year: '2020' },
        title: 'Peut-on guérir ?',
        publisher: 'Éditeur',
      }),
    ).toBe('Martin, A. (2020). Peut-on guérir ? Éditeur.');
  });
});

describe('formatDate', () => {
  it('écrit « s. d. » sans date', () => {
    expect(formatDate(undefined)).toBe('s. d.');
    expect(formatDate({ year: ' ' })).toBe('s. d.');
  });

  it('écrit l’année, puis le mois et le jour', () => {
    expect(formatDate({ year: '2020' })).toBe('2020');
    expect(formatDate({ year: '2020', month: 'juin' })).toBe('2020, juin');
    expect(formatDate({ year: '2023', month: 'janvier', day: '30' })).toBe('2023, janvier 30');
  });
});

describe('normalizeDoi', () => {
  it('garde seulement l’identifiant', () => {
    expect(normalizeDoi('https://doi.org/10.1/abc')).toBe('10.1/abc');
    expect(normalizeDoi('https://dx.doi.org/10.1/abc')).toBe('10.1/abc');
    expect(normalizeDoi('doi: 10.1/abc')).toBe('10.1/abc');
  });
});
