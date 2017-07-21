// Zoo
var zoo = {
	nombre: "Mecha Zoo",
	ubicacion: {},
	areas: [],
	aforo: 1000,
	horario: {}
};
// Ubicación
var ubicacion = {
	direcion: "Av. de los Olvidos #543",
	colonio: "Tras lomita",
	ciudad: "CDMX",
	pais: "México",
	codigoPostal: "62539"
};
// Horario
var horario = {
	horaApertura: "10:00",
	horaCerrar: "18:00"
};

function crearArea(nombre, aforo, accesoPorPago) {
	var area = {
		nombre: nombre,
		aforoMaximoZona: aforo,
		recintos: [],
		accesoPorPago: accesoPorPago
	};
	return area;
}

function crearRecinto(nombre) {
	var recinto = {
		nombre: nombre,
		animales: []
	};
	return recinto;
}

function crearAnimal(nombre, especie, salud, hambre, tipoAlimentacion) {
	var animal = {
		nombre: nombre,
		especie: especie,
		salud: salud,
		hambre: hambre,
		tipoAlimentacion: tipoAlimentacion
	};
	return animal;
}
// ++++ Area Mamiferos ++++
var areaMamiferos = crearArea("Mamiferos", 50, true);
var recintoLeones = crearRecinto("Leones");
recintoLeones.animales.push(crearAnimal("Leon 1", "leon", 100, 0, "carnívoro"));
recintoLeones.animales.push(crearAnimal("Leon 2", "leon", 100, 0, "carnívoro"));
var recintoCamellos = crearRecinto("Camellos");
recintoCamellos.animales.push(crearAnimal("Camello 1", "camello", 100, 0, "herbívoro"));
recintoCamellos.animales.push(crearAnimal("Camello 2", "camello", 100, 0, "herbívoro"));

areaMamiferos.recintos.push(recintoLeones);
areaMamiferos.recintos.push(recintoCamellos);

