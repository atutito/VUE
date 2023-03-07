
// SE LLAMAN LAS CARDS DINÁMICAMENTE
const fechaActual = Date.parse(eventsData.currentDate);

let fichas = [];

let cuerpo = document.getElementById('cuerpo');

for(let cartas of eventsData.events) {
    fichas.push(cartas);
};

console.log(fichas);

let fragmento = new DocumentFragment();

for (let elemento of fichas){
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




// SE CREAN LAS ETIQUETAS DE LOS INPUTS DINÁMICAS
let busqueda = document.getElementById('search');

let categorias =[];

for (categoria of eventsData.events){
    categorias.push(categoria.category);
}

const dupCats = categorias.filter((cat, indice) => {
    return categorias.indexOf(cat) !== indice;
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


// SE ESCUCHAN LAS CHECKBOXES, SE GENERA ARRAY DE LABELS
let hijos = busqueda.children;
let arrayHijos = [];

let checks = document.getElementsByClassName('form-check-input');

arrayHijos.push(checks);

let checkboxes = document.querySelectorAll('input[type=checkbox]')
let arrayFiltrado = [];
let chequeados = [];
let categoriasChequeadas = [];
let fichasChequeadas = [];

checkboxes.forEach( checkbox  => { 
     checkbox.addEventListener('change', verificarSeleccion) 
     })
function verificarSeleccion(){
     chequeados = Array.from(checkboxes).filter(checkbox => checkbox.checked);
     for (let i of chequeados){
     arrayFiltrado.push(i.nextElementSibling.innerHTML);
    }
    categoriasChequeadas = [...new Set(arrayFiltrado)];
    console.log(categoriasChequeadas);
    for (let j of categoriasChequeadas){
        for (let i=0; i<fichas.length; i++){
        if (j == i.category) {
            fichasChequeadas.push(i); 
            console.log(fichasChequeadas);
        } 
        }    
    }
};


// FILTRO SEARCH
let filtroBusqueda = document.getElementById('filtroBusqueda');
let arrayFiltrado2 = [];

const input = filtroBusqueda.addEventListener('keyup', (e) => {
    let busqueda = e.target.value.toLowerCase();
    console.log(busqueda);
        for (let j; j < fichas.length; j++) {
        if(j.name.includes(busqueda)) {
            arrayFiltrado2.push(j);
        };
        console.log(arrayFiltrado2);
        };
});