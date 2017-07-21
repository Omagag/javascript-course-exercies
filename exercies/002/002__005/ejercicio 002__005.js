/*
1) Realiza la modelización de un parque natural. Empieza con el siguiente código.

var parqueNatural = {
areas = [],
parqueDeBomberos = {}
}

En cada una de las áreas (añade 10 áreas) encontraremos un array de árboles (100 por área) y un array de visitantes (100 en todo el parque).
En el parque de bomberos encontraremos un array de bomberos (10) y posiblemente más propiedades que se te puedan ocurrir.
Los bomberos y los visitantes deberán heredar de la clase Persona.

2) Añade un método ejecutar ciclo que represente el paso de 1h en el parque.
Cada ciclo que pase debemos llamar a ejecutar ciclo de los visitantes que se irán cambiando de recinto de forma aleatoria.
Haz que el método se ejecute cada segundo.

3) En cada paso de un ciclo se puede originar un fuego (probabilidad del 5%) que empezaría quemando un arbol aleatorio dentro del parque.
Cada ciclo que pase el fuego se extenderá al arbol al arbol siguiente, si no hay arbol siguiente, deberá saltar al primer arbol del área siguiente.
Asi sucesivamente hasta expandirse por todo el parque. Cada ciclo que pase el fuego en los arboles, estos estarán un 10% más quemados.
Cuando lleguen al 100% de quemados, se habrá perdido el arbol. (Quitarlo del área).​
*/

/*
BONUS para el ejercicio 002__005

1) Añade un objeto viento​ (de clase viento), con el siguiente atributo:

Velocidad: Nula/Media/Alta

En cada ejecución el viento tendrá una velocidad aleatoria

Si la velocidad es nula el incendio se expandirá 1 arbol, si la velocidad es media: dos árboles, si la dirección es alta: 3 árboles.

2) Los incendios ya no se originan de forma aleatoria en cualquier parte del bosque.

Los incendios los pueden originar los visitantes que sean fumadores (2 de cada 10). En cada ciclo hay una probabilidad del 10% de que un visitante fumador tire una colilla en el área en el que está y provoque un incendio.
*/


/* Constantes */
var nombres = ["Ragnar", "Loki", "Lagertha", "Arvid", "Jabari", "Xenon", "Nadezhda", "Nadim", "Tabby", "Radley", "Radcliff", "Oakley", "Eamon", "Hadwin", "Hagan", "Kaden", "Maarku", "Dacey", "Walden", "Sachi"];
var velocidades = [0, 1, 2];
var porcentajeIndiceDeFuego = 5;
var porcentajeFumador = 10;
var indiceQuemado = 10;
var numeroAreas = 3;
var numeroArboles = 20;
var intervalID;