/*
var areaMamiferos = {
	nombre: "Mamíferos",
	aforoMaximoZona: 50,
	recintos: [],
	accesoPorPago: false
};
// Recinto Leones
var recintoMamLeones = {
	nombre: "Leones",
	animales: []
};
var leon1 = {
	nombre: "Leon 1",
	especie: "leon",
	salud: 100,
	hambre: 100,
	tipoAlimentacion: "carnívoro",
};
var leon2 = {
	nombre: "Leon 2",
	especie: "leon",
	salud: 100,
	hambre: 100,
	tipoAlimentacion: "carnívoro",
};
recintoMamLeones.animales.push(leon1);
recintoMamLeones.animales.push(leon2);
// Recinto Camellos
var recintoMamCamellos = {
	nombre: "Camellos",
	animales: []
};
var camello1 = {
	nombre: "Camello 1",
	especie: "camello",
	salud: 100,
	hambre: 100,
	tipoAlimentacion: "carnívoro",
};
var camello2 = {
	nombre: "Cammello 2",
	especie: "camello",
	salud: 100,
	hambre: 100,
	tipoAlimentacion: "carnívoro",
};
recintoMamCamellos.animales.push(camello1);
recintoMamCamellos.animales.push(camello2);

areaMamiferos.recintos.push(recintoMamLeones);
areaMamiferos.recintos.push(recintoMamCamellos);
// ++++ Area Mamiferos ++++

// ++++ Area Aves ++++
var areaAves = {
	nombre: "Aves",
	aforoMaximoZona: 50,
	recintos: [],
	accesoPorPago: false
};
// Recinto Aguilas
var recintoAvesAguilas = {
	nombre: "Aguilas",
	animales: []
};
var aguila1 = {
	nombre: "Aguila 1",
	especie: "aguila",
	salud: 100,
	hambre: 100,
	tipoAlimentacion: "carnívoro",
};
var aguila2 = {
	nombre: "Aguila 2",
	especie: "aguila",
	salud: 100,
	hambre: 100,
	tipoAlimentacion: "carnívoro",
};
recintoAvesAguilas.animales.push(aguila1);
recintoAvesAguilas.animales.push(aguila2);
// Recinto Cisnes
var recintoAvesCisnes = {
	nombre: "Cisnes",
	animales: []
};
var cisne1 = {
	nombre: "Cisne 1",
	especie: "cisne",
	salud: 100,
	hambre: 100,
	tipoAlimentacion: "carnívoro",
};
var cisne2 = {
	nombre: "Cisne 2",
	especie: "cisne",
	salud: 100,
	hambre: 100,
	tipoAlimentacion: "carnívoro",
};
recintoAvesCisnes.animales.push(cisne1);
recintoAvesCisnes.animales.push(cisne2);

areaAves.recintos.push(recintoAvesAguilas);
areaAves.recintos.push(recintoAvesCisnes);
// ++++ Area Aves ++++

// ++++ Area Marinos ++++
var areaMarinos = {
	nombre: "Marinos",
	aforoMaximoZona: 50,
	recintos: [],
	accesoPorPago: false
};
// Recinto Delfines
var recintoMarDelfines = {
	nombre: "Delfines",
	animales: []
};
var delfin1 = {
	nombre: "Delfin 1",
	especie: "delfin",
	salud: 100,
	hambre: 100,
	tipoAlimentacion: "carnívoro",
};
var delfin2 = {
	nombre: "Delfin 2",
	especie: "delfin",
	salud: 100,
	hambre: 100,
	tipoAlimentacion: "carnívoro",
};
recintoMarDelfines.animales.push(delfin1);
recintoMarDelfines.animales.push(delfin2);
// Recinto Tiburones
var recintoMarTiburones = {
	nombre: "Tiburones",
	animales: []
};
var tiburon1 = {
	nombre: "Tiburon 1",
	especie: "tiburon",
	salud: 100,
	hambre: 100,
	tipoAlimentacion: "carnívoro",
};
var tiburon2 = {
	nombre: "Tiburon 2",
	especie: "tiburon",
	salud: 100,
	hambre: 100,
	tipoAlimentacion: "carnívoro",
};
recintoMarTiburones.animales.push(tiburon1);
recintoMarTiburones.animales.push(tiburon2);

areaMarinos.recintos.push(recintoMarDelfines);
areaMarinos.recintos.push(recintoMarTiburones);
// ++++ Area Marinos ++++

// ++++ Area Reptiles ++++
var areaReptiles = {
	nombre: "Reptiles",
	aforoMaximoZona: 50,
	recintos: [],
	accesoPorPago: false
};
// Recinto Cocodrilos
var recintoRepCocodrilos = {
	nombre: "Cocodrilos",
	animales: []
};
var coco1 = {
	nombre: "Coco 1",
	especie: "cocodrilo",
	salud: 100,
	hambre: 100,
	tipoAlimentacion: "carnívoro",
};
var coco2 = {
	nombre: "Coco 2",
	especie: "cocodrilo",
	salud: 100,
	hambre: 100,
	tipoAlimentacion: "carnívoro",
};
recintoRepCocodrilos.animales.push(coco1);
recintoRepCocodrilos.animales.push(coco2);
// Recinto Boas
var recintoRepBoas = {
	nombre: "Boas",
	animales: []
};
var boa1 = {
	nombre: "Boa 1",
	especie: "boa",
	salud: 100,
	hambre: 100,
	tipoAlimentacion: "carnívoro",
};
var boa2 = {
	nombre: "Boa 2",
	especie: "boa",
	salud: 100,
	hambre: 100,
	tipoAlimentacion: "carnívoro",
};
recintoRepBoas.animales.push(boa1);
recintoRepBoas.animales.push(boa2);

areaReptiles.recintos.push(recintoRepCocodrilos);
areaReptiles.recintos.push(recintoRepBoas);
// ++++ Area Reptiles ++++

zoo.ubicacion = ubicacion;
zoo.horario = horario;
zoo.areas.push(areaMamiferos);
zoo.areas.push(areaAves);
zoo.areas.push(areaMarinos);
zoo.areas.push(areaReptiles);
*/

zoo.areas.push(areaMamiferos);
console.log(zoo);