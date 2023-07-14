// LINK CON CLASE ACTIVE PARA MARCAR POSICION

// Obtenemos la URL actual
let currentURL = window.location.href;

// Obtenemos todos los enlaces de navegación
let navLinks = document.querySelectorAll(".nav-link");

// Iteramos sobre los enlaces
for (var i = 0; i < navLinks.length; i++) {
    let link = navLinks[i];

    // Verificamos si el href del enlace coincide con la URL actual
    if (link.href === currentURL) {
        // Agregamos la clase "active" al enlace
        link.classList.add("active");
    };
};

// -------------------------------------------------------------------------------------

// POPOVERS DE PRODUCTOS

const popovers = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
);
let activePopover = null;

const cerrarPopoverActivo = () => {
    if (activePopover) {
        activePopover.hide();
        activePopover = null;
    };
};

popovers.forEach((popoverTrigger) => {
    const popoverInstance = new bootstrap.Popover(popoverTrigger);
    // Cierra el popover que estaba activo
    popoverTrigger.addEventListener("click", () => {
        cerrarPopoverActivo();

        // verificamos si el popover actual no fue abierto por un clic
        // if (!popoverInstance._activeTrigger.click) {
        //   popoverInstance.toggle();
        // }

        activePopover = popoverInstance;
    });
});
// Cerrar popover al hacer click fuera del contenedor
document.addEventListener("click", (event) => {
    const target = event.target;
    if (!target.matches('[data-bs-toggle="popover"]')) {
        cerrarPopoverActivo();
    };
});

// -------------------------------------------------------------------------------------






// PRODUCTOS

// INCREMENTO y DECREMENTO de cantidad de productos

// DOMContentLoaded reservada que indica que todos los elementos del proyecto estan cargados
document.addEventListener("DOMContentLoaded", function () {
    let numberInputs = document.querySelectorAll('input[type="number"]');

    for (let i = 0; i < numberInputs.length; i++) {
        let incrementBtn =
            numberInputs[i].parentNode.querySelector(".btn-increment");
        let decrementBtn =
            numberInputs[i].parentNode.querySelector(".btn-decrement");

        incrementBtn.addEventListener("click", function () {
            let value = parseInt(
                this.parentNode.querySelector('input[type="number"]').value
            );
            this.parentNode.querySelector('input[type="number"]').value = value + 1;
        });

        decrementBtn.addEventListener("click", function () {
            let value = parseInt(
                this.parentNode.querySelector('input[type="number"]').value
            );
            if (value > 0) {
                this.parentNode.querySelector('input[type="number"]').value = value - 1;
            };
        });
    };
});

  



// -------------------------------------------------------------------------------------

// AÑADIR PRODUCTOS AL ALERT DE CARRITO
let carrito = {};
let carritoEnLocalStorage = localStorage.getItem("carrito");


// Cargar productos del carrito desde localStorage
if (carritoEnLocalStorage) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    cantidadProductosEnCarrito = obtenerCantidadTotalCarrito(); // Object.keys(carrito).length;

    // Actualizar el contenido del badge en la barra de navegación
    const badgeCarritoMenu = document.querySelector(".badgeMenu");
    const badgeCarritoMenu2 = document.querySelector(".badgeMenu2");
    if(badgeCarritoMenu){
        badgeCarritoMenu.textContent = cantidadProductosEnCarrito.toString();
    }
    if(badgeCarritoMenu2){
        badgeCarritoMenu2.textContent = cantidadProductosEnCarrito.toString();
    }

    actualizarCarritoHTML(); // Actualizar la visualización del carrito
}
  

function agregarComestibleAlCarrito(i) {
    let cantidad = document.getElementById(`comestible${i}`).value;

    if (cantidad != 0){
        const imgProducto = COMESTIBLES[i].imagen;
        const nombreProducto = COMESTIBLES[i].nombre;
        const precioProducto = COMESTIBLES[i].precio;

        if (carrito.hasOwnProperty(nombreProducto)) {
            // Actualizar la cantidad si el producto ya existe en el carrito
            carrito[nombreProducto].cantidad += parseInt(cantidad);
        } else {
            // Agregar el producto al carrito
            carrito[nombreProducto] = {
                imagen: imgProducto,
                nombre: nombreProducto,
                cantidad: parseInt(cantidad),
                precio: parseInt(precioProducto),
            };

        };
        actualizarCarritoHTML(); // Actualizar el contenido del carrito

        // LOCAL STORAGE
        if (Object.keys(carrito).length === 0) {
            localStorage.removeItem("carrito");
        } else {
            localStorage.setItem("carrito", JSON.stringify(carrito));
        }

    }; 
};

