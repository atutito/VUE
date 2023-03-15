const fichas = eventsData.events;
console.log(fichas);

// SE CALCULA EL EVENTO CON MAYOR PORCENTAJE DE ASISTENCIA
let mayor = 0;
function mayorAsistencia (array){
    mayor = 0
    for (carta of array){
        if(carta.assistance&&(Number(carta.assistance) / Number(carta.capacity))*100 > mayor){
            mayor = carta;
        }
    }
    return mayor.name;    
}
mayorAsistencia(fichas)
console.log(mayor);

// SE CALCULA EL EVENTO CON MENOR PORCENTAJE DE ASISTENCIA
menor = ''
function menorAsistencia (array){ 
    for (carta of array){
        if((carta.assistance / carta.capacity)*100 < (mayor.assistance / mayor.capacity)*100){
            menor = carta;
        }
    }
    return menor.name;    
}
menorAsistencia(fichas)
console.log(menor);

// SE CALCULA EL EVENTO CON LA MAYOR CAPACIDAD
let masGrande = mayor
function mayorCapacidad (array){
    for (carta of array){
        if (carta.capacity > masGrande.capacity) {
            masGrande = carta
        }
    }
    return masGrande.name;    
}
mayorCapacidad(fichas)
console.log(masGrande);

// SE COMPLETA LA PRIMERA TABLA
function primeraTabla(array1, array2, array3) {
    let fragmento = document.createDocumentFragment();
    let cuerpo = document.getElementById('primera-tabla')
    let div = document.createElement('tr');
        div.innerHTML = `
        <tr>
          <td style="background-color: #F1DAE2">${array1.name} (${((array1.assistance / array1.capacity)*100).toFixed(1)}%)</td>
          <td style="background-color: #F1DAE2">${array2.name} (${((array2.assistance / array2.capacity)*100).toFixed(1)}%)</td>
          <td style="background-color: #F1DAE2">${array3.name} (${array3.capacity} ppl.) </td>
        </tr>`
    fragmento.appendChild(div);
    cuerpo.appendChild(fragmento);
}

primeraTabla(mayor, menor, masGrande);


// SE MUESTRAN LAS CARDS PASADAS LA FECHA ACTUAL
const fechaActual = Date.parse(eventsData.currentDate);

fichasPasadas = [];
for(let cartas of eventsData.events) {
    if(Date.parse(cartas.date) < fechaActual){
    fichasPasadas.push(cartas);
    };
};
console.log(fichasPasadas);

// SE MUESTRAN LAS CARDS FUTURAS LA FECHA ACTUAL
fichasFuturas = [];
for(let cartas of eventsData.events) {
    if(Date.parse(cartas.date) > fechaActual){
    fichasFuturas.push(cartas);
    };
};
console.log(fichasFuturas);


// SE TOMAN LAS CATEGORIAS
let busqueda = '';
function crearCats(array){
    let categorias =[];
    for (categoria of array){
        categorias.push(categoria.category);
    }
    return dupCats = categorias.filter((cat, indice) => {
        return categorias.indexOf(cat) === indice;
    });
    }


crearCats(fichasPasadas)
console.log(dupCats)
let catPasadas = dupCats;

crearCats(fichasFuturas)
console.log(dupCats)
let catFuturas = dupCats;

// // SE SUMAN LAS REVENUES PASADAS

let pasFiltradas1 = fichasPasadas.filter(cat => cat.category.includes(catPasadas[0]));
let pasFiltradas2 = fichasPasadas.filter(cat => cat.category.includes(catPasadas[1]));
let pasFiltradas3 = fichasPasadas.filter(cat => cat.category.includes(catPasadas[2]));
let pasFiltradas4 = fichasPasadas.filter(cat => cat.category.includes(catPasadas[3]));
let pasFiltradas5 = fichasPasadas.filter(cat => cat.category.includes(catPasadas[4]));
let pasFiltradas6 = fichasPasadas.filter(cat => cat.category.includes(catPasadas[5]));
let pasFiltradas7 = fichasPasadas.filter(cat => cat.category.includes(catPasadas[6]));


