var media = function(array) {
	var resultado = 0.0;
	var suma = 0;
	array = array.split(":");

	array = removerRepetidos(array);
	for (var i = 0; i < array.length; i++) {
		if (typeof(array[i]) == "string") {
			suma += parseInt(array[i]);
		} 
	}
	resultado = suma / array.length;

	return resultado;
}

var removerRepetidos = function(array) {
	for (var i = 0; i < array.length; i++) {
		var value = array[i];
		for (var j = 0; j < array.length; j++) {
			var value2 = array[j];
			//console.log("value : " + value + " value2: " + value2);
			if (value === value2 && i != j) {
				array.splice(j, 1);
				//console.log(array);
			}
		}
	}

	return array;
}

//var stringDeNumeros = '80:70:90:100';
var stringDeNumeros = '80:70:90:100:100:100:100';
console.log(media(stringDeNumeros))