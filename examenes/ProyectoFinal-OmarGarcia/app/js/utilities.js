/* +++++ UTILERIAS +++++ */
function sucedePorPorcentajeDel(porcentaje) {
	var random = Math.round(Math.random() * 100);
	return random <= porcentaje ? 1 : 0;
}
function booleanRandom() {
	return Math.random() >= 0.5
}
function obtenerStringAleatorio(nombresArray) {
	return nombresArray[random(nombresArray.length)];
}
function random(x) {
	let random = Math.random() * x;
	return Math.floor(random);
}
function randomBetween(x, y) {
	let random = Math.random() * (y - x + 1) + x;
	return Math.floor(random);
}
function crearOpciones(idSelect, opciones) {
	var select = document.getElementById(idSelect);
	for (var i = 0; i < opciones.length; i++) {
		var opcion = "<option value='" + opciones[i] + "'>";
		opcion += opciones[i];
		opcion += "</option>";
		select.innerHTML += opcion;
	}

}
function getValueSelect(idSelect) {
	var select = document.getElementById(idSelect);
	var value = select.options[select.selectedIndex].value;
	return value;
}
function setValueSelect(idSelect, value) {
	var select = document.getElementById(idSelect);
	select.value = value;
}
function getValueInput(idInput) {
	var value = document.getElementById(idInput).value;
	return value;
}
function setValueInput(idInput, value) {
	document.getElementById(idInput).value = value;
}
function getValueCheckbox(idInput) {
	var value = document.getElementById(idInput).checked;
	return value;
}
function setValueCheckbox(idInput, checked) {
	document.getElementById(idInput).checked = checked;
}

/* Create HTML */
/*function crearTdHtml(type, text, className, htmlElement) {
	let td = document.createElement(type);
	td.textContent = text;
	if (className) {
		td.className = className;
	}
	if (htmlElement) {
		td.appendChild(htmlElement);
	}

	return td;
}*/
function crearTdHtml(type, text, className, htmlElements) {
	let td = document.createElement(type);
	td.textContent = text;
	if (className) {
		td.className = className;
	}
	if (htmlElements && htmlElements.length > 0) {
		htmlElements.forEach((htmlElement) => {
			td.appendChild(htmlElement);
		});
	}

	return td;
}
/*function crearFieldFormHtml(labelText, inputType, inputName) {
	let p = document.createElement("p");
	
	if (inputType != "hidden") {
		let label = document.createElement("label");
		label.for = inputName;
		label.textContent = labelText;
		p.appendChild(label);
	}
	let input = document.createElement("input");
	input.type = inputType;
	input.id = inputName;
	input.name = inputName;
	p.appendChild(input);

	return p;
}*/
function crearFieldFormHtml(elemType, elemClassName, labelText, inputType, inputName, inputClassName) {
	let elem = document.createElement(elemType);
	
	if (elemClassName && elemClassName != "") {
		elem.className = elemClassName;
	}

	if (inputType != "hidden") {
		let label = document.createElement("label");
		label.for = inputName;
		label.textContent = labelText;
		elem.appendChild(label);
	}
	let input = document.createElement("input");
	input.type = inputType;
	input.id = inputName;
	input.name = inputName;

	if (inputClassName && inputClassName != "") {
		input.className = inputClassName;
	}

	elem.appendChild(input);

	return elem;
}
function crearCheckboxFormHtml(elemType, elemClassName, labelText, inputName) {
	let elem = document.createElement(elemType);

	if (elemClassName && elemClassName != "") {
		elem.className = elemClassName;
	}

	let label = document.createElement("label");
	label.for = inputName;
	let input = document.createElement("input");
	input.type = "checkbox";
	input.id = inputName;
	input.name = inputName;
	//label.textContent = labelText;
	label.appendChild(input, null);
	let textNode = document.createTextNode(labelText);
	label.appendChild(textNode);
	
	elem.appendChild(label);

	return elem;
}
function crearButtonHtml(textContent, type, id, className, action, hidden) {
	let button = document.createElement("button");
	if (id && id != "") {
		button.id = id;
	}
	if (className && className != "") {
		button.className = className;
	}
	button.type = type;
	button.textContent = textContent;
	button.onclick = action;
	if (hidden) {
		button.style.display = "none";
	}

	return button;
}
function createModalButton(textContent, type, id, className, idModal, forOpen, action) {
	let button = document.createElement("button");
	button.textContent = textContent;
	button.type = type;
	if (id && id != "") {
		button.id = id;
	}
	button.className = className;
	if (forOpen) {
		button.setAttribute("data-toggle", "modal");
		button.setAttribute("data-target", "#" + idModal);
	} else {
		button.setAttribute("data-dismiss", "modal");
	}

	button.onclick = action;

	return button
}
function createTHead(columnsNames) {
	let thead = document.createElement("thead");
	thead.appendChild(createTRow("th", columnsNames));

	return thead;
}
function createTRow(type, valuesColumns) {
	let tr = document.createElement("tr");

	valuesColumns.forEach((obj) => {
		tr.appendChild(crearTdHtml(type, obj.value, obj.className, obj.htmlElements));
	});

	return tr;
}
function createSimpleLi(text, className, action) {
	let li = document.createElement("li");
	if (className && className != "") {
		li.className = className;
	}
	let a = document.createElement("a");
	a.textContent = text;
	a.onclick = action;
	li.appendChild(a);

	return li;
}
function removeChildrenElement(element) {
	while (element.firstChild) {
	    element.removeChild(element.firstChild);
	}
}

