const fechaActual = Date.parse(eventsData.currentDate);

console.log(typeof(fechaActual));

let fichas = [];

let newFichas = new DocumentFragment();
let cuerpo = document.getElementById('cuerpo');

for(let cartas of eventsData.events) {
    fichas.push(cartas);
};

for (let elemento of fichas){
    cuerpo.innerHTML += `<div class="col">
                            <div class="card">
                                <img src="${elemento.image}" class="card-img-top" alt="${elemento.name}" style= "width: 100%; height: 10vw; object-fit: cover;">
                            <div class="card-body">
                                <h5 class="card-title">${elemento.name}</h5>
                            <p class="card-text">${elemento.description}</p>
                            <p class="card-text">Price: ${elemento.price}</p>
                                <a href="./card.html"><button type="button" class="btn btn-danger" style="float: right;">Info</button></a>
                            </div>
                            </div>
                        </div>`
};