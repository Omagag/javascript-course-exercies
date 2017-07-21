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
function crearTdHtml(text, clazz) {
	/*let td = document.createElement("td");
	let txtNombre = document.createTextNode(value);
	td.appendChild(txtNombre);
	if (clazz) {
		td.setAttribute("class", clazz);
	}

	return td;*/

	let td = document.createElement("td");
	td.textContent = text;
	if (clazz) {
		td.className = clazz;
	}

	return td;
}
function crearButtonHtml(text, clazz, action) {
	let button = document.createElement("button");
	button.className = clazz;
	button.textContent = text;
	button.onclick = action;
	return button;
}
function createTHead() {
	let thead = document.createElement("thead");
	let tr = document.createElement("tr");
	tr.appendChild(crearTdHtml("Comida"));
	tr.appendChild(crearTdHtml("Calorias"));
	tr.appendChild(crearTdHtml("Precio"));
	thead.appendChild(tr);

	return thead;
}
