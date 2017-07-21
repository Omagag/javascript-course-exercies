// FUNCIONES ENTREGADAS
// NO TOCAR 

pintarMensaje = function(idIphone, mensaje, esPropio) {
    var selector = "#" + idIphone + " " + ".messages";
    var misMensajes = document.querySelector(selector);

    var element = document.createElement("div");

    if (esPropio) {
        element.className = "message messageOwn";
    } else {
        element.className = "message";
    }

    element.innerHTML = mensaje;

    misMensajes.insertBefore(element, null);
}

getMensaje = function(idIphone) {
    var selector = "#" + idIphone + " " + "input";
    var miInput = document.querySelector(selector);

    var mensaje = miInput.value;
    miInput.value = "";

    return mensaje;
}

// FUNCIONES ENTREGADAS
// NO TOCAR 


