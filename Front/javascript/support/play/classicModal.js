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

  // --- TÍTULO ---
  const title = document.createElement("h4");
  title.classList.add("role-selection-title");
  title.textContent = "Seleccionar Rol";

  // --- DISPLAY DE ROL ---
  const displayDiv = document.createElement("div");
  displayDiv.classList.add("role-display");

  // --- BOTONES DE ROLES ---
  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("role-buttons-container");

  roles.forEach((role) => {
    const btn = document.createElement("button");
    btn.classList.add("role-btn");
    btn.innerHTML = `<img src="${role.img}" alt="${role.name}"><span>${role.name}</span>`;
    btn.addEventListener("click", () => selectRole(role, btn));
    buttonsDiv.appendChild(btn);
  });

  // --- BOTÓN SIGUIENTE ---
  nextBtn = document.createElement("button");
  nextBtn.classList.add("modal-next-btn");
  nextBtn.textContent = "Siguiente";
  nextBtn.disabled = true;
  nextBtn.style.opacity = 0; // empieza oculto
  nextBtn.addEventListener("click", () => {
    if (!selectedRole) return;
    goToChampionSelection();
  });

  section.append(title, displayDiv, buttonsDiv, nextBtn);

  // === ANIMACIONES ===
  requestAnimationFrame(() => {
    // 1️⃣ título
    title.style.opacity = 1;
    title.style.transform = "translateY(0)";

    // 2️⃣ imagen display (con leve delay)
    setTimeout(() => {
      displayDiv.style.opacity = 1;
      displayDiv.style.transform = "translateY(0)";
    }, 300);

    // 3️⃣ botones de roles (en cascada horizontal)
    setTimeout(() => {
      const buttons = buttonsDiv.querySelectorAll(".role-btn");
      buttons.forEach((b, i) => {
        b.style.opacity = 1;
        b.style.transform = "translateY(0)";
        b.style.transitionDelay = `${i * 100}ms`;
      });
    }, 600);
  });

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
      filterAndRenderChampions();
    });

    filterHeader.appendChild(btn);
  });

  // ==== BUSCADOR ==== //
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Buscar campeón...";
  searchInput.classList.add("champion-search-input");
  searchInput.style.marginLeft = "auto"; // lo lleva full a la derecha
  searchInput.addEventListener("input", () => {
    filterAndRenderChampions();
  });
  filterHeader.appendChild(searchInput);

  champGrid = document.createElement("div");
  champGrid.classList.add("champion-grid");

  const previewDiv = renderChampionPreview();
  section.append(filterHeader, champGrid, previewDiv);

  renderChampionGrid(); // render inicial completo
  return section;
}

