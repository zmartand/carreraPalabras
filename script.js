const palabrasArray = ["gato", "maravilloso", "javascript", "oceano", "sol", "espacio", "programar"];
let palabraUsuario;
palabras = palabrasArray[Math.floor(Math.random()*palabrasArray.length)];

const inicio = () => { //1
    document.getElementById('palabra').textContent = palabras;
}