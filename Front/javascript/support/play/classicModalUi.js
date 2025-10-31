// ======================================================
// 🧩 LÓGICA
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

let activeFadeOverlay = null; // overlay actual, si existe

async function selectChampion(champ, card) {
  selectedChampionId = champ.id;

  highlightSelectedCard(card);
  showChooseButton();
  updateChampionPreview(champ);
  await loadSkins(window.originalUserId || sessionStorage.getItem("userId"));
  showChampionSkins(champ);
  await animateFadeOverlay();
}

// -------------------- Helpers --------------------

function highlightSelectedCard(card) {
  document.querySelectorAll(".champion-card").forEach((c) => {
    c.classList.remove("selected");
  });
  card.classList.add("selected");
}

function showChooseButton() {
  const chooseBtn = document.querySelector(
    ".champion-preview-action-btn.choose-btn"
  );
  if (chooseBtn) chooseBtn.style.display = "flex";
}

function updateChampionPreview(champ) {
  const topOverlay = document.querySelector(
    ".champion-preview-overlay:not(.bottom)"
  );
  const bottomOverlay = document.querySelector(
    ".champion-preview-overlay.bottom"
  );

  if (topOverlay) topOverlay.style.background = "rgba(0, 0, 0, 0.651)";
  if (bottomOverlay) bottomOverlay.style.background = "rgba(0, 0, 0, 0.651)";

  champImgNameDiv.textContent = champ.name;
  champImg.winrateDiv.textContent = `Winrate: ${
    champ.winrate?.toFixed(2) ?? "??"
  }%`;
  champImg.difficultyDiv.textContent = `Dificultad: ${champ.difficulty ?? "?"}`;
  champImg.style.boxShadow = "0 0 10px rgba(245, 245, 245, 0.6)";
}

// ======================================================
//  ANIMACIONES
// ======================================================

function animateFadeOverlay() {
  return new Promise((resolve) => {
    // Si hay overlay activo, lo removemos antes de crear uno nuevo
    if (activeFadeOverlay) {
      activeFadeOverlay.remove();
      activeFadeOverlay = null;
    }

    const fadeOverlay = document.createElement("div");
    fadeOverlay.classList.add("champion-preview-overlay-fade");
    champImg.appendChild(fadeOverlay);
    activeFadeOverlay = fadeOverlay;

    // Trigger animación
    requestAnimationFrame(() => {
      fadeOverlay.style.opacity = "0";
    });

    setTimeout(() => {
      fadeOverlay.remove();
      if (activeFadeOverlay === fadeOverlay) activeFadeOverlay = null;
      resolve();
    }, 400);
  });
}

function animateRoleSelection(title, displayDiv, buttonsDiv) {
  // Estado inicial
  [title, displayDiv, ...buttonsDiv.querySelectorAll(".role-btn")].forEach(
    (el) => {
      el.style.opacity = 0;
      el.style.transform = "translateY(25px)";
      el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
    }
  );

  // Animaciones en secuencia
  requestAnimationFrame(() => {
    // 1️⃣ título
    title.style.opacity = 1;
    title.style.transform = "translateY(0)";

    // 2️⃣ display (delay leve)
    setTimeout(() => {
      displayDiv.style.opacity = 1;
      displayDiv.style.transform = "translateY(0)";
    }, 300);

    // 3️⃣ botones (en cascada horizontal)
    setTimeout(() => {
      const buttons = buttonsDiv.querySelectorAll(".role-btn");
      buttons.forEach((b, i) => {
        b.style.opacity = 1;
        b.style.transform = "translateY(0)";
        b.style.transitionDelay = `${i * 100}ms`;
      });
    }, 600);
  });
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

function animateChampionSelection() {
  const filterHeader = champSection.querySelector(".champion-filter-header");
  const champGrid = champSection.querySelector(".champion-grid");
  const previewDiv = champSection.querySelector(".champion-preview");

  // === ESTADOS INICIALES ===
  [filterHeader, champGrid, previewDiv].forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(25px)";
    el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
  });

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
// Filtro de campeon
// ======================================================

function filterAndRenderChampions() {
  if (!championsData.length) return;

  const filtered = getFilteredChampions();
  if (isFilteredUnchanged(filtered)) return;

  currentFilteredChampionIds = filtered.map((c) => c.id);

  // Renderizamos directamente, sin tocar nada más
  champGrid.innerHTML = "";
  filtered.forEach((champ) => renderChampionCard(champ));

  animateChampionCards();
}

// -------------------- Helpers --------------------

function getFilteredChampions() {
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

  // Ordenamos alfabéticamente
  filtered.sort((a, b) => a.name.localeCompare(b.name));

  return filtered;
}

function isFilteredUnchanged(filtered) {
  const newIds = filtered.map((c) => c.id);
  return (
    newIds.length === currentFilteredChampionIds.length &&
    newIds.every((id, idx) => id === currentFilteredChampionIds[idx])
  );
}

function renderChampionCard(champ) {
  const card = document.createElement("div");
  card.classList.add("champion-card");

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
}

function normalizeText(str) {
  return str
    .normalize("NFD") // descompone acentos y caracteres especiales
    .replace(/[\u0300-\u036f]/g, "") // quita los diacríticos
    .replace(/['´]/g, "'") // trata ´ y ' como el mismo caracter
    .toLowerCase();
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