console.log(pasFiltradas1);

let acumulador = 0
function revenues1 (array){
    acumulador = 0
    for (let i in array){
        acumulador = acumulador + array[i].assistance * array[i].price;
    }
}

revenues1(pasFiltradas1)
console.log(acumulador);
let revenuesPrimeraCat = acumulador;
revenues1(pasFiltradas2)
let revenuesSegundaCat = acumulador;
console.log(acumulador);
revenues1(pasFiltradas3)
let revenuesTerceraCat = acumulador;
console.log(acumulador);
revenues1(pasFiltradas4)
let revenuesCuartaCat = acumulador;
console.log(acumulador);
revenues1(pasFiltradas5)
let revenuesQuintaCat = acumulador;
console.log(acumulador);
revenues1(pasFiltradas6)
let revenuesSextaCat = acumulador;
console.log(acumulador);
revenues1(pasFiltradas7)
let revenuesSeptimaCat = acumulador;
console.log(acumulador);

arrayRevenues=[revenuesPrimeraCat,revenuesSegundaCat,revenuesTerceraCat,revenuesCuartaCat,revenuesQuintaCat,revenuesSextaCat,revenuesSeptimaCat]
console.log(arrayRevenues);

// SE CALCULA EL PORCENTAJE DE ASISTENCIA PASADA
let asistencia = 0
let promedio = 0
function asistenciaPasada (array){
    asistencia = 0
    for (let i in array){
        asistencia = asistencia + ((array[i].assistance / array[i].capacity)* 100)
    }
    promedio = asistencia/array.length
}
asistenciaPasada(pasFiltradas1)
console.log(promedio);
let asistenciaPasada1 = promedio
asistenciaPasada(pasFiltradas2)
console.log(promedio);
let asistenciaPasada2 = promedio
asistenciaPasada(pasFiltradas3)
console.log(promedio);
let asistenciaPasada3 = promedio
asistenciaPasada(pasFiltradas4)
console.log(promedio);
let asistenciaPasada4 = promedio
asistenciaPasada(pasFiltradas5)
console.log(promedio);
let asistenciaPasada5 = promedio
asistenciaPasada(pasFiltradas6)
console.log(promedio);
let asistenciaPasada6 = promedio
asistenciaPasada(pasFiltradas7)
console.log(promedio);
let asistenciaPasada7 = promedio


arrayAsistencia=[asistenciaPasada1,asistenciaPasada2,asistenciaPasada3,asistenciaPasada4,asistenciaPasada5,asistenciaPasada6,asistenciaPasada7];
console.log(arrayAsistencia);

// SE FILTRAN LAS CATEGORIAS PASADAS Y REVENUES
function categoriasPas(array,array2, array3) {
    let fragmento = document.createDocumentFragment();
    let cuerpo = document.getElementById('tabla-pastcat')
    array.forEach((num1, index) => {
        const num2 = array2[index];
        const num3 = array3[index];
        let div = document.createElement('tr');
        div.innerHTML += `
          <td style="background-color: #F1DAE2">${num1}</td>
          <td style="background-color: #F1DAE2">${num2} USD</td>
          <td style="background-color: #F1DAE2">${num3.toFixed(2)}%</td>`
        fragmento.appendChild(div);
      });
    cuerpo.appendChild(fragmento);
}
categoriasPas(catPasadas,arrayRevenues,arrayAsistencia);


// SE SUMAN LAS REVENUES FUTURAS

let futFiltradas1 = fichasFuturas.filter(cat => cat.category.includes(catFuturas[0]));
let futFiltradas2 = fichasFuturas.filter(cat => cat.category.includes(catFuturas[1]));
let futFiltradas3 = fichasFuturas.filter(cat => cat.category.includes(catFuturas[2]));
let futFiltradas4 = fichasFuturas.filter(cat => cat.category.includes(catFuturas[3]));
let futFiltradas5 = fichasFuturas.filter(cat => cat.category.includes(catFuturas[4]));
let futFiltradas6 = fichasFuturas.filter(cat => cat.category.includes(catFuturas[5]));
let futFiltradas7 = fichasFuturas.filter(cat => cat.category.includes(catFuturas[6]));

