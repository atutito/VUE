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
              eventosPasados: [],
              revenuesPasadas: [],
              revenues: [],
              revenuesFuturas: [],
              eventosFuturos: [],
              attendanceFuturas: [],
              attendancePasadas: [],
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
                this.filtrarCategorias(this.catPasadas, this.pasadas);          //TABLA PAST EVENTS
                this.eventosPasados = this.categorias
                this.revenuesCategorias(this.eventosPasados)                    //TABLA PAST
                this.revenuesPasadas = this.revenues
                this.filtrarCategorias(this.catFuturas, this.futuras);          //TABLA UPCOMING EVENTS
                this.eventosFuturos = this.categorias
                this.revenuesCategoriasFuturas(this.eventosFuturos)
                this.attendanceCategoriasFuturas(this.eventosFuturos)
                this.filtrarCategorias(this.catPasadas, this.pasadas);          //TABLA PAST EVENTS
                this.eventosPasados = this.categorias
                this.attendanceCategoriasPasadas(this.eventosPasados)
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
            return this.categorias;
        },
        revenuesCategorias(arrayEv){
            for(let e in arrayEv){
                let suma = 0
            for (let i in arrayEv[e]){
                suma = suma + arrayEv[e][i].assistance * arrayEv[e][i].price;
            }
            this.revenues.push(suma)
        }
        return this.revenues;
        },
        revenuesCategoriasFuturas(arrayEv){
            for(let e in arrayEv){
                let suma = 0
            for (let i in arrayEv[e]){
                suma = suma + arrayEv[e][i].estimate * arrayEv[e][i].price;
            }
            this.revenuesFuturas.push(suma)
        }
        return this.revenuesFuturas;
        },
        attendanceCategoriasFuturas(arrayEv){
            for(let e in arrayEv){
                let suma = 0
            for (let i in arrayEv[e]){
                suma = suma + (arrayEv[e][i].estimate/ arrayEv[e][i].capacity)*100;
            }
            this.attendanceFuturas.push(suma/arrayEv[e].length)
        }
        return this.attendanceFuturas;
        },
        attendanceCategoriasPasadas(arrayEv){
            for(let e in arrayEv){
                let suma = 0
            for (let i in arrayEv[e]){
                suma = suma + (arrayEv[e][i].assistance/ arrayEv[e][i].capacity)*100;
            }
            this.attendancePasadas.push(suma/arrayEv[e].length)
        }
        return this.attendancePasadas;
        },
},
    computed:{},
}).mount("#app")