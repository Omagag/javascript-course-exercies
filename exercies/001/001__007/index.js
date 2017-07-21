// posicion	 0   1   2  3  4   5   6   7	
var array = [2, -5, 10, 5, 4, -10, 0, -5];
// ["1,3", "2,5", "3,7", "6, 6"]

var buscarParejas = function(array) {
	var resultado = [];
	var individuo1 = 0;
	var individuo2 = 0;
	array.forEach(function(value, index) {
		array.forEach(function(value2, index2) {
			if ((value + value2) == 0 && index2 >= index) {
				resultado.push(index+","+index2);
			}
		});
	});

	return resultado;
}

console.log(buscarParejas(array));