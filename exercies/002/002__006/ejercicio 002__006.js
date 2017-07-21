/*
Ejercicio 002__006

1) Añade un sensor de fuego a uno de cada 15 árboles de forma aleatoria.
En caso de quemarse un árbol con sensor, deberá emitir una notificación al pubsub (mediante evento) 
El parque de bomberos escuchará las notificación y mandará a todos los bomberos al área

2) Cada ciclo que pase un bombero en un área con árboles encendidos, podrá apagar el fuego de 2 árboles.
Cuando se apaguen todos los árboles de un área los bomberos regresarán al parque.

3) Cada ciclo que pase un árbol apagado, pero con quemaduras, este se deberá recuperar un 10% cada ciclo.

4) Añade cierta lógica en el parque de bomberos de manera que si hay más de un fuego, 
los bomberos se dividan entre las áreas afectadas. Para ello el parque tendrá que llevar control
del número de incendios que hay. Para registrarlos lo hará mediante la notificación emitida por los 
sensores. Para saber cuándo se han apagado, recibirán una señal del área indicando que ya está todo apagado.
*/

/* Constantes */
var nombres = ["Ragnar", "Loki", "Lagertha", "Arvid", "Jabari", "Xenon", "Nadezhda", "Nadim", "Tabby", "Radley", "Radcliff", "Oakley", "Eamon", "Hadwin", "Hagan", "Kaden", "Maarku", "Dacey", "Walden", "Sachi"];
var velocidades = [0, 1, 2];
var porcentajeIndiceDeFuego = 10;
var porcentajeFumador = 10;
var indiceQuemado = 10;
var indiceCurar = 10;
var numeroAreas = 8;
var numeroArboles = 100;
var intervalID;
var eventoIncendio = "SE QUEMA!!!";
var regresarAParqueBomberos = "REGRESAMOS!!!";
var agregarNuevaIncidencia = "NUEVA_INCIDENCIA";

