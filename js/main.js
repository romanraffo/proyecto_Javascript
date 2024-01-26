const productos = [
    {id: "consola-01", nombre: "Playstation 5", precio: 500, imagen: "../img/play5.webp", categoria:{nombre: "Consolas", id: "Consolas"}},
    {id: "consola-02", nombre: "Xbox S", precio: 290, imagen: "../img/xboxS.png", categoria:{nombre: "Consolas", id: "Consolas"}},
    {id: "consola-03", nombre: "Nintendo Switch", precio: 215, imagen: "../img/Nintendo.Switch.webp", categoria:{nombre: "Consolas", id: "Consolas"}},
    {id: "consola-04", nombre: "Playstation 4", precio: 310, imagen: "../img/play4.webp", categoria:{nombre: "Consolas", id: "Consolas"}},
    {id: "Computadora-01", nombre: "Pc Gamer Ryzen", precio: 540, imagen: "../img/pc.ryzen.png", categoria:{nombre: "Computadoras", id: "Computadoras"}},
    {id: "Computadora-02", nombre: "Pc Gamer Intel", precio: 699, imagen: "../img/pc.intel.png", categoria:{nombre: "Computadoras", id: "Computadoras"}},
    {id: "Notebook-01", nombre: "Notebook BANGHO Max", precio: 500, imagen: "../img/notebook.bangho.jpg", categoria:{nombre: "Notebooks", id: "Notebooks"}},
    {id: "Notebook-02", nombre: "Notebook LENOVO", precio: 300, imagen: "../img/notebook.lenovo.jpg", categoria:{nombre: "Notebooks", id: "Notebooks"}},
    {id: "Notebook-03", nombre: "Notebook HP 15.6", precio: 550, imagen: "../img/notebook.Hp.jpg", categoria:{nombre: "Notebooks", id: "Notebooks"}},
    {id: "Mouse-01", nombre: "Mouse Logitech G502", precio: 40, imagen: "../img/mouse.logi.png", categoria:{nombre: "Mouses", id: "Mouses"}},
    {id: "Mouse-02", nombre: "Mouse Logitech G300S", precio: 34, imagen: "../img/mouse.logi2.png", categoria:{nombre: "Mouses", id: "Mouses"}},
    {id: "Mouse-03", nombre: "Mouse Redragon", precio: 40, imagen: "../img/mouse.redragon.png", categoria:{nombre: "Mouses", id: "Mouses"}},
    {id: "Auricular-01", nombre: "Auriculares Philips", precio: 100, imagen: "../img/auriculares.philips.webp", categoria:{nombre: "Auriculares", id: "Auriculares"}},
    {id: "Auricular-02", nombre: "Airpods Max Apple", precio: 350, imagen: "../img/auriculares.apple.webp", categoria:{nombre: "Auriculares", id: "Auriculares"}},
    {id: "Auricular-03", nombre: "Auriculares Hyperex", precio: 40, imagen: "../img/auriculares.Hyperex.png", categoria:{nombre: "Auriculares", id: "Auriculares"}},
    {id: "Control-01", nombre: "Joystick Ps5", precio: 60, imagen: "../img/joystick.ps5.png", categoria:{nombre: "Controles", id: "Controles"}},
    {id: "Control-02", nombre: "Joystick Xbox-S", precio: 55, imagen: "../img/joystick.xbox.jpg", categoria:{nombre: "Controles", id: "Controles"}},

];
  
const contenedorProductos = document.querySelector("#contenedor-productos"); //Se llaman a los contenedores principales segun su id.
const contenedorCarrito = document.querySelector("#carrito"); //Se llaman a los contenedores principales segun su id.
const contenedorValorCarrito = document.querySelector("#valorCarrito"); //Se llaman a los contenedores principales segun su id.
const carrito = [];
//const carrito = []; Remplazo carrito vacio por: const carrito = obtenerCarritoPersistente(); para dejar guardados los productos anteriormente seleccionados

function cargarProductos() { //Se crea la funcion cargarproductos, donde aca se cargan los elementos html y luego se proporcionan los eventos.

    productos.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("cajas__productos")
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="productos__img">
            <h2 class="cajas__productos__titulo">${producto.nombre}</h2>
            <p class="cajas__productos__parrafo">
            <a href="" class="cajas__productos__button">$${producto.precio} USD</a>
            <p class="cajas__productos__parrafo__descripcion">  </p>
            </p>
            <div class="div__productos-agregar"> <button class="producto-agregar" id="${producto.id}">Agregar carrito</button> </div>
        `

        contenedorProductos.append(div);

        // const botonAgregar = div.querySelector(".producto-agregar"); //Tiene que ser "div.querySelector" para que tome a los 3 productos. y no document.quary...
        // botonAgregar.addEventListener("click", () => agregarAlCarrito(producto));
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
