//Variables y constantes del juego
const palabrasArray = ["Gato", "Maravilloso", "Caramelo", "Oceano", "Sol", "Espacio", "Programar", "Eclipse", "Chocolate", "Bosque", "Perro", "Gemelo", "Mar", "Tomate", "Teclado", "Amigable", "Hogar", "Marca", "Computador", "Paisaje", "Pendiente", "Comida", "Amigo", "Estudiante", "Viaje"];
let contadorPalabrasCorrectas = 0;
let nivel = 1;
let tiempoBase = (sessionStorage.getItem('tiempoBase'));// Obtiene el tiempo base
let tiempoMinimo = 2000;
let vidas = (sessionStorage.getItem('vidas'));// Obtiene las vidas iniciales

const nivelContadorSpan = document.getElementById('contarNivel');
const vidasContadorSpan = document.getElementById('contarVidas');
const palabraUsuario = document.getElementById('usuarioInput');

//Funcion para actualizar el nivel y las vidas
const actualizarVisualizacion = () =>{
    nivelContadorSpan.textContent = nivel;
    vidasContadorSpan.textContent = vidas;
}
//Funcion para elegir una palabra random dentro del array "palabrasArray" y mostrarla por pantalla
const palabraRandom = () => {
    palabras = palabrasArray[Math.floor(Math.random()*palabrasArray.length)];
    document.getElementById('palabra').textContent = palabras;
}

//Empieza el juego con las vidas/nivel seleccionados o por defecto
const empezarJuegoSeleccion = () =>{
    const seleccionado = document.getElementById('baseTiempo').value;
    const seleccionVidas = document.getElementById('vidasBase').value;
    sessionStorage.setItem('tiempoBase', seleccionado);// Guarda el tiempo base seleccionado en el almacenamiento de sesión
    sessionStorage.setItem('vidas', seleccionVidas); //Idem vidas
    location.href = "juego.html"; //Redirige a la página de juego
}
//Lanzador del juego
const inicio = () => {
    palabraRandom(); // Selecciona una palabra random inicial
    validarPalabra(); // Valida la palabra
    let tiempoRestante = tiempoBase/1000; // Convierte el tiempo base en segundos
    document.getElementById('contarTiempoRestante').textContent = tiempoRestante; // Muestra el tiempo restante
    intervaloJuego = setInterval(() => { // Inicia intervalo de tiempo (tiempo cada palabra)
        document.getElementById('contarTiempoRestante').textContent = --tiempoRestante; // Decrementa el valor en 1 del tiempo antes de que se evalúe La expresión
        if (tiempoRestante === 0) { // Si el tiempo restante es igual a 0 se detiene el intervalo y se evalúa la condición final
            clearInterval(intervaloJuego);
            checkCondicionFinal();
        }
    }, 1000);
}
//Funcion para validar la palabra ingresada por el usuario con la palabra random seleccionada
const validarPalabra = () => {
    if (palabraUsuario.value.toLocaleLowerCase() === palabras.toLowerCase()) { //comparamos palabras, aceptamos minusculas y mayusculas
        document.getElementById('usuarioInput').value = ""; // Limpiar la entrada para que el usuario no tenga que borrar el texto
        document.getElementById('instruccion').textContent = ''; //Elimina la instruccion dinamica
        clearTimeout(intervaloJuego); // Limpia el intervalo de tiempo cuando acierta la palabra
        contadorPalabrasCorrectas++;
        document.getElementById('contarPalabrasCorrectas').textContent = contadorPalabrasCorrectas;
        subirNivel();
    } else {
        console.log("Incorrecto");
    }
}
//Funcion para subir de nivel
const subirNivel = () => {
    document.getElementById('resultado').textContent = '';
    if (contadorPalabrasCorrectas % 5 === 0) { // Si el contador de palabras correctas es múltiplo de 5
        nivel++; // Incrementa primero el nivel
        if (tiempoBase > tiempoMinimo) { // Si el tiempo base es mayor al tiempo mínimo (2 segundos) se decrementa en 1 segundo
            tiempoBase = Math.max(tiempoMinimo, tiempoBase - 1000);
        }
        actualizarVisualizacion();
        inicio();
    }else {
        inicio();
    }
}
//Funcion para verificar si el usuario ha perdido todas las vidas
const checkCondicionFinal = () => {
    vidas--; // Decrementa las vidas
    actualizarVisualizacion();
    if (vidas === 0) { // Si las vidas son iguales a 0 se termina el juego
        finJuego();
    } else { // Si no, continuamos jugando
        document.getElementById('resultado').textContent = "¡Incorrecto! ¡Intenta de nuevo!";
        document.getElementById('usuarioInput').value = ""; // Limpiar la entrada
        inicio();
    }
}
//Funcion para finalizar el juego
const finJuego = () => {
    document.getElementById('palabra').textContent = ''; // Limpia la palabra
    document.getElementById('usuarioInput').value = ''; // Limpia la entrada
    document.getElementById('usuarioInput').disabled = true; // Deshabilita la entrada
    document.getElementById('resultado').textContent = "¡Juego terminado! Has alcanzado el nivel " + nivel + " con " + contadorPalabrasCorrectas + " palabras correctas"; //Muestra resultados
}
//Funcion para reiniciar el juego
const reiniciarJuego = () => {
    clearInterval(intervaloJuego); // Limpia el intervalo de tiempo
    contadorPalabrasCorrectas = 0;
    nivel = 1;
    tiempoBase = (sessionStorage.getItem('tiempoBase')); // Obtiene el tiempo base seleccionado inicialmente
    vidas = (sessionStorage.getItem('vidas')); //Idem vidas
    palabraUsuario.disabled = false; // Habilita la entrada
    document.getElementById('resultado').textContent = ''; // Limpia el resultado
    actualizarVisualizacion();
    inicio();
}

actualizarVisualizacion();
inicio();
palabraUsuario.addEventListener('input', validarPalabra);