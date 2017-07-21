class LoginPage extends Page {
	constructor(id, title, uri, appContainer, pubsub) {
		super(id, title, uri, appContainer);
		this._pubsub = pubsub;
		this._userApi = new UserAPI();
		
		this.loadTestUsers();

		this.USERNAME_NAME = "username";
		this.PASSWORD_NAME = "password";
		this.REMEMBERME_NAME = "rememberme";

		this.KEY_REMEMBERME = "user-remembered";

		this.FORM_ID = "new-user-form";
		this.MODAL_FORM = "modal-form";
		this.FORM_NAME = "user-name";
		this.FORM_LAST_NAME = "user-lastname";
		this.FORM_EMAIL = "user-is-email";
		this.FORM_USERNAME = "user-username";
		this.FORM_PASSWORD = "user-password";

		this.FORM_BTN_ADD = "add-btn-user";
		this.FORM_BTN_UPDATE = "update-btn-user";

		this.CONFIRM_MODAL = "confirm-modal";
		this.CONFIRM_ACTION_ID = "confirm-action";
		this.CONFIRM_TITLE_ID = "confirm-title";
		this.CONFIRM_MESSAGE_ID = "confirm-message";
	}
	beforeRender() {
		let willRender = true;
		let user = this.retrieveSessionOfUser();
		if (user) {
			this._pubsub.pub("authenticated", true);
			willRender = false;
		}
		return willRender;
	}
	createContainer() {
		let loginContainer = document.createElement("section");
		loginContainer.className += "container ";
		loginContainer.className += "align-center "
		
		let h1 = document.createElement("h1");
		h1.textContent = "The Begin of the End...";
		loginContainer.appendChild(h1);

		let loginForm = document.createElement("form");
		loginForm.className = "col-sm-6 ";
		loginForm.className += "col-md-4 ";
		loginForm.className += "form-signin ";
		let fieldset = document.createElement("fieldset");
		let legend = document.createElement("legend");
		legend.textContent = "Login";
		fieldset.appendChild(legend);

		fieldset.appendChild(crearFieldFormHtml("div", "form-group", "Usuario", "text", this.USERNAME_NAME, "form-control"));
		fieldset.appendChild(crearFieldFormHtml("div", "form-group", "Contraseña", "password", this.PASSWORD_NAME, "form-control"));

		fieldset.appendChild(crearCheckboxFormHtml("div", "checkbox", " Recuérdame", this.REMEMBERME_NAME));

		let div = document.createElement("div");
		//div.className = "btn-group";
		div.appendChild(crearButtonHtml("Ingresar", "button", "", "btn btn-success", ()=>this.retrieveFormData(), false));
		div.appendChild(crearButtonHtml("Cancel", "button", "", "btn btn-danger", ()=>this.clearForm(), false));
		fieldset.appendChild(div);

		let divRegisterme = document.createElement("div");
		divRegisterme.className = "align-right";
		//divRegisterme.appendChild(crearButtonHtml("Registrarme", "button", "", "btn btn-default btn-xs", ()=>this.retrieveFormData(), false));
		divRegisterme.appendChild(createModalButton("Registrar", "button", "", "btn btn-default btn-xs", this.MODAL_FORM, true, ()=>UserPage.buttonsFor("add", this.FORM_BTN_ADD, this.FORM_BTN_UPDATE)));
		fieldset.appendChild(divRegisterme);

		loginContainer.appendChild(UserPage.createUserForm(this.MODAL_FORM, this.FORM_ID, this.FORM_NAME, this.FORM_LAST_NAME, this.FORM_EMAIL, this.FORM_USERNAME, this.FORM_PASSWORD, this.FORM_BTN_ADD, this.FORM_BTN_UPDATE, ()=>this.retrieveFormDataForAdd(), null, ()=>this.clearNewUserForm()));
		
		loginContainer.appendChild(Page.createConfirmModal(this.CONFIRM_MODAL, this.CONFIRM_ACTION_ID, null, this.CONFIRM_TITLE_ID, this.CONFIRM_MESSAGE_ID));

		loginForm.appendChild(fieldset);

		loginContainer.appendChild(loginForm);

		//return loginContainer;
		this.setContainer(loginContainer);
	}
	createNewUserForm() {
		return UserPage.createUserForm();
	}
	addUser(user) {
		this.showLoader();
		this._userApi.addUser(user).then(
			(data)=> {
				//alert(data);
				this.infoModal("Información", data);
				$("#" + this.CONFIRM_MODAL).modal({show: true});
				this.hideLoader();
				this.clearNewUserForm();
			}
		).catch(
			(error)=>{
				//alert(error);
				this.infoModal("Error", "Las datos no son correctos.");
				$("#" + this.CONFIRM_MODAL).modal({show: true});
				this.hideLoader();
			}
		);
	}
	retrieveFormDataForAdd() {
		let name = getValueInput(this.FORM_NAME);
		let lastname = getValueInput(this.FORM_LAST_NAME);
		let email = getValueInput(this.FORM_EMAIL);
		let username = getValueInput(this.FORM_USERNAME);
		let password = getValueInput(this.FORM_PASSWORD);
		
		let user = new User(null, name, lastname, email, username, password);
		this.addUser(user);
	}
	clearNewUserForm() {
		setValueInput(this.FORM_ID, "");
		setValueInput(this.FORM_NAME, "");
		setValueInput(this.FORM_LAST_NAME, "");
		setValueInput(this.FORM_EMAIL, "");
		setValueInput(this.FORM_USERNAME, "");
		setValueInput(this.FORM_PASSWORD, "");
	}
	retrieveFormData() {
		let username = getValueInput(this.USERNAME_NAME);
		let password = getValueInput(this.PASSWORD_NAME);
		let rememberme = getValueCheckbox(this.REMEMBERME_NAME);

		this.authenticate(username, password, rememberme);
	}
	clearForm() {
		setValueInput(this.USERNAME_NAME, "");
		setValueInput(this.PASSWORD_NAME, "");
		setValueCheckbox(this.REMEMBERME_NAME, false);
	}
	authenticate(username, password, rememberme) {
		// TODO: Retrieve the fields and validate if will be remembered
		let users = this.retrieveUsers();
		//let authenticated = false;
		/*for (let i = 0; (!authenticated && i < users.length); i++) {
			authenticated = users[i].authenticate(username, password, rememberme);
			if (authenticated && rememberme) {
				//users[i].rememberSession(this.KEY_REMEMBERME);
				this.rememberSession(this.KEY_REMEMBERME, users[i]._username)
			}
		}*/
		this._userApi.authenticateUser(username, password).then(
			(authenticated)=> {
				if (authenticated) {
					// authenticated = true -> redirect to Home
					if (rememberme) {
						this.rememberSession(this.KEY_REMEMBERME, username);
					}
					this._pubsub.pub("authenticated", authenticated);
				} else {
					// TODO: else show error message
					this.infoModal("Error", "Las datos no son correctos.");
					$("#" + this.CONFIRM_MODAL).modal({show: true});
				}
			}
		);

		this.clearForm()
		/*if (authenticated) {
			// authenticated = true -> redirect to Home
			this._pubsub.pub("authenticated", authenticated);
		} else {
			// TODO: else show error message
		}*/
	}
	logout() {
		localStorage.removeItem(this.KEY_REMEMBERME);
		this._pubsub.pub("authenticated", false);
	}
	loadTestUsers() {
		let users = [];
		for (let i = 0; i < 5; i++) {
			let user = new User("user"+1, "12345678");
			users.push(user);
		}
		this.storeUsers(users);
	}
	storeUsers(users) {
		let usersJson = JSON.stringify(users);
		localStorage.setItem("users", usersJson);
	}
	retrieveUsers() {
		let usersJson = localStorage.getItem("users");
		let usersObj = JSON.parse(usersJson);
		let users = [];
		for (let i = 0; i < usersObj.length; i++) {
			users.push(User.buildUser(usersObj[i]));
		}
		return users;
	}
	retrieveSessionOfUser() {
		let username = null;
		let userStr = localStorage.getItem(this.KEY_REMEMBERME);
		/*let userObj = JSON.parse(userJson);
		if (userObj) {
			user = User.buildUser(userObj);
		}*/
		if (userStr) {
			username = userStr;
		}
		return username;
	}
	rememberSession(KEY_REMEMBERME, data) {
		localStorage.setItem(KEY_REMEMBERME, data);
	}
	removeSession(KEY_REMEMBERME) {
		localStorage.removeItem(KEY_REMEMBERME);
	}
	infoModal(title, message) {
		let btnConfirm = document.getElementById(this.CONFIRM_ACTION_ID); 
		btnConfirm.onclick = null;
		btnConfirm.style.display = "none";

		this.changeConfirmMessage(title, message);
	}
	changeConfirmMessage(title, message) {
		let titleH4 = document.getElementById(this.CONFIRM_TITLE_ID);
		titleH4.textContent = title;

		let messageP = document.getElementById(this.CONFIRM_MESSAGE_ID);
		messageP.textContent = message;
	}
}

