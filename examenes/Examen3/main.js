
class Pokedex {
	constructor() {
		this._pokemons = [];
		this._paginaActual = 1;
		this._numeroTotalPokemons = 0;

		this._pokemonAPI = new PokemonAPI();

		// Constantes
		// Main
		this.MAIN_CONTENT_ID = random(5673423);
		this.MAIN_CONTENT_CLASS_NAME = "pokedex";
		
		// Begin Header
		this.HEADER_ID = "header";
		// End Header

		// Begin Nav
		this.NAV_ID = "nav";
		// End Nav

		// Begin Content
		this.CONTENT_ID = "pokemons";
		// End Content

		this.TABLE_ID = "lista-pokemons";
		this.TBODY_ID = "lista-pokemons-body";

		this.SECTION_ID = "detalle-pokemon";

		this.CONTENT_LOADER_ID = "content-loader";
		this.LOADER_ID = "loader";
		
		// Crear estructura y cargas iniciales
		this.crearEstructura();
	}
	pintarPaginaAnterior() {
		if (this._paginaActual > 1) {
			this._paginaActual -= 1;
			this.pintarPagina();
		}
	}
	pintarPagina() {
		this.mostrarLoader();
		this._pokemonAPI.getPokemonsAtPage(this._paginaActual).then(
			(data) => {
				this._numeroTotalPokemons = data.total;
				this._pokemons = data.pokemons;
				console.log(this._pokemons);
				this.pintar();
				this.ocultarLoader();
			}
		).catch(() => alert("Error al invocar el servicio."));
	}
	pintarPaginaSiguiente() {
		if (this._paginaActual < (this._numeroTotalPokemons / 20)) {
			this._paginaActual += 1;
			this.pintarPagina();
		}
	}
	obtenerInfoDePokemon(urlDetalle) {
		this.mostrarLoader();
		this._pokemonAPI.getPokemonByUrl(urlDetalle).then(
			(pokemon) => {
				console.log(pokemon);
				pokemon.pintarDetallePokemon(this.SECTION_ID);
				this.ocultarLoader();
			}
		).catch(() => alert("Error al invocar el servicio."));
	}
	crearEstructura() {
		let body = document.querySelector("body");

		// Main Content
		let mainContent = document.createElement("div");
		mainContent.id = this.MAIN_CONTENT_ID;
		mainContent.className += "container ";
		mainContent.className += this.MAIN_CONTENT_CLASS_NAME;

		body.appendChild(mainContent);

		// Header Form
		let header = document.createElement("header");
		header.id = this.HEADER_ID;
		header.className += "row";
		
		let h1 = document.createElement("h1");
		h1.textContent = "La Pokedex Xanxa";
		h1.className += "col-md-12 ";
		header.appendChild(h1);
		mainContent.appendChild(header);

		let nav = document.createElement("nav");
		nav.id = this.NAV_ID;
		nav.className = "row ";
		//nav.className += "btn-group ";
		//mainContent.appendChild(nav);
		
		// Content Form
		let article = document.createElement("article");
		article.id = this.CONTENT_ID;
		article.className = "row";

		let sectionTbl = document.createElement("section");
		sectionTbl.className += "col-sm-6 ";
		let table = document.createElement("table");
		table.id = this.TABLE_ID;
		table.className += "table ";
		table.className += "table-striped ";
		sectionTbl.appendChild(nav);
		sectionTbl.appendChild(table);
		article.appendChild(sectionTbl);

		let section = document.createElement("section");
		section.id = this.SECTION_ID;
		section.className += "col-sm-6";
		article.appendChild(section);

		mainContent.appendChild(article);

		let divContentLoader = document.createElement("div");
		divContentLoader.id = this.CONTENT_LOADER_ID;
		let divLoader = document.createElement("div");
		divLoader.id = this.LOADER_ID;
		divLoader.className = this.LOADER_ID;
		divContentLoader.onload = ()=> ocultarLoader();
		divContentLoader.appendChild(divLoader);
		//mainContent.appendChild(divContentLoader);
		body.appendChild(divContentLoader);

	}
	mostrarLoader() {
		let divContentLoader = document.getElementById(this.CONTENT_LOADER_ID);
		divContentLoader.style.display = "block";
		let div = document.getElementById(this.LOADER_ID);
		div.style.display = "block";
	}
	ocultarLoader() {
		let divContentLoader = document.getElementById(this.CONTENT_LOADER_ID);
		divContentLoader.style.display = "none";
		let div = document.getElementById(this.LOADER_ID);
		div.style.display = "none";
	}
	pintarNav() {
		let nav = document.getElementById(this.NAV_ID);
		nav.innerHTML = "";
		/*
		nav.appendChild(crearButtonHtml("Anterior", "button", "", "btn btn-primary", ()=> this.pintarPaginaAnterior()));
		let p = document.createElement("p");
		p.className = "pag-actual";
		p.textContent = this._paginaActual;
		nav.appendChild(p);
		nav.appendChild(crearButtonHtml("Siguiente", "button", "", "btn btn-primary", ()=> this.pintarPaginaSiguiente()));
		*/

		let ul = document.createElement("ul");
		ul.className += "col-sm-12 ";
		ul.className += "pager ";
		
		let liAnterior = document.createElement("li");
		let aAnterior = document.createElement("a");
		aAnterior.textContent = "Anterior"
		aAnterior.onclick = ()=> this.pintarPaginaAnterior();
		liAnterior.appendChild(aAnterior);
		ul.appendChild(liAnterior);

		let liActual = document.createElement("li");
		let aActual = document.createElement("a");
		aActual.textContent = this._paginaActual;
		liActual.appendChild(aActual);
		ul.appendChild(liActual);

		let liSiguiente = document.createElement("li");
		let aSiguiente = document.createElement("a");
		aSiguiente.textContent = "Siguiente";
		aSiguiente.onclick = ()=> this.pintarPaginaSiguiente();
		liSiguiente.appendChild(aSiguiente);
		ul.appendChild(liSiguiente);

		nav.appendChild(ul);
	}
	pintarTablePokemons() {
		let table = document.getElementById(this.TABLE_ID);
		table.innerHTML = "";

		let columnsNames = [{value: "Nombre", className:""}, 
							{value: "Acciones", className:""}];
		table.appendChild(createTHead(columnsNames));
		let tbody = document.createElement("tbody");
		tbody.id = this.TBODY_ID;
		table.appendChild(tbody);

		this._pokemons.forEach((pokemon) => {
			let actions = [];
			let editarAction = crearButtonHtml("Ver detalles", "button", "", "btn btn-danger", ()=> this.obtenerInfoDePokemon(pokemon._urlDetalle));
			actions.push(editarAction);

			let valuesColumns = [{value: pokemon._nombre, className: "column-name"},
								{value: "", className: "column-info", htmlElements: actions}];
			tbody.appendChild(createTRow("td", valuesColumns));
		});
	}
	pintar() {
		this.pintarNav();
		this.pintarTablePokemons();
	}
	
}

