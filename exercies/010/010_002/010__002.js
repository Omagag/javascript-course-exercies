/*
Vamos a hacer un restaurante:

1) Modela la clase persona (haz uso de clases de ES6). Haz que las clases Cliente y Camarero hereden de Persona.
Una Persona deberá tener:

- Nombre (Generar aleatorio)
- Edad (Aleatorio entre 20 y 60)

Un Camarero deberá tener:

- Cargo (Aleatorio: encargado/mozo)

Un Cliente deberá tener: 

- Dinero (Aleatorio: entre 0 y 1500)

2) Modela la clase Mesa que deberá tener:

- Capacidad (aleatorio entre 2 y 10)
- Un ID
- Un booleano ocupada: true/false
- Un array de personas que estén sentadas
- Un array de órdenes realizadas (ya crearemos las órdenes después)

3) Modela una clase Producto que tendrá:

- Número de existencias
- Calorías
- Precio

La clase Bebida y la clase Comida heredarán de Producto. 

Bebida tendrá:

- Booleano esAlcoholica: true/false
- Grados de alcohol

Comida tendrá:

Tipo: Entrante/Principal/Postre

4) Modela la clase Restaurante que deberá tener:

- Nombre
- Array de mesas (30 mesas)
- Array de camareros (5 camareros)
- Carta de productos (Al menos 5 bebidas y 5 Comidas)


5) Crea una instancia de Restaurante y comprueba que contiene todo lo necesario.
*/
var nombres = ["Víctor", "Omar", "Karen", "Ariel", "Omar", "David", "Esteban", "Matias", "Vlairner", "Lucy", "Ignacio", "Humberto", "Néstor", "Daniel", "Raymundo", "Fran"];
var nombresBebidas = ["Margarita", "Cerveza", "Agua Jamaica", "Leche", "Café", "Mimosa", "Tequila", "Whisky", "Vodka", "Agua Horchata"];
var nombresComidas = ["Sopa", "Arroz", "Caldo de Pollo", "Hamburguesa", "Enchiladas", "Arrachera", "Ensalada César", "Pastel de Chocolate", "Fresas con Crema", "Crepas con Helado"];
var cargos = ["encargado", "mozo"];
var tipoComidas = ["entrante", "principal", "postre"];


class Persona {
	constructor(nombre) {
		this.nombre = nombre;
		this.setEdad(randomBetween(20, 60));
	}
	setEdad(edad) {
		this.edad = edad;
	}
}

class Cliente extends Persona {
	constructor(nombre) {
		super(nombre);
		this.setDinero(randomBetween(0, 1500));
	}
	setDinero(dinero) {
		this.dinero = dinero;
	}
}

class Camarero extends Persona {
	constructor(nombre) {
		super(nombre);
		this.setCargo(obtenerStringAleatorio(cargos));
	}
	setCargo(cargo) {
		this.cargo = cargo;
	}
}

class Producto {
	constructor(nombre) {
		this.nombre = nombre;
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
}

class Bebida extends Producto {
	constructor(nombre) {
		super(nombre);
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
}

class Comida extends Producto {
	constructor(nombre) {
		super(nombre);
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
}

class Mesa {
	constructor(id) {
		this.id = id;
		this.ocupada = false;
		this.personas = [];
		this.ordenes = [];
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
}

class Restaurante {
	constructor(nombre) {
		this.nombre = nombre;
		this.mesas = [];
		this.camareros = [];
		this.productos = [];
		this.setMesas(30);
		this.setCamareros(5);
		this.setProductos(10);
	}
	setMesas(numeroMesas) {
		for (let i = 0; i < numeroMesas; i++) {
			let mesa = new Mesa(i);
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
				producto = new Bebida(obtenerStringAleatorio(nombresBebidas));
			} else {
				producto = new Comida(obtenerStringAleatorio(nombresComidas));
			}
			this.productos.push(producto);
		}
	}
	setCarta() {
		if (this.productos && this.productos.length > 0) {
			// write something...
		}
	}
}

var restaurante = new Restaurante("Bon Apetit!!!");
console.log(restaurante);
var cliente = new Cliente(obtenerStringAleatorio(nombres));
console.log(cliente);

