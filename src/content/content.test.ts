import { TOOLS } from '@/features/tools/catalog';
import { sceneLoaders } from '@/scenes/registry';
import { stripInline } from '@/shared/ui/inlineText/parseInline';
import { course } from './course';
import { glossary } from './glossary';
import { SHORTCUTS } from './shortcuts';
import type { Block, Lesson } from './types';

/** Tous les textes d'un bloc, y compris ceux repliés dans un « voir plus ». */
function blockTexts(block: Block): string[] {
  switch (block.kind) {
    case 'paragraph':
      return [block.text];
    case 'heading':
      return [block.text];
    case 'list':
      return block.items;
    case 'callout':
      return [block.title, ...(typeof block.text === 'string' ? [block.text] : block.text)];
    case 'more':
      return [block.title, ...block.blocks.flatMap(blockTexts)];
    case 'table':
      return [block.caption, ...block.headers, ...block.rows.flat()];
    case 'compare':
      return [block.before.text, block.after.text, block.why ?? ''];
    case 'links':
      return block.links.flatMap((link) => [link.label, link.description ?? '']);
    case 'reference':
    case 'scene':
    case 'tool':
      return [];
  }
}

function lessonTexts(lesson: Lesson): string[] {
  return [lesson.summary, ...lesson.blocks.flatMap(blockTexts), ...lesson.takeaways];
}

/** Les textes où un terme peut être survolé : les titres, eux, restent du texte simple. */
function markableTexts(block: Block): string[] {
  switch (block.kind) {
    case 'paragraph':
      return [block.text];
    case 'list':
      return block.items;
    case 'callout':
      return typeof block.text === 'string' ? [block.text] : block.text;
    case 'more':
      return block.blocks.flatMap(markableTexts);
    case 'table':
      return block.rows.flat();
    case 'compare':
      return [block.before.text, block.after.text, block.why ?? ''];
    default:
      return [];
  }
}

function lessonMarkableTexts(lesson: Lesson): string[] {
  return [lesson.summary, ...lesson.blocks.flatMap(markableTexts), ...lesson.takeaways];
}

const allLessons = course.flatMap((section) =>
  section.lessons.map((lesson) => ({ section, lesson, path: `/${section.slug}/${lesson.slug}` })),
);

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Sigles : la casse compte. Mots courants : elle ne compte pas. */
function formPattern(form: string): RegExp {
  const flags = form === form.toUpperCase() || /[A-Z]/.test(form.slice(1)) ? 'u' : 'iu';
  return new RegExp(`(?<![\\p{L}-])${escapeRegExp(form)}(?![\\p{L}-])`, flags);
}

