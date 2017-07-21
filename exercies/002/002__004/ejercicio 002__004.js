/*
1) Define una clase Persona que tenga los siguientes atributos:

Nombre: 
Edad:
Nacionalidad:
Altura: 
Peso:
Enfermo: true/false

2) Definir la clase Jugador que herede de persona y tenga los siguientes atributos:

Posición: (portero/defensa/mediocentro/delantero)
Numero: 
Calidad: (0-100)

3) Definir la clase Equipo que tenga:

- Array de jugadores
- Entrenador 


4) Definir la clase Entrenador que herede de Persona y tenga los siguientes métodos:

- elegirPlantillaParaPartido() que elegirá de sus jugadores a los mejores para un partido:
    1 portero
    4 defensas
    4 mediocentros
    2 delanteros
Un equipo tendrá 22 jugadores creados aleatoriamente

*/

/* Constantes */
var nombresJugadores = ["Ragnar", "Loki", "Lagertha", "Arvid", "Jabari", "Xenon", "Nadezhda", "Nadim", "Tabby", "Radley", "Radcliff", "Oakley", "Eamon", "Hadwin", "Hagan", "Kaden", "Maarku", "Dacey", "Walden", "Sachi"];
var posicionesDeJuego = ["portero", "defensa", "mediocentro", "delantero"];
var nacionalidades = ["mexicano", "chileno", "español", "aleman", "frances", "italiano", "inglés"];
var paises = ["México", "Chile", "España", "Alemania", "Francia", "Italia", "Inglaterra"];

/**/

/* Persona */
var Persona = function() {
	this.nombre = "";
	this.edad = 0;
	this.nacionalidad = "";
	this.altura = 0;
	this.peso = 0;
	this.enfermo = false;
}
Persona.prototype.init = function(nombre, edad, nacionalidad, altura, peso, enfermo) {
	this.nombre = nombre;
	this.edad = edad;
	this.nacionalidad = nacionalidad;
	this.altura = altura;
	this.peso = peso;
	this.enfermo = enfermo;
}

/* Jugador */
var Jugador = function(nombre, edad, nacionalidad, altura, peso, enfermo, posicion, numero, calidad) {
	this.init(nombre, edad, nacionalidad, altura, peso, enfermo);
	this.posicion = posicion;
	this.numero = numero;
	this.calidad = calidad;
}
Jugador.prototype = new Persona();

/* Entrenador */
var Entrenador = function(nombre, edad, nacionalidad, altura, peso, enfermo) {
	this.init(nombre, edad, nacionalidad, altura, peso, enfermo);
}
Entrenador.prototype = new Persona();
//Entrenador.prototype.elegirPlantillaParaPartido = function(jugadores) {
Entrenador.prototype.elegirPlantillaParaPartido = function(equipo) {
	var alineacion = {
		porteros: [],
		defensas: [],
		mediocentros: [],
		delanteros: []
	};

	alineacion.porteros = this.asignarPosicion("portero", 1, equipo);
	alineacion.defensas = this.asignarPosicion("defensa", 4, equipo);
	alineacion.mediocentros = this.asignarPosicion("mediocentro", 4, equipo);
	alineacion.delanteros = this.asignarPosicion("delantero", 2, equipo);
	
	return alineacion;
}
Entrenador.prototype.asignarPosicion = function(posicion, jugadoresAAsignar, equipo) {
	var jugadores = [];
	for (p = 0; p < jugadoresAAsignar; p++) {

		var jugador = this.escogerMejorJugador(equipo.obtenerJugadoresPorPosicion(posicion));
		if (!jugador) {
//			console.log("No hubo jugador para la posición: " + posicion);
			jugador = this.escogerMejorJugador(equipo.jugadores);	
		}
		jugadores.push(jugador);
		// meter al jugador al Partido (sale de la banca)
		if (jugador) {
			equipo.jugadorEnPartido(jugador);
		}
//		console.log("Jugador " + jugador.nombre + " asignado para la posición " + posicion);
	}
	return jugadores;
}
Entrenador.prototype.escogerMejorJugador = function(jugadores) {
	var mejorJugador = null;

	var j = 0;
	while(j < jugadores.length) {
		var jugadorTmp = jugadores[j];
		if (!mejorJugador) {
			mejorJugador = jugadorTmp;
		} else if (mejorJugador.calidad < jugadorTmp.calidad) {
			mejorJugador = jugadorTmp;
		}

		j++
	}

	return mejorJugador;
}
Entrenador.prototype.nivelDePosicion = function(arrayPosicion) {
	var nivelDePosicion = 0;
	for (var j = 0; j < arrayPosicion.length; j++) {
		nivelDePosicion += arrayPosicion[j];
	}

	return nivelDePosicion;
}
var EntrenadorMexicano = function(nombre, edad, nacionalidad, altura, peso, enfermo) {
	this.init(nombre, edad, nacionalidad, altura, peso, enfermo);
	this.nacionalidad = "mexicano";
}
EntrenadorMexicano.prototype = new Entrenador();
EntrenadorMexicano.prototype.elegirPlantillaParaPartido = function(equipo) {
	var alineacion = {
		porteros: [],
		defensas: [],
		mediocentros: [],
		delanteros: []
	};

	alineacion.porteros = this.asignarPosicion("portero", 1, equipo);
	alineacion.defensas = this.asignarPosicion("defensa", 3, equipo);
	alineacion.mediocentros = this.asignarPosicion("mediocentro", 5, equipo);
	alineacion.delanteros = this.asignarPosicion("delantero", 2, equipo);
	
	return alineacion;
}

