// ==============================
// CLASSIC MODAL
// ==============================
let selectedRole = null;
let selectedChampionId = null;
let currentSection = "roleSelection";

let overlay, modal;
let roleSection, champSection;
let roleImg, champGrid, champImg, champActionBtn, nextBtn;

// Nueva variable para guardar el modo de juego
let isRanked = false;

// 🔹 Botones de roles
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

// ==============================
// ABRIR MODAL CLASSIC
// ==============================
function openClassicModal(ranked = false) {
  isRanked = ranked;
  console.log("Abrir modal classic. Ranked:", isRanked);

  createModal(); // ✅ Solo se crea, no se toca DOM todavía

  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.classList.add("show");
    modal.classList.add("show");
  });
}

// ==============================
// CREAR MODAL
// ==============================
function createModal() {
  // eliminar overlay viejo si existía
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

// ==============================
// RENDER ROLE SELECTION
// ==============================
function renderRoleSelection() {
  const section = document.createElement("div");
  section.classList.add("modal-section", "role-selection-section");

  // 🔹 Contenedor visual del mapa
  const displayDiv = document.createElement("div");
  displayDiv.classList.add("role-display");

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("role-buttons-container");

  roles.forEach((role) => {
    const btn = document.createElement("button");
    btn.classList.add("role-btn");
    btn.innerHTML = `<img src="${role.img}" alt="${role.name}"><span>${role.name}</span>`;
    btn.addEventListener("click", () => selectRole(role, btn));
    buttonsDiv.appendChild(btn);
  });

  nextBtn = document.createElement("button");
  nextBtn.classList.add("modal-next-btn");
  nextBtn.textContent = "Siguiente";
  nextBtn.disabled = true;
  nextBtn.addEventListener("click", () => {
    if (!selectedRole) return;
    goToChampionSelection();
  });

  // 🔹 Apilamos fondo y controles
  section.append(displayDiv, buttonsDiv, nextBtn);
  return section;
}

// ==============================
// RENDER CHAMPION SELECTION
// ==============================

let activeRole = null;

function renderChampionSelection() {
  const section = document.createElement("div");
  section.classList.add("modal-section", "champion-selection-section");

  // 🔸 Header con filtros de roles
  const filterHeader = document.createElement("div");
  filterHeader.classList.add("champion-filter-header");

  roles.forEach((role) => {
    const btn = document.createElement("button");
    btn.classList.add("role-filter-btn");
    btn.title = role.name;

    const img = document.createElement("img");
    img.src = role.img;
    img.alt = role.name;
    btn.appendChild(img);

    btn.addEventListener("click", () => {
      if (activeRole === role.key) {
        activeRole = null;
        btn.classList.remove("active");
      } else {
        activeRole = role.key;
        document
          .querySelectorAll(".role-filter-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      }
      renderChampionGrid();
    });

    filterHeader.appendChild(btn);
  });

  // 🔸 Grilla de campeones
  champGrid = document.createElement("div");
  champGrid.classList.add("champion-grid");

  // 🔸 Preview del campeón
  const previewDiv = document.createElement("div");
  previewDiv.classList.add("champion-preview");

  champImg = document.createElement("img");
  champImg.classList.add("champion-preview-img");
  previewDiv.appendChild(champImg);

  // 🔸 Botón de acción
  champActionBtn = document.createElement("button");
  champActionBtn.classList.add("modal-action-btn");
  champActionBtn.textContent = "Omitir";
  champActionBtn.addEventListener("click", finishSelection);

  section.append(filterHeader, champGrid, previewDiv, champActionBtn);

  renderChampionGrid(); // render inicial
  return section;
}

// ==============================
// RENDER CHAMP GRID (FILTRADO + ORDENADO)
// ==============================
function renderChampionGrid() {
  if (!championsData.length) return; // seguridad

  champGrid.innerHTML = "";

  let filtered = championsData
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));
  if (activeRole) {
    filtered = filtered.filter((c) => c.mainRole === activeRole);
  }

  filtered.forEach((champ) => {
    const card = document.createElement("div");
    card.classList.add("champion-card");

    const img = document.createElement("img");
    img.src = champ.squareImageUrl || `images/champs/${champ.name}.jpg`;
    img.alt = champ.name;

    const name = document.createElement("p");
    name.textContent = champ.name;

    card.append(img, name);
    card.addEventListener("click", () => selectChampion(champ, card));

    champGrid.appendChild(card);
  });
}
// ==============================
// SELECCIÓN DE ROL
// ==============================
function selectRole(role, btn) {
  selectedRole = role.key;

  document
    .querySelectorAll(".role-btn")
    .forEach((b) => b.classList.remove("selected"));
  btn.classList.add("selected");

  nextBtn.disabled = false;
}

// ==============================
// IR A SECCIÓN DE CAMPEONES
// ==============================
function goToChampionSelection() {
  roleSection.style.display = "none";
  champSection.style.display = "flex";
  currentSection = "championSelection";
  loadChampions();
}

// ==============================
// FETCH CHAMPIONS
// ==============================

// Variable global para campeones
let championsData = [];

async function loadChampions() {
  const userId = window.originalUserId || sessionStorage.getItem("userId");

  try {
    const res = await fetch(
      `http://localhost:8080/champions/userChampions/${userId}`
    );
    const data = await res.json();

    // Guardamos en la variable global
    championsData = data;

    // Renderizamos la grilla
    renderChampionGrid();
  } catch (err) {
    console.error("Error al cargar campeones:", err);
  }
}

// ==============================
// SELECCIÓN DE CAMPEÓN
// ==============================
function selectChampion(champ, card) {
  selectedChampionId = champ.id;
  champImg.src = champ.imageUrl;
  champImg.alt = champ.name;
  champActionBtn.textContent = "Elegir →";

  document
    .querySelectorAll(".champion-card")
    .forEach((c) => c.classList.remove("selected"));
  card.classList.add("selected");
}

// ==============================
// FINALIZAR SELECCIÓN
// ==============================
// ==============================
// FINALIZAR SELECCIÓN CON FETCH
// ==============================
// ==============================
// FINALIZAR SELECCIÓN CON FETCH
// ==============================
async function finishSelection() {
  if (!selectedRole) {
    alert("Debes seleccionar un rol para continuar.");
    return;
  }

  const userId = window.originalUserId || sessionStorage.getItem("userId");
  const gameMode = isRanked ? "RANKED" : "NORMAL";

  try {
    let url;
    const params = new URLSearchParams({
      role: selectedRole,
      gameMode: gameMode,
      showChampion: true,
      showItem: true,
    });

    if (selectedChampionId) {
      url = `http://localhost:8080/matches/createMatch/userRoleAndChampion/${userId}?${params.toString()}&championId=${selectedChampionId}`;
    } else {
      url = `http://localhost:8080/matches/createMatch/userAndRole/${userId}?${params.toString()}`;
    }

    const res = await fetch(url, { method: "POST" });
    if (!res.ok) throw new Error("Error al crear la partida");
    const matchData = await res.json();

    console.log("Overlay al cerrar:", overlay);
    // 🔹 cerrar modal classic antes de mostrar resultado

    console.log("Intentando cerrar modal con:", closeModal);
    if (typeof closeModal !== "function") {
      console.warn("⚠️ closeModal no es una función o está undefined");
    }
    closeModal?.();

    closeClassicModal();

    createResultModal(matchData);
  } catch (err) {
    console.error("❌ Error al finalizar selección:", err);
    alert("No se pudo crear la partida. Intenta nuevamente.");
  }
}
// ==============================
// CERRAR MODAL CLASSIC
// ==============================
function closeClassicModal() {
  console.log("🟢 closeClassicModal llamado");
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
