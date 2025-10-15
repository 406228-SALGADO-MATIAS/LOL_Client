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
  console.log("Abrir modal classic. Ranked:", isRanked);

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

// ======================================================
// 🧭 RENDERIZADO DE SECCIONES
// ======================================================

// ----- Selección de Rol -----
function renderRoleSelection() {
  const section = document.createElement("div");
  section.classList.add("modal-section", "role-selection-section");

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

  section.append(displayDiv, buttonsDiv, nextBtn);
  return section;
}

// ----- Selección de Campeón -----
function renderChampionSelection() {
  const section = document.createElement("div");
  section.classList.add("modal-section", "champion-selection-section");

  // Filtros de roles
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

  champGrid = document.createElement("div");
  champGrid.classList.add("champion-grid");

  const previewDiv = renderChampionPreview();
  section.append(filterHeader, champGrid, previewDiv);

  renderChampionGrid();
  return section;
}

// ======================================================
// 🧱 COMPONENTES DE RENDER (Grilla y Preview)
// ======================================================
function renderChampionGrid() {
  if (!championsData.length) return;

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

function renderChampionPreview() {
  const previewDiv = document.createElement("div");
  previewDiv.classList.add("champion-preview");

  // ===== Overlay superior =====
  const infoOverlay = document.createElement("div");
  infoOverlay.classList.add("champion-preview-overlay");

  // ===== Contenedor principal de cabecera =====
  const champHeaderDiv = document.createElement("div");
  champHeaderDiv.classList.add("champion-preview-header");

  // Subdivs alineados
  const champDifficulty = document.createElement("div");
  champDifficulty.classList.add("champion-preview-difficulty");
  champDifficulty.textContent = "";

  const champNameDiv = document.createElement("div");
  champNameDiv.classList.add("champion-preview-name");
  champNameDiv.textContent = "";

  const champWinrate = document.createElement("div");
  champWinrate.classList.add("champion-preview-winrate");
  champWinrate.textContent = "";

  champHeaderDiv.append(champDifficulty, champNameDiv, champWinrate);
  infoOverlay.appendChild(champHeaderDiv);

  // ===== Overlay inferior: botones =====
  const buttonsOverlay = document.createElement("div");
  buttonsOverlay.classList.add("champion-preview-overlay", "bottom");

  // Botón "Elegir" centrado y oculto por defecto
  const actionBtn = document.createElement("button");
  actionBtn.classList.add("champion-preview-action-btn", "choose-btn");
  actionBtn.textContent = "Elegir";
  actionBtn.style.display = "none"; // oculto hasta seleccionar un campeón
  actionBtn.addEventListener("click", finishSelection);

  // Botón "Omitir" siempre visible a la derecha
  const randomBtn = document.createElement("button");
  randomBtn.classList.add("champion-preview-random-btn", "skip-btn");
  randomBtn.textContent = "Random";
  randomBtn.addEventListener("click", () => {
    selectedChampionId = null;
    finishSelection();
  });

  buttonsOverlay.append(actionBtn, randomBtn);

  // Guardar referencias globales
  champActionBtn = actionBtn; // este será el que mostramos al seleccionar

  // ===== Flechas =====
  const leftArrow = document.createElement("button");
  leftArrow.classList.add("carousel-arrow", "left-arrow");
  leftArrow.textContent = "<";
  leftArrow.style.display = "none";

  const rightArrow = document.createElement("button");
  rightArrow.classList.add("carousel-arrow", "right-arrow");
  rightArrow.textContent = ">";
  rightArrow.style.display = "none";

  leftArrow.addEventListener("click", () => changeSkin(-1));
  rightArrow.addEventListener("click", () => changeSkin(1));

  // ===== Ensamblado final =====
  previewDiv.append(infoOverlay, buttonsOverlay, leftArrow, rightArrow);

  // ===== Guardar referencias globales =====
  champImg = previewDiv;
  champImgNameDiv = champNameDiv;
  champImg.leftArrow = leftArrow;
  champImg.rightArrow = rightArrow;
  champImg.difficultyDiv = champDifficulty;
  champImg.winrateDiv = champWinrate;
  champActionBtn = actionBtn;

  return previewDiv;
}

// ======================================================
// 🧩 LÓGICA DE SELECCIÓN Y NAVEGACIÓN
// ======================================================
function selectRole(role, btn) {
  selectedRole = role.key;
  document
    .querySelectorAll(".role-btn")
    .forEach((b) => b.classList.remove("selected"));
  btn.classList.add("selected");
  nextBtn.disabled = false;
}

function goToChampionSelection() {
  roleSection.style.display = "none";
  champSection.style.display = "flex";
  currentSection = "championSelection";
  loadChampions();
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
// 🖼️ CARRUSEL DE SKINS
// ======================================================
function showChampionSkins(champion) {
  currentChampionSkins = [
    {
      name: champion.name,
      image: champion.imageUrl || champion.squareImageUrl,
    },
    ...skinsData.filter((skin) => skin.championName === champion.name),
  ];

  currentSkinIndex = 0;
  updateSkin();

  // 👇 Mostrar u ocultar flechas según cantidad de skins
  const hasMultipleSkins = currentChampionSkins.length > 1;
  champImg.leftArrow.style.display = hasMultipleSkins ? "block" : "none";
  champImg.rightArrow.style.display = hasMultipleSkins ? "block" : "none";
}

function updateSkin() {
  if (!currentChampionSkins.length) return;
  const skin = currentChampionSkins[currentSkinIndex];
  champImg.style.backgroundImage = `url(${skin.image})`;
  champImgNameDiv.textContent = skin.name;
}

function changeSkin(direction) {
  if (!currentChampionSkins.length) return;
  currentSkinIndex =
    (currentSkinIndex + direction + currentChampionSkins.length) %
    currentChampionSkins.length;
  updateSkin();
}

// ======================================================
// 🧙 SELECCIÓN DE CAMPEÓN
// ======================================================
async function selectChampion(champ, card) {
  selectedChampionId = champ.id;

  // Deseleccionamos todas las cards
  document
    .querySelectorAll(".champion-card")
    .forEach((c) => c.classList.remove("selected"));
  card.classList.add("selected");

  // Mostrar botón "Elegir" centrado
  const chooseBtn = document.querySelector(
    ".champion-preview-action-btn.choose-btn"
  );
  if (chooseBtn) chooseBtn.style.display = "flex";

  // Actualizamos datos del overlay superior
  champImgNameDiv.textContent = champ.name;
  champImg.winrateDiv.textContent = `Winrate: ${
    champ.winrate?.toFixed(2) ?? "??"
  }%`;
  champImg.difficultyDiv.textContent = `Dificultad: ${champ.difficulty ?? "?"}`;

  // Aplicar box-shadow al preview
  champImg.style.boxShadow = "0 0 10px rgba(245, 245, 245, 0.6)";

  // Cargar skins y mostrar carrusel
  await loadSkins(window.originalUserId || sessionStorage.getItem("userId"));
  showChampionSkins(champ);
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
