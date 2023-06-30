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
// let alertCarrito = document.getElementById("alertCarrito").classList.add("hide");
let carrito = {};
function agregarComestibleAlCarrito(i) {
    let cantidad = document.getElementById(`comestible${i}`).value;
    if (cantidad != 0){
        const nombreProducto = COMESTIBLES[i][1];
        const precioProducto = COMESTIBLES[i][2];

        if (carrito.hasOwnProperty(nombreProducto)) {
            // Actualizar la cantidad si el producto ya existe en el carrito
            carrito[nombreProducto].cantidad += parseInt(cantidad);
        } else {
            // Agregar el producto al carrito
            carrito[nombreProducto] = {
                cantidad: parseInt(cantidad),
                precio: parseInt(precioProducto),
            };
        };
        actualizarCarritoHTML(); // Actualizar el contenido del carrito
    }; 
};

function agregarBebestibleAlCarrito(i) {
    let cantidad = document.getElementById(`bebestible${i}`).value;
    if (cantidad != 0){
        const nombreProducto = BEBESTIBLES[i][1];
        const precioProducto = BEBESTIBLES[i][2];

        // hasOwnProperty devuelve un booleano para indicar si existe o no el producto en el alert
        if (carrito.hasOwnProperty(nombreProducto)) {
            // Actualizar la cantidad si el producto ya existe en el carrito
            carrito[nombreProducto].cantidad += parseInt(cantidad);
        } else {
            // Agregar el producto al carrito
            carrito[nombreProducto] = {
                cantidad: parseInt(cantidad),
                precio: precioProducto,
            };
        };
        actualizarCarritoHTML(); // Actualizar la visualización del carrito
    };
};

function actualizarCarritoHTML() {
    const carritoElement = document.getElementById("alertCarrito");
    const btnBadge = carritoElement.querySelector(".btn-badge");

    let totalCarrito = 0;
    let contenidoHTML = btnBadge.outerHTML; // Mantener el badge en el contenido
    console.log(contenidoHTML);

    for (const producto in carrito) {
        console.log(`Producto ${producto}`);
        console.log(`Carrito ${carrito}`, carrito);
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
    let nuevaCantidad = 0;

    for (const producto in carrito) {
        nuevaCantidad += carrito[producto].cantidad;
    };

    badge.textContent = nuevaCantidad;
};


function eliminarProductoDelAlert(nombreProducto) {
    console.log("entrando a eliminar un producto del alert");
    if (carrito.hasOwnProperty(nombreProducto)) {
        let cantidad = carrito[nombreProducto].cantidad;
        if (cantidad > 1) {
            carrito[nombreProducto].cantidad -= 1;
        } else {
            delete carrito[nombreProducto];
        };
        actualizarCarritoHTML();
    };
};



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

// function resetForm(){
//     document.getElementById("nombre").value = "";
//     document.getElementById("correo").value = "";
//     document.getElementById("telefono").value = "";
//     document.getElementById("domicilio").value = "";
//     document.getElementById("numeroDomicilio").value = "";
//     selectedRow = null;
//     document.getElementById("nombre").classList.remove("is-invalid","is-valid");
//     document.getElementById("correo").classList.remove("is-invalid","is-valid");
//     document.getElementById("telefono").classList.remove("is-invalid","is-valid");
//     document.getElementById("domicilio").classList.remove("is-invalid","is-valid");
//     document.getElementById("numeroDomicilio").classList.remove("is-invalid","is-valid");
// }
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

// function validate(){
//     let isValid = true;

//     // Validación del campo "Nombre"
//     let nombreInput = document.getElementById("nombre");
//     if (nombreInput.value.trim() === "") {
//         nombreInput.classList.add("is-invalid");
//         isValid = false;
//     } else {
//         nombreInput.classList.remove("is-invalid");
//     }

//     // Validación del campo "Correo"
//     let correoInput = document.getElementById("correo");
//     let correoValue = correoInput.value.trim();
//     if (correoValue === "") {
//       correoInput.classList.add("is-invalid");
//       isValid = false;
//     } else if (!validateEmail(correoValue)) {
//       correoInput.classList.add("is-invalid");
//       isValid = false;
//     } else {
//       correoInput.classList.remove("is-invalid");
//     }

//     // Validación del campo "Teléfono"
//     let telefonoInput = document.getElementById("telefono");
//     if (telefonoInput.value.trim() === "") {
//         telefonoInput.classList.add("is-invalid");
//         isValid = false;
//     } else {
//         telefonoInput.classList.remove("is-invalid");
//     }

//     // Validación del campo "Domicilio"
//     let domicilioInput = document.getElementById("domicilio");
//     if (domicilioInput.value.trim() === "") {
//         domicilioInput.classList.add("is-invalid");
//         isValid = false;
//     } else {
//         domicilioInput.classList.remove("is-invalid");
//     }

//     // Validación del campo "Número de Domicilio"
//     let numeroDomicilioInput = document.getElementById("numeroDomicilio");
//     if (numeroDomicilioInput.value.trim() === "") {
//         numeroDomicilioInput.classList.add("is-invalid");
//         isValid = false;
//     } else {
//         numeroDomicilioInput.classList.remove("is-invalid");
//     }
//     return isValid;
// }

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


//     isValid = true;
//     if(document.getElementById("nombre").value == ""){
//         isValid = false;
//         // document.getElementById("Error").classList.remove("hide");
//     } else{
//         isValid = true;
//         // if(!document.getElementById("Error").classList.contains("hide"))
//         //     document.getElementById("Error").classList.add("hide");
//     }
//     return isValid;
// }

// -------------------------------------------------------------------------------------

// BOTON DE CONFIRMACION Y CANCELACION DE PAGO

let buttonClicked = null;
let activeToast = null;

const btnClickeado = (valor) => {
    if (activeToast) {
        activeToast.hide();
        activeToast = null;
    };
    buttonClicked = valor;
    confirmar();
};

const confirmar = () => {
    let modal = document.getElementById("exampleModal");
    let bsModal = bootstrap.Modal.getInstance(modal);
    bsModal.hide();

    if (buttonClicked === "confirmar") {
        let toast = document.getElementById("confirmarPago");
        var bsToast = new bootstrap.Toast(toast);
    } else if (buttonClicked === "anular") {
        let toast = document.getElementById("anularPago");
        var bsToast = new bootstrap.Toast(toast);
    };
    bsToast.show();
    activeToast = bsToast;
};