/*function createModalForm(modalId, formId) {
	let section = document.createElement("section");
	//section.className = "row";
	section.className = "modal fade";
	//section.role = "dialog";
	section.setAttribute("role", "dialog");
	section.id = modalId;

	let modalDiv = document.createElement("div");
	modalDiv.className = "modal-dialog";

	let modalContentDiv = document.createElement("div");
	modalContentDiv.className = "modal-content";
	
	let divForm = document.createElement("div");
	divForm.className = "modal-body";
	
	let form = document.createElement("form");
	//form.className = "form-inline";
	let fieldset = document.createElement("fieldset");
	let legend = document.createElement("legend");
	legend.textContent = "Nuevo Usuario";
	fieldset.appendChild(legend);
	
	//let fieldClassName = "col-xs-2";
	let fieldClassName = "form-group";
	fieldset.appendChild(crearFieldFormHtml("div", "", "", "hidden", formId, ""));
	fieldset.appendChild(crearFieldFormHtml("div", fieldClassName, "Nombre", "text", this.FORM_NAME, "form-control"));
	fieldset.appendChild(crearFieldFormHtml("div", fieldClassName, "Apellidos", "text", this.FORM_LAST_NAME, "form-control"));
	fieldset.appendChild(crearFieldFormHtml("div", fieldClassName, "Correo electrónico", "text", this.FORM_EMAIL, "form-control"));
	fieldset.appendChild(crearFieldFormHtml("div", fieldClassName, "Usuario", "text", this.FORM_USERNAME, "form-control"));
	fieldset.appendChild(crearFieldFormHtml("div", fieldClassName, "Contraseña", "text", this.FORM_PASSWORD, "form-control"));
	
	fieldset.appendChild(createModalButton("Agregar", "button", this.FORM_BTN_ADD, "btn btn-success", modalId, false, ()=>this.retrieveFormDataForAdd()));
	fieldset.appendChild(createModalButton("Actualizar", "button", this.FORM_BTN_UPDATE, "btn btn-success", modalId, false, ()=>this.retrieveFormDataForUpdate()));
	fieldset.appendChild(createModalButton("Cancelar", "button", "", "btn btn-danger", modalId, false, ()=>this.clearForm()));

	form.appendChild(fieldset);
	
	divForm.appendChild(form);
	
	modalContentDiv.appendChild(divForm);

	modalDiv.appendChild(modalContentDiv);

	section.appendChild(modalDiv);
	
	return section;
}*/
