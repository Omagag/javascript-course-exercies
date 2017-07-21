/*
Vamos a completar el ejercicio anterior (010__003):

1) Genera la función ejecutarCiclo() sobre restaurante que se encargue de pintar todo el restaurante. Genera la función iniciarCiclo sobre restaurante que se encargue de llamar a la función anterior cada 2 segundos.

2) Crea la clase Recepción que tenga la propiedad gruposEsperando (será un array de objetos de tipo GrupoPersonas). 
    Crea la clase GrupoPersona que tenga la propiedad integrantes (será un array de objetos de tipo Persona)

3) Crea la función pintar en el objeto Recepción que se encargue de realizar el pintado de la recepción en el HTML. El pintado de la recepción será el pintado de un bloque por cada grupo de personas que esté esperando. El bloque deberá indicar el número de personas que tiene. 

Para el pintado de cada grupo haz uso de una función "pintar" que se encuentre definida en la clase GrupoPersonas.

4) Haz que el restaurante cree y pinte un botón "Traer clientes". El botón deberá llamar a una función traerClientes que esté definida sobre la recepción, esta función deberá generar un nuevo grupo de personas y añadirlo a la propiedad gruposEsperando de la recepción.

5) Haz que el restaurante cree un botón "recibir" que cuando sea pulsado se encargue de pedir a la recepción el primer grupo de personas que esté esperando. Si el restaurante tiene una mesa libre con capacidad suficiente, deberá colocar a los integrantes del grupo en esa mesa.​ Si no tiene ninguna mesa disponible para ese grupo, el grupo se marchará.

6) Cada ciclo los clientes que están sentados en mesas deberán generar órdenes nuevas. Crea un botón TomarNota que al ser pulsado hará que restaurante dé la carta a cada uno de los clientes. Estos escogerán 2 productos y generarán una nueva Orden. Dicha orden será asociada a la mesa en la que se encuentren.
*/
var nombres = ["Víctor", "Omar", "Karen", "Ariel", "Omar", "David", "Esteban", "Matias", "Vlairner", "Lucy", "Ignacio", "Humberto", "Néstor", "Daniel", "Raymundo", "Fran"];
var nombresBebidas = ["Margarita", "Corona", "Agua Jamaica", "Leche", "Café", "Mimosa", "Tequila", "Whisky", "Vodka", "Agua Horchata", "Naranjada", "Limonada", "Lagrimas Negras", "Victoria", "XX Lager", "XX Ambar", "Modelo Especial", "Mojito"];
var nombresComidas = ["Sopa", "Arroz", "Caldo de Pollo", "Hamburguesa", "Enchiladas", "Arrachera", "Ensalada César", "Pastel de Chocolate", "Fresas con Crema", "Crepas con Helado", "Caldo Tlalpeño", "Pozole", "Quesadilla", "Pastel de Chocolate", "Gringas", "Sopesitos"];
var cargos = ["encargado", "mozo"];
var tipoComidas = ["entrante", "principal", "postre"];


class Persona {
	constructor(nombre) {
		this.nombre = nombre;
		this.edad = 0;
		this.icon = "👤";
		this.setEdad(randomBetween(20, 60));
	}
	setEdad(edad) {
		this.edad = edad;
	}
}

class Cliente extends Persona {
	constructor(nombre) {
		super(nombre);
		this.dinero = 0;
		this.icon = "👨";
		this.setDinero(randomBetween(0, 1500));
	}
	setDinero(dinero) {
		this.dinero = dinero;
	}
	solicitarOrden(carta) {
		//let orden = new Orden();
		let miBebida = carta.bebidas[random(carta.bebidas.length)];
		let miComida = carta.comidas[random(carta.comidas.length)];

		//orden.setBebida(miBebida);
		//orden.setComida(miComida);

		//return orden;
		return {
			bebida: miBebida,
			miComida: miComida
		};
	}
}

class Camarero extends Persona {
	constructor(nombre) {
		super(nombre);
		this.cargo = "";
		this.icon = "🕺";
		this.setCargo(obtenerStringAleatorio(cargos));
	}
	setCargo(cargo) {
		this.cargo = cargo;
	}
}

