// --- play.js --- //

// --- IDs DE SESIÓN (definir antes de todo) ---
window.originalUserId = sessionStorage.getItem("userId") || null;

// --- CREAR PARTIDA VIA API ---
async function createMatch() {
  const userId = window.originalUserId;
  if (!userId) {
    alert("Error: no se encontró el ID del usuario en la sesión.");
    console.error("⚠️ No se encontró userId en sessionStorage");
    return;
  }

  const modeLi = document.querySelector("#game-mode li.active");
  const mapLi = document.querySelector("#game-map li.active");
  const typeLi = document.querySelector("#game-type li.active");
  const selectionLi = document.querySelector("#game-selection li.active");

  if (!modeLi || !mapLi || !typeLi || !selectionLi) {
    alert("Faltan selecciones para crear la partida.");
    return;
  }

  const selectedMode = modeLi.dataset.mode;
  const selectedMap = mapLi.dataset.map;
  const selectedType = typeLi.dataset.type;
  const selectedSelection = selectionLi.dataset.selection;

  const ranked = selectedType === "Ranked";

  // --- CASO CLASSIC → CUSTOM ---
  if (selectedMode === "classic" && selectedSelection === "Custom") {
    const launchBtn = document.getElementById("launch-btn");
    if (launchBtn) {
      launchBtn.disabled = true;
      launchBtn.classList.add("disabled");
    }
    openClassicModal(ranked);
    return;
  }

  // --- CASO ARAM → CUSTOM ---
  if (selectedMode === "aram" && selectedSelection === "Custom") {
    const launchBtn = document.getElementById("launch-btn");
    if (launchBtn) {
      launchBtn.disabled = true;
      launchBtn.classList.add("disabled");
    }
    openAramModal();
    return;
  }

  if (selectedSelection !== "Automatic") {
    alert("Solo se puede iniciar partidas automáticas desde este botón.");
    return;
  }

  const gameMode =
    selectedMode === "classic" ? (ranked ? "RANKED" : "NORMAL") : "NORMAL";
  const map = selectedMode === "classic" ? "SUMMONERS RIFT" : "ARAM";

  try {
    const { data: match, status } = await apiPlay.createMatch(userId, {
      gameMode,
      map,
      showChampionImg: false,
      showItemImg: false,
    });

    if (status !== 200) throw new Error("Error al crear la partida");

    const launchBtn = document.getElementById("launch-btn");
    if (launchBtn) {
      launchBtn.disabled = true;
      launchBtn.classList.add("disabled");
    }

    console.log("✅ Partida creada con éxito:", match);
    createResultModal(match);

    return match;
  } catch (err) {
    console.error("❌ Error creando partida:", err);
    alert("Error al crear la partida.");
  }
}

// --- OBTENER DATOS DE SELECCIÓN ---
function getSelectedGameData() {
  const modeLi = document.querySelector("#game-mode li.active");
  const mapLi = document.querySelector("#game-map li.active");
  const typeLi = document.querySelector("#game-type li.active");
  const selectionLi = document.querySelector("#game-selection li.active");

  if (!modeLi || !mapLi || !typeLi || !selectionLi) {
    return null;
  }

  const selectedMode = modeLi.dataset.mode;
  const selectedMap = mapLi.dataset.map;
  const selectedType = typeLi.dataset.type;
  const selectedSelection = selectionLi.dataset.selection;

  // --- Traducción a parámetros del backend ---
  let gameMode;
  let map;
  let ranked;

  if (selectedMode === "classic") {
    map = "SUMMONERS RIFT";
    ranked = selectedType === "Ranked";
    gameMode = ranked ? "RANKED" : "NORMAL";
  } else if (selectedMode === "aram") {
    map = "ARAM";
    gameMode = "NORMAL";
    ranked = false;
  } else {
    console.error("Modo no reconocido:", selectedMode);
    return null;
  }

  return { gameMode, map, ranked };
}

// --- DATOS DE CONFIGURACIÓN ---
const gameData = {
  classic: {
    maps: {
      "Summoner's Rift": ["Ranked", "Normal"],
    },
  },
  aram: {
    maps: {
      "Howling Abyss": ["Random Picks"],
    },
  },
};

