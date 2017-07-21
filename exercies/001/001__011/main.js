var log = x => console.log(x);

var nombresPersonas = ["Víctor", "Omar", "Karen", "Ariel", "Omar", "David", "Esteban", "Matias", "Vlairner", "Lucy", "Ignacio", "Humberto", "Néstor", "Daniel", "Raymundo", "Fran"];

var zoo = {
	nombre: "El último zoológico",
	ubicacion: {},
	areas: [],
	aforo: 70,
	numeroVisitantes: 0,
	caja: 20000,
	enfermeria: {}
};

var ubicacion = {
	dirreccion: "Calle de los animalitos 123",
	ciudad: "Ciudad de México",
	pais: "México",
	telefono: 999888777
}

var enfermeria = {
	pacientes: [],
	tratarAnimales: tratarAnimales
};

function crearPaciente(animal, recinto) {
	var paciente = {
		animal: animal,
		recinto: recinto
	}
	return paciente;
}

function area(nombre, aforo, recintos, animales){
	return {
		nombre: nombre,
		aforoMaximo: aforo,
		recintos: recintos,
	};
}

function recintoDetalles(nombre, animales, capacidad, detalle){
	return {
		nombre: nombre,
		animales: animales,
		capacidad: capacidad,
		detalle: detalle,
		visitantes: []
	};
}

function animales(nombre, especie, salud, hambre, pais){
	return {
		nombre: nombre,
		especie: especie,
		salud: salud,
		hambre: hambre,
		pais: pais,
		estaEnformo: false
	};
}

var tigreBlanco = animales("Tigre Blanco", "Felino", 100, 0, "Egipto");
var tigreNormal = animales("Tigre", "Felino", 100, 0, "Africa");

var palomas = animales("Palomas", "Avis Chilensis", 100, 0, "Chile");
var flamencos = animales("Flamenco", "Phoenicopteridae", 100, 0, "Colombia");

var tigres = [];
tigres.push(tigreBlanco, tigreNormal);

var aves = [];
aves.push(palomas, flamencos);

var recinto1 = recintoDetalles("Jaula de tigres", tigres, 25, "Jaula super reforzada con titanium");
var recinto2 = recintoDetalles("Baños", [], 20, "Baños para hombres y mujeres, aptos para personas con discapacidad");
var recinto3 = recintoDetalles("Jaula para aves", aves, 25, "Algunas aves que se pelean a seguido");

var recintoTigres = [];
recintoTigres.push(recinto1, recinto2);

var recintoAves = [];
recintoAves.push(recinto3);

var area1 = area("Mamíferos", 5000, recintoTigres);
calcularCapacidadArea(area1);
var area2 = area("Aves", 200, recintoAves);
calcularCapacidadArea(area2);

zoo.ubicacion = ubicacion;
zoo.areas.push(area1, area2);
calcularCapacidadZoo(zoo);

zoo.enfermeria = enfermeria;

log(zoo);










// representa el paso de 1h en el zoo
function ejecutarCiclo() {
	console.log("Aforo: " + zoo.aforo + " número visitantes: " + zoo.numeroVisitantes + " caja: " + zoo.caja)

	moverVisitantesANuevoRecinto();

	//addPersona();
	addPersonas();

	enfermeria.tratarAnimales();

	modificarSaludATodosLosAnimales();

	agregarHambreATodosLosAnimales();

//	console.log("Ciclo ejecutado");
	console.log("===================");
}

function addPersonas() {
	var numeroAleatorio = Math.floor(Math.random() * 15);
	for (var p = 0; p < numeroAleatorio; p++) {
		addPersona();
	}
}

// añade una persona al parque
function addPersona() {

	if (zoo.numeroVisitantes < zoo.aforo) {
		// Creamos una persona nueva, le cobramos y le introducimos en el parque
		//var persona = crearPersona(generarNombreAleatorio(), 500, generarEdadAleatoria(), esEstudianteAleatorio());
		var persona = crearPersona(generarNombreAleatorio(), generarDineroAleatorio(), generarEdadAleatoria(), esEstudianteAleatorio());
		try {
			cobrarEntrada(persona);

			var recintoLibre = primerRecintoLibre();
			recintoLibre.visitantes.push(persona);

			zoo.numeroVisitantes++;
		} catch(e) {
			console.error(e);
		}
	} else {
		// Podemos colgar cartel de lleno
		console.error("El Zoo está lleno.");
		cerrarZoo();
	}
	
}

function liberarRecintos() {
	for (var a = 0; a < zoo.areas.length; a++) {
		var area = zoo.areas[a];
		
		for (var r = 0; r < area.recintos.length; r++) {
			var recinto = area.recintos[r];
			var numeroVisitantes = recinto.visitantes.length;
			if (numeroVisitantes > 0) {
				recinto.visitantes = [];
				zoo.numeroVisitantes = zoo.numeroVisitantes - numeroVisitantes;
			}
		}
	}
}

