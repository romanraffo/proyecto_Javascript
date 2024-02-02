const carritoNuevo = JSON.parse(localStorage.getItem("clave-carrito")) //Aca se guarda la data de los productos seleccionados en Tienda
const contenedorCarrito = document.querySelector("#contenedor-carrito");
const borrarProducto = document.querySelectorAll("#borrar-elemento");
const carritoTotal = document.querySelector("#contenedor-total");
const numeroTotal = document.querySelector(".precio__por__unidad__carrito");

console.log(carritoNuevo)

if(carritoNuevo){

    agregarElementos();
    
}else{
    
    carritoSinProductos();

}

function agregarElementos (){

    carritoNuevo.forEach(producto => {

        let div = document.createElement("div");
        div.classList.add("subcontenedor__carrito");
        div.innerHTML = `
        <div class="imagen__carrito"> <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen__carrito__tamanio"> </div>
        <div class="nombre__producto__carrito"> ${producto.nombre} </div>
        <div class="cantidad__productos__carrito"> Cantidad: ${producto.cantidad} </div>
        <div class="precio__por__unidad__carrito"> Valor: $${producto.precio * producto.cantidad} USD </div>
        <div class="borrar__producto__carrito"> <button class="remove__carrito" id="borrar-elemento"><i class="bi bi-trash"></i></button> </div>
        `

        contenedorCarrito.append(div);
 
    });

    agregarTotal();

    const botonesBorrar = document.querySelectorAll(".remove__carrito");
    botonesBorrar.forEach(boton => {
        boton.addEventListener("click", borrarElemento);
    });
}

function borrarElemento(e){
    const index = e.target.dataset.index;
    carritoNuevo.splice(index, 1);
    localStorage.setItem("clave-carrito", JSON.stringify(carritoNuevo));
    contenedorCarrito.innerHTML = ""; // Limpiar el contenido del carrito

    Swal.fire({
        title: "Producto eliminado",
        icon: "error"
    });

    agregarElementos(); // Volver a mostrar los elementos actualizados
}

function agregarTotal (){
    let totalActualizado = 0;
    totalActualizado = carritoNuevo.reduce((acumulador, producto) => acumulador + producto.precio, 0)

    let div = document.createElement("div");
    div.classList.add("subcontenedor__carrito__elementos");
    div.innerHTML = `
    <div class="elementos__carrito"> <button class="borrar__carrito">Vaciar carrito<i class="bi bi-trash"></i></button> </div>
    <div class="precio__por__unidad__carrito"> Total: $${totalActualizado} </div>
    <div class="elementos__carrito"> <button class="comprar__carrito">Comprar carrito</button> </div>
    `

    carritoTotal.append(div);
}



/*Parte de carrito vacio*/

const carritoVacio = document.createElement("#carrito-vacio");

function carritoSinProductos (){
    let div = document.createElement("div");
    div.innerHTML = `
    <p class="carrito__compras__parrafo__vacio"> No tenes productos en el carrito... <i class="bi bi-cart2"></i> </p>
    `
    carritoVacio.append(div);
}                
