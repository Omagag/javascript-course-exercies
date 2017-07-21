/*
Examen semana 2

Vamos a hacer una tienda On-Line:

1) (2 Puntos) - Realiza una clase Tienda y una clase Producto que tenga las propiedades que consideres. 

Como mínimo deberán tener:
Tienda:
	- Un array de productos
	- Nombre
	- URL 

Producto:
	- Nombre 
	- Precio
	- Descripción
	- Url de imagen

2) (2 Puntos) - Realiza el HTML de una página que tenga en su lado izquierdo un formulario para introducir productos.
EL formulario deberá tener todos los campos necesarios para crear un producto. Y un botón de "Añadir". Realiza solo la maqueta HTML y CSS (sin funcionalidad).

3) (2 Puntos)  - Haz que al pulsar en el botón "Añadir" se recojan los datos del formulario y se cree un nuevo producto. El producto deberá ser añadido al array de productos de la tienda. (Sólo programación JavaScript, sin pintado de productos)

4) (2 Puntos) - Haz una función pintarTienda en Tienda que pinte el HTMl de todos los productos de la tienda. Cada vez que se cree o se elimine un producto deberás pintar todos los productos.

5) (2 puntos) - Añade en cada producto un botón de borrado, que elimine el producto de la tienda y vuelva a pintar todo el listado de productos.

Bonus:
- Cambiar a Class
- Añadir a Carrito
*/

class Tienda {
	constructor(nombre, url) {
		this.nombre = nombre;
		this.url = url;
		this.carrito = new Carrito();
		this.productos = [];
		this.rigthContent = null;
		this.rigthContentHeader = null;
		this.carritoContador = null;
		this.tbody = null;
		this.obtenerTbody();
		this.obtenerRigthContent();
		this.obtenerRigthContentHeader();
		this.obtenerCarritoContador();
	}

	obtenerTbody() {
		if (!this.tbody) {
			this.tbody = document.getElementById("productos");
		}
	}
	obtenerRigthContent() {
		if (!this.rigthContent) {
			this.rigthContent = document.getElementById("rigth-content");
		}
	}
	obtenerRigthContentHeader() {
		if (!this.rigthContentHeader) {
			this.rigthContentHeader = document.getElementById("rigth-content-header");
		}
	}
	obtenerCarritoContador() {
		if (!this.carritoContador) {
			this.carritoContador = document.getElementById("carrito-contador");
		}
	}
	obtenerSiguienteIdProducto() {
		let lastId = 0;
		for (let i = 0; i < this.productos.length; i++) {
			if (lastId <= this.productos[i].id) {
				lastId = this.productos[i].id + 1;
			}
		}
		return lastId;
	}
	agregarProducto(e) {
		// Evitar o quita el evento
		e.stopPropagation();
		e.preventDefault();

		var nombre = getValueInput("nombre");
		var precio = getValueInput("precio");
		var descripcion = getValueInput("descripcion");
		var urlImagen = getValueInput("url-imagen");
		
		var producto = new Producto(nombre, precio, descripcion, urlImagen);

		this.limpiarForm();

		producto.id = this.obtenerSiguienteIdProducto();
		this.productos.push(producto);
		
		this.pintarTienda();
	}
	eliminarProducto(idProducto) {
		let producto = this.obtenerProductoPorId(idProducto);
		if (producto.enCarrito) {
			this.carrito.quitarDeCarrito(producto);
		}
		let index = this.productos.indexOf(producto);
		this.productos.splice(index, 1);

		this.pintarTienda();
	}
	limpiarForm() {
		setValueInput("nombre", "");
		setValueInput("precio", "");
		setValueInput("descripcion", "");
		setValueInput("url-imagen", "");
	}
	agregarProductoACarrito(idProducto) {
		let producto = this.obtenerProductoPorId(idProducto);
		this.carrito.agregarACarrito(producto);

		this.pintarTienda();
	}
	quitarProductoDeCarrito(idProducto) {
		let producto = this.obtenerProductoPorId(idProducto);
		this.carrito.quitarDeCarrito(producto);

		this.pintarTienda();
	}
	obtenerProductoPorId(idProducto) {
		let producto = null;
		for (let i = 0; (!producto && i < this.productos.length); i++) {
			if (idProducto == this.productos[i].id) {
				producto = this.productos[i];
			}		
		}
		return producto;
	}
	pintarTienda() {
		this.tbody.innerHTML = "";
		for (let i = 0; i < this.productos.length; i++) {
			let producto = this.productos[i];
			let productoHtml = producto.crearHtml();
			this.tbody.innerHTML += productoHtml;
		}

		this.carritoContador.innerHTML = "";
		this.carritoContador.innerHTML += this.carrito.contadorHtmlDeProductos();
	}
	
}

class Carrito {
	constructor() {
		this.id = 0;
		this.productos = [];
		this.total = 0;
	}
	agregarACarrito(producto) {
		this.productos.push(producto);
		producto.enCarrito = true;
	}
	quitarDeCarrito(producto) {
		let index = this.productos.indexOf(producto);
		this.productos.splice(index, 1);
		producto.enCarrito = false;
	}
	contadorHtmlDeProductos() {
		let html = "";
		//html += "<div class='carrito-contador'>";
		html += "<p>Productos en el Carrito: " + this.productos.length + "</p>";
		//html += "</div>";
		return html;
	}
}

class Producto {
	constructor(nombre, precio, descripcion, urlImagen) {
		this.id = 0;
		this.nombre = nombre;
		this.precio = precio;
		this.descripcion = descripcion;
		this.urlImagen = urlImagen;
		this.enCarrito = false;
	}
	crearHtml() {
		let tr = "";
		tr += "<tr id='" + this.id + "'>";
		tr += "<td><img alt='' src='" + this.urlImagen + "' /></td>";
		tr += "<td>" + this.nombre + "</td>";
		tr += "<td>" + this.precio + "</td>";
		tr += "<td>" + this.descripcion + "</td>";
		tr += "<td>";
		tr += "<button onclick='tienda.eliminarProducto(\"" + this.id + "\")'>Borrar</button>";
		if (!this.enCarrito) {
			tr += "<button onclick='tienda.agregarProductoACarrito(\"" + this.id + "\")'>Añadir a carrito</button>";
		} else {
			tr += "<button onclick='tienda.quitarProductoDeCarrito(\"" + this.id + "\")'>Quitar de carrito</button>";
		}
		tr += "</td>";
		tr += "</tr>";
		return tr;
	}
}

let tienda;
window.onload = function() {
	tienda = new Tienda("Cutre Tienda", "http://www.google.com");
}