/* Parque Natural */
var ParqueNatural = function(areas, parqueDeBomberos) {
	this.areas = areas;
	this.parqueDeBomberos = parqueDeBomberos;
	this.viento = null;
}
ParqueNatural.prototype.addViento = function(viento) {
	this.viento = viento;
}
ParqueNatural.prototype.seOriginaFuego = function() {
	this.extenderFuego();

	if (sucedePorPorcentajeDel(porcentajeIndiceDeFuego)) {
		var idAreaAleatorio = randomBetween(0, this.totalAreas() - 1);
		var idArbolAleatorio = randomBetween(0, this.totalArbolesPorAreas() - 1);
		//var idArbolAQuemar = crearIdArbol(idAreaAleatorio, idArbolAleatorio);
		
		var arboles = this.obtenerArboles();
		if (arboles.length > 0) {
			for (j = 0; j < arboles.length; j++) {
				var arbol = arboles[j];
				//if (arbol.id == idArbolAQuemar) {
				if (arbol.id == idArbolAleatorio && arbol.idArea == idAreaAleatorio && !arbol.estaArdiendo) {
					//arbol.indiceQuemado = indiceQuemado;
					arbol.quemarse();
					//console.log("Arbol con id: " + arbol.id + " ha comenzado a quemarse.");
					//arbol.estatus();
				}
			}
		} else {
			cerrarCiclo();
		}
	}

}
ParqueNatural.prototype.extenderFuego = function() {
	// Encuentra el arbol y lo empieza a quemar
	var arboles = this.obtenerArbolesQuemandose();

//	var totalAreas = this.totalAreas();
//	var totalArbolesPorArea = this.totalArbolesPorAreas();

	// Empezar de atrás hacía adelante
	if (arboles.length > 0) {
		for (var j = arboles.length - 1; j >= 0; j--) {
			var arbol = arboles[j];
			/*
			var arbolSiguiente = null;
			var idAreaActual = arbol.idArea;
			var idArbolActual = arbol.id;

			var idAreaSiguiente = arbol.idArea + 1;
			var idArbolSiguiente = arbol.id + 1;

			//var totalArbolesAreaActual = this.areas[idAreaActual].arboles.length;
			if (idAreaActual == totalAreas - 1) {
			//	if (idArbolActual == totalArbolesAreaActual - 1) {
				if (idArbolActual == totalArbolesPorArea - 1) {
					//arbolSiguiente = this.areas[0].arboles[0];
					arbolSiguiente = this.arbolSiguiente(0, 0);
				} else {
					//arbolSiguiente = this.areas[idAreaActual].arboles[idArbolSiguiente];
					arbolSiguiente = this.arbolSiguiente(idAreaActual, idArbolSiguiente);
				}
			} else {
				//if (idArbolSiguiente == totalArbolesAreaActual) {
				if (idArbolSiguiente == totalArbolesPorArea) {
					//arbolSiguiente = this.areas[idAreaSiguiente].arboles[0];
					arbolSiguiente = this.arbolSiguiente(idAreaSiguiente, 0);
				} else {
					//arbolSiguiente = this.areas[idAreaActual].arboles[idArbolSiguiente];
					arbolSiguiente = this.arbolSiguiente(idAreaActual, idArbolSiguiente);
				}
			}

			
			// extender el fuego
			if (arbol.estaArdiendo) {
				if (arbol.quemarse()) {
					////this.areas[arbol.idArea].arboles.splice(arbol.id, 1);
					//var index = this.areas[arbol.idArea].arboles.indexOf(arbol);
					//this.areas[arbol.idArea].arboles.splice(index, 1);
					this.desecharArbol(arbol.idArea, arbol.id);
				}
				if (arbolSiguiente && !arbolSiguiente.estaArdiendo) {
					arbolSiguiente.quemarse();
				}
			}
			*/

			var arbolesSiguientes = this.obtenerArbolesSiguiente(arbol);
			
			// extender el fuego
			if (arbol.estaArdiendo) {
				if (arbol.quemarse()) {
					////this.areas[arbol.idArea].arboles.splice(arbol.id, 1);
					//var index = this.areas[arbol.idArea].arboles.indexOf(arbol);
					//this.areas[arbol.idArea].arboles.splice(index, 1);
					this.desecharArbol(arbol.idArea, arbol.id);
				}
				if (arbolesSiguientes.length > 0) {
					for (var i = 0; i < arbolesSiguientes.length; i++) {
						var arbolSiguiente = arbolesSiguientes[i];
						if (arbolSiguiente && !arbolSiguiente.estaArdiendo) {
							arbolSiguiente.quemarse();
						}
					}
				}
			}

		}
	}
}
ParqueNatural.prototype.obtenerArbolesQuemandose = function() {
	var arboles = [];
	// Encuentra el arbol y lo empieza a quemar
	for (var i = 0; i < this.areas.length; i++) {
		var area = this.areas[i];
		for (j = 0; j < area.arboles.length; j++) {
			var arbol = area.arboles[j];
			//if (arbol.indiceQuemado > 0) {
			if (arbol.estaArdiendo) {
				arboles.push(arbol);
			}
		}
	}
	return arboles;
}
ParqueNatural.prototype.obtenerArboles = function() {
	var arboles = [];
	// Encuentra el arbol y lo empieza a quemar
	for (var i = 1; i < this.areas.length; i++) {
		var area = this.areas[i];
		for (j = 0; j < area.arboles.length; j++) {
			var arbol = area.arboles[j];
			arboles.push(arbol);
		}
	}
	return arboles;
}
ParqueNatural.prototype.obtenerArbolesSiguiente = function(arbol) {
	var arbolesSiguientes = [];

	var velocidadVientos = this.viento.velocidad;

	var totalAreas = this.totalAreas();
	var totalArbolesPorArea = this.totalArbolesPorAreas();

	var cont = 0;
	var idAreaActual = arbol.idArea;
	var idAreaSiguiente = arbol.idArea + 1;
	
	var idArbolActual = arbol.id;
	var idArbolSiguiente = arbol.id + 1;

	do {	
		var arbolSiguiente = null;
		//var totalArbolesAreaActual = this.areas[idAreaActual].arboles.length;
		if (idAreaActual == totalAreas - 1) {
		//	if (idArbolActual == totalArbolesAreaActual - 1) {
			if (idArbolActual == totalArbolesPorArea - 1) {
				//arbolSiguiente = this.areas[0].arboles[0];
				arbolSiguiente = this.obtenerArbolSiguientePorIdAreaYIdArbol(0, 0);
				idAreaActual = 0;
				idAreaSiguiente = 1;
				idArbolActual = 0;
				idArbolSiguiente = 1;
			} else {
				//arbolSiguiente = this.areas[idAreaActual].arboles[idArbolSiguiente];
				arbolSiguiente = this.obtenerArbolSiguientePorIdAreaYIdArbol(idAreaActual, idArbolSiguiente);
				//idAreaActual = idAreaActual; // sin cambio
				//idAreaSiguiente = idAreaSiguiente; // sin cambio
				idArbolActual = idArbolSiguiente;
				idArbolSiguiente += 1;
			}
		} else {
			//if (idArbolSiguiente == totalArbolesAreaActual) {
			if (idArbolSiguiente == totalArbolesPorArea) {
				//arbolSiguiente = this.areas[idAreaSiguiente].arboles[0];
				arbolSiguiente = this.obtenerArbolSiguientePorIdAreaYIdArbol(idAreaSiguiente, 0);
				idAreaActual = idAreaSiguiente;
				idAreaSiguiente += 1;
				idArbolActual = 0;
				idArbolSiguiente = 1;
			} else {
				//arbolSiguiente = this.areas[idAreaActual].arboles[idArbolSiguiente];
				arbolSiguiente = this.obtenerArbolSiguientePorIdAreaYIdArbol(idAreaActual, idArbolSiguiente);
				//idAreaActual = idAreaActual; // sin cambio
				//idAreaSiguiente = idAreaSiguiente; // sin cambio
				idArbolActual = idArbolSiguiente;
				idArbolSiguiente += 1;
			}
		}

		if (arbolSiguiente) {
			arbolesSiguientes.push(arbolSiguiente);
		}

		cont++;
	} while(cont == velocidadVientos);
	
	return arbolesSiguientes;
}
ParqueNatural.prototype.obtenerArbolSiguientePorIdAreaYIdArbol = function(idArea, idArbol) {
	var arbol = null;
	var siguiente = false;
	var cont = 0;
	while(!siguiente && cont < this.areas[idArea].arboles.length) {
		arbol = this.areas[idArea].arboles[cont];
		if (arbol && arbol.id == idArbol) {
			siguiente = true;
		}

		cont++;
	}

	return arbol;
}
ParqueNatural.prototype.desecharArbol = function(idArea, idArbol) {
	var desechado = false;
	var cont = 0;
	while(!desechado) {
		var arbol = this.areas[idArea].arboles[cont];
		if (arbol.id == idArbol) {
			this.areas[idArea].arboles.splice(cont, 1);
			desechado = true;
		}

		cont++;
	}
}
ParqueNatural.prototype.addVisitantes = function(visitantes) {
	if (this.totalVisitantes() < 100) {
//		var idAreaAleatorio = randomBetween(0, this.totalAreas() - 1);
		this.areas[0].visitantes = visitantes;
	}
}
ParqueNatural.prototype.moverVisitantes = function() {
	var totalAreas = this.totalAreas();

	for (var i = totalAreas - 1; i >= 0; i--) {
		var area = this.areas[i];
		area.imprimirEstadoArea();
		if (area.visitantes.length > 0) {
			if (area.id == totalAreas -1) {
				area.salenVisitantes();
			} else {
				this.areas[i+1].entranVisitantes(area.salenVisitantes());
			}
		}
	}
}
ParqueNatural.prototype.totalAreas = function() {
	return this.areas.length;
}
ParqueNatural.prototype.totalVisitantes = function() {
	var numeroVisitantes = 0;

	for (var a = 0; a < this.areas.length; a++) {
		numeroVisitantes += this.areas[a].visitantes.length;
	}

	return numeroVisitantes;
}
ParqueNatural.prototype.totalArbolesPorAreas = function() {
	return this.areas && this.areas[0].arboles ? this.areas[0].arboles.length : 0;
}
ParqueNatural.prototype.siguienteArea = function(areaId) {
	var areaSiguiente = null;

	var idAreaSiguiente = areaId + 1;
	if (idAreaSiguiente < this.areas.length) {
		areaSiguiente = this.areas[idAreaSiguiente];
	}

	return areaSiguiente;
}
ParqueNatural.prototype.cicloParque = function() {
	var viento = new Viento(obtenerStringAleatorio(velocidades));
	this.addViento(viento);

	//var visitantes = crearVisitantes(randomBetween(5, 10));
	var visitantes = crearVisitantes(10);
	this.addVisitantes(visitantes);

	this.seOriginaFuego();

	this.moverVisitantes();
}
/* Persona */
var Persona = function() {
	this.nombre = "";
	this.fumador = false;
}
Persona.prototype.init = function(nombre, fumador) {
	this.nombre = nombre;
	this.fumador = fumador;
}
Persona.prototype.tirarColilla = function() {

}
var Bombero = function(nombre, fumador) {
	this.init(nombre, fumador);
}
Bombero.prototype = new Persona();
var Visitante = function(id, nombre, fumador) {
	this.id = id;
	this.init(nombre, fumador);
}
Visitante.prototype = new Persona();