class Producto {
	constructor(nombre) {
		this.nombre = nombre;
		this.numeroExistencias = 0;
		this.calorias = 0;
		this.precio = 0;

		this.TD_NAME_CLASS = "product-name";
		this.TD_INFO_CLASS = "product-info";
		
		this.setNumeroExistencias(randomBetween(1, 10));
		this.setCalorias(randomBetween(50, 1500));
		this.setPrecio(randomBetween(20, 300));
	}
	setNumeroExistencias(numeroExistencias) {
		this.numeroExistencias = numeroExistencias;
	}
	setCalorias(calorias) {
		this.calorias = calorias;
	}
	setPrecio(precio) {
		this.precio = precio;
	}
	crearRenglonHtml() {
		let html = "";
		html += '<tr>';
		html += '<td class="' + this.TD_NAME_CLASS + '">' + this.nombre + '</td>';
		html += '<td class="' + this.TD_INFO_CLASS + '">' + this.calorias + '</td>';
		html += '<td class="' + this.TD_INFO_CLASS + '">' + this.precio + '</td>';
		html += '</tr>';

		return html;

		let tr = document.createElement("tr");
		
		tr.appendChild(crearTdHtml(this.nombre, this.TD_NAME_CLASS));
		tr.appendChild(crearTdHtml(this.nombre, this.TD_INFO_CLASS));
		tr.appendChild(crearTdHtml(this.nombre, this.TD_INFO_CLASS));

		/*return tr;*/
	}
}

class Bebida extends Producto {
	constructor(nombre) {
		super(nombre);
		this.esAlcoholica = false;
		this.gradosAlcohol = 0;

		this.setEsAlcoholica(booleanRandom());
		if (this.esAlcoholica) {
			this.setGradosAlcohol(randomBetween(2, 60));
		}
	}
	setEsAlcoholica(esAlcoholica) {
		this.esAlcoholica = esAlcoholica;
	}
	setGradosAlcohol(gradosAlcohol) {
		this.gradosAlcohol = gradosAlcohol;
	}
	crearRenglonHtml() {
		let html = "";
		
		html += '<tr>';
		html += '<td class="' + this.TD_NAME_CLASS + '">' + this.nombre + '</td>';
		html += '<td class="' + this.TD_INFO_CLASS + '">' + this.calorias + '</td>';
		html += '<td class="' + this.TD_INFO_CLASS + '">' + this.gradosAlcohol + '</td>';
		html += '<td class="' + this.TD_INFO_CLASS + '">' + this.precio + '</td>';
		html += '</tr>';

		return html;
	}
}

class Comida extends Producto {
	constructor(nombre) {
		super(nombre);
		this.tipo = "";
		this.setTipo(obtenerStringAleatorio(tipoComidas));
	}
	setTipo(tipo) {
		this.tipo = tipo;
	}
}

class Carta {
	constructor(bebidas, comidas) {
		this.bebidas = bebidas;
		this.comidas = comidas;

		this.CLASS_BEBIDAS = "lista-bebidas";
		this.CLASS_COMIDAS = "lista-comidas";
	}
	pintarCartaHtml(CLASS_CARTA) {
		let html = document.getElementById(CLASS_CARTA);
		//let html = document.getElementsByClassName(CLASS_CARTA);
		html.innerHTML = "";
		html.innerHTML += "<h1>Carta</h1>";
		html.innerHTML += this.crearTablaHtmlBebidas();
		html.innerHTML += this.crearTablaHtmlComidas();
		return html;
	}
	crearTablaHtmlBebidas() {
		let html = "";
		html += '<table class="' + this.CLASS_BEBIDAS + '">';
		html += '<thead>';
		html += '<tr>';
		html += '<th>Bebidas</th>';
		html += '<th>Calorías</th>';
		html += '<th>Grados Alcohol</th>';
		html += '<th>Precio</th>';
		html += '</tr>';
		html += '</thead>';
		html += '<tbody>';

		/*for (let i = 0; i < this.bebidas.length; i++) {
			let bebida = this.bebidas[i];
			html += bebida.crearRenglonHtml();
		}*/
		this.bebidas.forEach((bebida) => html+=bebida.crearRenglonHtml());

		html += '</tbody>';
		html += '</table>';
		return html;
	}
	crearTablaHtmlComidas() {
		let html = "";
		html += '<table class="' + this.CLASS_COMIDAS + '">';
		html += '<thead>';
		html += '<tr>';
		html += '<th>Comida</th>';
		html += '<th>Calorías</th>';
		html += '<th>Precio</th>';
		html += '</tr>';
		html += '</thead>';
		html += '<tbody>';

		//for (let i = 0; i < this.comidas.length; i++) {
		//	let comida = this.comidas[i];
		//	html += comida.crearRenglonHtml();
		//}
		this.comidas.forEach((comida) => html+=comida.crearRenglonHtml());

		html += '</tbody>';
		html += '</table>';
		return html;
	}
}

