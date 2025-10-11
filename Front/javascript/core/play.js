// --- play.js --- //

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
});
