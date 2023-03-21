const { createApp } = Vue

createApp({
    data(){
         return{
              arrayEventos: [],
              nombreIngresado: '',
              eventosFiltro: [],
              arrayCategorias: [],
              dupCats: [],
              checked: []
         }
    },
    created(){

         fetch("https://mindhub-xj03.onrender.com/api/amazing")
         .then(response => response.json())
         .then(data => {
                this.arrayEventos = data.events
                let aux = location.search
                let params = new URLSearchParams(aux)
                let id = params.get('id')
                console.log(id)
                this.eventosFiltro = this.arrayEventos.find(evento => evento._id == id)
                console.log(this.eventosFiltro)
         })
         .catch(error => console.log(error))
    },
    methods:{},
    computed:{},
    
}).mount("#app")