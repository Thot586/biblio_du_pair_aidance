import { Term } from '@/shared/ui/Term';
import { createStore, useStore } from '@/shared/lib/createStore';
import { Button } from '@/shared/ui/Button';
import { CopyButton } from '@/shared/ui/CopyButton';
import { ExternalLink } from '@/shared/ui/ExternalLink';
import { Field } from '@/shared/ui/Field';
import { MoreDetails } from '@/shared/ui/MoreDetails';
import panel from '@/shared/ui/Panel.module.css';
import {
  frenchEquation,
  otherLinks,
  parseWords,
  primaryLinks,
  suggestEnglish,
  type Idea,
  type SearchLink,
} from './searchLogic';

const EMPTY_IDEA: Idea = { french: '', english: '' };
const MAXIMUM_IDEAS = 3;

const ideasStore = createStore<Idea[]>('biblio-du:mots:v1', [EMPTY_IDEA, EMPTY_IDEA]);

function LinkList({ links }: { links: readonly SearchLink[] }) {
  return (
    <ul className={panel.choices}>
      {links.map((link) => (
        <li key={link.url}>
          <ExternalLink href={link.url}>
            Chercher dans {link.name} ({link.language})
          </ExternalLink>
          <p className={panel.note}>{link.query}</p>
        </li>
      ))}
    </ul>
  );
}

export function SearchBuilder() {
  const ideas = useStore(ideasStore);
  const equation = frenchEquation(ideas);
  const main = primaryLinks(ideas);
  const others = otherLinks(ideas);

  const update = (index: number, change: Partial<Idea>) =>
    ideasStore.update((current) =>
      current.map((idea, position) => (position === index ? { ...idea, ...change } : idea)),
    );

  const addSuggestion = (index: number, word: string, idea: Idea) => {
    const words = parseWords(idea.english);
    if (!words.includes(word)) update(index, { english: [...words, word].join(', ') });
  };

  return (
    <div className={panel.tool}>
      <section className={panel.step} aria-labelledby="mots-idees">
        <h2 id="mots-idees" className={panel.stepTitle}>
          1. Notez les idées de votre question
        </h2>
        <p>
          Gardez deux ou trois idées. Pour chacune, écrivez plusieurs mots, séparés par des
          virgules. Par exemple, Sam écrit « pair-aidance, médiateur de santé pair », puis «
          addictologie, addiction ».
        </p>
        {ideas.map((idea, index) => {
          const suggestions = suggestEnglish(idea.french).filter(
            (word) => !parseWords(idea.english).includes(word),
          );
          return (
            <fieldset key={index} className={panel.step}>
              <legend className={panel.stepTitle}>Idée {index + 1}</legend>
              <Field
                label="Mes mots en français"
                value={idea.french}
                onChange={(french) => update(index, { french })}
              />
              <Field
                label="Mes mots en anglais"
                hint="Facultatif, mais nécessaire pour PubMed."
                value={idea.english}
                onChange={(english) => update(index, { english })}
              />
              {suggestions.length > 0 && (
                <div className={panel.actions}>
                  <span>Suggestions :</span>
                  {suggestions.map((word) => (
                    <Button
                      key={word}
                      variant="secondary"
                      onClick={() => addSuggestion(index, word, idea)}
                    >
                      Ajouter « {word} »
                    </Button>
                  ))}
                </div>
              )}
            </fieldset>
          );
        })}
        {ideas.length < MAXIMUM_IDEAS && (
          <div className={panel.actions}>
            <Button
              variant="secondary"
              onClick={() => ideasStore.update((current) => [...current, EMPTY_IDEA])}
            >
              Ajouter une idée
            </Button>
          </div>
        )}
      </section>

      <section className={panel.step} aria-labelledby="mots-equation">
        <h2 id="mots-equation" className={panel.stepTitle}>
          2. Votre <Term id="equation" label="équation de recherche" />
        </h2>
        {equation ? (
          <div className={panel.result}>
            <p>{equation}</p>
            <div className={panel.actions}>
              <CopyButton label="Copier mon équation" html={equation} text={equation} />
            </div>
            <p className={panel.note}>
              Gardez-la dans votre journal de bord, avec le nom de l’outil et la date.
            </p>
          </div>
        ) : (
          <p>Elle apparaîtra ici dès que vous aurez écrit un mot.</p>
        )}
      </section>

      <section className={panel.step} aria-labelledby="mots-lancer">
        <h2 id="mots-lancer" className={panel.stepTitle}>
          3. Lancez la recherche
        </h2>
        {main.length === 0 ? (
          <p>Les liens apparaîtront ici. Chacun s’ouvre dans un nouvel onglet.</p>
        ) : (
          <>
            <p>
              Chaque outil a son propre langage : nous avons adapté votre recherche pour vous. Si
              vous avez trop ou trop peu de résultats, revenez ici et ajustez vos mots.
            </p>
            <LinkList links={main} />
            {others.length > 0 && (
              <MoreDetails title="Chercher ailleurs : thèses, mémoires, archives">
                <LinkList links={others} />
              </MoreDetails>
            )}
          </>
        )}
        <p className={panel.note}>
          Vos mots restent sur cet appareil jusqu’à ce que vous cliquiez sur un lien. N’y mettez
          jamais de nom de personne.
        </p>
      </section>
    </div>
  );
}