function moverVisitantesANuevoRecinto() {
	var recintos = todosLosRecintos();
/*
	for (var r = 0; r < recintos.length; r++) {
		var recinto = recintos[r];
		for (var v = 0; v < recinto.visitantes.length; v++) {
			var visitante = recinto.visitantes[v];
			recinto.visitantes.splice(v, 1);
		}
	}
*/
	for (var r = recintos.length - 1; r >= 0; r--) {
		var recinto = recintos[r];
		for (var v = 0; v < recinto.visitantes.length; v++) {
			var visitante = recinto.visitantes[v];
			if (r + 1 < recintos.length) {
				//recinto.visitantes.splice(v, 1);
				var sigRecinto = recintos[r + 1];
				sigRecinto.visitantes.push(visitante);
			} else if (r + 1 == recintos.length) {
				//recinto.visitantes.splice(v, 1);
				zoo.numeroVisitantes -= 1;
			}
			recinto.visitantes.splice(v, 1);
				
		}
	}
}

function generarNombreAleatorio() {
	var numeroAleatorio = Math.floor(Math.random() * nombresPersonas.length);
	return nombresPersonas[numeroAleatorio];
}

function generarEdadAleatoria() {
	var edad = Math.floor(Math.random() * 100);
	return edad;
}

function esEstudianteAleatorio() {
	var esEstudiante = Math.round(Math.random() * 1);
	return esEstudiante;
}

function generarDineroAleatorio() {
	var dineroAleatorio = Math.floor(Math.random() * 500);
	return dineroAleatorio;
}


function cobrarEntrada(persona) {
	// importe por defecto
	var importeEntrada = 5;
	if (persona.edad < 14 || persona.edad > 65) {
		importeEntrada = 0;
	} else if (persona.estudiante = 1) {
		importeEntrada = 3;
	}

	// BONUS: validar si tiene dinero la persona (generarAleatoriamente)
	if (persona.cartera >= importeEntrada) {
		persona.cartera = persona.cartera - importeEntrada;
		zoo.caja = zoo.caja + importeEntrada;
	} else {
		throw "La persona no tiene dinero.";
	}
}

// "Constructor de personas"
function crearPersona(nombre, cartera, edad, estudiante) {
	var persona = {
		nombre: nombre,
		cartera: cartera,
		edad: edad,
		estudiante: estudiante
	}
	return persona;
}

function todosLosRecintos() {
	var recintos = [];
	for (var a = 0; a < zoo.areas.length; a++) {
		var area = zoo.areas[a];
		
		for (var r = 0; r < area.recintos.length; r++) {
			recintos.push(area.recintos[r]);
		}
	}
	return recintos;
}
function getRecinto(index) {
	var recintos = todosLosRecintos();
	if (index < recintos.length) {
		var recinto = recintos[index];
	} else {
		throw "No hay un recinto con indice: " + index;
	}
	return recinto;
}

function primerRecintoLibre() {
	var recintoLibre = null;

/*
	for (var a = 0; a < zoo.areas.length; a++) {
		var area = zoo.areas[a];
		
		for (var r = 0; r < area.recintos.length; r++) {
			var recinto = area.recintos[r];
			
			if (recinto.visitantes.length < recinto.capacidad) {
				recintoLibre = recinto;
			}
		}
	}
	*/
	recintoLibre = getRecinto(0);

	return recintoLibre;
}

function calcularCapacidadZoo(zoo) {
	var capacidadZoo = 0;
	for (var a = 0; a < zoo.areas.length; a++) {
		var area = zoo.areas[a];
		capacidadZoo += area.aforoMaximo;
	}
	zoo.aforo = capacidadZoo;
//	return capacidadZoo;
}

function calcularCapacidadArea(area) {
	var capacidadArea = 0;
	for (var r = 0; r < area.recintos.length; r++) {
		var recinto = area.recintos[r];
		capacidadArea += recinto.capacidad;
	}
	area.aforoMaximo = capacidadArea;
//	return capacidadArea;
}


var intervalID = setInterval(ejecutarCiclo, 1000);

/* 
1) Crear funcion para cerrar zoo
- Parar intervalo
- Sacar a todas las personas del zoo

2) Crear función modificarSaludAleatoria(animal) que de manera aleatoria sume o reste salud a un animal aleatorio entre -20 o +20 (máximo de salud es 100).

3) En cada ciclo ejecutar la función de modificarSaludAleatoria() para todos los animales, si alguno baja de 50 de salud, deberá ir a la enfermeria

4) En la enfermeria en cada ciclo los animales recuperan 10 de salud (no se aplica modificarSaludAleatoria()).

5) Si el animal llega a 100 de salud deberá volver a su área (debemos saber a qué área pertenece).

6) Crear función addHambre() que en cada ciclo sume 10 al hambre de un animal. Cuando llegue a 100 el animal estará muy hambriento y deberá ser alimentado. Al alimentar un animal su hambre pasa a 0 y al zoo le cuesta 1000$.

7) Si el zoo no tiene dinero para alimentar a los animales, no podrá hacerlo. Cuando un animal tenga más de 150 de hambre, se comerá a un visitante. El zoo se quedará con su cartera.

8) En cada ciclo los visitantes deberán cambiar al siguiente recinto. Cuando hayan visitado todos abandonarán el parque.
*/