var ParqueBomberos = function(bomberos) {
	this.bomberos = bomberos;
}

/* Area */
var Area = function(id, arboles) {
	this.id = id;
	this.visitantes = [];
	this.arboles = arboles;
}
Area.prototype.siguienteArbol = function(arbol) {
	return arbolSiguiente = null;

	var idArbolSiguiente = arbol.id + 1;
	if (idArbolSiguiente < this.arboles.length) {
		arbolSiguiente = this.arboles[idArbolSiguiente];
	}

	return arbolSiguiente;
}
Area.prototype.entranVisitantes = function(visitantes) {
	this.visitantes = visitantes;
}
Area.prototype.salenVisitantes = function() {
	var visitantes = this.visitantes;

	for (var i = 0; i < this.visitantes; i++) {
		this.visitantes.push(this.visitantes[i]);
	}
	this.visitantes = [];
	return visitantes;
}
Area.prototype.imprimirEstadoArea = function() {
    var estadoArea = "";
    var estadoVisitantes = "";
    for (var i = 0; i < this.arboles.length; i++) {
        var estadoArbol = "🌲";

        if (this.arboles[i].estaArdiendo) {
            estadoArbol = "🔥";
        }

        estadoArea = estadoArea + estadoArbol + "";
    }

	for (var i = 0; i < this.visitantes.length; i++) {
		estadoVisitantes += "🚶";
	}
    console.log("Estado del área " + this.id);
    console.log("======================");
    console.log(estadoArea);
    console.log(estadoVisitantes);
    console.log("======================");
}
/* Arbol */
var Arbol = function(id, idArea, sensorHumo) {
	this.id = id;
	this.idArea = idArea;
	this.sensorHumo = sensorHumo;
	this.indiceQuemado = 0
	this.estaArdiendo = false;
}
Arbol.prototype.quemarse = function() {
	var muerto = false;

	this.indiceQuemado += indiceQuemado;
	this.estaArdiendo = true;
	if (this.indiceQuemado >= 100) {
		muerto = true;
	}
//	this.estatus();

	return muerto;
}
Arbol.prototype.estatus = function(detalle) {
	if (this.indiceQuemado >= 100) {
		console.log("Se quemo por completo el " + this.info());
	} else if (!detalle) {
		console.log(this.info());
	} else {
		console.log(detalle + " " + this.info());
	}
}
Arbol.prototype.info = function() {
	return "area id: " + this.idArea + " arbol id: " + this.id + " indiceQuemado: " + this.indiceQuemado;
}