function agregarBebestibleAlCarrito(i) {
    let cantidad = document.getElementById(`bebestible${i}`).value;
    if (cantidad != 0){
        const imgProducto = BEBESTIBLES[i].imagen;
        const nombreProducto = BEBESTIBLES[i].nombre;
        const precioProducto = BEBESTIBLES[i].precio;

        // hasOwnProperty devuelve un booleano para indicar si existe o no el producto en el alert
        if (carrito.hasOwnProperty(nombreProducto)) {
            // Actualizar la cantidad si el producto ya existe en el carrito
            carrito[nombreProducto].cantidad += parseInt(cantidad);
        } else {
            // Agregar el producto al carrito
            carrito[nombreProducto] = {
                imagen: imgProducto,
                nombre: nombreProducto,
                cantidad: parseInt(cantidad),
                precio: precioProducto,
            };
        };
        
        actualizarCarritoHTML(); // Actualizar la visualización del carrito

        // LOCAL STORAGE
        if (Object.keys(carrito).length === 0) {
            localStorage.removeItem("carrito");
        } else {
            localStorage.setItem("carrito", JSON.stringify(carrito));
        }
    };
};

function actualizarCarritoHTML() {
    const carritoElement = document.getElementById("alertCarrito");
    const btnBadge = document.getElementById("btn-badge");

    let totalCarrito = 0;
    if (btnBadge) {
        var contenidoHTML = btnBadge.parentNode.outerHTML; // Mantener el badge en el contenido
    };

    for (const producto in carrito) {
        // console.log(`Producto ${producto}`);
        // console.log(`Carrito ${carrito}`, carrito);
        let cantidad = carrito[producto].cantidad;
        let precio = carrito[producto].precio;
        let subtotal = cantidad * precio;
        totalCarrito += subtotal;

        let precioCLP = formatoCLP(precio);
        let subtotalCLP = formatoCLP(subtotal);

        contenidoHTML += `<p>${producto} - Cantidad: ${cantidad} - Precio: ${precioCLP} - Subtotal: ${subtotalCLP}
                            <button type="button" class="btn btn-danger btn-sm" onclick="eliminarProductoDelAlert('${producto}')">
                                <i class="bi bi-trash-fill"></i>
                            </button></p>`;
    }; 

    let totalCarritoCLP = formatoCLP(totalCarrito);
    contenidoHTML += `<p>Total del carrito: <strong>${totalCarritoCLP}</strong></p>`;
    carritoElement.innerHTML = contenidoHTML;
    
    actualizarBadgeCarrito(); // Actualizar solo el badge del carrito
};

function actualizarBadgeCarrito() {
    const badge = document.getElementById("badgeCarrito");
    const badgeCarritoMenu = document.querySelector(".badgeMenu");
    const badgeCarritoMenu2 = document.querySelector(".badgeMenu2");

    let nuevaCantidad = 0;

    for (const producto in carrito) {
        nuevaCantidad += carrito[producto].cantidad;
    };

    badge.textContent = nuevaCantidad;
    badgeCarritoMenu.textContent = nuevaCantidad.toString();
    badgeCarritoMenu2.textContent = nuevaCantidad.toString();
};


function eliminarProductoDelAlert(nombreProducto) {
    console.log("entrando a eliminar un producto del alert");
    if (carrito.hasOwnProperty(nombreProducto)) {
        let cantidad = carrito[nombreProducto].cantidad;
        if (cantidad > 1) {
            carrito[nombreProducto].cantidad -= 1;
            localStorage.setItem("carrito", JSON.stringify(carrito));
        } else {
            delete carrito[nombreProducto];
            localStorage.setItem("carrito", JSON.stringify(carrito));
        };
        actualizarCarritoHTML();
    };
};




// CARRITO DE COMPRAS CON LOCAL STORAGE

