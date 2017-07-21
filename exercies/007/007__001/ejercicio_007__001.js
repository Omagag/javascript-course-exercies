/*
Ejercicio 007__001

1) Modela la clase Vehículo, con las siguientes propiedades:

Marca (aleatorio)
Modelo (aleatorio)
VelocidadMaxima (aleatorio entre 100kmh y 200kmh)
Realiza la clase Motocicleta y Coche que hereden de vehículo

2) Realiza la clase carrera que recibirá dos vehículos en su consctrucción. La clase carrera tendrá el método iniciarCarrera() que hará que los dos vehículos compitan.

Una carrera consistirá en ver qué vehículo recorre primero 200 metros. Para ser realista deberás hacer que los vehículos avancen cada segundo los metros correspondientes.

Ganará el que recorra antes los 200 metros. En caso de llegar a la vez, quedarán empatados e irán a penales. 

Naaaaaaaaah, no hay penales. Pero sí que pueden empatar.

3) Pinta en tu html la carrera. Haz uso de funciones de manejo del DOM, y haz uso de CSS para modificar su posición. Los coches deberán desplazarse desde la izquierda de la pantalla hasta la derecha donde se encontrará la meta.

Puedes simular que cada metro avanzado son 4 píxeles de la pantalla.

AYUDA:
function getMetrosQueAvanzaCadaSegundo(velocidadEnKmh){
    var metros = velocidadEnKmh*1000/3600;
    return metros;
}

Bonus:
Crear pistas dinámicas
Agregar Aceleración
*/
var intervalID;
var marcas = ["Toyota", "Ford", "BMW", "Peugeot", "Honda", "Audi", "Mazda", "Harley-Davidson", "Ducati", "VolksWagen", "Aston Martin"];
var modelos = ["Ducati 848", "Harley-Davidson CVO", "Leon", "A3", "Jetta", "Yamaha Aerox 100", "BMW Serie 3", "Rapide", "Bocho"];
var distanciaCarrera = 1000;
var segundo = 100;

/* +++++ VEHICULOS +++++ */
var Vehiculo = function() {
	this.id = "";
	this.marca = "";
	this.modelo = "";
	this.velocidadMaxima = 0;
	this.aceleracion = 0;
	this.icon = "";
}
Vehiculo.prototype.init = function(id, marca, modelo, velocidadMaxima, aceleracion) {
	this.id = id;
	this.marca = marca;
	this.modelo = modelo;
	this.velocidadMaxima = velocidadMaxima;
	this.aceleracion = aceleracion;
}
Vehiculo.prototype.obtenerMetrosPorSegundo = function() {
	var metros = this.velocidadMaxima*1000/3600;

	return Math.floor(metros);
}
/* +++++ VEHICULOS +++++ */

/* +++++ MOTOCICLETA +++++ */
var Motocicleta = function(id, marca, modelo, velocidadMaxima, aceleracion) {
	this.icon = "🏍";
	this.init(id, marca, modelo, velocidadMaxima, aceleracion);
}
Motocicleta.prototype = new Vehiculo();
/* +++++ MOTOCICLETA +++++ */

/* +++++ AUTOMOVIL +++++ */
var Automovil = function(id, marca, modelo, velocidadMaxima, aceleracion) {
	this.icon = "🏎";
	this.init(id, marca, modelo, velocidadMaxima, aceleracion);
}
Automovil.prototype = new Vehiculo();
/* +++++ AUTOMOVIL +++++ */

