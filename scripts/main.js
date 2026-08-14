'use strict';

const DONNEES = {};
let categorieChoisie = '';
const ordreCategories = [];
const repertoireMedia = 'media/';
const imgDefautNom = '_defaut.svg'
const imgDefaut = repertoireMedia + imgDefautNom;

const globalLocal = document.querySelector('#globalLocalID');
let etatRecherche = globalLocal.dataset.etat;
const recherche = document.querySelector('#rechercheID');
const main = document.querySelector('main');
const nav = document.querySelector('nav');
const navBtns = [];



let initNav = () =>
{
	creerNav(); 
	
	obtenirOrdreNavBtns();
	
	for (const element of navBtns)
	{
		element.onclick = async (e) =>
		{
			e.preventDefault();
			
			const btnChoisi = document.querySelector('nav button.choisi');
			const btn = e.target.closest('button');
			
			viderChampRecherche();
			
			window.getSelection().removeAllRanges();
			
			supprimerClasseChoisiNavBtns();
			btn.classList.add('choisi');
			
			viderMain();
			
			categorieChoisie = btn.dataset.categorie;
			const donneesTriees = trierDonnees(DONNEES[categorieChoisie]);
			for (const donnee of donneesTriees)
			{
				await creerSection(donnee, categorieChoisie);
			}
		};	
	};
};

let creerNav = () =>
{
	for (const element of MENU) 
	{
		const btn = document.createElement('button');
		btn.type = 'button';
		btn.dataset.categorie = element.categorie;
		
		const div = document.createElement('div');
		div.classList.add('couleur');
		div.classList.add(element.categorie);
		
		const span = document.createElement('span');
		span.textContent = element.nom;
		
		btn.append(div, span);
		
		nav.appendChild(btn);
		
		navBtns.push(btn);
	}
};

let obtenirOrdreNavBtns = () =>
{
	for (const element of MENU) 
	{
		ordreCategories.push(element.categorie);
	}
};

let trierDonnees = (donnees) =>
{
	return donnees.sort( (a,b) => a.titre.localeCompare(b.titre, 'fr', { sensitivity: 'base' }) );
};

let creerSection = async (donnee, categorieChoisie) =>
{
	const section = document.createElement('section');
	section.dataset.titre = donnee.titre;
	section.dataset.soustitre = donnee.sousTitre;
	
	const button = document.createElement('button');
	button.type = 'button';
	
	const div = document.createElement('div');
	div.classList.add(categorieChoisie);
	const img = document.createElement('img');
	const sourceImg = repertoireMedia + donnee.image;
	const ressourceExiste = await imageExiste(sourceImg);
	if (ressourceExiste)
	{
		img.src = sourceImg;
		img.alt = donnee.image;
	}
	else
	{
		img.src = imgDefaut;
		img.alt = imgDefautNom;
	}
	div.appendChild(img);
	
	const h2 = document.createElement('h2');
	h2.textContent = donnee.titre;
	const pSousTitre = document.createElement('p');
	pSousTitre.textContent = donnee.sousTitre;
	
	button.appendChild(div);
	button.appendChild(h2);
	button.appendChild(pSousTitre);
	
	const infos = document.createElement('div');
	infos.classList.add('infos');
	
	const liens = donnee['liens'];
	liens.forEach(lien => 
	{
		const elLien = document.createElement('a');
		elLien.href = lien;
		elLien.textContent = lien;
		elLien.target = '_blank';
		
		infos.appendChild(elLien);
	});
	
	const cliquables = donnee['textesCliquables'];
	cliquables.forEach(cliquable => 
	{
		const p = document.createElement('p');
		p.classList.add('cliquable');
		
		const span1 = document.createElement('span');
		span1.textContent = cliquable.intitule + ' : ';
		p.appendChild(span1);
		
		const span2 = document.createElement('span');
		span2.classList.add('cible');
		span2.textContent = cliquable.texte;
		p.appendChild(span2);
		
		infos.appendChild(p);
	});
	
	const textes = donnee['textes'];
	textes.forEach(texte =>
	{
		const p = document.createElement('p');
		p.textContent = texte;
		infos.appendChild(p);	
	});
	
	section.appendChild(button);
	section.appendChild(infos);
		
	main.appendChild(section);
};

