
//DEFINICION DE CONSTANTES
const precioEntrada = 700;  //precio unico para todas las entradas
const recargoCompraWeb = 1.10;  //recargo del 10% por comprar entradas por la web

//DEFINICION DE VARIABLES GLOBALES
//variables para el manejo de datos tipo DATE
let miFecha;
let dia;
let mes;
let año;
let hora;
let minutos;

//variables de control
let seguirComprando = true;  //variable de control para seguir comprando
let opcionValida = true;
let existe = false;

//resto variables globales
let nombreCiudadElegida = "";
let nombrePeliculaElegida = "";
let sFecha = "";
let sHora = "";
let cantidadEntradas = 0;
let nuevaEntradaVendida;
let entradaExistente;

//variables con los totales
let totalCarritoEntradas = 0;
let cantEntradasVendidas = 0;

//DEFINICIÓN DE CLASES
class Pelicula {
    constructor(nombre, genero, calificacion, sinopsis,) {
        this.nombre = nombre;
        this.genero = genero;
        this.calificacion = calificacion;
        this.sinopsis = sinopsis;
    }
}

class Entrada {
    constructor(nombrePelicula, ciudad, fecha, hora, cantidad) {
        this.nombrePelicula = nombrePelicula;
        this.ciudad = ciudad;
        this.fecha = fecha;
        this.hora = hora;
        this.cantidad = cantidad;
        this.precio = precioEntrada * this.cantidad;
    }

}

//DEFINICIÓN DE ARREGLOS DE OBJETOS
const peliculasEnCartel = [];
const pelicula1 = new Pelicula('ELEMENTOS', 'Animación', 'Apta para todo público', 'Elemental, de Disney y Pixar, es un nuevo largometraje original ambientado en Elemental City, donde conviven habitantes de fuego, agua, tierra y aire. La protagonista de la historia es Ember, una joven fuerte, ingeniosa y con carácter, cuya amistad con un chico divertido, sensible y tranquilo, llamado Wade, cambia su perspectiva sobre el mundo en el que viven.');
const pelicula2 = new Pelicula('FLASH', 'Acción', 'Apta para mayores de 13 años', 'Los mundos chocan en "Flash" cuando Barry usa sus superpoderes para viajar en el tiempo y cambiar los eventos del pasado. Pero cuando su intento de salvar a su familia altera el futuro sin darse cuenta, Barry queda atrapado en una realidad en la que el general Zod ha regresado, amenazando con la aniquilación, y no hay superhéroes a los que recurrir.');
const pelicula3 = new Pelicula('TRANSFORMERS: EL DESPERTAR DE LAS BESTIAS', 'Acción', 'Apta para mayores de 13 años', 'Vuelven la acción y el espectáculo que han cautivado a los cinéfilos de todo el mundo, #Transformers: El despertar de las bestias llevará al público a una aventura alrededor del mundo en los 90 con los Autobots en introducirá a una nueva generación de Transformers, los Maximals, a la batalla existente en la tierra entre Autobots y Decepticons.');
const pelicula4 = new Pelicula('BOOGEYMAN: TU MIEDO ES REAL', 'Terror', 'Apta para mayores de 13 añoBOOGEYMAN: TU MIEDO ES REAL es un clásico del cine de terror al estilo de “Poltergeist”, que asusta y muestra un costado más humano en igual medidas.', '');
const pelicula5 = new Pelicula('SPIDER-MAN: A TRAVÉS DEL SPIDER-VERSO', 'Animación', 'Apta para mayores de 13 años', 'Miles Morales regresa para el siguiente capítulo de la saga Spider-Verse, ganadora de un Oscar®, una aventura épica que transportará al simpático Spider-Man de Brooklyn a tiempo completo a través del Multiverso para unir fuerzas con Gwen Stacy y un nuevo equipo de Spider-People para enfrentarse a un villano más poderoso que cualquier cosa que hayan encontrado.');
const pelicula6 = new Pelicula('RAPIDOS Y FURIOSOS X', 'Acción', 'Apta para mayores de 13 años con reservas', 'Comienza el final del camino. Rápidos y furiosos X, la décima película de la saga Rápidos y furiosos, es el capítulo final de una de las franquicias más populares y queridas del cine, ahora en su tercera década y continuando con el mismo elenco y personajes que cuando comenzó.');

