/*
Tabla de letras

*/
var calculoINI = function(numeroINI) {
	var letra = "";
	var indice = numeroINI%23;
	
	var tablaLetras = ["T", "R", "W", "A", ",G", "H", ",Y", "F", "P", "D", "X", "B", "N", ",J", "Z", "S", "O", "V", "H", "L", "C", "K", "E"];
	letra = tablaLetras[indice];
	
	return letra;
}

//calculoINI(12345678);

console.log("La letra del INI 12312312K es:");
console.log(calculoINI(12312312));
console.log("La letra del INI 78163312C es:");
console.log(calculoINI(78163312));
console.log("La letra del INI 12345678Z es:");
console.log(calculoINI(12345678));