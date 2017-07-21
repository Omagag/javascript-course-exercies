/*
Realiza una agenda de contactos que se persista en el navegador.
Trata de realizar la mayor abstracción posib​le: en el HTML no puede haber nada más que la importación del script JS. Los botones de acciones no pueden hacer referencia a ningún objeto (deberás añadir las acciones con addEventListener de arrow functions o funciones bindeadas). Haz que la agenda se pinte haciendo llamadas a pintar de cada contacto.

Pasos:

1) Crea la clase contacto que almacenará los datos básicos de una persona:
- Nombre
- Apellidos
- Email
- URL fotografía

2) Crea la clase Agenda que almacene los contactos de un usuario.

3) Maqueta la agenda de contactos. Puedes hacer uso de una tabla o si lo quieres hacer más visual puedes usar divs y darles el estilo que quieras.

4) Crea un botón que al ser pulsado muestre un formulario que permita la creación de un contacto en la agenda. El formulario tendrá los campos necesarios para la creación y además los botones "Guardar" y "Cerrar". Guardar se encargará de guardar el contacto y cerrar ocultará de nuevo el formulario. Cuando se cree un contacto se deberá mostrar en el listado de contactos de la agenda.

5) Haz que la agenda completa se guarde en LocalStorage de manera que cada vez que abramos la página web se muestre la agenda completa.

BONUS:
6) Añade un botón eliminar en cada contacto que permita el borrado de este.

7) Añade un botón modificar que haga editable la información de un usuario. 

8) Permite la ordenación de la agenda por Nombre o por apellido​
*/

class Contacto {
	constructor(id, nombre, apellidoPaterno, apellidoMaterno, email, urlFoto) {
		this._id = id;
		this._nombre = nombre;
		this._apellidoPaterno = apellidoPaterno;
		this._apellidoMaterno = apellidoMaterno;
		this._email = email;
		this._urlFoto = urlFoto;

		this.SECTION_CONTACTO_CLASS = "contacto";
	}
	crearContactoHtml() {
		let section = document.createElement("section");
		section.className = this.SECTION_CONTACTO_CLASS;

		let h2 = document.createElement("h2");
		h2.textContent = this._nombre + " " + this._apellidoPaterno + " " + this._apellidoMaterno;
		section.appendChild(h2);

		let img = document.createElement("img");
		img.src = this._urlFoto;
		section.appendChild(img);

		let pEmail = document.createElement("p");
		pEmail.textContent = this._email;
		section.appendChild(pEmail)

		return section;
	}
	static crearContactoDeObj(obj) {
		let contacto = new Contacto(obj._id, obj._nombre, obj._apellidoPaterno, obj._apellidoMaterno, obj._email);
		return contacto;
	}
}