class Orden {
	constructor() {
		this.bebidas = [];
		this.comidas = [];
	}
	setBebidas(bebidas) {
		this.bebidas = bebidas;
	}
	setComidas(comidas) {
		this.comidas = comidas;
	}
}

class Mesa {
	constructor(id) {
		this.id = id;
		this.ocupada = false;
		this.personas = [];
		this.ordenes = [];
		this.capacidad = 0;

		this.CLASS_MESA = "mesa";

		this.setCapacidad(randomBetween(2, 10));
	}
	setCapacidad(capacidad) {
		this.capacidad = capacidad;
	}
	setPersonas(personas) {
		this.personas = personas;
	}
	setOrdenes(ordenes) {
		this.ordenes = ordenes;
	}
	setOcupada(ocupada) {
		this.ocupada = ocupada;
	}
	crearHtml() {
		var html = "";
		html += "<section class='" + this.CLASS_MESA + "'>";
		html += "<h2>Mesa " + this.id + "</h2>";
		html += "<p>Cap: " + this.capacidad + "</p>";
		html += "<p>Per: " + this.personas.length + "</p>";
		html += "<p class='icon'>";
		if (this.personas && this.personas.length > 0) {
			for (let i = 0; i < this.personas.length; i++) {
				html += this.personas[i].icon;
			}
		}
		html += "</p>";
		html += "<p>Ord: " + this.ordenes.length + "</p>";
		html += "<p class='icon'>";
		if (this.ordenes && this.ordenes.length > 0) {
			for (let i = 0; i < this.ordenes.length; i++) {
				html += "🗒";
			}
		}
		html += "</p>";
		html += "</section>";
		return html;
	}
}

class Recepcion {
	constructor() {
		this.gruposPersonas = [];
		this.secuenciaGrupos = 1;
		/*this.gruposPersonas.push(new GrupoPersonas(0, [new Cliente(obtenerStringAleatorio(nombres)), new Cliente(obtenerStringAleatorio(nombres))]));
		this.gruposPersonas.push(new GrupoPersonas(1, [new Cliente(obtenerStringAleatorio(nombres)), new Cliente(obtenerStringAleatorio(nombres))]));*/
	}
	agregarGrupoPersonas() {
		let randomPersonas = randomBetween(1, 20);
		let grupoPersonas = new GrupoPersonas(this.secuenciaGrupos);
		for (let i = 0; i < randomPersonas; i++) {
			grupoPersonas.clientes.push(new Cliente(obtenerStringAleatorio(nombres)));
		}
		this.secuenciaGrupos++;
		this.gruposPersonas.push(grupoPersonas);
	}
	recibirGrupoPersonas() {
		let grupoPersonas = null;
		if (this.gruposPersonas.length > 0) {
			grupoPersonas = this.gruposPersonas[0];
			this.gruposPersonas.splice(0, 1);
		}
		return grupoPersonas;
	}
	pintarRecepcionHtml(CLASS_RECEPCION) {
		let html = document.getElementById(CLASS_RECEPCION);

		html.innerHTML = "";
		html.innerHTML += "<h1>Recepción</h1>";
		this.gruposPersonas.forEach((grupoPersonas) => html.innerHTML += grupoPersonas.crearGrupoPersonasHtml());
		
	}
}

