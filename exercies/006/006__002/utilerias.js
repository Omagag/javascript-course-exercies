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
function crearFieldFormHtml(labelText, inputType, inputName) {
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
}
function crearButtonHtml(text, type, id, className, action, hidden) {
	let button = document.createElement("button");
	if (id && id != "") {
		button.id = id;
	}
	if (className && className != "") {
		button.className = className;
	}
	button.type = type;
	button.textContent = text;
	button.onclick = action;
	if (hidden) {
		button.style.display = "none";
	}

	return button;
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