function normalizeText(str) {
  return str
    .normalize("NFD") // descompone acentos y caracteres especiales
    .replace(/[\u0300-\u036f]/g, "") // quita los diacríticos
    .replace(/['´]/g, "'") // trata ´ y ' como el mismo caracter
    .toLowerCase();
}

// Array para guardar IDs de la grilla actual
let currentFilteredChampionIds = [];

function filterAndRenderChampions() {
  if (!championsData.length) return;

  let filtered = championsData.slice();

  // Filtrado por rol
  if (activeRole) {
    filtered = filtered.filter((c) => c.mainRole === activeRole);
  }

  // Filtrado por búsqueda
  const searchInput = document.querySelector(".champion-search-input");
  if (searchInput && searchInput.value.trim() !== "") {
    const term = normalizeText(searchInput.value.trim());
    filtered = filtered.filter((c) => normalizeText(c.name).includes(term));
  }

  // Ordenamos
  filtered.sort((a, b) => a.name.localeCompare(b.name));

  // ✅ Comprobamos si cambió el resultado
  const newIds = filtered.map((c) => c.id);
  const unchanged =
    newIds.length === currentFilteredChampionIds.length &&
    newIds.every((id, idx) => id === currentFilteredChampionIds[idx]);

  if (unchanged) return; // nada cambió, no renderizamos

  // Actualizamos referencia
  currentFilteredChampionIds = newIds;

  // Renderizamos la grilla con los resultados
  champGrid.innerHTML = "";
  filtered.forEach((champ) => {
    const card = document.createElement("div");
    card.classList.add("champion-card");

    // ✅ Reaplicamos la selección si coincide con el seleccionado actual
    if (champ.id === selectedChampionId) {
      card.classList.add("selected");
    }

    const img = document.createElement("img");
    img.src = champ.squareImageUrl || `images/champs/${champ.name}.jpg`;
    img.alt = champ.name;

    const name = document.createElement("p");
    name.textContent = champ.name;

    card.append(img, name);
    card.addEventListener("click", () => selectChampion(champ, card));

    champGrid.appendChild(card);
  });

  animateChampionCards();
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

  animateChampionCards();
}

function renderChampionPreview() {
  const previewDiv = document.createElement("div");
  previewDiv.classList.add("champion-preview");

  // ===== DIV EXCLUSIVO PARA LA IMAGEN DE FONDO =====
  const imageDiv = document.createElement("div");
  imageDiv.classList.add("champion-preview-image"); // nuevo div
  previewDiv.appendChild(imageDiv);

  // ===== Overlay superior =====
  const infoOverlay = document.createElement("div");
  infoOverlay.classList.add("champion-preview-overlay");

  // ===== Contenedor principal de cabecera =====
  const champHeaderDiv = document.createElement("div");
  champHeaderDiv.classList.add("champion-preview-header");

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

  const actionBtn = document.createElement("button");
  actionBtn.classList.add("champion-preview-action-btn", "choose-btn");
  actionBtn.textContent = "Elegir";
  actionBtn.style.display = "none";
  actionBtn.addEventListener("click", finishSelection);

  const randomBtn = document.createElement("button");
  randomBtn.classList.add("champion-preview-random-btn", "skip-btn");
  randomBtn.textContent = "Skip";
  randomBtn.addEventListener("click", () => {
    selectedChampionId = null;
    finishSelection();
  });

  buttonsOverlay.append(actionBtn, randomBtn);

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
  champImg = imageDiv; // ahora la animación se hace solo sobre la imagen
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
  nextBtn.style.transition = "opacity 0.5s ease";
  nextBtn.style.opacity = 1; // aparece suave
}

function goToChampionSelection() {
  roleSection.style.display = "none";
  champSection.style.display = "flex";
  currentSection = "championSelection";

  // === ELEMENTOS A ANIMAR ===
  const filterHeader = champSection.querySelector(".champion-filter-header");
  const champGrid = champSection.querySelector(".champion-grid");
  const previewDiv = champSection.querySelector(".champion-preview");

  // === ESTADOS INICIALES ===
  [filterHeader, champGrid, previewDiv].forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(25px)";
    el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
  });

  loadChampions(); // renderiza cards

  // === ANIMACIONES EN SECUENCIA ===
  requestAnimationFrame(() => {
    // 1️⃣ filtro
    filterHeader.style.opacity = 1;
    filterHeader.style.transform = "translateY(0)";

    // 2️⃣ grilla (con delay)
    setTimeout(() => {
      champGrid.style.opacity = 1;
      champGrid.style.transform = "translateY(0)";
    }, 300);

    // 3️⃣ preview (después de la grilla)
    setTimeout(() => {
      previewDiv.style.opacity = 1;
      previewDiv.style.transform = "translateY(0)";
    }, 600);
  });
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

  const newSkin = currentChampionSkins[currentSkinIndex];

  // Fade-out de la imagen únicamente
  champImg.style.opacity = "0";

  setTimeout(() => {
    champImg.style.backgroundImage = `url(${newSkin.image})`;
    champImg.style.opacity = "1";
  }, 120);

  // Nombre del skin actualizado (header NO se toca)
  champImgNameDiv.textContent = newSkin.name;
}

// ======================================================
// 🧙 SELECCIÓN DE CAMPEÓN
// ======================================================
async function selectChampion(champ, card) {
  selectedChampionId = champ.id;

  document
    .querySelectorAll(".champion-card")
    .forEach((c) => c.classList.remove("selected"));
  card.classList.add("selected");

  const chooseBtn = document.querySelector(
    ".champion-preview-action-btn.choose-btn"
  );
  if (chooseBtn) chooseBtn.style.display = "flex";

  // --- Animación de fade-in sin tocar el background ---
  // 1️⃣ Crear overlay
  const fadeOverlay = document.createElement("div");
  fadeOverlay.classList.add("champion-preview-overlay-fade");
  champImg.appendChild(fadeOverlay);

  // Restaurar backgrounds originales
  const topOverlay = document.querySelector(
    ".champion-preview-overlay:not(.bottom)"
  );
  const bottomOverlay = document.querySelector(
    ".champion-preview-overlay.bottom"
  );

  if (topOverlay) topOverlay.style.background = "rgba(0, 0, 0, 0.651)";
  if (bottomOverlay) bottomOverlay.style.background = "rgba(0, 0, 0, 0.651)";

  // 2️⃣ Actualizar contenido
  champImgNameDiv.textContent = champ.name;
  champImg.winrateDiv.textContent = `Winrate: ${
    champ.winrate?.toFixed(2) ?? "??"
  }%`;
  champImg.difficultyDiv.textContent = `Dificultad: ${champ.difficulty ?? "?"}`;

  champImg.style.boxShadow = "0 0 10px rgba(245, 245, 245, 0.6)";

  await loadSkins(window.originalUserId || sessionStorage.getItem("userId"));
  showChampionSkins(champ);

  // 3️⃣ Animar overlay para revelar
  requestAnimationFrame(() => {
    fadeOverlay.style.opacity = "0";
  });

  // 4️⃣ Borrar overlay después de la animación
  setTimeout(() => fadeOverlay.remove(), 400);
}

function animateChampionCards() {
  const cards = champGrid.querySelectorAll(".champion-card");
  if (!cards.length) return;

  cards.forEach((card, i) => {
    card.style.opacity = 0;
    card.style.transform = "translateY(25px)";
    card.style.transition = `opacity 0.4s ease ${
      i * 0.04
    }s, transform 0.4s ease ${i * 0.04}s`;
  });

  // activamos en el siguiente frame para que el browser reconozca el estado inicial
  requestAnimationFrame(() => {
    cards.forEach((card) => {
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    });
  });
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
