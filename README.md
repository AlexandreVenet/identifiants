# Identifiants

Application *front* locale (sans serveur) à lancer en navigateur web pour centraliser, naviguer, sélectionner, chercher des identifiants de connexion (ou autre).

Pour tester : 
- https://alexandrevenet.github.io/identifiants
- Essayer la recherche globale avec `a`, puis `am`, puis `ame`.

La navigation contient les **catégories**. Chaque catégorie est représentée par un **nom** et une **couleur**. Pour modifier cette navigation, éditer `scripts/menu.js` et `styles/couleurs.css`. Propriétés :
- `categorie` 
	- La valeur doit être identique au nom de la propriété utilisée par chaque fichier de données. 
	- Ex : `video` pour la catégorie `DONNEES.video`
- `classeCSS` 
	- La valeur doit être identique au nom de la règle de style utilisée pour cette catégorie.
	- Ex : `video` pour la règle `.video`
- `nom` 
	- La valeur est le texte affiché à l'écran. 
	- Ex : `Vidéo`

```JS
const MENU = 
[
	{ 
		categorie : 'video', 
		classeCSS : 'video',
		nom : 'Vidéo',
	},
];
```

```CSS
:root
{
	--couleur_video:#8E24AA;
}

.video { background-color: var(--couleur_video); }
```

Chaque catégorie contient des **entrées**. Pour modifier ces entrées, éditer des fichiers dans le répertoire `donnees`. La catégorie est représentée par la propriété dont le nom doit être identique à celui utilisé dans la propriété `categorie` d'un élément de navigation décrit dans `scripts/menu.js` (voir plus haut). Propriétés :
- `image` 
	- Nom du fichier à charger
	- Optionnel. Par défaut, l'image utilisée est `defaut.svg`.
	- Si fichier introuvable, l'image par défaut est appelée.
- `titre`
	- Texte affiché à l'écran.
- `sousTitre` 
	- Texte affiché à l'écran.
- `liens`
	- Liste de liens web.
- `textesCliquables`
	- Chaque objet de cette liste représente un élément contenant un intitulé et un texte.
	- Cliquer sur l'élément sélectionne le texte (et pas l'intitulé).
- `textes` 
	- Liste de textes au kilomètre.

```JS
DONNEES.video = 
[
	{
		image: 'mon_image.svg',
		titre: 'Titre', 
		sousTitre: 'Sous-titre',
		liens: 
		[
			'https://www...',
		],
		textesCliquables:
		[
			{ intitule: 'Prénom', texte: 'Zaza' },
			{ intitule: 'Nom', texte: 'Bibi' },
		],
		textes: 
		[
			'Texte 1',
			'Texte 2',
		]
	},
];
```

La **recherche** peut être :
- **globale** : le texte saisi est recherché dans toutes les catégories, les titres et les sous-titres,
- **locale** : le texte saisi est cherché seulement dans ce qui est affiché à l'écran.