/* +++++ CARRERA +++++ */
var Carrera = function(vehiculo1, vehiculo2) {
	this.distancia = distanciaCarrera;
	this.pistas = [];
	//this.asignarPistas(vehiculo1, vehiculo2);
}
Carrera.prototype.iniciarCarrera = function() {
	console.log("Inicia Carrera !!!");
	
	// TODO Hace que compitan los carros
	//var ganador = null;
	var ganadores = [];
	var metros = 0;
	/*if (this.pistas[0].actualizarAvance() >= this.distancia) {
		//ganador = this.pistas[0].vehiculo;
		ganadores.push(this.pistas[0].vehiculo);
	}
	if (this.pistas[1].actualizarAvance() >= this.distancia) {
		//ganador = this.pistas[1].vehiculo;
		ganadores.push(this.pistas[1].vehiculo);
	}*/

	for (var i = 0; i < this.pistas.length; i++) {
		var pista = this.pistas[i];
		if (pista.actualizarAvance() >= this.distancia) {
			ganadores.push(this.pistas[i].vehiculo);
		}
	}

	//return ganador;
	return ganadores;
}
Carrera.prototype.asignarPistas = function(vehiculo1, vehiculo2) {
	//var pistasDiv = document.getElementById("pistas");


	var pista1 = new Pista("pista1", vehiculo1);
	this.pistas.push(pista1);
	var pista2 = new Pista("pista2", vehiculo2);
	this.pistas.push(pista2);
}
Carrera.prototype.asignarPistasDinamicas = function(vehiculos) {
	var pistasDiv = document.getElementById("pistas");

	for (var i = 0; i < vehiculos.length; i++) {
		var pista = new Pista("pista"+i, vehiculos[i]);
		this.pistas.push(pista);
		pistasDiv.innerHTML += pista.crearPistaHtml();
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
	this.div = document.getElementById(this.id);
	this.img = document.getElementById(this.vehiculo.id);
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
	pistaDiv += "<img id='" + this.vehiculo.id + "' alt='' src='vehiculos/" + this.vehiculo.id + ".png'/>";
	pistaDiv += "</div>";
	return pistaDiv;
}
Pista.prototype.getImgHtml = function() {
	return this.img;
}
Pista.prototype.getDivPistaHtml = function() {
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
/* +++++ UTILERIAS +++++ */
var carrera = null;
window.onload = function() {
	/* +++++ CONTROL +++++ */
	var moto1 = new Motocicleta("vehiculo7", obtenerStringAleatorio(marcas), obtenerStringAleatorio(modelos), randomBetween(100, 200), randomBetween(50, 100));
	var moto2 = new Motocicleta("vehiculo9", obtenerStringAleatorio(marcas), obtenerStringAleatorio(modelos), randomBetween(100, 200), randomBetween(50, 100));

	var auto1 = new Automovil("vehiculo1", obtenerStringAleatorio(marcas), obtenerStringAleatorio(modelos), randomBetween(100, 200), randomBetween(50, 100));
	var auto2 = new Automovil("vehiculo2", obtenerStringAleatorio(marcas), obtenerStringAleatorio(modelos), randomBetween(100, 200), randomBetween(50, 100));

	carrera = new Carrera(moto1, moto2);

	var vehiculos = [moto1, moto2, auto1, auto2];
	carrera.asignarPistasDinamicas(vehiculos);
	/* +++++ CONTROL +++++ */
}

var iniciarCiclo = function() {
	intervalID = setInterval(
		function(){
			/*var ganador = carrera.iniciarCarrera();
			if (ganador) {
				console.log("Ganó: " + ganador.marca);
				detenerCiclo();
				carrera.ocultarPistas();
				pintarGanador(ganador);
			}*/
			var ganadores = carrera.iniciarCarrera();
			if (ganadores.length > 0) {
				detenerCiclo();
				if (ganadores.length > 1) {
					for (var i = 0; i < ganadores.length; i++) {
						console.log("Empate: " + ganadores[i].marca);
					}
				} else {
					console.log("Ganó: " + ganadores[0].marca);
					
				}

				carrera.ocultarPistas();
				//pintarGanador(ganador);
				pintarGanadores(ganadores);
			}
		}, segundo);
}
var detenerCiclo = function() {
	clearInterval(intervalID);
}

var pintarGanador = function(ganador) {
	var divGanador = document.getElementById("content-ganador");
	divGanador.style.display = "block";
	var imgGanador = document.getElementById("ganador");
	imgGanador.src = "vehiculos/" + ganador.id + ".png";
}
var pintarGanadores = function(ganadores) {
	var divGanador = document.getElementById("content-ganador");
	divGanador.style.display = "block";
	for (var i = 0; i < ganadores.length; i++) {
		var src = "vehiculos/" + ganadores[i].id + ".png";
		var img = "<img src='" + src + "'/>"
		divGanador.innerHTML += img;
	}
}

