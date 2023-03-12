// SE LLAMA A LA API
const fichas = [];
const fechaActual = 0;

function traerDatos() {
fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response => response.json())
  .then(data => {
    fechaActual = Date.parse(data.currentDate)
    for (const key in data.events) {
        if(Date.parse(key.date) < fechaActual){
            fichas.push(key)
        }}})
  .catch(err => err.json())
}
traerDatos();

console.log(fichas);

// // SE MUESTRAN LAS CARDS PASADAS LA FECHA ACTUAL
// const fechaActual = Date.parse(eventsData.currentDate);

// fichas = [];
// for(let cartas of eventsData.events) {
//     if(Date.parse(cartas.date) < fechaActual){
//     fichas.push(cartas);
//     };
// };

console.log(fichas);

// SE LLAMAN LAS CARDS DINÁMICAMENTE

function tarjetas(array, contenedor) {
    let cuerpo = document.getElementById(contenedor);
    cuerpo.innerHTML = ''  
    if (array.length == 0) {
        cuerpo.innerHTML =  '<div class="w-100"><h5> No results to show, please refine your search and try again </h5></div>' 

    }  else {
        let fragmento = new DocumentFragment();
    for (let elemento of array){
        let div = document.createElement('div');
        div.innerHTML += `<div class="col">
                                <div class="card">
                                    <img src="${elemento.image}" class="card-img-top" alt="${elemento.name}" style= "width: 100%; height: 20vw; object-fit: cover;">
                                <div class="card-body">
                                    <h5 class="card-title">${elemento.name}</h5>
                                <p class="card-text">${elemento.description}</p>
                                <p class="card-text">Price: $${elemento.price}</p>
                                    <a href="./card.html?_id=${elemento._id}"><button type="button" class="btn btn-danger" style="float: right;">Details</button></a>
                                </div>
                                </div>
                            </div>`
        fragmento.appendChild(div);
        };
    cuerpo.appendChild(fragmento);
    }
}

tarjetas(fichas, 'cuerpo');


// SE CREAN LAS ETIQUETAS DE LOS INPUTS DINÁMICAS
let busqueda = document.getElementById('search');

function crearChecks(array){
    let categorias =[];
    for (categoria of array){
        categorias.push(categoria.category);
    }
    const dupCats = categorias.filter((cat, indice) => {
        return categorias.indexOf(cat) === indice;
    });
    let fragmento2 = new DocumentFragment();
    for (let elemento of dupCats){
        let div = document.createElement('div');
        div.innerHTML += `<div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" value="option">
                            <label class="form-check-label" for="checkbox">${elemento} </label>
                        </div>`
                        
        fragmento2.appendChild(div);
    };
    busqueda.appendChild(fragmento2);
}
crearChecks(fichas);


// SE ESCUCHAN LAS CHECKBOXES, SE GENERA ARRAY DE LABELS
let arrayTrimeado = [];
let checkboxes = document.querySelectorAll('input[type=checkbox]')
checkboxes.forEach( checkbox  => checkbox.addEventListener('change',() => { 
    let chequeados = [...checkboxes].filter(checkbox => checkbox.checked).map(elemento => elemento.nextElementSibling.innerHTML)
     
    arrayTrimeado = chequeados.map(element => {
        return element.trim()});
    console.log(arrayTrimeado);
    filtroCruzado(fichas);
}))

function filtrarCategorias(arrayCategorias, arrayObjetos) {
    return arrayCategorias.length === 0 ? arrayObjetos : arrayObjetos.filter(elemento => arrayCategorias.includes(elemento.category));
}

// FILTRO SEARCH
let inputValue = ''
let filtroBusqueda = document.getElementById('filtroBusqueda');
let arrayFiltrado2 = [];

const input = filtroBusqueda.addEventListener('keyup', (e) => {
    inputValue = e.target.value.toLowerCase();
        filtroCruzado(fichas);
});

function busquedaPorInput(valor, arrayObjetos) {
    if (valor == '') return arrayObjetos;
    let arrayNuevo = arrayObjetos.filter(el => el.name.toLowerCase().includes(valor.toLowerCase().trim()))
    console.log(arrayNuevo);
    return arrayNuevo;
}

// ❌❌❌ FILTRO CRUZADO ❌❌❌

function filtroCruzado(array){
    let tarjetasFiltradas = filtrarCategorias(arrayTrimeado, array);
    let checkFiltrados = busquedaPorInput(inputValue, tarjetasFiltradas);
    tarjetas(checkFiltrados, 'cuerpo');
}
