# Scénarios des animations

Chaque animation vit dans `src/scenes/<id>.tsx` et exporte par défaut un `SceneDefinition`.
Modèle à suivre : `src/scenes/entonnoir.tsx`. Boîte à outils : `src/features/scene-player/kit.tsx`.

## Règles de dessin

- La scène fait 640 × 440. Elle est affichée à 340 px de large sur téléphone : **jamais de texte de
  taille inférieure à 20**, et 24 à 28 pour le texte principal. Une ligne de 24 caractères maximum
  en taille 26.
- Peu de mots dans le dessin : c'est la légende, à côté, qui explique.
- Une seule idée nouvelle par étape. Ce qui est déjà apparu reste visible, sauf indication contraire.
- L'image ne dépend que de `frame` (`step`, `progress`) : pas de `useState`, pas de CSS animé, pas de
  hasard. Utiliser `appear`, `during`, `typed`, `lerp`.
- Couleurs : uniquement les couleurs du kit (`ink`, `muted`, `accent`, `warm`, `paper`, `soft`,
  `accentSoft`, `line`), pour rester lisible en thème clair et sombre.
- Identité : formes géométriques simples, cartes avec un seul coin arrondi (`Card`), quarts de
  cercle (`QuarterTile`). Pas d'emoji, pas de dégradé, pas d'ombre.
- Les écrans de sites sont **redessinés et simplifiés** avec `Browser`, `SearchField`, `Pointer`,
  `Marker`. Pas de logo de marque : le nom du site s'écrit en texte.
- Les légendes (`caption`) ci-dessous sont à reprendre mot pour mot. Durée : environ 4000 ms pour
  une légende courte, 5000 ms pour une longue.
- Sam est une personne fictive : pas de pronom ni d'accord genré pour Sam.

## Concepts

### six-etapes — Les six étapes d'une recherche
Six tuiles numérotées sur un chemin (deux rangées de trois) qui se colorent une à une, avec un mot :
Question, Mots, Outils, Documents, Tri, Citation. À la dernière étape, une flèche revient vers le début.
1. Tout commence par votre question : que voulez-vous comprendre ?
2. Ensuite, vous choisissez les mots qui décrivent votre question.
3. Puis vous décidez où chercher : une bibliothèque, une base de données, un moteur de recherche.
4. Vous repérez les documents utiles, et vous obtenez le texte complet.
5. Vous les triez : sont-ils fiables ? Répondent-ils à votre question ?
6. Enfin, vous citez dans votre mémoire ce que vous avez utilisé.
7. Et souvent, on revient en arrière pour ajuster. C'est tout à fait normal !

### reference-piste — À quoi sert une référence ?
À gauche, une page de mémoire avec des lignes grises et « (Castro, 2020) » en évidence. Une flèche
mène à une carte « Bibliographie » avec une ligne en évidence, puis une flèche vers une carte
« L'article ».
1. Dans son mémoire, Sam présente une idée, et ajoute (Castro, 2020) juste après.
2. À la fin du mémoire, la bibliographie donne la référence complète de ce document.
3. Grâce à cette référence, un lecteur peut retrouver l'article et le lire à son tour.
4. C'est tout l'intérêt d'une référence : laisser une piste que d'autres peuvent suivre.

### qqoqcp — Six questions pour préciser son sujet
Au centre, une carte « La pair-aidance en addictologie ». Autour, six petites cartes apparaissent
une à une : Quoi ? Qui ? Où ? Quand ? Comment ? Pourquoi ? (mot-question seul, gros). La réponse
courte s'affiche dans la carte centrale le temps de l'étape.
1. Sam part de son sujet, et lui pose une première question : quoi ? Ici, la place de la pair-aidance.
2. Qui est concerné ? Une personne pair-aidante, et l'équipe soignante.
3. Où cela se passe-t-il ? Dans un service d'addictologie.
4. Quand ? Dans les premiers mois, après l'arrivée dans l'équipe.
5. Comment l'aborder ? À partir de ce que vivent les personnes.
6. Pourquoi est-ce important ? Pour aider les équipes à mieux accueillir les pair-aidants.
7. Avec ces six réponses, le sujet de Sam est déjà beaucoup plus précis.

