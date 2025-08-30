function createChestClickModal(item, type) {
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
  button.textContent =
    getItemStatus(item, type) === "NEEDS_KEY" ? "Necesita llave" : "Abrir";

  // Acción del botón (acá después conectamos la lógica real)
  button.addEventListener("click", async () => {
    if (getItemStatus(item, type) === "NEEDS_KEY") {
      alert("Este cofre necesita una llave 🔑");
    } else {
      try {
        const newItem = await handleOpenChest(type);
        container.innerHTML = ""; // cierro modal del cofre
        createNewItemModal(newItem); // abro modal del reward
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
  closeButton.textContent = "×"; // cruz
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

  
  // Imagen en grande
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
  // Botón principal según estado
  const mainButton = document.createElement("button");
  mainButton.classList.add("item-btn");

  const userBE = userLoot?.userBlueEssence || 0;
  const userOE = userLoot?.orangeEssence || 0;

  switch (status) {
    case "OWNED":
      mainButton.textContent = "En colección";
      mainButton.style.backgroundColor = "#dc7900b8";
      mainButton.disabled = true;
      mainButton.style.cursor = "not-allowed";
      break;
    case "ACTIVABLE":
      if (type === "champion" || type === "icon") {
        const cost = item.blueEssenceCost || 0;
        const faltante = cost - userBE;
        if (faltante > 0) {
          mainButton.textContent = `Necesita BE ${faltante}`;
          mainButton.style.backgroundColor = "#500000ff"; // rojo oscuro
          mainButton.disabled = true;
          mainButton.style.cursor = "not-allowed";
        } else {
          mainButton.textContent = `Desbloquear (-${cost} BE)`;
          mainButton.style.backgroundColor = "#4a0077ff";
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
          mainButton.textContent = `Necesita OE ${faltante}`;
          mainButton.style.backgroundColor = "#500000ff"; // rojo oscuro
          mainButton.disabled = true;
          mainButton.style.cursor = "not-allowed";
        } else {
          mainButton.textContent = `Desbloquear (-${cost} OE)`;
          mainButton.style.backgroundColor = "#4a0077ff"; // azul
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
        mainButton.style.backgroundColor = "#500000ff"; // rojo oscuro
        mainButton.disabled = true;
        mainButton.style.cursor = "not-allowed";
      }
      break;
    case "NEEDS_CHAMPION":
      mainButton.textContent = "Necesita campeón";
      mainButton.style.backgroundColor = "#b69b009c"; // amarillo
      mainButton.disabled = true;
      mainButton.style.cursor = "not-allowed";
      break;
    default:
      mainButton.textContent = "No disponible";
      mainButton.style.backgroundColor = "#500000ff"; // rojo oscuro
      mainButton.disabled = true;
      mainButton.style.cursor = "not-allowed";
  }

  btnContainer.appendChild(mainButton);

  // Botón de desencantar (siempre disponible)
  const disenchantButton = document.createElement("button");
  disenchantButton.classList.add("item-btn");
  disenchantButton.textContent =
    type === "skin"
      ? `Desencantar (+OE ${item.disenchantRefund || 0})`
      : `Desencantar (+BE ${item.disenchantRefund || 0})`;

  disenchantButton.addEventListener("click", async () => {
    try {
      await handleEnchantItem(item, type, false);
      closeItemModal(); // <-- reemplaza container.innerHTML=""
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
    switch(type) {
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
        //createMaterialModal(item, type); // <--- modal simple para mostrar cantidad
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
