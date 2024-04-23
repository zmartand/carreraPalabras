const palabrasArray = ["gato", "maravilloso", "caramelo", "oceano", "sol", "espacio", "programar", "eclipse", "chocolate", "bosque", "perro", "gemelo", "mar", "tomate", "teclado", "amigable", "hogar", "marca", "computador", "paisaje", "pendiente"];
let contadorPalabrasCorrectas = 0;
let nivel = 1;
let tiempoBase = 7000;
let tiempoMinimo = 2000;
let vidas = 3;

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
            clearTimeout(intervaloJuego);
            contadorPalabrasCorrectas++;
            document.getElementById('contarPalabrasCorrectas').textContent = contadorPalabrasCorrectas;
            subirNivel();
        } else {
            //console.log("Incorrecto");
        }
}

const subirNivel = () => {
    if (contadorPalabrasCorrectas % 2 === 0) {
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
    tiempoBase = 7000;
    vidas = 3;
    palabraUsuario.disabled = false;
    document.getElementById('resultado').textContent = '';
    actualizarVisualizacion();
    inicio();
}


actualizarVisualizacion();
inicio();
palabraUsuario.addEventListener('input', validarPalabra);