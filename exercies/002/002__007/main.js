enviarMensaje = function(idIphone) {
    // CAMBIARLO
    var mensaje = getMensaje(idIphone);
    console.log("Mensaje enviado por: " + idIphone);
    console.log(mensaje);
}


var test = function(){
	pintarMensaje("iphone1", "hola xanxooooos", true, null);
	pintarMensaje("iphone1", "hola tío", false, "xanxo 1");
	pintarMensaje("iphone1", "hola ke ase", false, "xanxo 2");
	pintarMensaje("iphone1", "hellooooo !!", false, "xanxo 3");
	pintarMensaje("iphone1", "que tal están?", true, null);
}