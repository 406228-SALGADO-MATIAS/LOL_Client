// resultModal.js
// ===============================================
// 🏆 Modal de Resultado (WIN / LOSE)
// ===============================================

// --- 5️⃣ Función principal: crea el modal completo
function createResultModal(matchData) {
  closeStatusModal();
  const userId = window.originalUserId || sessionStorage.getItem("userId");
  const player = matchData.players.find((p) => p.idUser == userId);
  if (!player) return console.error("Jugador no encontrado");

  const isWinner = player.teamMember === matchData.winnerTeam;

  const overlay = document.createElement("div");
  overlay.classList.add("result-modal-overlay");

  const modal = document.createElement("div");
  modal.classList.add("result-modal");

  const header = renderResultHeader(isWinner);
  const elements = [header];

  let rewardsSection;
  if (player.rewards && hasRewards(player.rewards)) {
    rewardsSection = renderRewardsSection(player.rewards);
    elements.push(rewardsSection);
  }

  const buttonsSection = renderButtonsSection(matchData);
  elements.push(buttonsSection);

  modal.append(...elements);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // === Animaciones ===
  requestAnimationFrame(() => {
    overlay.classList.add("show");

    animateModal(modal);
    animateHeader(header);

    if (rewardsSection) {
      animateRewardsTitle(rewardsSection);
      animateRewardCards(rewardsSection);
    }

    animateButtons(buttonsSection);
  });
}

// helper
function hasRewards(rewards) {
  return Object.values(rewards).some((qty) => qty && qty > 0);
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
    ? "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761881310/3120802-middle_mxjsug.png"
    : "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761881310/fe76a4edc1d51b0a041ec8ee101e5fa0_cypu0t.png";
  img.alt = isWinner ? "Victory" : "Defeat";

  section.appendChild(img);

  section.style.marginTop = "-10px";
  // Ajuste de margen si es derrota
  if (!isWinner) {
    section.style.marginBottom = "-55px";
  } else {
    section.style.marginBottom = "-15px";
    section.style.marginTop = "-10px";
  }

  return section;
}

// --- Renderiza la sección de recompensas
function renderRewardsSection(rewards) {
  const section = document.createElement("div");
  section.classList.add("rewards-section");

  const title = document.createElement("h3");
  title.textContent = "Recompensas";
  section.appendChild(title);

  const grid = document.createElement("div");
  grid.classList.add("rewards-grid");

  const items = buildMaterialItems(rewards);
  items.forEach((item) => {
    if (item.quantity > 0) {
      const card = document.createElement("div");
      card.classList.add("reward-card");
      // ❌ No agregamos reward-appear ni opacidad
      card.style.opacity = 0; // empieza invisible
      card.style.transform = "translateY(20px) scale(0.9)";

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

  // 🔹 Wrapper para centrar correctamente los botones
  const wrapper = document.createElement("div");
  wrapper.classList.add("buttons-wrapper");

  const btnSalir = document.createElement("button");
  btnSalir.textContent = "Salir";
  btnSalir.classList.add("btn-exit");
  btnSalir.addEventListener("click", () => {
    // 🔹 Reactivar botón Launch
    const launchBtn = document.getElementById("launch-btn");
    if (launchBtn) {
      launchBtn.disabled = false; // funcionalmente habilitado
      launchBtn.classList.remove("disabled"); // estilo original
    }

    // 🔹 Cerrar modal
    closeResultModal();
  });

  const btnRepetir = document.createElement("button");
  btnRepetir.textContent = "Jugar";
  btnRepetir.classList.add("btn-replay");
  btnRepetir.addEventListener("click", () => {
    // Cerrar modal de resultados
    closeResultModal();

    // Esperar a que termine la animación (300ms) antes de abrir el status y crear la partida
    setTimeout(() => {
      openStatusModal("Crear partida", "Esperando resultado");
      createMatch();
    }, 10); // coincide con el tiempo de la transición de cierre
  });

  const btnStats = document.createElement("button");
  btnStats.textContent = "Estadísticas";
  btnStats.classList.add("btn-stats");
  btnStats.addEventListener("click", () => {
    const userId = window.originalUserId;
    if (!userId || !matchData) return;
    openMatchModal(matchData.id, userId, true);
  });

  // orden: salir - jugar - stats
  wrapper.append(btnSalir, btnRepetir, btnStats);
  section.appendChild(wrapper);

  return section;
}

// ---  Construcción de datos base para las rewards
function buildMaterialItems(materials) {
  return [
    {
      materialName: "Chest",
      imageUrl:
        "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761338999/chest_wr9oib.png",
      quantity: materials.chests,
      type: "chest",
    },
    {
      materialName: "Master Chest",
      imageUrl:
        "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761339654/masterChest_mmg9n9.webp",
      quantity: materials.masterChests,
      type: "masterChest",
    },
    {
      materialName: "Key",
      imageUrl:
        "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761338996/key_uu9ibo.png",
      quantity: materials.keys,
      type: "key",
    },
    {
      materialName: "Orange Essence",
      imageUrl:
        "https://res.cloudinary.com/dzhyqelnw/image/upload/v1761338997/orangeEssence_esacqj.webp",
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

// ---- Animar modal principal ----
function animateModal(modal) {
  modal.style.transform = "scale(0.5)";
  modal.style.opacity = "0";
  modal.style.transition = "transform 0.3s ease, opacity 0.3s ease";
  requestAnimationFrame(() => {
    modal.style.transform = "scale(1)";
    modal.style.opacity = "1";
  });
}

// ---- Animar header (imagen victoria/derrota) ----
function animateHeader(header) {
  const headerImg = header.querySelector("img");
  headerImg.style.transform = "scale(0.5)";
  headerImg.style.opacity = "0";
  headerImg.style.transition = "transform 0.3s ease, opacity 0.3s ease";

  setTimeout(() => {
    headerImg.style.transform = "scale(1)";
    headerImg.style.opacity = "1";
  }, 200);
}

// ---- Animar título de recompensas ----
function animateRewardsTitle(rewardsSection) {
  const rewardsTitle = rewardsSection.querySelector("h3");
  rewardsTitle.style.opacity = 0;
  rewardsTitle.style.transform = "translateY(10px)";
  rewardsTitle.style.transition = "opacity 0.3s ease, transform 0.3s ease";

  setTimeout(() => {
    rewardsTitle.style.opacity = 1;
    rewardsTitle.style.transform = "translateY(0)";
  }, 600);
}

// ---- Animar cards de recompensas ----
function animateRewardCards(rewardsSection) {
  const rewardCards = rewardsSection.querySelectorAll(".reward-card");
  rewardCards.forEach((card, i) => {
    card.style.opacity = 0;
    card.style.transform = "translateY(20px) scale(0.9)";
    card.style.transition = "opacity 0.4s ease, transform 0.4s ease";

    setTimeout(() => {
      card.style.opacity = 1;
      card.style.transform = "translateY(0) scale(1)";
    }, 900 + i * 100);
  });
}

// ---- Animar botones ----
function animateButtons(buttonsSection) {
  buttonsSection.style.opacity = 0;
  buttonsSection.style.transform = "translateY(20px)";
  buttonsSection.style.transition = "opacity 0.15s ease, transform 0.15s ease";

  setTimeout(() => {
    buttonsSection.style.opacity = 1;
    buttonsSection.style.transform = "translateY(0)";
  }, 1500);
}
