var arrayLongitudes = [];


var longitudStringMasLargo = function(arrayStr) {
//	var longitud = 0;
	var stringMasLargo = {
		string: "",
		longitud: 0
	};

	for (var i = 0; i < arrayStr.length; i++) {
		if (typeof(arrayStr[i]) == "string") {
			if (i === 0) {
				//longitud = arrayStr[i].length;
				stringMasLargo.longitud = arrayStr[i].length;
			} else {
				//if (longitud < arrayStr[i].length) {
				if (stringMasLargo.longitud < arrayStr[i].length) {
					stringMasLargo.string = arrayStr[i];
					//longitud = arrayStr[i].length;
					stringMasLargo.longitud = arrayStr[i].length;
				}
			}
		}
	}

//	return longitud;
	arrayLongitudes.push(stringMasLargo.longitud);
	return stringMasLargo;
}

function media(arrLong) {
	var media = 0.0;
	var suma = 0;
	for (var i = 0; i <arrLong.length; i++) {
		suma += arrLong[i];
	}
	media = suma / arrLong.length;

	return media;
}

var array1 = ["Hola", "Frase corta", "Frase normalita", "Frase muy muy larga"];
//console.log("La longitud de String más larga es: " + longitudStringMasLargo(array1));
console.log("El String es: " + longitudStringMasLargo(array1).string + " su longitud es: " + longitudStringMasLargo(array1).longitud);
console.log(longitudStringMasLargo(array1));
var array2 = ["Frase corta", "Frase extramadamente muy muy larga", "Frase normalita", "Hola"];
//console.log("La longitud de String más larga es: " + longitudStringMasLargo(array2));
console.log("El String es: " + longitudStringMasLargo(array2).string + " su longitud es: " + longitudStringMasLargo(array2).longitud);
console.log(longitudStringMasLargo(array2));

console.log(media(arrayLongitudes));
