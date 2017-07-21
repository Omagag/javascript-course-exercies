var intervalID;

var Vikingo = function(nombre, salud, potenciaAtaque, velocidad) {
	this._nombre = nombre;
	this._salud = salud;
	this._potenciaAtaque = potenciaAtaque;
	this._velocidad = velocidad;
	this._armas = [];
}
Vikingo.prototype.atacar = function(vikingo) {
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
Vikingo.prototype.escogerMejorArma = function(armas) {
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
Vikingo.prototype.usarArma = function(arma) {
	var nuevaPotenciaAtaque = this._potenciaAtaque;
	if (arma) {
		nuevaPotenciaAtaque = arma._potenciaAtaque;
	}
	return nuevaPotenciaAtaque;
}
/*
Vikingo.prototype.evadir = function(vikingo) {
	// TODO: El indice de evasión todavía no está bien
	var evadio = false;

	var factorRandom = Math.abs(this._velocidad - vikingo._velocidad);

	var indiceEvasion = (Math.floor(Math.random() * factorRandom) - (factorRandom / 2));

	var miNuevaVelocidad = this._velocidad - indiceEvasion;
	var suNuevaVelocidad = vikingo._velocidad + indiceEvasion;
	//if (miNuevaVelocidad > vikingo._velocidad) {
	if (miNuevaVelocidad > suNuevaVelocidad) {
		evadio = true;
	}
	return evadio;
}
*/
Vikingo.prototype.addArma = function(arma) {
	this._armas.push(arma);
}
Vikingo.prototype.abandonarArma = function(arma) {
	var indice = this._armas.indexOf(arma);
	this._armas.splice(indice, 1);
	console.log("Arma " + arma._tipo + " desechada.");
}

var Arma = function(tipo, potenciaAtaque, durabilidad) {
	this._tipo = tipo;
	this._potenciaAtaque = potenciaAtaque;
	this._durabilidad = durabilidad;
}
Arma.prototype.desgaste = function() {
	this._durabilidad -= 1;
}

var hachaVikinga = new Arma("Hacha Vikinga", 40, 6);
var cuchilloAsesino = new Arma("Cuchillo Asesino", 22, 9);
var espadon = new Arma("Espadon", 50, 7);
var espadaCorta = new Arma("Espada Corta", 30, 8);

var ragnar = new Vikingo("Ragnar", 1000, 15, 60);
ragnar.addArma(hachaVikinga);
ragnar.addArma(espadon);
var lagerta = new Vikingo("Lagertha", 1000, 8, 100);
lagerta.addArma(cuchilloAsesino);
lagerta.addArma(espadaCorta);

var Batalla = function(vikingo1, vikingo2) {
	this._vikingo1 = vikingo1;
	this._vikingo2 = vikingo2;
}
Batalla.prototype.iniciarBatalla = function() {
	var ganador = null;
	var vikingoRapido = null;
	var vikingoLento = null;
	
	console.log("=== Comieza Batalla ===");
	console.log("Pelearan: " + this._vikingo1._nombre + " salud " + this._vikingo1._salud + " " + this._vikingo2._nombre + " salud " + this._vikingo2._salud);

	var turno = 0;
	while(!ganador) {
		console.log("=== Asalto: " + turno + " ===="); 

		if (this._vikingo1._velocidad > this._vikingo2._velocidad) {
			vikingoRapido = this._vikingo1;
			vikingoLento = this._vikingo2;
		} else if (this._vikingo2._velocidad > this._vikingo1._velocidad) {
			vikingoRapido = this._vikingo2;
			vikingoLento = this._vikingo1;
		} else {
			var dado = Math.round(Math.random() * 1);
			if (dado == 0) {
				vikingoRapido = this._vikingo1;
				vikingoLento = this._vikingo2;
			} else {
				vikingoRapido = this._vikingo2;
				vikingoLento = this._vikingo1;
			}
		}

		vikingoRapido.atacar(vikingoLento);
		if (vikingoLento._salud <= 0) {
			ganador = vikingoRapido;
		}
		vikingoLento.atacar(vikingoRapido);
		if (vikingoRapido._salud <= 0) {
			ganador = vikingoLento;
		}
		
		console.log("Resumen asalto: " + this._vikingo1._nombre + " salud " + this._vikingo1._salud + " " + this._vikingo2._nombre + " salud " + this._vikingo2._salud);
		turno++;
	}	
		
	console.log("=== Finalizo Batalla ===");
	console.log("Ganó " + ganador._nombre);
}
Batalla.prototype.reglaDeAtaque = function() {
	
}

var batalla = new Batalla(ragnar, lagerta);
batalla.iniciarBatalla();

