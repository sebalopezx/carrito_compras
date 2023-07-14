// CARRITO DE COMPRAS

let cantidadElementosLocalStorage = obtenerCantidadTotalCarrito();

const carritoElementos = JSON.parse(carritoEnLocalStorage);

const formatoCLP = (numero) => {
    return numero.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
};

function crearCarrito() {
    if (cantidadElementosLocalStorage > 0) {
        // console.log("entrando a carrito")
        // const carrito = JSON.parse(carritoEnLocalStorage);
        const carritoContenedor = document.getElementById("carrito-compras");
        let carritoHTML = "";
        let total = 0;
        let i = 0;

        for (const producto in carritoElementos) {
            if (carritoElementos.hasOwnProperty(producto)) {
                i++;
                const { imagen, nombre, precio, cantidad } = carritoElementos[producto]; // carritoElementos[producto];
                let subtotal = precio * cantidad;
                let precioCLP = formatoCLP(precio);
                let subtotalCLP = formatoCLP(subtotal);
                total += subtotal;

                // Crea los elementos HTML y asigna las propiedades correspondientes
                const carritoElementosHTML = `
                    <article class="carrito-compras container text-start my-4 p-2 border border-primary rounded shadow-lg bg-primary">
                        <div class="card">
                            <div class="row g-0 ">

                                <div class="col-lg-2 col-md-2 col-sm-4 col-6 ">
                                    <img src="${imagen}" style="max-width:100px;" class="card-img-top img-fluid rounded-start h-100 w-100 w-sm-50 " alt="${nombre}">
                                </div>

                                <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                                    <div class="card-body">
                                        <h6 class="card-title fw-bold">Nombre</h6>
                                        <p class="card-text card-alto">${nombre}</p>
                                    </div>
                                </div>

                                <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                                    <div class="card-body">
                                        <h6 class="card-title fw-bold">Precio</h6>
                                        <p class=".card-subtitle text-success">${precioCLP}</p>
                                    </div>
                                </div>

                                <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                                    <div class="card-body">
                                        <h6 class="card-title fw-bold">Cantidad</h6>
                                        <p class=".card-subtitle ">${cantidad}</p>
                                    </div>
                                </div>

                                <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                                    <div class="card-body">
                                        <h6 class="card-title fw-bold">SubTotal</h6>
                                        <p class=".card-subtitle ">${subtotalCLP}</p>
                                    </div>
                                </div>
                                
                                <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                                    <div class="card-body">
                                        <h6 class="card-title fw-bold">Eliminar</h6>
                                        <button onclick="eliminarProductoCarrito('${nombre}')" type="button" class="btn btn-danger btn-sm">
                                            <i class="bi bi-trash-fill"></i>
                                        </button>
                                    </div>
                                </div>
                
                            </div>
                        </div>
                    </article>`;

                carritoHTML += carritoElementosHTML;
                // document.getElementById("carrito-compras").innerHTML = carritoElemetnosHTML;

            }
        }
        let totalCLP = formatoCLP(total);
        let totalHTML = `
            <article class="total  my-4 p-2 border border-primary rounded shadow-lg bg-primary mx-auto">
                <div class="card">
                    <div class="row g-0 mx-auto">

                        <div class="col-6 ">
                            <div class="card-body">
                                <h5 class="card-title  fst-italic text-end">Total :</h5>
                            </div>
                        </div>
                        <div class="col-6 ">
                            <div class="card-body">
                                <h5 class=".card-subtitle text-success fw-bold">${totalCLP}</h5>
                            </div>
                        </div>

                        <div class="d-flex justify-content-center align-items-center mb-2 ">                          
                            <!-- BOTON TRIGGER MODAL -->
                            <button class="btn btn-primary btn-sm me-2" type="button" value="pagar" name="btnPagar" id="btnPagar">
                                Realizar Pago
                            </button>
                            <!-- BOTON TRIGGER MODAL -->
                            <button class="btn btn-warning btn-sm text-light" type="button" value="pagar" name="btnVaciar" id="btnVaciar">
                                Vaciar carrito
                            </button>                                                         
                        </div>
                    </div>
                </div>
            </article>`;

        carritoHTML += totalHTML;
        carritoContenedor.innerHTML += carritoHTML;

    } else {
        // console.log("entrando a carrito VACIO")
        const carritoVacioHTML = `
            <article class="container text-start my-4 p-2 border border-primary rounded shadow-lg bg-light bg-primary ">
                <div class="card">
                    <div class="row">
                        <div class="col-12">
                            <div class="card-body text-center">
                                <i class="bi bi-cart display-1 text-primary"></i>
                                <h2 class="card-title ">Tu carrito está vacío.</h2>
                                <i class="bi bi-emoji-frown display-1"></i>
                            </div>
                        </div>
                    </div>
                </div>  
            </article>`;

        document.getElementById("carrito-vacio").innerHTML = carritoVacioHTML;
    }
};
crearCarrito();



