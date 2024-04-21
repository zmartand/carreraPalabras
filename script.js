const palabrasArray = ["gato", "maravilloso", "javascript", "oceano", "sol", "espacio", "programar"];
//let palabraUsuario = '';
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
    let tiempoRest = tiempoBase/1000;
    document.getElementById('contarTiempoRestante').textContent = tiempoRest;
    intervaloJuego = setInterval(() => {
        document.getElementById('contarTiempoRestante').textContent = --tiempoRest; // Actualizamos el elemento HTML
        if (tiempoRest <= 0) {
            clearInterval(intervaloJuego);
            checkCondicionFinal();
        }
    }, 1000);

}

const validarPalabra = () => {
        if (palabraUsuario.value.trim().toLocaleLowerCase() === palabras.toLowerCase()) {
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
            //tiempoBase = Math.max(tiempoMinimo, tiempoBase - (nivel - 1)* 1000);
            tiempoBase = Math.max(tiempoMinimo, tiempoBase - 1000);
        }
        actualizarVisualizacion();
        inicio();
    }else {
    palabraRandom();
    inicio();
    }
}

const checkCondicionFinal = () => {
    vidas--;
    actualizarVisualizacion();
    clearInterval(intervaloJuego);
    if (vidas === 0) {
        finJuego();
    } else {
        document.getElementById('resultado').textContent = "¡Incorrecto! ¡Intenta de nuevo!";
        document.getElementById('usuarioInput').value = ""; // Limpiar la entrada
        palabraRandom();
        inicio();
    }
}

const finJuego = () => {
    document.getElementById('palabra').textContent = '';
    document.getElementById('usuarioInput').value = '';
    document.getElementById('usuarioInput').disabled = true;
    document.getElementById('resultado').textContent = "¡Juego terminado! Has alcanzado el nivel " + nivel;
}


actualizarVisualizacion();
inicio();
palabraUsuario.addEventListener('input', validarPalabra);