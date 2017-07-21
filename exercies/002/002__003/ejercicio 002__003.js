/*
1) realiza una clase ejército que tenga un array de vikingos 

2) realiza una clase soldadoVikingo que herede de vikingo y tenga los métodos necesarios para la lucha 

3) realiza una clase curanderoVikingo que herede de vikingo, añade a la clase ejército un array de curanderos y añade el método resucitar(vikingo), que permitirá recuperar la salud de los soldados muertos en combate. Los curanderos solo podrán resucitar 5 veces

4) añade un método enfrentarEjercitos en la clase batalla, que reciba dos ejércitos y los enfrente entre si.
Enfrentará el primer soldado de cada ejército contra el primer soldado del otro. Cuando mueran vikingos si él ejércitos tiene curanderos, podrán revivir al vikingo.
Si no pueden revivirlo, deberá abandonar el array y pasara a enfrentarse el siguiente 
La batalla acabará cuando uno de los dos ejércitos pierda todos sus soldados.

Parametros de los Vikingos:

Salud: 100
Potencia de ataque: aleatorio entre 1 y 20
Numero de armas: aleatorio entre 1 y 5


Parametros de armas:

NumeroDeAtaques: aleatorio entre 1 y 10
Potencia: aleatorio entre 20 y 50


Ejercito:

Numero de soldados: 25
Numero de curanderos: 5

Curanderos:

vecesQuePuedeCurar: 5 (restaura a un vikingo al 100% de salud)
*/

var intervalID;
var saludDefault = 500;
var numeroHechizos = 5;
var maximoArmas = 5;
var nombreVikingos = ["Ragnar", "Loki", "Lagertha", "Arvid", "Jabari", "Xenon", "Nadezhda", "Nadim", "Tabby", "Radley", "Radcliff", "Oakley", "Eamon", "Hadwin", "Hagan", "Kaden", "Maarku", "Dacey", "Walden", "Sachi"];

var nombreArmas = ["Hacha Vikinga", "Cuchillo Asesino", "Espadon", "Espada Corta", "Lanza Corta", "Martillo de Thor", "Porra de Clavos", "Hacha Doble", "Daga Venenosa", "Cuchillas Arrojadizas"];


/* Vikingo */ 
var Vikingo = function() {
	this._nombre = "nombre";
	this._salud = 0;
}
Vikingo.prototype.init = function(nombre, salud) {
	this._nombre = nombre;
	this._salud = salud;
}
/* Soldado Vikingo */
var SoldadoVikingo = function (nombre, salud, potenciaAtaque, velocidad, maximoArmas) {
	// Init del padre
	this.init(nombre, salud);
	this._potenciaAtaque = potenciaAtaque;
	this._velocidad = velocidad;
	this._maximoArmas = maximoArmas;
	this._armas = [];
	this._recusitado = false;
}
SoldadoVikingo.prototype = new Vikingo();
SoldadoVikingo.prototype.atacar = function(vikingo) {
	var potenciaAtaque = 0;
	var arma = this.escogerMejorArma(this._armas);

	potenciaAtaque = this.usarArma(arma);

	vikingo._salud -= potenciaAtaque;
	console.log("Vikingo " + this._nombre + " le ha hecho un daño de " + potenciaAtaque + "" + (arma ? " con arma " + arma._tipo : "") + " a " + vikingo._nombre);
	
	if (arma) {
		arma.desgaste();
		if (arma._durabilidad == 0) {
			this.abandonarArma(arma);
		}
	}
}
SoldadoVikingo.prototype.escogerMejorArma = function(armas) {
	var arma = null;

	if (!armas || armas.length > 0) {
		var potenciaAtaque = 0;
		for (var a = 0; a < armas.length; a++) {
			if (potenciaAtaque <= armas[a]._potenciaAtaque) {
				potenciaAtaque = armas[a]._potenciaAtaque;
				arma = armas[a];
			}
		}
	}

	return arma;
}
SoldadoVikingo.prototype.usarArma = function(arma) {
	var nuevaPotenciaAtaque = this._potenciaAtaque;
	if (arma) {
		nuevaPotenciaAtaque = arma._potenciaAtaque;
	}
	return nuevaPotenciaAtaque;
}
SoldadoVikingo.prototype.addArma = function(arma) {
	this._armas.push(arma);
}
SoldadoVikingo.prototype.abandonarArma = function(arma) {
	var indice = this._armas.indexOf(arma);
	this._armas.splice(indice, 1);
	console.log("Arma " + arma._tipo + " desechada.");
}

