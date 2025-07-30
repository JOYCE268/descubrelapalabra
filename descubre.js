const palabras = [
  "javascript", "internet", "hipervinculo", "cortafuegos",
  "servidor", "virtual", "memoria", "pagina", "conectar"
];

let palabraSecreta = [];
let vidas = 5;
let ganadas = 0;
let perdidas = 0;
let juegoActivo = true;

function iniciarJuego() {
  const indice = Math.floor(Math.random() * palabras.length);
  palabraSecreta = palabras[indice].split("");
  vidas = 5;
  juegoActivo = true;

  document.getElementById("vidas").textContent = "Vidas: ❤️❤️❤️❤️❤️";
  document.getElementById("palabra").textContent = "_ ".repeat(palabraSecreta.length).trim();
  document.getElementById("letrasUsadas").textContent = "Letras usadas: ";
  document.getElementById("teclado").innerHTML = "";

  crearTeclado();
}

function crearTeclado() {
  const teclado = document.getElementById("teclado");
  for (let i = 65; i <= 90; i++) {
    const letra = String.fromCharCode(i).toLowerCase();
    const boton = document.createElement("button");
    boton.textContent = letra.toUpperCase();
    boton.onclick = () => jugarLetra(letra, boton);
    teclado.appendChild(boton);
  }
}

function jugarLetra(letra, boton) {
  if (!juegoActivo) return;
  boton.disabled = true;
  document.getElementById("letrasUsadas").textContent += letra.toUpperCase() + " ";

  const display = document.getElementById("palabra").textContent.split(" ");
  let acierto = false;

  palabraSecreta.forEach((letraSecreta, index) => {
    if (letraSecreta === letra) {
      display[index] = letra.toUpperCase();
      acierto = true;
    }
  });

  document.getElementById("palabra").textContent = display.join(" ");

  if (!acierto) {
    vidas--;
    actualizarVidas();
  }

  if (!display.includes("_")) {
    finalizarJuego(true);
  } else if (vidas === 0) {
    finalizarJuego(false);
  }
}

function actualizarVidas() {
  const corazones = "❤️".repeat(vidas);
  document.getElementById("vidas").textContent = `Vidas: ${corazones}`;
}

function finalizarJuego(ganaste) {
  juegoActivo = false;
  if (ganaste) {
    alert("🎉 ¡Ganaste!");
    ganadas++;
    document.getElementById("ganadas").textContent = ganadas;
  } else {
    alert(`😢 Perdiste. La palabra era: ${palabraSecreta.join("").toUpperCase()}`);
    perdidas++;
    document.getElementById("perdidas").textContent = perdidas;
  }
}

function reiniciarContador() {
  ganadas = 0;
  perdidas = 0;
  document.getElementById("ganadas").textContent = "0";
  document.getElementById("perdidas").textContent = "0";
}

// Iniciar primer juego automáticamente
window.onload = iniciarJuego;