class Agenda {
	constructor() {
		this._contactos = [];
		/*
		for (let i = 0; i < 5; i++) {
			let contacto = new Contacto(i+1, "Omar", "García", "González", "omar.garcia.gonzalez.contractor@bbva.com", "images/contacto.jpeg");
			this._contactos.push(contacto);
		}*/

		// Constantes
		// Main
		this.MAIN_CONTENT_ID = random(5673423);
		this.MAIN_CONTENT_CLASS_NAME = "agenda";
		
		// Begin Header
		this.HEADER_ID = "header";
		// Form
		this.FORM_ID = "form-contacto";

		this.FORM_FIELD_CLASS = "field-form";
		this.FORMNAME_ID = "id";
		this.FORMNAME_NOMBRE = "nombre";
		this.FORMNAME_AP_PATERNO = "ap-paterno";
		this.FORMNAME_AP_MATERNO = "ap-materno";
		this.FORMNAME_EMAIL = "email";

		this.FORM_P_BUTTONS = "form-buttons";
		this.FORM_CLASS_ADD = "btn-agregar";
		this.FORM_CLASS_UPDATE = "btn-actualizar";
		this.FORM_CLASS_CANCEL = "btn-cancelar";

		this.BUTTON_NUEVO = "btn-nuevo";
		// End Header

		// Begin Agenda Content
		this.LISTA_CONTACTOS_ID = "lista-contactos";
		// End Agenda Content
		
		// Crear estructura y cargas iniciales
		this.crearEstructura();
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
		
		let h1 = document.createElement("h1");
		h1.textContent = "Agenda";
		header.appendChild(h1);

		header.appendChild(this.pintarFormAgregarContacto());

		let nav = document.createElement("nav");
		nav.appendChild(crearButtonHtml("Nuevo", "button", this.BUTTON_NUEVO, this.BUTTON_NUEVO, (event) => this.mostrarForm(event)));
		header.appendChild(nav);
		mainContent.appendChild(header);

		// Content Form
		let article = document.createElement("article");
		article.id = this.LISTA_CONTACTOS_ID;
		//article.appendChild(this.pintarTableListaPersonajes());
		mainContent.appendChild(article);

	}
	pintarHeader() {
		let header = document.getElementById(this.HEADER_ID);
		header.innerHTML = "";

		header.appendChild(crearButtonHtml("Agregar", "button", "", "", ()=> mostrarForm()));
	}
	pintarFormAgregarContacto() {
		let form = document.createElement("form");
		form.id = this.FORM_ID;
		form.style.display = "none";
		let fieldset = document.createElement("fieldset");
		let legend = document.createElement("legend");
		legend.textContent = "Nuevo Contacto";
		fieldset.appendChild(legend);

		fieldset.appendChild(crearFieldFormHtml(null, "", "hidden", this.FORMNAME_ID));
		fieldset.appendChild(crearFieldFormHtml(this.FORM_FIELD_CLASS, "Nombre: ", "text", this.FORMNAME_NOMBRE));
		fieldset.appendChild(crearFieldFormHtml(this.FORM_FIELD_CLASS, "Apellido Paterno: ", "text", this.FORMNAME_AP_PATERNO));
		fieldset.appendChild(crearFieldFormHtml(this.FORM_FIELD_CLASS, "Apellido Materno: ", "text", this.FORMNAME_AP_MATERNO));
		fieldset.appendChild(crearFieldFormHtml(this.FORM_FIELD_CLASS, "Email: ", "email", this.FORMNAME_EMAIL));

		//fieldset.appendChild(crearButtonHtml("Agregar", "button", this.FORM_CLASS_ADD, this.FORM_CLASS_ADD, (event) => this.agregarPersonaje(event)));
		//fieldset.appendChild(crearButtonHtml("Actualizar", "button", this.FORM_CLASS_UPDATE, this.FORM_CLASS_UPDATE, (event) => this.actualizarPersonaje(event), true));
		//fieldset.appendChild(crearButtonHtml("Cancelar", "button", this.FORM_CLASS_CANCEL, this.FORM_CLASS_CANCEL, (event) => this.limpiarForm(event)));

		let pButton = document.createElement("p");
		pButton.className = this.FORM_P_BUTTONS;
		pButton.appendChild(crearButtonHtml("Agregar", "button", this.FORM_CLASS_ADD, this.FORM_CLASS_ADD, (event) => this.agregarContacto(event)));
		pButton.appendChild(crearButtonHtml("Cancelar", "button", this.FORM_CLASS_CANCEL, this.FORM_CLASS_CANCEL, (event) => this.ocultarForm(event)));
		fieldset.appendChild(pButton);

		
		form.appendChild(fieldset);

		return form;
	}
	pintarListaContactos() {
		let article = document.getElementById(this.LISTA_CONTACTOS_ID);
		article.innerHTML = "";

		this._contactos.forEach((contacto) => {
			article.appendChild(contacto.crearContactoHtml());
		});
	}
	pintar() {
		this.recuperarContactosDeStorage();
		this.pintarListaContactos();
	}
	mostrarForm(e) {
		//e.stopPropagation();

		let form = document.getElementById(this.FORM_ID);
		form.style.display = "inline-block";
		let btnNuevo = document.getElementById(this.BUTTON_NUEVO);
		btnNuevo.style.display = "none";
	}
	ocultarForm(e) {
		//e.stopPropagation();

		let form = document.getElementById(this.FORM_ID);
		form.style.display = "none";
		let btnNuevo = document.getElementById(this.BUTTON_NUEVO);
		btnNuevo.style.display = "inline-block";
	}
	llenarForm(contacto) {
		setValueInput(this.FORMNAME_ID, contacto.id);
		setValueInput(this.FORMNAME_NOMBRE, contacto.nombre);
		setValueInput(this.FORMNAME_OCUPACION, contacto.ocupacion);
		setValueInput(this.FORMNAME_DEUDA, contacto.deuda);
		setValueInput(this.FORMNAME_ARMA, contacto.arma);
	}
	limpiarForm(e) {
		e.stopPropagation();
		setValueInput(this.FORMNAME_ID, "");
		setValueInput(this.FORMNAME_NOMBRE, "");
		setValueInput(this.FORMNAME_AP_PATERNO, "");
		setValueInput(this.FORMNAME_AP_MATERNO, "");
		setValueInput(this.FORMNAME_EMAIL, "");

		/*let addButton = document.getElementById(this.FORM_CLASS_ADD);
		addButton.style.display = "inline-block";
		let updateButton = document.getElementById(this.FORM_CLASS_UPDATE);
		updateButton.style.display = "none";*/
	}
	obtenerDeForm() {
		let id = getValueInput(this.FORMNAME_ID);
		let nombre = getValueInput(this.FORMNAME_NOMBRE);
		let apellidoPaterno = getValueInput(this.FORMNAME_AP_PATERNO);
		let apellidoMaterno = getValueInput(this.FORMNAME_AP_MATERNO);
		let email = getValueInput(this.FORMNAME_EMAIL);

		return new Contacto(id, nombre, apellidoPaterno, apellidoMaterno, email);
	}
	
	agregarContacto(e) {
		let contacto = this.obtenerDeForm();

		this._contactos.push(contacto);

		this.pintarListaContactos();
		this.almacenarContactosEnStorage();

		this.limpiarForm(e);
	}
	almacenarContactosEnStorage() {
		let contactosJson = JSON.stringify(this._contactos);

		localStorage.setItem("contactos", contactosJson);
	}
	recuperarContactosDeStorage() {
		let contactosObjs = localStorage.getItem("contactos");
		if (contactosObjs && contactosObjs.length > 0) { 
			contactosObjs.forEach((contactoObj) => {
				let contacto = Contacto.crearContactoDeObj(contactoObj);
				this._contactos.push(contacto);
			});
		}
	}
}

window.onload = () => {
	let agenda = new Agenda();
	agenda.pintar();
}