/* Curandero Vikingo */
var CuranderoVikingo = function(nombre, salud, numeroHechizos) {
	this.init(nombre, salud);
	this._numeroHechizos = numeroHechizos;
}
CuranderoVikingo.prototype = new Vikingo();
CuranderoVikingo.prototype.resucitar = function(soldadoVikingo) {
	var resucitado = false;
	if (!soldadoVikingo._recusitado) {
		soldadoVikingo._salud = saludDefault;
		soldadoVikingo._recusitado = true;
		this._numeroHechizos -= 1;
		resucitado = true;
	}	
	return resucitado;
}

/* ++++ Ejercito ++++ */
var Ejercito = function(nombre, soldados, curanderos, armas) {
	this._nombre = nombre;
	this._soldados = soldados;
	this._curanderos = curanderos;
	this._armas = armas;
	this.prepararEjercito();
}
//Ejercito.prototype.ordenarSoldadosMenosPoderosos = function() {
Ejercito.prototype.ordenarSoldadosPor = function(criterio) {
	this._soldados.sort(criterio);
}
//Ejercito.prototype.ordenarPorArmasMasPoderosa = function() {
Ejercito.prototype.ordenarPorArmasPor = function(criterio) {
	this._armas.sort(criterio);
}
function compareMejor(a,b) {
	if (a._potenciaAtaque > b._potenciaAtaque) {
	    return -1;
	}
  	if (a._potenciaAtaque < b._potenciaAtaque) {
	    return 1;
	}
  	return 0;
}
function comparePeor(a,b) {
	if (a._potenciaAtaque < b._potenciaAtaque) {
	    return -1;
	}
  	if (a._potenciaAtaque > b._potenciaAtaque) {
	    return 1;
	}
  	return 0;
}
Ejercito.prototype.asignarArmas = function() {
	// TODO: Asignación de armas
	//this.ordenarPorArmasMasPoderosa();
	//this.ordenarSoldadosMenosPoderosos();
	this.ordenarPorArmasPor(compareMejor);
	this.ordenarSoldadosPor(comparePeor);

	for (s = 0; s < this._soldados.length; s++) {
		var soldado = this._soldados[s];
		for (maxArmas = 0; maxArmas < soldado._maximoArmas; maxArmas++) {
			var arma = this.asignarArma();
			soldado.addArma(arma);
		}
	}
}
Ejercito.prototype.asignarArma = function() {
	var arma = null;
	var a = -1;
	while(!arma) {
		a++;
		arma = this._armas[a];
	}
	this._armas.splice(a, 1);

	return arma;
}
Ejercito.prototype.resucitarVikingos = function() {
	// TODO: Aquí los curanderos revisaron a los Soldados
	
	if (this._curanderos && this._curanderos.length > 0) {
		// TODO: Aquí valida a quienes cura
	}
}
Ejercito.prototype.planDeAtaque = function() {
	this.ordenarSoldadosPor(compareMejor);
}
Ejercito.prototype.escogerSoldado = function() {
	var soldado = null;

	this.planDeAtaque();

	if (this._soldados && this._soldados.length > 0) {
		//for (var s1 = 0; s1 < this._soldados.length; s1++) {
		var s1 = 0;
		while (!soldado) {
			soldado = this._soldados[s1];
			s1++;
		}
	}

	return soldado;
}
Ejercito.prototype.escogerCurandero = function() {
	var curandero = null;

	if (this._curanderos && this._curanderos.length > 0) {
		//for (var s1 = 0; s1 < this._curanderos.length; s1++) {
		var c1 = 0;
		while (!curandero) {
			curandero = this._curanderos[c1];
			c1++;
		}
	}

	return curandero;
}
Ejercito.prototype.revisarSoldado = function(soldado) {
	var soldadoBien = false;
	var curandero = this.escogerCurandero();
	if (curandero) {
		if (soldado._salud <= 0) {
			if (!curandero.resucitar(soldado)) {
				this.abandonaSoldado(soldado);
				this.revisarCurandero(curandero);
			} else {
				console.log("Soldado " + soldado._nombre + " resucitado!!!. Regresa a la batalla!!!");
				soldadoBien = true;
			}
		}
	}
	return soldadoBien;
}
Ejercito.prototype.revisarCurandero = function(curandero) {
	if (curandero._numeroHechizos <= 0) {
		var indice = this._curanderos.indexOf(curandero);
		this._curanderos.splice(indice, 1);
		console.log("Curandero " + curandero._nombre + " abandono pelea.");
	}
}
Ejercito.prototype.abandonaSoldado = function(soldado) {
	if (soldado._salud <= 0) {
		var indice = this._soldados.indexOf(soldado);
		this._soldados.splice(indice, 1);
		console.log("Soldado " + soldado._nombre + " abandono pelea.");
	}
}
Ejercito.prototype.prepararEjercito = function() {
	this.asignarArmas();
}

