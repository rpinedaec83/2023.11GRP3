let productosEnCarrito = localStorage.getItem("productos-en-carrito")
productosEnCarrito = JSON.parse(productosEnCarrito)

const contenedorCarritoVacio = document.getElementById("carrito-vacio")
const contenedorCarritoProductos = document.getElementById("carrito-productos")
const contenedorCarritoAcciones = document.getElementById("carrito-acciones")
const contenedorCarritoComprado = document.getElementById("carrito-comprado")
const botonVaciar = document.getElementById("carrito-acciones-vaciar")
const botonComprar = document.getElementById("carrito-acciones-comprar")
const contenedorTotal = document.getElementById("total")

let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")

function cargarProductosCarrito(){
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        

        contenedorCarritoVacio.classList.add("disabled")
        contenedorCarritoProductos.classList.remove("disabled")
        contenedorCarritoAcciones.classList.remove("disabled")
        contenedorCarritoComprado.classList.add("disabled")
    
    
        contenedorCarritoProductos.innerHTML = ""
    
        productosEnCarrito.forEach(p => {
            const div = document.createElement("div")
            div.classList.add("carrito-producto")
            div.innerHTML = `
            <img class="carrito-producto-imagen" src="${p.imagen}" alt="${p.titulo}">
            <div class="carrito-producto-titulo">
                <small>Titulo</small>
                <h3>${p.titulo}</h3>
            </div>
            <div class="carrito-producto-cantidad">
                <small>Cantidad</small>
                <p>${p.cantidad}</p>
            </div>
            <div class="carrito-producto-precio">
                <small>Precio</small>
                <p>$${p.precio}</p>
            </div>
            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                <p>$${p.precio * p.cantidad}</p>
            </div>
            <button class="carrito-producto-eliminar" id="${p.id}"><i class="bi bi-trash"></i></button>
       
            `;
    
            contenedorCarritoProductos.append(div);
    
        });
    
    } else {
    
        contenedorCarritoVacio.classList.remove("disabled")
        contenedorCarritoProductos.classList.add("disabled")
        contenedorCarritoAcciones.classList.add("disabled")
        contenedorCarritoComprado.classList.add("disabled")
    }

    actualizarBotonesEliminar();
    actualizarTotal();
    
}

cargarProductosCarrito();




function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")

    botonesEliminar.forEach(boton =>{
        boton.addEventListener("click",eliminarDelCarrito)
    })
}

function eliminarDelCarrito(e){
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(p => p.id === idBoton)
    console.log(productosEnCarrito)
    productosEnCarrito.splice(index , 1)
    console.log(productosEnCarrito)
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito))
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito(){
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito))
    cargarProductosCarrito();
}

function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, p) => acc + (p.precio * p.cantidad) , 0)
    total.innerText =  `${totalCalculado}`
}

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito(){
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito))
    contenedorCarritoVacio.classList.add("disabled")
    contenedorCarritoProductos.classList.add("disabled")
    contenedorCarritoAcciones.classList.add("disabled")
    contenedorCarritoComprado.classList.remove("disabled")
}
