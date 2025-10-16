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
    img: "https://raw.githubusercontent.com/406228-SALGADO-MATIAS/LOL_Client/8f301d971e2127c121a2fdb794bef529c1dc4b87/Front/images/roles/top.png",
  },
  {
    key: "JUNGLE",
    name: "Jungle",
    img: "https://raw.githubusercontent.com/406228-SALGADO-MATIAS/LOL_Client/8f301d971e2127c121a2fdb794bef529c1dc4b87/Front/images/roles/jg.png",
  },
  {
    key: "MID",
    name: "Mid",
    img: "https://raw.githubusercontent.com/406228-SALGADO-MATIAS/LOL_Client/8f301d971e2127c121a2fdb794bef529c1dc4b87/Front/images/roles/mid.png",
  },
  {
    key: "ADC",
    name: "AD Carry",
    img: "https://raw.githubusercontent.com/406228-SALGADO-MATIAS/LOL_Client/8f301d971e2127c121a2fdb794bef529c1dc4b87/Front/images/styles/adc.png",
  },
  {
    key: "SUPPORT",
    name: "Support",
    img: "https://raw.githubusercontent.com/406228-SALGADO-MATIAS/LOL_Client/8f301d971e2127c121a2fdb794bef529c1dc4b87/Front/images/roles/support.png",
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

  overlay = document.createElement("div");
  overlay.classList.add("classic-modal-overlay");
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  modal = document.createElement("div");
  modal.classList.add("classic-modal-container");

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