peliculasEnCartel.push(pelicula1);
peliculasEnCartel.push(pelicula2);
peliculasEnCartel.push(pelicula3);
peliculasEnCartel.push(pelicula4);
peliculasEnCartel.push(pelicula5);
peliculasEnCartel.push(pelicula6);

const entradasVendidas = [];

//DEFINICION DE FUNCIONES

//DETERMINA SI UN VALOR PASADO COMO PARÁMETRO ES UN ENTERO VÁLIDO
function esEnteroPositivo(valor) {
    return (!isNaN(valor) || (valor < 0));
}

//RETORNA EL COMPLEJO DE CINE SELECCIONADO POR EL USUARIO
function seleccionarComplejo() {
    //selección del complejo donde comprar las entradas
    let continuar = true;
    let ciudadElegida;

    do {
        alert('Selecciona tu ciudad' + '\n' +
            '1 - Complejo Recoleta' + '\n' +
            '2 - Complejo Pilar' + '\n' +
            '3 - Complejo Mar del Plata' + '\n' +
            '4 - Complejo La Plata' + '\n' +
            '5 - Complejo Mendoza' + '\n' +
            '6 - Complejo Rosario' + '\n' +
            '7 - Complejo Bahía Blanca');
        ciudadElegida = parseInt(prompt("Selecciona tu ciudad:"));
        if ((!isNaN(ciudadElegida)) && ((ciudadElegida >= 1 && ciudadElegida <= 7)))
            continuar = false;
        else
            alert("Ingresó una opción inválida.")
    } while (continuar);

    switch (ciudadElegida) {
        case 1:
            nombreCiudadElegida = "Complejo Recoleta";
            break;
        case 2:
            nombreCiudadElegida = "Complejo Pilar";
            break;
        case 3:
            nombreCiudadElegida = "Complejo Mar del Plata";
            break;
        case 4:
            nombreCiudadElegida = "Complejo La Plata";
            break;
        case 5:
            nombreCiudadElegida = "Complejo Mendoza";
            break;
        case 6:
            nombreCiudadElegida = "Complejo Rosario";
            break;
        case 7:
            nombreCiudadElegida = "Complejo Bahía Blanca";
            break;
    }
    return nombreCiudadElegida;
}

//RETORNA EL NOMBRE DE LA PELICULA SELECCIONADO POR EL USUARIO
function GetPeliculaElegida() {
    let peliculaElegida = -1;

    do {
        peliculaElegida = parseInt(prompt("Seleccione la película de su interés." + "\n" + listaStringPeliculas.join('\n')));
        if (isNaN(peliculaElegida) || peliculaElegida <= 0 || peliculaElegida > peliculasEnCartel.length)
            opcionValida = false;
        else
            opcionValida = true;
    } while (!opcionValida)

    let nombrePelicula = "";
    switch (peliculaElegida) {
        case 1:
            nombrePelicula = "ELEMENTOS";
            break;
        case 2:
            nombrePelicula = "FLASH";
            break;
        case 3:
            nombrePelicula = "TRANSFORMERS: EL DESPERTAR DE LAS BESTIAS";
            break;
        case 4:
            nombrePelicula = "BOOGEYMAN: TU MIEDO ES REAL";
            break;
        case 5:
            nombrePelicula = "SPIDER-MAN: A TRAVÉS DEL SPIDER-VERSO";
            break;
        case 6:
            nombrePelicula = "RAPIDOS Y FURIOSOS X";
            break;
    }
    return nombrePelicula;
}

//RETORNA LA CANTIDAD DE ENTRADAS ADQUIRIDAS POR EL USUARIO
function GetCantidadEntradas() {
    let cantidad = 0;
    cantidad = parseInt(prompt('Ingrese la cantidad de entradas que desea comprar: '));
    // Me aseguro que ingrese un valor numerico
    while (!esEnteroPositivo(cantidad)) {
        cantidad = parseInt(prompt('La cantidad ingresada no es correcta. Ingrese nuevamente la cantidad de entradas que desea comprar'));
    }
    return cantidad;
}

//PREGUNTA AL USUARIO SI DESEA CONTINUAR COMPRANDO ENTRADAS, RETORNA VERDADERO EN CASO DE QUE DESEE CONTINUAR COMPRANDO
function interrogoSiContinuoComprando() {
    let respuesta;
    let continuar = true;
    do {
        respuesta = prompt("Desea seguir comprando entradas S/N");
        if (respuesta == "S" || respuesta == "N" || respuesta == "s" || respuesta == "n")
            continuar = false;
        else
            alert("Ingrese S/N")
    } while (continuar);
    if (respuesta == "S" || respuesta == "s")
        return true;
    else // (respuesta == "N")
        return false;
}

