import { course } from '@/content/course';
import { glossary } from '@/content/glossary';
import { TOOLS } from '@/features/tools/catalog';
import { buildSearchDocuments } from './documents';
import { searchSite } from './searchSite';

function resultsFor(query: string) {
  return searchSite(query).flatMap((group) => group.results);
}

function bestResultFor(query: string, kind: string) {
  return searchSite(query).find((group) => group.kind === kind)?.results[0];
}

describe('la recherche du site', () => {
  it('indexe toutes les leçons, tous les outils et tous les mots', () => {
    const paths = new Set(buildSearchDocuments().map((document) => document.to));

    for (const section of course) {
      expect(paths).toContain(`/${section.slug}/quiz`);
      for (const lesson of section.lessons) {
        expect(paths).toContain(`/${section.slug}/${lesson.slug}`);
      }
    }
    for (const tool of TOOLS) expect(paths).toContain(`/outils/${tool.slug}`);
    for (const entry of glossary) expect(paths).toContain(`/glossaire#${entry.id}`);
  });

  it('n’a aucun identifiant en double', () => {
    const ids = buildSearchDocuments().map((document) => document.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('ne garde aucune marque de mise en forme dans les extraits', () => {
    for (const { excerpt } of buildSearchDocuments()) {
      expect(excerpt).not.toMatch(/\[\[|\]\]|\*\*/);
    }
  });

  it('place le mot du glossaire en tête quand on cherche ce mot', () => {
    const [firstGroup] = searchSite('doi');
    expect(firstGroup?.kind).toBe('term');
    expect(firstGroup?.results[0]?.title).toBe('DOI');
  });

  it('trouve un mot par l’une de ses formes', () => {
    expect(bestResultFor('mots-clés', 'term')?.to).toBe('/glossaire#mot-cle');
  });

  it('ignore les accents et les majuscules', () => {
    expect(bestResultFor('ZOTÉRO', 'course')?.to).toBe('/citer/zotero');
    expect(bestResultFor('reference', 'term')?.to).toBe(bestResultFor('Référence', 'term')?.to);
  });

  it('mène aux exemples quand on cherche comment citer un type de document', () => {
    const firstResults = searchSite('comment citer un livre')
      .find((group) => group.kind === 'course')
      ?.results.slice(0, 2)
      .map((result) => result.to);
    expect(firstResults).toContain('/citer/exemples');
    expect(bestResultFor('citer une thèse', 'course')?.to).toBe('/citer/exemples');
  });

  it('comprend une question écrite comme on se la pose', () => {
    expect(bestResultFor('c’est quoi le plagiat', 'course')?.to).toBe('/citer/pourquoi-citer');
    expect(bestResultFor('comment utiliser pubmed', 'course')?.to).toMatch(/^\/ou-chercher/);
  });

  it('pardonne une faute de frappe ou d’orthographe', () => {
    expect(bestResultFor('bibliografie', 'term')?.to).toBe('/glossaire#bibliographie');
    expect(bestResultFor('plagia', 'course')?.to).toBe('/citer/pourquoi-citer');
    expect(bestResultFor('pubmd', 'course')?.to).toMatch(/^\/ou-chercher/);
  });

  it('trouve le début d’un mot', () => {
    expect(bestResultFor('biblio', 'term')?.to).toBe('/glossaire#bibliographie');
  });

  it('trouve un outil par la façon de dire son besoin', () => {
    expect(bestResultFor('je ne sais pas où chercher', 'tool')?.to).toBe('/outils/quel-outil');
    expect(bestResultFor('mettre en apa', 'tool')?.to).toBe('/outils/generateur-apa');
  });

  it('retrouve l’outil APA sous le nom qu’on lui donne ailleurs', () => {
    expect(bestResultFor('générateur apa', 'tool')?.to).toBe('/outils/generateur-apa');
  });

  it('trouve les personnes à contacter', () => {
    expect(bestResultFor('documentaliste', 'page')?.to).toBe('/aide');
  });

  it('mène aux réglages d’affichage quand on cherche la police ou la taille du texte', () => {
    for (const query of ['police dyslexique', 'agrandir le texte', 'opendyslexic', 'mode sombre']) {
      expect(
        resultsFor(query).map((result) => result.to),
        query,
      ).toContain('/a-propos');
    }
  });

  it('trouve chatgpt dans la section sur l’IA', () => {
    expect(bestResultFor('chatgpt', 'course')?.to).toMatch(/^\/ia/);
  });

  it('se rabat sur l’un des mots quand ils ne vont pas tous ensemble', () => {
    expect(resultsFor('plagiat xylophone')).not.toHaveLength(0);
  });

  it('accepte une recherche composée uniquement de petits mots', () => {
    expect(() => searchSite('et ou')).not.toThrow();
  });

  it('ne renvoie rien pour une recherche vide ou sans lettre', () => {
    expect(searchSite('')).toEqual([]);
    expect(searchSite('   ')).toEqual([]);
    expect(searchSite('?!')).toEqual([]);
  });

  it('ne renvoie rien pour un mot sans rapport', () => {
    expect(searchSite('xylophone')).toEqual([]);
  });
});
