// ======================================================
// classicModal.js
// ======================================================

// ======================================================
// 🧩 VARIABLES GLOBALES
// ======================================================
let selectedRole = null;
let selectedChampionId = null;
let currentSection = "roleSelection";

let overlay, modal;
let roleSection, champSection;
let roleImg, champGrid, champImg, champActionBtn, nextBtn;

let isRanked = false; // modo de juego
let activeRole = null;

// Datos globales
let championsData = [];
let skinsData = [];
let currentChampionSkins = [];
let currentSkinIndex = 0;

// ======================================================
// 🧠 CONSTANTES DE ROLES
// ======================================================
const roles = [
  {
    key: "TOP",
    name: "Top",
    img: "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761339120/top_o6nf3d.webp",
  },
  {
    key: "JUNGLE",
    name: "Jungle",
    img: "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761339123/jg_de9cbc.png",
  },
  {
    key: "MID",
    name: "Mid",
    img: "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761339125/mid_b7phfo.png",
  },
  {
    key: "ADC",
    name: "AD Carry",
    img: "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761339916/adc2_qy3qpi.png",
  },
  {
    key: "SUPPORT",
    name: "Support",
    img: "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761339127/support_nuk1pt.png",
  },
];

// ======================================================
// ⚙️ INICIALIZACIÓN DEL MODAL
// ======================================================
function openClassicModal(ranked = false) {
  isRanked = ranked;

  currentChampionSkins = [];
  currentSkinIndex = 0;
  activeRole = null;

  createModal();
  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.classList.add("show");
    modal.classList.add("show");
  });
}
function createModal() {
  if (overlay) {
    overlay.remove();
    overlay = null;
    modal = null;
  }

  selectedRole = null;
  selectedChampionId = null;
  currentSection = "roleSelection";

  // --- OVERLAY ---
  overlay = document.createElement("div");
  overlay.classList.add("classic-modal-overlay");
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeClassicModal();
  });

  // --- MODAL ---
  modal = document.createElement("div");
  modal.classList.add("classic-modal-container");

  // --- BOTÓN CERRAR ---
  const closeBtn = document.createElement("button");
  closeBtn.classList.add("classic-modal-close-btn");
  closeBtn.innerHTML = "X";
  closeBtn.addEventListener("click", closeClassicModal);
  modal.appendChild(closeBtn);

  // --- SECCIONES ---
  roleSection = renderRoleSelection();
  champSection = renderChampionSelection();
  champSection.style.display = "none";

  modal.append(roleSection, champSection);
  overlay.appendChild(modal);
}

// Array para guardar IDs de la grilla actual
let currentFilteredChampionIds = [];

function goToChampionSelection() {
  roleSection.style.display = "none";
  champSection.style.display = "flex";
  currentSection = "championSelection";

  loadChampions(); // renderiza cards
  animateChampionSelection(); // ejecuta la animación
}

function goToRolesSection() {
  if (!roleSection || !champSection) return;

  // Ocultar sección de campeones
  champSection.style.display = "none";

  // Mostrar sección de roles
  roleSection.style.display = "flex"; // o "block" según tu layout
  currentSection = "roleSelection";

  // Obtener referencias internas
  const title = roleSection.querySelector(".role-selection-title");
  const displayDiv = roleSection.querySelector(".role-display");
  const buttonsDiv = roleSection.querySelector(".role-buttons-container");

  // Ejecutar animación
  animateRoleSelection(title, displayDiv, buttonsDiv);
}

// ======================================================
// 🌐 FETCH: CAMPEONES Y SKINS
// ======================================================
async function loadChampions() {
  const userId = window.originalUserId || sessionStorage.getItem("userId");
  try {
    const res = await fetch(
      `http://localhost:8080/champions/userChampions/${userId}`
    );
    const data = await res.json();
    championsData = data;
    renderChampionGrid();
  } catch (err) {
    console.error("Error al cargar campeones:", err);
  }

  animateChampionCards();
}

async function loadSkins(userId) {
  try {
    const res = await fetch(
      `http://localhost:8080/skins/getUserSkins/${userId}`
    );
    skinsData = await res.json();
  } catch (err) {
    console.error("Error al cargar skins:", err);
    skinsData = [];
  }
}

// ======================================================
// 🎮 FINALIZAR SELECCIÓN Y CREAR PARTIDA
// ======================================================
async function finishSelection() {
  if (!selectedRole) {
    alert("Debes seleccionar un rol para continuar.");
    return;
  }

  const userId = window.originalUserId || sessionStorage.getItem("userId");
  const gameMode = isRanked ? "RANKED" : "NORMAL";

  try {
    const params = new URLSearchParams({
      role: selectedRole,
      gameMode: gameMode,
      showChampion: true,
      showItem: true,
    });

    let url = selectedChampionId
      ? `http://localhost:8080/matches/createMatch/userRoleAndChampion/${userId}?${params.toString()}&championId=${selectedChampionId}`
      : `http://localhost:8080/matches/createMatch/userAndRole/${userId}?${params.toString()}`;

    const res = await fetch(url, { method: "POST" });
    if (!res.ok) throw new Error("Error al crear la partida");

    const matchData = await res.json();
    closeClassicModal();
    createResultModal(matchData);
  } catch (err) {
    console.error("❌ Error al finalizar selección:", err);
    alert("No se pudo crear la partida. Intenta nuevamente.");
  }
}

// ======================================================
// ❌ CERRAR MODAL CLASSIC
// ======================================================
function closeClassicModal() {
  modal.classList.remove("show");
  overlay.classList.remove("show");

  setTimeout(() => {
    overlay.remove();
    overlay = null;
    modal = null;
    selectedRole = null;
    selectedChampionId = null;
    currentSection = "roleSelection";
    roleImg = null;
    champGrid = null;
    champImg = null;
    champActionBtn = null;
    nextBtn = null;
    console.log("🟢 Modal classic cerrado completamente");
  }, 250);
}
