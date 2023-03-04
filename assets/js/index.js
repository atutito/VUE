const fechaActual = Date.parse(eventsData.currentDate);

let fichas = [];

let cuerpo = document.getElementById('cuerpo');

for(let cartas of eventsData.events) {
    fichas.push(cartas);
};

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

let hijos = busqueda.children;
let arrayHijos = []

let checks = document.getElementsByClassName('form-check-input')

arrayHijos.push(checks);

const arrayHijos2 = Array.prototype.slice.call(arrayHijos[0]);
const etiquetas = Array.prototype.slice.call(document.getElementsByClassName('form-check-label'));

let checkboxes = document.querySelectorAll('input[type=checkbox]')

checkboxes.forEach( checkbox  => { 
     checkbox.addEventListener('change', verificarSeleccion) 
     })
function verificarSeleccion(){
     let inputsChequeados = Array.from(checkboxes).filter(checkbox => checkbox.checked)
     console.log(inputsChequeados);
}

console.log(etiquetas);
console.log(arrayHijos2);
console.log(fichas);