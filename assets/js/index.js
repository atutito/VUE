const { createApp } = Vue

createApp({
    data(){
         return{
              arrayEventos: [],
              nombreIngresado: '',
              filtrarPorSeleccion: [],
              arrayCategorias: [],
              dupCats: []
         }
    },
    created(){

         fetch("https://mindhub-xj03.onrender.com/api/amazing")
         .then(response => response.json())
         .then(data => {
              this.arrayEventos = data.events
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