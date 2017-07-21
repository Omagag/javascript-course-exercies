// FUNCIONES ENTREGADAS
// NO TOCAR 

pintarMensaje = function(idIphone, mensaje, esPropio, nombreUsuario) {
    var selector = "#" + idIphone + " " + ".messages";
    var misMensajes = document.querySelector(selector);

    var elementMessage = document.createElement("div");

    if (esPropio) {
        elementMessage.className = "message messageOwn";
    } else {
        elementMessage.className = "message";

        // Como no es propio, ponemos nombre de usuario
        var elementUserName = document.createElement("div");
        elementUserName.className = "message__username";
        elementUserName.innerHTML = nombreUsuario;

        // Coloco el nombre de usuario dentro del mensaje
        elementMessage.insertBefore(elementUserName, null);
    }

    // Como no es propio, ponemos nombre de usuario
    var elementText = document.createElement("div");
    elementText.className = "message__text";
    elementText.innerHTML = mensaje;

    // Coloco el nombre de usuario dentro del mensaje
    elementMessage.insertBefore(elementText, null);

    // Inserto el mensaje
    misMensajes.insertBefore(elementMessage, null);
}

getMensaje = function(idIphone) {
    // COJO EL TEXTO Y LO LIMPIO
    var selector = "#" + idIphone + " " + "textarea";
    var miTextarea = document.querySelector(selector);
    var mensaje = miTextarea.value;
    miTextarea.value = "";

    // COJO EL DESTINATARIO
    var selector2 = "#" + idIphone + " " + "select";
    var miSelect = document.querySelector(selector2);
    var destinatario = miSelect.options[miSelect.selectedIndex].value;
    
    // DEVUELVO UN OBJETO CON LA INFO
    var objeto = {
        mensaje: mensaje,
        destinatario: destinatario
    };

    return objeto;
}

// FUNCIONES ENTREGADAS
// NO TOCAR 
