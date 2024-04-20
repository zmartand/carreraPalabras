const palabrasArray = ["gato", "maravilloso", "javascript", "oceano", "sol", "espacio", "programar"];
let palabraUsuario = '';
let contadorPalabrasCorrectas = 0;
let contadorNivel = 1;


const inicio = () => {
    palabras = palabrasArray[Math.floor(Math.random()*palabrasArray.length)];
    document.getElementById('palabra').textContent = palabras;
}

const validarPalabra = (evento) => {
    if (evento.key === 'Enter') {
        palabraUsuario = document.getElementById('usuarioInput').value; // Obtener el valor del input del usuario
        if (palabraUsuario === palabras) {
            inicio(); //Cambiar palabra
            console.log("Correcto");
            document.getElementById('usuarioInput').value = "";
            contadorPalabrasCorrectas++; //crear html con contador
            document.getElementById('contarPalabrasCorrectas').textContent = contadorPalabrasCorrectas;
        } else {
            console.log("Incorrecto");
        }
    }
}

const subirNivel = () => {
    if (contadorPalabrasCorrectas % 7 === 0) {
        contadorNivel++;
        document.getElementById('nivel').textContent = contadorNivel;
    }


}

inicio();
document.getElementById('usuarioInput').addEventListener('keydown', validarPalabra);