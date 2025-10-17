async function openAramModal() {
  aramModal = null;
  selectedChampionId = null;
  console.log("Opening ARAM Modal");
  // Cargar datos
  await loadChampionsForAram();
  const userId = window.originalUserId || sessionStorage.getItem("userId");
  await loadSkins(userId);

  createAramModal();
}

function createAramModal() {
  if (aramModal) aramModal.remove(); // evita duplicados

  aramModal = document.createElement("div");
  aramModal.className = "aram-modal-overlay";
  aramModal.innerHTML = `
    <div class="aram-modal-container">
      <div class="aram-champion-grid" id="aramChampionGrid"></div>
      <button class="aram-confirm-btn" id="aramConfirmBtn">Confirmar</button>
    </div>
  `;

  document.body.appendChild(aramModal);

  renderAramChampions();
  document
    .getElementById("aramConfirmBtn")
    .addEventListener("click", finishAramSelection);
}

function renderAramChampions() {
  const grid = document.getElementById("aramChampionGrid");
  grid.innerHTML = "";

  // Clonamos el array y lo mezclamos
  const shuffled = [...championsData].sort(() => Math.random() - 0.5);

  // Tomamos 2 campeones sí o sí
  let selected = shuffled.slice(0, 2);

  // 30% de chance de agregar un tercero
  if (Math.random() < 0.3 && shuffled.length > 2) {
    selected.push(shuffled[2]);
  }

  selected.forEach((champion) => {
    const championSkins = skinsData.filter(
      (s) => s.championName === champion.name
    );
    const card = createChampionCard(champion, championSkins);
    grid.appendChild(card);
  });
}

function createChampionCard(champion, skins) {
  const allSkins = [
    { name: champion.name, image: champion.imageUrl, isBase: true },
    ...skins.map((s) => ({ name: s.name, image: s.image, isBase: false })),
  ];

  let currentSkinIndex = 0;

  // Render base de la card
  const { card, imageContainer } = renderChampionBaseCard(allSkins[0]);

  // Aplicar posición inicial
  updateSkinAram(card, allSkins[0]);

  // Render carrusel si hay más de una imagen
  if (allSkins.length > 1) {
    renderChampionCarousel(
      card,
      imageContainer,
      allSkins,
      () => {
        currentSkinIndex =
          (currentSkinIndex - 1 + allSkins.length) % allSkins.length;
        updateSkinAram(card, allSkins[currentSkinIndex]);
      },
      () => {
        currentSkinIndex = (currentSkinIndex + 1) % allSkins.length;
        updateSkinAram(card, allSkins[currentSkinIndex]);
      }
    );
  }

  // Click de selección
  card.addEventListener("click", () => {
    document
      .querySelectorAll(".aram-champion-card.selected")
      .forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
    selectedChampionId = champion.id;
  });

  return card;
}

/* =========================================================
   RENDER BASE DE LA CARD
========================================================= */
function renderChampionBaseCard(initialSkin) {
  const card = document.createElement("div");
  card.className = "aram-champion-card";

  const imageContainer = document.createElement("div");
  imageContainer.className = "aram-champion-image-container";

  const img = document.createElement("img");
  img.className = "aram-champion-image";

  const name = document.createElement("div");
  name.className = "aram-champion-name";

  imageContainer.appendChild(img);
  card.appendChild(imageContainer);
  card.appendChild(name);

  return { card, imageContainer, img, name };
}

/* =========================================================
   RENDER CARRUSEL
========================================================= */
function renderChampionCarousel(card, container, allSkins, onPrev, onNext) {
  const leftArrow = document.createElement("div");
  leftArrow.className = "aram-arrow left";
  leftArrow.innerHTML = "&#10094;";

  const rightArrow = document.createElement("div");
  rightArrow.className = "aram-arrow right";
  rightArrow.innerHTML = "&#10095;";

  leftArrow.addEventListener("click", (e) => {
    e.stopPropagation();
    onPrev();
  });

  rightArrow.addEventListener("click", (e) => {
    e.stopPropagation();
    onNext();
  });

  container.appendChild(leftArrow);
  container.appendChild(rightArrow);
}

/* =========================================================
   UPDATE SKIN (IMAGEN + NOMBRE + POSICIÓN DINÁMICA)
========================================================= */
function updateSkinAram(card, skin) {
  const img = card.querySelector(".aram-champion-image");
  const nameDiv = card.querySelector(".aram-champion-name");

  // Animación y actualización de imagen/nombre
  animateSkinTransition(img, nameDiv, () => {
    img.src = skin.image;
    nameDiv.textContent = skin.name;

    // Aplicar posición visual horizontal según tipo
    const position = skin.isBase
      ? getChampionObjectPosition(skin.name)
      : getSkinObjectPosition(skin.name);

    img.style.objectPosition = position;
  });
}

/* =========================================================
   ANIMACIÓN DE TRANSICIÓN
========================================================= */
function animateSkinTransition(img, name, onUpdate) {
  img.classList.add("fade-out");
  name.classList.add("fade-out");

  setTimeout(() => {
    onUpdate();
    img.classList.remove("fade-out");
    name.classList.remove("fade-out");
    img.classList.add("fade-in");
    name.classList.add("fade-in");
    setTimeout(() => {
      img.classList.remove("fade-in");
      name.classList.remove("fade-in");
    }, 300);
  }, 200);
}

function closeAramModal() {
  if (aramModal) {
    aramModal.classList.add("closing");
    setTimeout(() => aramModal.remove(), 300);
  }
}

async function finishAramSelection() {
  if (!selectedChampionId) {
    alert("Selecciona un campeón antes de confirmar.");
    return;
  }

  const userId = window.originalUserId || sessionStorage.getItem("userId");

  try {
    const res = await fetch(
      `http://localhost:8080/matches/createMatch/ARAM/userAndChampion/${userId}?championId=${selectedChampionId}`,
      {
        method: "POST",
      }
    );

    if (!res.ok) throw new Error("Error al crear la partida ARAM");

    const matchData = await res.json();

    closeAramModal();
    createResultModal(matchData);
  } catch (err) {
    console.error("Error en finishAramSelection:", err);
  }
}

async function loadChampionsForAram() {
  const userId = window.originalUserId || sessionStorage.getItem("userId");
  try {
    const res = await fetch(
      `http://localhost:8080/champions/userChampions/${userId}`
    );
    const data = await res.json();
    championsData = data;
  } catch (err) {
    console.error("Error al cargar campeones:", err);
  }
}
