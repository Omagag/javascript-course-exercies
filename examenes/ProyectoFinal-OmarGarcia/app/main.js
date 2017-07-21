class App {
	constructor() {
		this._pubsub = this.initPubSub();
		
		// TODO: regresar App
		this.APP_ID = random(34563422);
		this.APP_CLASS = "main-container";
		
		// Main Cointener for the App, must be created before the Navigator and the Pages
		this._appContainer = this.createAppContainer();

		this._navigator = new Navigator(this._pubsub);
		this.createPages();

		this._navigator.loadHomePage();
	}
	createAppContainer() {
		let appContainer = document.createElement("article");
		appContainer.id = this.APP_ID;
		appContainer.className = this.APP_CLASS;

		// TODO: put here the body.appendChild(appContainer); // Maybe doesn´t work

		return appContainer;
	}
	initPubSub() {
		var suscriptores = {};

		function subcribe(event, callback) {
			if (!suscriptores[event]) {
				var suscriptorArray = [callback];
				suscriptores[event] = suscriptorArray;
			} else {
				suscriptores[event].push(callback);
			}
		}

		function publish(event, data) {
			if (suscriptores[event]) {
				suscriptores[event].forEach(function(callback) {
					callback(data);
				});
			}
		}

		return {
			pub: publish,
			sub: subcribe
		};
	}
	createPages() {
		let loginPage = new LoginPage("login", "Log In", "/login", this._appContainer, this._pubsub);
		this._navigator.addPage(loginPage);
		// LoginPage notify to Navigator that a User is Logon
		this._pubsub.sub("authenticated", (authenticated)=>this._navigator.loadHomePage(authenticated));
		// Navigator notify that the User was logout
		this._pubsub.sub("logout", ()=>loginPage.logout());

		let homePage = new HomePage("home", "Home", "/", this._appContainer);
		this._navigator.addPage(homePage);

		let foodPage = new FoodPage("crud-comida", "Comidas", "/comidas", this._appContainer);
		this._navigator.addPage(foodPage);

		let drinkPage = new DrinkPage("crud-bebida", "Bebidas", "/bebidas", this._appContainer);
		this._navigator.addPage(drinkPage);

		let userPage = new UserPage("crud-usuario", "Usuarios", "/usuarios", this._appContainer);
		this._navigator.addPage(userPage);
	}
}

