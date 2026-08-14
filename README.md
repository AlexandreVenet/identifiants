# Identifiants

Application *front* locale (sans serveur) à lancer en navigateur web pour centraliser, naviguer, sélectionner, chercher des identifiants de connexion (ou autre).

Tester ici : https://alexandrevenet.github.io/identifiants

La navigation contient les **catégories**. Chaque catégorie est représentée par un **nom** et une **couleur**. Pour modifier cette navigation, éditer `scripts/menu.js` et `styles/couleurs.css`.

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

Chaque catégorie contient des **entrées**. Pour modifier le contenu des catégories, éditer des fichiers dans le répertoire `donnees`. Ces entrées ont pour **propriétés** :
- le **nom de fichier de l'image** - optionnel car il existe une image par défaut, une image introuvable est remplacée automatiqument par l'image par défaut,
- un **titre**,
- un **sous-titre**,
- une liste de **liens cliquables**,
- une liste de **textes cliquables** contenant chacun un **intitulé** et un **texte** - cliquer sur le bloc sélectionne automatiquement le texte (et pas l'intitulé),
- une liste de **textes au kilomètre non cliquables**.

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
- **globale** : le texte saisi est recherché dans toutes les catégories, dans le titre et le sous-titre,
- **locale** : le texte saisi est cherché seulement dans ce qui est affiché à l'écran.