class GrupoPersonas {
	constructor(id) {
		this.id = id;
		this.clientes = [];
		this.CLASS_GRUPO_PERSONAS = "grupo-personas";
	}
	crearGrupoPersonasHtml() {
		let html = "<div class='" + this.CLASS_GRUPO_PERSONAS + "'>";
		html += "<h2>Grupo " + this.id + "</h2>";
		html += "<p>";
		this.clientes.forEach((cliente) => {
			html += cliente.icon;
		});
		html += "</p>";
		html += "</div>";
		return html;
	}
}

class Restaurante {
	constructor(nombre) {
		this.nombre = nombre;
		this.mesas = [];
		this.camareros = [];
		this.productos = [];
		this.carta = null;
		this.recepcion = new Recepcion();

		// CONSTANTES
		this.CLASS_BOTONES = "botones";
		this.CLASS_CARTA = "carta";
		this.CLASS_MESAS = "mesas";
		this.CLASS_RECEPCION = "recepcion";
		// CONSTANTES

		this.setMesas(30);
		this.setCamareros(5);
		this.setProductos(10);
		this.setCarta();
		this.pintarEstructuraPrincipal();
	}
	setMesas(numeroMesas) {
		for (let i = 0; i < numeroMesas; i++) {
			let mesa = new Mesa(i+1);
			this.mesas.push(mesa);
		}
	}
	setCamareros(numeroCamareros) {
		for (let i = 0; i < numeroCamareros; i++) {
			let camarero = new Camarero(obtenerStringAleatorio(nombres));
			this.camareros.push(camarero);
		}
	}
	setProductos(numeroProductos) {
		let media = numeroProductos / 2;
		for (let i = 0; i < numeroProductos; i ++) {
			let producto = null;
			if (i < media) {
				producto = new Bebida(this.generarNombreAleatorio(nombresBebidas));
			} else {
				producto = new Comida(this.generarNombreAleatorio(nombresComidas));
			}
			this.productos.push(producto);
		}
	}
	setCarta() {
		let bebidas = [];
		let comidas = [];
		if (this.productos && this.productos.length > 0) {
			/*for (let i = 0; i < this.productos.length; i++) {
				let producto = this.productos[i];
				if (producto instanceof Bebida) {
					bebidas.push(producto);
				} else if (producto instanceof Comida) {
					comidas.push(producto);
				}
			}*/
			this.productos.forEach((producto) => producto instanceof Bebida ? bebidas.push(producto) : comidas.push(producto));
		}
		this.carta = new Carta(bebidas, comidas);
	}
	generarNombreAleatorio(arrayNombres) {
		let nombre = "";
		//let unico = false;
		let array = [];
		let cont = 0;
		//while (!unico) {
		do {
			cont++;
			nombre = obtenerStringAleatorio(arrayNombres);
			array = this.productos.filter((producto) => nombre == producto.nombre);
			//unico = true;
			/*for (let i = 0; (unico && i < this.productos.length); i++) {
				if (nombre == this.productos[i].nombre) {
					unico = false;
				}
			}*/
		} while (array.length > 0 && cont < arrayNombres.length);
		return nombre;
	}
	pintarBotonesHtml() {
		let html = document.getElementById(this.CLASS_BOTONES);
		html.innerHTML = "";
		/*
		let buttonNuevoGrupo = document.createElement("button");
		buttonNuevoGrupo.className = "boton-nuevo-grupo";
		buttonNuevoGrupo.textContent = "Nuevo Grupo Personas";
		buttonNuevoGrupo.onclick = () => this.recepcion.agregarGrupoPersonas();
		html.appendChild(buttonNuevoGrupo);
		*/
		html.appendChild(crearButtonHtml("Nuevo Grupo Personas", "boton-nuevo-grupo", (() => this.recepcion.agregarGrupoPersonas())));
		html.appendChild(crearButtonHtml("Recibir Personas", "boton-recibir-grupo", (() => this.asignarGrupoPersonasAMesa())));
		html.appendChild(crearButtonHtml("Tomar Nota", "boton-tomar-nota", (() => this.tomarNota())));
	}
	pintarMesasHtml() {
		let html = document.getElementById(this.CLASS_MESAS);
		//let html = document.getElementsByClassName(this.CLASS_MESAS);
		html.innerHTML = "";
		html.innerHTML += "<h1>Mesas</h1>";
		for (let i = 0; i < this.mesas.length; i++) {
			html.innerHTML += this.mesas[i].crearHtml();
		}
	}
	pintarEstructuraPrincipal() {
		let html = document.getElementById("restaurante");

		html.innerHTML += "<header id='" + this.CLASS_BOTONES + "'></header>";
		html.innerHTML += "<aside id='" + this.CLASS_CARTA + "'></aside>";
		html.innerHTML += "<article id='" + this.CLASS_MESAS + "'></article>";
		html.innerHTML += "<article id='" + this.CLASS_RECEPCION + "'></article>";
	}
	pintarRestaurante() {
		//this.tomarNota();

		this.pintarBotonesHtml();
		this.carta.pintarCartaHtml(this.CLASS_CARTA);
		this.pintarMesasHtml();
		this.recepcion.pintarRecepcionHtml(this.CLASS_RECEPCION);
	}
	abrirRestaurante() {
		intervalID = window.setInterval(() => this.cicloRestaurante(), 2000);
	}
	cicloRestaurante() {
		this.pintarRestaurante();
	}
	cerrarRestaurante() {
		window.clearInterval(intervalID);
	}
	asignarGrupoPersonasAMesa() {
		let grupoPersonas = this.recepcion.recibirGrupoPersonas();

		if (grupoPersonas) {
			let lugaresPendientes = grupoPersonas.clientes.length;
			let capacidadTotal = this.obtenerCapacidadDeTodasMesas();
			if (capacidadTotal >= lugaresPendientes) {
				for (let i = 0; (lugaresPendientes > 0 && i < this.mesas.length); i++) {
					let mesa = this.mesas[i];
					if (!mesa.ocupada) {
						// ELementos a Eliminar del Array
						let elementosAEliminar = 0;

						if (mesa.capacidad >= lugaresPendientes) {
							// FOr para recorrer según lugaresPendientes
							for (let j = 0; j < lugaresPendientes; j++) {
								let persona = grupoPersonas.clientes[j];
								mesa.personas.push(persona);
								elementosAEliminar++;
							}
						} else {
							// For para recorrer según capacidad Mesa
							for (let j = 0; j < mesa.capacidad; j++) {
								let persona = grupoPersonas.clientes[j];
								mesa.personas.push(persona);
								elementosAEliminar++;
							}
						}
						// Se eliminan del Grupo las Personas
						grupoPersonas.clientes.splice(0, elementosAEliminar);

						mesa.ocupada = true;
						lugaresPendientes -= mesa.capacidad;
					}
				}
			} else {
				console.warn(`El grupo ${grupoPersonas.id} se ha retirado por falta de cupo.`);
			}
		}
	}
	obtenerCapacidadDeTodasMesas() {
		let capacidadTotal = 0;
		this.mesas.forEach((mesa) => {
			if (!mesa.ocupada) {
				capacidadTotal += mesa.capacidad;
			}
		});

		return capacidadTotal;
	}
	tomarNota() {
		this.mesas.forEach((mesa) => {
			if (mesa.ocupada && mesa.ordenes.length == 0) {
				let orden = new Orden();
				let bebidas = [];
				let comidas = [];

				mesa.personas.forEach((persona) => {
					let pedido = persona.solicitarOrden(this.carta);
					bebidas.push(pedido.bebida);
					comidas.push(pedido.comida);
				});

				mesa.ordenes.push(orden);
			}
		});
	}
}

var restaurante;
var intervalID;

window.onload = () => {
	restaurante = new Restaurante("Bon Apetit!!!");
	console.log(restaurante);
	//restaurante.pintarRestaurante();
	restaurante.abrirRestaurante();
}
