const { createApp } = Vue

createApp({
    data(){
         return{
              arrayEventos: [],
              masAsistencia: [],
              menosAsistencia: [],
              masCapacidad: [],
              fechaActual: 0,
              pasadas: [],
              futuras: [],
              catFuturas: [],
              catPasadas: [],
              categorias: [],
              revenues: [],
              attendance: [],
         }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(response => response.json())
        .then(data => {
                this.arrayEventos = data.events;
                this.fechaActual = Date.parse(data.currentDate);
                this.masAsistencia = this.mayorAsistencia(this.arrayEventos);
                this.menosAsistencia = this.menorAsistencia(this.arrayEventos);
                this.masCapacidad = this.mayorCapacidad(this.arrayEventos);
                this.fichasPasadas(this.arrayEventos);
                this.fichasFuturas(this.arrayEventos);
                this.catFuturas = this.crearCats(this.futuras);
                this.catPasadas = this.crearCats(this.pasadas);
                this.filtrarCategorias(this.catPasadas, this.arrayEventos); //TABLA PAST EVENTS 
                this.revenuesCategorias()
                this.attendanceCategorias();
                this.sumarRevenues(this.revenues);
        })
         .catch(error => console.log(error))
    },
    methods:{
        mayorAsistencia (array){
            let mayor = ''
            let masAsist = 0
            for (carta of array){
                let cuenta = ((carta.assistance) / (carta.capacity))*100
                if(cuenta > masAsist){
                    masAsist = cuenta;
                    mayor = carta;
                }
            }
            return mayor;    
        },
        menorAsistencia (array){
            let menor = '';
            let cuenta = 100;    
            for (carta of array){
                let cuentaBucle = ((carta.assistance)/(carta.capacity)*100);
                if(cuentaBucle < cuenta){
                cuenta = ((carta.assistance)/(carta.capacity)*100);
                menor = carta;
            }}
            return menor;    
        },
        mayorCapacidad (array){
            return array.reduce((prev, current) => (prev.capacity > current.capacity) ? prev : current)
        },
        fichasPasadas (array){
            for(let cartas of array) {
                if(Date.parse(cartas.date) < this.fechaActual){
                this.pasadas.push(cartas);
                };
            };
        },
        fichasFuturas(array) {
            for(let cartas of array) {
                if(Date.parse(cartas.date) > this.fechaActual){
                this.futuras.push(cartas);
            }}
        },
        crearCats(array){
            let categorias =[];
            for (categoria of array){
                categorias.push(categoria.category);
            }
            return dupCats = categorias.filter((cat, indice) => {
                return categorias.indexOf(cat) === indice;
            });
        },
        filtrarCategorias(array, array2) {
            for (let i in array){
                this.categorias[i] = array2.filter(cat => cat.category.includes(array[i]));
            }
            return this.categorias
        },
        revenuesCategorias(){
            for(let i in this.categorias){
                for(let e in this.categorias[i]){
                this.revenues.push(
                    {
                    'categoria': this.categorias[i][e].category,
                    'revenue': this.categorias[i][e].price * this.categorias[i][e].assistance
                    })}
                }
        },
        attendanceCategorias(){
            for(let i in this.categorias){
                for(let e in this.categorias[i]){
                this.attendance.push(
                    {
                    'categoria': this.categorias[i][e].category,
                    'attendance': ((this.categorias[i][e].assistance/ this.categorias[i][e].capacity)*100).toFixed(2)
                    })}
                }
        }, 
},
    computed:{},
}).mount("#app")