# Support biblio et IA du DU de pair-aidance

Site statique React 19 + TypeScript + Vite, publié sur GitHub Pages. Tout le contenu est en
français. Voir `docs/PLAN.md` pour les décisions et les règles de rédaction.

## Commandes

- `npm run dev` : serveur local.
- `npm run check` : types, lint et tests. À lancer avant chaque commit.
- `npm run deploy` : contrôle, construit, puis publie `dist/` sur la branche `gh-pages`.
- `npm run check:liens` : vérifie les liens externes du contenu.

## Organisation

- `src/content/` : le contenu, en données pures. Pour corriger un texte, on édite ici.
- `src/features/` : une fonctionnalité par dossier. La logique pure et testée est séparée des composants.
- `src/scenes/` : une animation par fichier, dessinée avec `features/scene-player/kit.tsx`.
- `src/shared/` : utilitaires et composants d'interface communs.
- `src/pages/` : une page par route. Routage par ancre (`#/...`) à cause de GitHub Pages.

## À respecter

- Les PDF sources (articles, supports) ne vont jamais dans ce dépôt public.
- Aucune référence ni aucun chiffre de mémoire : vérifier dans Zotero, puis Crossref ou la source primaire.
- Le guide APA de la BU Lyon 1 est sous licence CC BY-NC-ND : on applique ses règles, on ne copie ni ses textes ni ses exemples.
- Un terme technique du contenu s'écrit `[[id]]` pour être survolable. Un test le vérifie.
- Une scène ne dépend que de `frame` (pas de CSS animé) : mêmes entrées, même image.
- Accessibilité non négociable : clavier, lecteur d'écran, mouvements réduits, téléphone 360 px.
