class AppPage extends Page {
	constructor(id, title, uri, appContainer) {
		super(id, title, uri, appContainer);
		
		this._menuUl = null;

		this.HEADER_ID = "app-page-header";
		this.NAV_ID = "app-page-nav";
		this.CONTAINER_ID = "app-page-container";
		this.ASIDE_ID = "app-page-aside";
		this.FOOTER_ID = "app-page-footer";
	}
	createNav() {
		let nav = document.createElement("nav");
		nav.id = this.NAV_ID;
		nav.className = "navbar navbar-default navbar-fixed-top";

		let divContainer = document.createElement("div");
		divContainer.className = "container";

		let divNavHeader = document.createElement("div");
		divNavHeader.className = "navbar-header";
		/* <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>*/
		let buttonNavHeader = document.createElement("button");
		buttonNavHeader.className = "navbar-toggle collapsed";
		buttonNavHeader.type = "button";
		buttonNavHeader.setAttribute("data-toggle", "collapse");
		buttonNavHeader.setAttribute("aria-expanded", "false");
		buttonNavHeader.setAttribute("aria-controls", "navbar");
		let span = document.createElement("span");
		span.className = "sr-only";
		span.textContent = "Toggle navigation";
		buttonNavHeader.appendChild(span);
		for (let i = 0; i < 3; i++) {
			let span2 = document.createElement("span");
			span2.className = "icon-bar";
			buttonNavHeader.appendChild(span2);
		}
		divNavHeader.appendChild(buttonNavHeader);
		let aNavHeader = document.createElement("a");
		aNavHeader.className = "navbar-brand";
		aNavHeader.textContent = "Proyecto Final";
		divNavHeader.appendChild(aNavHeader);
		divContainer.appendChild(divNavHeader);

		let divNavBar = document.createElement("div");
		divNavBar.id = "navbar";
		divNavBar.className = "navbar-collapse collapse";

		/*let ulNavBar = document.createElement("ul");
		ulNavBar.className = "nav navbar-nav";

		this._pages.forEach((page) => {
			if (page instanceof AppPage) {
				ulNavBar.appendChild(createSimpleLi(page._title, "", ()=>this.navigateToUrl(page._uri)));
			}
		});
		
		divNavBar.appendChild(ulNavBar);*/
		divNavBar.appendChild(this._menuUl);

		divContainer.appendChild(divNavBar);

		nav.appendChild(divContainer);

		//return nav;
		this.setNav(nav);
	}
	setMenuUl(menuUl) {
		this._menuUl = menuUl;
	}
}

class HomePage extends AppPage {
	constructor(id, title, uri, appContainer) {
		super(id, title, uri, appContainer);
		this._foods = [];
		this._drinks = [];
		this._foodApi = new FoodAPI();
		this._drinkApi = new DrinkAPI();

		this.CONFIRM_MODAL = "confirm-modal";
		this.CONFIRM_ACTION_ID = "confirm-action";

		this.FOODS_CHART_ID = "my-foods-chart";
		this.FOODS_CHART_2_ID = "my-foods-chart-2";
		this.DRINKS_CHART_ID = "my-drinks-chart";
		this.DRINKS_CHART_2_ID = "my-drinks-chart-2";
	}
	beforeRender() {
		return true;
	}
	createContainer() {
		//let container = document.createElement("section");

		let sectionContainer = document.createElement("section");
		sectionContainer.className += "container ";
		
		let divPageHeader = document.createElement("div");
		divPageHeader.className += "page-header ";
		let h1 = document.createElement("h1");
		h1.textContent = "Bienvenido!!!";
		divPageHeader.appendChild(h1);
		sectionContainer.appendChild(divPageHeader);

		let sectionCharts = document.createElement("section");

		let divFoods =document.createElement("div");
		divFoods.className = "col-md-6";
		let h2Foods = document.createElement("h2");
		h2Foods.textContent = "Comidas Existencias";
		divFoods.appendChild(h2Foods);

		let canvasFoods = document.createElement("canvas");
		canvasFoods.id = this.FOODS_CHART_ID;
		divFoods.appendChild(canvasFoods);

		sectionContainer.appendChild(divFoods);

		let divFoods2 =document.createElement("div");
		divFoods2.className = "col-md-6";
		let h2Foods2 = document.createElement("h2");
		h2Foods2.textContent = "Comidas Existencias";
		divFoods2.appendChild(h2Foods2);

		let canvasFoods2 = document.createElement("canvas");
		canvasFoods2.id = this.FOODS_CHART_2_ID;
		divFoods2.appendChild(canvasFoods2);

		sectionContainer.appendChild(divFoods2);


		let divDrinks = document.createElement("div");
		divDrinks.className = "col-md-6";
		let h2Drinks = document.createElement("h2");
		h2Drinks.textContent = "Bebidas Existencias";
		divDrinks.appendChild(h2Drinks);

		let canvasDrinks = document.createElement("canvas");
		canvasDrinks.id = this.DRINKS_CHART_ID;
		divDrinks.appendChild(canvasDrinks);

		sectionContainer.appendChild(divDrinks);

		let divDrinks2 = document.createElement("div");
		divDrinks2.className = "col-md-6";
		let h2Drinks2 = document.createElement("h2");
		h2Drinks2.textContent = "Bebidas Precios";
		divDrinks2.appendChild(h2Drinks2);

		let canvasDrinks2 = document.createElement("canvas");
		canvasDrinks2.id = this.DRINKS_CHART_2_ID;
		divDrinks2.appendChild(canvasDrinks2);

		sectionContainer.appendChild(divDrinks2);
		/*sectionContainer.appendChild(this.createFoodForm());
		
		sectionContainer.appendChild(this.createFoodTable());

		sectionContainer.appendChild(Page.createConfirmModal(this.CONFIRM_MODAL, this.CONFIRM_ACTION_ID, null, "¿Está seguro de que desea eliminar el elemento?"));

		//<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>
		sectionContainer.appendChild(createModalButton("Nuevo", "button", "", "btn btn-info", this.MODAL_FORM, true, ()=>this.buttonsFor("add")));
*/
		this.setContainer(sectionContainer);
	}
	afterRender() {
		window.setTimeout(()=>this.getData(), 500);
	}
	getData() {
		this.getFoods();
		this.getDrinks();
	}
	getFoods() {
		this.showLoader();
		this._foodApi.getFoods().then(
			(foods) => {
				this._foods = foods;
				this.hideLoader();
				this.printChartFoods();
			}
		).catch((error)=> {
			//alert(error);
			this.infoModal("Error", error);
			$("#" + this.CONFIRM_MODAL).modal({show: true});
				
			this.hideLoader();
		});
	}
	getDrinks() {
		this.showLoader();
		this._drinkApi.getDrinks().then(
			(drinks) => {
				this._drinks = drinks;
				this.hideLoader();
				this.printChartDrinks();
			}
		).catch((error)=> {
			//alert(error);
			this.infoModal("Error", error);
			$("#" + this.CONFIRM_MODAL).modal({show: true});
				
			this.hideLoader();
		});
	}
	printChartFoods() {
		let data = [];
		
		let labels = [];
		let values = [];
		
		this._foods.forEach((food)=>{
			let obj = {
				value: food._existencias,
				label: food._nombre
			}
			data.push(obj);
			labels.push(food._nombre);
			values.push(food._precio);
		});
		var option = {
	    	responsive: true,
	    };

		var ctx = document.getElementById(this.FOODS_CHART_ID).getContext('2d');
		var myPieChart = new Chart(ctx).Pie(data,option);

		var data2 = {
		    labels: labels,
		    datasets: [
		        {
		            label: "My First dataset",
		            fillColor: "rgba(220,220,220,0.5)",
		            strokeColor: "rgba(220,220,220,0.8)",
		            highlightFill: "rgba(220,220,220,0.75)",
		            highlightStroke: "rgba(220,220,220,1)",
		            data: values
		        }
		    ]
		};
		var ctx2 = document.getElementById(this.FOODS_CHART_2_ID).getContext('2d');
		var myBarChart = new Chart(ctx2).Bar(data2, option);
	}
	printChartDrinks() {
		let data = [];

		let labels = [];
		let values = [];
		
		this._drinks.forEach((drink)=>{
			let obj = {
				value: drink._existencias,
				label: drink._nombre
			}
			data.push(obj);
			labels.push(drink._nombre);
			values.push(drink._precio);
		});
		var option = {
	    	responsive: true,
	    };

		var ctx = document.getElementById(this.DRINKS_CHART_ID).getContext('2d');
		var myPieChart = new Chart(ctx).Pie(data,option);

		var data2 = {
		    labels: labels,
		    datasets: [
		        {
		            label: "My First dataset",
		            fillColor: "rgba(220,220,220,0.5)",
		            strokeColor: "rgba(220,220,220,0.8)",
		            highlightFill: "rgba(220,220,220,0.75)",
		            highlightStroke: "rgba(220,220,220,1)",
		            data: values
		        }
		    ]
		};
		var ctx2 = document.getElementById(this.DRINKS_CHART_2_ID).getContext('2d');
		var myBarChart = new Chart(ctx2).Bar(data2, option);
	}
}