describe('le glossaire', () => {
  const ids = new Set(glossary.map((entry) => entry.id));

  it('a une explication courte et un détail pour chaque terme', () => {
    for (const entry of glossary) {
      expect(entry.definition.length, entry.id).toBeGreaterThan(10);
      expect(entry.detail.length, entry.id).toBeGreaterThan(10);
      expect(entry.forms.length, entry.id).toBeGreaterThan(0);
    }
  });

  it('couvre tous les termes marqués dans le contenu', () => {
    const unknown = allLessons.flatMap(({ lesson, path }) =>
      lessonTexts(lesson)
        .flatMap((text) => [...text.matchAll(/\[\[([^\]|]+)/g)].map((match) => match[1] ?? ''))
        .filter((id) => !ids.has(id))
        .map((id) => `${path} : ${id}`),
    );
    expect(unknown).toEqual([]);
  });

  it('ne laisse aucune marque de mise en forme à l’écran', () => {
    const texts = [
      ...allLessons.flatMap(({ lesson, path }) =>
        lessonTexts(lesson).map((text) => ({ where: path, text })),
      ),
      ...glossary.flatMap((entry) => [
        { where: `glossaire : ${entry.id}`, text: entry.definition },
        { where: `glossaire : ${entry.id}`, text: entry.detail },
      ]),
    ];
    const shown = texts.filter(({ text }) => /\[\[|\]\]|\*\*|\]\(/.test(stripInline(text)));
    expect(shown.map(({ where, text }) => `${where} : ${text.slice(0, 70)}`)).toEqual([]);
  });

  it('rend chaque mot technique survolable au moins une fois par leçon', () => {
    const missing = allLessons.flatMap(({ lesson, path }) => {
      const raw = lessonMarkableTexts(lesson).join('\n');
      const plain = lessonMarkableTexts(lesson).map(stripInline).join('\n');
      return glossary
        .filter((entry) => entry.forms.some((form) => formPattern(form).test(plain)))
        .filter((entry) => !raw.includes(`[[${entry.id}`))
        .map((entry) => `${path} : ${entry.id}`);
    });
    expect(missing).toEqual([]);
  });
});

describe('les leçons', () => {
  it('ont des adresses uniques', () => {
    const paths = allLessons.map(({ path }) => path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('ont un titre en forme de question, une réponse courte et des points à retenir', () => {
    for (const { lesson, path } of allLessons) {
      expect(lesson.question.trim().endsWith('?'), path).toBe(true);
      expect(stripInline(lesson.summary).length, path).toBeLessThanOrEqual(340);
      expect(lesson.takeaways.length, path).toBeGreaterThanOrEqual(2);
      expect(lesson.takeaways.length, path).toBeLessThanOrEqual(4);
    }
  });

  it('gardent des phrases faciles à lire', () => {
    const tooLong = allLessons.flatMap(({ lesson, path }) =>
      lessonTexts(lesson)
        .map(stripInline)
        .flatMap((text) => text.split(/(?<=[.!?…])\s+/))
        .filter((sentence) => sentence.split(/\s+/).length > 42)
        .map((sentence) => `${path} : ${sentence}`),
    );
    expect(tooLong).toEqual([]);
  });

  it('respectent la typographie', () => {
    const faults = allLessons.flatMap(({ lesson, path }) =>
      lessonTexts(lesson)
        .filter((text) => /[a-zà-ÿ]'[a-zà-ÿ]/i.test(text) || text.includes('·'))
        .map((text) => `${path} : ${text.slice(0, 70)}`),
    );
    expect(faults).toEqual([]);
  });

  it('n’emploient que des liens internes valides', () => {
    const lessonPaths = new Set(allLessons.map(({ path }) => path));
    const sectionPaths = new Set(course.map((section) => `/${section.slug}`));
    const toolPaths = new Set(TOOLS.map((tool) => `/outils/${tool.slug}`));
    const pages = new Set(['/aide', '/glossaire', '/sources', '/a-propos', '/outils']);
    const known = new Set([...lessonPaths, ...sectionPaths, ...toolPaths, ...pages]);

    const broken = [
      ...allLessons.flatMap(({ lesson, path }) =>
        lessonTexts(lesson)
          .flatMap((text) => [...text.matchAll(/\]\((\/[^)]+)\)/g)].map((match) => match[1] ?? ''))
          .filter((link) => !known.has(link))
          .map((link) => `${path} : ${link}`),
      ),
      ...SHORTCUTS.filter((shortcut) => !known.has(shortcut.to)).map((shortcut) => shortcut.to),
    ];
    expect(broken).toEqual([]);
  });

  it('utilisent des animations qui existent', () => {
    const missing = allLessons.flatMap(({ lesson, path }) =>
      lesson.blocks
        .filter((block) => block.kind === 'scene')
        .filter((block) => !sceneLoaders[block.scene])
        .map((block) => `${path} : ${block.scene}`),
    );
    expect(missing).toEqual([]);
  });
});

describe('les quiz', () => {
  it('sont cohérents', () => {
    for (const section of course) {
      expect(section.quiz.length, section.slug).toBeGreaterThanOrEqual(4);
      expect(new Set(section.quiz.map((question) => question.id)).size).toBe(section.quiz.length);
      for (const question of section.quiz) {
        const correct = question.choices.filter((choice) => choice.correct).length;
        const label = `${section.slug}/${question.id}`;
        if (question.multiple) expect(correct, label).toBeGreaterThanOrEqual(1);
        else expect(correct, label).toBe(1);
        for (const choice of question.choices) {
          expect(choice.feedback.length, label).toBeGreaterThan(5);
        }
      }
    }
  });
});
