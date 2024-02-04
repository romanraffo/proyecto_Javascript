/*Variables declaradas👇*/

let carritoNuevo = localStorage.getItem("clave-carrito");

carritoNuevo = JSON.parse(carritoNuevo);

const carritoVacio = document.querySelector("#carrito-vacio");

const carritoProductos = document.querySelector("#contenedor-productos-carrito");

const carritoElementos = document.querySelector("#carrito-elementos");

let borrarProducto = document.querySelectorAll(".borrar__producto__carrito");

const comprarCarrito = document.querySelector("#comprar-carrito");

const borrarCarrito = document.querySelector("#borrar-carrito");

const compraTotal = document.querySelector("#carrito-total");


/*Empieza el algoritmo👇*/


//Cargar los productos seleccionados en tienda.html👇
function agregarProductosSeccionCarrito(){

    if(carritoNuevo && carritoNuevo.length > 0){
        carritoVacio.classList.add("desactivado");
        carritoProductos.classList.remove("desactivado");
        carritoElementos.classList.remove("desactivado");
    
        carritoProductos.innerHTML = "";
    
        carritoNuevo.forEach(producto => {
    
            let div = document.createElement("div");
            div.classList.add("subcontenedor__carrito");
            div.innerHTML = `
            <div class="imagen__carrito"> <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen__carrito__tamanio"> </div>
            <div class="nombre__producto__carrito"> ${producto.nombre} </div>
            <div class="cantidad__productos__carrito"> Cantidad: ${producto.cantidad} </div>
            <div class="precio__por__unidad__carrito"> Valor: $${producto.precio * producto.cantidad} USD </div>
            <div class="borrar__producto__carrito"> <button class="remove__carrito" id="${producto.id}"><i class="bi bi-trash"></i></button> </div>
            `
    
            carritoProductos.append(div);

            totalDeCarrito()
    
        });
    
    }else{
        carritoVacio.classList.remove("desactivado");
        carritoProductos.classList.add("desactivado");
        carritoElementos.classList.add("desactivado");
    }

    renovarEliminarCarrito();
}


agregarProductosSeccionCarrito();


//Botenes de borrar producto individual👇
function renovarEliminarCarrito(){

    borrarProducto = document.querySelectorAll(".remove__carrito");

    borrarProducto.forEach(boton => {
        boton.addEventListener("click", borrarProductoCarrito);
    })
}

function borrarProductoCarrito(e){

    let IdDelProducto = e.currentTarget.id;
    const index = carritoNuevo.findIndex(producto => producto.id === IdDelProducto);
    if (index !== -1) {
        carritoNuevo.splice(index, 1);
        
        Swal.fire({
            title: "Producto eliminado",
            icon: "error",
            customClass: {
                title: `alert__font`
            },
            confirmButtonText: 'Aceptar'
        });
        
        localStorage.setItem("clave-carrito", JSON.stringify(carritoNuevo)); // Aca se actualiza el almacenamiento local después de eliminar un producto del carrito
        
        agregarProductosSeccionCarrito(); // Y despues se actualiza la representación visual del carrito
    } else {

        console.error("Producto no encontrado en el carrito.");

    }
}


//Boton de comprar carrito👇
comprarCarrito.addEventListener("click", comprarCarritoClick);

function comprarCarritoClick(){
    let carritoTotalActualizado = totalDeCarrito();

    Swal.fire({
        title: "¡Gracias por su compra! ",
        icon: "success",
        html:`
        <div>
            <p style="font-family: 'Quicksand', sans-serif;">Valor total de la compra: $${carritoTotalActualizado} USD</p>
        </div>
        `,
        customClass: {
            title: `alert__font`
        },
        confirmButtonText: 'Aceptar'
    });

}


//Boton de borrar carrito👇
borrarCarrito.addEventListener("click", borrarCarritoClick);
function borrarCarritoClick(){
    carritoNuevo.length = 0;
    localStorage.setItem("clave-carrito", JSON.stringify(carritoNuevo));

    agregarProductosSeccionCarrito();

    Swal.fire({
        title: "Carrito completo eliminado",
        icon: "error",
        customClass: {
            title: `alert__font`
        },
        confirmButtonText: 'Aceptar'
    });
}


//Actualizar valor total de carrito👇
function totalDeCarrito(){
    let carritoTotalActualizado = carritoNuevo.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0);

    compraTotal.innerText = carritoTotalActualizado;

    return carritoTotalActualizado;
}