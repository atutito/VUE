// SE VINCULAN DINÁMICAMENTE LOS BOTONES CON LOS ID MEDIANTE PARAMS
const id = new URLSearchParams(location.search).get("_id")

const evento = eventsData.events.find(elemento => elemento._id == id)
console.log(evento)

function mostrarTarjeta(idContainer){ 
    const container = document.getElementById(idContainer)
    let tarjeta = document.createElement('div');
        tarjeta.innerHTML = `       <div id="tarjetadetail">
                                    <div class="row g-0">
                                    <div class="col-md-4" style="width:30vw; height: 20vh">
                                        <img src="${evento.image}" class="img-fluid rounded" alt="${evento.name} >
                                    </div>
                                    <div class="col-md-8 border border-dark">
                                        <div class="card-body">
                                        <h5 class="card-title">${evento.name}</h5>
                                        <p class="card-text">${evento.description}</p>
                                        <p class="card-text"><small class="text-muted">${evento.assistance > 0 ? "Attendance: " + evento.assistance + " people." : ""}</small></p>
                                        <p class="card-text"><small class="text-muted">Price: $${evento.price}</small></p>
                                        </div>
                                        <div class="btn-holder">
                                            <input type="button"  class="btn btn-danger me-5 position-relative " value="Back" onclick="history.back()" style="float:right; bottom: 0">
                                        </div>
                                        </div>
                                    </div>
                                </div>`
    container.appendChild(tarjeta)
    console.log(container)
}

mostrarTarjeta("detalle")