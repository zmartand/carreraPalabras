const palabrasArray = ["gato", "maravilloso", "javascript", "oceano", "sol", "espacio", "programar"];
let palabraUsuario;
palabras = palabrasArray[Math.floor(Math.random()*palabrasArray.length)];

const inicio = () => {
    document.getElementById('palabra').textContent = palabras;
}

const validarPalabra = (evento) => {
    if (evento.key === 'Enter') {
        palabraUsuario = document.getElementById('usuarioInput').value; // Obtener el valor del input del usuario
        if (palabraUsuario === palabras) { //Aquí al ser correcta mostrar palabra siguiente
            console.log("Correcto");
        } else {
            console.log("Incorrecto");
        }
    }
}

inicio();
document.getElementById('usuarioInput').addEventListener('keydown', validarPalabra);