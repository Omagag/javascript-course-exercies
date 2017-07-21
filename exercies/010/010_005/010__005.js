/*
Continuamos añadiendo funcionalidad a nuestro restaurante:

1) Haz que en mesa se pinten las órdenes pendientes. Basta con pintes el número de órdenes.

2) Añade un botón AtenderOrdenes en Restaurante que recorra todas las mesas y lleve los productos de todas las órdenes a la mesa. Deberás restar la cantidad disponible del producto en la carta.

3) Añade en persona una variable NivelEnfado que empiece en 0. Cada ciclo que pase una mesa con órdenes sin atender, los clientes de esa mesa aumentarán su enfado 10. Si llegan a 100 se irán del restaurante sin pagar. Si el restaurante no tiene un producto concreto, la orden se marcará como atendida, pero los clientes aumentarán 10 su enfado.

4) Los clientes abandonarán la mesa después de haber hecho 3 pedidos. Al marcharse pagarán al restaurante todas las consumiciones realizadas.

Anotación: NO se podrá pasar a tomar nota a una mesa que tenga notas pendientes.
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
		this.enfado = 0;
		this.setEdad(randomBetween(20, 60));
	}
	setEdad(edad) {
		this.edad = edad;
	}
	incrementarEnfado() {
		let alCarajo = false;
		this.enfado += 10;

		if (this.enfado >= 100) {
			alCarajo = true;
		}

		return alCarajo;
	}
}

class Cliente extends Persona {
	constructor(nombre) {
		super(nombre);
		this.dinero = 0;
		this.icon = "👨";
//		this.orden = null;
		this.ordenes = [];
		this.cuenta = 0;
		this.setDinero(randomBetween(0, 1500));
	}
	getIcon() {
		if (this.enfado ==10) {
			this.icon = "😃";
		} else if (this.enfado == 20) {
			this.icon = "😔";
		} else if (this.enfado == 30) {
			this.icon = "😒";
		} else if (this.enfado == 40) {
			this.icon = "😕";
		} else if (this.enfado == 50) {
			this.icon = "😣";
		} else if (this.enfado == 60) {
			this.icon = "😖";
		} else if (this.enfado == 70) {
			this.icon = "😫";
		} else if (this.enfado == 80) {
			this.icon = "😤";
		} else if (this.enfado == 90) {
			this.icon = "😠";
		} else if (this.enfado >= 100) {
			this.icon = "😡";
		} else {
			this.icon = "🤣";
		}
		return this.icon;
	}
	setDinero(dinero) {
		this.dinero = dinero;
	}
	solicitarOrden(carta) {
		let orden = new Orden();

		let bebidas = [];
		let comidas = [];

		bebidas.push(carta.bebidas[random(carta.bebidas.length)]);
		comidas.push(carta.comidas[random(carta.comidas.length)]);

		orden.setBebidas(bebidas);
		orden.setComidas(comidas);

		/*let miBebida = carta.bebidas[random(carta.bebidas.length)];
		let miComida = carta.comidas[random(carta.comidas.length)];

		orden.setBebida(miBebida);
		orden.setComida(miComida);
		*/
		//this.orden = orden;
		this.ordenes.push(orden);
		return orden;
		/*return {
			bebida: miBebida,
			miComida: miComida
		};*/
	}
	ordenesAtendidas() {
		let atendidas = true;
		this.ordenes.forEach((orden) => {
			if (!orden.atendida) {
				atendidas = false;
			}
		})
		return atendidas;
	}
	listoParaPartir() {
		return this.ordenes.length == 3;
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
		html += '<td class="' + this.TD_INFO_CLASS + '">' + this.numeroExistencias + '</td>';
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
		html += '<td class="' + this.TD_INFO_CLASS + '">' + this.numeroExistencias + '</td>';
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
		html += '<th>Existencias</th>';
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
		html += '<th>Existencias</th>';
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
		this.atendida = false;
		this.exitosa = false;
		this.icon = "🗒";
	}
	setBebidas(bebidas) {
		this.bebidas = bebidas;
	}
	setComidas(comidas) {
		this.comidas = comidas;
	}
	getIcon() {
		//return this.icon = this.atendida ? "✅" : "🗒";
		return this.icon = !this.atendida ? "🗒" : this.exitosa ? "✅" : "❎";
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
	ordenesAtendidas() {
		let atendidas = true;
		this.ordenes.forEach((orden) => {
			if (!orden.atendida) {
				atendidas = false;
			}
		});

		return atendidas;
	}
	liberandoMesa(personasQueDejan) {
		personasQueDejan.forEach((i) => this.personas.splice(i, 1));
		if (this.personas.length == 0) {
			this.ocupada = false;
			this.ordenes = [];
		}
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
				html += this.personas[i].getIcon();
			}
		}
		html += "</p>";
		html += "<p>Ord: " + this.ordenes.length + "</p>";
		html += "<p class='icon'>";
		if (this.ordenes && this.ordenes.length > 0) {
			for (let i = 0; i < this.ordenes.length; i++) {
				html += this.ordenes[i].getIcon();
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
		this.caja = 0;

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
		html.appendChild(crearButtonHtml("Nuevo Gpo. Personas", "boton-nuevo-grupo", (() => this.recepcion.agregarGrupoPersonas())));
		html.appendChild(crearButtonHtml("Recibir Personas", "boton-recibir-grupo", (() => this.asignarGrupoPersonasAMesa())));
		html.appendChild(crearButtonHtml("Tomar Nota", "boton-tomar-nota", (() => this.tomarNota())));
		html.appendChild(crearButtonHtml("Atender Ordenes", "boton-atender-orden", (() => this.atenderOrden())));
		html.appendChild(crearButtonHtml("Cerrar Restaurante", "", (() => this.cerrarRestaurante())));
	}
	pintarMesasHtml() {
		let html = document.getElementById(this.CLASS_MESAS);
		//let html = document.getElementsByClassName(this.CLASS_MESAS);
		html.innerHTML = "";
		html.innerHTML += "<h1>Mesas</h1>";
		html.innerHTML += "<h2>Caja: " + this.caja + "</h2>";
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
		this.pasarCuentaClientes();

		this.pintarBotonesHtml();
		this.carta.pintarCartaHtml(this.CLASS_CARTA);
		this.pintarMesasHtml();
		this.recepcion.pintarRecepcionHtml(this.CLASS_RECEPCION);

		this.medirEnfadoDeClientes();
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
			//if (mesa.ocupada && mesa.ordenes.length == 0) {
			if (mesa.ocupada && mesa.ordenesAtendidas()) {
				let orden = new Orden();
				let bebidas = [];
				let comidas = [];

				mesa.personas.forEach((persona) => {
					/*let pedido = persona.solicitarOrden(this.carta);
					bebidas.push(pedido.bebida);
					comidas.push(pedido.comida);*/
					let orden = persona.solicitarOrden(this.carta);
					mesa.ordenes.push(orden);
				});
			}
		});
	}
	atenderOrden() {
		this.mesas.forEach((mesa) => {
			//mesa.atenderOrdenesMesa();
			if (mesa.ocupada && mesa.ordenes.length > 0 && !mesa.ordenesAtendidas()) {

				mesa.personas.forEach((persona) => {
					if (persona.ordenes.length > 0 && !persona.ordenesAtendidas()) {
						persona.ordenes.forEach((orden) => {
							//let orden = persona.orden;
							if (!orden.atendida) {
								let bebidaAtendida = false;
								let comidaAtendida = false;
								
								orden.bebidas.forEach((bebida) => {
									//this.carta.bebidas.forEach((cartaBebida) => {
									for (let i = 0; (!bebidaAtendida && i < this.carta.bebidas.length); i++) {
										let cartaBebida = this.carta.bebidas[i];
										if (bebida.nombre == cartaBebida.nombre && cartaBebida.numeroExistencias > 0) {
											cartaBebida.numeroExistencias--;
											persona.cuenta += cartaBebida.precio;
											bebidaAtendida = true;
										}
									}
									//})
								});

								orden.comidas.forEach((comida) => {
									//this.carta.comidas.forEach((cartaComida) => {
									for (let i = 0; (!comidaAtendida && i < this.carta.comidas.length); i++) {
										let cartaComida = this.carta.comidas[i];
										if (comida.nombre == cartaComida.nombre && cartaComida.numeroExistencias > 0) {
											cartaComida.numeroExistencias--;
											persona.cuenta += cartaComida.precio;
											comidaAtendida = true;
										}
									}
									//});
								});

								if (!bebidaAtendida || !comidaAtendida) {
									persona.incrementarEnfado();
								}
								if (bebidaAtendida && comidaAtendida) {
									orden.exitosa = true;
								}
								orden.atendida = true;

							}
						});
					}
					
				});
			}
		});
	}
	medirEnfadoDeClientes() {
		this.mesas.forEach((mesa) => {
			if (mesa.ocupada && mesa.ordenes.length > 0) {
				let personasQueDejan = [];
				mesa.personas.forEach((persona, index) => {
					persona.ordenes.forEach((orden) => {
						if (!orden || !orden.atendida) {
							if (persona.incrementarEnfado()) {
								// TODO: Ir sin pagar
								personasQueDejan.push(index);
							}
						}
					});
				});
				mesa.liberandoMesa(personasQueDejan);
				/*personasQueDejan.forEach((i) => mesa.personas.splice(i, 1));
				if (mesa.personas.length == 0) {
					mesa.ocupada = false;
				}*/
			}
		});
	}
	pasarCuentaClientes() {
		this.mesas.forEach((mesa) => {
			mesa.personas.forEach((persona, index) => {
				let personasQueDejan = [];
				if (persona.listoParaPartir()) {
					this.caja += persona.cuenta;
					persona.dinero -= persona.cuenta;
					personasQueDejan.push(index);
				}
				mesa.liberandoMesa(personasQueDejan);
			});
			
			/*personasQueDejan.forEach((i) => mesa.personas.splice(i, 1));
			if (mesa.personas.length == 0) {
				mesa.ocupada = false;
			}*/
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
