let header = document.querySelector("#header");
let contenedor = document.querySelector("#contenedor");
let body = document.querySelector("body");

let abrirCarrito = document.getElementById("botonCarrito");
let modal = document.getElementById("modal");
let listaCarrito = document.getElementById("listaCarrito");
let totalCarrito = document.getElementById("totalCarrito");
let cuentaCarrito = document.getElementById("cuentacarrito");

abrirCarrito.addEventListener("click", abrirModal);

function abrirModal() {
    modal.style.display = "block";
    calcularTotal();
}

function cerrarModal() {
    modal.style.display = "none";
}

function agregarAlCarrito(nombreProducto, precioProducto) {
    let productosEnCarrito = listaCarrito.children;

    for (let i = 0; i < productosEnCarrito.length; i++) {
        let producto = productosEnCarrito[i];
        if (producto.dataset.nombre === nombreProducto) {
            let cantidadActual = parseInt(producto.querySelector(".cantidad").textContent);
            let nuevaCantidad = cantidadActual + 1;
            producto.querySelector(".cantidad").textContent = nuevaCantidad;
            producto.querySelector(".subtotal").textContent = `$${(precioProducto * nuevaCantidad).toFixed(2)}`;
            calcularTotal();
            actualizarContadorCarrito();
            return;
        }
    }

    let nuevoProducto = document.createElement("li");
    nuevoProducto.dataset.nombre = nombreProducto;
    nuevoProducto.innerHTML = `
        <span class="cantidad">1</span> 
        ${nombreProducto} - 
        Subtotal: <span class="subtotal">$${precioProducto.toFixed(2)}</span>
    `;
    listaCarrito.appendChild(nuevoProducto);
    calcularTotal();
    actualizarContadorCarrito();
}


function limpiarCarrito() {
    listaCarrito.innerHTML = "";
    totalCarrito.textContent = "$0.00";
    actualizarContadorCarrito();
}

function calcularTotal() {
    let total = 0;
    let productosEnCarrito = listaCarrito.children;

    for (let i = 0; i < productosEnCarrito.length; i++) {
        let producto = productosEnCarrito[i];
        let precioProducto = parseFloat(producto.querySelector(".subtotal").textContent.replace("$", ""));
        total += precioProducto;
    }

    totalCarrito.textContent = `$${total.toFixed(2)}`;
}

function actualizarContadorCarrito() {
    let productosEnCarrito = listaCarrito.children;
    let cantidadTotal = 0;

    for (let i = 0; i < productosEnCarrito.length; i++) {
        let producto = productosEnCarrito[i];
        let cantidadProducto = parseInt(producto.querySelector(".cantidad").textContent);
        cantidadTotal += cantidadProducto;
    }

    cuentaCarrito.textContent = cantidadTotal.toString();
}

const botonesComprar = document.querySelectorAll(".card button");

botonesComprar.forEach((boton) => {
    boton.addEventListener("click", function () {
        let producto = this.parentNode;
        let nombreProducto = producto.querySelector("p").textContent;
        let precioProducto = parseFloat(producto.querySelector(".precio").textContent.replace("$", ""));

        agregarAlCarrito(nombreProducto, precioProducto);
    });
});