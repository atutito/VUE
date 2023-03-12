const fichas = eventsData.events;
console.log(fichas);

// SE CALCULA EL EVENTO CON MAYOR PORCENTAJE DE ASISTENCIA
let mayor = 0;
function mayorAsistencia (array){
    for (carta of array){
        if((carta.assistance / carta.capacity)*100 > mayor){
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
          <td>${array1.name} (${((array1.assistance / array1.capacity)*100).toFixed(1)}%)</td>
          <td>${array2.name} (${((array2.assistance / array2.capacity)*100).toFixed(1)}%)</td>
          <td>${array3.name} (${array3.capacity} ppl.) </td>
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

// // SE SUMAN LAS REVENUES
let pasFiltradas = fichasPasadas.filter(cat => cat.category.includes(catPasadas[0]));

console.log(pasFiltradas);

acumulador1 = 0
function revenues1 (array){
    for (let i in array){
        acumulador1 += array[i].assistance * array[i].price;
    }
}
revenues1(pasFiltradas)
console.log(acumulador1);

// SE FILTRAN LAS CATEGORIAS PASADAS
function categoriasPas(array) {
    let fragmento = document.createDocumentFragment();
    let cuerpo = document.getElementById('tabla-pastcat')
    for (let elemento of array){
        let div = document.createElement('tr');
        div.innerHTML += `
        <tr>
          <td>${elemento}</td>
          <td>--</td>
          <td>--</td>
        </tr>`
        fragmento.appendChild(div);
        };
    cuerpo.appendChild(fragmento);
}

categoriasPas(catPasadas);


// SE FILTRAN LAS CATEGORIAS FUTURAS
function categoriasFut(array) {
    let fragmento = document.createDocumentFragment();
    let cuerpo = document.getElementById('tabla-futcat')
    for (let elemento of array){
        let div = document.createElement('tr');
        div.innerHTML += `
        <tr>
          <td>${elemento}</td>
          <td>--</td>
          <td>--</td>
        </tr>`
        fragmento.appendChild(div);
        };
    cuerpo.appendChild(fragmento);
}

categoriasFut(catFuturas);