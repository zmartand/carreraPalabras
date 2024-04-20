const palabrasArray = ["gato", "maravilloso", "javascript", "oceano", "sol", "espacio", "programar"];
let palabraUsuario = '';

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
        } else {
            console.log("Incorrecto");
        }
    }
}

inicio();
document.getElementById('usuarioInput').addEventListener('keydown', validarPalabra);