function aplicarRecargoACadaEntrada(arregloEntradas, funcion) {
    for (const entrada of arregloEntradas) {
        funcion(entrada)
    }
}


function calcularPrecioEntradaConRecargo(valor) {
    valor.precio = Math.ceil((precioEntrada * valor.cantidad) * recargoCompraWeb);
}

//MUESTRA EN PANTALLA UN RESUMEN DEL TOTAL DE ENTRADAS COMPRADAS DISCRIMINADAS POR PELÍCULA
function mostrarDetalleEntradasVendidas () {
    aplicarRecargoACadaEntrada(entradasVendidas, calcularPrecioEntradaConRecargo);

    let listaStringEntradasVendidas = entradasVendidas.map(
        (entrada, index) => `${index + 1}: Película: ${entrada.nombrePelicula} - Cantidad Entradas: ${entrada.cantidad} - Precio total: ${entrada.precio}`); 
        alert("Resumen de Entradas Compradas con Recargo por uso del servicio online\n" + listaStringEntradasVendidas.join('\n'));
}

//MAIN PROGRAM

//SALUDO INICIAL
let mensajeBienvenida = "Bienvenidos al Sitio \"Movie Tickets\" de CINEFANS, presione aceptar para comenzar.";
alert(mensajeBienvenida);

//ELIGO POR ÚNICA VEZ UN COMPLEJO DE CINE (ASOCIADO A UNA CIUDAD)
nombreCiudadElegida = seleccionarComplejo();

//CONSTRUYO UNA CONSTANTE CON EL LISTADO DE PELICULAS EN CARTEL
const listaStringPeliculas = peliculasEnCartel.map(
    (pelicula, index) => `${index + 1}: ${pelicula.nombre} - Genero: ${pelicula.genero}`);

do {
    
    //MUESTRA EL LISTADO DE PELICULAS EN CARTEL HASTA QUE EL CLIENTE ELIGA UNA OPCION VALIDA  
    nombrePeliculaElegida = GetPeliculaElegida();

    //LE SOLICITO LA CANTIDAD DE ENTRADAS QUE QUIERE COMPRAR
    cantidadEntradas = GetCantidadEntradas();
    
    //DETERMINO LA HORA Y FECHA DEL MOMENTO DE EFECTUADA LA COMPRA
    miFecha = new Date();
    dia = miFecha.getDate();
    mes = miFecha.getMonth() + 1;
    año = miFecha.getFullYear();
    hora = miFecha.getHours();
    minutos = miFecha.getMinutes();
    sFecha = `${dia}-${mes}-${año}`;
    sHora = `${hora}:${minutos}`;

    //VERIFICO SI EXISTEN ENTRADAS PARA LA PELICULA ELEGIDA
    //DE EXISTIR ACTUALIZA LA ENTRADA, CASO CONTRARIO CREA EL OBJETO Y LO INCORPORA AL ARREGLO
    existe = entradasVendidas.some(entrada => entrada.nombrePelicula === nombrePeliculaElegida);
    if (!existe) {
        nuevaEntradaVendida = new Entrada(nombrePeliculaElegida, nombreCiudadElegida, sFecha, sHora, cantidadEntradas);
        entradasVendidas.push(nuevaEntradaVendida);
    }
    else {
        entradaExistente = entradasVendidas.find(entrada => entrada.nombrePelicula === nombrePeliculaElegida);
        entradaExistente.cantidad = entradaExistente.cantidad + cantidadEntradas;
    }

    //CALCULO LOS TOTALES HASTA EL MOMENTO
    totalCarritoEntradas = entradasVendidas.reduce((acumulador, pelicula) => acumulador + pelicula.precio, 0);
    cantEntradasVendidas = cantEntradasVendidas + cantidadEntradas;

    //PREGUNTO SI QUIERE SEGUIR COMPRANDO
    seguirComprando = interrogoSiContinuoComprando();
    if (seguirComprando)
        alert('Ud. ha comprado hasta ahora ' + cantEntradasVendidas + ' entrada/s por un valor total de $' + totalCarritoEntradas);
    else
        alert('Ud. compró ' + cantEntradasVendidas + ' entrada/s por un valor final de $' + totalCarritoEntradas);

} while (seguirComprando);

mostrarDetalleEntradasVendidas();   
