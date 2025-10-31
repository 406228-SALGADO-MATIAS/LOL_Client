async function createChestClickModal(item, type) {
  if (isLootRollModalOpen) {
    console.log(
      "No se puede abrir itemClickModal mientras está abierto lootRollModal"
    );
    return;
  }

  const container = document.getElementById("lootModalContainer");
  container.innerHTML = "";

  // 1️⃣ Traemos los datos del usuario
  let userLootData;
  try {
    const res = await fetch(
      `http://localhost:8080/userLoot/${userId}?showInactives=false`
    );
    if (!res.ok) throw new Error("Error cargando loot del usuario");
    userLootData = await res.json();
  } catch (err) {
    alert("Error cargando info de cofres: " + err.message);
    return;
  }

  const chestsCount =
    type === "chest" ? userLootData.chests : userLootData.masterChests;
  const keysCount = userLootData.keys;
  const maxOpenable = Math.min(chestsCount, keysCount);

  // Overlay y modal
  const overlay = createOverlay();
  const modal = createModal();

  // Imagen del cofre
  const img = createChestImage(item);
  modal.appendChild(img);

  // Botón abrir 1 cofre
  const openOneButton = createChestButton(
    getItemStatus(item, type) === "NEEDS_KEY" || keysCount === 0
      ? "Necesita llave"
      : "Abrir",
    async () => {
      if (keysCount === 0) {
        alert("No hay llaves disponibles 🔑");
        return;
      }
      try {
        const newItem = await handleOpenChest(type, 1);
        container.innerHTML = "";
        createNewItemModal(newItem);
      } catch (err) {
        alert("Error abriendo cofre: " + err.message);
      }
    },
    getItemStatus(item, type) === "NEEDS_KEY" || keysCount === 0
  );

  // Botón abrir varios cofres (solo si hay más de 1 posible)
  // En createChestClickModal, reemplazá la parte del openAllButton:

  let openAllButton = null;
  if (maxOpenable > 1) {
    openAllButton = createChestButton(`Abrir ${maxOpenable}`, async () => {
      if (maxOpenable === 0) {
        alert("No hay suficientes cofres o llaves");
        return;
      }

      container.innerHTML = ""; // limpiamos modal principal

      try {
        await showItemsSequentiallyDynamic(type, maxOpenable);
      } catch (err) {
        alert("Error abriendo cofres: " + err.message);
      }
    });
  }

  // Contenedor de botones
  const buttons = [openOneButton];
  if (openAllButton) buttons.push(openAllButton);

  const buttonsContainer = createButtonsContainer(buttons);
  modal.appendChild(buttonsContainer);

  overlay.appendChild(modal);
  container.appendChild(overlay);

  // Cerrar modal al hacer click fuera
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) container.innerHTML = "";
  });
}

// ---------------------------
// FUNCIONES AUXILIARES
// ---------------------------

// Crear overlay
function createOverlay() {
  const overlay = document.createElement("div");
  overlay.classList.add("chest-modal-overlay");
  return overlay;
}

// Crear modal
function createModal() {
  const modal = document.createElement("div");
  modal.classList.add("chest-modal");
  return modal;
}

// Crear imagen del cofre
function createChestImage(item) {
  const img = document.createElement("img");
  img.src = item.imageUrl;
  img.alt = "Chest";
  img.style.maxWidth = "200px";
  img.style.height = "auto";
  img.style.display = "block";
  img.style.margin = "0 auto 1rem"; // separa la imagen de los botones
  return img;
}

// Crear botón con event listener
function createChestButton(text, onClick, disabled = false) {
  const btn = document.createElement("button");
  btn.classList.add("chest-btn");
  btn.textContent = text;

  if (disabled) {
    btn.classList.add("disabled-chest");
  } else {
    btn.addEventListener("click", onClick);
  }

  return btn;
}

// Contenedor de botones en fila
function createButtonsContainer(buttons = []) {
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.justifyContent = "center";
  container.style.gap = "1rem";

  buttons.forEach((btn) => container.appendChild(btn));
  return container;
}

