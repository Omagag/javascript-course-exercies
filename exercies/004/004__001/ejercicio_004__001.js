/*
Partiendo de los ficheros entregados...

Orquesta la comunicación entre los dos iPhones

Los mensajes que envíe el iphone1 llegarán al iphone2 y viceversa.

No olvides pintar también los mensajes enviados por el propio usuario.

Para pintar dispones de la función pintarMensaje(idIphone, mensaje, esPropio) 

Para obtener el mensaje que ha escrito un usuario dispones de la función getMensaje(idIphone) 
*/
var nombres = ["Ragnar", "Loki", "Lagertha", "Arvid", "Jabari", "Xenon", "Nadezhda", "Nadim", "Tabby", "Radley", "Radcliff", "Oakley", "Eamon", "Hadwin", "Hagan", "Kaden", "Maarku", "Dacey", "Walden", "Sachi"];

var CanalComunicacion = function() {
	this.pubsub = (function() {
		var suscriptores = {};

		function subcribe(event, callback) {
			if (!suscriptores[event]) {
				var suscriptorArray = [callback];
				suscriptores[event] = suscriptorArray;
			} else {
				suscriptores[event].push(callback);
			}
		}
		function publish(event, data) {
			if (suscriptores[event]) {
				suscriptores[event].forEach(function(callback) {
					callback(data);
				});
			}
		}
		return {
			pub: publish,
			sub: subcribe
		};
	}());
}
CanalComunicacion.prototype.subscribir = function(iphone) {
	this.pubsub.sub(iphone.idIphone, function(mensaje){iphone.recibirMensaje(mensaje)});
	this.pubsub.sub("TODOS", function(mensaje){iphone.recibirMensaje(mensaje)});
}
CanalComunicacion.prototype.subscribirUsuario = function(usuario) {
	this.pubsub.sub(usuario.nombre, function(mensaje){usuario.iphone.recibirMensaje(mensaje)});
	this.pubsub.sub("TODOS", function(mensaje){usuario.iphone.recibirMensaje(mensaje)});
}
CanalComunicacion.prototype.mandarMensaje = function(idIphone, mensaje) {
	pintarMensaje(idIphone, mensaje.mensaje, true, idIphone);
	var mensajeEnviar = {
		mensaje: mensaje.mensaje,
		remitente:idIphone
	}
	this.pubsub.pub(mensaje.destinatario, mensajeEnviar);
}
CanalComunicacion.prototype.enviarMensaje = function(destinatario, mensajeEnviar) {
	this.pubsub.pub(destinatario, mensajeEnviar);
}
var canalComunicacion = new CanalComunicacion();


var Iphone = function(idIphone, nickname) {
	this.idIphone = idIphone;
	this.nickname = nickname;
	this.agregarACanal();
}
Iphone.prototype.agregarACanal = function() {
	canalComunicacion.subscribir(this);
}
Iphone.prototype.mandarMensaje = function(mensaje) {
	pintarMensaje(this.idIphone, mensaje.mensaje, true, this.idIphone);
    var mensajeEnviar = {
		mensaje: mensaje.mensaje,
		remitente: this.nickname
	}
	//canalComunicacion.pubsub.pub(mensaje.destinatario, mensajeEnviar);
	canalComunicacion.enviarMensaje(mensaje.destinatario, mensajeEnviar);
}
Iphone.prototype.recibirMensaje = function(mensaje) {
	if (mensaje.remitente != this.idIphone && mensaje.remitente != this.nickname) {
		console.log("Recibí el mensaje: " + mensaje.mensaje);
		pintarMensaje(this.idIphone, mensaje.mensaje, false, mensaje.remitente);
	}
}

var Usuario = function(nombre, iphone) {
	this.nombre = nombre;
	this.iphone = iphone;
	this.agregarACanal();
}
Usuario.prototype.agregarACanal = function() {
	canalComunicacion.subscribirUsuario(this);
}

enviarMensaje = function(idIphone) {
    // CAMBIARLO
    var mensaje = getMensaje(idIphone);
    console.log("Mensaje enviado por: " + idIphone);
    console.log(mensaje);

    // Enviado por el teléfono que envió el mensaje
    var enviado = false;
    var i = 0;
    while(!enviado && i < iphones.length) {
    	var iphone = iphones[i];
    	if (iphone.idIphone == idIphone) {
    		iphone.mandarMensaje(mensaje);
    		enviado = true;
    	}
    	i++;
    }
    // Enviado directo al CAnal
    //canalComunicacion.mandarMensaje(idIphone, mensaje);
}


var iphones = [];
var crearUsuarios = function() {
	for (var i = 0; i < 4; i++) {
		var iphone = new Iphone("iphone"+(i+1), obtenerStringAleatorio(nombres));
		iphones.push(iphone);
		//var usuario = new Usuario(obtenerStringAleatorio(nombres), iphone);
	}
}
crearUsuarios();
function obtenerStringAleatorio(nombresArray) {
	return nombresArray[random(nombresArray.length)];
}
function random(x) {
	return Math.floor(Math.random() * x);
}
function randomBetween(x, y) {
	return Math.floor(Math.random() * y) + x;
}



