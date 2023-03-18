const { createApp } = Vue

createApp({
    data(){
         return{
              arrayEventos: [],
              nombreIngresado: '',
              filtrarPorSeleccion: [],
              arrayCategorias: [],
              dupCats: [],
              fechaActual: ''
         }
    },
    created(){

         fetch("https://mindhub-xj03.onrender.com/api/amazing")
         .then(response => response.json())
         .then(data => {
              this.fechaActual = Date.parse(data.currentDate)
              console.log(this.fechaActual)
              this.arrayEventos = data.events.filter(el => Date.parse(el.date) < this.fechaActual)
              console.log(this.arrayEventos)
              console.log(this.filtrarPorSeleccion)
              this.crearChecks(this.arrayEventos)

         })
         .catch(error => console.log(error))
    },
    methods:{
     crearChecks(array){
          let categorias=[]
          let dupCats = []
          for (categoria of array){
              categorias.push(categoria.category);
          }
          dupCats = categorias.filter((cat, indice) => {
              return categorias.indexOf(cat) === indice;
          })
          this.dupCats = dupCats
      },
    },
    computed:{
         filtrarPorInputTexto: function filtro (){
              this.filtrarPorSeleccion = this.arrayEventos.filter(objeto => objeto.name.includes(this.nombreIngresado));
         }
    }
}).mount("#app")