/* Plantilla */
var Plantilla = function(plantilla) {
	this.plantilla = plantilla;
}
Plantilla.prototype.nivelDePosicion = function(posicion) {
	var nivelDePosicion = 0;
	for (var j = 0; j < arrayPosicion.length; j++) {
		nivelDePosicion += arrayPosicion[j];
	}
	return nivelDePosicion;
}

/* Equipo */
var Equipo = function(nombre, entrenador, jugadores) {
	this.nombre = nombre;
	this.entrenador = entrenador;
	this.jugadores = jugadores;
}
Equipo.prototype.obtenerJugadoresPorPosicion = function(posicion) {
	var jugadores = [];
	for (j = 0; j < this.jugadores.length; j++) {
		var jugador = this.jugadores[j];
		if (jugador.posicion == posicion) {
			jugadores.push(jugador);
		}
	}
	return jugadores;
}
Equipo.prototype.jugadorEnPartido = function(jugador) {
	var index = this.jugadores.indexOf(jugador);
	this.jugadores.splice(index, 1);
}
Equipo.prototype.jugadorEnABanca = function(jugador) {
	this.jugadores.push(jugador);
}



/*
Lógica del partido:

Cada equipo hará 10 ataques que funcionarán de la siguiente manera

Por ejemplo:

Si ataca el equipo 1 se calculará:

A = (Suma de calidad de medio centros equipo 1) - (Suma de calidad de medio centros equipo 2)
B = (Suma de calidad de delanteros 1) - (Suma de calidad de defensas equipo 2)
C = A + B - (Suma de calidad de portero equipo 2)
Fortuna = numero aleatorio entre 0 y 100

Para cada jugador que no esté en su puesto del equipo 1: 
C = C - 10

Para cada jugador que no esté en su puesto del equipo 2: 
C = C + 10

TOTAL = C + Fortuna

Si total es mayor que cero -> GOOOOOOOL
Si total es igual a cero -> PALO !!!
Si total es menor que cero -> Ná de ná​ 
*/

/* Partido */
var Partido = function(equipo1, equipo2) {
	this.equipo1 = equipo1;
	this.equipo2 = equipo2;
}
Partido.prototype.match = function() {
	var plantilla1 = equipo1.entrenador.elegirPlantillaParaPartido(equipo1);
	var plantilla2 = equipo2.entrenador.elegirPlantillaParaPartido(equipo2);
	
	console.log(plantilla1);
	console.log(plantilla2);

	// TODO: Como manejar la plantilla???
	var golesEquipo1 = 0;
	var golesEquipo2 = 0;
	for (a = 0; a < 10; a++) {
		
		console.log("Equipo al ataque " + equipo1.nombre);
		golesEquipo1 += this.ataque(plantilla1, plantilla2);
		console.log("Equipo al ataque " + equipo2.nombre);
		golesEquipo2 += this.ataque(plantilla2, plantilla1);

		console.log("Marcador " +equipo1.nombre + " " + golesEquipo1 + " " + equipo2.nombre + " " + golesEquipo2);
	}
}
Partido.prototype.ataque = function(atacantes, defensores) {
	var gol = 0;

	var a = this.nivelDePosicion(atacantes.mediocentros, "mediocentro", true) - this.nivelDePosicion(defensores.mediocentros, "mediocentro", false);
	var b = this.nivelDePosicion(atacantes.delanteros, "delanteros", true) - this.nivelDePosicion(defensores.defensas, "defensas", false);
	var c = a + b - this.nivelDePosicion(defensores.porteros, "portero", false);

	var fortuna = randomBetween(0, 200);

	var total = c + fortuna;

	if (total > 0) {
		console.log("GOOOOOOOL");
		gol = 1;
	} else if (total == 0) {
		console.log("PALO !!!");
	} else {
		console.log("Ná de ná");
	}

	return gol;
}
Partido.prototype.nivelDePosicion = function(arrayPosicion, posicion, estaAtacando) {
	var nivelDePosicion = 0;
	for (var j = 0; j < arrayPosicion.length; j++) {
		var jugador = arrayPosicion[j];
		nivelDePosicion += jugador.calidad;
		if (jugador.posicion != posicion) {
			if (estaAtacando) {
				nivelDePosicion -= 10;	
			} else {
				nivelDePosicion += 10;
			}
		}
	}
	return nivelDePosicion;
}


