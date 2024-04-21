const palabrasArray = ["gato", "maravilloso", "javascript", "oceano", "sol", "espacio", "programar"];
let palabraUsuario = '';
let contadorPalabrasCorrectas = 0;
let contadorNivel = document.getElementById('contarNivel').textContent;


const inicio = () => {
    palabras = palabrasArray[Math.floor(Math.random()*palabrasArray.length)];
    document.getElementById('palabra').textContent = palabras;
}

const validarPalabra = (evento) => {
    if (evento.key === 'Enter') {
        palabraUsuario = document.getElementById('usuarioInput').value; // Obtener el valor del input del usuario
        if (palabraUsuario === palabras) {
            inicio(); //Cambiar palabra
            //console.log("Correcto");
            document.getElementById('usuarioInput').value = "";
            contadorPalabrasCorrectas++; //crear html con contador
            document.getElementById('contarPalabrasCorrectas').textContent = contadorPalabrasCorrectas;
            subirNivel();
        } else {
            //console.log("Incorrecto");
        }
    }
}

const subirNivel = () => {
    if (contadorPalabrasCorrectas % 6 === 0) {
        contadorNivel++; // Incrementa primero el nivel
        document.getElementById('contarNivel').textContent = contadorNivel;
        //console.log(contadorNivel);
    }
}

inicio();
document.getElementById('usuarioInput').addEventListener('keydown', validarPalabra);