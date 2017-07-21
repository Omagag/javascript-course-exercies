// Ejercicio 001_009

// Esta función recibe un string y debe devolverlo con todas las letras a mayúsculas
function ponerTodasLasLetrasMayusculas(string) {
	return string.toUpperCase();
}

// Esta función recibe un string y devuelve el string inverso
// Por ejemplo: para el string "Hola clase!" debe devolver "!esalc aloH"
function stringInverso(string) {
	var stringInverso = "";

	var arrayStr = string.split("");
	for (var i = arrayStr.length - 1; i >= 0; i--) {
		stringInverso = stringInverso + arrayStr[i];
	}

	return stringInverso;
}

// Esta función debe recibir un string y devolver el mismo string sin espacios
function eliminarEspacios(string) {
	return string.replace(/ /g, "");
}

// Esta función debe recibir un string y decir si es un palindromo (true/false)
// Un palindromo es una frase que se lle ifual al derecho que al revés
function esPalindromo(string) {
	var esPalindromo = true;

	string = ponerTodasLasLetrasMayusculas(string);
	string = eliminarEspacios(string);
	console.log(string);
	var strInverso = stringInverso(string);
	console.log(strInverso);

	var arrayStr = string.split("");
	var arrayStrInverso = strInverso.split("");
	if (arrayStr.length == arrayStrInverso.length) {
		for (var i = 0; i < arrayStr.length; i++) {
			if (arrayStr[i] != arrayStrInverso[i]) {
				esPalindromo = false;
			}
		}
	}	
	
	return esPalindromo;
}

// Ejemplo
// Arde ya la yedra
// Ana lava lana
// Anita lava la tina
console.log(esPalindromo("Arde ya la yedra"));
console.log(esPalindromo("Ana lava lana"));
console.log(esPalindromo("Anita lava la tina"));
