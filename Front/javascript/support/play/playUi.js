// --- BACKGROUNDS DEFINIDOS ---
const backgrounds = {
  // MODO
  classic: "https://cdn.wallpapersafari.com/31/65/JEdnVm.jpg",
  aram: "https://gamevigor.wordpress.com/wp-content/uploads/2013/06/original-9.jpg",

  // MAPAS
  "Summoner's Rift":
    "https://cdn.gameboost.com/article-images/2024-02-27/bb716d85-86e8-4d6d-bea3-cde048aff368.webp",
  "Howling Abyss":
    "https://i.rutab.net/upload/2020/userfiles/legends-of-runeterra-freljord-1212x610.jpg",

  // TIPOS
  Ranked: "https://images2.alphacoders.com/499/499385.jpg",
};

// --- FADE HELPERS ---
function fadeIn(el, duration = 400) {
  el.style.opacity = 0;
  el.style.transition = `opacity ${duration}ms ease`;
  requestAnimationFrame(() => (el.style.opacity = 1));
}

function fadeOut(el, duration = 200) {
  el.style.opacity = 1;
  el.style.transition = `opacity ${duration}ms ease`;
  requestAnimationFrame(() => (el.style.opacity = 0));
}

// --- GENERAL ---
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// --- RENDERIZAR LISTA CON OPCIONES ---
function renderList(container, items, datasetKey, withFade = true) {
  container.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    li.dataset[datasetKey] = item;
    if (withFade) li.classList.add("fade-element");
    container.appendChild(li);

    if (withFade) requestAnimationFrame(() => li.classList.add("show"));
  });
}

// --- LIMPIAR CONTENEDORES ---
function clearContainer(container) {
  container.innerHTML = "";
}

//  MANEJO DE BACKGROUND

function createBackgroundOverlay(parent) {
  const bgOverlay = document.createElement("div");
  Object.assign(bgOverlay.style, {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    opacity: "0",
    transition: "opacity 0.4s ease",
    zIndex: "1",
    pointerEvents: "none",
    borderRadius: "12px",
  });
  parent.appendChild(bgOverlay);
  return bgOverlay;
}

// ACTUALIZACIÓN DE BACKGROUND
function updateBackground({
  selectedMode,
  selectedMap,
  selectedType,
  clientBottom,
  bgOverlay,
}) {
  let newBg = null;

  if (selectedType && selectedMap === "Summoner's Rift") {
    if (selectedType.includes("Ranked")) newBg = backgrounds["Ranked"];
    else if (selectedType.includes("Normal"))
      newBg = backgrounds["Summoner's Rift"];
  }

  if (!newBg && selectedMap) newBg = backgrounds[selectedMap];
  if (!newBg && selectedMode) newBg = backgrounds[selectedMode];
  if (!newBg) return;

  const formattedNewBg = `url("${newBg}")`;
  const currentBg = clientBottom.style.backgroundImage;
  if (currentBg === formattedNewBg) return;

  bgOverlay.style.opacity = "1";
  setTimeout(() => {
    clientBottom.style.backgroundImage = formattedNewBg;
    clientBottom.style.backgroundPosition =
      newBg === backgrounds["aram"] ? "center 67%" : "center center";
    bgOverlay.style.opacity = "0";
  }, 120);
}

// ACTUALIZACIÓN DE DESCRIPCIÓN
function updateDescription({
  selectedMode,
  selectedMap,
  selectedType,
  selectedSelection,
}) {
  const descMode = document.getElementById("desc-mode");
  const descMap = document.getElementById("desc-map");
  const hr = document.querySelector(".client-bottom hr");
  const p1 = document.getElementById("desc-p1");
  const p2 = document.getElementById("desc-p2");
  const p3 = document.getElementById("desc-p3");
  const launchContainer = document.getElementById("launch-container");

  const prevP3Text = p3.textContent;

  fadeOut(p1);
  fadeOut(p2);
  descMode.textContent = "";
  descMap.textContent = "";
  hr.style.display = "none";

  if (!selectedMode) return;

  // --- P1: modo ---
  descMode.textContent = capitalize(selectedMode);
  p1.textContent =
    selectedMode === "classic"
      ? "Trabajá con tus aliados para sitiar la base enemiga y destruir su Nexo."
      : "Luchá como equipo con campeones aleatorios para destruir el Nexo enemigo.";
  fadeIn(p1);

  // --- P2: mapa ---
  if (selectedMap) {
    descMap.textContent = selectedMap;
    hr.style.display = "block";
    p2.textContent =
      selectedMap === "Summoner's Rift"
        ? "Duración promedio de la partida: 30–45 minutos."
        : "Duración promedio de la partida: 20–30 minutos.";
    fadeIn(p2);
  }

  // --- P3: selección ---
  let newP3Text = "";
  if (selectedSelection) {
    if (selectedSelection === "Automatic")
      newP3Text = "Armar la partida automáticamente.";
    else if (selectedSelection === "Custom") {
      newP3Text =
        selectedMode === "classic"
          ? "Elegir manualmente el Rol a desempeñar en el mapa y el Campeón a jugar."
          : "Elegir manualmente el Campeón entre 3 opciones aleatorias.";
    }
  }

  if (newP3Text !== prevP3Text) {
    fadeOut(p3, 80);
    setTimeout(() => {
      p3.textContent = newP3Text;
      fadeIn(p3, 200);
    }, 50);
  }

  // --- BOTÓN ---
  if (selectedMode && selectedMap && selectedType && selectedSelection)
    launchContainer.classList.add("show");
  else launchContainer.classList.remove("show");
}