function cerrarZoo() {
	liberarRecintos();

	clearInterval(intervalID);
}

function agregarHambreATodosLosAnimales() {
	for (var a = 0; a < zoo.areas.length; a++) {
		var area = zoo.areas[a];
		for (var r = 0; r < area.recintos.length; r++) {
			var recinto = area.recintos[r];
			if (recinto.animales != null) {
				for (var ani = 0; ani < recinto.animales.length; ani++) {
					var animal = recinto.animales[ani];
					addHambre(animal, recinto);
				}		
			}
		}
	}

	if (enfermeria.pacientes != null || enfermeria.pacientes.length > 0) {
		for (var p = 0; p < enfermeria.pacientes.length; p++) {
			var paciente = enfermeria.pacientes[p];
			addHambre(paciente.animal, paciente.recinto);
		}
	}
}

function modificarSaludATodosLosAnimales() {
	var numeroDeAlimalesEnRecintos = 0;
	console.log("=== Detalle Recintos ===");
	for (var a = 0; a < zoo.areas.length; a++) {
		var area = zoo.areas[a];
		for (var r = 0; r < area.recintos.length; r++) {
			var recinto = area.recintos[r];
			if (recinto.animales != null) {
				numeroDeAlimalesEnRecintos += recinto.animales.length;

				for (var ani = 0; ani < recinto.animales.length; ani++) {
					var animal = recinto.animales[ani];
					
					modificarSaludAleatoria(animal);
					//addHambre(animal, recinto);

					printStatusAnimal("Animal", animal.nombre, animal.salud, animal.hambre, recinto.nombre);
					
					if (animal.estaEnformo) {
						llevarATratamiento(ani, animal, recinto);
						numeroDeAlimalesEnRecintos -= 1; 
					}
				}
			}
		}
	}
	console.log("Número de animales en recintos: " + numeroDeAlimalesEnRecintos);
}

function modificarSaludAleatoria(animal) {
	var numeroAleatorio = (Math.floor(Math.random() * 40) - 20);

	if (!animal.estaEnformo) {
		animal.salud = animal.salud + numeroAleatorio;
		if (animal.salud > 100) {
			animal.salud = 100;
		} else if (animal.salud <= 50) {
			animal.estaEnformo = true;
		}
	}
	
}

function llevarATratamiento(idAnimal, animal, recinto) {
	var paciente = crearPaciente(animal, recinto);
	enfermeria.pacientes.push(paciente);
	recinto.animales.splice(idAnimal, 1);
}

function darDeAltaPaciente(idPaciente, paciente) {
	paciente.recinto.animales.push(paciente.animal);
	enfermeria.pacientes.splice(idPaciente, 1);
}

function tratarAnimales() {
	console.log("=== Detalle Enfermería ===");
	if (enfermeria.pacientes != null || enfermeria.pacientes.length > 0) {
		for (var p = 0; p < enfermeria.pacientes.length; p++) {
			var paciente = enfermeria.pacientes[p];
			
			printStatusAnimal("Paciente", paciente.animal.nombre, paciente.animal.salud, paciente.animal.hambre, paciente.recinto.nombre);

			curarPaciente(p, paciente);
			//addHambre(paciente.animal, paciente.recinto);
		}
	}
	console.log("Número de pacientes en atención: " + enfermeria.pacientes.length);
}

function curarPaciente(idPaciente, paciente) {
	paciente.animal.salud += 10;

	if (paciente.animal.salud >= 100) {
		paciente.animal.estaEnformo = false;
		darDeAltaPaciente(idPaciente, paciente);
	}
}

function addHambre(animal, recinto) {
	animal.hambre += 10;

	var label = "";
	if (animal.estaEnformo) {
		label = "Paciente";
	} else {
		label = "Animal"
	}

	if (animal.hambre >= 100) {
		alimentarAnimal(animal, recinto);
	}
}

function alimentarAnimal(animal, recinto) {
	if (zoo.caja >= 1000) {
		animal.hambre = 0;
		zoo.caja = zoo.caja - 1000;
	} else {
		comerVisitante(animal, recinto);
	}
}

function comerVisitante(animal, recinto) {
	if (recinto.visitantes != null && recinto.visitantes.length > 0) {
		var numeroAleatorio = Math.floor(Math.random() * recinto.visitantes.length);
		var visitante = recinto.visitantes[numeroAleatorio];
		zoo.caja = zoo.caja + visitante.cartera;
		recinto.visitantes.splice(numeroAleatorio, 1);
		zoo.numeroVisitantes = zoo.numeroVisitantes - 1;
		console.log("Se comieron al visitante: " + visitante.nombre + " ganaste: " + visitante.cartera);
	}
}

function printStatusAnimal(label, nombre, salud, hambre, nombreRecinto) {
	console.log(label + ": " + nombre + " salud: " + salud + " hambre: " + hambre + " recinto: " + nombreRecinto);
}

ejecutarCiclo();
//console.log(zoo);



