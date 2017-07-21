/*

Ejercicio:

Completa las funciones siguientes para tener un conjunto de operaciones que 
traten nuestros arrays realizando diversas transformaciones sobre ellos.

Finalizado el ejercicio podrás probar que funciona correctamente con los tests del final.

Nota: puede que alguna de las siguientes funciones te sea de ayuda:

isFinite(), splice(), unshift(), push(), join(), sort(), Math.floor()

Puedes encontrar más en:

https://developer.mozilla.org/en-US/docs/Web/JavaScript
y
http://www.w3schools.com/js/default.asp

*/


function vaciarPapelera(array) {
	// Esta función debe recibir un array y devolverlo habiéndole quitado los elementos que sean un asterisco (*)

	// Por ejeplo:
	// vaciarPapelera(['a',1,'*',5]) 
	array.forEach(function(value, index) {
		if (value === "*") {
			array.splice(index, 1);
		}
	});
	// debe devolver:
	// ['a',1,5]
	return array;
}
// Unit test
//console.log(vaciarPapelera(['a',1,'*',5]));

function agruparElementos(array) {
	// Esta función debbe recibir un array con números y letras y devolverlo habiendo agrupado los elementos
	// En primer lugar se deben encontrar números, depués letras. El orden dentro de cada grupo no importa.

	// Por ejemplo: 
	// agruparElementos(['B', 'a', 4 , 23, 'J'])
	var newArray = []; 
	array.forEach(function(value, index) {
		if (typeof(value) == "number") {
			newArray.unshift(value);
		} else if (typeof(value) == "string") {
			newArray.push(value);
		}
	});

	// debe devolver:
	// [23, 4, 'B', 'a', 'J']
	return newArray;
}
//console.log(agruparElementos(['B', 'a', 4 , 23, 'J']));

function ponerBonitasLasLetras(array) {
	// Esta función debe recinbir un array de números y letras y devolverlo con las letras vocales en mayúsculas 
	// y las consonantes en minúsculas. Los números no deben ser tratados.

	// Por ejemplo:
	// ponerBonitasLasLetras([1,5,7,'a','J',p,'E'])
	var newArray = [];
	for (var i = 0; i < array.length; i++) {
		var value = array[i];
		if (typeof(value) == "string") {
			if (value == "a" || value == "e" || value == "i" || value == "o" || value == "u") {
				array[i] = value.toUpperCase();
			} else if (value == "B" || value == "C" || value == "D" || value == "F" || value == "G" || value == "H" ||
				value == "J" || value == "K" || value == "L" || value == "M" || value == "N" || value == "P" || value == "Q" || 
				value == "R" || value == "S" || value == "T" || value == "V" || value == "W" || value == "X" || value == "Y" || 
				value == "Z") {
				array[i] = value.toLowerCase();
			}
		}
	}

	// debe devolver:
	// [1,5,7,'A','j',p,'E']
	return array;
}
//console.log(ponerBonitasLasLetras([1,5,7,'a','J','p','E']));

function ponerBonitosLosNumeros(array) {
	//It receives an array with numbers and letters and returns it with its numbers beautified. Letters remain unchanged
	//Beautify process is to reduce a number into a single digit number by adding all its digits together: 
	// 123 = 6 because 1+2+3 = 6
	// 9 = 9
	// 9956 = 2 because 9+9+5+6 = 29 -> 2+9 = 11 -> 1+1 = 2
	// 793 = 1 because 7+9+3 = 19 -> 1+9 = 10 -> 1+0 = 1

	// Esta función debe recibbir un array de números y letras, y devolverlo con los números "bonitos". 
	// Las letras no deben cambiar. 
	// Para poner bonito número debemos sumar todas sus cifras.
	// en caso de que el número resultante tenga más de una cifra, se petirá el proceso con este.
	// 123 se convertirá en 6 porque 1+2+3 = 6
	// 9 se convertirá en 9
	// 9956 se convertirá en 2 porque 9+9+5+6 = 29, 2+9 = 11 y 1+1 = 2
	// 793 se convertirá en 1 porque 7+9+3 = 19, 1+9 = 10 y 1+0 = 1

	// Este proceso debemos realizarlo sobre un array de elementos y aplicarlo solo a los números.

	// Por ejemplo: 
	// ponerBonitosLosNumeros([23,59, 4,'A','b'])
	for (var i = 0; i < array.length; i++) {
		var value = array[i]; 
		if (typeof(value) == "number") {
			array[i] = sumarDigitos(value);
		}
	}

	array.sort();

	// debe devolver
	// [5, 5, 4, 'A', 'b']
	return array;
}
var sumarDigitos = function(number) {
	var suma = 0;

	var array = (""+ number).split("");
	if (array.length > 1) {
		for (var i = 0; i < array.length; i++) {
			suma += parseInt(array[i]);
		}
		suma = sumarDigitos(suma);
	} else {
		suma = number;
	}

	return suma;
}
//console.log(ponerBonitosLosNumeros([23,59, 4,'A','b']));

function arrayToString(array) {
	var str = "";
	//It receives an array and returns a string with all its elements.
	//Example: arrayToString([1, 4, 5, 5, 'A', 'b', 'E', 'j']) returns "1455AbEj"
	for (var i = 0; i < array.length; i++) {
		str = str+array[i];
	}

	return str;
}
//console.log(arrayToString([1, 4, 5, 5, 'A', 'b', 'E', 'j']));

// Tests

function transformacionCompletaDelArray(array) {
	array = vaciarPapelera(array);
	array = agruparElementos(array);
	array = ponerBonitasLasLetras(array);
	array = ponerBonitosLosNumeros(array);
//	array = ordenarArray(array);
	array = arrayToString(array);

	return array;
}

console.log(transformacionCompletaDelArray(["a", 6, "B", "F", "*", 8, 78, "J"]) === "668Abfj");
console.log(transformacionCompletaDelArray(["*", "j", 6, "A", "F", "*", 8, "C", "b", "a", 78, "J", 43523, 1111, "r", "q", "y"]) === "46688AAbcfjjqry");


