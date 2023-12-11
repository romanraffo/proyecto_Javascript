// 1er Pre-entrega JavaScript //

function bienvenida(nombre) {
    while(nombre === null || nombre === "") {
        alert("Sería genial saber tu nombre. ¡Gracias!");
        nombre = prompt("¿Cuál es tu nombre?");
    }
    return nombre; 
}

let nombre = prompt("¿Cuál es tu nombre?");
nombre = bienvenida(nombre); 

alert("Hola " + nombre + ", te damos la bienvenida a Gaming-tech.");

const play = 1000;

const xbox= 850;

const computadora = 750;

let continuar = "si";

let precio1 = 0;
let precio2 = 0;
let precio3 = 0;

while (continuar === "si" || continuar === "Si") {
    let producto = prompt("¿Cual producto te gustaria comprar?");

    switch (producto){
        case "Play 5":
            precio1 = play;
            break
        case "Xbox S":
            precio2 = xbox;
            break
        case "Computadora":
            precio3 = computadora;
            break
        default:
            alert ("Producto no encontrado");
    }
    continuar = prompt("¿Deseas continuar la compra? si o no.");
}

let valorDeCompra = precio1 + precio2 + precio3;

alert("El total a pagar es = " + valorDeCompra + " . Gracias " + nombre + " por su compra!");

let satisfecho = prompt("¿Estuviste comodo con tus compras? si o no.")

if (satisfecho === "si" || satisfecho === "Si") {
    alert("Nos pone felices que hayas estado comodo/a!")
}else {
    alert("Disculpas, espemos brindar un mejor servicio la proxima vez.")
}

//La idea de esta entrega es que al entrar y presentarte, puedas elegir si comprar 1 de las 3 mercaderias, o si queres, las 3 y luego salga el resultado de la suma de todos lo productos comprados(si es que es mas de 1).