function crearJugadores(cantidadJugadores) {
	var jugadores = [];

	for (j = 0; j < cantidadJugadores; j++) {
		var jugador = new Jugador(obtenerStringAleatorio(nombresJugadores), randomBetween(16, 100), obtenerStringAleatorio(nacionalidades), randomBetween(140, 210), randomBetween(50, 120), esEnfermoAleatorioPorPorcentajeDel(10), obtenerStringAleatorio(posicionesDeJuego), randomBetween(1, 100), randomBetween(0, 100));
		jugadores.push(jugador);
	}

	return jugadores;
}

function esEnfermoAleatorioPorPorcentajeDel(porcentaje) {
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

/* +++++ Crear objetos +++++ */
var entrenador1 = new Entrenador(obtenerStringAleatorio(nombresJugadores), randomBetween(16, 100), obtenerStringAleatorio(nacionalidades), randomBetween(140, 210), randomBetween(50, 120), esEnfermoAleatorioPorPorcentajeDel(10));
var jugadores1 = crearJugadores(22);

var equipo1 = new Equipo(obtenerStringAleatorio(paises), entrenador1, jugadores1);

var entrenador2 = new Entrenador(obtenerStringAleatorio(nombresJugadores), randomBetween(16, 100), obtenerStringAleatorio(nacionalidades), randomBetween(140, 210), randomBetween(50, 120), esEnfermoAleatorioPorPorcentajeDel(10));
var entrenadorMexicano = new EntrenadorMexicano(obtenerStringAleatorio(nombresJugadores), randomBetween(16, 100), obtenerStringAleatorio(nacionalidades), randomBetween(140, 210), randomBetween(50, 120), esEnfermoAleatorioPorPorcentajeDel(10));
var jugadores2 = crearJugadores(22);

var equipo2 = new Equipo(obtenerStringAleatorio(paises), entrenadorMexicano, jugadores2);

var partido = new Partido(equipo1, equipo2);
partido.match();
/* +++++ Crear objetos +++++ */

//console.log(jugadores);
//console.log(plantilla1);
//console.log(plantilla2);

var str1 = "esto es un string";
console.log(str1);
var str2 = str1;
str2 = "he modificado el string que se copio por valor";
console.log(str2);
console.log(str1);

var num1 = 343;
console.log(num1);
var num2 = num1;
num2 = 123;
console.log(num2);
console.log(num1);

var bool1 = false;
console.log(bool1);
var bool2 = bool1;
bool2 = true;
console.log(bool2);
console.log(bool1);

var null1 = null;
console.log(null1);
var null2 = null1;
null2 = "true";
console.log(null2);
console.log(null1);

var undefined1;
console.log(undefined1);
var undefined2 = undefined1;
undefined2 = "true";
console.log(undefined2);
console.log(undefined1);

var casa = {
	suelo: "liso"
}
console.log(casa);
var casa2 = casa;
casa2.suelo = "resbaladizo";
console.log(casa2);
console.log(casa);
var casaJson = JSON.stringify(casa);
var casa3 = JSON.parse(casaJson);
casa3.suelo = "plano";
console.log(casa3);
console.log(casa);

//console.log("true");
console.log(true == "true");
console.log("true" == true);
console.log(true === "true");
console.log(true == 1);
console.log(true === 1);
console.log(true == "1");
console.log(true === "1");
console.log("1" == true);
console.log("1" === true);
console.log(false == "0");
console.log(false === "0");

function saluda() {
	console.log("Hola");
}
//var intervalID = setInterval(saluda, 1000);
function detener() {
	clearInterval(intervalID);
}

var arreglo1 = ["hola"];
var arreglo2 = ["hola"];
console.log(arreglo1 == arreglo2);
var arreglo3 = arreglo2;
console.log(arreglo2 == arreglo3);

function miConcat(separator) {
	var resultado = "";

	for (var i = 1; i < arguments.length; i++) {
		resultado += arguments[i] + separator;
	}

	return resultado;
}
console.log(miConcat(", ", "rojo", "naranja", "azul"));

