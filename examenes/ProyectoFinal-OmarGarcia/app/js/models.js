class Product {
	constructor(id, nombre, existencias, calorias, precio) {
		this._id = id;
		this._nombre = nombre;
		this._existencias = existencias;
		this._calorias = calorias;
		this._precio = precio;

		this.TD_NAME_CLASS = "product-name";
		this.TD_INFO_CLASS = "product-info";
		
		/*this.setNumeroExistencias(randomBetween(1, 10));
		this.setCalorias(randomBetween(50, 1500));
		this.setPrecio(randomBetween(20, 300));*/
	}
	setNumeroExistencias(existencias) {
		this._existencias = existencias;
	}
	setCalorias(calorias) {
		this._calorias = calorias;
	}
	setPrecio(precio) {
		this._precio = precio;
	}
	buildRowFoodHtml() {
/*		let html = "";
		html += '<tr>';
		html += '<td class="' + this.TD_NAME_CLASS + '">' + this._nombre + '</td>';
		html += '<td class="' + this.TD_INFO_CLASS + '">' + this._calorias + '</td>';
		html += '<td class="' + this.TD_INFO_CLASS + '">' + this._precio + '</td>';
		html += '<td class="' + this.TD_INFO_CLASS + '">' + this._existencias + '</td>';
		html += '</tr>';

		return html;
*/
		let valuesColumns = [{value: this._nombre, className: "column-name"},
							{value: this._calorias, className: "column-name"},
							{value: this._precio, className: "column-name"},
							{value: this._existencias, className: "column-name"}];
		let row = createTRow("td", valuesColumns);
		return row;
	}
}

class Drink extends Product {
	constructor(id, nombre, existencias, calorias, precio, esAlcoholica, grados) {
		super(id, nombre, existencias, calorias, precio);
		this._esAlcoholica = esAlcoholica;
		this._grados = grados;

		/*this.setEsAlcoholica(booleanRandom());
		if (this.esAlcoholica) {
			this.setGradosAlcohol(randomBetween(2, 60));
		}*/
	}
	setEsAlcoholica(esAlcoholica) {
		this._esAlcoholica = esAlcoholica;
	}
	setGradosAlcohol(grados) {
		this._grados = grados;
	}
	static buildDrink(drinkObj) {
		let esAlcoholica = "No";
		if (drinkObj.esAlcoholica) {
			esAlcoholica = "Si";
		}
		//let drink = new Drink(drinkObj._id, drinkObj.nombre, drinkObj.existencias, drinkObj.calorias, drinkObj.precio, drinkObj.esAlcoholica, drinkObj.grados);
		let drink = new Drink(drinkObj._id, drinkObj.nombre, drinkObj.existencias, drinkObj.calorias, drinkObj.precio, esAlcoholica, drinkObj.grados);
		return drink;
	}
	buildRowDrinkHtml(idModal, actionDetails, actionEdit, idConfirmModal, actionDelete) {
		let actions = [];
		
		let detailsAction = createModalButton("Detalle", "button", "", "btn btn-info", idModal, true, actionDetails);
		actions.push(detailsAction);
		let editAction = createModalButton("Editar", "button", "", "btn btn-success", idModal, true, actionEdit);
		actions.push(editAction);
		//let deleteAction = crearButtonHtml("Eliminar", "button", "", "btn btn-danger", actionDelete);
		let deleteAction = createModalButton("Eliminar", "button", "", "btn btn-danger", idConfirmModal, true, actionDelete);
		actions.push(deleteAction);

		let valuesColumns = [{value: this._nombre, className: "column-name"},
							{value: this._calorias, className: "column-name"},
							{value: this._precio, className: "column-name"},
							{value: this._esAlcoholica, className: "column-name"},
							{value: this._grados, className: "column-name"},
							{value: this._existencias, className: "column-name"},
							{value: "", className: "align-center", htmlElements: actions}];
		let row = createTRow("td", valuesColumns);
		return row;
	}
}

class Food extends Product {
	constructor(id, nombre, existencias, calorias, precio, tipo) {
		super(id, nombre, existencias, calorias, precio);
		this._tipo = tipo;
		//this.setTipo(obtenerStringAleatorio(tipoComidas));
	}
	setTipo(tipo) {
		this._tipo = tipo;
	}
	static buildFood(foodObj) {
		let food = new Food(foodObj._id, foodObj.nombre, foodObj.existencias, foodObj.calorias, foodObj.precio, foodObj.tipo);
		return food;
	}
	buildRowFoodHtml(idModal, actionDetails, actionEdit, idConfirmModal, actionDelete) {
		let actions = [];
		
		let detailsAction = createModalButton("Detalle", "button", "", "btn btn-info", idModal, true, actionDetails);
		actions.push(detailsAction);
		let editAction = createModalButton("Editar", "button", "", "btn btn-success", idModal, true, actionEdit);
		actions.push(editAction);
		//let deleteAction = crearButtonHtml("Eliminar", "button", "", "btn btn-danger", actionDelete);
		let deleteAction = createModalButton("Eliminar", "button", "", "btn btn-danger", idConfirmModal, true, actionDelete);
		actions.push(deleteAction);
		
		let valuesColumns = [{value: this._nombre, className: "column-name"},
							{value: this._calorias, className: "column-name"},
							{value: this._precio, className: "column-name"},
							{value: this._tipo, className: "column-name"},
							{value: this._existencias, className: "column-name"},
							{value: "", className: "align-center", htmlElements: actions}, ];
		let row = createTRow("td", valuesColumns);
		return row;
	}
}

