

class Personaje {
	constructor(id, nombre, ocupacion, deuda, arma) {
		this.id = id;
		this.nombre = nombre;
		this.ocupacion = ocupacion;
		this.deuda = deuda;
		this.arma = arma;
	}
}

class PersonajesCliente {
	constructor() {
		this.clientAPI = new ClientAPI("https://ironhack-characters.herokuapp.com");
	}
	obtenerPersonajes() {
		let promise = this.clientAPI.get("/characters").then(
			(objResponse) => {
				let personajes = [];

				for (let i = 0; i < objResponse.length; i++) {
					let objPersonaje = objResponse[i];
					let personaje = new Personaje(objPersonaje.id, objPersonaje.name, objPersonaje.occupation, objPersonaje.debt, objPersonaje.weapon);
					personajes.push(personaje);
				}

				return personajes;
			}
		);

		return promise;
	}
	agregarPersonaje(personaje) {
		var data = new FormData();
		data.append("name", personaje.nombre);
		data.append("occupation", personaje.ocupacion);
		data.append("debt", personaje.deuda);
		data.append("weapon", personaje.arma);

		//this.clientAPI.post("/characters", data, callback);
		let promise = this.clientAPI.post("/characters", data).then(
			(reponse) => {
				return reponse;
			}
		);

		return promise;
		//this.clientAPI.post("/characters", data, (objResponse) => this.crearPersonajesDeServicio(objResponse, callback));
	}
	actualizarPersonaje(personaje, callback) {
		var data = new FormData();
		data.append("name", personaje.nombre);
		data.append("occupation", personaje.ocupacion);
		data.append("debt", personaje.deuda);
		data.append("weapon", personaje.arma);

		//this.clientAPI.put("/characters", personaje.id, data, callback);
		let promise = this.clientAPI.put("/characters", personaje.id, data).then(
			(reponse) => {
				return reponse;
			}
		);

		return promise;
	}
	borrarPersonaje(id, callback) {
		//this.clientAPI.delete("/characters", id, callback);
		let promise = this.clientAPI.delete("/characters", id).then(
			(reponse) => {
				return reponse;
			}
		);

		return promise;
	}
	/*crearPersonajesDeServicio(objResponse, callback) {
		let personajes = [];

		for (let i = 0; i < objResponse.length; i++) {
			let objPersonaje = objResponse[i];
			let personaje = new Personaje(objPersonaje.id, objPersonaje.name, objPersonaje.occupation, objPersonaje.debt, objPersonaje.weapon);
			personajes.push(personaje);
		}

		callback(personajes);
	}*/
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
				//return response.json(); // Revisar porque json() regresa una promesa... no un valor??? O_o
				return true;
			}
		)

		return promise;
	}
}

