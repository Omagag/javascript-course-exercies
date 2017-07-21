/*
Partiendo del ejercicio anterior... Pinta el restaurante!

1) Realiza una función dentro de Mesa que devuelva el HTML de una mesa. Una mesa puede estar representada por un div con sus datos.

2) Realiza una función dentro de Restaurante que se encargue de pedir a todas las mesas el HTML y pintarlo.

3) Realiza una función dentro de Carta que devuelva un HTML con la tabla de productos y sus existencias.

4) Asocia las funciones anteriores al pintado completo del restaurante.​
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
		const TD_NAME_CLASS = "product-name";
		const TD_INFO_CLASS = "product-info";
		
		html += '<tr>';
		html += '<td class="' + TD_NAME_CLASS + '">' + this.nombre + '</td>';
		html += '<td class="' + TD_INFO_CLASS + '">' + this.calorias + '</td>';
		html += '<td class="' + TD_INFO_CLASS + '">' + this.precio + '</td>';
		html += '</tr>';

		return html;
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
		const TD_NAME_CLASS = "product-name";
		const TD_INFO_CLASS = "product-info";
		
		html += '<tr>';
		html += '<td class="' + TD_NAME_CLASS + '">' + this.nombre + '</td>';
		html += '<td class="' + TD_INFO_CLASS + '">' + this.calorias + '</td>';
		html += '<td class="' + TD_INFO_CLASS + '">' + this.gradosAlcohol + '</td>';
		html += '<td class="' + TD_INFO_CLASS + '">' + this.precio + '</td>';
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
	}
	pintarCartaHtml() {
		let html = document.getElementById("carta");
		html.innerHTML += "<h1>Carta</h1>";
		html.innerHTML += this.crearTablaHtmlBebidas();
		html.innerHTML += this.crearTablaHtmlComidas();
		return html;
	}
	crearTablaHtmlBebidas() {
		//const TD_NAME_CLASS = "product-name";
		//const TD_INFO_CLASS = "product-info";
		
		let html = "";
		html += '<table class="lista-bebidas">';
		html += '<thead>';
		html += '<tr>';
		html += '<th>Bebidas</th>';
		html += '<th>Calorías</th>';
		html += '<th>Grados Alcohol</th>';
		html += '<th>Precio</th>';
		html += '</tr>';
		html += '</thead>';
		html += '<tbody>';

		for (let i = 0; i < this.bebidas.length; i++) {
			let bebida = this.bebidas[i];
			/*html += '<tr>';
			html += '<td class="' + TD_NAME_CLASS + '">' + bebida.nombre + '</td>';
			html += '<td class="' + TD_INFO_CLASS + '">' + bebida.calorias + '</td>';
			html += '<td class="' + TD_INFO_CLASS + '">' + bebida.gradosAlcohol + '</td>';
			html += '<td class="' + TD_INFO_CLASS + '">' + bebida.precio + '</td>';
			html += '</tr>';*/
			html += bebida.crearRenglonHtml();
		}

		html += '</tbody>';
		html += '</table>';
		return html;
	}
	crearTablaHtmlComidas() {
		//const TD_NAME_CLASS = "product-name";
		//const TD_INFO_CLASS = "product-info";
		
		let html = "";
		html += '<table class="lista-comidas">';
		html += '<thead>';
		html += '<tr>';
		html += '<th>Comida</th>';
		html += '<th>Calorías</th>';
		html += '<th>Precio</th>';
		html += '</tr>';
		html += '</thead>';
		html += '<tbody>';

		for (let i = 0; i < this.comidas.length; i++) {
			let comida = this.comidas[i];
			/*html += '<tr>';
			html += '<td class="' + TD_NAME_CLASS + '">' + comida.nombre + '</td>';
			html += '<td class="' + TD_INFO_CLASS + '">' + comida.calorias + '</td>';
			html += '<td class="' + TD_INFO_CLASS + '">' + comida.precio + '</td>';
			html += '</tr>';*/
			html += comida.crearRenglonHtml();
		}

		html += '</tbody>';
		html += '</table>';
		return html;
	}
}

class Mesa {
	constructor(id) {
		this.id = id;
		this.ocupada = false;
		this.personas = [];
		this.ordenes = [];
		this.capacidad = 0;
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
		html += "<section class='mesa'>";
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

class Restaurante {
	constructor(nombre) {
		this.nombre = nombre;
		this.mesas = [];
		this.camareros = [];
		this.productos = [];
		this.carta = null;
		this.setMesas(30);
		this.setCamareros(5);
		this.setProductos(10);
		this.setCarta();
	}
	setMesas(numeroMesas) {
		for (let i = 0; i < numeroMesas; i++) {
			let mesa = new Mesa(i+1);
			mesa.personas.push(new Cliente(obtenerStringAleatorio(nombres)));
			mesa.personas.push(new Cliente(obtenerStringAleatorio(nombres)));
			mesa.personas.push(new Cliente(obtenerStringAleatorio(nombres)));
			mesa.ordenes.push("algo");
			mesa.ordenes.push("algo");
			mesa.ordenes.push("algo");
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
				//producto = new Bebida(obtenerStringAleatorio(nombresBebidas));
				producto = new Bebida(this.generarNombreAleatorio(nombresBebidas));
			} else {
				//producto = new Comida(obtenerStringAleatorio(nombresComidas));
				producto = new Comida(this.generarNombreAleatorio(nombresComidas));
			}
			this.productos.push(producto);
		}
	}
	setCarta() {
		let bebidas = [];
		let comidas = [];
		if (this.productos && this.productos.length > 0) {
			for (let i = 0; i < this.productos.length; i++) {
				let producto = this.productos[i];
				if (producto instanceof Bebida) {
					bebidas.push(producto);
				} else if (producto instanceof Comida) {
					comidas.push(producto);
				}
			}
		}
		this.carta = new Carta(bebidas, comidas);
	}
	generarNombreAleatorio(arrayNombres) {
		let nombre = "";
		let unico = false;
		while (!unico) {
			nombre = obtenerStringAleatorio(arrayNombres);
			unico = true;
			for (let i = 0; (unico && i < this.productos.length); i++) {
				if (nombre == this.productos[i].nombre) {
					unico = false;
				}
			}
		}
		return nombre;
	}
	pintarMesasHtml() {
		let html = document.getElementById("mesas");
		html.innerHTML = "";
		html.innerHTML += "<h1>Mesas</h1>";
		for (let i = 0; i < this.mesas.length; i++) {
			html.innerHTML += this.mesas[i].crearHtml();
		}
	}
	pintarRestaurante() {
		this.carta.pintarCartaHtml();
		this.pintarMesasHtml();
	}
}

var restaurante;

window.onload = function() {
	restaurante = new Restaurante("Bon Apetit!!!");
	console.log(restaurante);
	restaurante.pintarRestaurante();
}
