


// LISTA DE PRODUCTOS

// const COMESTIBLES = [
//     ["images/hamburguesa_200px.jpg", "Churrasco italiano", 2000, ["Churrasco", "Palta", "Tomate", "Mayonesa"]],
//     ["images/completo_200px.jpg", "Completo italiano", 1500, ["Vienesa", "Palta", "Tomate", "Mayonesa"]],
//     ["images/piza_200px.jpg", "Pizza individual", 3000, ["Queso", "Pepperoni"]],
//     ["images/papas_200px.jpg", "Papas fritas chicas", 1000, ["Papas fritas", "tamaño pequeño"]],
// ];
// const BEBESTIBLES = [
//     ["images/coca_200px.jpg", "Bebida en lata", 1000, ["Bebida en lata", "350cc"]],
//     ["images/coca_cola_botella_200px.jpg", "Bebida 1.5lt", 2000, ["Bebida en botella", "1.5 litros"]],
//     ["images/jugo_200px.jpg", "Jugo natural", 1500, ["Jugos naturales", "Naranja", "Frutilla", "Melon"]],
//     ["images/cerveza_200px.jpg", "Cerveza lager 500cc", 3000, ["Shop cerveza lager", "500cc", "-4° grados"]],
//     ["images/cerveza_red_200px.jpg", "Cerveza red lager 500cc", 3000, ["Shop cerveza red lager", "500cc", "-4.6° grados"]],
//     ["images/cerveza_black_200px.jpg", "Cerveza black lager 500cc", 3000, ["Shop cerveza black lager", "500cc", "-5.7° grados"]],
// ];


// LISTA DE PRODUCTOS para Local Storage

const COMESTIBLES = [
    {
        imagen:"images/hamburguesa_200px.jpg",
        nombre:"Churrasco italiano",
        precio:2000,
        ingredientes:["Churrasco", "Palta", "Tomate", "Mayonesa"]
    },
    {
        imagen:"images/completo_200px.jpg",
        nombre:"Completo italiano", 
        precio:1500, 
        ingredientes:["Vienesa", "Palta", "Tomate", "Mayonesa"]
    },
    {
        imagen:"images/piza_200px.jpg", 
        nombre:"Pizza individual", 
        precio:3000, 
        ingredientes:["Queso", "Pepperoni"]
    },
    {
        imagen:"images/papas_200px.jpg", 
        nombre:"Papas fritas chicas", 
        precio:1000, 
        ingredientes:["Papas fritas", "tamaño pequeño"]
    },
];
const BEBESTIBLES = [
    {
        imagen:"images/coca_200px.jpg", 
        nombre:"Bebida en lata", 
        precio:1000, 
        ingredientes:["Bebida en lata", "350cc"]
    },
    {
        imagen:"images/coca_cola_botella_200px.jpg", 
        nombre:"Bebida 1.5lt", 
        precio:2000, 
        ingredientes:["Bebida en botella", "1.5 litros"]
    },
    {
        imagen:"images/jugo_200px.jpg", 
        nombre:"Jugo natural", 
        precio:1500, 
        ingredientes:["Jugos naturales", "Naranja", "Frutilla", "Melon"]
    },
    {
        imagen:"images/cerveza_200px.jpg", 
        nombre:"Cerveza lager 500cc", 
        precio:3000, 
        ingredientes:["Shop cerveza lager", "500cc", "-4° grados"]
    },
    {
        imagen:"images/cerveza_red_200px.jpg", 
        nombre:"Cerveza red lager 500cc", 
        precio:3000, 
        ingredientes:["Shop cerveza red lager", "500cc", "-4.6° grados"]
    },
    {
        imagen:"images/cerveza_black_200px.jpg", 
        nombre:"Cerveza black lager 500cc", 
        precio:3000, 
        ingredientes:["Shop cerveza black lager", "500cc", "-5.7° grados"]
    },
];



const crearIngredientesHTML = (ingredientes) => {
    const listaIngredientes = ingredientes
        .map((ingrediente) => `<li >${ingrediente}</li>`)
        .join("");
    return `<ul >${listaIngredientes}</ul>`;
};

const formatoCLP = (numero) => {
    return numero.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
};

function crearProductosComestibles() {
    let n = COMESTIBLES.length;
    // console.log(`cantidad elementos: ${n}`)
    let listaComestibles = "";
    for (let i = 0; i < n; i++) {
        let comestible = crearComestible(i);
        listaComestibles += comestible;
    }
    document.getElementById("comestibles").innerHTML = listaComestibles;
}

