const fechaActual = Date.parse(eventsData.currentDate);

let fichas = [];

let newFichas = new DocumentFragment();
let cuerpo = document.getElementById('cuerpo');

for(let cartas of eventsData.events) {
    if(Date.parse(cartas.date) < fechaActual){
    fichas.push(cartas);
    };
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
                                <a href="./card.html"><button type="button" class="btn btn-danger" style="float: right;">Info</button></a>
                            </div>
                            </div>
                        </div>`
    fragmento.appendChild(div);
};

cuerpo.appendChild(fragmento);