function obtenerCantidadTotalCarrito() {
    let cantidadTotal = 0;
    // Obtener los datos del Local Storage y calcular la cantidad total
    if (carritoEnLocalStorage) {
        const carrito = JSON.parse(carritoEnLocalStorage);
      
        for (const producto in carrito) {
            if (carrito.hasOwnProperty(producto) && typeof carrito[producto].cantidad === 'number') {
                cantidadTotal += carrito[producto].cantidad;
            }
        }
    }
    return parseInt(cantidadTotal);
}




// -------------------------------------------------------------------------------------

// FORMULARIO

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
            "submit",
            function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                };
                form.classList.add("was-validated");
            },
            false
        );
    });
})();


let selectedRow = null;
function onFormSubmit(){
    // if(validate()){
        let formData = readFormData();
        if(selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData)
            resetForm();
    };
// };

function readFormData(){
    let formData = {};
    formData["nombre"] = document.getElementById("nombre").value;
    formData["correo"] = document.getElementById("correo").value;
    formData["telefono"] = document.getElementById("telefono").value;
    formData["domicilio"] = document.getElementById("domicilio").value;
    formData["numeroDomicilio"] = document.getElementById("numeroDomicilio").value;
    return formData;
};

function insertNewRecord(data){
    let table = document.getElementById("listaCliente").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.nombre;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.correo;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.telefono;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.domicilio;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.numeroDomicilio;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<a onClick="onEdit(this)" class="btn btn-warning btn-sm">Editar</a>
                       <a onClick="onDelete(this)" class="btn btn-danger btn-sm">Eliminar</a>`;
};


function resetForm() {
    const valores = ['nombre', 'correo', 'telefono', 'domicilio', 'numeroDomicilio'];

    valores.forEach((valor) => {
        const elemento = document.getElementById(valor);
        elemento.value = "";
        elemento.classList.remove('was-validated');
    });

    selectedRow = null;
};
  

function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById("nombre").value = selectedRow.cells[0].innerHTML;
    document.getElementById("correo").value = selectedRow.cells[1].innerHTML;
    document.getElementById("telefono").value = selectedRow.cells[2].innerHTML;
    document.getElementById("domicilio").value = selectedRow.cells[3].innerHTML;
    document.getElementById("numeroDomicilio").value = selectedRow.cells[4].innerHTML;
}; 

function updateRecord(formData){
    selectedRow.cells[0].innerHTML = formData.nombre;
    selectedRow.cells[1].innerHTML = formData.correo;
    selectedRow.cells[2].innerHTML = formData.telefono;
    selectedRow.cells[3].innerHTML = formData.domicilio;
    selectedRow.cells[4].innerHTML = formData.numeroDomicilio;
};

function onDelete(td){
    if(confirm('¿Estas seguro de eliminar el registro?')){
        row = td.parentElement.parentElement;
        document.getElementById("listaCliente").deleteRow(row.rowIndex);
        resetForm();
    };
};


function validateEmail(email) {
    // Expresión regular para validar el formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
  

// Restablecer los estilos de validación cuando los campos cambien
document.querySelectorAll(".needs-validation .form-control").forEach(function (input) {
    input.addEventListener("input", function () {
        if (input.value.trim() !== "") {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        } else {
            input.classList.remove("is-valid");
        };
    });
});




// -------------------------------------------------------------------------------------

// BOTON DE CONFIRMACION Y CANCELACION DE PAGO

// let buttonClicked = null;
// let activeToast = null;

// const btnClickeado = (valor) => {
//     if (activeToast) {
//         activeToast.hide();
//         activeToast = null;
//     };
//     buttonClicked = valor;
//     confirmar();
// };

// const confirmar = () => {
//     let modal = document.getElementById("exampleModal");
//     let bsModal = bootstrap.Modal.getInstance(modal);
//     bsModal.hide();

//     if (buttonClicked === "confirmar") {
//         let toast = document.getElementById("confirmarPago");
//         var bsToast = new bootstrap.Toast(toast);
//     } else if (buttonClicked === "anular") {
//         let toast = document.getElementById("anularPago");
//         var bsToast = new bootstrap.Toast(toast);
//     };
//     bsToast.show();
//     activeToast = bsToast;
// };