const crearComestible = (i) => {
    let imagen = COMESTIBLES[i].imagen;
    let nombre = COMESTIBLES[i].nombre;
    let precio = COMESTIBLES[i].precio;
    let precioCLP = formatoCLP(precio);
    let ingredientes = crearIngredientesHTML(COMESTIBLES[i].ingredientes);
    const comestibleHTML = 
        `<article class="col-6 col-sm-6 col-md-4 col-lg-3 my-2 my-md-3 p-1 border border-primary rounded ">
            <div class="card m-0 m-sm-1 border border-primary">
                <img src=${imagen} 
                class="card-img-top h-100 w-75 img-fluid m-auto" 
                alt=${nombre}
                title=${nombre}>
                <div class="card-body fixed-height-card p-1">
                    <h5 class="card-title card-alto text-break fw-bold">${nombre}</h5>
                    <h5 class="card-subtitle text-success">${precioCLP}</h5>

                    <p class="card-text mb-0">Cantidad</p>                                 
                        <div class="btn-group justify-content-center col mb-2" role="group" aria-label="Basic example">
                            <button class="btn-decrement btn btn-outline-danger col-4" type="button">-</button>
                            <input type="number" id=comestible${i} name="cantidad" class="form-control col-4 rounded-0" min="0" value="0"  >
                            <button class="btn-increment btn btn-outline-success col-4" type="button">+</button>
                        </div>
                    <br>
                    
                    <div class="btn-group-vertical" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-sm btn-md  btn-info mb-1" 
                            data-bs-toggle="popover" data-bs-container="body" data-bs-placement="bottom" data-bs-html="true" 
                            title="Ingredientes"
                            data-bs-content="${ingredientes}">
                            Información
                        </button>
                        
                        <button class="btn btn-primary btn-sm text-center" type="submit" value="agregar" name="btnAgregar${i}"
                        onclick="agregarComestibleAlCarrito(${i})">
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        </article>`;
    return comestibleHTML;
};

function crearProductosBebestibles() {
    let n = BEBESTIBLES.length;
    // console.log(`cantidad elementos: ${n}`)
    let listaBebestibles = "";
    for (let i = 0; i < n; i++) {
        let bebestible = crearBebestible(i);
        listaBebestibles += bebestible;
    }
    document.getElementById("bebestibles").innerHTML = listaBebestibles;
}

const crearBebestible = (i) => {
    let imagen = BEBESTIBLES[i].imagen;
    let nombre = BEBESTIBLES[i].nombre;
    let precio = BEBESTIBLES[i].precio;
    let precioCLP = formatoCLP(precio);
    let ingredientes = crearIngredientesHTML(BEBESTIBLES[i].ingredientes);
    const bebestibleHTML = 
        `<article class="col-6 col-sm-6 col-md-4 col-lg-3 my-2 my-md-3 p-1 border border-primary rounded">
            <div class="card m-0 m-sm-1 border border-primary">
                <img src=${imagen}
                class="card-img-top h-100 w-75 img-fluid m-auto" 
                alt=${nombre}
                title=${nombre}>
                <div class="card-body fixed-height-card p-1">
                    <h5 class="card-title card-alto text-break fw-bold">${nombre}</h5>
                    <h5 class=".card-subtitle text-success">${precioCLP}</h5>
                    
                    <p class="card-text mb-0">Cantidad</p>                                 
                        <div class="btn-group justify-content-center col mb-2" role="group" aria-label="Basic example">
                            <button class="btn-decrement btn btn-outline-danger col-4" type="button">-</button>
                            <input type="number" id=bebestible${i} name="cantidad" class="form-control col-4 rounded-0" min="0" value="0"  ="" >
                            <button class="btn-increment btn btn-outline-success col-4" type="button">+</button>
                        </div>
                    <br>
                    
                    <div class="btn-group-vertical" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-sm btn-md  btn-info mb-1" 
                            data-bs-toggle="popover" data-bs-container="body" data-bs-placement="bottom" data-bs-html="true"
                            title="Información" 
                            data-bs-content="${ingredientes}">
                            Información
                        </button>
                        
                        <button class="btn btn-primary btn-sm text-center" type="submit" value="agregar" name="btnAgregar"
                        onclick="agregarBebestibleAlCarrito(${i})" >
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        </article>`;
    return bebestibleHTML;
};

crearProductosComestibles();
crearProductosBebestibles();