let imageExiste = (chemin) =>
{
	return new Promise(resolve =>
	{
		const image = new Image();

		image.onload = () => resolve(true);
		image.onerror = () => resolve(false);

		image.src = chemin;
	});
};

let initMain = () =>
{	
	main.onclick = (e) =>
	{		
		if(e.target.closest('button'))
		{
			e.target.closest('section').classList.toggle('choisie');
			window.getSelection().removeAllRanges();
		}
		else if(e.target.closest('.cliquable'))
		{
			const cliquable = e.target.closest('.cliquable');
			const cible = cliquable.querySelector('.cible');
			const range = document.createRange();
			const selection = window.getSelection();
			range.selectNodeContents(cible);
			selection.removeAllRanges();
			selection.addRange(range);
		}
	};
};

let initRecherche = () =>
{
	viderChampRecherche();
	recherche.oninput = (e) =>
	{
		if(etatRecherche === 'Global')
		{
			rechercheGlobale(e);
		}
		else
		{
			rechercheLocale(e);
		}
	};
}; 

let rechercheGlobale = (e) =>
{
	supprimerClasseChoisiNavBtns();
	viderMain();
	
	if(e.target.value)
	{
		const saisie = e.target.value.toLowerCase();
		const resultats = {};

		for (const [categorie, liste] of Object.entries(DONNEES)) 
		{
			const correspondances = liste.filter(item => item.titre.toLowerCase().includes(saisie) || item.sousTitre.toLowerCase().includes(saisie));
			if (correspondances.length > 0) 
			{
				resultats[categorie] = correspondances;
			}
		}
		// console.log(resultats);	
		
		for (const btn of navBtns) 
		{
			if (resultats[btn.dataset.categorie]) 
			{
				btn.classList.add('choisi');
			}
		}	
		
		const resultatTrie = Object.fromEntries(ordreCategories
			.filter(cat => resultats[cat])
			.map(cat => [cat, resultats[cat]])
		);
			
		for (const [categorie, elements] of Object.entries(resultatTrie)) 
		{		
			const donneesCategorieTriees = trierDonnees(elements);
			for (const element of donneesCategorieTriees) 
			{
				creerSection(element, categorie);
			}
		}
	}
};

let rechercheLocale = (e) =>
{
	const sections = document.querySelectorAll('section');		
	if(e.target.value)
	{			
		const saisie = e.target.value.toLowerCase();
				
		sections.forEach(element => 
		{
			const trouvee = element.dataset.titre?.toLowerCase().includes(saisie) || element.dataset.soustitre?.toLowerCase().includes(saisie);
			if(!trouvee)
			{
				element.classList.add('masquee');	
			}
			else
			{
				element.classList.remove('masquee');
			}
		});
					
		return;
	}
	
	sections.forEach(element => 
	{
		element.classList.remove('masquee');
	});	
};

let viderMain = () =>
{
	while(main.firstChild)
	{
		main.removeChild(main.firstChild);
	}	
};

let supprimerClasseChoisiNavBtns = () =>
{
	navBtns.forEach(element =>
	{
		element.classList.remove('choisi');
	});
};

let initGlobalLocal = () =>
{
	globalLocal.onclick = (e) =>
	{
		e.preventDefault();
		
		etatRecherche = e.target.dataset.etat;
		if(etatRecherche === 'Global')
		{
			etatRecherche = 'Local';
		}
		else
		{
			etatRecherche = 'Global';
		}
		e.target.dataset.etat = etatRecherche;
		e.target.textContent = etatRecherche;
		
		viderChampRecherche();
	}
};

let viderChampRecherche = () =>
{
	recherche.value = '';
};



// DEMARRAGE
initNav();
initMain();
initGlobalLocal();
initRecherche();