function createItemClickModal(item, type) {
  if (isLootRollModalOpen) {
    console.log(
      "No se puede abrir itemClickModal mientras está abierto lootRollModal"
    );
    return;
  }
  const container = document.getElementById("lootModalContainer");
  container.innerHTML = ""; // limpio por si ya hay otro modal abierto

  // Overlay del modal (fondo oscuro)
  const overlay = document.createElement("div");
  overlay.classList.add("item-modal-overlay");

  // Contenido del modal
  const modal = document.createElement("div");
  modal.classList.add("item-modal");

  const closeButton = document.createElement("button");
  closeButton.classList.add("item-modal-close");
  closeButton.textContent = "x"; // cruz
  closeButton.style.position = "absolute";
  closeButton.style.top = "0.5rem";
  closeButton.style.right = "0.5rem";
  closeButton.style.background = "transparent";
  closeButton.style.border = "none";
  closeButton.style.color = "#fff";
  closeButton.style.fontSize = "2rem";
  closeButton.style.cursor = "pointer";
  closeButton.addEventListener("click", () => {
    closeItemModal();
  });

  // Imagen
  const img = document.createElement("img");
  img.src = item.imageUrl;
  img.alt = item.championName || item.skinName || item.iconName || "Item";

  // Botones de acción
  const btnContainer = document.createElement("div");
  btnContainer.style.display = "flex";
  btnContainer.style.flexDirection = "column";
  btnContainer.style.gap = "0.5rem";
  btnContainer.style.marginTop = "1rem";

  const status = getItemStatus(item, type);

  // Botón principal según estado
  const mainButton = document.createElement("button");
  mainButton.classList.add("item-btn");

  const userBE = userLoot?.userBlueEssence || 0;
  const userOE = userLoot?.orangeEssence || 0;

  // Imagen de esencia azul (BE)
  const beIcon =
    '<img class="be-icon" src="https://res.cloudinary.com/dzhyqelnw/image/upload/v1761338998/blueEssence_m9dbsd.png" alt="BE">';

  // Imagen de esencia naranja
  const oeIcon =
    '<img class="oe-icon" src="https://res.cloudinary.com/dzhyqelnw/image/upload/v1761338997/orangeEssence_esacqj.webp" alt="OE">';

  switch (status) {
    case "OWNED":
      mainButton.textContent = "En colección";
      mainButton.style.background =
        "linear-gradient(180deg, #b86500c2, #9c560059)";
      mainButton.disabled = true;
      mainButton.style.cursor = "not-allowed";
      break;
    case "ACTIVABLE":
      if (type === "champion" || type === "icon") {
        const cost = item.blueEssenceCost || 0;
        const faltante = cost - userBE;

        if (faltante > 0) {
          mainButton.innerHTML = `Necesita +${beIcon} ${faltante}`;
          mainButton.style.background =
            "linear-gradient(180deg, #64000086, #92000036)";
          mainButton.disabled = true;
          mainButton.style.cursor = "not-allowed";
        } else {
          mainButton.innerHTML = `Desbloquear (-${beIcon} ${cost})`;
          mainButton.style.background =
            "linear-gradient(180deg, #490077ff, #2a0044d5)";
          mainButton.disabled = false;
          mainButton.style.cursor = "pointer";

          mainButton.addEventListener("click", async () => {
            try {
              await handleEnchantItem(item, type, true);
              closeItemModal(); // <-- reemplaza container.innerHTML=""
            } catch (err) {
              alert("Error desbloqueando: " + err.message);
            }
          });
        }
      } else if (type === "skin") {
        const cost = item.orangeEssenceCost || 0;
        const faltante = cost - userOE;

        if (faltante > 0) {
          mainButton.innerHTML = `Necesita +${oeIcon} ${faltante}`;
          mainButton.style.background =
            "linear-gradient(180deg, #64000086, #92000036)";
          mainButton.disabled = true;
          mainButton.style.cursor = "not-allowed";
        } else {
          mainButton.innerHTML = `Desbloquear (-${oeIcon} ${cost})`;
          mainButton.style.background =
            "linear-gradient(180deg, #490077af, #2a0044b6)";
          mainButton.disabled = false;
          mainButton.style.cursor = "pointer";

          mainButton.addEventListener("click", async () => {
            try {
              await handleEnchantItem(item, type, true);
              closeItemModal(); // <-- reemplaza container.innerHTML=""
            } catch (err) {
              alert("Error desbloqueando: " + err.message);
            }
          });
        }
      } else {
        mainButton.textContent = "No disponible";
        mainButton.style.background =
          "linear-gradient(180deg, #64000086, #92000036)";
        mainButton.disabled = true;
        mainButton.style.cursor = "not-allowed";
      }
      break;
    case "NEEDS_CHAMPION":
      mainButton.textContent = "Necesita campeón";
      mainButton.style.background =
        "linear-gradient(180deg, #b69b00c4, #756300af)";
      mainButton.disabled = true;
      mainButton.style.cursor = "not-allowed";
      break;
    default:
      mainButton.textContent = "No disponible";
      mainButton.style.background =
        "linear-gradient(180deg, #64000086, #92000036)";
      mainButton.disabled = true;
      mainButton.style.cursor = "not-allowed";
  }

  btnContainer.appendChild(mainButton);

  // Botón de desencantar (siempre disponible)
  const disenchantButton = document.createElement("button");
  disenchantButton.classList.add("item-btn");
  disenchantButton.innerHTML =
    type === "skin"
      ? `Desencantar (+${oeIcon} ${item.disenchantRefund || 0})`
      : `Desencantar (+${beIcon} ${item.disenchantRefund || 0})`;

  disenchantButton.addEventListener("click", async () => {
    try {
      await handleEnchantItem(item, type, false);
      closeItemModal(); // <-- reemplaza container.innerHTML=""
      applyCurrentFilter(); // reaplicar filtro solo después de cerrar modal
    } catch (err) {
      alert("Error desencantando: " + err.message);
    }
  });

  btnContainer.appendChild(disenchantButton);

  modal.appendChild(closeButton); // <--- agrego la cruz primero
  modal.appendChild(img);
  modal.appendChild(btnContainer);

  overlay.appendChild(modal);
  container.appendChild(overlay);
}

function attachClickModal(card, item, type) {
  card.addEventListener("click", () => {
    if (isLootRollModalOpen) {
      // Si está abierto un roll, añadimos al roll
      addItemToRoll(normalizeItem(item, type));
      return;
    }

    // Si no está abierto el roll, abrimos el modal según el tipo
    switch (type) {
      case "chest":
      case "masterChest":
        createChestClickModal(item, type);
        break;
      case "champion":
      case "skin":
      case "icon":
        createItemClickModal(item, type);
        break;
      case "key":
      case "orangeEssence":
      case "userBlueEssence":
        // Materiales: no hacemos nada al click (igual que antes)
        break;
      default:
        console.warn("Tipo desconocido:", type);
    }
  });
}

function closeItemModal() {
  const container = document.getElementById("lootModalContainer");
  const modal = container.querySelector(".item-modal");
  if (!modal) return;

  modal.style.animation = "modalClose 0.15s ease forwards"; // animación de cierre
  setTimeout(() => {
    container.innerHTML = ""; // borra el modal al terminar la animación
  }, 150); // duración igual a la animación
}
