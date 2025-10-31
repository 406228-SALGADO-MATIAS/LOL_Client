// ===============================
// Variables globales
// ===============================
let backgroundEnabled = true;
let videoInterval = null;
let lastIndex = -1; // guarda el último fondo usado

// ===============================
// Setup del fondo de video dinámico
// ===============================
function setupBackgroundVideo() {
  const video = document.getElementById("bg-video");

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

  // Videos e imágenes asociadas
  const backgrounds = [
    {
      video:
        "https://res.cloudinary.com/dzhyqelnw/video/upload/v1761552523/2025-10-27_04-46-59_fijww4.mp4",
      image:
        "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761785630/iron_fist_uv8ihr.png",
    },
    {
      video:
        "https://res.cloudinary.com/dzhyqelnw/video/upload/v1761552517/2025-10-27_04-29-08_tztrgn.mp4",
      image:
        "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761785628/galio_q9opik.png",
    },
    {
      video:
        "https://res.cloudinary.com/dzhyqelnw/video/upload/v1761552515/2025-10-27_04-17-59_m9bhqs.mp4",
      image:
        "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761785628/lucian_mbbary.png",
      specialPosition: "center 20%", // 👈 caso especial
    },
    {
      video:
        "https://res.cloudinary.com/dzhyqelnw/video/upload/v1761552522/2025-10-27_04-14-15_qaitpe.mp4",
      image:
        "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761785629/elise_mqxkeo.png",
    },
  ];

  // ✅ Elegir el índice inicial
  let currentIndex;
  if (lastIndex >= 0) {
    // continuar desde el último
    currentIndex = lastIndex;
  } else {
    // primera vez: elegir aleatorio
    currentIndex = Math.floor(Math.random() * backgrounds.length);
    lastIndex = currentIndex;
  }

  // 🔹 función para aplicar estilos visuales del fondo actual
  function applyBackgroundStyles(bg) {
    document.body.style.background = `
      url('${bg.image}') center 15% / cover no-repeat
    `;
    video.style.objectPosition = bg.specialPosition || "center 5%";
  }

  // 🔹 cambio de fondo periódico
  function changeVideo() {
    if (!backgroundEnabled) return;

    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * backgrounds.length);
    } while (nextIndex === currentIndex);

    currentIndex = nextIndex;
    lastIndex = nextIndex;

    overlay.style.opacity = 1;

    setTimeout(() => {
      const bg = backgrounds[currentIndex];
      video.src = bg.video;
      video.load();
      video.play();

      applyBackgroundStyles(bg);
      overlay.style.opacity = 0;
    }, 600);
  }

  // ✅ inicializar video actual
  const firstBg = backgrounds[currentIndex];
  video.src = firstBg.video;
  video.load();
  video.play();
  applyBackgroundStyles(firstBg);
  overlay.style.opacity = 0;

  // ✅ arrancar el ciclo
  videoInterval = setInterval(changeVideo, 15000);
}

// ===============================
// Desactivar fondo animado
// ===============================
function disableBackgroundVideo() {
  const video = document.getElementById("bg-video");
  const overlay = document.getElementById("video-overlay");
  if (!video || !overlay) return;

  overlay.style.opacity = 1;

  setTimeout(() => {
    clearInterval(videoInterval);
    video.pause();
    // ⚠️ No borramos lastIndex para retomar donde se quedó
    video.removeAttribute("src");
    video.load();
    overlay.style.opacity = 0;
  }, 600);
}

function animateForm() {
  const formBox = document.querySelector(".form-box");
  if (!formBox) return;

  const formItems = formBox.querySelectorAll(".form-group, .button-row");

  // 1️⃣ Animar el form box
  formBox.classList.add("animate");

  // 2️⃣ Animar los elementos internos de a uno
  formItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("show");
    }, index * 140); // 150ms de delay entre cada elemento
  });
}
