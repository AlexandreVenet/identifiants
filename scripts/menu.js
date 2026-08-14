const MENU = 
[
	/*
	Chaque objet représente une catégorie et une entrée dans la nav. 
	
	Propriétés
		categorie 
			La valeur doit être identique au nom de la propriété utilisée par chaque fichier de données. 
			Ex : DONNEES.video
		classeCSS 
			La valeur doit être identique au nom de la règle de style utilisée pour cette catégorie.
			Ex : .video
		nom 
			La valeur est le texte affiché à l'écran. 
			Ex : Vidéo
	*/
	
	{ 
		categorie : 'administration', 
		classeCSS : 'administration',
		nom : 'Administration',
	},
	{ 
		categorie : 'video',
		classeCSS : 'video',
		nom : 'Vidéo',
	},
	{ 
		categorie : 'jeu',
		classeCSS : 'jeu',
		nom : 'Jeu',
	},
];
