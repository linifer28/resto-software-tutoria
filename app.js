let copy = function (obj){
	return JSON.parse( JSON.stringify (obj) );
}

let app = new Vue({
	el: '#app',
	data: {	
				
			platoList: [
			{
				nombre:"Milanesa napolitana",
				cod:"#Nap_01",
				precio: 380,
				cantidad:1
			},
			{
				nombre:"Napolitana para 2",
				cod:"#Nap_02",
				precio: 650,
				cantidad:1
			},
			{
				nombre:"Pizzeta con muzzarella",
				cod:"#Pzt_01",
				precio: 320,
				cantidad:1
			},
			{
				nombre:"Pizzeta con gustos",
				cod:"#Pzt_02",
				precio: 400,
				cantidad:1
			},
			{
				nombre:"Refresco 1lt.",
				cod:"#Ref_01",
				precio: 200,
				cantidad:1
			},
			{
				nombre:"Cerveza 1lt.",
				cod:"#Crv_01",
				precio: 210,
				cantidad:1
			},
			{
				nombre:"Helado",
				cod:"#Hld_01",
				precio: 180,
				cantidad:1
			},
			{
				nombre:"Ensalada de frutas",
				cod:"#Ens_01",
				precio: 190,
				cantidad:1
			},
			],

			listaMesas: [
			{
				nombre: "Mesa 1",
				cantPersonas: "",
				platos: "",
				subTotMesa: "",
				totalMesa: ""	
			},
			{
				nombre: "Mesa 2",
				cantPersonas: "",
				platos: "",
				subTotMesa: "",
				totalMesa: ""
			},
			{
				nombre: "Mesa 3",
				cantPersonas: "",
				platos: "",
				subTotMesa: "",
				totalMesa: ""
			},
			{
				nombre: "Mesa 4",
				cantPersonas: "",
				platos: "",
				subTotMesa: "",
				totalMesa: ""
			},
			{
				nombre: "Mesa 5",
				cantPersonas: "",
				platos: "",
				subTotMesa: "",
				totalMesa: ""
			},
			{
				nombre: "Mesa 6",
				cantPersonas: "",
				platos: "",
				subTotMesa: "",
				totalMesa: ""
			},
			{
				nombre: "Mesa 7",
				cantPersonas: "",
				platos: "",
				subTotMesa: "",
				totalMesa: ""
			},
			{
				nombre: "Mesa 8",
				cantPersonas: "",
				platos: "",
				subTotMesa: "",
				totalMesa: ""
			}			
			],		

		mesaGuardada: true,
		mesaActiva: true,
		platoSeleccionado: {},
		pedido: [],
		plato: '',	
		subTotalPlato: 0,
		totalPedido: 0,
		totPedido: 0,
		mesa: '',
		cantPers: '',

	},

	methods: {
		abrirMesa: function() {
			this.mesaGuardada = false
		},

		backPage: function() {
			this.mesaGuardada = true
			this.pedido = []
			this.subTotalPlato = 0,
			this.totalPedido = 0,
			this.plato = "",
			this.mesa = "",
			this.cantPers = ""
		},

		//platoLista: function() {
		//	for (let i = this.platoList.length - 1; i >= 0; i--) {
		//		let plato = this.platoList[i]
		//		console.log("plato", plato)
		//	}
		//},

		cerrarrMesa: function() {

		},
		agregarItem: function(item) {
			let copiaItem = copy(item)
			
			let find = false

			for (let i = this.pedido.length - 1; i >= 0; i--) {
				// Encuentro un item del pedido que tiene el mismo cod
				// Que el item a agregar
				if(this.pedido[i].cod == copiaItem.cod){
					// Sumo las cantidades
					this.pedido[i].cantidad = parseInt(this.pedido[i].cantidad) + parseInt(copiaItem.cantidad)
					// Le digo al flujo siguiente que encontre el item dentro de pedido
					find = true;
					// Corto la ejecución
					break;
				}
			}

			if(!find){	
				this.pedido.push(copiaItem)
			}	

			let suma = 0
			suma = (copiaItem.precio) * parseInt(copiaItem.cantidad)

			this.subTotalPlato = suma

			this.procTotalPedido()
			
		
		},
		
		quitarPlato: function (key){
			// Eliminar el item dada un indice del array pedido
			// El indice es la "key"
			this.pedido.splice(key,1)

			// Calculo subtotal cuando elimino item del pedido
			this.procTotalPedido()
		},

		procTotalPedido: function () {
			let suma = 0;

			for (let i = this.pedido.length - 1; i >= 0; i--) {
				let item = this.pedido[i]

				suma 	+= parseInt(item.cantidad) * item.precio
			}
			this.totalPedido = suma;

		},

		saveChanges: function(){
					
					let listaMesas = copy(this.listaMesas);

					// if(listaMesas._id){
						// let id = this.agregarMesa._id;

						// delete agregarMesa._id;

						// axios.put(API + 'mesas/' + id, agregarMesa).then( (res) => {
						// 	console.log("respuesta crud: ", res, app.state)

						// 	// app.changeState('listado')
						// })

					// } else {
						axios.post(API + '/mesas', 8).then( (res) => {
							console.log("respuesta crud: ", res)

							//app.changeState('listado')
						})
					// }

					console.log("mesas:: ", listaMesas)
		},

		watchPlato: function (){

		},

		watchMesa: function (mesa){
			console.log("mesa sel::", mesa.nombre)
		},

		// verCantidad: function (item){
		// 	item.cantidad = parseInt(item.cantidad)

		// 	if(isNaN(item.cantidad)){
		// 		item.cantidad = 0;
		// 	}

		// 	console.log("item: ", item)

		// 	this.procSubTotal()
		// },
}})