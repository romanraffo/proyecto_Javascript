let carritoNuevo = localStorage.getItem("clave-carrito");
carritoNuevo = JSON.parse(carritoNuevo)

const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#contenedor-productos-carrito");
const carritoElementos = document.querySelector("#carrito-elementos");
let borrarProducto = document.querySelectorAll(".borrar__producto__carrito");

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
    
        });
    
    }else{
        carritoVacio.classList.remove("desactivado");
        carritoProductos.classList.add("desactivado");
        carritoElementos.classList.add("desactivado");
    }

    renovarEliminarCarrito();
}
agregarProductosSeccionCarrito();


function renovarEliminarCarrito(){

    borrarProducto = document.querySelectorAll(".remove__carrito");

    borrarProducto.forEach(boton => {
        boton.addEventListener("click", borrarProductoCarrito);
    })
}

function borrarProductoCarrito(e){
    let idBoton = e.currentTarget.id;
    const index = carritoNuevo.findIndex(producto => producto.id === idBoton);
    if (index !== -1) {
        carritoNuevo.splice(index, 1);
        Swal.fire({
            title: "Producto eliminado",
            icon: "error"
        });
        // Aca se actualiza el almacenamiento local después de eliminar un producto del carrito
        localStorage.setItem("clave-carrito", JSON.stringify(carritoNuevo));
        // Y despues se actualiza la representación visual del carrito
        agregarProductosSeccionCarrito();
    } else {
        console.error("Producto no encontrado en el carrito.");
    }
}
