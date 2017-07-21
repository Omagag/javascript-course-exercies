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
*/

var Tienda = function(nombre, url) {
	this.nombre = nombre;
	this.url = url;
	this.productos = [];
	this.tbody = null;
	this.obtenerTbody();
}
Tienda.prototype.obtenerTbody = function() {
	if (!this.tbody) {
		this.tbody = document.getElementById("productos");
	}
}
Tienda.prototype.getUltimoIdProducto = function() {
	var lastId = 0;
	var numeroProductos = this.productos.length;
}
Tienda.prototype.agregarProducto = function(producto) {
	var numeroProductos = this.productos.length;
	producto.id = "producto"+numeroProductos;
	this.productos.push(producto);
	
	this.pintarTienda();
}
Tienda.prototype.pintarTienda = function() {
	this.tbody.innerHTML = "";
	for (var i = 0; i < this.productos.length; i++) {
		var producto = this.productos[i];
		var productoHtml = producto.crearHtml();
		this.tbody.innerHTML += productoHtml;
	}
}
Tienda.prototype.eliminarProducto = function(idProducto) {
	var eliminadoList = false;
	var i = 0;
	while(!eliminadoList && i < this.productos.length) {
		if (this.productos[i].id == idProducto) {
			this.productos.splice(i, 1);
			eliminadoList = true;
		}
		i++;
	}

	this.pintarTienda();
	/*
	// Se elimina el HTML al vuelo
	var eliminadoHtml = false;
	i = 0;
	while(!eliminadoHtml && i < this.tbody.childNodes.length) {
		var tr = this.tbody.childNodes[i];
		if (tr.id == idProducto) {
			this.tbody.removeChild(tr);
			eliminadoHtml = true;
		}
		i++;
	}*/
}

var Producto = function(nombre, precio, descripcion, urlImagen) {
	this.id = 0;
	this.nombre = nombre;
	this.precio = precio;
	this.descripcion = descripcion;
	this.urlImagen = urlImagen;
}
Producto.prototype.crearHtml = function() {
	var tr = "";
	tr += "<tr id='" + this.id + "'>"
	tr += "<td><img alt='' src='" + this.urlImagen + "' /></td>"
	tr += "<td>" + this.nombre + "</td>"
	tr += "<td>" + this.precio + "</td>"
	tr += "<td>" + this.descripcion + "</td>"
	tr += "<td><button onclick='eliminarProducto(\"" + this.id + "\")'>Borrar</button></td>"
	tr += "</tr>"
	return tr;
}

var tienda;
window.onload = function() {
	tienda = new Tienda("Cutre Tienda", "http://www.google.com");
}

var limpiarForm = function() {
	setValueInput("nombre", "");
	setValueInput("precio", "");
	setValueInput("descripcion", "");
	setValueInput("url-imagen", "");
}

var agregarProducto = function(e) {
	e.stopPropagation();

	var nombre = getValueInput("nombre");
	var precio = getValueInput("precio");
	var descripcion = getValueInput("descripcion");
	var urlImagen = getValueInput("url-imagen");
	
	var producto = new Producto(nombre, precio, descripcion, urlImagen);
	tienda.agregarProducto(producto);

	limpiarForm();
}
var eliminarProducto = function(idProducto) {
	tienda.eliminarProducto(idProducto);
}

