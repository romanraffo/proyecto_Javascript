const productos = [
    {id: "consola-01", nombre: "Playstation 5", precio: 500, imagen: "../img/play5.webp", categoria:{nombre: "Consolas", id: "consolas"}},
    {id: "consola-02", nombre: "Xbox S", precio: 290, imagen: "../img/xboxS.png", categoria:{nombre: "Consolas", id: "consolas"}},
    {id: "consola-03", nombre: "Nintendo Switch", precio: 215, imagen: "../img/Nintendo.Switch.webp", categoria:{nombre: "Consolas", id: "consolas"}},
    {id: "consola-04", nombre: "Playstation 4", precio: 310, imagen: "../img/play4.webp", categoria:{nombre: "Consolas", id: "consolas"}},
    {id: "Computadora-01", nombre: "Pc Gamer Ryzen", precio: 540, imagen: "../img/pc.ryzen.png", categoria:{nombre: "Computadoras", id: "computadoras"}},
    {id: "Computadora-02", nombre: "Pc Gamer Intel", precio: 699, imagen: "../img/pc.intel.png", categoria:{nombre: "Computadoras", id: "computadoras"}},
    {id: "Notebook-01", nombre: "Notebook BANGHO Max", precio: 500, imagen: "../img/notebook.bangho.jpg", categoria:{nombre: "Notebooks", id: "computadoras"}},
    {id: "Notebook-02", nombre: "Notebook LENOVO", precio: 300, imagen: "../img/notebook.lenovo.jpg", categoria:{nombre: "Notebooks", id: "computadoras"}},
    {id: "Notebook-03", nombre: "Notebook HP 15.6", precio: 550, imagen: "../img/notebook.Hp.jpg", categoria:{nombre: "Notebooks", id: "computadoras"}},
    {id: "Mouse-01", nombre: "Mouse Logitech G502", precio: 40, imagen: "../img/mouse.logi.png", categoria:{nombre: "Mouses", id: "perifericos"}},
    {id: "Mouse-02", nombre: "Mouse Logitech G300S", precio: 34, imagen: "../img/mouse.logi2.png", categoria:{nombre: "Mouses", id: "perifericos"}},
    {id: "Mouse-03", nombre: "Mouse Redragon", precio: 40, imagen: "../img/mouse.redragon.png", categoria:{nombre: "Mouses", id: "perifericos"}},
    {id: "Auricular-01", nombre: "Auriculares Philips", precio: 100, imagen: "../img/auriculares.philips.webp", categoria:{nombre: "Auriculares", id: "perifericos"}},
    {id: "Auricular-02", nombre: "Airpods Max Apple", precio: 350, imagen: "../img/auriculares.apple.webp", categoria:{nombre: "Auriculares", id: "perifericos"}},
    {id: "Auricular-03", nombre: "Auriculares Hyperex", precio: 40, imagen: "../img/auriculares.Hyperex.png", categoria:{nombre: "Auriculares", id: "perifericos"}},
    {id: "Control-01", nombre: "Joystick Ps5", precio: 60, imagen: "../img/joystick.ps5.png", categoria:{nombre: "Controles", id: "perifericos"}},
    {id: "Control-02", nombre: "Joystick Xbox-S", precio: 55, imagen: "../img/joystick.xbox.jpg", categoria:{nombre: "Controles", id: "perifericos"}},

];


  
const contenedorProductos = document.querySelector("#contenedor-productos"); //Se llaman a los contenedores principales segun su id.

const botonesSecciones = document.querySelectorAll(".boton__categoria");

let agregarCarrito = document.querySelector(".agregar__carrito");

let numeroCarrito = document.querySelector("#numero-carrito");

let carrito = [];

let nuevoContadorCarrito = 0;



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

cargarProductos(productos)
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
        icon: "success"
    });

    numeroDelCarrito ()

    localStorage.setItem("clave-carrito", JSON.stringify(carrito));
}

function numeroDelCarrito (){
    let numeroActualizado = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0)
    numeroCarrito.innerText = numeroActualizado;
}

