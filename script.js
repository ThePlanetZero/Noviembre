// --- Countdown: 28 de noviembre de 2026, 2:00 PM PST (UTC-8) ---
const objetivo = new Date("2026-11-28T14:00:00-08:00").getTime();

const el = {
  dias: document.getElementById("dias"),
  horas: document.getElementById("horas"),
  minutos: document.getElementById("minutos"),
  segundos: document.getElementById("segundos")
};

const pad = n => String(n).padStart(2, "0");

function actualizar() {
  const restante = objetivo - Date.now();

  if (restante <= 0) {
    document.getElementById("countdown").outerHTML =
      '<div class="countdown-final">¡Ya salió NOVIEMBRE!</div>';
    clearInterval(intervalo);
    return;
  }

  const s = Math.floor(restante / 1000);
  el.dias.textContent = pad(Math.floor(s / 86400));
  el.horas.textContent = pad(Math.floor((s % 86400) / 3600));
  el.minutos.textContent = pad(Math.floor((s % 3600) / 60));
  el.segundos.textContent = pad(s % 60);
}

const intervalo = setInterval(actualizar, 1000);
actualizar();

// --- Reproductor ---
const playlist = [
  "mitad.mp3",
  "PINCHEEEEE.mp3",
  "Track3.mp3",
  "SFA.mp3"
];

const audio = new Audio();
const btn = document.getElementById("btn-musica");
const nombre = document.getElementById("nombre-cancion");
let indice = -1; // -1 = lista reiniciada, aún no suena nada

function detener() {
  audio.pause();
  audio.removeAttribute("src");
  audio.load();
  indice = -1;
  nombre.textContent = "";
  btn.classList.remove("sonando");
}

btn.addEventListener("click", () => {
  nombre.classList.add("visible"); // el texto se activa desde el primer clic

  if (indice + 1 >= playlist.length) {
    // ya sonaron todas: este clic detiene todo y reinicia la lista
    detener();
    return;
  }

  indice++;
  audio.src = playlist[indice];
  nombre.textContent = playlist[indice];
  audio.play().catch(err => console.error("No se pudo reproducir:", err));
});

// cuando termina una canción NO pasa a la siguiente, solo se detiene
audio.addEventListener("ended", () => btn.classList.remove("sonando"));
audio.addEventListener("play",  () => btn.classList.add("sonando"));
audio.addEventListener("pause", () => btn.classList.remove("sonando"));