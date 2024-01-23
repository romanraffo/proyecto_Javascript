const productos = [
    { id: "Playstation", nombre: "Playstation 5", precio: 1000, imagen: "../img/ps5.webp"},
    { id: "Xbox", nombre: "Xbox S", precio: 850, imagen: "../img/xbox-s.png"},
    { id: "Computadora", nombre: "Computadora", precio: 750, imagen: "../img/computadora.png"},
];
  
const contenedorProductos = document.querySelector("#contenedor-productos"); //Se llaman a los contenedores principales segun su id.
const contenedorCarrito = document.querySelector("#carrito"); //Se llaman a los contenedores principales segun su id.
const contenedorValorCarrito = document.querySelector("#valorCarrito"); //Se llaman a los contenedores principales segun su id.
const carrito = obtenerCarritoPersistente(); // Cargar el carrito desde localStorage al iniciar
//const carrito = []; Remplazo carrito vacio por: const carrito = obtenerCarritoPersistente(); para dejar guardados los productos anteriormente seleccionados

function cargarProductos() { //Se crea la funcion cargarproductos, donde aca se cargan los elementos html y luego se proporcionan los eventos.

    productos.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("cajas__productos")
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="productos__img">
            <h2 class="cajas__productos__titulo">${producto.nombre}</h2>
            <p class="cajas__productos__parrafo"><a href="" class="cajas__productos__button">Valor: $${producto.precio}</a></p>
            <button class="producto-agregar" id="${producto.id}">Agregar carrito</button>
        `

        contenedorProductos.append(div);

        const botonAgregar = div.querySelector(".producto-agregar"); //Tiene que ser "div.querySelector" para que tome a los 3 productos. y no document.quary...
        botonAgregar.addEventListener("click", () => agregarAlCarrito(producto));
    })
}

function agregarAlCarrito(producto) { //A agregarAlcarrito se le suman los otros function para que al utilizar el evento "click" todos se activen a la vez.
    carrito.push(producto);
    guardarCarritoPersistente(); // Se guarda el carrito en localStorage después de cada cambio
    mostrarCarrito();
    valorCarrito();
}

function mostrarCarrito() { // En mostrarCarrito se muestran por pantalla los productos seleccionados por el boton y el evento "click"
    contenedorCarrito.innerHTML = "";
    carrito.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("carrito__class")
        div.innerHTML = `
            <p>${producto.nombre} - $${producto.precio}</p>
        `;
        contenedorCarrito.append(div);
    });
}

function valorCarrito(){ // Se calcula el valor total de carrito, mostrandolo debajo de los productos seleccionados.
    // Calcula el total del carrito
    let total = carrito.reduce((acum, item) => acum + item.precio, 0);
    
    // Verifica si ya existe un elemento para el valor del carrito
    let valorCarritoElement = document.querySelector(".valor__carrito");
    
    if (!valorCarritoElement) {
        // Esto si no existe, crea un nuevo elemento
        valorCarritoElement = document.createElement("div");
        valorCarritoElement.classList.add("valor__carrito");
        contenedorValorCarrito.append(valorCarritoElement);
    }
    
    // Actualiza el contenido del elemento con el nuevo total
    valorCarritoElement.innerHTML = `Valor carrito: $${total}`;
};

function guardarCarritoPersistente() {
    localStorage.setItem("carrito", JSON.stringify(carrito)); // JSON.stringify(carrito) lo que hace como "valor" convierte al array "carrito" en cadena de texto para almacenarla en el storage
}

function obtenerCarritoPersistente() {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}


const botonBorrarCarrito = document.querySelector("#borrarCarrito"); //Borrar carrito boton
botonBorrarCarrito.addEventListener("click", borrarCarrito); //Evento borrar carrito

function borrarCarrito() {
    carrito.splice(0, carrito.length)
    guardarCarritoPersistente();
    mostrarCarrito(); //Se debe poner mostrarCarrito, ya que al eliminar los productos se debe poner este para que por pantalla no aparezaca ninguno.
    valorCarrito(); //Se debe poner valorCarrito para actualizar el valor a $0.

    Swal.fire({
        title: "Elementos de carrito eliminados.",
        icon: "error"
      });
};

cargarProductos(); //Cargando solo la funcion "cargarProductos()" se cargan todos los function ya que estan conectados todos entre si.

