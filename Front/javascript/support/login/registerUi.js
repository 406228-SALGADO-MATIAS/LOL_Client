// registerUi.js //

// -----------------------------
// Muestra los mensajes de validación
// -----------------------------

function showInputMessage(id, text, type) {
  const msgEl = document.getElementById(id);
  if (!msgEl) return;

  msgEl.innerText = text || "";

  // Limpiamos clases anteriores
  msgEl.classList.remove("error", "warning");

  // Tomamos el input relacionado
  const input = msgEl.nextElementSibling || msgEl.previousElementSibling;

  // Resetear borde
  if (input) input.style.borderColor = "#bebebe";

  if (type === "error") {
    msgEl.classList.add("error");
    if (input) input.style.borderColor = "#8d0000ff"; // rojo
  }
  if (type === "warning") {
    msgEl.classList.add("warning");
    if (input) input.style.borderColor = "#b38f00ff"; // amarillo
  }
}

// -----------------------------
// FLOATING LABELS DINÁMICOS
// -----------------------------

const formGroups = document.querySelectorAll(
  ".form-group input, .form-group select"
);

formGroups.forEach((input) => {
  // Si ya tiene valor al cargar, flotamos el label
  if (input.value) {
    input.parentNode.classList.add("focused");
  }

  input.addEventListener("focus", () => {
    input.parentNode.classList.add("focused");
  });

  input.addEventListener("blur", () => {
    if (!input.value) {
      input.parentNode.classList.remove("focused");
    }
  });
});

// -----------------------------
// IMAGENES DE MOSTRAR/OCULTAR CONTRASEÑA
// -----------------------------

function togglePassword(id, el) {
  const input = document.getElementById(id);
  const img = el.querySelector("img");

  if (input.type === "password") {
    input.type = "text";
    img.src =
      "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761530008/eye_uvshov.png";
  } else {
    input.type = "password";
    img.src =
      "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761530005/eye-crossed_xuubre.png";
  }
}

// -----------------------------
// ANIMACIONES E INTERFAZ
// -----------------------------

function animateForm() {
  const formBox = document.querySelector(".form-box");
  const formItems = formBox.querySelectorAll(".form-group, .button-row");

  // 1️⃣ Animar el form box
  formBox.classList.add("animate");

  // 2️⃣ Animar los elementos internos de a uno
  formItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("show");
    }, index * 150); // 150ms de delay entre cada elemento
  });
}

function setupBackgroundVideo() {
  const video = document.getElementById("bg-video");

  // Si ya existe, no volver a crear intervalos
  if (videoInterval) clearInterval(videoInterval);

  // Overlay negro para el fade
  let overlay = document.getElementById("video-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "video-overlay";
    document.body.appendChild(overlay);
    Object.assign(overlay.style, {
      position: "fixed",
      inset: "0",
      background: "black",
      opacity: "0",
      transition: "opacity 1s ease",
      pointerEvents: "none",
      zIndex: "0",
    });
  }

  const videos = [
    "https://res.cloudinary.com/dzhyqelnw/video/upload/v1761555567/2025-10-27_05-57-52_crco68.mp4",
    "https://res.cloudinary.com/dzhyqelnw/video/upload/v1761555567/2025-10-27_05-57-52_crco68.mp4",
  ];

  let currentIndex = 0;

  function changeVideo() {
    if (!backgroundEnabled) return; // seguridad extra
    currentIndex = (currentIndex + 1) % videos.length;

    overlay.style.opacity = 1;
    setTimeout(() => {
      video.src = videos[currentIndex];
      video.load();
      video.play();
      overlay.style.opacity = 0;
    }, 600);
  }

  // Inicial
  video.src = videos[currentIndex];
  video.load();
  video.play();
  overlay.style.opacity = 0;

  videoInterval = setInterval(changeVideo, 35000);
}
function disableBackgroundVideo() {
  const video = document.getElementById("bg-video");
  const overlay = document.getElementById("video-overlay");

  if (!video || !overlay) return;

  overlay.style.opacity = 1; // empieza el fade a negro

  setTimeout(() => {
    clearInterval(videoInterval);
    video.pause();
    video.removeAttribute("src");
    video.load(); // limpia el video

    // Aplica el fondo estático
    document.body.style.background = `
      url('https://res.cloudinary.com/dzhyqelnw/image/upload/v1761627630/jinx_vs_vi_uolpt3.png')
      center/cover no-repeat
    `;

    overlay.style.opacity = 0; // vuelve del negro
  }, 600); // mismo tiempo de fade
}
