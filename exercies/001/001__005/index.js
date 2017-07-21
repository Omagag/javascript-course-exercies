var contarLetras = function(str) {
	var resultado = {
		data: {},
		error: null
	};

	try {
		var arrayStr = str.split("");

		for (var i = 0; i < arrayStr.length; i++) {
			if (resultado.data.hasOwnProperty(arrayStr[i])) {
				resultado.data[arrayStr[i]] += 1;
			} else {
				resultado.data[arrayStr[i]] = 1;
			}
		}
	} catch (e) {
		console.error(e);
		resultado.error = "No has enviado un string."
	}

	return resultado;
}

console.log(contarLetras(23534525));
console.log(contarLetras(null));
console.log(contarLetras("aaaaasdgwljkasdngashdfbsdñkj"));
console.log(contarLetras("abbbabcbdabdbdbabababcbcbab"));
console.log(contarLetras("xyyyxyxyxzyxyzyxyxyasdfz"));
