//Variables y constantes del juego
const palabrasArray = ["Gato", "Maravilloso", "Caramelo", "Oceano", "Sol", "Espacio", "Programar", "Eclipse", "Chocolate", "Bosque", "Perro", "Gemelo", "Mar", "Tomate", "Teclado", "Amigable", "Hogar", "Marca", "Computador", "Paisaje", "Pendiente", "Comida", "Amigo", "Estudiante", "Viaje"];
let contadorPalabrasCorrectas = 0;
let nivel = 1;
let tiempoBase = parseInt(sessionStorage.getItem('tiempoBase'));// Obtiene el tiempo base
let tiempoMinimo = 2000;
let vidas = parseInt(sessionStorage.getItem('vidas'));// Obtiene las vidas iniciales

const nivelContadorSpan = document.getElementById('contarNivel');
const vidasContadorSpan = document.getElementById('contarVidas');
const palabraUsuario = document.getElementById('usuarioInput');

const actualizarVisualizacion = () =>{
    nivelContadorSpan.textContent = nivel;
    vidasContadorSpan.textContent = vidas;
}

const palabraRandom = () => {
    palabras = palabrasArray[Math.floor(Math.random()*palabrasArray.length)];
    document.getElementById('palabra').textContent = palabras;
}

const empezarJuegoSeleccion = () =>{
    const seleccionado = document.getElementById('baseTiempo').value;
    const seleccionVidas = document.getElementById('vidasBase').value;
    sessionStorage.setItem('tiempoBase', seleccionado);// Guarda el tiempo base seleccionado en el almacenamiento de sesión
    sessionStorage.setItem('vidas', seleccionVidas);
    location.href = "juego.html";
}

const inicio = () => {
    palabraRandom();
    validarPalabra();
    let tiempoRestante = tiempoBase/1000;
    document.getElementById('contarTiempoRestante').textContent = tiempoRestante;
    intervaloJuego = setInterval(() => {
        document.getElementById('contarTiempoRestante').textContent = --tiempoRestante; // Decrementa el valor en 1 del tiempo antes de que se evalúe ña expresión
        if (tiempoRestante === 0) {
            clearInterval(intervaloJuego);
            checkCondicionFinal();
        }
    }, 1000);
}

const validarPalabra = () => {
    if (palabraUsuario.value.toLocaleLowerCase() === palabras.toLowerCase()) {
        document.getElementById('usuarioInput').value = ""; // Limpiar la entrada
        document.getElementById('instruccion').textContent = '';
        clearTimeout(intervaloJuego);
        contadorPalabrasCorrectas++;
        document.getElementById('contarPalabrasCorrectas').textContent = contadorPalabrasCorrectas;
        subirNivel();
    } else {
        console.log("Incorrecto");
    }
}

const subirNivel = () => {
    document.getElementById('resultado').textContent = '';
    if (contadorPalabrasCorrectas % 5 === 0) { // Si el contador de palabras correctas es múltiplo de 5
        nivel++; // Incrementa primero el nivel
        if (tiempoBase > tiempoMinimo) {
            tiempoBase = Math.max(tiempoMinimo, tiempoBase - 1000);
        }
        actualizarVisualizacion();
        inicio();
    }else {
        inicio();
    }
}

const checkCondicionFinal = () => {
    vidas--;
    actualizarVisualizacion();
    if (vidas === 0) {
        finJuego();
    } else {
        document.getElementById('resultado').textContent = "¡Incorrecto! ¡Intenta de nuevo!";
        document.getElementById('usuarioInput').value = ""; // Limpiar la entrada
        inicio();
    }
}

const finJuego = () => {
    document.getElementById('palabra').textContent = '';
    document.getElementById('usuarioInput').value = '';
    document.getElementById('usuarioInput').disabled = true;
    document.getElementById('resultado').textContent = "¡Juego terminado! Has alcanzado el nivel " + nivel + " con " + contadorPalabrasCorrectas + " palabras correctas";
}

const reiniciarJuego = () => {
    clearInterval(intervaloJuego);
    contadorPalabrasCorrectas = 0;
    nivel = 1;
    tiempoBase = parseInt(sessionStorage.getItem('tiempoBase'));
    vidas = parseInt(sessionStorage.getItem('vidas'));
    palabraUsuario.disabled = false;
    document.getElementById('resultado').textContent = '';
    actualizarVisualizacion();
    inicio();
}

actualizarVisualizacion();
inicio();
palabraUsuario.addEventListener('input', validarPalabra);