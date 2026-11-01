# Le parcours dans le site

Ce document explique comment le site est organisé pour la personne qui s'en sert, et pourquoi.
À relire avant de toucher à la navigation ou à l'ordre d'une page. Révision du 1er novembre 2026.

## Les quatre situations

Le site doit répondre tout de suite à quatre situations. Chacune a son chemin le plus court.

| La personne se dit…                           | Elle trouve, sans défiler                                       |
| --------------------------------------------- | --------------------------------------------------------------- |
| « Je débute »                                 | Le bouton **Commencer le parcours** de l'accueil                |
| « Un point précis me bloque »                 | **Les six situations** de l'accueil, ou la recherche            |
| « Je reviens »                                | Le bouton **Continuer le parcours**, et le nombre de pages lues |
| « Je cherche un mot, un outil, une personne » | **La recherche**, présente sur toutes les pages, et le menu     |

## Le modèle : parcours, sections, pages

Trois niveaux, pas plus, et les mêmes mots partout :

- **le parcours** : les 7 sections, dans l'ordre conseillé ;
- **une section** : « Section 6 sur 7 » ;
- **une page** : « Page 3 sur 8 ». Dans le code, c'est une leçon (`Lesson`).

Le mot « étape » reste réservé aux six étapes de la recherche, enseignées dans le contenu.

## Les règles à garder

**L'essentiel d'abord.** Sur chaque page, ce qui compte le plus arrive en premier. Une leçon commence
par « L'essentiel », puis l'animation, puis le détail. Une section commence par son bouton d'action.

**Une seule action principale par écran.** C'est le bouton plein (`LinkButton`). Le reste est
secondaire : bouton en contour, ligne ou lien.

**Toujours savoir où l'on est.** Un lien du menu reste allumé, le fil d'Ariane (`Breadcrumb`) donne
le chemin, et la position est écrite en clair. La page en cours n'est jamais un lien. Sur téléphone,
le fil d'Ariane se réduit au niveau parent, pour ne pas passer à la ligne : c'est pour cela que
chaque section a un `shortTitle`.

**Ce qui se clique doit se voir sans survol.** Sur un téléphone, il n'y a pas de survol.

- Une liste de destinations utilise `LinkRow` : toute la ligne est cliquable, avec son cadre, son
  titre dans la couleur des liens et son chevron.
- Un lien dans une phrase reste souligné.
- Un texte fixe ne prend jamais la couleur des liens.
- Une icône seule ne suffit que si elle est universelle, comme la loupe. Sinon, elle a un texte.

**Le menu reste visible.** Quatre liens, jamais de menu caché, y compris sur téléphone.

**La page ne change pas toute seule.** La recherche se lance à la validation, jamais pendant la
frappe. Aucun élément ne reste fixé à l'écran pendant la lecture, en dehors de la liste des pages de
la section sur ordinateur.

**Une recherche ratée n'est pas une impasse.** La plupart des gens ne reformulent pas : la page sans
résultat propose donc un conseil, des situations et une personne à contacter. La recherche accepte
les fautes, les accents oubliés, les pluriels et les questions en langage courant.

**La progression s'enregistre sans effort.** Passer à la page suivante marque la page comme lue. La
case « J'ai lu cette page » reste là pour qui lit à la carte.

## Quand on ajoute quelque chose

- Une nouvelle page de contenu ou un nouvel outil doit entrer dans la recherche
  (`features/search/documents.ts`).
- Un nouvel outil doit être rangé dans un groupe de `TOOL_GROUPS`, selon ce que la personne veut
  faire.
- Une nouvelle page de niveau 2 ou plus reçoit un `Breadcrumb`.
- Une nouvelle situation fréquente va dans `content/shortcuts.ts`. Six suffisent : au-delà, on ne les
  lit plus.

## Ce qui a été choisi, et écarté

- **Pas de barre fixe en bas de l'écran sur téléphone.** Elle s'empilerait sur la barre de Safari,
  et elle occuperait l'écran pendant toute la lecture. Le menu est en haut, en deux rangées.
- **Pas d'en-tête fixe.** Il prendrait de la place pendant la lecture, et les ancres passeraient
  dessous.
- **Pas de suggestions pendant la frappe.** Une page de résultats a sa propre adresse, le retour
  arrière la retrouve, et elle laisse la place pour aider quand rien n'est trouvé.
- **« Parcours » reste dans le menu**, même si le logo mène au même endroit. C'est le seul lien qui
  peut rester allumé dans une leçon, et tout le monde ne sait pas que le logo ramène à l'accueil.
- **La 8ᵉ tuile a disparu.** Pleinement colorée, elle se lisait comme « terminé », à l'inverse de ce
  que signifie la couleur des autres tuiles.

## Mesures

Relevées sur le site publié, à la première visite. Ordinateur 1280 × 800, téléphone 390 × 844.

| Mesure                                                         | Avant    | Après                |
| -------------------------------------------------------------- | -------- | -------------------- |
| Téléphone : hauteur de l'en-tête                               | 155 px   | 108 px               |
| Téléphone : première action de contenu de l'accueil            | 1 080 px | 404 px               |
| Téléphone : première situation fréquente                       | 2 486 px | 565 px               |
| Téléphone : actions de contenu dans le 1ᵉʳ écran de l'accueil  | 0        | 4                    |
| Téléphone : premier lien de contenu d'une leçon                | 2 522 px | 121 px               |
| Téléphone : longueur de l'accueil                              | 3 442 px | 2 450 px             |
| Ordinateur : première situation fréquente                      | 1 679 px | 145 px               |
| Ordinateur : actions de contenu dans le 1ᵉʳ écran de l'accueil | 0        | 9                    |
| Toutes tailles : recherche sur le site                         | aucune   | sur toutes les pages |

## Sources

Consultées le 1er novembre 2026, en ligne. Le système de design de l'État (DSFR) n'a pas pu être
consulté : son site bloque les accès automatiques.

- Nielsen, J. (2001). [Search: Visible and Simple](https://www.nngroup.com/articles/search-visible-and-simple/).
  Champ de saisie visible, présent sur toutes les pages. Les taux de réussite chutent à chaque
  reformulation. L'article est ancien, mais ses principes restent ceux du site.
- Loranger, H. (2015). [Beyond Blue Links: Making Clickable Elements Recognizable](https://www.nngroup.com/articles/clickable-elements/).
  Signes de ce qui se clique, couleur des liens, cibles élargies, icônes avec texte.
- Pernice, K., & Budiu, R. (2016). [Hamburger Menus and Hidden Navigation Hurt UX Metrics](https://www.nngroup.com/articles/hamburger-menus/).
  Sur téléphone, avec quatre liens ou moins, on les laisse visibles.
- Laubheimer, P. (2018, relu en 2026). [Breadcrumbs: 11 Design Guidelines for Desktop and Mobile](https://www.nngroup.com/articles/breadcrumbs/).
  Page en cours non cliquable, pas de retour à la ligne, niveau parent seul sur téléphone.
- Schade, A. (2018). [Inverted Pyramid: Writing for Comprehension](https://www.nngroup.com/articles/inverted-pyramid/).
  L'essentiel d'abord, avec éventuellement une liste de points à retenir.
- Nielsen Norman Group (2013). [Minimize Cognitive Load to Maximize Usability](https://www.nngroup.com/articles/minimize-cognitive-load/).
  Moins d'encombrement, des repères déjà connus, moins de choses à lire, retenir ou décider.
