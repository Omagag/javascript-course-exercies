Parque.prototype.pintarEstadoParque = function(){
    var contenidoParque = ""; 

    for (var i = 0; i < parque.areas[0].length; i++) {
        var area = parque.areas[0][i];
        contenidoParque = contenidoParque + area.getHTML();
    }

    var miparquehtml = document.getElementById("parque");
    miparquehtml.innerHTML = contenidoParque;
}

Area.prototype.imprimirEstadoArea = function() {
    log("Estado del área " + this.id);
    log(this.getEstadoArea);
    log("======================");
}

Area.prototype.getEstadoArea = function(){
    var estadoArea = "";
    this.isOnFire = false;
    for (var i = 0; i < this.arboles[0].length; i++) {
        var estadoArbol = "🌲";

        if (this.arboles[0][i].estaQuemado) {
            estadoArbol = "🔥";
            this.isOnFire = true;
        }
        estadoArea += estadoArbol + "";
    }

    estadoArea += "\n";

    for (var i = 0; i < this.visitantes.length; i++) {
        var estadoVisitante = (this.visitantes[i].esFumador == false) ? "😃" : "😈";
        if (this.isOnFire) {
            if (this.visitantes[i].esFumador == true)
                estadoVisitante = "😈";
            else
                estadoVisitante = "😱";
        }
        if (this.arboles[0].length == 0)
            estadoVisitante = "😐";

        estadoArea += estadoVisitante;
    }
    
    return estadoArea;
}

Area.prototype.getHTML = function(){
    var html = '<div class="area">';
    html = html + '<span class="areaInner">';
    html = html + this.getEstadoArea();
    html = html + '</span>';
    html = html + '</div>';

    return html;
}


function ejecutarCiclo() {

    parque.pintarEstadoParque();

}