function eliminarProductoCarrito(nombreProducto) {
    // console.log("entrando a eliminar 1 cantidad")
    let carritoEnLocalStorage = localStorage.getItem("carrito");
    let carrito = JSON.parse(carritoEnLocalStorage);


    if (carrito.hasOwnProperty(nombreProducto)) {
        let cantidad = carrito[nombreProducto].cantidad;
        if (cantidad > 1) {
            carrito[nombreProducto].cantidad -= 1;
            location.reload()
        } else {
            delete carrito[nombreProducto];
            location.reload()
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarritoHTML();
        if (Object.keys(carrito).length === 0) {
            localStorage.removeItem("carrito");
        }
    }
}



const pagarCarrito = () => {
    let btnVaciar = document.getElementById("btnPagar");
    btnVaciar.addEventListener("click", () => {
        Swal.fire({
            title: '¿Deseas continuar con el pago?',
            text: "Se realizara el pago y se vaciara el carrito!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#6f14f1',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Pagar!'
        }).then((result) => {
            if (result.isConfirmed) {
                carrito = {}; // Vaciar el carrito asignándole un objeto vacío
                localStorage.removeItem("carrito");
                setTimeout(() => {   
                    let timerInterval
                    Swal.fire({
                        icon: 'success',
                        title: 'Pago realizado!',
                        html: 'La ventana se cerrara en <b></b> segundos.',
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                            const b = Swal.getHtmlContainer().querySelector('b')
                            timerInterval = setInterval(() => {
                                b.textContent = Swal.getTimerLeft()
                            }, 100)
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            console.log('Compra Realizada!')
                        }
                    })
                        
                    setTimeout(() => {  
                        location.reload()
                    },2500);                         
                },500)
                
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Acción cancelada...',
                    text: 'Sigue con tu compra!'
                    });
            }             
        });
    });
};

pagarCarrito();




const vaciarCarrito = () => {
    let btnVaciar = document.getElementById("btnVaciar");
    btnVaciar.addEventListener("click", () => {
        Swal.fire({
            title: '¿Estás seguro de realizar esta acción?',
            text: "Eliminaras todo tu carrito de compras!",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#ffc107', //#3085d6
            cancelButtonColor: '#d33', //#d33
            confirmButtonText: 'Vaciar!'
        }).then((result) => {
            if (result.isConfirmed) {
                carrito = {}; // Vaciar el carrito asignándole un objeto vacío
                localStorage.removeItem("carrito");
                setTimeout(() => {   
                    let timerInterval
                    Swal.fire({
                        icon: 'success',
                        title: 'Realizado!',
                        html: 'La carrito se eliminara en <b></b> segundos.',
                        timer: 1500,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                            const b = Swal.getHtmlContainer().querySelector('b')
                            timerInterval = setInterval(() => {
                                b.textContent = Swal.getTimerLeft()
                            }, 100)
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            console.log('Carrito Eliminado!')
                        }
                    })
                        
                    setTimeout(() => {  
                        location.reload()
                    },2000);                         
                },500)
                
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Acción cancelada...',
                    text: 'Sigue con tu compra!'
                    });
            }             
        });
    });
};

vaciarCarrito();