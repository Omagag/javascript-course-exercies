/* +++++ UTILERIAS +++++ */
function sucedePorPorcentajeDel(porcentaje) {
	var random = Math.round(Math.random() * 100);
	return random <= porcentaje ? 1 : 0;
}
function obtenerStringAleatorio(nombresArray) {
	return nombresArray[random(nombresArray.length)];
}
function random(x) {
	return Math.floor(Math.random() * x);
}
function randomBetween(x, y) {
	return Math.floor(Math.random() * y) + x;
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
/*function limpiarForm() {
	setValueSelect("marcas", "");
	setValueSelect("modelos", "");
	setValueInput("velocidad", "");
	setValueInput("aceleracion", "");
	setValueSelect("icons", "");
}
function ocultarForm() {
	document.getElementById("inscripcion-form").style.display = "none";
}
function mostrarMessages() {
	document.getElementById("messages").style.display = "block";	
}
function ocultarMessages() {
	document.getElementById("messages").style.display = "none";	
}*/
/* +++++ UTILERIAS +++++ */