### carte-mentale — Dessiner ses idées
Au centre « Pair-aidance en addictologie ». Quatre branches vers les coins : Le sujet, Les personnes,
Les outils, Le contexte. Puis deux ou trois mots par branche. À la fin, trois mots entourés avec
`Marker` : accueil, secret partagé, réunions.
1. Sam écrit son sujet au milieu de la feuille.
2. Sam trace quatre branches : le sujet, les personnes, les outils, le contexte.
3. Sur chaque branche, Sam ajoute des mots, comme ils viennent, sans les trier.
4. Sam relit, et entoure ce qui l'attire le plus. Voilà de nouvelles pistes de lecture !

### et-ou-sauf — ET, OU, SAUF
Diagramme de Venn : deux cercles « pair-aidance » et « addictologie ». Selon l'étape, la zone gardée
se remplit en couleur : intersection pour ET, les deux cercles pour OU, le cercle gauche privé de
l'intersection pour SAUF. L'équation s'affiche en bas.
1. Imaginons deux tas de documents : ceux sur la pair-aidance, et ceux sur l'addictologie.
2. Avec ET, vous gardez seulement les documents qui parlent des deux. La recherche se resserre.
3. Avec OU, vous gardez tout ce qui parle de l'un ou de l'autre. La recherche s'élargit.
4. Avec SAUF, vous retirez les documents qui parlent du second mot.

### guillemets-asterisque — Guillemets et astérisque
En haut, un champ de recherche dont le texte s'écrit. En dessous, un petit document où les mots
trouvés sont surlignés : éparpillés à l'étape 1, côte à côte à l'étape 2. Puis `psychiatr*` et trois
étiquettes : psychiatre, psychiatrie, psychiatrique.
1. Sans guillemets, l'outil peut trouver vos mots éparpillés dans le document.
2. Avec des guillemets, il cherche ces mots collés, dans cet ordre.
3. L'astérisque, lui, remplace la fin d'un mot.
4. Ainsi, psychiatr* trouve psychiatre, psychiatrie et psychiatrique.

### bruit-silence — Le bruit et le silence
Deux situations côte à côte, ou l'une après l'autre : un nuage de nombreux petits carrés, dont
quelques-uns en couleur (utiles), qui se réduit ; puis trois carrés seulement, qui deviennent plus
nombreux. Nombre de résultats écrit en gros.
1. Une recherche trop large donne du bruit : beaucoup de résultats, mais peu d'utiles.
2. Pour réduire le bruit, on resserre : ET, guillemets, filtre de date.
3. À l'inverse, une recherche trop étroite donne du silence : presque rien.
4. Pour réduire le silence, on élargit : OU, synonymes, anglais, autre outil.
5. On ajuste ainsi plusieurs fois, jusqu'à obtenir des résultats vraiment utiles.

## Visites d'écran

### traduire-mesh — Trouver le mot anglais
`Browser` à l'adresse hetop.eu. Champ avec « stigmatisation », puis une fiche : « Stigmatisation
sociale » et, en dessous, « Social Stigma » entouré par `Marker`.
1. Sam ouvre HeTOP et tape un mot en français : stigmatisation.
2. Le site propose le terme officiel.
3. Juste en dessous, Sam trouve sa version anglaise : Social Stigma.
4. Sam peut maintenant utiliser ce terme dans PubMed.

### scholar — Trois réglages sur Google Scholar
`Browser` à l'adresse scholar.google.com. Enchaîne : menu Paramètres, ligne « Liens vers des
bibliothèques », étiquette « Lyon 1 » ajoutée ; champ de recherche ; deux résultats ; sous un
résultat, les liens « Citer » et « Cité par 34 » repérés par `Marker`.
1. Sam ouvre Google Scholar, puis le menu des paramètres.
2. Dans « Liens vers des bibliothèques », Sam ajoute Lyon 1.
3. Sam lance sa recherche, et lit les premiers résultats.
4. Sous un résultat, « Cité par » mène à des travaux plus récents sur le même sujet.
5. Le bouton « Citer » donne la référence en APA. Il faudra la relire.

### pubmed — Une première recherche sur PubMed
`Browser` à l'adresse pubmed.ncbi.nlm.nih.gov. Champ avec `"peer support"[tiab]`, liste de résultats,
colonne de filtres à gauche (case Free full text, curseur de dates), bouton Cite repéré par `Marker`.
1. Sam ouvre PubMed et tape "peer support"[tiab].
2. Les résultats s'affichent, en anglais.
3. À gauche, Sam coche le filtre Free full text pour voir les textes gratuits.
4. Sam garde les dix dernières années, avec le filtre de dates.
5. Le bouton Cite donne la référence en APA. Sam vérifie les majuscules.

