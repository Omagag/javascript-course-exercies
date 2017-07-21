class FoodAPI {
	constructor() {
		this._clienteAPI = new ClientAPI("http://formacion-indra-franlindebl.com/api");
		this._uri = "/comidas";
	}
	getFoods() {
		let promise = this._clienteAPI.get(this._uri).then(
			(data) => {
				let foods = [];

				data.forEach((foodObj) => {
					let food = Food.buildFood(foodObj)
					foods.push(food);
				});

				return foods;
			}
		);

		return promise;
	}
	getFood(id) {
		let promise = this._clienteAPI.get(this._uri +"/" + id).then(
			(data) => {
				let food = Food.buildFood(data);

				return food;
			}
		);

		return promise;
	}
	addFood(food) {
		let obj = this.buildData(food);

		let promise = this._clienteAPI.post(this._uri, obj).then(
			(data) => {
				/*let message = "";
				if (data._id && data._id != "") {
					message = "Comida agregada satisfactoriamente."
				} else {
					message = "Ocurrió un problema [" + data.message + "].";
				}
				return message;*/
				return data.message;
			}
		);/*.catch(
			(error) => {
				return error;
			}
		);*/

		return promise;
	}
	updateFood(food) {
		let obj = this.buildData(food);

		let promise = this._clienteAPI.put(this._uri + "/", food._id, obj).then(
			(data) => {
				/*let message = "";
				if (data._id && data._id != "") {
					message = "Comida actualizada satisfactoriamente."
				} else {
					message = "Ocurrió un problema [" + data.message + "].";
				}
				return message;*/
				return data.message;
			}
		)

		return promise;
	}
	deleteFood(id) {
		let promise = this._clienteAPI.delete(this._uri, id).then(
			(data) => {
				let message = "";
				if (data) {
					message = "Comida eliminada satisfactoriamente."
				} else {
					message = "Ocurrió un problema, intenté más tarde.";
				}
				return message;
				//return data;
			}
		)

		return promise;
	}
	buildData(food) {
		let obj = {
			nombre: food._nombre,
			existencias: food._existencias,
			precio: food._precio,
			calorias: food._calorias,
			tipo: food._tipo
		};
		return obj;
	}
}
class DrinkAPI {
	constructor() {
		this._clienteAPI = new ClientAPI("http://formacion-indra-franlindebl.com/api");
		this._uri = "/bebidas";
	}
	getDrinks() {
		let promise = this._clienteAPI.get(this._uri).then(
			(data) => {
				let drinks = [];

				data.forEach((drinkObj) => {
					let drink = Drink.buildDrink(drinkObj)
					drinks.push(drink);
				});

				return drinks;
			}
		);

		return promise;
	}
	getDrink(id) {
		let promise = this._clienteAPI.get(this._uri + "/" + id).then(
			(data) => {
				let drink = Drink.buildDrink(data);

				return drink;
			}
		);

		return promise;
	}
	addDrink(drink) {
		let obj = this.buildData(drink);

		let promise = this._clienteAPI.post(this._uri, obj).then(
			(data) => {
				/*let message = "";
				if (data._id && data._id != "") {
					message = "Bebida agregada satisfactoriamente."
				} else {
					message = "Ocurrió un problema [" + data.message + "].";
				}
				return message;*/
				return data.message;
			}
		);

		return promise;
	}
	updateDrink(drink) {
		let obj = this.buildData(drink);

		let promise = this._clienteAPI.put(this._uri + "/", drink._id, obj).then(
			(data) => {
				/*let message = "";
				if (data._id && data._id != "") {
					message = "Bebida actualizada satisfactoriamente."
				} else {
					message = "Ocurrió un problema [" + data.message + "].";
				}
				return message;*/
				return data.message;
			}
		)

		return promise;
	}
	deleteDrink(id) {
		let promise = this._clienteAPI.delete(this._uri, id).then(
			(data) => {
				let message = "";
				if (data) {
					message = "Bebida eliminada satisfactoriamente."
				} else {
					message = "Ocurrió un problema, intenté más tarde.";
				}
				return message;
				//return data;
			}
		)

		return promise;
	}
	buildData(drink) {
		let obj = {
			nombre: drink._nombre,
			existencias: drink._existencias,
			precio: drink._precio,
			calorias: drink._calorias,
			esAlcoholica: drink._esAlcoholica,
			grados: drink._grados
		};
		return obj;
	}
}