class AlmacenPersonajes {
	constructor() {
		this.personajes = [];
		this.personajesCliente = new PersonajesCliente();

		// Constantes
		this.MAIN_CONTENT_ID = random(5673423);
		this.MAIN_CONTENT_CLASS_NAME = "almacen";
		
		this.HEADER_ID = "header";

		this.FORM_ID = "agregar-personaje";
		this.FORMNAME_ID = "id";
		this.FORMNAME_NOMBRE = "nombre";
		this.FORMNAME_OCUPACION = "ocupacion";
		this.FORMNAME_DEUDA = "deuda";
		this.FORMNAME_ARMA = "arma";
		this.FORM_CLASS_ADD = "btn-agregar-personaje";
		this.FORM_CLASS_UPDATE = "btn-actualizar-personaje";
		this.FORM_CLASS_CANCEL = "btn-cancelar-personaje";

		this.CONTENT_ID = "content"

		this.TABLE_ID = "lista-personajes";
		this.TBODY_ID = "lista-personajes-body";
		// Crear estructura y cargas iniciales
		this.crearEstructura();
	}
	crearPersonajeDeForm() {
		let id = getValueInput(this.FORMNAME_ID);
		let nombre = getValueInput(this.FORMNAME_NOMBRE);
		let ocupacion = getValueInput(this.FORMNAME_OCUPACION);
		let deuda = getValueInput(this.FORMNAME_DEUDA);
		let arma = getValueInput(this.FORMNAME_ARMA);

		return new Personaje(id, nombre, ocupacion, deuda, arma);
	}
	llenarFormConPersonaje(personaje) {
		setValueInput(this.FORMNAME_ID, personaje.id);
		setValueInput(this.FORMNAME_NOMBRE, personaje.nombre);
		setValueInput(this.FORMNAME_OCUPACION, personaje.ocupacion);
		setValueInput(this.FORMNAME_DEUDA, personaje.deuda);
		setValueInput(this.FORMNAME_ARMA, personaje.arma);
	}
	limpiarForm(e) {
		e.stopPropagation();
		setValueInput(this.FORMNAME_ID, "");
		setValueInput(this.FORMNAME_NOMBRE, "");
		setValueInput(this.FORMNAME_OCUPACION, "");
		setValueInput(this.FORMNAME_DEUDA, "");
		setValueInput(this.FORMNAME_ARMA, "");

		let addButton = document.getElementById(this.FORM_CLASS_ADD);
		addButton.style.display = "inline-block";
		let updateButton = document.getElementById(this.FORM_CLASS_UPDATE);
		updateButton.style.display = "none";
	}
	agregarPersonaje(e) {
		e.stopPropagation();

		/*let nombre = getValueInput(this.FORMNAME_NOMBRE);
		let ocupacion = getValueInput(this.FORMNAME_OCUPACION);
		let deuda = getValueInput(this.FORMNAME_DEUDA);
		let arma = getValueInput(this.FORMNAME_ARMA);

		let personaje = new Personaje(nombre, ocupacion, deuda, arma);*/
		let personaje = this.crearPersonajeDeForm();

		this.limpiarForm(e);

		//this.personajesCliente.agregarPersonaje(personaje, () => this.obtenerPersonajes());
		this.personajesCliente.agregarPersonaje(personaje).then(
			() => {
				this.obtenerPersonajes();
			}
		);
	}
	editarPersonaje(personaje) {
		this.llenarFormConPersonaje(personaje);

		let addButton = document.getElementById(this.FORM_CLASS_ADD);
		addButton.style.display = "none";
		let updateButton = document.getElementById(this.FORM_CLASS_UPDATE);
		updateButton.style.display = "inline-block";
	}
	actualizarPersonaje(e) {
		e.stopPropagation();

		let personaje = this.crearPersonajeDeForm();

		this.limpiarForm(e);

		//this.personajesCliente.actualizarPersonaje(personaje, () => this.obtenerPersonajes());
		this.personajesCliente.actualizarPersonaje(personaje).then(
			() => {
				this.obtenerPersonajes();
			}
		);
	}
	borrarPersonaje(id) {
		//this.personajesCliente.borrarPersonaje(id, () => this.obtenerPersonajes());
		this.personajesCliente.borrarPersonaje(id).then(
			() => {
				this.obtenerPersonajes();
			}
		);
	}
	obtenerPersonajes() {
		//this.personajesCliente.obtenerPersonajes((personajes) => this.setPersonajes(personajes));
		this.personajesCliente.obtenerPersonajes().then(
			(personajes) => {
				this.setPersonajes(personajes);
			}
		);
	}
	setPersonajes(personajes) {
		this.personajes = personajes;
		this.pintarTableListaPersonajes();
	}
	crearEstructura() {
		let body = document.querySelector("body");

		// Main Content
		let mainContent = document.createElement("div");
		mainContent.id = this.MAIN_CONTENT_ID;
		mainContent.className = this.MAIN_CONTENT_CLASS_NAME;
		body.appendChild(mainContent);

		// Header Form
		let header = document.createElement("header");
		header.id = this.HEADER_ID;
		header.appendChild(this.pintarFormAgregarPersonaje());
		mainContent.appendChild(header);

		// Content Form
		let article = document.createElement("article");
		article.id = this.CONTENT_ID;
		//article.appendChild(this.pintarTableListaPersonajes());
		mainContent.appendChild(article);

	}
	pintarFormAgregarPersonaje() {
		let form = document.createElement("form");
		form.id = this.FORM_ID;
		let fieldset = document.createElement("fieldset");
		let legend = document.createElement("legend");
		legend.textContent = "Agregar Personaje";
		fieldset.appendChild(legend);

		fieldset.appendChild(crearFieldFormHtml("", "hidden", this.FORMNAME_ID));
		fieldset.appendChild(crearFieldFormHtml("Nombre: ", "text", this.FORMNAME_NOMBRE));
		fieldset.appendChild(crearFieldFormHtml("Ocupación: ", "text", this.FORMNAME_OCUPACION));
		fieldset.appendChild(crearFieldFormHtml("Deuda: ", "text", this.FORMNAME_DEUDA));
		fieldset.appendChild(crearFieldFormHtml("Arma: ", "text", this.FORMNAME_ARMA));

		fieldset.appendChild(crearButtonHtml("Agregar", "button", this.FORM_CLASS_ADD, this.FORM_CLASS_ADD, (event) => this.agregarPersonaje(event)));
		fieldset.appendChild(crearButtonHtml("Actualizar", "button", this.FORM_CLASS_UPDATE, this.FORM_CLASS_UPDATE, (event) => this.actualizarPersonaje(event), true));
		fieldset.appendChild(crearButtonHtml("Cancelar", "button", this.FORM_CLASS_CANCEL, this.FORM_CLASS_CANCEL, (event) => this.limpiarForm(event)));
		
		form.appendChild(fieldset);

		return form;
	}
	pintarTableListaPersonajes() {
		let article = document.getElementById(this.CONTENT_ID);
		article.innerHTML = "";
		let table = document.createElement("table");
		table.id = this.TABLE_ID;

		let columnsNames = [{value: "Nombre", className:""}, 
							{value: "Ocupación", className:""}, 
							{value: "Deuda", className:""}, 
							{value: "Arma", className:""}, 
							{value: "Acciones", className:""}];
		table.appendChild(createTHead(columnsNames));
		let tbody = document.createElement("tbody");
		tbody.id = this.TBODY_ID;
		table.appendChild(tbody);

		this.personajes.forEach((personaje) => {
			let actions = [];
			let borrarAction = crearButtonHtml("Borrar", "button", "", "", ()=> this.borrarPersonaje(personaje.id));
			actions.push(borrarAction);
			let editarAction = crearButtonHtml("Editar", "button", "", "", ()=> this.editarPersonaje(personaje));
			actions.push(editarAction);

			let valuesColumns = [{value: personaje.nombre, className: ""},
								{value: personaje.ocupacion, className: ""},
								{value: personaje.deuda, className: ""},
								{value: personaje.arma, className: ""},
								{value: "", className: "", htmlElements: actions}];
			tbody.appendChild(createTRow("td", valuesColumns));
		});

		article.appendChild(table);
//		return table;
	}
	pintar() {
		this.pintarTableListaPersonajes();

		this.obtenerPersonajes();
	}

	
	/* BEGIN CONTROL FUNCTIONS */

	/* END CONTROL FUNCTIONS */

}

window.onload = () => {
	let almacenPersonajes = new AlmacenPersonajes();
	almacenPersonajes.pintar();
}