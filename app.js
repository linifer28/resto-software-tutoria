// Hacer copia limpia de un objeto
// Evitando las referencias
let copy = function (obj){
	return JSON.parse( JSON.stringify (obj) );
}

let app = new Vue({
	el: '#app',
	data: {
		title: "Sistema de pedidos",
		busqueda: '',
		productos: [
			{
				nombre:"Banana",
				cod:"BNA01",
				precio: 1000,
				cantidad:1
			},
			{
				nombre:"Manzana",
				cod:"BNN02",
				precio: 33,
				cantidad:1
			},
			{
				nombre:"Naranja",
				cod:"NNN033",
				precio: 22,
				cantidad:1
			},
			{
				nombre:"Kiwi",
				cod:"NAA01",
				precio: 140,
				cantidad:1
			}
		],
		resultado: [],
		pedido: [],
		subTotal: 0,
		impuesto: 22,
		total: 0,
		cerrarPedido: false
	},
	methods: {
		buscarProductos: function (){
			let busqueda 	= this.busqueda.toLowerCase();
			let resultado 	= []

			for (let i = this.productos.length - 1; i >= 0; i--) {
				let producto = this.productos[i]

				// Normalizar búsqueda
				let normalCond = producto.nombre.toLowerCase().includes(busqueda) || 
					producto.cod.toLowerCase().includes(busqueda);
				
				if(normalCond){
					resultado.push(producto)
				}
			}

			// Voy a comunicar "resultado" a la view
			this.resultado = resultado;
			this.busqueda  = ''

			console.log("arr - resultado:: ", resultado)
		},
		agregarItem: function (item){
			let copiaItem = copy(item)

			console.log("copiaItem: ", copiaItem)

			let find = false;

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

			// Por defecto siempre agrego item al pedido 
			// a menos que encuentre dentro del FOR
			
			if(!find){
				this.pedido.push(copiaItem)
			}
			

			// Calculo subtotal cuando agrego item al pedido
			this.procSubTotal()
		},
		quitarItem: function (key){
			// Eliminar el item dada un indice del array pedido
			// El indice es la "key"
			this.pedido.splice(key, 1)

			// Calculo subtotal cuando elimino item del pedido
			this.procSubTotal()
		},
		procSubTotal: function (){
			let suma = 0;

			for (let i = this.pedido.length - 1; i >= 0; i--) {
				let item = this.pedido[i]

				suma 	+= parseInt(item.cantidad) * item.precio
			}
			this.subTotal = suma;

			// Despues que calculo el subtotal ejecuto el total con inpuesto
			this.procTotal()
		},
		procTotal: function (){
			this.total = (this.subTotal * (0.01 * parseInt(this.impuesto))) + this.subTotal;
		},
		procCerrarPedido: function (){
			this.cerrarPedido = true;
		},
		procVolver: function (){
			this.pedido 	= []
			this.resultado  = []
			this.total 	    = 0
			this.subTotal   = 0
			this.cerrarPedido = false;
			this.busqueda 	= ''
		},
		observarCantidad: function (item){
			item.cantidad = parseInt(item.cantidad)

			if(isNaN(item.cantidad)){
				item.cantidad = 0;
			}

			console.log("item: ", item)

			this.procSubTotal()
		},
		observarImpuesto: function (){
			this.impuesto = parseInt(this.impuesto)

			if(isNaN(this.impuesto)){
				this.impuesto = 0;
			}

			this.procSubTotal()
		}
	}
})