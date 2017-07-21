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
Entrenador.prototype.elegirPlantillaParaPartido = function(jugadores, jugadorEnPartido) {
	var alineacion = {
		porteros: [],
		defensas: [],
		mediocentros: [],
		delanteros: []
	};

	alineacion.porteros = this.asignarPosicion("portero", 1, jugadores, jugadorEnPartido);
	alineacion.defensas = this.asignarPosicion("defensa", 4, jugadores, jugadorEnPartido);
	alineacion.mediocentros = this.asignarPosicion("mediocentro", 4, jugadores, jugadorEnPartido);
	alineacion.delanteros = this.asignarPosicion("delantero", 2, jugadores, jugadorEnPartido);
	
	return alineacion;
}
//Entrenador.prototype.asignarPosicion = function(posicion, numeroJugadores, arrayJugadores) {
Entrenador.prototype.asignarPosicion = function(posicion, numeroJugadores, arrayJugadores, jugadorEnPartido) {
	var jugadores = [];
	for (p = 0; p , numeroJugadores; p++) {

		//var jugador = this.escogerMejorJugador(equipo.obtenerJugadoresPorPosicion(posicion));
		var jugador = this.escogerMejorJugador(this.obtenerJugadoresPorPosicion(posicion, arrayJugadores), jugadorEnPartido);
		if (!jugador) {
			console.log("No hubo jugador para la posición: " + posicion);
			//jugador = this.escogerMejorJugador(equipo.jugadores);	
			jugador = this.escogerMejorJugador(arrayJugadores, jugadorEnPartido);	
		}
		jugadores.push(jugador);
		console.log("Jugador " + jugador.nombre + " asignado para la posición " + posicion);
	}
	return jugadores;
}
Entrenador.prototype.escogerMejorJugador = function(jugadores, jugadorEnPartido) {
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

	if (mejorJugador) {
		//equipo.jugadorEnPartido(mejorJugador);
		jugadorEnPartido(mejorJugador);
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
Entrenador.prototype.obtenerJugadoresPorPosicion = function(posicion, arrayJugadores) {
	var jugadores = [];

	//var j = 0;
	//while(!jugador) {
	for (j = 0; j < arrayJugadores.length; j++) {
		var jugador = arrayJugadores[j];
		if (jugador.posicion == posicion) {
			jugadores.push(jugador);
		}
	//	j++;
	}

	return jugadores;
}

/* Equipo */
var Equipo = function(entrenador, jugadores) {
	this.entrenador = entrenador;
	this.jugadores = jugadores;
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
Partido.prototype.match = function(plantilla1, plantilla2) {
	// TODO: Como manejar la plantilla???
	for (a = 0; a < 10; a++) {
		var a = this.nivelDePosicion(plantilla1.mediocentros, "mediocentro", true) - this.nivelDePosicion(plantilla2.mediocentros, "mediocentro", false);
		var b = this.nivelDePosicion(plantilla1.delanteros, "delanteros", true) - this.nivelDePosicion(plantilla2.defensas, "defensas", false);
		var c = a + b - nivelDePosicion(plantilla2.porteros, "portero", false);

		var fortuna = randomBetween(0, 100);

		var total = c + fortuna;

		//if ()
	}
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

var equipo1 = new Equipo(entrenador1, jugadores1);
var plantilla1 = equipo1.entrenador.elegirPlantillaParaPartido(equipo1.jugadores, equipo1.jugadorEnPartido);

var entrenador2 = new Entrenador(obtenerStringAleatorio(nombresJugadores), randomBetween(16, 100), obtenerStringAleatorio(nacionalidades), randomBetween(140, 210), randomBetween(50, 120), esEnfermoAleatorioPorPorcentajeDel(10));
var jugadores2 = crearJugadores(22);

var equipo2 = new Equipo(entrenador2, jugadores2);
var plantilla2 = equipo2.entrenador.elegirPlantillaParaPartido(equipo2.jugadores, equipo2.jugadorEnPartido);

var partido = new Partido(equipo1, equipo2);
partido.match();
/* +++++ Crear objetos +++++ */

//console.log(jugadores);
console.log(plantilla1);
console.log(plantilla2);