/* ++++ Arma ++++ */ 
var Arma = function(tipo, potenciaAtaque, durabilidad) {
	this._tipo = tipo;
	this._potenciaAtaque = potenciaAtaque;
	this._durabilidad = durabilidad;
}
Arma.prototype.desgaste = function() {
	this._durabilidad -= 1;
}

//var Batalla = function(vikingo1, vikingo2) {
//	this._vikingo1 = vikingo1;
//	this._vikingo2 = vikingo2;
//}
var Batalla = function(ejercitoUno, ejercitoDos) {
	this._vikingo1 = null;
	this._vikingo2 = null;
	this.ejercitoUno = ejercitoUno;
	this.ejercitoDos = ejercitoDos;
}
//Batalla.prototype.iniciarPelea = function() {
Batalla.prototype.iniciarPelea = function(vikingo1, vikingo2) {
	this._vikingo1 = vikingo1;
	this._vikingo2 = vikingo2;

	var ganador = null;
	var perdedor = null;
	
	//var vikingoRapido = null;
	//var vikingoLento = null;
	console.log("=== Comieza Pelea ===");
	console.log("Pelearan: " + this._vikingo1._nombre + " salud " + this._vikingo1._salud + " " + this._vikingo2._nombre + " salud " + this._vikingo2._salud);

	var turno = 0;
	var velocidadPelea = 150;
	var v1 = this._vikingo1._velocidad;
	var s1 = 0;
	var delay1 = velocidadPelea - v1;
	var v2 = this._vikingo2._velocidad;
	var s2 = 0;
	var delay2 = velocidadPelea - v2;
	while(!ganador) {
		//console.log("=== Asalto: " + turno + " ===="); 
		s1++;
		s2++;

		//if (s1 == v1) {
		if (delay1 <= s1) {
			this._vikingo1.atacar(this._vikingo2);
			s1 = 0;
			console.log("Resumen asalto: " + this._vikingo1._nombre + " salud " + this._vikingo1._salud + " " + this._vikingo2._nombre + " salud " + this._vikingo2._salud);
		}
		//if (s2 == v2) {
		if (delay2 <= s2) {
			this._vikingo2.atacar(this._vikingo1);
			s2 = 0;
			console.log("Resumen asalto: " + this._vikingo1._nombre + " salud " + this._vikingo1._salud + " " + this._vikingo2._nombre + " salud " + this._vikingo2._salud);
		}
		ganador = this._vikingo1._salud <= 0 ? this._vikingo2 : this._vikingo2._salud < 0 ? this._vikingo1 : null;
		if (ganador) {
			perdedor = this._vikingo1._salud <= 0 ? this._vikingo1 : this._vikingo2._salud <= 0 ? this._vikingo2 : null;
		}

		var s1Ok = ejercitoUno.revisarSoldado(this._vikingo1);
		var s2Ok = ejercitoDos.revisarSoldado(this._vikingo2);
		
		turno++;
	}	
	
	console.log("=== Finalizo Pelea ===");
	console.log("Ganó " + ganador._nombre);
	console.log("Perdió " + perdedor._nombre);
	/*return {
		ganador: ganador,
		perdedor: perdedor
	};*/
}
//Batalla.prototype.enfrentarEjercitos = function(ejercitoUno, ejercitoDos) {
Batalla.prototype.enfrentarEjercitos = function() {
	console.log("+++++ Empieza Batalla +++++");
	console.log("Ejercito: "  + ejercitoUno._nombre + " y el Ejercito: " + ejercitoDos._nombre);

	//this.ejercitoUno.asignarArmas();
	//this.ejercitoDos.asignarArmas();

	var soldadoEjercitoUno = null;
	var curanderoEjercitoUno = null;
	var soldadoEjercitoDos = null;
	var curanderoEjercitoDos = null;
	while (this.ejercitoUno._soldados.length > 0 && this.ejercitoDos._soldados.length > 0) {
		soldadoEjercitoUno = this.ejercitoUno.escogerSoldado();
		soldadoEjercitoDos = this.ejercitoDos.escogerSoldado();

		this.iniciarPelea(soldadoEjercitoUno, soldadoEjercitoDos);

	}
	var ejercitoVencedor = this.ejercitoUno._soldados.length > 0 ? this.ejercitoUno._nombre : this.ejercitoDos._soldados.length > 0 ? this.ejercitoDos._nombre : "Empate";
	console.log("+++++ Acabo Batalla +++++");
	console.log("Ejercito vencedor es " + ejercitoVencedor);
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* +++ Declaración de Ejercito 1 */
var hachaVikinga = new Arma("Hacha Vikinga", 40, 6);
var espadon = new Arma("Espadon", 50, 7);
// Soldados
var ragnar = new SoldadoVikingo("Ragnar", saludDefault, 15, 60);
ragnar.addArma(hachaVikinga);
ragnar.addArma(espadon);
// Curanderos
/* +++ Declaración de Ejercito 1 */
var cuchilloAsesino = new Arma("Cuchillo Asesino", 22, 9);
var espadaCorta = new Arma("Espada Corta", 30, 8);
// Soldados
var lagerta = new SoldadoVikingo("Lagertha", saludDefault, 8, 100);
lagerta.addArma(cuchilloAsesino);
lagerta.addArma(espadaCorta);
// Curanderos


// Crear Ejercitos
var ejercitoUno = crearEjercito("Mensajeros del Mal", 25, 5, 150);
var ejercitoDos = crearEjercito("Ázote de Dioses", 25, 5, 150);


/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

function crearEjercito(nombre, numeroSoldados, numeroCuranderos, numeroArmas) {
	var ejercito = null

	soldados = crearSoldadosVikingos(numeroSoldados);
	curanderos = crearCuranderosVikingos(numeroCuranderos);
	armas = crearArmas(numeroArmas);
	ejercito = new Ejercito(nombre, soldados, curanderos, armas);

	console.log("Ejercito " + nombre + " creado!!!");
	return ejercito;
}

function crearArmas(numeroArmas) {
	var armas = [];

	for (var a = 0; a < numeroArmas; a++) {
		var arma = new Arma(obtenerNombreRandom(nombreArmas), randomBetween(20, 50), randomBetween(0, 10));
		armas.push(arma);
	}

	return armas;
}

// Function para clonar objetos utilizando Json
function cloneObject(object){
	var cloned = JSON.parse(JSON.stringify(object));
	return cloned;
}

function crearSoldadosVikingos(numeroSoldados) {
	var soldadosVikingos = [];

	for (sv = 0; sv < numeroSoldados; sv++) {
		var soldadoVikingo = new SoldadoVikingo(obtenerNombreRandom(nombreVikingos), saludDefault, randomBetween(0, 20), randomBetween(1, 100), randomBetween(1, 5));
		soldadosVikingos.push(soldadoVikingo);
	}

	return soldadosVikingos;
}

function crearCuranderosVikingos(numeroCuranderos) {
	var curanderosVikingos = [];

	for (sv = 0; sv < numeroCuranderos; sv++) {
		var curanderoVikingo = new CuranderoVikingo(obtenerNombreRandom(nombreVikingos), saludDefault, numeroHechizos);
		curanderosVikingos.push(curanderoVikingo);
	}

	return curanderosVikingos;
}

function obtenerNombreRandom(nombres) {
	var numeroAleatorio = Math.floor(Math.random() * nombres.length);
	return nombres[numeroAleatorio];
}

function randomBetween(x, y) {
	return Math.floor(Math.random() * y) + x;
}

//var batalla = new Batalla(ragnar, lagerta);
//batalla.iniciarPelea();
var batalla = new Batalla(ejercitoUno, ejercitoDos);
//batalla.iniciarPelea(ragnar, lagerta);
batalla.enfrentarEjercitos();

