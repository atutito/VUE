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
                this.filtrarCategorias(this.catPasadas, this.arrayEventos);
                console.log(this.categorias);
                this.revenuesCategorias()
                console.log(this.revenues);
                this.attendanceCategorias();
                console.log(this.attendance);

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
            // this.revenues
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





// // SE TOMAN LAS CATEGORIAS

// // // SE SUMAN LAS REVENUES PASADAS


// let pasFiltradas1 = fichasPasadas.filter(cat => cat.category.includes(catPasadas[0]));
// let pasFiltradas2 = fichasPasadas.filter(cat => cat.category.includes(catPasadas[1]));
// let pasFiltradas3 = fichasPasadas.filter(cat => cat.category.includes(catPasadas[2]));
// let pasFiltradas4 = fichasPasadas.filter(cat => cat.category.includes(catPasadas[3]));
// let pasFiltradas5 = fichasPasadas.filter(cat => cat.category.includes(catPasadas[4]));
// let pasFiltradas6 = fichasPasadas.filter(cat => cat.category.includes(catPasadas[5]));
// let pasFiltradas7 = fichasPasadas.filter(cat => cat.category.includes(catPasadas[6]));


// console.log(pasFiltradas1);

// let acumulador = 0
// function revenues1 (array){
//     acumulador = 0
//     for (let i in array){
//         acumulador = acumulador + array[i].assistance * array[i].price;
//     }
// }

// revenues1(pasFiltradas1)
// console.log(acumulador);
// let revenuesPrimeraCat = acumulador;
// revenues1(pasFiltradas2)
// let revenuesSegundaCat = acumulador;
// console.log(acumulador);
// revenues1(pasFiltradas3)
// let revenuesTerceraCat = acumulador;
// console.log(acumulador);
// revenues1(pasFiltradas4)
// let revenuesCuartaCat = acumulador;
// console.log(acumulador);
// revenues1(pasFiltradas5)
// let revenuesQuintaCat = acumulador;
// console.log(acumulador);
// revenues1(pasFiltradas6)
// let revenuesSextaCat = acumulador;
// console.log(acumulador);
// revenues1(pasFiltradas7)
// let revenuesSeptimaCat = acumulador;
// console.log(acumulador);

// arrayRevenues=[revenuesPrimeraCat,revenuesSegundaCat,revenuesTerceraCat,revenuesCuartaCat,revenuesQuintaCat,revenuesSextaCat,revenuesSeptimaCat]
// console.log(arrayRevenues);

// // SE CALCULA EL PORCENTAJE DE ASISTENCIA PASADA
// let asistencia = 0
// let promedio = 0
// function asistenciaPasada (array){
//     asistencia = 0
//     for (let i in array){
//         asistencia = asistencia + ((array[i].assistance / array[i].capacity)* 100)
//     }
//     promedio = asistencia/array.length
// }
// asistenciaPasada(pasFiltradas1)
// console.log(promedio);
// let asistenciaPasada1 = promedio
// asistenciaPasada(pasFiltradas2)
// console.log(promedio);
// let asistenciaPasada2 = promedio
// asistenciaPasada(pasFiltradas3)
// console.log(promedio);
// let asistenciaPasada3 = promedio
// asistenciaPasada(pasFiltradas4)
// console.log(promedio);
// let asistenciaPasada4 = promedio
// asistenciaPasada(pasFiltradas5)
// console.log(promedio);
// let asistenciaPasada5 = promedio
// asistenciaPasada(pasFiltradas6)
// console.log(promedio);
// let asistenciaPasada6 = promedio
// asistenciaPasada(pasFiltradas7)
// console.log(promedio);
// let asistenciaPasada7 = promedio


// arrayAsistencia=[asistenciaPasada1,asistenciaPasada2,asistenciaPasada3,asistenciaPasada4,asistenciaPasada5,asistenciaPasada6,asistenciaPasada7];
// console.log(arrayAsistencia);

// // SE FILTRAN LAS CATEGORIAS PASADAS Y REVENUES
// // function categoriasPas(array,array2, array3) {
// //     let fragmento = document.createDocumentFragment();
// //     let cuerpo = document.getElementById('tabla-pastcat')
// //     array.forEach((num1, index) => {
// //         const num2 = array2[index];
// //         const num3 = array3[index];
// //         let div = document.createElement('tr');
// //         div.innerHTML += `
// //           <td style="background-color: #F1DAE2; text-align:center">${num1}</td>
// //           <td style="background-color: #F1DAE2; text-align:center">${num2} USD</td>
// //           <td style="background-color: #F1DAE2; text-align:center">${num3.toFixed(2)}%</td>`
// //         fragmento.appendChild(div);
// //       });
// //     cuerpo.appendChild(fragmento);
// // }
// // categoriasPas(catPasadas,arrayRevenues,arrayAsistencia);