/* Parque Natural */
var ParqueNatural = function(areas, parqueDeBomberos) {
	this.areas = areas;
	this.parqueDeBomberos = parqueDeBomberos;
	this.viento = null;
	this.pubsubIncendio = null;
	this.initPubSubIncendio();
}
ParqueNatural.prototype.addViento = function(viento) {
	this.viento = viento;
}
/*ParqueNatural.prototype.seOriginaFuego = function() {
	this.extenderFuego();

	if (sucedePorPorcentajeDel(porcentajeIndiceDeFuego)) {
		var idAreaAleatorio = randomBetween(0, this.totalAreas() - 1);
		var idArbolAleatorio = randomBetween(0, this.totalArbolesPorAreas() - 1);
		
		var arboles = this.obtenerArboles();
		if (arboles.length > 0) {
			for (j = 0; j < arboles.length; j++) {
				var arbol = arboles[j];
				if (arbol.id == idArbolAleatorio && arbol.idArea == idAreaAleatorio && !arbol.estaArdiendo) {
					arbol.quemarse();
				}
			}
		} else {
			cerrarCiclo();
		}
	}

}*/
ParqueNatural.prototype.seOriginaFuego = function() {
	this.extenderFuego();

	for (var i = 0; i < this.areas.length; i++) {
		var area = this.areas[i];
		area.seOriginaFuego();
	}

}
ParqueNatural.prototype.extenderFuego = function() {
	// Encuentra el arbol y lo empieza a quemar
	var arboles = this.obtenerArbolesQuemandose();

	// Empezar de atrás hacía adelante
	if (arboles.length > 0) {
		for (var j = arboles.length - 1; j >= 0; j--) {
			var arbol = arboles[j];
			var arbolesSiguientes = this.obtenerArbolesSiguiente(arbol);
			
			// extender el fuego
			if (arbol.estaArdiendo) {
				if (arbol.quemarse()) {
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
ParqueNatural.prototype.verificarSensoresActivos = function() {
	var arboles = this.obtenerArbolesQuemandose();
	if (arboles.length > 0) {
		for (var i = 0; i < arboles.length; i++) {
			var arbol = arboles[i];
			if (arbol.sensorHumo) {
				arbol.sensorHumo.lanzarAlarma(this.pubsubIncendio, this.obtenerAreaPorId(arbol.idArea));
			}
		}
	}
}
ParqueNatural.prototype.verificarBomberosEnAccion = function() {
	for (var i = 0; i < this.areas.length; i++) {
		var area = this.areas[i];
		if (area.bomberos.length > 0) {
			area.bomberosEnAccion(this.pubsubIncendio);
		}
	}
}
ParqueNatural.prototype.curarArbolesQuemados = function() {
	var arbolesQuemandos = this.obtenerArbolesQuemados();
	if (arbolesQuemandos.length > 0) {
		for (var i = 0; i < arbolesQuemandos.length; i++) {
			arbolesQuemandos[i].curar();
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
			if (arbol.estaArdiendo) {
				arboles.push(arbol);
			}
		}
	}
	return arboles;
}
ParqueNatural.prototype.obtenerArbolesQuemados = function() {
	var arboles = [];
	// Encuentra el arbol y lo empieza a quemar
	for (var i = 0; i < this.areas.length; i++) {
		var area = this.areas[i];
		for (j = 0; j < area.arboles.length; j++) {
			var arbol = area.arboles[j];
			if (!arbol.estaArdiendo && arbol.indiceQuemado > 0) {
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
		if (idAreaActual == totalAreas - 1) {
			if (idArbolActual == totalArbolesPorArea - 1) {
				arbolSiguiente = this.obtenerArbolSiguientePorIdAreaYIdArbol(0, 0);
				idAreaActual = 0;
				idAreaSiguiente = 1;
				idArbolActual = 0;
				idArbolSiguiente = 1;
			} else {
				arbolSiguiente = this.obtenerArbolSiguientePorIdAreaYIdArbol(idAreaActual, idArbolSiguiente);
				//idAreaActual = idAreaActual; // sin cambio
				//idAreaSiguiente = idAreaSiguiente; // sin cambio
				idArbolActual = idArbolSiguiente;
				idArbolSiguiente += 1;
			}
		} else {
			if (idArbolSiguiente == totalArbolesPorArea) {
				arbolSiguiente = this.obtenerArbolSiguientePorIdAreaYIdArbol(idAreaSiguiente, 0);
				idAreaActual = idAreaSiguiente;
				idAreaSiguiente += 1;
				idArbolActual = 0;
				idArbolSiguiente = 1;
			} else {
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
ParqueNatural.prototype.obtenerAreaPorId = function(idArea) {
	return this.areas[idArea];
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
ParqueNatural.prototype.siguienteArea = function(idArea) {
	var areaSiguiente = null;

	var idAreaSiguiente = idArea + 1;
	if (idAreaSiguiente < this.areas.length) {
		areaSiguiente = this.areas[idAreaSiguiente];
	}

	return areaSiguiente;
}
ParqueNatural.prototype.cicloParque = function() {
	var viento = new Viento(obtenerStringAleatorio(velocidades));
	this.addViento(viento);

	var visitantes = crearVisitantes(randomBetween(5, 10));
	this.addVisitantes(visitantes);

	this.seOriginaFuego();

	this.moverVisitantes();

	this.verificarBomberosEnAccion();

	this.curarArbolesQuemados();

	this.verificarSensoresActivos();

	this.pintarEstadoParque();
}
ParqueNatural.prototype.initPubSubIncendio = function() {
	if (!this.pubsubIncendio) {
		this.pubsubIncendio = (function() {
			var suscriptores = {};

			function subcribe(event, callback) {
				if (!suscriptores[event]) {
					var suscriptorArray = [callback];
					suscriptores[event] = suscriptorArray;
				} else {
					suscriptores[event].push(callback);
				}
			}

			function publish(event, data) {
				if (suscriptores[event]) {
					suscriptores[event].forEach(function(callback) {
						callback(data);
					});
				}
			}

			return {
				pub: publish,
				sub: subcribe
			};
		}());
	}				
}
ParqueNatural.prototype.centroDeMando = function() {
	// Se subscribe al ParqueBomberos para detectar incendios
//	this.pubsubIncendio.sub(eventoIncendio, function(area){this.parqueDeBomberos.enviarBomberos(area)});
	// Se subscribe al ParqueBomberos para indicar que se apago un fuego
	this.pubsubIncendio.sub(regresarAParqueBomberos, function(data){this.parqueDeBomberos.regresanBomberos(data)});
	// Subscribir al Parque para dar de alta un nuevo Incidencia
	this.pubsubIncendio.sub(eventoIncendio, function(area){this.parqueDeBomberos.agregarIncidencia(area)});
}
ParqueNatural.prototype.pintarEstadoParque = function(){
    var contenidoParque = ""; 

    for (var i = 0; i < this.areas.length; i++) {
        var area = this.areas[i];
        contenidoParque = contenidoParque + area.getHTML();
    }

    var miparquehtml = document.getElementById("parque");
    miparquehtml.innerHTML = contenidoParque;
}

var Incidencia = function (area) {
	this.area = area;
	this.atendida = false;
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
	this.cargasExtinguidor = 2;
	this.init(nombre, fumador);
}
Bombero.prototype = new Persona();
Bombero.prototype.apagarArboles = function(arboles) {
	if (arboles.length > 0) {
		while(this.cargasExtinguidor > 0) {
			for (var i = 0; i < arboles.length; i++) {
				arboles[i].estaArdiendo = false;
			}
			this.cargasExtinguidor--;
		}
	}
}
Bombero.prototype.recargarExtinguidor = function() {
	this.cargasExtinguidor = 2;
}

var Visitante = function(id, nombre, fumador) {
	this.id = id;
	this.init(nombre, fumador);
}
Visitante.prototype = new Persona();
Visitante.prototype.generarFuego = function() {
	var genereFuego = false;

	if (this.fumador) {
		genereFuego = sucedePorPorcentajeDel(porcentajeIndiceDeFuego);
	}

	return genereFuego;
}

var ParqueBomberos = function(bomberos) {
	this.bomberos = bomberos;
	this.incidencias = [];
}
ParqueBomberos.prototype.agregarIncidencia = function(area) {
	var incidencia = new Incidencia(area);
	this.incidencias.push(incidencia);

	if (this.bomberos.length > 0) {
		for (var i = 0; i < this.incidencias.length; i++) {
			var inci = this.incidencias[i];
			if (!inci.atendida) {
				this.enviarBomberos(area, inci);
			}
		}
	}
}
ParqueBomberos.prototype.enviarBomberos = function(area, inci) {
	// TODO lógica envío bomberos
	console.log("Parque Bomberos Notificados al área " + area.id);
	if (this.bomberos.length > 0) {
		area.entranBomberos(this.bomberos, inci);
		// se quitan todos los bomberos
		this.bomberos = [];
	}
}
//ParqueBomberos.prototype.regresanBomberos = function(bomberos) {
ParqueBomberos.prototype.regresanBomberos = function(data) {
	for (var i = 0; i < data.bomberos.length; i++) {
		this.bomberos.push(bomberos[i]);
	}
	for (var i = 0; i < data.incidencias.length; i++) {
		data.incidencias[i].atendida = true;
	}
	this.incidenciasPendientes();
}
ParqueBomberos.prototype.incidenciasPendientes = function() {
	if (this.bomberos.length > 0) {
		for (var i = 0; i <  this.incidencias.length; i++) {
			var incidencia = this.incidencias[i];
			if (!incidencia.atendida) {
				this.enviarBomberos(incidencia.area, incidencia);
			}
		}
	}
}

/* Area */
var Area = function(id, arboles) {
	this.id = id;
	this.visitantes = [];
	this.bomberos = [];
	this.arboles = arboles;
	this.incidencias = [];
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
Area.prototype.entranBomberos = function(bomberos, incidencia) {
	this.bomberos = bomberos;
	this.incidencias.push(incidencia);
}
Area.prototype.salenBomberos = function() {
	var bomberos = this.bomberos;

	for (var i = 0; i < this.bomberos; i++) {
		this.bomberos.push(this.bomberos[i]);
	}
	this.bomberos = [];
	return bomberos;
}
Area.prototype.obtenerArbolesQuemandoseEnArea = function() {
	var arbolesQuemandos = [];
	for (var i = 0; i < this.arboles.length; i++) {
		var arbol = this.arboles[i];
		if (arbol.estaArdiendo) {
			arbolesQuemandos.push(arbol);
		}
	}

	return arbolesQuemandos;
}
Area.prototype.bomberosEnAccion = function(pubsubIncendio) {
	for (var i = 0; i < this.bomberos.length; i++) {
		var bombero = this.bomberos[i];
		bombero.recargarExtinguidor();
		var arbolesQuemandos = this.obtenerArbolesQuemandoseEnArea();
		if (arbolesQuemandos.length > 0) {
			bombero.apagarArboles(arbolesQuemandos);
		} else {
			// Mandar objeto con bomberos y el area que fue atendida
			var data = {
				bomberos: this.salenBomberos(),
				incidencias: this.incidencias
			}
			//pubsubIncendio.pub(regresarAParqueBomberos, this.salenBomberos());
			pubsubIncendio.pub(regresarAParqueBomberos, data);
		}
	}
}
Area.prototype.getEstadoArea = function() {
	var estado = "";

	var estadoArea = "";
    var estadoVisitantes = "";
    var estadoBomberos = "";
    for (var i = 0; i < this.arboles.length; i++) {
    	var estadoArbol = "";
        if (this.arboles[i].estaArdiendo) {
            estadoArbol = "🔥";
        } else if (this.arboles[i].indiceQuemado > 0) {
        	estadoArbol = "🌱";
        } else {
        	estadoArbol = "🌲";
        }

        estadoArea = estadoArea + estadoArbol + "";
    }

	for (var i = 0; i < this.visitantes.length; i++) {
		if (this.visitantes[i].fumador) {
			estadoVisitantes += "🚬";
		} else {
			estadoVisitantes += "🚶";
		}
	}
	for (var i = 0; i < this.bomberos.length; i++) {
		estadoBomberos += "🚒";
	}
	estado = estadoArea + "\n" + estadoVisitantes + "\n" + estadoBomberos;
    return estado;
}
Area.prototype.imprimirEstadoArea = function() {
    console.log("Estado del área " + this.id);
    console.log(this.getEstadoArea());
    console.log("======================");
}
Area.prototype.getHTML = function(){
    var html = '<div class="area">';
    html = html + '<span class="areaInner">';
    html = html + this.getEstadoArea();
    html = html + '</span>';
    html = html + '</div>';

    return html;
}
Area.prototype.seOriginaFuego = function() {
	for (var i = 0; i < this.visitantes.length; i++) {
		var visitante = this.visitantes[i];
		if (visitante.generarFuego()) {
			var idArbolAleatorio = randomBetween(0, this.arboles.length - 1);
			
			if (this.arboles.length > 0) {
				for (j = 0; j < this.arboles.length; j++) {
					var arbol = this.arboles[j];
					if (arbol.id == idArbolAleatorio && !arbol.estaArdiendo) {
						arbol.quemarse();
					}
				}
			}
		}
	}
}


/* Arbol */
var Arbol = function(id, idArea, sensorHumo) {
	this.id = id;
	this.idArea = idArea;
	this.sensorHumo = sensorHumo;
	this.indiceQuemado = 0
	this.estaArdiendo = false;
}
//Arbol.prototype.quemarse = function() {
Arbol.prototype.quemarse = function(pubsubIncendio, area) {
	var muerto = false;

	this.indiceQuemado += indiceQuemado;
	this.estaArdiendo = true;
	if (this.indiceQuemado >= 100) {
		muerto = true;
	}

	if (this.sensorHumo) {
		//pubsubIncendio.pub(eventoIncendio, this.idArea);
		this.sensorHumo.encender();
	}

	return muerto;
}
Arbol.prototype.curar = function() {
	if (!this.estaArdiendo && this.indiceQuemado > 0) {
		this.indiceQuemado -= indiceCurar;
	}
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
SensorHumo.prototype.lanzarAlarma = function(pubsubIncendio, area) {
	if (this.encendido) {
		// TODO: Notificar al Parque de Bomberos
		pubsubIncendio.pub(eventoIncendio, area);
	}
}
SensorHumo.prototype.apagar = function() {
	this.encendido = false;
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
parqueNatural.centroDeMando();
/* +++++ End Variables +++++ */

console.log(parqueNatural);

/* +++++++++++++++++++++++++++++++++++++++ */
/* Funciones de control */

function emitirAlarma() {
    var audio = new Audio('fire-alarm-short.mp3');
    audio.play();
}

var cerrarParqueNatural = function() {
	clearInterval(intervalID);
	console.log("Ya no hay arboles!!!. CERRAMOS 😭");
}
//intervalID = setInterval(cicloParque, 1000);
var abrirParqueNatural = function() {
	intervalID = setInterval(function(){parqueNatural.cicloParque()}, 1000);
}

/* +++++++++++++++++++++++++++++++++++++++ */