class Page {
	constructor(id, title, uri, appContainer) {
		this._id = id;
		this._title = title;
		this._uri = uri;
		this._appContainer = appContainer;

		this._header = null;
		this._nav = null;
		this._container = null;
		this._aside = null;
		this._footer = null;

		// CONSTANTS
		this.PAGE_CONTAINER_ID = this._id + "-page";
		this.CONTENT_LOADER_ID = "content-loader";
		this.LOADER_ID = "loader";
		
	}
	beforeRender() {
		return true;
	}
	render(appContainer) {
		if (this.beforeRender()) {
			let body = document.querySelector("body");
			
			removeChildrenElement(body);
			//this.removeChildrenElement(appContainer);
			removeChildrenElement(this._appContainer);

			let pageContainer = document.createElement("article");
			pageContainer.id = this.PAGE_CONTAINER_ID;
			pageContainer.className = "row";

			this.createHeader();
			if (this._header) {
				pageContainer.appendChild(this._header);
			}
			this.createNav();
			if (this._nav) {
				pageContainer.appendChild(this._nav);
			}
			this.createContainer();
			if (this._container) {
				pageContainer.appendChild(this._container);
			}
			this.createAside();
			if (this._aside) {
				pageContainer.appendChild(this._aside);
			}
			this.createFooter();
			if (this._footer) {
				pageContainer.appendChild(this._footer);
			}

			//appContainer.appendChild(pageContainer);
			this._appContainer.appendChild(pageContainer);

			//body.appendChild(appContainer);
			body.appendChild(this._appContainer);

			body.appendChild(this.createLoader());
		}
		this.afterRender();
	}
	afterRender() {

	}
	createLoader() {
		let divContentLoader = document.createElement("div");
		divContentLoader.id = this.CONTENT_LOADER_ID;
		let divLoader = document.createElement("div");
		divLoader.id = this.LOADER_ID;
		divLoader.className = this.LOADER_ID;
		divContentLoader.style.display = "none";
		//divContentLoader.onload = ()=> ocultarLoader();
		divContentLoader.appendChild(divLoader);
		//mainContent.appendChild(divContentLoader);
		//body.appendChild(divContentLoader);
		return divContentLoader;
	}
	showLoader() {
		let divContentLoader = document.getElementById(this.CONTENT_LOADER_ID);
		divContentLoader.style.display = "block";
		let div = document.getElementById(this.LOADER_ID);
		div.style.display = "block";
	}
	hideLoader() {
		let divContentLoader = document.getElementById(this.CONTENT_LOADER_ID);
		divContentLoader.style.display = "none";
		let div = document.getElementById(this.LOADER_ID);
		div.style.display = "none";
	}
	createHeader() {
		//return null;
	}
	createNav() {
		//return null;
	}
	createContainer() {
		//return null;
	}
	createAside() {
		//return null;
	}
	createFooter() {
		//return null;
	}
	setHeader(header) {
		this._header = header;
	}
	setNav(nav) {
		this._nav = nav;
	}
	setContainer(container) {
		this._container = container;
	}
	setAside(aside) {
		this._aside = aside;
	}
	setFooter(footer) {
		this._footer = footer;
	}
	//static createConfirmModal(modalConfirmId, actionConfirmID, actionCancel, message) { // TODO: Invocar desde el botón de Eliminar
	static createConfirmModal(modalConfirmId, actionConfirmID, actionCancel, titleModalId, messageModalId) { // TODO: Invocar desde el botón de Eliminar
		let section = document.createElement("section");
		//section.className = "row";
		section.className = "modal fade";
		//section.role = "dialog";
		section.setAttribute("role", "dialog");
		section.id = modalConfirmId;

		let modalDiv = document.createElement("div");
		modalDiv.className = "modal-dialog";

		let modalContentDiv = document.createElement("div");
		modalContentDiv.className = "modal-content";
		
		// HEADER
		let modalHeaderDiv = document.createElement("div");
		modalHeaderDiv.className = "modal-header";

		/*<button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Modal Header</h4>*/
        let h4 = document.createElement("h4");
        h4.id = titleModalId;
        //h4.textContent = "Confirmación";
        modalHeaderDiv.appendChild(h4);
        modalContentDiv.appendChild(modalHeaderDiv);

        // BODY
		let modalBodyDiv = document.createElement("div");
		modalBodyDiv.className = "modal-body ";
		modalBodyDiv.className += "align-center";

		let p = document.createElement("p");
		p.id = messageModalId;
		//p.textContent = message;
		modalBodyDiv.appendChild(p);
		modalContentDiv.appendChild(modalBodyDiv);

		// FOOTER
		let modalFooterDiv = document.createElement("div");
		modalFooterDiv.className = "modal-footer";
		modalFooterDiv.appendChild(createModalButton("Aceptar", "button", actionConfirmID, "btn btn-success", modalConfirmId, false, null));
		modalFooterDiv.appendChild(createModalButton("Cancelar", "button", "", "btn btn-danger", modalConfirmId, false, actionCancel));
		modalContentDiv.appendChild(modalFooterDiv);

		modalDiv.appendChild(modalContentDiv);

		section.appendChild(modalDiv);
		
		return section;
	}
	confirmActionToExecute(id) {
		//let btnConfirm = document.getElementById(/* ID CONFIRM BUTTON*/); 
		//btnConfirm.onclick = ()=>this.deleteUser(id); /* THE ACTION THAT WILL BE INVOKED */
	}
}

class Navigator {
	constructor(pubsub) {
		this._pubsub = pubsub;
		this._pages = [];
		this._urlOrigin = "";
		this._homeUriPage = "/";

	}
	createMenu() {
		let ulNavBar = document.createElement("ul");
		ulNavBar.className = "nav navbar-nav";

		this._pages.forEach((page) => {
			if (page instanceof AppPage) {
				ulNavBar.appendChild(createSimpleLi(page._title, "", ()=>this.navigateToUrl(page._uri)));
			}
		});
		ulNavBar.appendChild(createSimpleLi("Logout", "", ()=>this.userWillLogOut()));
		
		return ulNavBar;
	}
	userWillLogOut() {
		this._pubsub.pub("logout");
	}
	loadHomePage(authenticated) { // TODO: Maybe add a descriptor of the page or the page itself
		if (authenticated) { // TODO: Condition to validate if it's possible to load Main Page
			// for // TODO: A for to choose which Page will be loaded
			this.navigateToUrl(this._homeUriPage);
			// TODO: For load the Page will be required pub-sub // promises
		} else { // TODO: else redirect to Login Page
			this.navigateToUrl("/login");
		}

	}
	navigateToUrl(url) {
		let pageToLoad = null;
		for (let i = 0; (!pageToLoad && i < this._pages.length); i++) {
			let page = this._pages[i];
			if (page._uri == url) {
				pageToLoad = page;
			}
		}

		if (pageToLoad) {
			if (pageToLoad._uri != "/login") {
				pageToLoad.setMenuUl(this.createMenu());
			}
			pageToLoad.render();
			window.history.pushState("Datos a enviar", pageToLoad._title, pageToLoad._uri);
		}
	}
	navigateToHome() {
		this.navigateToUrl("/");
	}
	addPage(page) {
		this._pages.push(page);
	}
	removePage(page) {
		let index = this._pages.indexOf(page);
		if (index != -1) {
			this._pages.splice(index, 1);
		}
	}
}

window.onload = ()=> {
	let app = new App();
}
