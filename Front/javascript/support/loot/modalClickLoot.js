function createChestClickModal(item, type) {
  if (isLootRollModalOpen) {
    console.log(
      "No se puede abrir itemClickModal mientras está abierto lootRollModal"
    );
    return;
  }
  const container = document.getElementById("lootModalContainer");
  container.innerHTML = ""; // limpio por si ya hay otro modal abierto

  // Overlay del modal (fondo oscuro semitransparente)
  const overlay = document.createElement("div");
  overlay.classList.add("chest-modal-overlay");

  // Contenido del modal (imagen + botón)
  const modal = document.createElement("div");
  modal.classList.add("chest-modal");

  const img = document.createElement("img");
  img.src = item.imageUrl;
  img.alt = "Chest";
  img.style.maxWidth = "200px";
  img.style.height = "auto";
  img.style.display = "block";
  img.style.margin = "0 auto";

  const button = document.createElement("button");
  button.classList.add("chest-btn");

  if (getItemStatus(item, type) === "NEEDS_KEY") {
    button.textContent = "Necesita llave";
    button.classList.add("disabled-chest"); // aplicamos estilo especial
  } else {
    button.textContent = "Abrir";
  }

  // Acción del botón
  button.addEventListener("click", async () => {
    if (getItemStatus(item, type) === "NEEDS_KEY") {
      alert("Este cofre necesita una llave 🔑");
    } else {
      try {
        const newItem = await handleOpenChest(type);
        container.innerHTML = ""; // cierro modal del cofre
        createNewItemModal(newItem); // abro modal del reward;
      } catch (err) {
        alert("Error abriendo cofre: " + err.message);
      }
    }
  });

  modal.appendChild(img);
  modal.appendChild(button);

  overlay.appendChild(modal);
  container.appendChild(overlay);

  // Cerrar modal clickeando afuera
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      container.innerHTML = "";
    }
  });
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
    '<img class="be-icon" src="https://raw.githubusercontent.com/406228-SALGADO-MATIAS/LOL_Client/refs/heads/main/Front/images/lootMaterials/blueEssence.png" alt="BE">';

  // Imagen de esencia naranja
  const oeIcon =
    '<img class="oe-icon" src="https://raw.githubusercontent.com/406228-SALGADO-MATIAS/LOL_Client/refs/heads/main/Front/images/lootMaterials/orangeEssence.png" alt="OE">';

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