console.log(futFiltradas1);
console.log(futFiltradas2);
console.log(futFiltradas3);
console.log(futFiltradas4);
console.log(futFiltradas5);
console.log(futFiltradas6);
console.log(futFiltradas7);

acumuladorFuturo = 0;
function revenuesFut (array){
    acumuladorFuturo = 0
    for (let i in array){
        acumuladorFuturo = acumuladorFuturo + array[i].estimate * array[i].price;
    }
}

revenuesFut(futFiltradas1)
console.log(acumuladorFuturo);
let revenuesFutPrimeraCat = acumuladorFuturo;
revenuesFut(futFiltradas2)
let revenuesFutSegundaCat = acumuladorFuturo;
console.log(acumuladorFuturo);
revenuesFut(futFiltradas3)
let revenuesFutTerceraCat = acumuladorFuturo;
console.log(acumuladorFuturo);
revenuesFut(futFiltradas4)
let revenuesFutCuartaCat = acumuladorFuturo;
console.log(acumuladorFuturo);
revenuesFut(futFiltradas5)
let revenuesFutQuintaCat = acumuladorFuturo;
console.log(acumuladorFuturo);
revenuesFut(futFiltradas6)
let revenuesFutSextaCat = acumuladorFuturo;
console.log(acumuladorFuturo);
revenuesFut(futFiltradas7)
let revenuesFutSeptimaCat = acumuladorFuturo;
console.log(acumuladorFuturo);

arrayRevenuesFut=[revenuesFutPrimeraCat,revenuesFutSegundaCat,revenuesFutTerceraCat,revenuesFutCuartaCat,revenuesFutQuintaCat,revenuesFutSextaCat,revenuesFutSeptimaCat]
console.log(arrayRevenuesFut);


// SE CALCULA EL PORCENTAJE DE ASISTENCIA FUTURA
let asistenciaFut = 0
let promedioFuturo = 0

function asistenciaFutura (array){
    asistenciaFut = 0
    for (let i in array){
        asistenciaFut = asistenciaFut + ((array[i].estimate / array[i].capacity)* 100)
    }
    promedio = asistenciaFut/array.length
}
asistenciaFutura(futFiltradas1)
console.log(promedio);
let asistenciaFutura1 = promedio
asistenciaFutura(futFiltradas2)
console.log(promedio);
let asistenciaFutura2 = promedio
asistenciaFutura(futFiltradas3)
console.log(promedio);
let asistenciaFutura3 = promedio
asistenciaFutura(futFiltradas4)
console.log(promedio);
let asistenciaFutura4 = promedio
asistenciaFutura(futFiltradas5)
console.log(promedio);
let asistenciaFutura5 = promedio
asistenciaFutura(futFiltradas6)
console.log(promedio);
let asistenciaFutura6 = promedio
asistenciaFutura(futFiltradas7)
console.log(promedio);
let asistenciaFutura7 = promedio


arrayAsistenciaFutura=[asistenciaFutura1,asistenciaFutura2,asistenciaFutura3,asistenciaFutura4,asistenciaFutura5,asistenciaFutura6,asistenciaFutura7];
console.log(arrayAsistenciaFutura);

// SE FILTRAN LAS CATEGORIAS FUTURAS Y REVENUES

function categoriasFut(array,array2,array3) {
    let fragmento = document.createDocumentFragment();
    let cuerpo = document.getElementById('tabla-futcat')
    array.forEach((num1, index) => {
        const num2 = array2[index];
        const num3 = array3[index];
        let div = document.createElement('tr');
        div.innerHTML += `
          <td style="background-color: #F1DAE2">${num1}</td>
          <td style="background-color: #F1DAE2">${num2} USD</td>
          <td style="background-color: #F1DAE2">${num3.toFixed(2)}%</td>`
        fragmento.appendChild(div);
      });
    cuerpo.appendChild(fragmento);
}
categoriasFut(catFuturas,arrayRevenuesFut,arrayAsistenciaFutura);