// INIT
document.addEventListener("DOMContentLoaded", () => {
  const modeContainer = document.querySelector("#game-mode ul");
  const mapContainer = document.querySelector("#game-map ul");
  const typeContainer = document.querySelector("#game-type ul");
  const selectionContainer = document.querySelector("#game-selection ul");
  const clientBottom = document.querySelector(".client-bottom");
  const bgOverlay = createBackgroundOverlay(clientBottom);

  // --- ESTADO ---
  let selectedMode = null;
  let selectedMap = null;
  let selectedType = null;
  let selectedSelection = null;
  let animateSelection = true;

  // --- EVENTOS ---

  //GAME MODE
  modeContainer.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li || selectedMode === li.dataset.mode) return;

    selectedMode = li.dataset.mode;

    [...modeContainer.children].forEach((el) => el.classList.remove("active"));
    li.classList.add("active");

    clearContainer(mapContainer);
    clearContainer(typeContainer);
    clearContainer(selectionContainer);
    selectedMap = selectedType = selectedSelection = null;

    renderList(mapContainer, Object.keys(gameData[selectedMode].maps), "map");
    updateBackground({
      selectedMode,
      selectedMap,
      selectedType,
      clientBottom,
      bgOverlay,
    });
    updateDescription({
      selectedMode,
      selectedMap,
      selectedType,
      selectedSelection,
    });
  });

  // GAME MAP
  mapContainer.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    if (selectedMap === li.dataset.map) {
      selectedMap = null;
      li.classList.remove("active");
      clearContainer(typeContainer);
      clearContainer(selectionContainer);
    } else {
      selectedMap = li.dataset.map;
      [...mapContainer.children].forEach((el) => el.classList.remove("active"));
      li.classList.add("active");

      clearContainer(typeContainer);
      clearContainer(selectionContainer);
      renderList(
        typeContainer,
        gameData[selectedMode].maps[selectedMap],
        "type"
      );
    }

    updateBackground({
      selectedMode,
      selectedMap,
      selectedType,
      clientBottom,
      bgOverlay,
    });
    updateDescription({
      selectedMode,
      selectedMap,
      selectedType,
      selectedSelection,
    });
  });

  // GAME TYPE
  typeContainer.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    if (selectedType === li.dataset.type) {
      selectedType = null;
      li.classList.remove("active");
      clearContainer(selectionContainer);
      animateSelection = true;
    } else {
      const wasSelected = selectedType !== null;
      selectedType = li.dataset.type;

      [...typeContainer.children].forEach((el) =>
        el.classList.remove("active")
      );
      li.classList.add("active");

      clearContainer(selectionContainer);
      selectedSelection = null;
      renderList(
        selectionContainer,
        ["Automatic", "Custom"],
        "selection",
        !wasSelected && animateSelection
      );
      animateSelection = false;
    }

    updateBackground({
      selectedMode,
      selectedMap,
      selectedType,
      clientBottom,
      bgOverlay,
    });
    updateDescription({
      selectedMode,
      selectedMap,
      selectedType,
      selectedSelection,
    });
  });

  //GAME SELECTION
  selectionContainer.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    if (selectedSelection === li.dataset.selection) {
      selectedSelection = null;
      li.classList.remove("active");
    } else {
      selectedSelection = li.dataset.selection;
      [...selectionContainer.children].forEach((el) =>
        el.classList.remove("active")
      );
      li.classList.add("active");
    }

    updateDescription({
      selectedMode,
      selectedMap,
      selectedType,
      selectedSelection,
    });
  });

  // --- SELECCIÓN DEFAULT ---
  const defaultModeLi = modeContainer.querySelector('li[data-mode="classic"]');
  if (defaultModeLi) defaultModeLi.click();

  // --- ANIMACIÓN INICIAL ---
  document.querySelectorAll(".fade-in").forEach((el) => {
    setTimeout(() => el.classList.add("show"), 50);
  });

  const launchBtn = document.getElementById("launch-btn");

  launchBtn.addEventListener("click", (event) => {
    // Deshabilitar el botón
    launchBtn.disabled = true;
    launchBtn.classList.add("disabled");

    // Obtener la selección actual
    const selectionLi = document.querySelector("#game-selection li.active");
    if (!selectionLi) {
      alert("Por favor selecciona un tipo de partida.");
      launchBtn.disabled = false;
      launchBtn.classList.remove("disabled");
      return;
    }

    const selectedSelection = selectionLi.dataset.selection;

    // Solo abrir status si es Automatic
    if (selectedSelection === "Automatic") {
      openStatusModal("Crear partida", "Esperando resultado");
    }

    // Ejecutar createMatch
    createMatch();
  });
});