### semantic-scholar — Explorer avec Semantic Scholar
`Browser` à l'adresse semanticscholar.org. Champ de recherche, un résultat avec un nombre de
citations repéré par `Marker`, un petit encadré « TLDR » d'une ligne, un bouton Cite.
1. Sam tape sa recherche en anglais, avec des guillemets.
2. Chaque résultat indique combien de fois il a été cité.
3. Dans certains domaines, un résumé très court aide à voir de quoi parle l'article.
4. Le bouton Cite donne la référence en APA. Reste à ouvrir l'article pour le vérifier.

### cairn-lyon1 — Ouvrir Cairn avec Lyon 1
Trois écrans `Browser` successifs : portaildoc.univ-lyon1.fr avec une ligne « Bibliothèque en
ligne » puis « Cairn » ; une page de connexion Lyon 1 (deux champs) ; shs.cairn.info avec un champ
« pair-aidance » et un résultat portant une étiquette « Texte intégral ».
1. Sam ouvre le portail des bibliothèques de Lyon 1, puis la bibliothèque en ligne.
2. Sam y trouve Cairn, dans la liste des ressources.
3. Une page demande de se connecter avec son compte Lyon 1.
4. Cairn s'ouvre, et Sam tape son mot de recherche.
5. Quand un texte est accessible, Sam peut le lire en entier.

### zotero — Zotero en cinq gestes
Écran coupé en deux étapes : `Browser` montrant un article et un bouton « Enregistrer dans Zotero » ;
fenêtre Zotero avec une liste de références ; fenêtre « Word » avec un texte et « (Castro, 2020) » ;
bibliographie qui apparaît en bas.
1. Sam ouvre un article dans son navigateur.
2. Un clic sur le bouton de Zotero enregistre la référence.
3. Sam la retrouve dans sa bibliothèque Zotero, avec les autres.
4. Dans Word, Sam insère la citation en deux clics.
5. Zotero écrit la bibliographie tout seul. Il reste à la relire.

### hallucination — La fausse référence
Conversation : bulle de Sam, puis bulle de l'IA avec trois lignes « Article A », « Article B »,
« Article C » (ne pas écrire de vrais noms). Puis un marqueur pour chaque ligne : coche pour A,
croix pour B, point d'interrogation pour C.
1. Sam demande à une IA trois articles sur son sujet.
2. L'IA répond avec assurance : auteurs, titre, revue, année.
3. Sam vérifie le premier article : il existe bien.
4. Le deuxième est introuvable. Il a été inventé, et il semblait pourtant très crédible.
5. Le troisième existe, mais il ne dit pas ce que l'IA affirme.
6. La leçon est simple : on vérifie chaque référence, et on lit le document.

## Documents et IA

### fiabilite — Quatre questions à poser à un document
Une carte « Document » à gauche. À droite, quatre questions apparaissent : Qui ? Quand ? Où ?
Pourquoi ? Chacune avec une zone de la carte repérée par `Marker`.
1. Vous avez trouvé un document. Avant de l'utiliser, posez-lui quatre questions.
2. Qui l'a écrit ? L'auteur est-il nommé, et quelle est son expérience ?
3. Quand a-t-il été écrit ? Le document est-il encore à jour ?
4. Où a-t-il été publié ? Dans une revue, sur un site officiel, sur un blog ?
5. Pourquoi a-t-il été écrit ? Pour informer, convaincre ou vendre ?

### imrad — Le plan d'un article
Une page d'article avec quatre blocs : Introduction, Méthode, Résultats, Discussion. Chaque bloc
s'éclaire. À la fin, des numéros 1, 2, 3 montrent l'ordre de lecture : résumé, discussion, méthode.
1. La plupart des articles suivent le même plan, en quatre parties.
2. L'introduction explique pourquoi cette recherche a été faite.
3. La méthode dit comment : avec qui, où, de quelle façon.
4. Les résultats présentent ce qui a été trouvé.
5. La discussion dit ce qu'il faut en retenir, et quelles sont les limites.
6. Pour aller à l'essentiel : le résumé, puis la discussion, puis la méthode.

