document.addEventListener("DOMContentLoaded", () => {
  const modeContainer = document.querySelector("#game-mode ul");
  const mapContainer = document.querySelector("#game-map ul");
  const typeContainer = document.querySelector("#game-type ul");
  const selectionContainer = document.querySelector("#game-selection ul");
  const description = document.querySelector(".description h2");
  const launchBtn = document.querySelector("#launch-btn");

  // Datos de configuración
  const gameData = {
    classic: {
      maps: {
        "Summoner's Rift": ["Ranked", "Normal"],
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
  let selectedSelection = null;

  // --- SELECCIÓN DE MODO ---
  modeContainer.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    if (selectedMode === li.dataset.mode) {
      selectedMode = null;
      li.classList.remove("active");
      clearMaps();
      clearTypes();
      clearSelection();
      updateDescription(); // <--- limpia todo
      return;
    }

    selectedMode = li.dataset.mode;
    [...modeContainer.children].forEach((el) => el.classList.remove("active"));
    li.classList.add("active");

    clearMaps();
    clearTypes();
    clearSelection(); // limpia game map, type y selection
    renderMaps(selectedMode); // renderiza mapas
    updateDescription(); // <--- limpia y actualiza descripción
  });

  // --- SELECCIÓN DE MAPA ---
  mapContainer.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    if (selectedMap === li.dataset.map) {
      selectedMap = null;
      li.classList.remove("active");
      clearTypes();
      clearSelection();
      updateDescription(); // <--- limpia descripción
      return;
    }

    selectedMap = li.dataset.map;
    [...mapContainer.children].forEach((el) => el.classList.remove("active"));
    li.classList.add("active");

    clearTypes();
    clearSelection(); // limpia game type y game selection
    renderTypes(selectedMode, selectedMap); // renderiza tipos
    updateDescription(); // <--- limpia y actualiza descripción
  });

  let animateSelection = true; // 🔹 bandera para animar Game Selection

  // --- SELECCIÓN DE TIPO ---
  typeContainer.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    if (selectedType === li.dataset.type) {
      // 🔹 Se deselecciona
      selectedType = null;
      li.classList.remove("active");

      clearSelection();
      updateDescription();
      launchBtn.disabled = true;

      animateSelection = true; // 🔹 la próxima vez que se seleccione, animar
      return;
    }

    const wasSelected = selectedType !== null;
    selectedType = li.dataset.type;
    [...typeContainer.children].forEach((el) => el.classList.remove("active"));
    li.classList.add("active");

    // 🔹 Renderizar Game Selection solo si corresponde
    clearSelection();
    if (!wasSelected && animateSelection) {
      renderSelectionWithAnimation();
      animateSelection = false; // 🔹 ya animó, no volver a animar hasta deseleccionar
    } else {
      renderSelectionWithoutAnimation();
    }

    updateDescription();
  });

  // --- SELECCIÓN DE GAME SELECTION ---
  selectionContainer.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    if (selectedSelection === li.dataset.selection) {
      selectedSelection = null;
      li.classList.remove("active");
      updateDescription();
      launchBtn.disabled = true;
      return;
    }

    selectedSelection = li.dataset.selection;
    [...selectionContainer.children].forEach((el) =>
      el.classList.remove("active")
    );
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
      li.classList.add("fade-element"); // ⬅ clase de fade
      mapContainer.appendChild(li);

      // Forzar animación
      requestAnimationFrame(() => li.classList.add("show"));
    });
  }

  function renderTypes(mode, map) {
    typeContainer.innerHTML = "";
    const types = gameData[mode].maps[map];
    types.forEach((type) => {
      const li = document.createElement("li");
      li.textContent = type;
      li.dataset.type = type;
      li.classList.add("fade-element");
      typeContainer.appendChild(li);

      requestAnimationFrame(() => li.classList.add("show"));
    });
  }

  // --- Render Game Selection con animación ---
  function renderSelectionWithAnimation() {
    selectionContainer.innerHTML = "";
    ["Automatic", "Custom"].forEach((sel) => {
      const li = document.createElement("li");
      li.textContent = sel;
      li.dataset.selection = sel;
      li.classList.add("fade-element");
      selectionContainer.appendChild(li);

      // Forzar animación
      requestAnimationFrame(() => li.classList.add("show"));
    });
  }

  // --- Render Game Selection sin animación ---
  function renderSelectionWithoutAnimation() {
    selectionContainer.innerHTML = "";
    ["Automatic", "Custom"].forEach((sel) => {
      const li = document.createElement("li");
      li.textContent = sel;
      li.dataset.selection = sel;
      selectionContainer.appendChild(li);
    });
  }

  function clearMaps() {
    mapContainer.innerHTML = "";
    selectedMap = null;
  }

  function clearTypes() {
    typeContainer.innerHTML = "";
    selectedType = null;
  }

  function clearSelection() {
    selectionContainer.innerHTML = "";
    selectedSelection = null;
    launchBtn.disabled = true;
  }

  function fadeIn(el, duration = 400) {
    el.style.opacity = 0;
    el.style.transition = `opacity ${duration}ms ease`;
    requestAnimationFrame(() => {
      el.style.opacity = 1;
    });
  }

  function fadeOut(el, duration = 200) {
    el.style.opacity = 1;
    el.style.transition = `opacity ${duration}ms ease`;
    requestAnimationFrame(() => {
      el.style.opacity = 0;
    });
  }

  function updateDescription() {
    const descMode = document.getElementById("desc-mode");
    const descMap = document.getElementById("desc-map");
    const hr = document.querySelector(".client-bottom hr");
    const p1 = document.getElementById("desc-p1");
    const p2 = document.getElementById("desc-p2");
    const p3 = document.getElementById("desc-p3");
    const launchContainer = document.getElementById("launch-container");

    // Guardar el texto actual de p3 para detectar cambios
    const prevP3Text = p3.textContent;

    // Fade out p1 y p2 (los que cambian con modo/mapa)
    fadeOut(p1);
    fadeOut(p2);

    // Limpiar encabezados
    descMode.textContent = "";
    descMap.textContent = "";
    hr.style.display = "none";

    if (!selectedMode) return;

    // --- P1: descripción del modo ---
    descMode.textContent = capitalize(selectedMode);
    if (selectedMode === "classic") {
      p1.textContent =
        "Trabajá con tus aliados para sitiar la base enemiga y destruir su Nexo.";
    } else if (selectedMode === "aram") {
      p1.textContent =
        "Luchá como equipo con campeones aleatorios para destruir el Nexo enemigo.";
    }
    fadeIn(p1);

    // --- P2: descripción del mapa ---
    if (selectedMap) {
      descMap.textContent = selectedMap;
      hr.style.display = "block";

      if (selectedMap === "Summoner's Rift") {
        p2.textContent = "Duración promedio de la partida: 30–45 minutos.";
      } else if (selectedMap === "Howling Abyss") {
        p2.textContent = "Duración promedio de la partida: 20–30 minutos.";
      }
      fadeIn(p2);
    } else {
      p2.textContent = "";
    }

    // --- P3: descripción del Game Selection ---
    let newP3Text = "";
    if (selectedSelection) {
      if (selectedSelection === "Automatic") {
        newP3Text = "Armar la partida automáticamente.";
      } else if (selectedSelection === "Custom") {
        if (selectedMode === "classic") {
          newP3Text =
            "Elegir manualmente el Rol a desempeñar en el mapa y el Campeón a jugar.";
        } else if (selectedMode === "aram") {
          newP3Text =
            "Elegir manualmente el Campeón entre 3 opciones aleatorias.";
        }
      }
    }

    // Si cambió el texto (es decir, cambiamos de Automatic ↔ Custom)
    if (newP3Text !== prevP3Text) {
      fadeOut(p3, 80);
      setTimeout(() => {
        p3.textContent = newP3Text;
        fadeIn(p3, 200);
      }, 50);
    }

    // --- Botón Launch ---
    if (selectedMode && selectedMap && selectedType && selectedSelection) {
      launchContainer.classList.add("show");
    } else {
      launchContainer.classList.remove("show");
    }
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
});

// Animación inicial de aparición
document.querySelectorAll(".fade-in").forEach((el) => {
  setTimeout(() => el.classList.add("show"), 50);
});