class UserAPI {
	constructor() {
		this._clienteAPI = new ClientAPI("http://formacion-indra-franlindebl.com/api");
		this._uri = "/users";
	}
	getUsers() {
		let promise = this._clienteAPI.get(this._uri).then(
			(data) => {
				let users = [];

				data.forEach((userObj) => {
					let user = User.buildUser(userObj)
					users.push(user);
				});

				return users;
			}
		);

		return promise;
	}
	getUser(id) {
		let promise = this._clienteAPI.get(this._uri + "/" + id).then(
			(data) => {
				let user = User.buildUser(data);

				return user;
			}
		);

		return promise;
	}
	authenticateUser(username, password) {
		let obj = this.buildAuthenticateData(username, password);

		let promise = this._clienteAPI.post(this._uri + "/login", obj).then(
			(data) => {
				let authenticated = false;
				if (!data.hasOwnProperty("message")) {
					authenticated = true;
				}

				return authenticated;
			}
		);

		return promise;
	}
	addUser(user) {
		let obj = this.buildData(user);

		let promise = this._clienteAPI.post(this._uri, obj).then(
			(data) => {
				//return data.message;
				let message = "";
				if (data._id && data._id != "") {
					message = "Usuario agregado satisfactoriamente."
				} else {
					message = "Ocurrió un problema [" + data.message + "].";
				}
				return message;
			}
		);

		return promise;
	}
	updateUser(user) {
		let obj = this.buildData(user);

		let promise = this._clienteAPI.put(this._uri + "/", user._id, obj).then(
			(data) => {
				//return data.message;
				let message = "";
				if (data._id && data._id != "") {
					message = "Usuario actualizado satisfactoriamente."
				} else {
					message = "Ocurrió un problema [" + data.message + "], intenté más tarde.";
				}
				return message;
			}
		)

		return promise;
	}
	deleteUser(id, password) {
		let obj = {
			password: password
		}
		let promise = this._clienteAPI.delete(this._uri, id, obj).then(
			(data) => {
				let message = "";
				if (data) {
					message = "Usuario eliminado satisfactoriamente."
				} else {
					message = "Ocurrió un problema [contraseña incorrecta], intenté más tarde.";
				}
				return message;
				//return data;
			}
		)

		return promise;
	}
	buildData(user) {
		let obj = {
			nombre: user._nombre,
			apellidos: user._apellidos,
			email: user._email,
			username: user._username,
			password: user._password
		};
		return obj;
	}
	buildAuthenticateData(username, password) {
		let obj = {
			username: username,
			password: password
		};
		return obj;
	}
}

class ClientAPI {
	constructor(urlBase) {
		this.urlBase = urlBase;
	}
	get(uri) {
		let url = this.urlBase + uri;
		let headers = new Headers();

		let init = {
			method: "GET",
			headers: headers
		}

		let promise = fetch(url, init).then(
			(response) => {
				return response.json(); // Revisar porque json() regresa una promesa... no un valor??? O_o
			}
		).catch(
			(error) => {
				console.log(error);
				return error;
			}
		)

		return promise;
	}

	put(uri, id, data) {
		let url = this.urlBase + uri + ("/" + id);
		let headers = new Headers();
		headers.append("Content-Type", "application/json");
		
		let init = {
			method: "PUT",
			headers: headers,
			body: JSON.stringify(data)
		}

		let promise = fetch(url, init).then(
			(response) => {
				return response.json(); // Revisar porque json() regresa una promesa... no un valor??? O_o
			}
		).catch(
			(error) => {
				console.log(error);
				return error;
			}
		)

		return promise;
	}
	post(uri, data) {
		let url = this.urlBase + uri;
		let headers = new Headers();
		headers.append("Content-Type", "application/json");
		

		let init = {
			method: "POST",
			headers: headers,
			body: JSON.stringify(data)
		}

		let promise = fetch(url, init).then(
			(response) => {
				console.log("Status: " + response.status);
				/*if (response.ok) {
					return response.json(); // Revisar porque json() regresa una promesa... no un valor??? O_o
				} else {
					throw response.json();
				}*/
				return response.json(); // Revisar porque json() regresa una promesa... no un valor??? O_o
			}
		).catch(
			(error) => {
				console.log(error);
				return error;
			}
		)

		return promise;
	}
	delete(uri, id, data) {
		let url = this.urlBase + uri + ("/" + id)
		let headers = new Headers();
		headers.append("Content-Type", "application/json");
		
		let init = {
			method: "DELETE",
			headers: headers,
			body: JSON.stringify(data)
		}

		let promise = fetch(url, init).then(
			(response) => {
				if (response.ok) {
					return true;
				}else {
					return false;
				}
			}
		).catch(
			(error) => {
				console.log(error);
				//return error;
				return false;
			}
		)

		return promise;
	}
}