/*class User {
	constructor(username, password) {
		this._username = username;
		this._password = password;
	}
	static buildUser(userObj) {
		let user = new User(userObj._username, userObj._password);
		return user;
	}
	authenticate(username, password) {
		let authenticated = this._username == username && this._password == password;

		return authenticated;
	}
	rememberSession(KEY_REMEMBERME) {
		localStorage.setItem(KEY_REMEMBERME, this._username);
	}
	removeSession(KEY_REMEMBERME) {
		localStorage.removeItem(KEY_REMEMBERME);
	}
}*/

class User {
	constructor(id, nombre, apellidos, email, username, password) {
		this._id = id;
		this._nombre = nombre;
		this._apellidos = apellidos;
		this._email = email;
		this._username = username;
		this._password = password;
	}
	static buildUser(userObj) {
		let user = new User(userObj._id, userObj.nombre, userObj.apellidos, userObj.email, userObj.username, null);
		return user;
	}
	buildRowUserHtml(idModal, actionDetails, actionEdit, idConfirmModal, actionDelete) {
		let actions = [];
		
		let detailsAction = createModalButton("Detalle", "button", "", "btn btn-info", idModal, true, actionDetails);
		actions.push(detailsAction);
		let editAction = createModalButton("Editar", "button", "", "btn btn-success", idModal, true, actionEdit);
		actions.push(editAction);
		//let deleteAction = crearButtonHtml("Eliminar", "button", "", "btn btn-danger", actionDelete);
		let deleteAction = createModalButton("Eliminar", "button", "", "btn btn-danger", idConfirmModal, true, actionDelete);
		actions.push(deleteAction);
		
		let valuesColumns = [{value: this._nombre, className: "column-name"},
							{value: this._apellidos, className: "column-name"},
							{value: this._username, className: "column-name"},
							{value: this._email, className: "column-name"},
							{value: "", className: "align-center", htmlElements: actions}, ];
		let row = createTRow("td", valuesColumns);
		return row;
	}
}

