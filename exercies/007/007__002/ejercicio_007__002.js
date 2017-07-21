/*
Ejercicio 007__002

Partiendo del ejercicio anterior...

Realiza un formulario para recoger los datos de un vehículo. Añade al formulario un botón añadir que creará un nuevo vehículo a partir de los datos del formulario y lo añadirá a nuestro objeto carrera.

Haz que se puedan añadir tantos vehículos como se deseen (no solo dos).

Añade un botón IniciarCarrera que hará que la carrera comience y se muevan todos los vehículos que se hayan añadido previamente. 
*/
var intervalID;
var marcas = ["Toyota", "Ford", "BMW", "Peugeot", "Honda", "Audi", "Mazda", "Harley-Davidson", "Ducati", "VolksWagen", "Aston Martin"];
var modelos = ["Ducati 848", "Harley-Davidson CVO", "Leon", "A3", "Jetta", "Yamaha Aerox 100", "BMW Serie 3", "Rapide", "Bocho"];
var imagenes = ["moto1", "moto2", "moto3", "moto4", "vehiculo1", "vehiculo2", "vehiculo3", "vehiculo4", "vehiculo5", "vehiculo6"];
var distanciaCarrera = 1000;
var segundo = 100;

/* +++++ VEHICULOS +++++ */
var Vehiculo = function() {
	this.id = "";
	this.marca = "";
	this.modelo = "";
	this.velocidad = 0;
	this.velocidadMaxima = 0;
	this.aceleracion = 0;
	this.icon = "";
}
Vehiculo.prototype.init = function(marca, modelo, velocidadMaxima, aceleracion, icon) {
	this.marca = marca;
	this.modelo = modelo;
	this.velocidadMaxima = velocidadMaxima;
	this.aceleracion = aceleracion;
	this.icon = icon;
}
Vehiculo.prototype.obtenerMetrosPorSegundo = function() {
//	var metros = this.velocidadMaxima*1000/3600;
//	return Math.floor(metros);
	if (this.velocidad < this.velocidadMaxima) {
		this.velocidad += this.velocidad + this.aceleracion*1;
	}

	return Math.floor(this.velocidad);
}
/* +++++ VEHICULOS +++++ */

/* +++++ MOTOCICLETA +++++ */
var Motocicleta = function(marca, modelo, velocidadMaxima, aceleracion, icon) {
	this.init(marca, modelo, velocidadMaxima, aceleracion, icon);
}
Motocicleta.prototype = new Vehiculo();
/* +++++ MOTOCICLETA +++++ */

/* +++++ AUTOMOVIL +++++ */
var Automovil = function(marca, modelo, velocidadMaxima, aceleracion, icon) {
	this.init(marca, modelo, velocidadMaxima, aceleracion, icon);
}
Automovil.prototype = new Vehiculo();
/* +++++ AUTOMOVIL +++++ */

/* +++++ CARRERA +++++ */
//var Carrera = function(vehiculo1, vehiculo2) {
var Carrera = function() {
	this.distancia = distanciaCarrera;
	this.pistas = [];
	this.divPistas = null;
	//this.asignarPistas(vehiculo1, vehiculo2);
}
Carrera.prototype.iniciarCarrera = function() {
	ocultarMessages();
	if (this.pistas.length > 0) {
		ocultarForm();
		console.log("Inicia Carrera !!!");
		
		// TODO Hace que compitan los carros
		var ganadores = [];
		var metros = 0;
		for (var i = 0; i < this.pistas.length; i++) {
			var pista = this.pistas[i];
			if (pista.actualizarAvance() >= this.distancia) {
				ganadores.push(this.pistas[i].vehiculo);
			}
		}
	} else {
		detenerCiclo();
		mostrarMessages();
	}
	return ganadores;
}
Carrera.prototype.asignarPistas = function(vehiculo1, vehiculo2) {
	var pista1 = new Pista("pista1", vehiculo1);
	this.pistas.push(pista1);
	var pista2 = new Pista("pista2", vehiculo2);
	this.pistas.push(pista2);
}
Carrera.prototype.inscribir = function(vehiculo) {
	if (!this.divPistas) {
		this.divPistas = document.getElementById("pistas");
	}
	var numeroPista = this.pistas.length;
	vehiculo.id = "vehiculo"+numeroPista;
	var pista = new Pista("pista"+numeroPista, vehiculo);
	this.pistas.push(pista);
	var pistaHtml = pista.crearPistaHtml();
	this.divPistas.innerHTML += pistaHtml;
}
Carrera.prototype.asignarPistasDinamicas = function(vehiculos) {
	var pistasDiv = document.getElementById("pistas");

	for (var i = 0; i < vehiculos.length; i++) {
		var pista = new Pista("pista"+i, vehiculos[i]);
		this.pistas.push(pista);
		var pistaHtml = pista.crearPistaHtml();
		pistasDiv.innerHTML += pistaHtml;
	}
}
Carrera.prototype.ocultarPistas = function() {
	for (var i = 0; i < this.pistas.length; i++) {
		this.pistas[i].ocultar();
	}
}

