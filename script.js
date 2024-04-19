//Atributos y constantes
const palabras = ["mar", "cirujano", "transportar", "programa", "ironhack", "universal", "microscopio", "quiosco", "positivo", "cine", "comer", "sal", "canguro", "maravilloso", "perro", "ingeniero", "colmena", "escritor"] //Array de palabras random
let palabraActual = 0;
let nivel = 1; //Empezamos en el nivel 1
let vidas = 3; //Inicialmente empezamos con 3 vidas
let duracionPalabra = 8000; //Duración de la palabra inicialmente en milisegundos
let rondas = 0; //Para contar las rondas jugadas

const minDuracionPalabra = 2000; //Mínima duracion de la palabra
const contadorNivel = document.getElementById("nivel");
const contadorVidas = document.getElementById("vidas");
const inputUsuario =document.getElementById("usuarioInput");
const instruccionesJuego = document.getElementById("instrucciones");
const resultadoJuego = document.getElementById("resultado");


