/*Variables declaradas👇*/

let productos = [];

fetch("../data.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })
  
const contenedorProductos = document.querySelector("#contenedor-productos"); 

const botonesSecciones = document.querySelectorAll(".boton__categoria");

let agregarCarrito = document.querySelector(".agregar__carrito");

let numeroCarrito = document.querySelector("#numero-carrito");

let carrito = [];

let nuevoContadorCarrito = 0;

const form = document.querySelector("#form");

const formInput = document.querySelector("#form-input");


/*Empieza el algoritmo👇*/


//Cargar los productos👇
function cargarProductos(productosElegidos) { //Se crea la funcion cargarproductos, donde aca se cargan los elementos html y luego se proporcionan los eventos.

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("cajas__productos")
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="productos__img">
            <h2 class="cajas__productos__titulo">${producto.nombre}</h2>
            <p class="cajas__productos__parrafo">
            <a href="" class="cajas__productos__button">$${producto.precio} USD</a>
            <p class="cajas__productos__parrafo__descripcion">  </p>
            </p>
            <div class="div__productos-agregar"> <button class="agregar__carrito" id="${producto.id}">Agregar carrito</button> </div>
        `

        contenedorProductos.append(div);
    })

    renovarAgregarCarrito() 
}


//Botenes de secciones productos👇
botonesSecciones.forEach(boton => {
    boton.addEventListener("click", (e) => {

        if(e.currentTarget.id != "todos__los__productos"){ //Si e.currentTarget.id al hacer "click" es diferente a "todos__los__productos", es porque NO se clickeo la opcion "todos los productos" 
            const seccionProductos = productos.filter(producto => producto.categoria.id === e.currentTarget.id); //e.currentTarget.id esto nos trae el id del elementos html que seria de la seccion correspondiente
            cargarProductos(seccionProductos);
        }else{
            cargarProductos(productos); // De esta forma al poner (productos como parametro), se cargan TODOS los productos de la tienda.
        }
    })
})


//Agregas los productos al carrito👇
function renovarAgregarCarrito(){

    agregarCarrito = document.querySelectorAll(".agregar__carrito");

    agregarCarrito.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

function agregarAlCarrito(e){
    let IdDelProducto = e.currentTarget.id
    const productoAgregado = productos.find(producto => producto.id === IdDelProducto); 
    
    if(carrito.some(producto => producto.id === IdDelProducto)){
        const index = carrito.findIndex(producto => producto.id === IdDelProducto);
        carrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        carrito.push(productoAgregado);
    }

    Swal.fire({
        
        title: "Producto agregado al carrito",
        html:`
        <div>
            <img src="${productoAgregado.imagen}" style="max-width: 50%;">
            <p style="font-family: 'Quicksand', sans-serif;">${productoAgregado.nombre}</p>
            <p style="font-family: 'Quicksand', sans-serif;">Precio: $${productoAgregado.precio} USD</p>
        </div>
        `,
        icon: "success",
        customClass: {
            title: `alert__font`,
        },
        confirmButtonText: 'Aceptar'

    });

    numeroDelCarrito ()

    localStorage.setItem("clave-carrito", JSON.stringify(carrito));
}


//Actualizacion de numero del carrito en tienda👇
function numeroDelCarrito (){
    let numeroActualizado = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0)
    numeroCarrito.innerText = numeroActualizado;
}


//Barra de busqueda de productos👇
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valorInput = formInput.value.toLowerCase();

    let productosEncontrados = productos.filter(producto => producto.nombre.toLowerCase().startsWith(valorInput));

    if (productosEncontrados.length > 0) {
        cargarProductos(productosEncontrados); // Mostrar solo los productos encontrados
    } else {
        contenedorProductos.innerHTML = ` <p style="font-family: 'Quicksand', sans-serif; font-size: 1.40rem;"> No se encontraron los productos... </p> `; // Mostrar un mensaje de "No se encontraron productos"
    }
});