class Pokemon {
	constructor(nombre, urlDetalle = null, peso = null, altura = null, urlImagen = null) {
		this._nombre = nombre;
		this._urlDetalle = urlDetalle;
		this._peso = peso;
		this._altura = altura;
		this._urlImagen = urlImagen;
	}
	pintarDetallePokemon(SECTION_ID) {
		let section = document.getElementById(SECTION_ID);
		section.innerHTML = "";

		let h2Title = document.createElement("h2");
		h2Title.textContent = "Detalle Pokemon";
		section.appendChild(h2Title);
		
		let img = document.createElement("img");
		img.src = this._urlImagen;
		section.appendChild(img);

		let h3Nombre = document.createElement("h3");
		h3Nombre.textContent = "Nombre: " + this._nombre;
		section.appendChild(h3Nombre);

		let pPeso = document.createElement("p");
		pPeso.textContent = "Peso: " + this._peso;
		section.appendChild(pPeso);

		let pAltura = document.createElement("p");
		pAltura.textContent = "Altura: " + this._altura;
		section.appendChild(pAltura);

		return section;
	}
}

class PokemonAPI {
	constructor() {
		this._clienteAPI = new ClientAPI("");
	}
	getPokemonsAtPage(numeroPagina) {
		let offset = (numeroPagina - 1) * 20;

		let promise = this._clienteAPI.get("http://pokeapi.co/api/v2/pokemon/?offset=" + offset).then(
		//let promise = this._clienteAPI.get("http://pokeapi.co/api/v2/pokemon/?offset=" + numeroPagina).then(
			(data) => {
				let totalPokemons = data.count;
				let arrayObjs = data.results;
				let pokemons = [];

				for (let i = 0; i < arrayObjs.length; i++) {
					let obj = arrayObjs[i];
					let pokemon = new Pokemon(obj.name, obj.url);
					pokemons.push(pokemon);
				}

				return {
					pokemons: pokemons,
					total: totalPokemons
				};
			}
		);

		return promise;
	}
	getPokemonByUrl(urlDePokemon) {
		let promise = this._clienteAPI.get(urlDePokemon).then(
			(data) => {
				let pokemon = new Pokemon(data.name, "", data.weight, data.height, data.sprites.front_default);

				return pokemon;
			}
		);

		return promise;
	}
}

class ClientAPI {
	constructor(urlBase) {
		this.urlBase = urlBase;
	}
	get(uri) {
		let url = this.urlBase + uri;
		let headers = new Headers();

		let init = {
			method: "GET",
			headers: headers
		}

		let promise = fetch(url, init).then(
			(response) => {
				return response.json(); // Revisar porque json() regresa una promesa... no un valor??? O_o
			}
		)

		return promise;
	}

	put(uri, id, data) {
		let url = this.urlBase + uri + ("/" + id);
		let headers = new Headers();
		
		let init = {
			method: "PUT",
			headers: headers,
			body: data
		}

		let promise = fetch(url, init).then(
			(response) => {
				return response.json(); // Revisar porque json() regresa una promesa... no un valor??? O_o
			}
		)

		return promise;
	}
	post(uri, data) {
		let url = this.urlBase + uri;
		let headers = new Headers();
		
		let init = {
			method: "POST",
			headers: headers,
			body: data
		}

		let promise = fetch(url, init).then(
			(response) => {
				return response.json(); // Revisar porque json() regresa una promesa... no un valor??? O_o
			}
		)

		return promise;
	}
	delete(uri, id) {
		let url = this.urlBase + uri + ("/" + id)
		let headers = new Headers();
		
		let init = {
			method: "DELETE",
			headers: headers
		}

		let promise = fetch(url, init).then(
			(response) => {
				return true;
			}
		)

		return promise;
	}
}

window.onload = () => {
	let pokedex = new Pokedex();
	pokedex.pintarPagina();
}