// // SE SUMAN LAS REVENUES FUTURAS

// let futFiltradas1 = fichasFuturas.filter(cat => cat.category.includes(catFuturas[0]));
// let futFiltradas2 = fichasFuturas.filter(cat => cat.category.includes(catFuturas[1]));
// let futFiltradas3 = fichasFuturas.filter(cat => cat.category.includes(catFuturas[2]));
// let futFiltradas4 = fichasFuturas.filter(cat => cat.category.includes(catFuturas[3]));
// let futFiltradas5 = fichasFuturas.filter(cat => cat.category.includes(catFuturas[4]));
// let futFiltradas6 = fichasFuturas.filter(cat => cat.category.includes(catFuturas[5]));
// let futFiltradas7 = fichasFuturas.filter(cat => cat.category.includes(catFuturas[6]));

// acumuladorFuturo = 0;
// function revenuesFut (array){
//     acumuladorFuturo = 0
//     for (let i in array){
//         acumuladorFuturo = acumuladorFuturo + array[i].estimate * array[i].price;
//     }
// }

// revenuesFut(futFiltradas1)
// console.log(acumuladorFuturo);
// let revenuesFutPrimeraCat = acumuladorFuturo;
// revenuesFut(futFiltradas2)
// let revenuesFutSegundaCat = acumuladorFuturo;
// console.log(acumuladorFuturo);
// revenuesFut(futFiltradas3)
// let revenuesFutTerceraCat = acumuladorFuturo;
// console.log(acumuladorFuturo);
// revenuesFut(futFiltradas4)
// let revenuesFutCuartaCat = acumuladorFuturo;
// console.log(acumuladorFuturo);
// revenuesFut(futFiltradas5)
// let revenuesFutQuintaCat = acumuladorFuturo;
// console.log(acumuladorFuturo);
// revenuesFut(futFiltradas6)
// let revenuesFutSextaCat = acumuladorFuturo;
// console.log(acumuladorFuturo);
// revenuesFut(futFiltradas7)
// let revenuesFutSeptimaCat = acumuladorFuturo;
// console.log(acumuladorFuturo);

// arrayRevenuesFut=[revenuesFutPrimeraCat,revenuesFutSegundaCat,revenuesFutTerceraCat,revenuesFutCuartaCat,revenuesFutQuintaCat,revenuesFutSextaCat,revenuesFutSeptimaCat]
// console.log(arrayRevenuesFut);


// // SE CALCULA EL PORCENTAJE DE ASISTENCIA FUTURA
// let asistenciaFut = 0
// let promedioFuturo = 0

// function asistenciaFutura (array){
//     asistenciaFut = 0
//     for (let i in array){
//         asistenciaFut = asistenciaFut + ((array[i].estimate / array[i].capacity)* 100)
//     }
//     promedio = asistenciaFut/array.length
// }
// asistenciaFutura(futFiltradas1)
// console.log(promedio);
// let asistenciaFutura1 = promedio
// asistenciaFutura(futFiltradas2)
// console.log(promedio);
// let asistenciaFutura2 = promedio
// asistenciaFutura(futFiltradas3)
// console.log(promedio);
// let asistenciaFutura3 = promedio
// asistenciaFutura(futFiltradas4)
// console.log(promedio);
// let asistenciaFutura4 = promedio
// asistenciaFutura(futFiltradas5)
// console.log(promedio);
// let asistenciaFutura5 = promedio
// asistenciaFutura(futFiltradas6)
// console.log(promedio);
// let asistenciaFutura6 = promedio
// asistenciaFutura(futFiltradas7)
// console.log(promedio);
// let asistenciaFutura7 = promedio


// arrayAsistenciaFutura=[asistenciaFutura1,asistenciaFutura2,asistenciaFutura3,asistenciaFutura4,asistenciaFutura5,asistenciaFutura6,asistenciaFutura7];
// console.log(arrayAsistenciaFutura);

// // SE FILTRAN LAS CATEGORIAS FUTURAS Y REVENUES

// // function categoriasFut(array,array2,array3) {
// //     let fragmento = document.createDocumentFragment();
// //     let cuerpo = document.getElementById('tabla-futcat')
// //     array.forEach((num1, index) => {
// //         const num2 = array2[index];
// //         const num3 = array3[index];
// //         let div = document.createElement('tr');
// //         div.innerHTML += `
// //           <td style="background-color: #F1DAE2; text-align:center">${num1}</td>
// //           <td style="background-color: #F1DAE2; text-align:center">${num2} USD</td>
// //           <td style="background-color: #F1DAE2; text-align:center">${num3.toFixed(2)}%</td>`
// //         fragmento.appendChild(div);
// //       });
// //     cuerpo.appendChild(fragmento);
// // }
// // categoriasFut(catFuturas,arrayRevenuesFut,arrayAsistenciaFutura);