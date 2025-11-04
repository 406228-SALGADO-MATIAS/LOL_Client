async function openAramModal() {
  closeStatusModal();
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
  if (aramModal) aramModal.remove();

  aramModal = document.createElement("div");
  aramModal.className = "aram-modal-overlay";
  aramModal.innerHTML = `
    <div class="aram-modal-container">
      <div class="aram-champion-grid" id="aramChampionGrid"></div>
      <button class="aram-confirm-btn hidden" id="aramConfirmBtn">Confirmar</button>
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

  const shuffled = [...championsData].sort(() => Math.random() - 0.5);

  // Tomar siempre 3 campeones
  const selected = shuffled.slice(0, 3);

  selected.forEach((champion, index) => {
    const championSkins = skinsData.filter(
      (s) => s.championName === champion.name
    );

    const card = createChampionCard(champion, championSkins);
    grid.appendChild(card);

    // Animación de entrada de la card
    setTimeout(() => {
      card.style.animation = `cardFadeIn 0.5s ease-out forwards`;

      // Fade-in del contenido de la card tras la animación de la card
      setTimeout(() => {
        const img = card.querySelector(".aram-champion-image");
        const name = card.querySelector(".aram-champion-name");
        const arrows = card.querySelectorAll(".aram-arrow");

        img.classList.add("fade-in-content");
        name.classList.add("fade-in-content");
        arrows.forEach((arrow) => arrow.classList.add("fade-in-content"));
      }, 350); // esperar a que termine la animación de la card
    }, index * 280); // secuencial de las cards
  });
}

function createChampionCard(champion, skins) {
  const allSkins = [
    { name: champion.name, image: champion.imageUrl, isBase: true },
    ...skins.map((s) => ({ name: s.name, image: s.image, isBase: false })),
  ];

  let currentSkinIndex = 0;

  const { card, imageContainer, img, name } = renderChampionBaseCard(
    allSkins[0]
  );

  // Inicializar imagen y nombre
  img.src = allSkins[0].image;
  name.textContent = allSkins[0].name;
  img.style.objectPosition = allSkins[0].isBase
    ? getChampionObjectPosition(allSkins[0].name)
    : getSkinObjectPosition(allSkins[0].name);

  // Carrusel
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

    // Mostrar el botón de confirmar con animación si estaba oculto
    const confirmBtn = document.getElementById("aramConfirmBtn");
    if (confirmBtn.classList.contains("hidden")) {
      confirmBtn.classList.remove("hidden");
      // Forzar reflow para que la transición funcione
      void confirmBtn.offsetWidth;
      confirmBtn.classList.add("show");
    }
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
    }, 25);
  }, 300);
}

function closeAramModal() {
  if (aramModal) {
    aramModal.classList.add("closing");
    setTimeout(() => aramModal.remove(), 300);
  }
}

async function finishAramSelection() {
  if (!selectedChampionId) return;

  const userId = window.originalUserId || sessionStorage.getItem("userId");

  try {
    closeAramModal();

    // 🔹 Esperar 300 ms antes de abrir el status modal
    setTimeout(() => {
      openStatusModal("Crear partida", "Esperando resultado...");
    }, 100);

    // 🔹 Esperar a que termine la animación del cierre
    setTimeout(async () => {
      try {
        const { data: matchData } = await apiPlay.createAramMatchWithChampion(
          userId,
          selectedChampionId
        );

        // 🔹 Cerrar status y mostrar resultados
        closeStatusModal();
        createResultModal(matchData);
      } catch (err) {
        closeStatusModal();
        console.error("❌ Error al crear la partida ARAM:", err);
        alert("No se pudo crear la partida ARAM. Intenta nuevamente.");
      }
    }, 250);
  } catch (err) {
    console.error("❌ Error inesperado en finishAramSelection:", err);
  }
}

async function loadChampionsForAram() {
  const userId = window.originalUserId || sessionStorage.getItem("userId");
  try {
    const { data } = await apiChampions.getUserChampions(userId);
    championsData = data;
  } catch (err) {
    console.error("Error al cargar campeones para ARAM:", err);
    championsData = [];
  }
}
