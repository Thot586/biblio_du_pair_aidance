# Recherche documentaire et IA, pas à pas

Support pédagogique pour la recherche bibliographique et l'utilisation de l'IA dans le cadre du DU
de pair aidance (Université Lyon 1, Le Vinatier, Centre ressource de réhabilitation).

Conception : Dr FENOHASINA T.J. Félicien et Mme LONG Aude.

**Site en ligne : https://thot586.github.io/biblio_du_pair_aidance/**

## Ce que contient le site

- Un parcours en sept sections, chacune sous forme de question, lisibles dans n'importe quel ordre.
- Des animations avec lecture, pause, retour et vitesse, accompagnées de leur texte.
- Des quiz sans note et des termes techniques expliqués au survol et au clic.
- Sept outils : atelier de question, mots de recherche, choix de l'outil, générateur de références
  APA, vérification d'une référence, préparation d'une demande à une IA, déclaration d'usage de l'IA.

Aucun compte, aucune mesure d'audience : la progression reste dans le navigateur.

## Modifier le contenu

Le contenu est dans `src/content/`, séparé du code. Pour corriger une phrase, modifiez le fichier de
la section dans `src/content/sections/`. Les règles de rédaction sont dans `docs/PLAN.md`, les
scénarios des animations dans `docs/SCENES.md`.

Dans les textes :

- `**gras**` et `*italique*` ;
- `[[doi]]` ou `[[doi|le DOI]]` rend un mot survolable, à partir de `src/content/glossary.ts` ;
- `[texte](https://adresse)` crée un lien.

## Développement

Il faut Node.js 22 ou plus récent.

```bash
npm install
npm run dev          # site local
npm run check        # types, lint, tests
npm run check:liens  # liens externes
npm run deploy       # contrôle, construit et publie sur GitHub Pages
```

## Technique

React 19, TypeScript strict, Vite, React Router (routage par ancre pour GitHub Pages), CSS Modules,
Vitest et Testing Library. La logique de chaque fonctionnalité est séparée de ses composants, et
testée à part. Voir `CLAUDE.md` pour l'organisation du code.

## Droits

Les règles APA suivent le guide de la BU Lyon 1 (licence CC BY-NC-ND), qui reste la référence et
n'est pas reproduit ici. Les logos appartiennent à leurs institutions.