var Pista = function(id, vehiculo) {
	this.id = id;
	this.vehiculo = vehiculo;
	this.avance = 0;
	this.div = null;
	this.img = null;
}
Pista.prototype.actualizarAvance = function() {
	var metros = this.vehiculo.obtenerMetrosPorSegundo();
	this.avance += metros;
	//this.img.style.left = this.avance + "px";
	this.getImgHtml().style.left = this.avance + "px";
	return this.avance;
}
// TODO reparar
Pista.prototype.ocultar = function() {
	//this.div.style.display = "none";
	this.getDivPistaHtml().style.display = "none";
}
// TODO reparar
Pista.prototype.crearPistaHtml = function() {
	var pistaDiv = "";
	pistaDiv += "<div id='" + this.id + "' class='pista'>";
	pistaDiv += "<img id='" + this.vehiculo.id + "' alt='' class='vehiculo' src='vehiculos/" + this.vehiculo.icon + ".png'/>";
	pistaDiv += "</div>";

	return pistaDiv;
}
Pista.prototype.onHtmlLoad = function() {
	this.div = document.getElementById(this.id);
	this.img = document.getElementById(this.vehiculo.id);
}
Pista.prototype.getImgHtml = function() {
	if (!this.img) {
		this.img = document.getElementById(this.vehiculo.id);
	}
	return this.img;
}
Pista.prototype.getDivPistaHtml = function() {
	if (!this.div) {
		this.div = document.getElementById(this.id);
	}
	return this.div;
}
/* +++++ CARRERA +++++ */

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
function limpiarForm() {
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
}
/* +++++ UTILERIAS +++++ */
var carrera = null;
window.onload = function() {
	crearOpciones("marcas", marcas);
	crearOpciones("modelos", modelos);
	crearOpciones("icons", imagenes);

	/* +++++ CONTROL +++++ */
	var moto1 = new Motocicleta(obtenerStringAleatorio(marcas), obtenerStringAleatorio(modelos), randomBetween(100, 200), randomBetween(50, 100), "vehiculo7");
	var moto2 = new Motocicleta(obtenerStringAleatorio(marcas), obtenerStringAleatorio(modelos), randomBetween(100, 200), randomBetween(50, 100), "vehiculo9");

	var auto1 = new Automovil(obtenerStringAleatorio(marcas), obtenerStringAleatorio(modelos), randomBetween(100, 200), randomBetween(50, 100), "vehiculo1");
	var auto2 = new Automovil(obtenerStringAleatorio(marcas), obtenerStringAleatorio(modelos), randomBetween(100, 200), randomBetween(50, 100), "vehiculo2");

	carrera = new Carrera();

	var vehiculos = [moto1, moto2, auto1, auto2];
	//carrera.asignarPistasDinamicas(vehiculos);
	/* +++++ CONTROL +++++ */
}

var iniciarCiclo = function() {
	intervalID = setInterval(
		function(){
			var ganadores = carrera.iniciarCarrera();
			if (ganadores && ganadores.length > 0) {
				detenerCiclo();
				if (ganadores.length > 1) {
					for (var i = 0; i < ganadores.length; i++) {
						console.log("Empate: " + ganadores[i].marca);
					}
				} else {
					console.log("Ganó: " + ganadores[0].marca);
					
				}

				carrera.ocultarPistas();
				pintarGanadores(ganadores);
			}
		}, segundo);
}

var inscribir = function(e) {
	e.stopPropagation();

	var marca = getValueSelect("marcas");
	var modelo = getValueSelect("modelos");
	var velocidad = getValueInput("velocidad");
	var aceleracion = getValueInput("aceleracion");
	var icon = getValueSelect("icons");

	var vehiculo = new Automovil(marca, modelo, velocidad, aceleracion, icon);
	carrera.inscribir(vehiculo);

	limpiarForm();
}

var detenerCiclo = function() {
	clearInterval(intervalID);
}

var pintarGanadores = function(ganadores) {
	var divGanador = document.getElementById("content-ganador");
	divGanador.style.display = "block";
	for (var i = 0; i < ganadores.length; i++) {
		var src = "vehiculos/" + ganadores[i].icon + ".png";
		var img = "<img src='" + src + "'/>"
		divGanador.innerHTML += img;
	}
}