/* Sensor */
var SensorHumo = function() {
	this.encendido = false;
}
SensorHumo.prototype.encender = function() {
	this.encendido = true;
}
SensorHumo.prototype.lanzarAlarma = function() {
	if (this.encendido) {
		// TODO: Notificar al Parque de Bomberos
	}
}

/* Viento */
var Viento = function(velocidad) {
	this.velocidad = velocidad;
}

/* Utility functions */
function crearAreas(numeroAreas) {
	var areas = [];

	for (var i = 0; i < numeroAreas; i++) {
		var area = new Area(i);
		area.arboles = crearArboles(i, numeroArboles);
		areas.push(area);
	}

	return areas;
}
function crearArboles(idArea, numeroArboles) {
	var arboles = [];

	for (var i = 0; i < numeroArboles; i++) {
		var arbol = null;
		if (0 == (i%15)) {
			var sensorHumo = new SensorHumo();
			arbol = new Arbol(i, idArea, sensorHumo);
		} else {
			arbol = new Arbol(i, idArea, null);
		}
		
		arboles.push(arbol);
	}

	return arboles;
}
function crearVisitantes(numeroVisitantes) {
	var visitantes = [];

	for (var i = 0; i < numeroVisitantes; i++) {
		var visitante = new Visitante(i, obtenerStringAleatorio(nombres), sucedePorPorcentajeDel(porcentajeFumador));
		visitantes.push(visitante);
	}

	return visitantes;
}
function crearBomberos(numeroBomberos) {
	var bomberos = [];

	for (var i = 0; i < numeroBomberos; i++) {
		var bombero = new Bombero(obtenerStringAleatorio(nombres));
		bomberos.push(bombero);
	}

	return bomberos;
}

