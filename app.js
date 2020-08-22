let app = new Vue({
	el: '#app',
	data: {
			plato: {},
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
				cod:"Pzt_02",
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
		mesaGuardada: true,
		mesaActiva: true,
		platoSeleccionado: {},

		

	},

	methods: {
		abrirMesa: function() {
			this.mesaGuardada = false
		},
		backPage: function() {
			this.mesaGuardada = true
		},
		//platoLista: function() {
			//for (let i = this.platoList.length - 1; i >= 0; i--) {
			//	let plato = this.platoList[i]
//console.log("plato", plato)
		//	}
		//},
		cerrarrMesa: function() {

		},
		agregarItem: function() {

		},
		saveChanges: function() {

		},

		//saveChanges: function () {
		//	this.mesaActiva = true
		//}
		//cerrarrMesa: function() {
		//	this.mesaActiva = false
		//}
	}

})

		//{
		
	//}				
