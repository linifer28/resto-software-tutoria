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
				totalMesa: "",	
				estaActiva: false,
			},
			{
				nombre: "Mesa 2",
				cantPersonas: "",
				platos: "",
				totalMesa: ""	
			},
			{
				nombre: "Mesa 3",
				cantPersonas: "",
				platos: "",
				totalMesa: ""	
			},
			{
				nombre: "Mesa 4",
				cantPersonas: "",
				platos: "",
				totalMesa: ""	
			},
			{
				nombre: "Mesa 5",
				cantPersonas: "",
				platos: "",
				totalMesa: ""	
			},
			{
				nombre: "Mesa 6",
				cantPersonas: "",
				platos: "",
				totalMesa: ""	
			},
			{
				nombre: "Mesa 7",
				cantPersonas: "",
				platos: "",
				totalMesa: ""	
			},
			{
				nombre: "Mesa 8",
				cantPersonas: "",
				platos: "",
				totalMesa: ""	
			},
			],
		
		mesasActiva:[],		

		mesaGuardada: true,
		platoSeleccionado: {},
		pedido: [],
		plato: '',	
		subTotalPlato: 0,
		totalPedido: 0,
		totalDiario: 0,
		mesa: '',
		cantPers: '',

	},

	methods: {
		abrirMesa: function() {
			this.mesaGuardada = false
			this.pedido = []
			this.subTotalPlato = 0,
			this.totalPedido = 0,
			this.plato = "",
			this.mesa = "",
			this.cantPers = ""
		},

		editarMesa: function(id) {
			axios.get(API + '/mesas/' + id).then( (res) => {
			this.mesaActiva = res.data
			this.pedido = res.data.platos			
			// Para hacer el match por objeto tener el obj completo
			this.mesa = {
				nombre: res.data.nombre,
				cantPersonas: "",
				platos: "",
				totalMesa: ""	
			}
			
			this.cantPers = res.data.cantPersonas
			})
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

		cerrarMesa: function(id) {
			axios.delete(API + '/mesas/' + id).then( (res) => {
			window.location.reload()
			})

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
					
					
					let mesaActiva = this.mesa;
					this.mesa.estaActiva = true;
					console.log ("Activa???", this.mesa.estaActiva);
					
					let pedidoMesa = this.pedido;
					mesaActiva.platos = pedidoMesa; 
					
					let listaMesas = copy(this.listaMesas);
					mesaActiva.totalMesa = this.totalPedido;

					mesaActiva.cantPersonas = this.cantPers;

					console.log("mesaActiva::", this.mesa);
			
					console.log("Hay pedido ::", pedidoMesa);
					console.log("se activo ::", mesaActiva);

					
					axios.post(API + '/mesas', mesaActiva)
						.then((res) => {
							mesaActiva = res.data;
							window.location.reload() //recarga toda la pagina luego de guardar
						
					  });

					
					
					console.log("mesas:: ", listaMesas);

					this.mesaGuardada = true;
					this.procTotalDiario()
					
		},

		procTotalDiario: function () {
			
			totalDiario = this.totalDiario

			let copiaTotalDiario = copy(this.totalDiario);

			let sumaTotal = 0;

			sumaTotal 	+= this.totalPedido + copiaTotalDiario;
			
			this.totalDiario = sumaTotal;

			console.log("totalDiario::", sumaTotal)

		},

		watchPlato: function (){

		},

		watchMesa: function (){
			console.log("mesa sel::", mesa.nombre)
		},


},
		mounted: function () {
			axios.get (API + "/mesas").then((res) => {
				if(res.data) {this.mesasActiva = res.data}
			})
		} 		
})

// //- Guarda en memoria
// window.localStorage.setItem('totalDiario', this.totalDiario)

// - Obtengo de la memoria
// this.totalDiario = window.localStorage.getItem('totalDiario')