class FoodPage extends AppPage {
	constructor(id, title, uri, appContainer) {
		super(id, title, uri, appContainer);
		this._foods = [];
		this._foodApi = new FoodAPI();

		this.TABLE_ID = "table-list-foods";
		this.TBODY_ID = "table-body-foods";

		this.MODAL_FORM = "modal-form";

		this.FORM_ID = "food-id";
		this.FORM_NAME = "food-name";
		this.FORM_EXISTENCE = "food-existence";
		this.FORM_PRICE = "food-price";
		this.FORM_TYPE = "food-type";
		this.FORM_CALORIES = "food-calories";

		this.FORM_BTN_ADD = "food-btn-add";
		this.FORM_BTN_UPDATE = "food-btn-update";

		this.CONFIRM_MODAL = "confirm-modal";
		this.CONFIRM_ACTION_ID = "confirm-action";
		this.CONFIRM_TITLE_ID = "confirm-title";
		this.CONFIRM_MESSAGE_ID = "confirm-message";
	}
	beforeRender() {
		return true;
	}
	createContainer() {
		//let container = document.createElement("section");

		let sectionContainer = document.createElement("section");
		sectionContainer.className += "container ";
		
		let divPageHeader = document.createElement("div");
		divPageHeader.className += "page-header ";
		let h1 = document.createElement("h1");
		h1.textContent = "Comidas";
		divPageHeader.appendChild(h1);
		sectionContainer.appendChild(divPageHeader);

		sectionContainer.appendChild(this.createFoodForm());
		
		sectionContainer.appendChild(this.createFoodTable());

		//sectionContainer.appendChild(Page.createConfirmModal(this.CONFIRM_MODAL, this.CONFIRM_ACTION_ID, null, "¿Está seguro de que desea eliminar el elemento?"));
		sectionContainer.appendChild(Page.createConfirmModal(this.CONFIRM_MODAL, this.CONFIRM_ACTION_ID, null, this.CONFIRM_TITLE_ID, this.CONFIRM_MESSAGE_ID));

		//<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>
		sectionContainer.appendChild(createModalButton("Nuevo", "button", "", "btn btn-info", this.MODAL_FORM, true, ()=>this.buttonsFor("add")));

		this.setContainer(sectionContainer);
	}
	afterRender() {
		window.setTimeout(()=>this.getFoods(), 500);
	}
	getFoods() {
		this.showLoader();
		this._foodApi.getFoods().then(
			(foods) => {
				this._foods = foods;
				this.hideLoader();
				this.printFoodList();
			}
		).catch((error)=> {
			//alert(error);
			this.infoModal("Error", error);
			$("#" + this.CONFIRM_MODAL).modal({show: true});
				
			this.hideLoader();
		});
	}
	getFood(id) {
		this.showLoader();
		this._foodApi.getFood(id).then(
			(food) => {
				this.hideLoader();
				
				this.fillFormData(food, "details");
			}
		).catch((error)=> {
			//alert(error);
			this.infoModal("Error", error);
			$("#" + this.CONFIRM_MODAL).modal({show: true});
				
			this.hideLoader();
		});
	}
	addFood(food) {
		this.showLoader();
		this._foodApi.addFood(food).then(
			(data)=> {
				//alert(data);
				this.infoModal("Información", data);
				$("#" + this.CONFIRM_MODAL).modal({show: true});
				
				this.hideLoader();
				this.getFoods();
				this.clearForm();
			}
		).catch(
			(error)=>{
				//alert(error);
				this.infoModal("Error", error);
				$("#" + this.CONFIRM_MODAL).modal({show: true});
				
				this.hideLoader();
			}
		);
	}
	updateFood(food) {
		this.showLoader();
		this._foodApi.updateFood(food).then(
			(data)=> {
				//alert(data);
				this.infoModal("Información", data);
				$("#" + this.CONFIRM_MODAL).modal({show: true});
				
				this.hideLoader();
				this.getFoods();
				this.clearForm();
			}
		).catch(
			(error)=>{
				//alert(error);
				this.infoModal("Error", error);
				$("#" + this.CONFIRM_MODAL).modal({show: true});
				
				this.hideLoader();
			}
		);
	}
	deleteFood(id) {
		this.showLoader();
		this._foodApi.deleteFood(id).then(
			(data)=> {
				/*if (data){
					alert("Comida eliminada.");
				}*/
				//alert(data);
				this.infoModal("Información", data);
				$("#" + this.CONFIRM_MODAL).modal({show: true});
				
				this.hideLoader();
				this.getFoods();
			}
		).catch(
			(error)=>{
				//alert(error);
				this.infoModal("Error", error);
				$("#" + this.CONFIRM_MODAL).modal({show: true});
				
				this.hideLoader();
			}
		);
	}
	printFoodList() {
		let table = document.getElementById(this.TABLE_ID);
		table.innerHTML = "";

		let columnsNames = [{value: "Nombre", className:""}, 
							{value: "Calorias", className:""},
							{value: "Precio", className:""},
							{value: "Tipo", className:""},
							{value: "Existencias", className:""},
							{value: "Acciones", className:""}];
		table.appendChild(createTHead(columnsNames));
		let tbody = document.createElement("tbody");
		tbody.id = this.TBODY_ID;
		table.appendChild(tbody);

		this._foods.forEach((food) => {
			//tbody.appendChild(food.buildRowFoodHtml(this.MODAL_FORM, ()=>this.getFood(food._id), ()=>this.fillFormData(food, "update"), ()=>this.deleteFood(food._id)));
			tbody.appendChild(food.buildRowFoodHtml(this.MODAL_FORM, ()=>this.getFood(food._id), ()=>this.fillFormData(food, "update"), this.CONFIRM_MODAL, ()=>this.confirmActionToExecute(food._id, "Confirmar", "¿Desea eliminar el elemento?")));
		});
	}
	createFoodTable() {
		let section = document.createElement("section");
		section.className = "row";
		
		let divTable = document.createElement("div");
		divTable.className = "col-sm-12 ";
		
		let h2 = document.createElement("h2");
		h2.textContent = "Lista de Comidas";
		divTable.appendChild(h2);
		let table = document.createElement("table");
		table.id = this.TABLE_ID;
		table.className += "table ";
		table.className += "table-striped ";
		divTable.appendChild(table);

		section.appendChild(divTable);
		//return divTable
		return section;
	}
	createFoodForm() {
		let section = document.createElement("section");
		//section.className = "row";
		section.className = "modal fade";
		//section.role = "dialog";
		section.setAttribute("role", "dialog");
		section.id = this.MODAL_FORM;

		let modalDiv = document.createElement("div");
		modalDiv.className = "modal-dialog";

		let modalContentDiv = document.createElement("div");
		modalContentDiv.className = "modal-content";
		
		let divForm = document.createElement("div");
		divForm.className = "modal-body";
		
		let form = document.createElement("form");
		//form.className = "form-inline";
		let fieldset = document.createElement("fieldset");
		let legend = document.createElement("legend");
		legend.textContent = "Nueva Comida";
		fieldset.appendChild(legend);
		
		//let fieldClassName = "col-xs-2";
		let fieldClassName = "form-group";
		fieldset.appendChild(crearFieldFormHtml("div", "", "", "hidden", this.FORM_ID, ""));
		fieldset.appendChild(crearFieldFormHtml("div", fieldClassName, "Nombre", "text", this.FORM_NAME, "form-control"));
		fieldset.appendChild(crearFieldFormHtml("div", fieldClassName, "Existencia", "text", this.FORM_EXISTENCE, "form-control"));
		fieldset.appendChild(crearFieldFormHtml("div", fieldClassName, "Calorias", "text", this.FORM_CALORIES, "form-control"));
		fieldset.appendChild(crearFieldFormHtml("div", fieldClassName, "Precio", "text", this.FORM_PRICE, "form-control"));
		fieldset.appendChild(crearFieldFormHtml("div", fieldClassName, "Tipo", "text", this.FORM_TYPE, "form-control"));
		
		fieldset.appendChild(createModalButton("Agregar", "button", this.FORM_BTN_ADD, "btn btn-success", this.MODAL_FORM, false, ()=>this.retrieveFormDataForAdd()));
		fieldset.appendChild(createModalButton("Actualizar", "button", this.FORM_BTN_UPDATE, "btn btn-success", this.MODAL_FORM, false, ()=>this.retrieveFormDataForUpdate()));
		fieldset.appendChild(createModalButton("Cancelar", "button", "", "btn btn-danger", this.MODAL_FORM, false, ()=>this.clearForm()));

		form.appendChild(fieldset);
		
		divForm.appendChild(form);
		
		modalContentDiv.appendChild(divForm);

		modalDiv.appendChild(modalContentDiv);

		section.appendChild(modalDiv);
		
		return section;
	}
	buttonsFor(action) {
		let buttonAdd = document.getElementById(this.FORM_BTN_ADD);
		let buttonUpdate = document.getElementById(this.FORM_BTN_UPDATE);
		if (action == "add") {
			buttonAdd.style.display = "inline-block";
			buttonUpdate.style.display = "none";
		} else if (action == "update") {
			buttonAdd.style.display = "none";
			buttonUpdate.style.display = "inline-block";
		} else {
			buttonAdd.style.display = "none";
			buttonUpdate.style.display = "none";
		}
	}
	retrieveFormDataForAdd() {
		let name = getValueInput(this.FORM_NAME);
		let existence = getValueInput(this.FORM_EXISTENCE);
		let calories = getValueInput(this.FORM_CALORIES);
		let price = getValueInput(this.FORM_PRICE);
		let type = getValueInput(this.FORM_TYPE);
		
		let food = new Food(null, name, existence, calories, price, type);
		this.addFood(food);
		//this.clearForm();
	}
	retrieveFormDataForUpdate() {
		let id = getValueInput(this.FORM_ID);
		let name = getValueInput(this.FORM_NAME);
		let existence = getValueInput(this.FORM_EXISTENCE);
		let calories = getValueInput(this.FORM_CALORIES);
		let price = getValueInput(this.FORM_PRICE);
		let type = getValueInput(this.FORM_TYPE);
		
		let food = new Food(id, name, existence, calories, price, type);
		this.updateFood(food);
		//this.clearForm();
	}
	clearForm() {
		setValueInput(this.FORM_ID, "");
		setValueInput(this.FORM_NAME, "");
		setValueInput(this.FORM_EXISTENCE, "");
		setValueInput(this.FORM_CALORIES, "");
		setValueInput(this.FORM_PRICE, "");
		setValueInput(this.FORM_TYPE, "");
	}
	fillFormData(food, action) {
		this.buttonsFor(action);

		setValueInput(this.FORM_ID, food._id);
		setValueInput(this.FORM_NAME, food._nombre);
		setValueInput(this.FORM_EXISTENCE, food._existencias);
		setValueInput(this.FORM_CALORIES, food._calorias);
		setValueInput(this.FORM_PRICE, food._precio);
		setValueInput(this.FORM_TYPE, food._tipo);
	}
	confirmActionToExecute(id, title, message) {
		let btnConfirm = document.getElementById(this.CONFIRM_ACTION_ID); 
		btnConfirm.onclick = ()=>this.deleteFood(id); /* THE ACTION THAT WILL BE INVOKED */

		this.changeConfirmMessage(title, message);
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

class DrinkPage extends AppPage {
	constructor(id, title, uri, appContainer) {
		super(id, title, uri, appContainer);
		this._drinks = [];
		this._drinkApi = new DrinkAPI();

		this.TABLE_ID = "table-list-drinks";
		this.TBODY_ID = "table-body-drinks";

		this.MODAL_FORM = "modal-form";

		this.FORM_ID = "drink-id";
		this.FORM_NAME = "drink-name";
		this.FORM_EXISTENCE = "drink-existence";
		this.FORM_PRICE = "drink-price";
		this.FORM_DEEGRES = "drink-deegres";
		this.FORM_IS_ALCOHOLIC = "drink-is-alcoholic";
		this.FORM_CALORIES = "drink-calories";

		this.FORM_BTN_ADD = "drink-btn-add";
		this.FORM_BTN_UPDATE = "drink-btn-update";

		this.CONFIRM_MODAL = "confirm-modal";
		this.CONFIRM_ACTION_ID = "confirm-action";
		this.CONFIRM_TITLE_ID = "confirm-title";
		this.CONFIRM_MESSAGE_ID = "confirm-message";
	}
	beforeRender() {
		return true;
	}
	createContainer() {
		//let container = document.createElement("section");

		let sectionContainer = document.createElement("section");
		sectionContainer.className += "container ";
		
		let divPageHeader = document.createElement("div");
		divPageHeader.className += "page-header ";
		let h1 = document.createElement("h1");
		h1.textContent = "Bebidas";
		divPageHeader.appendChild(h1);
		sectionContainer.appendChild(divPageHeader);

		sectionContainer.appendChild(this.createDrinkForm());
		
		sectionContainer.appendChild(this.createDrinkTable());

		sectionContainer.appendChild(Page.createConfirmModal(this.CONFIRM_MODAL, this.CONFIRM_ACTION_ID, null, this.CONFIRM_TITLE_ID, this.CONFIRM_MESSAGE_ID));

		//<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>
		sectionContainer.appendChild(createModalButton("Nuevo", "button", "", "btn btn-info", this.MODAL_FORM, true, ()=>this.buttonsFor("add")));

		this.setContainer(sectionContainer);
	}
	afterRender() {
		window.setTimeout(()=>this.getDrinks(), 500);
	}
	getDrinks() {
		this.showLoader();
		this._drinkApi.getDrinks().then(
			(drinks) => {
				this._drinks = drinks;
				this.hideLoader();
				this.printDrinkList();
			}
		).catch((error)=> {
			//alert(error);
			this.infoModal("Error", error);
			$("#" + this.CONFIRM_MODAL).modal({show: true});
				
			this.hideLoader();
		});
		 //$("#" + this.CONFIRM_MODAL).modal({show: true});
		 //let modal = document.getElementById(this.CONFIRM_MODAL);
		 /*modal.style.display = "block";
		 modal.className = "modal fade-in";*/
		 //modal.modal({show: true})
	}
	getDrink(id) {
		this.showLoader();
		this._drinkApi.getDrink(id).then(
			(drink) => {
				this.hideLoader();
				
				this.fillFormData(drink, "details");
			}
		).catch((error)=> {
			//alert(error);
			this.infoModal("Error", error);
			$("#" + this.CONFIRM_MODAL).modal({show: true});
				
			this.hideLoader();
		});
	}
	addDrink(drink) {
		this.showLoader();
		this._drinkApi.addDrink(drink).then(
			(data)=> {
				//alert(data);
				//this.hideLoader();

				this.infoModal("Información", data);
				$("#" + this.CONFIRM_MODAL).modal({show: true});
				/*let modal = document.getElementById(this.CONFIRM_MODAL);
				modal.modal({show: true});*/
				
				this.getDrinks();
				this.clearForm();
			}
		).catch(
			(error)=>{
				//alert(error);
				this.infoModal("Error", error);
				$("#" + this.CONFIRM_MODAL).modal({show: true});
				
				this.hideLoader();
			}
		);
	}
	updateDrink(drink) {
		this.showLoader();
		this._drinkApi.updateDrink(drink).then(
			(data)=> {
				//alert(data);
				this.infoModal("Información", data);
				$("#" + this.CONFIRM_MODAL).modal({show: true});
				
				this.hideLoader();
				this.getDrinks();
				this.clearForm();
			}
		).catch(
			(error)=>{
				//alert(error);
				this.infoModal("Error", error);
				$("#" + this.CONFIRM_MODAL).modal({show: true});
				
				this.hideLoader();
			}
		);
	}
	deleteDrink(id) {
		this.showLoader();
		this._drinkApi.deleteDrink(id).then(
			(data)=> {
				/*if (data){
					alert("Bebida eliminada.");
				}*/
				//alert(data);
				this.infoModal("Información", data);
				$("#" + this.CONFIRM_MODAL).modal({show: true});
				
				this.hideLoader();
				this.getDrinks();
			}
		).catch(
			(error)=>{
				//alert(error);
				this.infoModal("Error", error);
				$("#" + this.CONFIRM_MODAL).modal({show: true});
				
				this.hideLoader();
			}
		);
	}
	printDrinkList() {
		let table = document.getElementById(this.TABLE_ID);
		table.innerHTML = "";

		let columnsNames = [{value: "Nombre", className:""}, 
							{value: "Calorias", className:""},
							{value: "Precio", className:""},
							{value: "Alcohólica", className:""},
							{value: "Grados alcohol", className:""},
							{value: "Existencias", className:""},
							{value: "Acciones", className:""}];
		table.appendChild(createTHead(columnsNames));
		let tbody = document.createElement("tbody");
		tbody.id = this.TBODY_ID;
		table.appendChild(tbody);

		this._drinks.forEach((drink) => {
			//tbody.appendChild(drink.buildRowDrinkHtml(this.MODAL_FORM, ()=>this.getDrink(drink._id), ()=>this.fillFormData(drink, "update"), ()=>this.deleteDrink(drink._id)));
			tbody.appendChild(drink.buildRowDrinkHtml(this.MODAL_FORM, ()=>this.getDrink(drink._id), ()=>this.fillFormData(drink, "update"), this.CONFIRM_MODAL, ()=>this.confirmActionToExecute(drink._id, "Confirmación", "¿Desea eliminar este elemento?")));
		});
	}
	createDrinkTable() {
		let section = document.createElement("section");
		section.className = "row";
		
		let divTable = document.createElement("div");
		divTable.className = "col-sm-12 ";
		
		let h2 = document.createElement("h2");
		h2.textContent = "Lista de Bebidas";
		divTable.appendChild(h2);
		let table = document.createElement("table");
		table.id = this.TABLE_ID;
		table.className += "table ";
		table.className += "table-striped ";
		divTable.appendChild(table);

		section.appendChild(divTable);
		//return divTable
		return section;
	}
	createDrinkForm() {
		let section = document.createElement("section");
		//section.className = "row";
		section.className = "modal fade";
		//section.role = "dialog";
		section.setAttribute("role", "dialog");
		section.id = this.MODAL_FORM;

		let modalDiv = document.createElement("div");
		modalDiv.className = "modal-dialog";

		let modalContentDiv = document.createElement("div");
		modalContentDiv.className = "modal-content";
		
		let divForm = document.createElement("div");
		divForm.className = "modal-body";
		
		let form = document.createElement("form");
		//form.className = "form-inline";
		let fieldset = document.createElement("fieldset");
		let legend = document.createElement("legend");
		legend.textContent = "Nueva Bebida";
		fieldset.appendChild(legend);
		
		//let fieldClassName = "col-xs-2";
		let fieldClassName = "form-group";
		fieldset.appendChild(crearFieldFormHtml("div", "", "", "hidden", this.FORM_ID, ""));
		fieldset.appendChild(crearFieldFormHtml("div", fieldClassName, "Nombre", "text", this.FORM_NAME, "form-control"));
		fieldset.appendChild(crearFieldFormHtml("div", fieldClassName, "Existencia", "text", this.FORM_EXISTENCE, "form-control"));
		fieldset.appendChild(crearFieldFormHtml("div", fieldClassName, "Calorias", "text", this.FORM_CALORIES, "form-control"));
		fieldset.appendChild(crearFieldFormHtml("div", fieldClassName, "Precio", "text", this.FORM_PRICE, "form-control"));
		fieldset.appendChild(crearCheckboxFormHtml("div", fieldClassName, "Es alcohólica", this.FORM_IS_ALCOHOLIC));
		fieldset.appendChild(crearFieldFormHtml("div", fieldClassName, "Grados alcohol", "text", this.FORM_DEEGRES, "form-control"));
		
		fieldset.appendChild(createModalButton("Agregar", "button", this.FORM_BTN_ADD, "btn btn-success", this.MODAL_FORM, false, ()=>this.retrieveFormDataForAdd()));
		fieldset.appendChild(createModalButton("Actualizar", "button", this.FORM_BTN_UPDATE, "btn btn-success", this.MODAL_FORM, false, ()=>this.retrieveFormDataForUpdate()));
		fieldset.appendChild(createModalButton("Cancelar", "button", "", "btn btn-danger", this.MODAL_FORM, false, ()=>this.clearForm()));

		form.appendChild(fieldset);
		
		divForm.appendChild(form);
		
		modalContentDiv.appendChild(divForm);

		modalDiv.appendChild(modalContentDiv);

		section.appendChild(modalDiv);
		
		return section;
	}
	buttonsFor(action) {
		let buttonAdd = document.getElementById(this.FORM_BTN_ADD);
		let buttonUpdate = document.getElementById(this.FORM_BTN_UPDATE);
		if (action == "add") {
			buttonAdd.style.display = "inline-block";
			buttonUpdate.style.display = "none";
		} else if (action == "update") {
			buttonAdd.style.display = "none";
			buttonUpdate.style.display = "inline-block";
		} else {
			buttonAdd.style.display = "none";
			buttonUpdate.style.display = "none";
		}
	}
	retrieveFormDataForAdd() {
		let name = getValueInput(this.FORM_NAME);
		let existence = getValueInput(this.FORM_EXISTENCE);
		let calories = getValueInput(this.FORM_CALORIES);
		let price = getValueInput(this.FORM_PRICE);
		let isAlcoholic = getValueCheckbox(this.FORM_IS_ALCOHOLIC);
		let deegres = getValueInput(this.FORM_DEEGRES);
		
		let drink = new Drink(null, name, existence, calories, price, isAlcoholic, deegres);
		this.addDrink(drink);
		//this.clearForm();
	}
	retrieveFormDataForUpdate() {
		let id = getValueInput(this.FORM_ID);
		let name = getValueInput(this.FORM_NAME);
		let existence = getValueInput(this.FORM_EXISTENCE);
		let calories = getValueInput(this.FORM_CALORIES);
		let price = getValueInput(this.FORM_PRICE);
		let isAlcoholic = getValueCheckbox(this.FORM_IS_ALCOHOLIC);
		let deegres = getValueInput(this.FORM_DEEGRES);
		
		let drink = new Drink(id, name, existence, calories, price, isAlcoholic, deegres);
		this.updateDrink(drink);
		//this.clearForm();
	}
	clearForm() {
		setValueInput(this.FORM_ID, "");
		setValueInput(this.FORM_NAME, "");
		setValueInput(this.FORM_EXISTENCE, "");
		setValueInput(this.FORM_CALORIES, "");
		setValueInput(this.FORM_PRICE, "");
		setValueCheckbox(this.FORM_IS_ALCOHOLIC, false);
		setValueInput(this.FORM_DEEGRES, "");
	}
	fillFormData(drink, action) {
		this.buttonsFor(action);

		setValueInput(this.FORM_ID, drink._id);
		setValueInput(this.FORM_NAME, drink._nombre);
		setValueInput(this.FORM_EXISTENCE, drink._existencias);
		setValueInput(this.FORM_CALORIES, drink._calorias);
		setValueInput(this.FORM_PRICE, drink._precio);
		setValueCheckbox(this.FORM_IS_ALCOHOLIC, drink._esAlcoholica);
		setValueInput(this.FORM_DEEGRES, drink._grados);
	}
	confirmActionToExecute(id, title, message) {
		let btnConfirm = document.getElementById(this.CONFIRM_ACTION_ID); 
		btnConfirm.onclick = ()=>this.deleteDrink(id); /* THE ACTION THAT WILL BE INVOKED */

		this.changeConfirmMessage(title, message);
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

class UserPage extends AppPage {
	constructor(id, title, uri, appContainer) {
		super(id, title, uri, appContainer);
		this._users = [];
		this._userApi = new UserAPI();

		this.TABLE_ID = "table-list-users";
		this.TBODY_ID = "table-body-users";

		this.MODAL_FORM = "modal-form";

		this.CONFIRM_MODAL = "confirm-modal";
		this.CONFIRM_ACTION_ID = "confirm-btn";
		this.CONFIRM_PASSWORD = "confirm-password";
		this.CONFIRM_FIELD_ID = "confirm-field-password";
		this.CONFIRM_TITLE_ID = "confirm-title";
		this.CONFIRM_MESSAGE_ID = "confirm-message";

		this.FORM_ID = "user-id";
		this.FORM_NAME = "user-name";
		this.FORM_LAST_NAME = "user-lastname";
		this.FORM_USERNAME = "user-username";
		this.FORM_PASSWORD = "user-password";
		this.FORM_EMAIL = "user-is-email";
		
		this.FORM_BTN_ADD = "user-btn-add";
		this.FORM_BTN_UPDATE = "user-btn-update";
	}
	beforeRender() {
		return true;
	}
	createContainer() {
		//let container = document.createElement("section");

		let sectionContainer = document.createElement("section");
		sectionContainer.className += "container ";
		
		let divPageHeader = document.createElement("div");
		divPageHeader.className += "page-header ";
		let h1 = document.createElement("h1");
		h1.textContent = "Usuarios";
		divPageHeader.appendChild(h1);
		sectionContainer.appendChild(divPageHeader);

		//sectionContainer.appendChild(this.createUserForm());
		sectionContainer.appendChild(UserPage.createUserForm(this.MODAL_FORM, this.FORM_ID, this.FORM_NAME, this.FORM_LAST_NAME, this.FORM_EMAIL, this.FORM_USERNAME, this.FORM_PASSWORD, this.FORM_BTN_ADD, this.FORM_BTN_UPDATE, ()=>this.retrieveFormDataForAdd(), ()=>this.retrieveFormDataForUpdate(), ()=>this.clearForm()));
		
		sectionContainer.appendChild(this.createUserTable());

		sectionContainer.appendChild(UserPage.createConfirmModalDelete(this.CONFIRM_MODAL, this.CONFIRM_ACTION_ID, ()=>this.clearConfirmForm(), this.CONFIRM_TITLE_ID, this.CONFIRM_MESSAGE_ID, this.CONFIRM_PASSWORD, this.CONFIRM_FIELD_ID));

		//<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>
		sectionContainer.appendChild(createModalButton("Nuevo", "button", "", "btn btn-info", this.MODAL_FORM, true, ()=>UserPage.buttonsFor("add", this.FORM_BTN_ADD, this.FORM_BTN_UPDATE)));

		this.setContainer(sectionContainer);
	}
	afterRender() {
		window.setTimeout(()=>this.getUsers(), 500);
	}
	getUsers() {
		this.showLoader();
		this._userApi.getUsers().then(
			(users) => {
				this._users = users;
				this.hideLoader();
				//this.render();
				this.printUserList();
			}
		).catch((error)=> {
			//alert(error);
			this.infoModal("Error", error);
			$("#" + this.CONFIRM_MODAL).modal({show: true});
				
			this.hideLoader();
		});
	}
	getUser(id) {
		this.showLoader();
		this._userApi.getUser(id).then(
			(user) => {
				this.hideLoader();
				
				this.fillFormData(user, "details");
			}
		).catch((error)=> {
			//alert(error);
			this.infoModal("Error", error);
			$("#" + this.CONFIRM_MODAL).modal({show: true});
				
			this.hideLoader();
		});
	}
	addUser(user) {
		this.showLoader();
		this._userApi.addUser(user).then(
			(data)=> {
				//alert(data);
				this.infoModal("Información", data);
				$("#" + this.CONFIRM_MODAL).modal({show: true});
				
				//this.hideLoader();
				this.getUsers();
				this.clearForm();
			}
		).catch(
			(error)=>{
				//alert(error);
				this.infoModal("Error", error);
				$("#" + this.CONFIRM_MODAL).modal({show: true});
				
				this.hideLoader();
			}
		);
	}
	updateUser(user) {
		this.showLoader();
		this._userApi.updateUser(user).then(
			(data)=> {
				//alert(data);
				this.infoModal("Información", data);
				$("#" + this.CONFIRM_MODAL).modal({show: true});
				
				this.hideLoader();
				this.getUsers();
				this.clearForm();
			}
		).catch(
			(error)=>{
				//alert(error);
				this.infoModal("Error", error);
				$("#" + this.CONFIRM_MODAL).modal({show: true});
				
				this.hideLoader();
			}
		);
	}
	deleteUser(id) {
		this.showLoader();
		let password = getValueInput(this.CONFIRM_PASSWORD);
		
		this._userApi.deleteUser(id, password).then(
			(data)=> {
				/*if (data){
					alert("Usuario eliminada.");
				}*/
				//alert(data);
				this.infoModal("Información", data);
				$("#" + this.CONFIRM_MODAL).modal({show: true});
				
				this.hideLoader();
				this.getUsers();
			}
		).catch(
			(error)=>{
				//alert(error);
				this.infoModal("Error", error);
				$("#" + this.CONFIRM_MODAL).modal({show: true});
				
				this.hideLoader();
			}
		);
	}
	printUserList() {
		let table = document.getElementById(this.TABLE_ID);
		table.innerHTML = "";

		let columnsNames = [{value: "Nombre", className:""}, 
							{value: "Apellidos", className:""},
							{value: "Usuario", className:""},
							{value: "Correo", className:""},
							{value: "Acciones", className:""}];
		table.appendChild(createTHead(columnsNames));
		let tbody = document.createElement("tbody");
		tbody.id = this.TBODY_ID;
		table.appendChild(tbody);

		this._users.forEach((user) => {
			//tbody.appendChild(user.buildRowUserHtml(this.MODAL_FORM, ()=>this.getUser(user._id), ()=>this.fillFormData(user, "update"), ()=>this.deleteUser(user._id)));
			tbody.appendChild(user.buildRowUserHtml(this.MODAL_FORM, ()=>this.getUser(user._id), ()=>this.fillFormData(user, "update"), this.CONFIRM_MODAL, ()=>this.confirmActionToExecute(user._id, "Confirmar", "¿Desea eliminar este elemento?")));
		});
	}
	createUserTable() {
		let section = document.createElement("section");
		section.className = "row";
		
		let divTable = document.createElement("div");
		divTable.className = "col-sm-12 ";
		
		let h2 = document.createElement("h2");
		h2.textContent = "Lista de Bebidas";
		divTable.appendChild(h2);
		let table = document.createElement("table");
		table.id = this.TABLE_ID;
		table.className += "table ";
		table.className += "table-striped ";
		divTable.appendChild(table);

		section.appendChild(divTable);
		//return divTable
		return section;
	}
	static createUserForm(modalId, formId, formName, formLastName, formEmail, formUsername, formPassword, formBtnAdd, formBtnUpdate, addAction, updateAction, cancelAction) {
		let section = document.createElement("section");
		//section.className = "row";
		section.className = "modal fade";
		//section.role = "dialog";
		section.setAttribute("role", "dialog");
		//section.id = this.MODAL_FORM;
		section.id = modalId;

		let modalDiv = document.createElement("div");
		modalDiv.className = "modal-dialog";

		let modalContentDiv = document.createElement("div");
		modalContentDiv.className = "modal-content";
		
		let divForm = document.createElement("div");
		divForm.className = "modal-body";
		
		let form = document.createElement("form");
		//form.className = "form-inline";
		let fieldset = document.createElement("fieldset");
		let legend = document.createElement("legend");
		legend.textContent = "Nuevo Usuario";
		fieldset.appendChild(legend);
		
		//let fieldClassName = "col-xs-2";
		let fieldClassName = "form-group";
		fieldset.appendChild(crearFieldFormHtml("div", "", "", "hidden", formId, ""));
		fieldset.appendChild(crearFieldFormHtml("div", fieldClassName, "Nombre", "text", formName, "form-control"));
		fieldset.appendChild(crearFieldFormHtml("div", fieldClassName, "Apellidos", "text", formLastName, "form-control"));
		fieldset.appendChild(crearFieldFormHtml("div", fieldClassName, "Correo electrónico", "text", formEmail, "form-control"));
		fieldset.appendChild(crearFieldFormHtml("div", fieldClassName, "Usuario", "text", formUsername, "form-control"));
		fieldset.appendChild(crearFieldFormHtml("div", fieldClassName, "Contraseña", "password", formPassword, "form-control"));
		
		fieldset.appendChild(createModalButton("Agregar", "button", formBtnAdd, "btn btn-success", modalId, false, addAction));
		fieldset.appendChild(createModalButton("Actualizar", "button", formBtnUpdate, "btn btn-success", modalId, false, updateAction));
		fieldset.appendChild(createModalButton("Cancelar", "button", "", "btn btn-danger", modalId, false, cancelAction));

		form.appendChild(fieldset);
		
		divForm.appendChild(form);
		
		modalContentDiv.appendChild(divForm);

		modalDiv.appendChild(modalContentDiv);

		section.appendChild(modalDiv);
		
		return section;
	}
	static buttonsFor(action, addBtnId, updateBtnId) {
		let buttonAdd = document.getElementById(addBtnId);
		let buttonUpdate = document.getElementById(updateBtnId);
		if (action == "add") {
			buttonAdd.style.display = "inline-block";
			buttonUpdate.style.display = "none";
		} else if (action == "update") {
			buttonAdd.style.display = "none";
			buttonUpdate.style.display = "inline-block";
		} else {
			buttonAdd.style.display = "none";
			buttonUpdate.style.display = "none";
		}
	}
	retrieveFormDataForAdd() {
		let name = getValueInput(this.FORM_NAME);
		let lastname = getValueInput(this.FORM_LAST_NAME);
		let email = getValueInput(this.FORM_EMAIL);
		let username = getValueInput(this.FORM_USERNAME);
		let password = getValueInput(this.FORM_PASSWORD);
		
		let user = new User(null, name, lastname, email, username, password);
		this.addUser(user);
		//this.clearForm();
	}
	retrieveFormDataForUpdate() {
		let id = getValueInput(this.FORM_ID);
		let name = getValueInput(this.FORM_NAME);
		let lastname = getValueInput(this.FORM_LAST_NAME);
		let email = getValueInput(this.FORM_EMAIL);
		let username = getValueInput(this.FORM_USERNAME);
		let password = getValueInput(this.FORM_PASSWORD);
		
		let user = new User(id, name, lastname, email, username, password);
		this.updateUser(user);
		//this.clearForm();
	}
	clearForm() {
		setValueInput(this.FORM_ID, "");
		setValueInput(this.FORM_NAME, "");
		setValueInput(this.FORM_LAST_NAME, "");
		setValueInput(this.FORM_EMAIL, "");
		setValueInput(this.FORM_USERNAME, "");
		setValueInput(this.FORM_PASSWORD, "");
	}
	fillFormData(user, action) {
		UserPage.buttonsFor(action, this.FORM_BTN_ADD, this.FORM_BTN_UPDATE);

		setValueInput(this.FORM_ID, user._id);
		setValueInput(this.FORM_NAME, user._nombre);
		setValueInput(this.FORM_LAST_NAME, user._apellidos);
		setValueInput(this.FORM_EMAIL, user._email);
		setValueInput(this.FORM_USERNAME, user._username);
		setValueInput(this.FORM_PASSWORD, user._password);
	}
	static createConfirmModalDelete(modalConfirmId, actionConfirmID, actionCancel, titleModalId, messageModalId, fieldId, divFieldId) { // TODO: Invocar desde el botón de Eliminar
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
		
		let form = document.createElement("form");
		form.className += "form-inline ";
		//let fieldClassName = "col-xs-2";
		let fieldClassName = "form-group";
		let fieldset = document.createElement("fieldset");
		let legend = document.createElement("legend");
		legend.id = messageModalId;
		//legend.textContent = message;
		fieldset.appendChild(legend);
		//fieldset.appendChild(crearFieldFormHtml("div", fieldClassName, "Contraseña", "password", fieldId, "form-control"));
		let divFieldPassword = crearFieldFormHtml("div", fieldClassName, "Contraseña", "password", fieldId, "form-control");
		divFieldPassword.id = divFieldId;
		fieldset.appendChild(divFieldPassword);
		form.appendChild(fieldset);
		modalBodyDiv.appendChild(form);
		
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
	confirmActionToExecute(id, title, message) {
		let btnConfirm = document.getElementById(this.CONFIRM_ACTION_ID); 
		btnConfirm.onclick = ()=>this.deleteUser(id); /* THE ACTION THAT WILL BE INVOKED */
		btnConfirm.style.display = "inline-block";

		let fieldPsw = document.getElementById(this.CONFIRM_FIELD_ID);
		fieldPsw.style.display = "inline-block";

		this.clearConfirmForm();

		this.changeConfirmMessage(title, message);
	}
	infoModal(title, message) {
		let btnConfirm = document.getElementById(this.CONFIRM_ACTION_ID); 
		btnConfirm.onclick = null;
		btnConfirm.style.display = "none";

		let fieldPsw = document.getElementById(this.CONFIRM_FIELD_ID);
		fieldPsw.style.display = "none";

		this.changeConfirmMessage(title, message);
	}
	changeConfirmMessage(title, message) {
		let titleH4 = document.getElementById(this.CONFIRM_TITLE_ID);
		titleH4.textContent = title;

		let messageP = document.getElementById(this.CONFIRM_MESSAGE_ID);
		messageP.textContent = message;
	}
	clearConfirmForm() {
		setValueInput(this.CONFIRM_PASSWORD, "");
	}

}

