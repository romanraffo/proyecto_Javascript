// 2da Pre-entrega JavaScript //

function bienvenida(nombre) {
    while(nombre === null || nombre === "") {
        alert("Sería genial saber tu nombre. ¡Gracias!");
        nombre = prompt("¿Cuál es tu nombre?");
    }
    return nombre; 
}

let nombre = prompt("¡Hola!, ¿Cuál es tu nombre?");
nombre = bienvenida(nombre); 

alert("Hola " + nombre + ", te damos la bienvenida a Gaming-tech.");

const productos = [
    {nombre: "Playstation 5", precio: 1000},
    {nombre: "Xbox S", precio: 850},
    {nombre: "Computadora", precio: 750}
];

alert ("Estos son nuestros productos disponibles.🎮 ");

productos.forEach((producto) => {
    alert("Producto: " + producto.nombre + ". Precio: $" + producto.precio + ".");
})



const carrito = [];
let continuar = "si";

while (continuar === "si" || continuar === "Si") {
    let productoElegido = prompt("¿Qué producto te gustaría comprar " + nombre + "?");
    let elegido = productos.find((producto) => producto.nombre.toLowerCase() === productoElegido.toLowerCase()); //toLowerCase es un método en JavaScript que se utiliza para convertir una cadena de texto a minúsculas.

    if (elegido != "" && elegido !== undefined) {
        carrito.push(elegido);
        alert(`"${elegido.nombre}" ha sido agregado al carrito.`);
    } else {
        alert(`"${elegido.nombre}" no está disponible en la tienda.`);
    }

    continuar = prompt("¿Deseas continuar la compra? (si o no)");
}

let total = carrito.reduce((acum, item) => acum + item.precio, 0);

alert("El valor de su compra " + nombre + ", es de $" + total + ". Gracias por su compra!");



let baja = [1, 2, 3, 4];
let media = [5, 6, 7];
let alta = [8, 9, 10];

let puntaje = Number(prompt("¿Que calificacion del 1 a 10 le das al mecanismo de compra?"))

if ( baja.includes(puntaje)) {
    alert("Tu calificacion fue baja 😔, esperamos que puedas tener proximamente una mejor experiencia.");
} else if(media.includes(puntaje)) {
    alert("Tu calificacion fue media 🙂, trataremos que proximamente estes aun más comodo.");
} else if (alta.includes(puntaje)) {
    alert("Tu calificacion fue buena 😁, esperemos seguir con este buen servicio.");
}else{
    alert("Valor no válido.");
}

// Página estilo e-commerce con "carrito".

// 2da Pre-entrega con mecanismo de busqueda con FIND en productos(estos dentro de array separado por objetos), y mecanismo con REDUCE para contalibilizar en un array aparte vacio, el total de la compra.