### citer-texte-liste — Du texte à la liste
À gauche, un paragraphe de lignes grises avec deux citations en couleur. À droite, une liste de trois
références (courtes : « Castro, 2020 », « Franck & Cellard, 2020 », « Le Cardinal et al., 2013 »),
reliées par des flèches, par ordre alphabétique.
1. Dans votre texte, chaque idée empruntée porte une citation : le nom et l'année.
2. Cette citation renvoie à une ligne de votre bibliographie.
3. La liste est rangée par ordre alphabétique, selon le premier auteur.
4. Retenez la règle : à chaque citation sa référence, à chaque référence sa citation.

### anatomie-reference — Les morceaux d'une référence
La référence de Castro (2020) se construit en quatre blocs colorés, empilés ligne par ligne pour
rester lisible : Qui « Castro, D. », Quand « (2020). », Quoi « Une brève synthèse… », Où « Le Journal
des psychologues, (374), 18-23. », puis le lien « doi.org/10.3917/jdp.374.0018 ». Une étiquette à
gauche nomme chaque bloc. Le nom de la revue est en italique.
1. Une référence répond toujours aux mêmes questions. D'abord : qui a écrit ?
2. Quand ? L'année vient juste après, entre parenthèses.
3. Quoi ? C'est le titre du document.
4. Où ? C'est là que le texte est paru : ici, une revue, son numéro et ses pages.
5. Enfin, le lien permet de le retrouver en un clic.

### mot-suivant — Comment une IA écrit
Une phrase « La pair-aidance repose sur le » puis, en dessous, trois barres avec des mots : vécu,
partage, travail (longueurs différentes, sans chiffres). Le mot choisi rejoint la phrase, puis de
nouvelles barres apparaissent.
1. Une IA reçoit le début d'une phrase.
2. Elle calcule quels mots pourraient venir ensuite, d'après tous les textes qu'elle a vus.
3. Elle choisit un mot probable, l'ajoute, et recommence.
4. Mot après mot, le texte s'écrit. À aucun moment, elle ne vérifie si c'est vrai.

### cycle-ia — L'IA à chaque étape, et vous au centre
Six tuiles en cercle : Idées, Recherche, Lecture, Plan, Rédaction, Correction. Au centre une grande
carte « Vous ». Une à une, les tuiles s'allument, avec une flèche vers le centre.
1. Vous pouvez vous faire aider pour trouver des idées.
2. L'IA peut vous aider à repérer des articles. À vous de vérifier qu'ils existent.
3. Elle peut résumer un texte. Lisez vous-même ceux qui comptent vraiment.
4. Elle peut proposer un plan. C'est vous qui décidez de votre fil conducteur.
5. Elle peut vous aider à reformuler. Le texte final doit rester le vôtre.
6. Elle peut corriger votre français. Vous acceptez ou refusez chaque correction.
7. À chaque étape, vous gardez la main : vous vérifiez, vous ajustez, vous décidez.

### anonymiser — Anonymiser avant d'écrire
Une note fictive sur quatre lignes : « Mme D., 42 ans », « hospitalisée à Bron », « en mars 2026 »,
« ancienne pharmacienne ». Chaque ligne est barrée puis remplacée par sa version générale : « Une
personne », « d'une quarantaine d'années », « hospitalisée », « l'an dernier ». La ligne du métier
disparaît. À la fin, une carte verte « Rien ne permet de la reconnaître ».
1. Voici une note fictive. Sam aimerait l'aide d'une IA, mais pas dans cet état.
2. D'abord, le nom. Même une initiale peut suffire à reconnaître quelqu'un.
3. L'âge exact devient une tranche d'âge.
4. Le lieu et la date deviennent généraux.
5. Le métier rare disparaît, car il rend la personne reconnaissable.
6. Dernière question : quelqu'un qui la connaît pourrait-il la reconnaître ? Si le doute reste, on n'envoie rien.

### actif — La méthode ACTIF
Cinq lettres A C T I F en colonne à gauche, dans des tuiles. À droite, la demande de Sam se construit
ligne par ligne, chaque ligne en couleur liée à sa lettre.
1. A comme Action : que voulez-vous obtenir ? Par exemple, des mots-clés.
2. C comme Contexte : parlez de votre mémoire et de votre question.
3. T comme Tonalité : demandez un langage simple, par exemple.
4. I comme Identité : donnez un rôle à l'IA, comme celui de documentaliste.
5. F comme Format : précisez la forme attendue, par exemple un tableau.
6. Votre demande est prête. Vérifiez qu'elle ne contient aucune donnée sensible.
