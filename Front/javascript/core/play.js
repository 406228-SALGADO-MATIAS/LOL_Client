document.addEventListener("DOMContentLoaded", () => {
  const modeContainer = document.querySelector("#game-mode ul");
  const mapContainer = document.querySelector("#game-map ul");
  const typeContainer = document.querySelector("#game-type ul");
  const description = document.querySelector(".description h3");
  const launchBtn = document.querySelector("#launch-btn");

  // Datos de configuración
  const gameData = {
    classic: {
      maps: {
        "Summoner's Rift": ["Ranked Solo (Blind Pick)", "Normal (Blind Pick)"],
      },
    },
    aram: {
      maps: {
        "Howling Abyss": ["Normal (Random Pick)"],
      },
    },
  };

  let selectedMode = null;
  let selectedMap = null;
  let selectedType = null;

  // --- SELECCIÓN DE MODO ---
  modeContainer.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    // toggle selección
    if (selectedMode === li.dataset.mode) {
      selectedMode = null;
      li.classList.remove("active");
      clearMaps();
      clearTypes();
      updateDescription();
      return;
    }

    selectedMode = li.dataset.mode;
    [...modeContainer.children].forEach((el) => el.classList.remove("active"));
    li.classList.add("active");

    // actualizar mapas
    renderMaps(selectedMode);
    clearTypes();
    updateDescription();
  });

  // --- SELECCIÓN DE MAPA ---
  mapContainer.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    if (selectedMap === li.dataset.map) {
      selectedMap = null;
      li.classList.remove("active");
      clearTypes();
      updateDescription();
      return;
    }

    selectedMap = li.dataset.map;
    [...mapContainer.children].forEach((el) => el.classList.remove("active"));
    li.classList.add("active");

    renderTypes(selectedMode, selectedMap);
    updateDescription();
  });

  // --- SELECCIÓN DE TIPO ---
  typeContainer.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    if (selectedType === li.dataset.type) {
      selectedType = null;
      li.classList.remove("active");
      updateDescription();
      launchBtn.disabled = true;
      return;
    }

    selectedType = li.dataset.type;
    [...typeContainer.children].forEach((el) => el.classList.remove("active"));
    li.classList.add("active");

    updateDescription();
    launchBtn.disabled = false;
  });

  // --- FUNCIONES AUXILIARES ---
  function renderMaps(mode) {
    mapContainer.innerHTML = "";
    const maps = Object.keys(gameData[mode].maps);
    maps.forEach((map) => {
      const li = document.createElement("li");
      li.textContent = map;
      li.dataset.map = map;
      mapContainer.appendChild(li);
    });
  }

  function renderTypes(mode, map) {
    typeContainer.innerHTML = "";
    const types = gameData[mode].maps[map];
    types.forEach((type) => {
      const li = document.createElement("li");
      li.textContent = type;
      li.dataset.type = type;
      typeContainer.appendChild(li);
    });
  }

  function clearMaps() {
    mapContainer.innerHTML = "";
    selectedMap = null;
  }

  function clearTypes() {
    typeContainer.innerHTML = "";
    selectedType = null;
    launchBtn.disabled = true;
  }

  function updateDescription() {
    if (!selectedMode) {
      description.textContent = "Selecciona un modo de juego";
    } else if (!selectedMap) {
      description.textContent = `Modo: ${capitalize(
        selectedMode
      )} — elige un mapa`;
    } else if (!selectedType) {
      description.textContent = `Mapa: ${selectedMap} — elige un tipo de partida`;
    } else {
      description.textContent = `Listo: ${capitalize(
        selectedMode
      )} | ${selectedMap} | ${selectedType}`;
    }
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
});