//function fuegoAleatorioPorPorcentajeDel(porcentaje) {
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


/* +++++ Begin Variables +++++ */
var bomberos = crearBomberos(10);
var parqueDeBomberos = new ParqueBomberos(bomberos);

var areas = crearAreas(numeroAreas);

//var visitantes = crearVisitantes(100);

var parqueNatural = new ParqueNatural(areas, parqueDeBomberos);
/* +++++ End Variables +++++ */

console.log(parqueNatural);

/* +++++++++++++++++++++++++++++++++++++++ */
/* Funciones de control */

var cicloParque = function() {
//	console.log("Comienza ciclo");

	var viento = new Viento(obtenerStringAleatorio(velocidades));
	parqueNatural.addViento(viento);

	var visitantes = crearVisitantes(randomBetween(5, 10));
	parqueNatural.addVisitantes(visitantes);

	parqueNatural.seOriginaFuego();

	parqueNatural.moverVisitantes();
}
var cerrarCiclo = function() {
	clearInterval(intervalID);
	console.log("Ya no hay arboles!!!. CERRAMOS 😭");
}
//intervalID = setInterval(cicloParque, 1000);
intervalID = setInterval(function(){parqueNatural.cicloParque()}, 1000);

/* +++++++++++++++++++++++++++++++++++++++ */

