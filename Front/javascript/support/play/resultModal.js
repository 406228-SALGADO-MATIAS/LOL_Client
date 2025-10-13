// resultModal.js
// ===============================================
// 🏆 Modal de Resultado (WIN / LOSE)
// ===============================================

// --- 5️⃣ Función principal: crea el modal completo
function createResultModal(matchData) {
  const userId = window.originalUserId || sessionStorage.getItem("userId");
  const player = matchData.players.find((p) => p.idUser == userId);

  if (!player) {
    console.error("Jugador no encontrado en match data");
    return;
  }

  const isWinner = player.teamMember === matchData.winnerTeam;

  const overlay = document.createElement("div");
  overlay.classList.add("result-modal-overlay");

  const modal = document.createElement("div");
  modal.classList.add("result-modal");

  // --- Render modular
  modal.append(
    renderResultHeader(isWinner),
    renderRewardsSection(player.rewards),
    renderButtonsSection(matchData)
  );

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // 🔹 Animación de aparición
  requestAnimationFrame(() => {
    overlay.classList.add("show");
    modal.classList.add("show");
  });
}

function closeResultModal() {
  const overlay = document.querySelector(".result-modal-overlay");
  const modal = overlay?.querySelector(".result-modal");

  if (!overlay || !modal) return;

  // 🔹 Agregamos clase de salida
  modal.classList.add("hide");
  overlay.classList.add("hide");

  // Esperamos que termine la animación (0.25s)
  setTimeout(() => {
    overlay.remove();
  }, 250);
}

// --- Renderiza la parte superior (imagen de resultado)
function renderResultHeader(isWinner) {
  const section = document.createElement("div");
  section.classList.add("result-header");

  const img = document.createElement("img");
  img.src = isWinner
    ? "https://img.ig-items.com/_/https://assets.ig-items.com/files/PdWJR8Qk9bqJGwvKK5bAgSeAGLwXouRR.png"
    : "https://i.pinimg.com/originals/fe/76/a4/fe76a4edc1d51b0a041ec8ee101e5fa0.png";
  img.alt = isWinner ? "Victory" : "Defeat";

  section.appendChild(img);
  return section;
}

// --- Renderiza la sección de recompensas
function renderRewardsSection(rewards) {
  const section = document.createElement("div");
  section.classList.add("rewards-section");

  const title = document.createElement("h3");
  title.textContent = "Recompensas Obtenidas";
  section.appendChild(title);

  const grid = document.createElement("div");
  grid.classList.add("rewards-grid");

  const items = buildMaterialItems(rewards);
  items.forEach((item) => {
    if (item.quantity > 0) {
      const card = document.createElement("div");
      card.classList.add("reward-card");

      const img = document.createElement("img");
      img.src = item.imageUrl;
      img.alt = item.materialName;

      const qty = document.createElement("span");
      qty.classList.add("reward-qty");
      qty.textContent = `x${item.quantity}`;

      card.append(img, qty);
      grid.appendChild(card);
    }
  });

  section.appendChild(grid);
  return section;
}

// ---  Renderiza la sección de botones
function renderButtonsSection(matchData) {
  const section = document.createElement("div");
  section.classList.add("buttons-section");

  const btnSalir = document.createElement("button");
  btnSalir.textContent = "Salir";
  btnSalir.classList.add("btn-exit");
  btnSalir.addEventListener("click", closeResultModal);

  const btnRepetir = document.createElement("button");
  btnRepetir.textContent = "Jugar";
  btnRepetir.classList.add("btn-replay");
  btnRepetir.addEventListener("click", () => {
    closeResultModal();
    createMatch();
  });

  const btnStats = document.createElement("button");
  btnStats.textContent = "Ver Estadísticas";
  btnStats.classList.add("btn-stats");
  btnStats.addEventListener("click", () => {
    const userId = window.originalUserId;
    if (!userId || !matchData) return;

    // Abrimos el modal de estadísticas encima del modal de resultado
    openMatchModal(matchData.id, userId, true);
  });

  section.append(btnSalir, btnRepetir, btnStats);
  return section;
}

// ---  Construcción de datos base para las rewards
function buildMaterialItems(materials) {
  return [
    {
      materialName: "Chest",
      imageUrl:
        "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/lootMaterials/chest.png?raw=true",
      quantity: materials.chests,
      type: "chest",
    },
    {
      materialName: "Master Chest",
      imageUrl:
        "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/lootMaterials/masterChest.png?raw=true",
      quantity: materials.masterChests,
      type: "masterChest",
    },
    {
      materialName: "Key",
      imageUrl:
        "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/lootMaterials/key.png?raw=true",
      quantity: materials.keys,
      type: "key",
    },
    {
      materialName: "Orange Essence",
      imageUrl:
        "https://github.com/406228-SALGADO-MATIAS/LOL_Client/blob/main/Front/images/lootMaterials/orangeEssence.png?raw=true",
      quantity: materials.orangeEssence,
      type: "orangeEssence",
    },
  ];
}

// --- 6️⃣ Cierre del modal
function closeResultModal() {
  const overlay = document.querySelector(".result-modal-overlay");
  const modal = overlay?.querySelector(".result-modal");

  if (!overlay || !modal) return;

  // 🔹 Agregamos clase de salida
  modal.classList.add("hide");
  overlay.classList.add("hide");

  // Esperamos que termine la animación (0.25s)
  setTimeout(() => {
    overlay.remove();
  }, 250);
}
